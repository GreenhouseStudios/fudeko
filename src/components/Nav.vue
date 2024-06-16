<template>
    <div class="flex justify-end">
        <nav v-if="loggedInUser">
            <router-link to="/profile"> Logged in as {{ this.loggedInUser }} , <router-link to="/logout" @click="logout" class="text-yellow-600">Logout</router-link></router-link>
        </nav>
        <nav v-if="$route.name != 'Login'" >
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
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'usersPromptChoices', 'user', 'participantRecord', 'loggedInUser'] ),
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