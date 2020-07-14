import Axios from 'axios';
import store from "../store/store";

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