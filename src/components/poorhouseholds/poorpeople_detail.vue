<template>
  <div>
    <div v-title="'贫困户详情'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div class="poor-con" v-show="!isLoading">
        <sy_share v-if="is_Share" @click.native="is_Share=false"></sy_share>
        <!--下载-->
        <download_app v-if="isDownLoad" ></download_app>
          <!--head-->
          <div class="head">
            <div v-if="photos.length > 1" class="swiper-container poor-container" ref="poorSwiper">
              <div class="poor-swiper swiper-wrapper">
                <div class="p-swiper-slide swiper-slide" v-for="(value,key,index) in photos">
                  <div><img :src="value" onerror="this.src='/bocm/platformjs/static/image/poorhouseholds/poor_defadult01.jpg'" alt="photos加载中……"></div>
                </div>
              </div>
              <!--分页器-->
              <div class="swiper-pagination"></div>
              <!--标签-->
              <div class="poor-tag">
                <span v-if="content.poverty_reason != null&& content.poverty_reason != '' ">{{content.poverty_reason}}</span>
                <span v-if="content.poor_prop!=null && content.poor_prop!='' ">{{content.poor_prop}}</span>
              </div>
            </div>
            <div class="swiper-container poor-container" v-else>
              <div class="poor-swiper">
                <div class="p-swiper-slide" v-for="(value,key,index) in photos">
                  <div><img :src="value" onerror="this.src='/bocm/platformjs/static/image/poorhouseholds/poor_defadult01.jpg'" alt="photos加载中……"></div>
                </div>
              </div>
              <!--分页器-->
              <!--<div class="swiper-pagination"></div>-->
              <!--标签-->
              <div class="poor-tag">
                <span v-if="content.poverty_reason != null&& content.poverty_reason != '' ">{{content.poverty_reason}}</span>
                <span v-if="content.poor_prop!=null && content.poor_prop!='' ">{{content.poor_prop}}</span>
              </div>
            </div>
            <!--贫困户信息-->
            <div class="people-info" :class="{'people-info-h':isSlideDown}">
              <p class="info-head">{{content.member_truename}}&nbsp;&nbsp;{{content.member_sex}}&nbsp;&nbsp;{{content.member_age}}&nbsp;&nbsp;岁</p>
              <ul class="info-body">
                <li v-if="content.family_no !== ''">
                  <span class="info-left">扶贫办编号：</span>
                  <span class="info-right">{{content.family_no}}</span>
                </li>
                <li v-if="content.member_id_value !== ''">
                  <span class="info-left">身份证号：</span>
                  <span class="info-right">{{content.member_id_value}}</span>
                </li>
                <li v-if="content.member_mobile!== ''">
                  <span class="info-left">联系电话：</span>
                  <span class="info-right">{{content.member_mobile}}</span>
                </li>
                <li v-if="content.address_info !== ''">
                  <span class="info-left">家庭住址：</span>
                  <span class="info-right">{{content.address_info}}</span>
                </li>
                <li v-if="content.income_year !== ''">
                  <span class="info-left">人均收入：</span>
                  <span class="info-right">{{content.income_year}}</span>
                </li>
                <li v-if="content.family_member_num !== ''">
                  <span class="info-left">家庭人数：</span>
                  <span class="info-right">{{content.family_member_num}}</span>
                </li>
                <li v-if="content.poor_wish !== ''">
                  <span class="info-left">心愿诉求：</span>
                  <span class="info-right" v-html="content.poor_wish"></span>
                </li>
                <li v-if="content.overcome_poverty_plan !== ''">
                  <span class="info-left">脱贫计划：</span>
                  <span class="info-right" v-html="content.overcome_poverty_plan"></span>
                </li>
              </ul>
              <div class="people-info-bottom" :class="{'people-info-bottom-p':isSlideDown}">
                <div class="info-mark" :class="{'info-mark-h':isSlideDown}"></div>
                <div class="info-updown-bg">
                  <p class="info-updown">
                    <span @click="downUp">{{isSlideDown == false ? '展开' : '收缩'}}</span>
                    <img v-show="!isSlideDown" class="down-img" :src="downImgUrl" alt="up">
                    <img v-show="isSlideDown" class="down-img" :src="upImgUrl" alt="up">
                  </p>
                </div>
              </div>
              <div class="info-bf-success" v-show="accomplish"><img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/poorhouseholds/assist_successful.png'" alt="bf-successed"></div>
              </div>
            <!--帮扶结对-->
              <div class="info-bf">
                <div class="twinning">
                  <!--未登录-->
                  <div class="not-poor">
                    <div v-if="in_pairs<50" >
                      <div v-if="show_help_btn == 2 || show_help_btn == 1"  @click="getJd()">
                        <img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/poorhouseholds/pairing.png'" alt="未结对" v-if="show_help_btn == 2">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/poorhouseholds/pairing_success.png'" alt="未结对" v-if="show_help_btn == 1">
                        <p v-if="show_help_btn == 2">结对</p>
                        <p v-if="show_help_btn == 1">取消结对</p>
                      </div>
                      <div v-if="show_help_btn == 0">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/poorhouseholds/pairing.png'" alt="weidenglu">
                        <p>结对</p>
                      </div>

                    </div>
                    <div v-if="in_pairs>=50">
                      <img v-if="in_pairs>=50" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/poorhouseholds/pairing_full.png'" alt="结对已满">
                      <p v-if="in_pairs>=50" :class="in_pairs>=50 ?'full': ''">结对人数已满</p>
                    </div>
                  </div>
                </div>
                <div class="twinning" @click="shareFn()">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/poorhouseholds/p_share.png'" alt="传播.png">
                  <p>传播</p>
                </div>
                <div class="twinning" @click="donationPopup()">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/poorhouseholds/p_donation.png'" alt="捐款.png">
                  <p>捐款</p>
                </div>
              </div>

          </div>
          <!--head结束-->
        <!--帮扶进度-->
        <div v-if="bfProgressShow == 1">
          <div class="space-line"></div>
          <div class="bf-progress">
            <h2 class="module-title relative">
              <span></span>帮扶进度
              <!--<img v-if="products.length <= 0" @click="closeLayer" class="bf-progress-q" src="/bocm/platformjs/static/image/default/ques_mark2x.png" alt="?">-->
            </h2>
            <div class="bf-txt clearfix">
              <span v-if="current_value == target_value" class="bf-txt-finish">该贫困户本年度已完成公益配额</span>
              <span v-else class="bf-txt-left">已获得帮扶<i>￥{{current_value}}</i></span>
              <span class="bf-txt-right">公益配额&ensp;<i class="bf-pe">￥{{target_value}}</i></span>

            </div>
            <!--进度条-->
            <div class="poor-progress">
              <div style="width:100%;height:100%;">
                <div class="progress-bg" :style="{width:percent + '%'}"></div>
                <div class="progress_num_box2">
                  <div class="progress_num_box_con relative">
                    <div class="absolute progress_num22" v-if="process_status === '已结束' && percent != 100"
                         :style="{left:percent + '%'}">结束
                    </div>
                    <div class="absolute progress_num22" v-else :style="{left:percent + '%'}">
                      {{percent == 100 ? '完成' : percent + '%'}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="bf-descr clearfix"><span></span>公益配额=3000元/人·年*人口数（军烈属6000元/人·年)</p>
          </div>
        </div>
          <div class="space-line"></div>
          <!--爱心产品-->
          <div class="poor-products">
            <h2 class="module-title"><span></span>爱心产品</h2>
            <div class="products-1" v-if="products.length > 0">
              <div class="p-pro-item" v-for="n in products">
                <div class="pro-item-left"><img :src="n.real_image_url" alt="产品.png"></div>
                <div class="pro-item-right">
                  <h3 class="item-right-title">{{n.goods_name}}</h3>
                  <p class="item-right-jz">运费：<span><i v-show="n.shipping_fee !== '免运费'">￥</i>{{n.shipping_fee}}</span></p>
                  <p class="item-right-price">¥ {{n.goods_price}}</p>
                  <button v-if="n.goods_storage ==1" class="item-btn"  @click="_appjs.syJsbLaunchWebview(n.touch_url)">我想帮扶</button>
                  <button v-if="n.goods_storage ==0" class="item-btn-gray">已售光</button>
                </div>
              </div>
              <div v-if="assistants" :class="{'assistants-con':assistants}">
                <!--<p class="assistans-line"></p>-->
                <p class="pro-text pad-top012">以上产品由{{agent_name}}协助上新</p>
                <p class="pro-text" @click="_appjs.syJsbLaunchWebview(agent_url)">去看他（她）的扶贫驿站&ensp;<img class="right-j" src="/bocm/platformjs/static/image/default/list_title_right1.png"/></p>
              </div>
            </div>
            <div class="products-0" v-else>
              <span>该贫困户还未上传产品！</span>
            </div>
          </div>
        <!--最新评价-->
        <div v-show="evaluateList.length>0">
          <div class="space-line"></div>
          <div class="poor-evaluate">
          <h2 class="module-title"><span></span>最新评价</h2>
          <div class="evaluate-1">
            <div class="evaluate-item" v-for="item in evaluateList">
              <div class="evaluate-left"><img :src="item.face" alt=""></div>
              <div class="evaluate-right">
                <p class="right-title clearfix"><span class="right-name">{{item.show_name}}</span><span class="right-time">{{item.geval_addtime}}</span></p>
                <p class="evaluate-content">{{item.geval_content}}</p>
                <div class="evaluate-img-con" v-if="item.geval_image_url !== ''||item.geval_image2_url!== ''||item.geval_image3_url!== ''">
                  <div class="evaluate-img" v-if="item.geval_image_url !== ''"><img :src="item.geval_image_url" alt="pj"></div>
                  <div class="evaluate-img" v-if="item.geval_image2_url!== ''"><img :src="item.geval_image2_url" alt="pj"></div>
                  <div class="evaluate-img" v-if="item.geval_image3_url!== ''"><img :src="item.geval_image3_url" alt="pj"></div>
                </div>
                <p class="evaluate-shopping">购买了{{item.goods_name}}</p>
                <div class="evaluate-b-line" v-if="item.reply_list.length <= 0"></div>
                <div class="revert" v-if="item.reply_list.length>0">
                  <p class="clearfix">
                    <span class="fl">{{item.reply_list[0].replyer_name}}<i class="b-color">&nbsp;回复：</i>
                      {{item.reply_list[0].content}}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="evaluateList.length <=0" class="evaluate-0">
            <span>还没有帮扶人发表评价！</span>
          </div>
        </div>
        </div>
        <div class="space-line"></div>
        <!--祝福墙-->
          <div class="wish">
            <h2 class="module-title mar-left3"><span></span>祝福墙</h2>
            <p class="wish-descr">选择代表您心意的三个祝福</p>
            <div class="wish-con clearfix">
              <p v-for="(m ,index) in wishCon" @click="plusOne(m)"  class="wish-item" :index="index" :class="m.if_wish == 1 ? 'wish-item-active':''" >
                {{m.title}}<span>{{m.num}}</span><i :class="m.if_wish !==copyWishCon[index].if_wish ? 'tip':''">+1</i>
              </p>
            </div>
          </div>
        <div class="bottom_bar">一起善源 爱 · 源于善</div>
        <div class="body-mark" v-show="markClose"></div>
        <div class="popup-con" v-show="markClose">
          <div class="popup-close"><img @click="closeLayer" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/close_x2.png'" alt="close"></div>
          <div class="bf-popup-txt">
            <h2 class="bf-pop-title">帮扶进度</h2>
            <p class="bf-pop-descr">您的每笔消费会有<i class="font-blue">10%</i>平摊给暂未上传产品的贫困户。</p>
          </div>
        </div>
        <div class="icon-popup"  :class="{'icon-popup-animation':inPairsPop}" style="display:none;">
          <div class="icon-success"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/toast_true.png'" alt="tick_true"></div>
          <div class="icon-txt">{{inPairsToastTxt}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  import Swiper from '../../../static/js/swiper-3.4.2.min'
  import wx_share from '@/assets/js/share.js'
  import { Toast } from 'mint-ui';
  import share_img from '@/components/common/shared_img.vue'
  import download_app from '@/components/common/download_app.vue'
  export default {
    data () {
      return {
        isLoading:true,
        isSlideDown:false,
        is_Share:false,//分享
        isDownLoad:false,//下载
        shareLogo:'',//分享主图
        shareTitle:'您的好友邀请您一起帮扶贫困户',//分享标题
        markClose:false,
        popupClose:false,
        inPairsPop:false,
        inPairsToastTxt:'结对成功',//
        upImgUrl:'/bocm/platformjs/static/image/sywall/icon-shang.png',
        downImgUrl:'/bocm/platformjs/static/image/sywall/icon-xia.png',
        member_id: '',//贫困户用户接口 id,
        poorId:'',//详情页内贫困户id
        photos:[],//轮播图
        content:{},//贫困户信息
        peopleName:'',//贫困户姓名
        agent_name:'',//助理人信息店铺名称
        agent_id:'',//助理人id
        assistants:false,//是否有助理人协助
        bfProgressShow:'',//1 显示 （上架过产品）0 不显示
        target_value:0,//公益配额
        current_value:0,//当前完成
        accomplish:false,//完成配额
        show_help_btn:'',//结对状态
        status:'',//结对&取消结对
        is_login: false,//结对是否登录
        in_pairs:'',//结对人数
        is_poor:'',//结对是否是贫困户
        twinningState:false,
        in_pairsFull:false,//结对人数已满
        percent:'',//百分比
        bfSuccess:'帮扶成功',//帮扶成功
        process_status:'已完成',
        products:[],//产品list
        haveProducts:false,//false无产品
        evaluateList:[], //评价
        reply_list:[],//评价回复
        agent_url:'',
        sell:'',//售卖是否为空
        photosUrl:'/bocm/platformjs/static/image/assistants/head-img-no.png',
        wishCon:[],//祝福list
        if_wish:0,//是否选中
        addItemClass:false,
        selectedId:0,
        itemPush:[],//选择
        ev:false,//评价是否为空
        copyWishCon:[],
        index:0
      }
    },
    created () {
      this.getPoorData();
      this.getWishData();
      setTimeout(()=>{
        this.secondShareFn()
      },100)
    },
    mounted () {
    },
    methods:{
      getPoorData(){
        this.member_id = this.$route.query.member_id
        let url1 = '/api/index.php?act=v_poor&op=poor_info&member_id='+this.member_id+'&is_share='
        this.$http.get(this.siteInfo.host + url1).then((res)=>{
          this.isLoading = false
          let code = res.data.code
          let con = res.data.content
          if(code == 200){
            this.is_login = con.is_login
            var objArr =  Object.values(con.round_img)
            this.photos =  objArr
            this.shareLogo = con.round_img.person_photo
            this.content = con
            this.poorId = con.poor_id
            this.peopleName = con.member_truename
            this.bfProgressShow = con.if_show_help
            this.target_value = con.target_money
            this.current_value = con.finish_money
            //title
            let diyTitle = '贫困户'+this.peopleName
            document.title = diyTitle
            this._appjs.syJsbSetTitleText(diyTitle)
            //完成配额/公益配额
            this.addPercent(this.current_value,this.target_value)
            //显示帮扶成功
            if(this.target_value == null || this.current_value != this.target_value){
              this.accomplish = false
            }else{
              this.accomplish = true
            }
//            this.current_value == this.target_value ? this.accomplish = true : this.accomplish = false
            //con.show_help_btn //结对 状态 0 未登录 1 已结对 2取消结对
            this.show_help_btn = con.show_help_btn
            //con.supporter_list_count //结对人数
            this.in_pairs = con.supporter_list_count //结对数
            this.products = con.goods_list
//            console.log('产品'+con.goods_list)
            this.agent_id = con.agent_id //助理人id
            this.agent_name = con.store_name
            //是否有助理人协助
            if(this.agent_id == null){
              this.assistants = false
            }else if(this.agent_id == ''){
              this.assistants = false
            }else{
              this.assistants = true
            }
            this.agent_url = con.publisher_touch_url
//            评价list
            this.evaluateList = con.evaluate_list
            this.reply_list = con.evaluate_list.reply_list
//            console.log('结对状态'+ this.show_help_btn)

          }else if(code == 400){
            this.$toast(res.data.message)
          }
        }).then(()=>{
          this.$nextTick(()=>{
            new Swiper(this.$refs.poorSwiper, {
              paginationClickable: true,
              autoplay: 5000,
              autoplayDisableOnInteraction: false,
              observer: true,
              observeParents: true,
              loop: true,
              pagination: '.swiper-pagination',//分页器
              paginationType : 'fraction',
              paginationFractionRender: function (swiper, currentClassName, totalClassName) {
                return '<span class="' + currentClassName + '"></span>' +
                  ' / ' +
                  '<span class="' + totalClassName + '"></span>';
              }
            })
          })
        })

      },
      shareFn(){
//        console.log('shareFn 执行')
        let is_share = this.$route.query.is_share
//        console.log('shareFn')
        if(is_share === 'yes'){
          this.is_Share = true
          this.isDownLoad = true
        }else{
          this.shareDetail()
          this.isDownLoad = false
        }
      },
      secondShareFn(){//二次分享
        this.member_id = this.$route.query.member_id
        let logo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png'
        let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=goods&op=poor_info_v2&member_id='+this.member_id+'&is_share=yes'; //banner第一张图
        let fp = '扶贫办编号：'+this.content.family_no
        let id_card = '身份证号' +this.content.member_id_value
        let this_text = this.content.family_no !== '' ? fp : id_card
        let shareText = this.content.member_truename + ' '+this.content.member_sex+' '+this.content.member_age+' 岁\n' + this_text
        let shareTitle = this.shareTitle
        let shareLogo = this.shareLogo ? this.shareLogo : logo
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        wx_share(params)
      },
      shareDetail(){
//        console.log('shareDetail 执行')
        this.member_id = this.$route.query.member_id
        let logo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png'
        let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=goods&op=poor_info_v2&member_id='+this.member_id+'&is_share=yes'; //banner第一张图
        let fp = '扶贫办编号：'+this.content.family_no
        let id_card = '身份证号' +this.content.member_id_value
        let this_text = this.content.family_no !== '' ? fp : id_card
        let shareText = this.content.member_truename + ' '+this.content.member_sex+' '+this.content.member_age+' 岁\n' + this_text
        let shareTitle = this.shareTitle
        let shareLogo = this.shareLogo ? this.shareLogo : logo
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
      },
      getJd(){
        if(!this.is_login) {
          let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=goods&op=poor_info_v2&member_id=' + this.member_id);
          window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
        }
        let url = this.siteInfo.host +'/api/index.php?act=v_poor&op=edit_support_poor&poor_id='+this.poorId
        if(this.show_help_btn == 1){
          this.show_help_btn = 2
          this.status = 'cancel'
          let url2 = url + '&state='+this.status
          this.$http.get(url2).then((res)=>{
            let _code = res.data.code
            if(_code == 200){
              this.$toast('取消结对')
            }else if(_code == 400){
              this.$toast(res.data.message)
            }
          })
        }else if(this.show_help_btn == 2) {
          this.show_help_btn = 1
          this.status = 'support'
          let url3 = url+'&state='+this.status
          this.$http.get(url3).then(res=>{
            let _code = res.data.code
            if(_code == 200){
              this.$toast('结对成功')
            }else if(_code == 400){
              this.$toast(res.data.message)
            }
          })
        }

      },

      getWishData(){
        //祝福墙数据
        let url = this.siteInfo.host + '/api/index.php?act=v_poor&op=poor_wish&wish_member='+this.member_id
        this.$http.get(url).then((res)=>{
          let wishCode = res.data.code
          if(wishCode == 200){
            this.wishCon = res.data.content;
            if(this.index===0){
              this.index=1
              this.copyWishCon=JSON.parse(JSON.stringify(res.data.content));
            }
          }else if(wishCode ==300){
            this.$toast({
              message:res.data.message,
              duration:1500
            })
          }else{
            this.$toast({
              message:res.data.message,
              duration:1500
            })
          }
//          console.log(res.data)
        })
      },
      plusOne(m){
       /* wish_id祝福语id
        wish_member贫困户id
        if_save是否保存save保存*/
        let arr = this.wishCon.filter((item) => {
          return item.if_wish == 1
        })
        if(arr.length >2){
          this.$toast({
            message:'您的祝福已收到',
            duration:1000
          });
          return
        }
        if(m.if_wish == 1){
          this.$toast({
            message:'已选择',
            duration:1000
          });
          return
        }
        let url = this.siteInfo.host + '/api/index.php?act=v_poor&op=poor_wish&wish_member='+this.member_id+'&wish_id='+m.id+'&if_save=save'
        this.$http.get(url).then(res=>{
          let wishCode = res.data.code
          if(wishCode == 200){
            m.if_wish = 1;
            /*this.$toast({
              message:res.data.message,
              duration:1000
            })*/
          }else if(wishCode == 300){
            this.$toast(res.data.message)
            let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=goods&op=poor_info_v2&member_id=' + this.member_id);
            window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
          }else {
            this.$toast({
              message:res.data.message,
              duration:1500
            })
          }
        }).then(()=>{
          this.$nextTick(()=>{
            this.getWishData();
          })
        })

      },
      downUp(){
        this.isSlideDown = !this.isSlideDown
      },
      donationPopup(){
        this.$toast('暂未开通，敬请期待！')
      },
      addPercent(a, b){
        //a,当前值b 总值
        function remove(str) {
          if (!str) {
            return '0';
          } else {
            return (str + '').split(',').join('')
          }
        }
        let test = remove(a)
        let test2 = remove(b)
//        console.log(test +' : '+ test2)
        let tmp, result;
        if (remove(b) == 0) {
          this.percent = 0
        } else {
          tmp = remove(a) / remove(b)
          this.percent = tmp >= 1 ? 100 : parseInt(tmp * 100) < 1 ? Math.ceil(tmp) : parseInt(tmp * 100);
        }
        return result;
      },
      closeLayer(){
        this.markClose = !this.markClose
      },
      inPairsPopup(txt){
        this.inPairsToastTxt = txt
      },
    },
    components:{
      loading,
      'sy_share':share_img,
      'download_app':download_app
    }
  }
</script>
<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";
  $bg:#f7f9fa;
  $txtbg:#fff;
  .font-blue{color: #4A90E2;}
  .pad-top012{padding-top:0.12rem;}
  i{font-style:normal;}
  button{margin:0;padding:0;border:0;}
  .icon-popup{
    position:absolute;
    left:50%;
    top:30%;
    transform: translate(-50%,0);
    z-index:100;
    width:2.4rem;
    height:2.4rem;
    box-sizing:border-box;
    padding:0.24rem;
    text-align:center;
    background:rgba(000,000,000,0.7);
    border-radius:0.2rem;
    visibility: hidden;
  }
  .icon-popup-animation{
    animation:toast 0.5s ease;
  }
  .icon-popup-animation2{
    animation:toast 0.5s ease;
  }
  .icon-success{
    display:inline-block;
    margin:0.28rem 0 0.22rem 0;
    width:0.76rem;
    height:0.78rem;
    img{width:100%;height:100%;}
    /*background:url(/bocm/platformjs/static/image/default/icon-suc.png)no-repeat;
    background-size:100% 100%;*/
  }
  @keyframes toast {
    0%{visibility:hidden;}
    25%{visibility:visible;}
    50%{visibility:visible;}
    75%{visibility:visible;}
    100%{visibility:hidden;}
  }
  @-webkit-keyframes toast {
    0%{visibility:hidden;}
    25%{visibility:visible;}
    50%{visibility:visible;}
    75%{visibility:visible;}
    100%{visibility:hidden;}
  }
  .icon-txt{
    font-size:0.32rem;
    color: #FFFFFF;
  }
  .poor-con{
    width:7.5rem;
    height: 100%!important;
    background:$txtbg;
    .poor-container{
      position:relative;
    }
    .poor-swiper{
      width:7.5rem;
      height:5.2rem;
    }
   .poor-swiper .p-swiper-slide{
      width:100%;
      height:5.2rem;
     div{
       width:100%;
       height:5.2rem;
       img {
         width:100%;
         height:100%;
       }
     }
    }
   /*.poor-swiper .p-swiper-slide:nth-of-type(odd){
      background:#ccccee;
    }*/
    .poor-container .swiper-pagination{
      top:0.31rem;
      left:0.3rem;
      width:0.6rem;
      height:0.6rem;
      line-height:0.6rem;
      text-align:center;
      color:#fff;
      font-weight:300;
      border: 0 solid #FFFFFF;
      border-radius:50%;
      background: rgba(0,0,0,0.20);
    }
    .poor-tag{
      position:absolute;
      bottom:0.2rem;
      z-index:10;
      width:7.1rem;
      margin:0 0.2rem;
      text-align:right;
      overflow:hidden;
    }
    .poor-tag span{
      display:inline-block;
      height:0.4rem;
      line-height:0.4rem;
      padding:0.02rem 0.12rem;
      color:#fff;
      font-size:0.24rem;
      margin-left:0.1rem;
      background: rgba(0,0,0,0.20);
      border: 0.01rem solid #FFFFFF;
      border-radius:0.03rem;
      float:right;
    }
    .poor-tag span:last-child{
      margin-right:0;
    }
    /*展开收缩*/
    .people-info{
      position:relative;
      width:6.9rem;
      height:4rem;
      padding:0 0.3rem;
      text-align:left;
      background:$txtbg;
      overflow:hidden;
      /*transition:height 2s;*/
    }
    .people-info-h{
      height:auto;
    }
    .info-head{
      margin-top:0.33rem;
      margin-bottom:0.12rem;
      font-size:0.3rem;
      line-height:0.42rem;
      color: #4B4F63;
    }
    .info-body{
      font-size:0.28rem;

    }
    .info-body li{
      display:flex;
    }
    .info-body .info-left{
      display:inline-block;
      width:1.68rem;
      margin-right:0.1rem;
      color: #4B4F63;
      line-height:0.46rem;
    }
    .info-body .info-right{
      display:inline-block;
      color: #818C9E;
      line-height:0.46rem;
      flex:1;
      text-align:justify;
    }
    .people-info-bottom{
      position:absolute;
      bottom:0;
      width:6.9rem;
      font-size:0.24rem;
      color: #B1B8C4;
      text-align:center;
      .info-mark{
        width:100%;
        height:0.58rem;
        padding-bottom:0.21rem;
        background-image: linear-gradient(top, rgba(238,238,238,0.00) 0%, #FFFFFF 70%);
        background-image: -webkit-linear-gradient(top, rgba(238,238,238,0.00) 0%, #FFFFFF 70%);
        /*transition: height 2s;*/

      }
      .info-mark-h{
        height:0;
        /*transition: height 2s;*/
      }
      .info-updown-bg{background:$txtbg;}
      .info-updown{
        display:inline-block;
        width:1.5rem;
      }
      .down-img{
        width:0.2rem;
        height:0.11rem;
        margin-left:0.06rem;
      }
    }
    .info-bf-success{
      position:absolute;
      top:0;
      right:0;
      width:2.47rem;
      height:2.16rem;
      img{
        margin-top:5%;
        margin-left:10%;
        width:80%;
        height:80%;
      }
    }
    .people-info-bottom-p{
      position:relative;
    }
    .info-bf{
      width:100%;
      padding:0.62rem 0.3rem 0.3rem;
      box-sizing:border-box;
      background:$txtbg;
      display:flex;
      flex-flow:row nowrap;
      justify-content: center;
      .twinning{
        margin-right:0.97rem;
        width:1.44rem;
        font-size:0.24rem;
        color: #4A90E2;
        line-height:0.33rem;
        text-align:center;
        .full{
          color: #DADEE4;
        }
        .not-login{
          color: #DADEE4;
        }
        .login{
          color: #4A90E2;
        }

      }
      .twinning:last-of-type{
        margin-right:0;
      }
      .twinning img{
        width:0.98rem;
        height:0.98rem;
        margin-bottom:0.0rem;
      }
    }
    .space-line{width:100%;height:0.2rem;background: #F7F9FA;}
    .bf-progress{
      width:100%;
      padding:0 0.3rem;
      box-sizing:border-box;
      height:2.48rem;
      background:$txtbg;
      text-align:left;
    }
    .bf-progress-q{
      position:absolute;
      top:38%;
      left:1.6rem;
      width:0.29rem;
      height:0.29rem;
      transform:translate(-50%,0)
    }
    .bf-txt{
      margin-bottom:0.24rem;
      background:$txtbg;
      font-size:0.26rem;
      .bf-pe{
        font-size:0.3rem;
        color: #4B4F63;
      }
      .bf-txt-left{
        text-align:left;
        color: #666A7F;
        float:left;
        i{color: #4A90E2;}
      }
      .bf-txt-right{
        float:right;
        color: #666A7F;
        text-align:right;
      }
      .bf-txt-finish{
        float:left;
        color: #4A90E2;
        text-align:left;
      }
    }
    .module-title{
      position:relative;
      padding:0.27rem 0 0.23rem 0.24rem;
      font-size:0.3rem;
      line-height:0.42rem;
      text-align:left;
      color: #4B4F63;
      span{
        display:inline-block;
        position:absolute;
        left:0;
        top:50%;
        transform:translate(0,-50%);
        width:0.16rem;
        height:0.6rem;
        background:url(/bocm/platformjs/static/image/index/yellow22.png)no-repeat;
        background-size:100% 100%;
      }
    }
    .mar-left3{margin-left:0.3rem;}
    .products-1,.products-0{padding-bottom:0.23rem;}
    .products-0,.evaluate-0{
      width:100%;
      min-height:2.42rem;
      display:flex;
      flex-flow:row nowrap;
      justify-content: center;
      align-items:center;
      span{
        font-size:0.3rem;
        line-height:0.42rem;
        color: #B1B8C4;
        text-align:center;
      }
    }
    .poor-progress{
      height:.08rem;
      background: #C8DDF5;
      border-radius:0.68rem;
    }
    .progress-bg{
      height:100%;
      background-image: linear-gradient(-90deg, #00ECBC 0%, #4A90E2 100%);
      border-radius:0.68rem;
    }
    .progress_num_box2{
      width:100%;
      height:100%;
      padding-right:0.8rem;
      box-sizing: border-box;
      border-radius:0.68rem;
    }
    .progress_num_box_con{
      height:100%;
    }
    .progress_num22{
      left:0;
      top:0;
      margin-top:-.19rem;
      width:.8rem;
      height:.3rem;
      line-height: .33rem;
      background: #E35050;
      box-shadow: 0 0 22px 0 rgba(227,80,80,0.83);
      border-radius: .15rem;
      color:#fff;
      text-align: center;
    }
    .bf-descr{margin-top:0.3rem;font-size:0.24rem;line-height:0.36rem;color: #A1C5EF;}
    .bf-descr span{
      float:left;
      margin-top:0.03rem;
      margin-right:0.07rem;
      width:0.26rem;
      height:0.26rem;
      background: url(/bocm/platformjs/static/image/default/plaint_2x.png)no-repeat;
      background-size: cover;
    }
    .poor-products{
      width:100%;
      padding:0 0.3rem;
      box-sizing:border-box;
    }
    .p-pro-item{
      margin-bottom:0.28rem;
      width:100%;
      display:flex;
      flex-flow:row nowrap;
      text-align:left;
      .pro-item-left{
        width:2.26rem;
        height:1.58rem;
        margin-right:0.2rem;
      }
      .pro-item-left img{
        width:100%;
        height:100%;
        border-radius:0.08rem;
      }
      .pro-item-right{
        position:relative;
        flex:1;
        padding-bottom:0.35rem;
        border-bottom: 1px solid #DADEE4;
      }
      .item-right-title{
        width:4.44rem;
        font-size:0.32rem;
        line-height:0.45rem;
        color: #4B4F63;
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .item-right-jz{
        margin-top:0.08rem;
        font-size:0.24rem;
        line-height:0.33rem;
        color: #818C9E;
      }
      .item-right-price{
        margin-top:0.32rem;
        font-size:0.32rem;
        color: #4A90E2;
      }
      .item-btn{
        position:absolute;
        top:0.94rem;
        right:0;
        width:1.5rem;
        height:0.56rem;
        line-height:0.56rem;
        text-align:center;
        color:#fff;
        background: #4A90E2;
        border-radius:0.08rem;
      }
      .item-btn-gray{
        position:absolute;
        bottom:0.35rem;
        right:0;
        width:1.5rem;
        height:0.56rem;
        line-height:0.56rem;
        text-align:center;
        color:#fff;
        background: #C8DDF5;
        border-radius:0.08rem;
      }
    }
    .p-pro-item:last-of-type{
      margin-bottom:0.14rem;
    }
    .p-pro-item:last-of-type .pro-item-right{
      border-bottom:0;
    }
    .assistants-con{
      margin-top:-0.32rem;
    }
    .assistans-line{
      height:1px;
      width:4.44rem;
      margin-left:2.46rem;
      background:#dadee4;
    }
    .pro-text{
      text-align:right;
      font-size:0.24rem;
      line-height:0.36rem;
      color: #B1B8C4;
      .right-j{
        width:0.1rem;
        height:0.2rem;
      }
    }
    .poor-evaluate{
      width:100%;
      padding:0 0.3rem;
      box-sizing:border-box;

    }
    .evaluate-1,.evaluate-0{
      padding-bottom:0.3rem;
    }
    .evaluate-item {
      display: flex;
      flex-flow: row nowrap;
      margin-bottom:0.3rem;
    }
    .evaluate-item:last-of-type{
      margin-bottom:0;
    }
    .evaluate-left{
      width:0.8rem;
      height:0.8rem;
      background:url(/bocm/platformjs/static/image/assistants/head-img-no.png)no-repeat;
      background-size:100% 100%;
      margin-right:0.22rem;
      img{
        width:0.8rem;
        height:0.8rem;
        background:#fff;
        border-radius:50%;
      }
    }
    .evaluate-right{
      width:5.88rem;
      /*flex:1;*/
      text-align:left;
      .right-title{
        font-size:0.26rem;
        line-height:0.37rem;
      }
      .right-name{
        float:left;
        color: #4B4F63;
        font-size:0.26rem;
      }
      .right-time{
        float:right;
        font-size:0.24rem;
        color: #B1B8C4;
      }
      .evaluate-content{
        margin-top:0.08rem;
        line-height:0.42rem;
        font-size:0.3rem;
        color: #4B4F63;
      }
      .evaluate-img-con{
        margin-top:0.16rem;
        margin-bottom:0.13rem;
        height:1.8rem;
        display:flex;
        flex-flow:row nowrap;
        /*justify-content: space-between;*/
      }
      .evaluate-img{
        width:1.8rem;
        height:1.8rem;
        background:#f1f1f1;
        margin-right:0.26rem;
        img{
          width:100%;
          height:100%;
        }
      }
      .evaluate-img:last-of-type{margin-right:0;}
      .evaluate-shopping{
        width:100%;
        height:0.52rem;
        line-height:0.52rem;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        /*margin-top:0.16rem;*/
        font-size:0.26rem;
        color: #818C9E;
        /*padding-bottom:0.23rem;*/
      }
      .evaluate-b-line{
        width:100%;
        height:1px;
        background:#DADEE4;
        margin-top:0.04rem;
      }
      .revert{
        position:relative;
        margin-top:0.14rem;
        padding:0.2rem;
        font-size:0.28rem;
        line-height:0.4rem;
        color: #818C9E;
        background: #F6FAFF;
        border: 1px dotted #C8DDF5;
        border-radius:0.08rem;
        text-align:justify;
      }
      .revert:before{
        position:absolute;
        top:-0.18rem;
        left:0.3rem;
        display:block;
        content:"";
        width: 0.24rem;
        height: 0.18rem;
        background:url(/bocm/platformjs/static/image/poorhouseholds/triangle_dashed_up2x.png)no-repeat;
        background-size:100% 100%;
      }
      .b-color{
        color: #4A90E2;
      }
    }

    .wish{
      width:100%;
      /*padding:0 0.3rem;*/
      box-sizing:border-box;
    }
    .wish-descr{
      margin-top:0.16rem;
      color: #818C9E;
      font-size:0.3rem;
      text-align:center;
      line-height:0.42rem;
    }
    .wish-con{
      display:flex;
      flex-flow:row wrap;
      justify-content: flex-start;
      margin-top:0.54rem;
      text-align:left;
      .wish-item{
        position:relative;
        /*margin-right:0.4rem;*/
        margin-bottom:0.3rem;
        margin-left:0.3rem;
        display:inline-block;
        height:0.68rem;
        padding:0.2rem;
        text-align:center;
        font-size:0.28rem;
        color: #4A90E2;
        border: 1px solid #4A90E2;
        border-radius:2rem;
        box-sizing:border-box;
        span{margin-left:0.14rem;}
        i{
          position:absolute;
          visibility: hidden;
          top:-0.3rem;
          right:0.2rem;
          font-size:0.28rem;
          color: #4A90E2;
        }
        .tip{
          animation: sanmiao 2s ease-in-out;
        }
      }
      @keyframes sanmiao {
        0%{visibility: hidden;}
        25%{visibility: visible;}
        50%{visibility: visible;}
        75%{visibility: visible;}
        100%{visibility: hidden;}
      }
      @-webkit-keyframes sanmiao {
        0%{visibility: hidden;}
        25%{visibility: visible;}
        50%{visibility: visible;}
        75%{visibility: visible;}
        100%{visibility: hidden;}
      }
      .wish-item-active{
        background: #4A90E2;
        color:#fff;
      }

    }
    .bottom_bar {
      color: #DADEE4;
      /*padding:.13rem;*/
      text-align:center;
      font-size: .24rem;
      height: .5rem;
      line-height: .5rem;
      background: #F7F9FA;
    }
    .body-mark{
      position:fixed;
      top:0;
      left:0;
      z-index:999;
      width:100%;
      height:100%;
      opacity: 0.8;
      background: rgba(58,58,58,0.80);
    }
    .popup-con{
      position:fixed;
      top:40%;
      left:50%;
      z-index:10000;
      width:6.5rem;
      transform:translate(-50%,-50%);
      .popup-close{
        width:6.5rem;
        text-align:right;
        img{
          width:0.6rem;
          height:0.6rem;
          margin-bottom:0.3rem;
        }
      }
      .bf-popup-txt{
        background:$txtbg;
        width:6.5rem;
        min-height:2.88rem;
        border-radius:0.16rem;
        box-sizing:border-box;
        .bf-pop-title{
          padding:0 0.3rem;
          height:0.89rem;
          line-height:0.89rem;
          font-size:0.34rem;
          color: #4B4F63;
          text-align:center;
          border-bottom: 1px solid rgba(218,222,228,0.60);
        }
        .bf-pop-descr{
          padding:0.43rem 0.3rem 0;
          line-height:0.4rem;
          font-size:0.28rem;
          color: #4B4F63;
          text-align:left;
        }
      }
    }
    .absolute{position:absolute;}
    .relative{position:relative;}
  }
</style>
