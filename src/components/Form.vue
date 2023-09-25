<template>
  <div class="container relative px-8 md:w-1/2 sm:w-56">
    <h1 class="text-3xl font-bold underline">Fudeko Prompt Form</h1>

    <br />
    <div class="prompt animate__animated animate__bounce" v-if="!userVerified && !loading">
      <label for="email">Enter your email address: </label>
      <input type="text" name="email" v-model="user" class="mr-8" />
      <button @click="verifyUser">Submit</button>
    </div>
    <br />
    <div v-if="userVerified && !loading">
      <div v-if="!submitted && prompts">
        <div v-for="prompt in prompts" :key="prompt.prompt_text">
          <span class="prompt animate__animated animate__fadeInDown">
            <span class="prompt-header">
              <p>{{ prompt.promptText }}</p>
              <button
                v-if="activePrompt !== prompt"
                class=""
                @click="setActivePrompt(prompt)"
              >
                Answer
              </button>
            </span>

            <span v-if="activePrompt === prompt">
              <textarea
                v-model="response"
                name="prompt_response"
                class="px-2 py-2 prompt-response"
                cols="30"
                rows="20"
                style="border: none"
                placeholder="Type your response here"
              ></textarea>
              <button @click="submit">Submit</button>
              <span class="absolute bottom-1 right-1">Char: {{ responseCharCount }} Word: {{ responseWordCount }}</span>
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
    <div v-if="loading" style="border-top-color:transparent" class="absolute w-16 h-16 border-4 border-yellow-300 border-solid rounded-full left-56 animate-spin"></div>
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
    };
  },
  methods: {
    setActivePrompt(p) {
      this.activePrompt = p;
    },
    submit() {
      if(this.response.split(' ').length < 100 || this.response.length < 200) return
      this.loading = true;
      const URL =
        "https://script.google.com/macros/s/AKfycbztpBQ9d9Dmvmg_A2pqcdvHwCPC8X9mRVIxI-p9em1QOmb6FJHBOHVu_eFnZ_vXDqGP/exec";

      const formData = new FormData();
      formData.append("email", this.user);
      formData.append("promptNum", this.activePrompt.promptNumber);
      formData.append("response", this.response);
      const bodyData = {
        response: this.response,
        email: this.user,
        promptNumber: this.activePrompt.promptNumber,
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
      this.loading = true;
      const URL =
        "https://script.google.com/macros/s/AKfycbztpBQ9d9Dmvmg_A2pqcdvHwCPC8X9mRVIxI-p9em1QOmb6FJHBOHVu_eFnZ_vXDqGP/exec?user=" +
        this.user;

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
          this.userVerified = true;
          this.prompts = data["body"];
          this.loading = false;
        });
    },
  },
  computed: {
    responseWordCount(){
      return this.response.split(" ").length - 1
    },
    responseCharCount(){
      return this.response.length;
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
}

.prompt-header {
  display: flex;
  justify-content: space-between;
}

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

  button {
    background-color: orange;
    border: none;
    padding: 1em;
    border-radius: 5px;

    &:hover {
      background-color: rgb(253, 199, 99);
    }
  }

  p {
    display: inline;
    margin-right: 10px;
  }
}
</style>