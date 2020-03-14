import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import pluain from './base/golbolpluain/index'
pluain.init(Vue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  components: { App },
  template: '<App/>'
},
  // 全局守卫
  router.beforeEach((to, from, next) => {
    let token = store.state.login.token || localStorage.getItem('mytoken');//获取token
    if (token == 'undefined' || token == null || token == "") {
      //当没有token时，去到购物车页面会跳转到login页面让客户进行登陆操作
      if (to.meta.needLogin) {
        alert('您还没有登录哦！请先登录吧')
        next({ path: '/login', query: { f: to.path } })
      } else {
        
        
        next()
      }
     } 
     
    else {//当页面中有token时，会对token进行验证，如果token没有过期就可以进入购物车页面，如果过期就会跳转到登录页，让客户进行登陆操作
     next()
      store.dispatch('login/averifytoken', token).then((res) => {
        if (res.IsSuccess) {
          next()
        } else {
          if (to.meta.needLogin) {
            alert('登录已经过期啦！请重新登录吧');
            next({ path: '/login', query: { f: to.path } })
          } else {
            next()
          }
        }

      })

    }
  })
  )
