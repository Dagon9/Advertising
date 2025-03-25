import { createRouter, createWebHistory } from "vue-router"
import LoginPage from "./LoginPage.vue"
import AppLayout from "./AppLayout.vue"

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/advertiser-dashboard",
    component: AppLayout,
  },
  {
    path: "/admin-dashboard",
    component: AppLayout,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

