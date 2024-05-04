<template>
    <div class="flex flex-col items-start justify-start">
        <h1 class="my-5 text-4xl font-bold">Hi, {{ this.participantRecord?.first_name }}</h1>
        <p>View your response history, a detailed review of each response, and the settings you chose for each here. </p>

        <ResponseRow :response="item" v-for="item in joinedResponses" :key="item" />
        <div>

            <router-link :to="'/form/' + this.participantRecord?.email"><Button
                    class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">View your weekly
                    prompts</Button></router-link>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState } from 'pinia'
import Button from 'primevue/button'
import ResponseRow from '@/components/ResponseRow.vue'
import { mapActions } from 'pinia';
import { supabase } from '../lib/supabaseClient';


export default {
    data() {
        return {
        }
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchAdminData']),
        async getUserInformations() {
            const { data: { user } } = await supabase.auth.getUser();
            this.userEmail = user?.email
        },
    },
    mounted() {
        this.fetchAdminData();
        this.getUserInformations();

    },
    components: {
        Button,
        ResponseRow
    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState(useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'usersPromptChoices', 'participants']),
        joinedResponses() {
            return this.responses.filter(r => r.participant == this.participants.find(p => p.email == this.userEmail)?.id).map(r => {
                return {
                    ...r,
                    promptQuestion: this.prompts.find(p => p.id === r.prompt)?.prompt_text || "Custom",
                    created: new Date(this.responses.find(p => p.id === r.id)?.created_at)?.toLocaleDateString("en-US", { month: "short",day: '2-digit'}),
                    responsePreview: (this.responses.find(p => p.id === r.id)?.response_text).replace(/<[^>]*>?/gm, '')


                }
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>