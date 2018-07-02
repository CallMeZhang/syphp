<template>
  <div class="topup-con">
    <div v-title="'充值成功'"></div>
    <!--充值成功-->
    <div class="top-up-s">
      <div class="up-img"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-suc.png'"
                               alt="success.png"></div>
      <h2 class="up-hint">充值成功</h2>
      <p class="up-descr">已为您的公益钱包存入<span>{{payAmount}}</span>元</p>
    </div>
    <button class="up-btn margin-top67" @click="goWallet">返回钱包详情</button>
  </div>
</template>
<script>
  import popUp from './common/popups.vue'
  export default {
    data () {
      return {
        payAmount: ''
      }
    },
    components: {
      'pop-up': popUp
    },
    created () {
      this.getData()
    },
    mounted () {

    },
    methods: {
      getData(){
        this.payAmount = this.$route.query.pay_amount
      },
      goWallet(){
        //    返回钱包详情页
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=sywall_index'
        this._appjs.syJsbLaunchWebview(url)
//        this._appjs.syJsbCloseAppPage()
      }
    }
  }
</script>
<style lang="scss" scoped>

  .topup-con {
    width: 7.5rem;
    height: 100%;
    background: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .top-up-s {
    width: 100%;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .up-img {
    margin-top: 0.86rem;
    width: 1.6rem;
    height: 1.6rem;
  }

  .up-img img {
    width: 100%;
    height: 100%;
  }

  .up-hint {
    margin-top: 0.31rem;
    padding: 0 0.3rem;
    font-size: 0.4rem;
    line-height: 0.56rem;
    color: #4A90E2;
  }

  .up-descr {
    margin-top: 0.03rem;
    padding: 0 0.3rem;
    font-size: 0.26rem;
    line-height: 0.37rem;
    color: #666A7F;
  }

  .up-btn {
    margin-top: 0.94rem;
    border: none;
    background: none;
    width: 6.9rem;
    height: 0.88rem;
    line-height: 0.88rem;
    background: #4A90E2;
    color: #fff;
    font-size: 0.32rem;
    -webkit-border-radius: 0.08rem;
    border-radius: 0.08rem;
  }

  .margin-top67 {
    margin-top: 1.34rem;
  }
</style>
