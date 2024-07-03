<template>
    <div class="">
        <div class="my-5">
            <router-link to="/participants/new"><Button label="New" icon="pi pi-plus"></Button></router-link>
        </div>

        <!-- <div>
           <Checkbox v-model="showTestUsers" value="1" inputId="cb1"></Checkbox>
           <label for="cb1" class="pl-2">Show Test Users</label>
        </div> -->
        <DataTable :value="filteredParticipants" class="mx-auto">
            <Column field="id" header="ParticipantID"></Column>
            <Column field="first_name" header="Name"><template #body="slotProps">{{ slotProps.data.first_name +  " " + slotProps.data.last_name }}</template></Column>
            <Column field="email" header="Email"></Column>
            <Column field="partner_email" header="Partner Email"></Column>
            <Column field="status" header="Status"></Column>
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
// import Checkbox from 'primevue/checkbox';
export default {
    components: {
        DataTable, Column, Button, 
        // Checkbox
    },
    data() {
        return {
            showTestUsers: false,
        }
    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'participants'] ),
        filteredParticipants(){
            return this.participants.filter( p => this.showTestUsers ? true : p.status == 'active' )
        }
    },
}
</script>

<style lang="scss" scoped></style>