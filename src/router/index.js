import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import list from '@/components/list'
import shopcat from '@/components/shopcat'
import my from '@/components/my'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: home
    },
    {
      path: '/list',
      meta:{
      keepAlive:true,//需要缓存
      },
      name:'列表',
      component:list,
    },
    {
      path: '/my',
      name:'我的',
      component:my,
    },
    {
      path: '/shopcat',
      name:'购物车',
      meta:{
        needLogin:true,
        keepAlive:true,//需要缓存
        },
      component:shopcat,
    },
    {
      path: '/login',
      name:'注册',
      //按需引入组件//可以简写成 ()=>import ("@/components/login")
      component:()=>{return import ("@/components/login")},
    },    {
      path: '/detail',
      name:'详情页',
      component:detail,
    },
  ]
})
