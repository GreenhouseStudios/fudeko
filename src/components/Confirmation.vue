<template>
    <div class="py-48">
        <h2 class="text-xl font-bold mb-2"> {{ displayMessage }}</h2>
        <div class="flex flex-col gap-2">
            <a class="text-blue-500" href="/">Return Home</a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '@/stores/store'
import { RouterLink } from 'vue-router'

export default {
    props: {
        message: {
            type: String,
            default: "Thank you for your submission!"
        }
    },
    data() {
        return {
            displayMessage: 'Submission Complete.'
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['submitResponse'] ),
        backEdit() {
            this.$router.push( { name: 'ResponseForm' } )
        },
    },
    mounted() {
        if(this.$router.params.message) {
            this.displayMessage = this.$router.params.message;
        } else {
            this.displayMessage = this.message;
        }
    },
}
</script>

<style lang="scss" scoped></style>