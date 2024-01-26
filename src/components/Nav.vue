<template>
    <div class="flex justify-end">
        <nav v-if="user">
            <router-link to="/admin" class="text-yellow-600">Admin</router-link> |
            <router-link to="/logout" @click="logout" class="text-yellow-600">Logout</router-link>
            <!-- <img src="../assets/mikan-circle.png" alt="fudeko mikan logo" class="inline w-4 pt-5 mx-auto md:w-8"> -->
        </nav>
        <nav v-else>
            <router-link to="/" class="text-yellow-600">Home</router-link> |
            <router-link to="/login" class="text-yellow-600">Login</router-link>
            <!-- <img src="../assets/mikan-circle.png" alt="fudeko mikan logo" class="inline w-4 pt-5 mx-auto md:w-8"> -->
        </nav>
    </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'
export default {
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'usersPromptChoices', 'user'] ),
    },
    methods: {
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'login', 'logout'] ),
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
nav a{
    text-decoration: underline;
}
</style>