import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "lowCode",
    component: () => import("../views/lowCode.vue"),
	children:[]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
