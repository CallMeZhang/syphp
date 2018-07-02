<template>
    <div class="container_jc">
        <div v-title="'逛商城'"></div>
        <!--头部轮播图-->
        <div class="banner">
            <div v-if="bannerList.length ===1" class="swiper-container-wx">
                <div class="swiper-wrapper-wx">
                    <div class="swiper-slide-wx">
                        <a :href="bannerList[0].url"><img :src="bannerList[0].theme_img" alt="正努力加载…"></a>
                    </div>
                </div>
            </div>
            <div v-if="bannerList.length !==1" class="swiper-container swiper-container-wx" ref="wxlunbotu_v31">
                <div class="swiper-wrapper swiper-wrapper-wx">
                    <div class="swiper-slide swiper-slide-wx" v-for="item in bannerList">
                        <a :href="item.url"><img :src="item.theme_img" alt="正努力加载…"></a>
                    </div>
                </div>
                <div class="swiper-pagination xiaochangtiao"></div>
            </div>
        </div>

        <!--搜索-->
        <!--<div class="search-content-wx">-->
            <!--<form id="key_form" method="post" class="top-form-search-wx" v-on:submit.prevent="search();">-->
                <!--<div class="index-search-left-wx">-->
                    <!--<div class="index-search-icon-wx"></div>-->
                    <!--<div class="index-search-in-wx"><input id="key" placeholder="搜索" name="key" v-model="key"></div>-->
                <!--</div>-->
                <!--<div class="index-search-center-wx" @click="search()">搜索</div>-->
            <!--</form>-->
        <!--</div>-->
        <!--分类-->
        <div class="line_jc"></div>
        <div class="classify">
            <div v-for="( item ,index) in moduleList">
                <a :href="item.url">
                    <div class="classify_item" >
                        <div class="img_c">
                            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/icon0'+ (index+1)+'.png'">
                        </div>
                        <div class="div_zi">{{item.module_name}}</div>
                    </div>
                </a>
            </div>
        </div>
        <div class="line_jc"></div>
        <!--甄选商品-->
        <div class="wgContent">
            <div class="zi_yuan"><div class="title_yuan">甄</div><div class="title_yuan">选</div><div class="title_yuan">商</div><div class="title_yuan">品</div></div>
            <ul class="clearfix">
                <li v-for="item in latestGoodsList">
                    <a :href="item.goods_url">
                        <div class="wgImg">
                            <img :src="item.goods_image_url" alt="正努力加载…">
                        </div>
                        <div class="wgGoodTit">
                            <p>{{item.fx_goods_name}}</p>
                        </div>
                        <div class="wgPrice">
                            <span class="fl red price">￥</span><span class="fl red">{{item.goods_price}}</span>
                            <span class="fr gray">{{item.shipping_fee}}</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <!--<div class="jc_more">点击查看更多 <img src="../../../../static/image/ap27.png" ></div>-->
        <div class="line_jc5"></div>
        <div class="footer_empty"></div>
        <wx_footer></wx_footer>
    </div>
</template>
<script>
    import footer from './wx_footer_v3.vue'
    import Swiper from '../../../../static/js/swiper-3.4.2.min'
    export default{
        data () {
            return {
                bannerList: [],
                latestGoodsList:[],
                moduleList:[],
                key:''
            }
        },
        created: function () {
            this.getDate()
        },
        updated: function () {
            this.$nextTick(() => {
                this.lunbo ()
            })
        },
        methods: {
            getDate(){
                this.$http.get(this.siteInfo.host + '/api/index.php?act=bocfx&op=mall_index').then(res => {
                    this.bannerList = res.data.content.banner_list
                    this.latestGoodsList=res.data.content.latest_goods
                    this.moduleList=res.data.content.module_list
                })
            },
            lunbo () {
                var mySwiper = new Swiper(this.$refs.wxlunbotu_v31, {
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
                var url = this.siteInfo.host + '' + this.key;
                window.location.href=url;
            }
        },
        components: {
            'wx_footer': footer
        }

    }
</script>
<style scoped>
    .container_jc{width: 7.5rem; box-sizing: border-box; margin: 0 auto;background:#fff;}
    .line_jc{width: 7.5rem;height: 0.2rem;background: #f9f9f9}
    .classify a{color:#606060}
    .zi_yuan{width: 100%;height: 0.5rem;margin:0 auto 0.46rem;padding-top:0.52rem;font-family: PingFangSC-Medium; font-size: 18px; text-align:center;color: #666666; letter-spacing: 0;font-weight: bold;}
    .title_yuan{width: 0.48rem;height: 0.48rem;border-radius: 50%;background: #606060;display: inline-block;margin-right: 0.12rem;font-size: 0.28rem;color: #fff;line-height: 0.48rem;}
    .classify{width: 7.5rem;height: 3.74rem;padding: 0.4rem 0 0.5rem 0.52rem;background: #fff;box-sizing: border-box;}
    .classify_item{width: 1.2rem;height: 1.22rem;float:left;margin:0 0.54rem 0.4rem 0;}
    .classify_item .img_c{width: 1.2rem;height: 0.98rem;}
    .classify_item img{width: 0.84rem;height: 0.84rem;margin: 0 auto 0.14rem;}
    .classify_item .div_zi{width: 1.2rem;height: 0.24rem;line-height: 0.24rem;font-size: 0.24rem;text-align: center}
    .wgContent {
        background: #fff;
        padding: 0rem 0.2rem 0.2rem 0.2rem;
        /*border-bottom: 1px solid #DDD;*/
    }
    .wgContent li {
        float: left;
        width: 49%;
        margin-bottom: 0.48rem;
    }
    .wgContent li:nth-child(2n) {
        float: right;
    }
    .wgContent .wgImg {
        position: relative;
        width: 3.44rem;
        height: 2.52rem;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .wgContent .wgImg img {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-height: 2.52rem;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        border: 0.02rem solid #eee;
    }
    .wgGoodTit {
        padding-bottom: 0.24rem;
        height: 0.88rem;
    }
    .wgGoodTit p {
        line-height: 0.4rem;
        padding-top: 0.16rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.3rem;
        color: #606060;
        text-align: left;
    }
    .wgPrice{
        /*padding-left: 0.1rem;*/
        padding-right: 0.15rem;
        height: 0.28rem;
    }
    .wgPrice .red {
        color: #F13E52;
        font-size: 0.28rem;
    }
    .wgPrice .price {
        color: #F13E52;
        height: 0.28rem;
        padding-left: 0.1rem;
        line-height: 0.28rem;
        font-size: 0.24rem;
        vertical-align: text-bottom;
    }
    .wgPrice .gray {
        color: #808080;
        font-size: 0.28rem;
    }
    .jc_more{width: 7.5rem;height:1rem;line-height: 0.34rem; font-family: PingFangSC-Regular;font-size: 0.24rem;color: #B1B1B1;background: #fff;text-align: center;}
    .jc_more img{width: 0.1rem;height: 0.2rem;}
    .line_jc5{width: 7.5rem;height: 0.5rem;background: #f9f9f9;}
    .footer_empty{width: 7.5rem;height: 0.96rem;background: #f9f9f9}
</style>
