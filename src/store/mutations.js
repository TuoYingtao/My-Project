export default{
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
}