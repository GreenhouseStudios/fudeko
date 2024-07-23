<template>
    <div>
        <h1>Welcome back, {{ first_name }}</h1>
        <p>It looks like you were in the middle of something...</p>

        <p><i v-html="response?.substring(0,13)"></i></p>
        <p>Would you like to continue where you left off?</p>
        <router-link to="/form/"><Button>Continue Writing</Button></router-link>
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
          this.response = localStorage.getItem('response');
        },
        computed: {
            ...mapState( useCounterStore, ['user', 'loading','participantRecord'] ),
            first_name() {
                return this.participantRecord?.first_name;
            }
        },
        methods: {
            ...mapActions( useCounterStore, ['initializeStore', 'toggleLoading'] ),
        },
    }
</script>

<style lang="scss" scoped>

</style>