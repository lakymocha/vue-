<template>
  <div class="login">
    <div class="top">
      <span @tap="$router.back()">返回</span>
      <span class="c099fde">注册</span>
    </div>
    <h3>购物网</h3>
    <div class="myinput">
      <input type="text" v-model="username" placeholder="用户名/手机号/邮箱" />
      <input type="password" v-model="pass" placeholder="请输入密码" />
      <button @tap="islogin">登录</button>
    </div>
    <p class="ptxtbtm">
      登录即代表您同意我们的
      <a class="c099fde">服务协议</a>和
      <a class="c099fde">隐私政策</a>
    </p>
  </div>
</template>
<script>
import {getlogin} from '../api'
export default {
  name: "login",
  data(){
    return{
      username:"",
      pass:"",
    }
  },
  methods: {
    islogin(){//点击登录调取登录接口，存储token
      getlogin(this.username,this.pass).then((res)=>{
        if(res.IsSuccess){
          this.$cookies.set("key", this.username)
          this.$store.commit('login/moklogin',res.token)
          setTimeout(()=>{
            if(this.$route.query.f){
              this.$router.push(this.$route.query.f)
              return
            }
            this.$router.back()
          },500)
        }
        
      })
    },
   
  }
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 3;
  padding: 0.3rem;
  box-sizing: border-box;
  font-size: .3rem;
  .c099fde {
    color: #099fde;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h3{
 
    text-align: center;
  }
  .myinput {
    margin-top: 1rem;
    input {
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      outline: none;
      border: none;
      border-bottom: 1px solid #ccc;
      font-size: 0.3rem;
    }
    input:-internal-autofill-selected {
      //去掉input的选择样式
      box-shadow: inset 0 0 0 1000px #fff !important;
    }
    button {
      margin-top: 0.5rem;
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      outline: none;
      border: none;
      background: orange;
      border-radius: 3px;
      font-size: 0.3rem;
      color: #fff;
    }
  }
  .ptxtbtm {
    position: fixed;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    color: #333;
    font-size: 0.24rem;
    text-align: center;
  }
}
</style>