<template>
    <div class="w-1/2 mx-auto ">
        <!-- <div v-html="greetings" class="p-12 my-24 bg-yellow-100 ">

        </div> -->
        <Editor class="my-10 bg-white" v-model="editedGreeting" style="height: 320px"></Editor>
        <div class="my-20">
            <button @click="submit" :disabled="submitButtonDisabled" class="p-2 font-bold rounded "
                :class="submitButtonDisabled ? 'bg-gray-300 border-2 border-gray-400' : 'hover:bg-yellow-200 border-yellow-400 bg-yellow-300 border-2 '">Submit</button>
        </div>
        <!-- <div v-html="response.response_text" class="p-12 my-24 bg-yellow-100 "> -->
        <!-- </div> -->
    </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'
import Editor from 'primevue/editor'

export default {
        props: {
        // greeting: {
        //     type: Object,
        //     default: () => {}
        // },
    },
    components: {
        Editor,
    },
    data() {
        return {
            editedGreeting: ''
        }
    },
    methods: {

        ...mapActions(useCounterStore, ['submitGreetings', 'editGreeting', 'toggleLoading', 'toggleError',]),
        async submit() {
            if (this.submitButtonDisabled) return;
            this.toggleLoading();
            await this.editGreeting(this.formData)
            this.toggleLoading();
            this.$router.push({ name: 'Confirm' })
        },
    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState(useCounterStore, ['count', 'prompts', 'responses', 'greetings', 'loading', 'error', 'usersPromptChoices', 'participants']),
        greeting() {
                return this.greetings.find(r => r.id == parseInt(this.$route.params.id))?.text
        },
        greetingID() {
            return this.$route.params.id
        },
        submitButtonDisabled() {
            return this.greeting.length < 1
        },
        formData() {
            return {
                text: this.editedGreeting,
                id: this.$route.params.id
            }
        },
    },
    mounted() {
        this.editedGreeting = this.greeting;
    },
}
</script>

<style lang="scss" scoped></style>