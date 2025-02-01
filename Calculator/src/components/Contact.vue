<script setup>
import { ref } from "vue";


const nameField = ref("");
const emailField = ref("");
const reviewField = ref("");


const handle = () => {
  console.log(nameField.value);
  console.log(emailField.value);
  console.log(reviewField.value);
};
</script>

<template>
    <h2>Contact Form</h2>
    <form @submit.prevent="handleSubmit">
      <p>Name: <input type="text" required v-model="nameField" /></p>
      <p>Email: <input type="text" required v-model="emailField" /></p>
      <p>Review: <input type="text" required v-model="reviewField" /></p>
  
      <button type="submit">Send form</button>
    </form>
  </template>