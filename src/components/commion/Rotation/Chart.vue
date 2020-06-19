<template>
  <!-- 轮播图  -->
  <div class="ScrollPicture">
    <mt-swipe :auto="4000">
      <!--   在使用 v-for 循环时，一定要用 key 绑定   -->
      <mt-swipe-item v-for="(item,i) in chartData" :key="i">
        <img v-lazy="item.img">
        {{ item.img }}
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    export default {
      props:{
        chartData:{
          type: Array,
          default: ()=>{
            return
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .ScrollPicture{
    .mint-swipe{
      height: 200px;
      .mint-swipe-item{
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
