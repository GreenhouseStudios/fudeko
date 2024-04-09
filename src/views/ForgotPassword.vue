<template>
    <div class="flex justify-center ">
        <form class="flex flex-col">
            <h1 class="text-2xl font-bold">Forgot Password?</h1>
            <div class="flex items-start flex-col w-full my-2">
                <label for="email">Email</label>
                <input class="border-2" id="email" type="text" v-model="email" />
            </div>
            <button v-if="!this.email"  @click="forgotPassword" class="p-2 my-2 bg-gray-300 border-2 border-gray-400"
                disabled>Continue</button>
            <button v-else @click="forgotPassword"
                class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">Continue</button>
        </form>
    </div>
</template>

<script>

// import Password from 'primevue/password';
// import InputText from 'primevue/inputtext';
// import Button from 'primevue/button'
import { supabase } from '../lib/supabaseClient';
// import { useCounterStore } from '@/stores/store'
// import { mapStores, mapState, mapActions } from 'pinia'
// import { store } from '../stores/store';
export default {
    data() {
        return {
            email: ''
        }
    },
    methods: {
        async forgotPassword() {
            await supabase.auth.resetPasswordForEmail( {email: this.email}, 
            )
        }
    },
    components: {
        // Password, InputText, Button
    },
    mounted() {

    },
    computed: {
        // mapStores() {
        //     return mapStores(useCounterStore)
        // },
        // mapState() {
        //     return mapState(useCounterStore, ['count', 'prompts', 'user', 'responses', 'loading', 'error', 'usersPromptChoices'])
        // },
        // name() {
        //     return this.data
        // }
    },
}
</script>

<style lang="scss" scoped>
#email,
#password {
    width: 250px
}
</style>