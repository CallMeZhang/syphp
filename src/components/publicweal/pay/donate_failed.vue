<template>
  <div class="container white-bg">
    <div v-title="'捐赠结果'"></div>
    <div class="donate-result">
      <div><img class="failed-img margin-top86" src="/bocm/platformjs/static/image/default/icon-fail.png" alt=""></div>
      <h2 class="result-title margin-top31">支付失败</h2>
      <p class="result-descr">哎呀，支付没有成功，请您重新尝试支付</p>
      <div class="again-btn margin-top64">重新支付</div>
    </div>
    <div class="bottom-con">
      <a href="#" class="bottom-back">返回项目详情</a>
      <div class="bottom-bg"></div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {

    },
    created () {

    },
    components: {

    },
    methods:{

    }
  }
</script>
<style lang="scss" scoped>
  .white-bg{height:100%;background:#fff;}
  .donate-result{
    width:6.9rem;
    /*height:4.37rem;*/
    padding:0 0.3rem;
    text-align:center;
    background:url(/bocm/platformjs/static/image/sywelfare/pay_default_bg.png)no-repeat;
    -webkit-background-size:100% 100%;
    background-size:100% 100%;
    .failed-img{
      width:1.6rem;
      height:1.6rem;
    }
    .result-title{
      font-size:0.4rem;
      line-height:0.56rem;
      color: #4A90E2;
    }
    .result-descr{
      margin-top:0.03rem;
      font-size:0.26rem;
      line-height:0.37rem;
      color: #666A7F;
    }
    .again-btn{
      width:6.9rem;
      height:0.88rem;
      line-height:0.88rem;
      text-align:center;
      font-size:0.32rem;
      color:#fff;
      background: #4A90E2;
      -webkit-border-radius:0.08rem;
      -moz-border-radius:0.08rem;
      border-radius:0.08rem;
    }
  }
  .bottom-con{
    position:fixed;
    bottom:0;
    width:100%;
    height:1rem;
    .bottom-back{
      text-align:center;
      font-size:0.26rem;
      line-height:0.37rem;
      color: #B1B8C4;
    }
    .bottom-bg{
      width:100%;
      height:0.63rem;
      background:url(/bocm/platformjs/static/image/sywelfare/bottom_d_bg2x.png)no-repeat;
      -webkit-background-size:100% 100%;
      background-size:100% 100%;
    }
  }
  .margin-top86{
    /*margin-top:0.86rem;*/
    margin-top:2.14rem;
  }

  .margin-top31{
    margin-top:0.31rem;
  }
  .margin-top64{
    margin-top:0.64rem;
  }
</style>
