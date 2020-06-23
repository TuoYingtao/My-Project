<template>
<div class="divMin">
  <div class="mui-view" v-for="(item, index) in isDataList" :key="index">
      <router-link :to="'/home/newsinfo/' + item.id">
        <div class="mui-media-object mui-pull-left">
          <img v-lazy="item.img_url" @load="imageLoad">
        </div>
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
import { Store } from 'vuex'
export default {
    props:{
        isDataList:{
          type: Array,
          default: ()=>{
            return null
          }
        },
        textData:{
          type: String,
          default: function (){
            return "父组件暂未传递数据"
          }
        }
    },
    data(){
      return{
        childrenData: "子组件",
        loadimg: false,
      }
    },
    created() {
      console.log(this.textData)
    },
    mounted(){
      this.$emit('childrenData',this.childrenData)
    },
    methods:{
      imageLoad(){
        this.$emit('itemImageLoad',this.loadimg)
      }
    }
}
</script>

<style lang="scss" scoped>
.mui-view{
  width: 97%;
  height: 155px;
  background-color: #ffffff;
  // padding: 4px 0 4px 0;
  border-radius: 15px;
  margin: 5px 0 5px 5px;
  .mui-media-object{
    width: 32%;
    height: 100%;
      img{
        width: 90%;
        height: 100%;
        padding: 3px 3px 3px 2px;
        margin: 0 3px 0 3px;
        border-radius: 15px;
        box-shadow: 3px 0 4px rgb(195, 195, 195);
      }
    }
  .textbody{
    width: 68%;  
    height: 100%;
    float: left;
    padding: 4px 0 0 4px;
    border-radius: 15px;
    box-shadow: 1px 1px 4px #888;
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
      text-indent: 1em;
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