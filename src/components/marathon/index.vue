<template>
  <div>
    <div v-title="'马拉松赛事报名'"></div>
    <div class="wrapper">
      <sy_share v-if="is_Share" @click.native="is_Share=false"></sy_share>
      <div v-if="isShare">
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
      <div class="header">
        <div class="banner">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/sywelfare2.png'" alt="banner">
        </div>
        <div class="info">
          <div class="tit">
            <h2>2017“公益中行”国际半程马拉松系列赛·旬邑站</h2>
            <div class="share" @click="share_ma()">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-share.png'" alt="">
            </div>
          </div>
          <div class="intr">
            公益中国行”国际半程马拉松系列赛是中国银行、中国田径协会和地方政府共同主办的专业半程马拉松路跑赛事。
          </div>
          <div class="time">
            <div class="item">
              <div class="img">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-p1.png'" alt=""
                     style="height: 0.38rem;width: 0.38rem;">
              </div>
              <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-p1.png'" alt="">-->
              <span>2017-10-01 08:00</span>
            </div>
            <div class="item">
              <div class="img">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-p2.png'" alt=""
                     style="height: 0.42rem;width: 0.31rem;">
              </div>
              <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-p1.png'" alt="">-->
              <span>陕西省咸阳市旬邑县</span>
            </div>
            <div class="item">
              <div class="img">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-p3.png'" alt=""
                     style="height: 0.34rem;width: 0.37rem;">
              </div>
              <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-p1.png'" alt="">-->
              <span>半程马拉松/公益跑</span>
            </div>
          </div>
        </div>
      </div>
      <div class="link"></div>
      <div class="march">
        <div class="pubTit">
          <h2><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/head.png'" alt="">参赛流程</h2>
        </div>
        <div class="marchCon">
          <div class="marchItem">
            <p class="time">09/11~10/08</p>
            <div class="mar">
              <p class="img1"></p>
              <p class="con">登陆“公益中国”APP提交报名信息</p>
              <div class="aow"></div>
            </div>

          </div>

          <div class="marchItem">
            <p class="time">10/08~10/10</p>
            <div class="mar">
              <p class="img2"></p>
              <p class="con">系统抽签决定参赛名额归属</p>
              <div class="aow1"></div>
            </div>
          </div>
          <div class="marchItem">
            <p class="time">10/10</p>
            <div class="mar">
              <p class="img2"></p>
              <p class="con">公布抽签结果</p>
              <div class="tips">
                <span @click="getTip(1)">中签选手 <img
                    :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-wen.png'" alt=""></span>
                <span @click="getTip(2)">未中签选手<img
                    :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-wen.png'" alt=""></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="link"></div>
      <div class="detail">
        <div class="pubTit">
          <h2><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/head.png'" alt="">相关详情</h2>
        </div>
        <div class="detailCon">
          <ul>
            <li>
              <img class="zs" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon1.png'" alt="">
              <span class="jx">住宿交通</span>
              <img class="icon" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'" alt="">
            </li>
            <li>
              <img class="zs" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon2.png'" alt="">
              <span class="jx">公益回馈</span>
              <img class="icon" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'" alt="">
            </li>
            <li>
              <img class="zs" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon3.png'" alt="">
              <span class="jx">保险信息</span>
              <img class="icon" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'" alt="">
            </li>
            <li>
              <img class="zs" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon4.png'" alt="">
              <span class="jx">比赛规程</span>
              <img class="icon" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'" alt="">
            </li>
          </ul>
        </div>
        <div class="dfooter">
          <P class="line"></P>
          <P>一起善源 · 让爱连接故乡</P>
          <P class="line"></P>
        </div>
        <div style="width: 100%;height: 1rem;"></div>
      </div>
      <div class="footer footerYy">
        <div class="foot">
          <ul class="cle">
            <li style="width: 18%;position: relative" >
              <a style="position: absolute;width:100%;height:100%;left:0;top:0;background: transparent;" @click="getAsk($event)"></a>
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-kefu.png'" alt="">
                <p>咨询</p>
            </li>
            <li class="add care" style="width: 82%;" v-model="isIndex" @click="apply()">
              <a href="javascript:;">我要报名</a>
            </li>
          </ul>
        </div>
        <!--<div class="hotLine" v-show="ask">-->
        <div class="hotLine" v-show="false">
          <table>
            <tr>
              <td>
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-kefu.png'" alt="">
              </td>
              <td>在线咨询</td>
            </tr>
            <tr>
              <td>
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/icon-kefu.png'" alt="">
              </td>
              <td>在线咨询</td>
            </tr>

          </table>
        </div>
      </div>
      <!--弹窗选马拉松类型-->
      <div class="isenroll" v-if="isEnroll" @click.self="isEnroll = false">
        <div class="items">
          <div class="ma_title">请选择报名项</div>
          <div class="sel">
            <div class="item" v-for="(item, index) in items">
              <div @click="isCheck(index,$event)">
                <div class="check" :class="{'check_is':nowIndex == index}"></div>
                <div class="item_name"><span class="itemss">{{item.name}}</span><span class="money">{{item.fee}}元</span></div>
              </div>
            </div>
          </div>
          <div class="next" @click="goInfo()">下一步，填写报名信息</div>
        </div>
      </div>
      <!--tips-->
      <div class="mark" v-if="mark1">
        <div class="tip1">
          <div class="close" @click="getClose">
            <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-close.png'">
          </div>
          <div class="tit">中签选手</div>
          <div class="tipCon">
            <p><span>1.&nbsp;</span>获得参赛资格。</p>
            <p class="clearfix"><span class="fl">2.&nbsp;</span><span class="fl" style="width: 94%;">发放电子购物券与公益钱包，可在“一起善源”APP内兑换使用。</span></p>
          </div>
        </div>
      </div>
      <div class="mark" v-if="mark2">
        <div class="tip1">
          <div class="close" @click="getClose">
            <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-close.png'">
          </div>
          <div class="tit">未中签选手</div>
          <div class="tipCon">
            <p>1.&nbsp;未能获得参赛资格。</p>
            <p> 2.&nbsp;报名费用将在15个工作日内原路返还。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import share_img from '../common/shared_img.vue'
  export default{
    data () {
      return {
        url: '',
        isShare: false,
        isEnroll: false,
        items: '',
        nowIndex: '',
        type: '',
        isIndex: '',
        mark1: false,
        mark2: false,
        ask: false,
        is_Share: false,
        isDownload:true
      }
    },
    created(){
      this.getData()

    },
    components: {
      'sy_share': share_img
    },
    methods: {
      getAsk(e){
          // 18642162325
//        this.ask = !this.ask
//        console.log(e)
//        console.log(e.target);return
        if( this.$route.query.is_share == 'yes'){
          e.target.href='tel:'+ '18642162325'
        }else{
          this._appjs.syJsbCallPhone('18642162325');
        }
      },
      getTip(num){
        if (num == 1) {
          this.mark1 = true
        } else if (num == 2) {
          this.mark2 = true
        } else {
          this.mark1 = false
          this.mark2 = false
        }
      },
      getClose(){
        this.mark1 = false
        this.mark2 = false
      },
      isCheck(index, event){
        this.type = index
        this.nowIndex = index
      },
      share_ma(){
        let is_share = this.$route.query.is_share
        if (is_share == 'yes') {
          this.is_Share = true
        } else {
          this.share()
        }
      },
      share(){
        let shareUrl = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_index&is_share=yes';
        let shareText = '爱到旬邑 奔向马栏 “一起善源”与您相约马拉松';
        let shareTitle = '2017"公益中国行"国际半程马拉松系列赛·旬邑站';
        let shareLogo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/Group2_2x.png';
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
      },
      apply(){
        this.marathon_id = this.$route.query.marathon_id
        this.$http.get(this.siteInfo.host + '/api/index.php?act=marathon_enroll&op=isSign&marathon_id' + this.marathon_id).then(res => {
          this.code = res.data.code
          console.log(this.code)
//                  未登录
          if (this.code == '403') {
            var callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_index&marathon_id=' + this.marathon_id);
            window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
//                  可以报名
          } else if (this.code == '200') {
            this.isEnroll = true
          } else if (this.code == '500') {
            let url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_reg_suc&marathon_id=' + this.marathon_id + ''
            this._appjs.syJsbLaunchWebview(url)
//                        this.url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_reg_suc&marathon_id='+this.marathon_id;
//                        window.location.href = this.url
          }
        });

        this.$http.get(this.siteInfo.host + '/api/index.php?act=marathon&op=isUnderway&marathon_id=1').then(res => {
          this.code = res.data.code;
          if (this.code != '200') {
            this.url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_end';
            window.location.href = this.url;
          }
        })

      },
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=marathon&op=getTypeInfo&marathon_id=' + this.marathon_id).then(res => {
          this.items = res.data.content
        })
      },
      goInfo(){
        this.url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_regist_info&marathon_id=' + this.marathon_id + '&enroll_type=' + this.type;
        window.location.href = this.url
      },
        // 下载app
        linkToDownload(){
            window.location.href= this.siteInfo.host+'/boc/index.php'
        },
    }
  }

</script>
<style scoped>
  .mark {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.50);
    z-index: 9990;
    bottom: 0;
    left: 0;
  }

  .mark .close {
    height: 0.6rem;
    width: 0.6rem;
    position: absolute;
    top: -0.9rem;
    right: 0.3rem;
  }

  .mark .close img {
    width: 100%;
    height: 100%;
  }

  .mark .tip1 {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 6.5rem;
    background-color: #fff;
    border-radius: 10px;
  }

  .mark .tit {
    text-align: center;
    font-size: 0.34rem;
    color: #4B4F63;
    padding: 0.25rem 0;
    font-weight: 300;
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);;
  }

  .mark .tipCon {
    padding: 0.44rem 0.3rem 1.8rem;
  }

  .mark .tipCon p {
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.5rem;
    font-weight: 300;
    text-align: left;
  }
  .mark .tipCon p span{
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.4rem;
    font-weight: 300;
    text-align: left;
  }

  .link {
    width: 100%;
    height: 0.2rem;
    background-color: #f4f6f5;
  }

  .banner {
    width: 100%;
    /*background-color: pink;*/
  }

  .banner img {
    width: 100%;
  }

  .info {
    padding: 0.3rem;
    background-color: #fff;
  }

  .info .tit {
    width: 100%;
    overflow: hidden;
  }

  .info .tit h2 {
    float: left;
    font-size: 0.34rem;
    /*color: #B4F63;*/
    color: #4B4F63;
    line-height: 0.5rem;
    width: 85%;
    text-align: left;
  }

  .info .tit .share {
    float: right;
    width: 0.72rem;
    height: 0.72rem;
    /*background: pink;*/
  }

  .info .tit .share img {
    width: 100%;
    height: 100%;
  }

  .info .intr {
    font-size: 0.26rem;
    font-weight: 300;
    color: #666A7F;
    text-align: left;
    padding: 0.2rem 0 0.1rem;
    line-height: 0.4rem;
  }

  .info .time .item {
    text-align: left;
    margin-top: 0.3rem;
  }

  .info .time .item .img {
    display: inline-block;
    width: 0.38rem;
    height: 0.38rem;
    vertical-align: middle;
    text-align: center;
    margin-bottom: 0.04rem;
  }

  .info .time .item img {

  }

  .info .time .item span {
    padding-left: 0.2rem;
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .march {
    background-color: #fff;
  }

  .pubTit {
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    padding: 0.3rem 0;
    text-align: left;
    box-sizing: border-box;
  }

  .pubTit img {
    height: 0.7rem;
    width: 0.16rem;
    vertical-align: middle;
    margin-right: 0.14rem;
  }

  .pubTit h2 {
    font-size: 0.34rem;
    color: #4B4F63;
  }

  .marchCon {
    padding: 0.2rem 0.3rem;
    overflow: hidden;
  }

  .marchCon p {
    float: left;
  }

  .marchCon .mar {
    width: 70%;
    float: left;
    margin-left: 0.3rem;
  }

  .marchCon .time {
    width: 25%;
    font-size: 0.26rem;
    color: #4B4F63;
    font-weight: 300;
    text-align: right;
    margin-top: 0.04rem;
  }

  .marchCon .img1 {
    width: 0.3rem;
    height: 0.3rem;
    border: 2px solid #4A90E2;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 0.2rem;
    box-sizing: border-box;
    vertical-align: bottom;
  }

  .marchCon .img2 {
    width: 0.3rem;
    height: 0.3rem;
    border: 2px solid #F8E71C;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 0.2rem;
    box-sizing: border-box;
    vertical-align: bottom;
  }

  .marchCon .con {
    font-size: 0.28rem;
    color: #4B4F63;
    height: 0.35rem;
    line-height: 0.31rem;
  }

  .marchCon .marchItem {
    overflow: hidden;
  }

  .marchCon .aow {
    width: 0.15rem;
    height: 0.9rem;
    background: url("/bocm/platformjs/static/image/marathon/icon-aow1.png") no-repeat center;
    background-size: contain;
    margin-left: 0.07rem;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
  }

  .marchCon .aow1 {
    width: 0.15rem;
    height: 0.9rem;
    background: url("/bocm/platformjs/static/image/marathon/icon-aow2.png") no-repeat center;
    background-size: contain;
    margin-left: 0.07rem;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
  }

  .marchCon .tips {
    margin-left: 0.5rem;
    padding-top: 0.2rem;
    float: left;
    width: 100%;
    text-align: left;
  }

  .marchCon .tips span {
    font-size: 0.24rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .marchCon .tips img {
    width: 0.28rem;
    height: 0.28rem;
    margin-left: 0.1rem;
    margin-right: 0.6rem;
    vertical-align: bottom;
  }

  .detail {
    background-color: #fff;
    /*margin-bottom: 1rem;*/
  }

  .detailCon {
    padding: 0.2rem 0.3rem;
  }

  .detailCon li {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #DADEE4;
    overflow: hidden;
    text-align: left;
  }

  .detailCon li .zs {
    width: 0.4rem;
    height: 0.46rem;
    /*height: 0.28rem;*/
    vertical-align: middle;
    float: left;
    margin-top: 0.26rem;
  }

  .detailCon li .jx {
    font-size: 0.32rem;
    color: #4B4F63;
    font-weight: 300;
    padding-left: 0.2rem;
  }

  .detailCon li .icon {
    float: right;
    width: 0.14rem;
    height: 0.25rem;
    margin-right: 0.2rem;
    margin-top: 0.37rem;
  }

  .detailCon li .icon img {
    width: 100%;
    height: 100%;
  }

  /*.detailCon li:nth-child(2) .zs {*/
  /*width: 0.33rem;*/
  /*height: 0.45rem;*/
  /*margin-top: 0.27rem;*/
  /*}*/

  /*.detailCon li:nth-child(3) .zs {*/
  /*width: 0.35rem;*/
  /*height: 0.4rem;*/
  /*margin-top: 0.3rem;*/
  /*}*/

  .detailCon li:nth-child(4) {
    border: none;
  }

  /*.detailCon li:nth-child(4) .zs {*/
  /*width: 0.35rem;*/
  /*height: 0.46rem;*/
  /*margin-top: 0.27rem;*/
  /*}*/

  .detail .dfooter {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #f4f6f5;
  }

  .detail .dfooter p {
    display: inline-block;
    font-size: 0.24rem;
    color: #DADEE4;
  }

  .detail .dfooter .line {
    height: 1px;
    width: 0.8rem;
    background-color: #DADEE4;
    vertical-align: middle;
    margin: 0 0.15rem;
  }

  .footer {
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    border-top: 1px solid rgb(221, 221, 221);
    background-color: #fff;
  }

  .footer li {
    position: relative;
    float: left;
    text-align: center;
    font-size: 0.2rem;
    color: #666;
  }

  .footer li img {
    width: 0.4rem;
    height: 0.4rem;
    margin-top: 0.15rem;
  }

  .footer .line {
    position: relative;
    height: 1rem;
  }

  .footer .line p {
    width: 1px;
    height: .48rem;
    background: #ccc;
    position: absolute;
    top: 50%;
    margin-top: -0.24rem;
  }

  .footer .add {
    width: 32%;
    padding-top: 0.08rem;
  }

  .footer .add a {
    font-size: .28rem;
    display: block;
    width: 95%;
    height: .84rem;
    line-height: .86rem;
    border-radius: .1rem;
    color: #fff;
    box-sizing: border-box;
    background: rgba(254, 97, 34, .7);
    margin: 0 auto;
  }

  .footer .care a {
    background: #4A90E2;
  }

  .footer .hotLine {
    width: 2.44rem;
    background-color: #fff;
    position: absolute;
    left: 0.1rem;
    bottom: 1.2rem;
    border: 1px solid #e1e1e1;
    border-bottom: none;
    font-size: 0.24rem;
  }

  .footer .hotLine table {
    width: 100%;
  }

  .footer .hotLine table tr {
    height: 1rem;
    border-bottom: 1px solid #e1e1e1;
  }

  .footer .hotLine table tr td:first-child {
    width: 40%;
    text-align: center;
    vertical-align: middle;
  }

  .footer .hotLine table tr td:first-child img {
    width: 0.4rem;
    height: 0.4rem;
    /*margin-top: 0.1rem;*/
  }

  .footer .hotLine table tr td:last-child {
    line-height: 1rem;
  }

  .footer .hotLine table:before {
    content: "";
    position: absolute;
    left: .5rem;
    bottom: -14px;
    border: 6px solid transparent;
    border-top: 8px solid #ccc;
  }

  .footer .hotLine table:after {
    content: "";
    position: absolute;
    left: .5rem;
    bottom: -13px;
    border: 6px solid transparent;
    border-top: 8px solid #fff;
  }

  .footer ul .redPoint {
    position: absolute;
    width: .1rem;
    height: .1rem;
    background: red;
    border-radius: .05rem;
    right: .44rem;
    top: .07rem;
  }

  .footer .add .addOne {
    display: none;
    position: absolute;
    right: 1rem;
    top: .2rem;
    width: .46rem;
    height: .46rem;
    font-size: .28rem;
    text-align: center;
    line-height: .46rem;
    background: red;
    color: #fff;
    border-radius: .23rem;
    -webkit-transform: translateY(-1rem) scale(1);
    transform: translateY(-1rem) scale(1);
    opacity: 1;
  }

  .footer .add .addAnimate {
    animation: addAnimate 0.7s linear;
  }

  .isenroll {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999
  }

  .isenroll .items {
    width: 100%;
    height: 4.54rem;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #fff;
    border-radius: 10px 10px 0 0;
  }

  .isenroll .ma_title {
    width: 100%;
    height: 0.9rem;
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
    line-height: 0.9rem;
    font-size: 0.34rem;
    color: #4B4F63;
  }

  .isenroll .sel {
    height: 2.63rem;
  }

  .isenroll .item {
    padding: 0.44rem 0.4rem 0.3rem;
    font-size: 0.3rem;
    color: #4B4F63;
    overflow: hidden;
    line-height: 0.5rem;

  }

  .isenroll .item div {
    text-align: left;
  }

  .isenroll .check {
    width: 0.32rem;
    height: 0.32rem;
    border: 1px solid #aaa;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    display: inline-block;
    float: left;
    margin-top: 0.08rem;
    margin-right: 0.2rem;
  }

  .footer .hotLine {
    width: 2.44rem;
    background-color: #fff;
    position: absolute;
    left: 0.1rem;
    bottom: 1.2rem;
    border: 1px solid #e1e1e1;
    border-bottom: none;
    font-size: 0.24rem;
  }

  .footer .hotLine table {
    width: 100%;
  }

  .footer .hotLine table tr {
    height: 1rem;
    border-bottom: 1px solid #e1e1e1;
  }

  .footer .hotLine table tr td:first-child {
    width: 40%;
    text-align: center;
  }

  .footer .hotLine table tr td:first-child img {
    width: 0.4rem;
    height: 0.4rem;
    margin-top: 0.1rem;
  }

  .footer .hotLine table:before {
    content: "";
    position: absolute;
    left: .5rem;
    bottom: -14px;
    border: 6px solid transparent;
    border-top: 8px solid #ccc;
  }

  .footer .hotLine table:after {
    content: "";
    position: absolute;
    left: .5rem;
    bottom: -13px;
    border: 6px solid transparent;
    border-top: 8px solid #fff;
  }

  .isenroll .check_is {
    width: 0.36rem;
    height: 0.36rem;
    /*border: 0.02rem solid #aaa;*/
    border-radius: 50%;
    background: url("/bocm/platformjs/static/image/marathon/icon-z.png") no-repeat center;
    background-size: contain;
    display: inline-block;
    float: left;
    margin-right: 0.2rem;
    margin-top: 0.08rem;
    border:none;
    vertical-align: middle;
  }

  .isenroll .item_name {
    display: inline-block;
    margin-left: 0.1rem;
    float: left;
    /*width: 3rem;*/
    height: 0.5rem;
    text-align: left;
    overflow: hidden;
    width: 85%;
  }
.item_name .itemss{
  float: left;
}
.item_name .money{
  float: right;
}
  .next {
    width: 7.5rem;
    height: 1rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    background: #4A90E2;
    line-height: 1rem;
    text-align: center;
  }
</style>
