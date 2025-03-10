import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia"
import router from './router'

import piniaPluginPersistedState from "pinia-plugin-persistedstate"


const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);

app.mount('#app');
