<template>
    <div class="flex justify-end">
        <nav v-if="user">
            <span> Logged in as {{ this.user.email }} , <router-link to="/logout" @click="logout" class="text-yellow-600">Logout</router-link></span>
        </nav>
        <nav v-else>
            <router-link to="/login" class="text-yellow-600">Login</router-link>
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