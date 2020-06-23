<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

    export default {
      name: "BetterScroll",
      props:{
        /*接受父组件传递的参数*/
        probeType:{
          type:Number,
          default: 0,
        },
        pullUpLoad:{
          type: Boolean,
          default: false,
        }
      },
      data(){
        return{
          scroll: null,
        }
      },
      mounted(){
        setTimeout((item) => {
          this.$nextTick(() => {
            if (!this.scroll){
              //=> 1.滚动效果 创建scroll对象
              this.scroll = new BScroll(this.$refs.wrapper,{
                /*
                * click:默认值：false。
                * better-scroll 默认会阻止浏览器的原生 click 事件。
                * 当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
                * */
                click: true,
                /*
                * probeType：派发滚动事件；可选值：1、2、3;
                * 1 滚动滚动的时候会派发scroll事件会截流。
                * 2 滚动的时候实时派发scroll事件，不会截流。
                * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件*/
                probeType:this.probeType,
                 /*解决鼠标滑轮滚动*/
                mouseWheel: true,
                /*pullUpLoad：默认值：false。 如果需要监听滚动底部事件，设置为true*/
                pullUpLoad: this.pullUpLoad,
              });
              console.log(this.scroll);
              //=> 2.实时监听滚动的位置，实现返回顶部按钮的功能
              this.scroll.on('scroll',(position) => {
                //=> 将监听的数据坐标发射出去，父组件用来接收处理
                // console.log(this.scroll.maxScrollY);
                this.$emit('scroll',position)
              });
              //=> 3.监听上拉事件，实现加载更多
              this.scroll.on('pullingUp',() => {
                //=> 当滚动到底部的时候调用。
                console.log('已经滚到底部了');
                this.$emit('pullingUp')
              })
            }
          })
        },50)
      },
      methods:{
        refresh(){
          this.scroll && this.scroll.refresh();
          console.log('重新获取页面高度');
        },
        finishPullUp(){
         this.scroll && this.scroll.finishPullUp();
        },
        /*
        * 回到顶部事件
        * x,y:回到的坐标
        * itme：回到顶部时长
        * */
        scrollTo(x,y,itme=500){
         this.scroll && this.scroll.scrollTo(x,y,itme)
        }
      }
    }
</script>

<style scoped>
/*.wrapper{*/
/*  height: 100vh;*/
/*  position: relative;*/
/*}*/
/*  .content{*/
/*    position: absolute;*/
/*    left: 0;*/
/*    right: 0;*/
/*    top: 40px;*/
/*    button:51px;*/
/*    overflow: hidden;*/
/*  }*/
</style>
