<template>
  <div class="hot">
    <div class="font-size">{{ RecommendTitle }}</div>
    <table class="img-div-Clothing">
      <tr>
        <td>
          <img src="@/assets/Clothing/meng03.jpg" class="img-meng03">
        </td>
        <td rowspan="2">
          <img src="@/assets/Clothing/meng02.jpg" class="img-meng02">
        </td>
      </tr>
      <tr>
        <td>
          <img src="@/assets/Clothing/meng01.jpg" class="img-meng01">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
    export default {
      props:{
        RecommendTitle:{
          type: String,
          default: ()=>{
            return '搜一搜'
          }
        }
      },
        data(){
          return{

          }
        }
    }
</script>

<style lang="scss" scoped>
  //=> 热门推荐样式
  .hot{
    margin-left: 10px;
    margin-right: 10px;
    .font-size{
      margin-top: 10px;
      background-color: #EEE0E5;
      padding-left: 10px;
      color: red;
      font-size: 16px;
      line-height: 30px;
      border-radius: 10px 10px 0 0;
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
  }
</style>
