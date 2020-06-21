<template>
    <div class="cmt-container">
      <h3>发表评论</h3>
      <hr>
      <textarea id="tmp1" placeholder="请输入评论内容（最多120字）" maxlength="120" v-model="neirong"></textarea>
<!--      :disabled="!neirong"  如果评论内容为空 当前按钮不可用点击-->
      <mt-button type="primary" size="large" @click="postComment" :disabled="!neirong">发表评论</mt-button>
      <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in pinglunlist" :key="item.id">
          <div class="cmt-title">
            第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.name }}&nbsp;&nbsp;发表时间：{{ item.date | dateFormat }}
          </div>
          <div class="cmt-body">
            {{ item.neirong === 'undefined' ? '此用户很懒，什么的没说': item.neirong }}
          </div>
        </div>
        <div class="cmt-item" v-for="(item,i) in comment" :key="item.id">
          <div class="cmt-title">
            第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.name }}&nbsp;&nbsp;发表时间：{{ item.date | dateFormat }}
          </div>
          <div class="cmt-body">
            {{ item.neirong === 'undefined' ? '此用户很懒，什么的没说': item.neirong }}
          </div>
        </div>
      </div>
      <mt-button type="danger" size="large" plain @click="getComments">加载更多</mt-button>
    </div>
</template>

<script>
  import {Toast} from "mint-ui";
  import { mapMutations } from "vuex"
    export default {
      inject:['reload'],      //=>点击页面刷新
        data(){
            return{
                //测试是否获取到当前点击的类容ID 并将url地址传递过来，方便以后的调用
                id: this.$route.params.id,
                name:'匿名用户',
                neirong:'',   ////发表的评论数据
                pinglunlist:[],
                comment:[
                    // {name:'李白',date:Date.now(),neirong:'劝君更进一杯酒'},
                    // {name:'鸣人',date:Date.now(),neirong:'这就是我的忍道'},
                    // {name:'袁飞',date:Date.now(),neirong:'木叶飞舞的地方，火亦生生不息'}
                ], //所有的评论数据
            }
        },
        created(){
            this.loadComments();
        },
        methods:{
            ...mapMutations(["Storingpinglun"]),
            getComments(){
                let pinglun  = '';
                axios.get('./static/Snake.json').then(result => {
                if (result.data.status === 0){
                        //如果没有失败，应该把数据保存在data上
                        pinglun = result.data.clothing;
                        pinglun.filter((item) => {
                            return this.id === item.id;
                        });
                    this.comment = pinglun[length].pinglun;
                }else{
                    Toast('获取评论失败！')
                }
            })
            },
            postComment(){
                  let comment = {
                      data: Date.now(),
                      name: this.name,
                      neirong : this.neirong };
                //从localStorage中获取所有评论
                  let list = JSON.parse(localStorage.getItem('pinglun') || '[]');
                  list.push(comment);
                  // list.unshift(comment);
                  //重新保存最新的评论数据
                  localStorage.setItem('pinglun',JSON.stringify(list));
                  this.neirong = '';
                  this.$emit('update');
                  Toast({ message:'发表成功', duration:1500});
                  this.reload();
            },
            loadComments(){    //从本地的 localStorage 中，加载评论列表
                let pinglunlist = JSON.parse(localStorage.getItem('pinglun' || '[]'));
                this.pinglunlist = pinglunlist;
            }
        },
    }
</script>

<style lang="scss" scoped>
  .cmt-container{
    h3{
      font-size: 18px;
    }
    textarea{
      font-size: 14px;
      height: 85px;
      margin: 0px;
    }
    .cmt-list{
      margin: 5px 0px;
      .cmt-item{
        font-size: 13px;
        .cmt-title{
          line-height: 30px;
          background-color: #ccc;

        }
        .cmt-body{
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }
  }

</style>
