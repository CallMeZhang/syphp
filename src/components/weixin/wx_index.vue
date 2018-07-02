<template>
    <div class="container">
        <div v-title="'公益中国精品馆'"></div>
        <!-- 搜索框 -->
        <div class="search-content-wx">
            <form id="key_form" method="post" class="top-form-search-wx" v-on:submit.prevent="search();">
                <div class="index-search-left-wx">
                    <div class="index-search-icon-wx"></div>
                    <div class="index-search-in-wx"><input id="key" placeholder="搜索" name="key" v-model="key" ></div>
                </div>
                <div class="index-search-center-wx" @click="search()">搜索</div>
            </form>
        </div>
        <!-- 轮播图 -->
        <div v-if="bannerList.length ===1" class="swiper-container-wx">
            <div class="swiper-wrapper-wx">
                <div class="swiper-slide-wx">
                    <a :href="siteInfo.host+'/bocm/index.php?act=bocfx&op=index#/wx_special?theme_id='+bannerList[0].theme_id"><img :src="bannerList[0].theme_img_url" alt="正努力加载…"></a>
                </div>
            </div>
        </div>
        <div v-if="bannerList.length !==1" class="swiper-container swiper-container-wx" ref="wxlunbotu">
            <div class="swiper-wrapper swiper-wrapper-wx">
                <div class="swiper-slide swiper-slide-wx" v-for="item in bannerList">
                    <a :href="siteInfo.host+'/bocm/index.php?act=bocfx&op=index#/wx_special?theme_id='+item.theme_id"><img :src="item.theme_img_url" alt="正努力加载…"></a>
                </div>
            </div>
            <div class="swiper-pagination xiaochangtiao"></div>
        </div>

        <div class="interval"></div>
        <div class="logo_content">
            <div class="logo"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/logo.png'" alt="图片正在加载..."></div>
            <div class="title"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/Group1.png'" alt="图片正在加载..."></div>
        </div>
        <div class="jingping-content">
            <div class="zi">精品推荐</div>
            <a v-for="item in fineGoodsList" :href="siteInfo.host+'/bocm/index.php?act=project&op=project_detail&gc_id='+item.goods_commonid+'&goods_project_type=17'">
                <div class="jpgoods" ><img :src="item.goods_image_url" alt="图片正在加载..."></div>
            </a>

        </div>
        <div class="xinxianshangjia">
            <div class="zi">公益精选</div>
            <a v-for="(item , index) in latestGoodsList" :href="siteInfo.host+'/bocm/index.php?act=project&op=project_detail&gc_id='+item.goods_commonid+'&goods_project_type=17'">
            <div class="xxgoodslist-box">
                <div class="xxgoods">
                    <div class="jc-goods-list-left"><img :src="item.goods_image_url" alt="图片正在加载..."/></div>
                    <div :class="(index+1 == latestGoodsList.length) ? 'jc-goods-list-right jc-goods-list-right-line' : 'jc-goods-list-right'">
                        <div class="jc-goods-list-right-tit">{{item.fx_goods_name}}</div>
                        <div class="jc-goods-list-right-norm">{{item.goods_mname}}的产品已获得{{item.sale_num}}人次帮助</div>
                        <!--<div class="jc-goods-list-right-norm">关注人：{{item.supporter}}</div>-->
                        <div class="jc-goods-list-right-bot">
                            <div class="jc-goods-list-right-bot-price"><span class="jc-goods-rmb">￥</span><span class="jc-goods-number">{{item.goods_price}}</span></div>
                            <div class="free-shipping">{{item.shipping_fee}}</div>
                        </div>
                    </div>
                </div>
            </div>
            </a>
        </div>
        <wx_footer></wx_footer>
    </div>
</template>
<script >
    import Swiper from '../../../static/js/swiper-3.4.2.min'
    import footer from './footer.vue'
    export default {
        created: function () {
            this.getData();
        },
        updated: function () {
            this.$nextTick(() => {
                this.lunbo ()
            })
        },
        data () {
            return {
                bannerList:[],
                fineGoodsList:[],
                latestGoodsList:[],
                key: ''
            }
        },
        components:{
            'wx_footer': footer
        },
        methods: {
            getData () {
                this.$http.get(this.siteInfo.host + '/api/index.php?act=bocfx&op=index').then(res => {
                    this.bannerList = res.data.content.banner_list
                    this.fineGoodsList=res.data.content.fine_goods
                    this.latestGoodsList=res.data.content.latest_goods
                })
            },
            lunbo () {
                var mySwiper = new Swiper(this.$refs.wxlunbotu, {
                    initialSlide: 0,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: 2000,
                    autoplayDisableOnInteraction: false,
                    observer: true,
                    observeParents: true,
                    loop: true,
                    /* paginationBulletRender: function (mySwiper, index, className) {
                        return '<span class="' + className + '"><li>' + "</li></span>";
                    },*/
                })
            },
            search () {
                var url = this.siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index&key=' + this.key;
                window.location.href=url;
            }
        }
    }
</script>
<style>
    /*当前轮播图样式修改需去掉scoped*/
    .search-content-wx{width: 100%;height: 0.98rem;background:#f4f5f6;}
    .index-search-left-wx{ width:6.18rem; height:0.52rem; background:rgba(255,255,255,0.8);border: solid 0.02rem #ccc; border-radius:0.2rem; overflow:hidden;float: left;margin: 0.2rem 0.22rem 0.2rem 0.24rem}
    .index-search-icon-wx{width:0.44rem; height:0.52rem; background: url(/bocm/platformjs/static/image/zh35.png) no-repeat right center; background-size: 0.22rem 0.22rem;  float: left;}
    .index-search-in-wx{ float:left; padding:0.08rem 0 0 0.16rem;}
    .index-search-in-wx input{ font-size:0.24rem; height:0.4rem; width:4.3rem; line-height:0.4rem; border:none; background:rgba(0,0,0,0)}
    .index-search-center-wx{ float: right; height: 0.52rem; line-height: 0.52rem; font-size: 0.28rem; color: #666;margin:0.2rem 0.24rem 0.2rem 0;}
    .swiper-container-wx{width: 7.5rem;height: 4.5rem;}
    .swiper-slide-wx { text-align: center;font-size: 18px; background: #fff;/* Center slide text vertically */display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;
        display: flex;-webkit-box-pack: center;-ms-flex-pack: center; -webkit-justify-content: center;justify-content: center;-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;}
    .swiper-wrapper-wx img{ width:7.5rem; height:4.5rem; display:block;}
    .xiaochangtiao .swiper-pagination-bullet{width: 0.6rem;height: 0.04rem;background: rgba(255,255,255,0.3);border-radius: 0.04rem;}
    .xiaochangtiao .swiper-pagination-bullet-active{width: 0.6rem;height: 0.04rem;background:#f13e52;}
    .interval{width: 100%;height: 0.4rem;background: #f9f9f9}
    .logo_content{width:100%;height:2.9rem;background: #fff;margin-bottom: .2rem}
    .logo_content .logo {
        padding-top: .4rem;
    }
    .logo img{width: 0.96rem;height: 1rem;margin: 0}
    .title img {width: 4.04rem;height: 1rem;margin: 0 auto 0.37rem}
    .jingping-content{width: 100%;background: #f9f9f9}
    /* .zi{width: 1.46rem;height: 0.5rem;margin:0 auto 0.46rem;padding-top:0.46rem;font-family: PingFangSC-Medium; font-size: 18px; color: #666666; letter-spacing: 0;font-weight: bold;} */
    .zi{width: 100%;height: 0.5rem;margin:0 auto 0.46rem;padding-top:0.46rem;font-family: PingFangSC-Medium; font-size: 18px; text-align:center;color: #666666; letter-spacing: 0;font-weight: bold;}
    .jpgoods{width: 6.8rem;height: 3.4rem;border-radius:0.2rem;margin:0 auto 0.41rem;box-shadow: 0 0.08rem 0.16rem 0 rgba(0,0,0,0.12)}
    .jpgoods img{width:6.8rem;height: 3.4rem;border-radius:0.2rem; }
    .xinxianshangjia{background: #fff;overflow: hidden;margin-bottom: 0.98rem;}
    /*.xxgoodslist-box{width: 7.2rem; overflow: hidden;margin: 0 0.14rem 0 0.16rem}*/
    .xxgoodslist-box{overflow: hidden}
    .xxgoods{width: 7.5rem;  padding: 0.14rem 0.24rem 0;  box-sizing: border-box;  overflow: hidden;}
    .jc-goods-list-left{width: 2.24rem;  height: 1.56rem;  float: left;  margin-right: 0.3rem;  overflow: hidden;}
    .jc-goods-list-left img{display: block;  width: 100%;  height: 100%;}
    .jc-goods-list-right{ float:left; width:4.48rem; height:1.66rem; border-bottom:1px solid #e0e0e0; position:relative;}
    .jc-goods-list-right-line{border-bottom:none;}
    /*.jc-goods-list-right-tit{ width:4.48rem;font-size:0.3rem;text-align: left;line-height:0.46rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#333;}
    .jc-goods-list-right-norm{width:4.48rem; line-height:0.34rem; font-size:0.24rem; color:#666; margin-top:0.04rem;text-align: left}
    .jc-goods-list-right-bot{ position:absolute; bottom:0.2rem; width:4.48rem; height:0.42rem;}
    .free-shipping{ position:absolute; right:0;}
    .jc-goods-list-right-bot-price{ float:left;}*/

    .jc-goods-list-right-tit{ width:4.48rem;font-size:0.3rem;text-align: left; line-height:0.46rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#333;}
    .jc-goods-list-right-norm{width:4.48rem; line-height:0.34rem; font-size:0.22rem;text-align: left; color:#666; margin-top:0.01rem;overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
    .jc-goods-list-right-bot{ position:absolute;left: -0.03rem; bottom:0.02rem; width:4.48rem; height:0.42rem;}
    .free-shipping{ position:absolute; right:0;}
    .jc-goods-list-right-bot-price{ float:left;}
    .jc-goods-rmb{ color:#f31e37; font-size:0.28rem;}
    .jc-goods-number{ color:#f31e37; font-size:0.32rem;}
    .free-shipping{ float:right;color:#999; font-size:0.24rem; margin-top:0.1rem;}
</style>
