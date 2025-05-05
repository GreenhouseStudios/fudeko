<template>
    <!-- <Button @click="showPrompts" class="p-2 mb-2 border-black hover:bg-yellow-400 border-1">Reveal your prompts</Button> -->
    <div id="prompt-list">
        <h2 class="font-bold text-center">Select one of the following prompts to answer this week:</h2>
        <span v-if="declinedPrompts.length < 3"
            class="flex flex-col justify-center gap-3 my-4 md:gap-5 grow md:flex-row" id="prompt-choices-container">
            <PromptButton v-for="prompt in randomizedPrompts" :key="prompt.prompt_text" :prompt="prompt" 
                :setActivePrompt="setActivePrompt" :DoNotAsk="DoNotAsk" :activePrompt="activePrompt"
                class="w-full md:w-1/3">
            </PromptButton>
        </span>
        <span v-else>
            <div class="w-1/3 p-12 mx-auto bg-yellow-200 border-2 border-yellow-400">
                <h1>You are caught up with your prompts! Please check again later for next week's prompts.</h1>
            </div>
        </span>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { supabase } from "../lib/supabaseClient";
import { mapStores, mapState } from 'pinia'
import PromptButton from './form/PromptButton.vue';
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
        PromptButton
    },
}
</script>