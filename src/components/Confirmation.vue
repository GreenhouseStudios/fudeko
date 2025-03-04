<template>
    <div class="py-48">
        <h2 class="text-xl font-bold"> {{ message }}</h2>
    </div>
</template>

<script>

export default {
    props: {
        message: {
            type: String,
            default: "Thank you for your submission!"
        }
    },
}
</script>

<style lang="scss" scoped></style>