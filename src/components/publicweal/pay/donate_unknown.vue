<template>
  <div class="container white-bg">

      <div v-title="'捐赠结果'"></div>
      <div class="result-con">
        <div><img class="q-img margin-top86" src="/bocm/platformjs/static/image/default/pub_pay_unknown.png" alt="?"></div>
        <h2 class="res-title">支付结果未知</h2>
        <p class="res-descr">哎呀，我们没有收到支付成功的通知，<br/>
          为了避免重复支持，您稍等片刻再刷新本页面试试。</p>
        <div class="refresh-time margin-top39">
          <a v-show="countT">( <span class="res-red" ref="resTimes">{{times}}</span>秒 ) 刷新</a>
          <a v-show="clickR" href="#" class="click-ref" ref="clkckRef" @click="refresh()">点击刷新</a>
        </div>
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
      return{
        countT:true,
        clickR:false,
        times:5,
        timer:null,
      }
    },
    created () {

    },
    components: {

    },
    mounted(){
      this.timer = setInterval(this.countDown,1000)
    },
    methods:{
      countDown (){
        this.times--
        if(this.times >= 0){
          this.clickR = false
        }else{
          clearInterval(this.timer)
          this.countT = false
          this.clickR = true
          this.time=5
        }
      },
      refresh(){
         window.history.go(0)
//        window.location.reload()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .white-bg{
    height:100%;
    background:#fff;
  }
  .result-con{
    width:7.5rem;
    padding: 0 0.3rem;
    height:auto;
    text-align:center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background:url(/bocm/platformjs/static/image/sywelfare/pay_default_bg.png)no-repeat;
    -webkit-background-size:100% 100%;
    background-size:100% 100%;
    .q-img{
      width:1.6rem;
      height:1.6rem;
    }
    .res-title{
      margin-top:0.31rem;
      line-height:0.56rem;
      color: #4A90E2;
      font-size:0.4rem;
    }
    .res-descr{
      margin-top:0.03rem;
      line-height:0.37rem;
      font-size:0.26rem;
      color: #666A7F;
    }
    .refresh-time{
      text-align:center;
      line-height:0.37rem;
      font-size:0.26rem;
      color: #DADEE4;
      .click-ref{
        color: #A1C5EF;
        text-decoration:underline;
      }
    }
    .res-red{
      color:red;
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
  .margin-top39{
    margin-top:0.39rem;
  }
  .margin-top64{
    margin-top:0.64rem;
  }
</style>
