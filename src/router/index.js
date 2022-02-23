import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: () => import('../views/home.vue')
  },
  {
    path: "/category",
    component: () => import('../views/category.vue')
  },
  {
    path: "/car",
    component: () => import('../views/car.vue')
  },
  {
    path: "/profile",
    component: () => import('../views/profile.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
