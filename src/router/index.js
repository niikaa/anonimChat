import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/features/welcome'
import Home from '@/features/home'
import GreenChat from '@/features/greenChat'
import BlueChat from '@/features/BlueChat'

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
    },
    {
      path: '/green_chat',
      name: 'GreenChat',
      component: GreenChat
    },
    {
      path: '/blue_chat',
      name: 'BlueChat',
      component: BlueChat
    }
  ]
})
