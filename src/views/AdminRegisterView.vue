<script setup>
import { ref, computed } from 'vue';
import { useCounterStore } from '@/stores/store';

const store = useCounterStore();

const formSubmitted = ref(false);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const confirmEmail = ref('');
const password = ref('');

const missingFields = ref([]);

const formValid = computed(() => {
  missingFields.value = [];
  const basicValid = firstName && lastName && email.value && confirmEmail.value && password.value.length >= 6 && email.value == confirmEmail.value;

  if ( !email.value ) missingFields.value.push( 'Email is required' );
  if ( !confirmEmail.value ) missingFields.value.push( 'Confirm Email is required' );
  if ( password.value.length < 6 ) missingFields.value.push( 'Password must be at least 6 characters' );
  if ( email.value !== confirmEmail.value ) missingFields.value.push( 'Emails do not match' );

  return basicValid;
});

const addAdmin = async () => {
  await store.addNewAdmin({
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value
  }, password.value)
  .then(() => {
    formSubmitted.value = true;
  })
  .catch((err) => {
    console.error('ERROR: ', err);
  });
};

</script>

<template>
  <div class="w-11/12 mx-auto md:w-1/2">
    <section v-if="!formSubmitted">
      <h2 class="text-4xl font-black ">Admin Registration</h2>
      <div class="py-10">
        <FormKit type="form" theme="genesis" submit-label="Register" @submit="addAdmin" :actions="false">
          <FormKit type="text" label="First Name" validation="required" v-model="firstName"
            name="firstName" />
          <FormKit type="text" label="Last Name" validation="required" v-model="lastName" name="lastName" />
          <div class="my-5">
            <FormKit type="email" label="Email" validation="required|email" v-model="email" name="email" />
            <FormKit type="email" label="Confirm Email" validation="required|email" v-model="confirmEmail"
              name="confirmEmail" />
            <FormKit type="password" label="Password" validation="required|length:6" v-model="password"
              name="password" />
          </div>
          <button @click="addParticipant" class="p-4 text-lg font-black text-white rounded-md"
            :class="`${formValid ? 'bg-yellow-500 hover:bg-yellow-300' : 'bg-gray-200 cursor-not-allowed'} `"
            :disabled="!formValid">Register
          </button>
        </FormKit>
      </div>
    </section>
    <section>
      <div v-if="formSubmitted">
        <p>Thank you for registering!</p>
        <p>Please check your email for a link to confirm your account.</p>
      </div>
    </section>
  </div>
</template>
