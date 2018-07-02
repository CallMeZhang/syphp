<template>
  <div>
    <div v-title="'修改信息'"></div>
    <div class="notice">
      <p><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-notice.png'" alt="">
        若需更新个人信息，请联系工作人员：400-666-7308</p>
    </div>
    <div class="myinfo">
      <div class="link">个人信息</div>
      <div class="infoCon">
        <div class="item">
          <div class="name">姓&emsp;&emsp;名</div>
          <div class="nameInfo">{{wallet_truename}}</div>
        </div>
        <div class="item">
          <div class="name">证件类型</div>
          <div class="nameInfo">{{wallet_type}}</div>
        </div>
        <div class="item">
          <div class="name">证件号码</div>
          <div class="nameInfo">{{wallet_id_value}}</div>
        </div>
      </div>
      <div class="link">钱包信息</div>
      <div class="walletInfo">
        <div class="item" @click="gosub">
          订阅公益项目
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-aow.png'" alt="!">
        </div>
        <div class="item" @click="goeditPawd">
          修改支付密码
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-aow.png'" alt="!">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        wallet_truename: '',
        wallet_type: '',
        wallet_id_value: ''
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=getWalletUserInfo').then(res => {
          let a = res.data.content
          this.wallet_truename = a.wallet_truename
          this.wallet_id_value = a.wallet_id_value
          if (a.wallet_id_type == 1) {
            this.wallet_type = '身份证'
          } else {
            this.wallet_type = ''
          }
        })
      },
      gosub(){
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=subscibe_crcre'
//        this._appjs.syJsbLaunchWebview(url)
        window.location.href = url
      },
      goeditPawd(){
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=edit_pasd'
//        this._appjs.syJsbLaunchWebview(url)
        window.location.href = url
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
    margin-right: 0.15rem;
  }

  .link {
    box-sizing: border-box;
    padding: 0 0.31rem;
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #F7F9FA;
    font-size: 0.26rem;
    color: #666A7F;
    font-weight: 300;
    text-align: left;
  }

  .item {
    box-sizing: border-box;
    padding: 0 0.31rem;
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    border-top: 1px solid rgba(218, 222, 228, 0.60);
    background-color: #fff;
    text-align: left;
  }

  .item:last-child {
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
  }

  .infoCon .item .name {
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
    vertical-align: middle;
  }

  .infoCon .item .nameInfo {
    font-size: 0.28rem;
    color: #818C9E;
    font-weight: 300;
    margin-left: 0.87rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 55%;
    vertical-align: middle;
  }

  .infoCon .item div {
    display: inline-block;
  }

  .walletInfo {
    background-color: #fff;
  }

  .walletInfo .item {
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .walletInfo .item img {
    float: right;
    width: 0.12rem;
    height: 0.24rem;
    margin-top: 0.32rem;
  }
</style>
