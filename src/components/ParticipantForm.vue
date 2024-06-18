<template>
    <div id="response-write">
        <h2 class="my-5 text-xl font-bold">New Participant Form</h2>
        <div class="flex flex-col gap-5 px-40">
            <InputText v-model="firstName" placeholder="First Name"></InputText>
            <InputText v-model="lastName" placeholder="Last Name"></InputText>
            <InputText v-model="email" placeholder="Email"></InputText>
            <InputText v-model="partnerEmail" placeholder="Partner's Email (Optional)"></InputText>
            <Button @click="addParticipant" label="Add New Participant" :disabled="submitDisabled"></Button>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
// import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    components: {
        // Editor,
        InputText,
        Button,
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            partnerEmail: '',
        }
    },

    methods: {
        ...mapActions( useCounterStore, ['AddNewParticipant','toggleLoading'] ),
        async addParticipant(){
            this.toggleLoading();
            await this.AddNewParticipant( {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                partner_email: this.partnerEmail,
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
        submitDisabled(){
            return this.firstName.length < 1 || this.lastName.length < 1 || this.email.length < 1;
        },
        bodyData(){
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

<style lang="scss" scoped></style>