<template>
  <div>
<!--    <mt-header fixed title="服装详情">-->
<!--        <mt-button icon="back" @click="text" slot="left">返回</mt-button>-->
<!--    </mt-header>-->
    <div class="newsinfo-container" v-for="item in newsinfo" :key="item.id">
<!--    大标题  -->
      <h3 class="title" >{{ item.title }}</h3>
<!--    子标题  -->
      <p class="subtitle">
        <span>发表时间：{{ item.date | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</span>
        <span>类型：{{ item.category }}次</span>
      </p>
      <hr>
<!--   内容区域   -->
      <div class="content" v-html="item.cound"></div>

<!--  评论区域    -->
      <comment-box></comment-box>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import NewsList from "../NewsList";
// 1.导入评论组件
import comment from "./subcomponents/comment";
//2.导入类容
import comment_text from "./subcomponents/comment-text";
    export default {
        data(){
            return{
                //测试是否获取到当前点击的类容ID 并将url地址传递过来，方便以后的调用
                id: this.$route.params.id,
                newsinfo:{ },
                info:{},
            };
        },
        created(){
            this.getNewsInfo();
        },
        methods:{
            text(){
                this.$router.go(-1);           //=>返回上一给页面
            },
            getNewsInfo(){  //获取新闻列
                let JSONLIST = './static/Snake.json';
                axios.get(JSONLIST).then(result => {
                    if (result.data.status === 0){
                        //如果没有失败，应该把数据保存在data上
                        this.newsinfo = result.data.clothing.filter((item) => {
                          return this.id === item.id
                        })
                        // 过滤不等于当前点击的id的数据
                        // this.info = this.newsinfo.filter((item) => {
                        //     return this.id === item.id
                        // })
                    }else{
                        Toast('获取服装资讯失败。。。')
                    }
                })
            },
        },
        components:{  // 用来注册子组件的节点
            'comment-box':comment,
            'comment-text':comment_text,
        }
    }
</script>

<style lang="scss" scoped>
  .newsinfo-container{
    padding: 0 4px;
    .title{
      font-size: 16px;
      text-align: center;
      margin: 15px;
      color: red;
    }
    .subtitle{
      font-size: 14px;
      color: cornflowerblue;
      display: flex;
      justify-content: space-between;
    }
    .content{}
  }

</style>
