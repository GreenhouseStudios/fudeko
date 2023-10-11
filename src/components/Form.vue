<template>
  <div class="container relative px-4 md:px-8 md:w-1/2">
    <h1 class="text-3xl font-bold">Fudeko Prompt Form</h1>

    <br />
    <div v-if="error">
      <h2>The user you requested does not exist.</h2>
    </div>

    <br />
    <div v-if="userVerified && !loading">
      <div v-if="!submitted && prompts && !userCaughtUp">
        <div class="" v-if="!previewing">
          <span v-if="!activePrompt" id="prompt-choose-container">
            <h2 class="font-bold">Select one of the following prompts to answer this week:</h2>
            <span class="flex flex-col gap-2 my-4 md:flex-row" id="prompt-choices-container">
              <div class="relative md:w-1/3 " id="button-wrapper" v-for="prompt in prompts" :key="prompt.promptText">
                <button @click="setActivePrompt(prompt)"
                  class="p-5 px-3 bg-yellow-200 border-2 border-yellow-400 rounded shadow-md md:h-48 animate__animated animate__fadeIn hover:bg-yellow-100"
                  :class="prompt === activePrompt ? 'bg-yellow-200' : 'bg-yellow-300'">{{ prompt.promptText }}</button>
                <!-- <button
                  class="absolute w-8 h-8 font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 hover:bg-red-300"
                  @click.prevent.stop="DoNotAsk(prompt)"> X </button> -->
              </div>
            </span>

            <span id="custom-prompt-btn-container">
              <h2 class="font-bold">Or use your own prompt</h2>
              <button @click="useCustomPrompt"
                class="p-5 px-3 mt-5 bg-yellow-200 border-2 border-yellow-400 rounded shadow-md md:w-1/3 animate__animated animate__fadeIn hover:bg-yellow-100">Custom
                Prompt</button>
            </span>
          </span>
        </div>

        <div v-if="activePrompt" id="response-write">

          <span class="p-2 md:p-5 prompt animate__animated animate__fadeInUp">
            <span class="flex flex-col prompt-write-header">
              <p class="font-bold">{{ activePrompt.promptText }}</p>
              <p v-if="previewing" class="mt-5 font-medium">Please confirm your submission text:</p>

            </span>

            <span>
              <div v-if="!previewing">
                <div v-if="custom">
                  <label for="custom-prompt-title">Entry Title: </label>
                  <input type="text" id="custom-prompt-title" placeholder="Title (optional)" class="p-1 w-100" size="75"
                    v-model="userTitle">
                </div>
                <textarea v-model="response" name="prompt_response" class="px-2 py-2 prompt-response" cols="30" rows="10"
                  style="border: none" placeholder="Type your response here"></textarea>
                <span class="flex justify-center gap-5">
                  <button @click="back"
                    class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button>
                  <button :class="{ 'opacity-25 cursor-not-allowed': response.length <= 0 }" @click="preview"
                    :disabled="response.length <= 0"
                    class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Next</button>
                </span>
                <span class="absolute bottom-1 right-1">Char: {{ responseCharCount }} Word: {{ responseWordCount }}</span>
              </div>
              <div v-else>
                <div class="p-10 mt-2 mb-10 bg-yellow-50 preview-text">{{ response }}</div>
                <div class="flex flex-col items-start my-5" id="share-options-container">
                  <h2 class="font-bold">Would you like to publish this response?</h2>
                  <div class="flex" id="sharing-options">

                    <span class="flex items-center gap-2 mt-2 mb-5 mr-5 align-middle">
                      <button @click="shareOption = option" v-for="option in shareSettings" :key="option"
                        class="w-1/3 h-24 border-2 rounded-md md:h-16 "
                        :class="option === shareOption ? 'bg-yellow-300 border-2 border-gray-600 font-bold border-2' : 'border-yellow-300 hover:bg-yellow-200'">{{
                          option }}</button>
                      <!-- <label for="private" class="mr-2">Keep Private</label>
                      <input type="radio" name="private" id="private" value="Keep Private" v-model="shareOption"></span>
                      
                    <span class="mr-5">
                      <label for="cc" class="mr-2">Publish under CC License</label>
                      <input type="radio" name="cc" id="cc" v-model="shareOption" value="Publish under CC License"></span>
                    <span class="mr-5">
                      <label for="private-for-now" class="mr-2">Keep Private For Now</label>
                      <input type="radio" name="private-for-now" id="private-for-now" value="Keep Private For Now" v-model="shareOption"> -->
                    </span>
                  </div>
                </div>
                <div class="flex justify-start" id="feedback-container">
                  <label for="feedback" class="mx-1 font-bold">How difficult was this to answer?</label>
                  <select name="feedback" id="feedback" v-model="difficulty">
                    <option value="None"></option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="SomewhatDifficult">Somewhat Difficult</option>
                    <option value="Difficult">Difficult</option>
                  </select>
                </div>
                <div class="flex justify-end gap-4 mt-5">
                  <button @click="backEdit"
                    class="p-2 font-bold bg-yellow-200 border-2 border-yellow-300 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button>
                  <button @click="submit"
                    class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Send</button>
                </div>
              </div>
            </span>
          </span>
        </div>
      </div>
      <div class="complete" v-if="submitted">
        <h2>Thanks for your submission! :)</h2>
      </div>
      <div v-if="prompts.length < 1">
        <h2>You are all caught up with your prompts, please check back later!</h2>
      </div>
    </div>
    <!-- <div class="loading">
        <img src="../assets/mikan-circle.png" alt="loading state image" class="absolute">
    </div> -->
    <div v-if="loading" style="border-top-color:transparent" id="loading-spinner-container"
      class="absolute w-16 h-16 border-4 border-yellow-300 border-solid rounded-full left-56 animate-spin">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shareSettings: ["Keep Private", "Keep Private For Now", "Share Under CC License"],
      prompts: [],
      activePrompt: null,
      response: "",
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
    };
  },
  created() {
    this.loading = true;
    if ( this.$route.params.email ) this.user = this.$route.params.email
    const URL =
      "https://script.google.com/macros/s/AKfycbztpBQ9d9Dmvmg_A2pqcdvHwCPC8X9mRVIxI-p9em1QOmb6FJHBOHVu_eFnZ_vXDqGP/exec?user=" +
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
        this.loading = false;
      } );
  },
  methods: {
    DoNotAsk( prompt ) {
      if ( confirm( "We will not ask you this question again in the future. Are you sure?" ) ) {
        console.log( "remove " + prompt.promptText )
      }
    },
    useCustomPrompt() {
      this.custom = true;
      this.activePrompt = "custom"
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
      const URL =
        "https://script.google.com/macros/s/AKfycbztpBQ9d9Dmvmg_A2pqcdvHwCPC8X9mRVIxI-p9em1QOmb6FJHBOHVu_eFnZ_vXDqGP/exec";

      const bodyData = {
        response: this.response,
        email: this.user,
        promptNumber: this.custom ? 0 : this.activePrompt.promptNumber,
        userTitle: this.userTitle,
        shareOption: this.shareOption,
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
      return this.response.trim().split( " " ).length
    },
    responseCharCount() {
      return this.response.length;
    },
    userCaughtUp() {
      return this.prompts.length < 1
    }
  },
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

#sharing-options {}</style>