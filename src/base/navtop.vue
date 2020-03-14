<template>
<div class="navtopbox">
    <div class="navtop" ref="navt">
    <span class="backbtn" v-if="back" @click="backgo">返回</span>
    <h2>
      <slot>首页</slot>
    </h2>
    <div class="rout">
      <router-link to="/login" tag="span">登录/注册</router-link>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "navtop",
  data() {
    return {};
  },
  props: {
    back: {
      type: Boolean,
      default: true
    }
  },
  created(){
  },
  methods: {
    backgo() {
            this.$router.back()
    
    },
   
  }
};
</script>

<style  scoped>
*{
  text-align: center;
}
.navtop{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.7rem;
  z-index: 3;
  background: #cee;
}
.navtopbox{
  width: 100%;
  height: 0.7rem;
  
}
.rout {
  float: right;
  margin-top: -25px;
  margin-right: 15px;
  font-size: 13px;
  color: #666;
}
.backbtn {
  float: left;
  margin: 4px 8px;
}
</style>