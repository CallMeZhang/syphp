<template>
  <div>
    <div v-title="'激活我的钱包'"></div>
    <div class="notice">
      <p><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-notice.png'" alt="!">
        请提供本人身份证，确保资金安全！</p>
    </div>
    <div class="mobile">
      钱包已绑定手机号：{{member_mobile}}
      <img @click="clickPopUp()" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/q_mark3x.png'" alt="?">
    </div>
    <div class="info">
      <div class="item">
        <span class="xing">*</span>
        <span class="name">姓&emsp;&emsp;&nbsp;名</span>
        <input type="text" placeholder="请输入真实姓名" maxlength="15" v-model="wallet_truename" :disabled='isDisabled'>
      </div>
     <div v-if="false">
       <div class="item" @click="isCard=false">
         <span class="xing">*</span>
         <span class="name">证件类型</span>
         <input type="text" placeholder="请选择" class="sel" readonly v-model="cards">
         <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-aow.png'">
       </div>
       <mt-popup v-model="isCard" position="bottom" class="isCard">
         <div class="toolbar">
           <div class="picker-toolbar">
             <span class="mint-datetime-action mint-datetime-cancel" @click="quxiao()">取消</span>
             <span class="mint-datetime-action mint-datetime-confirm" @click="isCard=false">确定</span>
           </div>
         </div>
         <mt-picker :slots="cardSlots" @change="onSlot1Change" :visible-item-count="3"
                    v-model="cards"></mt-picker>
       </mt-popup>
     </div>
      <div class="item">
        <span class="xing">*</span>
        <span class="name">证件号码</span>
        <input type="text" placeholder="请填写身份证号码" v-model="wallet_id_value" ref="idvale" :disabled='isDisabled'>
      </div>
      <div class="item" style="border-bottom: 1px solid rgba(218,222,228,0.60)">
        <span class="xing">*</span>
        <span class="name">支付密码</span>
        <input type="tel" placeholder="6位数字" v-model="passwd" maxlength="6" ref="pasd">
        <div style="display: inline-block;float: right;" @click="toggetPasd">
          <img :src="pathImg" class="show">
        </div>
      </div>
    </div>
    <div class="submit">
      <div class="clearfix xy" @click="agree()">
        <div class="yuan fl"></div>
        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-agree.png'" v-if="agreeImg">
        <p class="fl">我已同意 <span @click="getClick">《公益钱包用户服务协议》</span></p>
      </div>
      <button type="button" @click.stop="send()">激活</button>
    </div>
    <!--弹窗-->
    <pop-up v-if="popup" v-bind:is-phone-pop="popup" @phone-pop-up="clickPopUp"></pop-up>
  </div>
</template>
<script>
  import popUp from './common/popups.vue'
  export default{
    data () {
      return {
        wallet_truename: '', //姓名
//        证件类型选择框
//        cardSlots: [
//          {
//            flex: 1,
//            values: ['', '身份证'],
//            textAlign: 'center'
//          }
//        ],
        popup: false,//弹窗
        isCard: false,
        cards: '', //证件类型
        wallet_id_type: 1,//证件类型id
        wallet_id_value: '', //证件号码
        wallet_passwd: '', //密码
        passwd: '',
        agreeImg: false,
        id: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
        pathImg: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/sywall//icon-show.png',
        member_mobile: '',
        isDisabled:false
      }
    },
    components: {
      'pop-up': popUp
    },
    created: function () {
      this.getData()
      this.getName()
    },
    methods: {
      getData(){
//        获取手机号
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=getUserMobile').then(res => {
          this.member_mobile = res.data.content.member_mobile
        })
      },
//      获取实名认证
      getName(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_realname_auth').then(res=>{
          let name = res.data.content
          if(res && res.data && res.data.code == 200){
            if(name.truename && name.id_value){
              this.wallet_truename = name.truename
              this.wallet_id_value = name.id_value
              this.isDisabled = true
            }
          }else {
            this.isDisabled = false
          }
        })
      },
//      协议跳转
      getClick(){
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=protocol'
        this._appjs.syJsbLaunchWebview(url)
      },
      //弹窗
      clickPopUp(){
        this.popup = !this.popup
      },
//      切换密码显示隐藏
      toggetPasd(){
        if (this.pathImg === this.siteInfo.cdn_host + '/bocm/platformjs/static/image/sywall//icon-show.png') {
          this.pathImg = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/sywall//icon-hide.png'
          this.$refs.pasd.type = 'password'
        } else {
          this.pathImg = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/sywall//icon-show.png'
          this.$refs.pasd.type = 'text'
        }
      },
//      选择证件类型
//      onSlot1Change(picker, values){
//        this.cards = values[0]
//        if (this.cards == '身份证') {
//          this.wallet_id_type = 1
//        }
//      },
//      取消选择
      quxiao(){
        this.cards = ''
        this.isCard = false
      },
//      同意协议
      agree(){
        this.agreeImg = !this.agreeImg
      },
//      激活验证
      send(){
        if (this.wallet_truename === undefined || this.wallet_truename.trim() === '') {
          this.$toast('姓名填写不完整或填写错误')
        }
//        else if (this.cards === undefined || this.cards.trim() === '') {
//          this.$toast('证件类型填写不完整或填写错误')
//        }
        else if (this.wallet_id_value === undefined || this.wallet_id_value.toString().trim() === '' || !this.id.test(this.wallet_id_value)) {
          this.$toast('证件号码填写不完整或填写错误')
        } else if (this.passwd === undefined || this.passwd.toString().trim() === '' || this.passwd.length !== 6 || /\d/.test(this.passwd - 0) === false) {
          this.$toast('密码填写不完整或填写错误')
        } else if (this.agreeImg !== true) {
          this.$toast('激活公益钱包请先同意公益中国公益钱包使用协议')
        } else {
          this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=getPubKey').then(res => {
            let pk = res.data.content.pub_key
            var JSEncrypt = require('jsencrypt')
            var encrypt = new JSEncrypt.JSEncrypt
            encrypt.setPublicKey(pk)
            this.wallet_passwd = encrypt.encrypt(this.passwd)
          }).then(() => {
            var qs = require('querystring')
            var userInfo = {
              'wallet_truename': this.wallet_truename,
              'wallet_id_type': this.wallet_id_type,
              'wallet_id_value': this.wallet_id_value,
              'wallet_passwd': this.wallet_passwd
            }
            this.$http.post(this.siteInfo.host + '/api/index.php?act=wallet&op=activate', qs.stringify(userInfo)).then(res => {
              if (res.data.code == 200) {
                let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=act_state&activate_result=true'
                this._appjs.syJsbLaunchWebview(url)
//                this.$toast('跳转到激活成功页面')
              } else if (res.data.code == 405) {
                this.$toast('证件号码填写不完整或填写错误')
              } else if (res.data.code == 406) {
//                密码加密或者解密失败
                this.$toast('激活失败')
              } else if (res.data.code == 407) {
                let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=act_state&activate_result=false'
                this._appjs.syJsbLaunchWebview(url)
//                this.$toast('证件被绑定')
              }
            })
          })
        }
      }
    }
  }
</script>
<style scoped>
  .notice {
    box-sizing: border-box;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0 0.2rem;
    text-align: left;
    background-color: #FFF59B;
    font-size: 0.24rem;
    color: #F25B4B;
    font-weight: 300;
  }

  .notice img {
    width: 0.26rem;
    height: 0.26rem;
    vertical-align: middle;
    margin-right: 0.14rem;
  }

  .mobile {
    box-sizing: border-box;
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    padding: 0 0.3rem;
    font-size: 0.26rem;
    color: #666A7F;
    font-weight: 300;
    text-align: left;
    background: #F7F9FA;
  }

  .mobile img {
    width: 0.29rem;
    height: 0.29rem;
    vertical-align: middle;
  }

  .info {
    background-color: #fff;
  }

  .info .item {
    box-sizing: border-box;
    text-align: left;
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    padding: 0 0.3rem;
    border-top: 1px solid rgba(218, 222, 228, 0.60);
  }
  .info .item input[type="text"]:disabled
  {
    /*color: #818C9E;*/
    -webkit-text-fill-color: #818C9E;
    -webkit-opacity: 1;
    color: #818C9E;
  }

  .info .xing {
    font-size: 0.32rem;
    color: #F25B4B;
    vertical-align: middle;
  }

  .info .name {
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .info input {
    margin-left: 0.82rem;
    width: 4rem;
    background-color: transparent;
    height: 100%;
    font-size: 0.28rem;
    color: #818C9E;
    font-weight: 300;
  }

  .item input::-webkit-input-placeholder {
    color: #DADEE4;
    font-weight: 300;
  }

  .info img {
    width: 0.12rem;
    height: 0.24rem;
    float: right;
    /*margin-right: 0.6rem;*/
    margin-top: 0.32rem;
  }

  .info .sel::-webkit-input-placeholder {
    color: #B1B8C4;
  }

  .info .show {
    width: 0.4rem;
    height: 0.31rem;
  }

  .submit {
    width: 100%;
    position: fixed;
    bottom: 0.9rem;
    left: 0;
    text-align: center;
  }

  .submit .xy {
    width: 100%;
    text-align: center;
    position: relative;
  }

  .submit .yuan {
    height: 0.3rem;
    width: 0.3rem;
    border: 1px solid #aaa;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 1.41rem;
  }

  .submit p {
    line-height: 0.34rem;
    font-size: 0.24rem;
    color: #666A7F;
    font-weight: 300;
    margin-bottom: 0.5rem;
    padding-left: 0.18rem;
  }

  .submit p span {
    color: #4A90E2;
  }

  .submit img {
    width: 0.32rem;
    height: 0.32rem;
    position: absolute;
    top: 0.01rem;
    left: 1.42rem;
  }

  .submit button {
    width: 6.9rem;
    height: 0.88rem;
    background: #4A90E2;
    border-radius: 0.08rem;
    border: none;
    color: #fff;
    font-size: 0.32rem;
    margin: 0 auto;
    outline: none;
  }

  .isCard {
    width: 100%;
  }
</style>
