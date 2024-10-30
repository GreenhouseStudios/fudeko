<template>
    <div class="grid place-content-center">
        <section class="my-24" v-if="!registrationSent">
            <h2 class="text-2xl font-bold text-left ">Register as Fudeko Project Participant</h2>

            <div class="flex flex-col gap-5 my-5">

                <div class="flex flex-col justify-start max-w-xl">
                    <label for="firstName" class="pb-2 text-left">First Name</label>
                    <InputText id="firstName" v-model="firstName" placeholder="First Name"></InputText>
                </div>

                <div class="flex flex-col justify-start max-w-xl">
                    <label for="lastName" class="pb-2 text-left">Last Name</label>
                    <InputText id="lastName" v-model="lastName" placeholder="Last Name"></InputText>
                </div>

                <div class="flex flex-col justify-start max-w-xl">
                    <label for="participantType" class="pb-2 text-left">How would you like to participate?</label>
                    <Dropdown v-model="participantType" :options="participantTypes" optionLabel="label"
                        placeholder="Select a Participant Type">
                    </Dropdown>
                </div>
                <div v-if="participantType.value == 'email'">
                    <div class="flex flex-col justify-start max-w-xl">
                        <label for="email" class="pb-2 text-left">Email</label>
                        <InputText id="email" v-model="email" placeholder="Email"></InputText>
                    </div>

                    <div class="flex flex-col justify-start max-w-xl my-5">
                        <label for="confirmEmail" class="pb-2 text-left">Confirm Email</label>
                        <InputText id="confirmEmail" v-model="confirmEmail" placeholder="Confirm Email"></InputText>
                    </div>

                    <div class="flex flex-col justify-start max-w-xl my-5">
                        <label for="password" class="pb-2 text-left">Password</label>
                        <InputText id="password" v-model="password" placeholder="Password"></InputText>
                    </div>

                    <div class="flex flex-col justify-start max-w-xl my-5">
                        <label for="partnerEmail" class="pb-2 text-left">Partner's Email</label>
                        <InputText id="partnerEmail" v-model="partnerEmail" placeholder="Partner's Email (Optional)">
                        </InputText>
                    </div>

                    <div class="flex gap-2 my-5 align-middle">
                        <label for="partnerReceivesPrompts" class="pb-2 text-left">Send Prompts to Partner</label>
                        <InputSwitch v-model="partnerReceivesPrompts"></InputSwitch>
                    </div>
                    <div class="flex gap-2 my-5 align-middle">
                        <label for="partnerReceivesConfirmations" class="pb-2 text-left">Send Responses to
                            Partner</label>
                        <InputSwitch v-model="partnerReceivesResponses"></InputSwitch>
                    </div>
                </div>
                <div class="flex flex-col justify-start max-w-xl" v-if="participantType.value == 'mail'">
                    <label for="address" class="pb-2 text-left">Address</label>
                    <InputText id="address" v-model="address" placeholder="Address"></InputText>
                </div>

                <div>
                    <div class="flex flex-col justify-start max-w-xl card">
                        <div>How Easy is it for you to tell your story?</div>
                        <div class="flex flex-wrap gap-3">
                            <div class="flex align-items-center" v-for="option in storyDifficultyOptions">
                                <RadioButton v-model="storyDifficulty" value="option.value" />
                                <label for="ingredient1" class="ml-2">{{ option.label }}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <Button @click="createUser()" class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400"
                    :disabled="!formValid">Register</Button>
            </div>

        </section>
        <section class="my-24" v-else>
            <h2 class="text-2xl font-bold text-left ">Registration Sent</h2>
            <p class="text-lg">Please check your email for a confirmation link.</p>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCounterStore } from '@/stores/store';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';

const participantTypes = ref( [
    { label: 'Email', value: 'email' },
    { label: 'Mail', value: 'mail' },
] );
const participantType = ref( '' );
const email = ref( '' );
const confirmEmail = ref( '' )
const password = ref( '' );
const registrationSent = ref( false );
const firstName = ref( '' );
const lastName = ref( '' );
const partnerEmail = ref( '' );
const partnerReceivesPrompts = ref( false );
const partnerReceivesResponses = ref( false );
const address = ref( '' )
const storyDifficulty = ref( '' )
const storyDifficultyOptions = ref( [
    { label: 'Easy', value: 'easy' },
    { label: 'Somewhat Easy', value: 'somewhatEasy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Somewhat Hard', value: 'somewhatHard' },
    { label: 'Hard', value: 'hard' },
] );
const emergencyContact = ref( '' );
const emergencyContactPhone = ref( '' );
const emergencyContactEmail = ref( '' );
const emergencyContactRelationship = ref( '' );
const includeInPenPalProgram = ref( false );


const formValid = computed( () => {
    if ( participantType.value == 'email' ) {
        return email.value && confirmEmail.value && password.value && email.value == confirmEmail.value;
    } else if ( participantType.value == 'mail' ) {
        return address.value;
    }
} );
const store = useCounterStore();
const createUser = async () => {
    const { data, error } = await store.sbAdmin.auth.signUp( {
        email: email.value,
        password: password.value,
    } )
    if ( data ) {
        registrationSent.value = true;
    }
};
</script>

<style scoped></style>