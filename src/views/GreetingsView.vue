<template>
    <div class="w-1/2 mx-auto flex flex-col gap-5">
        <h1 v-html="greeting.title"></h1>
        <h1>Text</h1>
        <p v-html="greeting.text" class="font-bold fudeko-blue p-8"></p>
        <h1>Subject Line</h1>
        <p v-html="greeting.subject" class="font-bold fudeko-blue p-8"></p>
        <router-link :to="'/greetings/edit/' + $route.params.id" class="font-bold text-lg my-5"><Button>Edit</Button></router-link>
        <!-- <div v-html="response.response_text" class="p-12 my-24 bg-yellow-100 "> -->
    <!-- </div> -->
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/store'

const route = useRoute()
const counterStore = useCounterStore()

const greeting = computed(() => {
    return counterStore.greetings.find(r => r.id == parseInt(route.params.id))
})
</script>

<style lang="scss" scoped></style>
