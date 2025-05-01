<template>
	<div class="relative" id="prompt-button">
		<button id="prompt-select-button" @click="setActivePrompt(prompt.id)"
			class="w-full p-3 px-3 text-2xl font-bold bg-yellow-200 border-2 border-yellow-400 rounded shadow-md md:max-w-md md:p-1 md:h-36 animate__animated animate__fadeIn hover:bg-yellow-100"
			:class="prompt === activePrompt ? 'bg-yellow-200' : 'bg-yellow-300'" v-html="prompt.prompt_text">
		</button>
		<Button
			class="absolute flex items-center justify-center w-8 h-8 font-bold text-center text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 hover:bg-red-300"
			@click.prevent.stop="DoNotAsk(prompt)" v-tooltip="'Never ask this question again?'" icon="pi pi-times"
			id="do-not-ask-btn"></Button>
	</div>
</template>

<script setup lang="ts">
import Button  from 'primevue/button'
defineProps<{
	prompt: any;
	setActivePrompt: (p: any) => void;
	DoNotAsk: (prompt: any) => void;
}>()
const activePrompt = defineModel<any>('activePrompt', { required: true })
</script>

<style scoped lang="scss">
#do-not-ask-btn {
    background: red;
    border-color: red;
    border-radius: calc(infinity*1px);
    width: 35px;
    height: 35px;
    position: absolute;
    top: -10px;
    right: -10px;
}
</style>
