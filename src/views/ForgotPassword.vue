<template>
    <div class="flex flex-col gap-5 mx-auto text-left w-1/2">
        <h1>Forgot Password</h1>
        <p>Enter your email address to reset your password.</p>
        <div>
            <div class="form-group">
                <FormKit type="email" id="email" label="Email" v-model="email" required />
            </div>
            <Button @click="submitForm"  class="mt-12">Submit</Button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import { supabase } from '../lib/supabaseClient';

const email = ref('');
const formSubmitted = ref(false);
const submitForm = () => {
    console.log(email.value);
    try{
    supabase.auth.resetPasswordForEmail(email.value,{redirectTo: 'https://fudeko.netlify.app/resetpassword',});
    formSubmitted.value = true;
    }catch(e){
        console.log(e);
    }
};
</script>

<style scoped>

</style>