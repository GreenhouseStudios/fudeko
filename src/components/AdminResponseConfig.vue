<template>
  <div v-if="isAdminRoute">
    <h1 class="m-10 text-xl">Admin: Enter Response for Participant</h1>
    <div class="my-10">
      <label for="participant-select" class="mr-5">Select Participant</label>
      <Dropdown id="participant-select" v-model="adminParticipant" :options="participants" optionLabel="last_name">
      </Dropdown>
    </div>
    <div class="my-10">
      <label for="select-prompt" class="mr-5">Select Prompt</label>
      <Dropdown id="select-prompt" v-model="adminPrompt" :options="prompts" optionLabel="prompt_text">
      </Dropdown>
    </div>
    <h2 class="m-2">
      {{ adminPrompt?.prompt_text }}
    </h2>
    <p>{{ adminPrompt?.prompt_subtext }}</p>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, defineProps } from "vue";
import Dropdown from "primevue/dropdown";

const props = defineProps<{
  isAdminRoute: any;
  adminParticipant: null;
  participants: any;
  adminPrompt: null;
  prompts: any;
}>();
const { isAdminRoute, adminParticipant, participants, adminPrompt, prompts } = toRefs(props);
</script>