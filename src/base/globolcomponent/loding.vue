<template >
    <div v-show='show' class="loading">loading...</div>
</template>
<script>
export default {
    name:'loading',
    props:['show']
}
</script>
<style lang="less" scoped>
   .loading{
      position: fixed;
      top:50%;
      left: 50%;
      margin-left: -20%;
      margin-top: -0.5rem;
      width: 40%;
      height: 1rem;
      line-height: 1rem;
      background: rgba(161, 160, 160, 0.7);
      border-radius: .1rem;
  }
</style>