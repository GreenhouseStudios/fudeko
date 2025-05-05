<template>
    <div class="w-1/2 mx-auto my-5">
        <h1 class="text-2xl font-bold">Create/Edit Prompt</h1>
        <form class="flex flex-col gap-3">
            <!-- <label for="prompt_text">Prompt Text: </label> -->
            <!-- <InputText v-model="prompt_text" name="prompt_text"></InputText> -->

            <span class="flex gap-2"> <label for="prompt_text">Prompt Text: </label>
                <Textarea class="flex-grow" v-model="prompt_text" name="prompt_text"></Textarea></span>
            <span class="flex gap-2">
                <label for="prompt_subtext">Prompt Sub Text: </label>
                <Textarea class="flex-grow" name="prompt_subtext" v-model="prompt_subtext"></Textarea></span>


            <span class="flex gap-2">
                <label for="prompt_positivity">Prompt Positivity: </label>
                <Dropdown v-model="prompt_positivity" name="prompt_positivity" :options="positivityValues"
                    placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
                    <template #option="slotProps">
                        {{ slotProps.option }}
                    </template>
                </Dropdown>
            </span>

            <span class="flex gap-2"> <label for="prompt_difficulty">Prompt Difficulty: </label>
                <Dropdown v-model="prompt_difficulty" name="prompt_difficulty" :options="difficultyValues"
                    placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
                    <template #option="slotProps">
                        {{ slotProps.option }}
                    </template>
                </Dropdown>
            </span>

            <span class="flex gap-2"><label for="prompt_familiarity">Prompt Familiarity: </label>
                <Dropdown v-model="prompt_familiarity" name="prompt_familiarity" :options="familiarityValues"
                    placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
                    <template #option="slotProps">
                        {{ slotProps.option }}
                    </template>
                </Dropdown>
            </span>
            <Button label="Submit" :disabled="!formValid" @click="submit"></Button>
        </form>
    </div>
</template>

<script>
// import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'
import _ from 'lodash';
export default {
    data() {
        return {
            prompt_text: "",
            prompt_subtext: "",
            prompt_positivity: "",
            prompt_difficulty: "",
            prompt_familiarity: "",
        }
    },
    methods: {
        submit: function () {
            this.toggleLoading();
            this.submitPrompt( this.promptObj );
            this.toggleLoading();
            // console.log( this.prompt_text );
            // console.log( this.prompt_subtext );
            // console.log( this.prompt_positivity );
            // console.log( this.prompt_difficulty );
            // console.log( this.prompt_familiarity );

        },
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'submitPrompt'] ),
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'participants'] ),
        positivityValues: function () {
            return _.uniq( this.prompts.map( r => r.prompt_positivity ) );
        },
        difficultyValues: function () {
            return _.uniq( this.prompts.map( r => r.prompt_difficulty ) );
        },
        familiarityValues: function () {
            return _.uniq( this.prompts.map( r => r.prompt_familiarity ) );
        },
        formValid: function () {
            return this.prompt_text != "" && this.prompt_subtext != "" && this.prompt_positivity != "" && this.prompt_difficulty != "" && this.prompt_familiarity != "";
        },
        promptObj: function () {
            return {
                prompt_text: this.prompt_text,
                prompt_subtext: this.prompt_subtext,
                prompt_positivity: this.prompt_positivity,
                prompt_difficulty: this.prompt_difficulty,
                prompt_familiarity: this.prompt_familiarity,
            }
        }
    },
    components: {

        // InputText,
        Textarea, Button, Dropdown
    },
}
</script>

<style lang="scss" scoped></style>