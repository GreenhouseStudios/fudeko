<template>
    <div>
        
        <router-link to="/emails/new"><Button label="New" icon="pi pi-plus"></Button></router-link>

        <DataTable :value="emails" class="mx-auto my-5" sortField="created_at" :sortOrder="-1">
            <Column field="id" header="ID"></Column>
            <Column field="created_at" sortable header="Date"><template #body="slotProps">{{ new
                Date(slotProps.data.created_at).toLocaleDateString() + " " + new
                    Date(slotProps.data.created_at).toLocaleTimeString() }}</template>
            </Column>
            <!-- <Column field="greeting" header="Greeting">
                <template #body="slotProps">
                    <span v-html="greetingText(
                        slotProps.data
                    )"></span>
                </template>
            </Column> -->
        </DataTable>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCounterStore } from '@/stores/store'
import Button  from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

//Get emails from store
const store = useCounterStore();
const emails = store.emails;
// const greetings = store.greetings;
// const greetingText = (email) => {
//     return `${greetings.value.find(greeting => greeting.id === email.greeting).text.slice(0, 50)}...`;
// }
</script>

<style lang="scss" scoped></style>