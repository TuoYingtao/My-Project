<template>
  <div>
    <Header v-model="keywords" @searchTitle="searchTitle"/>
    <van-search class="van-search"
                v-model="keywords"
                id="search"
                placeholder="请输入搜索关键词,如:时尚或潮流">
    </van-search>
    <van-pull-refresh class="van-pull-refresh"
                      v-model="isLoading"
                      loosing-text="释放即可刷新...."
                      animation-duration=500
                      head-height= 0
                      @refresh="onRefresh"
    >
    <ul class="mui-table-view" v-for="item in list" :key="item.id">
		<router-link :to="'/Detalis/ClothingDetails/' + item.id">
		  <li class="mui-table-view-cell mui-media">
			<a href="javascript:;">
			  <img class="mui-left" v-lazy="item.img_url">
			  <div class="mui-media-body">
				<div class="title">{{ item.category }}</div>
				<p class='mui-ellipsis'>{{ item.title }}</p>
				<p class='mui-ellipsis'>{{ item.price_item }}</p>
				<p class='mui-ellipsis slogan'>{{ item.slogan }}</p>
			  </div>
			</a>
		  </li>
	  </router-link>
    </ul>
    </van-pull-refresh>
  </div>
</template>

<script>
  import Header from "@/components/commion/content/regionTopBottom/Header";
  import { getSnake, getSnakeGoods } from "@/api/request"; //=> axios请求
    export default {
      components:{
        Header,
      },
        data() {
            return {
                isLoading:false,
                keywords:'',
                list:[],
            };
        },
        created() {
            getSnake().then((result) => {
              this.list = result.data.clothing;
            }).catch((err) => {
             return Promise.reject(err);
            });
            this.search();
        },
        methods: {
          searchTitle(titledata){
            let searchList = [];
            searchList = this.list.filter((item) => {
              if(item.category.includes(titledata)){
                return item;
              }
            });
            return searchList;
          },
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                    Toast("刷新成功")
                }, 2000);
            },
            //时尚模糊查询
            search(keywords){
                let newlist = [];
                //For each some filter findIndex这些都属于数组的新方法
                //都会对数组中的每一项进行遍历
                //方法一
                // this.list.forEach(item => {
                // 	if(item.name.indexOf(keywords) != -1){
                // 	newlist.push(item)
                // 	}
                // })
                // return newlist
                //方法二
                //在ES6中，为字符串提供了一个新的方法。String.prototype.includes('要包含合法的字符串')
                //如果包含，则返回true，否则返回false
                // contain
                newlist = this.list.filter(item => {
                    if (item.category.includes(keywords)){
                        return item
                    }
                });
                return newlist
            }
        },
    }
</script>

<style lang="scss" scoped>
  //给下拉刷新添加样式
  .van-pull-refresh{
    color: #999999;
  }
  .van-search{
    width: 100%;
    height: 35px;
    background-color: #f3f3f3;
    position: fixed;
    top: 40px;
    z-index: 2;
  }
  .mui-table-view{
    position: relative;
    top: 40px;
    .mui-left{
      width: 160px;
      height: 200px;
    }
    .mui-media-body{
      width: 150px;
      position: absolute;
      right: 10px;
      top: 30px;
      /*float: right;*/
      .title{
        color: #f44336;
        font-size: 20px;
      }
    }
    .mui-ellipsis{
      width: 140px;
      margin-top: 20px;
    }
  }
</style>
