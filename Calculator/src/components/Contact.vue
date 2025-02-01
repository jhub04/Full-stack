<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const nameField = ref(store.state.name || '');
const emailField = ref(store.state.email || '');
const reviewField = ref("");


const handleSubmit = () => {
  console.log(nameField.value);
  console.log(emailField.value);
  console.log(reviewField.value);

  store.commit('setName', nameField.value);
  store.commit('setEmail', emailField.value);


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