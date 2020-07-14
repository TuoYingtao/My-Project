<template>
  <div class="clothes_table">
    <div class="waterfall" v-for="(item,index) in dataList" :key="index">
      <router-link :to="'/Detalis/ClothingDetails/' + item.id">
        <div class="clothes_table_div">
          <div class="items-div">
            <img class="clothes_table_img" v-lazy="item.img_url" @load="imageLoad">
            <table class="comment-table">
              <thead>
                <tr>
                  <th colspan="2"><div class="clothes_table_title">{{ item.price_item }}</div></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td-price">{{ item.price | dataPrice(2) }}</td>
                  <td class="td-img"><img :src="item.label" alt=""></td>
                </tr>
                <tr><td colspan="2"><div class="title">明天价格：{{ item.price2 | dataPrice }}</div></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
      props:{
        dataList:{
          type: Array,
          default: () => {
            return null
          }
        },
      },
      filters:{
        dataPrice(property, count) {
          return "￥" + parseFloat(property).toFixed(count);
        }
      },
      methods:{
        imageLoad(){
          this.$emit('itemImageLoad');
        }
      },
    }
</script>

<style lang="scss" scoped>
  /*  设置图片懒加载样式*/
  img[lazy=error]
  img[lazy=loaded]
  img[lazy=loading]{
    width: 40px;
    height: 100px;
  }
  .clothes_table{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:space-around;
    flex-wrap: wrap;
    .clothes_table_div {
      width: 180px;
      height: 350px;
      border-radius: 10px;
      background-color: #f5f5f5;
      margin-top: 10px;
    }
      .clothes_table_img{
        width: 100%;
        height: 210px;
        overflow: hidden;
        border-radius: 10px 10px 0 0;
      }
    .comment-table{
      margin: 5px 5px 0 5px;
    }
    td{
      height: 36px;
    }
    .clothes_table_title{
      margin-bottom: 8px;
      color: #b5b5b5;
      font-size: 15px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp:2;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .td-price {
      width: 50%;
      font-size: 18px;
      line-height: 10px;
      color: crimson;
    }
    .td-img img{
      width: 60px;
    }
    .title{
      color: red;
    }
  }
</style>
