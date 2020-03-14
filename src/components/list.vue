<template>
  <div class="list">
    <!-- 顶部导航 -->
    <div  class="top">
      <navtop>
        <slot>列表</slot>
      </navtop>
    </div>
    <!-- 轮播图 -->
    <pswiper :banner="listbanner"></pswiper>
    <!-- 列表 -->
   <ul class="lists">
      <li v-for="item in lists" :key="item.bookId" @tap="todetail(item.bookId)">
        <dl>
          <dd class="imgsrc">
            <img :src="item.bookImg" />
          </dd>
          <dt v-color="'red'" class="txtright">
            <p >{{item.bookName}}</p>
            <p>价钱：{{item.bookPrice|change}}</p>
          </dt>
        </dl>
      </li>
    </ul>
    <myloding :show="folg"></myloding>
  </div>
</template>

<script>
import navtop from "../base/navtop";
import pswiper from "../base/pswiper";
import { gethotlist ,listBanners} from "../api";
export default {
  name: "list",
  data() {
    return {
      listbanner: [],
      lists: [],
      folg: false,
      page: 1,
      crr: 10,
      total:0,
    };
  },
  created() {
    listBanners().then(res => {//数据初始化获取到banner图片接口
      this.listbanner = res.banner;
    });
  },
  mounted() {
    this.getdata(this.page,this.crr);
    window.addEventListener("scroll",this.myscroll);//监听滚动事件，执行下拉加载下一页
    // console.log(this.lists);
  },
  components: {
    navtop,
    pswiper
  },
  methods: {
      myscroll(){//调用下拉加载下一页组件
         this.$download({page:this.page,crr:this.crr,total:this.total},this.getdata)
      },
    getdata(page, crr) {//到达底部时再次调取接口，获取到下一页信息
    this.folg = true;
      setTimeout(() => {
        gethotlist(page,crr).then(res => {
          this.lists = [...this.lists,...res.hotlist];
          this.total=res.total
          this.page += 1;
          setTimeout(() => {
            this.folg = false;
          }, 600);
        });
      }, 1000);
    },
    //跳转详情页面并进行传参
    todetail(id){
      this.$router.push({path:'/detail',query:{id}})
      
    }
  }
};
</script>

<style lang='less' scoped>
.top {
  background-color: green;
}
.label {
  background-color: green;
}
.lists {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  z-index: 0;
  li {
    margin: 0.2rem;
    background: #fff;
  }
  dl {
    display: flex;
    justify-content: start;
    .imgsrc {
      width: 2rem;
      height: 2rem;
      overflow: hidden;
      img {
        width: 100%;
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
  .done {
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    margin-top: 0.5rem;
  }
}
</style>