import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import mycomponents from '../globolcomponent/index'
import VueLazyload from 'vue-lazyload'
import download from './downlode'
import cookies from "vue-cookies"

let pluain = {
    init: (Vue) => {
        Vue.use(cookies)
        Vue.use(mycomponents)
        Vue.use(VueAwesomeSwiper)
        Vue.use(download)
        Vue.use(VueLazyload, {
            preLoad: .7,
            error: '../static/img/default.jpg',
            loading: '../static/img/timg.gif',
            attempt: 1
        })

    }
}

export default pluain