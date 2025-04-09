<template>
    <div>
        
        <router-link to="/emails/new"><Button label="New" icon="pi pi-plus"></Button></router-link>

        <DataTable :value="emails" class="mx-auto my-5" sortField="created_at" sortOrder="-1">
            <Column field="id" header="ID"></Column>
            <Column field="created_at" sortable header="Date"><template #body="slotProps">{{ new
                Date(slotProps.data.created_at).toLocaleDateString() + " " + new
                    Date(slotProps.data.created_at).toLocaleTimeString() }}</template>
            </Column>
            <Column field="greeting" header="Greeting">
                <template #body="slotProps">
                    <span v-html="greetingText(
                        slotProps.data
                    )"></span>
                </template>
            </Column>
            <Column>
                <template #body="slotProps">
                    <router-link :to="'/emails/' + slotProps.data.id"
                        class="p-2 text-white bg-blue-400 rounded-sm hover:bg-blue-500"> View</router-link>
                </template>
            </Column>

            <!-- <Column field="text" header="Greeting Text"></Column> -->
        </DataTable>
    </div>
</template>

<script setup>
import { Button } from 'primevue';
import { useCounterStore } from '@/stores/store'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { computed } from 'vue';

//Get emails from store
const store = useCounterStore();
const emails = computed(() => store.emails);
const greetings = computed(() => store.greetings);
const greetingText = (email) => {
    return greetings.value.find(greeting => greeting.id === email.greeting).text;
}
</script>

<style lang="scss" scoped></style>