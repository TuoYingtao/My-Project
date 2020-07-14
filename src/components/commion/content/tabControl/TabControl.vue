<template>
  <div class="tab-control">
    <div class="tab-control-item"
         v-for="(item,index) in titles" :key="index"
         :class="{ active: index === currentIndex }"
         @click="itemClick(index)">
        <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type: Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            currentIndex: 0,
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('itemClick',index)
        }
    }
}
</script>

<style lang="scss" scoped>
 .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: saddlebrown;
  }

  .active span {
    border-bottom: 3px solid saddlebrown;
  }
</style>