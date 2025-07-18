<template>
  <div class="flex flex-col items-start my-5" id="share-options-container">
    <h2 class="font-bold">Would you like to publish this response?</h2>
    <div class="flex" id="sharing-options">
      <Dropdown 
        :modelValue="shareOption"
        @update:modelValue="updateShareOption"
        :options="shareSettings"
        optionLabel="name"
        class="w-full md:w-14rem"
        placeholder="Select an option"
      />
    </div>

    <i class="mx-auto my-5 md:w-full" v-html="shareOption?.description"></i>

    <div v-if="shareOption?.name === 'Share with Credit'" class="flex flex-col">

      <Dropdown
        :modelValue="attrOption"
        @update:modelValue="updateAttrOption"
        :options="attrSettings"
        optionLabel="description"
        class="w-full my-5 md:w-14rem"
        placeholder="Select an attribute option"
      />

      <div v-if="attrOption?.name === 'CreditDifferent'" class="flex items-center justify-start">
        <label for="alt-credit" class="mr-2">Enter name to be credited as:</label>
        <input
          id="alt-credit"
          type="text"
          :value="creditName"
          @input="updateCreditName"
          class="p-2 border-2 rounded-md"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown';
import { ShareOption, AttrOption } from '../types/Form';

const props = defineProps<{
  shareSettings: ShareOption[];
  shareOption: ShareOption | null;
  attrSettings: AttrOption[];
  attrOption: AttrOption | null;
  creditName: string;
  participantRecord: {
    first_name: string;
    last_name: string;
  };
}>();

const emit = defineEmits<{
  (e: 'update:shareOption', value: ShareOption | null): void;
  (e: 'update:attrOption', value: AttrOption | null): void;
  (e: 'update:creditName', value: string): void;
}>();

function updateShareOption(value: ShareOption | null) {
  emit('update:shareOption', value);
}

function updateAttrOption(value: AttrOption | null) {
  emit('update:attrOption', value);
}

function updateCreditName(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:creditName', input.value);
}
</script>
