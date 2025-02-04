<template>
    <div class="flex justify-center ">
        <div class="h-screen py-24">
            <h1 class="text-2xl font-bold">Admin Login</h1>
            <!-- <form class="flex flex-col"> -->
                <div class="flex flex-col items-start w-full my-2">
                    <label for="email">Email</label>
                    <input class="border-2" id="email" type="text" v-model="email" />
                </div>
                <div class="flex flex-col items-start w-full my-2">
                    <label for="password">Password</label>
                    <input type="password" class="border-2" id="password" v-model="password" :feedback="false">
                </div>
                <div>
                    <button v-if="!this.email || !this.password" Button @click="loginUser"
                        class="p-2 my-2 bg-gray-300 border-2 border-gray-400" disabled>Login</button>
                    <button v-else @click="loginUser"
                        class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">Login</button>
                </div>
            <!-- </form> -->
            <p id="error-message"></p>
        </div>
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
        ...mapActions(useCounterStore, ['toggleLoading', 'toggleError', 'loginAdmin']),
        async loginUser() {
            await supabase.auth.signInWithPassword({ email: this.email, password: this.password }).then((res) => {
                console.log(res)
                this.toggleLoading();
                if (res.data.user && !res.error) {
                    this.loginAdmin({ email: this.email, password: this.password })
                    this.$router.push('/admin')
                }
                else {
                    document.querySelector('#error-message').innerHTML = "Invalid Login Credentials"
                }
                this.toggleLoading();
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
        name() {
            return this.data
        }
    },
}
</script>

<style lang="scss" scoped>
#email,
#password {
    width: 250px
}</style>