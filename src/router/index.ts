import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("../views/top.vue"),
  },
  {
    path: "*",
    name: "notFound",
    component: () => import("../views/notFound.vue"),
  },
  {
    path: "/registerAdmin",
    component: () => import("../views/registerAdmin.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/itemDetail/:id",
    component: () => import("../views/itemDetail.vue"),
  },
  {
    path: "/itemList",
    component: () => import("../views/itemList.vue"),
  },
  {
    path: "/cartList",
    component: () => import("../views/cartList.vue"),
  },
  {
    path: "/orderConfirm",
    component: () => import("../views/orderConfirm.vue"),
  },
  {
    path: "/orderFinished",
    component: () => import("../views/orderFinished.vue"),
  },
  {
    path: "/logout",
    component: () => import("../views/logout.vue"),
  },
  {
    path: "/orderHistory",
    component: () => import("../views/orderHistory.vue"),
  },
  {
    path: "/favoList",
    component: () => import("../views/favo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 0);
    });
  },
});

export default router;
