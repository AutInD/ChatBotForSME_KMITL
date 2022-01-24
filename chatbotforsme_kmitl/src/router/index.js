import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Sales from "../views/Sales.vue";
import Order from "../views/Order.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/Order",
    name: "Order",
    component: Order,
  },
 
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
