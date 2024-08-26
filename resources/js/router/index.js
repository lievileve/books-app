import {createMemoryHistory, createRouter} from 'vue-router';
import Overview from '../domains/books/pages/Overview.vue';
import Create from '@/domains/books/pages/Create.vue';

const routes = [
    {path: '/', name: 'overview', component: Overview},
    {path: '/create', name: 'create', component: Create},
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
