<template>
    <div class="w-1/2 mx-auto text-left ">
        <div>
            <h3>Prompt: {{ promptText.prompt_text }}</h3>
            <h4>Submitted: {{ new Date(response.created_at).toLocaleDateString() }}</h4>
        </div>
        <div  class="relative p-12 my-24 bg-yellow-100 " v-if="!editing">
            <Button @click="editing = !editing" class="absolute top-0 right-0 p-2 mt-2 mr-2 font-bold shadow-sm text-md hover:bg-yellow-200" icon="pi pi-pencil">Edit </Button>
            <div v-html="response.response_text">

            </div>

        </div>
        <div v-if="editing" class="my-20">
            <Editor class="my-20 bg-white" v-model="responseBody" style="height: 320px" placeholder="Type your response here">
            </Editor>
            <Button @click="saveResponse" class="absolute top-0 right-0 p-2 mt-2 mr-2 font-bold shadow-sm text-md hover:bg-yellow-200" icon="pi pi-pencil">Save </Button>
        </div>

    </div>
</template>

<script lang="ts">
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'
import Button from 'primevue/button';
import Editor from "primevue/editor";

export default {

    data() {
        return {
            editing: false,
            responseBody: "",
        }
    },
    components: {
        Button,
        Editor,
    },
    methods: {

        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError','updateResponse'] ),
        async saveResponse() {
            await this.updateResponse( this.response );
            this.response.response_text = this.responseBody;
            this.editing = false;
            
        },
    },
    mounted () {
        this.responseBody = this.response.response_text;
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['prompts', 'responses', 'loading', 'error', 'usersPromptChoices', 'participants'] ),
        response() {
            return this.responses.find( r => r.id == this.$route.params.id )
        },
        participant() {
            return this.participants.find( p => p.id == this.response.participant )
        },
        promptText(){
            return this.prompts.find( p => p.id == this.response.prompt )    
        }
    },
}
</script>

<style lang="scss" scoped></style>