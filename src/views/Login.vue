<template>
    <div class="px-40 mx-auto">
        <div class="w-1/5">
            <h1 class="my-10 text-2xl font-bold">Login</h1>
            <form>
                <div class="flex flex-col w-full my-2"><label for="email">Email</label>
                <InputText id="email" type="text" v-model="email" /></div>

                <div class="flex flex-col w-full my-2" ><label for="password">Password</label>
                <Password id="password" v-model="password" :feedback="false" /></div>

                <div>
                    <Button @click="login">Login</Button>
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
// import { store } from '../stores/store';
export default {
    data() {
        return {
            email: '',
            password: 'rNs@Qc7Fj6xTj$sf'
        }
    },
    methods: {
        login() {
            supabase.auth.signInWithPassword({email: this.email, password: this.password}).then((res) =>{
                console.log(res)

            }).catch(err => console.log(err))
        }
    },
    components: {
        Password, InputText, Button
    },
    mounted () {

    },
}
</script>

<style lang="scss" scoped></style>