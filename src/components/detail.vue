<template>
  <div class="detail">
    <!-- 头部导航 -->
    <div>
      <navtop class="headline">详情页</navtop>
    </div>
    <!-- 内容 -->
    <div class="detailbox" v-for="item in details" :key="item.bookId">
      <img :src="item.bookImg" />
      <p v-color="'red'">价钱：{{item.bookPrice |change }}</p>
      <p>商品描述：{{item.bookInfo}}</p>
      <div class="boximgs">
        <img :src="item.bookImg" />
        <img :src="item.bookImg" />
      </div>
    </div>
    <div class="shop">
      <button @click="linkshopcat">
        去购物车
        <transition enter-active-class="fadeInLeftBig" leave-active-class="fadeOutRight">
          <!--小红圈动画效果 -->
          <em class="add animated" v-show="a">+1</em>
        </transition>
      </button>
      <button class="tocat" @click="addlist(details)">加入购物车</button>
    </div>
  </div>
</template>
<script>
import navtop from "../base/navtop";
export default {
  name: "detail",
  data() {
    return { //保存列表页query传过来的数据
      a: false //控制红圈的显示隐藏动画效果
    };
  },
  components: {
    navtop
  },
  mounted(){
    let {id}= this.$route.query;
      this.$store.dispatch("shop/agetdetail",id)
      
  },
  methods: {
    
    linkshopcat() {
      //点击按钮跳转到购物车
      this.$router.push({
        path: "/shopcat"
      });
    },
    addlist(id) {
      //添加购物车，判断是添加一整条还是增加数量
      this.$store.dispatch("shop/aaddshoplist", id[0]);
      this.a = true;
    }
  },
  computed:{
    details(){
      return this.$store.state.shop.detaildata.details
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/animate.css";
.detail {
  .detailbox {
    img {
      width: 50%;
      margin: 20px 1.7rem;
    }
  }
  .headline {
    background: orange;
  }
  .shop {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;

    z-index: 3;
    display: flex;
    flex: 1;
    button {
      position: relative;
      height: 1rem;
      line-height: 1rem;
      outline: none;
      border: none;
      width: 50%;
      font-size: 0.3rem;
      background: #fff;
      .add {
        position: absolute;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        background: red;
        color: #fff;
        border-radius: 50%;
        font-style: normal;
        font-size: 0.2rem;
        padding: 0.07rem;
      }
    }
    .tocat {
      background: orange;
      color: #fff;
    }
  }
}
</style>