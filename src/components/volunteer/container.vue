<template>
    <div id="volunteer_wrap" :style="{paddingBottom:isBottomShow?'.5rem':''}">
      <router-view @bottomShow="isBottomShow = true"></router-view>
      <div class="tab-one-footer" v-if="isBottomShow"> 一起善源 爱 · 源于善 </div>
    </div>
</template>

<script>
  export default {
    data(){
        return {
          isBottomShow:false,
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{

    },
  }
</script>

<style lang="scss" scoped>
  #volunteer_wrap{
    min-height:100%;
    width:100%;
    background: #fff;
    position: relative;
    box-sizing: border-box;
    /*padding-bottom:.5rem;*/
    .tab-one-footer {
      position: absolute;
      left: 0;
      bottom:0;
      width:100%;
      background: #F7F9FA;
      height: 0.5rem;
      font-size: .24rem;
      color: #DADEE4;
      letter-spacing: 0;
      line-height: .5rem;
    }
  }
</style>
