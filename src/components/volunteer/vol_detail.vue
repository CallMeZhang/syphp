<template>
    <div id="vol_detail">
      <div v-title="basic_info.volunteer_org_name || '志愿组织详情'"></div>
      <transition name="fade">
        <loading v-show="isLoading"></loading>
      </transition>
      <transition name="fade">
        <div v-show="!isLoading" class="vol_detail_wrap relative">
          <!--头部-->
          <div class="top1">
            <div class="avatar">
              <div>
                <!--<img src="/bocm/platformjs/static/image/default/no_person11.png" alt="">-->
                <img :src="basic_info.avatar" alt="">
              </div>
            </div>
            <div class="vol_name font34 no-enter" style="padding:.1rem .3rem 0.04rem;">
              {{basic_info.volunteer_org_name}}
            </div>
            <div class="address3 text-center" style="padding:0 .3rem;">
              <div class="no-enter text-right" style="height:.3rem;line-height:.3rem;width:48%;display: inline-block;padding-right:.2rem;box-sizing: border-box">{{basic_info.city}}</div> <div style="display: inline-block;width:1px;background: #fff;height:.24rem;"></div> <div class="no-enter text-left" style="height:.3rem;line-height:.3rem;width:48%;display: inline-block;padding-left:.2rem;box-sizing: border-box">{{basic_info.area}}</div>
            </div>
            <div class="text3 font26">
              {{basic_info.summary}}
            </div>
            <div class="bot clearfix">
              <div class="left">
                已成立 {{basic_info.establish_days}} 天
              </div>
              <div class="right">
                <span>满意度</span>
                <img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/volunteer/star.png'" alt="" v-for="k in parseInt(basic_info.star - 0)"><img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/volunteer/half_star.png'" alt="" v-if="!isInteger(basic_info.star)">
              </div>
            </div>
          </div>
          <!--中间三项-->
          <div class="v_operate_wrap">
            <div class="v_operate font30">
              <ul class="clearfix admin_operate" v-if="isAdmin">
                <li class="op_left">
                  <p class="share_btn share_bg" @click="shareFn">分享</p>
                </li>
                <li class="op_center">
                  <p class="show_dimension er_img2" @click="isQShow = true">二维码</p>
                </li>
              </ul>

              <ul class="clearfix" v-if="!isAdmin">
                <li class="op_left">
                  <p class="share_btn share_bg" @click="shareFn">分享</p>
                </li>
                <li class="op_center">
                  <p class="show_dimension er_img2" @click="isQShow = true">二维码</p>
                </li>
                <li class="op_right">
                  <p class="join_status no_join2" style="color:#4A90E2" v-if="basic_info.member_auditing_status == 2" @click="join">申请加入</p>
                  <p class="join_status joining" style="color:#F25B4B " v-if="basic_info.member_auditing_status == 0">等待审核</p>
                  <p class="join_status joined2" style="color:#B1B8C4" v-if="basic_info.member_auditing_status == 1">已加入</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="bg_interval"></div>
          <!--成员列表-->
          <div class="v_middle_wrap">
            <div class="v_middle font26 box2">
              <div class="clearfix" id="member_list" @click="goMember && _appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=member_list&volunteer_org_id='+volunteer_org_id)">
                <div class="fl join_num">已加入{{statistics.member_joined}}人<span v-show="isAdmin">（新申请{{statistics.member_applied}}人）</span></div>
                <div class="fr">
                  <div class="clearfix">
                    <div class="fl portrait">
                      <div class="relative" id="v_avatar">
                        <!--<img src="/bocm/platformjs/static/image/default/no_person11.png" alt="">-->
                        <img v-lazy="item" alt="" v-for="item in statistics.recent_four_member_avatar">

                      </div>
                    </div>
                    <div class="fr v_gt" v-if="goMember"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg_interval"></div>

          <!--tab切换-->
          <div class="tab">
            <div class="nav">
              <ul class="clearfix">
                <li @click="tab_active = 'tab-container1'">
                  <div :class="{nav_active:tab_active === 'tab-container1'}">招募信息</div>
                </li>
                <li @click="tab_active = 'tab-container2'" >
                  <div :class="{nav_active:tab_active === 'tab-container2'}">志愿者评价</div>
                </li>
                <li @click="tab_active = 'tab-container3'" >
                  <div :class="{nav_active:tab_active === 'tab-container3'}">组织详情</div>
                </li>
              </ul>
            </div>
            <div class="tab_con">
              <mt-tab-container v-model="tab_active" :swipeable="false">
                <mt-tab-container-item id="tab-container1">
                  <!--招募信息-->
                  <div class="msg">
                    <ul v-if="recruit_list.length">
                      <!--成员-->
                      <li v-for="item in recruit_list" v-if="!isAdmin" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id)">
                        <div class="plr3 ptb24 text-left relative">
                          <div class="v_top2 " style="width: 100%;">
                            <div class="v_title font30 no-enter2">{{item.recruit_name}}</div>
                            <div class="v_sub clearfix font24 color81">
                              <div class="fl address_bg " style="max-width: 3rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap"><span v-if="item.offline_flag == 0">{{item.city + item.area}}</span><span v-if="item.offline_flag == 1">线上</span></div>
                              <!--<div style="height: 0.24rem;border: 1px solid #DADEE4;float: left;margin: 0.06rem 0.49rem;"></div>-->
                              <div class="fl time_bg no-enter" style="text-align: left;width: 30%;">{{item.add_time_str}}</div>
                            </div>
                            <div class="absolute tag" v-if="item.recruit_state =='未开始'" style="background: #99C6FC;color:#fff">
                            <!--<div class="absolute tag" v-if="true">-->
                              {{item.recruit_state}}
                            </div>
                            <div class="absolute tag" v-if="item.recruit_state == '招募中'">
                              <!--<div class="absolute tag" v-if="true">-->
                              {{item.recruit_state}}
                            </div>

                          </div>
                          <div class="v_bot2 font26 color66">
                            {{item.summary}}
                          </div>
                        </div>
                      </li>
                      <!--管理员-->
                      <li v-for="item in recruit_list" v-if="isAdmin" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id)">
                        <div class=" ptb24 text-left relative">
                          <div class="plr3">
                            <div class="v_top2">
                              <div class="v_title font30 no-enter2">{{item.recruit_name}}</div>
                              <div class="v_sub clearfix font24 color81">
                                <div class="fl address_bg" style="max-width: 3rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap"><span v-if="item.offline_flag == 0">{{item.city + item.area}}</span><span v-if="item.offline_flag == 1">线上</span></div>
                                <!--<div style="height: 0.24rem;border-left: 1px solid #DADEE4;float: left;margin: 0.06rem 0.49rem;"></div>-->
                                <div class="fl time_bg no-enter" style="text-align: left;width: 30%;">{{item.add_time_str}}发布</div>
                              </div>
                              <div class="absolute tag2 font26" @click.stop="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_member_list&recruit_id='+item.recruit_id)">
                                招募管理
                              </div>
                            </div>
                          </div>
                          <div class="v_bot3 font26 color66 plr3">
                            <div class="clearfix">
                              <div class="fl">已招募：<span style="color:#4A90E2">{{item.recruit_number}}</span>/{{item.max_number}} 人</div>
                              <div class="fl" style="margin-left:1rem;">待审核：<span style="color:#F25B4B">{{item.applied_count}}</span> 人</div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div class="no_comment" v-if="recruit_list.length == 0">
                      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/zhaomu_kong.png'" alt="">
                      <!--<img src="../../../static/image/volunteer/zhaomu_kong.png" alt="">-->
                      <p class="font32 colorb1">暂无招募信息</p>
                    </div>
                  </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container2">
                  <!--志愿者评价-->
                  <div class="comment" :style="{'-webkit-overflow-scrolling': scrollMode}">
                    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="comment_list.length == 0" :auto-fill="false" ref="loadmore" :bottomPullText="'上拉加载更多'" >
                      <ul v-if="comment_list.length">
                        <li v-for="item in comment_list">
                          <div class="">
                            <div class="fl avatar">
                              <img :src="item.member_avatar" alt="">
                            </div>
                            <div class="right">
                              <div class="box5">
                                <div class="top43">
                                  <div class="fl">
                                    <span class="font26 name">{{item.member_display_name}}</span>

                                  </div>
                                  <div class="fr">
                                    {{item.add_time}}
                                  </div>
                                </div>
                                <div class="desc colorb1">
                                  <p class="no-enter">
                                    参与了 <span style="color:#99C6FC">{{item.recruit_name}}</span>
                                  </p>
                                  <img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/volunteer/star.png'" alt="" v-for="k in parseInt(item.star - 0)"><img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/volunteer/half_star.png'" alt="" v-if="!isInteger(item.star)">
                                </div>
                                <!--评价-->
                                <div class="feed_text text-left">
                                  {{item.content}}
                                </div>
                                <!--<div style="height:10px;background: #000;" v-show="item.reply_content"></div>-->
                                <div class="reply" v-if="item.reply_content != ''">
                                  <span>管理员</span><span style="color:#4A90E2">回复 </span>：{{item.reply_content}}
                                </div>
                                <div class="feedback" v-if="item.reply_content == '' && isAdmin ">
                                  <div  @click="feedback(item)">
                                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/feedback.png'" alt=""> <span class="font26">回复</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div class="no_comment" v-if="comment_list.length == 0">
                        <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/volunteer/pingjia_kong.png'" alt="">
                        <!--<img src="../../../static/image/volunteer/pingjia_kong.png" alt="">-->
                        <p class="font32 colorb1">暂无志愿者评价</p>
                      </div>
                    </mt-loadmore>


                  </div>

                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container3">
                  <div class="org_detail" v-if="org_detail">
                    <div v-html="org_detail"></div>
                  </div>
                  <div class="no_comment" v-if="!org_detail">
                    <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/volunteer/xiangqing_kong.png'" alt="">
                    <!--<img src="../../../static/image/volunteer/xiangqing_kong.png" alt="">-->
                    <p class="font32 colorb1">暂无组织详情</p>
                  </div>
                </mt-tab-container-item>
              </mt-tab-container>
            </div>
          </div>

          <!--咨询和举报-->
          <a class="vol_share_img1 vol-detail-btn1" @click="getAsk($event)" ref="call" v-show="tab_active === 'tab-container3'">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/consult2.png'" alt="">
          </a>
          <a class="vol_accuse_img1 vol-detail-btn2" @click="goInform" v-show="tab_active === 'tab-container3'">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/tip_offs.png'" alt="">
          </a>

          <!--管理员回复-->
          <pop @close="popShow = false" v-show="popShow">
            <div class="reply_box">
              <div class="title4">回复</div>
              <div class="content4">
                <textarea name="" cols="30" rows="10" placeholder="请填写回复内容，不少于10个汉字。" v-model="reply_input" ></textarea>
              </div>
              <div class="button4">
                <div class="btn" @click="replySubmit()">提交</div>
              </div>
            </div>
          </pop>

          <!--投诉-->
          <pop @close="popComplaint = false" v-show="popComplaint">
            <div class="reply_box" :style="(isA&&p)?address:''">
              <div class="title4">投诉</div>
              <div class="check_box">
                <ul>
                  <li v-for="item in complaintList" @click="complaint(item)">
                    <div class="clearfix">
                      <div class="check_img fl" :style="{borderColor:item.checked?'#fff':''}">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/checked3.png'" alt="" v-show="item.checked">
                      </div>
                      <div class="check_text fl">
                        {{item.text}}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="content4">
                <textarea name="" id="" cols="30" rows="10" placeholder="请填写举报内容，不少于10个汉字。" v-model="inform_content" @focus="p=true" @blur="onBlur" :disabled="other?false:'disabled'"></textarea>
              </div>
              <div class="button4">
                <div class="btn" @click.stop="inform">提交</div>
              </div>
            </div>
          </pop>

          <!--分享-->
          <share-img v-if="showShareImg" @click.native= "showShareImg = false"></share-img>

          <!--二维码-->

          <div class="mask" style="z-index: 100000000;background: rgba(58,58,58,0.80)" v-show="isQShow" @click="isQShow = false">
            <div class="cen" style="background: #fff;padding:.46rem;border-radius: .08rem;">
              <div class="font34" style="padding-bottom:.26rem;"> {{basic_info.volunteer_org_name}}</div>
              <div style="width:5rem;height:5rem;position: relative">
                <img id="qrcode" style="width:5rem;height:5rem;">
                <div style="position: absolute;left:50%;top:50%;margin-left:-.5rem;margin-top:-.5rem;height:1rem;width:1rem;background: #fff;border-radius:50%;overflow: hidden;">
                  <div style="width:.88rem;height:.88rem;overflow: hidden;border-radius: 50%;" class="cen">
                    <img :src="basic_info.avatar" alt="" style="width:100%;height:100%;">
                  </div>
                </div>
              </div>
              <div class="font26" style="padding-top:.2rem;">扫描二维码，加入志愿组织</div>
            </div>
          </div>

        </div>
      </transition>

    </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
//  import {} from '@/requests/index'
  import pop from '@/components/common/popups.vue'
  import shareImg from '@/components/common/shared_img.vue'
  import vue_share from '@/assets/js/share'
//  import VueQr from 'vue-qr'
//  import AwesomeQRCode from 'awesome-qr'


//  import Swiper from '../../../static/js/swiper-3.4.2.min'
  import {Toast} from 'mint-ui'
  export default {
    data(){
        return {
          p:false,
          isA:false,
          address:{
            transform:'translateY(-2.4rem)',
            transition:'all .2s'
          },
          isLoading:true,
          is_share:false,
          tab_active:'tab-container1',
          isAdmin:false,
          isLogin:false,
          isLoginReturn:false,
          popShow:false,  // 管理员回复
          replyItem:{},
          popComplaint:false, // 举报
          volunteer_org_id:1,
          curpage:1,
          scrollMode:'auto',
          other:false,
          role:'2',        // 用户身份 //0其他, 1游客, 2成员, 3管理员
          goMember:false,
          basic_info:{star:0},  //基本信息
          statistics:[],  //成员统计信息
          recruit_list:[], // 招募列表
          comment_list:[],  // 评价列表
          allCommentLoad:false,
          org_detail:'',   // 组织详情
          phone_num:'', // 举报电话
          showShareImg:false,
          reply_input:'',// 回复内容
          offline_flag:'',  // 1 线上  0 线下
//          text:'https://www.baidu.com',
          isQShow:false,  // 二维码显示
          src2:this.siteInfo.host+'/bocm/platformjs/static/image/default/no_person11.png',
          inform_content:'',  // 举报内容
          complaintList:[ // 1广告、欺诈内容, 2包含色情、淫秽或暴力内容, 3虚假的志愿招募信息, 4发布反动言论, 5其他原因
            {
              checked:false,
              text:'广告、欺诈内容',
              id:'1'
            },
            {
              checked:false,
              text:'包含色情、淫秽或暴力内容',
              id:'2'
            },
            {
              checked:false,
              text:'虚假的志愿招募信息',
              id:'3'
            },
            {
              checked:false,
              text:'发布反动言论',
              id:'4'
            },
            {
              checked:false,
              text:'其他原因',
              id:'5'
            },
          ],
        }
    },
    created(){


//      let url = encodeURIComponent(location.href)

//        console.log(VueQr)
      this.volunteer_org_id = this.$route.query.volunteer_org_id || 23;
      this.is_share = this.$route.query.is_share === 'yes';
      this.getUp()
    },
    mounted(){
//      this.siteInfo.host = 'https://gongyi.17shanyuan.com'
      setTimeout(()=>{
        let AwesomeQRCode = require('../../../static/js/awesome-qr.min')
        new AwesomeQRCode().create({
          text: this.siteInfo.host+'/bocm/index.php?act=index&op=showvue#/volunteer/vol_detail?volunteer_org_id='+this.volunteer_org_id + '&is_share=yes',
          size: 800,
          margin: 20,
          colorDark: "#000000",
          colorLight: "#ffffff",
//        gifBackground: gifBackgroundArrayBuffer,
//        backgroundImage: backgroundImg,
          backgroundDimming: 'rgba(0,0,0,0)',
//        logoImage: this.src2,
          logoScale: 0.2,
          logoMargin: 6,
          logoCornerRadius: 8,
          whiteMargin: true,
          dotScale: .8,
          autoColor: true,
          binarize: false,
          binarizeThreshold: 128,
          callback: function(dataURI){},
          bindElement: 'qrcode'
        });

        let info = this._appjs.syJsbGetAppVersion()
        if (info['platform'] === 'ios' || info['platform'] === 'android') {
          this._appjs.syJsbSetGoBackUrl("goBackOfDetail()");
        }

      },10)


    },
    updated(){

//        console.log(this.$data)
    },
    methods:{
      getUp(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_volunteer_updating').then(res=>{
          if(res.data.code == 701){
            window.location.href= this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=is_updating'
          }else{
            this.getData()
            this.isA = this._appjs.isAndroid()
            setTimeout(()=>{
              this.isLoading = false;
            },2000)
            this.getInfo()
          }
        })
      },
      getInfo(){
        var _this = this
        this._appjs.syJsbGetAppInfo(function (appInfo) {
          if (!appInfo) {
            _this.is_share = 'yes'
            console.log('wai')
          } else {
            _this.is_share = ''
            console.log('nei')
          }
        })
      },
      onBlur(){
        setTimeout(()=>{this.p=false},100)
      },
      checkLogin(){
        return this.$http.get(this.query('is_login')).then(res=>{
          return res && res.data && res.data.code == 200
        })
      },

      getData(){
        this.$http.get(this.query('is_login')).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.isLogin = true;
          }
          this.isLoginReturn = true;

        })
        // volunteer_org_member_role  获取当前用户的身份

        this.$http.get(this.query('volunteer_org_member_role',{volunteer_org_id:this.volunteer_org_id})).then(res=>{


          if(res && res.data && res.data.code == 200){
            this.role = res.data.content;
//            this.role = 2
            this.goMember = this.role == '2' || this.role == '3';
//            this.goMember = true;
            this.isAdmin = this.role == 3
          }
          this.isLoading = false;
        })
        //1 获取志愿组织详情页的基本信息以及操作区的接口
//        let api = this.siteInfo.host+'/api/index.php?act=volunteer&op=volunteer_org_basic_info&volunteer_org_id=' + this.volunteer_org_id;
        let api = this.query('volunteer_org_basic_info',{
          volunteer_org_id:this.volunteer_org_id
        })
        this.$http.get(api).then(res=>{

            if(res && res.data && res.data.code == 200){
              this.basic_info = res.data.content;
              this._appjs.syJsbSetTitleText(this.basic_info.volunteer_org_name);
            }else if(res && res.data && res.data.code){
                this._appjs.syJsbAlert(res.data.message)
            }else{
              this._appjs.syJsbAlert('网络错误')
            }

            // 微信二次分享
            setTimeout(() => {
              vue_share({
                url:this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+this.volunteer_org_id + '&is_share=yes',
                title:this.basic_info['volunteer_org_name'],
                text:this.basic_info['summary'],
                logo:this.basic_info['avatar']
              })

            },10)
        });

        //2 获取志愿组织详情页的成员统计信息的接口
        this.$http.get(this.query('volunteer_org_member_statistics',{volunteer_org_id:this.volunteer_org_id})).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.statistics = res.data.content;
            this.statistics.recent_four_member_avatar.reverse()
          }
        })


        //3 获取志愿组织详情页的招募信息的接口（游客，队员，管理员三种情况）
        this.$http.get(this.query('volunteer_org_recruit_list',{volunteer_org_id:this.volunteer_org_id})).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.recruit_list = res.data.content;
//            this.recruit_list = []
          }
        });

        //4 获取志愿组织详情页的志愿者评价的接口（游客，队员，管理员三种情况）
        this.$http.get(this.query('volunteer_org_comment_list',{volunteer_org_id:this.volunteer_org_id,curpage:this.curpage})).then(res=>{
          this.curpage ++;

          if(res && res.data && res.data.code == 200){
            this.comment_list = res.data.content;
          }
        });

        //5 获取志愿组织详情页的组织详情的接口
        this.$http.get(this.query('volunteer_org_detail',{volunteer_org_id:this.volunteer_org_id})).then(res=>{


          if(res && res.data && res.data.code == 200){
            this.org_detail = res.data.content;
          }
        });



        //6 获取咨询电话的接口
        this.$http.get(this.query('volunteer_org_contact',{volunteer_org_id:this.volunteer_org_id})).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.phone_num = res.data.content;
          }
        });

      },
      loadBottom(){
        if(this.allCommentLoad) {
          setTimeout(()=>{this.$refs.loadmore.onBottomLoaded()},500)
          Toast({
            message:'暂无更多数据',
            duration:1000,
          });
          return;
        }
        this.$http.get(this.query('volunteer_org_comment_list',{volunteer_org_id:this.volunteer_org_id,curpage:this.curpage})).then(res=>{


          if(res && res.data && res.data.code == 200){
            this.curpage ++;
            if(res.data.content.length === 0){
              this.allCommentLoad = true;
              this.comment_list.concat(res.data.content);
              return;
            }
          }else{
            this.allCommentLoad = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        },()=>{
          this.$refs.loadmore.onBottomLoaded();
        });
      },
      // 咨询 打电话
      getAsk(e){
        if( this.is_share){
          this.$refs.call.href='tel:'+ this.phone_num
        }else{
//          e.targ et.href='tel:'+ this.phone_num
//          this.$refs.call.href='tel:' + '18233081866'
//          this.$refs.call.href='tel:'+ this.phone_num
          e.preventDefault();
          this._appjs.syJsbCallPhone(this.phone_num);
        }
      },
      // 举报弹框
      goInform(){
        this.goLogin(()=> {
          this.popComplaint = true
        })
      },
      // 举报
      inform(){

          var qs = require('querystring');
          let arr = this.complaintList.filter( k => k.checked === true );
          if(!arr.length){
            Toast({
              message:'请至少选择一项投诉原因',
              duration:1000,
              className:'toast'
            });
            return
          }
          if(this.other && this.inform_content.trim().length < 10){
            Toast({
              message:'举报原因不少于10个字',
              duration:1000,
              className:'toast'
            });
            return
          }
          this.popComplaint = false
          let sendData = qs.stringify({
            volunteer_org_id:this.volunteer_org_id,
            inform_subject_ids:arr.map( k => k.id).join(','),  // 举报原因
            inform_content:this.inform_content
          });

          this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=volunteer_org_inform_submit',sendData).then(res=>{
            if(res && res.data && res.data.code == 200){
              Toast({
                message:'举报成功',
                duration:1000,
                className:'toast'
              });
            }else if(res && res.data && res.data.message){
              Toast({
                message:res.data.message,
                duration:1000,
                className:'toast'
              });
            }else{
              Toast({
                message:'举报失败',
                duration:1000,
                className:'toast'
              });
            }
          })

      },
      // 管理员回复
      feedback(item){
        this.popShow = true;
//        item.reply_content = 'hello'
        this.replyItem = item;
      },
      // 管理员回复接口
      replySubmit(){
        this.popShow = false;
        var qs = require('querystring');
//        this.replyItem.reply_content = this.reply_input;
        if(this.reply_input.trim() === ''){
          Toast({
            message:'回复内容不能为空',
            duration:1000,
            className:'toast'
          });
          return
        }
        let sendData = qs.stringify({
          volunteer_org_id:this.volunteer_org_id,
          comment_id:this.replyItem.comment_id,
          to_id:this.replyItem.publisher_id,
          content:this.reply_input,

        })

        this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=reply_submit',sendData).then(res=>{
          if(res && res.data && res.data.code == 200){
            this.replyItem.reply_content = this.reply_input;
            this.reply_input = '';
          }else if(res && res.data && res.data.message){
            Toast({
              message:res.data.message,
              duration:1000,
              className:'toast'
            });
          }
        })
      },
      // 申请加入
      join(){
        this.goLogin(()=>{
          var qs = require('querystring');
          let sendData = qs.stringify({
            volunteer_org_id:this.volunteer_org_id,

          })
          this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_realname_auth').then(res=>{
            if(res && res.data && res.data.code == 200){
              if(!res.data.content.is_realname_auth){
                // 需要实名认证
                location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=authentication&gycallback='+encodeURIComponent(location.href)
              }else{
                this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=add_volunteer_org_member',sendData).then(res=>{
                  if(res && res.data && res.data.code == 200){
//                    this.basic_info.member_auditing_status = 0
//                    location.reload();
                    if(res.data.content.apply_result == 2){

                      if(this.statistics.recent_four_member_avatar.length > 3){
                        this.statistics.recent_four_member_avatar.shift()
                      }
                      this.statistics.recent_four_member_avatar.push(res.data.content.member_avatar)
                      this.basic_info.member_auditing_status = 1
                      this.goMember = true;
                    }else if(res.data.content.apply_result == 1){

                      this.basic_info.member_auditing_status = 0
                    }else{
                      if(res.data.content.apply_message){
                        Toast({
                          message: res.data.content.apply_message,
                          duration: 1000
                        });
                      }
                    }

                  }else{
                    this._appjs.syJsbAlert(res.data.message)
                  }
                })
              }
            }else if(res && res.data){
                this._appjs.syJsbAlert(res.data.message)
            }else{
              this._appjs.syJsbAlert('网络异常')
            }
          })

        })

      },
      goLogin(fn){
        this.checkLogin().then(flag=>{
          if(flag){
            fn()
          }else{
            if(!this.is_share){
              location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+encodeURIComponent('volunteer/vol_detail?volunteer_org_id='+this.volunteer_org_id+'&is_share=')
            }else{
              location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+encodeURIComponent('volunteer/vol_detail?volunteer_org_id='+this.volunteer_org_id+'&is_share=yes')
            }
          }
        })
//        if(this.isLogin && this.isLoginReturn){
//          fn()
//        }else{
//          if(!this.is_share){
//            this._appjs.syJsbLaunchWebview(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+encodeURIComponent('volunteer/vol_detail?volunteer_org_id='+this.volunteer_org_id+'&is_share='))
////            this._appjs.syJsbLaunchWebview(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login')
//          }else{
//            location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+encodeURIComponent('volunteer/vol_detail?volunteer_org_id='+this.volunteer_org_id+'&is_share=yes')
////            location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login'
//          }
//        }
      },
      // 分享
      shareFn(){
//        this.is_share = true
        if(this.is_share){
          this.showShareImg = true;
        }else{
          let shareUrl = this.siteInfo.host_share+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+this.volunteer_org_id + '&is_share=yes';
          let shareText = this.basic_info['summary'];
          let shareTitle = this.basic_info['volunteer_org_name'];
          let shareLogo = this.basic_info['avatar'];
          let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
          let jsonParam = JSON.stringify(params);
          this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
        }

      },
      complaint(item){
        item.checked = !item.checked
      },
      isInteger(obj) {
        return obj%1 === 0
      },
      query(api,obj){
        let str = '';
        if(obj){
          for(var k in obj){
            str += '&'+ k + '=' + obj[k]
          }
        }
        return this.siteInfo.host+'/api/index.php?act=volunteer&op='+api+str
      }


    },
    watch:{
      complaintList:{
        handler:function(val,old) {
          this.other = val[val.length - 1]['checked']
        },
        deep: true

      }
    },
    components:{loading,pop,shareImg}

  }
</script>

<style lang=scss>
  #vol_detail .org_detail img{
    margin:.2rem 0 !important;
    max-width:100% !important;
  }
  #vol_detail .org_detail p{
    line-height:.4rem !important;
    font-size: .28rem !important;
  }
  #vol_detail .org_detail{
    font-size: .28rem !important;
    color:#818C9E !important;

  }
  #vol_detail .org_detail b,#vol_detail .org_detail strong{
    font-weight:bold !important;
  }
  .toast{
    z-index: 999999999999 !important;
  }

</style>

<style lang="scss" scoped>

  @import "/bocm/platformjs/static/css/common.css";
$text: #4B4F63;
$middle:#666A7F;
$min:#818C9E;
$bule3:#4A90E2;
$border:#DADEE4;
  #vol_detail{
    width:100%;
    min-height:inherit;
    font-weight: 300;
    background: #fff;
    vertical-align: bottom;
  }
  .vol_detail_wrap{
    .top1{
      /*height:3.68rem;*/
      background: linear-gradient(to bottom, #6CDFFF,#3C98F1);
      color:#fff;

      .avatar{
        padding:.38rem 0 .14rem;
        text-align: center;
        > div {
          height:1.02rem;
          width:1.02rem;
          border-radius: 50%;
          overflow: hidden;
          display: inline-block;
          box-shadow: 1px 2px 10px #189ED6;
          border:2px solid #fff;
        }
        img{
          height:1.02rem;
          width:1.02rem;
          border-radius: 50%;
        }

      }

      .vol_name{
        line-height: .48rem;
      }
      .address3{

        /*line-height: .3rem;*/
        font-size: .24rem;
        /*padding-top:.1rem;*/
      }
      .text3{
        padding:.1rem;
      }
      .bot{
        padding:.12rem 0.9rem .3rem;

        .left{

        }
        .right{
          /*margin-left:1rem;*/
          img{
            width:.22rem;
            margin-left:.04rem;
          }
        }
      }
      .bot > div{
        width:50%;
        float: left;
        box-sizing: border-box;
        /*display: inline-block;*/
      }
    }

    .v_operate_wrap{
      color:$text;
      .v_operate{
        padding:.4rem 0;
        border-top:1px solid #eee;
      }
      .v_operate li{
        width:33.33%;
        float:left;
        text-align: center;
      }
      .v_operate li img{
        /*float: left;*/
        width:.3rem;
      }
      .v_t_img{
        width:20%;
        box-sizing: border-box;
      }
      .v_top_text{
        width:80%;
        padding-left:.16rem;
        box-sizing: border-box;
      }
      .v_operate li p{
        /*float: left;*/
        display: inline-block;
        padding-left:.4rem;
        background-size:.3rem .3rem;
      }
      .admin_operate{
        padding:0 .8rem;
      }
      .admin_operate > li{
        width:50%;
      }
    }

    .v_middle_wrap{
      color:$text;
      .v_middle{
        padding:.2rem .3rem;
      }
      .join_num{
        height:.6rem;
        line-height: .6rem;
      }
      .none{
        display: none;
      }
      .portrait{
        height:.6rem;
      }
      .portrait img{
        width:.6rem;
        height:.6rem;
        position: absolute;
        right:0;
        top:0;
        border-radius: .3rem;
      }
      .portrait img:nth-child(2){
        /*width:.68rem;*/
        /*height:.68rem;*/
        /*position: absolute;*/
        right:.5rem;
        top:0;
        /*border-radius: .34rem;*/
        z-index: 20;
      }
      .portrait img:nth-child(3){
        right:1rem;
        top:0;
        z-index: 30;
      }
      .portrait img:nth-child(4){
        right:1.5rem;
        top:0;
        z-index: 40;
      }
      .v_gt{
        margin-left:.16rem;
        height:.6rem;
        width:.16rem;
        background: url("/bocm/platformjs/static/image/default/list_title_right1.png") left center no-repeat;
        background-size: .16rem .3rem;
      }
    }

    .tab{
      color:$text;

      .nav{
        padding:0 .2rem;
        height:.9rem;
        border-bottom: 1px solid #DADEE4;
        font-size: .3rem;
        ul > li{
          float: left;
          height:.9rem;
          line-height: .9rem;
          box-sizing: border-box;
          width:33.3333%;
          padding:0 .2rem;
        }
        ul > li > div{
          box-sizing: border-box;
        }
        .nav_active{
          height:.9rem;
          box-sizing: border-box;
          color:#4A90E2;
          border-bottom: 2px solid #4A90E2;
        }
      }

      .tab_con{
        /*padding:.4rem .3rem;*/
        padding-bottom:.3rem;
        .msg{
          /*.no_comment{*/
            /*padding-top:1rem;*/
            /*img{*/
              /*width:1.84rem;*/
            /*}*/
            /*p{*/
              /*padding-top:.5rem;*/
            /*}*/
          /*}*/
        }
        .msg ul{
          padding:.1rem .3rem;

          li{
            /*background: #ccc;*/
            margin-top:.3rem;
            box-sizing: border-box;
            /*border:1px solid #4A90E2;*/
            /*-webkit-box-shadow: 0 0 15px 0 rgba(74,144,226,0.20);*/
            /*-moz-box-shadow: 0 0 15px 0 rgba(74,144,226,0.20);*/
            box-shadow: 0 0 15px 0 rgba(74,144,226,0.20);
            border-radius: .1rem;
          }

          .v_top2{
            /*width:4.4rem;*/
            padding:.02rem 0 .12rem;

            .v_title{
              line-height: .4rem;
              width:80%;
              /*max-height: .8rem;*/
              /*overflow: hidden;*/
            }
            .v_sub{
              padding-top:.08rem;
            }

          }

          .v_bot2{
            line-height: .36rem;
          }
          .v_bot3{
            margin-top:.1rem;
            /*height:.76rem;*/
            /*line-height: .76rem;*/
            padding-top:.24rem;
            border-top:1px solid #DADEE4;
          }

          .tag{
            right:.3rem;
            top:.2rem;
            background: #F8E71C;
            /*padding:.04rem .2rem;*/
            height:.34rem;
            line-height: .38rem;
            padding:0 .14rem;
            border-radius: .17rem .17rem .17rem 0;
            color: #4A90E2;
          }
          .tag2{
            top:.36rem;
            right:.3rem;
            /*padding-top:.1rem;*/
            color:$bule3;
          }

        }

        .comment {
          padding:0 .3rem;
          /*.no_comment{*/
            /*padding-top:1rem;*/
            /*img{*/
              /*width:1.84rem;*/
            /*}*/
            /*p{*/
              /*padding-top:.5rem;*/
            /*}*/
          /*}*/
          ul{
            padding:.1rem 0;

            li{
              padding-top:.3rem;
            }

          }
          li:last-child .box5{
            border-bottom:none;
          }
          .avatar img{
            height:.8rem;
            width:.8rem;
            border-radius: 50%;
          }
          .star{
            height:.22rem;
          }

          .right{
            margin-left:1.02rem;
          }

          .box5{
            text-align: left;
            border-bottom: 1px solid $border;
            padding-bottom:.36rem;

            .top43{
              height:.4rem;
              padding-top:.08rem;
            }
            .name{
              padding-top:.04rem;
              line-height: .38rem;
            }
            .feedback{
              text-align: right;
              padding-top:.1rem;
              >div{
                display: inline-block;
              }
              img{
                /*margin-top:.06rem;*/
                width:.3rem;
                vertical-align: middle;
              }
            }

            .desc{
              width:5rem;
              padding-top:.04rem;

              p{
                width:3.15rem;
                display: inline-block;
              }
              img{
                width:.22rem;
              }
            }

            .feed_text{
              padding-top:0.1rem;
              line-height: .42rem;
              font-size: .3rem;
            }

            .reply{
              position: relative;
              margin-top:.26rem;
              border:1px dashed #C8DDF5;
              box-sizing: border-box;
              padding:.16rem .2rem;
              line-height: .4rem;
              font-size: .28rem;
              background: #F6FAFF;
              border-radius: .08rem;
            }
            .reply::after{
              content:"";
              position: absolute;
              left:.4rem;
              top:-.1414rem;
              width:.2rem;
              height:.2rem;
              background: #F6FAFF;
              transform: rotate(45deg);
              border-top:1px dashed #C8DDF5;
              border-left:1px dashed #C8DDF5;
            }
          }
        }


      }

    }

    .org_detail{
      text-align: left;
      padding:.3rem ;
      /*padding-top:.3rem;
      padding-bottom:.3rem;*/
    }
    .reply_box{
      width:6.5rem;
      background: #fff;
      border-radius: .16rem;
      color:#4B4F63;
      padding-bottom:.3rem;

      .title4{
        font-size: .34rem;
        line-height: .9rem;
        height:.9rem;
        border-bottom: 1px solid #DADEE4;
      }

      .check_box{
        padding:.4rem .3rem 0;

        li{
          margin-bottom:.2rem;
        }
        li:last-child{
          margin-bottom:0.1rem;
        }
        .check_img{
          height:.5rem;
          width:.5rem;
          border-radius: 50%;
          border:1px solid #DADEE4;
          box-sizing: border-box;
          overflow: hidden;

          img{
            position: relative;
            /*<!--margin-left:-1px;-->*/
            /*<!--margin-top:-1px;-->*/
            /*height:.5rem;*/
            /*width:.5rem;*/
            width:100%;
            height:100%;
            box-sizing: border-box;
          }
        }

        .check_text{
          margin-left:.3rem;
          font-size: .3rem;
          line-height: .5rem;
          height:.5rem;
        }
      }
      .content4{
        padding-top:.43rem;
        textarea{
          border:1px solid $border;
          height:1.6rem;
          width:5.7rem;
          padding:.2rem;
          border-radius: .08rem;
          resize: none;
        }
      }

      .button4{
        padding:.4rem;
        .btn{
          font-size: .32rem;
          width:3.5rem;
          height:.88rem;
          line-height: .9rem;
          margin:0 auto;
          background: #4A90E2;
          color:#fff;
          border-radius: .08rem;
        }
      }
    }

    .vol_share_img1,.vol_accuse_img1{
      position: fixed;
      right:.3rem;
      width:.9rem;
      height:.9rem;
      img{
        width:.9rem;
        height:.9rem;
      }
    }
    .vol_share_img1{
      bottom:1.6rem;
    }
    .vol_accuse_img1{
      bottom:.5rem;
    }

  }

  .toast66{
    z-index: 10000000000 !important;

  }

  .bg_interval{
    background: #F7F9FA;
    height:.2rem;
  }
  .plr3{
    padding-left:.3rem;
    padding-right:.3rem;
  }
  .ptb24{
    padding-top:.24rem;
    padding-bottom:.24rem;
  }
  .address_bg{
    background: url('/bocm/platformjs/static/image/volunteer/address.png') no-repeat left 40%;
    /*padding-left:.3rem;*/
    padding:.1rem 0 .1rem .3rem;
    background-size:.24rem auto;
    > span{
      padding-right:.5rem;
      border-right:1px solid $border;
    }
  }
  .time_bg{
    margin-left:.5rem;
    background: url('/bocm/platformjs/static/image/volunteer/time2.png') no-repeat left 40%;
    /*padding-left:.3rem;*/
    padding:.1rem 0 .1rem .3rem;
    background-size:.26rem auto;
  }
  .share_bg{
    background: url('/bocm/platformjs/static/image/volunteer/share_img9.png') no-repeat left top;
    padding-left:.24rem;
    background-size:.2rem auto;
  }
  .er_img2{
    background: url('/bocm/platformjs/static/image/volunteer/er_img2.png') no-repeat left top;
    padding-left:.24rem;
    background-size:.2rem auto;
  }
  .join_status{
    padding-left:.24rem;
    background-size:.2rem auto;
  }
  .no_join2{
    background: url('/bocm/platformjs/static/image/volunteer/join2.png') no-repeat left top;
  }
  .joining{
    background: url('/bocm/platformjs/static/image/volunteer/examine1.png') no-repeat left top;
  }
  .joined2{
    background: url('/bocm/platformjs/static/image/volunteer/joined.png') no-repeat left top;
  }
  .color4b{
    color:#4B4F63;
  }
  .color81{
    color:#818C9E;
  }
  .color66{
    color:#666A7F;
  }
  .colorb1{
    color:#B1B8C4;
  }
  .no-enter2{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .no_comment{
    padding-top:1rem;
    img{
      height:1.84rem;
    }
    p{
      padding-top:.5rem;
    }
  }
</style>
