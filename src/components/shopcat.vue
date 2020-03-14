<template>
  <div class="shopcat">
    <!-- 头部导航 -->
    <div>
      <navtop class="top">
        <slot>购物车</slot>
      </navtop>
    </div>
    <!-- 购物车列表 -->
    <div class="shop">
      <ul class="ullis">
        <li v-for="(item,index) in shoplist" :key="item.bookId" @swipeLeft="moveleft(index)">
          <dl>
            <dd class="imgsrc">
              <input :checked="item.isSed" @click="checkboxl(item.bookId)" type="checkbox" />
              <img :src="item.bookImg" />
            </dd>
            <dt class="txtright">
              <p>{{item.bookName}}</p>
              <p v-color="'red'">价钱：{{item.bookPrice | change}}</p>
              <p class="sum">
                <span class="remove" @tap="removes(item)">-</span>
                <input type="number" v-model="item.bookNum" />
                <span class="add" @tap="adds(item)">+</span>
              </p>
            </dt>
          </dl>
          <button
            class="del animated"
            @tap="dellist(item.bookId)"
            ref="btns"
            style="display:none"
          >del</button>
        </li>
      </ul>
      <loading :show="flag"></loading>
      <div class="settlement">
        <span>
          <input type="checkbox" v-model="checkall" /> 全选
        </span>
        <span>
          合计：{{total | change}}
          <button class="settlbtn">结算({{itemnum}})</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import navtop from "../base/navtop";
import loading from "../base/globolcomponent/loding";
export default {
  name: "shopcat",
  data() {
    return {
      flag: false
    };
  },
  mounted() {
    this.$store.dispatch("shop/asetshoplist");
    this.myloading();
    
  },
  components: {
    navtop,
    loading
  },
  methods: {
    myloading() {     
      setTimeout(() => {
        this.falg = false;
      }, 1000);
    },
    adds(item) {
      //触发列表添加事件
      this.$store.dispatch("shop/aaddshoplist", item);
    },
    removes(item) {
      //触发列表减少事件
      
      this.$store.dispatch("shop/acutshoplist", item );
    },
    moveleft(i) {
      //当左划动时显示del按钮
      this.$refs.btns.forEach(element => {
        //先恢复默认样式，也就是隐藏
        element.style.display = "none";
      });
      this.$refs.btns[i].style.display = "block"; //再让当前滑动的li的del按钮显示
    },
    dellist(id) {
      //删除选中的这一整条数据，需要传递一个id，以便后方数据进行判断
      this.$store.dispatch("shop/adellist", id).then(res => {
        if (res.IsSuccess == true) {
          return this.$store.commit("shop/mdellist", id);
        }
      });
    },
    checkboxl(id) {
      console.log(id);
      
      this.$store.dispatch("shop/achangebox", id);
    }
  },
  computed: {
    shoplist() {
      //获取购物车默认显示的数据
        return this.$store.state.shop.shoplist;
    },
    checkall: {
      //全选按钮
      get() {
        //根据isSed改变选中状态      
        return this.shoplist.every(ele => {
          return ele.isSed == true;
        });
      },
      set(newval) {
        //根据自身变化影响所有选项
        this.$store.dispatch("shop/acheckall", newval);
      }
    },
    total() {
      //计算购物车总价格
      return this.shoplist.reduce((pre, item) => {
        if (item.isSed == false) {
          return pre;
        }
        return pre + item.bookNum * item.bookPrice;
      }, 0);
    },
    itemnum() {
      //计算选中了几项商品
      let t = this.shoplist.filter(item => {
        return item.isSed == true;
      });
      return t.length;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/animate.css";
.top {
  background-color: pink;
}
p {
  background-color: pink;
}
.shop {
  position: relative;
  margin-top: .5rem;
  margin-bottom: 1rem;
  z-index: 4;
  font-size: 0.3rem;
  li {
    position: relative;
    margin: 0.2rem;
    background: #fff;
  }
  dl {
    display: flex;
    justify-content: start;
    padding-left: 0.1rem;
    .imgsrc {
      width: 3rem;
      height: 2rem;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 80%;
        height: 100%;
        border-radius: 3px;
        border: 1px solid #ccc;
      }
    }
    .txtright {
      padding: 0.1rem;
      text-align: left;
    }
  }
  .sum {
    input {
      width: 0.5rem;
      border: 1px solid #ccc;
      padding: 0.15rem;
      outline: none;
      text-align: center;
    }
    span {
      border: 1px solid #ccc;
      padding: 0.05rem 0.15rem;
    }
  }
  input[type="checkbox"] {
    position: relative;
    z-index: 2;
    width: 15px;
    height: 15px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 50%;
    -webkit-appearance: none;
    outline: none;
  }
  input[type="checkbox"]:checked::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    background: orange;
    width: 13px;
    height: 13px;
    border: 1px solid orange;
    border-radius: 50%;
  }
  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 7px;
    height: 3px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
  .settlement {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    height: 1rem;
    line-height: 1rem;
    background: #fff;
    padding: 0 0.2rem;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }
  .settlbtn {
    margin-left: 1rem;
    background: orange;
    font-size: 0.3rem;
    color: #fff;
    padding: 0.1rem 0.5rem;
    outline: none;
    border: none;
    border-radius: 35px;
  }
  .settlement input {
    position: relative;
    top: 0.1rem;
  }
  .del {
    width: 1.5rem;
    height: 2rem;
    line-height: 2rem;
    background: red;
    color: #fff;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    outline: none;
    border: none;
    font-size: 0.3rem;
  }
}
</style>