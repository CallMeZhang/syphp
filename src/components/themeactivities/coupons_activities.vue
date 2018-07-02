<template>
  <div>
    <div v-title="'岁末积分兑好礼'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div class="coupons-con" v-show="!isLoading">
        <div class="con-top">
          <div class="banner01"><img v-lazy="this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/banner_new_top.jpg'" alt="banner01加载中……"></div>
          <!--<p class="con-top-descr i-red"><i>衷心感谢您<br/>这一年对公益扶贫事业的支持</i></p>-->
          <div class="con-top-img-descr"><img v-lazy="this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/new_tip.jpg'" alt="banner01加载中……"></div>
        </div>
        <div class="con-center">
          <div class="txt-title"><img v-lazy="this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/c_new_title1.jpg'" alt=""></div>
          <div class="txt-descr red-color">优惠券可购买大爱超市所有产品，每个ID只能兑换一张，数量有限，先到先得！</div>
          <div class="chunk-con">
              <div class="chunk-bg" v-for="(item, index) in coupons">
                <img v-lazy="item.img_src" alt="coupons">
                <button v-if="isShare" class="quan-btn quan-btn-share" @click="shareOuter(item.key_id, 'yes')">{{coupons_txt.click_get}}</button>
                <div v-else>
                  <button v-if="item.btn_txt == '立即使用'" class="quan-btn quan-btn-use"  @click="goDaAiMarket()">{{item.btn_txt}}</button>
                  <button v-else class="quan-btn quan-new-color" :class="item.is_no_bg == true ?'quan-btn-no':''" @click="clickCouponsBtn(item.voucher_t_id, index, item.key_id, item.isSaleOut, item.received)">{{item.btn_txt}}</button>
                </div>

              </div>
          </div>
          <div class="txt-title"><img v-lazy="this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/c_new_title2.jpg'" alt=""></div>
          <div class="txt-descr red-color">2018年1月18日12:00开启兑换限量200份，先到先得！</div>
        </div>

        <div class="con-center-banner">
          <div class="banner02"><img v-lazy="this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/banner_center02.jpg'" alt=""></div>
          <div class="sy-con">
            <h3 class="sy-con-title">消耗300积分</h3>
            <button class="sy-con-btn" @click="skipWayOld(sy_skip_url, sy_key, goods_sold_out1)">立即兑换</button>
          </div>
          <!--羽绒服-->
          <div class="products-con">
            <div class="pro-title"><img v-lazy="this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/c_new_title3.jpg'" alt=""></div>
            <div class="txt-descr red-color">2018年1月23日12:00开启限量兑换，数量有限，先到先得！</div>
            <div class="products-list">
              <div class="products-l" v-for="single in productList">
                <div class="top"><img v-lazy="single.product_img" alt="product加载中…"></div>
                <p class="txt">{{single.product_title}}</p>
                <p class="num"><span>{{single.product_integration}}</span><sup>积分</sup></p>
                <button class="btn" @click="skipWay(single.skip_url, single.click_key, single.sold_out)">立即兑换</button>
              </div>

            </div>
          </div>
          <!--邀请好友-->
          <div class="banner03"><img v-lazy="this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/coupons_invite2.jpg'" alt=""><button class="at-once-yq" @click="shareFn()"></button></div>
        </div>
        <!--规则-->
        <div class="con-bottom padding-b-26">
          <div class="con-bottom-title"><img v-lazy="this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/coupons_title3.jpg'" alt=""></div>
          <p class="bottom-headline">1.兑换方式</p>
          <p class="headline-descr">登录一起善源APP，查看个人公益积分，满足积分条件，即可在活动页面兑换奖品。</p>
          <p class="bottom-headline">2.兑换奖品</p>
          <p class="headline-descr"><span class="num">1</span>一重好礼：满50积分，可兑换大爱超市优惠券5元（无门槛使用）；</p>
          <p class="headline-descr"><span class="num">2</span>一重好礼：满100积分，可兑换大爱超市优惠券10元（无门槛使用）；</p>
          <p class="headline-descr"><span class="num">3</span>一重好礼：满200积分，可兑换大爱超市优惠券20元（无门槛使用）；</p>
          <p class="headline-descr"><span class="num">4</span>二重好礼：满300积分，可兑换春节礼包。</p>
          <p class="headline-descr"><span class="num">5</span>三重好礼：纯积分兑换善源好礼。</p>
          <p class="headline-descr">优惠券有效期至2月5日，可在大爱超市无门槛使用，不可叠加使用。</p>
          <p class="bottom-headline">3.兑换时间：1月17日-1月29日</p>
          <p class="bottom-headline">4.奖品查询</p>
          <p class="headline-descr">兑换的优惠券可在我的-卡券包中查看。</p>
          <p class="headline-descr">实物奖品兑换成功后可在我的订单查询，奖品将在2月10日前发出。</p>
          <p class="bottom-headline">5.活动最终解释权归本公司所有。</p>
        </div>
        <!--app下载-->
        <share-top-bar v-if="topDownloadApp"></share-top-bar>
        <!--app外分享-->
        <share-img v-if="is_share_img" @click.native ="is_share_img=false"></share-img>
      </div>
    </transition>

  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  import shareTopBar from '@/components/common/arouse_app.vue'
  import shareImg from '@/components/common/shared_img.vue'
  import {Toast} from 'mint-ui'
  import wx_share from '@/assets/js/share.js'
  export default{
    data () {
      return {
        isLoading:true,//加载动画
        isShare: false,//分享
        is_share_img:false,//分享遮罩
        topDownloadApp: false,//top下载bar
        isLogin:false,//是否登录
        shareDefaultLogo:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png',//分享默认图标
        shareNewLogo:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/share_logo3.jpg',//分享新图标
        shareDefaultTitle:'岁末积分限时抢兑',//分享默认title
        shareDefaultDesc:'囤了一年的公益积分，看看能兑换什么岁末好礼吧！',//分享默认描述
        activity_id: 0, //活动id
        coupons:[
          {
            voucher_t_id:"583",
            key_id:"points_activity_redis_key_five",
            img_src:this.siteInfo.cdn_host +'/bocm/platformjs/static/image/activities/coupons/coupons_5.jpg',
            btn_txt:"点击兑换",
            is_red_bg:false,
            is_no_bg:false,//灰色背景
            isSaleOut:false,//是否抢光 true 代表抢光
            received:false,//是否被领取过
          },{
            voucher_t_id:"584",
            key_id:"points_activity_redis_key_ten",
            img_src:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/coupons_10.jpg',
            btn_txt:"点击兑换",
            is_red_bg:false,
            is_no_bg:false,//灰色背景
            isSaleOut:false,
            received:false,
          },{
            voucher_t_id:"585",
            key_id:"points_activity_redis_key_twenty",
            img_src:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/coupons/coupons_20.jpg',
            btn_txt:"点击兑换",
            is_red_bg:false,
            is_no_bg:false,//灰色背景
            isSaleOut:false,
            received:false,
          }
        ],
        couponsInfo:{},//优惠券是否抢光
        couponsReceived:[],//是否已领取优惠券
        click_bg:false,
        click_index:0,//点击成功执行1次
        sy_skip_url:this.siteInfo.host + '/bocm/index.php?act=project&op=project_detail&from_type=syShop&gc_id=990898',//善源商场跳转链接
        sy_key:'points_activity_redis_key_syshop',//善源商场按钮统计key
        goods_sold_out1:false,//春节好礼是否兑换完
        productSoldOut:{},//是否兑换完
        productList:[
          {
            product_title:'阿依莲荷叶边长羽绒服',
            product_integration:'1590',
            product_img:this.siteInfo.cdn_host+'/bocm/platformjs/static/image/activities/coupons/products_03.jpg',
            skip_url:this.siteInfo.host + '/bocm/index.php?act=project&op=project_detail&from_type=syShop&gc_id=991128',
            click_key:'points_activity_redis_key_feather_one',
            sold_out:false,
          },
          {
            product_title:'优衣库制造男装高级羽绒外套',
            product_integration:'1690',
            product_img:this.siteInfo.cdn_host+'/bocm/platformjs/static/image/activities/coupons/products_04.jpg',
            skip_url:this.siteInfo.host + '/bocm/index.php?act=project&op=project_detail&from_type=syShop&gc_id=991126',
            click_key:'points_activity_redis_key_feather_two',
            sold_out:false,
          },
          {
            product_title:'优衣库制造男装高级羽绒外套',
            product_integration:'1690',
            product_img:this.siteInfo.cdn_host+'/bocm/platformjs/static/image/activities/coupons/products_05.jpg',
            skip_url:this.siteInfo.host + '/bocm/index.php?act=project&op=project_detail&from_type=syShop&gc_id=991127',
            click_key:'points_activity_redis_key_feather_three',
            sold_out:false,
          },
          {
            product_title:'优衣库制造男装高级羽绒外套',
            product_integration:'1690',
            product_img:this.siteInfo.cdn_host+'/bocm/platformjs/static/image/activities/coupons/products_06.jpg',
            skip_url:this.siteInfo.host + '/bocm/index.php?act=project&op=project_detail&from_type=syShop&gc_id=991125',
            click_key:'points_activity_redis_key_feather_four',
            sold_out:false,
          },
        ],
        coupons_txt: {
          immediate_use: "立即使用",
          loot_all: "已被抢光",
          click_get: "点击兑换"
        },
      }
    },
    created () {
      this.$route.query.is_share == 'yes' ? this.isShare = true : this.isShare = false
      if(this.isShare){
        this.topDownloadApp = true;
      }
      this.getCouponsData();//
      this.webPvStatistics();//友盟统计
      setTimeout(() =>{
        this.shareSecond()
      },100)
    },
    mounted () {

    },
    methods: {
      getCouponsData(){//首次进入页面
        let url = this.siteInfo.host + '/api/index.php?act=points_activity&op=isSaleOut';
        this.$http.get(url).then((res)=>{
          this.isLogin = res.data.is_login;
          this.isLoading = false;
          if(res.data.code == 200){
            this.couponsInfo = res.data.content;
            this.couponsReceived = res.data.received;
            this.productSoldOut = res.data.sale_result;
            this.goods_sold_out1 = res.data.sale_result.goods_1;
            this.coupons[0].isSaleOut = this.couponsInfo['five'];
            this.coupons[1].isSaleOut = this.couponsInfo['ten'];
            this.coupons[2].isSaleOut = this.couponsInfo['twenty'];
            if(this.coupons[0].isSaleOut == true){
              this.coupons[0].btn_txt = '已被抢光';
              this.coupons[0].is_no_bg = true;
            }
            if(this.coupons[1].isSaleOut == true){
              this.coupons[1].btn_txt = '已被抢光';
              this.coupons[1].is_no_bg = true;
            }
            if(this.coupons[2].isSaleOut == true){
              this.coupons[2].btn_txt = '已被抢光';
              this.coupons[2].is_no_bg = true;
            }
            if(this.couponsReceived.length !== 0){
              if(this.couponsReceived['five'] == true){
                this.coupons[0].is_red_bg = this.couponsReceived['five'];
                this.coupons[0].btn_txt = '立即使用';
              }else if(this.couponsReceived['ten'] == true){
                this.coupons[1].is_red_bg = this.couponsReceived['ten'];
                this.coupons[1].btn_txt = '立即使用';
              }else if(this.couponsReceived['twenty'] == true){
                this.coupons[2].is_red_bg = this.couponsReceived['twenty'];
                this.coupons[2].btn_txt = '立即使用';
              }
            }
            //this.productSoldOut = res.data.sale_result 是否兑换完 true 代表兑换完
            this.objectTransformArray(this.productSoldOut,this.productList);
          }
        })
      },
      jumpToLogin(){//跳转登录
        let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=topic&op=coupons_activities');
        window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl;
      },
      shareFn() {//分享
        if (this.isShare) {
//          console.log('app 外');
          this.is_share_img = true;
          this.topDownloadApp = true;
          this.shareStatistics('points_activity_redis_key_share_two');//app外分享统计
        } else {
//          console.log('app内');
          if(!this.isLogin){
            this.jumpToLogin();
          }else{
            this.topDownloadApp = false;
            let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=topic&op=coupons_activities&topic_id='+this.activity_id +  '&is_share=yes';
            let shareText = this.shareDefaultDesc;
            let shareTitle =  this.shareDefaultTitle;
            let shareLogo = this.shareNewLogo;
            let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
            let jsonParam = JSON.stringify(params);
            //分享后的回调
            var that=this;
            window.callbackShareResult = function (platform, status){
             // alert("分享到" + platform + "平台" + "---" + status);
              if(status == 'success'){
               // alert('if success')
                that.shareAddIntegral();
                that.shareStatistics('points_activity_redis_key_share');
              }
            };
            this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
          }
        }
      },
      shareSecond(){
        //二次分享
        this.shareStatistics('points_activity_redis_key_share_two');
        let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=topic&op=coupons_activities&topic_id='+this.activity_id +  '&is_share=yes';
        let shareText = this.shareDefaultDesc;
        let shareTitle = this.shareDefaultTitle;
        let shareLogo = this.shareNewLogo;
        var params = {
          text: shareText,
          title: shareTitle,
          logo: shareLogo,
          url: shareUrl
        };
        wx_share(params)
      },
      webPvStatistics(){
        var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(unescape("%3Cspan style='visibility:hidden;position:absolute;left:0;bottom:0;z-index:-1;' id='cnzz_stat_icon_1261993546'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1261993546%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));
      },
      goDaAiMarket(){//跳转大爱超市列表
        let marketUrl = this.siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index';
        this._appjs.syJsbLaunchWebview(marketUrl)
      },
      skipWay(skip_url, key_count, goods){//产品跳转
        let url = this.siteInfo.host + '/api/index.php?act=points_activity&op=toNewSyShopGoodsLink';
        if(this.isShare){
          this.countClick(key_count,'yes');//统计app外点击次数
          Toast({message: "仅支持在APP中兑换",position: 'center',duration: 2000});
        }else{
          if(!this.isLogin){
            this.jumpToLogin();
          }else{
            this.countClick(key_count);//统计点击次数
            this.$http.get(url).then((res) => {
              let code = res.data.code;
              let messages = res.data.message;
              if(code == 200){
                if(goods){
                  Toast({message:'商品已兑换完',position: 'center',duration: 2000});
                }else{
                  this._appjs.syJsbLaunchWebview(skip_url);
                }

              }else if(code == 400){
                Toast({message:messages,position: 'center',duration: 2000});
              }
            });
          }
        }
      },
      skipWayOld(skip_url, key_count, goods){//产品跳转
        let url = this.siteInfo.host + '/api/index.php?act=points_activity&op=toSyShopGoodsLink';
        if(this.isShare){
          this.countClick(key_count,'yes');//统计app外点击次数
          Toast({message: "仅支持在APP中兑换",position: 'center',duration: 2000});
        }else{
          if(!this.isLogin){
            this.jumpToLogin();
          }else{
            this.countClick(key_count);//统计点击次数
            this.$http.get(url).then((res) => {
              let code = res.data.code;
              let messages = res.data.message;
              if(code == 200){
                if(goods){
                  Toast({message:'商品已兑换完',position: 'center',duration: 2000});
                }else{
                  this._appjs.syJsbLaunchWebview(skip_url);
                }

              }else if(code == 400){
                Toast({message:messages,position: 'center',duration: 2000});
              }
            });
          }
        }
      },
      getCoupons(id,index){
        //领取优惠券
        this.$http.get(this.siteInfo.host + '/api/index.php?act=points_activity&op=send_voucher_api&voucher_t_id='+id)
          .then((res) => {
            let code = res.data.code;
            let message = res.data.message;
            if(code == 200){
              this.coupons[index].btn_txt = '立即使用';
              this.coupons[index].is_red_bg = true;
              Toast({message: "兑换成功，快去使用吧",position: 'center',duration: 2000});
            }else if(code == 401){
              Toast({message: message,position: 'center',duration: 2000});
            }else if(code == 402){//优惠券已发放完毕
              this.coupons[index].btn_txt = '已被抢光';
              this.coupons[index].is_no_bg=true;//灰色背景
              Toast({message: message,position: 'center',duration: 2000});
            }else if(code == 403){//领取次数已达上限
              this.coupons[index].btn_txt = '点击兑换';
              Toast({message: message,position: 'center',duration: 2000});
            }else if(code == 404){
              Toast({message: "您的积分不足，分享活动可获得50积分哦",position: 'center',duration: 2000});
            }else if(code == 405){//领券人数过多，请稍后再试
              Toast({message: message,position: 'center',duration: 2000});
            }else if(code == 406){
              Toast({message: message,position: 'center',duration: 2000});
            }else if(code == 460){
              Toast({message: message,position: 'center',duration: 2000});
              setTimeout(() => {
                let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=topic&op=coupons_activities');
                window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
              },2500)
            }else{
              Toast({message: message,position: 'center',duration: 2000});
            }
          })
      },
      countClick(key_id,share){//点击次数接口
        let url = this.siteInfo.host + '/api/index.php?act=points_activity&op=IncClickCount&key='+key_id+'&is_share='+share;
        this.$http.get(url).then((res) =>{
          let code = res.data.code;
          let message = res.data.massage;
          if(code == 200 || code ==201){
//            console.log(message)
          }else{
//            console.log(message)
          }
        },(error)=>{console.log(error)})
      },
      clickCouponsBtn(id, index, key_id,isSaleOut,received){
        if(!this.isLogin){
          this.jumpToLogin();
        }else{
          if(isSaleOut){
            this.coupons[index].btn_txt = '已被抢光';
            Toast({message: "已经被抢光",position: 'center',duration: 2000});
          }else{
//            alert("id: "+id+"index: "+index+"key_id: "+key_id+"received: "+received);
            this.getCoupons(id, index);
            this.countClick(key_id);
          }
        }
      },
      shareOuter (key_id, share){
        this.countClick(key_id,share);
        Toast({message: "仅支持在APP中领取",position: 'center',duration: 2000});
      },
      shareStatistics(parameter){
        let url = this.siteInfo.host + '/api/index.php?act=points_activity&op=countShare&key='+parameter;
        this.$http.get(url).then((res) => {
          if(res.data.code == 200){
//            console.log(res.data.message)
          }else{
            console.log(res.data.message)
          }
        })
      },
      shareAddIntegral(){//分享加积分
        let url = this.siteInfo.host + '/api/index.php?act=points_activity&op=getSharePoints';
        this.$http.get(url).then((res) => {
          if(res.data.code == 200){
//            console.log(res.data.message);
          }else if(res.data.code == 460){
//            console.log(res.data.code)
          }
        })
      },
      objectTransformArray(obj, pro){//产品是否兑换完
        var arr = Object.values(obj);
        var arrResult = arr.slice(1);
        for(var j=0,c=arrResult.length; j<c; j++){
          pro[j].sold_out = arrResult[j];
          /*console.log(pro[j].product_title);
          console.log(pro[j].sold_out);*/
        }
      },
    },
    components: {
      "loading": loading,
      "share-top-bar": shareTopBar,
      "share-img":shareImg,
    }
  }

</script>
<style lang="scss" scoped>
  $bg:#fff;
  $btn:#bababa;
  $red:#c7000b;
  $iRed:#c5010b;
  button{margin:0;padding:0;border:0;background:none;}
  .padding-b-26{padding-bottom:0.26rem;}
  .coupons-con{
    width:7.5rem;
    margin:0 auto;
    background:$bg;
    text-align:left;
    .con-top{
      width:100%;
      img{
        width:100%;
      }
      .con-top-descr{
        width:100%;
        padding:0.3rem 0.3rem 0.4rem;
        box-sizing:border-box;
        text-align:center;
        font-size:0.24rem;
        line-height:0.36rem;
      }
      .con-top-img-descr{
        width:100%;
        img{width:100%;}
      }
      .i-red{
        font-size:0.28rem;
        line-height:0.46rem;
        font-weight:900;
        color:$iRed;
      }
    }
    .txt-title{
      height:0.7rem;
      img{
        width:3.1rem;
      }
    }
    .txt-descr{
      font-size:0.24rem;
      line-height:0.36rem;
      margin-bottom:0.26rem;
    }
    .red-color{
      color:#ca000c;
    }
    .con-center{
      width:6.9rem;
      margin:0 auto;
      box-sizing:border-box;
      .chunk-con{
        margin-bottom:0.3rem;
        width:100%;
        display:flex;
        flex-flow:row nowrap;
        justify-content: space-between;
        padding:0 0.18rem;
        box-sizing:border-box;
        .chunk-bg{
          position:relative;
          width:2rem;
          height:3rem;
          img{
            width:100%;
            height:100%;
          }
          .quan-btn{
            position:absolute;
            width:1.28rem;
            height:0.4rem;
            line-height:0.4rem;
            left:50%;
            margin-left:-0.64rem;
            bottom:0.58rem;
            color:#fff;
            border-radius: 0.5rem;
            background:$btn;
            font-size:0.24rem;
            text-align:center;
          }
          .quan-btn-use{
            background:$bg;
            color:$red;
          }
          .quan-btn-share{
            background:$bg;
            color:$red;
          }
          .quan-new-color{
            background:$bg;
            color:$red;
          }
          .quan-btn-no{
            background:$btn;
            color:#fff;
          }
        }
      }
    }

    .con-center-banner{
      width:100%;
      box-sizing:border-box;
      img{
        width:100%;
        height:100%;
      }
      .sy-con{
        width:100%;
        padding:0.38rem 0 1rem;
        text-align:center;
        .sy-con-title{
          font-size:0.24rem;
          font-weight:600;
        }
        .sy-con-btn{
          margin-top:0.2rem;
          width:1.28rem;
          height:0.4rem;
          font-size:0.20rem;
          background:$red;
          color:$bg;
          line-height:0.4rem;
          text-align:center;
        }
      }
      .banner03{position:relative;margin-bottom:0.5rem;}

      .at-once-yq{
        position:absolute;
        left:4rem;
        bottom:0.28rem;
        display:inline-block;
        width:1.6rem;
        height:0.6rem;
        opacity: 0;
      }
    }
    .fl{float:left;}
    .fr{float:right;}
    .clearfix{zoom:1;}
    .clearfix:after{
      content:".";
      display:block;
      overflow:hidden;
      height:0;
      clear:both;
      visibility:hidden;
    }
    .products-con{
      position:relative;
      width:6.9rem;
      margin:0 auto;
      box-sizing:border-box;
      .pro-title{
        width:100%;
        height:0.7rem;
        img{
          width:3.1rem;
          height:0.4844rem;
        }
      }
      .products-list{
        width:6.9rem;
        padding:0 0.14rem;
        box-sizing:border-box;
        display:flex;
        flex-flow:row wrap;
        justify-content: space-between;
        .products-l{
          width:3.2rem;
          text-align:center;
          .top{
            width:3.2rem;
            height:4.38rem;
            img{width:100%;}
          }
          .txt{
            width:3.2rem;
            font-size:0.24rem;
            line-height:0.36rem;
            padding:0.15rem 0 0;
            height:0.72rem;
            span{
              font-size:0.16rem;
            }
          }
          .num{
            position:relative;
            width:3.2rem;
            span{
              font-size:0.34rem;font-weight:900;
            }
            sup{
              position:absolute;
              left:2.1rem;
              font-size:0.16rem;
            }
            .sup2{
              left:2rem;
            }
          }
          .btn{
            margin:0.18rem 0 0.44rem;
            /*width:1.2rem;
            height:0.4rem;*/
            padding:0.04rem 0.1rem;
            font-size:0.2rem;
            border:0.04rem solid #000;
          }
        }

      }

    }
    .con-bottom{
      width:6.9rem;
      margin:0 auto;
      box-sizing:border-box;
      .con-bottom-title{
        width:1.34rem;
        height:0.46rem;
        margin-bottom:0.3rem;
        img{
          width:100%;
          height:100%;
        }
      }
      .bottom-headline{
        font-size:0.26rem;
        font-weight:600;
        padding-bottom:0.34rem;
      }
      .headline-descr{
        font-size:0.24rem;
        line-height:0.36rem;
        padding-bottom:0.3rem;
        .num{
          display:inline-block;
          width:0.24rem;
          height:0.24rem;
          font-size:0.2rem;
          line-height:0.24rem;
          text-align:center;
          border-radius:50%;
          border:1px solid #0b0b0b;
          margin-right:0.06rem;
        }
      }
    }
  }
</style>
