<template>
    <div class="">
        <div class="my-5">
            <router-link to="/participants/new"><Button label="New" icon="pi pi-plus"></Button></router-link>
        </div>

        <DataTable :value="participants" class="mx-auto">
            <Column field="id" header="ParticipantID"></Column>
            <Column field="first_name" header="Name"><template #body="slotProps">{{ slotProps.data.first_name +  " " + slotProps.data.last_name }}</template></Column>
            <Column> <template #body="slotProps"> <router-link :to="'/participant/'+slotProps.data.id" class="text-blue-500 hover:text-blue-300"> View</router-link></template></Column>

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
        ...mapStores(useCounterStore),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'participants'] ),
    },
}
</script>

<style lang="scss" scoped></style>