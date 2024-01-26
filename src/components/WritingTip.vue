<template>
    <div class="mt-16">
        <div class="relative p-8 bg-white">
            <p class="mb-2 text-lg font-black text-left">Writing Tip </p>
            <p class="leading-5 text-left text-md" v-show="!hidden">{{ currentTip }}</p>
            <Button class="absolute p-2 font-bold top-2 right-2" :icon="hidden ? 'pi pi-angle-down' : 'pi pi-angle-up'" @click="hidden = !hidden"></Button>
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';
export default {
    props: {
        tip: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            currentTip: this.tip,
            hidden: false,
        }
    },
    watch: {
        tip() {
            this.currentTip = this.tip
        }
    },
    components: {
        Button,
    },
}
</script>

<style lang="scss" scoped></style>