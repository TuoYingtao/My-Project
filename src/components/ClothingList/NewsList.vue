<template>
<div id="newsList">
  <loading v-model="isLoading" />
  <Header/>
  <scroll class="content"
          ref="scrollDom"
          :probe-type="3"
          :pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp="loadMore">
    <commo-news @itemImageLoad="itemImageLoad" 
                :is-data-list="newsLists" 
                :text-data="text"/>

  </scroll>
</div>
</template>

<script>
  import Header from "@/components/commion/content/regionTopBottom/Header";
  import Scroll from '../commion/scroll/Scroll'
  import CommoNews from '../commion/List/CommoNews'
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
  import { Toast } from  "mint-ui";
  import { getSnake, getSnakeGoods } from "@/api/request"; //=> axios请求
    export default {
      components:{
        Header,
        Loading,     //=> 加载
        Scroll,      //=> 注册BetterScroll组件
        CommoNews,   //=> 注册服装详情列表
      },
        data(){
            return{
                newsLists:[],
                count: 10,
                isLoading:false,
                text: '这是父组件传递的信息'
            }
        },
        computed:{
            ...mapState({ 
              ajaxIsLoading: state => state.axios.ajaxIsLoading, 
              isLoadings: state => state.vux.isLoading
            }),
            childrenData(property){
              console.log(property)
          },
        },
        created(){
          this.getNewsList();
        },
        mounted(){
          
        },
        methods:{
          itemImageLoad(state){
            if (state) { 
              this.utils.debounce(this.$refs.scrollDom.refresh(),500);            
            }
          },

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
            getNewsList(){
                //获取服装资讯列表
                getSnake().then(result => {
                    if (result.data.status === 0){
                        //如果没有失败，应该把数据保存在data上
                        this.newsLists = result.data.clothing;                  
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
