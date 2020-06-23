const FastClick = require('fastclick');     //=>引入vux库里的 fastclick 来实现移除移动端页面点击延迟    npm install fastclick -S
FastClick.attach(document.body);
import 'intersection-observer';             //=>组件懒加载  兼容低版本的浏览器
import Vue from 'vue'                       //=>入口文件
// import Vuex from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
import App from './App'                     //=>导入App根组件
import router from './router'               //=>1.3 导入自己的 loading.js 路由模块
import VueRouter from 'vue-router'          //=>1.1 导入路由的包
import store from "./store/store";          //=>引入状态管理员对象 store2.js 本地储存
import ElementUI from 'element-ui'          //=>引入ElementUi   npm i element-ui -S
import request from "vue-resource/src/http/request";
import { Search } from 'vant';              //=>引入搜索
import { PullRefresh} from 'vant';          //=>引入下拉刷新
import { Header,Swipe, SwipeItem, Button,Navbar,TabItem,TabContainer, TabContainerItem, } from 'mint-ui';   //=>导入Mint-Ui 组件 npm install mint-ui --save

import moment, { min } from 'moment'        //=>导入格式时间插件    npm install moment --save
Vue.filter('dateFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {    //=>定义一个时间的全局过滤器
  return  moment(dataStr).format(pattern)
});
import '../static/iconfont/iconfont'
import 'mint-ui/lib/style.css'                    //=>引入Mint-ui.css样式 否则没有效果
import 'element-ui/lib/theme-chalk/index.css'     //=>引入ElementUI样式
import '../static/css/mui.min.css'                //=>导入Mui的样式
import '../static/css/icons-extra.css'            //=>导入 Mui 购物车扩展图标样式
import '../static/css/element.css'                 //=>引入Element样式
import '../static/js/rem';                  //=>手机自适应第二种方法
//=>import './lib/mui/js/loader'            //=>手机自适应第一种方法
import {Lazyload} from 'vant'                     //=>引入图片懒加载  通过 npm i vant -S 安装vant
Vue.use(Lazyload,{
  lazyComponent: true,                            //=>组件懒加载 注册时设置`lazyComponent`选项，将需要懒加载的组件放在lazy-component标签中，即可实现组件懒加载。
  preLoad: 1.3,                                   //=>提前加载高度（数字 1 表示 1 屏的高度） 默认值:1.3
  error: './static/img/LazyLoad/BB.gif',         //=>当加载图片失败的时候
  loading: './static/img/LazyLoad/AA.gif',       //=>图片加载状态下显示的图片
  attempt: 1,                                     //=>加载错误后最大尝试次数 默认值:3
});

import util from './util/debounces';
Vue.prototype.utils = util;

import Axios from './api/config';
Vue.config.productionTip = false;

Vue.use(Search);        //=>注册全局配置 搜索框
Vue.use(PullRefresh);   //=>注册全局配置 下拉刷新
Vue.use(ElementUI);     //=>注册全局配置
Vue.use(infiniteScroll);//=>注册全局配置
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
//引入 库里的导航栏
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

new Vue({
  el: '#app',
  router,     //=>1.4 挂载路由对象到 VM 实例上
  VueRouter,  //=>1.2 安装路由
  store,      //=>挂载 store
  Axios,
  // render: c => c(app),
  components: { App },
  template: '<App/>'
});
