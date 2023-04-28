import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Find',
      component: () => import('../components/find/Find')
    },
    {
      path: '/home/singers?type=:type&area=:area&initial=:initial',
      name: 'Singers',
      params: {
        type: {type: Number, default: -1},
        area: {type: Number, default: -1},
        initial: {type: Number, default: -1}
      },
      component: () => import('../components/find/Singers'),
      children: [
        {
          path: '?type=:type&area=:area',
          name: 'SingerList',
          component: () => import('../components/find/SingerList')
        }
      ]
    },
    {
      path: '/home/singer/detail',
      name: 'SingerDetail',
      component: () => import('../components/find/SingerDetail')
    },
    {
      path: '/home/album/:aid',
      name: 'Album',
      component: () => import('../components/Album')
    },
    {
      path: '/blog',
      name: 'Blogger',
      component: () => import('../components/Blogger')
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('../components/Mine')
    },
    {
      path: '/follow',
      name: 'Follow',
      component: () => import('../components/Follow')
    },
    {
      path: '/cloud',
      name: 'Cloud',
      component: () => import('@/components/Cloud')
    },
    {
      path: '*',
      redirect: {name: 'Find'}
    }
  ]
})
