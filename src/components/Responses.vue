<template>
    <div class="px-40">
       <!-- <h1 class="mt-5 text-xl font-bold text-left">Responses</h1> -->

        <DataTable :value="responses" class="mx-auto" sortField="created_at" :sortOrder="-1">
            <Column field="participant" header="Participant"><template #body="slotProps">{{ participants.find(p => p.id === slotProps.data.participant).first_name}}</template></Column>
            <Column field="created_at" sortable header="Date"><template #body="slotProps">{{ new Date(slotProps.data.created_at).toLocaleDateString() + " " + new Date(slotProps.data.created_at).toLocaleTimeString() }}</template></Column>
            <Column field="prompt" header="Prompt"></Column>
            <Column> <template #body="slotProps"> <router-link :to="'/responses/'+slotProps.data.id" class="text-blue-500 hover:text-blue-300"> View</router-link></template></Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, } from 'pinia'

export default {
    components: {
        DataTable, Column, 
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'participants'] ),
        
    },
}
</script>

<style lang="scss" scoped></style>