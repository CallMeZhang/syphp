<template>
  <div class="container">
    <div v-title="'公益中国精品馆'"></div>
    <!--头部轮播图-->
    <div class="banner">
      <div v-if="bannerList.length ===1" class="swiper-container-wx">
        <div class="swiper-wrapper-wx">
          <div class="swiper-slide-wx">
            <a :href="bannerList[0].url"><img :src="bannerList[0].theme_img" alt="正努力加载…"></a>
          </div>
        </div>
      </div>
      <div v-if="bannerList.length !==1" class="swiper-container swiper-container-wx" ref="wxlunbotu_v2">
        <div class="swiper-wrapper swiper-wrapper-wx">
          <div class="swiper-slide swiper-slide-wx" v-for="item in bannerList">
            <a :href="item.url"><img :src="item.theme_img" alt="正努力加载…"></a>
          </div>
        </div>
        <div class="swiper-pagination xiaochangtiao"></div>
      </div>
    </div>

    <!--搜索-->
    <div class="search-content-wx">
      <form id="key_form" method="post" class="top-form-search-wx" v-on:submit.prevent="search();">
        <div class="index-search-left-wx">
          <div class="index-search-icon-wx"></div>
          <div class="index-search-in-wx"><input id="key" placeholder="搜索" name="key" v-model="key"></div>
        </div>
        <div class="index-search-center-wx" @click="search()">搜索</div>
      </form>
    </div>

    <!--logo-->
    <div class="logo_content">
      <div class="logo"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/logo.png'" alt="图片正在加载...">
      </div>
      <!--<div class="title"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/Group1.png'" alt="图片正在加载..."></div>-->
      <div class="title_v2">
        <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/guan.png'">-->
        <!--<img class="animation_left" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/dh_left'">-->
        <!--<img class="animation_right" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/dh_right'">-->
        <img class="guan" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/guan.png'">
        <div class="animations">
          <img class="animation_left" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/dh_left.png'">
          <img class="animation_right" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/dh_right.png'">
        </div>
      </div>
    </div>

    <div class="contents">
      <!--五谷杂粮-->
      <div class="wugu" v-for="(item,index) in moduleList">
        <div class="wgTitle">
          <div class="sanjiao left"></div>
          <h2>{{item.module_name}}</h2>
          <div class="sanjiao right"></div>
        </div>
        <div v-if="module_banner_list[item.module_id].length ===1" class="swiper-container-wx">
          <div class="swiper-wrapper-wx">
            <div class="swiper-slide-wx">
              <a :href="module_banner_list[item.module_id][0].url"><img :src="module_banner_list[item.module_id][0].theme_img" alt="正努力加载…"></a>
            </div>
          </div>
        </div>
        <div v-if="module_banner_list[item.module_id].length !==1" class="swiper-container swiper-container-wx" :id="'wxlunbotu'+index">
          <div class="swiper-wrapper swiper-wrapper-wx">
            <div class="swiper-slide swiper-slide-wx" v-for="banneritem in module_banner_list[item.module_id]">
              <a :href="banneritem.url"><img :src="banneritem.theme_img" alt="正努力加载…"></a>
            </div>
          </div>
          <div class="swiper-pagination xiaochangtiao"></div>
        </div>
        <div class="wgContent">
          <ul class="clearfix">
            <li v-for="goodsitem in module_goods_list[item.module_id]">
              <a :href="goodsitem.url">
                <div class="wgImg">
                  <img :src="goodsitem.goods_image_url" alt="正努力加载…">
                </div>
                <div class="wgGoodTit">
                  <p>{{goodsitem.goods_name}}</p>
                </div>
                <div class="wgPrice">
                  <span class="fl red price">￥</span><span class="fl red">{{goodsitem.goods_price}}</span>
                  <span class="fr gray">{{goodsitem.shipping_fee}}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <wx_footer></wx_footer>
  </div>
</template>
<style scoped>
  .search-content-wx {
    width: 100%;
    height: 0.98rem;
    background: #f4f5f6;
  }

  .index-search-left-wx {
    width: 6.18rem;
    height: 0.52rem;
    background: rgba(255, 255, 255, 0.8);
    border: solid 0.02rem #ccc;
    border-radius: 0.2rem;
    overflow: hidden;
    float: left;
    margin: 0.2rem 0.22rem 0.2rem 0.24rem
  }

  .index-search-icon-wx {
    width: 0.44rem;
    height: 0.52rem;
    background: url(../../../../static/image/zh35.png) no-repeat right center;
    background-size: 0.22rem 0.22rem;
    float: left;
  }

  .index-search-in-wx {
    float: left;
    padding: 0.08rem 0 0 0.16rem;
  }

  .index-search-in-wx input {
    font-size: 0.24rem;
    height: 0.4rem;
    width: 4.3rem;
    line-height: 0.4rem;
    border: none;
    background: rgba(0, 0, 0, 0)
  }

  .index-search-center-wx {
    float: right;
    height: 0.52rem;
    line-height: 0.52rem;
    font-size: 0.28rem;
    color: #666;
    margin: 0.2rem 0.24rem 0.2rem 0;
  }

  .logo_content {
    width: 100%;
    height: 2.9rem;
    background: #fff;
    margin-bottom: 0.2rem;
  }

  .logo_content .logo {
    padding-top: 0.4rem;
  }

  .logo img {
    width: 0.96rem;
    height: 1rem;
    margin: 0;

  }

  .title_v2{
    width: 4.04rem;
    height: 1rem;
    margin: 0.14rem auto 0.37rem;
    /*position: relative;*/
  }
  .guan{
    display: block;
    width: 100%;
    height: 0.56rem;
  }
  .animations{
    width: 4.04rem;
    height: 0.44rem;
    position: relative;
  }
  .animation_left{
    display: inline-block;
    width: 36%;
    height: 0.44rem;
    position: absolute;
    top:0;
    left: 0;
    animation: myfirst 2s;
    -moz-animation: myfirst 2s;	/* Firefox */
    -webkit-animation: myfirst 2s;	/* Safari 和 Chrome */
    -o-animation: myfirst 2s;
  }
  .animation_right{
    display: inline-block;
    width: 64%;
    height: 0.44rem;
    position: absolute;
    top:0;
    right: 0;
    animation: mysecond 2s;
    -moz-animation: mysecond 2s;	/* Firefox */
    -webkit-animation: mysecond 2s;	/* Safari 和 Chrome */
    -o-animation: mysecond 2s;
  }
  @keyframes myfirst
  {
    0%  {transform:translateX(-3.76rem);}
    100%{transform:translateX(0);}
  }

  @keyframes mysecond
  {
    0%  {transform:translateX(3.76rem);}
    100%{transform:translateX(0);}
  }

  .wugu {
    background-color: #fff;
  }

  .sanjiao{
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 0.11rem solid transparent;
    border-right: 0.11rem solid transparent;
    border-bottom: 0.14rem solid #666;
  }

  .wgTitle {
    height: 1.54rem;
    line-height: 1.54rem;
  }

  .wgTitle h2 {
    display: inline-block;
    font-size: 0.36rem;
    color: #666;
  }

  .left {
    margin-right: 0.4rem;
  }

  .right {
    margin-left: 0.4rem;
  }

  .wgContent {
    padding: 0.4rem 0.2rem 0.2rem 0.2rem;
    border-bottom: 1px solid #DDD;
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
  }

  .wgGoodTit {
    padding-bottom: 0.24rem;
  }

  .wgGoodTit p {
    line-height: 0.4rem;
    padding-top: 0.16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.32rem;
    color: #606060;
    text-align: left;
  }
  .wgPrice{
    padding-left: 0.1rem;
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
    line-height: 0.28rem;
    font-size: 0.24rem;
    vertical-align: text-bottom;
  }

  .wgPrice .gray {
    color: #808080;
    font-size: 0.28rem;
  }

  .contents > .wugu:last-child {
    margin-bottom: 0.96rem;
  }


</style>
<script>
  import footer from '../footer.vue'
  import Swiper from '../../../../static/js/swiper-3.4.2.min'
  export default{
    data () {
      return {
        bannerList: [],
          moduleList:[],
          module_banner_list:[],
          module_goods_list:[],
          key:''
      }
    },
    created: function () {
      this.getData()
    },
    updated: function () {
      this.$nextTick(() => {
        this.lunbo ()
        this.lunbos()
      })
    },
    methods: {
      getData () {
        this.$http.get( this.siteInfo.host +'/api/index.php?act=bocfx&op=wechat_index').then(res => {
            this.bannerList = res.data.content.banner_list;
            this.moduleList = res.data.content.module_list;
            this.module_banner_list = res.data.content.module_banner_list
            this.module_goods_list = res.data.content.module_goods_list
        })
      },
        lunbo () {
            var mySwiper = new Swiper(this.$refs.wxlunbotu_v2, {
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
        lunbos () {
            var len=this.moduleList.length
            for (var i=0;i<len;i++){
                var ref_name = 'wxlunbotu' + i;
                var dom = document.getElementById(ref_name)
                new Swiper(dom, {
                    initialSlide: 0,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: 2000,
                    autoplayDisableOnInteraction: false,
                    observer: true,
                    observeParents: true,
                    loop: true,
                })
            }
        },

        search () {
            var url = this.siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index&key=' + this.key;
            window.location.href=url;
        }
    },
    components: {
      'wx_footer': footer
    }

  }
</script>
