<template>
<!-- 在Vue中，模板中必须有一个根元素将内容全部包裹起来 -->
  <div id="HomeContainer">
    <!--   火箭：回到顶部   -->
    <top-rocket @click.native="backtopClick" v-show="isShowBackTop"/>
<!--  better-scroll滚动监听  -->
    <scroll class="content"
                   ref="scroll"
                  :probe-type="3"
                  :pull-up-load="true"
                  @scroll="contentScroll"
                  @pullingUp="loadMore">
      <div></div>
  <!-- 轮播图区域  -->
      <chart class="chart" :chart-data="lunbotuList"/>
  <!--  六宫格 -->
      <div class="mui-grid-view">
        <div class="mui-table-view-cell">
          <router-link to="/home/newslist">
            <img src="../../../static/img/menu6.png" alt="">
            <div class="mui-media-body">服装资讯</div>
          </router-link>
        </div>
        <div class="mui-table-view-cell">
          <router-link to="/picture/picturesharing">
            <img src="../../../static/img/menu5.png" alt="">
            <div class="mui-media-body">热门服装</div>
          </router-link>
        </div>
        <div class="mui-table-view-cell">
          <router-link to="/purchase/clothing">
            <img src="../../../static/img/menu3.png" alt="">
            <div class="mui-media-body">购买服装</div>
          </router-link>
        </div>
      </div>

      <recommend :recommend-title="title1"/>
      <recommend :recommend-title="title2"/>
      <recommend/>
        <ul>
          <li>低1个</li>
          <li>低2个</li>
          <li>低3个</li>
          <li>低4个</li>
          <li>低5个</li>
          <li>低6个</li>
          <li>低7个</li>
          <li>低8个</li>
          <li>低9个</li>
          <li>低10个</li>
          <li>低11个</li>
          <li>低12个</li>
          <li>低13个</li>
          <li>低14个</li>
          <li>低15个</li>
          <li>低16个</li>
          <li>低17个</li>
          <li>低18个</li>
          <li>低19个</li>
          <li>低20个</li>
          <li>低21个</li>
          <li>低22个</li>
          <li>低23个</li>
          <li>低24个</li>
          <li>低25个</li>
          <li>低26个</li>
          <li>低27个</li>
          <li>低28个</li>
          <li>低29个</li>
          <li>低30个</li>
          <li>低31个</li>
          <li>低32个</li>
          <li>低33个</li>
          <li>低34个</li>
          <li>低35个</li>
          <li>低36个</li>
          <li>低37个</li>
          <li>低38个</li>
          <li>低39个</li>
          <li>低40个</li>
          <li>低41个</li>
          <li>低42个</li>
          <li>低43个</li>
          <li>低44个</li>
          <li>低45个</li>
          <li>低46个</li>
          <li>低47个</li>
          <li>低48个</li>
          <li>低49个</li>
          <li>低50个</li>
          <li>低51个</li>
          <li>低52个</li>
          <li>低53个</li>
          <li>低54个</li>
          <li>低55个</li>
          <li>低56个</li>
          <li>低57个</li>
          <li>低58个</li>
          <li>低59个</li>
          <li>低60个</li>
          <li>低61个</li>
          <li>低62个</li>
          <li>低63个</li>
          <li>低64个</li>
          <li>低65个</li>
          <li>低66个</li>
          <li>低67个</li>
          <li>低68个</li>
          <li>低69个</li>
          <li>低70个</li>
          <li>低71个</li>
          <li>低72个</li>
          <li>低73个</li>
          <li>低74个</li>
          <li>低75个</li>
          <li>低76个</li>
          <li>低77个</li>
          <li>低78个</li>
          <li>低79个</li>
          <li>低80个</li>
          <li>低81个</li>
          <li>低82个</li>
          <li>低83个</li>
          <li>低84个</li>
          <li>低85个</li>
          <li>低86个</li>
          <li>低87个</li>
          <li>低88个</li>
          <li>低89个</li>
          <li>低90个</li>
          <li>低91个</li>
          <li>低92个</li>
          <li>低93个</li>
          <li>低94个</li>
          <li>低95个</li>
          <li>低96个</li>
          <li>低97个</li>
          <li>低98个</li>
          <li>低99个</li>
          <li>低100个</li>
        </ul>

    </scroll>
  </div>
</template>

<script>

  import Scroll from "../commion/scroll/Scroll";      //=> 引入BetterScroll组件
  import TopRocket from "../commion/BackTool/TopRocket";  //=> 引入回到顶部组件
  import Recommend from "../commion/Label/Recommend";     //=> 资讯标签栏
  import Chart from "../commion/Rotation/Chart";          //=> 轮播图
  import  { Toast } from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    components:{
      Scroll,      //=> 注册BetterScroll组件
      TopRocket,   //=> 注册回到顶部组件
      Recommend,   //=> 资讯标签栏
      Chart,       //=> 轮播图
    },
       data(){
           return{
             title1: "最新资讯",
             title2: "火爆拍卖",
             lunbotuList:[],
             isShowBackTop: false,      //=>回到顶部默认为隐藏
           };
       },
        created(){
          this.getLunbotu();
        },
        methods:{
           getLunbotu(){
               axios.get('./static/Snake.json').then(result => {
                   if (result.data.status === 0){
                       //获取成功
                       this.lunbotuList = result.data.message;
                     // Toast('获取轮播图成功.....')
                   }else{
                       //获取失败
                       Toast('获取轮播图失败.....');
                   }
               });
           },
          //=> 上拉加载更多
          loadMore(){
            console.log('------');
            // this.$refs.scroll.finishPullUp()
            // this.$refs.scroll.refresh()
          },
          //=> 火箭滚动显示
          contentScroll(position){
            /*
            * 火箭滚动显示
            * position.y是scroll中实时监听的y坐标；（为负值）
            * 当y滚动到500的时候，就将this.backtop为true
            * */
             this.isShowBackTop = (-position.y) > 500
          },
          /*
          * x轴,y轴,时间
          * x:0,y:60,itme:600
          * y轴设置60使它在回到顶部的时候有回弹效果
          *  */
          backtopClick(){
             this.$refs.scroll.scrollTo(0,60,600)
          }
        },
    }
</script>

<style lang="scss" scoped>
  #HomeContainer{
    background-color: rgba(250, 187, 187, 0.6);
    // rgba(128,32,32,0.6)
    height: 100vh;
    position: relative;
    .content{
      overflow: hidden;
      position: absolute;
      top: 40px;
      bottom: 50px;
      left: 0;
      right: 0;
    }
    //=> 回到顶部火箭样式
    .back-top{
      z-index:9;
    }
    //=> 给子组件轮播图设置样式 或是/deep/
    .chart{
        overflow: hidden;
    }
    .chart >>> img{
      padding: 10px;
      border-radius: 19px;
    }
    //=> 六宫格样式
      .mui-grid-view{
        display: flex;
        justify-content: space-around;
        margin: 0 10px 0 10px ;
        border-radius: 0 0 10px 10px;
        background-color: #ffffff;
        .mui-table-view-cell{
          border: none;
          text-align: center;
          img{
            width: 50px;
            height: 50px;
          }
          .mui-media-body{
            font-size: 12px;
          }
        }
      }
}
</style>
