<template>
    <div v-if="participantRecord" class="flex flex-col justify-end px-10 py-2">
        <div v-show="participantID" class="flex flex-col"><span v-if="participantID">Welcome Back, {{ participantRecord?.first_name }}</span>
        <a href="/logout" @click="clearParticipant" class="text-sm underline from-blue-400">Not {{ participantRecord?.email }}?</a></div>
        <!-- <router-link to="/login" v-if="!loggedInUser" class="text-lg">Login</router-link>
        <router-link to="/logout" v-if="loggedInUser" class="text-lg">Logout</router-link> -->
    </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'
export default {
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, [ 'loading', 'error', 'participantID','participantRecord'] ),
    },
    methods: {
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'login', 'logout'] ),
        clearParticipant(){
            localStorage.removeItem('participantID');
        }
    },
}
</script>

<style lang="scss" scoped>
nav a{
    text-decoration: underline;
}
</style>