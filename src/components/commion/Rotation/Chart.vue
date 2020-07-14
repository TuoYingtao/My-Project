<template>
  <!-- 轮播图  -->
  <div class="ScrollPicture">
    <mt-swipe :auto="4000">
      <!--   在使用 v-for 循环时，一定要用 key 绑定   -->
      <mt-swipe-item v-for="(item,i) in chartData" :key="i">
        <div class="mt-img">
        <img v-lazy="item.img" @load="imageLoad">
        <!-- {{ item.img }} -->
        </div>
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
      },
      data(){
        return{
          isLoad: false,
        }
      },
      methods:{
        imageLoad(){
          /*
          *设置发送一次事件
          * */
          if(!this.isLoad){
            this.$emit('itemImageLoad');
            this.isLoad = true;
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
/*设置图片懒加载样式*/
  img[lazy=error]
  img[lazy=loaded]
  img[lazy=loading]{
    width: 40px;
    height: 100px;
  }
  .ScrollPicture{
    height: 200px;
    .mint-swipe{
      height: 200px;
      .mint-swipe-item{
        .mt-img{
          height: 200px;
          img{
          width: 100%;
          height: 100%;
          }
        }
      }
    }
  }
</style>
