<template>
  <div>
    <div class="div">
      <div class="background">
        <div class="shoppingche" v-for="(item,number) in list" :key="item.id">
			<router-link :to="'/Detalis/ClothingDetails/' + item.id">
        <input class="shoppingche-checkbox" type="checkbox" v-model="item.seleced">
        <div class="shoppingche-img">
          <!-- 给图片添加懒加载 v-lazy -->
          <!-- 使用方法1: 可能图片url是直接从后台拿到的，把':src'替换成'v-lazy'就行 -->
          <!-- 使用方法2: 使用懒加载容器v-lazy-container,和v-lazy差不多,通过自定义指令去定义的，不过v-lazy-container扫描的是内部的子元素 -->
          <img v-lazy="item.img" alt="">
        </div>
        <div class="shoppingche-title">
          <div class="shoppingche-title-shop">杏花店铺</div>
          <div class="shoppingche-title-item">{{ item.price_title }}</div>
          <div class="shoppingche-price">{{ item.price }}</div>
          <div class="shoppingche-delete" v-show="flag" @click="deleteCart(item.id)">删除</div>
          <div class="shoppingche-number">
            <button class="shoppingche-reduce" v-show="flag" type="button" @change="add()" @click="cuts(number)">-</button>
            <!--              监听文本框的 changed 事件，来动态获取到数量-->
            <div class="shoppingche-num">{{ item.count }}</div>
            <samp v-show="!flag">件</samp>
            <button class="shoppingche-plus" v-show="flag" type="button" @change="add()" @click="plus(number)">+</button>
          </div>
        </div>
		</router-link>
        </div>
        <div class="purchase">
          <div class="shoppingche-item">
            <input type="checkbox" @click="changeSelectState" v-model="seleced" >
            <samp class="shoppingche-edit" @click="flag = !flag">编辑</samp>
            <div class="shoppingche-num">总价：￥ {{ getGoodsAmount }}</div>
            <button @click="showPopup">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations,mapGetters } from "vuex";
    export default {
        data() {
            return {
                flag: false,
                list: [],   // 购物车商品数据
                seleced:true,  //控制是否全选 默认为未选状态
            }
        },
        mounted() {
            this.localhostList();
            this.changeAllChecked();
        },
        computed:{
                ...mapGetters(["totlePrice","getGoodsChecked","getGoodsAmount",])
        },
        methods: {
            ...mapMutations(["updateGoodsCount","changeSelectState"]),
            showPopup(){
                if (this.list.length !== 0)
                    return this.$message({showClose:true,message: '购买成功！请耐心等待您的包裹吧！', type: 'success', duration: 3000});
                if (this.list.length === 0)
                    return this.$message({ showClose:true,message: '您的购物车还没有商品哦！', type: 'error', duration: 3000 })
            },
            localhostList:function(){
                //首先通过计算属性的方式，完美获取到公共数据变量
                return this.list = this.$store.state.cart;
            },
            add(){
                //把数据传入到 store 公共数据里
                this.$store.commit("updateGoodsCount",this.list);
            },
            //用户购物车商品的数量减少
            cuts:function(number){
                if(this.list[number].count<=1) return;
                this.list[number].count--;
                console.log(this.list[length].count);
                //调用add（）方法 每点击一次把数据更新一边
                this.add();
            },
            //用户购物车商品的数量增加
            plus:function(number){
                this.list[number].count++;
                console.log(this.list[length].count);
                //调用add（）方法 每点击一次把数据更新一边
                this.add();
            },
            // 实现点击复选框全选
            changeAllChecked:function() {
                for (let i = 0; i <= this.list[length]; i++){
                    if (this.list[i].seleced === true){
                        console.log(this.list[i].seleced);
                        this.seleced = true
                    }else{
                        this.seleced = false
                    }
                }
                //第一种全选方法
                // if (this.allChecked === false){
                //     for (let i = 0; i < this.list.length; i++) {
                //         let item = this.list[i];
                //         item.seleced = true
                //     }
                // }else{
                //     //取消全选
                //     for (let i = 0; i<this.list.length;i++){
                //         let item = this.list[i];
                //         item.seleced = false;
                //     }
                // }
                // this.allChecked = !this.allChecked;
            },
            //删除购物车数据store和cart本地数据
            deleteCart(id) {
                this.$store.commit('deleteStoreCart',id);
            },
        },
    }
</script>

<style lang="scss" scoped>
  .div{
    width: 100%;
    height: 100%;
    .background{
      width: 100%;
      height: 100%;
      margin-bottom: 51px;
      .shoppingche{
        width: 100%;
        height: 134px;
        /*border: #a9acb1 solid 1px;*/
        background-color: #F5F5F5;
        border-radius: 10px;
        margin: 3px 0 3px 0;
        /*position: relative;*/
        .shoppingche-checkbox{
          float: left;
          margin: 55px 0 0 20px;
          width: 20px;
          height: 20px;
          background-color:#ffffff;
          border:1px solid #dddddd;
          -webkit-border-radius: 50%;
        }
        .shoppingche-img{
          float: left;
          margin: 20px 0 0 20px;
          img{
            width: 70px;
            height: 90px;
          }
        /*  设置图片懒加载样式*/
          img[lazy=error] { }
          img[lazy=loaded] { }
          img[lazy=loading]{
            width: 70px;
            height: 90px;
          }
        }
        .shoppingche-title{
          float: left;
          width: 200px;
          height: 30px;
          margin: 7px 10px 0 20px;
          font-size: 15px;
		  color: #797979;
          .shoppingche-title-shop{
            color: #5a5a5a;
            margin: 0 0 7px 0;
            font-weight: 800;
          }
          .shoppingche-title-item{
            overflow: hidden;
            height: 45px;
            text-overflow: ellipsis;
            font-weight: 700;
            margin: 0 0 8px 0;
          }
          .shoppingche-price{
            float: left;
            font-size: 20px;
            color: red;
            line-height: 25px;
            margin-top: 2px;
          }
          .shoppingche-delete{
            width: 50px;
            height: 25px;
            float: right;
            background-color: red;
            border-radius: 15px;
            text-align: center;
            line-height: 25px;
            color: #ffffff;
          }
          .shoppingche-number{
            float: right;
            height: 25px;
            margin: 0 8px 0 0;
            .shoppingche-reduce{
              float: left;
              width: 25px;
              height: 25px;
              border: 1px solid #999;
              /*border-radius: 5px;*/
              padding: 2px 3px 4px 3px;
            }
            .shoppingche-num{
              float: left;
              width: 25px;
              height: 24px;
              /*border: 1px solid #999;*/
              border-radius: 5px;
              text-align: center;
              font-size: 12px;
              line-height: 25px;
              background-color: #ffffff;
            }
            samp{
              font-size: 16px;
              line-height: 25px;
              margin-left: 5px;
            }
            .shoppingche-plus{
              float: left;
              width: 25px;
              height: 25px;
              border: 1px solid #999;
              /*border-radius: 5px;*/
              padding: 3px 3px 3px 3px;
            }
          }
        }
      }
      .shoppingche-item {
        width: 100%;
        height: 50px;
        background-color: #ffffff;
        /*border: 1px #999999 solid;*/
        position: fixed;
        bottom: 50px;
        z-index: 2;

          input{
            width: 20px;
            height: 20px;
            margin: 15px 10px;
            float: left;
          }
        .shoppingche-edit {
          color: #ff5053;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
          position: relative;
          top: 10px;
          //使用 & 伪类选择器
          &:active{
            color: #999;
          }
        }
        .shoppingche-num{
          font-size: 14px;
          position: absolute;
          top: 15px;
          right: 110px;
        }
        button{
          position: absolute;
          right: 20px;
          top: 4px;
          height: 40px;
          color: #DC143C;
          background-color: #fafafa;
          &:active{
            background-color: #DC143C;
            color: #fafafa;
          }
        }
      }
    }
  }
</style>
