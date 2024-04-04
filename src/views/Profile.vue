<template>
    <div>
        <h1 class="my-5 text-2xl font-bold">Participant Profile</h1>

        <!-- View your current prompts: link to form -->
        <div>
         
            <router-link :to="'/form'+this.user.email"><Button class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">See your prompts</Button></router-link>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { useCounterStore } from '@/stores/store'
// eslint-disable-next-line no-unused-vars
import { mapStores, mapState, mapActions } from 'pinia'

    export default {
        data() {
            return {
                
            }
        },
        methods: {
            
        },
        components: {
            
        },
        mounted() {

        },
        computed: {
            mapStores() {
                return mapStores( useCounterStore )
            },
            mapState() {
                return mapState( useCounterStore, ['prompts', 'user', 'loading', 'error', 'participantRecord'] )
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>