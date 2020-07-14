import Axios from 'axios'
import store from "../store/store";
import router from "../router";   //引入axios  npm install axios --save

// Axios.defaults.baseURL = '/api';  // 改成/api才能用proxyTable跨域
// Axios.defaults.timeout = 10000;  //设置请求超时时间
// Axios.defaults.withCredentials = true;    //设置跨域请求是否允许携带Cookie

//=>设置POST之下请求主体数据格式处理
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
global.axios = Axios;  //设置一个全局axios便于调用


// 全局路由构造函数，判断是否登录和要跳转到页面
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.title)) {    // 需要登录
//     if(window.localStorage.token){
//       next()
//     } else {
//       next({path: '/login'});
//     }
//   } else {
//     next()
//   }
// });

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(store.state.token){
    config.headers.common['token'] =store.state.token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  router.push("/login");
  return Promise.reject(error);
});
// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  if (!response.data){
    return {
      msg:'数据返回不合理'
    }
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error.response){
    switch(error.response.status){
      case 401:
        localStorage.removeItem('token');
        router.replace({
          path: '/home',
          query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        })
    }
  }
  return Promise.reject(error);
});

export default Axios;
