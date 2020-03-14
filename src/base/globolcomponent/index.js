import Vue from 'vue'
import loding from './loding'
import {colors} from './globoldirective'
import {change$} from './globolfilter'
//定义的全局组件，指令和过滤器
let mycomponents={
    install:()=>{
        Vue.component('myloding',loding);
        Vue.directive('color',colors);
        Vue.filter('change',change$)
    }
}
export default mycomponents