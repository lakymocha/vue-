import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
import shop from './shop'
import login from './login'
Vue.use(Vuex)
const store=new Vuex.Store({
    strict:true,
    modules :{
        shop,login
    },
    state:{
 
    },
    mutations:{
     
    },
    actions:{

    },
    plugins:[logger()]
})
export default store