<template>
    <div class="flex justify-center ">
        <div v-if="!emailSent">
            <h1 class="text-2xl font-bold">✨ Magic Login ✨</h1>
            <form class="flex flex-col">
                <div class="flex flex-col items-start w-full my-2">
                    <label for="email">Email</label>
                    <input id="email" type="text" v-model="email" class="border-2" />
                </div>

                <div>
                    <Button @click="loginUser" 
                        class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400" :disabled="!validEmail">Login</Button>
                </div>
            </form>

        </div>
        <div v-else>
            <h1>Check your email for a magic link to login</h1>
        </div>
    </div>
</template>

<script>

// import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import { supabase } from '../lib/supabaseClient'
// import { store } from '../stores/store';
export default {
    data() {
        return {
            email: '',
            emailSent: false,
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'login'] ),
        async loginUser() {
            // eslint-disable-next-line no-unused-vars
            const { data, error } = await supabase.auth.signInWithOtp( {
                email: this.email,
                options: {
                    // set this to false if you do not want the user to be automatically signed up
                    shouldCreateUser: false,
                    // emailRedirectTo: 'https://fudeko.netlify.app/profile/',
                    emailRedirectTo: 'https://localhost:8080/profile/',
                },

            } ).then( ( data ) => {
                console.log( data );
                this.emailSent = true;
                this.login( this.email)
            } ).catch( ( error ) => {
                console.log( error );
            } )
            // this.login( this.email )
            // this.$router.push('/form/' + this.email)
        }
    },
    components: {
        Button
    },
    mounted() {

    },
    computed: {
        mapStores() {
            return mapStores( useCounterStore )
        },
        mapState() {
            return mapState( useCounterStore, ['count', 'prompts', 'user', 'loading', 'error'] )
        },
        validEmail() {
            return /^\S+@\S+\.\S+$/.test( this.email );
        }
    },
}
</script>

<style lang="scss" scoped>
#email {
    width: 250px
}
</style>