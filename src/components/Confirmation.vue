<template>
    <div class="py-48">
        <h2 class="text-xl font-bold"> {{ message }}</h2>
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
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['submitResponse'] ),
        backEdit() {
            this.$router.push( { name: 'ResponseForm' } )
        },
    },
}
</script>

<style lang="scss" scoped></style>