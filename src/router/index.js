import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Landing",
        component: () => import("@/views/Landing.vue"),
    },
    {
        path: "/practice",
        name: "Practice",
        component: () => import("@/views/Practice.vue"),
        props: true
    },
    {
        path: "/practice/result",
        name: "Result",
        component: () => import("@/views/Result.vue"),
        props: true
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});


export default router