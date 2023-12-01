<template>
    <div class="px-40">
       <!-- <h1 class="mt-5 text-xl font-bold text-left">Participants</h1> -->

        <DataTable :value="participants" class="mx-auto">
            <Column field="id" header="ParticipantID"></Column>
            <Column field="first_name" header="Name"><template #body="slotProps">{{ slotProps.data.first_name +  " " + slotProps.data.last_name }}</template></Column>
            <Column> <template #body="slotProps"> <router-link :to="'/participant/'+slotProps.data.id" class="text-blue-500 hover:text-blue-300"> View</router-link></template></Column>

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