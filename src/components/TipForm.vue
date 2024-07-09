<template>
    <div id="response-write" class="mx-auto md:w-1/2 flex flex-col align-middle">
        <h2 class="my-5 text-xl font-bold">New Tip Form</h2>
        <div class="flex flex-col justify-center align-middle mx-auto gap-5">
            <div class="flex flex-col justify-start max-w-xl">
                <label for="tipTitle" class="pb-2">Tip Title</label>
                <InputText id="tipTitle" v-model="tipTitle" placeholder="Tip Title"></InputText>
            </div>

            <div class="flex flex-col justify-start max-w-xl">
                <label for="tipText" class="pb-2">Tip Text</label>
                <Editor v-model="tipText" style="height: 320px; max-width: 600px" placeholder="Type your response here"></Editor>
            </div>

            <div class="flex flex-col justify-start max-w-xl">
                <label for="week" class="pb-2">Week</label>
                <InputNumber id="week" v-model="week" ></InputNumber>
            </div>

            <Button class="max-w-md m-auto" @click="addTip" label="Add New Tip" :disabled="submitDisabled"></Button>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Editor from 'primevue/editor';



export default {
    components: {
        // Editor,
        InputText,
        Button,
        InputNumber,
        Editor
    },
    data() {
        return {
            tipText: '',
            tipTitle: '',
            week: this.tips? this.tips.length + 1 : 1,
        }
    },

    methods: {
        ...mapActions( useCounterStore, ['AddNewTip', 'toggleLoading'] ),
        async addTip() {
            this.toggleLoading();
            await this.AddNewTip( {
                tip_text: this.tipText,
                tip_title: this.tipTitle,
                week: this.week,
            } ).then( () => {
                this.toggleLoading();
                this.$router.push( '/admin' );
            } ).catch( () => {
                this.toggleLoading();
                this.toggleError();
            } )
        }
    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['loading', 'error', 'usersPromptChoices', 'tips'] ),
        submitDisabled() {
            return this.tipText.length < 1 || this.tipTitle.length < 1;
        },
    },
    mounted () {
        this.week = this.tips? this.tips.length + 1 : 1;
    },
}
</script>

<style lang="scss" scoped>
label{
    text-align: left;
}</style>