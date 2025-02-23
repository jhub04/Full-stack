<script setup>
import { ref } from "vue"
import axiso from "axios";

const username = ref("");
const password = ref("");

const handleLogin = async () => {
    if (!username || !password) return;

    try {
        const response = await axios.post("http://localhost:8080/api/calculator/login", {
            username: this.username,
            password: this.password   
        });
        const result = response.data;
    } catch (error) {
        console.error("Error during login");
    }
}
</script>

<template>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
        <p>Username: <input type="text" required v-model="username"></p>
        <p>Password: <input type="text" required v-model="password"></p>

        <button type="submit">Login</button>
    </form>
</template>