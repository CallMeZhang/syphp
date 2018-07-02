<template>
  <div class="container" ref="wraperDiv">
    <div v-title="'助理人'"></div>
    <div class="header">
      <img
          :src="userData.store_info.store_banner || siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/zlr_header.jpg'"
          alt="正在努力加载...">
      <img style="left: 0;" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/cover-bg.png'" alt="" class="cover-bg">
      <div class="toux">
        <img :src="userData.member_info.member_avatar">
        <div class="title_c">
          <div class="title">{{userData.store_info.store_name || default_title}}</div>
          <div class="ass">助理人：{{userData.member_info.member_truename}}</div>
        </div>
      </div>
      <div class="guanz_c">
        <span>{{userData.cared_num}}人</span>
        <div :class="attention?'guan_y':'guan_n'" @click.prevent="attentionFn">
          {{attention ? "已关注" : "+关注"}}
        </div>
      </div>
    </div>
    <div class="detail_c" v-if="userData.member_info.member_intro !== null">
      <div class="detail" :class="showText?'all-text':''" ref="hideText"
           v-html="userData.member_info.member_intro"></div>
      <div class="detail_zhe" @click="show_text" :class="showText?'no-bg':''" v-if="!openBtn">
        <span>展开</span>
        <img class='flag-img' :class="showText?'img-roter':'img-roter-no'"
             :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/flag.png'"></div>
    </div>
    <assistant-tab @setPosition="positionFn"></assistant-tab>
    <sy-share @click.native="shareFn" v-if="isshow" class="vol-detail-btn2"></sy-share>
    <!--<div class="tab-one-footer"  :class="isFooter?'is-footer':''" >———— 公益中国 大爱无疆 ————</div>-->
  </div>
</template>
<script>
  import AssistantTab from './assistant-tab.vue'
  import wx_share from '@/assets/js/share'
  export default{
    data () {
      return {
        userData: {
          "store_info": {
            "store_name": "",
            "store_banner": ""
          },
          "member_info": {
            "member_name": "",
            "member_truename": "",
            "member_intro": ""
          },
          cared_num: 0
        },
        showText: false,
        attention: true,
        default_title: '扶贫驿站',
        isshow: false,
        isFooter: false,
        openBtn: true
      }
    },
    mounted(){
      let agent_id = this.$route.params.agent_id
      var url = this.siteInfo.host + '/api/index.php?act=v_agent&op=get_agent_info_by_member_id&member_id=' + agent_id
      this.$http.get(url).then((res) => {
        if (res.data.code === 200) {
          this.userData = res.data.content
          setTimeout(() => {
            let agent_id = this.$route.params.agent_id
            var shareText = this.userData.member_info.member_intro === null ? '暂无介绍' : this.userData.member_info.member_intro
            var shareTittle = this.userData.store_info.store_name || this.default_title
            var shareLogo = this.userData.store_info.store_banner || this.siteInfo.cdn_host + '/bocm/platformjs/static/image/assistants/header_bg.png'
            var shareUrl = this.siteInfo.host + '/bocm/index.php?act=goods&op=agent_poor_goods_list&member_id=' + agent_id
            var params = {
              text: shareText,
              title: shareTittle,
              logo: shareLogo,
              url: shareUrl
            }
            wx_share(params)
          }, 10)
          this.$nextTick(function () {
            if (this.$refs.hideText) {
              var elheight = this.$refs.hideText.getClientRects()[0].height
              if (elheight > 60) {
                this.openBtn = false
                this.$refs.hideText.style.height = "1.44rem"
              } else {
                this.openBtn = true
              }
//              var that=this
//              setTimeout(function () {
//                var elH = that.$refs.wraperDiv.getClientRects()[0].height
//                var bigWidth = window.screen.height
//                if(bigWidth>elH+40){
//                  that.isFooter=false
//                }else{
//                  that.isFooter=false
//                }
//              },200)
            }
            let that = this
            setTimeout(function () {
              var elH = that.$refs.wraperDiv.getClientRects()[0].height
              var bigWidth = window.screen.height
              console.log(bigWidth, elH)
              if (bigWidth > elH + 28) {
                that.isFooter = true
              } else {
                that.isFooter = false
              }
            }, 200)
          })
          res.data.content.icared ? this.attention = true : this.attention = false
          if ((/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.userData.store_info.store_name))) {
            this.userData.store_info.store_name = '扶贫驿站'
          }
          this._appjs.syJsbSetTitleText(this.userData.store_info.store_name || this.default_title)
          window.document.title = this.userData.store_info.store_name || this.default_title
        } else {
          this.userData = {}
          console.log('接口数据错误')
        }
      }, (error) => {
        console.log(error)
      })
    },
    created() {
      let that = this
      window.goBack = function () {
        that._appjs.syJsbCloseAppPage()
      }
      let info = that._appjs.syJsbGetAppVersion()
      if (info['platform'] === 'ios' || info['platform'] === 'android') {
        that._appjs.syJsbSetGoBackUrl("goBack()");
        that.isshow = true
      }
    },
    methods: {
      positionFn(){
        this.$nextTick(function () {
          var elH = this.$refs.wraperDiv.getClientRects()[0].height
          var bigWidth = window.screen.height
          if (bigWidth > elH + 28) {
            this.isFooter = true
          } else {
            this.isFooter = false
          }
        })
      },
      show_text(){
        this.showText = !this.showText
      },
      careAgent(){
        let agent_id = this.$route.params.agent_id
        let url = this.siteInfo.host + '/api/index.php?act=v_agent&op=care_agent&cared_member_id=' + agent_id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.attention = true;
            this._appjs.showToast("关注成功")
            /*this.$LayerToast({
             message:"关注成功",
             position:"middle",
             duration:2000
             })*/
            this.userData.cared_num++
          } else if (res.data.code === 401) {
            var callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=goods&op=agent_poor_goods_list&member_id=' + agent_id);
            window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
          }
        }, (error) => {
          console.log(error)
        })
      },
      unCareAgent(){
        let agent_id = this.$route.params.agent_id
        let url = this.siteInfo.host + '/api/index.php?act=v_agent&op=uncare_agent&cared_member_id=' + agent_id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.attention = false;
            this._appjs.showToast("取消关注成功")
            /*this.$LayerToast({
             message:"取消关注成功",
             position:"middle",
             duration:2000
             })*/
            this.userData.cared_num--
          } else if (res.data.code === 401) {
            var callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=goods&op=agent_poor_goods_list&member_id=' + agent_id);
            window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
          }
        }, (error) => {
          console.log(error)
        })
      },
      attentionFn() {
        this.attention ? this.unCareAgent() : this.careAgent()
      },
      shareFn() {
        let agent_id = this.$route.params.agent_id
        var shareText = this.userData.member_info.member_intro === null ? '暂无介绍' : this.userData.member_info.member_intro
        var shareTittle = this.userData.store_info.store_name || this.default_title
        var shareLogo = this.userData.store_info.store_banner || this.siteInfo.cdn_host + '/bocm/platformjs/static/image/assistants/header_bg.png'
        var shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=goods&op=agent_poor_goods_list&member_id=' + agent_id
        var params = {
          text: shareText,
          title: shareTittle,
          logo: shareLogo,
          url: shareUrl
        }
        var jsonParams = JSON.stringify(params)
        this.$syShare(jsonParams, shareText, shareUrl)
      }
    },

    components: {AssistantTab},
    watch: {
      showText: function (val, oldVal) {
        var that = this
        setTimeout(function () {
          that.positionFn()
        }, 17)
        if (val) {
          this.$refs.hideText.style.height = "auto"
        } else {
          this.$refs.hideText.style.height = "1.44rem"
        }
      }
    }
  }
</script>
<style scoped>
  .is-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .cover-bg {
    position: absolute;
    top: 0rem;
    width: 7.5rem;
    height: 2.8rem;
    z-index: 2;
  }

  .tab-one-footer {
    background: #F7F9FA;
    font-size: .24rem;
    color: #DADEE4;
    letter-spacing: 0;
    height: 28px;
    line-height: 28px;
  }

  .container {
    background: #fff;
  }

  .header {
    width: 7.5rem;
    height: 2.8rem;
    position: relative;
    overflow: hidden;
  }

  .header img {
    width: 100%;
    height: 100%
  }

  .toux {
    z-index: 2;
    position: absolute;
    top: 0.9rem;
    left: 0.34rem;
    height: 1.04rem;
    overflow: hidden;
  }

  .toux img {
    width: 0.98rem;
    height: 0.98rem;
    border-radius: 50%;
    margin-right: 0.34rem;
    float: left;
    border: 0.03rem solid #fff;
  }

  .title_c {
    float: left;
  }

  .title_c .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 0.45rem;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #FFFFFF;
    text-align: left;
  }

  .title_c .ass {
    margin-top: 0.2rem;
    line-height: 0.4rem;
    font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    color: #FFFFFF;
    text-align: left;
  }

  .guanz_c {
    z-index: 2;
    position: absolute;
    top: 2.2rem;
    right: 0.3rem;
  }

  .guanz_c span {
    font-family: PingFangSC-Light;
    font-size: 0.26rem;
    color: #FFFFFF;
    line-height: 0.37rem;
    margin-right: 0.2rem;
  }

  .guanz_c .guan_n {
    background: #4A90E2;
    border-radius: 0.04rem;
    width: 0.9rem;
    height: 0.44rem;
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.24rem;
    color: #FFFFFF;
    line-height: 0.44rem;
  }

  .guanz_c .guan_y {
    background: #fff;
    border-radius: 0.04rem;
    width: 0.9rem;
    height: 0.44rem;
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.24rem;
    color: #4A90E2;
    line-height: 0.44rem;
  }

  .detail_c {
    position: relative;
    padding: 0.3rem 0.3rem 0.59rem 0.3rem;
  }

  .detail {
    font-weight: 300;
    overflow: hidden;
    width: 100%;
    font-size: 0.28rem;
    color: #4B4F63;
    letter-spacing: 0;
    line-height: 0.48rem;
    text-align: left;
  }

  .detail_zhe {
    width: 100%;
    height: 0.82rem;
    background-image: linear-gradient(-180deg, rgba(238, 238, 238, 0.00) 0%, #FFFFFF 50%);
    position: absolute;
    left: 0;
    bottom: 0.3rem;
  }

  .no-bg {
    background-image: none
  }

  .detail_zhe span {
    line-height: 1.4rem;
    font-size: 0.24rem;
    color: #666A7F;
    letter-spacing: 0;
  }

  .all-text {
    height: auto;
    padding-bottom: 0.3rem;
  }

  .flag-img {
    width: 0.3rem;
    margin-left: 0.06rem
  }

  .img-roter {
    animation: mysecond .5s;
    animation-fill-mode: forwards;
  }

  @keyframes mysecond {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }

  .img-roter-no {
    animation: mysecond-no .5s;
    animation-fill-mode: forwards;
  }

  @keyframes mysecond-no {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
</style>
