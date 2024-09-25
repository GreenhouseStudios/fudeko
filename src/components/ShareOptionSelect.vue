<template>
  <div class="flex flex-col items-start my-5" id="share-options-container">
    <h2 class="font-bold">Would you like to publish this response?</h2>
    <div class="flex" id="sharing-options">

      <Dropdown v-model="shareOption" :options="shareSettings" optionLabel="name" 
         class="w-full md:w-14rem" placeholder="Select an option" />

    </div>

    <i class="mx-auto my-5 md:w-full" v-html="shareOption?.description"></i>

    <div v-if="shareOption && shareOption.name == 'Share with Credit'" class="flex flex-col">

      <Dropdown v-model="attrOption" :options="attrSettings" optionLabel="description" 
       class="w-full my-5 md:w-14rem"
        placeholder="Select an attribute option" />


      <div v-if="attrOption.name == 'CreditWithGivenName'" class="flex justify-start my-5">
        You will be credited as
        {{
          participantRecord.first_name +
          " " +
          participantRecord.last_name
        }}
      </div>
      <div v-if="attrOption.name == 'CreditDifferent'" class="flex items-center justify-start">
        <label for="alt-credit" class="mr-2">Enter name to be credited as:</label>
        <input id="alt-credit" type="text" v-model="creditName" class="p-2 border-2 rounded-md" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ShareOption, AttrOption } from "../types/Form";
const creditName = defineModel("creditName");
const shareOption = defineModel<ShareOption>("shareOption");
const attrOption = defineModel<AttrOption>("attrOption");
import Dropdown from "primevue/dropdown";
const props = defineProps<{
  shareSettings: ShareOption[];
  attrSettings: AttrOption[];
  participantRecord: {
    first_name: string;
    last_name: string;
  };
}>();
const emit = defineEmits(["changeShareOption", "changeAttrOption", "changeCreditName"]);
</script>