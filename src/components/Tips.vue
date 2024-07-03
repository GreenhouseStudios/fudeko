<template>
    <div class="px-40">

        <div class="my-5">
            <router-link to="/tips/new"><Button label="New" icon="pi pi-plus"></Button></router-link>
        </div>

        <DataTable :value="tips" class="mx-auto">
            <Column field="week" header="Week" #body="slotProps">{{ slotProps.data.week }}</Column>
            <Column field="tip_text" header="Text"><template #body="slotProps">{{ slotProps.data.tip_text }}</template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
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
        ...mapState( useCounterStore, ['tips', 'loading', 'error',] ),
    },
}
</script>

<style lang="scss" scoped></style>