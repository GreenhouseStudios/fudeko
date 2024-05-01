<template>
    <div class="flex flex-col items-start justify-start">
        <h1 class="my-5 text-4xl font-bold">Hi, {{ this.participantRecord?.first_name }}</h1>
        <p>View your response history...</p>

        <ResponseRow v-for="i in [1, 2, 3]" :key="i" />

        <div>

            <router-link :to="'/form/' + this.participantRecord?.email"><Button
                    class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">View your weekly
                    prompts</Button></router-link>
        </div>
    </div>
</template>

<script>
import { supabase } from '@/lib/supabaseClient'
// eslint-disable-next-line no-unused-vars
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState } from 'pinia'
import Button from 'primevue/button'
import ResponseRow from '@/components/ResponseRow.vue'

export default {
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        Button,
        ResponseRow
    },
    mounted() {
        supabase.auth.onAuthStateChange( ( event, session ) => {
            if ( event === 'SIGNED_IN' ) {
                console.log( 'User signed in:', session.user );
                // Redirect or perform actions after successful login
            } else if ( event === 'SIGNED_OUT' ) {
                console.log( 'User signed out' );
                // Redirect or perform actions after logout
            }
        } );
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['prompts', 'user', 'loading', 'error', 'participantRecord'] ),
    },
}
</script>

<style lang="scss" scoped></style>