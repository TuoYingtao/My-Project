module.exports = {
    configureWebpack:{
        resolve:{
            extensions:[],
            alias:{
                'assets':'@/assets',
                'components':'@/components',
                'util':'@/util',
                'views':'@/views',
                'static':'@/static',
            }
        }
    },
    outputDir: 'dist',
    publicPath: '/'
    // publicPath: process.env.NODE_ENV === 'production' 
    // ? '/my-vue-project/' 
    // : '/'
}