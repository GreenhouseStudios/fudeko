<template>
    <div class="grid my-32 place-content-center">
        <section v-if="!formSubmitted">
            <h2 class="text-4xl font-black ">Sign Up for Fudeko!</h2>
            <div class="py-10">
                <FormKit type="form" theme="genesis" submit-label="Register" @submit="addParticipant" :actions="false">
                    <FormKit type="text" label="First Name" validation="required" v-model="firstName"
                        name="firstName" />
                    <FormKit type="text" label="Last Name" validation="required" v-model="lastName" name="lastName" />
                    <FormKit type="select" label="How will you participate?" v-model="participantType"
                        name="participantType" :options="participantTypes" />


                    <FormKit type="text" label="Address" v-show="participantType == 'mail'" v-model="address"
                        name="address" />
                    <FormKit type="text" label="Address Line 2" v-show="participantType == 'mail'" v-model="address2"
                        name="address2" />
                    <FormKit type="text" label="City" v-show="participantType == 'mail'" v-model="city" name="city" />
                    <div class="flex gap-2">
                        <FormKit type="select" :options="stateOptions" label="State" v-show="participantType == 'mail'"
                            v-model="state" name="state" />
                        <FormKit type="text" label="Zip" v-show="participantType == 'mail'" v-model="zip" name="zip" />
                    </div>

                    <FormKit type="email" label="Email" validation="required" v-model="email" name="email" />
                    <FormKit type="email" label="Confirm Email" v-model="confirmEmail" name="confirmEmail" />
                    <FormKit type="password" label="Password" v-model="password" name="password" />
                    <FormKit type="text" label="Partner Email" :value="partnerEmail" name="partnerEmail" />

                    <FormKit type="select" label="Send Partner Prompts" :options="yesNoOptions"
                        v-model="partnerReceivesPrompts" name="sendPromptEmails" />
                    <FormKit type="select" label="Send Partner Responses" :options="yesNoOptions"
                        v-model="partnerReceivesResponses" name="sendResponseEmails" />

                    <FormKit type="select" label="How easy is it to tell your story?" v-model="storyDifficulty"
                        name="storyDifficulty" :options="storyDifficultyOptions" />
                    <button type="submit"
                        class="p-4 text-lg font-black text-white bg-yellow-500 rounded-md hover:bg-yellow-300"
                        :disabled="!formValid">Register</button>
                </FormKit>
                <!-- <button @click="partnerReceivesPrompts = !partnerReceivesPrompts">Toggle Loading</button> -->
            </div>
        </section>
        <section>
            <p v-if="formSubmitted">
                Thank you for registering! Please check your email for a link to confirm your account.
            </p>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCounterStore } from '@/stores/store';
const formSubmitted = ref( false );
const participantTypes = ref( [
    { label: 'Email', value: 'email' },
    { label: 'Mail', value: 'mail' },
] );
const participantType = ref( '' );
const email = ref( '' );
const confirmEmail = ref( '' )
const password = ref( '' );
const firstName = ref( '' );
const lastName = ref( '' );
const address = ref( '' )
const address2 = ref( '' )
const city = ref( '' )
const state = ref( '' )
const zip = ref( '' )
const stateOptions = ref( [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'District of Columbia', value: 'DC' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
] );
const partnerEmail = ref( '' );
const partnerReceivesPrompts = ref( false );
const partnerReceivesResponses = ref( false );
const storyDifficulty = ref( '' )
const storyDifficultyOptions = ref( [
    { label: 'Easy', value: 'easy' },
    { label: 'Somewhat Easy', value: 'somewhatEasy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Somewhat Hard', value: 'somewhatHard' },
    { label: 'Hard', value: 'hard' },
] );
const yesNoOptions = ref( [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
] );

const formValid = computed( () => {
    if ( participantType.value == 'email' ) {
        return email.value && confirmEmail.value && password.value && email.value == confirmEmail.value;
    } else if ( participantType.value == 'mail' ) {
        return address.value;
    }
    return true;
} );
const store = useCounterStore();
const addParticipant = async () => {

    await store.AddNewParticipant( {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        partner_email: partnerEmail.value,
        partner_receives_prompts: partnerReceivesPrompts.value,
        partner_receives_responses: partnerReceivesResponses.value,
        status: 'active',
        
    }, password.value ).then( () => {
        formSubmitted.value = true;
    } )
    .catch( (err) => {
        // console.log( err );
    } )
};
</script>

<style>
label {
    text-align: left;
}
</style>