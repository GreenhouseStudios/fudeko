<template>
  <div class="container relative px-4 md:px-8 md:w-full">
    <h1 class="text-3xl font-bold">Fudeko Prompt Form</h1>

    <br />
    <div v-if="error">
      <h2>The user you requested does not exist.</h2>
    </div>

    <br />
    <div v-if="userVerified && !loading">
      <div v-if="!submitted && prompts && !userCaughtUp">
        <div class="" v-if="!previewing">
          <span v-if="!activePrompt && questionsNotToAsk.length < 3 && !preselectedPromptNumber" id="prompt-choose-container" class="mb-10">
            <h2 class="font-bold">Select one of the following prompts to answer this week:</h2>
            <span class="flex flex-col justify-center gap-3 my-4 md:gap-5 grow md:flex-row" id="prompt-choices-container">
              <div class="relative" id="button-wrapper" v-for="prompt in prompts" :key="prompt.promptText"
                v-show="!questionsNotToAsk.includes(prompt.promptNumber)">
                <button @click="setActivePrompt(prompt)"
                  class="w-full p-3 px-3 bg-yellow-200 border-2 border-yellow-400 rounded shadow-md md:max-w-md md:p-1 md:h-36 animate__animated animate__fadeIn hover:bg-yellow-100"
                  :class="prompt === activePrompt ? 'bg-yellow-200' : 'bg-yellow-300'">{{ prompt.promptText }}</button>
                <button
                  class="absolute flex items-center justify-center w-8 h-8 font-bold text-center bg-red-500 border-2 border-white rounded-full -top-2 -right-2 hover:bg-red-300"
                  @click.prevent.stop="DoNotAsk(prompt)" v-tooltip="'Never ask this question again?'"><v-icon name="trash"
                    inverse></v-icon></button>
              </div>
            </span>
          </span>
          <span id="custom-prompt-btn-container" v-if="!activePrompt && !preselectedPromptNumber">
            <h2 class="font-bold">Use your own prompt</h2>
            <button @click="useCustomPrompt"
              class="p-5 px-3 mt-3 bg-yellow-200 border-2 border-yellow-400 rounded shadow-md animate__animated animate__fadeIn hover:bg-yellow-100">Custom
              Prompt</button>
          </span>
        </div>

        <div v-if="activePrompt || preselectedPromptNumber" id="response-write" class="z-0">

          <span class="p-3 mx-auto md:px-5 md:w-2/3 md:p-5 prompt ">
            <span class="flex flex-col prompt-write-header">
              <p class="text-lg font-bold">{{ activePrompt.promptText }}</p>
              <p v-if="previewing" class="mt-5 font-medium">Please confirm your submission text:</p>

            </span>

            <span>
              <div v-if="!previewing" class="relative">
                <div v-if="custom">
                  <label for="custom-prompt-title">Entry Title: </label>
                  <input type="text" id="custom-prompt-title" placeholder="Title (optional)" class="p-1 w-100" size="75"
                    v-model="userTitle">
                </div>
                <!-- <textarea v-model="response" name="prompt_response" class="px-2 py-2 prompt-response" cols="30" rows="10"
                  style="border: none" placeholder="Type your response here"></textarea> -->
                <!-- <div class="my-10 bg-white md:w-8/12 h-fit">
                  <input id="x" type="hidden" name="content" v-model="response" class="h-96"
                    placeholder="Type your response here">
                  <trix-editor input="x"></trix-editor>
                </div> -->
                <!-- <TipTap class="mx-auto my-10 bg-white md:w-3/4" v-model="response"></TipTap> -->
                <Editor class="my-10 bg-white" v-model="response" style="height: 320px" placeholder="Type your response here"></Editor>
                <!-- <p class="font-semibold" v-tooltip="'Hello'">Writing Tip </p> -->
                <!-- <p class="text-sm leading-none">{{ writingTip }}</p> -->
                <span class="flex justify-center gap-5 mt-24">
                  <button @click="back"
                    class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button>
                  <button :class="{ 'opacity-25 cursor-not-allowed': response.length <= 0 }" @click="preview"
                    :disabled="response.length <= 0"
                    class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Next</button>
                </span>
                <span class="absolute bottom-1 right-1">Char: {{ responseCharCount }} Word: {{ responseWordCount }}</span>
              </div>
              <div v-else>
                <div class="w-5/6 p-10 mx-auto mt-2 mb-10 bg-yellow-50 preview-text" v-html="response"></div>
                <FeedbackDifficulty :difficulty.sync="difficulty" />
                <div class="flex flex-col items-start my-5" id="share-options-container">
                  <h2 class="font-bold">Would you like to publish this response?</h2>
                  <div class="flex" id="sharing-options">

                    <span class="flex flex-wrap items-center justify-center gap-2 mt-2 mb-5 mr-5 align-middle">
                      <button @click="shareOption = option" v-for="option in shareSettings" :key="option.name"
                        class="z-10 w-48 h-24 p-2 border-2 rounded-md"
                        :class="option === shareOption ? 'bg-yellow-300 border-2 border-gray-600 font-bold border-2' : 'border-yellow-300 hover:bg-yellow-200'">{{
                          option.name }}</button>
                    </span>

                  </div>
                  <i class="mx-auto md:w-1/2" v-html="shareOption.description"></i>
                </div>

                <div class="flex justify-end gap-4 mt-5">
                  <button @click="backEdit"
                    class="p-2 font-bold bg-yellow-200 border-2 border-yellow-300 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button>

                  <button @click="submit" :disabled="submitButtonDisabled"
                    class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0"
                    :class="submitButtonDisabled ? 'bg-yellow-50 border-yellow-100' : 'hover:bg-yellow-200'">Send</button>

                </div>
              </div>
            </span>
          </span>
        </div>
      </div>
      <div class="complete" v-if="submitted">
        <h2>Thanks for your submission! :)</h2>
      </div>
      <div v-if="!activePrompt && questionsNotToAsk.length > 2" class="my-5">
        <h2>It looks like none of this week's questions worked out for you. We're sorry to hear that.</h2>
        <br>
        <h2>If you wish to write with questions or suggestions please contact <a class="text-blue-500"
            href="hana@fudekoproject.org">hana@fudekoproject.org</a></h2>
      </div>
      <div v-if="questionsNotToAsk.length == 0 && prompts.length < 1">
        <h2>You are all caught up with your prompts, please check back later!</h2>
      </div>

    </div>

    <div v-if="loading" style="border-top-color:transparent" id="loading-spinner-container"
      class="absolute w-16 h-16 border-4 border-yellow-300 border-solid rounded-full left-56 animate-spin">
    </div>
  </div>
</template>

<script>
import FeedbackDifficulty from './FeedbackDifficulty.vue'

// eslint-disable-next-line no-unused-vars
// import TipTap from './TipTap.vue'
import Editor from 'primevue/editor';
export default {
  data() {
    return {
      writingTip: `"Don’t force it but do nurture the skill. Storytelling doesn’t have to be hard, but it can feel that way when we’re not used to doing it. The good news is: like any skill, it’s one you can practice and develop over time. In these first few weeks, we will build up our storytelling “muscles” by developing positive associations with storytelling. You know yourself best, so we want you to pick the prompt. When you’re picking, think about which prompt feels fun: does it bring up happy memories for you? Will it be energizing for you to write/talk about?

If something hard comes to mind, ask yourself if you want to go there. If you decide you do, go for it. If you decide, you’d rather not just yet, that’s fine too. Don’t push yourself to go there if you’re not ready. Don't worry, we'll get to that stuff too. Right now, just focus on building up your writing habit."`,
      response: "",
      shareSettings: [{ name: "Keep Private", description: "You can always opt to share your response later if you change your mind. You can still share your responses with your friends and family on your private page if you want." }, { name: "Share with Storytellers", description: "Your words may be just the thing to jog another storyteller’s memory. Choose this option if you are okay with sharing this response with other storytellers in Fudeko email and letter correspondence. The response will not be made publicly available. Still, while we discourage storytellers from forwarding Fudeko emails outside the group, we cannot totally prevent it. Thank you for helping to build a creative and collaborative storytelling community!" }, { name: "Release with Creative Commons License", description: " <a class='blue-200' href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>(CC-BY-NC-SA 4.0 DEED)</a> Want to make this response publicly available for education or research? This license allows others to use, excerpt, or adapt your response as long as they 1) give proper attribution, 2) do not profit from it, and 3) release the resulting project under the same license. While a CC license cannot be retroactively revoked, we can remove the response(s) from our website. However, if they have been shared elsewhere, you will have to negotiate with those parties if you wish to have them taken down. If you have concerns/doubts, we encourage you to keep the response private or only share it with the group for now." }, { name: "Release Anonymously with Creative Commons License", description: "(CC-BY-NC-SA 4.0 DEED) Choose this to make this response anonymously available to the public for education or research purposes. While still released under the same CC license, proper attribution in this case is “by Anonymous, courtesy of the Fudeko Project.” If you decide you would like to be named with the response later, just email us at hana@fudekoproject.org and we will update the attribution information accordingly" }],
      prompts: [],
      activePrompt: null,
      user: "",
      userVerified: false,
      submitted: false,
      loading: false,
      previewing: false,
      error: false,
      custom: false,
      userTitle: "",
      shareOption: "",
      difficulty: "",
      questionsNotToAsk: [],
    };
  },
  created() {
    this.loading = true;
    if ( this.$route.params.email )
      this.user = this.$route.params.email;
    const URL = "https://script.google.com/macros/s/AKfycbztpBQ9d9Dmvmg_A2pqcdvHwCPC8X9mRVIxI-p9em1QOmb6FJHBOHVu_eFnZ_vXDqGP/exec?user=" +
      this.$route.params.email;
    fetch( URL, {
      mode: "cors",
      redirect: "follow",
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    } )
      .then( ( res ) => res.json() )
      .then( ( data ) => {
        if ( data["body"] == null ) {
          this.error = true;
        }
        else {
          this.userVerified = true;
          this.prompts = data["body"].map( value => ( { value, sort: Math.random() } ) )
            .sort( ( a, b ) => a.sort - b.sort )
            .map( ( { value } ) => value );
        }
        if(this.preselectedPromptNumber){
          this.activePrompt = this.prompts[this.preselectedPromptNumber - 1]
        }
        this.loading = false;
      } );
  },
  methods: {
    DoNotAsk( prompt ) {
      if ( confirm( "We will not ask you this question again in the future. Are you sure?" ) ) {
        console.log( "remove " + prompt.promptText );
        this.questionsNotToAsk.push( prompt.promptNumber );
        // this.prompts = this.prompts.filter( p => p.promptText !== prompt.promptText );
      }
    },
    useCustomPrompt() {
      this.custom = true;
      this.activePrompt = "custom";
    },
    setActivePrompt( p ) {
      this.activePrompt = p;
    },
    preview() {
      this.previewing = true;
    },
    back() {
      this.custom = false;
      this.previewing = false;
      this.activePrompt = null;
    },
    backEdit() {
      this.previewing = false;
    },
    submit() {
      // if(this.response.split(' ').length < 100 || this.response.length < 200) return
      this.loading = true;
      const URL = "https://script.google.com/macros/s/AKfycbztpBQ9d9Dmvmg_A2pqcdvHwCPC8X9mRVIxI-p9em1QOmb6FJHBOHVu_eFnZ_vXDqGP/exec";
      const bodyData = {
        response: this.response,
        email: this.user,
        promptNumber: this.custom ? 0 : this.activePrompt.promptNumber,
        userTitle: this.userTitle,
        shareOption: this.shareOption.name,
        difficulty: this.difficulty,
      };
      fetch( URL, {
        mode: "no-cors",
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify( bodyData ),
      } )
        .then( ( res ) => res.text() )
        .then( ( data ) => {
          console.log( data );
          this.submitted = true;
          this.loading = false;
        } );
    },
    verifyUser() {
    },
  },
  computed: {
    responseWordCount() {
      return this.response.trim().split( " " ).length;
    },
    responseCharCount() {
      return this.response.length;
    },
    userCaughtUp() {
      return this.prompts.length < 1;
    },
    submitButtonDisabled() {
      return this.shareOption === ""
    },
    preselectedPromptNumber(){
      if(this.$route.params.promptNumber){
        return parseInt(this.$route.params.promptNumber)
      }
      else{
        return null
      }
    }
  },
  components: { FeedbackDifficulty, Editor }
};
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