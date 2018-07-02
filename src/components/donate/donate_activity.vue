<template>
    <div id="donate_activity" class="iphonex-margin-bottom">
      <div v-title="'“爱要让你听见”积分捐赠报名'"></div>

      <loading v-show="loading"></loading>
      <template v-show="!loading">
        <div class="bottom_bg"></div>
        <share @click.native = "showShareImg = false" v-if="showShareImg"></share>
        <img src="/bocm/platformjs/static/image/donate/share_btn8.png" alt="" class="share_img iphonex-publicwel-bottom" @click="shareFn" v-drag>
        <div class="donate_activity_img">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/donate/toutu2.jpg'" alt="" style="width:100%;display: block">
        </div>
        <div class="text-center" style="padding:.25rem;">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/donate/introduce1.png'" alt="" class="introduce1_img">
        </div>
        <div class="article_p text-left light">
          <p>  为贯彻落实总行党委扶贫工作精神，积极响应中央金融团工委关于开展“积分圆梦”公益活动的要求，总行决定于今年在全行开展以公益扶贫为载体、以客户捐赠积分为形式的“爱要让你听见”扶贫项目。项目与中国残疾人福利基金会合作，在陕西咸阳北四县开展耳聋基因筛查检测及贫困地区听力障碍儿童及残疾人助听器捐赠项目。</p>
          <br>
          <p>  本次活动由党务工作部牵头、银行卡中心协同推动落实，资金由我行个人综合积分客户所捐赠的积分（含交易积分、尊享积分）转化而来，两个项目计划于一年内分批次实施完成，项目已经在“中银积分365”积分平台上线。为了发动广大青年员工积极投身志愿公益，总行决定即日起，在全辖开展“爱要让你听见”积分捐赠项目活动的推广。</p>
        </div>
        <div class="text-center" style="padding:.25rem;">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/donate/activity_time1.png'" alt="" class="introduce1_img">
        </div>
        <div style="padding:0 20px">
          <div class="activity_time font30 text-center relative">
            <div style="width:100%;height:100%;color:#4B4E4A">2017年9月10日-2017年11月28日</div>
            <div class="absolute border_special border_special_lt"></div>
            <div class="absolute border_special border_special_lb"></div>
            <div class="absolute border_special border_special_rt"></div>
            <div class="absolute border_special border_special_rb"></div>
          </div>
        </div>
        <div class="text-center" style="padding:.25rem;">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/donate/join3.png'" alt="" class="introduce1_img">
        </div>
        <div class="article_p text-left light">
          <p>客户通过中银积分365、客服等中行积分兑换渠道，捐赠个人积分，通过积分众筹的形式参与公益扶贫行动。</p>
        </div>
        <div style="padding:20px;box-sizing: border-box">
          <div class="relative join_method_container">
            <div class="absolute border_special border_special_lt"></div>
            <div class="absolute border_special border_special_lb"></div>
            <div class="absolute border_special border_special_rt"></div>
            <div class="absolute border_special border_special_rb"></div>
            <div class="join_method" style="width:100%;height:100%;color:#4B4E4A">
              <div class="method_top font28 method1 light">方式一：登录中国银行官方网站进入积分兑换商城</div>
              <div class="method_con">
                <div class="method_con_top clearfix font28">
                  <div class="fl">耳聋基因筛查检测</div>
                  <div class="fr">助听器捐助</div>
                </div>
                <div class="method_con_btn">
                  <div class="clearfix method_btn_top">
                    <div class="fl" @click="_appjs.syJsbLaunchWebview('https://jf365.boc.cn/BOCGIFTORDERNET/getGiftDetails.do?giftNO=IGI1006911040')">交易积分兑换</div>
                    <div class="fr" @click="_appjs.syJsbLaunchWebview('https://jf365.boc.cn/BOCGIFTORDERNET/getGiftDetails.do?giftNO=IGI1006912040')">交易积分兑换</div>
                  </div>
                  <div class="clearfix method_btn_top method_btn_bot">
                    <div class="fl" @click="_appjs.syJsbLaunchWebview('https://jf365.boc.cn/BOCVIP/getGiftDetails.do?giftNO=1000033187&specAreaNo=&priceType=')">尊享积分兑换</div>
                    <div class="fr" @click="_appjs.syJsbLaunchWebview('https://jf365.boc.cn/BOCVIP/getGiftDetails.do?giftNO=1000033188&specAreaNo=&priceType=')">尊享积分兑换</div>
                  </div>
                </div>
              </div>
              <div class="method2 light">方式二：关注中国银行信用卡微信公众号，进入特色服务，选择积分兑换，用积分兑换公益产品</div>
              <div class="method3 light">方式三：手机拨打客服电话<span style="color:#70A460">40066-95566</span>，用积分兑换公益产品</div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/donate/feedback1.png'" alt="" class="introduce1_img">
        </div>
        <div class="feedback light">
          <p>  总行将在“一起善源”平台上统一发起活动，请各分行团委号召员工积极在平台上进行活动报名并登记积分捐赠情况，总行将会把各分行员工捐赠的积分折合公益中国的积分。</p>
        </div>
        <div class="text-center">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/donate/production1.png'" alt="" class="introduce1_img">
        </div>
        <div class="feedback feedback_bot iphonex-margin-bottom light">
          <p>十三五规划吹响了扶贫攻坚的冲锋号。中国银行作为国有大型商业银行，积极落实“担当社会责任，做最好的银行”发展战略，服务社会、贡献社会、回报社会。“爱要让你听见”积分捐赠项目是中国银行协同中国残疾人福利基金会，聚焦残疾人扶贫主题，关爱听障人群，以中国银行对口扶贫的陕西咸阳北四县作为重点地区开展的积分集善工程。</p>
          <br>
          <p>“集善工程-聋人婚育指导”是由中国残疾人福利基金会组织开展的公益项目。是通过对适龄听障婚育人群开展致聋基因筛查，发现遗传性耳聋高危人群、预防听力残疾发生，将耳聋从只能患病后被动干预治疗，转为可以提前主动预防和避免，有效控制听力障碍的发生，实现更大范围内的早发现、早干预，减少和预防耳聋发生，最终将逐步实现减少听力出生缺陷、提高人口素质的目的。</p>
          <br>
          <p>“集善工程-助听助残项目”自2009年启动以来，得到社会各界的积极响应。我国8500多万残疾人中有2000多万听障残疾人，每年新生聋儿约 2.3万人。随着老龄社会的到来，老年听障救治工作逐渐成为新时期听力康复的重要课题。助听工作作为中国残疾人福利基金会的一项长期重点工作，该项目辐射全国31个省市地区，累计救助3万多名听障儿童和听障残疾人，带动地方项目救助听障人士超过32万人，培训1000多名聋儿教师，资助超过100家听力康复机构。</p>
        </div>
        <div class="bottom_btn iphonex-bottom-div font34" :class={disable_btn:btn_bg} @click.stop="go">{{btn_text}}</div>
      </template>

    </div>
</template>

<script>
  import shareImg from '../common/shared_img.vue'
  import loading from '../loading/loading.vue'
  import { Toast } from 'mint-ui';

  export default {
    data(){
        return {
          loading:true,
//          isLogin:false
          isShare:false,
          showShareImg:false,
          cpdonation_id:'',
          btn_text:'我要参加',
          btn_bg:false,
        }
    },
    created(){
      this.isShare = this.$route.query.isShare === 'yes';
      this.cpdonation_id = this.$route.query.cpdonation_id;
//      this.cpdonation_id = 1;
      this.getData()
    },
    methods:{
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=cpdonation_enroll&op=isUnderway&cpdonation_id='+ this.cpdonation_id).then(res=>{
            if(res && res.data){
//              res.data.code = 400
              if(res.data.code == 200){
                if(res.data.content.isUnderway == 1){

                }else{
                  this.btn_bg = true;
                  this.btn_text = '活动已结束'
                }
              }else{
                this.btn_bg = true;
                this.btn_text = '活动已结束'
              }
            }
            this.loading = false;
          })

      },
      go(){
        if(this.btn_bg){
          return false
        }else{
          this._appjs.syJsbLaunchWebview(this.siteInfo.host+ '/bocm/index.php?act=cpdonation&op=donate')
        }
      },
      shareFn(){
        if(this.isShare){
            this.showShareImg = true;
        }else{
          let shareUrl = this.siteInfo.host+ '/bocm/index.php?act=cpdonation&op=donate_activity&isShare=yes';
          let shareText = '关注听障儿童，梦想改变人生，人人公益，从我做起。';
          let shareTitle = '“爱要让你听见”积分捐赠';
          let shareLogo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/donate/fenxiang.jpg';
          let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
          let jsonParam = JSON.stringify(params);
          this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
        }
      }

    },
    components:{'share':shareImg,loading}
  }
</script>

<style lang="scss" scoped>
@import "/bocm/platformjs/static/css/common.css";
  #donate_activity{
    width:100%;
    min-height:100%;
    background: #FFFFF9;
    padding-bottom:1rem;
    color:#4B4E4A
  }
  .light{
    font-weight:300;
  }
  .introduce1_img{
    display: block;
    height:.97rem;
    width:2.51rem;
    margin: 0 auto;
  }
  .article_p p{
    padding: 0 20px;
    text-indent: 2em;
    font-size: .28rem;
    line-height: .4rem;
  }
  .activity_time{
    height:1.4rem;
    line-height: 1.4rem;
    border:1px solid #70A460;
  }
  .border_special{
    width:26px;
    height:26px;
    border:1px solid transparent;
    border-radius:50%;
    background: #fff;
    border-bottom-color: #70A460;
  }
  .border_special_lt{
    left:-15px;
    top:-15px;
    transform: rotate(-45deg);
  }
  .border_special_rt{
     right:-15px;
     top:-15px;
     transform: rotate(45deg);
  }
  .border_special_lb{
    left:-15px;
    bottom:-15px;
    transform: rotate(-135deg);
  }
  .border_special_rb{
    right:-15px;
    bottom:-15px;
    transform: rotate(135deg);
  }
  .join_method_container{
    border:1px solid #70A460;
    padding: 0 20px;
  }
  .join_method{
    padding-bottom:20px;
  }
  .method_top{
    padding-top:20px;
    text-align: left;
  }
  .method_con{
    padding: 0 .34rem;
  }
  .method_con_top{
    padding-top:.4rem;
    font-size: .28rem;
    line-height: .4rem;
    color:#70A460;
  }
  .method_con_top > div{
    width:2.3rem;
    box-sizing: border-box;
    text-align: center;
  }
  .method_btn_top{
    padding-top:.3rem;
  }
  .method_btn_top > div{
    font-size: .26rem;
    width:2.3rem;
    height:.66rem;
    line-height: .66rem;
    color:#70A460;
    border:1px solid #70A460;
    border-radius: .33rem;
    background: #FFFFF9;
  }
  .method_btn_bot > div{
    background: #A6D698;
    border:1px solid #70A460;
    box-sizing: border-box;
    color:#fff;
  }
  .method2,.method3{
    padding-top:.5rem;
    font-size: .28rem;
    text-align: left;
    line-height: .4rem;
  }
  .method1{
    line-height: .4rem;
  }
  .feedback{
    padding:20px;
  }
  .feedback p {
    font-size: .28rem;
    line-height: .4rem;
    text-align: left;
    text-indent: 2em;
  }
  .bottom_btn{
    position: fixed;
    left:0;
    bottom:0;
    width:100%;
    height:1rem;
    line-height: 1rem;
    background: #70A460;
    color:#fff;

  }
  .feedback_bot{
    padding-bottom:.7rem;
  }
  .bottom_bg{
    position: fixed;
    width:100%;
    height:3rem;
    left:0;
    bottom:1rem;
    background: url("/bocm/platformjs/static/image/donate/bottom_bg5.png") left bottom no-repeat;
    background-size: 100% auto;
  }
  .share_img{
    position: fixed;
    width:.8rem;
    height:auto;
    right:.5rem;
    bottom:1.8rem;
    z-index: 100;
  }
  .disable_btn{
    background: #ccc !important;
  }
</style>
