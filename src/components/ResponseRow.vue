<template>
    <div class="my-5 border-2 border-black  w-100" @click="show = !show">
        <div class="flex justify-between" style="background-color: rgba(244, 146, 47, 0.32)">
            <div class="flex items-center justify-center bg-black">
            <div class=" text-xl font-bold text-white p-2">{{ response.created }}</div>
        </div>
            <div class="flex w-10/12 text-left align-middle bg-#F4912F" >
                <span class="flex items-center p-4  font-bold text-black text-2xl">{{ response.promptQuestion }}</span>
            </div>
            <div class="text-center border-none">
                <Button :icon=" show ? 'pi pi-times ': 'pi pi-plus'"
                    class="p-3  text-3xl border-none w-100 h-100 hover:bg-blue-100" ></Button>
            </div>

        </div>
        <div class="p-5 border-t-2 border-black" v-show="show">{{ response.responsePreview }}</div>
    </div>
</template>

<script>
import Button from 'primevue/button';
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState } from 'pinia'
import { supabase } from '../lib/supabaseClient';
// import { mapActions } from 'pinia';


export default {
    data() {
        return {
            show: false,
            // body: userName()
            // joinedResponseLength: joinedResponses?.length,
            userEmail: "",
        }
    },
    components: {
        Button
    },
    props: {
    response: {
        type: Object,
    }
    },
    
    methods: {
        async getUserInformations() {
            const { data: { user } } = await supabase.auth.getUser();
            this.userEmail = user?.email
        },
        
        // ...mapActions(useCounterStore, ['toggleLoading', 'toggleError',]),
        
    },
    mounted() {
        this.getUserInformations();

    },
    computed: {
        ...mapStores(useCounterStore),
        ...mapState(useCounterStore, ['count', 'prompts', 'responses', 'loading', 'error', 'usersPromptChoices', 'participants']),
    },
}
</script>

<style lang="scss" scoped></style>