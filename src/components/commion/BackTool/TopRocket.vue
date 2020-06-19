<template>
  <div class="back-top" @click="backtopclick">
    <img class="back-img" src="@/assets/huojian.jpg" alt="">
  </div>
</template>

<script>
    export default {
        name: "TopRocket",
      methods:{
          backtopclick(){
          }
      }
    }
</script>

<style lang="less" scoped>
.back-top{
  position: fixed;
  right: 10px;
  bottom: 70px;
}
.back-top img{
  width: 36px;
  height: 52px;
}
</style>
