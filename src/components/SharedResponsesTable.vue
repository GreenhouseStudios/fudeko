<template>
    <div class="">
        <div class="my-5">
        </div>
        <DataTable :value="joinedResponses" class="" sortField="created_at" :sortOrder="-1">
            <!-- <Column field="participant" header="Participant"><template></template></Column> -->
            <!-- <Column field="created_at" sortable header="Date">

                <template #body="slotProps" class="text-xs">{{ new
            Date(slotProps.data.created_at).toLocaleDateString() + " " + new
                Date(slotProps.data.created_at).toLocaleTimeString() }}</template>
            </Column> -->
            <Column field="prompt" header="Prompt"></Column>
            <Column field="responsePreview" header="Response"></Column>
            <Column>
                <template #body="slotProps"> <router-link :to="'/responses/' + slotProps.data.id"
                        class="p-2 text-white bg-blue-400 rounded-sm hover:bg-blue-500"> View</router-link></template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, } from 'pinia'
import { supabase } from '../lib/supabaseClient';

export default {
    components: {
        DataTable, Column
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState(useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'participants']),

        joinedResponses() {
            return this.responses.map(r => {
                if (r.share_option == "Share with Storytellers") {
                    return {
                        ...r,
                        prompt: this.prompts.find(p => p.id === r.prompt)?.prompt_text || "Custom",
                        participant: this.participants.find(p => p.id === r.participant)?.first_name,
                        responsePreview: r.response_text.slice(0, 50).replace(/<[^>]*>?/gm, '') + "..."
                    }
                }
            })
        }
    },
    methods: {
        async getUserInformations() {
            const { data: { user } } = await supabase.auth.getUser();
            this.userEmail = user?.email
        },
    },
    mounted() {
        this.getUserInformations();

    },
}
</script>

<style lang="scss" scoped></style>