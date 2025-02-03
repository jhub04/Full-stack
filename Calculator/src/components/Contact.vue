<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import router from "../router";

const store = useStore();

const nameField = ref(store.state.name || "");
const emailField = ref(store.state.email || "");
const reviewField = ref("");
const status = ref("");

const isValid = computed(() => {
  return nameField.value && emailField.value && reviewField.value;
});

const submissionConfirmed = computed(() => {
    return status.value !== "";
});

const handleSubmit = async () => {
  const submitResponse = await axios.get("http://localhost:3000/form");

  if (submitResponse.data.status = "true") {
    status.value = submitResponse.data;
  } 
  store.commit("setName", nameField.value);
  store.commit("setEmail", emailField.value);
};
</script>

<template>
  <h2>Contact Form</h2>
  <p id="subConfirmation" v-if="submissionConfirmed">Submission received!</p>
  <form @submit.prevent="handleSubmit">
    <p>Name: <input type="text" required v-model="nameField" /></p>
    <p>Email: <input type="text" required v-model="emailField" /></p>
    <p>Review: <input type="text" required v-model="reviewField" /></p>

    <button type="submit" :disabled="!isValid">Send form</button>
  </form>
</template>

<style scoped>

#subConfirmation {
    font-weight: bold;
    color: green;
}
</style>