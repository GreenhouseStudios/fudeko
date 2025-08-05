<template>
    <div>
        <div class="vh-100 relative">
            <h1>New Email</h1>

            <section class="my-5 mx-auto">
                <DataTable :value="activeParticipants" dataKey="id" class="mx-auto my-5" v-model:selection="includedParticipants" selectionMode="multiple" :sortOrder="-1">
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="first_name" header="First Name"></Column>
                    <Column field="last_name" header="Last Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column header="Actions">
                        <template #body="slotProps">
                            <Button @click="handleSelectParticipant(slotProps.data)" label="View Prompts"
                                class="p-button-outlined p-button-secondary"></Button>
                        </template>
                    </Column>
                </DataTable>
            </section>

            <h4 class="text-left my-5 text-sm font-normal">Click option below to use a template greeting.</h4>
            <Select v-model="selectedGreeting" :options="greetings" optionLabel="title" placeholder="Select a greeting"
                class="w-1/3 my-5"></Select>


            <section v-if="selectedGreeting"
                class="text-left flex gap-2 flex-col my-12 min-h-56 bg-yellow-100 p-8">
                <h2 v-html="selectedGreeting?.title"></h2>
                <p v-html="selectedGreeting?.text"></p>
            </section>

            <section class="flex flex-col w-1/3 gap-2 justify-center mx-auto items-center mt-8">
                <Button v-if="selectedGreeting" class="w-36" @click="sendEmail">Send Now</Button>
            </section>
        </div>
        <Modal :showing="!!selectedParticipant" @close="handleParticipantReset" v-if="selectedParticipant"
            class="text-left">
            <section class="my-5">
                <h1>{{ selectedParticipant.first_name + " " + selectedParticipant.last_name }}</h1>
                <h2 class="text-sm font-normal">{{ selectedParticipant.email }}</h2>
                <h3 class="mt-5">Prompts they will receive:</h3>
                <ol class=" list-decimal pl-5">
                    <li v-for="prompt in selectedParticipantPrompts">{{ prompt.prompt_text }}</li>
                </ol>
            </section>
        </Modal>
    </div>
</template>

<script setup>
import Tooltip from 'primevue/tooltip';
import { Button } from 'primevue';
import { Select } from 'primevue';
import { useCounterStore } from '@/stores/store';
import { computed, onMounted, ref } from 'vue';
import Editor from 'primevue/editor';
import Chip from 'primevue/chip';
import Modal from '@/components/Modal.vue';
import { supabase } from "../lib/supabaseClient";
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { useRouter } from 'vue-router';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';


const counterStore = useCounterStore();
const router = useRouter();
const text = ref('');
const selectedGreeting = ref(null);
const promptsToSend = ref([]);
const includedParticipants = ref([]);
const selectedParticipant = ref(null);
const selectedParticipantPrompts = ref([]);
const greetingMode = ref([
    { label: 'Use Existing Greeting', value: 'existing' },
    { label: 'Create New Greeting', value: 'new' }
]);
const selectedGreetingMode = ref({ label: 'Use Existing Greeting', value: 'existing' });
const saveAsTemplate = ref(false);

const activeParticipants = computed(() => {
    return counterStore.participants.filter(participant => participant.status === 'active');
});

const greetings = computed(() => {
    return counterStore.greetings.map(greeting => ({
        ...greeting,
        title: greeting.title.replace(/<[^>]+>/g, '')
    }));
});

const greetingsTemplates = computed(() => {
    return greetings.value.filter(greeting => greeting.is_template === true);
});

const showSendButton = computed(() => {
    return selectedGreetingMode.value.value === 'existing' && selectedGreeting.value;
});

const stripHTML = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

const textExcerpt = (text) => {
    return stripHTML(text).substring(0, 15) + '...';
};

const longExcerpt = (text) => {
    return text.substr(0, 50) + '...';
};

const changeSelectedGreeting = (greeting) => {
    selectedGreeting.value = greeting;
    text.value = selectedGreeting.value.text;
};

const fetchNextPrompts = async (participant) => {
    const result = await supabase.rpc('get_next_prompt_set', { user_id: participant.id });
    return result.data;
};

const handleSelectParticipant = (participant) => {
    selectedParticipant.value = participant;
    selectedParticipantPrompts.value = promptsToSend.value.find(prompt => prompt.participant === participant.id).prompts;
};

const handleParticipantReset = () => {
    selectedParticipant.value = null;
    selectedParticipantPrompts.value = [];
};

const generatePrompts = async () => {
    const includedIds = includedParticipants.value.map(p => p.id);
    console.log('Included Participants:', includedIds);
    const obj = promptsToSend.value.filter(pr => includedIds.includes(pr.participant) ).map(p => ({
        participant: p.participant,
        prompts: p.prompts.map(prompt => prompt.id)
    }));
    console.log(obj)
    for (const o of obj) {
        await supabase.rpc('create_outbounds', o);
    }
};

const sendEmail = async () => {
    await generatePrompts();
    await supabase.rpc('set_active_greeting', { greeting_id: selectedGreeting.value.id });
    await counterStore.AddNewEmail({
        greeting: selectedGreeting.value.id,
        status: 'sent',
    });
    console.log('Sending emails to:', includedParticipants.value.map(p => p.id));
    const { error } = await supabase.rpc('send_emails', {
        participant_ids: includedParticipants.value.map(p => p.id),
    });
    if (error) console.error(error);
    else {
        router.push('/admin');
    }
};

const saveForLater = async () => {
    if (selectedGreetingMode.value.value === 'new') {
        await counterStore.submitGreeting({
            text: text.value,
            title: selectedGreeting.value.title,
            is_template: saveAsTemplate.value,
        });
    }
    await counterStore.AddNewEmail({
        greeting: selectedGreeting.value.id,
    });
};

onMounted(() => {
    counterStore.getActiveParticipants.forEach(async participant => {
        if (participant.id) {
            const promptSet = await fetchNextPrompts(participant);
            if (promptSet) {
                promptsToSend.value.push({ participant: participant.id, prompts: promptSet });
            } else {
                console.error('Prompt set undefined');
            }
        }
    });
});
</script>

<style lang="scss" scoped></style>
