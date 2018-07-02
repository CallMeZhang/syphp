<template>
  <div>
    <div v-title="'修改支付密码'"></div>
    <div class="link"></div>
    <div class="info">
      <div class="tel">
        <span>手机号</span>
        <span class="telNum">{{member_mobile}}</span>
      </div>
      <div class="tel">
        <span>验证码</span>
        <input type="tel" v-model="mcode" maxlength="6">
        <input type="button" class="yzm" :value="send_text" @click="picCode='';count_down!=60||send_mcode()" ref="btn">
      </div>
    </div>
    <div class="btn" @click="next">
      <P>下一步</P>
    </div>

    <!--图形验证码弹层-->
    <transition name="fade">
      <div v-show="verifyC" class="verify-code" @touchmove.prevent @click="verifyC=false">
        <div class="content-div" @click.stop>
          <img :src="siteInfo.cdn_host + '/static/images/common/close-btn.png'" alt="" class="close-img" @click="verifyC=false">
          <p class="content-title">请输入图片验证码</p>
          <div class="verify-div">
            <input class='verify-input' type="text" placeholder="请输入" v-model="picCode"
                   :class="{'border-color':!!picCode}">
            <img class='verify-img' :src="verifyUrl+randomNum" alt="" @click="changeImg">
          </div>
          <div class="btn-div" @click="checkVerifyCode()">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

  export default{
    data(){
      return {
        member_mobile: '',
        mcode: '',
        count_down: 60,
        showToolBar: false,
        send_text: '发送验证码',
        verifyC: false,
        picCode: '',
        randomNum:'00000',
        verifyUrl: '',
        nchash:''
      }
    },
    created: function () {
      this.nchash=this.$route.query.nchash
      this.verifyUrl=this.siteInfo.host+'/boc/index.php?act=seccode&op=makecode&nchash='+this.nchash+'&t=0055108752969'
      this.changeImg()
      this.getData()
    },
    methods: {
      changeImg() {
        this.randomNum=Math.random(10000,99999)
      },
      checkVerifyCode() {
        if(this.picCode.length!=4){
          this.$toast('图形验证码格式错误')
          return ;
        }
        this.$http.get(this.siteInfo.host + '/api/index.php?act=login&op=re_get_login_mcode&channel=boc&mobile=' + this.member_mobile+'&captcha='+this.picCode+'&nchash='+this.nchash).then(res => {
          if (res.data.status == 'fail') {
            this.$toast(res.data.msg)
            this.changeImg()
          }else if(res.data.status=='success'){
            this.verifyC=false;
            let count_down = 60
            this.count_down = count_down
            let intval = setInterval(() => {
              if (this.count_down == 1) {
                this.count_down = count_down
                this.send_text = '发送验证码'
                clearInterval(intval)
              } else {
                this.count_down--
                this.send_text = this.count_down+'s'
              }
            }, 1000)
          }
        })
      },
      send_mcode() {
        this.changeImg()
        this.verifyC=true;
      },
      getData(){
        this.callback = window.location.hash.split('#/edit_pasd?callback=')[1]
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=getUserMobile').then(res => {
          this.member_mobile = res.data.content.member_mobile
        })
      },
      next(){
        if (this.mcode != '' && this.mcode.toString.trim != '' && this.mcode.length == 6) {
          this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=checkMobileSeccode&mcode=' + this.mcode).then(res => {
            if (res.data.code === 200) {
              var url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=wallet_config_pawd&callback=' + this.callback
              window.location.href = url
            } else {
              this.$toast('请输入正确的验证码！')
            }
          })
        } else {
          this.$toast('请输入验证码')
        }
      }
    }
  }
</script>
<style scoped>
  .verify-code {
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(58, 58, 58, 0.80);
    top: 0;
    bottom: 0;

  }

  .content-div {
    width: 6.6rem;
    height: 4.8rem;
    background-color: #fff;
    padding: 0.54rem 0.4rem 0;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -2.4rem 0 0 -3.3rem;
    border-radius: .08rem;
  }

  .content-title {
    text-align: center;
    font-size: .40rem;
    color: #4B4F63;
    letter-spacing: 0;
  }

  .close-img {
    position: absolute;
    top: -1rem;
    height: 0.6rem;
    width: 0.6rem;
    right: 0.3rem;
  }

  .verify-div {
    height: 0.8rem;
    width: 100%;
    margin-top: 0.62rem;
  }

  .verify-input {
    width: 3.2rem;
    display: inline-block;
    height: 100%;
    border-bottom: 1px solid #B1B8C4;
    font-size: .30rem;
    color: #F33E53;
    letter-spacing: 0;
    padding-left: 0.4rem;
    box-sizing: border-box;
    float: left;
    margin-left: 0.1rem;
  }

  .verify-input::placeholder {
    color: #B1B8C4;
  }

  .verify-img {
    width: 2.06rem;
    height: 100%;
    display: inline-block;
    border: 0;
    background: #DADEE4;
    float: right;
  }

  .btn-div {
    margin: 0 auto;
    width: 5.8rem;
    height: 0.88rem;
    background: #F33E53;
    border-radius: 1rem;
    text-align: center;
    line-height: 0.88rem;
    font-size: .32rem;
    color: #FFFFFF;
    letter-spacing: 0;
    margin-top: 0.7rem;
  }

  .border-color {
    border-bottom: 1px solid #F33E53;
  }
  .link {
    width: 100%;
    height: 0.2rem;
  }

  .info {
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
    height: 100%;
    margin-left: 1.13rem;
    background-color: transparent;
    border: none;
    width: 2rem;
    color: #818C9E;
    font-size: 0.28rem;
  }

  .info .yzm {
    float: right;
    /*height: 0.88rem;*/
    /*line-height: 0.88rem;*/
    color: #4A90E2;
    width: auto;
    margin-left: 0;
  }

  .btn {
    margin-top: 1rem;
  }

  .btn p {
    margin: 0 auto;
    width: 6.9rem;
    height: 0.88rem;
    line-height: 0.889rem;
    background: #4A90E2;
    border-radius: 0.08rem;
    color: #fff;
    font-size: 0.32rem;
  }
</style>
