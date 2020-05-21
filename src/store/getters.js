//=>监听数据变化
export default {
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
}
