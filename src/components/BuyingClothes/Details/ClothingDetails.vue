<template>
  <div>
    <!--  顶部Header 区域    -->
<!--    <mt-header fixed title="商品详情">-->
<!--        <mt-button icon="back" @click="text" slot="left">返回</mt-button>-->
<!--    </mt-header>-->
    <div class="clothing-details">
  <!--  服装详情轮播  -->
      <div class="clothing-details-img">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="item in img" :key="item.id">
            <img class="mt-swipe-item-img" v-lazy=" item.img_url " alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="clothing-details-div" v-for="item in info" :key="item.id === id">
        <div class="clothing-details-title">
          <div class="clothing-details-price">{{ item.price }}</div>
          <div class="clothing-details-price2">{{ item.price2 }}</div>
        </div>
        <div class="clothing-details-div-img">
          <img :src="item.label" alt="">
        </div>
        <div class="clothing-details-div2">
          <h2>{{ item.price_item }}</h2>
          <samp>{{ item.slogan }}</samp>
        </div>
        <div class="clothing-details-button">
          <div class="button01" @click="DetailsCalick(),flag=!flag">加入购物车
            <transition
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter">
              <div class="ball" v-show="flag"></div>
            </transition>
          </div>
          <div class="button02" @click="showPopup">立即购买</div>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  import { mapMutations } from "vuex"
    export default {
        data(){
            return{
                flag:false,
                id:this.$route.params.id,
                img:{},   //轮播图片
                detailsimg:[],
                info:{},  //商品的详情
                list:{}, //本地储存数据
                selectedCount:1,  //加入购物车商品的数量
            }
        },
        mounted(){
            this.log();
            this.DetailsImg();
        },
        methods:{
            text(){
                this.$router.go(-1);           //=>返回上一给页面
            },
          log(){
              console.log("服装详情id:" + this.id)
          },
            showPopup(){
                if (this.list.length !== 0)
                    return this.$message({showClose:true,message: '购买成功！请耐心等待您的包裹吧！', type: 'success', duration: 3000});
            },
            DetailsImg(){
                this.$forceUpdate();
              //获救json里的值
                let localJSON = './static/Snake.json';
                axios.get(localJSON).then( response => {
                    this.detailsimg = response.data.clothing;
                    //过滤数据
                    this.info = this.detailsimg.filter((item) => {
                        return item.id === this.id;
                    });
                    this.img = this.info[length].pinglun;
                    // console.log(this.img)
                });
            },
            //加入购物车功能 1.需要安装vuex依赖
            ...mapMutations(["addToCar"]),
            DetailsCalick(){
              this.list = this.info;
                this.addToCar({
                    id:this.id,
                    img:this.info[length].img_url,
                    price_title:this.list[length].price_item,
                    price:this.list[length].price,
                    count:this.selectedCount,
                    seleced:false,
                });
            },

            //加入购物车动画效果
            // 注意：动画钩子函数的第一个参数：el，表示
            // 要执行动画的那个DOM元素，是个原生的 JS DOM 对象
            // 可以认为，el 是通过 document.getElementById('') 方式获取到的原生JS DOM对象
            beforeEnter(el) {
                // 表示动画入场之前，此时动画还未开始，可以在其中
                // 设置元素开始动画之前的起始样式
                // 设置小球开始动画之前的起始位置
                el.style.transform = 'translate(0,0)';
                console.log('动画开始---')
            },
            enter(el,done) {
                //没有实际效果，但不可缺少，如果不写，出不来动画效果,可以理解为强制动画刷新
                el.offsetWidth;//offsetHeight、offsetLeft等都可以
                //表示动画，开始之后的样式，可以设置小球完成动画的结束状态
                el.style.transform = 'translate(150px,200px)';
                el.style.transition = 'all 1s ease';
                console.log('动画执行中---');
                // 这里的 done，其实就是 afterEnter 这个函数，
                // 也就是说：done 是 afterEnter 函数的引用
                done();
            },
            afterEnter(el) {
                //表示动画完成之后小球的状态
                // 使用 flag 标识符，来表示动画的切换；
                // Vue 把一个完整的动画，使用钩子函数，拆分为了两部分；
                // 对flag：第一部分 false -> true ;  第二部分 true -> false
                // 这句话，第一个功能，是控制小球的显示与隐藏
                // 第二个功能：直接跳过后半场动画，让 flag 标识符直接变为 false
                // 当第二次再点击按钮的时候，flag = false -> true
                this.flag = !this.flag;
                console.log('动画执行完---')
            }
        }
    }
</script>

<style lang="scss" scoped>
  .clothing-details{
    width: 100%;
    height: 100%;
    .clothing-details-img{
       width: 100%;
       height: 400px;
       img{
         width: 100%;
         height: 450px;
       }
      /*  设置图片懒加载样式*/
      img[lazy=error] { }
      img[lazy=loaded] { }
      img[lazy=loading]{
        width: 100%;
        height: 100%;
        margin: auto;
      }
     }
    .clothing-details-div{
      width: 100%;
      margin: 5% 0 0 2%;
      .clothing-details-title{
        width: 250px;
        .clothing-details-price{
          float: left;
          color: red;
          font-size: 40px;
         font-weight: 700;
        }
       .clothing-details-price2{
          float: left;
          color: #999;
          text-decoration: line-through;
          font-size: 30px;
          font-weight: inherit;
          line-height: 24px;
          padding: 0 0 0 7%;
        }
      }
      .clothing-details-div-img{
        img{
          width: 70px;
          margin: 0 0 0 4%;
        }
      }
      .clothing-details-div2{
        h2{
          width: 360px;
          height: 40px;
          font-size: 20px;
          font-weight: 700;
          margin: 2% 0 2% 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        samp{
          width: 360px;
          color: #999;
          font-size: 12px;
          font-weight: 700;
        }
      }
      .clothing-details-button{
        width: 100%;
        margin: 6px 0 0 0;
        .button01{
          float: left;
          width: 180px;
          height: 40px;
          color: #fff;
          background-color: #ffb03f;
          text-align: center;
          line-height: 45px;
          border-radius: 5px 0 0 5px;
          &:active{
            color: #ffb03f;
            background-color: #fff;
            border: 1px #ffb03f solid;
          }
          .ball{
            width: 15px;
            height: 15px;
            border-radius:50%;
            background-color: red;
            margin-top: 0;
            position: absolute;
            z-index: 2;
            top: 88%;
            left: 25%;
          }
        }

        .button02{
          float: left;
          width: 180px;
          height: 40px;
          color: #fff;
          background-color: #FF5E53;
          text-align: center;
          line-height: 45px;
          border-radius: 0 5px 5px 0;
          &:active{
            color: #FF5E53;
            background-color: #fff;
            border: 1px #FF5E53 solid;
          }
        }
      }
    }
  }
</style>
