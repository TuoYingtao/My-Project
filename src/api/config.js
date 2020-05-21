import axios from './axios'
const service = axios.create({
  baseURL: process.env.API_HOST,
  withCredentials : true,   //设置跨域请求是否允许携带Cookie
  timeout: 20000,
  headers: {
    'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
  }
});

export default ({
  service,
  axios,
})
