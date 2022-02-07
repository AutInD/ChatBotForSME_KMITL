<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
=======
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Sales from "../views/Sales.vue";
import Order from "../views/Order.vue";
import popup_upd_pd from "../components/popup_upd_pd.vue"
import OrderDetails from "../views/OrderDetails.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/api/product/:id",
    name: "popup_upd_pd",
    component: popup_upd_pd,
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
    path: "/orderdetails/:id",
    name: "OrderDetails",
    component: OrderDetails,
  },
 
  {
    path: "/about",
    name: "About",
>>>>>>> develop
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
