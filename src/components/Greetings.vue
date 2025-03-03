<template>
    <div class="px-40">
        <!-- <h1 class="mt-5 text-xl font-bold text-left">Participants</h1> -->
        <div class="my-5">
            <router-link to="/greetings/new"><Button label="New" icon="pi pi-plus"></Button></router-link>
        </div>
        <DataTable :value="greetings" class="mx-auto" sortField="created_at" sortOrder="-1">
            <Column field="created_at" sortable header="Date"><template #body="slotProps">{{ new
                Date(slotProps.data.created_at).toLocaleDateString() + " " + new
                    Date(slotProps.data.created_at).toLocaleTimeString() }}</template></Column>
            <Column field="text" header="Greeting Text"><template #body="slotProps">{{ slotProps.data.text.substr(0, 50)
                    }}</template>
            </Column>
            <Column field="is_template" header="Template">
                <template #body="slotProps">
                    <span v-if="slotProps.data.is_template" class="text-green-500">Yes</span>
                    <span v-else class="text-red-500">No</span>
                </template>
            </Column>
            <Column>

                <template #body="slotProps"> <router-link :to="'/greetings/' + slotProps.data.id"
                        class="p-2 text-white bg-blue-400 rounded-sm hover:bg-blue-500"> View</router-link></template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState } from 'pinia'

export default {
    components: {
        DataTable, Column, Button,
    },
    data() {
        return {
            filters: {
                // prompt_set: { value: null, matchMode: FilterMatchMode.EQUALS },
            },
        }
    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState(useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'participants', 'greetings']),
    },
}
</script>

<style lang="scss" scoped></style>