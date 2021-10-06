import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "accueil",
    component: () =>
      import(/* webpackChunkName: "new" */ "../views/acceuil.vue"),
  },
  {
    path: "/formulaire",
    name: "formulaire",
    component: () =>
      import(/* webpackChunkName: "new" */ "../views/formulaire.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "new" */ "../views/register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "new" */ "../views/login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import(/* webpackChunkName: "new" */ "../views/logout.vue"),
  },
  {
    path: "/profil",
    name: "profil",
    component: () =>
      import(/* webpackChunkName: "new" */ "../views/profil.vue"),

  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "new" */ "../views/admin.vue"),

  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
