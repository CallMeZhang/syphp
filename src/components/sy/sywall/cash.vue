<template>
  <div>
    <div v-title="'提现'"></div>
    <div class="config clearfix" @click="goConfig">
      <span class="fl">银行账号</span>
      <span class="fr go">去设置<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-aow.png'" alt="!"></span>
    </div>
    <div class="cash">
      <p>提现金额（免手续费，单笔提现上限5万元）</p>
      <div class="cashNum">￥ <input type="number" v-model="money"></div>
      <p>可提现余额 2345.00元</p>
    </div>
    <div class="info">
      <div class="tel">
        <span>手机号</span>
        <span class="telNum">13161596541</span>
      </div>
      <div class="tel">
        <span>验证码</span>
        <input type="number" v-model="mcode">
        <input type="button" class="yzm" :value="getfont" @click="getNum" ref="btn">
      </div>
    </div>
    <div class="btn clearfix">
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-blue.png'" class="fl">
      <p class="fl">提现申请到账时间一般为3-7天，如在节假日申请提现，您的提现申请将会在下一个工作日开始处理。</p>
      <button type="button">确认提现</button>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        getfont: '获取验证码',
        time: '60',
        timer: null,
        mcode: '',  //验证码
        member_mobile: '', // 手机号码
        money: '' // 提现金额
      }
    },
    created:function () {
      this.getData()
    },
    methods: {
      getData(){},
      getNum(){
        //获取验证码
        this.$http.get(this.siteInfo.host + '/api/index.php?act=login&op=re_get_login_mcode&channel=boc&mobile=' + this.member_mobile).then(res => {
          if (res.status == 'fail') {
            this.$toast('请输入正确的手机号！')
          }
        })
        this.$refs.btn.disabled = true
        this.getfont = this.time + '秒后可重新获取'
        this.timer = setInterval(this.doLoop, 1000)
      },
      doLoop(){
//        倒计时
        this.time -= 1
        if (this.time > 0) {
          this.getfont = this.time + '秒后可重新获取'
        } else {
          clearInterval(this.timer)
          this.$refs.btn.disabled = false
          this.getfont = '获取验证码'
          this.time = 60
        }
      },
      next(){
        if (this.mcode != '' && this.mcode.toString.trim != '' && this.mcode.length == 6) {
          this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=checkMobileSeccode&mcode=' + this.mcode).then(res => {
            let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=wallet_config_pawd'
            this._appjs.syJsbLaunchWebview(url)
          })
        } else {
          this.$toast('请输入验证码')
        }
      },
      goConfig(){
//        跳转到设置银行卡页面
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=addcard'
        this._appjs.syJsbLaunchWebview(url)
      }
    }
  }
</script>
<style scoped>
  .config {
    box-sizing: border-box;
    margin-top: 0.2rem;
    padding: 0 0.31rem;
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    background-color: #fff;
    box-shadow: inset 0 1px 0 0 rgba(218, 222, 228, 0.60), inset 0 -1px 0 0 rgba(218, 222, 228, 0.60);
    font-size: 0.28rem;
    font-weight: 300;
    color: #4B4F63;
  }

  .config .go {
    color: #B1B8C4;
  }

  .config img {
    width: 0.12rem;
    height: 0.24rem;
    margin-left: 0.22rem;
  }

  .cash {
    background-color: #fff;
    margin-top: 0.2rem;
    /*padding: 0 0.31rem;*/
    box-sizing: border-box;
    text-align: left;
  }

  .cash p:first-child {

    font-size: 0.28rem;
    color: #4B4F63;
    padding: 0.23rem 0.31rem;
  }

  .cash .cashNum {
    padding: 0.26rem 0.31rem 0.49rem;
    font-size: 0.6rem;
    color: #000000;
    line-height: 0.8rem;
    font-weight: 500;
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
  }
  .cash .cashNum input{
    font-size: 0.6rem;
    font-weight: 500;
    width: 80%;
  }

  .cash p:last-child {
    font-size: 0.26rem;
    color: #4B4F63;
    padding: 0.2rem 0.31rem;
  }

  .info {
    margin-top: 0.2rem;
    background-color: #fff;
  }

  .info .tel {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    padding: 0 0.32rem;
    text-align: left;
    box-sizing: border-box;
    border-top: 1px solid rgba(218, 222, 228, 0.60);
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .info .tel:last-child {
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
  }

  .info .telNum {
    margin-left: 1.13rem;
    font-size: 0.28rem;
    color: #818C9E;
    font-weight: 300;
  }

  .info input {
    margin-left: 1.13rem;
    background-color: transparent;
    border: none;
    width: 2rem;
    color: #818C9E;
    font-size: 0.28rem;
  }

  .info .number {
    color: #4A90E2;
    float: right;
  }

  .btn {
    position: absolute;
    bottom: 1rem;
    left: 0;
    padding: 0 0.3rem;
  }

  .btn img {
    width: 0.26rem;
    height: 0.26rem;
    vertical-align: middle;
    margin-right: 0.11rem;
  }

  .btn p {
    width: 94%;
    font-size: 0.24rem;
    color: #818C9E;
    line-height: 0.34rem;
    font-weight: 300;
    text-align: left;
  }

  .btn button {
    width: 6.9rem;
    height: 0.88rem;
    color: #fff;
    margin-top: 0.3rem;
    background: #4A90E2;
    border-radius: 0.08rem;
    border: none;
    outline: none;
  }
  .info .yzm {
    float: right;
    line-height: 0.88rem;
    color: #4A90E2;
    width: auto;
    margin-left: 0;
  }
</style>
