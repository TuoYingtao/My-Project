<template>
<!-- 在Vue中，模板中必须有一个根元素将内容全部包裹起来 -->
  <div>
    <el-row :gutter="21">
      <el-col :span="21" style="width: 100%;height: 700%">
        <el-card shadow="always" style="width: 100%;height: 700px">
<!-- 设置组件懒加载  -->

<!-- 轮播图区域  -->
    <div class="ScrollPicture">
      <mt-swipe :auto="4000">
<!--   在使用 v-for 循环时，一定要用 key 绑定   -->
        <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
          <img v-lazy="item.img">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="font-size">最新资讯</div>
<!--  六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../../static/img/menu6.png" alt="">
          <div class="mui-media-body">服装资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/picture/picturesharing">
          <img src="../../../static/img/menu5.png" alt="">
          <div class="mui-media-body">热门服装</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/purchase/clothing">
          <img src="../../../static/img/menu3.png" alt="">
          <div class="mui-media-body">购买服装</div>
        </router-link>
      </li>
<!--      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
<!--        <img src="../../../static/img/menu4.png" alt="">-->
<!--        <div class="mui-media-body">留言反馈</div></a></li>-->
<!--      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
<!--        <img src="../../../static/img/menu5.png" alt="">-->
<!--        <div class="mui-media-body">视频专区</div></a></li>-->
<!--      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
<!--        <img src="../../../static/img/menu6.png" alt="">-->
<!--        <div class="mui-media-body">联系我们</div></a></li>-->
    </ul>
    <div class="font-size">热门推荐</div>
    <table class="img-div-Clothing">
      <tr>
        <td>
          <img src="../../../static/img/Clothing/meng03.jpg" class="img-meng03">
        </td>
        <td rowspan="2">
          <img src="../../../static/img/Clothing/meng02.jpg" class="img-meng02">
        </td>
      </tr>
      <tr>
        <td>
          <img src="../../../static/img/Clothing/meng01.jpg" class="img-meng01">
        </td>
      </tr>
    </table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import  { Toast } from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  export default {
       data(){
           return{
               lunbotuList:[]
           };
       },
        created(){
          this.getLunbotu();
        },
        methods:{
           getLunbotu(){
               axios.get(
                  './static/Snake.json'
                  //参数部分，将拼接在url之后
              ).then(result => {
                   // console.log(result.body);
                   if (result.data.status === 0){
                       //获取成功
                       this.lunbotuList = result.data.message;
                       // Toast('获取轮播图成功.....')
                       console.log(this.lunbotuList);
                   }else{
                       //获取失败
                       Toast('获取轮播图失败.....');
                   }
               });
           }
        },
    }
</script>

<style lang="scss" scoped>

  .ScrollPicture{
    /*border: #707274 solid;*/
    .mint-swipe{
      height: 200px;
      /*.mint-swipe-item{*/
      /*  &:nth-child(1){*/
      /*    background-color: red;*/
      /*  }*/
      /*  &:nth-child(2){*/
      /*    background-color: cornflowerblue;*/
      /*  }*/
      /*  &:nth-child(3){*/
      /*    background-color: coral;*/
      /*  }*/
      /*}*/
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .mui-grid-view.mui-grid-9{
    border: none;
    img{
      width: 50px;
      height: 50px;
    }
    .mui-media-body{
      font-size: 12px;
    }
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0;
  }
  .font-size{
    width: 100%;
    height: 2%;
    background-color: #EEE0E5;
    font-size: 13px;
    padding-left: 10px;
    color: red;
  }
  //服装广告样式
.img-div-Clothing{
  width: 100%;
  background-color: #EDEDED;
  .img-meng03{
    width: 94%;
    margin-top: 3%;
    margin-left: 3%;
  }
  .img-meng02{
    width: 100%;
    height: 30%;
    padding-top: 3%;
    padding-right:  5%;
  }
  .img-meng01{
    width: 94%;
    margin-left: 3%;
  }
}
</style>
