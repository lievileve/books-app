import {createMemoryHistory, createRouter} from 'vue-router';
import Overview from '../domains/books/pages/Overview.vue';
import Create from '@/domains/books/pages/Create.vue';
import Edit from '@/domains/books/pages/Edit.vue';
// import Overview from '@/domains/authors/pages/Overview.vue';

const routes = [
    {path: '/', name: 'overview', component: Overview},
    {path: '/create', name: 'create', component: Create},
    {path: '/edit/:id', name: 'edit', component: Edit},
    // {path: '/authors', name: 'authors', component: Overview}
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
