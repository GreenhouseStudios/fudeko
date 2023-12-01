import { createRouter, createWebHistory } from "vue-router";

import { useCounterStore } from "@/stores/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/form/:email",
    name: "Form",
    component: () => import("../components/Form.vue"),
  },
  {
    path: "/form",
    name: "FormList",
    component: () => import("../components/Form.vue"),
  },
  {
    path: "/form/:email/:promptNumber",
    name: "SinglePrompt",
    component: () => import("../components/Form.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../views/Logout.vue"),
  },
  {
    path: "/participant/:id",
    name: "Participant",
    component: () => import("../components/ParticipantHistory.vue"),
  }, 
  {
    path: "/responses/:id",
    name: "Responses",
    component: () => import("../views/ResponseView.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
  },
 
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const protectedRoutes = ["Participant", "Responses", "Admin"]
  const store = useCounterStore();
  console.log(store.user);
  const isAuthenticated = store.user;
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== "Login" &&
    
    protectedRoutes.includes(to.name)
  ) {
    // redirect the user to the login page
    return { name: "Login" };
  }
});

// const router = new VueRouter({
//   mode: 'history',
//   // base: process.env.BASE_URL,
//   routes
// })
