<script setup>
import { ref } from "vue"
import axios from "axios";
import { useStore } from "vuex";

const store = useStore();
const username = ref("");
const password = ref("");
const isLoginMode = ref(true);
const errorMessage = ref("");

const handleSubmit = async () => {
    if (!username || !password) {
        errorMessage.value = "Please fill in all fields";
        return;
    }

    try {
        const url = isLoginMode.value ? "http://localhost:8080/auth/login" : "http://localhost:8080/auth/register";

        const response = await axios.post(url, {
            username: username.value,
            password: password.value,
        }); 

        if (isLoginMode.value) {
            store.dispatch('login', {
                id: response.data.id,
                username: response.data.username
            });
            console.log("Logged in:", response.data);
        } else {
            console.log("Registered successfully, please log in!");
            isLoginMode.value = true;
            errorMessage.value = "Registration successfull, please log in!";
        }

        username.value = "";
        password.value = "";
     } catch (error) {
        errorMessage.value = error.response?.data?.message || (isLoginMode.value ? "Login failed" : "Registration failed");
        console.error("Error: ", error);
     } 
} 

const toggleAuthMode = () => {
    isLoginMode.value = !isLoginMode.value;
    errorMessage.value = "";
    username.value = "";
    password.value = "";
}

</script>

<template>
    <div class="authContainer">
        <h1>{{ isLoginMode ? 'Login' : 'Registration'}}</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Username</label>
                <input type="text" v-model="username" required>
            </div>

            <div class="form-group">
                <label>Password:</label>
                <input type="password" v-model="password" required>
            </div>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>

            <button type="submit">
                {{ isLoginMode ? 'Login' : 'Register' }}
            </button>

            <p class="toggle-mode">
                {{ isLoginMode ? 'Need an account?' : 'Already have an account?' }}
                <a href="#" @click.prevent="toggleAuthMode">
                    {{ isLoginMode ? 'Register' : 'Login' }}
                </a>
            </p>


        </form>
    </div>
    
</template>

<style scoped>
.auth-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 1rem;
}

input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #3aa876;
}

.error-message {
    color: #ff4444;
    margin: 10px 0;
}

.toggle-mode {
    margin-top: 1rem;
    text-align: center;
}

a {
    color: #42b983;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>