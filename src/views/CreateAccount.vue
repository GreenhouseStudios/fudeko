<template>
    <div class="flex justify-center ">
        <div class="">
            <h1 class="text-2xl font-bold">Create an Account</h1>
            <form class="flex flex-col" @submit.prevent="onSubmit">
                <div class="flex items-start flex-col w-full my-2">
                    <label for="email">Email</label>
                    <input class="border-2" id="email" type="text" v-model="email" />
                </div>
                <div class="flex items-start flex-col w-full my-2">
                    <label for="password">Password</label>
                    <input type="password" class="border-2" id="password" v-model="password" :feedback="false">
                </div>
                <div>
                    <input v-if="!this.email || !this.password" Button @click="signUp" type="submit"
                        class="p-2 my-2 bg-gray-300 border-2 border-gray-400" disabled value="Create Account">
                    <input v-else @click="signUp" type="submit" value="Create Account"
                        class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">
                </div>
            </form>
            <div class="flex items-center gap-2 my-3">
                <p>Already have an Account?</p><router-link to="/login" class="underline">Sign In</router-link>
            </div>
            <p id="error-message"></p>
        </div>
    </div>
</template>

<script>

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
        async signUp() {
            await supabase.auth.signUp({
                email: this.email,
                password: this.password,
            })
        },
    },
    components: {
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