<template>
  <div id="admin-response-config">
    <h1 class="m-10 text-xl">Admin: Enter Response for Participant</h1>
    <div class="my-10">
      <label for="participant-select" class="mr-5">Select Participant</label>
      <Dropdown id="participant-select" @change="$emit('handleAdminParticipantChange')" v-model="props.adminParticipant" :options="props.participants" optionLabel="last_name">
      </Dropdown>
    </div>
    <div class="my-10">
      <label for="select-prompt" class="mr-5">Select Prompt</label>
      <Dropdown id="select-prompt" v-model="props.adminPrompt" :options="props.prompts" optionLabel="prompt_text">
      </Dropdown>
    </div>
    <h2 class="m-2">
      {{ props.adminPrompt?.prompt_text }}
    </h2>
    <p>{{ props.adminPrompt?.prompt_subtext }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  adminParticipant: null;
  participants: any;
  adminPrompt: any;
  prompts: any;
}>();
</script>