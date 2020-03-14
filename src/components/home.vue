<template>
  <div class="home">
    <div>
      <navtop class="top" :back="false">
        <slot>首页</slot>
      </navtop>
    </div>

    <pswiper :banner="banners"></pswiper>
  </div>
</template>

<script>
import navtop from "../base/navtop";
import pswiper from "../base/pswiper";
import { getBanners } from "../api";
export default {
  name: "home",
  data() {
    return {
      banners: []
    };
  },
  created() {//数据初始化获取到banner的图片接口
    getBanners().then(res => {
      this.banners = res.banner;
    });
  },

  components: {
    navtop,
    pswiper
  }
};
</script>

<style lang='less' scoped>
.top {
  background-color: red;
}
.home {
  p {
    background-color: red;
  }
}
</style>