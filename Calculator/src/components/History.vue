<script setup>

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
            <ul>
                <li v-for="(entry, index) in props.history" :key="index"> {{ entry }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.history {
  min-width: 400px;  
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.history-container {
  text-align: left;
}

.history h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.history ul {
  list-style-type: none;
  padding: 0;
}

.history li {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.history li:hover {
  background-color: #f0f0f0;
}
</style>