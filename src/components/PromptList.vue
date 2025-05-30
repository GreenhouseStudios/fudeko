<template>
    <div>
        <!-- <Button @click="showPrompts" class="p-2 mb-2 border-black hover:bg-yellow-400 border-1">Reveal your prompts</Button> -->
        <div>
            <h2 class="font-bold text-center">Select one of the following prompts to answer this week:</h2>
            <span v-if="declinedPrompts.length < 3"
                class="flex flex-col justify-center gap-3 my-4 md:gap-5 grow md:flex-row" id="prompt-choices-container">
                <div class="relative" id="button-wrapper" v-for="prompt in randomizedPrompts" :key="prompt.prompt_text">
                    <button @click="setActivePrompt(prompt.id)"
                        class="w-full p-3 px-3 text-2xl font-bold bg-yellow-200 border-2 border-yellow-400 rounded shadow-md md:max-w-md md:p-1 md:h-36 animate__animated animate__fadeIn hover:bg-yellow-100"
                        :class="prompt === activePrompt ? 'bg-yellow-200' : 'bg-yellow-300'"
                        v-html="prompt.prompt_text">
                    </button>
                    <Button
                        class="absolute flex items-center justify-center w-8 h-8 font-bold text-center text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 hover:bg-red-300"
                        @click.prevent.stop="DoNotAsk(prompt)" v-tooltip="'Never ask this question again?'"
                        icon="pi pi-times" id="do-not-ask-btn"></Button>
                </div>
            </span>
            <span v-else>
                <div class="w-1/3 p-12 mx-auto bg-yellow-200 border-2 border-yellow-400">
                    <h1>You are caught up with your prompts! Please check again later for next week's prompts.</h1>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { supabase } from "../lib/supabaseClient";
import { mapStores, mapState } from 'pinia'
import Button from 'primevue/button';
export default {
    props: {
        prompts: {
            type: Array,
        },
    },
    data() {
        return {
            activePrompt: null,
            hidePrompts: true,
            declinedPrompts: [],
        }
    },
    methods: {
        // ...mapActions( useCounterStore, [ 'getWritingTip' ] ),
        showPrompts() {
            this.hidePrompts = false;
        },
        DoNotAsk(prompt) {
            if (confirm("We will not ask you this question again in the future. Are you sure?")) {
                console.log("remove " + prompt.prompt_text);
                this.declinedPrompts.push(prompt.id);
                supabase.rpc('create_decline', { prompt_id_value: prompt.id, participant_id_value: this.userRecord.id }).then((res) => {
                    console.log(res)
                })
            }
        },
        setActivePrompt(p) {
            this.activePrompt = p;
            // this.$emit( 'set-active-prompt', p );
            this.$router.push({ name: 'ResponseForm', params: { id: p } });
        },
    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState(useCounterStore, ['prompts', 'loading', 'error', 'usersPromptChoices', 'participants', 'responses', 'tips']),
        randomizedPrompts() {
            return this.usersPromptChoices.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value).filter(p => !this.declinedPrompts.includes(p.id));
        },
        userRecord() {
            return this.participants.find(p => p.email == this.$route.params.email);
        },
    },
    components: {
        Button,
    },
}
</script>

<style lang="scss" scoped>
#do-not-ask-btn{
    background: red;
    border-color: red;
    border-radius: calc(infinity*1px);
    width: 35px;
    height: 35px;
    position: absolute;
    top: -10px;
    right: -10px;
}
</style>