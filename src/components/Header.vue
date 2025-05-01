<template>
    <header class="flex justify-between pb-12 mb-24">
        <router-link to="/">
            <span class="flex items-center float-left pt-2">
                <img src="../assets/Fudeko-Logo-Final.png" alt="fudeko mikan logo" class="inline w-16 md:w-36">
            </span>
        </router-link>
        <Nav></Nav>
    </header>
</template>

<script setup lang="ts">
import Nav from './Nav.vue';
</script>

<style scoped></style>