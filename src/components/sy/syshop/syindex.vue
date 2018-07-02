<template>
  <div class="container">
    <div v-title="'善源商场'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div v-if="!isLoading">
        <div class="product bg font028" id="syshop_goods_list" >
          <!--善源分类-->
          <div class="sy-shop-top sy-top-bg">善企让利，回馈爱心人士</div>
          <!--<syshop_title syTitle="善源分类" syDescr="使用积分不影响公益排名"></syshop_title>-->
          <div class=" index-nav nav-min-h bg">
            <ul class="sy-shopul" >
              <!--<a v-for="(cate, index) in cateInfo" @click="appjs('syJsbLaunchWebview', cate.touch_url)">-->
              <!--<li class="relative">-->
              <!--<div class="icon-load" v-show="!imgLoadClassify[index]['isLoaded']">加载中</div>-->
              <!--<div class="touxiang shop-touxiang"><img @load="isimgLoadClassify(index)" :src="cate.img_url" width="100%" height="100%" alt="icon"></div>-->
              <!--<div class="index-nav-fonts">{{cate.name}}</div>-->
              <!--</li>-->
              <!--</a>-->
              <li class="relative" v-for="(cate, index) in syIconList" @click="appjs('syJsbLaunchWebview',siteInfo.host + cate.url)">
                <div class="touxiang shop-touxiang"><img :src="cate.gcImage" width="100%" height="100%" alt="icon"></div>
                <div class="index-nav-fonts">{{cate.gcName}}</div>
              </li>
            </ul>
          </div>
          <!--爱心特惠begin-->
          <!--需根据数据显示不同的结构-->
          <div class="blk1"></div>
          <!--<div class="sy-shop-top sy-top-bg">使用积分不影响公益排名</div>-->
          <!--The data is greater than 2-->
          <div class="more-preferential bg hide" v-show="loveLen > 2">
            <div class="welfare-task-tit2">爱心特惠</div>
            <div class="just-no-content-exp ">积分全额购买不花一分钱</div>
            <div class="blk1 bg"></div>
            <div class=" swiper-container swiper-container1 swiper-container-horizontal swiper-container-free-mode" ref="preferential">
              <div class="swiper-wrapper" id="swiper_content">
                <ul class="swiper-slide swiper-slide-active margin-r-12" v-for="(item, index) in lovePreferential" @click="appjs('syJsbLaunchWebview', item.detail_url)">
                  <li class="relative love-w-li">
                    <div class="slide-top"><img :src="item.goods_image" width="100%" alt="加载中"><div class="inventory">{{item.goods_storage_show}}</div></div>
                    <div class="slide-bot">
                      <div class="slide-bot-tit2 tit2-auto">{{item.goods_name}}</div>
                      <div class="slide-bot-number2">{{item.boc_points_pay}}<span> 积分</span></div>
                      <div class="yuanjia">原价：<span class="number">{{item.goods_marketprice}}</span></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--The data is equal to 2-->
          <div class="more-preferential bg hide" v-if="loveLen === 2">
            <div class="welfare-task-tit2">爱心特惠</div>
            <div class="just-no-content-exp ">积分全额购买不花一分钱</div>
            <div class="blk1 bg"></div>
            <div class="index-outer-slide2">
              <ul>
                <li class="relative" v-for="(item, index) in lovePreferential" @click="appjs('syJsbLaunchWebview', item.detail_url)">
                  <div class="slide-top2 relative"><img :src="item.goods_image" alt="加载中"></div>
                  <div class="inventory inventory-2">{{item.goods_storage_show}}</div>
                  <div class="slide-bot2">
                    <div class="slide-bot-tit2 tit2-auto">{{item.goods_name}}</div>
                    <div class="slide-bot-number2">{{item.boc_points_pay}}<span> 积分</span></div>
                    <div class="yuanjia">原价：<span class="number">{{item.goods_marketprice}}</span></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--The data is equal to 1-->
          <div class="more-preferential bg hide" v-if="loveLen === 1">
            <div class="welfare-task-tit2">爱心特惠</div>
            <div class="just-no-content-exp ">积分全额购买不花一分钱</div>
            <div class="blk1 bg"></div>
            <div class="shop-numberbox bg ">
              <div class="shop-number-list hide" v-for="(item, index) in lovePreferential" @click="appjs('syJsbLaunchWebview', item.detail_url)">
                <div class="shop-number-list-L relative" ><img :src="item.goods_image" widt="100%" alt="加载中"><div class="inventory inventory-3">{{item.goods_storage_show}}</div></div>
                <div class="shop-number-list-R">
                  <div class="shop-number-list-R-top">{{item.goods_name}}</div>
                  <div class="shop-number-list-R-bot-box">
                    <div class="slide-bot-number2">{{item.boc_points_pay}}<span> 积分</span></div>
                    <div class="yuanjia">原价：<span class="number">{{item.goods_marketprice}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Data is empty-->
          <!--爱心特惠end-->
          <!--最多优惠begin-->
          <div id="superfluous" v-show="loveLen" class="blk1"></div>
          <div class="more-preferential bg hide">
            <div class="welfare-task-tit2">最多优惠</div>
            <div class="blk1 bg"></div>
            <div class="index-outer-slide2 most-prefer-min-h">
              <ul>
                <li class="relative most-prefer-li-h" v-for="item in mostFavorable" @click="appjs('syJsbLaunchWebview', item.detail_url)">
                  <div class="slide-top2"><img :src="item.goods_image" width="100%" alt="MostFImg"></div>
                  <div class="slide-bot2">
                    <div class="slide-bot-tit2 tit2-auto">{{item.goods_name}}</div>
                    <div class="slide-bot-number2">{{item.boc_points_pay}}<span> 积分 + ￥{{item.goods_price}}</span></div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="line"></div>
            <div class="slide-more" @click="appjs('syJsbLaunchWebview', mostFavorableMore)">查看更多&gt;</div>
          </div>
          <!--最多优惠end-->
          <!--最新上架begin-->
          <div class="blk1"></div>
          <div class="more-preferential bg hide">
            <div class="welfare-task-tit2">最新上架</div>
            <div class="blk1"></div>
            <div class="index-outer-slide2 most-prefer-min-h">
              <ul>
                <li class="newest-li-h" v-for="item in newest" @click="appjs('syJsbLaunchWebview', item.detail_url)">
                  <div class="slide-top2"><img :src="item.goods_image" alt="加载中…"></div>
                  <div class="slide-bot2">
                    <div class="slide-bot-tit2 tit2-auto">{{item.goods_name}}</div>
                    <div class="slide-bot-number2"><i>{{item.boc_points_pay}}</i><span> 积分 + ￥{{item.goods_price}}</span></div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="line"></div>
            <div class="slide-more" @click="appjs('syJsbLaunchWebview', newestMore)">查看更多&gt;</div>
          </div>

          <!--最新上架end-->
          <!--最多销量begin-->
          <div class="blk1"></div>
          <div class="more-preferential bg more-preferential">
            <div class="welfare-task-tit2">最多销量</div>
            <div class="blk1 bg"></div>
            <div class="shop-numberbox bg">
              <!--'https://apit.17shanyuan.com/1.0/rs-goods/redirect/redirect-goods-detail?goodsCommonid='+item.goods_commonid-->
              <div class="shop-number-list hide" v-for="item in mostSale" @click="appjs('syJsbLaunchWebview',item.detail_url )">
                <div class="shop-number-list-L"><img :src="item.goods_image" alt="加载中…"></div>
                <div class="shop-number-list-R">
                  <div class="shop-number-list-R-top">{{item.goods_name}}</div>
                  <div class="shop-number-list-R-bot-box">
                    <div class="shop-number-list-R-bot"><span class="main-color">{{item.boc_points_pay}}</span>积分+￥{{item.goods_price}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="line"></div>
            <div class="slide-more" @click="appjs('syJsbLaunchWebview', mostSaleMore)">查看更多&gt;</div>
          </div>
          <!--最多销量end-->
          <!--一起善源begin-->
          <div class="blk1"></div>
          <div class="more-preferential bg hide">
            <div class="welfare-task-tit2">一起善源</div>
            <div class="just-no-content-exp ">分行推荐入驻善品，联合善企回馈爱心</div>
            <div class="sy-area bg">
              <ul class=" hide" v-for="item in syArea">
                <li class="li-first li-last" @click="appjs('syJsbLaunchWebview', syAreaMore)"><img :src="item.area_img_url" alt="**馆"></li>
                <li class=" li-no-cont" :class="{notext:k.isOff}" v-for="k in item.e_list" @click="!k.isOff && appjs('syJsbLaunchWebview', k.goods_url)">
                  <img :src="k.company_logo_url" alt="虚位以待">
                  <div class="sy-area-name">{{k.company_name}}</div>
                </li>
              </ul>
            </div>
            <div class="slide-more" @click="appjs('syJsbLaunchWebview', syAreaMore)">查看更多&gt;</div>
          </div>
          <!--一起善源end-->
          <div class="blk1"></div>

          <!--善源商场end-->
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import appjs from '../../appjs/appjs.js'
  import syshopTitle from './syshop_title.vue'
  import loading from '../../loading/loading.vue'
  export default {
    data () {
      return {
        syIconList:[],
        isLoading: true,
        cateInfo: [],
        loveLen: 0,
        mostFavorable: {},
        mostFavorableMore:'',
        lovePreferential: [],
        newest: {},
        newestMore: '',
        mostSale: {},
        mostSaleMore: '',
        syArea: [],
        syAreaMore: '',
        imgLoadClassify:[],
        imgLoadLove: [],

      }
    },
    components: {
      'syshop_title': syshopTitle,
      'sy-loading': loading
    },
    created: function () {
      this.getData()
    },
    mounted: function () {
      this._appjs.syJsbShowToolBar('true')
      this._appjs.syJsbShowTitleBar('true')
    },
    methods: {
      getData () {
        this.$http.get(this.siteInfo.host + '/api/index.php?act=syshop&op=index')
          .then(res => {
            this.mostFavorable = res.data.content.favorable_list
            this.mostFavorableMore = res.data.content.favorable_list_more_url
            this.lovePreferential = res.data.content.love_list
            /*var loveArry = [] //this.lovePreferential 对象长度
            for(let k in this.lovePreferential){
                loveArry.push(k)
            }
            console.log(loveArry.length)
             this.loveLen = loveArry.length*/
            this.loveLen = this.lovePreferential.length //爱心特惠数据长度
            this.isLoading = false
            this.newest = res.data.content.latest_list
            this.newestMore = res.data.content.latest_list_more_url
            this.mostSale = res.data.content.sale_list
            this.mostSaleMore = res.data.content.sale_list_more_url
            this.syAreaMore = res.data.content.area_list_more_url
            this.syArea = res.data.content.area_list
            for(let k in this.syArea){
              let e_list_len = this.syArea[k].e_list.length
              let e_list = this.syArea[k].e_list
              if( e_list_len <3 && e_list_len ==2){
                e_list.push({ "isOff": true,"company_name": "虚位以待", "goods_url":""})
              }else if(e_list_len <2 && e_list_len ==1){
                e_list.push({ "isOff": true,"company_name": "虚位以待", "goods_url":""})
                e_list.push({ "isOff": true,"company_name": "虚位以待", "goods_url":""})
              }else if(e_list_len <1 ){
                e_list.push({ "isOff": true,"company_name": "虚位以待", "goods_url":""})
                e_list.push({ "isOff": true,"company_name": "虚位以待", "goods_url":""})
                e_list.push({ "isOff": true,"company_name": "虚位以待", "goods_url":""})
              }
            }
          }).then(() => {
          this.$nextTick(() => {
            var mySwiper = new Swiper(this.$refs.preferential, {
              initialSlide : 0,
              direction : 'horizontal',
              slidesPerView : 2.5,
              paginationClickable: true,
              spaceBetween: 15,
              freeMode: true,
              observer:true,
              observeParents:true
            })
          })
        })
        this.$http.get(this.siteInfo.host_api_j + '/rs-goods/goods/getGoodsClassListByModule?module=3').then(res => {
          this.syIconList = res.data.data.syShopClassList
        })
      },
      appjs (method, params='') {
        appjs(method, params)
      }
    }
  }
</script>
<style scoped>
  body{ padding:0; margin:0; list-style:none; width:100%;font-size:0.28rem;}
  .font028{font-size:0.28rem;}
  .linebg{background:#f4f5f6}
  .blk1{height: .2rem;}
  .relative{position:relative;}
  .icon-load{width:100%;position: absolute;margin:.46rem auto;text-align: center}
  .love-load{width:100%;position: absolute;margin:.91rem auto;text-align: center}
  .mostf-load{width:100%;position: absolute;margin:.94rem auto;text-align: center}
  .product{ height:auto; min-height:2rem; overflow: hidden; display: block; box-sizing:border-box; width:7.5rem;}
  .sy-shop-top{ padding-top:0.04rem; line-height:0.58rem; font-size:0.24rem; color:#999; text-align:center;}
  .sy-top-bg{background:#f4f6f5;}
  .welfare-task-tit2{ height:0.88rem; width:7.5rem; background:url(/bocm/platformjs/static/image/syShop/syshop_tit.png) no-repeat center 0.18rem; background-size:5.92rem 0.5rem; text-align:center; line-height:0.88rem; font-size:0.3rem;}
  .welfare-task-tit{ height:0.88rem; width:7.5rem; background:url(/bocm/platformjs/static/image/zh196.png) no-repeat center 0.2rem; background-size:3.8rem 0.5rem; text-align:center; line-height:1rem; font-size:0.3rem;}
  .just-no-content{ padding:0.24rem 0; width:7.5rem; box-sizing:border-box;}
  .just-no-content-img{ width:2rem; text-align:right; height:0.92rem; line-height:1rem; color:#f37120; font-size:0.24rem; margin:0 auto; background:url(/bocm/platformjs/static/image/zh207.png) no-repeat left center; background-size:0.81rem 0.85rem; }
  .just-no-content-exp{ line-height:0.3rem; font-size:0.24rem; color:#666; text-align:center; width:7.5rem; margin-bottom:0.4rem}
  .index-need-help .index-need-help-list3 .shop-index-need-help-list-left-price span{ font-size:0.32rem; }
  .original-price span{ text-decoration:line-through;}
  /* 头部icon*/
  .index-nav{  width:7.5rem; box-sizing:border-box; margin:0 auto; }
  .nav-min-h{min-height:4.22rem;}
  .index-nav li{ width:1.875rem; float:left; text-align:center; padding:.16rem 0 0.2rem; box-sizing:border-box; border-left:none; position:relative;}
  .index-nav ul{ overflow:hidden;}
  .index-nav li img{ width:100%; height:100%;display:block;}
  .index-nav-tit,.index-nav-fonts{ font-size:.26rem; height:.40rem; line-height:.40rem; color:#333;}
  .index-nav-fonts{ color:#666; font-size:.24rem;}
  .index-nav a{ color:#444;}
  .index-nav2 .shop-touxiang{ width:1rem; height:1rem;}
  .index-nav2 .touxiang{ width:0.8rem; height:0.8rem; display:block; margin:0 auto .12rem; border-radius:2rem; overflow:hidden;}
  .index-nav2 ul{ padding:0 0.24rem;}
  .index-nav2 li{ width:1.755rem; float:left; text-align:center; padding:.24rem 0 0.2rem; box-sizing:border-box; border-left:none;}
  .index-nav2 li span{ width:0.2rem; height:0.24rem; background:url(/bocm/platformjs/static/image/zh44.png) no-repeat center center/0.2rem 0.23rem; position:absolute; right:0.54rem; bottom:0.72rem;}
  .index-nav .sy-shopul{ padding:0.06rem 0 0.24rem; box-sizing:border-box;}
  .index-nav .sy-shopul li{ padding:0.24rem 0 0;}
  .touxiang{ width:1.2rem; height:1.2rem; display:block; margin:0 auto .12rem; border-radius:2rem; overflow:hidden;}
  /*爱心特惠*/
  .margin-r-12{margin-right:0.12rem;}
  .love-ul-h{height:3.93rem;}
  .love-w-li{width:100%;}
  /*最多优惠*/
  .most-prefer-min-h{min-height:3.92rem;height:auto!important;height:3.92rem;background:none;}
  .most-prefer-li-h{height:3.62rem;}

  /*最新上架*/
  .index-outer-slide2{ width:7.5rem; overflow:hidden;}
  .index-outer-slide2 ul{ width:7.5rem; box-sizing:border-box; padding-left:0.24rem; overflow: hidden;}
  .index-outer-slide2 ul li{ float:left; margin-right:0.24rem; width:3.38rem; margin-bottom:0.3rem;}
  .newest-li-h{height:3.62rem;}
  .slide-top2{ width:3.38rem; height: 2.36rem;}
  .slide-top2 img{ display: block; width:3.38rem; height: 2.36rem;}
  .slide-bot-tit2 { height:0.76rem; color: #333;font-size:0.28rem; margin: 0.12rem 0 0.1rem; line-height: 0.38rem; overflow : hidden;  text-overflow: ellipsis;   display: -webkit-box;  -webkit-line-clamp: 2;  -webkit-box-orient: vertical;}
  .tit2-auto{height:auto;}
  .slide-bot-number2{ color: #f31e37;font-size:0.28rem;box-sizing: content-box;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;}
  .slide-bot-number2 span{ font-size: 0.24rem; color: #333;}
  .slide-bot-number2 span>i{color: #333;}
  .slide-bot2{ width: 3.38rem; text-align:left;}
  /*最多销量*/
  .shop-numberbox{ width:100%; box-sizing:border-box;}
  .shop-number-list { margin:0 0.24rem 0.3rem;}
  .shop-number-list-L{ width:2.9rem; height:2.03rem; float:left;}
  .shop-number-list-L img{ display:block; width:100%; height:100%;}
  .shop-number-list-R{ width:3.82rem; height:2.03rem; float:right; position:relative; border-bottom:1px solid #e0e0e0;text-align:left;}
  .shop-number-list-R-top{ line-height:0.38rem; overflow : hidden;  text-overflow: ellipsis;   display: -webkit-box;  -webkit-line-clamp:3;  -webkit-box-orient: vertical;}
  .shop-number-list-R-bot-box{width: 100%; overflow: hidden; margin-top:0.1rem;}
  .shop-number-list-R-bot{  width:100%; line-height:0.5rem; font-size:0.26rem;}
  .shop-number-list-R-bot span{ font-size:0.3rem;}

  /*一起善源*/
  .just-no-content-exp{ line-height:0.3rem; font-size:0.24rem; color:#666; text-align:center; width:7.5rem; margin-bottom:0.4rem}
  .sy-area ul{ padding:0 0.24rem;box-sizing: border-box;width:100%;}
  .sy-area ul li{ width:25%; padding:0.2rem 0.24rem; box-sizing:border-box; float:left; border-bottom:1px solid #e0e0e0;border-right:1px solid #e0e0e0; text-align:center; height:1.8rem;}
  .sy-area>ul>li:last-child{border-right:none;}
  .sy-area ul .li-first{ padding: 0.2rem 0;}
  .sy-area ul li img{ display:block; width:100%;height:0.88rem;}
  .sy-area ul .li-first img{ height: 100%;}
  .sy-area-name{ line-height:0.32rem; font-size:0.24rem; color:#666; margin-top:0.08rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .sy-area ul .li-last{ border-right:none;}
  .sy-area ul:first-child li{ padding-top:0; height:1.6rem;}
  .li-no-cont{ line-height:1.3rem;color:#999999;font-size:0.24rem;}
  .li-no-cont>img{border:transparent;}
  /*虚位以待*/
  .notext{text-align:center;font-size:0.24rem;}
  .notext>img{display:none !important;border: 0!important;}
  .notext>div{color:#999;margin-top:0.46rem;text-align:center;}
  .slide-top{ width:2.8rem; height:2.03rem; overflow:hidden; margin-bottom:0.2rem; }
  .slide-top img{ display:block; width:100%; height:100%;}
  .slide-bot{ width:2.8rem; margin-bottom: 0.16rem; }
  .slide-bot-tit{line-height:0.32rem; height: 0.64rem; overflow:hidden; text-overflow:ellipsis;  font-size:0.24rem; color:#000;margin-left:0.2rem; display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
  .slide-bot-number{ height:0.5rem; line-height:0.5rem;font-size:0.32rem; color:#f41e37; margin-bottom:0.04rem; margin-left:0.14rem;}
  .index-outer-slide .slide-more div { width:2.38rem;height:2.01rem; border: 1px solid #e9e9e9; line-height:2.01rem; text-align: center; color: #666; text-align: center; font-size: 0.24rem; position:relative; left:-0.2rem;}
  .swiper-container{ height:auto; width:7.02rem; margin-left: 0.24rem; padding-right: 0.24rem;}
  .swiper-container .swiper-slide,.swiper-container .swiper-slide{ width:2.8rem; text-align:left;}
  .yuanjia{ color: #999; line-height: 0.4rem; font-size: 0.22rem;}
  .yuanjia .number{ text-decoration: line-through;}
  .slide-top2,.slide-top,.shop-number-list-L{ position:relative;}
  .inventory{ position:absolute; left:0; bottom:-0.02rem; height:0.36rem; line-height:0.36rem; width:100%; padding-left:0.24rem; color:#fff; font-size:0.24rem; box-sizing:border-box; background-image:-webkit-linear-gradient(90deg, rgba(248,170,121,1), rgba(248,170,121,0));background-image:-moz-linear-gradient(90deg, rgba(248,170,121,1), rgba(248,170,121,0));background-image:-o-linear-gradient(90deg, rgba(248,170,121,1), rgba(248,170,121,0));background-image:linear-gradient(90deg, rgba(248,170,121,1), rgba(255,255,255,0)); }
  .inventory-2{position:absolute;left:0;top:2rem;height:0.36rem; line-height:0.36rem;text-align:left; width:100%; padding-left:0.24rem;color:#fff; font-size:0.24rem;box-sizing:border-box;background-image:-webkit-linear-gradient(90deg, rgba(248,170,121,1), rgba(248,170,121,0));background-image:-moz-linear-gradient(90deg, rgba(248,170,121,1), rgba(248,170,121,0));background-image:-o-linear-gradient(90deg, rgba(248,170,121,1), rgba(248,170,121,0));background-image:linear-gradient(90deg, rgba(248,170,121,1), rgba(255,255,255,0));}
  .inventory-3{text-align:left;}
</style>

