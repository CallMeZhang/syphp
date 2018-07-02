<template>
  <div>
    <div v-title="'商品详情'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade" v-if="isAll">
      <div v-show="!isLoading">
        <shareImg v-if="is_share" @click.native="is_share=false"></shareImg>
        <!--分享bar-->
        <shareBar v-if="isShare"></shareBar>
        <!--从订单分享-->
        <div class="oderShare" v-if="(isShare && (typekey === 'yes') && member_id!=0)">
          <div class="relative" style="height:2rem;">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/ap63res.png'" alt="" style="width:100%;">
            <div class="cen"
                 style="width:1.58rem;height:1.58rem;border-radius: .79rem;background: rgba(255,255,255,.3);top:65%;">
              <div class="cen" style="width:1.4rem;height:1.4rem;border-radius:.7rem;top:50%;overflow: hidden">
                <img :src="member_idUrl" alt="" class="cen"
                     style="width:1.46rem;height:1.46rem;border-radius:.73rem;border:none;overflow: hidden;top:50%">
              </div>
            </div>
          </div>
          <div class="text-center" style="padding:0.4rem 0 0.5rem;font-size:.3rem;color:#606060">
            我在一起善源平台购买了好东东，物美价廉还能献爱心
          </div>
        </div>
        <!--主体内容-->
        <div class="wrapper" @click="isService = false">
          <div class="header">
            <!--公告 延迟发货-->
            <!--<div style="left:0;top:0;width:100%;font-size:.28rem;z-index: 9999999;position: absolute;" v-if="showNotify">
              <div id="gongao">
                <div class="hide">
                  <div class="gonggao-left"></div>
                  <div id="scroll_div" class="scroll_div">
                    <div style="width:30000px">
                      <div id="scroll_begin" style="min-width:6.5rem;">{{show_notify_msg}}</div>
                      <div id="scroll_end"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>-->
            <!--公告 延迟发货 商品售罄 固定位置提示-->
            <div class="gonggao-con clearfix" v-if="isSyShopSellOut">
              <div class="con-right2" >产品已售罄</div>
            </div>
            <div v-else>
              <div v-show="showNotify">
                <div class="gonggao-con clearfix">
                  <div class="con-left"></div>
                  <div class="con-right" >{{ show_notify_msg }}</div>
                </div>
              </div>
            </div>

            <div class="banner">
              <img v-lazy="goods_common_info.goods_image" alt="banner">
            </div>
            <div class="goodsTitle">{{goods_common_info.goods_name}}</div>
            <div class="priceTitle" v-show="goods_info.fund_fee != '0.00'">
              【购买此商品，善企{{seller_info.company_abbreviation == ''?seller_info.member_truename:seller_info.company_abbreviation}}将额外捐赠 <span>{{goods_info.fund_fee}}</span>元】
            </div>
            <div v-show="goods_info.fund_fee == '0.00'" style="height:.23rem;"></div>
          </div>
          <div class="price">
            <!--现价-->
            <div class="goodsPrice clearfix">
              <span class="red">{{goods_info.boc_points_price}}</span> 积分 + <span
                class="red">{{goods_info.goods_price}}</span> 元
              <div class="fr jfTips" @click="isMark = true">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-tips.png'" alt="tips">
                <span style="vertical-align: middle">积分不够</span>
              </div>
            </div>
            <!--原价-->
            <div class="originalPrice">
              <span style="letter-spacing: 0.6rem">原</span>价：<span
                style="display: inline-block;width: 1.8rem;text-decoration: line-through">{{goods_info.goods_marketprice}}元</span>已为您节省<span>{{goods_info.save_money}}</span>元
            </div>
            <!--已销售-->
            <div class="haveSale clearfix">
              <span style="letter-spacing: 0.6rem">已</span>售：<span
                style="display: inline-block;width: 1.8rem;">{{goods_info.goods_salenum}}{{goods_common_info.unit}}</span>还剩<span>{{goods_info.goods_storage}}{{goods_common_info.unit}}</span>
              <div class="fr xg" v-if="goods_info.max_buy_num != 0">
                每人限购<span>{{goods_info.max_buy_num}}</span>{{goods_common_info.unit}}
              </div>
            </div>
            <!--配送-->
            <div class="distribution clearfix">
              <span
                  style="letter-spacing: 0.6rem">配</span>送：<span>{{(goods_common_info.shipping_fee == '免运费' || goods_common_info.shipping_fee =='0.00元')? '免运费' :('运费 '+ goods_common_info.shipping_fee)}}</span>
              <!--<div class="fr" style="color: #818C9E;"><span>12月12日</span>后发货</div>-->
              <div class="nodis fr">{{goods_common_info.buy_area}}</div>
            </div>
            <!--产品认证-->
            <div class="certification clearfix" v-if="goods_cert_info">
              <span class="fl">产品认证：</span>
              <div class="renzheng fl">
                <div class="item" v-for="item in goods_cert_info"
                     @click="getCardInfo(item.goods_cert_image,item.goods_cert_no)">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-dg.png'" alt="对勾">
                  <span>{{item.goods_cert_type | getName}}</span>
                </div>
              </div>
            </div>
            <!--优惠券-->
            <div class="coupon" @click="isVoucher= true" v-if="couponItem.length">
              <span style="letter-spacing: 0.1rem">优惠券</span>：
              <div class="item" v-for="item in couponItem">
                <div>满{{item.voucher_t_limit}}减{{item.voucher_t_price}}</div>
              </div>
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-aow.png'" alt="箭头">
            </div>
          </div>
          <div class="line"></div>
          <div class="brand">
            <div class="brandTitle">
              <img v-lazy="seller_info.member_avatar" alt="品牌图标">
              <span>本产品由 {{seller_info.company_abbreviation == ''?seller_info.member_truename:seller_info.company_abbreviation}} 发货&售后</span>
            </div>
            <div class="brandNum">
              <ul class="clearfix">
                <li class="fl">
                  <p class="p1" style="width: 100%;">{{seller_info.points_total}}</p>
                  <p class="p2">商家爱心积分<span>/分</span></p>
                </li>
                <li class="fl" style="width: 1px;background:#F0F2F4;height: 0.55rem;margin-top: 0.1rem;"></li>
                <li class="fl">
                  <p class="p1" style="width: 100%;">{{seller_info.order_total}}</p>
                  <p class="p2">回馈爱心人士<span>/人次</span></p>
                </li>
                <li class="fl" style="width: 1px;background:#F0F2F4;height: 0.55rem;margin-top: 0.1rem;"></li>
                <li class="fl">
                  <p class="p1" style="width: 100%;">{{seller_info.fee_total}}</p>
                  <p class="p2">爱心扶贫基金<span>/元</span></p>
                </li>
              </ul>
            </div>
            <div class="brandConcat clearfix">
              <div class="btn fl" @click="callPhone()">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-kf.png'">
                <span>联系商家</span>
              </div>
              <div class="btn fr"
                   @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=goods&op=syshop_store&member_id='+seller_info.member_id)">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-dp.png'">
                <span>进店逛逛</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="goodsInfo">
            <div class="allTitle">
              <span class="line"></span>
              产品详情
            </div>
            <div class="info">
              <pre style="white-space: pre-wrap;margin:0" v-text="goods_common_info.goods_body"></pre>
              <!--{{goods_common_info.goods_body}}-->
            </div>
            <div class="goodsImg">
              <img v-lazy="item.goods_image" alt="商品图片" v-for="item in goods_image_list">
            </div>
          </div>
          <div class="goodsAppraisal">
            <div class="line"></div>
            <div class="allTitle">
              <span class="line"></span>
              评价
              <div class="all fr" @click="_appjs.syJsbLaunchWebview(more_evaluate_url)" v-if="evaluate_num">
                全部 <span>{{evaluate_num}}</span> 条评价 <img
                  :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-aow.png'" alt="">
              </div>
            </div>
            <div v-if="!evaluate_num" style="height: 2rem;line-height: 1.4rem;font-size: 0.26rem;color: #B1B8C4;">还没有买家发表评论</div>
            <div class="appraisalContent" v-if="evaluate_num">
              <div class="item" v-for="item in evaluate_list">
                <div class="itemTitle clearfix">
                  <img class="tou fl" v-lazy="item.face" alt="头像">
                  <div class="name fl">
                    <p class="p1">{{item.show_name}}</p>
                    <p class="p2">{{item.geval_addtime}}</p>
                  </div>
                  <div class="redXin fr">
                    <img :src="item.geval_score_image" alt="评分">
                  </div>
                </div>
                <div class="ml">
                  <div class="itemFont">
                    <p>{{item.geval_content}}</p>
                  </div>
                  <div class="itemImg">
                    <div class="img"
                         @click="getBigImg(0,item.geval_large_image_url,item.geval_large_image2_url,item.geval_large_image3_url)"
                         v-if="item.geval_image_url">
                      <img v-lazy="item.geval_image_url">
                    </div>
                    <div class="img"
                         @click="getBigImg(1,item.geval_large_image_url,item.geval_large_image2_url,item.geval_large_image3_url)"
                         v-if="item.geval_image2_url">
                      <img v-lazy="item.geval_image2_url">
                    </div>
                    <div class="img"
                         @click="getBigImg(2,item.geval_large_image_url,item.geval_large_image2_url,item.geval_large_image3_url)"
                         v-if="item.geval_image3_url">
                      <img v-lazy="item.geval_image3_url">
                    </div>
                  </div>
                  <div class="itemRepeat" v-if="item.reply_list.length">
                    <div class="store">
                      <div class="clearfix">
                        <p class="fl s">商家<span>回复</span>:</p>
                        <p class="fr t">{{item.reply_list[0].addtime}}</p>
                      </div>
                      <p class="f">{{item.reply_list[0].content}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="shopHot" v-if="noData">
            <div class="line"></div>
            <div class="allTitle">
              <span class="line"></span>
              店内推荐
            </div>
            <div class="goodsList">
              <ul class="clearfix">
                <li class="fl" v-for="item in hot_goods_list" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                  <img v-lazy="item.goods_image" alt="商品图片">
                  <div class="font">{{item.goods_name}}</div>
                  <div class="jfPrice">
                    <span>{{item.boc_points_price}}</span>积分+<span>{{item.goods_price}}</span>元
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <syfoot></syfoot>
          <div style="width: 100%;height: 1rem;background:#f4f6f5;"></div>
        </div>
        <!--加购-->
        <div class="addShop iphonex-padding-bottom">
          <!--app内加购样式-->
          <div v-if="!isShare">
            <div v-if="isSyShopSellOut">
              <div class="addLeft">
                <div class="item" @click="isService = !isService">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-bkf.png'" alt="">
                  <p>咨询</p>
                </div>
                <div class="sline"></div>
                <div class="item" @click="getWishCar()">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-car.png'" alt="">
                  <p>心愿单</p>
                  <!--小红点-->
                  <span v-show="isRedPoint"></span>
                </div>
              </div>
              <div class="addRight">
                <div class="btn orange" style="background: rgb(218, 222, 228);">加入心愿单
                  <!--<transition name="add" @before-enter="isAddOne = true" @after-enter="isShow=false"
                              @after-leave="isRedPoint = true">
                    <span v-if="isShow">+1</span>
                  </transition>-->
                </div>
                <div class="btn blue" style="background: rgb(218, 222, 228);">已售罄</div>
              </div>
            </div>
            <div v-else>
              <div class="addLeft">
                <div class="item" @click="isService = !isService">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-bkf.png'" alt="">
                  <p>咨询</p>
                </div>
                <div class="sline"></div>
                <div class="item" @click="getWishCar()">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-car.png'" alt="">
                  <p>心愿单</p>
                  <!--小红点-->
                  <span v-show="isRedPoint"></span>
                </div>
              </div>
              <div class="addRight">
                <div class="btn orange" @click="isTrue||addWishCar()" ref="orange">加入心愿单
                  <transition name="add" @before-enter="isAddOne = true" @after-enter="isShow=false"
                              @after-leave="isRedPoint = true">
                    <span v-if="isShow">+1</span>
                  </transition>
                </div>
                <div class="btn blue" @click="isTrue||getHelp()" ref="blue">立即购买</div>
              </div>
            </div>
          </div>
          <!--app外加购样式-->
          <div v-if="isShare">
            <!--底部按钮 是否是售罄状态 显示-->
            <div v-if="isSyShopSellOut">
              <div class="addLeft fl" style="width: 15%;height: 100%;">
                <div class="item" style="width: 100%;" @click="isService = !isService">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-bkf.png'" alt="">
                  <p>咨询</p>
                </div>
              </div>
              <div class="addRight fl" style="width: 85%;">
                <div class="btn blue" style="width: 90%;margin-right: 0;background: rgb(218, 222, 228);">已售罄</div>
              </div>
            </div>
            <div v-else>
              <div class="addLeft fl" style="width: 15%;height: 100%;">
                <div class="item" style="width: 100%;" @click="isService = !isService">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-bkf.png'" alt="">
                  <p>咨询</p>
                </div>
              </div>
              <div class="addRight fl" style="width: 85%;" @click="isTrue||getHelp()">
                <div class="btn blue" style="width: 90%;margin-right: 0;" ref="blue">立即购买</div>
              </div>
            </div>

          </div>
          <!--咨询-->
          <div class="ask iphonex-margin-bottom" v-if="isService">
            <a @click="callPhone()">电话联系</a>
            <a @click="callQQ()">QQ咨询</a>
          </div>
        </div>
        <!--优惠券弹层-->
        <div class="tipsMark" v-show="isVoucher" @touchmove.prevent>
        </div>
        <transition name="buy-slide">
          <div class="quan_c" v-show="isVoucher" @touchmove.prevent>
            <div class="quan_title">优惠券 <span class="quan_title_close" @click.stop="isVoucher = false">+</span></div>
            <div class="quan_title2">可领取优惠券</div>
            <div class="quan_list">
              <div class="quan_item" v-for="item in couponList">
                <div class="quan_l">
                  <div class="quan_l_t">￥ <span>{{item.voucher_t_price}}</span></div>
                  <div class="quan_l_b">满{{item.voucher_t_limit}}元可使用</div>
                </div>
                <div class="quan_r">
                  <div class="quan_r_t">{{item.voucher_t_title}}</div>
                  <div class="quan_explain"></div>
                  <div class="quan_r_b">{{item.voucher_t_start_date}}-{{item.voucher_t_end_date}}<span
                      @click="getCouponItem(item.voucher_t_id)">点击领取</span></div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <!--分享图标-->
        <div class="shareIcon iphonex-syshop-share" @click="getShare()">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-share.png'" alt="">
        </div>
        <!--tips弹窗-->
        <div class="tipsMark" v-if="isMark" @click="isMark = false" @touchmove.prevent>
          <div class="tipsContent">
            <div class="tipsTitle">积分小贴士</div>
            <div class="tipsCon">
              <p class="p1">个人如何获得公益积分？</p>
              <p class="p2 clearfix">
                <span class="fl">1.</span>
                <span class="fl span1">在大爱超市进行爱心购买：您每支付1元钱，就可以获得10积分，运费也算哦~</span>
              </p>
              <p class="p2 clearfix">
                <span class="fl">2.</span>
                <span class="fl span1">邀请好友成功加入益客俱乐部双方各奖励100积分，好友做公益你将会获得5%积分的追加奖励；</span>
              </p>
              <p class="p2 clearfix">
                <span class="fl">3.</span>
                <span class="fl span1">参加公益项目或活动：在“善源公益”板块，参与义卖、捐款，或报名参加志愿队活动，都可以获得项目指定的积分。</span>
              </p>
              <p class="p1">公益积分如何使用？</p>
              <p class="p2 clearfix">
                <span class="fl">1.</span>
                <span class="fl span1">目前在“善源商场”板块，可以使用积分抵扣指定的金额，享受双重优惠。</span>
              </p>
              <p class="p2 clearfix">
                <span class="fl">2.</span>
                <span class="fl span1">更多的积分兑换项目，还在积极筹备中，敬请期待~</span>
              </p>
            </div>
            <div class="tipsClose" @click="isMark = false">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-close.png'" alt="close">
            </div>
          </div>
        </div>
        <!--产品认证弹窗-->
        <div class="tipsMark" v-if="isAuthentication" @click="isAuthentication = false" @touchmove.prevent>
          <div class="cen" style="border-radius:.08rem;padding:.2rem;background: #fff;">
            <img v-lazy="imgPath" style="width:6rem;display: block;border:none">
            <div style="background: #fff;height:1rem;line-height: 1rem;padding-top:.1rem;font-size:.26rem;">证书编号：{{imgNo}}</div>
          </div>
        </div>
        <!--评价图片预览-->
        <div class="tipsMark" v-if="isShowBigImg" @click="isShowBigImg = false" @touchmove.prevent>
          <div class="imgSwiper">
            <mt-swipe :auto="0" :defaultIndex="defaultIndex">
              <mt-swipe-item v-if="bigImgUrl1">
                <img v-lazy="bigImgUrl1" alt="图一">
              </mt-swipe-item>
              <mt-swipe-item v-if="bigImgUrl2">
                <img v-lazy="bigImgUrl2" alt="图二">
              </mt-swipe-item>
              <mt-swipe-item v-if="bigImgUrl3">
                <img v-lazy="bigImgUrl3" alt="图三">
              </mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
        <!--立即购买弹层-->
        <div class="tipsMark" v-show="isBuy" @touchmove.prevent>
        </div>
        <transition name="buy-slide">
          <div class="goodsBuy" v-show="isBuy" @touchmove.prevent>
            <div class="goodsInfo clearfix">
              <div class="goodsImg fl">
                <img v-lazy="goods_common_info.goods_image" alt="商品图片">
              </div>
              <div class="goodsFont fl">
                <div class="goodsPrice">
                  <p class="p1"><span>{{goods_info.boc_points_price}}</span>积分+<span>{{goods_info.goods_price}}</span>元
                  </p>
                  <p class="p2">库存{{goods_info.goods_storage}}{{goods_common_info.unit}}</p>
                </div>
              </div>
              <div class="close fr" @click="isBuy=false">
                <img src="../../../../static/image/syShop/cuo.png" alt="关闭">
              </div>
            </div>
            <div class="goodsBuyItem">
              <span>购买数量</span>
              <div class="goodsNum fr">
                <div class="fl img1" @click="buyNum<=1?1:buyNum--;isCount=false"></div>
                <input type="text" v-model="buyNum">
                <div class="fl img2" @click="getAdd()"></div>
              </div>
            </div>
            <!--<form :action="this.buy_url " method="get">-->
            <!--<input type="hidden" name="cart_id[]" :value="this.goods_id + '|' + this.buyNum">-->
            <!--<input type="hidden" name="goods_project_type" :value="goods_common_info.goods_project_type">-->
            <div class="buyBtn iphonex-margin-bottom">
              <input type="button" value="确 定" @click="sureBuyNow($event)"
                     style="width: 100%;height: 100%; background: transparent;color: #fff;font-size:0.3rem;">
            </div>
            <!--</form>-->
          </div>
        </transition>
      </div>
    </transition>
    <transition name="fade" v-if="!isAll">
      <div v-show="!isLoading">
        <div class="stop">
          <div>
            <img src="../../../../static/image/syShop/icon-stop.png" alt="停售">
            <p>产品已停售</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '../../loading/loading.vue'
  import syfoot from '@/components/common/footer.vue'
  import shareBar from '@/components/common/download_app.vue'
  import wx_share from '@/assets/js/share.js'
  import shareImg from '@/components/common/shared_img.vue'
  export default{
    data(){
      return {
        isGo:false,
        is_login: false, // 是否登录
        isShare: false, // 是否显示shareBar
        isSyShopSellOut: false,//该商品是否售罄
        isLoading: false, //loading图标
        isMark: false, // 弹窗
        isAuthentication: false, // 产品认证弹窗
        isService: false, //联系客服
        isShow: false, //购物车加1动画
        isRedPoint: false, //是否显示小红点
        isAddOne: true, //是否可点击加入购物车
        isVoucher: false, //优惠券弹层
        goods_id: '', // 商品id
        goods_common_info: {}, //商品信息
        goods_info: {}, //价格信息
        seller_info: {},//卖家信息
        goods_storage: 0, // 商品库存
        goods_cert_info: {}, // 商品认证信息
        imgPath: '', //认证图片
        imgNo: '', //证书编号
        goods_image_list: [], //商品图片
        evaluate_num: '', // 评论总数
        evaluate_list: [], //评论列表
        more_evaluate_url: '', // 更多评论url
        hot_goods_list: [], //店铺推荐商品
        noData: true, // 是否显示推荐商品
        goods_commonid: '', //商品common_id
        goods_project_type: '',//商品typeid
        store_id: '', //店铺id
        couponList: [], //优惠券列表
        couponItem: [], //优惠券小
        isShowBigImg: false, //是否显示预览图片
        defaultIndex: 0, //图片索引
        bigImgUrl1: '', //大图
        bigImgUrl2: '',
        bigImgUrl3: '',
        cart_goods_num: 0, //购物车中商品数量
        new_cart_goods_num: 0, //新加入购物车的数量
        login_url: '', //登录url
        share_info: {}, //分享信息
        is_self_store: false, // 是否是本店铺
        isBuy: false, //选择商品弹层
        buyNum: 1, //购买数量
        add_cart_url: '', //加入心愿单url
        goods_cart_url: '', //跳转到心愿单url
        check_cart_new_goods: '',//更新购物车加入的产品的url
        buy_url: '', // 购买的url
        add_wish_click_num: 0, //点击购物车的次数
        is_buyed: false, //是否购买过
        isTrue: false, //移除事件
        isAll: true, //停售页
        typekey: '',//订单分享
        member_id: '', //用户id
        member_idUrl: '',     // 获取用户头像
        boc_points: '',//用户积分
        is_share: false,//app外分享提示
        showNotify: false,
        show_notify_msg: ''
      }
    },
    created(){
      this.$route.query.is_share == 'yes' ? this.isShare = true : this.isShare = false
      //is_shell_out=yes 产品售罄
      console.log(this.$route.query.is_sell_out)
      this.$route.query.is_sell_out === 'yes' ? this.isSyShopSellOut = true : this.isSyShopSellOut = false
//      获取商品id
      this.goods_id = this.$route.query.goods_id
//      获取订单分享
      this.typekey = this.$route.query.from_order
//      memberID
      this.member_id = this.$route.query.member_id
      this.getGoodsInfo()
    },
    filters: {
//      产品认证
      getName: function (val) {
        switch (val) {
          case 'organic':
            return val = '有机认证';
            break;
          case 'green':
            return val = '绿色认证';
            break;
          case 'eu':
            return val = '欧盟认证';
            break;
          case 'wgh':
            return val = '无公害认证';
            break;
        }
      }
    },
    methods: {
//      商场产品详情数据
      getGoodsInfo(){
//        订单分享
        if (this.isShare && this.member_id) {
          this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=get_member_avatar_by_member_id&member_id=' + this.member_id).then(res => {
            if (res.data.content.member_avatar) {
              this.member_idUrl = res.data.content.member_avatar
            }
          })
        }
        this.$http.get(this.siteInfo.host + '/api/index.php?act=syshop&op=goods_detail&goods_id=' + this.goods_id).then(res => {
          if (res.data.code == 200) {

            this.isAll = true
            let a = res.data.content
            this.goods_common_info = a.goods_common_info
            this.store_id = a.goods_common_info['store_id']
            this.goods_info = a.goods_info
            this.goods_commonid = a.goods_info['goods_commonid']
            this.seller_info = a.seller_info
            this.goods_storage = a.goods_info['goods_storage']
            this.goods_cert_info = a.goods_cert_info
            this.goods_image_list = a.goods_image_list
            this.cart_goods_num = a.cart_goods_num
            this.new_cart_goods_num = a.new_cart_goods_num
            this.is_login = a.is_login
            this.share_info = a.share_info
            this.is_self_store = a.is_self_store
            this.login_url = a.login_url
            this.goods_project_type = a.goods_common_info['goods_project_type']
            this.add_cart_url = a.add_cart_url
            this.goods_cart_url = a.goods_cart_url
            this.check_cart_new_goods = a.check_cart_new_goods
            this.buy_url = a.buy_url
            this.is_buyed = a.is_buyed
            this.boc_points = a.member_info['boc_points']
//          商品按钮状态
            this.goods_state = a.goods_common_info['goods_state']
            this.showNotify = a.goods_common_info.show_notify
            this.show_notify_msg = a.goods_common_info.show_notify_msg
            if (this.goods_state == '0') {
              this.$refs.orange.style.backgroundColor = '#B1B8C4'
              this.$refs.blue.style.backgroundColor = '#B1B8C4'
              this.isTrue = true
            }
//          判断购物车是否显示小红点
            a.cart_goods_num ? this.isRedPoint = true : this.isRedPoint = false
            this.getAppraisal()
            this.getHotGoods()
            this.getCoupon()
//          显示标题
            document.title = this.goods_common_info['goods_name'];
            this._appjs.syJsbSetTitleText(this.goods_common_info['goods_name'])
            //      二次分享
            setTimeout(() => {
              var shareText = this.share_info['shareText'] === null ? '暂无介绍' : this.share_info['shareText']
              var shareTittle = this.share_info['shareTitle'] || '产品详情'
              var shareLogo = this.share_info['shareLogo'] || this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png'
              var shareUrl = this.share_info['shareUrl']
              var params = {
                text: shareText,
                title: shareTittle,
                logo: shareLogo,
                url: shareUrl
              }
              wx_share(params)

            }, 10)
          } else {
            this.isAll = false
          }
        })
      },
//      商品详情评论列表数据
      getAppraisal(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=syshop&op=goods_evaluate_list&goods_commonid=' + this.goods_commonid).then(res => {
          let b = res.data.content
          this.evaluate_num = b.evaluate_num
          this.evaluate_list = b.evaluate_list
          this.more_evaluate_url = b.more_evaluate_url
        })
      },
//      商品推荐数据
      getHotGoods(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=syshop&op=get_recommend_goods&goods_commonid=' + this.goods_commonid).then(res => {
          if (res.data.code == 200) {
            this.hot_goods_list = res.data.content
          } else if (res.data.code == 404) {
            this.noData = false
          }

        })
      },
//      优惠券数据
      getCoupon(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=voucher&op=voucher_t_list_v2&store_id=' + this.store_id).then(res => {
          if (res.data.code == 200) {
            let c = res.data.content
            this.couponList = c.voucher_t_list
            this.couponItem = c.voucher_t_list.slice(0, 2)
          }
        })
      },
//      领取优惠券
      getCouponItem(id){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=voucher&op=send_voucher_v2&voucher_t_id=' + id).then(res => {
          if (res.data.code == 200) {
            this.$toast({
              message: res.data.message,
              duration: 2000
            })
          } else if (res.data.code == 460) {
            this.goTo(this.login_url)
          } else {
            this.$toast({
              message: res.data.message,
              duration: 2000
            })
          }
        })
      },
//      展示产品认证信息
      getCardInfo(imgPath, imgNo){
        this.isAuthentication = true
        this.imgPath = imgPath
        this.imgNo = imgNo
      },
//      联系商家(电话)
      callPhone(){
        if (this.seller_info.member_mobile) {
          if (this.isShare) {
            window.location.href = 'tel:' + this.seller_info.member_mobile
          } else {
            this._appjs.syJsbCallPhone(this.seller_info.member_mobile)
          }
        } else {
          this._appjs.syJsbAlert('暂无联系方式')
        }
      },
//      QQ 联系
      callQQ(){
        if (this.seller_info.member_qq) {
          this._appjs.syJsbOpenQq(this.seller_info.member_qq)
        } else {
          this._appjs.syJsbAlert("卖家还没有设置QQ客服账号!")
        }
      },
//      预览图片
      getBigImg(index, imgPath1, imgPath2, imgPath3){
        this.isShowBigImg = true
        this.defaultIndex = index
        this.bigImgUrl1 = imgPath1
        this.bigImgUrl2 = imgPath2
        this.bigImgUrl3 = imgPath3
      },
//      加入心愿单
      addWishCar(){
//        this.is_login = true
//        this.boc_points = 10000
        if (this.is_login) {
          if (this.is_self_store) {
            this._appjs.syJsbAlert("不能购买自己店铺的商品！")
          } else {
            this.isBuyed()
          }
        } else {
          this.goTo(this.login_url)
        }
      },
//      心愿单
      getWishCar(){
        (this.cart_goods_num + this.add_wish_click_num) ? this.isRedPoint = true : this.isRedPoint = false
//        this.is_login = true
        if (this.is_login) {
          this.$http.get(this.check_cart_new_goods).then(res => {
          })
          this._appjs.syJsbLaunchWebview(this.goods_cart_url)
        } else {
          this.goTo(this.login_url)
        }
      },
//      跳转登录url
      goTo(url){
        window.location.href = url
      },
//      分享
      getShare(){
        if (this.$route.query.is_share == 'yes') {
          this.is_share = true
        }
        let shareUrl = this.share_info['shareUrl'];
        let shareText = this.share_info['shareText'];
        let shareTitle = this.share_info['shareTitle'];
        let shareLogo = this.share_info['shareLogo'];
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
      },
//      立即购买
      getHelp(){
//        this.is_login = true
//        this.boc_points = 50
        if (this.is_login) {
          if (this.is_self_store) {
              this._appjs.syJsbAlert("不能购买自己店铺的商品！")
          } else {
            this.isBuy = true
            //        没有积分或者积分不足
            if (!this.boc_points || (this.goods_info['boc_points_price'] * (this.buyNum)) > this.boc_points) {
              this.buyNum=0
            }
          }
        } else {
          this.goTo(this.login_url)
        }
      },
//      增加
      getAdd(){
        //        否购买过
        if (this.is_buyed) {
          this.getAddLimit()
        } else {
          this.getAddLimit()
        }
      },
//      立即购买限购
      getAddLimit(){
        this.buyNum++
        let maxNum = Number(this.goods_info['max_buy_num'])
        let sum = this.buyNum + this.is_buyed
        if (maxNum) { //          限购
          if (sum > maxNum) {
            this.$toast("该商品每个ID限购" + maxNum + this.goods_common_info['unit'])
            this.buyNum--
          } else if (this.buyNum > this.goods_storage) {
            this.$toast("库存不足")
            this.buyNum--
            return
          } else {
            this.isShow = false
          }
        } else { //            不限购
          if (this.buyNum > this.goods_storage) {
            this.$toast("库存不足")
            if(this.goods_storage){
              this.buyNum = this.goods_storage
            }else {
              this.buyNum = 1
            }
            return
          } else {
            this.isShow = false
          }
        }
        //        没有积分或者积分不足
        if (!this.boc_points || (this.goods_info['boc_points_price'] * (this.buyNum)) > this.boc_points) {
          this.buyNum--
          this.$toast("积分不足")
          return
        }
      },
//      立即购买提交
      sureBuyNow(e){
        if (this.buyNum < 1) {
          this._appjs.syJsbAlert("购买商品数量不能小于1！")
//          e.preventDefault();
          return
        } else if (!this.boc_points || (this.goods_info['boc_points_price'] * this.buyNum) > this.boc_points) {
          this.$toast("积分不足")
//          e.preventDefault();
          return
        } else if (this.goods_storage == 0) {
          this.$toast({
            message: "库存不足！",
            duration: 2000
          })
          return
        }else if(Number(this.goods_info['max_buy_num'])){
          if((this.buyNum + this.is_buyed) > Number(this.goods_info['max_buy_num'])){
            this.$toast({
              message: "该商品每个ID限购" + Number(this.goods_info['max_buy_num']) + this.goods_common_info['unit'],
              duration: 2000
            })
            return
          }
        }
        this.isBuy = false;
//        新起webview
        let url = this.siteInfo.host + '/bocm/index.php?act=buy&op=buy_step1&cart_id=' + this.goods_id + '|' + this.buyNum + '&goods_project_type=' + this.goods_common_info.goods_project_type
        this._appjs.syJsbLaunchWebview(url)
      },
//      更新购物车中商品数量
      getUpdata(){
        this.add_wish_click_num++
        if (this.goods_storage >= Number(this.add_wish_click_num) + Number(this.cart_goods_num)) {
          this.isShow = true
          this.$http.get(this.add_cart_url).then(res => {
            if (res.data.msg == '库存不足') {
              this.isAddOne = false
            } else {
              this.isAddOne = true
            }
          }, err => {
            this.add_car_timer = setInterval(() => {
              if (this.isRedPoint) {
                if (this.cart_goods_num == 0) {
                  this.isRedPoint = false;
                }
                clearInterval(this.add_car_timer)
                this._appjs.syJsbAlert('添加心愿单失败，请稍后重试')
              }
            }, 100)
          })
        } else {
          this.isShow = false
          this.$toast("库存不足,无法加入心愿单")
        }
      },
//     加入购物车限购
      getLimit(){
//        this.is_buyed=3
        if (!this.boc_points || (this.goods_info['boc_points_price'] * (this.add_wish_click_num + 1)) > this.boc_points) {
          this.$toast("积分不足")
          return
        }
        let maxNum = Number(this.goods_info['max_buy_num'])
        if (maxNum) { //限购
          this.add_wish_click_num++
          let sum = this.add_wish_click_num + Number(this.cart_goods_num)+this.is_buyed
          if (maxNum >= sum && this.goods_storage >= sum) {
            this.isShow = true
            this.$http.get(this.add_cart_url).then(res => {
              if (res.data.msg == '库存不足') {
                this.isAddOne = false
              } else {
                this.isAddOne = true
              }
            }, err => {
              this.add_car_timer = setInterval(() => {
                if (this.isRedPoint) {
                  if (this.cart_goods_num == 0) {
                    this.isRedPoint = false;
                  }
                  clearInterval(this.add_car_timer)
                  this._appjs.syJsbAlert('添加心愿单失败，请稍后重试')
                }
              }, 100)
            })
          } else if (this.goods_storage < sum) {
            this._appjs.syJsbAlert("库存不足！")
          } else {
            this._appjs.syJsbAlert("该商品每个ID限购" + this.goods_info['max_buy_num'] + this.goods_common_info['unit'])
          }
        } else {
          this.getUpdata() //加购物车
        }
      },
//      是否购买过
      isBuyed(){
//        买过该商品（买过的数量）
        if (this.is_buyed) {
          this.getLimit()
        } else {
//          如果没有买过该商品
          this.getLimit()
        }
      }
    },
    components: {
      loading, syfoot, shareBar, shareImg
    }
  }
</script>
<style>
  .mint-swipe-indicator {
    opacity: 1;
    background: #fff;
  }

  .mint-swipe-indicator.is-active {
    background: #4A90E2;
  }
</style>
<style lang="scss" scoped>
  $bg: #4A90E2;
  $black: #4B4F63;
  $gray: #F7F9FA;
  $fz26: 0.26rem;
  $fz28: 0.28rem;
  $fz30: 0.30rem;
  $fz34: 0.34rem;
  .stop {
    height: 100%;
    width: 100%;
    background: #fff;
    position: fixed;
    div {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      img {
        width: 2.44rem;
        height: 2.26rem;
        margin-bottom: 0.64rem;
      }
      p {
        font-size: 0.32rem;
        color: #B1B8C4;
        font-weight: 300;
      }
    }
  }

  .red {
    color: #FF4B40;
    font-size: 0.48rem;
    line-height: 0.67rem;
    font-weight: 600;
  }

  .mr7 {
    margin-right: 0.7rem;
  }

  .line {
    width: 100%;
    height: 0.2rem;
    background: $gray;
  }

  .allTitle {
    height: 0.4rem;
    line-height: 0.45rem;
    font-size: 0.32rem;
    color: #4B4F63;
    font-weight: 600;
    text-align: left;
    padding: 0.3rem 0 0.3rem 0.3rem;
    .line {
      display: block;
      float: left;
      height: 0.4rem;
      width: 0.06rem;
      background: #F8E71C;
      box-shadow: 0 0 16px 0 #F0D35B;
      border-radius: 0.06rem;
      margin-right: 0.1rem;
    }
    .all {
      color: #818C9E;
      font-size: $fz26;
      padding-right: 0.3rem;
      img {
        width: 0.08rem;
        height: 0.15rem;
        float: right;
        margin-top: 0.13rem;
        margin-left: 0.05rem;
      }
    }
  }

  .cen {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .wrapper {
    background: #fff;
    width: 100%;
    /*banner*/
    .header {
      position: relative;
      border-bottom: 1px solid #F0F2F4;
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
      .banner {
        width: 100%;
        height: 5.24rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsTitle {
        padding: 0.15rem 0.3rem 0;
        text-align: left;
        font-size: $fz34;
        color: $black;
        font-weight: 600;
        line-height: 0.48rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .priceTitle {
        margin-bottom: 0.23rem;
        padding: 0.08rem 0.2rem 0;
        text-align: left;
        font-size: $fz26;
        color: #F25B4B;
        line-height: 0.37rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    /*价格*/
    .price {
      padding: 0.24rem 0.3rem 0.3rem;
      text-align: left;
      & > div {
        margin-bottom: 0.28rem;
      }
      .goodsPrice {
        text-align: left;
        color: $black;
        font-size: $fz30;
      }
      .jfTips {
        img {
          width: 0.26rem;
          height: 0.26rem;
          vertical-align: middle;
        }
        span {
          color: #72C9FF;
          font-size: $fz28;
          line-height: 0.68rem;
        }
      }
      .originalPrice,
      .haveSale,
      .distribution,
      .certification,
      .coupon {
        color: $black;
        font-size: $fz28;
      }
      .haveSale {
        .xg {
          color: #F25B4B;
        }
      }
      .distribution {
        .nodis {
          margin-left: 1.4rem;
          padding-top: 0.1rem;
          text-align: justify;
          color: #818C9E;
          line-height: 0.4rem;
          font-size: $fz26;
          width: 80%;
        }
      }
      .certification {
        .renzheng {
          width: 77%;
          top: -0.12rem;
          left: 1.4rem;
        }
        .item {
          margin-bottom: 0.24rem;
          font-size: $fz28;
          color: $black;
          display: inline-block;
          &:nth-child(2n-1) {
            margin-right: 1.62rem;
          }
          img {
            width: 0.29rem;
            height: 0.29rem;
            vertical-align: text-top;
            margin-right: 0.17rem;
            float: left;
          }
        }
      }
      .coupon {
        margin-bottom: 0;
        img {
          width: 0.12rem;
          height: 0.22rem;
          float: right;
          margin-top: 0.02rem;
        }
        .item {
          text-align: center;
          height: 0.4rem;
          line-height: 0.4rem;
          /*min-width: 1.7rem;*/
          display: inline-block;
          padding: 0rem 0.1rem;
          margin-right: 0.18rem;
          color: #fff;
          font-size: $fz28;
          background: url(../../../../static/image/syShop/icon-couop.png) no-repeat center;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
      }
    }
    /*品牌*/
    .brand {
      padding: 0.28rem 0 0.3rem;
      .brandTitle {
        padding: 0 0.3rem;
        text-align: left;
        img {
          width: 1.2rem;
          height: 1rem;
          margin-right: 0.2rem;
          border: 1px solid #DADEE4;
        }
        span {
          display: inline-block;
          float: right;
          width: calc(100% - 1.5rem);
          color: #666A7F;
          font-size: $fz26;
          line-height: 0.36rem;
          text-align: justify;
          padding-top: 0.13rem;
        }
      }
      .brandNum {
        margin-top: 0.4rem;
        li {
          width: 33.1%;
          text-align: center;
          /*border-left: 1px solid #F0F2F4;*/
          &:first-child {
            border: none
          }
          p {
            width: 100%;
          }
          .p1 {
            color: $black;
            font-size: 0.34rem;
            line-height: 0.48rem;
          }
          .p2 {
            font-size: 0.24rem;
            color: #7E8CA0;
            line-height: 0.33rem;
            span {
              color: #B1B8C4;
            }
          }
        }
      }
      .brandConcat {
        margin-top: 0.3rem;
        padding: 0 0.3rem;
        .btn {
          display: inline-block;
          width: 3rem;
          height: 0.66rem;
          line-height: 0.66rem;
          border: 1px solid #DADEE4;
          border-radius: 8px;
          color: #666A7F;
          font-size: $fz28;
          img {
            width: 0.42rem;
            height: 0.42rem;
            vertical-align: middle;
            margin-right: 0.3rem;
          }
        }
      }
    }
    /*产品详情*/
    .goodsInfo {
      .info {
        color: #666A7F;
        font-size: $fz28;
        line-height: 0.48rem;
        text-align: justify;
        padding: 0 0.3rem 0.3rem;
      }
      .goodsImg {
        width: 100%;
        margin-bottom: 0.3rem;
        img {
          width: 100%;
          /*height: 5rem;*/
          display: block;
        }
      }
    }
    /*店铺推荐*/
    .shopHot {
      .goodsList {
        padding: 0 0.3rem;
        li {
          width: 3.34rem;
          text-align: left;
          margin-right: 0.2rem;
          margin-bottom: 0.4rem;
          &:nth-child(2n) {
            margin-right: 0;
          }
          img {
            width: 100%;
            height: 2.34rem;
            margin-bottom: 0.2rem;
          }
          .font {
            width: 100%;
            height: 0.74rem;
            color: $black;
            font-size: $fz26;
            line-height: 0.36rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .jfPrice {
            font-size: 0.32rem;
            color: $bg;
            line-height: 0.45rem;
          }
        }
      }
    }
  }

  /*加入心愿单*/
  .addShop {
    border-top:1px solid #F0F2F4;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    background: #fff;
    .addLeft {
      width: 34%;
      display: inline-block;
      .item {
        display: inline-block;
        width: 46%;
        text-align: center;
        img {
          width: 0.42rem;
          height: 0.4rem;
          margin-top: 0.2rem;
          margin-bottom: 0.06rem;
        }
        p {
          font-size: 0.2rem;
          color: #666666;
        }
        span {
          display: inline-block;
          width: 0.1rem;
          height: 0.1rem;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          background: red;
          position: absolute;
          top: 0.15rem;
          left: 2.2rem;
        }
      }
      .sline {
        display: inline-block;
        width: 1px;
        height: 0.48rem;
        background: #F0F2F4;
        margin-bottom: 0.1rem;
      }
    }
    .addRight {
      display: inline-block;
      width: 65%;
      float: right;
      .btn {
        display: inline-block;
        width: 45%;
        height: 0.84rem;
        line-height: 0.84rem;
        text-align: center;
        color: #fff;
        font-size: $fz28;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        margin-top: 0.08rem;
        margin-right: 0.1rem;
      }
      .blue {
        background: $bg;
      }
      .orange {
        background: #F29F27;
        position: relative;
      }
      span {
        position: absolute;
        right: 0.9rem;
        top: .2rem;
        width: .4rem;
        height: .4rem;
        font-size: .28rem;
        text-align: center;
        line-height: .4rem;
        background: red;
        color: #fff;
        border-radius: .2rem;
        transform: translate(0, -1rem) scale(1, 1);
        opacity: 1;
      }

      .add-enter-active, .add-leave-active {
        transition: all 0.3s;
      }

      .add-enter {
        transform: translate(0, 0) scale(.1, .1);
      }

      .add-leave-to {
        transform: translate(-1.8rem, -0.1rem) scale(.1, .1);
      }

    }
    /*咨询*/
    .ask {
      position: absolute;
      left: 0.1rem;
      bottom: 1.2rem;
      width: 2.2rem;
      border: 1px solid #DADEE4;
      -webkit-border-radius: 0.08rem;
      -moz-border-radius: 0.08rem;
      border-radius: 0.08rem;
      background-color: #fff;
      &::before {
        content: "";
        position: absolute;
        left: .5rem;
        bottom: -0.34rem;
        border: 0.16rem solid transparent;
        border-top: 0.18rem solid #DADEE4;
      }
      &::after {
        content: "";
        position: absolute;
        left: .5rem;
        bottom: -0.33rem;
        border: 0.16rem solid transparent;
        border-top: 0.18rem solid #fff;
      }
      a {
        display: block;
        font-size: 0.28rem;
        color: #4B4F63;
        line-height: 0.92rem;
        border-bottom: 1px solid #DADEE4;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  /*弹窗*/
  .tipsMark {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.7);
    .tipsContent {
      background: #fff;
      width: 6.5rem;
      height: 8.07rem;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      -webkit-border-radius: 16px;
      -moz-border-radius: 16px;
      border-radius: 16px;
      .tipsTitle {
        width: 100%;
        height: 0.89rem;
        line-height: 0.89rem;
        text-align: center;
        color: $black;
        font-size: $fz34;
        font-weight: 300;
        border-bottom: 1px solid rgba(218, 222, 228, 0.60);
      }
      .tipsCon {
        padding: 0 0.3rem;
        .p1 {
          color: $bg;
          font-size: $fz30;
          text-align: left;
          padding-top: 0.43rem;
          padding-bottom: 0.33rem;
        }
        .p2 {
          color: $black;
          font-size: 0.24rem;
          font-weight: 300;
          line-height: 0.4rem;
          text-align: justify;
        }
        .span1 {
          display: inline-block;
          width: 95%;
        }
      }
      .tipsClose {
        position: absolute;
        top: -0.9rem;
        right: 0.1rem;
        width: 0.6rem;
        height: 0.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  /*公告*/
  #gongao {
    height: 0.7rem;
    top: 0;
    left: 0;
    background: #ffeddb;
    padding: 0 0.24rem;
    box-sizing: border-box;
    .gonggao-left {
      height: 0.7rem;
      width: 0.62rem;
      float: left;
      background: url(/bocm/platformjs/static/image/detail/detail-inform.png) no-repeat left center;
      background-size: 0.3rem 0.31rem;
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
    }

    #scroll_begin {
      -webkit-animation: delay_scroll 20s linear 0s infinite normal;
      animation: delay_scroll 20s linear 0s infinite normal;
    }
  }

  /*分享图标*/
  .shareIcon {
    position: fixed;
    right: 0.3rem;
    top: 80%;
    width: 0.9rem;
    height: 0.9rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  /*优惠券*/
  .buy-slide-enter-active, .buy-slide-leave-active {
    transition: all 0.5s;
  }

  .buy-slide-enter, .buy-slide-leave-to {
    transform: translate(0, 100%);
  }

  .quan_c {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 9.95rem;
    background: #F7F9FA;
    z-index: 1001;
  }

  .quan_title {
    width: 100%;
    height: 0.76rem;
    padding-top: 0.3rem;
    font-size: 0.3rem;
    color: #929292;
    text-align: center;
    overflow: hidden;
    position: relative;
  }

  .quan_title_close {
    font-size: 0.7rem;
    font-weight: 300;
    transform: rotate(45deg);
    position: absolute;
    top: 0;
    right: 0.24rem;
  }

  .quan_title2 {
    font-size: 0.3rem;
    color: #4A4A4A;
    margin-left: 0.24rem;
    line-height: 0.42rem;
    text-align: left;
    margin-bottom: 0.22rem;
  }

  .quan_list {
    padding: 0 0.22rem 0.5rem 0.22rem;
    height: 8.26rem;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .quan_item {
    width: 7.06rem;
    height: 1.99rem;
    background: url("/bocm/platformjs/static/image/detail/youhuiq2.png") no-repeat;
    background-size: 7.06rem 1.99rem;
    overflow: hidden;
    margin-bottom: 0.24rem;
  }

  .quan_l {
    width: 2.5rem;
    height: 1.99rem;
    float: left;
  }

  .quan_l_t {
    margin-top: 0.42rem;
    height: 0.68rem;
    font-size: 0.32rem;
    color: #fff;
    text-align: center;
  }

  .quan_l_t span {
    font-size: 0.68rem;
    margin-left: -0.1rem;
  }

  .quan_l_b {
    width: 100%;
    text-align: center;
    margin-top: 0.1rem;
    font-size: 0.24rem;
    color: #FFF;
  }

  .quan_r {
    width: 4.56rem;
    height: 1.99rem;
    float: left;
  }

  .quan_r_t {
    margin-left: 0.2rem;
    margin-top: 0.34rem;
    font-size: 0.28rem;
    line-height: 0.33rem;
    color: #4B4F63;
    letter-spacing: -0.55px;
    text-align: left;
    width: 4.36rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .quan_r_b {
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    height: 0.45rem;
    font-size: 0.24rem;
    line-height: 0.45rem;
    color: #818C9E;
    letter-spacing: -0.55px;
    text-align: left;
  }

  .quan_r_b span {
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

  .quan_explain {
    width: 4.24rem;
    height: 0.36rem;
    margin-top: 0.2rem;
    margin-left: 0.22rem;
    line-height: 0.36rem;
    text-align: left;
    font-size: 0.24rem;
    color: #818c9e;
  }

  @-webkit-keyframes delay_scroll {
    0% {
      -webkit-transform: translateX(6.5rem);
      transform: translateX(6.5rem);
    }
    100% {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }

  @keyframes delay_scroll {
    0% {
      -webkit-transform: translateX(6.5rem);
      transform: translateX(6.5rem);
    }
    100% {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }

  /*评价*/
  .goodsAppraisal {
    .appraisalContent {
      padding-bottom: 0.24rem;
      .item {
        padding: 0.44rem 0.3rem 0;
        &:last-child {
          .ml {
            border: none;
          }
        }
        .ml {
          margin-left: 1.04rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid #F0F2F4;
        }
      }
      .itemTitle {
        .tou {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          margin-right: 0.25rem;
        }
        .name {
          text-align: left;
          .p1 {
            color: $black;
            font-size: $fz26;
            line-height: 0.37rem;
          }
          .p2 {
            color: #B1B8C4;
            font-size: $fz26;
            line-height: 0.37rem;
          }
        }
        .redXin {
          height: 0.2rem;
          img {
            height: 100%;
          }
        }
      }
      .itemFont {
        p {
          padding: 0.21rem 0;
          line-height: 0.42rem;
          font-size: $fz30;
          color: #666A7F;
          text-align: justify;
        }
      }
      .itemImg {
        text-align: left;
        .img {
          display: inline-block;
          width: 1.4rem;
          height: 1.4rem;
          margin-right: 0.2rem;
          margin-bottom: 0.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .itemRepeat {
        position: relative;
        .store {
          box-sizing: border-box;
          width: 5.92rem;
          padding: 0.1rem 0.2rem;
          background: #F6FAFF;
          border: 1px dashed #C8DDF5;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
          line-height: 0.4rem;
          z-index: 2;
          margin-top: 0.1rem;
          &:before {
            content: "";
            position: absolute;
            left: .3rem;
            top: -11px;
            border: 6px dashed transparent;
            border-bottom: 6px dashed #C8DDF5;
          }
          &:after {
            content: "";
            position: absolute;
            left: .3rem;
            top: -10px;
            border: 6px dashed transparent;
            border-bottom: 6px solid #F6FAFF;
          }
        }
        .s {
          color: #818C9E;
          line-height: 0.4rem;
          font-size: $fz28;
          span {
            color: $bg;
          }
        }
        .t {
          font-size: 0.24rem;
          color: #B1B8C4;
          line-height: 0.33rem;
        }
        .f {
          text-align: justify;
          color: #818C9E;
          line-height: 0.4rem;
          font-size: $fz28;
        }

      }
    }
  }

  /*图片预览*/
  .imgSwiper {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 0;
      -webkit-transform: translate(0, -50%);
      -moz-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
      -o-transform: translate(0, -50%);
      transform: translate(0, -50%);
      width: 100%;
    }
  }

  /*选择商品*/
  .goodsBuy {
    box-sizing: border-box;
    width: 100%;
    height: 8rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 1001;
    padding: 0.16rem 0.24rem 0.24rem;
    .goodsInfo {
      width: 100%;
      border-bottom: 1px solid #f0f2f4;
      .goodsImg {
        width: 2.7rem;
        height: 1.7rem;
        position: relative;
        margin-right: 0.3rem;
        img {
          width: 100%;
          height: 1.86rem;
          position: absolute;
          top: -0.5rem;
          left: 0;
        }
      }
      .goodsFont {
        text-align: left;
        .p1 {
          line-height: 0.48rem;
          font-size: 0.3rem;
          span {
            color: #FF4B40;
            font-size: 0.32rem;
          }
        }
        .p2 {
          line-height: 0.44rem;
          font-size: 0.28rem;
          color: #7e8ca0;
        }
      }
      .close {
        width: 0.44rem;
        height: 0.44rem;
        img {
          width: 70%;
          height: 70%;
        }
      }
    }
    .goodsBuyItem {
      width: 100%;
      height: 1.16rem;
      line-height: 1.16rem;
      text-align: left;
      border-bottom: 1px solid #f0f2f4;
      span {
        display: inline-block;
        text-align: left;
        width: 3.8rem;
        font-size: $fz28;
        color: $black;
      }
      .goodsNum {
        display: inline-block;
        height: 0.56rem;
        line-height: 0.56rem;
        margin-top: 0.3rem;
        width: 3rem;
        div {
          width: 0.62rem;
          height: 0.56rem;
          float: left;
          border: 1px solid #dadee4;
        }
        .img1 {
          background: url(/bocm/platformjs/static/image/syShop/icon-jian.png) no-repeat center;
          background-size: 50% 50%;
        }
        .img2 {
          background: url(/bocm/platformjs/static/image/syShop/icon-add.png) no-repeat center;
          background-size: 50% 50%;
        }
        input {
          font-weight: 600;
          margin: 0 0.12rem;
          height: 0.56rem;
          border: 1px solid #dadee4;
          width: 1.2rem;
          float: left;
          color: $black;
          text-align: center;
          background: none;
          outline: none;
          -webkit-appearance: none;
          -webkit-border-radius: 0;
          -moz-border-radius: 0;
          border-radius: 0;
        }
      }
    }
    .buyBtn {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      background: $bg;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
    }
  }

</style>
