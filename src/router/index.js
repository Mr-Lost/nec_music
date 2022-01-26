import Vue from 'vue'
import Router from 'vue-router'
import Find from '@/components/Find'
import Bloger from '../components/Bloger'
import Mine from '../components/Mine'
import Follow from '../components/Follow'
import Cloud from '../components/Cloud'
import Login from '../Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Find',
      component: Find
    },
    {
      path: '/blog',
      name: 'Bloger',
      component: Bloger
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/mine/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/follow',
      name: 'Follow',
      component: Follow
    },
    {
      path: '/cloud',
      name: 'Cloud',
      component: Cloud
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '*',
      redirect: Find
    }
  ]
})
