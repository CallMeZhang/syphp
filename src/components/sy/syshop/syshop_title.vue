<template>
  <div>
    <div class="welfare-task-tit2" v-if="syTitle">{{syTitle}}</div>
    <div class="sy-shop-top sy-top-bg" v-if="syDescr">{{syDescr}}</div>
  </div>
</template>

<script>
  export default {
    props: ['syTitle','syDescr'],
//    data () {
//      return {
//          syTitle: this.syTitle,
//          syDescr: this.syDescr
//      }
//    }
  }
</script>

<style scoped>
  .sy-shop-top{ padding-top:0.04rem; line-height:0.58rem; font-size:0.24rem; color:#999; text-align:center;}
  .sy-top-bg{background:#f4f6f5;}
  .welfare-task-tit2{ height:0.88rem; width:7.5rem; background:url(/bocm/platformjs/static/image/syShop/syshop_tit.png) no-repeat center 0.18rem; background-size:5.92rem 0.5rem; text-align:center; line-height:0.88rem; font-size:0.3rem;}
</style>
