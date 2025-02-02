<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();

const nameField = ref(store.state.name || "");
const emailField = ref(store.state.email || "");
const reviewField = ref("");

const isValid = computed(() => {
  return nameField.value && emailField.value && reviewField.value;
});

const handleSubmit = () => {
    const submitResponse = axios.get("http://localhost:3000/form");

    alert("Response: " + submitResponse);
  store.commit("setName", nameField.value);
  store.commit("setEmail", emailField.value);
};
</script>

<template>
  <h2>Contact Form</h2>
  <form @submit.prevent="handleSubmit">
    <p>Name: <input type="text" required v-model="nameField" /></p>
    <p>Email: <input type="text" required v-model="emailField" /></p>
    <p>Review: <input type="text" required v-model="reviewField" /></p>

    <button type="submit" :disabled="!isValid">Send form</button>
  </form>
</template>
