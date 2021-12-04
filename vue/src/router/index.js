import Vue from 'vue'
import VueRouter from 'vue-router'

/// VIEWS
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/Add.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('../views/Notes.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
