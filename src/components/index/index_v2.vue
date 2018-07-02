<template>
  <div id="index_home_page">
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name="fade">
      <div v-show="!isLoading">
        <!--老用户补签协议弹框-->
        <syPrivacy v-on:isAgree="isAgrees"></syPrivacy>
        <!--广告弹窗-->
        <div class="mark" v-show="indexPop && (pop_info && !isAgreement)" @click="close_add_cookie()">
          <div class="markCon">
            <div class="markImg">
              <img @click="goMark(pop_info.pop_id)" :src="pop_info.img_url">
            </div>
            <div class="markClose">
              <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-close.png'">
            </div>
          </div>
        </div>
        <!-- 顶部搜索和标题-->
        <div class="index_top border-box" :style=[topStyle]>
          <div class="index_top_title">
            <!--搜索按钮-->
            <div class="index_top_left fl"
                 @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index')">
              <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/search_index3.png'" alt="">
            </div>
            <div class="index_top_cen fl font36 text-center color4 font-normal">{{channelName}}</div>
            <div class="index_top_right fr">
              <div class="index_menu" @click="_appjs.syJsbShowMoreMenu()">
                <!--<div></div>-->
                <!--<div></div>-->
                <!--<div></div>-->
                <!--<img src="/bocm/platformjs/static/image/index/index_menu_img.png" alt="" class="index_menu_img">-->
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/index_menu_img.png'" alt=""
                     class="index_menu_img">
              </div>
            </div>
          </div>
        </div>
        <div :style="{height:bgHeight}"></div>

        <!--顶部统计-->
        <div class="statistics" :style="{background: top_img}">
          <div class="statistics_con">
            <ul class="child-fl clearfix">
              <li class="statistics_left statistics_child">
                <div class="welfare_people color-blue font32">{{welfarePeople1}} <span class="font24">人</span></div>
                <!--<div class="welfare_people color-blue font32">154646546</div>-->
                <div class="welfare_people_text font24 color66" >公益人士在集结</div>
              </li>
              <!--<li class="statistics_interval">-->
              <!--<div></div>-->
              <!--</li>-->
              <li class="statistics_cen statistics_child">
                <div class="welfare_people color-blue font32">{{welfareDonate1}} <span class="font24">元</span></div>
                <!--<div class="welfare_people color-blue font32">12345678901</div>-->
                <div class="welfare_people_text font24 color66">公益捐赠在进行</div>
              </li>
              <!--<li class="statistics_interval">-->
              <!--<div></div>-->
              <!--</li>-->
              <li class="statistics_right statistics_child">
                <div class="welfare_people color-blue font32">{{welfareActive1}} <span class="font24">元</span></div>
                <div class="welfare_people_text font24 color66">公益消费在活跃</div>
              </li>
            </ul>
          </div>
        </div>
        <!--轮播-->
        <div class="carousel-container" v-if="topUnionList.length > 0">
          <div class="swiper-container swiper-container-a" ref="welfare_area">
            <div class="swiper-wrapper">
              <div v-if="myUnionInfo" class="item_container swiper-slide relative"
                   @click="GoUrl(myUnionInfo.union_info_url)">
                <div class="item">
                  <div class="item_title font30"><span class="fl">{{myUnionInfo.union_name}} </span><span
                      class="is_join inline-block fl">已加入</span></div>
                  <div class="item_con font24">
                    <div>公益人士：<span>{{myUnionInfo.union_enrollment}}</span>人</div>
                    <!--<div>公益捐赠：<span>{{myUnionInfo.union_donation}}</span>元</div>-->
                    <!--<div>公益消费：<span>{{myUnionInfo.union_spending}}</span>元</div>-->
                    <div>联盟购买：<span>{{myUnionInfo.union_spending}}</span>元</div>
                    <div>联盟销售：<span>{{myUnionInfo.union_sales_amount}}</span>元</div>
                  </div>
                </div>
                <div class="absolute rank">
                  <img :src="first_list1" alt="" v-if="myUnionInfo.union_ranking == 1">
                  <img :src="second_list1" alt="" v-if="myUnionInfo.union_ranking == 2">
                  <img :src="third_list1" alt="" v-if="myUnionInfo.union_ranking == 3">
                </div>
              </div>
              <div class="item_container swiper-slide relative" v-for="item in topUnionList"
                   @click="GoUrl(item.union_info_url)">
                <div class="item">
                  <div class="item_title font30"><span class="fl">{{item.union_name}} </span></div>
                  <div class="item_con font24">
                    <div>公益人士：<span>{{item.union_enrollment}}</span>人</div>
                    <!--<div>公益捐赠：<span>{{item.union_donation}}</span>元</div>-->
                    <!--<div>公益消费：<span>{{item.union_spending}}</span>元</div>-->
                    <div>联盟购买：<span>{{item.union_spending}}</span>元</div>
                    <div>联盟销售：<span>{{item.union_sales_amount}}</span>元</div>
                  </div>
                </div>
                <div class="absolute rank">
                  <img :src="first_list1" alt="" v-if="item.union_ranking == 1">
                  <img :src="second_list1" alt="" v-if="item.union_ranking == 2">
                  <img :src="third_list1" alt="" v-if="item.union_ranking == 3">
                </div>
              </div>
              <div class="swiper-slide more_alliance"
                   @click="GoUrl(siteInfo.host + '/bocm/index.php?act=union&op=top_list')">
                <div class="text-center color-blue font28">
                  <div>更<br/>多<br/>联<br/>盟<br><img
                      :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/more_alliance1.png'" alt=""
                      style="width:.3rem;margin-top:.04rem;"></div>
                </div>
              </div>
            </div>

            <!--<div class="swiper-pagination" id="pagination"></div>-->
          </div>
        </div>

        <!--完善形象-->
        <div v-if="member_info.is_login == true && member_info.code">
          <!--<div v-if="true">-->
          <div class="bg_interval"></div>
          <div class="index_personal_container text-left color4">
            <div class="index_personal">
              <img :src="member_info.real_avatar" alt="" class="fl">
              <!--形象不完善-->
              <template v-if="member_info.code == 'common'">
                <div class="fl personal_text font24"
                     @click="GoUrl(siteInfo.host + '/bocm/index.php?act=home&op=choose_boc_member_v1')">
                  HI，亲爱的手机尾号为<span class="color-blue">{{member_info.mobile_four_num}}</span>的用户：<br/>
                  <span>欢迎加入{{member_info.cur_channel_text}}，</span>请完善公益形象，开启公益之旅
                </div>
                <div class="fr personal_more"></div>
              </template>
              <template v-if="member_info.code == 'emp'">
                <!--<template v-if="true">-->
                <div class="personal_text_else font24">
                  <div class="personal_text_else_pl">
                    <ul class="clearfix">
                      <li>
                        <p class="personal_text_top">公益生活</p>
                        <p class="personal_text_bottom"><span>{{member_info.support_day}}</span> 天</p>
                      </li>
                      <li @click="GoUrl(siteInfo.host + '/bocm/index.php?act=mhome&op=weal_club_invite&from=app&appVariant=pwcn')">
                        <p class="personal_text_top">邀请益客</p>
                        <p class="personal_text_bottom" v-if="member_info.invite_num > 0"><span>{{member_info.invite_num}}</span>
                          人</p>
                        <p class="personal_text_bottom" v-else><span class="bg_gt_blue">去邀请</span></p>
                      </li>
                      <li v-if="member_info.cur_channel == 'boc'"
                          @click="GoUrl(siteInfo.host+'/bocm/index.php?act=rank&op=index')">
                        <p class="personal_text_top">公益排名</p>
                        <p class="personal_text_bottom"
                           v-if="member_info.dept_rank > 10000 || member_info.dept_rank == 0"><span
                            class="font_size26 bg_gt_blue">未上榜</span></p>
                        <p class="personal_text_bottom" v-else>
                          <span>{{ member_info.dept_rank}}</span>
                          <img :src="tendency_img" class="tendency_bg_img" v-if="false" alt="">
                        </p>
                      </li>
                      <li v-else
                          @click="GoUrl(siteInfo.host + '/bocm/index.php?act=point&op=point_detail_list&appVariant=pwcn')">
                        <p class="personal_text_top">公益积分</p>
                        <p class="personal_text_bottom" v-if="member_info.points > 0">
                          <span>{{member_info.points}}</span></p>
                        <p class="personal_text_bottom" v-else><span class="bg_gt_blue">去查看</span></p>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
              <template v-if="member_info.code == 'yike'">
                <!--<template v-if="true">-->
                <div class="personal_text_else font24">
                  <div class="personal_text_else_pl">
                    <ul class="clearfix">
                      <li>
                        <p class="personal_text_top">公益生活</p>
                        <p class="personal_text_bottom"><span>{{member_info.support_day}}</span> 天</p>
                      </li>
                      <li @click="GoUrl(siteInfo.host+'/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index')">
                        <p class="personal_text_top">公益消费</p>
                        <p class="personal_text_bottom" v-if="member_info.buy_num > 0">
                          <span>{{member_info.buy_num}}</span> 次</p>
                        <p class="personal_text_bottom" v-else><span class="bg_gt_blue">去逛逛</span></p>
                      </li>
                      <li @click="GoUrl(siteInfo.host_mgy+'/syweal/list?project_mode=get_all_list_app')">
                        <p class="personal_text_top">公益项目</p>
                        <p class="personal_text_bottom" v-if="member_info.weal_num">
                          <span>{{member_info.weal_num}}</span> 次</p>
                        <p class="personal_text_bottom" v-else><span class="bg_gt_blue">去围观</span></p>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!--公益日运营活动-->
        <div class="boc_banner" v-if="isAD1" @click="clickGoUrl(AD1.touch_url, AD1.rec_id)"><img v-if="isAD1" :src="AD1['img_url']" alt=""></div>
        <!--<div v-if="timeIsActivity" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=topic&op=welfareday')" style="background: #F7F9FA;width: 100%;height: 1.8rem;">-->
        <!--&lt;!&ndash;<div @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=topic&op=welfareday')" style="background: #F7F9FA;width: 100%;height: 1.8rem;">&ndash;&gt;-->
        <!--<img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/yunyingactivity/20171109.png'" style="width: 100%;height: 1.8rem;display: block;">-->
        <!--</div>-->
        <!--公益消费-->
        <div v-if="shop_recommend.length > 0">
          <!--运营活动下线之后请把这个注释放开-->
          <div class="bg_interval" v-if="!isAD1"></div>
          <div class="module_title">
            <div class="module_title_top font34">公益消费</div>
            <div class="module_title_bottom font24">兼爱交利 投桃报李</div>
          </div>
          <div>
            <div class="swiper-container" ref="sr">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in shop_recommend">
                  <img :class="'top-swiper-shop'+index" :src="item.img_url" index="公益消费"
                       @click="clickGoUrl(item.touch_url, item.rec_id)" alt="" style="width:100%;height:3rem;">
                </div>
              </div>
              <div class="swiper-pagination" style="width: 2rem;margin-left: 6rem;color: #ffffff;"></div>
            </div>
          </div>
          <div class="sub_menu_jc">
            <ul class="clearfix">
              <li @click="GoUrl(siteInfo.host+'/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard15.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">大爱超市</div>
              </li>
              <li @click="GoUrl(siteInfo.host+'/bocm/index.php?act=goods&op=bizbuy')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard16.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">善源甄选</div>
              </li>
              <li @click="GoUrl(siteInfo.host+'/bocm/index.php?act=goods&op=bizbuy_goods_list')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard19.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">单位集采</div>
              </li>
              <li @click="goPage(siteInfo.host + '/bocm/index.php?act=index&op=syshop_index')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard17.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">善源商场</div>
              </li>
            </ul>
          </div>
        </div>
        <!--公益项目-->
        <div class="boc_banner" v-if="isAD2" @click="clickGoUrl(AD2.touch_url, AD2.rec_id)"><img v-if="isAD2" :src="AD2['img_url']" alt=""></div>
        <div class="color4" v-if="project_recommend.length > 0">
          <div class="bg_interval" v-if="!isAD2"></div>
          <div class="module_title">
            <div class="module_title_top font34">公益项目</div>
            <div class="module_title_bottom font24">博施济众 积善成德</div>
          </div>
          <div>
            <div class="swiper-container" ref="pr">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in project_recommend">
                  <img :class="'top-swiper-project'+index" :src="item.img_url" index="公益项目"
                       @click="clickGoUrl(item.touch_url, item.rec_id)" alt="" style="width:100%;height:3rem;">
                </div>
              </div>
              <div class="swiper-pagination" style="width: 2rem;margin-left: 6rem;color: #ffffff;"></div>
            </div>
          </div>
          <div class="sub_menu">
            <ul class="clearfix">
              <li @click="GoUrl(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_list&project_mode=get_donate_list')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/beneficence11.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">慈善募捐</div>
              </li>
              <li @click="GoUrl(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_list&project_mode=get_crowdfunding_list')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard11.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">公益众筹</div>
              </li>
              <li @click="GoUrl(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_list&project_mode=get_personalhelp_list')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/for_help.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">个人求助</div>
              </li>
            </ul>
          </div>
        </div>

        <!--公益活动-->
        <div class="boc_banner" v-if="isAD3" @click="clickGoUrl(AD3.touch_url, AD3.rec_id)"><img v-if="isAD3" :src="AD3['img_url']" alt=""></div>
        <div v-if="activity_recommend.length > 0">
          <div class="bg_interval" v-if="!isAD3"></div>
          <div class="module_title">
            <div class="module_title_top font34">一起志愿</div>
            <div class="module_title_bottom font24">岂曰无衣 与子同袍</div>
          </div>
          <div>
            <div class="swiper-container" ref="ar">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in activity_recommend">
                  <img :class="'top-swiper-activity'+index" :src="item.img_url"   index="一起志愿"
                       @click="clickGoUrl(item.touch_url, item.rec_id)" alt="" style="width:100%;height:3rem;">
                </div>
              </div>
              <div class="swiper-pagination" style="width: 2rem;margin-left: 6rem;color: #ffffff;"></div>
            </div>
          </div>
          <div class="sub_menu" v-if="!isNewVolunteer">
            <ul class="clearfix">
              <!--<li @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/mobile/index.php?act=volunteer&op=volunteer_all_list')">-->
              <li @click="_appjs.syJsbAlert('系统已升级，使用此功能请下载新版本！')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard12.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">志愿组织</div>
              </li>
              <!--<li @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/mobile/index.php?act=help&op=help_activity_class_list&type=online_project')">-->
              <li @click="_appjs.syJsbAlert('系统已升级，使用此功能请下载新版本！')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard13.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">最新招募</div>
              </li>
              <!--<li @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/mobile/index.php?act=help&op=help_activity_class_list&type=offline_project')">-->
              <li @click="_appjs.syJsbAlert('系统已升级，使用此功能请下载新版本！')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard14.png'" alt=""
                     style="width:.55rem;">
                <div class="sub_menu_text">同城志愿</div>
              </li>
            </ul>
          </div>
          <div class="sub_menu" v-if="isNewVolunteer">
            <ul class="clearfix">
              <!--<li @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/mobile/index.php?act=volunteer&op=volunteer_all_list')">-->
              <li @click="GoUrl(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_organization')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard12.png'" alt="" style="width:.55rem;">
                <div class="sub_menu_text">志愿组织</div>
              </li>
              <!--<li @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/mobile/index.php?act=help&op=help_activity_class_list&type=online_project')">-->
              <li @click="GoUrl(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_recruit&tab_index=1')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard13.png'" alt="" style="width:.55rem;">
                <div class="sub_menu_text">最新招募</div>
              </li>
              <!--<li @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/mobile/index.php?act=help&op=help_activity_class_list&type=offline_project')">-->
              <li @click="GoUrl(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_recruit&tab_index=2')">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/artboard14.png'" alt="" style="width:.55rem;">
                <div class="sub_menu_text">同城志愿</div>
              </li>
            </ul>
          </div>
        </div>

        <!--结对贫困户-->
        <div class="boc_banner" v-if="isAD4" @click="clickGoUrl(AD4.touch_url, AD4.rec_id)"><img v-if="isAD4" :src="AD4['img_url']" alt=""></div>
        <div v-if="member_info.is_login == true && member_info.cur_channel == 'boc'">
          <!--<div v-if="true">-->
          <div class="bg_interval" v-if="!isAD4"></div>
          <div class="module_title">
            <div class="module_title_top font34">结对贫困户</div>
            <div class="module_title_bottom font24">万里比邻 持续帮扶</div>
          </div>

          <!--去结对-->
          <div class="index_matches_container">
            <!-- 没有匹配人-->
            <div class="index_matches clearfix relative" v-if="jiedui.length == 0">
              <!--<div class="index_matches clearfix relative" v-if="true">-->
              <div class="absolute portrait portrait_left">
                <img v-lazy="member_info.real_avatar" alt="" style="width:100%;height:100%;border-radius: 50%">
              </div>
              <div class="index_matches_con"
                   @click="GoUrl(siteInfo.host + '/bocm/index.php?act=home&op=my_support_poor&from=app&appVariant=pwcn')">
                <div class="go_match cen">
                  <div class="go_match_text colorf"><p>去结对</p></div>
                </div>
              </div>
              <div class="absolute portrait portrait_right"
                   @click="GoUrl(siteInfo.host + '/bocm/index.php?act=home&op=my_support_poor&from=app&appVariant=pwcn')">
                <img v-lazy="siteInfo.cdn_host + '/bocm/platformjs/static/image/index/no_person11.png'" alt=""
                     style="width:100%;height:100%;border-radius: 50%;">
              </div>
            </div>

            <!--已结对-->
            <div class=" clearfix had_index_match" v-if="jiedui.length > 0">
              <div class=" had_portrait_left" v-for="item in jiedui" @click="GoUrl(item.touch_url)">
                <img class="portrait" v-lazy="item.real_avatar" alt="">
                <div class="member_truename">{{item.member_truename}}</div>
              </div>
              <div
                  @click="GoUrl(siteInfo.host + '/bocm/index.php?act=home&op=my_support_poor&from=app&appVariant=pwcn')">
                <img class="portrait" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/index/add_more11.png'"
                     alt="">
                <div class="member_truename" style="visibility: hidden">隐藏</div>
              </div>
            </div>
          </div>


        </div>

        <!--公益联盟子联盟展示-->
        <div class="everyone_help" v-if=" iszilianmeng">
          <div class="bg_interval"></div>
          <div class="sub_left_title" style="padding-right:.3rem;"
               @click="GoUrl(zilianmeng.touch_url_more)">
            <div class="more_goods_gt">
              <span class="sub_left_title_text font30 color4">{{zilianmeng.index_tag}}</span>
            </div>
          </div>
          <!--商品图片内容-->
          <div class="goods_con">
            <ul class="clearfix">
              <li v-for="(item,index) in zilianmeng['goods_list']" @click="GoUrl(item.touch_url)">
                <img v-lazy="item.real_goods_image" alt="">
                <div class="goods_name">{{item.goods_name}}</div>
                <div class="goods_price color-blue font30">￥ {{item.goods_price}}</div>
              </li>
            </ul>
          </div>
        </div>

        <!--大家帮-->
        <div class="everyone_help" v-if="dajaibangLength > 0">
          <div class="bg_interval"></div>
          <div class="sub_left_title" style="padding-right:.3rem;"
               @click="GoUrl(dajiabang.touch_url_more)">
            <div class="more_goods_gt">
              <span class="sub_left_title_text font30 color4">大家帮</span><span
                class="font26 ml2 color66">货真物美 有口皆碑</span>
            </div>
          </div>

          <!--商品图片内容-->
          <div class="goods_con">
            <ul class="clearfix">
              <li class="youxuan-parent"v-for="(item,index) in dajiabang['goods_list']" @click="GoUrl(item.touch_url)">
                <img src="../../../static/image/detail/youp.png" class="youxuan" alt="" v-if="item.is_quality_goods==='true'">
                <img class="a" v-lazy="item.real_goods_image" alt="">
                <div class="goods_name">{{item.goods_name}}</div>
                <div class="goods_price color-blue font30">￥ {{item.goods_price}}</div>
              </li>
            </ul>
          </div>

        </div>

        <!--特产馆-->
        <div class="boc_banner" v-if="isAD5" @click="clickGoUrl(AD5.touch_url, AD5.rec_id)"><img v-if="isAD5" :src="AD5.img_url" alt=""></div>
        <div class="text-left" v-if="techanguan.length > 0">
          <!--<div class="text-left" v-if="true">-->
          <div class="bg_interval" v-if="!isAD5"></div>
          <div class="sub_left_title">
            <span class="sub_left_title_text font30 color4" >特产馆</span><span class="font26 ml2 color66">山肴野蔌 篱壁佳物</span>
          </div>

          <div class="special_goods_con">
            <ul>
              <li class="special_goods_li" v-for="item in techanguan">
                <div v-for="(value, index) in item" @click="GoUrl(value.touch_url)"
                     v-if="index < 3" style="position: relative">
                  <img src="../../../static/image/detail/youp.png" style="width: 0.32rem;height: 0.54rem;position: absolute;top: 0;left: 0.16rem" alt="" v-if="item.is_quality_goods==='true'">
                  <img v-lazy="value.real_goods_image" alt="">
                </div>
                <div class="relative more_special_goods" @click="GoUrl(item.touch_more_url)">
                  <div class="more_special_goods_text absolute">
                    {{item.text}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>


        <!--优秀助理人-->
        <div class="boc_banner" v-if="isAD6" @click="clickGoUrl(AD6.touch_url, AD6.rec_id)"><img v-if="isAD6" :src="AD6.img_url" alt=""></div>
        <div class="text-left" v-if="youxiuzhuliren.length > 0">
          <div class="bg_interval" v-if="!isAD6"></div>
          <div class="sub_left_title" >
            <span class="sub_left_title_text font30 color4" >优秀助理人</span><span
              class="font26 ml2 color66">言忠信 行笃敬 自立以立人</span>
          </div>
          <!--助理人内容-->
          <div class="assistants">
            <ul class="clearfix child-fl assistants_ul text-center">
              <li class="assistants_li" v-for="item in youxiuzhuliren"
                  @click="GoUrl(item.touch_url)">
                <img v-lazy="item.real_avatar"
                     :onerror="'this.src=\''+siteInfo.cdn_host+'/bocm/platformjs/static/image/bigLoveShop/man.png\''"
                     alt="" >
                <div class="assistants_name no-enter">{{item['member_info']['member_truename']}}</div>
                <div class="assistants_score color66"><span>总评分</span>{{item.store_score}}</div>
              </li>
            </ul>
          </div>

        </div>

        <div class="bottom_bar">一起善源 爱 · 源于善</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {indexFirst, indexThird, indexPoll, indexUnionRank, getBanner} from '@/requests/index'
  import loading from '@/components/loading/loading.vue'
  import syPrivacy from './index_privacy.vue'
  import Swiper from '../../../static/js/swiper-3.4.2.min'
  import TWEEN from 'tween'
  export default {
    data(){
      return {
        isLoading: true,
        topStyle: '',
        bgHeight: '',
        number: 0,
        animatedNumber: 0,
        welfarePeople: 0,
        welfarePeople1: 0,
        welfareDonate: 0,
        welfareDonate1: 0,
        welfareActive: 0,
        welfareActive1: 0,
        first_list1: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/index/first_list1.png',
        second_list1: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/index/second_list1.png',
        third_list1: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/index/third_list1.png',
        dajiabang: {},
        dajaibangLength: [],
        techanguan: {},
        youxiuzhuliren: [],
        member_info: {},
        jiedui: [],
        common: {},
        project_recommend: [],
        activity_recommend: [],
        shop_recommend: [],
        top_img: '',
        myUnionInfo: {},
        topUnionList: [],
        indexPop: false,
        pop_info: {},
        tendency_img: '/bocm/platformjs/static/image/index/arrow_red2.png',
        tendency_img2: 'url("/bocm/platformjs/static/image/index/arrow_yellow44.png") right center no-repeat;',
        tendency_img3: 'url("/bocm/platformjs/static/image/index/yellow_green35.png") right center no-repeat;',
        channelName: '' ,// 名称
        isAgreement:'',
        timeIsActivity:'', // 时间戳
        zilianmeng:{},//公益联盟子联盟展示
        iszilianmeng: false,//
        AD1:{},//banner位
        isAD1:false,//
        AD2:{},//banner位
        isAD2:false,//
        AD3:{},//banner位
        isAD3:false,//
        AD4:{},//banner位
        isAD4:false,//
        AD5:{},//banner位
        isAD5:false,//
        AD6:{},//banner位
        isAD6:false,//
        isNewVolunteer:false, // 是否是新版志愿队
      }
    },
    created(){
      this.datetime = Date.parse(new Date())
      this._appjs.syJsbShowTitleBar('false')
      if (this._appjs.isAndroid()) {
        this.bgHeight = '50px';
        this.topStyle = {
          height: '50px',
          paddingTop: '5px'
        }
      } else {
        this.bgHeight = '64px';
        this.topStyle = {
          height: '64px',
          paddingTop: '24px'
        }
      }
      this.getName()

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
      })
    },
    mounted(){
      this.getData().then(() => {
	      this.$nextTick(() => {
		      let _this = this;
		      if (this.shop_recommend.length > 1) {
			      new Swiper(this.$refs.sr, {
				      initialSlide: 0,
				      paginationClickable: true,
				      autoplay: 3000,
				      autoplayDisableOnInteraction: false,
				      observer: true,
				      observeParents: true,
				      loop: true,
				      pagination: '.swiper-pagination',
				      paginationType: 'fraction'
			      })
			      let e = 'top-swiper-shop0';
			      let f = 'top-swiper-shop' + (this.shop_recommend.length - 1);
			      document.getElementsByClassName(e)[1].onclick = function () {
//				      _this._appjs.syJsbLaunchWebview(_this.shop_recommend[0].touch_url)
              _this.clickGoUrl(_this.shop_recommend[0].touch_url, _this.shop_recommend[0].rec_id)
			      };
			      document.getElementsByClassName(f)[0].onclick = function () {
			        let length = _this.shop_recommend.length;
//				      _this._appjs.syJsbLaunchWebview(_this.shop_recommend[_this.shop_recommend.length - 1].touch_url)
              _this.clickGoUrl(_this.shop_recommend[length - 1].touch_url, _this.shop_recommend[length - 1].rec_id)
			      }
		      }
		      setTimeout(() => {
			      if (this.project_recommend.length > 1) {
				      new Swiper(this.$refs.pr, {
					      initialSlide: 0,
					      paginationClickable: true,
					      autoplay: 3000,
					      autoplayDisableOnInteraction: false,
					      observer: true,
					      observeParents: true,
					      loop: true,
					      pagination: '.swiper-pagination',
					      paginationType: 'fraction'
				      })
				      let a = 'top-swiper-project0';
				      let b = 'top-swiper-project' + (this.project_recommend.length - 1);
				      document.getElementsByClassName(a)[1].onclick = function () {
					      _this._appjs.syJsbLaunchWebview(_this.project_recommend[0].touch_url)
				      };
				      document.getElementsByClassName(b)[0].onclick = function () {
					      _this._appjs.syJsbLaunchWebview(_this.project_recommend[_this.project_recommend.length - 1].touch_url)
				      }
			      }

		      }, 1000);

		      setTimeout(() => {
			      if (this.activity_recommend.length > 1) {
				      new Swiper(this.$refs.ar, {
					      initialSlide: 0,
					      paginationClickable: true,
					      autoplay: 3000,
					      autoplayDisableOnInteraction: false,
					      observer: true,
					      observeParents: true,
					      loop: true,
					      pagination: '.swiper-pagination',
					      paginationType: 'fraction'
				      })
				      let c = 'top-swiper-activity0';
				      let d = 'top-swiper-activity' + (this.activity_recommend.length - 1);
				      document.getElementsByClassName(c)[1].onclick = function () {
					      _this._appjs.syJsbLaunchWebview(_this.activity_recommend[0].touch_url)
				      };
				      document.getElementsByClassName(d)[0].onclick = function () {
					      _this._appjs.syJsbLaunchWebview(_this.activity_recommend[_this.activity_recommend.length - 1].touch_url)
				      }
			      }
		      }, 2000);

	      })
      })
      this._appjs.syJsbShowTitleBar('false')
      this._appjs.syJsbShowToolBar('true')
      // let i = setInterval(() => {
      //   this.pollData()
      // }, 8000)
//      setTimeout(() => {
//        clearInterval(i)
//      }, 60000)
    },
    methods: {
      GoUrl(touch_url){
        var that = this
        this.getUuid().then(function (res) {
            that._appjs.syJsbLaunchWebview(touch_url)
        },function () {
          that._appjs.syJsbLaunchWebview(touch_url)
        })
      },
      isAgrees(val){
        this.isAgreement = val
//        if(val == undefined){
//          val = 0
//          this.isAgreement = val
//        }else {
//          this.isAgreement = val
//        }
      },
//      获取名称
      getName(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=union&op=get_union_name').then((res) => {
          let n = res.data.content
          this.channelName = n.channel
          this.timeIsActivity = n.is_activity
        })
      },
//          弹窗跳转方式
      goMark(popUpId){
        if (this.pop_info.url_type === '1') {
          this._appjs.syJsbLaunchWebview(this.pop_info.touch_url)
          /*this.countPopUpClicks(popUpId).then(()=>{
            this._appjs.syJsbLaunchWebview(this.pop_info.touch_url)
          });//统计弹窗点击次数*/
        } else {
            this._appjs.syJsbLaunchWebview(this.pop_info.touch_url)
        }
      },
      goPage (url) {
        window.location.href = url
      },
      close_add_cookie () {
        this._appjs.syJsbShowToolBar('true')
        this.$cookie.set('index_pop', '1', 1)
        this.indexPop = false
      },
      hideToolBar () {
        this._appjs.syJsbShowToolBar('false')
      },
      numberChange(newValue, oldValue, key){
        let vm = this;

        function animate() {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }

        new TWEEN.Tween({tweeningNumber: oldValue})
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({tweeningNumber: newValue}, 1000)
          .onUpdate(function () {
            vm[key] = this.tweeningNumber.toFixed(0)
          })
          .start();
        animate()
      },

      async getData(){
        let union = await indexUnionRank()
        this.myUnionInfo = union.user_union_info
        this.topUnionList = union.top_list
        this.$nextTick(() => {
          new Swiper(this.$refs.welfare_area, {
            initialSlide: 0,
            direction: 'horizontal',
            slidesPerView: 2.1,
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true,
            observer: true,
            observeParents: true,
            freeModeMomentum: true,
            freeModeMomentumRatio: .5,
            slidesOffsetAfter: -60,
//              pagination: '.swiper-pagination',
            slideActiveClass: 'swiper-slide-active-a'
          })
        })
        let a = await indexFirst()
        this.pop_info = a.p
        //pop
        if (this.pop_info) {
          let index_pop = this.$cookie.get('index_pop')
          if (index_pop !== '1') {
            this.info = this._appjs.syJsbGetAppVersion()
            if (this.info['platform'] === 'ios') {
              var info = this.info['version']
              info.scope = this
              info.then(function (version) {
                if (version > 31) {
                  info.scope.indexPop = true
                  if (info.scope.indexPop && info.scope.pop_info) {
                    info.scope.hideToolBar()
                  }
                }
              })
            }
            if (this.info['platform'] === 'android') {
              this.indexPop = true
              if (this.indexPop && this.pop_info) {
                this.hideToolBar()
              }
            }
          }
        }
        this.member_info = a.u
        this.jiedui = a.j
        this.common = a.c
        this.project_recommend = a.c.recommend_project
        this.activity_recommend = a.c.recommend_activity
        this.shop_recommend = a.c.recommend_shop
        this.top_img = 'url(' + this.common['top_img'] + ') repeat'
        setTimeout(() => {
          this.welfarePeople = a.d['memberCount']
          this.welfareDonate = a.d['donationAmount']
          this.welfareActive = a.d['orderAmount']
        }, 1000)
        this.isLoading = false
        let c = await indexThird()
        this.dajiabang = c.d
        this.dajaibangLength = this.dajiabang['goods_list'].length
        this.techanguan = c.t
        this.youxiuzhuliren = c.y
        this.union_item_list = c.z.union_item_list
        if(typeof this.union_item_list != 'undefined' && this.union_item_list.length >0 ){
          this.zilianmeng = c.z.union_item_list[0]
          this.zilianmengLength = this.zilianmeng['goods_list'].length
          if(this.zilianmengLength >0){
              this.iszilianmeng = true
              if(this.zilianmengLength > 1 && this.zilianmengLength % 2 != 0){
                  this.zilianmeng['goods_list'].splice(this.zilianmengLength-1,1)
              }
          }else {
              this.iszilianmeng = false
          }
        }else {
            this.iszilianmeng = false
        }


        let banners = await getBanner()
        if(!(banners[1] instanceof Array)){
            this.AD1 = banners[1]
            this.isAD1 = true
        }else {
            this.isAD1 = false
        }
        if(!(banners[2] instanceof Array)){
            this.AD2 = banners[2]
            this.isAD2 = true
        }else {
            this.isAD2 = false
        }
        if(!(banners[3] instanceof Array)){
            this.AD3 = banners[3]
            this.isAD3 = true
        }else {
            this.isAD3 = false
        }
        if(!(banners[4] instanceof Array)){
            this.AD4 = banners[4]
            this.isAD4 = true
        }else {
            this.isAD4 = false
        }
        if(!(banners[5] instanceof Array)){
            this.AD5 = banners[5]
            this.isAD5 = true
        }else {
            this.isAD5 = false
        }
        if(!(banners[6] instanceof Array)){
            this.AD6 = banners[6]
            this.isAD6 = true
        }else {
            this.isAD6 = false
        }
      },
      async pollData () {
        let d = await indexPoll()
        this.welfarePeople = d.d['memberCount']
        this.welfareDonate = d.d['donationAmount']
        this.welfareActive = d.d['orderAmount']
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
      clickGoUrl(url, recId){
        this.GoUrl(url)
        return ;
        let that = this;
        that._appjs.syJsbLaunchWebview(url);
        /*that.countClicks(recId).then(() => {
          that._appjs.syJsbLaunchWebview(url);
        });*/
      },
      countClicks(recId){
        return this.$http.get(this.siteInfo.host + '/api/index.php?act=recommend&op=setHomeClick&origin=rec_id&id='+recId).then((res) => {
          let code = res.data.code
          let message = res.data.message
          if(code == 200){
            /*console.log(code)
            console.log(message)*/
          }else{
            /*console.info(code)
            console.info(message)*/
          }
        })
      },
      countPopUpClicks(popUpId){
       return this.$http.get(this.siteInfo.host + '/api/index.php?act=recommend&op=setHomeClick&origin=pop_id&id='+popUpId).then((res) => {
          let code = res.data.code
          let message = res.data.message
          if(code == 200){
           /* console.log(code)
            console.log(message)*/
          }else{
           /* console.info(code)
            console.info(message)*/
          }
        })
      },
      getTheAppInfo(){
        this._appjs.syJsbGetAppInfo(function(appInfo){
          let platform = '';
          let version = '';
//          console.log(appInfo)
          if(appInfo){
            platform = appInfo.split("|")[1];
            version = appInfo.split("|")[5];
           if(platform == 'ios'){
//             console.log(platform)
           }else{
//             console.log(platform)
           }
          }else{
//            console.log('appInfo 不在')
          }
        })
      },
    },
    watch: {
      welfarePeople(newValue, oldValue) {
        this.numberChange(newValue, oldValue, 'welfarePeople1')
      },
      welfareDonate(newValue, oldValue) {
        this.numberChange(newValue, oldValue, 'welfareDonate1')
      },
      welfareActive(newValue, oldValue) {
        this.numberChange(newValue, oldValue, 'welfareActive1')
      },
    },
    components: {
      loading, syPrivacy
    }
  }
</script>

<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";
  @import "/bocm/platformjs/static/css/swiper.min.css";

  $basecolor: red;
  $bgcolor: #F7F9FA;
  $blue: #4A90E2;

  html::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
  }

  html {
    overflow-y: auto;
  }

  #index_home_page {
    font-weight: 300;
    background: #fff;
    color: #4B4F63;

  }

  .font-normal {
    font-weight: 400;
  }

  .weight {
    font-weight: 700;
  }

  .color4 {
    color: #4B4F63
  }

  .color66 {
    color: #666A7F
  }

  .color-blue {
    color: #4A90E2
  }

  .colorf {
    color: #ffffff;
  }

  .ml2 {
    margin-left: .2rem;
  }

  .border-box {
    box-sizing: border-box;
  }

  .color66 {
    color: #666A7F
  }

  .bg-f {
    background: #fff;
  }

  .font36 {
    font-size: .36rem;
  }

  .font_size26 {
    font-size: .26rem !important;
  }

  .carousel-container .item_container {
    border: 1px solid $blue;
    border-radius: .1rem;
    padding: .27rem 0 .27rem .3rem;
    box-sizing: border-box;
    width: 3.4rem;
    height: 2.1rem;
  }

  .swiper-slide-active-a {
    transition: background-color .4s;
    background-color: #4A90E2;
    color: #fff;
    -webkit-box-shadow: 0 0 20px 1px #4A90E2;
    -moz-box-shadow: 0 0 20px 1px #4A90E2;
    box-shadow: 0 0 10px 1px #4A90E2;
  }

  .swiper-slide-active-a .is_join {
    background: #2A6EBD;
  }

  #pagination {
    bottom: 0;
  }

  .carousel-container {
    text-align: left;
    /*padding:.27rem 0 .2rem .1rem;*/
    /*padding-bottom:.2rem;*/
  }

  .item_title {
    height: .42rem;
    line-height: .42rem;
  }

  .is_join {
    margin-left: 2px;
    color: #4A90E2;
    border-radius: .16rem;
    padding: 0 .1rem;
    background: #fff;
    border: 1px solid #4A90E2;
    font-size: .22rem;
    height: .32rem;
    margin-top: .03rem;
    line-height: .32rem;
    box-sizing: border-box;
    position: relative;
  }

  .item_con {
    padding-top: .18rem;
  }

  .item_con > div {
    padding: .05rem 0;
    /*margin-top: 0.1rem;*/
  }

  .swiper-slide {
    /*width:3.4rem;*/
    /*height:2.1rem;*/
  }

  .swiper-container-a {
    padding: .3rem 0 .4rem .2rem;
    /*width:100%;*/
  }

  .carousel-container .more_alliance {
    background: #F6FAFF;
    width: 1.1rem !important;
    height: 2.1rem;
    border: 1px solid #4A90E2;
    border-radius: .1rem;
    line-height: .3rem;
    padding: .3rem !important;
    box-sizing: border-box;
  }

  .bg_interval {
    height: .2rem;
    background: #F7F9FA;
  }

  .index_top {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 1.28rem;
    padding-top: .48rem;
    /*box-shadow: 0 0 1px .8px #999;*/
    border-bottom: 1px solid #eee;
    /*background: rgba(255,255,255,.95);*/
    background: #fff;
    z-index: 100000;
    /*box-shadow:0 0 1px 1px rgba(0,0,0,.1);*/
    box-shadow: 0 1px 4px rgba(200, 200, 200, .1);
  }

  .index_top_title {
    height: 40px;
    line-height: 40px;
    padding: 0 .3rem 0 .2rem;
    box-sizing: border-box;
    /*border-bottom: 1px solid #ccc;*/
  }

  .index_top_title > div {
    height: 100%;
  }

  .index_top_left {
    width: 8%;
  }

  .index_top_left img {
    width: .38rem;
    height: auto;
    vertical-align: middle;
    /*margin-left:.1rem;*/
  }

  .index_top_cen {
    width: 84%;
    font-size: 19px !important;
  }

  .index_top_right {
    width: 8%
  }

  .index_menu {
    /*width:.6rem;*/
    text-align: center;
  }

  .index_menu > div {
    display: inline-block;
    width: .1rem;
    height: .1rem;
    border-radius: .05rem;
    background: #818C9E;
  }

  .statistics {
    background: url("/bocm/platformjs/static/image/default/default_400_280.jpg") no-repeat;
    /*background: #fff;*/
    height: 1.80rem;
    background-size: 100% 1.80rem !important;
  }

  ul.child-fl > li {
    float: left;
  }

  .statistics_con {
    padding-top: .95rem;
  }

  .statistics_con .statistics_child {
    width: 33.33333%;

  }

  .statistics_con .statistics_child div {
    /*padding-left:.3rem;*/
  }

  .statistics_con .welfare_people {
    margin-bottom: .18rem;
    /*font-family: "AvenirNextCondensed";*/
    /*font-family: "DinC";*/
  }

  .statistics_con .statistics_interval {
    width: 2%;
    height: .8rem;
  }

  .statistics_con .statistics_interval > div {
    height: 100%;
    width: 1px;
    background: #4A90E2;
    -webkit-transform: rotate(15deg);
    -moz-transform: rotate(15deg);
    -ms-transform: rotate(15deg);
    -o-transform: rotate(15deg);
    transform: rotate(15deg);
  }

  .rank {
    right: 0;
    top: 0;
  }

  .rank img {
    width: .7rem;
  }

  .index_personal_container {
    padding: .3rem;
  }

  .index_personal {
    height: .8rem;
  }

  .index_personal img {
    width: .8rem;
    height: .8rem;
    border-radius: .4rem;

  }

  .personal_text {
    box-sizing: border-box;
    padding: .04rem 0 .04rem .1rem;
    line-height: .36rem;
  }

  .personal_text_else {
    font-size: .26rem;
  }

  .personal_text_else_pl {
    padding-left: 1.4rem;
  }

  .personal_text_top {
    line-height: .4rem;
  }

  .personal_text_bottom {
    line-height: .44rem;
    font-size: .24rem;
  }

  .personal_text_else_pl p {
    font-size: .26rem;
  }

  .personal_text_else_pl p span {
    font-size: .3rem;
    color: #4A90E2
  }

  .personal_text_else li {
    width: 33.33333%;
    float: left;
  }

  .personal_more {
    height: .8rem;
    width: .3rem;
    background: url("/bocm/platformjs/static/image/default/ap27.png") no-repeat center right;
    background-size: .13rem auto;
  }

  .module_title {
    padding: .3rem 0 .14rem;
  }

  .module_title_top {
    padding-bottom: .15rem;
  }

  .sub_menu {
    padding: .3rem 0;
  }

  .sub_menu li {
    float: left;
    width: 33.33333333%;
  }

  .sub_menu_jc {
    padding: .3rem 0;
  }

  .sub_menu_jc li {
    float: left;
    width: 25%;
  }

  .sub_menu_text {
    padding-top: .14rem;
    font-size: .26rem;
    color: #4B4F63
  }

  .index_matches_container {
    padding: .05rem 0 .3rem;
  }

  .index_matches {
    width: 60%;
    margin: 0 auto;
    height: 1rem;
  }

  .portrait {
    height: 1rem;
    width: 1rem;
    border-radius: .5rem;
    overflow: hidden;
  }

  .index_matches_con {
    width: 80%;
    margin: 0 auto;
    height: 1rem;
    position: relative;
  }

  .portrait_left {
    left: 0;
    top: 0;
    z-index: 100;
  }

  .portrait_right {
    right: 0;
    top: 0;
    z-index: 100;
  }

  .go_match {
    height: .52rem;
    width: 100%;
    border-bottom: 1px solid #4A90E2;
    border-top: 1px solid #4A90E2;
  }

  .go_match_text {
    width: 1.64rem;
    height: .52rem;
    line-height: .52rem;
    margin: 0 auto;
    font-size: .24rem;
    padding-right: .3rem;
    box-sizing: border-box;
    /*background-color: rgba(74,144,226,0.7);*/
    background-color: $blue;
    box-shadow: 0 0 10px 1px rgba(74, 144, 226, 0.7);
    border-radius: .26rem;
  }

  .go_match_text p {
    padding-left: .3rem;
    height: 100%;
    padding-right: .2rem;
    background: url("/bocm/platformjs/static/image/index/arrow123.png") center right no-repeat;
    background-size: .12rem auto;
  }

  .module_title_bottom {
    color: #666A7F
  }

  .had_index_match {
    text-align: center;
    width: 100%;
  }

  .had_index_match > div {
    display: inline-block;
  }

  .had_portrait_left {
    margin-right: .6rem;
  }

  .everyone_help {
    text-align: left;

  }

  .sub_left_title {
    padding: .3rem 0 .3rem .46rem;
  }

  .goods_con {
    padding: 0 .3rem;
  }

  .sub_left_title_text::before {
    content: '';
    display: block;
    background: url("/bocm/platformjs/static/image/index/yellow22.png") center center no-repeat;
    background-size: .38rem .7rem;
    width: .1rem;
    height: .4rem;
    border-radius: .03rem;
    position: absolute;
    left: .3rem;
    margin-top: -.06rem;
    /*-webkit-box-shadow:0 0 1px 1px #F8E71C;*/
    /*-moz-box-shadow: 0 0 1px 1px #F8E71C;*/
    /*box-shadow:  0 0 1px 1px #ccc;*/

  }

  .goods_con li {
    width: 49%;
    float: left;
    margin-right: 2%;
    padding-bottom: .1rem;
    /*height:4.12rem;*/
    /*border:1px solid #ccc;*/
    box-sizing: border-box;
  }

  .goods_con li img.a {
    display: block;
    width: 100%;
    height: 2.38rem;
    border-radius: .1rem;
    border: 1px solid #e2e2e2;
    box-sizing: border-box;
  }

  .goods_con li:nth-child(even) {
    margin-right: 0;
  }

  .goods_con li:nth-child(even)::after {

  }

  .goods_name {
    padding-left: .04rem;
    padding-right: .28rem;
    margin-top: .3rem;
    /*height:.76rem;*/
    line-height: .38rem;
    font-size: .28rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .goods_price {
    padding: .2rem 0;

  }

  .special_goods_con {
    padding: 0 .3rem .3rem;
  }

  .special_goods_li {
    height: 1.4rem;
    padding-bottom: .3rem;
  }

  .special_goods_li > div {
    height: 100%;
    width: 29%;
    margin-right: 1%;
    float: left;
    border-radius: .08rem;
  }

  .special_goods_li img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: .08rem;
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
  }

  .more_special_goods {
    float: right !important;
    height: 100% !important;
    margin-right: 0 !important;
    width: 10% !important;
    background: url("/bocm/platformjs/static/image/index/arrow_index12.png") no-repeat 88% center !important;
    background-size: .11rem .24rem !important;
    background-color: #C8DDF5 !important;
  }

  .more_special_goods_text {
    font-size: .24rem;
    width: .24rem;
    line-height: .28rem;
    left: 26%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .assistants {
    padding: 0 .3rem;
  }

  .assistants_li {
    width: 25%;
  }

  .assistants_li img {
    width: .9rem;
    height: .9rem;
    border-radius: 50%;
    margin: 0 auto;
    display: block;
  }

  .assistants_name {
    padding-top: .2rem;
  }

  .assistants_score {
    padding: .15rem 0 .3rem;
  }

  .bottom_bar {
    color: #DADEE4;
    /*padding:.13rem;*/
    font-size: .24rem;
    height: .5rem;
    line-height: .5rem;
    background: #F7F9FA;

  }

  .member_truename {
    font-size: .26rem;
    padding-top: .1rem;
  }

  .more_goods_gt {
    background: url("/bocm/platformjs/static/image/union/list_title_right.png") right 46% no-repeat;
    background-size: .14rem .25rem;
  }

  .bg_gt_blue {
    padding-right: .2rem;
    font-size: .26rem !important;
    color: $blue;
    background: url("/bocm/platformjs/static/image/index/arrow_blue3.png") right 46% no-repeat;
    background-size: .12rem auto;
  }

  .tendency_bg_img {
    width: .3rem !important;
    height: auto !important;
    margin-bottom: -1px;
    position: relative;
  }

  .mark, .privacyMark {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999999;
  }

  .mark .markCon {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .mark .markImg {
    width: 5.54rem;
    height: 7.12rem;
    background-color: #e1e1e1;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  .mark .markImg img {
    width: 100%;
    height: 7.12rem;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 16px;
  }

  .mark .markClose {
    margin-top: 0.66rem;
  }

  .mark .markClose img {
    height: 0.84rem;
    width: 0.84rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .index_menu_img {
    width: 22px;
    height: auto;
    /*float: right;*/
    margin-top: 10px;
  }
  .boc_banner{background: #F7F9FA;width: 100%;height: 1.8rem; }
  .boc_banner img{width: 100%;height: 100%}
  .youxuan-parent{
    position: relative;
  }
  .youxuan-parent img.youxuan{
    position: absolute;
    top:0rem;
    left: 0.2rem;
    width: 0.4rem;

  }
</style>
