<template>
    <div class="w-1/2 mx-auto ">
        <h1 class="my-24 text-xl font-bold">{{ prompts.find(p => p.id == response.prompt).prompt_text }}</h1>
        <div v-html="response.response_text" class="p-12 my-24 bg-yellow-100 ">

        </div>
    </div>
</template>

<script>
import { supabase } from '../lib/supabaseClient';

async function getResponses() {
    const { data } = await supabase.from( 'responses' ).select()
    console.log( data )
    return data;
}

async function getPrompts() {
    const { data } = await supabase.from( 'prompts' ).select()
    console.log( data )
    return data;
}

export default {
    // props: {
    //     response: {
    //         type: Object,
    //         default: () => {}
    //     },
    // },
    data() {
        return {
            responses: [],
            prompts: []
        }
    },
    async mounted() {
        this.responses = await getResponses();
        this.prompts = await getPrompts();
    },
    computed: {
        response() {
            return this.responses.find( r => r.id == this.$route.params.id )
        }
    },
}
</script>

<style lang="scss" scoped></style>