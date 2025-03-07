import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia"
import router from './router'
import store from './store';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(store);

app.mount('#app');
