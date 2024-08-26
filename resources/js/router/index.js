import {createMemoryHistory, createRouter} from 'vue-router';
import Overview from '../domains/books/pages/Overview.vue';
import Create from '@/domains/books/pages/Create.vue';
import Edit from '@/domains/books/pages/Edit.vue';

const routes = [
    {path: '/', name: 'overview', component: Overview},
    {path: '/create', name: 'create', component: Create},
    {path: '/edit/:id', name: 'edit', component: Edit},
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
