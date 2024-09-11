import {createRouter, createWebHistory} from 'vue-router';
import Overview from '../domains/books/pages/Overview.vue';
import Create from '@/domains/books/pages/Create.vue';
import Edit from '@/domains/books/pages/Edit.vue';
import AuthorOverview from '@/domains/authors/pages/AuthorOverview.vue';
import AuthorCreate from '@/domains/authors/pages/AuthorCreate.vue';
import AuthorEdit from '@/domains/authors/pages/AuthorEdit.vue';
import Show from '@/domains/books/pages/Show.vue';
import ReviewEdit from '@/domains/reviews/pages/ReviewEdit.vue';

// const routes = [
//     //Book routes
//     {path: '/', name: 'overview', component: Overview},
//     {path: '/create', name: 'create', component: Create},
//     {path: '/edit/:id', name: 'edit', component: Edit},
//     {path: '/books/:id', name: 'show', component: Show},

//     //Author routes
//     {path: '/authors', name: 'authors', component: AuthorOverview},
//     {path: '/add_author', name: 'add_author', component: AuthorCreate},
//     {path: '/edit_author/:id', name: 'edit_author', component: AuthorEdit},

//     //Review routes
//     {path: '/edit_review/:id', name: 'edit_review', component: ReviewEdit},
// ];

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });

// export default router;
