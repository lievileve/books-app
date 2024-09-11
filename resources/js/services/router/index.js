import { createRouter, createWebHistory } from "vue-router";

// @ts-ignore
export function goToRoute(routeName) { 
    router.push({ name: routeName })
}

// @ts-ignore
export const createRoute = (routePath, routeName, routeComponent) => {
    return {
        path: routePath,
        name: routeName,
        component: routeComponent
    };
}

// @ts-ignore
export const addRoutes = (routes) => {
    for (const route of routes) router.addRoute(route);
};

export const router = createRouter({
    history: createWebHistory(),
    routes: [],
});

export default router;