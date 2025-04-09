import { createRouter, createWebHistory } from "vue-router";

import { useCounterStore } from "@/stores/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: {transition: 'fade'}
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/adminlogin",
    name: "AdminLogin",
    component: () => import("../views/AdminLogin.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/FormkitRegisterView.vue"),
  },
  {
    path: "/setPassword",
    name: "SetPassword",
    component: () => import("../components/SetPassword.vue"),
  },
  {
    path: "/magic",
    name: "magic",
    component: () => import("../components/SignInMagicLink.vue"),
  },
  {
    path: "/participantDashboard",
    name: "ParticipantDashboard",
    component: () => import("../views/ParticipantDashboard.vue"),
  },
  {
    path: "/form/:email",
    name: "Form",
    component: () => import("../components/Form.vue"),
  },
  {
    path: "/emails/:email",
    name: "Emails",
    component: () => import("../components/NewEmailForm.vue"),
  },
  {
    path: "/confirmDecline",
    name: "ConfirmDecline",
    component: () => import("../components/ConfirmDecline.vue"),
  },
  // {
  //   path: "/form",
  //   name: "FormList",
  //   component: () => import("../components/Form.vue"),
  // },
  {
    path: "/form/:email/:promptNumber",
    name: "SinglePrompt",
    component: () => import("../components/ResponseForm.vue"),
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
    path: "/responses/new",
    name: "ResponseFormAdmin",
    component: () => import("../components/ResponseForm.vue"),
  },
  {
    path: "/participants/new",
    name: "ParticipantFormAdmin",
    component: () => import("../components/ParticipantForm.vue"),
  },
  {
    path: "/tips/new",
    name: "TipFormAdmin",
    component: () => import("../components/TipForm.vue"),
  },
  {
    path: "/greetings/new",
    name: "GreetingFormAdmin",
    component: () => import("../components/GreetingsForm.vue"),
  },
  {
    path: "/greetings/:id",
    name: "Greetings",
    component: () => import("../views/GreetingsView.vue"),
  },
  {
    path: "/greetings/edit/:id",
    name: "GreetingsEdit",
    component: () => import("../views/GreetingsViewEdit.vue"),
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
  // {
  //   path: "/prompts",
  //   name: "Prompts",
  //   component: () => import("../components/Prompts.vue"),
  // },
  {
    path: "/prompts/new",
    name: "NewPrompt",
    component: () => import("../components/PromptEdit.vue"),
  },
  {
    path: "/prompt/:id",
    name: "Prompts",
    component: () => import("../views/PromptView.vue"),
  },
  // {
  //   path: "/form/:id",
  //   name: "Form",
  //   component: () => import("../components/Form.vue"),
  // }
  {
    path: "/form/page2/:id",
    name: "ResponseForm",
    component: () => import("../components/ResponseForm.vue"),
    meta: {transition: 'fade'}
  },
  { path: "/form/:email/prompt/:promptId",
    name: "ResponseFormPrompt",
    component: () => import("../components/ResponseForm.vue"),
    meta: {transition: 'fade'}
  },
  {
    path: "/form/:email/page2/custom",
    name: "ResponseFormCustom",
    component: () => import("../components/ResponseForm.vue"),
    meta: {transition: 'fade'}
  },
  {
    path: "/confirmSubmit",
    name: "Confirm",
    component: () => import("../components/Confirmation.vue"),
  },
  {
    path: "/submitresponse",
    name: "SubmitResponse",
    component: () => import("../components/Confirmation.vue"),
  },
  {
    path: "/continue",
    name: "Continue",
    component: () => import("../views/Continue.vue"),
    meta: {transition: 'fade'}
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: function(){
    return { left: 0, top: 0 };
  },
});


router.beforeEach(async (to) => {
  const protectedRoutes = ["Participant",  "Greetings"];
  const protectedAdminRoutes = [
    "Admin",
    "ResponseFormAdmin",
    "NewPrompt",
    "Prompts",
    "GreetingsFormAdmin",
  ];
  const store = useCounterStore();
  const isAuthenticated = store.user;
  if ( store.participantID && store.partialResponse && to.name !== "Continue" ) {
    // return { name: "Continue" };
   
  }
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
  if (
    !isAuthenticated &&
    to.name !== "AdminLogin" &&
    protectedAdminRoutes.includes(to.name)
  ) {
    return { name: "AdminLogin" };
  }
 
});

// const router = new VueRouter({
//   mode: 'history',
//   // base: process.env.BASE_URL,
//   routes
// })
