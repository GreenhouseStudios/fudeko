<template>
    <div class="grid my-24 place-content-center">
        <div class="flex flex-col justify-start max-w-xl">
            <label for="email" class="pb-2 text-left">Email</label>
            <InputText id="email" v-model="email" placeholder="Email"></InputText>
        </div>

        <div class="flex flex-col justify-start max-w-xl my-5">
            <label for="password" class="pb-2 text-left">Password</label>
            <Password id="password" v-model="password" placeholder="Password"></Password>
            <p class="text-red-500" v-if="password.length < 6">Password must be at least 6 characters</p>
        </div>

        <div class="flex flex-col justify-start max-w-xl my-5">
            <label for="confirmPassword" class="pb-2 text-left">Confirm Password</label>
            <Password id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password"></Password>
            <p class="text-red-500" v-if="password != confirmPassword">Passwords do not match</p>
        </div>

        <Button @click="setPassword" class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400" :disabled="submitDisabled">Set Password</Button>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/store';
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const store = useCounterStore();
const router = useRouter();

const submitDisabled = computed(() => {
    return (password.value != confirmPassword.value || password.value.length < 6 || email.value.length < 1);
});

const setPassword = async () => {
    await store.setPassword({ email: email.value, password: password.value});
    router.push({ name: 'Confirm', params: {message: 'Password Set!'}});
}

</script>