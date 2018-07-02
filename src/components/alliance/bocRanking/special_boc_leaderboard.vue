<template>
  <div class="indie-leaderboard">
    <div v-title="'公益消费扶贫光荣榜'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading" class="indie-leaderboard-con">
        <!--员工人均消费-->
        <div class="actives" v-if="orderAvgList.length">
          <div class="achiTit" @click="_appjs.syJsbLaunchWebview(consumptionGoUrl)">
            <div class="achiTitCon clearfix">
              <div class="line"></div>
              <div class="title">
                <h2 class="title-h2">人均消费光荣榜</h2>
                <!--<p class="time">员工累计人均公益消费最多的单位</p>-->
              </div>
              <div class="achiAow fr">
                <img src="../../../../static/image/marathon/icon-arw.png" alt="箭头">
              </div>
            </div>
          </div>
          <div class="activeContent">
            <div class="activeCon">
              <div class="for-li" v-for="(item,index) in orderAvgList">
                <div class="titContent clearfix">
                  <div class="left fl">
                    <span class="pubColor fl num">{{index | indexNum}}</span>
                    <span class="adress">{{item.circle_name}}</span>
                  </div>
                  <div class="right fr">
                    <span class="pubColor">{{item.count_num}}</span>
                    <span>元/人</span>
                  </div>
                </div>
                <!--progress-->
                <!--<div class="redLine">
                  <p v-if="Number(orderAvgList[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     :style="{width:100*item.count_num/orderAvgList[0].count_num+'%'}"></p>
                  <p v-if="!Number(orderAvgList[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     style="width: 0%"></p>
                </div>-->
              </div>
            </div>
            <div class="activeFoo">
              <span class="line"></span>
              <p><span>{{unionName}}</span>累计人均消费金额<span class="gray">{{full_total_pay_order_avg}}</span>元</p>
              <span class="line"></span>
            </div>
          </div>
        </div>
        <!--boc集采平均消费-->
        <div class="actives" v-if="bocBizOrderAvgList.length">
          <div class="achiTit" @click="_appjs.syJsbLaunchWebview(bocCollectiveUrl)">
            <div class="achiTitCon clearfix">
              <div class="line"></div>
              <div class="title">
                <h2 class="title-h2">集采人均消费光荣榜</h2>
                <!--<p class="time">员工累计人均公益消费最多的单位</p>-->
              </div>
              <div class="achiAow fr">
                <img src="../../../../static/image/marathon/icon-arw.png" alt="箭头">
              </div>
            </div>
          </div>
          <div class="activeContent">
            <div class="activeCon">
              <div class="for-li" v-for="(item,index) in bocBizOrderAvgList">
                <div class="titContent clearfix">
                  <div class="left fl">
                    <span class="pubColor fl num">{{index | indexNum}}</span>
                    <span class="adress">{{item.circle_name}}</span>
                  </div>
                  <div class="right fr">
                    <span class="pubColor">{{item.count_num}}</span>
                    <span>元/人</span>
                  </div>
                </div>
                <!--progress-->
                <!--<div class="redLine">
                  <p v-if="Number(orderAvgList[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     :style="{width:100*item.count_num/orderAvgList[0].count_num+'%'}"></p>
                  <p v-if="!Number(orderAvgList[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     style="width: 0%"></p>
                </div>-->
              </div>
            </div>
            <div class="activeFoo">
              <span class="line"></span>
              <p><span>{{unionName}}</span>累计人均消费金额<span class="gray">{{full_total_biz_pay_order_avg}}</span>元</p>
              <span class="line"></span>
            </div>
          </div>
        </div>
        <!--个人扶贫光荣榜-->
        <div class="ranking-con">
          <div class="achiTit department-white" @click="_appjs.syJsbLaunchWebview(integralGoUrl)">
            <div class="achiTitCon clearfix">
              <div class="line"></div>
              <div class="title">
                <h2>个人扶贫光荣榜</h2>
                <p class="time">本排名每天更新一次</p>
              </div>
              <div class="achiAow fr">
                <img src="../../../../static/image/marathon/icon-arw.png" alt="箭头">
              </div>
            </div>
          </div>
          <div class="ranking-list" v-for="(list, index) in orderPointsList" :key="index" @click="valIndex=-1;showToast(index)">
            <div class="left-con"><span :class="[{top1:list.member_rank == 1,top2:list.member_rank == 2,top3:list.member_rank == 3}]"></span><img :src="list.member_avatar" alt="photo"></div>
            <div class="right-con">
              <div class="right-con-l">
                <p>{{list.member_truename}}</p>
                <p>{{list.boc_points}}积分</p>
              </div>
              <div class="right-con-c">{{list.circle_name}}</div>
              <div class="right-con-r">第{{index+1}}名</div>
            </div>
            <!--toast-->
            <div class="ranking-t" :class="{'ranking-toast':valIndex == index}">{{list.circle_name}}</div>
          </div>
          <div class="activeFoo pad-bg">
            <span class="line"></span>
            <p><span>{{unionName}}</span>个人扶贫光荣榜</p>
            <span class="line"></span>
          </div>
        </div>

        <!--分享按钮-->
        <div v-if="showOutsideShare" class="share-btn" @click="shareFn()" ><img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/syShop/icon-share.png'" alt=""></div>
        <!--分享遮罩-->
        <share-img v-if="showShareMak" @click.native="showShareMak = false"></share-img>
      </div>
    </transition>

  </div>
</template>
<script>
  import wx_share from '@/assets/js/share.js'
  import {checkBrowser} from '@/modules/_uajs/browser-id.js'
  import {Toast} from 'mint-ui';
  import shareImg from '@/components/common/shared_img.vue'
  import loading from '@/components/loading/loading.vue'
  export default{
    data (){
      return {
        isLoading: true,
        is_share:false,
        isApp: false,
        showShareMak: false,//浏览器按钮遮罩
        showOutsideShare:true,//浏览器按钮分享
        union_id: '', //跳转接口Id
        unionName:'',//公益联盟name
        union_channel:'',//联盟名称
        unionDescr:'',//联盟描述
        currentTitle: '', //当前页title
        addRegister:'', //累计注册
        full_total_pay_order_avg: '',//人均消费累计金额
        full_total_biz_pay_order_avg: '',//集采人均累计消费
        goUrl: '',
        bocCollectiveUrl:'',//累计注册跳转
        consumptionGoUrl:'',//人均消费跳转
        integralGoUrl:'',//积分排名跳转
        ranking_url: '',
        web_share: '', //二次分享
        circleId:'',//
        bocBizOrderAvgList:[],//集采平均消费
        orderAvgList:[],//评价金额
        orderPointsList:[],//积分排行
        appIcon: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png',//app icon
        shareIcon: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/union/statistics.png',//统计 icon
        valIndex:Number,
      }
    },
    created (){
      this.web_share = this.$route.query.web_share || '';
      this.union_id = this.$route.query.union_id || '';
      this.union_channel = this.$route.query.union_channel || '';
      this.circleId = this.$route.query.circle_id || '';
      this.bocCollectiveUrl = this.siteInfo.host +'/bocm/index.php?act=union&op=special_boc_dept_biz_order_avg_rank_list&circle_id=' + this.circleId;
      this.consumptionGoUrl = this.siteInfo.host + '/bocm/index.php?act=union&op=special_boc_dept_order_avg_rank_list&circle_id='+ this.circleId;
      this.integralGoUrl = this.siteInfo.host + '/bocm/index.php?act=union&op=special_boc_dept_points_rank_list&circle_id=' + this.circleId;
      this.requestDate();
      this.testingPlatform();
      setTimeout(()=>{
        this.shareSecond()
      },100)
    },
    filters: {
      indexNum: function (val) {
        val = (val + 1) > 9 ? (val + 1) : '0' + (val + 1)
        return val
      },
      registnum: function (val) {
        val = val > 100 ? 100 : val
        return val
      }
    },
    mounted (){
      this.$nextTick(function(){
        this.showOutsideShare = true;
      })
    },
    methods: {
      requestDate () {
        let url = this.siteInfo.host + '/api/index.php?act=union&op=get_special_dept_rank_info&circle_id='+this.circleId;
//        let url = 'https://www.17shanyuan.com/api/index.php?act=union&op=get_special_dept_rank_info&circle_id='+this.circleId;
        this.$http.get(url).then((res) => {
          if(res && res.data.code == 200){
            let content = res.data.content;
            this.isLoading = false;
            this.unionName = res.data.content.circle_info.circle_name;
            document.title = this.unionName + '公益消费扶贫光荣榜';
            this._appjs.syJsbSetTitleText(this.unionName + '公益消费扶贫光荣榜');
            this.addRegister = content.circle_info.full_total_member;
            this.full_total_pay_order_avg = content.circle_info.full_total_pay_order_avg
            this.full_total_biz_pay_order_avg = content.circle_info.full_total_biz_pay_order_avg
//            集采人均累计消费
            this.bocBizOrderAvgList = content.biz_order_avg_list.slice(0,10);
//          人均消费
            this.orderAvgList = content.order_avg_list.slice(0,10);
//          积分排名
            this.orderPointsList = content.order_points_list.slice(0,10);
          }

        },(error)=>{
          console.log(error)
        })
      },
      toast(str){
        Toast({message: str,position: 'center',duration: 1500});
      },
      showToast(index){
        this.$nextTick(()=>{
          this.valIndex = index;
          let _that = this;
          setTimeout(()=>{
            _that.valIndex = -1;
          },2000)
        })
      },
      shareFn(){
        if(this.web_share == 'yes' || !this.isApp){
          let pt = checkBrowser();
          if(pt.isWx || pt.isQQ || pt.isQZ){
            this.showShareMak = true;
          }
        }else{
          let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=union&op=special_boc_dept_rank_info&circle_id=' + this.circleId + '&web_share=yes';
          let shareText = '人均消费光荣榜、集采人均消费光荣榜、个人扶贫光荣榜。';
          let shareTitle = this.unionName + '公益消费扶贫光荣榜';
          let shareLogo = this.shareIcon;
          let smsContent = this.unionName + '公益消费扶贫光荣榜，请您点击查看：'+shareUrl+'  本数据由公益中国提供。';
          let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo, sms: smsContent};
          let jsonParam = JSON.stringify(params);
          this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
        }
      },
      shareSecond(){
        let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=union&op=special_boc_dept_rank_info&circle_id=' + this.circleId + '&web_share=yes';
        let shareText = '人均消费光荣榜、集采人均消费光荣榜、个人扶贫光荣榜。';
        let shareTitle = this.unionName + '公益消费扶贫光荣榜';
        let shareLogo = this.shareIcon;
        let params2 = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        wx_share(params2)
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
        console.log("app: " + _that.isApp)
        //控制分享按钮
        setTimeout(()=>{
          let pinTai = checkBrowser()
          if(this.$route.query.web_share == 'yes' && (pinTai.isWx || pinTai.isQQ || pinTai.isQZ)){
            this.showOutsideShare = true
          }else if(_that.isApp){
            this.showOutsideShare = true
          }else{
            this.showOutsideShare = false;
          }
        },200)
      },
    },
    components:{
      'sy-loading': loading,
      'share-img':shareImg,
    }

  }
</script>
<style lang="scss" scoped>
  @import "../../../../static/css/common.css";
  .indie-leaderboard{
    width: 100%;
  }
  .indie-leaderboard-con{
    padding-bottom: 0.68rem;
    position: relative;
  }
  .achiTit {
    padding: .53rem 0 .28rem;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }

  .achiTit .line {
    float: left;
    width: .16rem;
    height: .7rem;
    background-color: #4A90E2;
  }

  .achiTit .title {
    float: left;
    margin-left: .14rem;
    text-align: left;
  }

  .achiTit .title h2 {
    color: #606060;
    font-size: .34rem;
  }
  .achiTit .title .title-h2{
    margin-top:0.18rem;
  }
  .achiTit .title p {
    padding-top: .14rem;
    color: #b1b1b1;
    font-size: .24rem;
  }

  .achiTit .achiAow {
    width: 0.6rem;
    height: 0.4rem;
    margin-top: 0.15rem;
  }

  .achiTit .achiAow img {
    height: 0.4rem;
    width: 0.25rem;
  }

  .achiTitCon {
    position: relative;
  }

  .achiTitCon .supermarket {
    position: absolute;
    top: 50%;
    margin-top: -0.18rem;
    right: 0.3rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    color: #4A90E2;
    font-weight: 300;
    padding: 0 0.12rem;
    border: 1px solid #4A90E2;
    border-radius: 0.18rem;
  }

  .achiTitCon .supermarket div {
    position: relative;
    overflow: hidden;
    height: 0.36rem;
    line-height: 0.36rem;
  }

  .achiTitCon .supermarket div img {
    display: inline-block;
    float: right;
    margin-top: 0.06rem;
    width: 0.12rem;
    height: 0.2rem;
    margin-left: 0.12rem;
  }


  .achiNum ul {
    padding-bottom: .2rem;
  }

  .achiNum li {
    float: left;
    margin-top: .25rem;
    width: 33.3%;
    text-align: left;
  }

  .achiNum .union-sale {
    float: left;
    margin-top: .25rem;
    width: 33.3%;
    padding-right: 0.3rem;
    text-align: left;
    box-sizing: border-box;
    overflow: hidden;
  }

  .achiNum li p {
    padding-bottom: .15rem;
    color: #999;
    font-size: .22rem;
    width: 100%;
    overflow: hidden;
  }

  .achiNum li .red {
    color: #4A90E2;
    font-weight: 600;
    font-size: .32rem;
  }

  .achiNum li h2 {
    color: #606060;
    font-size: .26rem;
  }

  .achiOpen img, .achiStop img {
    position: absolute;
    top: 50%;
    margin-top: -.05rem;
    margin-left: .06rem;
    width: .24rem;
    height: .12rem;
  }


  .actives {
    margin-top: .2rem;
    background-color: #fff;
  }

  .actives .activeCon {
    padding: 0 .3rem .45rem .32rem;
  }

  .activeCon li {
    margin-top: .3rem;
    text-align: left;
  }

  .tit {
    color: #999;
    font-size: .26rem;
  }

  .red {
    color: #f13e52;
  }

  .activeCon .tit span:first-child {
    margin-right: .23rem;
    font-weight: 600;
  }

  .activeCon .tit span:nth-child(2) {
    display: inline-block;
    overflow: hidden;
    width: 60%;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .24rem;
  }

  .activeCon .tit span:nth-child(4) {
    display: inline-block;
    width: 18%;
    text-align: right;
  }

  .redLine {
    margin-top: .15rem;
    margin-left: .5rem;
    width: 90%;
    height: .1rem;
    border-radius: .1rem;
  }

  /*.redLine p{width:50%;height:100%;border:1px solid #f13e52;border-radius:.1rem;background:rgba(241,62,82,.6);}*/
  /*for-li*/
  .activeCon .for-li {
    margin-top: 0.3rem;
    text-align: left;
  }

  .activeCon .for-li:nth-child(1) .redLine p, .activeCon .for-li:nth-child(2) .redLine p, .activeCon .for-li:nth-child(3) .redLine p {
    background-color: rgba(74, 144, 226, .6);
  }

  .activeFoo {
    padding-bottom: .36rem;
    color: #b1b1b1;
    text-align: center;
    font-size: .22rem;
  }
  .pad-bg{padding-top:0.36rem;background:#fff;}
  .activeFoo .line {
    width: .5rem;
    height: .02rem;
    background-color: #b1b1b1;
    vertical-align: middle;
  }

  .activeFoo .line, .activeFoo p {
    display: inline-block;
  }

  .activeFoo .gray {
    color: #3f3f3f;
  }

  .display-show {
    display: block;
  }

  .display-hide {
    display: none;
  }

  .for-li {
    text-align: left;
    margin-bottom: 0.3rem;
  }

  span {
    color: #999;
    font-size: .26rem;
  }

  .pubColor {
    color: #4A90E2;
    font-weight: 600;
  }

  .num {
    margin-right: 0.23rem;
    line-height: 0.33rem;
  }

  .adress {
    width: 4.3rem;
    font-size: 0.24rem;
    line-height: 0.33rem;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .redLine {
    margin-top: .15rem;
    margin-left: .5rem;
    width: 90%;
    height: .1rem;
    border-radius: .1rem;
  }

  .progress {
    width: 100%;
    height: 100%;
    border: 1px solid #4A90E2;
    border-radius: .1rem;
    background: rgba(74, 144, 226, .6);
  }

  .bg-light {
    background: #edf4fc;
  }
  .department-white{margin-top:0.2rem;background-color:#fff;}

  .activeFoo span {
    font-size: 0.22rem;
  }
  .fr{float:right;}
  .fl{float:left;}
  .ranking-list{
    position:relative;
    display:flex;
    flex-flow: row wrap;
    height: 1.16rem;
    padding: 0 0.3rem;
    background:#fff;
  }
  .ranking-list .left-con{
    position:relative;
    display:flex;
    justify-content: center;
    flex-flow:row nowrap;
    align-items: center;
    width: 0.8rem;
    height: 1.16rem;
    padding-top:0.1rem;
    .top1{
      position:absolute;
      top:0.1rem;
      left:50%;
      transform: translateX(-50%);
      display:flex;
      width:0.36rem;
      height:0.26rem;
      background:url("../../../../static/image/default/top1.png")no-repeat;
      background-size:cover;
    }
    .top2{
      position:absolute;
      top:0.1rem;
      left:50%;
      transform: translateX(-50%);
      display:flex;
      width:0.36rem;
      height:0.26rem;
      background:url("../../../../static/image/default/top2.png")no-repeat;
      background-size:cover;
    }
    .top3{
      position:absolute;
      top:0.1rem;
      display:flex;
      left:50%;
      transform: translateX(-50%);
      width:0.36rem;
      height:0.26rem;
      background:url("../../../../static/image/default/top3.png")no-repeat;
      background-size:cover;
    }
    img{
      width: 0.8rem;
      height: 0.8rem;
      border-radius:50%;
    }
  }
  .ranking-list .right-con{
    display:flex;
    justify-content: space-between;
    align-items: center;
    flex:1;
    padding-top:0.1rem;
    font-size: 0.26rem;
    line-height: 0.4rem;
    color:#333;
    padding-left:0.24rem;
    border-bottom:1px solid #e0e0e0;
  }
  .ranking-list .border0{border:none;}
  /*.ranking-list .right-con:last-child{border-bottom:none;}*/
  .right-con .right-con-l{
    width: 2.4rem;
    text-align:left;
    p{
      width: 2.4rem;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
    }
  }
  .right-con .right-con-c{
    display:flex;
    flex:1;
    height: 0.8rem;
    justify-content: center;
    align-items: flex-start;
    line-height: 0.4rem;
    text-align:left;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .right-con .right-con-r{
    width: 1.8rem;
    text-align: right;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .indie-leaderboard-con .share-btn{
    position: fixed;
    right: .3rem;
    top: 80%;
    width: .9rem;
    height: .9rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .ranking-t{
    display:none;
    visibility: hidden;
    position:absolute;
    padding:0.1rem;
    left:50%;
    top:50%;
    max-width:4rem;
    font-size:0.24rem;
    line-height:0.36rem;
    color:#fff;
    transform:translate(-50%,-50%);
    background:rgba(0,0,0,0.5);
    border-radius:0.08rem;
  }
  .ranking-toast{
    display:block;
    visibility: hidden;
    animation: tip-toast ease 2s;
  }
  @keyframes tip-toast {
    0% {
      visibility: visible;
    }
    25% {
      visibility: visible;
    }
    50% {
      visibility: visible;
      opacity: 1;
    }
    75% {
      visibility: visible;
    }
    100% {
      visibility: hidden;
      opacity: 0;
    }
  }
</style>
