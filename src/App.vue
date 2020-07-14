<template>
  <div id="app">
    <div class="app-container">
      <!--  顶部Header 区域    -->
      <!-- <mt-header class="mint-header" fixed :title="title" v-model="home">
        <mt-button icon="back" @click="routers" slot="left" v-show="this.folact">返回</mt-button>
      </mt-header> -->
      <!--  中间 router-view 区域    -->
      
      <transition v-if="isRouterAlive">
        <keep-alive>
        <router-view class="views"/>
        </keep-alive>
      </transition>
      
      <!--  底部 Tabbar 区域  -->
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{getAllCount}}</span>
        </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/member">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
  import {mapGetters, Store} from "vuex";

  export default {
    provide() {                                  //=>父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
      return {
        reload: this.reload,
      }
    },
    data() {
      return {
        title: ' ',
        folact: false,
        isRouterAlive: true,                   //=>控制视图是否显示的变量
      }
    },
    computed: {
      ...mapGetters(['getAllCount']),
      // getAllCount(){
      // //  return this.$store.getters.getAllCount
      //  console.log(this.$store.getters.getAllCount)
      //  console.log(this.store)
      // },
      home: function () {
        this.folact = false;
        if (this.$route.path === '/home') {
          return this.title = '鑫华服装'
        } else {
          return this.folact = true;
          return this.title = this.$route.meta.title;
        }
        return false;
      },
    },
    created(){
      // this.getAllCount();
    },
    methods: {
      reload() {                                //=>点击页面刷新
        this.isRouterAlive = false;             //=>先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true;            //=>再打开
        })
      },
      routers() {
        this.$router.go(-1);              //=>返回上一给页面
      },
    },
  }
</script>

<style scoped>
  @import url('../static/css/App.css');
  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
    width: 0 !important;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
</style>
