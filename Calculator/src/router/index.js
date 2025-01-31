import { createRouter, createWebHistory} from 'vue-router';
import CalculatorView from '../views/CalculatorView.vue';
import ContactView from '../views/ContactView.vue';

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
        }
    ]
})

export default router
