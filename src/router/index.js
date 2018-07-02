import Vue from 'vue'
import Router from 'vue-router'
//vue入口
let $router = [{path: '/', component: index_v2}]
//首页
import index_v2 from '@/components/index/index_v2.vue'

$router.push({path: '/index', component: index_v2})

import index_shanxi from '@/components/index/index_shanxi.vue'

$router.push({
  path: '/indexOfShanxi',
  component: index_shanxi
})

//------------------------------------------------------------------------------------------------
/**
 * 善源商场
 */
import syindex from '@/components/sy/syshop/syindex.vue'
import syshop_detail from '@/components/sy/syshop/syshop_detail.vue'
import calssify from '@/components/sy/syshop/syshop_classify.vue'

let $syshop = [
  {//善源商场首页
    path: '/syindex',
    component: syindex
  }, {//商品详情页
    path: '/syshop_detail',
    component: syshop_detail
  }, {//商品详情页
    path: '/syshop_calssify',
    component: calssify
  }
]
$router = $router.concat($syshop)
//------------------------------------------------------------------------------------------------
import home from '@/components/home/index.vue'

$router.push({
  path: '/home',
  component: home
})

import wx_special from '@/components/weixin/wx_special.vue'

$router.push({
  path: '/wx_special',
  component: wx_special
})

import wx_index from '@/components/weixin/wx_index.vue'

$router.push({
  path: '/wx_index',
  component: wx_index
})

import wx_myorder from '@/components/weixin/myorder.vue'

$router.push({
  path: '/wx_myorder',
  component: wx_myorder
})

import daizhifu from '@/components/order/unpay/daizhifu.vue'

$router.push({
  path: '/unpay_order_detail/:pay_sn',
  component: daizhifu
})
//产品详情页（助理人、贫困户、集采）
import mall_detail from '@/components/detail/mall_detail.vue'
import products_off_shelves from '@/components/detail/products_off_shelves.vue'
$router.push({
  /*goods_id 商品id is_share 是否分享过  is_fx 是否是复兴一号*/
  path: '/mall_detail',
  component: mall_detail,
})
$router.push({
  /*goods_id 商品id is_share 是否分享过  is_fx 是否是复兴一号*/
  path: '/products_off_shelves',
  component: products_off_shelves,
})

import cart from '@/components/order/cart/index.vue'

$router.push({
  path: '/cart/:goods_project_type',
  component: cart
})

import loading from '@/components/loading/loading.vue'

$router.push({
  path: '/loading',
  component: loading
})

import not_found from '@/components/notfound/not_found.vue'

$router.push({
  path: '/not_found',
  component: not_found
})

import help from '@/components/help/help.vue'

$router.push({
  path: '/help',
  component: help
})

import help_article from '@/components/help/help_article.vue'

$router.push({
  path: '/help_article',
  component: help_article
})

import help_all_question from '@/components/help/help_all_question.vue'

$router.push({
  path: '/help_all_question',
  component: help_all_question
})

import article_list from '@/components/help/article_list.vue'

$router.push({
  path: '/article_list',
  component: article_list
})

import wx_index_v2 from '@/components/weixin/fxyh/wx_index_v2.vue'

$router.push({
  path: '/wx_index_v2',
  component: wx_index_v2
})

import wx_special_v2 from '@/components/weixin/fxyh/wx_special_v2.vue'

$router.push({
  path: '/wx_special_v2',
  component: wx_special_v2
})

import bizbuy from '@/components/goods/bizbuy/index.vue'

$router.push({
  path: '/bizbuy',
  component: bizbuy
})
//------------------------------------------------------------------------------------------------
/**
 * 善源甄选分类页
 */
import syselection_list from '@/components/sy/syselection/select_list.vue'

$router.push({
  path: '/syselection_list',
  component: syselection_list
})

//------------------------------------------------------------------------------------------------
/**
 * 选择联盟
 */
import selectunion_v3 from '@/components/common/selectunion_v3.vue'

$router.push({
  path: '/selectunion_v3',
  component: selectunion_v3
})
//------------------------------------------------------------------------------------------------
/**
 * 精准扶贫
 */
import ranking_list from '@/components/alliance/leaderboard.vue'
import ranking_list_detail from '@/components/alliance/leaderboard_detil.vue'
import leaderboard_list from '@/components/alliance/leaderboard_list.vue'
import indie_Leaderboard from '@/components/alliance/indie_Leaderboard.vue'
import indieIntegralList from '@/components/alliance/indie_integral_list.vue'
//special 排行榜
import specialLeaderboard from '@/components/alliance/specialranking/special_leaderboard.vue'
import specialIntegralList from '@/components/alliance/specialranking/special_integral_list.vue'
import specialMemberList from '@/components/alliance/specialranking/special_member_list.vue'
import specialOrderAvgList from '@/components/alliance/specialranking/special_order_avg_list.vue'
import unionSpecialLeaderboardList from '@/components/alliance/specialranking/union_special_leaderboard_list.vue'
//中行特殊部门一把手部门排行榜
import specialBocLeaderboard from "@/components/alliance/bocRanking/special_boc_leaderboard.vue"
import specialBocBizOrderAvgList from "@/components/alliance/bocRanking/special_bizorder_avg_list.vue"
import specialBocOrderAvgList from "@/components/alliance/bocRanking/special_boc_order_avg_list.vue"
import specialBocIntegralList from "@/components/alliance/bocRanking/special_boc_integral_list.vue"
//bigboss 积分排行榜
import specialBigBossBocIntegralList from "@/components/alliance/bigBoss/special_big_boss_integral_list.vue"
let $leaderboard = [
  {//联盟排行列表
    path: '/ranking_list',
    component: ranking_list
  }, {//联盟详情页
    path: '/ranking_list_detail',
    component: ranking_list_detail
  }, {//详情二级页面
    path: '/leaderboard_list',
    component: leaderboard_list
  },{//独立排行榜
    path: '/indieLeaderboard',
    component: indie_Leaderboard
  },{//独立积分排行
    path:'/indieIntegralList',
    component:indieIntegralList
  },{//特殊排行榜二级页
    path:'/specialLeaderboard',
    component: specialLeaderboard
  },{//special 积分
    path:'/specialIntegralList',
    component: specialIntegralList
  },{
    path:'/specialMemberList',
    component: specialMemberList
  },{
    path: '/specialOrderAvgList',
    component: specialOrderAvgList
  },{//联盟无进度条
    path: '/unionSpecialLeaderboardList',
    component: unionSpecialLeaderboardList
  },{//中行特殊部门排行榜
    path: '/specialBocLeaderboard',
    component: specialBocLeaderboard
  },{//中行特殊部门集采人均消费排行榜
    path: '/specialBocBizOrderAvgList',
    component: specialBocBizOrderAvgList
  },{//特殊部门人均消费排行榜
    path: '/specialBocOrderAvgList',
    component: specialBocOrderAvgList
  },{//特殊部门积分排行榜
    path: '/specialBocIntegralList',
    component: specialBocIntegralList
  },{//bigBoss 积分排行榜
    path: '/specialBigBossBocIntegralList',
    component: specialBigBossBocIntegralList
  }
]
$router = $router.concat($leaderboard)

//------------------------------------------------------------------------------------------------
import login from '@/components/common/login/login.vue'

$router.push({
  path: '/login',
  component: login
})
//------------------------------------------------------------------------------------------------
/**
 * 马拉松模块
 * @param r
 */
const marathon_index = r => require.ensure([], () => r(require('@/components/marathon/index.vue')), 'marathon')
const marathon_reg_result = r => require.ensure([], () => r(require('@/components/marathon/reg_result.vue')), 'marathon')
const marathon_payfail = r => require.ensure([], () => r(require('@/components/marathon/pay_fail.vue')), 'marathon')
const marathon_reg_suc = r => require.ensure([], () => r(require('@/components/marathon/reg_suc.vue')), 'marathon')
const marathon_payment = r => require.ensure([], () => r(require('@/components/marathon/payment.vue')), 'marathon')
const marathon_end = r => require.ensure([], () => r(require('@/components/marathon/game_end.vue')), 'marathon')
const marathon_regist_info = r => require.ensure([], () => r(require('@/components/marathon/regist_info.vue')), 'marathon')
const marathon_regist_info2 = r => require.ensure([], () => r(require('@/components/marathon/regist_info2.vue')), 'marathon')
const marathon_agreement = r => require.ensure([], () => r(require('@/components/marathon/agreement.vue')), 'marathon')
const public_project_list = r => require.ensure([], () => r(require('@/components/sy/syweal/public_project/list.vue')), 'marathon')
const activity_list = r => require.ensure([], () => r(require('@/components/sy/syweal/activity/list.vue')), 'marathon')
let $marathon = [{
  path: '/marathon_index',
  component: marathon_index
},
  {
    path: '/marathon_reg_result',
    component: marathon_reg_result
  },
  {
    path: '/marathon_payment',
    component: marathon_payment
  },
  {
    path: '/marathon_payfail',
    component: marathon_payfail
  },
  {
    path: '/marathon_reg_suc',
    component: marathon_reg_suc
  },
  {
    path: '/marathon_end',
    component: marathon_end
  },
  {
    path: '/marathon_regist_info',
    component: marathon_regist_info
  },
  {
    path: '/marathon_regist_info2',
    component: marathon_regist_info2
  },
  {
    path: '/marathon_agreement',
    component: marathon_agreement
  },
  {
    path: '/public_project_list',
    redirect: '/public_project_list/private_project'
  },
  {
    path: '/public_project_list/:project_type',
    component: public_project_list
  },
  {
    path: '/activity_list',
    redirect: '/activity_list/online_project'
  },
  {
    path: '/activity_list/:project_type',
    component: activity_list
  }]
$router = $router.concat($marathon)
//------------------------------------------------------------------------------------------------
/**
 * 勋章模块
 */
import medal from '@/components/medal/medal_index.vue'
import medal_detail from '@/components/medal/medal_detail.vue'
import medal_wall from '@/components/medal/medal_wall.vue'

let $medal = [{
  path: '/medal',
  component: medal
},
  {
    path: '/medal_detail',
    component: medal_detail
  },
  {
    path: '/medal_wall',
    component: medal_wall
  }]
$router = $router.concat($medal)
//------------------------------------------------------------------------------------------------
/**
 * 贫困户详情改版
 */
import poorpeople_detail from '@/components/poorhouseholds/poorpeople_detail.vue'
import perfect_info from '@/components/poorhouseholds/perfect_info.vue'

let $poor = [
  {//贫困户详情
    path: '/poorpeople_detail',
    component: poorpeople_detail
  },
  {//完善资料
    path: '/perfect_info',
    component: perfect_info
  },
]
$router = $router.concat($poor)
//------------------------------------------------------------------------------------------------
/**
 * 公益钱包
 */
import sywall_index from '@/components/sy/sywall/index.vue'
import sywall_activation from '@/components/sy/sywall/activatewalley.vue'
import edit_info from '@/components/sy/sywall/editInfo.vue'
import edit_pasd from '@/components/sy/sywall/editPasd.vue'
import addcard from '@/components/sy/sywall/addcard.vue'
import protocol from '@/components/sy/sywall/protocol.vue'
import recharge_list from '@/components/sy/sywall/recharge_list.vue'
import usage_list from '@/components/sy/sywall/usage_list.vue'
import topup_suc from '@/components/sy/sywall/topup_suc.vue'
import topup_fail from '@/components/sy/sywall/topup_fail.vue'
import subscibe_crcre from '@/components/sy/sywall/subscibe_crcre.vue'
import activated_state from '@/components/sy/sywall/activated_state.vue'
import join_donate from '@/components/sy/sywall/join_donate.vue'
import cash_list from '@/components/sy/sywall/cash_list.vue'
import edit_password from '@/components/sy/sywall/edit_password.vue'
import cash from '@/components/sy/sywall/cash.vue'
import sywall_pay from '@/components/sy/sywall/pay.vue'
import edu_list from '@/components/sy/sywall/project_list/edu_list.vue'

let $sywall = [{
  path: '/sywall_index',
  component: sywall_index
},
  {
    path: '/sywall_activation',
    component: sywall_activation
  },
  {//充值成功
    path: '/topup_suc',
    component: topup_suc
  },
  {//充值失败
    path: '/topup_fail',
    component: topup_fail
  },
  {//订阅公益项目
    path: '/subscibe_crcre',
    component: subscibe_crcre
  },
  {//激活状态页
    path: '/act_state',
    component: activated_state
  },
  {//修改信息
    path: '/edit_info',
    component: edit_info
  },
  {//修改支付密码(获取验证码)
    path: '/edit_pasd',
    component: edit_pasd
  },
  {//添加银行卡信息
    path: '/addcard',
    component: addcard
  },
  {//协议
    path: '/protocol',
    component: protocol
  },
  {//充值明细
    path: '/recharge_list',
    component: recharge_list
  },
  {//使用明细
    path: '/usage_list',
    component: usage_list
  },
  {//参加捐赠
    path: '/join_donate',
    component: join_donate
  },
  {//提现明细
    path: '/cash_list',
    component: cash_list
  },
  {//修改支付密码
    path: '/edit_password',
    component: edit_password
  },
  {//提现
    path: '/cash',
    component: cash
  },
  {//支付
    path: '/sywall_pay',
    component: sywall_pay
  },
  {//暂无项目
    path: '/edu_list',
    component: edu_list
  }]
$router = $router.concat($sywall)
//------------------------------------------------------------------------------------------------
// 复兴壹号集采版
import wx_index_v3 from '@/components/weixin/fxyh_jicai/wx_index_v3.vue'
import wx_all_v3 from '@/components/weixin/fxyh_jicai/wx_all_v3.vue'
import wx_guang_v3 from '@/components/weixin/fxyh_jicai/wx_guang_v3.vue'
import wx_myorder_v3 from '@/components/weixin/fxyh_jicai/wx_myorder_v3.vue'

let $fuxinjicai = [{
  path: '/wx_index_v3',
  component: wx_index_v3
},
  {
    path: '/wx_all_v3',
    component: wx_all_v3
  },
  {
    path: '/wx_guang_v3',
    component: wx_guang_v3
  },
  {
    path: '/wx_myorder_v3',
    component: wx_myorder_v3
  }]
$router = $router.concat($fuxinjicai)
//------------------------------------------------------------------------------------------------
// 信用卡积分捐赠
import donate from '@/components/donate/donate.vue'
import donate_activity from '@/components/donate/donate_activity.vue'

let $donate = [{//信用卡积分捐赠
  path: '/donate',
  component: donate
},
  {//信用卡积分捐赠
    path: '/donate_activity',
    component: donate_activity
  }]
$router = $router.concat($donate)
//------------------------------------------------------------------------------------------------
// 益客机制
import welfare from '@/components/welfare/welfare.vue'

$router.push({//益客机制
  path: '/welfare',
  component: welfare
})
//------------------------------------------------------------------------------------------------
//善源公益
import pubwel_index from '@/components/publicweal/pubindex/pubwel_index.vue'
import pubwel_organiz from '@/components/publicweal/pubindex/organization_detail.vue'
import pubwel_collection from '@/components/publicweal/items/public_collection.vue'
import pubwel_crowd from '@/components/publicweal/items/public_crowd.vue'
import pubwel_list from '@/components/publicweal/items/public_list.vue'
import pubwel_detail from '@/components/publicweal/seekhelp/seekhelp.vue'
import pubwel_orderlist from '@/components/publicweal/pubrecord/public_record.vue'
import pubwel_thanks from '@/components/publicweal/pubrecord/thanks_card.vue'
import pubwel_amount_selected from '@/components/publicweal/pay/amount_selected.vue'
import pubwel_search from '@/components/publicweal/pubsearch/search_result.vue'
import pubwel_active from '@/components/publicweal/items/pubwel_active.vue'
import ration_report from '../components/publicweal/pubration/ration_report.vue'
import ration_archives from '../components/publicweal/pubration/ration_archives.vue'
import ration_pays from '../components/publicweal/pubration/ration_pays.vue'

let $pubwel = [{//善源公益首页
  path: '/pubwel_index',
  component: pubwel_index
},
  {//机构详情页
    path: '/pubwel_organiz',
    component: pubwel_organiz
  },
  {//项目列表
    path: '/pubwel_list',
    component: pubwel_list
  },
  {//慈善募捐
    path: '/pubwel_collection',
    component: pubwel_collection
  },
  {//公益众筹
    path: '/pubwel_crowd',
    component: pubwel_crowd
  },
  {//个人求助详情页
    path: '/pubwel_detail',
    component: pubwel_detail
  },
  {//公益记录
    path: '/pubwel_orderlist',
    component: pubwel_orderlist
  },
  {//感谢卡
    path: '/pubwel_thanks',
    component: pubwel_thanks
  },
  {//捐赠金额
    path: '/pubwel_amount_selected',
    component: pubwel_amount_selected
  },
  {//搜索结果
    path: '/pubwel_search',
    component: pubwel_search
  },
  {//活动列表
    path: '/pubwel_active',
    component: pubwel_active
  },
  //举报
  {
    path: '/ration_report',
    component: ration_report
  },
  {//公益档案
    path: '/ration_archives',
    component: ration_archives
  },
  {//支付方式
    path: '/ration_pays',
    component: ration_pays
  }

  ]
$router = $router.concat($pubwel)
//------------------------------------------------------------------------------------------------
//助理人详情页
const assistants_index = r => require.ensure([], () => r(require('@/components/assistants/index.vue')), 'agent_info')
const assistantTab = r => require.ensure([], () => r(require('@/components/assistants/assistant-tab.vue')), 'agent_info')
const process = r => require.ensure([], () => r(require('@/components/assistants/process.vue')), 'agent_info')
const writeDiary = r => require.ensure([], () => r(require('@/components/assistants/write-diary.vue')), 'agent_info')
const diary = r => require.ensure([], () => r(require('@/components/assistants/diary.vue')), 'agent_info')
const myAssistants = r => require.ensure([], () => r(require('@/components/assistants/my_assistants.vue')), 'agent_info')
let $agent_info = [{//助理人详情页
  path: '/assistants_index/:agent_id',
  component: assistants_index
},
  {
    path: '/diary/:agent_id',
    component: diary
  },
  {
    path: '/myAssistants',
    component: myAssistants
  },
  {
    path: '/writeDiary/:agent_id',
    component: writeDiary
  },
  {
    path: '/process',
    component: process
  },
  {
    path: '/assistantTab',
    component: assistantTab
  }]
$router = $router.concat($agent_info)
//------------------------------------------------------------------------------------------------
//用户
import add_address_page from '../components/users/address/add_address_page.vue'
import choose_address_page from '../components/users/address/choose_address_page.vue'
//订单优化
const bizbuyList = r => require.ensure([], () => r(require('@/components/order/bizbuy/bizbuyList.vue')), 'orders')
const jicaiUnit = r => require.ensure([], () => r(require('@/components/order/bizbuy/jicaiUnit.vue')), 'jicai')
const addSendAddress = r => require.ensure([], () => r(require('@/components/order/bizbuy/addSendAddress.vue')), 'jicai')
const checkOrder = r => require.ensure([], () => r(require('@/components/order/bizbuy/checkOrder.vue')), 'jicai')
let $jicai_info = [{//集采购物车
  path: '/bizbuyList',
  component: bizbuyList,
  meta: {keepAlive: true}
},
  {//集采购物车
    path: '/checkOrder',
    component: checkOrder,
    meta: {keepAlive: true}
  }, {//集采购物车
    path: '/jicaiUnit',
    component: jicaiUnit,
    meta: {keepAlive: true}
  }, {//集采购物车
    path: '/addSendAddress',
    component: addSendAddress,
    meta: {keepAlive: true}
  }, {//集采购物车
    path: '/add_address',
    component: add_address_page,
    meta: {keepAlive: true}
  }, {//集采购物车
    path: '/choose_address',
    component: choose_address_page,
    meta: {keepAlive: true}
  },]
$router = $router.concat($jicai_info)
//------------------------------------------------------------------------------------------------
// 助理人设置客服二级页
import setKefu from '@/components/home/set_kefu.vue'

$router = $router.concat([{
  path: '/setKefu',
  component: setKefu
}])
//------------------------------------------------------------------------------------------------
//帮扶成效页
import helpEffect from '@/components/helpeffect/helpeffect.vue'
import helpEffectEmpty from '@/components/helpeffect/helpeffect_empty.vue'

$router = $router.concat([{
  path: '/helpEffect',
  component: helpEffect
}, {
  path: '/helpEffectEmpty',
  component: helpEffectEmpty
}])
//------------------------------------------------------------------------------------------------
/**
 * 主题活动
 * */
// const themeActivities = r => require.ensure([], () => r(require('@/components/themeactivities/theme_activities.vue')), 'theme_activities')
// const couponsActivities = r => require.ensure([], () => r(require('@/components/themeactivities/coupons_activities.vue')), 'coupons_activities')
const goodFeedback = r => require.ensure([], () => r(require('@/components/themeactivities/goodfeedback/good_feedback.vue')),'good_feedback')
const goodFeedBackOver = r => require.ensure([], () => r(require('@/components/themeactivities/goodfeedback/good_feedback_over.vue'),'good_feedback_over'))
const goodFeedBackThank = r => require.ensure([], () => r(require('@/components/themeactivities/goodfeedback/good_feedback_thank.vue'),'good_feedback_thank'))
import themeActivities from '@/components/themeactivities/theme_activities.vue'
import couponsActivities from '@/components/themeactivities/coupons_activities.vue'
import scratchOff from '@/components/themeactivities/scratch-off/index.vue'
let $theme_activities = [{
    path: '/theme_activities',
    component: themeActivities
  },{//优惠券兑换活动
    path: '/coupons_activities',
    component: couponsActivities
  },{//2017公益回馈
    path: '/good_feedback',
    component: goodFeedback
  },{
    path: '/good_feedback_over',
    component: goodFeedBackOver
  },{
    path: '/good_feedback_thank',
    component: goodFeedBackThank
  },/*{
    path:'/scratchOff',
    component:scratchOff
}*/
]
$router = $router.concat($theme_activities)
// 志愿组织
import volunteer from '../components/volunteer/container.vue'
import volunteer_children from './volunteer'

$router = $router.concat([{
  path: '/volunteer',
  component: volunteer,
  children: volunteer_children
}])

//消费证明
const consume = r => require.ensure([], () => r(require('@/components/consume/index.vue')), 'consume')
const consumelogin = r => require.ensure([], () => r(require('@/components/consume/consumelogin.vue')), 'consume')
let $consume_info = [{
  path: '/consume',
  component: consume
},{
    path: '/consumelogin',
    component: consumelogin
  }]
$router = $router.concat($consume_info);

Vue.use(Router)
export default new Router({
  routes: $router
})
