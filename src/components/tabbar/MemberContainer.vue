<template>
  <div class="demo-type">
    <div class="title-img">
      <el-avatar :size="140" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <el-collapse v-model="activeName" accordion class="heidd">
      <el-collapse-item title="登录状态" name="1" class="el-collapse-item">
        <div >
          <el-divider>用户名：</el-divider>
          <div class="div-title">Snake</div>
          <el-divider></el-divider>
          <div class="div-title">世间许多人需要的其实不是实用的忠告，恰恰是充满暖意的附和。</div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="个性签名" name="2" class="el-collapse-item">
        <div >
          <div class="div-title">青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</div>
          <el-divider></el-divider>
          <div class="div-title">事实本身就已经很清楚，无需在解释；只有谎言采取拼命鼓吹，唯恐别人不相信。</div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="信誉评分" name="3" class="el-collapse-item">
        <div class="div-title">
          <el-rate
            v-model="rum"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
      </el-collapse-item>
      <el-collapse-item title="最新动态提醒模式" name="4" class="el-collapse-item">
        <div class="div-title">
          是否开启最新动态提醒？
        <el-switch
          v-model="fole"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </div>
      </el-collapse-item>
    </el-collapse>
    <mt-button class="button" type="danger" size="large" plain @click="alertQuit">退出登录</mt-button>
  </div>
</template>

<script>
    import { mapMutations } from "vuex";
    export default {
        data(){
          return{
              rum:4.8,
              activeName: '1',
              value: new Date(),
              fole:true
          }
        },
        created(){
        },
        methods: {
            ...mapMutations(["$_removeStorage"]),
            alertQuit(){
                localStorage.clear();
                this.$store.commit("$_removeStorage");
                this.$message.success({message: '您已退出登录！', duration: 1500});   // ui弹窗提示
                this.$router.push({ name:"login" })
            }

        }
    }
</script>

<style lang="scss" scoped>
  .demo-type{
    width: 100%;
    height: 800px;
    .title-img{
      text-align: center;
      padding-top: 40px;
    }
    .el-collapse-item{
      margin: 10px 10px;
    }
    .heidd{
      margin-top: 30px;
      .div-title{
        margin: 15px 15px;
      }
    }
    .button{
      width: 200px;
      margin: 20px auto;
      &:active{
        background-color: deeppink;
      }
    }
  }

</style>
