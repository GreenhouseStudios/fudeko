<template>
    <div class="w-1/2 mx-auto py-5" v-if="prompt">
        <h1 class="text-lg font-bold mb-5">Edit Prompt</h1>

        <h2 class="text-left">Prompt Text</h2>
        <Editor v-model="text" class=" mb-24 " :style="{ height: '100px' }"></Editor>
        <h2 class="text-left">Subtext</h2>
        <Editor v-model="subtext" class="mb-24 " :style="{ height: '100px' }"></Editor>

        <div class="py-5">
            <h2 class="text-left">Prompt Positivity</h2>
            <Dropdown :options="promptAssociations"
                v-model="positivity"  class="w-1/2"></Dropdown>
        </div>

        <div class="py-5">
            <h2 class="text-left">Prompt Difficulty</h2>
            <Dropdown
                :options="promptDifficulties"
                v-model="difficulty" class="w-1/2"></Dropdown>
        </div>

        <div class="py-5">
            <h2 class="text-left">Prompt Familiarity</h2>
            <Dropdown :options="promptFamiliarities"
                v-model="familiarity"  class="w-1/2"></Dropdown>
        </div>

        <div class="py-5"> <button label="Submit" @click="submit"
                class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Submit</button>
        </div>
    </div>
    <div class="w-1/2 mx-auto " v-else>
        <h1 class="text-lg font-bold">Edit Prompt</h1>
        <p>Could not find prompt</p>

    </div>
</template>

<script>
import Editor from 'primevue/editor';
import Dropdown from 'primevue/dropdown';
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'

export default {
    components: {
        Editor, Dropdown
    },
    data() {
        return {
            text: "",
            subtext: "",
            positivity: "",
            difficulty: "", 
            familiarity: ""
        }
    },
    mounted() {
        this.text = this.prompt.prompt_text;
        this.subtext = this.prompt.prompt_subtext;
        this.positivity = this.prompt.prompt_positivity;
        this.difficulty = this.prompt.prompt_difficulty;
        this.familiarity = this.prompt.prompt_familiarity;
    },
    methods: {

        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'getUserPrompts', 'updatePrompt'] ),
        submit() {
            this.toggleLoading();
            this.updatePrompt( this.prompt.id, this.promptData ).then( () => {
                this.toggleLoading();
                this.$router.push( '/admin' );
            } ).catch( () => {
                this.toggleLoading();
                this.toggleError();
            } )
        },

    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'usersPromptChoices', 'promptDifficulties', 'promptFamiliarities', 'promptAssociations'] ),
        prompt() {
            return this.prompts.find( p => p.id == parseInt( this.$route.params.id ) )
        },
        promptData(){
            return {
                prompt_text: this.text,
                prompt_subtext: this.subtext,
                prompt_positivity: this.positivity,
                prompt_difficulty: this.difficulty,
                prompt_familiarity: this.familiarity
            }
        }
    },
}
</script>

<style lang="scss" scoped></style>