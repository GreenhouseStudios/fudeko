<template>
    <div class="mx-auto max-w-[1200px]">
        <div class="my-5">
            <router-link v-if="!user" to="/responses/new"><Button label="New" icon="pi pi-plus"></Button></router-link>
        </div>

        <DataTable :value="joinedResponses" class="" sortField="created_at" :sortOrder="-1" >
            <Column v-if="!user" field="participant" header="Participant"><template></template></Column>
            <Column field="created_at" sortable header="Date">
            <template #body="slotProps" class="text-xs">{{ new
            Date(slotProps.data.created_at).toLocaleDateString() + " " + new
            Date(slotProps.data.created_at).toLocaleTimeString() }}</template>
            </Column>
            <Column field="prompt" header="Prompt"></Column>
            <Column field="responsePreview" header="Response"></Column>
            <Column>
            <template #body="slotProps"> <router-link :to="'/responses/' + slotProps.data.id"
                class="p-2 text-white bg-blue-400 rounded-sm hover:bg-blue-500"> View</router-link></template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCounterStore } from '@/stores/store';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps({
    user: {
    type: Object,
    required: false
    }
});

const store = useCounterStore();

const joinedResponses = computed(() => {
    return store.responses.map(r => {
    if (props.user) {
        return {
        ...r,
        prompt: store.prompts.find(p => p.id === r.prompt)?.prompt_text || "Custom",
        responsePreview: r.response_text?.slice(0, 50).replace(/<[^>]*>?/gm, '') + "..."
        }
    } else {
        return {
        ...r,
        prompt: store.prompts.find(p => p.id === r.prompt)?.prompt_text || "Custom",
        participant: store.participants.find(p => p.id === r.participant)?.first_name,
        responsePreview: r.response_text?.slice(0, 50).replace(/<[^>]*>?/gm, '') + "..."
        }
    }
    });
});
</script>

<style lang="scss" scoped></style>
