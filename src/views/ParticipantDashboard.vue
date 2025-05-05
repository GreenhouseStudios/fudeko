<template>
    <div >
        <h1>My Responses</h1>
        <Responses :user="store.participantRecord" />
    </div>
</template>

<script setup>
import Responses from '@/components/admin/Responses.vue';
import { useCounterStore } from '@/stores/store';
const store = useCounterStore();

</script>

<style lang="scss" scoped></style>