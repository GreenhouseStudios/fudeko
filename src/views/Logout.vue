<template>
    <div class="my-5">
        <h2>You have successfully logged out.</h2>
    </div>
</template>

<script>
    export default {
        mounted () {
            setTimeout(() => {
                this.$router.push('/')
            }, 3000);
        },
    }
</script>

<style lang="scss" scoped>

</style>