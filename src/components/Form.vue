<template>
  <div class="container">
    <h1 class="text-3xl font-bold underline">Fudeko Prompt Form</h1>

    <br />
    <div class="prompt animate__animated animate__bounce" v-if="!userVerified">
      <label for="email">Enter your email address: </label>
      <input type="text" name="email" v-model="user" class="mr-8" />
      <button @click="verifyUser">Submit</button>
    </div>
    <br />
    <div v-if="userVerified">
      <div v-if="!submitted && prompts">
        <div v-for="prompt in prompts" :key="prompt.prompt_text">
          <span class="prompt">
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
                class="prompt-response"
                cols="30"
                rows="20"
                style="border: none"
              ></textarea>
              <button @click="submit">Submit</button>
            </span>
          </span>
        </div>
      </div>
      <div class="complete" v-else>
          <h2>Thanks for your submission! :)</h2>
        </div>
    </div>
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
    };
  },
  methods: {
    setActivePrompt(p) {
      this.activePrompt = p;
    },
    submit() {
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
        });
    },
    verifyUser() {
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
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 30%;
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