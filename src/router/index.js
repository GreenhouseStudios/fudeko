import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/form/:email",
    name: "Form",
    component: () => import("../components/Form.vue"),
  },
  {
    path: "/form/:email/:promptNumber",
    name: "SinglePrompt",
    component: () => import("../components/Form.vue"),
  },
  {
    path: "/responses",
    name: "responses",
    component: () => import("../components/Responses.vue"),
  },
  {
    path: "/responses/:id",
    name: "responseView",
    component: () => import("../components/ResponseView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminView.vue"),
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const router = new VueRouter({
//   mode: 'history',
//   // base: process.env.BASE_URL,
//   routes
// })
