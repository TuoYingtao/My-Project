<template>
  <div>
    <!--  顶部Header 区域    -->
<!--    <mt-header fixed title="商品列表">-->
<!--        <mt-button icon="back" @click="text" slot="left">返回</mt-button>-->
<!--    </mt-header>-->
    <van-pull-refresh class="van-pull-refresh"
                      v-model="isLoading"
                      loosing-text="释放即可刷新...."
                      animation-duration=500
                      head-height= 0
                      @refresh="onRefresh"
    >
    <div class="clothes_table">
      <div v-for="item in Clothes">
        <router-link :to="'/Detalis/ClothingDetails/' + item.id">
            <div class="clothes_table_div">
              <img class="clothes_table_img" v-lazy="item.img_url" alt="">
              <div class="clothes_price">
                <samp>{{ item.price }}</samp>
                <img :src="item.label" alt=""><br>
                <div class="clothes_table_title">{{ item.price_item }}</div>
                <a class="title">明天价格75￥</a>
              </div>
            </div>
        </router-link>
      </div>
    </div>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
    export default {
        data(){
            return{
                isLoading:false,
                id: this.$route.params.id,
                Clothes:[],
                list:[],
            }
        },
        created(){
            this.getClothes();
        },
        methods:{
            text(){
                this.$router.go(-1);           //=>返回上一给页面
            },
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                    Toast("刷新成功")
                }, 2000);
            },
            getClothes(){
                this.$forceUpdate();
                axios.get('./static/Snake.json').then((result) => {
                    if (result.data.status === 0){
                        this.list = result.data.souper;
                        this.Clothes = result.data.clothing;
                        // console.log(this.list);
                        this.$forceUpdate();
                    }else{
                        Toast({message: '获取服装列表失败。。。',duration: 1500});
                    }
                }).catch((error) =>{
                    Toast({message: 'result.data.status' + "失败", type: 'success', duration: 1500});
                    // console.log(error)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  //给下拉刷新添加样式
  .van-pull-refresh{
    text-align: center;
    color: #999999;
  }
.clothes_table{
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin-left: 10px;
    .clothes_table_div{
      width: 175px;
      height: 300px;
      margin: 3px 6px 3px 0;
      border-radius: 10px;
      background-color: #f5f5f5;
      float: left;
      .clothes_table_img{
        width: 175px;
        height: 210px;
        overflow: hidden;
        border-radius: 10px 10px 0 0;
      }
      /*  设置图片懒加载样式*/
      img[lazy=error] { }
      img[lazy=loaded] { }
      img[lazy=loading]{
        width: 40px;
        height: 100px;
      }
      .clothes_price{
        width: 100%;
        height: 50px;
        margin: 5px 0 0 8px;
        samp{
          color: red;
          width: 100%;
          font-size: 26px;
          margin-left: 10px;
        }
        img{
          width: 55px;
        }
        .clothes_table_title{
          width: 90%;
          height: 20px;
          color: #b5b5b5;
          font-size: 14px;
          margin: 0 0 0 2px;
          overflow: hidden;
        }
        a{
          color: #cd2626;
          font-size: 14px;
        }
      }
    }
}
</style>
