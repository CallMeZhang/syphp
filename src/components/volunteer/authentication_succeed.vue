
<template>
  <div>
    <div v-title="'认证成功'"></div>
    <transition name="fade">
      <div class="success-con">
        <div class="img-con">
          <img class="success-img" src="/bocm/platformjs/static/image/default/icon-suc.png" alt="success">
        </div>
        <p class="success-txt">认证成功</p>
        <div class="success-btn">确定</div>
      </div>
    </transition>

  </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  export default {
    data(){
      return {
        isLoading:false
      }
    },
    created(){
//      this.getData().then(()=>{this.isLoading = false})
    },
    mounted(){

    },
    methods:{
      getData(){
        return this.$http.get()
      }

    },
    components:{}

  }
</script>

<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";
  .success-con{
    width:7.5rem;
    background:#fff;
    margin:0 auto;
    text-align:center;
  }
  .img-con{
    padding-top:0.86rem;
    .success-img{
      width:1.6rem;
      height:1.6rem;
    }
  }
  .success-txt{
    width:6.9rem;
    margin-top:0.31rem;
    font-size:0.4rem;
    color: #4A90E2;
    line-height:0.56rem;
    padding:0 0.3rem;
    margin-bottom:1.34rem;
  }
  .success-btn{
    width:6.9rem;
    margin:0 auto;
    height:0.88rem;
    font-size:0.32rem;
    background: #4A90E2;
    color:#fff;
    line-height:0.88rem;
    text-align:center;
    border-radius:0.08rem;
  }
</style>
