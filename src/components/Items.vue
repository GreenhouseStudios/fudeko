<template>
    <div class="px-40">

        <DataTable :value="items" class="mx-auto">
            <Column field="text" header="Text"></Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, } from 'pinia'
import { supabase } from "../lib/supabaseClient";

export default {
    components: {
        DataTable, Column, 
    },
    data() {
        return {
            items: []
        }
    },
    async mounted () {
        const i = await supabase.from('items').select('*');
        console.log(i.data);
        this.items = i.data;
    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState( useCounterStore, ['loading', 'error',] ),
    },
}
</script>

<style lang="scss" scoped></style>