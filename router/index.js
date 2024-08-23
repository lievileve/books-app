import {createMemoryHistory, createRouter} from 'vue-router';

import Overview from '../resources/js/domains/books/pages/Overview.vue';

const routes = [{path: '/', name: 'overview', component: Overview}];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
