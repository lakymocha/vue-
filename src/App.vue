<template>
  <div id="app" v-cloak>
    第一次改变，创建了分支0.1
    <div id="body">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <navfooter></navfooter>
  </div>
</template>

<script>
import navfooter from "./base/navfooter";
export default {
  name: "App",

  components: {
    navfooter
  }
};
</script>

<style>
[v-cloak]{
    display: none;
}
#app {
  font-size: 0.3rem;
}
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
</style>
