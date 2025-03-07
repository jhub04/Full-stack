<script setup>
import { ref } from "vue"
import axios from "axios";
//import { useStore } from "vuex";
import { useTokenStore } from "@/store/token";
import { useRouter } from "vue-router";


//const store = useStore();
const tokenStore = useTokenStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const loginStatus = ref("");

async function handleLoginClick() {
    await tokenStore.getTokenAndSaveInStore(username.value, password.value);
    if (tokenStore.jwtToken) {
        router.push("/");
    } else {
        this.loginStatus = "Login failed!";
    }
}



</script>

<template>
    <div id="loginWrapper">
        <h1 class="loginElement">Login</h1>
        <p v-if="loginStatus">{{ loginStatus }}</p>
        <h3 class="loginElement">Username</h3>
        <input class="loginElement" v-model="username">
        <h3 class="loginElement">Password</h3>
        <input class="loginElement" v-model="password">
        <button class="loginElement" @click="handleLoginClick" id="loginButton">Login</button>
    </div>
    </template>

<style scoped>
#loginWrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

h1, #loginButton{
    grid-column: span 2;
}

.loginElement {
    margin:5px;
}

</style>