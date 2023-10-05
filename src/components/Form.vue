<template>
  <div class="container relative px-8 md:w-1/2 sm:w-56">
    <h1 class="text-3xl font-bold underline">Fudeko Prompt Form</h1>

    <br />
    <!-- <div class="prompt animate__animated animate__bounce" v-if="!userVerified && !loading">
      <label for="email">Enter your email address: </label>
      <input type="text" name="email" v-model="user" class="mr-8" />
      <button @click="verifyUser" :class="{ 'opacity-25 cursor-not-allowed': user.length <= 0 }"
        :disabled="user.length <= 0"
        class="p-2 bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Submit</button>
    </div> -->

    <div v-if="error">
      <h2>The user you requested does not exist.</h2>
    </div>

    <br />
    <div v-if="userVerified && !loading">
      <div v-if="!submitted && prompts && !userCaughtUp">
        <div class="" v-if="!previewing"><span v-if="!activePrompt">
            <h2 class="font-bold">Select one of the following prompts to answer this week:</h2>
            <span class="flex gap-2 my-4">
              <button v-for="prompt in prompts" :key="prompt.promptText" @click="setActivePrompt(prompt)"
                class="w-1/3 p-5 px-3 bg-yellow-200 border-2 border-yellow-500 rounded animate__animated animate__fadeIn hover:bg-yellow-100"
                :class="prompt === activePrompt ? 'bg-yellow-200' : 'bg-yellow-400'">{{ prompt.promptText }}</button>

            </span>
            <h2 class="font-bold">Or use your own prompt</h2>
            <button @click="useCustomPrompt"
              class="w-1/3 p-5 px-3 bg-yellow-400 border-2 border-yellow-500 rounded animate__animated animate__fadeIn hover:bg-yellow-100">Custom
              Prompt</button>
          </span>
        </div>
        <div>
          <span v-if="activePrompt" class="prompt animate__animated animate__fadeInUp">
            <span class="flex flex-col prompt-header">
              <p class="font-bold">{{ activePrompt.promptText }}</p>
              <p v-if="previewing" class="mt-5 font-medium">Please confirm your submission text:</p>

            </span>

            <span>
              <div v-if="!previewing">
                <div>
                  <label for="custom-prompt-title">Entry Title: </label>
                  <input type="text" id="custom-prompt-title" placeholder="Title (optional)" class="w-100 p-1" v-model="userTitle">
                </div>
                <textarea v-model="response" name="prompt_response" class="px-2 py-2 prompt-response" cols="30" rows="10"
                  style="border: none" placeholder="Type your response here"></textarea>

                <!-- <button @click="submit" disabled="response.length <= 0" class="p-4 border-2 border-gray-400">Submit</button> -->
                <input type="submit" :class="{ 'opacity-25 cursor-not-allowed': response.length <= 0 }" @click="preview"
                  :disabled="response.length <= 0"
                  class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">
                <span class="absolute bottom-1 right-1">Char: {{ responseCharCount }} Word: {{ responseWordCount }}</span>
              </div>
              <div v-else>
                <div class="p-10 mt-2 mb-10 bg-yellow-50 preview-text">{{ response }}</div>
                <div class="flex flex-col items-start my-5" id="share-options-container">
                  <h2 class="font-bold">Would you like to publish this response?</h2>
                  <div class="flex">

                    <span class="mr-5">
                      <label for="private" class="mr-2">Keep Private</label>
                      <input type="radio" name="private" id="private" value="Keep Private" v-model="shareOption"></span>
                    <span class="mr-5">
                      <label for="cc" class="mr-2">Publish under CC License</label>
                      <input type="radio" name="cc" id="cc" v-model="shareOption" value="Publish under CC License"></span>
                    <span class="mr-5">
                      <label for="private-for-now" class="mr-2">Keep Private For Now</label>
                      <input type="radio" name="private-for-now" id="private-for-now" value="Keep Private For Now" v-model="shareOption"></span>
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
                <div class="flex justify-end gap-4">
                  <button @click="back"
                    class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button><button
                    @click="submit"
                    class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Confirm</button>
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
    <div v-if="loading" style="border-top-color:transparent"
      class="absolute w-16 h-16 border-4 border-yellow-300 border-solid rounded-full left-56 animate-spin"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    if(this.$route.params.email) this.user = this.$route.params.email
    const URL =
      "https://script.google.com/macros/s/AKfycbztpBQ9d9Dmvmg_A2pqcdvHwCPC8X9mRVIxI-p9em1QOmb6FJHBOHVu_eFnZ_vXDqGP/exec?user=" +
      this.$route.params.email;

    fetch(URL, {
      mode: "cors",
      redirect: "follow",
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["body"] == null) {
          this.error = true;
        }
        else {
          this.userVerified = true;
          this.prompts = data["body"].map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        }
        this.loading = false;
      });
  },
  methods: {
    useCustomPrompt() {
      this.custom = true;
      this.activePrompt = "custom"
    },
    setActivePrompt(p) {
      this.activePrompt = p;
    },
    preview() {
      this.previewing = true;
    },
    back() {
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
      fetch(URL, {
        mode: "no-cors",
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.text())
        .then((data) => {
          console.log(data);
          this.submitted = true;
          this.loading = false;
        });
    },
    verifyUser() {

    },
  },
  computed: {
    responseWordCount() {
      return this.response.split(" ").length - 1
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
  margin: 50px auto;
  justify-content: space-between;
  border: 2px solid rgb(255, 218, 150);
  padding: 1em;
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
</style>