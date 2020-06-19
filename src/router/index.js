import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
let router = new Router({
  // mode: 'history',
  routes:[  //配置路由规则
    //设置默认路径
    {
      path:'/',
      redirect: '/home',
    }, {
      path:'/home',
      name:'HomeContainer',
      component: r => require.ensure([],() => r(require('@/components/tabbar/HomeContainer')),'demo'),
      meta:{
        title:'首页',
        type:'token'
      },
      children:[]
    }, {
      path:'/search',
      name:'SearchContainer',
      component: r => require.ensure([],() => r(require('@/components/tabbar/SearchContainer')),'demo'),
      meta:{
        title:'搜索',
        type:'token'
      }
    }, {
      path:'/shopcar',
      name:'ShopcarContainer',
      component: r => require.ensure([],() => r(require('@/components/tabbar/ShopcarContainer')),'demo'),
      meta:{
        title:'购物车页面',
        type:'token'
      }
    }, {
      path:'/member',
      name:'MemberContainer',
      component: r => require.ensure([],() => r(require('@/components/tabbar/MemberContainer')),'demo'),
      meta:{
        title:'我的',
        type:'token'
      }
    }, {
      //=>配置登录页面默认路径
      path:'/login',
      name:'login',
      component: r => require.ensure([],() => r(require('@/components/userlogin/login')),'demo'),
      meta:{
        login:'登录页面',
        type:''
      }
    }, {
      //=>配置服装资讯默认路径
      path:'/home/newsinfo/:id',
      name:'NewsInfo',
      component: r => require.ensure([],() => r(require('@/components/news/newsinfo/Newsinfo')),'demo'),
      meta:{
        title:'服装详情页面',
        type:'token'
      }
    }, {
      //=>配置热门服装默认路径
      path:'/picture/picturesharing',
      name:'PictureSharing',
      component: r => require.ensure([],() => r(require('@/components/PictureSharing/PictureSharing')),'demo'),
      meta:{
        title:'热门服装页面',
        type:'token'
      }
    }, {
      //配置购买服装默认路径
      path:'/purchase/clothing',
      name:'BuyingClothes',
      component: r => require.ensure([],() => r(require('@/components/BuyingClothes/BuyingClothes')),'demo'),
      meta:{
        title:'购买服装页面',
        type:'token'
      }
    }, {
      path:'/Detalis/ClothingDetails/:id',
      name:'ClothingDetails',
      component: r => require.ensure([],() => r(require('@/components/BuyingClothes/Details/ClothingDetails')),'demo'),
      meta:{
        title:'购买服装详情页面',
        type:'token'
      }
    },
  ],
  linkActiveClass:'muiMin-active'  //覆盖默认的路由高亮类，默认的类叫做 router-link-active
});

//把路由对象暴露出去
export default router
