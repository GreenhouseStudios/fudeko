<template>
    <section>
        <div v-if="participantRecord" class="flex flex-col justify-end py-2 md:px-10 md:mt-4 sm:mt-1 md:px-2">
            <div v-show="participantID" class="flex flex-col"><span v-if="participantID">Welcome Back, {{
                    participantRecord?.first_name }}</span>
                <router-link to="/logout" @click="clearParticipant" class="text-sm underline from-blue-400">Not {{
                    participantRecord?.email }}?</router-link>
            </div>
        </div>
        <div class="flex gap-1 m-5">
            <RouterLink to="/register" class="mr-4 text-lg font-black underline from-blue-400">Register</RouterLink>
            <RouterLink to="/login" class="mr-4 text-lg font-black underline from-blue-400">Login</RouterLink>
        </div>
    </section>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'
import { RouterLink } from 'vue-router';
// import Button from 'primevue/button'
export default {
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['loading', 'error', 'participantID', 'participantRecord'] ),
    },
    methods: {
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'login', 'logout'] ),
        clearParticipant() {
            localStorage.removeItem( 'participantID' );
            localStorage.removeItem( 'participantRecord' );
        }
    },
    components: {
        RouterLink,
    },
}
</script>

<style lang="scss" scoped>
nav a {
    text-decoration: underline;
}
</style>