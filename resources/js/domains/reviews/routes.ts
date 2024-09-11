import { createRoute } from "@/services/router";
import ReviewEdit from "./pages/ReviewEdit.vue";

export const reviewRoutes = [createRoute('/reviews_edit/:id','reviews.edit', ReviewEdit)]