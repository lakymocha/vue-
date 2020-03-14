<template>
  <div  class="my">
    <div class="mybox">
      <!--登录前-->
      <div class="nologin">
        <button v-if="!isok" @tap="$router.push('/login')">登录/注册</button>
      </div>
      <!--登录后-->
      <div v-if="isok" class="yeslogin">
        <h3>欢迎登录</h3>
        <p>{{userdata.username}}</p>
        <p>{{userdata.userVip}}</p>
      </div>
    </div>
    <section>
      <!--优惠券，积分，钱包-->
      <div class="financial">
        <ul>
          <li>
            <a>
              <span>优惠券</span>
            </a>
          </li>
          <li>
            <a>
              <span>积分</span>
            </a>
          </li>
          <li>
            <a>
              <span>钱包</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="formation">
        <ul>
          <li>
            <a>
              常用信息
              <span>旅客/地址/发票抬头</span>
            </a>
          </li>
          <li>
            <a>
              订单信息
              <span>订单详情/物流</span>
            </a>
          </li>
          <li>
            <a>
              历史记录
              <span>近15天访问记录</span>
            </a>
          </li>
          <li>
            <a>
              我要合作
              <span>供应商加盟/代理合作</span>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a>
              关于我们
              <span>购物网</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      isok: false
    };
  },
  mounted() {
    //在dom被挂载后去判断是否有token，有就验证token是否过期
    if (
      this.ismytoken == "undefined" ||
      this.ismytoken == null ||
      this.ismytoken == ""
    ) {
      return;
    }
    this.myverifytoken();
  },
  computed: {
    userdata() {
      //计算属性获取用户信息，先在vuex中获取，如果没有就从本地存储中获取
      return (
        //使用用户数据时注意要把信息转换成json数据
        JSON.parse(
          this.$store.state.login.userdata || localStorage.getItem("userdata")
        )
      );
    },
    ismytoken() {
      //计算属性获取token，先在vuex中获取，如果没有就从本地存储中获取
      return this.$store.state.login.token || localStorage.getItem("mytoken");
    }
  },
  methods: {
    myverifytoken() {
      //通过vuex调取接口验证token是否过期
      this.$store.dispatch("login/averifytoken", this.ismytoken).then(res => {
        if (res.IsSuccess) {
          this.isok = true;
          //储存用户数据时注意要把信息转换成字符串
          this.$store.commit("login/muserdata", JSON.stringify(res.userdata));
        } else {
          this.isok = false;
        }
      });
    }
  }
};
</script>

<style  lang="less" scoped>
.my {
  font-size: 0.3rem;
  .mybox {
    width: 100%;
    height: 3rem;
    background: url(../assets/bj2.jpg);
    background-size: cover;
    /*登录前*/
    .nologin {
      padding-top: 1rem;
      text-align: center;

      button {
        margin: 0 auto;
        width: 2rem;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #fff;
        background: orange;
        border-radius: 35px;
        outline: none;
        border: none;
        font-size: 0.3rem;
      }
    }
    /*登录后*/
    .yeslogin {
      //   padding-top: 0.7rem;
      text-align: center;
      h3 {
        font-size: 0.4rem;
        color: rgb(8, 63, 3);
      }
      p {
        color: rgb(8, 63, 3);
        font-weight: bold;
      }
    }
  }
  section a {
    display: block;
  }
  .financial ul {
    display: -webkit-flex;
    display: flex;
    background: #fff;
  }
  .financial ul li {
    flex: 1;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    border-left: 1px solid #ccc;
  }

  .financial ul li:first-child {
    border-left: none;
  }

  .formation ul {
    margin-top: 0.2rem;
    background: #fff;
    padding-left: 0.15rem;
  }
  .formation ul li {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #ccc;
    text-align: left;
    padding-left: 0.2rem;
  }
  .formation ul li:last-child {
    border-bottom: none;
  }
  .formation ul li a span {
    position: relative;
    display: block;
    float: right;
    padding-right: 0.6rem;
    font-size: 0.3rem;
    color: #666;
  }
  .formation ul li a span:after {
    position: absolute;
    top: 0.4rem;
    right: 0.3rem;
    content: "";
    width: 0.2rem;
    height: 0.2rem;
    border-right: 1px solid #666;
    border-bottom: 1px solid #666;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}
</style>
