<template>
    <div id="response-write">
        <h2 class="my-5 text-xl font-bold">New Tip Form</h2>
        <div class="flex flex-col justify-start gap-5 px-80">
            <div class="flex flex-col justify-start max-w-xl">
                <label for="tipTitle" class="pb-2">Tip Title</label>
                <InputText id="tipTitle" v-model="tipTitle" placeholder="Tip Title"></InputText>
            </div>

            <div class="flex flex-col justify-start max-w-xl">
                <label for="tipText" class="pb-2">Tip Text</label>
                <InputText id="tipText" v-model="tipText" placeholder="Tip Text"></InputText>
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



export default {
    components: {
        // Editor,
        InputText,
        Button,
        InputNumber
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