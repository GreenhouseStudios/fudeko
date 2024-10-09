<template>
  <div id="response-write" class="z-0 py-32 md:px-24" v-if="participantRecord || isAdminRoute">
    <span class="p-3 mx-auto md:px-5 md:w-2/3 md:p-5 prompt" v-if="hasUnansweredSets">
      <span class="flex flex-col mx-auto md:w-1/2 prompt-write-header" v-if="!isAdminRoute">
        <h2 class="pb-3 text-4xl" v-html="activePrompt.prompt_text"></h2>
        <h3 class="pt-1 text-lg font-bold" v-html="activePrompt.prompt_subtext"></h3>
      </span>

      <span>
        <section class="relative">
          <div v-if="custom">
            <label for="custom-prompt-title">Entry Title: </label>
            <input type="text" id="custom-prompt-title" placeholder="Title (optional)" class="p-1 w-100" size="75"
              v-model="userTitle" />
          </div>
          <div v-if="isAdminRoute">
            <AdminResponseConfig :adminParticipant="adminParticipant" :participants="participants"
              :adminPrompt="adminPrompt" :prompts="prompts" @admin-participant-change="handleAdminParticipantChange" />
          </div>

          <Editor class="my-20 bg-white" v-model="response" style="height: 320px" placeholder="Type your response here">
          </Editor>



          <span class="py-5 my-5">{{
            saved ? "Saved ✓" : "Saving in..." + countDown
          }}</span>

         <FormMediaUpload :handleFileChange="handleFileChange" v-bind:files="files"></FormMediaUpload>

          <WritingTip :tip="currentTip" v-if="!isAdminRoute"></WritingTip>
        </section>
        <!-- <ResponseDifficultySelect :difficulty="difficulty" :difficultyOptions="difficultyOptions" @change-difficulty="difficulty = $event"></ResponseDifficultySelect> -->
        <ResponseDifficultySelect v-model="difficulty" :difficultyOptions="difficultyOptions">
        </ResponseDifficultySelect>

        <ShareOptionSelect :shareSettings="shareSettingArray" v-model:shareOption="shareOption"
          :attrSettings="attrSettingArray" v-model:attrOption="attrOption" v-model:creditName="creditName"
          :participantRecord="participantRecord"></ShareOptionSelect>

        <div class="flex justify-end gap-4 mt-5">
          <button @click="submit" :disabled="submitButtonDisabled" class="p-2 font-bold rounded" :class="submitButtonDisabled
            ? 'bg-gray-300 border-2 border-gray-400'
            : 'hover:bg-yellow-200 border-yellow-400 bg-yellow-300 border-2 '
            ">
            Send
          </button>
        </div>
      </span>

    </span>
    <span v-else>
      <div class="w-1/3 p-12 mx-auto bg-yellow-200 border-2 border-yellow-400">
        <h1>
          You are caught up with your prompts! Please check again later for next
          week's prompts.
        </h1>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { useCounterStore } from "@/stores/store";
import { mapStores, mapState, mapActions } from "pinia";
import FileUpload from 'primevue/fileupload';
import WritingTip from "@/components/WritingTip.vue";
import Editor from "primevue/editor";
import AdminResponseConfig from "@/components/AdminResponseConfig.vue";
import ResponseDifficultySelect from "@/components/ResponseDifficultySelect.vue";
import ShareOptionSelect from "@/components/ShareOptionSelect.vue";
import { ShareOption, AttrOption } from "../types/Form";
import FormMediaUpload from "./FormMediaUpload.vue";

const shareSettings: ShareOption[] = [
  { name: "Keep Private", description: "You can always opt to share your response later if you change your mind. You can still share your responses with your friends and family on your private page if you want." },
  { name: "Share Anonymously", description: "Your words may be just the thing to jog another storyteller’s memory. Choose this option if you are okay with sharing this response with other storytellers in Fudeko email and letter correspondence. The response will not be made publicly available. Still, while we discourage storytellers from forwarding Fudeko emails outside the group, we cannot totally prevent it. Thank you for helping to build a creative and collaborative storytelling community!" },
  { name: "Share with Credit", description: "<a class='blue-200' href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>(CC-BY-NC-SA 4.0 DEED)</a> Want to make this response publicly available for education or research? This license allows others to use, excerpt, or adapt your response as long as they 1) give proper attribution, 2) do not profit from it, and 3) release the resulting project under the same license. While a CC license cannot be retroactively revoked, we can remove the response(s) from our website. However, if they have been shared elsewhere, you will have to negotiate with those parties if you wish to have them taken down. If you have concerns/doubts, we encourage you to keep the response private or only share it with the group for now." },
];
const attrOptions: AttrOption[] = [
  {
    name: "CreditWithGivenName",
    description: "Credit me as my registered name",
  },
  {
    name: "CreditDifferent",
    description: "Credit me by a different name",
  },
];
export default {
  components: {
    WritingTip,
    Editor,
    AdminResponseConfig,
    ResponseDifficultySelect,
    ShareOptionSelect,
    FileUpload,
    FormMediaUpload,
  },
  data() {
    return {
      response: "",
      userTitle: "",
      difficulty: "",
      attrOption: attrOptions[0],
      shareOption: shareSettings[0],
      hasUnansweredSets: true,
      creditName: "",
      difficultyOptions: [
        "Easy",
        "Moderate",
        "Somewhat Difficult",
        "Difficult",
      ],
      adminPrompt: null,
      adminParticipant: null,
      saved: true,
      timeToSave: 5,
      countDown: 5,
      countDownInterval: null,
      shareSettingArray: shareSettings,
      attrSettingArray: attrOptions,
      files: [],
    };
  },
  async mounted() {
    if (this.$route.params.email) {
      if (!this.participantRecord)
        await this.getParticipantRecordByEmail(this.$route.params.email);
      if (await this.participantHasUnansweredSets(this.participantRecord.id))
        await this.getUserPrompts(this.user);
      else this.hasUnansweredSet = false;
    }
    if (this.partialResponse?.response_text) {
      this.response = this.partialResponse.response_text;
      this.userTitle = this.partialResponse.user_title;
      // this.shareOption = shareSettings.find(
      //   ( s ) => s.name == this.partialResponse.share_option
      // );
      this.difficulty = this.partialResponse.response_difficulty;
    }
  },
  watch: {
    response(newValue) {
      this.saved = false;
      this.countDown = this.timeToSave;
      if (this.countDownInterval) clearInterval(this.countDownInterval);
      this.countDownInterval = setInterval(() => {
        if (this.countDown > 0) this.countDown--;
        else {
          clearInterval(this.countDownInterval);
          this.saved = true;
          this.record(newValue);
        }
      }, 1000);

    },
  },
  methods: {
    ...mapActions(useCounterStore, [
      "submitUserResponse",
      "toggleLoading",
      "getUserPrompts",
      "setParticipantID",
      "participantHasUnansweredSets",
      "getParticipantRecordByEmail",
      "recordPartialResponse",
      "clearPartialResponse",
      "uploadFile",
    ]),
    async handleFileChange(event) {
      this.files.push(event.files[0])
    },
    record(value) {
      this.recordPartialResponse({
        response_text: value,
        participant: this.participantRecord.id,
        prompt: this.activePrompt.id,
        user_title: this.userTitle,
        share_option: this.shareOption.name,
        response_difficulty: this.difficulty,
        attribution_option: this.attrOption.name,
        attribution_name:
          this.attrOption.name == "CreditDifferent" ? this.creditName : null,
        entered_by_admin: this.adminPrompt ? true : false,
      });
    },
    preview() {
      this.previewing = true;
    },
    back() {
      this.previewing = false;
    },
    addFile(e) {
      this.file = e.target.files[0];
    },
    async submit() {
      if (this.submitButtonDisabled) return;
      this.toggleLoading();
      await this.submitUserResponse(this.formData);
      this.clearPartialResponse();
      this.toggleLoading();
      this.$router.push({ name: "ConfirmSubmit" });
    },
    handleAdminParticipantChange(e) {
      this.adminParticipant = e.value;
    },
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, [
      "loading",
      "error",
      "usersPromptChoices",
      "tips",
      "participantID",
      "participantRecord",
      "prompts",
      "participants",
      "partialResponse",
    ]),
    submitButtonDisabled() {
      return (
        this.response.length < 1 ||
        !this.shareOption ||
        (this.shareOption.name != "Keep Private" && !this.attrOption) ||
        (this.attrOption.name == "CreditDifferent" && !this.creditName)
      );
    },
    custom() {
      return this.$route.path.includes("custom");
    },
    responseCharCount() {
      return this.response.length;
    },
    responseWordCount() {
      return this.response.split(" ").length;
    },
    formData() {
      return {
        response_text: this.response,
        participant: this.adminParticipant?.id || this.participantID,
        prompt: this.adminPrompt?.id || this.activePrompt?.id,
        user_title: this.userTitle,
        share_option: this.shareOption.name,
        response_difficulty: this.difficulty,
        attribution_option: this.attrOption.name,
        attribution_name:
          this.attrOption.name == "CreditDifferent" ? this.creditName : null,
        entered_by_admin: this.adminPrompt ? true : false,
      };
    },
    activePrompt() {
      if (this.partialResponse?.prompt) {
        return this.prompts.find((p) => p.id == this.partialResponse.prompt);
      }
      if (this.isAdminRoute) {
        return this.prompts[0];
      }
      if (
        this.$route.params.promptNumber &&
        this.usersPromptChoices.length > 0
      ) {
        const promptNumber = parseInt(this.$route.params.promptNumber);
        return this.usersPromptChoices[promptNumber - 1];
      }
      if (this.$route.params.promptId) {
        return this.prompts.find((p) => p.id == this.$route.params.promptId);
      }
      if (this.custom) {
        return { prompt_text: "Custom Prompt" };
      }
      if (this.$route.params.id) {
        return this.usersPromptChoices.find(
          (p) => p.id == parseInt(this.$route.params.id)
        );
      }
      else return null;
    },
    promptID() {
      return parseInt(this.$route.params.id);
    },
    numberOfResponses() {
      if (this.isAdminRoute) {
        return 0;
      }
      return this.participantRecord.number_answered_sets;
    },
    currentTip() {
      return this.tips[this.numberOfResponses % this.tips.length];
    },
    isAdminRoute() {
      return this.$route.path.includes("new");
    },
  },
};
</script>
