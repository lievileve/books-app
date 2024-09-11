import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [],
});

// @ts-ignore
export function goToRoute(routeName) { 
    router.push({ name: routeName })
}

// @ts-ignore
export const createRoute = (routeName, routeComponent) => {
    return {
        path: `/${routeName}`,
        name: routeName,
        component: routeComponent
    };
}

// @ts-ignore
export const addRoutes = (routes) => {
    for (const route of routes) router.addRoute(route);
};

// router.addRoute(addRoute())