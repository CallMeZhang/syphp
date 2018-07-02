<template>
  <div class="top-wrapper">
    <div data-v-5b8240d9="" class="contianer">
      <div data-v-5b8240d9="" style="">
        <div data-v-5b8240d9="" class="wrapper">
          <div data-v-5b8240d9="" class="logo"><img data-v-5b8240d9="" src="../../../static/image/syShop/logo.png"
                                                    alt="logo"></div>
          <div data-v-5b8240d9="" class="loginInfo">
            <div data-v-5b8240d9="" class="tel cle">
              <div data-v-5b8240d9="" class="telIcon"></div>
              <div data-v-5b8240d9="" class="telNum"><input data-v-5b8240d9="" type="text" placeholder="请输入您的用户名"
                                                            maxlength="11" v-model="username"></div>
            </div>
          </div>
          <div data-v-5b8240d9="" class="loginInfo">
            <div data-v-5b8240d9="" class="tel cle">
              <div data-v-5b8240d9="" class="telIcon yzIcon"></div>
              <div data-v-5b8240d9="" class="telNum yz cle">
                <input data-v-5b8240d9="" type="password" placeholder="请输入密码" v-model="password">
              </div>
            </div>
          </div>
          <div data-v-5b8240d9="" class="btn" @click="sendData()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: '',
        area_id:''
      }
    },
    created () {
      document.title = '登录'
      this.area_id=this.$route.query.area_id
    },
    methods: {
      sendData () {
        let url = this.siteInfo.host + '/api/index.php?act=areadetail&op=login'
        var qs = require('qs')
        this.$http.post(url, qs.stringify({
          'account': this.username,
          'pwd': this.password
        })).then((res) => {
          if (res.data.code === 200) {
            window.location.href = this.siteInfo.host + '/bocm/index.php?act=areadetail&op=area_order_detail&area_id=' + this.area_id
          } else {
            alert('用户名或密码错误')
          }
        })
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  input[type=text]:focus, input[type=password]:focus, textarea:focus {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  .top-wrapper {
    height: 100%;
    background: #fff;
  }

  .sy-blue {
    color: #4a90e2
  }

  .sy-blue-bg {
    background-color: #4a90e2
  }

  .sy-blue-border {
    border: 1px solid #4a90e2
  }

  .text-more {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .text-more-line {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden
  }

  .line-2 {
    height: .2rem
  }

  .line-2, .line-3 {
    width: 100%;
    background: #f7f9fa
  }

  .line-3 {
    height: .3rem
  }

  .line-9 {
    width: 100%;
    height: .9rem;
    background: #f7f9fa
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .popup-enter-active, .popup-leave-active {
    transition: all 1s
  }

  .popup-enter, .popup-leave-to {
    -webkit-transform: translateY(100%);
    transform: translateY(100%)
  }
  .contianer[data-v-5b8240d9] {
    margin: 0 auto;
    background: url(../../../static/image/login/zh231.jpg) no-repeat 50%;
    background-size: 100% 100%;
    width: 100%;
    height: 100%
  }

  .logo[data-v-5b8240d9] {
    width: 100%;
    height: 3.2rem;
    text-align: center
  }

  .logo img[data-v-5b8240d9] {
    width: 1.4rem;
    height: 1.4rem;
    margin: .8rem auto 1rem;
    border-radius: .3rem;
    box-shadow: 0 2px 2px hsla(0, 0%, 74%, .25)
  }

  .loginInfo[data-v-5b8240d9] {
    padding: 0 .9rem;
    margin-bottom: .4rem
  }

  .loginInfo .tel[data-v-5b8240d9] {
    font-size: .3rem
  }

  .tel .telIcon[data-v-5b8240d9] {
    width: .33rem;
    margin-right: .24rem;
    height: .72rem;
    float: left;
    line-height: .72rem;
    background: url(../../../static/image/login/zh229.png) no-repeat 50%;
    background-size: .33rem .44rem
  }

  .tel .telNum[data-v-5b8240d9] {
    width: 5.1rem;
    height: .72rem;
    float: left;
    line-height: .72rem;
    text-align: right;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    padding-top: .1rem
  }

  .tel .telNum input[data-v-5b8240d9] {
    float: left;
    width: 5.1rem;
    height: .52rem;
    line-height: .52rem;
    font-size: .3rem;
    background: 0;
    border: none
  }

  .tel .yz input[data-v-5b8240d9] {
    width: 3rem
  }

  .tel .yz span[data-v-5b8240d9] {
    display: inline-block;
    width: 1.6rem;
    height: .52rem;
    line-height: .52rem;
    text-align: right;
    color: #406fbd;
    float: right
  }

  .tel .yzIcon[data-v-5b8240d9] {
    background: url(../../../static/image/login/zh230.png) no-repeat 50%;
    background-size: .33rem .44rem
  }

  .btn[data-v-5b8240d9] {
    width: 6rem;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    color: #fff;
    background: #f31e37;
    border-radius: .44rem;
    margin: .8rem auto .4rem;
    box-shadow: 0 .1rem .16rem rgba(182, 0, 42, .25);
    font-size: .3rem
  }

  .reg[data-v-5b8240d9] {
    text-align: center;
    font-size: .24rem
  }

  .reg a[data-v-5b8240d9] {
    color: #2854ad
  }

  .cle[data-v-5b8240d9]:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
  }

  .cle[data-v-5b8240d9] {
    display: inline-block;
    display: block
  }

  .clear[data-v-5b8240d9] {
    clear: both
  }
</style>
