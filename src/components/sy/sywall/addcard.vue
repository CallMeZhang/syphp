<template>
  <div>
    <div v-title="'添加银行卡'"></div>
    <div class="notice">
      <p><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-notice.png'" alt="">
        请添加本人银行卡，确保资金安全！</p>
    </div>
    <div class="link"></div>
    <div class="info">
      <div class="item">
        <div class="name">持卡人姓名</div>
        <input type="text" placeholder="请输入持卡人姓名" v-model="username">
      </div>
      <div class="item">
        <div class="name">银行卡号</div>
        <input type="number" placeholder="请输入银行卡号" v-model="cardNum">
      </div>
    </div>
    <div class="btn">
      <p @click.stop="send">保存</p>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        username: '',
        cardNum: ''
      }
    },
    methods: {
      send(){
        let a = /^([1-9]{1})(\d{15}|\d{18})$/
        if (!a.test(this.cardNum)) {
          this.$toast('请输入正确的银行卡号')
        } else {
          console.log(1)
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
    margin-right: 0.15rem;
  }

  .link {
    width: 100%;
    height: 0.2rem;
  }

  .info {
    background-color: #fff;
  }

  .info .item {
    box-sizing: border-box;
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    padding: 0 0.3rem;
    text-align: left;
    border-top: 1px solid rgba(218, 222, 228, 0.60);
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
    margin-top: -1px;
  }

  .info .item div {
    display: inline-block;
    width: 1.4rem;
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .item input::-webkit-input-placeholder {
    color: #DADEE4;
  }

  .item input {
    margin-left: 0.54rem;
    font-size: 0.28rem;
    color: #818C9E;
  }

  .btn {
    margin-top: 1rem;
  }

  .btn p {
    width: 6.9rem;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #fff;
    font-size: 0.32rem;
    background: #4A90E2;
    border-radius:0.08rem;
    margin: 0 auto;
  }
</style>
