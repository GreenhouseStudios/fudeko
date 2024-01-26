<template>
    <div class="flex justify-center px-40 mx-auto">
        <div class="w-1/5">
            <h1 class="my-10 text-2xl font-bold">Login</h1>
            <form>
                <div class="flex flex-col w-full my-2"><label for="email">Email</label>
                <InputText id="email" type="text" v-model="email" /></div>

                <div class="flex flex-col w-full my-2" ><label for="password">Password</label>
                <Password id="password" v-model="password" :feedback="false" inputStyleClass="w-full" inputStyle="width: '100%'" style="width: '100%'"/></div>

                <div>
                    <Button @click="loginUser" class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">Login</Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
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
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'login'] ),
        async loginUser() {
            await supabase.auth.signInWithPassword({email: this.email, password: this.password}).then((res) =>{
            console.log(res)
            this.toggleLoading();
            this.login({email: this.email, password: this.password})
            // this.$router.push('/form/' + this.email)
            this.$router.push('/admin')
            this.toggleLoading();
            }).catch(err => console.log(err))
        }
    },
    components: {
        Password, InputText, Button
    },
    mounted () {

    },
    computed: {
        mapStores() {
            return mapStores( useCounterStore )
        },
        mapState() {
            return mapState( useCounterStore, ['count', 'prompts', 'user','responses', 'loading', 'error', 'usersPromptChoices'] )
        },
        name() {
            return this.data 
        }
    },
}
</script>

<style lang="scss" scoped></style>