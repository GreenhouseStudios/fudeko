<template>
    <div class="flex flex-col justify-center min-h-screen">
        <section class="mb-48">
            <h1 class="text-4xl font-black">Welcome back, {{ first_name }}</h1>
            <p>It looks like you were in the middle of something.</p>

            <p><i v-html="response?.substring(0, 40)"></i></p>
            <p>Would you like to continue where you left off?</p>
            <router-link :to="'/form/page2/' + this.partialResponse.prompt"><Button class="text-lg font-bold">Continue
                    Writing</Button></router-link>
        </section>
    </div>
</template>

<script>
import Button from 'primevue/button';
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/store';
export default {
    components: {
        Button,
    },
    data() {
        return {
            participants: null,
            response: null,

        }
    },
    async mounted() {
        this.response = localStorage.getItem( 'response' );
    },
    computed: {
        ...mapState( useCounterStore, ['user', 'loading', 'participantRecord', 'partialResponse'] ),
        first_name() {
            return this.participantRecord?.first_name;
        }
        ,
    },
    methods: {
        ...mapActions( useCounterStore, ['initializeStore', 'toggleLoading'] ),
    },
}
</script>

<style lang="scss" scoped></style>