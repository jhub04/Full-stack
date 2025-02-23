<script setup>
import { ref } from 'vue';
import CalculatorView from './views/CalculatorView.vue';

</script>

<template>
  <div>
    <nav>
      <router-link to="/">Calculator</router-link>
      <router-link to="/contactform">Contact Form</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: black;
}
</style>
