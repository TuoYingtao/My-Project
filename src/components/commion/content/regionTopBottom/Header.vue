<template>
  <div>
    <!--  顶部Header 区域    -->
    <!-- <mt-header class="mint-header" fixed :title="title" v-model="home">
      <mt-button icon="back" @click="routers" slot="left" v-show="this.folact">返回</mt-button>
    </mt-header>-->
    <div class="mtHeader">
      <div class="mtHeader_search">
        <i class="el-icon-search"></i>
        <input class="search" @input="searchTitle($event)" type="text" placeholder="火爆新款：时尚或潮流"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      folact: false,
      materialName: "",
    };
  },
  computed: {
    home: function() {
      this.folact = false;
      if (this.$route.path !== "/home") {
        // return (this.title = "鑫华服装");
        return (this.folact = true);
      } else {
        return (this.folact = true);
        return (this.title = this.$route.meta.title);
      }
      return false;
    }
  },
  methods: {
    routers() {
      this.$router.go(-1); //=>返回上一给页面
    },
    searchTitle(event){
      if(this.title != ''){
        this.title = event.data;
      }else{
        this.title += event.data;
      };
      console.log(this.title);
      //方法二：获取DOM对象取value值
      this.materialName = event.currentTarget.value;
      //方法三：通过js获取
      this.materialName = document.getElementsByClassName("search").value;

    }
  }
};
</script>

<style lang="scss" scoped>
.mtHeader {
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background-color: rgba(112, 33, 33, 0.349);
  z-index: 100;
.mtHeader_search{
    position: relative;
    width: 70%;
    height: 30px;
    top: 14%;
    bottom: 10%;
    left: 15%;
    right: 15%;
    i{
      float: left;
      width: 15%;
      height: 100%;
      padding: 5px 5px 5px 5px;
      text-align: center;
      background-color: rgb(255, 255, 255);
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      // border-right: 1px solid rgba(0, 0, 0, 0.329);
      border-left: 1px solid saddlebrown;
      border-bottom: 1px solid saddlebrown;
      border-top: 1px solid saddlebrown;
    }
    .search {
      float: left;
      width: 85%;
      height: 100%;
      padding: 0 20px 0 10px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      color: rgba(59, 59, 59, 0.8);
      font-size: 14px;
      border-left: 1px solid rgb(255, 255, 255);
      border-right: 1px solid saddlebrown;
      border-bottom: 1px solid saddlebrown;
      border-top: 1px solid saddlebrown;
  }
} 
}
</style>