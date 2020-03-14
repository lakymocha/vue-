import * as API from '../api'
let login={
    namespaced: true,
    state:{
        token:'',
        userdata:[]

    },
    mutations:{
        moklogin(state,istoken){//当页面登录时，储存token到vuex和本地存储里
            state.token=istoken;
            localStorage.setItem('mytoken',istoken)
        },
        muserdata(state,data){//token如果经过验证没有过期的话，就会把里面的用户信息存储到vuex和本地存储中
            state.userdata=data;
            localStorage.setItem('userdata',data)
        }
    },
    actions:{
        averifytoken(context,token){//获取到验证token是否过期的接口
          return  API.getlogintoken(token)
        }
    }
}
export default login