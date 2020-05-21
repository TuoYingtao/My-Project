import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
import boolean from "less/lib/less/functions/boolean";
import number from "less/lib/less/functions/number";
import Axios from 'axios'
Vue.use(Vuex);

// 每当初始化项目的时候，就先从 localStorage 中取一下数据
let car = window.JSON.parse(localStorage.getItem('cart') || '[]');

const store = new Vuex.Store ({
  //定义状态
  state: {                  //=>全局管理的数据存储
    // 在 cart 中，应该把每个商品，存储为一个对象  { id,  count, selected, price }
    cart: car,              //=>购物车数组
    pinglun:[],             //=>评论数组
    all_selsect: true,      //=>全选状态
    all_money: 0,           //=>总价格
    userInfo: {},           //=>其它用户属性可在这里初始化
    login: false,
  },

  getters:{                 //=>监听数据变化
    getStorage(state){    //=>获取本地存储的登录信息
      if (!state.token){
        state.token = JSON.parse(localStorage.getItem(key))
      }
      return state.token
    },
    //获取购物车总数量
    getAllCount(state) {
      let sum = 0;
      state.cart.forEach(item => {
        sum += item.count;
      });
      return sum;
    },
    //获取购物车的选择状态
    getGoodsChecked(state) {
      let temp = {};
      state.cart.forEach(item => {
        temp[item.id] = item.seleced;
      });
      return temp;
    },
    //总价格
    totlePrice(state){
      let all_money = 0;
      state.cart.forEach((item) =>{
        if (item.seleced === true){
          all_money += item.price * item.count;
        }
      });
      return state.all_money = all_money
    },
    getGoodsAmount(state){//总金额
      let amount = 0;
      state.cart.forEach((item) => {
        if(item.seleced === true){
          state.all_money = amount +=  item.price * item.count;
        }
      });
      //千位分隔符正则
      return state.all_money
    },
  },
  mutations:{
    $_setToken(state, value) { // 设置存储token
      state.token = value;
      localStorage.setItem('token',window.JSON.stringify(state.token));
    },
    $_removeStorage(state, value){  // 删除token
      localStorage.removeItem('token');
    },
    changeUserInfo(state, value){   //value 就是传递的值
      state.userInfo = value;
      console.log("store:" + state.userInfo)
    },
    Storingpinglun(state,obj){
      state.pinglun.some(item => {
        item.name = obj;
        state.pinglun.push(obj);
        return true
      });
      localStorage.setItem('pinglun', window.JSON.stringify(state.pinglun))
    },
    addToCar(state, goods) {
      // 将商品添加到购物车
      // 如果购物车中，之前曾经有这条商品，则只更新数量即可；如果曾经没有，则 直接push
      // state.cart.push(goods)
      let flag = false;   //假设没有新加入的商品
      state.cart.some(item => {
        if (item.id === goods.id) {
          // 如果找到了对应的商品，则直接更新数量
          item.count += goods.count;
          flag = true;
          // 终止后续循环
          return true;
        }
      });
      // 如果没找到，则直接 push 到购物车
      if (!flag) {
        state.cart.push(goods)
      }
      // 为了持久化存储购物车的数据，可以把 购物车的商品，序列化出来，存储到 localStorage 中
      localStorage.setItem('cart', window.JSON.stringify(state.cart))
    },
    updateGoodsCount(state, goods) {
      state.cart.some(item => {
        if (item.id === goods.id) {
          // 根据传递过来的商品的信息，更新购物车中商品的数量
          state.cart = goods.list;
          // 终止后续循环
          return true;
        }
      });
      // 为了持久化存储购物车的数据，可以把 购物车的商品，序列化出来，存储到 localStorage 中
      localStorage.setItem('cart', window.JSON.stringify(state.cart))
    },
    //根据提供的obj对象的 id 和 selected 属性，更改购物车中商品的选中状态
    changeSelectState(state, obj) {
      state.all_selsect = !state.all_selsect;
      if (state.all_selsect){
        state.cart.forEach((item) => {
          item.seleced = true;
          console.log('---'+ item.seleced);
          return obj.seleced = item.seleced
      });
      }else{
        state.cart.forEach((item) => {
          item.seleced = false;
          return obj.seleced = item.seleced
        })
      }
      // 为了持久化存储购物车的数据，可以把 购物车的商品，序列化出来，存储到 localStorage 中
      localStorage.setItem('cart', window.JSON.stringify(state.cart))
    },
    //删除商品
    deleteStoreCart(state, id) {
      state.cart.forEach((item, index) => {
        if (item.id === id) {
          state.cart.splice(index, 1);
          //终止循环
          return true
        }
      });
      //保存到本地存储
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    //购物车单选
    // noSeleced(state,id){
    //   let index=state.cart.findIndex(item=>{
    //     return item.id === id
    //   });
    //   state.cart[index].seleced = !state.cart[index].seleced;
    //   let flag = state.cart.some((item)=>{
    //     return item.seleced === false
    //   });
    //   if(!flag){       //如果全部选中，则全选状态也改变
    //     state.all_selsect=true
    //   }else{
    //     state.all_selsect=false
    //   }
    // },
  },
});


//=>页面切换显示加载Loading
store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
});

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
});

router.afterEach(function (to) {
  setTimeout(() => {
    store.commit('updateLoadingStatus', {isLoading: false})
  }, 300)
});

//=>axios请求加载Loading
Axios.interceptors.request.use(config => {
  console.log('ajax begin request');
  store.commit('ajaxStar');
  return config;
});

Axios.interceptors.response.use(config => {
  console.log('ajax get response');
  store.commit('ajaxEnd');
  return config
});

store.registerModule('axios', { // 名字自己定义
  state: {
    ajaxIsLoading: false
  },
  mutations: {
    ajaxStar (state) {
      state.ajaxIsLoading = true
    },
    ajaxEnd (state) {
      state.ajaxIsLoading = false
    }
  },
  getter : {
    ajaxIsLoading: state => state.ajaxIsLoading
  }
});

export default store

