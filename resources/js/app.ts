import './bootstrap';
import {createApp} from 'vue';
import App from './App.vue';
import {addRoutes, router} from './services/router';
import { bookRoutes } from './domains/books/routes';

addRoutes([...bookRoutes])

createApp(App).use(router).mount('#app');
