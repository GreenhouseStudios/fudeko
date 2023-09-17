<template>
    <div class="container">
        <h1 class="text-3xl font-bold underline">Fudeko Prompt Form</h1>

        <br>
        <div class="prompt animate__animated animate__bounce" v-if="!userVerified">
            <label for="email">Enter your email address: </label>
            <input type="text" name="email" v-model="user" class="mr-8">
            <button @click="verifyUser">Submit</button>
        </div>
        <br>
        <div v-if="userVerified">
            <div v-for="prompt in prompts" :key="prompt.prompt_text">
                <span class="prompt">
                    <span class="prompt-header">
                        <p>{{ prompt.prompt_text }}</p>
                        <button v-if="activePrompt !== prompt" class="" @click="setActivePrompt(prompt)">Answer</button>
                    </span>

                    <span v-if="activePrompt === prompt">
                        <textarea v-model="response" name="prompt_response" class="prompt-response" cols="30" rows="20"
                            style="border: none"></textarea>
                        <button @click="submit">Submit</button>
                    </span>
                </span>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            prompts: [{ prompt_text: "What's your favorite way to spend a weekend?" },
            { prompt_text: "If you could have any superpower, what would it be and why?" },
            { prompt_text: "What's the last book you read or movie you watched that left an impact on you?" }],
            activePrompt: null,
            response: "",
            user: "",
            userVerified: false,
        }
    },
    methods: {
        setActivePrompt(p) {
            this.activePrompt = p;
        },
        submit() {
            alert(this.response)
        },
        verifyUser() {
            // const http = new XMLHttpRequest();
            const URL = "https://script.google.com/macros/s/AKfycbz833EfVPhK8M2HCXeY86mC0cmX17CYezquaOTvLzgGymrpkDer_6TIMBk98o23lW7U/exec" + "?user=" + this.user
            // http.open("GET",url)
            // http.send()

            // http.onreadystatechange = (e) => {
            //     console.log(e)
            //     if(e) this.userVerified = true;
            // }

            fetch(URL, {
                redirect: "follow",
                method: "GET",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            })
        }
    },
}
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