<template>
    <div class="w-1/2 mx-auto ">
        <h1 class="my-24 text-xl font-bold">{{ prompt.prompt_text }}</h1>
        
        <DataTable>
            <Column header="Fields">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template>
            </Column>
            <Column header="Values">
                <Row>
                    {{ prompt.id }}
                </Row>
                <Row>
                    {{ prompt.prompt_text }}
                </Row>
            </Column>
            <Column header="Edit">
                <Row>
                    <Button>Edit</Button>
                </Row>
                <Row>
                    <Button>Edit</Button>
                </Row>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Button from 'primevue/button';
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'

export default {
    // props: {
    //     response: {
    //         type: Object,
    //         default: () => {}
    //     },
    // },
    components: {
        DataTable, Column, Row, Button
    },
    data() {
        return {
        }
    },
    methods: {

        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'getUserPrompts'] ),
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'usersPromptChoices'] ),
        prompt() {
            return this.prompts.find( p => p.id == this.$route.params.id )
        }
    },
}
</script>

<style lang="scss" scoped></style>