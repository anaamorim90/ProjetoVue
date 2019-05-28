import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tarefas',
      name: 'tarefas',
      component: () => import('./views/Tarefas.vue')
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})
