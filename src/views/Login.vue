<template>
    <div class="flex justify-center ">
        <form @submit.prevent="onSubmit">
            <h1 class="text-2xl font-bold">Login</h1>
            <div class="flex flex-col">
                <div class="flex items-start flex-col w-full my-2">
                    <label for="email">Email</label>
                    <input class="border-2" id="email" type="text" v-model="email" />
                </div>
                <div class="flex items-start flex-col w-full my-2">
                    <label for="password">Password</label>
                    <input type="password" class="border-2" id="password" v-model="password" :feedback="false">
                </div>
                <router-link to="/forgotpassword" class="underline text-left">Forgot Password?</router-link>
                <div>
                    <input v-if="!this.email || !this.password" Button @click="loginUser" type="submit"
                        class="p-2 my-2 bg-gray-300 border-2 border-gray-400" disabled value="Login">
                    <input v-else @click="loginUser" type="submit"
                        class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400" value="Login">
                </div>
            </div>
            <div class="flex items-center gap-2 my-3"><p>Not Registered?</p> <router-link to="/createaccount" class="underline">Create an Account</router-link></div>
            <p id="error-message"></p>
        </form>
    </div>
</template>

<script>

// import Password from 'primevue/password';
// import InputText from 'primevue/inputtext';
// import Button from 'primevue/button'
import { supabase } from '../lib/supabaseClient';
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
// import { store } from '../stores/store';
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useCounterStore, ['toggleLoading', 'toggleError', 'login']),
        async loginUser() {
            await supabase.auth.signInWithPassword({ email: this.email, password: this.password }).then((res) => {
                console.log(res)
                this.toggleLoading();
                if (res.data.user && !res.error) {
                    this.login({ email: this.email, password: this.password })
                    this.$router.push('/previousresponses')
                    console.log("correct")
                    // this.$router.push('/previousresponses')
                }
                else {
                    document.querySelector('#error-message').innerHTML = "Invalid Login Credentials"
                }
                this.toggleLoading();
                console.log("kasjhdksahdkasjhdskahdsakh")
            }).catch(err => console.log(err))
        }
    },
    components: {
        // Password, InputText, Button
    },
    mounted() {

    },
    computed: {
        mapStores() {
            return mapStores(useCounterStore)
        },
        mapState() {
            return mapState(useCounterStore, ['count', 'prompts', 'user', 'responses', 'loading', 'error', 'usersPromptChoices'])
        },
    },
}
</script>

<style lang="scss" scoped>
#email,
#password {
    width: 250px
}</style>