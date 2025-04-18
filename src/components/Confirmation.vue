<template>
    <div class="py-48">
        <h2 class="text-xl font-bold"> {{ displayMessage }}</h2>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapActions } from 'pinia'

export default {
    props: {
        response: {
            type: String,
            default: ""
        },
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