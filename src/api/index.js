import axios from 'axios';
import qs from "qs"
axios.defaults.baseURL='http://localhost:7000/'
axios.interceptors.response.use(res=>{
    return res.data
})
axios.defaults.withCredentials=true;
axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded';

export let getBanners=()=>{//获取首页banner图
    return axios.get('banner.json')
}
export let listBanners=()=>{//获取列表页banner图
    return axios.get('listbanner.json')
}
export let gethotlist=(page,crr)=>{//获取列表页数据
    return axios.get('hotlist',{
        params:{page,crr}
    })
}
export let getshoplist=()=>{//获取购物车页数据
    return axios.get('shoplist')
}
export let addshoplist=(id)=>{//获取购物车添加接口
    return axios.post('addshoplist',qs.stringify({id}))
}
export let delshoplist=(id)=>{//获取购物车删除接口
    return axios.post('delshoplist',qs.stringify({id}))
}
export let cutshoplist=(id)=>{//获取购物车减少接口
    return axios.post('cutshoplist',qs.stringify({id}))
}
export let boxcheckall=(newval)=>{//获取改变商品选中状态接口
    return axios.post('boxcheckall',qs.stringify({newval}))
}
export let boxcheck=(id)=>{//获取改变商品选中状态接口
    console.log(id);
    
    return axios.post('boxcheck',qs.stringify({id}))
}
export let getdetails=(id)=>{//获取详情页数据接口接口
    return axios.get('details',{
        params:{
            id
        }
    })
}
export let getlogin=(username,pass)=>{//获取登录接口
    return axios.post('login',qs.stringify({username,pass}))
}
export let getlogintoken=(token)=>{//获取验证token接口
    return axios.post('logintoken',qs.stringify({token}))
}