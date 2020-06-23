// 每当初始化项目的时候，就先从 localStorage 中取一下数据
let car = window.JSON.parse(localStorage.getItem('cart') || '[]');

export default {
     // 在 cart 中，应该把每个商品，存储为一个对象  { id,  count, selected, price }
     cartCount: 0,           //=>购物车数量
     cart: car,              //=>购物车数组
     pinglun:[],             //=>评论数组
     all_selsect: true,      //=>全选状态
     all_money: 0,           //=>总价格
     userInfo: {},           //=>其它用户属性可在这里初始化
     login: false,
}