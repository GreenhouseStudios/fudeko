<template>
    <div class="flex justify-end">
   
     
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