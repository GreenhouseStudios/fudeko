<template>
    <div class="px-40">
       <h1 class="my-5 text-xl">Responses</h1>

        <DataTable :value="responses" class="mx-auto">
            <Column field="id" header="ResponseID"></Column>
            <Column field="participant" header="ParticipantID"><template #body="slotProps">{{ slotProps.data.participant }}</template></Column>
            <Column field="prompt" header="Prompt"></Column>
            <Column> <template #body="slotProps"> <router-link :to="'/responses/'+slotProps.data.id" class="text-blue-500 hover:text-blue-300"> View</router-link></template></Column>

        </DataTable>
    </div>
</template>

<script>
import { supabase } from '../lib/supabaseClient';

// import Button from 'primevue/button';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';   // optional
// import Row from 'primevue/row';                   // optional

async function getParticipants() {
    const { data } = await supabase.from('participants').select()
    console.log(data)
    return data;
  }
  
async function getResponses() {
    const { data } = await supabase.from( 'responses' ).select()
    console.log( data )
    return data;
}
export default {
    components: {
        DataTable, Column, 
    },
    data() {
        return {
            responses: [],
            participants: []
        }
    },
    async mounted() {
        this.responses = await getResponses();
        this.participants = await getParticipants();
    },
}
</script>

<style lang="scss" scoped></style>