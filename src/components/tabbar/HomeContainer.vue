<template>
  <!-- 在Vue中，模板中必须有一个根元素将内容全部包裹起来 -->
  <div id="HomeContainer">
    <Header/>
    <!--   火箭：回到顶部   -->
    <top-rocket @click.native="backtopClick" v-show="isShowBackTop" />
    <!-- 顶部导航栏 -->
    <tab-control
      ref="tabControl01"
      class="tabControl"
      @itemClick="tabClick"
      :titles="tabClickData"
      v-show="isTabFixed"
    />
    <!--  better-scroll滚动监听  -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <div></div>
      <!-- 轮播图区域  -->
      <chart ref="chart" class="chart" :chart-data="lunbotuList" @itemImageLoad="imageLoad" />
      <!--  六宫格 -->
      <div class="mui-grid-view">
        <div class="mui-table-view-cell">
          <router-link to="/home/newslist">
            <img src="../../../static/img/menu6.png" alt />
            <div class="mui-media-body">服装资讯</div>
          </router-link>
        </div>
        <div class="mui-table-view-cell">
          <router-link to="/picture/picturesharing">
            <img src="../../../static/img/menu5.png" alt />
            <div class="mui-media-body">热门服装</div>
          </router-link>
        </div>
        <div class="mui-table-view-cell">
          <router-link to="/purchase/clothing">
            <img src="../../../static/img/menu3.png" alt />
            <div class="mui-media-body">购买服装</div>
          </router-link>
        </div>
      </div>

      <recommend class="recommend" :recommend-title="title1" />

      <!-- 服装数据导航栏 -->
      <tab-control
        ref="tabControl02"
        class="tabControl"
        @itemClick="tabClick"
        :titles="tabClickData"
      />
      <!-- 服装数据 -->
      <commodity :data-list="showGoods" @itemImageLoad="commodity" />
    </scroll>
  </div>
</template>

<script>
import Header from "@/components/commion/content/regionTopBottom/Header";
import { getSnake, getSnakeGoods } from "@/api/request"; //=> axios请求
import Scroll from "@/components/commion/scroll/Scroll"; //=> 引入BetterScroll组件
import TopRocket from "@/components/commion/BackTool/TopRocket"; //=> 引入回到顶部组件
import Recommend from "../commion/Label/Recommend"; //=> 资讯标签栏
import Chart from "../commion/Rotation/Chart"; //=> 轮播图
import TabControl from "@/components/commion/content/tabControl/TabControl";
import Commodity from "../commion/List/Commodity"; //=> 服装列表
export default {
  components: {
    Scroll, //=> 注册BetterScroll组件
    TopRocket, //=> 注册回到顶部组件
    Recommend, //=> 资讯标签栏
    Chart, //=> 轮播图
    Commodity, //=> 服装列表
    TabControl,
    Header,
  },
  data() {
    return {
      isanimated: true,
      tabClickData: ["流行", "新款", "精选"],
      title1: "最新资讯",
      lunbotuList: [],
      isShowBackTop: false, //=> 回到顶部默认为隐藏
      isTabFixed: false, //=> 顶部导航栏默认隐藏
      taboffsetTop: 0,
      goods: {
        clothing: { page: 0, list: ["1"] },
        souper: { page: 0, list: ["2"] },
        souper2: { page: 0, list: ["3"] }
      },
      currentType: "clothing",
      scrollY: 0,
    };
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  beforeCreate() {
    console.log("HomeContainer beforeCreate");
  },

  created() {
    //=> 请求轮播图数据
    getSnake()
      .then(result => {
        this.lunbotuList = result.data.message;
      })
      .catch(err => {
        return Promise.reject(err);
      });

    //=> 请求多个数据
    this.getSnakeGoods("clothing");
    this.getSnakeGoods("souper");
    this.getSnakeGoods("souper2");
  },

  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "clothing";
          break;
        case 1:
          this.currentType = "souper";
          break;
        case 2:
          this.currentType = "souper2";
          break;
      }
      this.$refs.tabControl01.currentIndex = this.$refs.tabControl02.currentIndex = index;
    },

    getSnakeGoods(type) {
      getSnakeGoods()
        .then(result => {
          this.goods[type].list = result.data[type];
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },

    commodity() {
      this.utils.debounce(this.$refs.scroll.refresh.refresh);
    },

    imageLoad() {
      /*
       * 获取 tabControl 的 tabOffsetTop
       * 所有组件都有一个 $el 用于获取组件中的元素
       * */
      this.taboffsetTop = this.$refs.tabControl02.$el.offsetTop;
    },

    //=> 上拉加载更多
    loadMore() {
      console.log("------");
      this.$refs.scroll.finishPullUp();
    },

    //=> 火箭滚动显示
    contentScroll(position) {
      /*
       * 火箭滚动显示
       * position.y是scroll中实时监听的y坐标；（为负值）
       * 当y滚动到500的时候，就将this.backtop为true
       * */
      this.isShowBackTop = (-position.y) > 500;

      /*
       * 判断tabControl是否吸顶
       */
      this.isTabFixed = (-position.y) > this.taboffsetTop;


    },

    /*
     * x轴,y轴,时间
     * x:0,y:60,itme:600
     * y轴设置60使它在回到顶部的时候有回弹效果
     *  */
    backtopClick() {
      this.$refs.scroll.scrollTo(0, 60, 600);
    }
  },

  //=> 打印销毁
  destroyed() {
    console.log("HomeContatiner destroyed");
  },

  /*
  * 组件被激活时 回到之前离开的位置
  * */ 
  activated(){
    console.log('activatd');
      this.$refs.scroll.scrollTo(0,this.scrollY,50);
      this.$refs.scroll.refresh();
  },

  /*
  * 记录当前离开的位置
  * */ 
  deactivated(){
    console.log('deactivatd');
    this.scrollY =  this.$refs.scroll.getScrollY();
    console.log("当前位置：" + this.scrollY);
  }

};
</script>

<style lang="scss" scoped>
#HomeContainer {
  background-color: rgba(250, 187, 187, 0.6);
  height: 100vh;
  position: relative;
  .content {
    overflow: hidden;
    position: absolute;
    top: 40px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
  //=> 回到顶部火箭样式
  .back-top {
    z-index: 9;
  }
  //=> 给子组件轮播图设置样式 或是/deep/
  .chart {
    overflow: hidden;
  }
  .chart >>> img {
    padding: 10px;
    border-radius: 19px;
  }
  .recommend {
    margin-bottom: 10px;
  }
  .commodity >>> .waterfall {
    column-count: 2;
    column-gap: 1;
  }
  .commodity >>> .clothes_table_div {
    box-sizing: border-box;
    break-inside: avoid;
    padding: 10px;
  }
  .commodity >>> .items-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  //=> 六宫格样式
  .mui-grid-view {
    display: flex;
    justify-content: space-around;
    margin: 0 10px 0 10px;
    border-radius: 0 0 10px 10px;
    background-color: #ffffff;
    .mui-table-view-cell {
      border: none;
      text-align: center;
      img {
        width: 50px;
        height: 50px;
      }
      .mui-media-body {
        font-size: 12px;
      }
    }
  }
  .tabControl {
    // margin-top: 40px;
    position: relative;
    z-index: 9;
  }
}
</style>
