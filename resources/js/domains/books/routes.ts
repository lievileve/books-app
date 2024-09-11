import { createRoute } from "@/services/router";
import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";
import Create from "./pages/Create.vue";
import Edit from "./pages/Edit.vue";

export const bookRoutes = [
    createRoute('/','books.overview', Overview),
    createRoute('/create','books.create', Create), 
    createRoute('/books/:id','books.show', Show), 
    createRoute('/edit/:id','books.edit', Edit)];