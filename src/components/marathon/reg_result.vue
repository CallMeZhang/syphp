<template>
  <div style="height: 100%;">
    <div v-title="'报名结果'"></div>
    <!--提示下载app-->
    <div v-if="isShare && isDownload">
      <div class="fixed" style="z-index: 1999999;background: rgba(0,0,0,.7);width:100%;height:1.2rem;">
        <ul class="clearfix" @click="linkToDownload">
          <li class="fl" @click.stop="isDownload = false">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/CombinedShapeClose.png'" alt=""
                 style="width:.44rem;height:.44rem;vertical-align: middle;margin:0.38rem 0.12rem;">
          </li>
          <li class="fl">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group2_2x.png'"
                 style="width:0.9rem;height:0.92rem;margin:0.14rem 0.12rem 0;">
          </li>
          <li class="fl">
            <p style="color:#fff;font-size:.28rem;line-height: 0.4rem;margin-top:0.21rem;">一起善源</p>
            <p style="color:#B7B7B7;font-size:.24rem;line-height:0.34rem;margin-top:0.03rem;">爱 · 源于善</p>
          </li>
          <li class="fr">
            <a :href="siteInfo.host+'/boc/index.php'"
               style="display:inline-block;height:0.72rem;width:2.13rem;font-size:.32rem;line-height:0.72rem;text-align: center;color:#fff;background: #4A90E2;border-radius: 0.1rem;margin:0.24rem 0.4rem 0;">立即下载</a>
          </li>
        </ul>
      </div>
      <div style="height:1.2rem;background: #fff;"></div>
    </div>
    <div class="reg_result">
      <div class="header">
        <div class="img">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-suc.png'" alt="报名成功">
        </div>
        <p>提交成功</p>
      </div>
      <div class="regInfo">
        <div class="regCon">
          <div class="info">
            <div class="infoTop">
              <div>
                <p>报名项：{{payInfo.enroll_type_name}}</p>
                <p>参赛人：{{payInfo.enroll_name}}</p>
                <p>报名码：<span>{{payInfo.enroll_code}}</span></p>
              </div>
              <div class="curfl"></div>
              <div class="curfr"></div>
              <div class="curfls"></div>
              <div class="curfrs"></div>
            </div>
            <div class="infoBto">
              <p>为保证您的权益，报名截止日我们将确认报名结果。报名成功后，您将同时自动拥有一起善源平台账户，并向您账户中充入90元的代金券和30元的公益钱包余额。相关报名及一起善源账户信息将以短信形式告知。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="btn"
             @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=marathon_router&op=marathon_index&marathon_id='+marathon_id)">
          赛事介绍
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        payInfo: [],
        marathon_id: '',
        isDownload:'true',
        isShare: false
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData () {
        this.marathon_id = this.$route.query.marathon_id
        console.log(this.marathon_id)
        this.$route.query.is_share ? this.isShare = 'yes' : this.isShare = false
        this.$http.get(this.siteInfo.host + '/api/index.php?act=marathon_enroll&op=getEnrollBasic&marathon_id=' + this.marathon_id + '&is_share=' + this.isShare).then(res => {
          console.log(res.data)
          this.payInfo = res.data.content.pay_info
          console.log(this.payInfo)
        })
      },
      // 下载app
      linkToDownload(){
        window.location.href = this.siteInfo.host + '/boc/index.php'
      }
    }
  }
</script>
<style scoped>
  .reg_result {
    padding: 0 0.4rem;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  }

  .header {
    padding: 0.86rem 0 0.5rem;
  }

  .header .img {
    height: 1.6rem;
    width: 1.6rem;
    margin: 0 auto;
  }

  .header .img img {
    width: 100%;
    height: 100%;
  }

  .header p {
    font-size: 0.4rem;
    color: #4A90E2;
    text-align: center;
    padding-top: 0.3rem;

  }

  .regInfo {
    padding: 0 0.4rem;
    background: #fff;
    box-shadow: 0px 0px 20px 0 rgba(74, 144, 226, 0.20);
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
  }

  .curfls, .curfrs {
    height: 0.46rem;
    width: 0.46rem;
    position: absolute;
    bottom: -0.23rem;
    background: #fff;
  }

  .curfls {
    left: -0.93rem;
  }

  .curfrs {
    right: -0.93rem;
  }

  .curfl, .curfr {
    height: 0.46rem;
    width: 0.46rem;
    -webkit-border-radius: 50% 0 0 50%;
    -moz-border-radius: 50% 0 0 50%;
    border-radius: 50% 0 0 50%;
    background: #fff;
    position: absolute;
    bottom: -0.23rem;
    -webkit-box-shadow: inset 0px 0px 10px rgba(74, 144, 226, 0.20);
    -moz-box-shadow: inset 0px 0px 10px rgba(74, 144, 226, 0.20);
    box-shadow: inset 0px 0px 10px rgba(74, 144, 226, 0.20);
  }

  .curfl {
    left: -0.63rem;
    -webkit-border-radius: 0 50% 50% 0;
    -moz-border-radius: 0 50% 50% 0;
    border-radius: 0 50% 50% 0;
  }

  .curfr {
    right: -0.63rem;
  }

  .infoTop {
    padding: 0.3rem 0;
    border-bottom: 1px dashed #ddd;
    position: relative;
  }

  .infoBto {
    padding: 0.32rem 0;
  }

  .infoTop p {
    font-size: 0.3rem;
    color: #818C9E;
    text-align: left;
    line-height: 0.6rem;
    font-weight: 300;
  }

  .infoTop p span {
    color: #F25B4B;
  }

  .infoBto p {
    width: 100%;
    font-size: 0.28rem;
    color: #818C9E;
    line-height: 0.4rem;
    font-weight: 300;
    text-align: justify;
  }

  .footer {
    margin-top: 2rem;
  }

  .footer .btn {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    margin: 0.4rem auto 0.3rem;
    background: #4A90E2;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    color: #fff;
    font-size: 0.33rem;
  }
</style>
