<template>
  <div class="act-container">
    <div v-if="actTrue" v-title="'激活成功'"></div>
    <div v-if="actFalse" v-title="'激活失败'"></div>
    <div v-if="actTrue" class="act-con">
      <div class="act-img"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-suc.png'" alt="success加载中"></div>
      <h2 class="act-hint">激活成功</h2>
      <button class="btn-subscibe margin-top9" @click="gosub">订阅公益项目</button>
      <a class="a-skip" href="javascript:void(0)" @click="goIndex()">跳过</a>
    </div>
    <div v-if="actFalse" class="act-con">
      <div class="act-img"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-fail.png'" alt="failed加载中"></div>
      <h2 class="act-hint">激活失败</h2>
      <p class="act-descr">信息有误，证件已被其它用户绑定</p>
      <button class="btn-amend mrgin-top094" @click="goedit">修改信息</button>
      <p class="call-server">致电咨询客服：<a class="phone-txt" @click="getAsk($event)">400 666 7308</a></p>
    </div>
  </div>
</template>
<script>
  import app from '../../../modules/_appJs/index.js'
  export default {
    data () {
      return {
        app,
        actTrue: false,
        actFalse: false
      }
    },
    components: {},
    created () {

    },
    mounted () {
      this.changeState()

    },
    methods: {
      changeState () {
        let a = this.$route.query.activate_result
        if (a === 'true') {
          this.actTrue = true
          this.actFalse = false
        } else {
          this.actTrue = false
          this.actFalse = true
        }
      },
      gosub(){
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=subscibe_crcre'
        this._appjs.syJsbLaunchWebview(url)
      },
      goedit(){
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=sywall_activation'
        this._appjs.syJsbLaunchWebview(url)
      },
      getAsk(e){
        if (this.$route.query.is_share == 'yes') {
          e.target.href = 'tel:' + '4006667308'
        } else {
          this._appjs.syJsbCallPhone('4006667308')
        }
      },
      goIndex(){
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=sywall_index'
        this._appjs.syJsbLaunchWebview(url)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .margin-top9 {
    margin-top: 0.9rem;
  }

  .act-container {
    width: 7.5rem;
    height: 100%;
    background: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .act-con {
      position: relative;
      width: 100%;
      height: 100%;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .act-img {
        margin-top: 0.86rem;
        width: 1.6rem;
        height: 1.6rem;
      }
      .act-img img {
        width: 100%;
        height: 100%;
      }
      .act-hint {
        margin-top: 0.31rem;
        padding: 0 0.3rem;
        font-size: 0.4rem;
        line-height: 0.56rem;
        color: #4A90E2;
      }
      .btn-subscibe {
        margin-bottom: 0.25rem;
        width: 6.9rem;
        height: 0.88rem;
        background: #fff;
        font-size: 0.32rem;
        line-height: 0.45rem;
        color: #4B4F63;
        border: 1px solid #DADEE4;
        -webkit-border-radius: 0.08rem;
        -moz-border-radius: 0.08rem;
        border-radius: 0.08rem;
        font-weight: 300;
      }
      .a-skip {
        font-size: 0.26rem;
        line-height: 0.37rem;
        color: #4A90E2;
        text-decoration: underline;
        font-weight: 300;
      }
      /*failed*/
      .act-descr {
        margin-top: 0.03rem;
        padding: 0 0.3rem;
        font-size: 0.26rem;
        line-height: 0.37rem;
        color: #666A7F;
      }
      .btn-amend {
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
      .call-server {
        position: fixed;
        bottom: 0.83rem;
        padding: 0 0.3rem;
        text-align: center;
        font-size: 0.25rem;
        line-height: 0.37rem;
        color: #818C9E;
      }
      .call-server a{
        color: #A1C5EF;
      }
      .mrgin-top094 {
        margin-top: 0.94rem;
      }
    }
  }
</style>
