<template>
    <div class="px-40">
        <!-- <h1 class="mt-5 text-xl font-bold text-left">Participants</h1> -->
        <div class="my-5">
            <router-link to="/prompts/new"><Button label="New" icon="pi pi-plus"></Button></router-link>
        </div>
        <DataTable :filters="filters" :value="prompts" class="mx-auto" paginator :rows="10" dataKey="id" filterDisplay="row"
            :globalFilterFields="['prompt_set']">
            <Column field="id" header="PromptID"></Column>
            <Column field="prompt_text" header="Prompt">{{ slotProps.data.prompt_text }}</Column>
            <Column field="prompt_set" header="Set" sortable filterField="prompt_set" :showFilterMenu="false"
                :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="slotProps"> {{ slotProps.data.prompt_set }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="promptSets"
                        placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            {{ slotProps.option }}
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column> <template #body="slotProps"> <router-link :to="'/prompt/' + slotProps.data.id"
                        class="text-blue-500 hover:text-blue-300"> View</router-link></template></Column>

        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import Dropdown from 'primevue/dropdown';
import { FilterMatchMode } from 'primevue/api';
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, } from 'pinia'
import _ from 'lodash';

export default {
    components: {
        DataTable, Column, Button, Dropdown,
    },
    data() {
        return {
            filters: {
                prompt_set: { value: null, matchMode: FilterMatchMode.EQUALS },
            },
        }
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'participants'] ),
        promptSets: function () {
            return _.uniq( this.prompts.map( p => p.prompt_set ) );
        },
    },
}
</script>

<style lang="scss" scoped></style>