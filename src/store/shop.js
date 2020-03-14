//购物车状态管理仓库
// import store from './index'
import * as API from '../api'
const shop = {
    namespaced: true,
    state: {
        shoplist: [],
        detaildata:''
    },
    mutations: {
        msetshoplist(state, res) {//购物车接口数据存储到vuex
            state.shoplist = res.shoplist
        },
        maddnum(state, item) {//添加购物车，判断添加一整条还是只增加数量
            let datas = state.shoplist.find((ele) => {
                return ele.bookId == item.bookId
            })
            if (datas) {
                return datas.bookNum += 1
            } else {
                state.shoplist.push(item)
            }
        },
        mcutnum(state, item) {//减少购物车，根据数值判断是进行数量的减少还是删除整条数据
            let datas = state.shoplist.find((ele) => {
                return ele.bookId == item.bookId
            })
            if (datas.bookNum >= 1) {
                 datas.bookNum -= 1 
            }  
              if (datas.bookNum ==0) {
                state.shoplist = state.shoplist.filter(ele => {
                    return ele.bookId != item.bookId
                })
            }
            
        },
        mdellist(state, id) {//删除当前选中的整条数据
            state.shoplist = state.shoplist.filter(ele => {
                return ele.bookId != id
            })
        },
        mgetcheckall(state, newval) {//根据全选的状态，改变所有isSed也就是列表勾选的状态
            state.shoplist.forEach((ele) => {
                return ele.isSed = newval
            })
        },
        mchangebox(state, id) {//根据列表勾选状态，改变全选的状态
            let sed = state.shoplist.find((ele) => {
                return ele.bookId == id
            })
            sed.isSed = !sed.isSed;

        },
        mgetdetail(state,resd){//获取详情页数据
             state.detaildata=resd
            console.log(state.detaildata);
            
            }
    },
    actions: {
        asetshoplist(context) {//调取购物车列表接口，存储到vuex里
            API.getshoplist().then((res) => {
                return context.commit("msetshoplist", res)
            })
        },
        aaddshoplist(context, item) {//调取购物车的增加接口，看行为是否成功，然后去改变shoplist里的值
            API.addshoplist(item.bookId).then((res) => {
                if (res.IsSuccess == true) {
                    return context.commit('maddnum', item)
                }
            })
        },
        acutshoplist(context, item) {//调取购物车的减少接口，看行为是否成功，然后去改变shoplist里的值
            API.cutshoplist(item.bookId).then((res) => {
                if (res.IsSuccess == true) {
                    return context.commit('mcutnum', item)
                }
            })
        },
        adellist(context,id) {//调取购物车删除数据接口
            return API.delshoplist(id)
        },
        acheckall(context, newval) {//调取全选状态的接口，判断行为是否成功，然后去改变shoplist里面的值
            API.boxcheckall(newval).then((res) => {
                if (res.IsSuccess == true) {
                    return  context.commit('mgetcheckall', newval)
                }
            })
        },
        achangebox(context, id) {//调取列表选中状态的接口，判断行为是否成功，然后去改变shoplist里面的值
            console.log(id);
            
            API.boxcheck(id).then((res) => {
                if (res.IsSuccess == true) {
                    return context.commit('mchangebox', id)
                }
            })
        },
        agetdetail(context,id){//获取详情页数据
            API.getdetails(id).then((res)=>{
                return context.commit("mgetdetail",res)
            })
        }
    }
}

export default shop