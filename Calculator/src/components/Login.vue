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
    try {
        await tokenStore.getTokenAndSaveInStore(username.value, password.value, tokenStore.jwtToken);
        if (tokenStore.jwtToken) {
            router.push("/");
        }
    } catch (error) {
        loginStatus.value = "Credentials are invalid";
    }
}



</script>

<template>
    <div id="loginWrapper">
        <h1 class="loginElement">Login</h1>
        <h3 class="loginElement">Username</h3>
        <input class="loginElement" v-model="username">
        <h3 class="loginElement">Password</h3>
        <input type="password" class="loginElement" v-model="password">
        <button class="loginElement" @click="handleLoginClick" id="loginButton">Login</button>
    </div>
    <p v-if="loginStatus" id="loginstatus">{{ loginStatus }}</p>
    </template>

<style scoped>
#loginstatus {
    color: red;
}

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