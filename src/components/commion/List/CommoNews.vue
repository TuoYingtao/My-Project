<template>
<div class="divMin">
  <div class="mui-view" v-for="(item, index) in isDataLisat" :key="index">
      <router-link :to="'/home/newsinfo/' + item.id">
        <div class="mui-media-object mui-pull-left"><img v-lazy="item.img_url"></div>
        <div class="textbody">
          <div class="tableTitle">{{ item.title }}</div>
          <div class="item-text">{{ item.price_item }}</div>
          <div class="mui-ellipsis">
            <div>发表时间：{{ item.date | dateFormat('YYYY-MM-DD') }}</div>
            <div>类型：{{ item.category }}</div>
          </div>
        </div>
      </router-link>
    </div>
</div>
</template>

<script>
export default {
    props:{
        isDataList:{
          type: Array,
          default: ()=>{
            return null
          }
        }
    },
    created() {
      console.log(this.isDataList);
    },
}
</script>

<style lang="scss" scoped>
.divMin{
  height: 100vh;
}
.mui-view{
  width: 100%;
  height: 155px;
  background-color: #ffffff;
  padding: 10px 0 10px 0;
  .mui-media-object{
    width: 32%;
    height: 100%;
      img{
        width: 110px;
        height: 140px;
        padding: 0 5px 5px 5px;
        border-radius: 15px;
        box-shadow: 5px 5px 6px #888;
      }
    }
  .textbody{
    width: 66%;  
    height: 100%;
    float: left;
    padding-left: 5px;
    border: solid 2px rgba(228, 228, 228, 0);
    border-radius: 5px;
    box-shadow: 1px 1px 8px #888;
    .tableTitle{
      width: 100%;
      color: rgba(0, 0, 0, 0.726);
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-text{
      height: 67px;
      margin-top: 14px;
      margin-right: 10px;
      color: rgba(0, 0, 0, 0.671);
      font-size: 12px;
      font-weight: 100;
      text-indent: 2em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .mui-ellipsis{
      margin-top: 10px;
      margin-right: 10px;
      font-size: 13px;
      color: #ff000060;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>