<template>
    <div class="flex justify-center ">
        <div class="h-screen py-24">
            <h1 class="text-2xl font-bold">Admin Login</h1>

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

            <p id="error-message" class="text-red-500"></p>
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
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'loginAdmin'] ),
        async loginUser() {
            // const adminCheck = await supabase.rpc( 'is_user_admin', { email: this.email } );
            const { data, error } = await supabase.from('user_roles').select('email').eq('email', this.email);
            console.log( data );
            if ( data.length === 0 ) {
                document.querySelector( '#error-message' ).innerHTML = "Invalid Login Credentials";
                return false;
            }
            else {

                this.toggleLoading();
                await supabase.auth.signInWithPassword( { email: this.email, password: this.password } )
                    .then( ( res ) => {
                        if ( res.data.user && !res.error ) {
                            this.loginAdmin( { email: this.email, password: this.password } );
                            this.$router.push( '/admin' );
                        }
                    } )
                    .catch( err => console.log( err ) )
                    .finally( () => {
                        this.toggleLoading();
                    } );
            }
        }
    },
    components: {
        // Password, InputText, Button
    },
    mounted() {

    },
    computed: {
        mapStores() {
            return mapStores( useCounterStore )
        },
        mapState() {
            return mapState( useCounterStore, ['count', 'prompts', 'user', 'responses', 'loading', 'error', 'usersPromptChoices'] )
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
}
</style>