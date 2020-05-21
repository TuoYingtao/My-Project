<template>
<div>
  <Loading v-model="ajaxIsLoading"></Loading>
  <van-pull-refresh class="van-pull-refresh"
                    v-model="isLoading"
                    loosing-text="释放即可刷新...."
                    animation-duration=500
                    head-height= 0
                    @refresh="onRefresh"
  >
  <ul class="mui-table-view"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="200"
      infinite-scroll-immediate = "true">
    <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
      <router-link :to="'/home/newsinfo/' + item.id">
        <img class="mui-media-object mui-pull-left" v-lazy="item.img_url">

        <div class="mui-media-body">
          <h1>{{ item.title }}</h1>
          <p class='mui-ellipsis'>
            <span>发表时间：{{ item.date | dateFormat('YYYY-MM-DD') }}</span>
            <span>类型：{{ item.category }}</span>
          </p>
        </div>
      </router-link>
    </li>
  </ul>
    <p v-if="loading">加载中....</p>
    <p v-if="noMore">暂无更多数据</p>
  </van-pull-refresh>
</div>
</template>

<script>
    import { Loading } from 'vux'
    import { mapState } from 'vuex'
    import { Toast } from  "mint-ui";
    export default {
        data(){
            return{
                isLoading:false,
                newslist:[],
                count: 10,
                loading: false
            }
        },
        computed:{
            ...mapState({ ajaxIsLoading: state => state.axios.ajaxIsLoading }),
            noMore() { return this.count >= 20 },
            disabled() { return this.loading || this.noMore },
        },
        components:{
            Loading
        },
        created(){
          this.getNewsList();
        },
        methods:{
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
                axios.get('./static/Snake.json',
                    {
                        'headers':{
                            'Content-Type':'Access-Control-Allow-Origin:*,Access-Control-Allow-Method:POST,GET,PUT,DELETE,OPTIONS',
                        }
                    }
                ).then(result => {
                    if (result.data.status === 0){
                        //如果没有失败，应该把数据保存在data上
                        this.newslist = result.data.clothing;
                    }else{
                        Toast('获取服装资讯失败。。。')
                    }
                },)
            },
      },
    }
</script>

<style lang="scss" scoped>
  //给下拉刷新添加样式
  .van-pull-refresh{
    text-align: center;
    color: #999999;
  }
  /*  设置图片懒加载样式*/
  img[lazy=error] { }
  img[lazy=loaded] { }
  img[lazy=loading]{
    width: 40px;
    height: 100px;
  }
.mui-table-view{
  width: 100%;
  height: 100%;

  li{
    width: 100%;
    height: 80px;
    img{
      width: 70px;
      height: 60px;
    }
    h1{
      font-size: 14px;
      height: 20px;
    }
    mui-media-body{
      width: 150px;
      float: right;
    }
    .mui-ellipsis{
      font-size: 12px;
      color: #007aff;
      //设置左右对齐
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
