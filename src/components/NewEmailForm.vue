<template>
    <div class="vh-100 relative">
        <h1>New Email</h1>

        <!-- Simple list of participant first and last names without selection -->
        <section class="my-5 mx-auto">
            <Accordion value="0">
                <AccordionPanel value="0">
                    <AccordionHeader>Participants List</AccordionHeader>
                    <AccordionContent>
                        <h4>Click on a participant to see details</h4>
                        <div class="flex flex-wrap gap-2 p-4 my-5 fudeko-blue">
                            <Chip @click="handleSelectParticipant(participant)" v-for="participant in store.getActiveParticipants"
                                :key="participant.id" class="font-bold p-1 border rounded text-center hover:bg-blue-100 cursor-pointer">
                                {{ participant.first_name }} {{ participant.last_name }}
                            </Chip>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </section>

        <!-- <Select v-model="selectedGreetingMode" :options="greetingMode" optionLabel="label"
                            class="w-1/3 my-5"></Select> -->
                    <div v-if="selectedGreetingMode.value === 'existing'">
                        <h4 class="text-left my-5 text-sm font-normal">Click option below to use a template greeting.
                        </h4>
                        <Select v-model="selectedGreeting" :options="greetings" optionLabel="title"
                            class="w-1/3 my-5"></Select>
                    </div>
        <section v-if="selectedGreetingMode.value === 'existing' && selectedGreeting" class="text-left flex gap-2 flex-col my-12 min-h-56 bg-yellow-100 p-8">
            <h2 v-html="selectedGreeting?.title"></h2>
            <p v-html="selectedGreeting?.text"></p>
        </section>

        <section v-if="selectedGreetingMode.value === 'new'" class="text-left flex gap-2 flex-col my-12">
            <Editor class=" bg-white text-center m-auto mb-24" v-model="text" style="height: 320px; max-width: 600px">
            </Editor>
        </section>

        <section class="flex flex-col w-1/3 gap-2 justify-center mx-auto items-center mt-8">
            <FormKit v-if="selectedGreetingMode.value ==='new'" type="checkbox" v-model="saveAsTemplate" label="Save Greeting as Template"></FormKit>
            <Button v-if="selectedGreetingMode.value ==='existing' && selectedGreeting" class="w-36" @click="sendEmail">Send Now</Button>
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

const store = useCounterStore();
const activeParticipants = store.getActiveParticipants;

//Email Text
const text = ref('');

const greetings = store.greetings
const greetingsTemplates = computed(() => store.greetings.filter(greeting => greeting.is_template === true));

//Selected Greeting
const selectedGreeting = ref(null);

const promptsToSend = ref([]);
const selectedParticipant = ref(null);
const selectedParticipantPrompts = ref([]);
const greetingMode = [
    { label: 'Use Existing Greeting', value: 'existing' },
    { label: 'Create New Greeting', value: 'new' }
];
const selectedGreetingMode = ref(greetingMode[0]);

const stripHTML = function stripHtml(html)
{
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

const textExcerpt = (text) => {
    return stripHTML(text).substring(0, 15) + '...';
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

const generatePrompts = async () => {
    const obj = promptsToSend.value.map(p => {
    return {
        participant: p.participant,
        prompts: p.prompts.map(prompt => {
            return prompt.id
        })
    }
  })
    for(const o of obj) {
        const { data, error } = await supabase.rpc('create_outbounds',o);
    }
}

const sendEmail = async () => {
    const res = await generatePrompts();
    const greeting = await store.editGreeting({
        id: selectedGreeting.value.id,
        is_active_greeting: true,
    });
    const email = await store.AddNewEmail({
        greeting: selectedGreeting.value.id,
        status: 'sent',
    });
    let { data, error } = await supabase
    .rpc('send_weekly_emails')
    if (error) console.error(error)
    else console.log(data)
}

const saveForLater = async () => {
    if (selectedGreetingMode.value === 'new') {
        await store.submitGreeting({
            text: text.value,
            title: selectedGreeting.value.title,
            is_template: saveAsTemplate.value,
        });
    }
    await store.AddNewEmail({
        greeting: selectedGreeting.value.id,
    });
}

const showSendButton = computed(() => {
    return selectedGreetingMode.value === 'existing' && selectedGreeting.value;
});

onMounted(async () => {
    
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