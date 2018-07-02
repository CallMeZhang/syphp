<template>
  <div class="theme-con">
    <div v-title="'专题活动'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="head-products">
          <!--<div class="act-p-top" v-if="showTopBar"></div>-->
          <!--分享之后的顶部bar app下载-->
          <div v-if="isDownload">
            <!--<div v-if="true">-->
            <!--<div>-->
            <div class="fixed" style="z-index: 1999999;background: rgba(0,0,0,.7);width:100%;height:1.2rem;">
              <ul class="clearfix" @click="linkToDownload">
                <!--<li><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/CombinedShapeClose.png'" alt=""></li>-->
                <li class="fl" @click.stop="isDownload = false">
                  <!--<img src="../../../static/image/detail/CombinedShapeClose.png" alt="" style="width:.44rem;height:.44rem;vertical-align: middle;margin:0.38rem 0.12rem;">-->
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/CombinedShapeClose.png'" alt=""
                       style="width:.44rem;height:.44rem;vertical-align: middle;margin:0.38rem 0.12rem;">
                </li>
                <!--<li><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group2_2x.png'" alt=""></li>-->
                <li class="fl">
                  <!--<img src="../../../static/image/detail/Group2_2x.png" alt="" style="width:0.9rem;height:0.92rem;margin:0.14rem 0.12rem 0;">-->
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group2_2x.png'"
                       style="width:0.9rem;height:0.92rem;margin:0.14rem 0.12rem 0;">
                </li>
                <li class="fl">
                  <p style="color:#fff;font-size:.28rem;line-height: 0.4rem;margin-top:0.21rem;">一起善源</p>
                  <p style="color:#B7B7B7;font-size:.24rem;line-height:0.34rem;margin-top:0.03rem;">爱 · 源于善</p>
                </li>
                <li class="fr">
                  <a :href="siteInfo.host+'/boc/index.php'"
                     style="display:inline-block;height:0.72rem;width:2.13rem;font-size:.32rem;line-height:0.72rem;text-align: center;color:#fff;background: #F13E52;border-radius: 0.1rem;margin:0.24rem 0.4rem 0;">立即下载</a>
                </li>
              </ul>
            </div>
            <div style="height:1.2rem;background: #fff;"></div>
          </div>
          <div  class="head-products-con">
            <div class="head-list" v-for="(item,index) in floorList" :key="index">
              <!--<div>抽奖活动</div>-->
              <!--<lottery v-if="index == 1"></lottery>-->
              <!--助理人扶贫日记-->
              <!--<div class="assistants-help" v-if="index == 2">
                <div class="help-title"><img :src="fupinTitle" alt=""></div>
                <ul class="help-list clearfix">
                  <li @click="appjs('syJsbLaunchWebview',zhuLiJumpUrl01)"><img v-lazy="zhuLiImgSrc01" alt=""></li>
                  <li @click="appjs('syJsbLaunchWebview',zhuLiJumpUrl02)"><img v-lazy="zhuLiImgSrc02" alt=""></li>
                  <li @click="appjs('syJsbLaunchWebview',zhuLiJumpUrl03)"><img v-lazy="zhuLiImgSrc03" alt=""></li>
                </ul>
              </div>-->
              <!--第1楼层-->
              <!--楼层商品参数 no_start:活动没开始,或者是非活动商品|no_storage:today_finish售罄|limit_time 没有到达开始抢购时间-->
              <div class="list-item" v-if="pro.floor_type == 1" v-for="(pro,index) in item" :class="pro.floor_type ==1 ?'floor-li':''"><img v-if="pro.floor_image_url == '#'||pro.floor_image_url == ''" v-lazy="pro.show_url" alt=""><img v-else @click="appjs('syJsbLaunchWebview', pro.floor_image_url)" v-lazy="pro.show_url" alt=""></div>
              <div class="list-item" v-if="pro.floor_type == 0" v-for="(pro,index) in item">
                <div class="products-div" v-if="pro.goods_status == 'no_start'" @click="clickDns()"><img v-lazy="pro.show_url" alt=""></div>
                <div class="products-div" v-if="pro.goods_status == 'limit_time'" @click="clickDns()"><img v-lazy="pro.show_url" alt=""></div>
                <div class="products-div" v-if="pro.goods_status == 'can_buy'" @click="appjs('syJsbLaunchWebview', goodsUrl+pro.goods_id)"><img v-lazy="pro.show_url" alt=""></div>
                <div class="products-div" v-if="pro.goods_status == 'no_storage' || pro.goods_status == 'today_finish'"><img v-lazy="pro.show_url" alt=""><img v-lazy="nogoodsUrl" class="nogoods"></div>
              </div>
            </div>
          </div>
        </div>
          <!--<count-down :startTime="begin_time" :endTime="end_time" :dayTxt="'天'" :hourTxt="'时'" :minutesTxt="'分'" :secondsTxt="'秒'"></count-down>-->
        <!--分享按钮-->
          <div v-if="showOutsideShare" class="share-btn iphonex-act-share"  @click="shareFn()"><img :src="share_btn" alt="share"></div>
        <!--浏览器分享-->
        <share-mark v-if="showShareMak" @click.native="showShareMak = false"></share-mark>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  import shareImg from '@/components/common/shared_img.vue'
//  import lottery from '@/components/themeactivities/scratch-off/index.vue'
  import {Toast, MessageBox} from 'mint-ui'
  import appjs from '@/components/appjs/appjs.js'
  import {checkBrowser} from '@/modules/_uajs/browser-id.js'
  import wx_share from '@/assets/js/share.js'
  export default{
    data () {
      return {
        isLoading: true, //loading
        token: '', //登录token
        is_share: false, //分享
        isDownload: false,//top下载条
        down_guide:'0',//后台配置下载引导
        showShareMak: false,//浏览器按钮遮罩
        showOutsideShare:true,//浏览器按钮分享
        share_btn: this.siteInfo.cdn_host + '/bocm/templates/default/assets/images/icon-share.png',//分享按钮
        fupinTitle:'https://cdnt.17shanyuan.com/topic/activity_17_20171211/act_17fupin_t.jpg',//扶贫日记-title
        zhuLiJumpUrl01:'',//助理人01
        zhuLiJumpUrl02:'',//助理人02
        zhuLiJumpUrl03:'',//助理人03
        zhuLiImgSrc01:'https://cdnt.17shanyuan.com/topic/activity_17_20171211/act_17assistants_mani01.jpg',//助理人img
        zhuLiImgSrc02:'https://cdnt.17shanyuan.com/topic/activity_17_20171211/act_17assistants_liukun02.jpg',//助理人img
        zhuLiImgSrc03:'https://cdnt.17shanyuan.com/topic/activity_17_20171211/act_17assistants_zhangming03.jpg',//助理人img
        footer01Url:'https://cdnt.17shanyuan.com/topic/activity_17_20171211/act_17footer01.jpg',//底图01
        footer02Url:'https://cdnt.17shanyuan.com/topic/activity_17_20171211/act_17footer02.jpg',//底图02
        nogoodsUrl:'https://cdnt.17shanyuan.com/topic/20180419/e95dd064e2c0bb45c0e20be9fcd3ec9f653eb717.png',//售罄图片
        floorList:[],//楼层
        goodsUrl:this.siteInfo.host +'/bocm/index.php?act=project&op=project_detail&goods_id=',//商品跳转链接
        floorType:'',//活动0商品1是推广图片
        topicTitle:'',//专题活动标题
        shareDefadultTitle:'一起善源 专题活动',//分享默认title
        shareDefadultDesc:'一起善源 爱 · 源于善',//分享默认描述
        shareDefadultLogo:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png',//分享默认图标
        act_time:'',//活动时间
        topicId: '',//活动id
        topic_id:'',//api ,活动id
        topicInfo:{},//活动信息，含分享
        showTopicDate:'',//活动日期显示
        begin_time:0,
        end_time:0,
        endTimeObj:{year:'',month:'',day:'',h:'',m:'',s:''},
        isApp: false,
      }
    },
    created (){
//            分享
      this.$route.query.is_share == 'yes' ? this.is_share = true : this.is_share = false;
      if(this.$route.query.topic_id){
        this.topicId = this.$route.query.topic_id;
      }
      this.testingPlatform();
      this.getData();
    },
    mounted () {
      //友盟统计
      this.webStatistics();
      this.$nextTick(()=>{
        let pinTai = checkBrowser()
        if(this.$route.query.is_share == 'yes' && (pinTai.isWx || pinTai.isQQ || pinTai.isQZ)){
          this.showOutsideShare = true
        }else if(this.isApp){
          console.log('isApp true')
          this.showOutsideShare = true
        }else{
          console.log('isApp false')
          this.showOutsideShare = false;
        }
      })
    },
    methods: {
      getData () {
        let url = '/api/index.php?act=topic&op=topic_goods_list&topic_id=' + this.topicId
        this.$http.get(this.siteInfo.host + url).then((res) => {
          this.isLoading = false;
          let messages = res.data.messgae;
          if (res.data.code == 200) {
            let con = res.data.content
            this.topicInfo = con.topic_info
//            console.log(this.topicInfo['share_subtitle'])
            this.topicTitle = (con.topic_info.topic_title == '' || con.topic_info.topic_title == null) ? '一起善源':con.topic_info.topic_title
            this.topic_id = con.topic_info.id
            this.down_guide = con.topic_info.down_guide
            this.floorList = con.list
            console.log(this.floorList);
            this.zhuLiJumpUrl01 = this.siteInfo.host + '/bocm/index.php?act=goods&op=agent_poor_goods_list&member_id=101188'
            this.zhuLiJumpUrl02 = this.siteInfo.host + '/bocm/index.php?act=goods&op=agent_poor_goods_list&member_id=27873'
            this.zhuLiJumpUrl03 = this.siteInfo.host + '/bocm/index.php?act=goods&op=agent_poor_goods_list&member_id=94762'
            //测试商品Toast提示
            /*var floorForEach = []
            floorForEach = this.floorList
            for(var i=0,len=floorForEach.length; i< len; i++){
              for(var j=0,childLen = floorForEach[i].length; j < childLen; j++){
                if(floorForEach[i][j] == floorForEach[3][0]){
                  floorForEach[i][j].goods_status = "no_storage"
                }else if(floorForEach[i][j] == floorForEach[3][1]){
                  floorForEach[i][j].goods_status = "today_finish"
                }else if(floorForEach[i][j] == floorForEach[3][2]){
                  floorForEach[i][j].goods_status = "no_storage"
                }else if(floorForEach[i][j] == floorForEach[5][0]){
                  floorForEach[i][j].goods_status = "today_finish"
                }else if(floorForEach[i][j] == floorForEach[5][1]){
                  floorForEach[i][j].goods_status = "no_start"
                }else if(floorForEach[i][j] == floorForEach[5][2]){
                  floorForEach[i][j].goods_status = "limit_time"
                }else if(floorForEach[i][j] == floorForEach[5][3]){
                  floorForEach[i][j].goods_status = "no_start"
                }else if(floorForEach[i][j] == floorForEach[5][5]){
                  floorForEach[i][j].goods_status = "today_finish"
                }else if(floorForEach[i][j] == floorForEach[5][6]){
                  floorForEach[i][j].goods_status = "no_storage"
                }else if(floorForEach[i][j] == floorForEach[5][7]){
                  floorForEach[i][j].goods_status = "today_finish"
                }else if(floorForEach[i][j] == floorForEach[5][8]){
                  floorForEach[i][j].goods_status = "no_storage"
                }
              }
            }
            console.log(floorForEach)
            this.floorList = floorForEach*/
            document.title = this.topicTitle;
            this._appjs.syJsbSetTitleText(this.topicTitle);
            this.begin_time = parseInt(con.topic_info.begin_time);
            this.end_time = parseInt(con.topic_info.end_time);

            // 微信二次分享
            setTimeout(() => {
              let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=topic&op=welfareday&topic_id=' + this.topic_id+"&is_share=yes";
              let shareText = (this.topicInfo.share_subtitle == '' ||this.topicInfo.share_subtitle == undefined) ?this.shareDefadultDesc : this.topicInfo.share_subtitle;
              let shareTitle = (this.topicInfo.share_title == '' || this.topicInfo.share_title ==undefined) ? this.shareDefadultTitle : this.topicInfo.share_title;
              let shareLogo = (this.topicInfo.share_icon_url == '' ||this.topicInfo.share_icon_url == undefined) ? this.shareDefadultLogo : this.topicInfo.share_icon_url;
              let params = {url: shareUrl, title: shareTitle, text: shareText, logo: shareLogo};
              wx_share(params)
            },100)

          } else if (res.data.code == 400) {
            Toast({
              message: messages,
              position: 'center',
              duration: 2000
            });
          }else{
            Toast({
              message: messages,
              position: 'center',
              duration: 2000
            });
          }
        }).then(()=>{
          if(this.is_share || !this.isApp){
            if(this.down_guide == 1){
              this.isDownload = true;
            }else{
              this.isDownload = false;
            }
          }
        })
      },
      shareFn () {//分享
        if (this.is_share || !this.isApp) {
//          console.log('shareFn app 外')
          let pt = checkBrowser();
          if(pt.isWx || pt.isQQ || pt.isQZ){
            this.showShareMak = true;
          }
        } else {
//          console.log('app内分享')
          let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=topic&op=welfareday&topic_id=' + this.topic_id+"&is_share=yes";
          let shareText = (this.topicInfo.share_subtitle == '' ||this.topicInfo.share_subtitle == undefined) ?this.shareDefadultDesc : this.topicInfo.share_subtitle;
          let shareTitle = (this.topicInfo.share_title == ''|| this.topicInfo.share_title ==undefined) ? this.shareDefadultTitle : this.topicInfo.share_title;
          let shareLogo = (this.topicInfo.share_icon_url == '' ||this.topicInfo.share_icon_url == undefined) ? this.shareDefadultLogo : this.topicInfo.share_icon_url;
          let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
          let jsonParam = JSON.stringify(params);
          this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
        }
      },
      goToUrl(url){
        window.location.href = url;
//        this._appjs.syJsbCloseAppPage
      },
      jumpUrl(){
        this._appjs.syJsbLaunchWebview(url);
//        this._appjs.syJsbCloseAppPage()
      },
      appjs(method, params = ''){
        params = this.escape2Html(params);
        appjs(method, params);
      },
      clickDns(){
        Toast({
          message: '活动未开始',
          position: 'center',
          duration: 2000
        });
      },
      escape2Html(str) {
        let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
      },
      checkTime(t){//时间个位补0
        t<0 ? t= "0"+t : t=t;
        return t;
      },
      webStatistics(){
        //  友盟pv统计
        let cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(unescape("%3Cspan style='visibility:hidden;position:absolute;left:0;bottom:0;z-index:-1;' id='cnzz_stat_icon_1261993546'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1261993546%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));
      },
      jumpLogin() {
        let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=topic&op=welfareday&topic_id='+this.topicId);
        window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl;
      },
      getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
          return unescape(arr[2]);
        }else{
          return null;
        }
      },
      testingPlatform (){
        let _that = this;
        this._appjs.syJsbGetAppInfo(function (appInfo) {
          if (appInfo) {
            _that.isApp = true;
//            console.log(appInfo);
          } else {
            _that.isApp = false;
//            console.log(appInfo);
          }
//          return _that.isApp;
        });

        //控制分享按钮
        setTimeout(()=>{
            let pinTai = checkBrowser()
            if(this.$route.query.is_share == 'yes' && (pinTai.isWx || pinTai.isQQ || pinTai.isQZ)){
                this.showOutsideShare = true
            }else if(this.isApp){
//                console.log('isApp true')
                this.showOutsideShare = true
            }else{
//                console.log('isApp false')
                this.showOutsideShare = false;
            }
        },200)
      },
      linkToDownload(){
        window.location.href= this.siteInfo.host+'/boc/index.php'
      },
    },
    components: {
      "loading": loading,
      "share-mark": shareImg,
//      'lottery':lottery,
    }
  }
</script>
<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";
  $white: #fff;
  $timeFont:#fff;
  $actBg:#ececf4;
  $gradual: -webkit-linear-gradient(left, #4b0170, #5a0676, #6a097d, #4b0170);
  img{display:inline-block;border:none;}
  .theme-con {
    width: 7.5rem;
    margin: 0 auto;
    /*background:url("https://cdnt.17shanyuan.com/topic/activity_17_20171211/act_bg2.jpg") repeat-y center;
    background: #a8272b;*/
    background: none;
  }
  .none{
    display:none;
  }
  /*头图*/
  .act-banner{
    width:7.5rem;
    height:100%;
    margin:0 auto;
  }
  .head-products{
    width:7.5rem;
  }
  .head-products-con{
    width:7.5rem;
    overflow:hidden;
  }
  .act-p-top{
    padding-top: 1.2rem;
  }

  /*商品list*/
  .head-list{
    position:relative;
    display: flex;
    width:7.5rem;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .list-item{
    position:relative;
    display:block;
    width:33.33%;
    font-size:0;
    .products-div{
    }
    img{
      display:block;
      width:100%;
      height:100%;
      vertical-align: middle;
    }
    .nogoods {
      width: 2.1rem;
      height: 2.1rem;
      position: absolute;
      top: 50%;
      left: 51%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
  .floor-li{
    width:100%;
    font-size:0;

    /*margin-top:-1px;*/
  }
  /*助理人*/
  .assistants-help{
    width:7.5rem;
    .help-title{
      width:7.5rem;
      img{
        width:100%;
      }
    }
    .help-list{
      width:7.5rem;
      li{
        width:33.3%;
        float:left;
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
  .margin-bot0{
    margin-bottom:0;
  }
  .share-btn {
    position: fixed;
    right: 0.5rem;
    bottom: 0.8rem;
    width: 1rem;
    height: 1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
