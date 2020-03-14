<template>
    <div class="navfooter">
        <router-link to="/" tag="li">首页</router-link>
        <router-link to="/list" tag="li">列表</router-link>
        <router-link to="/shopcat" tag="li">购物车</router-link>
        <router-link to="/my" tag="li">我的</router-link>

    </div>
</template>

<script>
export default {
    name:'navfooter'
}
</script>

<style  scoped>
.navfooter{
    position:fixed;
    bottom: 0rem;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: blanchedalmond;
    display: flex;
    text-align: center;
    z-index: 2
}
.navfooter li{
    flex: 1;
}

</style>