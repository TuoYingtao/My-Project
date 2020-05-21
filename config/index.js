'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    <!-- 使用proxyTable进行跨域设置 -->
    proxyTable: {
      '/api':{
        target:'http://localhost:8081/',   //后端接口原地址 设置你调用的接口域名和端口号, 别忘了加http
        changOrigin:true,   //是否允许跨域
        secure: true,   //允许https请求
        pathRewrite:{
          // 这里理解成用'/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
          // 比如我要调用'http://localhost:8081/status/Snake.json'，直接写'/api/status/Snake.json'即可'
          '^/api':''
        }    //路劲重写 这里理解成用‘/api’代替target里面的地址
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),   //打包后进入的主页入口配置路径

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),   //大包后的静态文件根路径
    assetsSubDirectory: 'static',     //打包后静态文件存放路径
    assetsPublicPath: './',   //打包后静态文件访问路经

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
