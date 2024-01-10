<template>
    <div>

        <h2 class="font-bold text-center">Select one of the following prompts to answer this week:</h2>
        <span class="flex flex-col justify-center gap-3 my-4 md:gap-5 grow md:flex-row" id="prompt-choices-container">
            <div class="relative" id="button-wrapper" v-for="prompt in prompts" :key="prompt.prompt_text"
                v-show="!questionsNotToAsk.includes(prompt.id)">
                <button @click="setActivePrompt(prompt)"
                    class="w-full p-3 px-3 bg-yellow-200 border-2 border-yellow-400 rounded shadow-md md:max-w-md md:p-1 md:h-36 animate__animated animate__fadeIn hover:bg-yellow-100"
                    :class="prompt === activePrompt ? 'bg-yellow-200' : 'bg-yellow-300'">{{ prompt.prompt_text }}</button>
                <button
                    class="absolute flex items-center justify-center w-8 h-8 font-bold text-center bg-red-500 border-2 border-white rounded-full -top-2 -right-2 hover:bg-red-300"
                    @click.prevent.stop="DoNotAsk(prompt)" v-tooltip="'Never ask this question again?'"></button>
            </div>
        </span>
    </div>
</template>

<script>
export default {
props: {
    prompts: {
        type: Array,
    },
},
}
</script>

<style lang="scss" scoped></style>