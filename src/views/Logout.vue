<template>
    <div class="my-5">
        <h2>You have successfully logged out.</h2>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '@/stores/store'

    export default {
        mounted () {
            this.logout()
            setTimeout(() => {
                this.$router.push('/')
            }, 3000);
        },
        computed: {
            
            name() {
                return this.data 
            }
        },
        methods: {
            ...mapActions(useCounterStore,['logout'])
        },
    }
</script>

<style lang="scss" scoped>

</style>