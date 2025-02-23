import { createRouter, createWebHistory} from 'vue-router';
import CalculatorView from '../views/CalculatorView.vue';
import ContactView from '../views/ContactView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: CalculatorView
        },
        {
            path: '/contactform',
            name: 'contactform',
            component: ContactView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        }
    ]
})

export default router
