<template>
    <div class="grid my-24 place-content-center">

        <section v-if="!formSubmitted">
            <h1 class="text-3xl text-center">Set Password</h1>
            <div>
                <p class="text-center">Enter a password for your account.</p>
                <p>{{ userEmail }}</p>
            </div>
            <div class="flex flex-col justify-start max-w-xl my-5">
                <label for="password" class="pb-2 text-left">Password</label>
                <Password id="password" v-model="password" placeholder="Password"></Password>
                <p class="text-red-500" v-if="password.length < 6">Password must be at least 6 characters</p>
            </div>

            <Button @click="setPassword" class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400"
                :disabled="submitDisabled">Set Password</Button>
        </section>
        <section v-else>
            <h2 class="text-xl font-bold">Password successfully reset!</h2>
        </section>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/store';
const password = ref('');
const store = useCounterStore();
const router = useRouter();
const formSubmitted = ref(false);

const userEmail = computed(() => {
    return store.session.user?.email;
});

const submitDisabled = computed(() => {
    return (password.value.length < 6);
});

const setPassword = async () => {
    await store.setPassword(password.value);
    formSubmitted.value = true;
}

</script>