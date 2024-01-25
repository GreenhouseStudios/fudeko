<template>
    <div>
        <!-- <Button @click="showPrompts" class="p-2 mb-2 border-black hover:bg-yellow-400 border-1">Reveal your prompts</Button> -->
        <div >
            <h2 class="font-bold text-center">Select one of the following prompts to answer this week:</h2>
            <span class="flex flex-col justify-center gap-3 my-4 md:gap-5 grow md:flex-row" id="prompt-choices-container">
                <div class="relative" id="button-wrapper" v-for="prompt in randomizedPrompts" :key="prompt.prompt_text">
                    <button @click="setActivePrompt(prompt.id)"
                        class="w-full p-3 px-3 bg-yellow-200 border-2 border-yellow-400 rounded shadow-md md:max-w-md md:p-1 md:h-36 animate__animated animate__fadeIn hover:bg-yellow-100"
                        :class="prompt === activePrompt ? 'bg-yellow-200' : 'bg-yellow-300'">{{ prompt.prompt_text
                        }}</button>
                    <button
                        class="absolute flex items-center justify-center w-8 h-8 font-bold text-center bg-red-500 border-2 border-white rounded-full -top-2 -right-2 hover:bg-red-300"
                        @click.prevent.stop="DoNotAsk(prompt)" v-tooltip="'Never ask this question again?'"></button>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { supabase } from "../lib/supabaseClient";
import { mapStores, mapState } from 'pinia'
// import Button from 'primevue/button';
export default {
    props: {
        prompts: {
            type: Array,
        },
        declinedPrompts: {
            type: Array,
        },
    },
    data() {
        return {
            activePrompt: null,
            hidePrompts: true,
        }
    },
    methods: {
        // ...mapActions( useCounterStore, [ 'getWritingTip' ] ),
        showPrompts(){
            this.hidePrompts = false;
        },
        DoNotAsk( prompt ) {
            if ( confirm( "We will not ask you this question again in the future. Are you sure?" ) ) {
                console.log( "remove " + prompt.promptText );
                this.declinedPrompts.push( prompt.promptNumber );
                // this.prompts = this.prompts.filter( p => p.promptText !== prompt.promptText );
                supabase.rpc( 'create_decline', { prompt_id_value: prompt.id, participant_id_value: this.userRecord.id } ).then( ( res ) => {
                    console.log( res )
                } )
            }
        },
        setActivePrompt( p ) {
            this.activePrompt = p;
            // this.$emit( 'set-active-prompt', p );
            this.$router.push( { name: 'ResponseForm', params: { id: p } } );
        },
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['prompts', 'loading', 'error', 'usersPromptChoices', 'participants', 'responses', 'tips'] ),
        randomizedPrompts() {
            return this.usersPromptChoices.map( value => ( { value, sort: Math.random() } ) )
                .sort( ( a, b ) => a.sort - b.sort )
                .map( ( { value } ) => value );
        },
    },
    components: {
        // Button,
    },
}
</script>

<style lang="scss" scoped></style>