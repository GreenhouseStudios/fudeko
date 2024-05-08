<template>
    <div class="w-1/2 mx-auto ">
        <!-- <div v-html="greetings" class="p-12 my-24 bg-yellow-100 ">

        </div> -->
        <p v-html="greetingID"></p>
        <p v-html="greeting"></p>
        <router-link :to="'/greetings/edit/' + this.$route.params.id "><button>Edit</button></router-link>
        <!-- <div v-html="response.response_text" class="p-12 my-24 bg-yellow-100 "> -->
    <!-- </div> -->
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
        ...mapState( useCounterStore, ['count', 'prompts', 'responses','greetings', 'loading', 'error', 'usersPromptChoices', 'participants'] ),
        greeting() {
            return this.greetings.find(r => r.id == parseInt(this.$route.params.id) )?.text
        },
        greetingID(){
            return this.$route.params.id
        },
        // response() {
        //     return this.responses.find( r => r.id == this.$route.params.id )
        // },
    },
}
</script>

<style lang="scss" scoped></style>