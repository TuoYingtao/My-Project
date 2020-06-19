<template>
<div id="newsList">
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          :pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp="loadMore">
  <!-- <Loading v-model="ajaxIsLoading"></Loading> -->
    <commo-news :is-data-list="newsLists"></commo-news>
    <!-- <p v-if="loading">加载中....</p>
    <p v-if="noMore">暂无更多数据</p> -->
  </scroll>
</div>
</template>

<script>
  import Scroll from "../commion/scroll/Scroll";
  import CommoNews from '@/components/commion/List/CommoNews'
    import { Loading } from 'vux'
    import { mapState } from 'vuex'
    import { Toast } from  "mint-ui";
    export default {
      components:{
        Loading,
        Scroll,     //=> 注册BetterScroll组件
        CommoNews,   //=> 注册服装详情列表
      },
        data(){
            return{
                isLoading:false,
                newsLists:[],
                count: 10,
                loading: false
            }
        },
        computed:{
            ...mapState({ ajaxIsLoading: state => state.axios.ajaxIsLoading }),
            noMore() { return this.count >= 20 },
            disabled() { return this.loading || this.noMore },
        },
        created(){
          this.getNewsList();
        },
        methods:{
          //=> 上拉加载更多
          loadMore(){
            console.log('------');
          },
          //=> 点击返回顶部
          contentScroll(position){
            //=> 1.返回顶部的实现
            //=> position.y是scroll中实时监听的y坐标；（为负值）
            //=> 当y滚动到1000的时候，就将this.backtop为true
            this.isShowBackTop = (-position) > 1000
          },
            load () {
                this.loading = true;
                setTimeout(() => {
                    this.count += 2;
                    this.loading = false
                }, 1000)
            },
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                    Toast("刷新成功")
                }, 2000);
            },
            getNewsList(){
                //获取服装资讯列表
                axios.get('./static/Snake.json').then(result => {
                    if (result.data.status === 0){
                        //如果没有失败，应该把数据保存在data上
                        this.newsLists = result.data.clothing;   
                        console.log(this.newsLists)                 
                    }else{
                        Toast('获取服装资讯失败。。。')
                    }
                },)
            },
      },
    }
</script>

<style lang="scss" scoped>
  #newsList{
    position: relative;
    height: 100vh;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 40px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
  //给下拉刷新添加样式
  .van-pull-refresh{
    text-align: center;
    color: #999999;
  }
   /*  设置图片懒加载样式*/
  img[lazy=error] {
    width: 40px;
    height: 100px;
   }
  img[lazy=loaded] {
    width: 40px;
    height: 100px;
  }
  img[lazy=loading]{
    width: 40px;
    height: 100px;
  }
</style>
