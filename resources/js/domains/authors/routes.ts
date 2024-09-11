import { createRoute } from "@/services/router";
import AuthorOverview from "./pages/AuthorOverview.vue";
import AuthorCreate from "./pages/AuthorCreate.vue";
import AuthorEdit from "./pages/AuthorEdit.vue";

export const authorRoutes = [
    createRoute('/authors','authors.overview', AuthorOverview),
    createRoute('/authors_add','authors.create', AuthorCreate), 
    createRoute('/authors_edit/:id','authors.edit', AuthorEdit)]

