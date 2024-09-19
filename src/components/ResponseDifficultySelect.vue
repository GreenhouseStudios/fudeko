<template>
  <div class="py-12">
    <div class="flex flex-col justify-start w-1/4" id="feedback-container">
      <label for="feedback" class="mx-2 font-bold">How difficult was this to answer?</label>
      <Dropdown v-model="props.difficulty" :options="props.difficultyOptions" class="m-2"></Dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  difficulty: string;
  difficultyOptions: string[];
}>();
</script>