<template>
    <div class="px-40 py-3 mx-auto">
        <h1 class="text-4xl font-bold">Admin Console</h1>

        <Menubar :model="views" class="gap-5 mb-5"></Menubar>

        <component v-bind:is="currentTabComponent"></component>
    </div>
</template>

<script>

// import Select from 'primevue/Select';
import Prompts from '../components/Prompts.vue';
import Responses from '../components/Responses.vue';
import Participants from '../components/Participants.vue';
import Tips from '../components/Tips.vue';
import Greetings from '../components/Greetings.vue';
import Menubar from 'primevue/menubar';
import { useCounterStore } from '../stores/store';
import { mapActions } from 'pinia';
export default {
    components: {
        Responses, Participants, Prompts, Tips, Greetings, Menubar
    },
    data() {
        return {
            view: { label: 'Responses', value: 'responses', component: Responses },
            views: [
                { label: 'Responses', value: 'responses', component: Responses, command: () => { this.view = { label: 'Responses', value: 'responses', component: Responses } } },
                { label: 'Prompts', value: 'prompts', component: Prompts, command: () => { this.view = { label: 'Prompts', value: 'prompts', component: Prompts } } },
                { label: 'Participants', value: 'participants', component: Participants, command: () => { this.view = { label: 'Participants', value: 'participants', component: Participants } } },
                { label: 'Tips', value: 'tips', component: Tips, command: () => { this.view = { label: 'Tips', value: 'tips', component: Tips } } },
                { label: 'Greetings', value: 'greetings', component: Greetings, command: () => { this.view = { label: 'Greetings', value: 'greetings', component: Greetings } } },]

        }
    },
    computed: {
        currentTabComponent() {
            return this.view.component
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['fetchAdminData'] ),
    },
    mounted() {
        this.fetchAdminData();
    },
}
</script>

<style lang="scss" scoped></style>