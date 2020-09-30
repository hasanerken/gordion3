import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Error404 from "../views/Error404.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/products",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue")
  },
  {
    path: "/menus",
    name: "Menus",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Menus.vue")
  },
  {
    path: "/customers",
    name: "Customers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Customers.vue")
  },

  {
    path: "/404",
    component: Error404
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
