/*
 * @PageName: 购买服装页面
 * @Author: BeautifulGirl230
 * @Date: 2020-06-21 17:54:10
 * @Last Modified by: BeautifulGirl230
 * @Last Modified time: 2020-06-21 18:07:55
 */

<template>
  <div id="div">
    <!--  顶部Header 区域    -->
<!--    <mt-header fixed title="商品列表">-->
<!--        <mt-button icon="back" @click="text" slot="left">返回</mt-button>-->
<!--    </mt-header>-->
    <!--  better-scroll滚动监听  -->
    <top-rocket @click.native="backTopClick" v-show="isShowBackTop"/>
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <commodity ref="dity" :data-list="Clothes"
                 @itemImageLoad='imageLoad'/>
    </scroll>
  </div>
</template>

<script>
  import Commodity from "../commion/List/Commodity";      //引入列表
  import Scroll from "../commion/scroll/Scroll";          //引入Scroll滚动
  import TopRocket from "../commion/BackTool/TopRocket";  //回到顶部火箭
  import { Toast } from "mint-ui";
    export default {
      components:{
        Commodity,    //注册列表
        Scroll,       //注册滚动
        TopRocket,    //注册回到顶部火箭
      },
        data(){
            return{
                id: this.$route.params.id,
                Clothes:[],
                list:[],
                isShowBackTop: false,
            }
        },
        created(){
            this.getClothes();
        },
        methods:{
          imageLoad(){
            this.utils.debounce(this.$refs.scroll.refresh.refresh);
          },
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                    Toast("刷新成功")
                }, 2000);
            },
            getClothes(){
                this.$forceUpdate();
                axios.get('./static/Snake.json').then((result) => {
                    if (result.data.status === 0){
                        this.list = result.data.souper;
                        this.Clothes = result.data.clothing;
                        // console.log(this.list);
                        this.$forceUpdate();
                    }else{
                        Toast({message: '获取服装列表失败。。。',duration: 1500});
                    }
                }).catch((error) =>{
                    Toast({message: 'result.data.status' + "失败", type: 'success', duration: 1500});
                    // console.log(error)
                })
            },
          loadMore(){
            console.log("---------")
          },
          contentScroll(position){
              this.isShowBackTop = (-position.y) > 500
          },
          backTopClick(){
              this.$refs.scroll.scrollTo(0,70,600)
          }
        }
    }
</script>

<style lang="scss" scoped>
  #div{
    height: 100vh;
    position: relative;
    .scroll{
      overflow: hidden;
      height: calc(100%);
      /*position: absolute;*/
      /*top: 40px;*/
      /*bottom: 50px;*/
      /*left: 0;*/
      /*right: 0;*/
    }

  }
  .back-top{
    z-index:9;
  }
</style>
