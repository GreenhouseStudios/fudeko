<template>
  <div class="container relative px-4 py-36 md:px-8 md:w-full">

    <div>
      <div v-if="hasUnansweredSet">

        <div id="prompt-choose-container" class="mb-10">
          <PromptList :prompts="usersPromptChoices" :declinedPrompts="declinedPrompts"
            @set-active-prompt="(p) => activePrompt = p"></PromptList>
        </div>

        <span id="custom-prompt-btn-container" v-if="!activePrompt && !preselectedPromptNumber"
          class="flex justify-center">
          <button @click="useCustomPrompt"
            class="p-2 px-3 mt-3 text-2xl font-bold bg-yellow-200 border-2 border-yellow-400 rounded shadow-md animate__animated animate__fadeIn hover:bg-yellow-100">Use
            Custom
            Prompt</button>
        </span>
      </div>
      <div v-else class="">
        <div class="w-1/2 p-12 mx-auto text-left bg-yellow-200 border-2 border-yellow-400">
          <h1>You are caught up with your prompts! Please check again later for next week's prompts.</h1>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import { defineComponent } from 'vue';
import PromptList from './PromptList.vue'
export default defineComponent({
  data() {
    return {

      activePrompt: null,
      user: "",
      custom: false,
      hasUnansweredSet: true,
    };
  },
  async mounted() {
    // if(this.participantID && this.partialResponse){
    //   this.$router.push('/continue')
    // }
    if (this.$route.params.email) {
      if (!this.participantRecord)
        await this.login(this.$route.params.email);
      this.user = this.$route.params.email;
      if (this.participantRecord) {
        this.userVerified = true
        this.setParticipantID(this.participantRecord.id);
      }

      if (await this.participantHasUnansweredSets(this.participantRecord.id))
        await this.getUserPrompts(this.user);
      else this.hasUnansweredSet = false;
    }
  },

  methods: {

    ...mapActions(useCounterStore, ['toggleLoading', 'toggleError', 'getUserPrompts', 'setParticipantID', 'participantHasUnansweredSets', 'login']),
    addFile(e) {
      this.files.push(e.target.files[0])
      console.log(e.target.files[0])
    },



    useCustomPrompt() {
      // this.custom = true;
      // this.activePrompt = "custom";
      this.$router.push({ name: 'ResponseFormCustom' })
    },


  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prompts', 'loading', 'error', 'usersPromptChoices', 'tips', 'participantRecord', 'participantID', 'partialResponse']),

    userCaughtUp() {
      return this.usersPromptChoices && this.usersPromptChoices.length < 1;
    },

    preselectedPromptNumber() {
      if (this.$route.params.promptNumber) {
        this.activePrompt = this.usersPromptChoices[parseInt(this.$route.params.promptNumber) - 1]
        return parseInt(this.$route.params.promptNumber)
      }
      else {
        return null
      }
    },

  },
  components: { PromptList, }
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
}

.prompt-header {}

.prompt-response {
  margin: 20px;
  width: 90%;
  border: none;
}

button {
  // background-color: #F66118;
}

.prompt {
  display: block;
  justify-content: space-between;
  border: 2px solid rgb(255, 218, 150);
  border-radius: 5px;
  background-color: rgb(252, 241, 220);



  p {
    display: inline;
    margin-right: 10px;
  }
}

.preview-text {
  font-family: Georgia, 'Times New Roman', Times, serif;
}

#sharing-options {}
</style>