<template>
    <div class="vh-100 relative">
        <h1>New Email</h1>

        <!-- Simple list of participant first and last names without selection -->
        <section class="my-5 mx-auto">
            <Accordion value="null">
                <AccordionPanel value="0">
                    <AccordionHeader>Participants List</AccordionHeader>
                    <AccordionContent>
                        <h4>Click on a participant to see details</h4>
                        <div class="flex flex-wrap gap-2 p-4 my-5 fudeko-blue">
                            <Chip @click="handleSelectParticipant(participant)" v-for="participant in activeParticipants"
                                :key="participant.id" class="font-bold p-1 border rounded text-center hover:bg-blue-100 cursor-pointer">
                                {{ participant.first_name }} {{ participant.last_name }}
                            </Chip>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel class="my-5" value="1">
                    <AccordionHeader>Greeting</AccordionHeader>
                    <AccordionContent>

                        <h4 class="text-left my-5 text-sm font-normal">Click option below to use a template greeting.
                        </h4>
                        <div class="grid grid-cols-5 gap-4">
                            <Button class="text-xs" v-for="greeting in greetings" :key="greeting.id"
                                :label="textExcerpt(greeting.text)" @click="changeSelectedGreeting(greeting)"></Button>

                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </section>

        <section v-if="selectedGreeting" class="text-left flex gap-2 flex-col my-12">
            <h2>{{ selectedGreeting?.title }}</h2>
            <p v-html="selectedGreeting.text"></p>
        </section>
        <!-- <section>
            <Editor class=" bg-white text-center m-auto mb-24" v-model="text" style="height: 320px; max-width: 600px">
            </Editor>
        </section> -->

        <section class="flex gap-2 justify-center">
            <!-- <Button label="Save Email" class="mt-5 relative bottom-0 right-0"></Button> -->
            <!-- <FormKit type="checkbox" v-model="saveAsTemplate" label="Save as Template"></FormKit> -->
            <!-- <FormKit type="date" v-model="sendDate" label="Send Date"></FormKit> -->
            <Button @click="sendEmail">Send Email Now</Button>
            <Button>Schedule Email</Button>
        </section>
    </div>
    <Modal :showing="!!selectedParticipant" @close="handleParticipantReset" v-if="selectedParticipant"
        class="text-left">
        <section class="my-5">
            <h1>{{ selectedParticipant.first_name + " " + selectedParticipant.last_name }}</h1>
            <h2>{{ selectedParticipant.email }}</h2>
        </section>

        <h3>Prompts they will receive:</h3>
        <ul class="list-disc">
            <li v-for="prompt in selectedParticipantPrompts">{{ prompt.prompt_text }}</li>
        </ul>
    </Modal>
</template>

<script setup>
import Tooltip from 'primevue/tooltip';
import { Button } from 'primevue';
import { Select } from 'primevue';
import { useCounterStore } from '@/stores/store'
import { computed, onMounted, ref } from 'vue';
import Editor from 'primevue/editor'
import Chip from 'primevue/chip';
import Modal from '@/components/Modal.vue';
import { supabase } from "../lib/supabaseClient";

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

//Get greetings from store
const store = useCounterStore();

//Email Text
const text = ref('');

const greetings = computed(() => store.greetings.filter(greeting => greeting.is_template === true));

//Selected Greeting
const selectedGreeting = ref(null);

//Get participants from store
const participants = computed(() => store.participants);

const promptsToSend = ref([]);
const selectedParticipant = ref(null);
const selectedParticipantPrompts = ref([]);

//Selected Participants
// const selectedParticipants = ref([]);

//Filter participants where status = 'active'
const activeParticipants = computed(() => store.participants.filter(participant => participant.status === 'active'));

// const selectAllParticipants = () => {
//     if (selectedParticipants.value.length === activeParticipants.value.length) {
//         selectedParticipants.value = [];
//     } else {
//         selectedParticipants.value = activeParticipants.value.map(participant => participant.id);
//     }
// }

// const selectAllLabel = computed(() => {
//     return selectedParticipants.value.length === activeParticipants.value.length ? 'Deselect All' : 'Select All';
// });

const textExcerpt = (text) => {
    return text.substr(0, 15) + '...';
}

const longExcerpt = (text) => {
    return text.substr(0, 50) + '...';
}

const changeSelectedGreeting = (greeting) => {
    selectedGreeting.value = greeting;
    text.value = selectedGreeting.value.text;
}

const fetchNextPrompts = async (participant) => {
    const result = await supabase.rpc('get_next_prompt_set', {user_id: participant.id});
    return result.data;
}

const handleSelectParticipant = (participant) => {
    selectedParticipant.value = participant;
    selectedParticipantPrompts.value = promptsToSend.value.find(prompt => prompt.participant === participant.id).prompts;
}

const handleParticipantReset = () => {
    selectedParticipant.value = null;
    selectedParticipantPrompts.value = [];
}

const sendEmail = async () => {
    
}

onMounted(async () => {
    const activeParticipants = store.participants.filter(participant => participant.status === 'active');
    for(let participant of activeParticipants) {
        if (participant.id) {
            const promptSet = await fetchNextPrompts(participant);
            if (promptSet)
            promptsToSend.value.push( { participant: participant.id, prompts: promptSet } );
        else{
            console.error('Prompt set undefined')
        }
        }
    }
});
</script>

<style lang="scss" scoped></style>