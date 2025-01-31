<script setup>
import { ref } from 'vue';

const props = defineProps({
    history: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="history">
        <div class="history-container">
            <h1>History</h1>
            <p v-for="(entry, index) in props.history" :key="index"> {{ entry }}</p>

        </div>
    </div>
</template>

<style scoped>

</style>