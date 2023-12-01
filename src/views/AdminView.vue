<template>
    <div class="px-40 py-3 mx-auto">
        <h1 class="text-4xl font-bold">Admin Console</h1>
        <!-- Select between responses and participants -->
        <!-- dropdown -->
        <div class="flex justify-center my-5">
            <!-- <div class="flex flex-col w-1/2">
                <select id="view" v-model="view" class="w-full p-2 my-2 bg-yellow-300 border-2 border-yellow-400">
                    <option value="responses">Responses</option>
                    <option value="participants">Participants</option>
                </select>
            </div> -->
            <Dropdown v-model="view" :options="views" optionLabel="label"></Dropdown>
        </div>
        <!-- <Responses v-show="view === 'responses'"></Responses>
        <Participants v-show="view === 'participants'"></Participants> -->
        <component v-bind:is="currentTabComponent"></component>
    </div>
</template>

<script>

import Dropdown from 'primevue/dropdown';

import Responses from '../components/Responses.vue';
import Participants from '../components/Participants.vue';
export default {
    components: {
        Responses, Participants, Dropdown
    },
    data() {
        return {
            view: { label: 'Responses', value: 'responses', component: Responses },
            views: [
                { label: 'Responses', value: 'responses', component: Responses },
                { label: 'Participants', value: 'participants', component: Participants },]
        }
    },
    computed: {
        currentTabComponent() {
            return this.view.component
        }
    },
}
</script>

<style lang="scss" scoped></style>