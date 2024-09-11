import { createRoute } from "@/services/router";
import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";

export const bookRoutes = [createRoute('books.overview', Overview), createRoute('books.show', Show)]