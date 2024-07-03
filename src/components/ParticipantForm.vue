<template>
    <div id="response-write">
        <h2 class="my-5 text-xl font-bold">New Participant Form</h2>
        <div class="flex flex-col justify-start gap-5 px-80">
            <div class="flex flex-col justify-start max-w-xl">
                <label for="firstName" class="pb-2">First Name</label>
                <InputText id="firstName" v-model="firstName" placeholder="First Name"></InputText>
            </div>

            <div class="flex flex-col justify-start max-w-xl">
                <label for="lastName" class="pb-2">Last Name</label>
                <InputText id="lastName" v-model="lastName" placeholder="Last Name"></InputText>
            </div>

            <div class="flex flex-col justify-start max-w-xl">
                <label for="email" class="pb-2">Email</label>
                <InputText id="email" v-model="email" placeholder="Email"></InputText>
            </div>

            <div class="flex flex-col justify-start max-w-xl">
                <label for="partnerEmail" class="pb-2">Partner's Email</label>
                <InputText id="partnerEmail" v-model="partnerEmail" placeholder="Partner's Email (Optional)">
                </InputText>
            </div>

            <div class="flex flex-col justify-start max-w-xl" v-show="false">
                <label for="startDate" class="pb-2" v-tooltip="'Participant will start on the following Tuesday'">Start Date </label> 
                <Calendar id="startDate" v-model="startDate" placeholder="Start Date" :minDate="currentDate"></Calendar>
            </div>

            <div class="flex gap-2 align-middle">
                <label for="partnerReceivesPrompts" class="pb-2">Partner Receives Prompts</label>
                <InputSwitch v-model="partnerReceivesPrompts" ></InputSwitch>
            </div>
            <div class="flex gap-2 align-middle">
                <label for="partnerReceivesConfirmations" class="pb-2">Partner Receives Responses</label>
                <InputSwitch v-model="partnerReceivesResponses" ></InputSwitch>
            </div>

            <Button class="max-w-md m-auto" @click="addParticipant" label="Add New Participant" :disabled="submitDisabled"></Button>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';



export default {
    components: {
        // Editor,
        InputText,
        Button,
        Calendar,
        InputSwitch
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            partnerEmail: '',
            startDate: null,
            currentDate: new Date(),
            partnerReceivesPrompts: true,
            partnerReceivesResponses: true,
        }
    },

    methods: {
        ...mapActions( useCounterStore, ['AddNewParticipant', 'toggleLoading'] ),
        async addParticipant() {
            this.toggleLoading();
            await this.AddNewParticipant( {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                partner_email: this.partnerEmail,
                start_date: this.startDate === null ? new Date() : this.startDate,
                partner_receives_prompts: this.partnerReceivesPrompts,
                partner_receives_responses: this.partnerReceivesResponses,
                status: 'active'
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
        ...mapState( useCounterStore, ['loading', 'error', 'usersPromptChoices', 'tips', 'participantID', 'participantRecord', 'prompts', 'participants'] ),
        submitDisabled() {
            return this.firstName.length < 1 || this.lastName.length < 1 || this.email.length < 1 ;
        },
        bodyData() {
            return {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                partner_email: this.partnerEmail,
            }
        }
    }
}
</script>

<style lang="scss" scoped>
label{
    text-align: left;
}</style>