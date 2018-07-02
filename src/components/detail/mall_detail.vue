<template>
  <div id="detail" @click="reset">
    <div v-title="'产品详情'"></div>
    <!--<div v-title="goods_name"></div>-->

    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name="fade">
      <div v-show="!isLoading" class="ovhiden">
        <div class="wrap iphonex-margin-bottom">

          <!--分享之后的顶部bar app下载-->
          <div v-if="isShare && isDownload">
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


          <!--产品信息-->
          <div class="box relative">
            <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/youp.png'" alt="" style="position: absolute;top: 0rem;left: 0.3rem;width: 0.8rem;z-index: 9" v-if="is_quality_goods==='true'">-->
            <!--分享之后 分享者头像显示-->
            <div v-if="isShare && (type === 'order')">
              <!--<div v-if="true">-->
              <div class="relative" style="height:2rem;">
                <!--<img src="../../../static/image/detail/ap63res.png" alt="" style="width:100%;">-->
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/ap63res.png'" alt="" style="width:100%;">
                <!--<img src="../../../static/image/detail/people.png" alt="" class="cen" style="width:1.4rem;height:1.4rem;border-radius:.7rem;top:65%;">-->
                <!--<img :src="member_idUrl" alt="" class="cen" style="width:1.4rem;height:1.4rem;border-radius:.7rem;top:65%;">-->
                <div class="cen" style="width:1.58rem;height:1.58rem;border-radius: .79rem;background: rgba(255,255,255,.3);top:65%;">
                  <div class="cen" style  ="width:1.4rem;height:1.4rem;border-radius:.7rem;top:50%;overflow: hidden">
                    <img :src="member_idUrl" alt="" class="cen" style="width:1.46rem;height:1.46rem;border-radius:.73rem;border:none;overflow: hidden;top:50%">
                  </div>
                </div>
              </div>
              <div class="text-center" style="padding:0.4rem 0 0.5rem;font-size:.3rem;color:#606060">我在一起善源平台购买了好东东，物美价廉还能献爱心</div>
            </div>
            <!--公告 延迟发货 浮层滚动-->
            <!--<div class="fixed" style="left:0;top:0;width:100%;font-size:.28rem;z-index: 9999999" v-show="!isShare && show_notify && isgg">-->
              <!--<div id="gongao">-->
                <!--<div class="hide">-->
                  <!--<div class="gonggao-left"></div>-->
                  <!--<div id="scroll_div" class="scroll_div">-->
                    <!--<div style="width:30000px">-->
                      <!--<div id="scroll_begin" style="min-width:6.5rem;">-->
                        <!--{{ show_notify_msg }}-->
                      <!--</div>-->
                      <!--<div id="scroll_end">-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--公告 延迟发货 商品售罄 固定位置提示-->
            <div class="gonggao-con clearfix" v-if="isSellOut && !isShare">
              <div class="con-right2" >产品已售罄</div>
            </div>
            <div v-else>
              <div v-show="!isShare && show_notify && isgg">
                <div class="gonggao-con clearfix">
                  <div class="con-left"></div>
                  <div class="con-right" >{{ show_notify_msg }}</div>
                </div>
              </div>
            </div>
            <!--顶部商品图片-->
            <div class="detail-top-img relative" v-if="!isVideo "> <!-- v-if="!isVideo || isShare"-->
              <!--top图片-->
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/youp.png'" alt="" style="position: absolute;top: 0rem;left: 0.3rem;width: 0.8rem;z-index: 9" v-if="is_quality_goods==='true'">
              <div >
                <img class="over_img" :src="goods_image" alt="top-img" onerror="this.src='/bocm/platformjs/static/image/detail/detail_default.png'">
              </div>
              <!--扶贫码可用-->
              <div class=" absolute" style="right:.2rem;bottom:.2rem">
                <ul class="clearfix child-fl source-description">
                  <li v-for="item in goods_tag_list" v-text="item.name"></li>
                </ul>
              </div>
            </div>
            <!--顶部商品video-->
            <div class="relative" v-if="isVideo && isShare">
              <!--top图片-->
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/youp.png'" alt="" style="position: absolute;top: 0rem;left: 0.3rem;width: 0.8rem;z-index: 9" v-if="is_quality_goods==='true'">
              <div >
                <img style="width: 100%" :src="video_main_info.main_video_img">
              </div>
              <!--扶贫码可用-->
              <div class=" absolute" style="right:.2rem;bottom:.2rem">
                <ul class="clearfix child-fl source-description">
                  <li v-for="item in goods_tag_list" v-text="item.name"></li>
                </ul>
              </div>
            </div>
            <div class=" relative" v-if="isVideo && !isShare">
              <!--top视频-->
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/youp.png'" alt="" style="position: absolute;top: 0rem;left: 0.3rem;width: 0.8rem;z-index: 9" v-if="is_quality_goods==='true'">
                <div @click="stoptwo">
                <sy-player ref="videoone" v-on:showGonggao=showGonggao width="7.5" height="7.5" :videosrc="video_main_info.main_video_url" :cover="video_main_info.main_video_img" :videoname="video_main_info.main_videoname" ></sy-player>
              </div>
              <!--扶贫码可用-->
              <div :class="isVideo && !isShare ? 'abso' : 'notvideo'" v-if="isgg">
                <ul class="clearfix child-fl source-description">
                  <li v-for="item in goods_tag_list" v-text="item.name"></li>
                </ul>
              </div>
            </div>
            <!--中秋活动-->
            <div class="autumn" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=topic&op=midautumn')" v-if="isAut">
              <div class="clearfix autumn_con">
                <div class="fl">中秋筹集爱心能量，得双倍积分回馈</div>
                <div class="fr autumn_detail">查看详情</div>
              </div>
            </div>

            <!--产品名称 产地-->
            <div class="detail-top-text">
              <div>
                <p class="text-left no-enter" style="font-size:0.34rem;padding-top:0.01rem;line-height: .5rem;height: 1rem;">{{ goods_name }}</p>
                <!--<p class="text-left no-enter" style="font-size:0.34rem">说的过分的说的过分的说的过分的说的过分哈</p>-->
                <p class="text-left goods-area" style="margin-top:.2rem" v-if="goods_areainfo">
                  <span>产地：</span><span>{{ goods_areainfo }}</span>
                  <span style="color:rgb(241,62,82)" v-if="goods_common_info.goods_areainfo_tag =='poor'"> &nbsp;贫困地区</span>
                  <!--<span style="color:rgb(241,62,82)" v-if="true">[贫困地区]</span>-->
                </p>
                <p style="line-height:.4rem;margin-top:.16rem;color:#B1B1B1;font-size:.26rem;" v-if="goods_common_info.goods_areainfo_tag =='poor'">当地物流不及城市发达，产品到您手中可能会需要5～10天，请多多理解。点滴帮扶汇集仁心，积少成多服务三农。</p>
                <!--<p style="line-height:.4rem;margin-top:.16rem;color:#B1B1B1;font-size:.26rem;" v-if="true">当地物流不及城市发达，产品到您手中可能会需要5～10天，请多多理解。点滴帮扶汇集仁心，积少成多服务三农。</p>-->
              </div>
            </div>

            <!--一类 价格描述-->
            <!--<div v-if="false">
              &lt;!&ndash;<div v-if="false">&ndash;&gt;
              &lt;!&ndash;<div v-if="true">&ndash;&gt;
              <div class="content-auto price-integral relative text-center">
                <ul class="child-fl clearfix price-integral-ul">
                  <li>
                    <p><span style="color:#CD5478;font-size:.32rem">{{ poor_get_fee }}元</span></p>
                    <p><span>帮扶贫困户</span></p>
                  </li>
                  <li>
                    <p><span style="color:#D4A36E;font-size:.32rem">{{ fund_fee }}元</span></p>
                    <p><span>捐入扶贫基金</span></p>
                  </li>
                  <li>
                    <p><span style="color:#6E99D4;font-size:.32rem">{{ will_get_points }}分</span></p>
                    <p><span>积分送给您</span></p>
                  </li>
                </ul>
                <div class="absolute prise-help-img ">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Disclosure.png'" alt=""
                       @click="show_fund_fee_explain">
                </div>

              </div>
              <div class="content-auto">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Line.png'" alt="" style="width:100%;">
              </div>
              <p class="text-center goods-price"><span style="font-size:.26rem;font-weight:700;">￥</span><span
                style="font-size:.48rem;font-weight:700">{{ goods_price }}
              </span> <span
                style="font-size:.26rem">/ {{ goodsUnit }}</span>
              </p>

            </div>-->

            <!--价格描述-->
            <div style="">
              <!--<div v-if="true" style="">-->
              <div class="content-auto price-integral2 relative text-center">

                <ul class="child-fl clearfix price-integral-ul2">
                  <li style="width:38%;">
                    <div class="text-left goods-price relative" style="padding-top:.5rem;">
                      <div class="absolute old_price_top" v-if="show_old_price">
                        爱心价
                      </div>
                      <span style="font-size:.26rem;font-weight:600;color:#BF1818">￥</span>
                      <span style="font-size:.48rem;font-weight:600;color:#BF1818">{{goods_price}}</span>
                      <span style="font-size:.26rem" v-if="!isPoor">/ {{ goodsUnit }}</span>
                      <div class="absolute old_price_bottom" v-if="show_old_price">
                        <s>{{goods_common_info.goods_marketprice}}/{{goodsUnit}}</s>
                      </div>
                    </div>
                  </li>
                  <li style="width:2%;padding-top:.18rem;">
                    <!--<img :src="sifalseteInfo.cdn_host+'/bocm/platformjs/static/image/detail/LineCopy9.png'" alt="" width="100%;" style="height:1.11rem;">-->
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Line_price.png'" alt="" style="height:1.11rem;width:100%">
                    <!--<img src="../../../static/image/detail/Line_price.png" alt="" style="height:1.11rem;width:100%">-->
                  </li>
                  <template v-if="fund_fee > 0">
                    <li style="width:20%">
                      <p class="text-left price-integral2-p1" style="color:#606060;font-size: .28rem;">
                        <span >{{ poor_get_fee }}元</span><br>
                        <span >{{ fund_fee }}元</span><br>
                        <span >{{ will_get_points }}分</span>
                      </p>
                    </li>
                    <li style="width:36%">
                      <p class="text-left price-integral2-p1" style="color:#B1B1B1;font-size: .28rem;">
                        <span>帮扶贫困户</span><br>
                        <span>捐入扶贫基金</span><br>
                        <span>公益积分送给您</span>
                      </p>
                    </li>
                  </template>
                  <!--二三次类-->
                  <template v-else>
                    <li style="width:20%;padding-top:.14rem;">
                      <div class="text-left price-integral2-p1" style="color:#606060;;font-size: .28rem;">
                        <div style="font-size:.26rem;">{{ poor_get_fee }}元</div>
                        <!--<span style="font-size:.26rem">{{ fund_fee }}元</span><br>-->
                        <div style="font-size:.26rem;padding-top:.2rem;">{{ will_get_points }}分</div>
                      </div>
                    </li>
                    <li style="width:36%;padding-top:.14rem;">
                      <div class="text-left price-integral2-p1" style="color:#B1B1B1;font-size: .28rem;">
                        <div>帮扶贫困户</div>
                        <!--<span>捐入扶贫基金</span><br>-->
                        <div style="padding-top:.2rem;">公益积分送给您</div>
                      </div>
                    </li>
                  </template>
                  <!--二三四类结束-->
                </ul>
                <div class="absolute prise-help-img" style="bottom:.4rem;width:.8rem;height:.8rem;" @click="show_fund_fee_explain">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Disclosureres.png'" alt="" class="cen">
                </div>
              </div>

            </div>
            <!--批发-->
            <!--<div class="pifa" v-if="goods_common_info.wholesale_type == '1'">
              <div class="pi_icon">批</div><div class="pi_zc">支持批发</div><div class="pi_price">批发价：¥ {{goods_info.wholesale_price}}  &nbsp;&nbsp;&nbsp;&nbsp;起批量：{{goods_common_info.wholesale_num}}袋</div>
            </div>-->
            <!--互动-->
            <div class="price-goods">
              <!--3个icon（非集采）-->
              <div  v-if="goods_detail_type !== 'assist'" style="padding:0 0.65rem;"><!--v-if="goods_detail_type !== 'assist'" -->
                <ul class="text-center clearfix child-fl">
                  <li>
                    <div class="auto">
                      <!--<img class="help-person-img" style="background: rgba(22,22,22,.1);" :src="helpImgUrl" alt="图片加载中" @click="immediatelyHelp" @touchstart="f1" @touchend="f2">-->
                      <img class="help-person-img" style="border-radius: .49rem;" :class="{press_bg:isTouched1}" :src="helpImgUrl" alt="图片加载失败了" @click="immediatelyHelp" @touchstart="isTouched1 = true" @touchend="isTouched1 = false">

                    </div>
                    <p>{{ sale_num }}人帮扶</p>
                  </li>
                  <li>
                    <div class="auto">
                      <img :src="helpCenImgUrl" style="border-radius: .49rem;" :class="{press_bg:isTouched2}" alt="图片加载失败了" @click="support" @touchstart="isTouched2 = true" @touchend="isTouched2 = false">
                    </div>
                    <p>鼓励Ta</p>
                  </li>
                  <li>
                    <div class="auto">
                      <img :src="helpRightImgUrl" style="border-radius:.49rem;" :class="{press_bg:isTouched3}" alt="图片加载失败了" @click="onShare" @touchstart="isTouched3 = true" @touchend="isTouched3 = false">
                    </div>
                    <p>帮传播</p>
                  </li>
                </ul>
              </div>
              <!--78-->
              <!--增加集采清单icon（4个icon）-->
              <div v-if="goods_detail_type == 'assist'" style="padding:0 0.2rem;">
                <ul class="text-center clearfix child-fl">
                  <li style="width: 25%">
                    <div class="auto">
                      <!--<img class="help-person-img" style="background: rgba(22,22,22,.1);" :src="helpImgUrl" alt="图片加载中" @click="immediatelyHelp" @touchstart="f1" @touchend="f2">-->
                      <img class="help-person-img" style="border-radius: .49rem;" :class="{press_bg:isTouched1}" :src="helpImgUrl" alt="图片加载失败了" @click="immediatelyHelp" @touchstart="isTouched1 = true" @touchend="isTouched1 = false">

                    </div>
                    <p>{{ sale_num }}人帮扶</p>
                  </li>
                  <!--人大商品-->
                  <li style="width: 25%" v-if="isNpcSpecilGoods === 'true'">
                    <div class="auto">
                      <img :src="grayBizbuyListImgUrl" style="border-radius: .49rem;" :class="{press_bg:isTouched4}" alt="图片加载失败了" @touchstart="isTouched4 = true" @touchend="isTouched4 = false">
                    </div>
                    <p>集采清单</p>
                  </li>
                  <li style="width: 25%" v-else>
                    <div class="auto" v-if="purchasingPopups">
                      <img :src="bizbuyListImgUrl" style="border-radius: .49rem;" :class="{press_bg:isTouched4}" alt="图片加载失败了" @click="group_buying_event_popups();" @touchstart="isTouched4 = true" @touchend="isTouched4 = false">
                    </div>
                    <div class="auto" v-else>
                      <img :src="bizbuyListImgUrl" style="border-radius: .49rem;" :class="{press_bg:isTouched4}" alt="图片加载失败了" @click="isbuyUnit=true;" @touchstart="isTouched4 = true" @touchend="isTouched4 = false">
                    </div>
                    <p>集采清单</p>
                  </li>
                  <li style="width: 25%">
                    <div class="auto">
                      <img :src="helpCenImgUrl" style="border-radius: .49rem;" :class="{press_bg:isTouched2}" alt="图片加载失败了" @click="support" @touchstart="isTouched2 = true" @touchend="isTouched2 = false">
                    </div>
                    <p>鼓励Ta</p>
                  </li>
                  <li style="width: 25%">
                    <div class="auto">
                      <img :src="helpRightImgUrl" style="border-radius:.49rem;" :class="{press_bg:isTouched3}" alt="图片加载失败了" @click="onShare" @touchstart="isTouched3 = true" @touchend="isTouched3 = false">
                    </div>
                    <p>帮传播</p>
                  </li>
                </ul>
              </div>
            </div>

            <!--可选规格 规格数量-->
            <div class="select-detail">
              <!--集采详情增加 已售-->
              <div v-if="goods_detail_type == 'assist'" class="elective content-auto clearfix" style="padding:0 0 .4rem;">
                <div class="elective-left fl text-left"><span>已&emsp;&emsp;售:</span></div>
                <div class="elective-right fl">{{assistGoodSellNum}}&ensp;{{goodsUnit}}</div>
              </div>
              <div class="elective content-auto clearfix" style="padding:0 0 .1rem 0;">
                <div class="elective-left fl text-left"><span>可选规格:</span></div>
                <div class="elective-right fl">
                  <ul class="pl07 child-ellipsis" style="padding-bottom:.3rem;">
                    <li v-for="(item,index) in goods_spec_list">
                      <div class="clearfix">
                        <!--<p class="fl no-enter" style="width:56%;">每sdafasdfsdfsafdsadfsadfs的官方的身高多少afdsa</p>-->
                        <p class="fl one-row" style="width:56%;">每{{item.goods_spec}}</p>
                        <!--<p class="fl"><span style="font-size: .28rem;color:#BF1818">￥{{ item.goods_price}}</span>/{{ goodsUnit }}</p>-->
                        <p class="fl" v-if="(item.goods_storage > 0) && goods_spec_list.length > 1"><span style="font-size: .28rem;color:#BF1818">￥{{ item.goods_price}}</span><span v-if="!isPoor">/{{ goodsUnit }}</span></p>
                        <p class="fl" v-if="item.goods_storage == 0 "><span style="font-size: .28rem;color:#BF1818">已售光</span></p>
                        <!--<p class="fl"><span style="font-size: .28rem;color:#BF1818">￥66666666</span>/{{ goodsUnit }}</p>-->
                      </div>
                    </li>
                    <!--<li>-->
                    <!--<span>每 稍11撒地方 </span> &nbsp; <span style="color:#999">还剩是大法官</span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>每 稍100地方 </span> &nbsp; <span style="color:#999">还剩是大法官</span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>每 稍等撒地方 </span> &nbsp; <span style="color:#999">还剩是大法官</span>-->
                    <!--</li>-->
                  </ul>
                </div>
              </div>

              <div class="content-auto clearfix">
                <div class="elective-left fl text-left"><span>配&emsp;&emsp;送:</span></div>
                <div class="elective-right fl">
                  <ul class="pl07" style="padding-bottom:.4rem;">
                    <li class="clearfix">
                      <!--<p class="fl">运费 {{ shipping_fee }} 元</p>-->
                      <p class="fl"> {{ freight }}</p>
                      <p class="fr" style="margin-right:.4rem;color:#b1b1b1" v-if="trade_mode == 'qkys'">{{ presell_time }}后发货</p>
                      <!--<p class="fr" style="margin-right:.4rem;color:#b1b1b1" v-if="true">12月12日后发货</p>-->
                    </li>
                    <li class="" style="color:#b1b1b1;font-size:.26rem;">{{ buy_area }}</li>
                    <!--<li class="" style="color:#b1b1b1;font-size:.26rem;">dsfasdfasfdasdfffffffffffffffffffffff速度发生的国防生的风格的双方各啥地方规定是法国大使馆</li>-->
                  </ul>
                </div>
              </div>

              <div class="content-auto clearfix" v-show="goods_cert_list.length" style="padding-bottom:.3rem;">
                <!--<div class="content-auto clearfix" style="padding-bottom:.3rem;">-->
                <div class="elective-left fl text-left" style="width:18%"><span>产品认证</span></div>
                <div class="elective-right fl clearfix">
                  <div style="width:100%" class="clearfix">
                    <ul class="pl07 child-ellipsis fl clearfix serve-promise">
                      <li v-for="(item,index) in goods_cert_list" @click="openBigImg(item.goods_cert_image,item.goods_cert_no)">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group9.png'" alt=""
                             style="vertical-align:middle;width:.3rem;height:.3rem;position: relative;margin-top:-0.06rem;">
                        <span>{{item.name}}</span>
                        <img  v-if="item.goods_cert_image"
                              :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group12Copy3.png'" alt=""
                              style="vertical-align:middle;width:.3rem;height:.3rem;position: relative;margin-top:-0.04rem;">
                      </li>
                      <!--<li v-for="(item,index) in 5">-->
                      <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group9.png'" alt=""-->
                      <!--style="vertical-align:middle;width:.3rem;height:.3rem;position: relative;margin-top:-0.06rem;">-->
                      <!--<span>sdf dsfg </span>-->
                      <!--<img @click="openBigImg(item.goods_cert_image)" v-if="item.goods_cert_image"-->
                      <!--:src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group12Copy3.png'" alt=""-->
                      <!--style="vertical-align:middle;width:.3rem;height:.3rem;position: relative;margin-top:-0.04rem;">-->
                      <!--</li>-->
                    </ul>
                  </div>
                </div>
              </div>

              <!--优惠券-->
              <div class="elective content-auto clearfix" style="padding:0 0 .1rem 0;" v-if="isquan">
                <div class="elective-left fl text-left"><span>优 惠 券:</span></div>
                <div class="elective-right fl">
                  <ul class="child-ellipsis" style="padding-bottom:.3rem;" @click="quan_tan()">
                    <li>
                      <div class="clearfix">
                        <p v-for="(item,index) in quan_data"  class="fl no-enter bg_quan" :class="item.voucher_t_limit>999?'bg_quan_big':''" v-if="getShowDom(quan_data,index)" >满{{item.voucher_t_limit}}减{{item.voucher_t_price}}</p>
                        <p class="fl no-enter" style="width:0.32rem;height:0.32rem;float:right;background: url(/bocm/platformjs/static/image/detail/gt_blue.png) no-repeat right center;background-size: 0.12rem 0.24rem;"></p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!--可能关心-->
            <!--11月22迭代，去掉帮扶小贴士-->
            <!--2018/03/14迭代，集采详情去掉帮扶小贴士-->
            <div class="care" v-if="goods_detail_type === 'poor'">
              <div class="care_wrap">
                <div class="care_title">
                  <h3 class="text-center relative auto" style="width:3rem;">
                    <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/leaf_left.png'" alt="" class="absolute">-->
                    <!--<img src="../../../static/image/detail/leaf_left.png" alt="" class="absolute care_img_left">-->
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/leaf_left.png'" alt="" class="absolute care_img_left">
                    <span>帮扶小贴士</span>
                    <!--<img src="../../../static/image/detail/leaf_right.png" alt="" class="absolute care_img_right">-->
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/leaf_right.png'" alt="" class="absolute care_img_right">
                  </h3>

                </div>
                <div class="care_content">
                  <div>
                    <div class="question_title">爱心产品的质量有保障么？</div>
                    <div class="question_content">一起善源平台在贫困地区建立了专门的运营中心，对每批产品进行抽检审核，并且提供仓储、包装、物流等服务，以确保这些产品可以顺利送达您的手中。<br>
                      我们的助理人或贫困户虽然不是专业的电商卖家，但他们一直在努力去提升服务质量，您的每一次帮扶都是他们前进的信心。</div>
                  </div>
                  <div>
                    <div class="question_title">您的爱心购买是如何帮扶到贫困地区的？</div>
                    <div class="question_content">购买产品可以直接提高贫困户的收入，更重要的是会带动当地基础环境、设施、人才、理念的提高，为贫困地区的经济发展打下基础，为他们长效脱贫打下基础。<br>
                      平台运行以来已经协助多个贫困县建立了运营中心，当地电商的基础环境，物流环境都得到了极大的改善。</div>
                  </div>
                  <div v-if="goods_detail_type == 'poor'">
                    <div class="question_title">贫困户的产品质量有保证吗？</div>
                    <div class="question_content">贫困户自营的产品在服务上会有一些欠缺，可能表现在包装、发货、价格、售后及沟通等方面。贫困户生产批量小、交通不便，包装、物流费用难以降低。<br>
                      这正是贫困的主要原因，也是我们扶贫工作中需要改进的问题，因此希望您能多一分理解，您的包容和支持将是他们前进的动力。</div>
                  </div>
                  <div class="clearfix" style="padding-top:.3rem;font-size:.26rem;">
                    <p class="fl" style="color:#B2B2B2;font-size:.26rem;">您在帮扶中若遇到问题，可拨打热线：</p>
                    <a class="fl care_phone" @click="call_phone400($event)">400 666 7308</a>
                    <!--<a class="fl care_phone" @click="call_phone400($event)">13161596541</a>-->
                  </div>
                </div>
              </div>
            </div>

            <!--卖家信息-->
            <div>
              <div class="content-auto aid" v-if="goods_detail_type !== 'assist'">
                <!--助理人-->
               <!-- <div v-if="goods_detail_type == 'agent'">
                  <div class="aid-top clearfix">
                    <span>本产品由助理人发货&售后</span>
                  </div>
                  <div class="aid-middle clearfix">
                    <div class="fl">
                      <span>助理人：</span>
                      <span style="color:#333">{{goods_common_info.publisher_name}}</span>
                      <span style="color:#999;margin-left:.5rem;">来自{{ goods_common_info.publisher_area_name}}</span>
                    </div>
                    <div class="fr">
                      &lt;!&ndash;<input type="button" value="详情" style="height:.52rem;width:1.04rem;" @click="app.syJsbLaunchWebview(publisher_touch_url)">&ndash;&gt;
                      <a href="javascript:;" class="seller_detail_btn" @click="app.syJsbLaunchWebview(publisher_touch_url)">详情</a>
                      &lt;!&ndash;<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/gt.png'" alt="" class="gt">&ndash;&gt;
                    </div>
                  </div>
                </div>-->
                <!--贫困户发货-->
                <div v-if="goods_detail_type == 'poor'">
                  <div class="aid-top clearfix">
                    <span>本产品由贫困户发货&售后</span>
                  </div>
                  <div class="aid-middle clearfix">
                    <div class="fl">
                      <span>贫困户：</span>
                      <span style="color:#333">{{goods_common_info.publisher_name}}</span>
                      <span style="color:#999;margin-left:.5rem;">{{ goods_common_info.publisher_area_name}}</span>
                    </div>
                    <div class="fr">
                      <!--<input type="button" value="详情" style="height:.52rem;width:1.04rem;" @click="app.syJsbLaunchWebview(publisher_touch_url)">-->
                      <a href="javascript:;" class="seller_detail_btn" @click="app.syJsbLaunchWebview(publisher_touch_url)">详情</a>
                      <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/gt.png'" alt="" class="gt">-->
                    </div>
                  </div>
                  <div style="font-size:.24rem;color:#999;line-height:.4rem;">
                    <p>贫困户的产品在标准化上会有一些欠缺，可能表现在规格不一、包装简陋、发货较慢、售后沟通困难等，但每份产品都代表了他们为脱贫而付出的努力，您的支持和包容将是他们前进的动力。</p>
                  </div>
                </div>

                <!--<div class="aid-bottom clearfix" v-if="goods_detail_type == 'agent'">-->
                  <!--<div class="aid-bottom clearfix" v-if="true">-->
                  <!--<ul class="child-fl after_sale">
                    <li class="text-left">
                      <p style="font-weight:600">{{ goods_common_info.published_goods_num }}个</p>
                      <p>爱心产品</p>
                    </li>
                    <li class="text-left">
                      <p style="font-weight:600">{{ goods_common_info.latest_send_speed }}</p>
                      <p>发货速度</p>
                    </li>
                    <li class="text-left">
                      <p style="font-weight:600">{{ goods_common_info.latest_refund_rate }}%</p>
                      <p>退款率 <span  class="rate_green" :class="{ rate_red:goods_common_info.latest_refund_rate_state =='一般'}"> {{ goods_common_info.latest_refund_rate_state }}</span></p>
                    </li>
                    <li class="text-left">
                      <p style="font-weight:600">{{ goods_common_info.latest_complain_rate}}%</p>
                      <p>投诉率 <span class="rate_green" :class="{ rate_red:goods_common_info.latest_complain_rate_state =='一般'}"> {{ goods_common_info.latest_complain_rate_state }}</span></p>
                    </li>
                  </ul>-->
                <!--</div>-->
                <!--购买将帮助到的贫困户-->
                <div class="well_help_poor" v-if="go_to_help_poor_detail_url">
                  <!--<div class="well_help_poor" v-if="true">-->
                  <div class="clearfix well_help_poor_con" @click="app.syJsbLaunchWebview(go_to_help_poor_detail_url)">
                    <div class="fl">购买本产品将帮助到的贫困户</div>
                    <div class="fr bg_gt"></div>
                  </div>
                </div>
              </div>
            </div>
            <!--助理人-->
            <!--<div>
              <div class="content-auto aid">
                <div class="aid-top clearfix">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/reminder.png'" alt=""
                       style="position: relative;margin-top:-0.02rem;" @click="explain_seller = true">
                  <span>本产品由助理人发货&售后</span>
                </div>
                <div class="aid-middle clearfix">
                  <div class="fl">
                    <span style="color:#333">{{goods_common_info.publisher_name}}</span>
                    <span style="color:#999">共{{goods_common_info.published_goods_num}}个产品</span>
                  </div>
                  <div class="fr">
                    <span @click="app.syJsbLaunchWebview(publisher_touch_url)">助理人详情</span>
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/gt.png'" alt="" class="gt">
                  </div>
                </div>
                <div class="aid-bottom clearfix">
                  &lt;!&ndash;<ul class="child-fl">
                    <li class="text-left" style="width:40%">平均发货: {{ goods_common_info.latest_send_speed }}</li>
                    &lt;!&ndash;<li class="text-left" style="width:40%">平均发货: 100小时</li>&ndash;&gt;
                    <li class="text-center" style="width:30%">退款率: {{ goods_common_info.latest_refund_rate }}%</li>
                    <li class="text-right" style="width:30%">投诉率: {{ goods_common_info.latest_complain_rate}}%</li>
                  </ul>&ndash;&gt;
                  <ul class="">
                    &lt;!&ndash;<li class="" style="display:inline-block;margin-right:.1rem;">平均发货: {{ goods_common_info.latest_send_speed }}</li>&ndash;&gt;
                    <li class="" style="display:inline-block;margin-right:.2rem;">平均发货: 100小时</li>
                    <li class="" style="display:inline-block;margin-right:.2rem;">
                      退款率: {{ goods_common_info.latest_refund_rate }}%
                    </li>
                    <li class="" style="display:inline-block;">投诉率: {{ goods_common_info.latest_complain_rate}}%</li>
                  </ul>
                </div>
              </div>
            </div>-->
          </div>
          <!--产品信息 集采专区 2018/03/14迭代 集采详情添加-->
          <!--this.isAssist =  this.goods_detail_type === 'assist'-->
          <div class="group-buying" v-if="goods_detail_type == 'assist'">
              <div class="group-buying-top">
                <div class="left">
                  <span class="yellow_icon"></span>
                  <h3 class="title">集采专区推荐使用扶贫码</h3>
                </div>
                <div class="right">
                  <a href="javascript:;" class="right-btn"  @click="app.syJsbLaunchWebview(publisher_touch_url)">更多产品</a>
                </div>
              </div>
              <div class="group-buying-middle">
                  <div class="middle-item">
                    <div class="item-icon"><img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/group-buying-l.png'" alt="group-buy-icon"></div>
                    <div class="item-title">面值自定义</div>
                  </div>
                <div class="middle-item">
                  <div class="item-icon"><img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/group-buying-c.png'" alt="group-buy-icon"></div>
                  <div class="item-title">支付更灵活</div>
                </div>
                <div class="middle-item">
                  <div class="item-icon"><img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/group-buying-r.png'" alt="group-buy-icon"></div>
                  <div class="item-title">退码更便捷</div>
                </div>
              </div>
              <div class="group-buying-bottom" @click="app.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=helpcenter&op=helpcenter')">
                <span class="descr">其他关于扶贫码问题</span>
                <img class="right-j" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/Combinedres.png'" alt="">
              </div>
          </div>
          <!--卖家信息 助理人-->
          <div class="zlr-detail box" v-if="goods_detail_type == 'agent'">
            <div style="margin-left: 0.22rem;">
              <span class="yellow_icon"></span><span class="zlrDate_from">来自{{ goods_common_info.publisher_area_name}}</span>
            </div>
            <div style="width: 100%;height: 1.14rem;overflow: hidden;" @click="app.syJsbLaunchWebview(publisher_touch_url)">
              <div class="zlrDate_detail fl">
                <div class="zlrDate_photo fl"><img :src="goods_common_info.agent_avatar" alt="图片加载失败"></div>
                <div class="zlrDate_name_c fl">
                  <div class="zlrDate_name_t">{{goods_common_info.publisher_name}}</div>
                  <div class="zlrDate_name_b">助理人</div>
                </div>
                <div class="zlrDate_name_line fl"></div>
              </div>
              <div class="zlrDate_detail fl">
                <div class="zlrDate_photo fl"><img :src="jijinImgUrl" alt="图片加载失败"></div>
                <div class="zlrDate_name_c fl">
                  <div class="zlrDate_name_t">{{goods_common_info.donate_fund_fee}}元</div>
                  <div class="zlrDate_name_b">捐给贫困户</div>
                </div>
                <div class="zlrDate_name_line fl"></div>
              </div>
              <div class="zlrDate_detail fl">
                <div class="zlrDate_photo fl"><img :src="renyuanImgUrl" alt="图片加载失败"></div>
                <div class="zlrDate_name_c fl">
                  <div class="zlrDate_name_t">{{goods_common_info.help_poor_count}}户贫困户</div>
                  <div class="zlrDate_name_b">带动自营</div>
                </div>
              </div>
              <div class="fr bg_gt" style="margin-right: 0.2rem;margin-top: 0.32rem;" ></div>
            </div>

          </div>
          <div class="zlr-detail box" v-if="goods_detail_type == 'agent'" @click="app.syJsbLaunchWebview(bf_moreUrl)">
            <div style="margin-left: 0.22rem;">
              <span class="yellow_icon"></span><span class="zlrDate_from">帮扶成效</span>
              <div class="fr bg_gt" style="margin-right: 0.2rem; margin-top: 0.49rem;"></div>
            </div>
            <div style="overflow: hidden;">
              <div class="zlr_chx fl">
                <div class="zlr_chx_img"><img :src="chengxiaoUrl01" ></div>
                <div class="zlr_chx_zi">贫困户</div>
                <div class="zlr_chx_zi">直接提高收入</div>
              </div>
              <div class="zlr_chx fl">
                <div class="zlr_chx_img"><img :src="chengxiaoUrl02" ></div>
                <div class="zlr_chx_zi">促进贫困县</div>
                <div class="zlr_chx_zi">电商行业发展</div>
              </div>
              <div class="zlr_chx fl">
                <div class="zlr_chx_img"><img :src="chengxiaoUrl03" ></div>
                <div class="zlr_chx_zi">拓宽农产品</div>
                <div class="zlr_chx_zi">销路长效脱贫</div>
              </div>
            </div>
            <!--<div class="bf_more" @click="app.syJsbLaunchWebview(bf_moreUrl)">查看更多 ></div>-->
          </div>
          <!--产品详情-->
          <div class="product-detail box">
            <div class="content-auto">
              <span class="yellow_icon"></span><h3 style="display: inline-block;margin-left: 0.1rem;vertical-align: top;line-height: 0.4rem;">爱心产品详情</h3>
            </div>
            <div class="content-auto text-description">
              <!--video-->
              <div @click="stopone" style="width: 7.1rem;height: 7.1rem" v-if="isCommonvideo && !isShare">
                <sy-player ref="videotwo" width="7.1" height="7.1" :videosrc="video_common_info.common_video_url" :cover="video_common_info.common_video_img" :videoname="video_common_info.common_videoname"></sy-player>
              </div>
              <pre style="white-space: pre-wrap;margin:0" v-text="goods_body"></pre>
            </div>
            <div class="product-img">
              <!--<img alt="" v-for="item in goods_image_list" :src="item.goods_image">-->
              <div v-for="item in goods_image_list">
                <img v-lazy="item.goods_image">
              </div>
            </div>
            <!--<div class="content-auto parting-img">-->
            <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group15.png'" alt="">-->
            <!--</div>-->
            <!--<div class="content-auto text-description">-->
            <!--<p>港世纪华联资产管理集团有限公司正式成立，公司注册证书编号为1492099，正在积极筹备美国、新加坡、台湾、韩国等办事处。-->
            <!--背景：香港世纪华联集团由</p>-->
            <!--</div>-->
          </div>

          <!--评分-->
          <div class="helper box">
            <div class="content-auto">
              <div class="clearfix helper-title">
                <h3 class="fl">帮扶人评分：</h3>
                <!--<div class="fl love-large-img-box relative">
                  <img class="love-large-img fl" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Path.png'" alt="">
                  <span class="goods_evaluate_score fl" style="color:rgb(241,62,82);margin-left:.05rem;margin-top:.04rem;">{{ goods_evaluate_score }}</span>
                </div>-->
                <div class="fl love-large-img-box relative" v-if="goods_evaluate_score > 0">
                  <img class="love-large-img fl" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Pathres.png'" alt="">
                  <span class="goods_evaluate_score absolute cen" >{{ goods_evaluate_score }}</span>
                  <!--<span class="goods_evaluate_score absolute cen">0</span>-->
                </div>
                <p class="fr" style="color:#999;font-size:.26rem;" v-if="evaluate_list.length == 0">还没有帮扶人发表评价</p>
              </div>
              <div >
                <ul class="helper-ul">
                  <li class="clearfix" v-for="(item,index) in evaluate_list">
                    <div class="fl header-portrait">
                      <img :src="item.face" alt="">
                    </div>
                    <div class="helper-comment-wrap">
                      <div class="helper-comment">
                        <div style="padding-bottom:.2rem;border-bottom:1px solid #eee">
                          <div class="helper-info">
                            <div class="clearfix">
                              <div class="fl">{{item.show_name}}</div>
                              <div class="fr">
                                <img :src="item.geval_score_image" alt="" style="height:.2rem;">
                              </div>
                            </div>
                            <div style="color:#b1b1b1">{{ item.geval_addtime }} 产品规格：{{item.goods_spec}}</div>
                          </div>
                          <div class="comment-content">
                            {{ item.geval_content}}
                          </div>
                          <div class="comment-content-img"
                               v-show="item.geval_image_url || item.geval_image2_url || item.geval_image3_url">
                            <ul class="clearfix">
                              <li>
                                <img v-if="item.geval_image_url" :src="item.geval_image_url" alt=""
                                     @click="commentImgShowFn(0,item.geval_large_image_url,item.geval_large_image2_url,item.geval_large_image3_url)">
                              </li>
                              <li>
                                <img v-if="item.geval_image2_url" :src="item.geval_image2_url" alt=""
                                     @click="commentImgShowFn(1,item.geval_large_image_url,item.geval_large_image2_url,item.geval_large_image3_url)">
                              </li>
                              <li>
                                <img v-if="item.geval_image3_url" :src="item.geval_image3_url" alt=""
                                     @click="commentImgShowFn(2,item.geval_large_image_url,item.geval_large_image2_url,item.geval_large_image3_url)">
                              </li>
                            </ul>
                          </div>
                          <!--评价回复-->
                          <div class="reply" v-if="item.reply_list.length">
                            <!--<div class="reply" v-if="true">-->
                            <!--<div class="assess-reply-top"></div>-->
                            <div class="reply-cont relative" style="font-size: 0.24rem;color:#606060;line-height:0.36rem;">
                              <div class="reply-cont-top clearfix" style="margin-bottom:0.05rem;color:#b1b1b1">
                                <span class="fl">{{ item.reply_list[0].replyer_name }}</span>：<span class="fr" style="color:#606060">{{ item.reply_list[0].addtime }}</span>
                                <!--<span class="fl">阿斯顿飞洒</span>：<span class="fr" style="color:#606060">zhehshidhfsf收到官方说的</span>-->
                              </div>
                              <div class="reply-fonts" style="color:#606060">{{ item.reply_list[0].content }}</div>
                              <!--<div class="reply-fonts">sadf速度割发代首 asdf </div>-->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                </ul>
                <div class="show-all-comment clearfix">
                  <p v-if="evaluate_num != 0" class="fr" @click="app.syJsbLaunchWebview(more_evaluate_url)">
                    全部 {{ evaluate_num }} 条评价
                    <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Combinedres.png'" alt="" class="gt">-->
                    <img src="../../../static/image/detail/Combinedres.png" alt="" class="gt" style="margin-top:-.06rem;">
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!--推荐产品-->
          <div class="recommend-wrap box" v-if="!isAssist && recommend_goods_list.length > 0">
            <div class="content-auto">
              <div class="clearfix h3-title" style="padding-bottom:0.46rem;">
                <h3 class="fl">您可能还在找：</h3>
              </div>
              <div>
                <ul class="clearfix child-fl recommend">
                  <li class="text-center" v-for="(item,index) in recommend_goods_list"
                      @click="app.syJsbLaunchWebview(item.touch_url)">
                    <img v-lazy="item.goods_image" alt="">
                    <p class="recommend-description text-left" style="padding-left:.1rem;line-height: .6rem;">{{item.goods_name}}</p>
                    <!--<p class="recommend-description text-left">ue使用人群重叠最大的就是react，这二者都是细粒度木偶
                      组件+自由组合智能组件+单向数据流的开发方式，而react当初被提出其实只是fb想要实现一个前端vi
                      ew层的复用，因此数据流动方式其实除了redux这类前端flux思想实现外，还有如relay、graphql以及第三方的meteor等后端</p>-->
                    <p class="text-left recommend-prise">￥{{item.goods_price}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <!--底部bar 有心愿单和咨询-->
          <div class="goods-bot-sure relative bottom-btn-zindex999 iphonex-padding-bottom" style="border-top:1px solid #ddd;" v-if="(!isPreSell || isPoor) && !isShare && !isFx">
            <!--联系助理人弹层-->
            <!--<transition name="call">-->
            <div class="call-publisher-wrap contact-popup iphonex-margin-bottom" v-show="isAidShow">
              <table class="call-publisher">
                <tr @click="callOnLine" class="call_top" v-if="!isAssist">
                  <td>
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/line2.png'" alt=""
                         style="position: relative;margin-top:-.04rem;"><a>在线咨询</a>
                  </td>
                </tr>
                <tr @click="callPhone">
                  <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/zh23.png'" alt=""><a>手机咨询</a>-->
                  <!--<img src="../../../static/image/detail/phone.png" alt="" style="margin-top:-.04rem;"><a>手机咨询</a>-->
                  <td v-if="goods_common_info.publisher_phone">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/phone2.png'" alt="" style="margin-top:-.04rem;"><a>手机咨询</a>

                  </td>
                  <td v-if="!goods_common_info.publisher_phone">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/phone2n.png'" alt="" style="margin-top:-.04rem;"><a  style="color:#B1B1B1">手机咨询</a>

                  </td>
                </tr>
                <!--联系qq 助理人显示-->
                <tr @click="callqq" class="call_bottom"  v-if="isAgent">
                  <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/zh24.png'" alt=""><a>qq咨询</a>-->
                  <!--<img src="../../../static/image/detail/qq2.png" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a>QQ 咨询</a>-->
                  <td v-if="goods_common_info.publisher_qq">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/qq2.png'" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a>QQ咨询</a>
                  </td>
                  <td v-if="!goods_common_info.publisher_qq">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/qq2n.png'" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a style="color:#B1B1B1">QQ咨询</a>
                  </td>
                </tr>
                <!--联系qq善源甄选隐藏-->

              </table>
            </div>
            <!--</transition>-->
            <!--售罄状态 底部菜单显示-->
            <ul class="bottom-bar relative bottom-btn-zindex999 clearfix" v-if="isSellOut">
              <li class="bottom-bar-left2" style="width:18%;">
                <div @click.stop="callAssistant">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/assistant.png'" alt="">
                  <!--<img src="../../../static/image/detail/assistant.png" alt="">-->
                  <p class="bottom-bar-text">咨询</p>
                </div>
              </li>
              <li class="bottom-bar-left2 relative" @click="wishList" v-show="!isShare" style="width:18%;">
                <div class="absolute bottom-bar-parting">
                  <div class="absolute bottom-bar-parting-line"></div>
                </div>
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/wishlist.png'" alt="">
                <!--<img src="../../../static/image/detail/wishlist.png" alt="">-->
                <p class="bottom-bar-text">心愿单</p>
                <span v-show="showRedPoint" class="red-point"></span>
              </li>
              <li class="relative" v-show="!isShare" style="width:32%;">
                <a class="add-wish" style="background:#dadee4;">加心愿单</a>
                <transition name="fold" @afterEnter="isAddOne = false" @afterLeave="isAddOneCon = true;showRedPoint = true">
                  <span class="absolute add-one" v-show="isAddOne">+1</span>
                  <!--<span  class="absolute add-one" :class="{add_wish_animation:isAddOneCon}">+1</span>-->
                </transition>

              </li>
              <li style="float:right;width:32%;">
                <a class="immediately-help" style="background:#dadee4;" v-if="!isPreSell">已售罄</a>
                <a class="immediately-help" style="background:#dadee4;" v-if="isPreSell">立即预订</a>
              </li>
            </ul>
            <!--底部菜单-->
            <ul class="bottom-bar relative bottom-btn-zindex999 clearfix" v-else>
              <li class="bottom-bar-left2" style="width:18%;">
                <div @click.stop="callAssistant">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/assistant.png'" alt="">
                  <!--<img src="../../../static/image/detail/assistant.png" alt="">-->
                  <p class="bottom-bar-text">咨询</p>
                </div>
              </li>
              <li class="bottom-bar-left2 relative" @click="wishList" v-show="!isShare" style="width:18%;">
                <div class="absolute bottom-bar-parting">
                  <div class="absolute bottom-bar-parting-line"></div>
                </div>
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/wishlist.png'" alt="">
                <!--<img src="../../../static/image/detail/wishlist.png" alt="">-->
                <p class="bottom-bar-text">心愿单</p>
                <span v-show="showRedPoint" class="red-point"></span>
              </li>
              <li class="relative" v-show="!isShare" style="width:32%;">
                <a class="add-wish" @click="addWishList">加心愿单</a>
                <transition name="fold" @afterEnter="isAddOne = false" @afterLeave="isAddOneCon = true;showRedPoint = true">
                  <span class="absolute add-one" v-show="isAddOne">+1</span>
                  <!--<span  class="absolute add-one" :class="{add_wish_animation:isAddOneCon}">+1</span>-->
                </transition>

              </li>
              <li style="float:right;width:32%;">
                <a class="immediately-help" @click="immediatelyHelp" v-if="!isPreSell">立即帮扶</a>
                <a class="immediately-help" @click="immediatelyHelp" v-if="isPreSell">立即预订</a>
              </li>
            </ul>
          </div>
        <!--底部bar 售罄状态 无咨询 无心愿单 复兴一号-->
        <div v-if="isSellOut">
          <div class="goods-bot-sure relative bottom-btn-zindex999 iphonex-padding-bottom" style="border-top:1px solid #e9e9e9;" v-if="isFx">
            <!--底部菜单-->
            <ul class="bottom-bar relative bottom-btn-zindex999 clearfix">
              <li style="width:100%;text-align: center">
                <a class="immediately-help" style="margin:auto;background:#dadee4;" v-if="!isPreSell">已售罄</a>
                <a class="immediately-help" @click="immediatelyHelp" style="margin:auto" v-if="isPreSell">立即预订</a>
              </li>
            </ul>


          </div>
        </div>
        <!--底部bar 无咨询 无心愿单 复兴一号-->
        <div v-else>
          <div class="goods-bot-sure relative bottom-btn-zindex999 iphonex-padding-bottom" style="border-top:1px solid #e9e9e9;" v-if="isFx">
            <!--底部菜单-->
            <ul class="bottom-bar relative bottom-btn-zindex999 clearfix">
              <li style="width:100%;text-align: center">
                <a class="immediately-help" @click="immediatelyHelp" style="margin:auto" v-if="!isPreSell">立即帮扶</a>
                <a class="immediately-help" @click="immediatelyHelp" style="margin:auto" v-if="isPreSell">立即预订</a>
              </li>
            </ul>


          </div>
        </div>
        <!--售罄状态 底部bar 无心愿单 有咨询-->
        <div v-if="isSellOut">
          <div class="goods-bot-sure relative bottom-btn-zindex999 iphonex-padding-bottom" style="border-top:1px solid #e9e9e9;" v-if="(isPreSell || isShare || (isNpcSpecilGoods === 'true')) && !isFx">
            <!--咨询助理人弹层-->
            <!--<transition name="call">-->
            <div class="call-publisher-wrap contact-popup iphonex-margin-bottom" v-show="isAidShow">

              <table class="call-publisher">
                <!--人大商品-->
                <!--<tr v-if="(isNpcSpecilGoods === 'true')"></tr>-->
                <tr @click="callOnLine" class="call_top" v-if="!isAssistPreSell && !isShare && !(isNpcSpecilGoods === 'true')">
                  <td>
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/line2.png'" alt=""
                         style="position: relative;margin-top:-.04rem;"><a>在线咨询</a>
                  </td>
                </tr>
                <tr @click="callPhone">
                  <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/zh23.png'" alt=""><a>手机咨询</a>-->
                  <!--<img src="../../../static/image/detail/phone.png" alt="" style="margin-top:-.04rem;"><a>手机咨询</a>-->
                  <td v-if="goods_common_info.publisher_phone">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/phone2.png'" alt="" style="margin-top:-.04rem;"><a>手机咨询</a>

                  </td>
                  <td v-if="!goods_common_info.publisher_phone">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/phone2n.png'" alt="" style="margin-top:-.04rem;"><a  style="color:#B1B1B1">手机咨询</a>

                  </td>
                </tr>
                <!--联系qq助理人显示-->
                <tr @click="callqq" class="call_bottom"  v-if="isAgent">
                  <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/zh24.png'" alt=""><a>qq咨询</a>-->
                  <!--<img src="../../../static/image/detail/qq2.png" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a>QQ 咨询</a>-->
                  <td v-if="goods_common_info.publisher_qq">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/qq2.png'" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a>QQ咨询</a>
                  </td>
                  <td v-if="!goods_common_info.publisher_qq">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/qq2n.png'" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a style="color:#B1B1B1">QQ咨询</a>
                  </td>
                </tr>
                <!--联系qq善源甄选隐藏-->
              </table>
            </div>
            <!--</transition>-->

            <!--底部菜单-->
            <ul class="bottom-bar relative bottom-btn-zindex999 clearfix">
              <li class="bottom-bar-left2" style="width:18%;">
                <div @click.stop="callAssistant">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/assistant.png'" alt="">
                  <!--<img src="../../../static/image/detail/assistant.png" alt="">-->
                  <p class="bottom-bar-text">咨询</p>
                </div>
              </li>
              <li style="float:right;width:82%;">
                <a style="width:98%;background:#dadee4;" class="immediately-help" v-if="!isPreSell">已售罄</a>
                <a style="width:98%;" class="immediately-help" @click="immediatelyHelp" v-if="isPreSell">立即预订</a>
              </li>
            </ul>
          </div>
        </div>
        <!--底部bar 无心愿单 有咨询-->
        <div v-else>
          <div class="goods-bot-sure relative bottom-btn-zindex999 iphonex-padding-bottom" style="border-top:1px solid #e9e9e9;" v-if="(isPreSell || isShare || (isNpcSpecilGoods === 'true')) && !isFx">
            <!--咨询助理人弹层-->
            <!--<transition name="call">-->
            <div class="call-publisher-wrap contact-popup iphonex-margin-bottom" v-show="isAidShow">

              <table class="call-publisher">
                <!--人大商品-->
                <!--<tr v-if="(isNpcSpecilGoods === 'true')"></tr>-->
                <tr @click="callOnLine" class="call_top" v-if="!isAssistPreSell && !isShare && !(isNpcSpecilGoods === 'true')">
                  <td>
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/line2.png'" alt=""
                         style="position: relative;margin-top:-.04rem;"><a>在线咨询</a>
                  </td>
                </tr>
                <tr @click="callPhone">
                  <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/zh23.png'" alt=""><a>手机咨询</a>-->
                  <!--<img src="../../../static/image/detail/phone.png" alt="" style="margin-top:-.04rem;"><a>手机咨询</a>-->
                  <td v-if="goods_common_info.publisher_phone">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/phone2.png'" alt="" style="margin-top:-.04rem;"><a>手机咨询</a>

                  </td>
                  <td v-if="!goods_common_info.publisher_phone">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/phone2n.png'" alt="" style="margin-top:-.04rem;"><a  style="color:#B1B1B1">手机咨询</a>

                  </td>
                </tr>
                <!--联系qq助理人显示-->
                <tr @click="callqq" class="call_bottom"  v-if="isAgent">
                  <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/zh24.png'" alt=""><a>qq咨询</a>-->
                  <!--<img src="../../../static/image/detail/qq2.png" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a>QQ 咨询</a>-->
                  <td v-if="goods_common_info.publisher_qq">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/qq2.png'" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a>QQ咨询</a>
                  </td>
                  <td v-if="!goods_common_info.publisher_qq">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/qq2n.png'" alt="" style="margin-left:-.12rem;margin-top:-.02rem;"><a style="color:#B1B1B1">QQ咨询</a>
                  </td>
                </tr>
                <!--联系qq善源甄选隐藏-->
              </table>
            </div>
            <!--</transition>-->

            <!--底部菜单-->
            <ul class="bottom-bar relative bottom-btn-zindex999 clearfix">
              <li class="bottom-bar-left2" style="width:18%;">
                <div @click.stop="callAssistant">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/assistant.png'" alt="">
                  <!--<img src="../../../static/image/detail/assistant.png" alt="">-->
                  <p class="bottom-bar-text">咨询</p>
                </div>
              </li>
              <li style="float:right;width:82%;">
                <a style="width:98%;" class="immediately-help" @click="immediatelyHelp" v-if="!isPreSell">立即帮扶</a>
                <a style="width:98%;" class="immediately-help" @click="immediatelyHelp" v-if="isPreSell">立即预订</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>

    <!--立即帮扶 购买弹层-->
    <div class="buy_mask bottom-btn-zindex1000" v-show="isbuy">
      <!--<div :class={buy_mask:isbuy}  style="z-index: 10000000000" v-show="isbuy">-->
      <transition name="buy-slide" @afterLeave="sku_close">
        <div class="buy-box relative bottom-btn-zindex1000" v-show="isbuycontent">
          <div class="clearfix">
            <div class="fl">
              <div class="clearfix">
                <div class="fl">
                  <img :src="goods_image" alt=""
                       style="position: relative;margin-left:.2rem;margin-top:-.5rem;width:2.7rem; height:1.86rem;">
                </div>
                <div class="fl text-left"
                     style="margin-left:.2rem;line-height:0.4rem; font-size:0.28rem;padding-top:.24rem;">
                  <p style="color:#f13e52">￥{{ goods_info.goods_price }}</p>
                  <!--<p style="color:#f13e52">￥{{ isPifa ? goods_info.wholesale_price : goods_info.goods_price }}</p>-->
                  <p>库存{{ goods_storage }}</p>
                </div>
              </div>
            </div>
            <div class="close-buy-mask fr"
                 style="margin-top:.2rem;margin-right:.1rem;font-size:.5rem;width:.6rem;height:.6rem;"
                 @click.stop="isbuycontent=false">×
            </div>
          </div>
          <div class="buy-content text-left relative" style="padding:.2rem;">
            <div style="border-top:1px solid #ccc;">
              <div class="" style="padding:.3rem 0">产品规格</div>
              <div>
                <ul class="child-fl goods_spec_list clearfix" :class={sku_max_height:isAddWishSKU}>
                  <li class="no-enter" v-for="(item,index) in goods_spec_list"
                      :class="{goods_spec_list_active: goods_id == item.goods_id}"
                      @click="sure_buy_goods_id(item.goods_id,item.touch_url)">每{{ item.goods_spec }}
                  </li>
                  <!--<li class="no-enter" v-for="(item,index) in 6"-->
                      <!--:class="{goods_spec_list_active: goods_id == item.goods_id}"-->
                      <!--@click="sure_buy_goods_id(item.goods_id,item.touch_url)">每撒打发士大夫撒旦法师的法师打发士大夫撒旦法防的司法斯蒂芬-->
                  <!--</li>-->

                </ul>
              </div>
            </div>
          </div>
          <div class="absolute select-num iphonex-margin-bottom" v-show="!isAddWishSKU">
            <div class="clearfix">
              <div class="fl" style="padding-left:.2rem;font-size:.3rem;"> 购买数量 </div>
              <div class="fr select-num-box">
                <div class="clearfix">
                  <span class="select-left fl" @click="buy_num <= 1 ? 1 : buy_num--"></span>
                  <input class="fl" type="text" v-model="buy_num">
                  <span class="select-right fl" @click="add_buy_num"></span>
                </div>
              </div>
            </div>
          </div>
          <!--<form :action=" this.buy_url " method="post">-->
          <div>
            <input type="hidden" v-if="sharedKey" name="sharedKey" :value="sharedKey">
            <input type="hidden" name="cart_id[]" :value="this.goods_id + '|' + this.buy_num">
            <input type="hidden" name="goods_project_type" :value="this.goods_common_info.goods_project_type">
            <div class="buy-confirm absolute text-center iphonex-strong-bottom" id="sure_buy_now">
              <input type="submit" value="确 定" @click="sureBuyNow($event)">
            </div>
          </div>
          <!--</form>-->
        </div>
      </transition>
    </div>
    <!--单位集采 购买弹层-->
    <div class="buy_mask bottom-btn-zindex1000" v-show="isbuyUnit">
      <transition name="buy-slide" @afterLeave="sku_close_unit">
        <div class="buy-box relative bottom-btn-zindex1000" v-show="isbuyUnit">
          <div class="clearfix">
            <div class="fl">
              <div class="clearfix">
                <div class="fl">
                  <img :src="goods_image" alt=""style="position: relative;margin-left:.2rem;margin-top:-.5rem;width:2.7rem; height:1.86rem;">
                </div>
                <div class="fl text-left" style="margin-left:.2rem;line-height:0.4rem; font-size:0.28rem;padding-top:.24rem;">
                  <p style="color:#f13e52" v-if="purchasingPopups">￥{{goods_info.cost_price}}</p>
                  <p style="color:#f13e52" v-else>￥{{goods_info.goods_price}}</p>
                  <p>库存{{ goods_storage }}</p>
                </div>
              </div>
            </div>
            <div class="close-buy-mask fr" style="margin-top:.2rem;margin-right:.1rem;font-size:.5rem;width:.6rem;height:.6rem;" @click="isbuyUnit=false">×</div>
          </div>
          <div class="buy-content text-left relative" style="padding:.2rem;">
            <div style="border-top:1px solid #ccc;">
              <div class="" style="padding:.3rem 0">产品规格</div>
              <div>
                <ul class="child-fl goods_spec_list clearfix">
                  <li class="no-enter" v-for="(item,index) in goods_spec_list"
                      :class="{goods_spec_list_active: goods_id_unit == item.goods_id}"
                      @click="sure_buy_goods_id_unit(item.goods_id,item.touch_url)">每{{ item.goods_spec }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
            <div class="buy-confirm absolute text-center iphonex-strong-bottom">
              <input type="submit" value="确 定" @click="sureBuyUnit($event)">
            </div>
        </div>
      </transition>
    </div>

    <!-- 商品解释弹层-->
    <div class="fee-explain-mask" style="z-index:100000000000" v-show="show_fee_explain" @click="show_fee_explain_content = false">
      <transition name="buy-slide" @afterLeave="show_fee_explain = false">
        <div class="bot share_pop" v-show="show_fee_explain_content" >
          <!--<div class="text-center fee-explain-img">-->
          <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/poor_heart.jpg'" alt="">-->
          <!--</div>-->
          <div>
            <p class="text-center share_title">爱心分配说明</p>
          </div>
          <div class="explain-ul" style="background: #fff;padding-top:.5rem;padding-right:.1rem;">
            <ul style="height:5.12rem;overflow: auto">
              <li v-for="(item,index) in fund_fee_explain_content_list" style="margin-bottom:.56rem;" class="clearfix">
                <div class="fl" style="width:5%">
                  <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/text_icon.png'" alt="" style="width:.22rem;height:.19rem;">-->
                  <img src="../../../static/image/detail/text_icon.png" alt="" style="width:.22rem;height:.19rem;">
                </div>
                <p class="fl" style="width:92.5%;color:#606060;font-size:.28rem;">{{item.text}}</p>
                <!--<p>{{index + 1}}.{{item.text}}</p>-->
              </li>
              <!--<li><p>7.喜欢的粉红idf</p></li>-->
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <!--优惠券弹层-->
    <div class="quan_mask" v-show="isquan_tan">
      <transition name="buy-slide" @afterLeave="">
        <div class="quan_c" v-show="isquan_tan">
          <div class="quan_title">优惠券 <span class="quan_title_close" @click.stop="isquan_tan=false">+</span></div>
          <div class="quan_title2">可领取优惠券</div>
          <div class="quan_list">
            <div class="quan_item" v-for="(item,index) in quan_data" >
              <div class="quan_l">
                <div class="quan_l_t">￥<span>{{item.voucher_t_price}}</span></div>
                <div class="quan_l_b">满{{item.voucher_t_limit}}元可使用</div>
              </div>
              <div class="quan_r">
                <div class="quan_r_t">{{item.voucher_t_title}}</div>
                <div class="quan_explain"></div>
                <div class="quan_r_b">{{item.voucher_t_start_date}}-{{item.voucher_t_end_date}} <span @click="quan_get(item.voucher_t_id)">点击领取</span></div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!--当前页面显示大图-->
    <div class="mask" style="z-index:100000000000" v-if="img_is_show" @click="img_is_show = false">
    <!--<div class="mask" style="z-index:100000000000" v-if="true" @click="img_is_show = false">-->
      <div class="cen" style="border-radius:.08rem;padding:.2rem;background: #fff;">
        <img :src="bigImgurl" alt="" style="width:6rem;display: block;border:none">
        <!--<img src="../../../static/image/detail/56e24cc1N292f0614.png" alt=""  style="width:6rem;display: block;border:none">-->
        <div style="background: #fff;height:1rem;line-height: 1rem;padding-top:.1rem;font-size:.26rem;">证书编号：{{certificate}}</div>
        <!--<div style="background: #fff;height:1rem;line-height: 1rem;">证书编号：阿迪司法斯蒂芬</div>-->
      </div>
    </div>

    <!--<img-views v-if="isImgViewsShow" :src="imgViewsSrc" @clickit="eImgViewClick"></img-views>-->
    <!--</transition>-->

    <!--评论图片轮播查看-->
    <div class="mask" style="background: #333;z-index:99999999" v-if="commentImgShow" @click="commentImgShow = !commentImgShow">
      <div style="height:4.5rem;margin-top:4rem;">
        <mt-swipe :auto="0" :defaultIndex="commentImgShowNum">
          <mt-swipe-item v-if="commentImgUrl1"><img :src="commentImgUrl1" alt="" style="width:100%;"></mt-swipe-item>
          <mt-swipe-item v-if="commentImgUrl2"><img :src="commentImgUrl2" alt="" style="width:100%;"></mt-swipe-item>
          <mt-swipe-item v-if="commentImgUrl3"><img :src="commentImgUrl3" alt="" style="width:100%;"></mt-swipe-item>
        </mt-swipe>
      </div>
    </div>

    <!--toast-->
    <div class="mask" style="z-index:999999999;background: rgba(0, 0, 0, .4)" v-show="alert_mask">
    <!--<div class="mask" style="z-index:999999999;background: rgba(0, 0, 0, .4)" v-show="true">-->
      <div class="cen" style="background: #fff;border-radius: .08rem;padding:.2rem;width:6rem;" @click.stop="">
        <p style="font-size:.26rem;line-height: .42rem;text-align: center">{{alertContent}}</p>
        <!--<div class="know-close" style="padding-top:.3rem;">-->
          <!--&lt;!&ndash;<input type="button" value="我知道了" @click.stop="explain_seller = false">&ndash;&gt;-->
        <!--</div>-->
      </div>
    </div>

    <!--分享解释弹层-->
    <div class="mask" style="z-index:999999999;background: rgba(0, 0, 0, .4)" v-show="share_mask" @click="share_content = false" >
    <!--<div class="mask" style="z-index:999999999;background: rgba(0, 0, 0, .4)" v-show="true" @click="share_content = false" >-->
      <transition name="buy-slide" @afterLeave="share_mask = false">
        <div class="bot share_pop" @click.stop="" v-show="share_content">
        <!--<div class="bot share_pop" @click.stop="" v-show="true">-->
          <div>
            <p class="text-center share_title">分享给好友</p>
          </div>
          <div style="background: #fff;padding-top:.56rem;">
            <!--<p><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Pathsmall.png'" alt=""><span>好友注册成功</span></p>-->
            <!--<p style="margin-bottom:.56rem;text-align: left;padding-left:.44rem;line-height: .4rem;"><img src="../../../static/image/detail/Pathsmall.png" alt="" style="width:.22rem;height:.19rem;"><span style="font-size:.28rem;color:#606060;padding-left:.14rem;">好友注册成功,您可获得50积分</span></p>-->
            <p style="margin-bottom:.56rem;text-align: left;padding-left:.44rem;line-height: .4rem;"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Pathsmall.png'" alt="" style="width:.22rem;height:.19rem;"><span style="font-size:.28rem;color:#606060;padding-left:.14rem;">好友注册成功,您和好友均可获得100积分</span></p>
            <!--<p style="margin-bottom:.56rem;text-align: left;padding-left:.44rem;line-height: .4rem;"><img src="../../../static/image/detail/Pathsmall.png" alt="" style="width:.22rem;height:.19rem;"><span style="font-size:.28rem;color:#606060;padding-left:.14rem;">好友进行了爱心帮扶，您再获得5%的积分</span></p>-->
            <p style="margin-bottom:.56rem;text-align: left;padding-left:.44rem;line-height: .4rem;"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Pathsmall.png'" alt="" style="width:.22rem;height:.19rem;"><span style="font-size:.28rem;color:#606060;padding-left:.14rem;">好友进行了爱心帮扶，您再获得5%的积分</span></p>
            <p class="share_button" style="padding-bottom:.56rem;"><a href="javascript:;" @click.stop="shareFn" class="share_text">分享</a></p>
          </div>
        </div>
      </transition>
    </div>

    <!--集采弹窗 isJicaitan-->
    <div v-if="isJicaitan" class="mask" style="z-index: 999999999" >
      <div class="jct-content" >
        <div class="jct-close" @click="isJicaitan=false;setFlag()"></div>
        <div class="jct-title">关于集采清单</div>
        <div style="width: 6.5rem;height:5.36rem;position: relative">
          <div class="jct-c">
            <div class="jct-site">已将产品添加到您的单位集采清单。单位集采清单可在“我的”中找到：</div>
            <div class="jct-img"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/jctSite.png'" ></div>
            <div class="jct-des">善源集采是为政府、企业集中采购提供的服务，汇集了优质的产品、完善的服务以及实惠的价格，还可以开具增值税发票。</div>
            <div style="width: 6.5rem;height: 1rem;"></div>
          </div>
          <div class="jct-p"></div>
        </div>
        <!--<div class="jct-check-c">-->
          <!--<span class="jct-check-sel" @click.stop="isRember=!isRember">-->
            <!--<img v-show="isRember" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/checked_address.png'" >-->
          <!--</span>-->
          <!--<span class="jct-check-z">我知道了，不用再提示我了</span>-->
        <!--</div>-->
        <div class="jct-btn" @click="isJicaitan=false;setFlag()">继续挑选</div>
        <div class="jct-btn2" @click="isJicaitan=false;_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=vbizbuy&op=biz_cart_list')">查看集采清单</div>
      </div>
    </div>
    <!--分享之后再次点击分享显示图片-->
    <div class="mask" style="z-index: 999999999;background: rgba(0,0,0,0.5);"  v-if="(isShare || isFx) && isShareClick" @click="isShareClick = false">
    <!--<div class="mask" style="z-index: 999999999;background: rgba(0,0,0,0.4);"  v-if="true" @click="isShareClick = false">-->
      <img style="width:100%" :src="share_img" alt="">
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import app from '../../modules/_appJs/index.js'
  import {Swipe, SwipeItem, Lazyload, Toast, MessageBox} from 'mint-ui';
  import siteInfo from '../../global'
  import loading from '@/components/loading/loading.vue'
  Vue.use(Lazyload, {
    preLoad: 2.2,
    error: siteInfo.cdn_host +'/bocm/platformjs/static/image/detail/detail_default.png',
    loading: siteInfo.cdn_host +'/bocm/platformjs/static/image/detail/detail_default.png',
    attempt: 1
  });

  import vue_share from '@/assets/js/share'
  import videoPlay from '../common/video_detail'

  export default {
    data () {
      return {
        app,
        isLoading:true,
        goods_name: '', // 商品名
        goods_areainfo: '', // 产地
        goods_image: this.siteInfo.cdn_host +'/bocm/platformjs/static/image/detail/detail_default.png',  // 商品头部banner
        goods_tag_list: '',
        areaDescription: '[贫困地区]',
        shipping_fee: '',
        sale_num: '',  // 产品销量
        buy_area: '',  // 不支持的配送地区
        goods_spec: '',
        helpImgUrl: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/resvw4235.png',
        helpCenImgUrl: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/resdfgw35.png',
        helpRightImgUrl: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/resdfnw43.png',
        jijinImgUrl:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/jijin.png',
        renyuanImgUrl:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/renyuan.png',
        chengxiaoUrl01:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/chengxiao01.png' ,
        chengxiaoUrl02:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/chengxiao02.png' ,
        chengxiaoUrl03:this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/chengxiao03.png' ,
        bizbuyListImgUrl: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/bizbuyList.png',
        grayBizbuyListImgUrl: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/gray_bizbuy_ist3X.png',
        goods_price: '',  //  产品价格
        goods_body: '',     // 产品介绍主体
        goods_image_list: [],
        goods_spec_list: [], // 可选规格
        goods_cert_list: [], // 认证部分
        recommend_goods_list: [],  // 推荐产品列表
        evaluate_num: '',     // 评价数量
        goods_evaluate_score: '',  // 商品评分
        evaluate_list: [],     // 评论列表
        poor_get_fee: '',    // 帮扶贫困户
        fund_fee: '',        // 捐入贫困基金
        will_get_points: '',   // 将获取积分
        goods_common_info: {},
        goods_info: {},
        more_evaluate_url: '',   // 显示全部评价
        publisher_touch_url: '',  // 助理人详情
        goodsUnit: '',  // 商品单位
        is_login: false,
        share_info: {},  // 分享信息
        can_support: false,  // 能否鼓励他
        login_url: '',  // 登陆url
        add_cart_url: '',  // 加入购物车
        isFristClass: true,  // 是否是一类产品
        isAidShow: false,    // 是否显示咨询助理人弹层
        isAddOne: false,    // 心愿单是否显示 +1
        isAddOneCon: true,    // 是否可点击加入心愿单
        showRedPoint: false,   // 心愿单是否显示小红点
        isbuy: false,           // 是否显示购买确定弹层
        buy_num: 1,                // 购买数量
        show_fee_explain: false,   // 是否显示商品解释层
        show_fee_explain_content: false,   // 是否显示商品内容
        buy_url: '',               // 购买地址
        isbuycontent: false,       // 显示购买信息
        fund_fee_explain_content_list: [], // 商品解释层信息列表
        img_is_show: false,        // 显示大图片图片
        bigImgurl: '',            // 弹出层大图地址
        is_buyed: false,          // 是否购买过
        goods_id: '',            // 当前商品id
        goods_storage: '',       // 商品库存

        commentImgShow: false,     // 评论图片查看
        commentImgShowNum: 1,    // 图片展示索引
        commentImgUrl1: '',
        commentImgUrl2: '',
        commentImgUrl3: '',

        explain_seller:false,    // 是否显示卖家解释弹层

        isFx: false,            // 是否是复兴一号
        isShare: false,         // 是否是分享页面
        isSellOut: false,     //产品是否售罄 is_sell_out=yes
        share_mask:false,        // 分享解释弹层
        share_content:false,    //分享解释内容
        isTouched1:false,      // 互动是否按下
        isTouched2:false,      // 互动是否按下
        isTouched3:false,      // 互动是否按下
        isTouched4:false,      // 互动是否按下
        isJicaitan:false, //集采弹窗

        share_img:'',         // 分享图片地址
        isShareClick:false,   // 是否点击分享按钮
        delay_info:'',        // 延迟发货信息
        presell_time:'',       // 预售发货时间
        trade_mode:'',      // 交易方式 qkys：全款预售 pt：普通交易
        show_notify_msg:'',  // 公告信息
        show_notify: false,   // 是否显示公告
        goods_detail_type:'',  // 卖家身份 agent:助理人 poor：贫困户 assist:集采

        isAgentPreSell:false,  // 助理人预售
        isAgentSell:false,  // 助理人常规售卖
        isPoor:false,  // 是否是贫困户
        isAssistPreSell:false,  // 集采预售
        isAssistSell:false,  // 集采常规售卖
        isPreSell:false,    // 是否预售
        isAssist:false,    // 是否是集采
        isNpcSpecilGoods:"false",//人大商品
        assistGoodSellNum:0,//集采已售数量
        isAgent:false,    // 是否是助理人

        sharedKey:'',     // 分享key
        type:'',          // 类型
        member_id:'',     // 获取用户头像
        member_idUrl:'',     // 获取用户头像
        new_cart_goods_num:'',  //加入购物车新产品的数量
        cart_goods_num:'',      // 该商品已经加入购物车的数量
        check_cart_new_goods:'',    // 点击心愿单接口url
//        goods_local_storage:0,
        add_wish_click_num:0,     // 点击加入购物车次数
        isDownload:true,        // 分享之后的顶部下载app
        freight:'',
        alertContent:'',        //提示信息
        alert_mask:false,        //提示信息
        certificate:'',         //证书信息

        isAddWishSKU:false,   // 是否弹出加入心愿单sku
        go_to_help_poor_detail_url:'',   // 将帮扶的贫困户url

        isAut:false,   // 中秋活动
        show_old_price:false,   //显示爱心价格

        isquan:false,  //是否显示优惠券
        isquan_tan:false,  //是否显示优惠券弹层
        store_id:'',  //店铺id
        quan_data:[

        ],  //优惠券数组
        isGoodsactivity:'', // 公益日活动
        const_price: '', //集采显示原价
        purchasingPopups: false, // 点击集采清单 集采显示原价并弹窗 2018/4/13 申蒙需求
        donate_fund_fee :'',//捐至扶贫基金
        isPifa:false,//是否达到批发数量
        isRember:false,//是否记住提示
        isbuyUnit:false,
        goods_id_unit:'',
        bf_moreUrl:'',
        isVideo:false,//是否播放top视频
        video_main_info:{},//top视频
        isCommonvideo:false,//是否播放商品详情视频
        video_common_info:{},//商品详情视频
        isgg:true,//视频下是否显示公告
        is_quality_goods:null//商品详情页的优品标志

      }
    },
    created () {
      (function(){
        var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
        var iLastTouch = null;                                //缓存上一次tap的时间
        if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0){
          document.body.addEventListener('touchend', function(event){
            //event.preventDefault();
            var iNow = new Date().getTime();
            iLastTouch = iLastTouch || iNow + 1
            var delta = iNow - iLastTouch;
            if (delta < 500 && delta > 0)
            {
              event.preventDefault();
              return false;
            }
            iLastTouch = iNow;
          }, false);
        }
      })();
      this.isShare = this.$route.query.is_share === 'yes';
      //是否售罄
      this.isSellOut = this.$route.query.is_sell_out === 'yes' ? this.isSellOut = true : this.isSellOut = false
//      this.$route.query.is_fx = 'yes'
      this.isFx = this.$route.query.is_fx === 'yes';
      if(this.isFx){
        this.isShare = false;
      }
      this.sharedKey = this.$route.query.sharedKey;
      this.type = this.$route.query.type;
      this.member_id = this.$route.query.member_id;
//      console.log(this.$route.query)
//      console.log(this.$route.query.member_id)
//      app.showToast('hhhdsfsd')
      this.getData();
//      console.log(this.$route)
      /*goods_id 商品id is_share 是否分享过  is_fx 是否是复兴一号*/
//      this.$route.query.is_share = 'yes'

      document.body.addEventListener('touchstart', function () {
      });
      document.body.addEventListener('mouseover', function () {
      });
      let info = this.app.syJsbGetAppVersion()
      if (info['platform'] === 'ios' || info['platform'] === 'android') {
        this.app.syJsbSetGoBackUrl("goBackOfDetail()");
      }
//      setTimeout(()=>{
//          this.getQuan()
//      },1000)
    },
    mounted () {
//      this.goods_delay_scroll()
      app.syJsbShowTitleBar('true');
//      this.showToast('感谢您的鼓励，我们会努力做得更好')
    },
    watch:{
      alert_mask(){
        if(this.alert_mask == true){
          setTimeout(()=>{
            this.alert_mask = false;
          },1500)
        }
      }
    },
    methods: {
        stoptwo(){
            let videotwo = this.$refs.videotwo
            if(videotwo){
                videotwo.pause()
            }
        },
        stopone(){
            let videoone = this.$refs.videoone
            if(videoone){
                videoone.pause()
            }
        },
        showGonggao(p){
            this.isgg = p
        },
      getShowDom(data,index){
        if(data.length>=3){
          if((data[0].voucher_t_limit>999||data[1].voucher_t_limit>999||data[2].voucher_t_limit>999)&&index==2) {
            return false
          }else{
            return true
          }
        }else{
         return true;
        }
      },
//      f1(){console.log(event.srcElement.src=this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/dfnw43.png');console.log(44)},
//      f2(){console.log(event.srcElement.src=this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/vw4235.png');console.log(555)},
//      fn(){ console.log(event)},
      getData(){
//        console.log(this.$route.query)
//        console.log(this.$route.query)
//          console.log(this.siteInfo.host+'/boc/index.php')  下载地址
        let query = this.$route.query;
        let goods_id = query.goods_id;
//        console.log(this.$route)

        if(this.isShare && this.member_id){
//        if(true){
          this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=get_member_avatar_by_member_id&member_id='+this.member_id).then(res=>{
            if(res.data.content.member_avatar){
              this.member_idUrl = res.data.content.member_avatar
            }
          })
        }

//        this.$http.get(this.siteInfo.host + '/api/index.php?act=project&op=goods_detail&gc_id=105794')

        this.$http.get(this.siteInfo.host + '/api/index.php?act=project&op=goods_detail&goods_id=' + goods_id+'&is_share='+this.$route.query.is_share+'&is_fx='+this.$route.query.is_fx+'&sharedKey='+this.sharedKey+'&type='+this.type+'&member_id='+this.member_id)
          .then((res) => {
            if (res.status != 200) return;
            let data = res.data.content;

            for (let k in data) {
              this[k] = data [k];

            }

            let goods_common_info = data['goods_common_info'];
            for (let k in goods_common_info) {
              this[k] = goods_common_info[k]
            }
              // this.bf_moreUrl =  this.siteInfo.cdn_host + '/bocm/index.php?act=index&op=showvue#/helpEffect?areaid='+ goods_common_info.areaid_3
            this.bf_moreUrl =  this.siteInfo.host + '/bocm/index.php?act=index&op=showvue#/helpEffect?areaid='+ goods_common_info.support_county_id
            let goods_info = data['goods_info'];
            this.goods_price = parseFloat(goods_info.goods_price);
            this.const_price = parseFloat(goods_info.cost_price);
            if((this.const_price !== '' || (typeof this.const_price !== 'undefined')) && this.goods_price < this.const_price){
              this.purchasingPopups = true; //当前价格小于原价,显示集采不参与活动价 弹窗提示
            }else{
              this.purchasingPopups = false;
            }
            this.isNpcSpecilGoods = goods_info.is_npc_specil_goods;
//            console.log('is_npc_specil_goods: '+ this.isNpcSpecilGoods)
            //集采已售数量
            this.assistGoodSellNum = data['good_sell_num'];
            this.goodsUnit = this.goods_info.goods_spec ? this.goods_info.goods_spec.charAt(0) : '';
            this.goods_id = goods_info.goods_id;
            this.goods_storage = goods_info.goods_storage;
            this.goods_marketprice = goods_info.goods_marketprice;
            this.is_quality_goods=goods_info.is_quality_goods;
            //详情页 title
            document.title = this.goods_common_info.goods_name;
//            app.syJsbShowTitleBar('true');
            this._appjs.syJsbSetTitleText(this.goods_common_info.goods_name)

              //是否显示top视频
              if(this.video_main_display_flag == '1'){
                this.isVideo = true
              }else{
                this.isVideo = false
              }
              //是否显示商品详情部分的视频
              if(this.video_common_id == '0'){
                this.isCommonvideo = false
              }else{
                this.isCommonvideo = true
              }

              // 是否有帮扶基金
//            this.fund_fee = 21
            if(this.fund_fee > 0 ){
              this.fund_fee = (parseInt(this.fund_fee * 100) / 100).toFixed(2)
            }

            // 运费
            if(this.goods_common_info.shipping_fee == 0){
              this.freight = '免运费'
            }else{
              this.freight = '运费 ' + this.shipping_fee + ' 元'
            }


//            this.is_login = true;
            if (this.new_cart_goods_num > 0) {
              this.showRedPoint = true;
            }

//            this.is_buyed = false;
            if (this.is_buyed) {
              this.helpImgUrl = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/res34t3434.png';
            }
//            if (this.is_login && !this.can_support) {
//              this.helpCenImgUrl = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/reseh344324.png';
//            }
            if (!this.can_support) {
              this.helpCenImgUrl = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/reseh344324.png';
            }

//            this.goods_detail_type = 'assist'
//            this.trade_mode = 'qkys';
//            this.trade_mode = 'pt';
//            this.goods_detail_type = 'agent'
//            this.goods_detail_type = 'poor';



            this.isAgentPreSell = this.goods_detail_type === 'agent' && this.trade_mode === 'qkys';
            this.isAgentSell = this.goods_detail_type === 'agent' && this.trade_mode === 'pt';
            this.isAgent = this.goods_detail_type === 'agent'
            this.isPoor = this.goods_detail_type === 'poor';
            this.isAssistPreSell = this.goods_detail_type === 'assist' && this.trade_mode === 'qkys';
            this.isAssistSell = this.goods_detail_type === 'assist' && this.trade_mode === 'pt';
            this.isPreSell =  this.trade_mode === 'qkys';
            this.isAssist =  this.goods_detail_type === 'assist'

//            公益日活动
            this.isGoodsactivity = res.data.content.isGoodsactivity

            if(this.isPoor){
              this.goods_spec_list = [{'goods_spec':this.goods_common_info.product_spec,'goods_id':this.goods_id,'goods_storage':100}]
            }

            // 是否显示爱心价格

            if((this.isAssist && this.goods_common_info.goods_marketprice && this.goods_price < this.goods_common_info.goods_marketprice) || (this.isAssist && this.isGoodsactivity == 1)){

              this.show_old_price = true;
            }
//            this.show_old_price = true;
            // 是否显示中秋活动
//            this.goods_areainfo = null
            this.isAut = (new Date().getTime() < 1506528000000) && !this.isAssist

          }).then(()=>{
            this.isLoading = false;
//            if(this.isShare || this.isFx){
            this.getQuan()
            setTimeout(() => {
              vue_share({
                url:this.share_info['shareUrl'],
                title:this.share_info['shareTitle'],
                text:this.share_info['shareText'],
                logo:this.share_info['shareLogo']
              })
            },10)

        });
        this.$http.get(this.siteInfo.host + '/api/index.php?act=project&op=get_evaluate_and_recommend_list&goods_id=' + goods_id).then(res => {
          let data = res.data.content;
//          this.evaluate_list = data.evaluate_list;
//          this.recommend_goods_list = data.recommend_goods_list
          for (let k in data) {
            this[k] = data[k];
          }
//          console.log(123)
        }).then(()=>{
          this.share_img = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/share_img.png'
//          this.share_img = '../../../static/image/detail/share_img.png'
        }).then(()=>{
//          this.goods_evaluate_score = 0;
//          this.is_login = true
//          console.log(this.is_login)
//          setInterval(()=>{console.log(this.is_login)},20)
//          console.log(333)
        });

      },

      goTo(url){
        window.location.href = url
      },

      linkTo(url){
        if (this.isShare || this.isFx) {
          window.location.href = url
        } else {
          app.syJsbLaunchWebview(url)
        }
      },

      showToast(text){
        this.alert_mask = true;
        this.alertContent = text;
      },

      helperNum(){
        this.immediatelyHelp()
      },
      // 分享 调webview
      shareFn(){
//        this.share_mask = false;
        this.share_content = false;
        let shareUrl = this.share_info['shareUrl'];
        let shareText = this.share_info['shareText'];
        let shareTitle = this.share_info['shareTitle'];
        let shareLogo = this.share_info['shareLogo'];
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        app.syJsbShare(jsonParam, shareText, shareUrl);
      },
      // 分享 帮传播
      onShare(){
//        this.showToast('说答复撒地方萨芬撒地方')
        if (this.isShare || this.isFx) {
          this.isShareClick = true;
        } else {
//          this.is_login = true;
          if(this.is_login){
            this.share_mask = true
            this.share_content = true
          }else{
            this.shareFn()
          }
        }
//        this.helpRightImgUrl = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/346234.png';
      },
      // 鼓励他
      support(){
//        this.is_login = true
        if (this.is_login) {
          if (this.can_support) {
            this.$http.get(this.upvote_goods_url)
              .then((res) => {
                if (res.data.state == 'true') {
                  // 成功
//                    app.syJsbAlert('感谢您的鼓励，我们会努力做得更好');
                  this.showToast('感谢您的鼓励，我们会努力做得更好')

                  this.helpCenImgUrl = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/reseh344324.png';
                }else{
//                    app.syJsbAlert('您的鼓励我们已经收到啦，我们会努力做得更好');
                  this.showToast('鼓励已收到，我们会努力做得更好')
                }
              }, err => {
//                app.syJsbAlert('请求失败');
                this.showToast('请求失败');
              })
          }else{
//            app.syJsbAlert('您的鼓励我们已经收到啦，我们会努力做得更好');
            this.showToast('鼓励已收到，我们会努力做得更好');
          }

        } else {
//          app.syJsbLaunchWebview(this.login_url)
          this.goTo(this.login_url)
        }
      },
      // 联系助理人
      callAssistant(){
        this.isAidShow = !this.isAidShow;
      },
      // 心愿单
      wishList(){
        this.showRedPoint = false;
        if (this.is_login) {
          this.$http.get(this.check_cart_new_goods).then(res=>{

          })
//          app.syJsbLaunchWebview(this['goods_cart_url'])
          this.linkTo(this['goods_cart_url'])
        } else {
//          app.syJsbLaunchWebview(this.login_url)
          this.goTo(this.login_url)
        }
      },

      addOneWishFn(){
        if(this.goods_storage <= (this.add_wish_click_num + this.cart_goods_num)){
          app.syJsbAlert('库存不足,无法加入心愿单');
          return
        }
        if (this.isAddOneCon) {
          this.isAddOneCon = false;
          this.isAddOne = true;
//              this.showRedPoint = true;
        }
        this.$http.get(this['add_cart_url']).then(res => {//
          this.add_wish_click_num++
//                this.isAddOne = true;
//                this.isAddOneCon = true;
//                this.add_wish_timer = setTimeout(() => {
//                  if (this.add_wish_timer) {
//                    clearTimeout(this.add_wish_timer);
//                    this.isAddOneCon = false;
//                    this.isAddOne = false;
//                    this.showRedPoint = true;
//                  }
//                }, 800);

        }, err => {
          this.add_car_timer = setInterval(()=>{
            if(this.isAddOneCon){
              if (this.cart_goods_num == 0) {
                this.showRedPoint = false;
              }
              clearInterval(this.add_car_timer)
              app.syJsbAlert('添加心愿单失败，请稍后重试')
            }
          },100)
        })
      },
      // 加入心愿单
      addWishList(){

//        this.$http.get(this['add_cart_url']).then(res=>{console.log(res)})
//        if (this.isAddOneCon) {
//          this.isAddOneCon = false;
//          this.isAddOne = true;
////          this.showRedPoint = true;
//        } else {
//          return false;
//        }
//        this.is_login = true;
        if (this.is_login) {
          if (this['is_self_store']) {
            app.syJsbAlert('不能加入自己店铺的商品')
          } else {//
            /*加入心愿单 如果有多个sku 弹出*/
            if(this.goods_spec_list.length > 1){
              this.isAddWishSKU = true;
              this.isbuy = true;
              this.isbuycontent = true;
            }else{
              this.addOneWishFn();
            }
          }
        } else {
          this.goTo(this.login_url)
        }
      },
      sku_close(){
        this.isbuy = false;
        this.isAddWishSKU = false;
//        this.addOneWishFn();
      },
      sku_close_unit(){
        this.isbuyUnit = false;
//        this.addOneWishFn();
      },
      group_buying_event_popups(){
        MessageBox.confirm("商品活动价格不支持集采，您是否添加到集采清单？","").then(action => {
          if(action == 'confirm'){
            this.isbuyUnit=true;
          }
        });
      },
      // 立即帮扶
      immediatelyHelp(){
//        this.is_login = true;
        if (this.is_login) {
          if (this['is_self_store']) {
            if (this.isShare) {
              alert('不能购买自己店铺的商品')
            } else {
              app.syJsbAlert('不能购买自己店铺的商品')
            }
          } else {
            this.isbuy = true;
            this.isbuycontent = true;
          }
        } else {
//          app.syJsbLaunchWebview(this.login_url)
          this.goTo(this.login_url)
        }
      },
      addGoods(){
        if (this.is_login) {
          if(!this.goods_id_unit){
          Toast({
            message: '请选择产品规格',
            position: 'bottom',
            duration:2500
          });
          return ;
          }
        } else {
          this.goTo(this.login_url)
          return;
        }
        this.isbuyUnit=false
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=add_biz_cart&goods_id='+this.goods_id_unit
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.isJicaitan = true
            Toast({
              message: '已将产品添加到您的单位集采清单。',
              position: 'bottom',
              duration:2500
            });
          } else if(res.data.code ===0){
            Toast({
              message: "您已成功添加过该商品",
              position: 'bottom',
              duration:2500
            });
          }
        }, (error) => {
          console.log(error)
        })
      },

      // 集采清单
      setFlag(){
      },
      // 在线联系
      callOnLine(){
        this.linkTo(this.go_to_im_url)

      },
      // 电话联系
      callPhone(){
        if(this.goods_common_info.publisher_phone){
          if(this.isShare){
            window.location.href='tel:'+this.goods_common_info.publisher_phone
          }else{
            app.syJsbCallPhone(this.goods_common_info.publisher_phone);
          }
        }else{
          app.syJsbAlert('暂无联系方式')
        }

      },
      call_phone400(e){
//        this.isShare = true
        if(this.isShare){
          e.target.href="tel:4006667308"
        }else {
          e.preventDefault();
          app.syJsbCallPhone('4006667308');
        }

      },
      // qq 联系
      callqq(){
        if (this.goods_common_info.publisher_qq) {
          app.syJsbOpenQq(this.goods_common_info.publisher_qq)
        } else {
          app.syJsbAlert("卖家还没有设置QQ客服账号!")
        }
      },

      // 点击body
      reset(){
        this.isAidShow = false;
      },

      // 购买数量加一
      add_buy_num(){
        if (this.buy_num >= this['goods_info']['goods_storage']) {
          if (this.isShare) {
            alert('库存不足')
          } else {
            app.syJsbAlert('库存不足');
          }
          return;
        }
        this.buy_num++
          //pifa
         /* if(this.goods_common_info.wholesale_type == '1' && this.buy_num >= this.goods_common_info.wholesale_num){
            this.isPifa = true
          }else {
              this.isPifa = false
          }*/
      },
      // 确认购买
      sureBuyNow(e){
        if(this.buy_num < 1){
          app.syJsbAlert('购买商品数量不能小于1')
          e.preventDefault();
          return
        }
        this.isbuy = false;
        if(this.isAddWishSKU){
          e.preventDefault();
//          this.isbuycontent = false;
          this.isAddWishSKU = false;
          this.addOneWishFn()
        }else{
            if(this.sharedKey) {
                this.buy_url = this.siteInfo.host + '/bocm/index.php?act=buy&op=buy_step1&cart_id='+ this.goods_id + '|' + this.buy_num + '&goods_project_type=' + this.goods_common_info.goods_project_type + '&sharedKey=' + this.sharedKey
                this.app.syJsbLaunchWebview(this.buy_url)
            } else{
                this.buy_url = this.siteInfo.host + '/bocm/index.php?act=buy&op=buy_step1&cart_id='+ this.goods_id + '|' + this.buy_num + '&goods_project_type=' + this.goods_common_info.goods_project_type
                this.app.syJsbLaunchWebview(this.buy_url)
            }
        }

        // let qs = require('query-string')
        //   let sendData = null;
        // if(this.sharedKey){
        //     sendData = qs.stringify({
        //         sharedKey:this.sharedKey,
        //         'cart_id[]':this.goods_id + '|' + this.buy_num,
        //         goods_project_type:this.goods_common_info.goods_project_type
        //     })
        // }else{
        //     sendData = qs.stringify({
        //         'cart_id[]':this.goods_id + '|' + this.buy_num,
        //         goods_project_type:this.goods_common_info.goods_project_type
        //     })
        // }

          //form post 提交改为 新起webview 提交




//        let postData = this.goods_info.goods_id + '|' +this.buy_num;
//        let url = 'http://sy.com/api/index.php?act=buy&op=buy_step1';

//        this.$http({
//          method:'post',
//          url:this.buy_url,
//          data:{
//            "cart_id[]":postData,
//            "goods_project_type":this.goods_common_info.goods_project_type
//          },
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//          }
//        }).then(res=>{
//          console.log(res)
//        },err=>{
//
//        })
      },
      //单位集采
      sureBuyUnit(){
        this.addGoods()
      },
      show_fund_fee_explain(){
        this.show_fee_explain = true;
        this.show_fee_explain_content = true;
      },
      // 查看大图
      openBigImg(imgurl,text){
        this.img_is_show = true;
        this.bigImgurl = imgurl;
        this.certificate = text;
      },

      // 评论图查看
      commentImgShowFn(index, imgUrl1, imgUrl2, imgUrl3){
        this.commentImgShowNum = index;
        this.commentImgShow = true;
        this.commentImgUrl1 = imgUrl1;
        this.commentImgUrl2 = imgUrl2;
        this.commentImgUrl3 = imgUrl3;
      },
      // 商品选择
      sure_buy_goods_id(goods_id, url){
        this.goods_id = goods_id;
        this.$http.get(url).then(res => {
          if (res && res.data) {
            /*var res = {
             "code": 200,
             "message": "success",
             "content": {
             "cart_goods_num": 345,
             "poor_get_fee": "41.60",
             "fund_fee": 34,
             "will_get_points": 4860,
             "goods_info": {
             "goods_commonid": "105732345",
             "goods_storage": "23432",
             "goods_id": "1034591",
             "goods_price": "676.00",
             "goods_marketprice": "193.00",
             "goods_spec": "箱 234g 20",
             "goods_salenum": "678"
             }
             }
             }*/
            let data = res.data.content;
            for (let k in data) {
              this[k] = data[k]
            }
            for (let k in data.goods_info) {
              this[k] = data.goods_info[k]
            }
          }

        })
      },
      sure_buy_goods_id_unit(goods_id, url){
        this.goods_id_unit = goods_id;
        this.$http.get(url).then(res => {
          if (res && res.data) {
            let data = res.data.content;
            for (let k in data) {
              this[k] = data[k]
            }
            for (let k in data.goods_info) {
              this[k] = data.goods_info[k]
            }
          }
        })
      },
      /* 滚动*/
      goods_delay_scroll(){
        let getByteLen = function (val) {
          let len = 0;
          for (let i = 0; i < val.length; i++) {
            if (val[i].match(/[^x00-xff]/ig) != null) //全角
              len += 2;
            else
              len += 1;
          }
          return len;
        }
        let sAbc = document.getElementById("scroll_begin").innerHTML.trim();
        console.log(sAbc)
        let a = getByteLen(sAbc);

        function ScrollImgLeft() {
          let speed = 40;
          let scroll_begin = document.getElementById("scroll_begin");
          let scroll_end = document.getElementById("scroll_end");
          let scroll_div = document.getElementById("scroll_div");

          if (a > 122) {
            scroll_end.innerHTML = scroll_begin.innerHTML;
          }
          function Marquee() {
            if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0) {
              scroll_div.scrollLeft = 0;
            }
            else {
              scroll_div.scrollLeft++;
            }
          }

          let MyMar=setInterval(Marquee,speed);
          //scroll_div.onmouseover=function() {clearInterval(MyMar);}
          //scroll_div.onmouseout=function() {MyMar=setInterval(Marquee,speed);}
        }
        console.log(123)

        ScrollImgLeft();
      },

      // 下载app
      linkToDownload(){
        window.location.href= this.siteInfo.host+'/boc/index.php'
      },

      /* 图片加载失败*/
      nofind(){
        let img=event.srcElement;
        console.log(img)
        img.src=this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/default.png';
        img.onerror=null;

      },

      /*eImgClick:function(e){
       this.isImgViewsShow=1;
       this.imgViewsSrc=e.currentTarget.src
       },
       eImgViewClick:function(){
       this.isImgViewsShow=!this.isImgViewsShow;
       }*/

        // 优惠券
        getQuan(){
            this.$http.get(this.siteInfo.host + '/api/index.php?act=voucher&op=voucher_t_list&store_id=' + this.store_id)
                .then((res) => {
                    this.quan_data = res.data.content.voucher_t_list
                    let data_length = this.quan_data.length
                    if(data_length>0){
                        this.isquan = true
                    }
                })
        },
//      弹优惠券
        quan_tan(){
            if (this.is_login) {
                this.isquan_tan=true
            } else {
                this.goTo(this.login_url)
            }
        },
//        领取优惠券
        quan_get(i){
            console.log(i)
            this.$http.get(this.siteInfo.host + '/api/index.php?act=voucher&op=send_voucher&voucher_t_id=' + i )
                .then((res =>{
                    this.message = res.data.message
                    this.$toast({
                        message: this.message,
                        duration: 2000
                    })
                }))
        }

    },

    components: {
        loading,
        'sy-player': videoPlay
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">

  $bgcolor: #fff;
  $wrapbg: #F3F3F3;

  .jct-close{
    position: absolute;
    right:0.1rem;
    top:-0.9rem;
    width: 0.6rem;
    height: 0.6rem;background: url("/bocm/platformjs/static/image/icon-close.png")no-repeat right;background-size: 0.6rem 0.6rem;}
  .jct-content{
    position: relative;
    left: 50%;
    top:50%;
    margin: -4.184rem 0 0 -3.25rem;
    width: 6.5rem;height: 8.37rem;background: #fff;border-radius: 0.16rem;}
  .jct-title{width: 6.5rem;height: 0.93rem;line-height: 0.93rem;font-size: 0.34rem;color: #4B4F63;border-bottom: 0.02rem solid rgba(218,222,228,0.60);}
  .jct-c{width: 6.5rem;height:5.36rem; overflow:hidden;overflow-y: auto;}
  .jct-site{
    width: 5.7rem;height: 0.84rem;margin: 0.4rem auto 0;font-size: 0.28rem;color: #4B4F63;line-height: 0.42rem;
    text-align: justify;}
  .jct-img{width: 5.7rem;height: 2.78rem;margin: 0.21rem auto 0.13rem;}
  .jct-img img{width: 100%;height: 100%;}
  .jct-des{width: 5.7rem;margin: 0.3rem auto 0;font-size: 0.28rem;color: #4B4F63;line-height: 0.42rem;
    text-align: justify;}
  .jct-p{width:6.5rem;height: 1rem;background-image: linear-gradient(0deg, #FFFFFF 40%, rgba(255,255,255,0.73) 79%, rgba(255,255,255,0.00) 100%);position:absolute;left:0;bottom:0;}
  .jct-check-c{width: 6.5rem;height: 0.4rem;}
  .jct-check-sel{display: inline-block;width: 0.4rem;height: 0.4rem;border: 0.01rem solid #dadee4;border-radius: 50%;box-sizing: border-box;}
  .jct-check-sel img{width: 100%;height: 100%;}
  .jct-check-z{display: inline-block;height: 0.4rem;line-height: 0.4rem;font-size: 0.26rem;color: #666A7F;vertical-align: bottom;margin-left: 0.1rem;}
  .jct-btn{width: 2.7rem;height: 0.8rem;background: #4A90E2;border-radius: 0.08rem;text-align: center;line-height: 0.8rem;font-size: 0.32rem;color: #FFFFFF;margin: 0.4rem 0.3rem 0 0;display: inline-block;}
  .jct-btn2{width: 2.7rem;height: 0.8rem;background: #4A90E2;border-radius: 0.08rem;text-align: center;line-height: 0.8rem;font-size: 0.32rem;color: #FFFFFF;display: inline-block;}
  #detail h3{
    font-size:.34rem;
  }
  .h {
    height: 50px;
    background: pink;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clearfix {
    *zoom: 1;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    line-height: 0;
    content: "";
  }

  div,p,a,span{
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  .bot{
    position: absolute;
    left:0;
    bottom:0;
  }

  .gt {
    width: .15rem;
    vertical-align: middle;
    position: relative;
    margin-top: -.05rem;
  }

  .clearfix:after {
    clear: both;
  }


  .hidden {
    overflow: hidden;
  }

  .none {
    display: none
  }

  .wrap {
    background: $wrapbg;
    text-align: left;
    padding-bottom: 1rem;
  }

  .box {
    box-sizing: border-box;
    background: $bgcolor;
  }

  .bb {
    box-sizing: border-box;
  }

  .auto {
    margin: 0 auto;
  }

  .content-auto {
    width: 94.7%;
    margin: 0 auto;
  }

  .detail-top-img {
    height: 5.25rem;
    overflow: hidden;
  }
  .detail-top-video{
    width: 7.5rem;
    height: 7.5rem;
  }
  .content-video{
    width: 7.1rem;
    height: 7.1rem;
    margin: 0 auto;
  }
  .over_img{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:100%;
    min-height:5.25rem;
  }

  .over {
    width: 100%;
    height: 100%
  }

  .fixed {
    position: fixed;
  }

  input[type="button"], input[type="submit"], input[type="reset"] {
    -webkit-appearance: none;
  }

  textarea {
    -webkit-appearance: none;
  }

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
  }

  .cen {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .bg {
    background: pink;
  }

  .child-fl > li {
    float: left;
    box-sizing: border-box;
  }

  .source-description li {
    border: 1px solid rgba(256, 256, 256, 0.5);
    margin-left: .1rem;
    color: rgba(256, 256, 256, 0.9);
    border-radius: .08rem;
    padding: 0 .08rem;
    height:.5rem;
    min-width: 1.6rem;
    line-height:.5rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }

  .text-white {
    color: #fff;
  }

  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .pl07 {
    padding-left: .05rem;
  }

  .detail-top-text {
    padding: .26rem .2rem .3rem;
  }

  .no-enter {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    white-space: normal;
  }

  .child-ellipsis > li {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .goods-area span {
    font-size: .28rem;
    color: #606060;
  }



  .price-integral, .price-integral2 {
    /*border-top: 1px solid #e3e3e3;*/
    padding: .5rem 0;
    position: relative;
  }

  .price-integral-ul2 > ul > li {
    /*height: 1.6rem;*/
    /*line-height: 1.6rem;*/
  }

  .price-integral2 {
    padding: .2rem 0;
    /*border-bottom: 1px solid #e3e3e3;*/
  }

  .price-integral-ul2 .goods-price {
    padding-top: .22rem;
  }

  .prise-help-img {
    right: 0;
    bottom: 0.45rem;
  }

  .prise-help-img img {
    width: .27rem;
    height: .27rem;
  }



  /*  .price-integral::before {
      position: absolute;
      content: "";
      bottom: -.39rem;
      left: 50%;
      margin-left: -.3rem;
      border: .3rem solid transparent;
      border-bottom: .2rem solid transparent;
      border-top: .2rem solid #ccc;
    }

    .price-integral::after {
      position: absolute;
      content: "";
      bottom: -.36rem;
      left: 50%;
      margin-left: -.3rem;
      border: .3rem solid transparent;
      border-bottom: .2rem solid transparent;
      border-top: .2rem solid $bgcolor;
    }*/

  .goods-price {
    /*padding-top: .02rem;*/
  }

  .price-integral-ul li {
    width: 33%;
  }

  .price-integral-ul li p:nth-last-child(1) {
    margin-top: .08rem;
    color: #3F3F3F
  }

  .price-goods {
    /*padding-top:.4rem;*/
    font-size:.24rem;
    color:#606060;
  }

  .price-goods ul {
    padding: .4rem 0 .4rem;

  }

  .price-goods ul li {
    width: 33.3%;
  }

  .price-goods ul li div {
    width: 1rem;
    height: 1rem;
    /*border-radius:.5rem;*/
    /*border:1px solid #ccc;*/
  }

  .price-integral2-p1 {
    padding-left: .2rem;
    height: 1rem;
    line-height: .5rem;
  }

  .price-goods ul li div img {
    /*margin-top:.32rem;*/
    width: .98rem;
    height: .98rem;
  }

  .price-goods ul li p {
    margin-top: .2rem;
  }

  .select-detail {
    padding-top:.1rem;
    padding-bottom: .2rem;

    color: #666;
    font-size: .28rem
  }

  .elective-left {
    /*width:1.2rem;*/
    width: 18%;
    line-height: .4rem;
  }

  .elective-right {
    text-align: left;
    line-height: .4rem;
  }

  .elective-right {
    width: 80%;
  }

  .serve-promise {
    width: 100%;
  }

  .serve-promise > li {
    box-sizing: border-box;
    float: left;
    width: 50%;
  }

  .aid {
    font-size: .26rem;
    padding: .4rem 0;
    /*border-top: 1px solid #ddd;*/
  }

  .aid-top {}
  .group-buying{
    margin: 0.24rem auto 0;
    background:#fff;
    position:relative;
    .group-buying-top{
      width: 94.7%;
      margin: 0 auto;
      height: 1.25rem;
      display: flex;
      flex-flow: row nowrap;
      position: relative;
      .title{
        display: inline-block;
        /*margin-left: 0.1rem;*/
        padding-top: 0.5rem;
        vertical-align: top;
        line-height: 0.4rem;
      }
      .right{
        position: absolute;
        top: 50%;
        right:0;
        margin-top: -0.18rem;
        width: 1.56rem;
        height: 0.46rem;
        line-height: 0.46rem;
        /*text-align:center;*/
        font-size: .24rem;
        color: #66b2ea;
        border: .02rem solid #66b2ea;
        border-radius: .12rem;
        background: url(/bocm/platformjs/static/image/detail/gt_blue.png) no-repeat 86%;
        background-size: .14rem .2rem;
        .right-btn{
         margin-left: 0.16rem;
          color: #66b2ea;
        }
      }
    }
    .group-buying-middle{
      width: 94.7%;
      margin: 0 auto;
      padding-bottom: 0.32rem;
      border-bottom: 1px solid #ddd;
      padding:0 0.4rem;
      box-sizing: border-box;
      display:flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .middle-item{
        width: 1.2rem;
        margin-bottom: 0.32rem;
        .item-icon{
          width: 1.18rem;
          height: 1.18rem;
          margin: 0 auto;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .item-title{
          margin-top: 0.23rem;
          font-size: 0.24rem;
          color: #999;
          text-align: center;
        }
      }


    }
    .group-buying-bottom{
      width: 94.7%;
      margin: 0 auto;
      height: 1.02rem;
      line-height: 1.02rem;
      position: relative;
      .descr{
        font-size: 0.28rem;
        color: #606060;
      }
      .right-j{
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -0.135rem;
        width: 0.15rem;
        height: 0.27rem;
      }
    }
  }
  .aid-top img {
    height: .28rem;
    width: .28rem;
    float: left;
    display: block;
  }

  .aid-top span {
    float: left;
    /*padding-left: .1rem;*/
    font-size: .34rem;

  }

  .aid-middle {
    padding: .3rem 0;
  }


  .aid-bottom ul li {
    /*width: 33.3%;*/
    color: #999;
    line-height: .4rem;
  }

  .product-detail {
    margin-top: .24rem;
    padding-bottom:.5rem;
  }

  .product-detail h3 {
    font-size: .3rem;
    color: #333;
    padding-top: .5rem;
  }

  .product-img img {
    display: block;
    width: 100%;
    /*height: 5.01rem;*/
  }

  .text-description {
    padding: .4rem 0 .2rem;
    color: #666;
    font-size: .28rem;
    line-height: .44rem;
  }

  .parting-img img {
    height: .42rem;
    width: 100%;
  }

  .helper {
    margin-top: .24rem;
    padding-top: .5rem;
  }

  .helper-title {
    /*padding-bottom: .4rem;*/
  }

  .love-large-img-box {
    margin-left: -.1rem;
    margin-top: -.02rem;
    /*width: .36rem;*/
    height: .31rem;
  }

  .love-large-img {
    width: .36rem;
    height: .31rem;
  }

  .goods_evaluate_score {
    /*left:.05rem;*/
    top:44%;
    color:#fff;
    font-size:.18rem;
    /*height: .31rem;*/
    /*font-size: .26rem;*/
    /*text-align: center;*/
    /*display: inline-block;*/
    /*padding-bottom: .2rem;*/
    /*color: #fff;*/
    /*left: 0;*/
    /*top: 0.026rem;*/
  }

  .header-portrait {
    width: .8rem;
  }

  .helper-ul > li {
    padding-top: .4rem;
  }

  .header-portrait img {
    width: .8rem;
    height: .8rem;
    border-radius: .4rem;
  }

  .helper-comment-wrap {
    /*padding-left:.8rem;*/
    /*padding-bottom: .2rem;*/
    overflow: hidden;
    /*border-bottom: 1px solid #ddd;*/
  }

  .helper-comment {
    padding-left: .2rem;
    /*padding-bottom: .2rem;*/
  }

  .helper-info {
    font-size: .26rem;
    line-height: .36rem;
    color: #606060;
  }

  .img-grade img {
    height: .19rem;
    width: .22rem;
  }

  .comment-content {
    padding: .12rem 0 .2rem;
    font-size: .3rem;
    color: #606060;
    line-height: .42rem;

  }

  .comment-content-img {
    padding-bottom: .2rem;
  }

  .comment-content-img li {
    float: left;
    width: 27%;
  }

  .comment-content-img li img {
    width: 1.4rem;
    height:1.4rem;
    margin: 0 auto;
  }

  .show-all-comment {
    padding: .25rem 0;
    font-size: .26rem;
    color: #666;
  }

  .recommend-wrap {
    margin-top: .24rem;
  }

  .recommend li {
    box-sizing: border-box;
    width: 50%;
    height:3.8rem;
    padding: .1rem .1rem .2rem;
    text-align: center;
  }

  .recommend img {
    width: 96%;
    height: 2.34rem;
  }

  .goods_spec_list{
    max-height:3rem;
    overflow: auto;
  }


  .goods_spec_list {
    height: 230px;
    overflow: hidden;
    overflow-y: auto;
  }
  .goods_spec_list::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
    border-left: 1px solid rgba(0, 0, 0, 0);
  }
  .goods_spec_list::-webkit-scrollbar {
    width: 5px;
    height: 13px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .goods_spec_list::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    background-clip: padding-box;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    min-height: 28px;
  }
  .goods_spec_list::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .goods_spec_list{
    -webkit-scrollbar {
      width: 7px;
    }

    -webkit-scrollbar-thumb {
      background-color: #b5b5ad;
      border-radius: 6px;
    }

    -webkit-scrollbar-thumb:window-inactive {
      background-color: #b5b5ad;
    }
  }


  .goods_spec_list li {
    line-height: .32rem;
    font-size: .26rem;
    padding: 0.1rem 0.24rem;
    background: #f5f5f5;
    border-radius: 0.06rem;
    margin: 0 0.24rem 0.2rem 0.24rem;
    max-width:94%;
  }

  .goods_spec_list_active {
    background: #f13e52 !important;
    color: #fff;
  }

  .recommend-description {
    color: #666;
    font-size: .26rem;
    line-height: .36rem;
    /*height:.72rem;*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .h3-title {
    padding: .5rem 0;
  }

  .recommend-prise {
    font-size: .32rem;
    line-height: .36rem;
    padding: .05rem 0;
  }

  .goods-bot-sure {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    height: 1rem;
  }

  .goods-bot-sure > ul li {
    float: left;
    /*width: 25%;*/
    text-align: center;
    padding-top: .08rem;
    box-sizing: border-box;
  }

  .bottom-bar {

  }

  .goods-bot-sure ul li img {
    margin-top: .05rem;
    width: .40rem;
    /*height: .48rem;*/
  }

  .bottom-bar-text {
    color: #666;
    font-size: .2rem;
    padding-top: .08rem;
  }

  .goods-bot-sure .bottom-bar li a {
    font-size: .28rem;
    display: block;
    width: 95%;
    height: .84rem;
    line-height: .86rem;
    border-radius: .1rem;
    color: #fff;
    box-sizing: border-box;
  }
  .add-wish {
    /*background: linear-gradient(#F46AAE, #EB3E93);*/
    background: rgba(254,97,34,0.70);
  }

  .add-wish:active {
    background: #E48159;
  }

  .immediately-help {
    background: #F13E52;
  }

  .immediately-help:active {
    background: #D83749;
  }

  .call-publisher {
    width: 2.44rem;
  }

  .call-publisher tr {
    background: $bgcolor;
  }

  .call-publisher td {
    line-height: 1rem;
    height: 1rem;
    border: 1px solid #ccc;
    border-collapse: collapse;
  }

  .call-publisher td img {
    vertical-align: middle;
  }

  .call-publisher td a {
    padding-left: .2rem;
  }

  /*.call-publisher li:nth-child(2) {*/
    /*border-top: none;*/
    /*border-bottom: none;*/
  /*}*/

  .red-point {
    position: absolute;
    width: .1rem;
    height: .1rem;
    background: red;
    border-radius: .05rem;
    right: .44rem;
    top: .07rem;
  }

  .buy_mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, .4);

  }

  .buy-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8rem;
    background: $bgcolor;

  }

  .buy-slide-enter {
    /*background: red;*/
  }

  .buy-slide-enter-active, .buy-slide-leave-active {
    transition: all .2s;
  }

  .buy-slide-enter, .buy-slide-leave-active {
    transform: translate(0, 100%);
  }

  /*  .call-enter-active, .call-leave-active {
      transition: all .2s;
    }
    .call-enter, .call-leave-active {
      transform: translate(0, 110%);

    }*/

  .select-num {
    border-top: 1px solid #ccc;
    left: 0;
    bottom: 1rem;
    height: 1.2rem;
    line-height: 1.2rem;
    width: 100%;
    /*background: pink;*/
  }

  .select-num-box {

  }

  .select-num-box span {
    position: relative;
    margin-top: .3rem;
    /*display: inline-block;*/
    width: .6rem;
    height: .6rem;
  }

  .select-num-box .select-right {
    margin-right: .3rem;
    background: url(/bocm/platformjs/static/image/detail/zh72.png) no-repeat;
    background-size: .6rem .6rem;
  }

  .select-num-box .select-left {
    background: url(/bocm/platformjs/static/image/detail/zh71.png) no-repeat;
    background-size: .6rem .6rem;
  }

  .select-num-box input {
    text-align: center;
    width: 1rem;
    height: .6rem;
    border: 1px solid #ddd;
    margin: .3rem;
  }

  .buy-confirm {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    left:0;
    bottom:0;
    background: rgb(241, 62, 82);
  }

  .buy-confirm input {
    width: 100%;
    height: 100%;
    color: #fff;
    /*background: red;*/
    background: rgb(241, 62, 82);
    font-size: .3rem;
  }

  .fee-explain-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(100, 100, 100, .4);
  }

  .fee-explain {
    position: absolute;
    background: $bgcolor;
    padding-top: .4rem;
    border-radius: .2rem;
  }

  .fee-explain-img img {
    width: 30%;
  }

  .explain-ul {
    padding: .3rem;
    color: #999;
    line-height: .44rem;
    text-align: left;
  }

  .know-close {
    padding: 0 0 0.4rem;
  }

  .know-close input {
    color: #f31e37;
    border: 1px solid #f31e37;
    border-radius: .2rem;
    height: .8rem;
    width: 2.4rem;
    background: $bgcolor;
  }

  .reply-cont {
    background: #f6f6f6;
    /*background: red;*/
    border: 1px solid #eee;
    border-radius: .06rem;
    padding: .16rem 0.1rem

  }

  .reply-cont::before {
    content: '';
    position: absolute;
    left: .3rem;
    top: -12px;
    border: 6px solid transparent;
    border-bottom: 6px solid #eee;
  }

  .reply-cont::after {
    content: '';
    position: absolute;
    left: .3rem;
    top: -11px;
    border: 6px solid transparent;
    border-bottom: 6px solid #f6f6f6;
  }

  .bottom-bar-parting {
    width:1px;
    /*width: .03rem;*/
    height: 1rem;
    /*line-height: 1rem;*/
    padding-top: .2rem;
  }

  .bottom-bar-parting .bottom-bar-parting-line {
    width: 100%;
    height: .48rem;
    box-sizing: border-box;
    background: #ccc;
  }

  @-webkit-keyframes add_wish {
    0% {
      -webkit-transform: translate(0, 1rem) scale(0, 0);
      transform: translate(0, 1rem) scale(0, 0);
      opacity: 0;
    }
    40% {
      -webkit-transform: translate(0, 0) scale(1, 1);
      transform: translate(0, 0) scale(1, 1);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate(-2rem, 1rem) scale(0, 0);
      transform: translate(-2rem, 1rem) scale(0, 0);
    }
  }

  @-moz-keyframes add_wish {
    0% {
      -webkit-transform: translate(0, 1rem) scale(0, 0);
      transform: translate(0, 1rem) scale(0, 0);
      opacity: 0;
    }
    40% {
      -webkit-transform: translate(0, 0) scale(1, 1);
      transform: translate(0, 0) scale(1, 1);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate(-2rem, 1rem) scale(0, 0);
      transform: translate(-2rem, 1rem) scale(0, 0);
    }
  }

  @-o-keyframes add_wish {
    0% {
      -webkit-transform: translate(0, 1rem) scale(0, 0);
      transform: translate(0, 1rem) scale(0, 0);
      opacity: 0;
    }
    40% {
      -webkit-transform: translate(0, 0) scale(1, 1);
      transform: translate(0, 0) scale(1, 1);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate(-2rem, 1rem) scale(0, 0);
      transform: translate(-2rem, 1rem) scale(0, 0);
    }
  }

  @-ms-keyframes add_wish {
    0% {
      -webkit-transform: translate(0, 1rem) scale(0, 0);
      transform: translate(0, 1rem) scale(0, 0);
      opacity: 0;
    }
    40% {
      -webkit-transform: translate(0, 0) scale(1, 1);
      transform: translate(0, 0) scale(1, 1);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate(-2rem, 1rem) scale(0, 0);
      transform: translate(-2rem, 1rem) scale(0, 0);
    }
  }

  @keyframes add_wish {
    0% {
      -webkit-transform: translate(0, 1rem) scale(0, 0);
      transform: translate(0, 1rem) scale(0, 0);
      opacity: 0;
    }
    40% {
      -webkit-transform: translate(0, 0) scale(1, 1);
      transform: translate(0, 0) scale(1, 1);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate(-2rem, 1rem) scale(0, 0);
      transform: translate(-2rem, 1rem) scale(0, 0);
    }
  }

  .add_wish_animation {
    -webkit-animation: add_wish .8s ease 0s 1 normal;
    animation: add_wish .8s ease 0s 1 normal;
  }

  .car-enter-active {
    -webkit-animation: add_wish .8s ease 0s 1 normal;
    animation: add_wish .8s ease 0s 1 normal;
  }

  .add-one {
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
    transform: translate(0, -1rem) scale(1, 1);
    opacity: 1;
  }

  .fold-enter-active, .fold-leave-active {
    transition: all 0.3s;
  }

  .fold-enter {
    transform: translate(0, 0) scale(.1, .1);
  }

  .fold-leave-active {
    transform: translate(-1.8rem, -0.1rem) scale(.1, .1);
  }

  #gongao {
    height: 0.7rem;
    top: 0;
    left: 0;
    background: #ffeddb;
    padding: 0 0.24rem;
    box-sizing: border-box;
  }
  .gonggao-con{
    min-height: 0.48rem;
    padding: 0.11rem 0.18rem;
    background: #FFF59B;
    .con-left{
      float:left;
      margin-top: 0.04rem;
      margin-right: 0.14rem;
      width: .26rem;
      height: .26rem;
      background:url(/bocm/platformjs/static/image/sywall/icon-notice.png) no-repeat center;
      background-size:0.26rem 0.26rem;
    }
    .con-right{
       float:left;
       width: 6.74rem;
       font-size: 0.24rem;
       line-height: 0.36rem;
       color: #F25B4B;
      text-align: justify;
     }
    .con-right2{
      font-size: 0.24rem;
      min-height: 0.48rem;
      line-height: 0.48rem;
      text-align:center;
      color: #F25B4B;
    }
  }
  .gonggao-left {
    height: 0.7rem;
    width: 0.62rem;
    float: left;
    background:url(/bocm/platformjs/static/image/detail/detail-inform.png) no-repeat left center; background-size:0.3rem 0.31rem;
  }

  .scroll_div {
    width: 6.4rem;
    height: 0.7rem;
    float: left;
    white-space: nowrap;
    overflow: hidden;
  }

  #scroll_begin, #scroll_end {
    line-height: 0.7rem;
    color: #f37120;
    float: left;
    /*transform: translateX(100%);*/
  }
  #scroll_begin{
    -webkit-animation: delay_scroll 20s linear 0s infinite normal;
    animation: delay_scroll 20s linear 0s infinite normal;
  }

  @-webkit-keyframes delay_scroll {
    0%{
      -webkit-transform: translateX(6.5rem);
      transform: translateX(6.5rem);
    }
    100%{
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
  @keyframes delay_scroll {
    0%{
      -webkit-transform: translateX(6.5rem);
      transform: translateX(6.5rem);
    }
    100%{
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }

  .one-row {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /*.help-person-img:active{*/
    /*background: #000;*/

  /*}*/

  .press_bg{
    background: rgba(102,179,234,.1);
  }

  .share_pop{
    width:100%;
    /*height:4.6rem;*/
  }
  .share_title{
    border-radius: 8px 8px 0 0;
    height:.92rem;
    background: #F13E52;
    line-height: .92rem;
    font-size:.34rem;
    color:#fff;
  }
  .share_button{

  }
  .share_button a{
    width:3.2rem;
    height:.64rem;
    line-height: .64rem;
    display:inline-block;
    border: .02rem solid #F13E52;
    border-radius: .12rem;
    font-size:.28rem;
    color:#F13E52;
  }

  .seller_detail_btn{
    font-size:.24rem;
    color:#66B2EA;
    padding:.09rem .38rem .09rem .18rem;
    border:.02rem solid #66B2EA;
    border-radius:.12rem;
    background: url(/bocm/platformjs/static/image/detail/gt_blue.png) no-repeat 88% center; background-size:0.12rem 0.2rem;
  }

  .after_sale li{
    width:25%;
    position: relative;
  }

  .after_sale li::before{
    content:'';
    position: absolute;
    right:0.2rem;
    top:.2rem;
    width:1px;
    height:.46rem;
    background: #ddd;

  }
  .after_sale li:nth-last-child(1):before{
    content:'';
    background: transparent;
  }
  .contact-popup{position: absolute;left:.1rem;bottom:1.2rem; z-index:99999}
  /*.call-publisher-wrap table tr:nth-child(1) td{*/
    /*border-radius: 0.08rem 0.08rem 0 0;*/
  /*}*/
  /*.call-publisher-wrap table tr:nth-last-child(1) td{*/
    /*border-radius: 0 0 0.08rem 0.08rem;*/
  /*}*/

  /*.call_top{*/
    /*border-radius: 0.08rem 0.08rem 0 0;*/
  /*}*/
  /*.call_bottom{*/
    /*border-radius: 0 0 0.08rem 0.08rem;*/
  /*}*/
  .call-publisher-wrap::before{
    content:'';
    position: absolute;
    left:.5rem;
    bottom:-14px;
    border:6px solid transparent;
    border-top:8px solid #ccc;
  }
  .call-publisher-wrap::after{
    content:'';
    position: absolute;
    left:.5rem;
    bottom:-13px;
    border:6px solid transparent;
    border-top:8px solid #fff;
  }
  .care{
    background: rgba(104,179,234,0.10);
    padding:.1rem;
  }
  .care_wrap{
    background: $bgcolor;
    padding:.4rem .12rem;
  }
  .care_img_left{
    right:2.8rem;
    top:-.05rem;
    width:2rem;
  }
  .care_img_right{
    left:2.8rem;
    top:-.05rem;
    width:2rem;
  }
  .care .question_title{
    padding:.18rem 0 .14rem;
    font-size:.28rem;
    color:#606060;
  }
  .care .question_content{
    font-size:.26rem;
    color:#B2B2B2;
    line-height: .4rem;
  }

  .care .care_content{
    padding:.3rem .1rem 0;
    line-height: .4rem;
  }
  .care .care_phone{
    /*margin-left:.1rem;*/
    padding-left:.36rem;
    font-size:.26rem;
    color:#68B3EB;
    background:  url(/bocm/platformjs/static/image/detail/phone400.png) no-repeat left 38%;
    background-size:.28rem .28rem;

  }

  .call-publisher img{
    width:.4rem;
    height:.4rem;
  }
  .rate_green{
    color:#15A404;
  }
  .rate_red{
    color:#BF1818
  }

  .share_text:active {
    background: rgba(241,62,82,0.1);
  }

  table td{
    border-collapse: collapse;
  }
  /*image[lazy=loading] {*/
    /*width: 40px;*/
    /*height: 300px;*/
    /*margin: auto;*/
  /*}*/
  .well_help_poor{
    /*margin-top:.3rem;*/
    margin-top:-0.4rem;
    /*padding:.2rem 0 0;*/
    padding:.32rem 0 0;
    border-top:1px solid #ddd;
    font-size: .28rem;
    color:#606060;
  }
  .well_help_poor_con{
    padding:.1rem 0 0;
  }
  .bg_gt{
    width:.15rem;
    height:.27rem;
    background: url(/bocm/platformjs/static/image/detail/Combinedres.png) no-repeat;
    background-size: .15rem .27rem;
  }
  .sku_max_height{
    max-height: 4.2rem;
  }

  .autumn{
    padding:.2rem .2rem;
    background-image: linear-gradient(to left, #F1CF51 0%, #F76B1C 100%);
    color:#fff;
  }
  .autumn_con{
    /*height:.3rem;*/
    font-size: .24rem;
  }

  .autumn_detail{
    padding-right:.22rem;
    background: url("/bocm/platformjs/static/image/index/arrow123.png") no-repeat right top;
    background-size: auto .2rem;
  }
  .old_price_top{
    width:70%;
    text-align: center;
    left:0;
    top:.1rem;
    color:#BF1818;
    font-size: .28rem;
  }
  .old_price_bottom{
    width:70%;
    text-align: center;
    left:0;
    bottom:-.3rem;
    color:#CCCCCC;
    font-size: .28rem;
  }
  .ovhiden{
    overflow: hidden;
  }
  .first-detail{

  }
  .bg_quan{
    width:1.6rem;
    height:0.32rem;
    margin-right: 0.18rem;
    color: #fff;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.35rem;
    background: url("/bocm/platformjs/static/image/detail/youhuiq.png") no-repeat;
    background-size: 1.6rem 0.32rem;
  }
  .bg_quan_big{
    width:2.43rem;
    background: url("/bocm/platformjs/static/image/detail/youhuiq-big.png") no-repeat;
    background-size: 2.43rem 0.32rem;
  }
  .quan_mask{
    z-index: 10000000000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, .4);
  }
  .quan_c{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 9.95rem;
    background: #F7F9FA;
  }
  .quan_title{
    width: 100%;
    height: 0.76rem;
    padding-top: 0.3rem;
    font-size: 0.3rem;
    color: #929292;
    text-align: center;
    overflow: hidden;
    position: relative;
  }
  .quan_title_close{
    /*float: right;*/
    /*margin-right: 0.24rem;*/
    font-size: 0.7rem;
    font-weight: 300;
    transform: rotate(45deg);
    /*<!--margin-top: -0.3rem;-->*/
    position: absolute;
    top:0;
    right: 0.24rem;
  }
  .quan_title2{
    font-size: 0.3rem;
    color: #4A4A4A;
    margin-left: 0.24rem;
    line-height: 0.42rem;
    text-align: left;
    margin-bottom: 0.22rem;
  }
  .quan_list{
    padding: 0 0.22rem 0.5rem 0.22rem;
    height: 8.26rem;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .quan_item{
    width: 7.06rem;
    height: 1.99rem;
    background: url("/bocm/platformjs/static/image/detail/youhuiq2.png")no-repeat;
    background-size: 7.06rem 1.99rem;
    overflow: hidden;
    margin-bottom: 0.24rem;
  }
  .quan_l{
    width: 2.5rem;
    height: 1.99rem;
    float: left;
  }
  .quan_l_t{
    margin-top: 0.42rem;
    height: 0.68rem;
    font-size: 0.32rem;
    color: #fff;
    text-align: center;
  }
  .quan_l_t span{
    font-size: 0.68rem;
    margin-left: -0.1rem;
  }
  .quan_l_b{
    width: 100%;
    text-align: center;
    margin-top: 0.1rem;
    font-size: 0.24rem;
    color: #FFF;
  }
  .quan_r{
    width: 4.56rem;
    height: 1.99rem;
    float: left;
  }
  .quan_r_t{
    margin-left:0.2rem ;
    margin-top: 0.34rem;
    font-size: 0.28rem;
    line-height: 0.33rem;
    color: #4B4F63;
    letter-spacing: -0.55px;
    text-align: left;
    width: 4.36rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .quan_r_b{
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    height: 0.45rem;
    font-size: 0.24rem;
    line-height: 0.45rem;
    color: #818C9E;
    letter-spacing: -0.55px;
    text-align: left;
  }
  .quan_r_b span{
    width: 1.23rem;
    height: 0.45rem;
    font-size: 0.24rem;
    color: #4A90E2;
    letter-spacing: -0.01rem;
    border: 0.02rem solid #4A90E2;
    border-radius: 1rem;
    float: right;
    margin-right: 0.22rem;
    line-height: 0.45rem;
    text-align: center;
    box-sizing: border-box;
  }
  .quan_explain{width: 4.24rem;height: 0.36rem;margin-top: 0.2rem;
    margin-left: 0.22rem;
    line-height: 0.36rem;
    text-align: left;
    font-size: 0.24rem;
    color: #818c9e;

    /*background: url("/bocm/platformjs/static/image/select_btn_hui.png") no-repeat right center;*/
    /*background-size: 0.46rem 0.46rem;*/
  }
  .bottom-btn-zindex999{
    z-index: 999;
  }
  .bottom-btn-zindex9999{
    z-index: 9999;
  }
  .bottom-btn-zindex1000{
    z-index: 1000;
  }
  .bottom-btn-zindex10000{
    z-index: 10000;
  }
  .zlr-detail{
    margin-top: 0.24rem;
    background: #fff;
  }
  .yellow_icon{
    display: inline-block;
    width: .1rem;
    height: .4rem;
    border-radius: .03rem;
    background: url(/bocm/platformjs/static/image/index/yellow22.png) center center no-repeat;
    background-size: .38rem .7rem;
   /* width: 0.04rem;
    height: 0.3rem;
    background: #F8E71C;
    box-shadow: 0 0 0.32rem 0 #F0D35B;*/
    margin-top: 0.49rem;
  }
  .zlrDate_from{
    margin-left: 0.11rem;
    font-size: 0.34rem;
    color: #333;
    vertical-align: super;
  }
  .zlrDate_detail{
    padding-left: 0.26rem;
    height: 0.68rem;
    overflow: hidden;
    padding-top: 0.23rem;
  }
  .zlrDate_photo{width: 0.54rem;height: 0.54rem;margin: auto 0;border-radius: 50%;overflow: hidden;}
  .zlrDate_photo img {width: 100%;height: 100%;}
  .zlrDate_name_c{height:0.68rem;margin-left: 0.16rem; }
  .zlrDate_name_t{font-size: 0.24rem;color: #66B2EA;}
  .zlrDate_name_b{font-size: 0.24rem;color: #999;line-height: 0.34rem;}
  .zlrDate_name_line{margin:0 0 0 0.24rem;width: 0.02rem;height: 0.46rem;border-right: 0.02rem solid #DDDDDD;}
  .zlr_chx{width: 33.33%;height: 2.82rem;}
  .zlr_chx_img{width: 1.2rem;height: 1.2rem;margin: 0.32rem auto 0.16rem;border-radius: 50%;overflow: hidden;}
  .zlr_chx_img img{width: 100%;height: 100%;}
  .zlr_chx_zi{width: 100%;height: 0.34rem;font-size: 0.24rem;color: #999;text-align: center;margin: 0 auto;line-height: 0.34rem;}
  .pifa{width: 100%;height: 0.4rem;padding-left: 0.3rem;overflow: hidden;}
  .pi_icon{float: left;width: 0.3rem;height: 0.3rem;margin: .06rem 0 0 0;border-radius: 4px;line-height: 0.3rem;text-align: center;font-size: 0.24rem;color: #fff;background: #F25B4B;}
  .pi_zc{font-size: 0.28rem;  color: #F25B4B;line-height: 0.4rem;margin-left: 0.06rem;float: left;}
  .pi_price{font-size: 0.28rem;color: #4B4F63;line-height: 0.4rem;float: left;margin-left: 0.7rem;}
  .bf_more{width:7.5rem;height: 0.4rem;text-align: center;color:#666;font-size: 0.24rem;}
  .abso{position: absolute;right: 0.2rem;bottom:1.1rem;}
  .notvideo{position: absolute;right: 0.2rem;bottom:0.2rem;}
 /* video::-webkit-media-controls-fullscreen-button{ display: none; }
  video{background: #0b0b0b;}*/
</style>
