<template>
  <div>
    <h1 class="m-10 text-xl">Admin: Enter Response for Participant</h1>

    <div class="my-10">
      <label for="participant-select" class="mr-5">Select Participant</label>
      <Dropdown
        id="participant-select"
        v-model="selectedParticipant"
        :options="props.participants"
        :placeholder="'Select participant'"
        @change="handleParticipantChange"
      >
        <template #option="slotProps">
          <span>{{ slotProps.option.first_name }} {{ slotProps.option.last_name }}</span>
        </template>
        <template #value="slotProps">
          <span v-if="slotProps.value">
            {{ slotProps.value.first_name }} {{ slotProps.value.last_name }}
          </span>
          <span v-else>Select participant</span>
        </template>
      </Dropdown>
    </div>

    <div class="my-10">
      <label for="select-prompt" class="mr-5">Select Prompt</label>
      <Dropdown
        id="select-prompt"
        v-model="selectedPrompt"
        :options="props.prompts"
        :placeholder="'Select prompt'"
        @change="handlePromptChange"
      >
        <template #option="slotProps">
          <span>{{ truncateText(slotProps.option.prompt_text) }}</span>
        </template>
        <template #value="slotProps">
          <span v-if="slotProps.value">
            {{ truncateText(slotProps.value.prompt_text) }}
          </span>
          <span v-else>Select prompt</span>
        </template>
      </Dropdown>
    </div>

    <h2 class="m-2">
      {{ selectedPrompt?.prompt_text }}
    </h2>
    <p>{{ selectedPrompt?.prompt_subtext }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  adminParticipant: any;
  participants: any[];
  adminPrompt: any;
  prompts: any[];
}>();

const emit = defineEmits(['admin-participant-change', 'admin-prompt-change']);

const selectedParticipant = ref(props.adminParticipant);
const selectedPrompt = ref(props.adminPrompt);

function handleParticipantChange(e: any) {
  emit('admin-participant-change', e.value);
}

function handlePromptChange(e: any) {
  emit('admin-prompt-change', e.value);
}

function truncateText(text: string, length: number = 20) {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '...' : text;
}
</script>
