<template>
    <div class="px-48 my-5">
        <h1 class="mb-3 text-2xl font-bold">{{ userName }}</h1>
        <DataTable :value="userResponses" class="mx-auto">
            <Column field="prompt" header="Prompt"><template #body="slotProps">{{ slotProps.data.prompt }}</template></Column>
            <Column field="created_at" header="Date"><template #body="slotProps">{{ slotProps.data.created_at }}</template></Column>
            <Column> <template #body="slotProps"> <router-link :to="'/responses/'+slotProps.data.id" class="text-blue-500 hover:text-blue-300"> View</router-link></template></Column>
        </DataTable>

    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { useCounterStore } from '@/stores/store'
import { mapStores, mapState } from 'pinia'

export default {
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'usersPromptChoices', 'user', 'participants'] ),
        id() {
            return this.$route.params.id
        },
        userResponses() {
            return this.responses.filter(response => response.participant === parseInt(this.id))
        },
        userName(){
            return this.participants.find(p => p.id == this.id).first_name + " " + this.participants.find(p => p.id == this.id).last_name
        }
    },
    components: {
            DataTable, Column
        },
}
</script>

<style lang="scss" scoped></style>