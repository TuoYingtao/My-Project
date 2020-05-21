<template>
  <div>
    <div class="div" v-for="item in info">
      <div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                //测试是否获取到当前点击的类容ID 并将url地址传递过来，方便以后的调用
                id: this.$route.params.id,
                newsinfo:[],
                info:[],
            }
        },
        created(){
            this.getNewsInfo();
        },
        methods:{
            getNewsInfo(){  //获取新闻列
                let JSONLIST = './static/Snake.json';
                axios.get(JSONLIST).then(result => {
                    if (result.data.status === 0){
                        //如果没有失败，应该把数据保存在data上
                        this.newsinfo = result.data.clothing;
                        // 过滤不等于当前点击的id的数据
                        this.info = this.newsinfo.filter((item) => {
                            return this.id === item.id
                        })
                    }else{
                        Toast('获取服装资讯失败。。。')
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
.div{
  width: 100%;
  height: 500px;
}
</style>
