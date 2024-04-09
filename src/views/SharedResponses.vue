<template>
    <div class="px-40 py-3 mx-auto">
        <h1 class="text-4xl font-bold">Shared Responses</h1>
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

// import Dropdown from 'primevue/dropdown';
import Responses from '../components/SharedResponsesTable.vue';
import { useCounterStore } from '../stores/store';
import { mapActions } from 'pinia';
export default {
    components: {
        Responses,
    },
    data() {
        return {
            view: { label: 'Responses', value: 'responses', component: Responses },
            views: 
                { label: 'Responses', value: 'responses', component: Responses },
                
                
        }
    },
    computed: {
        currentTabComponent() {
            return this.view.component
        }
    },
    methods:{
        ...mapActions(useCounterStore, ['fetchAdminData']),
    },
    mounted () {
        this.fetchAdminData();
    },
}
</script>

<style lang="scss" scoped></style>