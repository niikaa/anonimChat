import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/features/welcome'
import Home from '@/features/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
