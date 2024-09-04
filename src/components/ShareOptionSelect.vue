<template>

  <div class="flex flex-col items-start my-5" id="share-options-container">
    <h2 class="font-bold">Would you like to publish this response?</h2>
    <div class="flex" id="sharing-options">
      <span class="flex flex-wrap items-center justify-center gap-2 my-2 mr-5 align-middle">
        <button @click="shareOption = option" v-for="option in shareSettings" :key="option.name"
          class="z-10 w-48 h-24 p-2 border-2 rounded-md" :class="option === shareOption
              ? 'bg-yellow-300 border-gray-600 font-bold border-2'
              : 'border-yellow-300 hover:bg-yellow-200'
            ">
          {{ option.name }}
        </button>
      </span>
    </div>

    <i class="mx-auto my-5 md:w-full" v-html="shareOption.description"></i>

    <div v-if="shareOption && shareOption.name != 'Keep Private'">
      <span class="flex flex-wrap items-center justify-center gap-2 mt-2 mb-5 mr-5 align-middle">
        <button @click="attrOption = option" v-for="option in attrSettings" :key="option.name"
          class="z-10 w-48 h-24 p-2 border-2 rounded-md" :class="option === attrOption
              ? 'bg-yellow-300 border-gray-600 font-bold border-2'
              : 'border-yellow-300 hover:bg-yellow-200'
            ">
          {{ option.description }}
        </button></span>

      <div v-if="attrOption.name == 'CreditWithGivenName'" class="flex justify-start">
        You will be credited as
        {{
          participantRecord.first_name +
          " " +
          participantRecord.last_name
        }}
      </div>
      <div v-if="attrOption.name == 'CreditDifferent'" class="flex justify-start">
        <label for="alt-credit" class="mr-2">Enter name to be credited as:</label>
        <input id="alt-credit" type="text" v-model="creditName" class="p-2 border-2 rounded-md" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps<{
  shareSettings: {
    name: string;
    description: string;
  }[];
  shareOption: {
    name: string;
    description: string;
  };
  attrSettings: {
    name: string;
    description: string;
  }[];
  attrOption: string;
  creditName: string;
}>();
const { shareSettings, shareOption, attrSettings, attrOption, creditName } = toRefs(props);
</script>