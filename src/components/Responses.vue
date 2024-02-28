<template>
    <div class="px-40">
        <div class="my-5">
            <router-link to="/responses/new"><Button label="New" icon="pi pi-plus"></Button></router-link>
        </div>
        <DataTable :value="responses" class="mx-auto" sortField="created_at" :sortOrder="-1">
            <Column field="participant" header="Participant"><template #body="slotProps">{{ participants.find(p => p.id ===
                slotProps.data.participant).first_name }}</template></Column>
            <Column field="created_at" sortable header="Date"><template #body="slotProps">{{ new
                Date(slotProps.data.created_at).toLocaleDateString() + " " + new
                    Date(slotProps.data.created_at).toLocaleTimeString() }}</template></Column>
            <Column field="prompt" header="Prompt"></Column>
            <Column> <template #body="slotProps"> <router-link :to="'/responses/' + slotProps.data.id"
                        class="text-blue-500 hover:text-blue-300"> View</router-link></template></Column>
        </DataTable>
    </div>
</template>

<script>
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, } from 'pinia'

export default {
    components: {
        DataTable, Column, Button
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'participants'] ),

    },
}
</script>

<style lang="scss" scoped></style>