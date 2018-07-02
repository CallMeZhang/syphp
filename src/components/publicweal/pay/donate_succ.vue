<template>
  <div class="container white-bg">
    <div v-title="'捐赠结果'"></div>
    <div class="donate-result2">
      <div><img class="failed-img margin-top86" src="/bocm/platformjs/static/image/default/icon-suc.png" alt="success.png"></div>
      <h2 class="result-title margin-top31">捐赠成功</h2>
      <p class="result-descr">收款方：收款方名称</p>
    </div>
    <div class="card-con">
      <div class="card-img"><img src="/bocm/platformjs/static/image/sywelfare/pay_succ_card2x.png" alt=""></div>
      <div class="card-img-con">
        <h2 class="card-descr margin-top82">感谢您的爱心善举</h2>
        <div class="card-btn">打开感谢卡</div>
      </div>
      <div class="donate-txt">
        <h3 class="txt-title">尊敬的 XXXXX ：</h3>
        <p>感谢您 为《项目名称项目名称项目名称项目名称项目名称项目》捐出 ¥351，您将获得 3510 公益积分。
          这是您的感谢卡，拆开来看看吧～</p>
      </div>
    </div>
    <div class="bottom-con">
      <p class="bottom-back"><a href="#">返回项目详情</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">返回项目详情</a></p>
      <div class="bottom-bg"></div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {

      }
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
  .white-bg{
    height:100%;
    background:#FFF;
  }
  .donate-result2{
    width:7.5rem;
    text-align:center;
    background:url(/bocm/platformjs/static/image/sywelfare/pay_default_bg.png)no-repeat;
    -webkit-background-size:100% 100%;
    background-size:100% 100%;
    .failed-img{
      width:1.6rem;
      height:1.6rem;
    }
    .result-title{
      padding:0 0.4rem;
      font-size:0.4rem;
      line-height:0.56rem;
      color: #4A90E2;
    }
    .result-descr{
      margin-top:0.03rem;
      padding:0 0.4rem;
      font-size:0.26rem;
      line-height:0.37rem;
      color: #666A7F;
    }
  }
  .card-con{
    position:relative;
    width:6.7rem;
    margin:0.46rem 0.4rem 0;
    overflow:auto;
    -webkit-border-radius:0.08rem;
    -moz-border-radius:0.08rem;
    border-radius:0.08rem;
    -webkit-box-shadow: 0 4px 36px 0 rgba(0,0,0,0.10);
    -moz-box-shadow: 0 4px 36px 0 rgba(0,0,0,0.10);
    box-shadow: 0 4px 36px 0 rgba(0,0,0,0.10);
    .card-img{
      width:6.7rem;
      height:3.51rem;
      background:#fff;
      img{
        width:100%;
        height:100%;
        -webkit-border-radius:0.08rem 0.08rem 0 0;
        -moz-border-radius:0.08rem 0.08rem 0 0;
        border-radius:0.08rem 0.08rem 0 0;
      }
    }
    .card-img-con{
      position:absolute;
      top:0;
      left:0;
      width:6.7rem;
      height:auto;
      z-index:2;
      .card-descr{
        font-size:0.4rem;
        line-height:0.56rem;
        padding:0 0.43rem;
        text-align:center;
        color: #FFFFFF;
      }
      .card-btn{
        margin:0.36rem auto 0;
        width:2rem;
        height:0.7rem;
        line-height:0.7rem;
        text-align:center;
        color: #FFFFFF;
        background-image: linear-gradient(-90deg, #30C1FF 0%, #4A90E2 100%);
        -webkit-border-radius: 0.08rem;
        -moz-border-radius: 0.08rem;
        border-radius: 0.08rem;
      }
    }
    .donate-txt{
      background:#fff;
      text-align:left;
      padding:0.35rem 0.43rem 0.2rem;
      overflow:auto;
      .txt-title{
        margin-bottom:0.28rem;
        line-height:0.42rem;
        font-size:0.28rem;
        color: #666A7F;
      }
      p{
        height:1.44rem;
        overflow:auto;
        line-height:0.36rem;
        font-size:0.24rem;
        color: #818C9E;
      }
    }
  }
  .bottom-con{
    margin-top:0.6rem;
    width:100%;
    height:1rem;
    .bottom-back{
      text-align:center;
      font-size:0.26rem;
      line-height:0.37rem;
      color: #B1B8C4;
      a{
        color: #B1B8C4;
      }
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
  .margin-top82{
    margin-top:0.82rem;
  }
  .margin-top31{
    margin-top:0.31rem;
  }
</style>
