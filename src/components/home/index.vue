<template>
  <div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div v-if="!isLoading">
        <div class="container">
          <!--<div class="index-box" :style="{background:top_bg}" style="background-size: 100% 100%">
              <ul class="me-top-box">
                  <li class="me-top-box-L"><img  @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=home&op=member_more')" :src="memberInfo.avatar_url" :onerror="'this.src=\''+siteInfo.host+'/bocm/platformjs/static/image/bigLoveShop/man.png\''" alt="正努力加载…"></li>
                  <li class="me-top-box-C">
                      <div class="new-name">{{memberInfo.user_name}}</div>
                      <div class="new-person-lable">{{roleName}}{{adminText ? "("+adminText+")" : ''}}</div>
                      <div class="new-person-tit">感谢您参与{{memberInfo.channel_name}}公益精准扶贫{{memberInfo.support_day}}天。<br>担当社会责任，我们一起行动。</div>
                  </li>
              </ul>
              <div class="me-top-data-box hide">
                <div class="" @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=point&op=donation_detail_list')">帮扶明细：{{donation}} 元
                    <img :src="siteInfo.host+'/bocm/platformjs/static/image/jiantou.png'" alt="箭头" style="width: 0.1rem;height: 0.2rem;vertical-align: middle;margin-left: 0.05rem;">
                  </div>
                  <div @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=point&op=point_detail_list')" >公益积分：{{memberInfo.points}} 积分
                    <img :src="siteInfo.host+'/bocm/platformjs/static/image/jiantou.png'" alt="箭头" style="width: 0.1rem;height: 0.2rem;vertical-align: middle;margin-left: 0.05rem;">
                  </div>
              </div>
              <div class="me-top-install" @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=home&op=member_more')">
                  <img :src="siteInfo.host + '/bocm/platformjs/static/image/me_top_install.png'" alt="正努力加载…"/>
              </div>
          </div>-->
          <!--新头部开始-->
          <div class="new-index" :style="{background:top_bg_new}">
            <div class="new-top-con">
              <div class="top-me-img"
                   @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=home&op=member_more')"><img
                  :src="memberInfo.avatar_url"
                  :onerror="'this.src=\''+siteInfo.host+'/bocm/platformjs/static/image/bigLoveShop/man.png\''"
                  alt="正努力加载…"></div>
              <div class="top-me-con">
                <h2 class="me-top-name clearfix"><span class="txt">{{memberInfo.user_name}}</span><span
                    @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=home&op=member_more')"
                    class="top-set"></span></h2>
                <h3 class="me-top-position">{{roleName}}{{adminText ? "(" + adminText + ")" : ''}}</h3>
                <p class="me-top-descr">感谢您参与{{memberInfo.channel_name | getName}}公益精准扶贫{{memberInfo.support_day}}天。<br>担当社会责任，我们一起行动。
                </p>
              </div>
            </div>
            <div class="top-message"
                 @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=message&op=index')"><img
                :src="siteInfo.host+'/bocm/platformjs/static/image/me_message.png'" alt="message"><span
                class="message-dot" v-if="newMessage"></span></div>
          </div>
          <div :class="{'new-index-item':notWallet,'new-index-item2':showWallet}">
            <div class="index-item"
                 @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=point&op=donation_detail_list')">
              <h3 class="item-num">{{donation}}</h3>
              <p class="item-descr">帮扶明细(元)</p>
            </div>
            <div :class="{'index-item':true,'margin-left2':notWallet}"
                 @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=point&op=point_detail_list')">
              <h3 class="item-num">{{memberInfo.points ? memberInfo.points : 0 }}</h3>
              <p class="item-descr">公益积分</p>
            </div>
            <div v-if="showWallet" class="index-item"
                 @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=wallet_router&op=sywall_index')">
              <h3 class="item-num">{{publicIntegral ? publicIntegral : 0}}</h3>
              <p class="item-descr">公益钱包(元)</p>
            </div>
          </div>
          <!--新头部结束-->

          <div class="v2-zizhu bg" v-if="isPoor || isAgent">
            <div class="v3-me-samlltit color-gray bg-c">订单管理</div>
            <div class="v2-zizhu-list active"
                 @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=home&op=all_store_goods_order_list_agent')">
              <div class="v2-zizhu-list-L">出售的全部订单</div>
              <div class="v2-zizhu-list-R"></div>
              <div class="v2-zizhu-list-C"></div>
            </div>
          </div>
          <div class="line"></div>
          <ul class="my-dlr-top hide" v-if="isPoor || isAgent">
            <a @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=home&op=send_goods_batch_boc&poor_member_id='+memberInfo.member_id)">
              <li><img :src="siteInfo.host + '/bocm/platformjs/static/image/me_wait_goods.png'"/>
                <div>待发货</div>
                <span v-if="myStoreNewGoodsBatchCount > 0"></span></li>
            </a>
            <a @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=home&op=all_store_goods_order_list_agent&order_state='+orderState)">
              <li><img :src="siteInfo.host + '/bocm/platformjs/static/image/me_get_goods.png'"/>
                <div>待收货</div>
              </li>
            </a>
            <a @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=home&op=agent_all_refund_manager_list')">
              <li><img :src="siteInfo.host + '/bocm/platformjs/static/image/me_back_money.png'"/>
                <div>退款管理</div>
                <span v-if="refundNum > 0"></span>
              </li>
            </a>
            <a @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=evaluate&op=store_evaluate_manager')">
              <li><img :src="siteInfo.host + '/bocm/platformjs/static/image/me_massage.png'"/>
                <div>评价管理</div>
              </li>
            </a>
          </ul>
          <div v-if="isBigBoss">
            <div class="line"></div>
            <div class="v2-zizhu bg">
              <div class="v2-zizhu-list active"
                   @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=union&op=rank_customized_boc')">
                <div class="v2-zizhu-list-L">一把手光荣榜</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C"></div>
              </div>
            </div>
          </div>
          <!--<div class="line"></div>-->
          <!--<div class="v2-zizhu bg">
              <div class="v2-zizhu-list active" @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=message&op=index')">
                  <div class="v2-zizhu-list-L">消息中心<span class="red-point" v-if="newMessage"></span></div>
                  <div class="v2-zizhu-list-R"></div>
                  <div class="v2-zizhu-list-C"></div>
              </div>
          </div>-->
          <sy-item :itemTitle="guanlizhe" v-if="(isAdmin || isOrgAdmin) && guanlizhe && guanlizhe.items && guanlizhe.items.length"></sy-item>
          <sy-item :itemTitle="unionStatistics" v-if="isshowRankLongJiang == 'yes'"></sy-item>
          <div v-if="isAgent">
            <div class="v3-me-samlltit color-gray">助理人工具箱</div>
            <div class="v2-zizhu bg">
              <div @click="appjs('syJsbLaunchWebview', siteInfo.host+'/bocm/index.php?act=home&op=trade_statistics')">
                <div class="v2-zizhu-list active">
                  <div class="v2-zizhu-list-L">交易统计</div>
                  <div class="v2-zizhu-list-R"></div>
                  <div class="v2-zizhu-list-C"></div>
                </div>
                <div class="line"></div>
              </div>
              <div
                  @click="appjs('syJsbLaunchWebview', siteInfo.host+'/bocm/index.php?act=home&op=agent_add_note_page')">
                <div class="v2-zizhu-list active">
                  <div class="v2-zizhu-list-L">扶贫日记</div>
                  <div class="v2-zizhu-list-R"></div>
                  <div class="v2-zizhu-list-C"></div>
                </div>
                <div class="line"></div>
              </div>
              <!--<div @click="appjs('syJsbLaunchWebview', siteInfo.host+'/bocm/index.php?act=home&op=my_poorperson_manager_boc')">-->
              <!--<div class="v2-zizhu-list active">-->
              <!--<div class="v2-zizhu-list-L">贫困户资料</div>-->
              <!--<div class="v2-zizhu-list-R"></div>-->
              <!--<div class="v2-zizhu-list-C"></div>-->
              <!--</div>-->
              <!--<div class="line"></div>-->
              <!--</div>-->
              <div @click="appjs('syJsbLaunchWebview', siteInfo.host+'/bocm/index.php?act=home&op=my_wallet')">
                <div class="v2-zizhu-list active">
                  <div class="v2-zizhu-list-L">余额和提现</div>
                  <div class="v2-zizhu-list-R"></div>
                  <div class="v2-zizhu-list-C"></div>
                </div>
                <div class="line"></div>
              </div>
              <!--<form ref="qqform" method="post" :action="siteInfo.host+'/bocm/index.php?act=common&op=input_text_page'">
                <input type="hidden" name="dept_callback"
                       :value="siteInfo.host+'/bocm/index.php?act=home&op=member_home'"/>
                <input type="hidden" name="field" value="member_qq"/>
                <input type="hidden" name="field_address" value="member_qq"/>
                <input type="hidden" name="placeholder"
                       :value="memberInfo.member_qq ? memberInfo.member_qq : '请输入qq号码'"/>
                <input type="hidden" name="title" value="设置我的QQ客服号码"/>
                <div class="v2-zizhu-list active" @click="qqformsubmit()">
                  <div class="v2-zizhu-list-L">QQ客服</div>
                  <div class="v2-zizhu-list-R"></div>
                  <div class="v2-zizhu-list-C">{{memberInfo.member_qq}}</div>
                </div>
                <div class="line"></div>
              </form>
              <form ref="kefuform" method="post"
                    :action="siteInfo.host+'/bocm/index.php?act=common&op=input_text_page'">
                <input type="hidden" name="dept_callback"
                       :value="siteInfo.host+'/bocm/index.php?act=home&op=member_home'"/>
                <input type="hidden" name="field" value="store_tel"/>
                <input type="hidden" name="field_address" value="store_tel"/>
                <input type="hidden" name="placeholder"
                       :value="memberInfo.store_tel ? memberInfo.store_tel : '请输入电话号码'"/>
                <input type="hidden" name="title" value="设置我的电话客服号码"/>
                <div class="v2-zizhu-list active" @click="kefuformsubmit()">
                  <div class="v2-zizhu-list-L">电话客服</div>
                  <div class="v2-zizhu-list-R"></div>
                  <div class="v2-zizhu-list-C">{{memberInfo.store_tel}}</div>
                </div>
              </form>-->
              <div class="v2-zizhu-list active" @click="qqformsubmit()">
                <div class="v2-zizhu-list-L">QQ客服</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C">{{memberInfo.member_qq}}</div>
              </div>
              <div class="line"></div>
              <div class="v2-zizhu-list active" @click="kefuformsubmit()">
                <div class="v2-zizhu-list-L">电话客服</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C">{{memberInfo.store_tel}}</div>
              </div>
            </div>
          </div>
          <sy-item :itemTitle="myKit" v-if="isPoor"></sy-item>
          <sy-item :itemTitle="jingzhunfupin" v-if="!isPoor && !isAgent"></sy-item>
          <sy-item :itemTitle="jingzhunfupin_less" v-if="isPoor || isAgent"></sy-item>
          <sy-item :itemTitle="gongyidangan" v-if="!isAdmin && !isEmployee && !isCodeYike && !isNoCodeYike"></sy-item>
          <sy-item :itemTitle="gongyidangan_more" v-if="isAdmin || isEmployee || isCodeYike || isNoCodeYike"></sy-item>
          <sy-item :itemTitle="volunteer"></sy-item>
          <!--<template v-if="isVolunteerShow && !isNewVolunteer">-->
            <!--<sy-item :itemTitle="zhiyuanzhe" v-if="!isAdmin && !isEmployee"></sy-item>-->
            <!--<sy-item :itemTitle="zhiyuanzhe_boc" v-if="isAdmin || isEmployee"></sy-item>-->
          <!--</template>-->
          <sy-item :itemTitle="gongyijijin" v-if="isAdmin"></sy-item>
          <div class="v3-me-samlltit main-color">平台客服</div>
          <!--<div class="v2-zizhu bg">-->
            <!--<div @click="appjs('syJsbLaunchWebview', siteInfo.host+'/bocm/index.php?act=helpcenter&op=helpcenter')">-->
              <!--<div class="v2-zizhu-list active">-->
                <!--<div class="v2-zizhu-list-L">帮助中心</div>-->
                <!--<div class="v2-zizhu-list-R"></div>-->
                <!--<div class="v2-zizhu-list-C"></div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="line"></div>-->
          <!--</div>-->
          <div class="v2-zizhu bg" v-if="!show7mo">
            <div @click="appjs('syJsbLaunchWebview', siteInfo.host+'/bocm/index.php?act=helpcenter&op=helpcenter')">
            <!--<div @click="appjs('syJsbOpenQQ', '3540154608')">-->
              <div class="v2-zizhu-list active">
                <div class="v2-zizhu-list-L">公益平台客服</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C"></div>
              </div>
            </div>
          </div>
          <div class="v2-zizhu bg" v-if="show7mo">
            <!--<div @click="_appjs.syJsbm7Chat(memberInfo.user_name, memberInfo.avatar_url)">-->
            <div @click="appjs('syJsbLaunchWebview', siteInfo.host+'/bocm/index.php?act=helpcenter&op=helpcenter')">
              <div class="v2-zizhu-list active">
                <div class="v2-zizhu-list-L">公益平台客服</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import item from './item.vue'
  import appjs from '../appjs/appjs.js'
  import loading from '../loading/loading.vue'
  export default {
    data () {
      return {
        isLoading: true,
        show7mo: false,
        notWallet: false,//true无钱包显示,钱包显示需变false
        showWallet: true,//是否显示钱包
        info: [],
        agentName: '',
        supportName: '',
        member_id: 0,
        isNewVolunteer:false,
        volunteer: {
          title: '志愿者服务',
          items: [//
            {
              leftText: '我的志愿服务',
              rightText: '',
              touch_url: this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_idcard'
            },
            {
              leftText: '我报名的招募',
              rightText: '',
              touch_url: this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_enrol_info'
            },
          ]
        },
        guanlizhe: {
          title: '管理功能',
          items: []
        },
        unionStatistics:{
          title: '',
          items: []
        },
        myKit: {
          title: '我的工具箱',
          items: [
            {
              leftText: '余额和提现',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=my_wallet'
            }
          ]
        },
        jingzhunfupin: {
          title: '精准扶贫',
          items: [
            {
              leftText: '个人购买订单',
              rightText: '购买记录',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=project&op=my_support_poor_order_list'
            },
            {
              leftText: '个人心愿清单',
              rightText: '',
              touch_url: this.siteInfo.host+'/bocm/index.php?act=cart&op=index&goods_project_type=17'
            },
            {
              leftText: '单位集采订单',
              rightText: '购买记录',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=bizbuy&op=my_biz_order_list'
            }
          ]
        },
        jingzhunfupin_less: {
          title: '精准扶贫',
          items: [
            {
              leftText: '个人购买订单',
              rightText: '购买记录',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=project&op=my_support_poor_order_list'
            },
            {
              leftText: '个人心愿清单',
              rightText: '',
              touch_url: this.siteInfo.host+'/bocm/index.php?act=cart&op=index&goods_project_type=17'
            },
          ]
        },
        gongyidangan: {
          title: '公益档案',
          items: [
            {
              leftText: '公益记录',
              rightText: '',
//              touch_url: this.siteInfo.host+'/mobile/index.php?act=home&op=my_donation_syb_v1',
//              touch_url: this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_orderlist'
              touch_url: this.siteInfo.host_mgy + '/syweal/record'
            }, {
              leftText: '公益勋章',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=glory&op=glory_list'
            }
//            ,{
//              leftText: '公益证书',
//              rightText: '',
//              touch_url: this.siteInfo.host+'/bocm/index.php?act=home&op=boc_member_cert_page'
//            }

          ]
        },
        gongyidangan_more: {
          title: '公益档案',
          items: [
            {
              leftText: '公益记录',
              rightText: '',
//              touch_url: this.siteInfo.host+'/mobile/index.php?act=home&op=my_donation_syb_v1',
//              touch_url: this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_orderlist'
              touch_url: this.siteInfo.host_mgy + '/syweal/record'
            }
            , {
              leftText: '公益勋章',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=glory&op=glory_list'
            }
//            ,{
//              leftText: '公益证书',
//              rightText: '',
//              touch_url: this.siteInfo.host+'/bocm/index.php?act=home&op=boc_member_cert_page'
//            }
            /*,{
             leftText: '邀请益客',
             rightText: '',
             touch_url: this.siteInfo.host+'/bocm/index.php?act=mhome&op=weal_club_invite'
             }*/
            , {
              leftText: '益客圈',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=mhome&op=my_invite_cirlce'
            }
          ]
        },
        zhiyuanzhe_boc: {
          title: '志愿者',
          items: [
            {
              leftText: '创建志愿队',
              rightText: '',
//              touch_url: this.siteInfo.host + '/mobile/index.php?act=volunteer&op=create_volunteer&is_firster=yes'
              alert_text:'系统已升级，使用此功能请下载新版本'
            }, {
              leftText: '我创建的志愿队',
              rightText: '',
//              touch_url: this.siteInfo.host + '/mobile/index.php?act=volunteer&op=volunteer_confirm'
              alert_text:'系统已升级，使用此功能请下载新版本'
            }, {
              leftText: '我参加的志愿队',
              rightText: '',
              touch_url: this.siteInfo.host + '/mobile/index.php?act=volunteer&op=volunteer_my_register_list'
            }
          ]
        },
        zhiyuanzhe: {
          title: '志愿者',
          items: [
            {
              leftText: '我参加的志愿队',
              rightText: '',
              touch_url: this.siteInfo.host + '/mobile/index.php?act=volunteer&op=volunteer_my_register_list'
            }, {
              leftText: '我参与的任务',
              rightText: '',
              touch_url: this.siteInfo.host + '/mobile/index.php?act=help&op=help_activity_all_certificate'
            }
          ]
        },
        gongyijijin: {
          title: '公益基金',
          items: [
            {
              leftText: '单位基金',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=fund_index'
            }
          ]
        },
        circle_id: 0,
        memberInfo: {},
        orderState: '',
        roleName: '',
        isPoor: false,
        isAgent: false,
        isCommonUser: false,
        isNoCodeYike: false,
        isCodeYike: false,
        isAdmin: false,
        isshowRankLongJiang: 'no',//龙江管理员统计
        rankListObj:{}, //联盟统计数据
        rankLink:'',//跳转url
        isUnionStatistics:false, //显示联盟统计
        isOrgAdmin: false,
        isEmployee: false,
        guanzhu_poor_text: '',
        guanzhu_agent_text: '',
        myStoreNewGoodsBatchCount: 0,
        refundNum: 0,
        isBigBoss: false,
        newMessage: false,
        adminText: '',
        donation: 0,
        publicIntegral: '',//公益积分
        top_bg: 'url(' + this.siteInfo.host + '/bocm/platformjs/static/image/me_top_bg2.jpg) no-repeat', // 顶部背景图
        top_bg_new: 'url(' + this.siteInfo.host + '/bocm/platformjs/static/image/me_top_newbg.png) no-repeat',
        cur_channel: '', // 渠道 中行和其他
        isVolunteerShow: false // 是否显示志愿队 只有中行渠道显示志愿队
      }
    },
    components: {
      'sy-item': item,
      'sy-loading': loading
    },
    created: function () {
      this.setdata()
      /*this.getVersion((platform,version)=>{
          console.log(23)
          console.log(platform)
          console.log(version)
          console.log(this)
      })*/
      this.getVersion((platform,version)=>{
        if(platform === 'android'){
          if(version > 95){
            this.isNewVolunteer = true
          }
        }else if(platform === 'ios'){
          if(version > 85){
            this.isNewVolunteer = true;
          }
        }
        if(this.isNewVolunteer){
            this.volunteer.items = [//
              {
                leftText: '我的志愿服务',
                rightText: '',
                touch_url: this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_idcard'
              },
              {
                leftText: '我报名的招募',
                rightText: '',
                touch_url: this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_enrol_info'
              },
            ]
        }else{
          this.volunteer.items = [//
            {
              leftText: '我的志愿服务',
              rightText: '',
              alert_text:'系统已升级，使用此功能请下载新版本'
            },
            {
              leftText: '我报名的招募',
              rightText: '',
              alert_text:'系统已升级，使用此功能请下载新版本'
            },
          ]
        }
      })

    },
    mounted: function () {
      this.appjs('syJsbShowToolBar', 'true')
      this._appjs.syJsbShowTitleBar('false')
      this.info = this._appjs.syJsbGetAppVersion()
      if (this.info['platform'] === 'android' && this.info['version'] > 88) {
        this.show7mo = true
      }
      // 志愿队
      if (this.info['platform'] === 'android' && this.info['version'] > 95) {
        //
        this.isNewVolunteer = true
      }
      if (this.info['platform'] === 'ios') {
        var info = this.info['version']
        info.scope = this
        info.then(function (version) {
          if (version > 29) {
            info.scope.show7mo = true
          }
          // 兼容志愿队
          if (version > 85) {
            info.scope.isNewVolunteer = true
          }
        })
      }
    },
    methods: {
      setdata () {
        this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=index')
          .then(res => {
//            console.log(Array.isArray(res.data.content),123)
            this.roleName = res.data.content.roleName
            this.cur_channel = res.data.content.cur_channel
            this.isVolunteerShow = (res.data.content.cur_channel === 'boc' || res.data.content.cur_channel === 'tianjin')
            this.newMessage = res.data.content.newMessage
            this.isPoor = res.data.content.isPoor
            this.isCommonUser = res.data.content.isCommonUser
            this.isAgent = res.data.content.isAgent
            this.isNoCodeYike = res.data.content.isNoCodeYike
            this.isCodeYike = res.data.content.isCodeYike
            this.isAdmin = res.data.content.isAdmin
            this.isshowRankLongJiang = res.data.content.isShowRank;
            this.rankListObj = res.data.content.rankListMenu
            this.rankLink = res.data.content.rankUrl;

            this.isOrgAdmin = res.data.content.isOrgAdmin
            this.isEmployee = res.data.content.isEmployee
            this.memberInfo = res.data.content.memberInfo
            this.publicIntegral = res.data.content.available_predeposit
//            console.log(this.publicIntegral)
            this.orderState = res.data.content.orderState
            this.circle_id = res.data.content.circle_id
            this.member_id = res.data.content.member_id
            this.guanzhu_poor_text = res.data.content.guanzhu_poor_text
//            this.guanzhu_agent_text = res.data.content.guanzhu_agent_text
            this.myStoreNewGoodsBatchCount = res.data.content.myStoreNewGoodsBatchCount
            this.refundNum = res.data.content.refundNum
            var commonInfo = res.data.content.commonInfo
            this.isBigBoss = res.data.content.isBigBoss
            if (this.isAdmin) {
              this.adminText += '部门管理员'
              if (this.isOrgAdmin) {
                this.adminText += '&团组织管理员'
              }
            }
            if (this.isOrgAdmin && !this.isAdmin) {
              this.adminText += '团组织管理员'
            }
            if (commonInfo) {
              this.agentName = commonInfo['agentName']
              this.supportName = commonInfo['supporter_names']
            }
            if (res.data.content.is_join) {
              this.zhiyuanzhe_boc.items.push({
                leftText: '发布任务',
                rightText: '',
//                touch_url: this.siteInfo.host + '/mobile/index.php?act=help&op=help_activity&is_firster=1'
                alert_text:'系统已升级，使用此功能请下载新版本'
              })
              this.zhiyuanzhe_boc.items.push({
                leftText: '我发布的任务',
                rightText: '',
//                touch_url: this.siteInfo.host + '/mobile/index.php?act=help&op=help_activity_my_publish'
                alert_text:'系统已升级，使用此功能请下载新版本'
              })
              this.zhiyuanzhe_boc.items.push({
                leftText: '我参与的任务',
                rightText: '',
                alert_text:'系统已升级，使用此功能请下载新版本'
//                touch_url: this.siteInfo.host + '/mobile/index.php?act=help&op=help_activity_all_certificate'
              })
            }
            if (this.isPoor) {
              this.myKit.items.unshift({
                leftText: '发布产品',
                rightText: '',
                touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=my_store_manager_boc&poor_member_id=' + this.member_id
              })
              this.myKit.items.unshift({
                leftText: '完善个人资料',
                rightText: '',
                touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=complete_poorperson_info&poor_member_id=' + this.member_id
              })
              this.myKit.items.push({
                leftText: '我的帮扶人',
                rightText: this.supportName,
                touch_url: ''
              })
//              this.myKit.items.push({
//                leftText: '我的助理人',
//                rightText: this.agentName,
//                touch_url: ''
//              })
//              this.myKit.items.push({
//                leftText: '我的报名管理',
//                rightText: '',
//                touch_url: this.siteInfo.host+'/bocm/index.php?act=home&op=my_boc_activity_list'
//              })
            }
            if (this.isAdmin) {
              this.guanlizhe.items.push({
                leftText: '管理员帐号管理',
                rightText: '',
                touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=manager_admin_boc_v1'
              })
              this.guanlizhe.items.push({
                leftText: '管理员统计',
                rightText: '',
                touch_url: this.siteInfo.host + '/bocm/index.php?act=admin&op=index'
              })
              this.guanlizhe.items.push({
                leftText: '员工转益客',
                rightText: '',
                touch_url: this.siteInfo.host + '/bocm/index.php?act=admin&op=manager_onekey_weal_club'
              })
            }
            if(this.isshowRankLongJiang == 'yes'){
              if(res.data.content.rankListMenu){
                this.unionStatistics.title =  res.data.content.rankListMenu.menuTitle;
                let rankListItem = res.data.content.rankListMenu.menuItems;
                let newArr = [];
                rankListItem.forEach((item,index)=>{
                  let obj = {};
                  obj.leftText = item.itemName;
                  obj.rightText = item.itemSmallText;
                  obj.touch_url = item.itemUrl;
                  newArr.push(obj)
                });
                this.unionStatistics.items = newArr;
              }
              console.log(this.unionStatistics);
            }
            this.jingzhunfupin.items.push({
              leftText: '我关注的贫困户',
              rightText: this.guanzhu_poor_text,
              touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=my_support_poorer_list'
            })
            this.jingzhunfupin.items.push({
              leftText: '我关注的扶贫驿站',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=my_support_agent_list'
            })
            this.jingzhunfupin.items.push({
              leftText: '待关注的贫困户',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=my_support_poor'
            })
            this.jingzhunfupin.items.push({
              leftText: '扶贫电子码',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=coupon&op=my_coupon_list'
            })
            this.jingzhunfupin.items.push({
              leftText: '卡券包',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=voucher&op=my_voucher_list'
            })
            this.jingzhunfupin_less.items.push({
              leftText: '我关注的扶贫驿站',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=home&op=my_support_agent_list'
            })
            this.jingzhunfupin_less.items.push({
              leftText: '卡券包',
              rightText: '',
              touch_url: this.siteInfo.host + '/bocm/index.php?act=voucher&op=my_voucher_list'
            })
            this.isLoading = false
          }).then(() => {
//            if(this.info['platform'] === 'android' && this.info['version'] > 91) {
//              this.getTheme()
//            }
//            if(this.info['platform'] === 'ios') {
//              var info = this.info['version']
////              info.scope = this
//              info.then( (version)=> {
//                if(version > 39) {
//                  this.getTheme()
//                }
//              })
//            }

          if (this.info['platform'] === 'android' && this.info['version'] > 91) {
            this.getTheme()
          }
          if (this.info['platform'] === 'ios') {
            var info = this.info['version']
            info.scope = this
            info.then(function (version) {
              if (version > 39) {
                info.scope.getTheme()
              }
            })
          }
//            this.cur_channel = 'boc'
          // 接口参数 channel 渠道 国电 中行

        })

        // 是否有志愿组织管理
        this.$http.get(this.siteInfo.host + '/api/index.php?act=volunteer&op=my_volunteer_type_list').then(res => {

          if(res && res.data && res.data.code == 200){
//            this.vol_more = res.data.content.person_type != 0
            let type = res.data.content;
//                this.vol_more = type.corp_type == '1' || type.record_type == '1'
            if(type.corp_type == '1' || type.record_type == '1'){
              if(this.isNewVolunteer){
                this.volunteer.items.push({
                  leftText: '下级志愿组织管理',
                  rightText: '',
                  touch_url: this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_review'
                })
                this.volunteer.items.push({
                  leftText: '下级组织招募管理',
                  rightText: '',
                  touch_url: this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_recruit_review'
                })
              }else{
                this.volunteer.items.push({
                  leftText: '下级志愿组织管理',
                  rightText: '',
                  alert_text:'系统已升级，使用此功能请下载新版本'
                })
                this.volunteer.items.push({
                  leftText: '下级组织招募管理',
                  rightText: '',
                  alert_text:'系统已升级，使用此功能请下载新版本'
                })
              }

            }
          }

        })

        this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=index_donation').then(res => {

          this.donation = res.data.amount ? res.data.amount : 0

        })

        this.cur_channel = 'boc'
        // 接口参数 channel 渠道 国电 中行

      },
      qqformsubmit () {
//        this.$refs.qqform.submit();
//          let url = this.siteInfo.host + '/bocm/index.php?act=index&op=showvue#/setKefu?type=qq'
          appjs('syJsbLaunchWebview',this.siteInfo.host + '/bocm/index.php?act=home&op=edit_agent_kf&type=qq')
      },
      kefuformsubmit () {
//        this.$refs.kefuform.submit();
//          let url = this.siteInfo.host + '/bocm/index.php?act=index&op=showvue#/setKefu?type=store_tel'
          appjs('syJsbLaunchWebview',this.siteInfo.host + '/bocm/index.php?act=home&op=edit_agent_kf&type=store_tel')
      },
      appjs (method, params = '') {
        appjs(method, params)
      },
      getTheme(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=theme&op=union_themeH5&channel=' + this.cur_channel).then(res => {


          if (res && res.data && res.data.code != 400) {
            let data = res.data.content;
//                if(data.home_bg_img){this.top_bg = data.home_bg_img}
            if (data.home_bg_img) {
              this.top_bg = 'url(' + data.home_bg_img + ') no-repeat'
            }
//            新头部
            if (data.home_bg_img) {
              this.top_bg_new = 'url(' + data.home_bg_img + ') no-repeat'
            }
          }

        })
      },
      getVersion(fn){
        let info = this._appjs.syJsbGetAppVersion()
        if (info['platform'] === 'android') {
          fn(info['platform'],info['version'])
        }
        if (info['platform'] === 'ios') {
          info['version'].then( version => {
            fn(info['platform'],version)
          })
        }
      },


    },
    filters: {
      getName: function (value) {
        if (value === '一起善源 公益中国') {
          value = '“一起善源 公益中国”'
          return value
        } else {
          return value
        }
      }
    }
  }
</script>

<style>
  /*new top*/
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
    line-height: 0;
  }

  .clearfix {
    zoom: 1;
  }

  .new-index {
    width: 100%;
    padding-top: 1.38rem;
    height: 4.27rem;
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    /*background:url(/bocm/platformjs/static/image/me_top_newbg.png)no-repeat;*/
    background-size: 100% 100% !important;
  }

  .new-top-con {
    display: flex;
    margin-left: 0.4rem;
    text-align: left;
  }

  .top-message {
    position: absolute;
    right: 0.5rem;
    top: 0.69rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  .top-message img {
    width: 100%;
    height: 100%;
  }

  .top-me-img {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
  }

  .message-dot {
    position: absolute;
    top: 0;
    left: 0.35rem;
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    background: #F8E71C;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .top-me-img img {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    -webkit-box-shadow: 0 0 4px #2b67cf;
    box-shadow: 0 0 4px #2b67cf;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .top-me-con {
    margin-left: 0.3rem;
    width: 5.18rem;
    overflow: hidden;
    color: #fff;
  }

  .me-top-name {
    font-size: 0.32rem;
    height: 0.45rem;
    /*line-height:0.45rem;*/
    color: #fff;
  }

  .me-top-name .txt {
    float: left;
  }

  .top-set {
    float: left;
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
    margin-left: 0.4rem;
    background: url(/bocm/platformjs/static/image/me_top_set.png) no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  .me-top-position, .me-top-descr {
    margin-top: 0.06rem;
    font-size: 0.26rem;
    line-height: 0.37rem;
  }

  .new-index-item {
    background: #fff;
    /*width:6.48rem;*/
    height: 1.32rem;
    padding: 0 0.51rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .new-index-item2 {
    background: #fff;
    /*width:6.48rem;*/
    height: 1.32rem;
    padding: 0 0.51rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .item-num {
    font-size: 0.34rem;
    line-height: 0.48rem;
    color: #4A90E2;
  }

  .item-descr {
    margin-top: 0.06rem;
    font-size: 0.26rem;
    line-height: 0.37rem;
    color: #4B4F63;
  }

  .margin-left2 {
    margin-left: 2rem;
  }

  /*我的头部*/
  .index-box {
    background-size: 100% 100% !important;
    overflow: hidden;
    padding-top: 0.6rem;
    position: relative;
  }

  .me-top-box-L {
    margin-left: 0.2rem;
    margin-top: 0.04rem
  }

  .me-top-box-C {
    width: 5.22rem;
    text-align: left;
    margin-top: 0.04rem
  }

  .new-person-lable {
    line-height: 0.3rem;
    font-size: 0.22rem;
    margin-bottom: 0.14rem;
  }

  .new-person-tit {
    line-height: 0.34rem;
  }

  .new-name {
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.28rem;
  }

  .index-box div {
    color: #fff !important
  }

  .me-top-data-box {
    background: rgba(0, 0, 0, .4);
    padding: 0.2rem 0;
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
  }

  .me-top-data-box div {
    text-align: center;
    line-height: 0.44rem;
    font-size: 0.24rem;
    color: #fff;
  }

  .me-top-install {
    position: absolute;
    right: 0.24rem;
    top: 0.58rem;
    width: 0.32rem;
    height: 0.32rem;
  }

  .me-top-install img {
    display: block;
    width: 100%;
    height: 100%;
  }

  /*icon部分*/
  .my-dlr-top {
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
    background: #fff
  }

  .my-dlr-top li {
    padding: 0.24rem 0;
    position: relative;
  }

  .my-dlr-top li img {
    margin: 0 auto 0.12rem;
    display: block;
    width: 0.45rem;
    height: 0.45rem;
  }

  .my-dlr-top li div {
    line-height: 0.28rem;
    color: #818C9E;
  }

  .my-dlr-top li span {
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 0.06rem;
    background: #4a90e2;
    position: absolute;
    top: 0.26rem;
    right: 19%;
  }

  .my-dlr-top a:link, .my-dlr-top a:visited {
    color: #333;
    text-decoration: none;
  }

  body {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    font-size: 0.28rem;
  }

  .v3-me-samlltit {
    line-height: 0.66rem;
    padding-left: 0.24rem;
    font-size: 0.24rem;
    text-align: left;
  }

  .main-color {
    color: #666
  }

  .red-point {
    width: 0.1rem;
    height: 0.1rem;
    border-radius: 0.05rem;
    background: #4a90e2;
    display: inline-block;
    margin-left: 0.06rem;
    position: relative;
    top: -0.14rem;
  }

  .bg-c {
    background: #f4f6f5 !important;
  }
  .v2-zizhu-list-L{
    width:3.2rem;
    white-space:nowrap;
    text-overflow: ellipsis;
    overflow:hidden;
  }
  .v2-zizhu-list-C{
    width: 3.44rem;
  }
</style>
