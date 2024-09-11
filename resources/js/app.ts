import './bootstrap';
import {createApp} from 'vue';
import App from './App.vue';
import {addRoutes, router} from './services/router';
import { bookRoutes } from './domains/books/routes';
import { authorRoutes } from './domains/authors/routes';
import { reviewRoutes } from './domains/reviews/routes';

const app = createApp(App);
addRoutes([...bookRoutes, ...authorRoutes, ...reviewRoutes]);
app.use(router);
app.mount('#app')
// createApp(App).use(router).mount('#app');

