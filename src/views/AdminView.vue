<template>
    <div class="px-10 py-3 mx-auto md:px-40">
        <h1 class="my-12 text-4xl font-bold">Admin Console</h1>
        <Menubar :model="views" class="flex justify-center [&_.p-menubar-root-list]:justify-center mb-5"></Menubar>
        <component v-bind:is="currentTabComponent"></component>
    </div>
</template>

<script>

// import Select from 'primevue/Select';
import Prompts from '../components/Prompts.vue';
import AdminReponses from '@/components/AdminReponses.vue';
import Participants from '../components/Participants.vue';
import Tips from '../components/Tips.vue';
import Greetings from '../components/Greetings.vue';
import Emails from '../components/Emails.vue';
import Menubar from 'primevue/menubar';
import { useCounterStore } from '../stores/store';
import { mapActions } from 'pinia';
export default {
    components: {
        AdminReponses, Participants, Prompts, Tips, Greetings, Menubar
    },
    data() {
        return {
            view: { label: 'Responses', value: 'responses', component: AdminReponses },
            views: [
                { label: 'Responses', value: 'responses', component: AdminReponses, command: () => { this.view = { label: 'Responses', value: 'responses', component: AdminReponses } } },
                { label: 'Prompts', value: 'prompts', component: Prompts, command: () => { this.view = { label: 'Prompts', value: 'prompts', component: Prompts } } },
                { label: 'Participants', value: 'participants', component: Participants, command: () => { this.view = { label: 'Participants', value: 'participants', component: Participants } } },
                { label: 'Tips', value: 'tips', component: Tips, command: () => { this.view = { label: 'Tips', value: 'tips', component: Tips } } },
                { label: 'Greetings', value: 'greetings', component: Greetings, command: () => { this.view = { label: 'Greetings', value: 'greetings', component: Greetings } } },
                { label: 'Emails', value: 'emails', component: Emails, command: () => { this.view = { label: 'Emails', value: 'emails', component: Emails } } },
        ]

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