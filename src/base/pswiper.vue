<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide)  in banner" :key="slide.id">
        <img :src="slide.src"/>
        </swiper-slide>
    <div class="pagination" slot="pagination"></div>

  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        autoplay: 3500,//间隔时间
        loop: true,//是否循环
        pagination: ".pagination",//分页器
        paginationClickable: true,//点击分页器进行图片的切换
        onTouchEnd:function(swiper){
            // console.log(swiper);
        }
      },
    }; 
  },
  props:["banner"]

};
</script>
<style scoped>
*{
  text-align: center;
}
    img{
        width: 100%;
    }
</style>