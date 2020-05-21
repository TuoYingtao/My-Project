// 每当初始化项目的时候，就先从 localStorage 中取一下数据
let car = window.JSON.parse(localStorage.getItem('cart') || '[]');
export default car
