<template>
    <div class="w-1/2 mx-auto ">
        <h1 class="my-12 text-xl font-bold">{{ prompts.find(p => p.id == response.prompt).prompt_text }}</h1>
        <h2 class="text-lg font-bold">By: {{ this.participant.first_name + " " + this.participant.last_name }}</h2>
        <div v-html="response.response_text" class="p-12 my-24 bg-yellow-100 ">

        </div>
    </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'

export default {
    // props: {
    //     response: {
    //         type: Object,
    //         default: () => {}
    //     },
    // },
    data() {
        return {
        }
    },
    methods: {

        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', ] ),
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'usersPromptChoices', 'participants'] ),
        response() {
            return this.responses.find( r => r.id == this.$route.params.id )
        },
        participant() {
            return this.participants.find( p => p.id == this.response.participant )
        }
    },
}
</script>

<style lang="scss" scoped></style>