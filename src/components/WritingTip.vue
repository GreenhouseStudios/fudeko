<template>
    <div class="mt-16">
        <div class="relative p-3 bg-white">
            <h2 class="text-lg font-bold text-left " :class="hidden? '' : 'mb-2'">Writing Tip </h2>
          <div v-show="!hidden">  <h2 class="pb-1 text-lg">{{ currentTip.tip_title }}</h2>
            <p class="leading-5 text-left text-md" >{{ currentTip.tip_text }}</p></div>
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
        },
        tipTitle:{
            type: String,
            default: ""
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