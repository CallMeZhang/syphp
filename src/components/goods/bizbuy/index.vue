<template>
  <div>
    <div v-title="'善源甄选'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div class="collect" v-show="!isLoading">
        <div class="header clearfix">
          <div class="dwjc pubImg fl"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=common&op=bizbuy_goods_class')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/goods/dwjc_v1.png'" alt="单位集采">
          </div>
          <div class="fpmdz pubImg fr"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=bizbuy&op=biz_buy_model&buy_model=coupon')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/goods/fpmdz.png'" alt="扶贫码定制">
          </div>
          <!--暂停扶贫码下单-->
          <!--<div class="fpmdz pubImg fr" @click="alter_t()">-->
          <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/goods/fpmdz.png'" alt="扶贫码定制">-->
          <!--<div class="alter_a" v-if="isShow">-->
          <!--<div class="alter_c">-->
          <!--<div class="alter_b">提示</div>-->
          <!--<div class="alter_t">因系统维护升级，扶贫码暂停购买，具体恢复时间敬请期待。</div>-->
          <!--<div class="alter_b" @click.stop="alter_n" style="border-top: 0.02rem solid #ddd;">确定</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <div class="new" v-if="newGoods.length>0">
          <!--中秋活动banner  start-->
          <!--<div class="midautumn" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=topic&op=bizactivity')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/yunyingactivity/20170922_jicai.jpg'">
          </div>-->
          <!--end-->
          <div class="tit">
            <h3>个人选购</h3>
            <p>扶贫码可用</p>
          </div>
          <div class="newContent">
            <ul>
              <li v-for="goods in newGoods">
                <img @click="_appjs.syJsbLaunchWebview(goods.touch_url)" :src="goods.img_url">
              </li>
            </ul>
          </div>
          <div class="more"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=common&op=bizbuy_goods_class')">
            <span>全部甄选</span>
            <span class="icon"></span>
          </div>
        </div>
        <div class="goodsContetn">
          <div class="fresh" v-if="fresh.length>0">
            <div class="tit">
              <h3>生鲜</h3>
              <p>生鲜农产品&emsp;现采现发</p>
            </div>
            <div class="freshCon">
              <ul class="clearfix">
                <li class="fl" v-for="sxItem in fresh" @click="_appjs.syJsbLaunchWebview(sxItem.touch_url)">
                  <div class="pubImg">
                    <img :src="sxItem.real_image_url">
                  </div>
                  <div class="freshInfo">
                    <div class="freshTit">{{sxItem.goods_name}}</div>
                    <div class="price">￥{{sxItem.goods_price}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="fresh" v-if="food.length>0">
            <div class="tit">
              <h3>食品</h3>
              <p>办公零食&emsp;解忧小吃</p>
            </div>
            <div class="freshCon">
              <ul class="clearfix">
                <li class="fl" v-for="sxItem in food" @click="_appjs.syJsbLaunchWebview(sxItem.touch_url)">
                  <div class="pubImg">
                    <img :src="sxItem.real_image_url">
                  </div>
                  <div class="freshInfo">
                    <div class="freshTit">{{sxItem.goods_name}}</div>
                    <div class="price">￥{{sxItem.goods_price}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="fresh" v-if="gy.length>0">
            <div class="tit">
              <h3>工艺品</h3>
              <p>地方特产&emsp;礼品心意</p>
            </div>
            <div class="freshCon">
              <ul class="clearfix">
                <li class="fl" v-for="sxItem in gy" @click="_appjs.syJsbLaunchWebview(sxItem.touch_url)">
                  <div class="pubImg">
                    <img :src="sxItem.real_image_url">
                  </div>
                  <div class="freshInfo">
                    <div class="freshTit">{{sxItem.goods_name}}</div>
                    <div class="price">￥{{sxItem.goods_price}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import loading from '@/components/loading/loading.vue'
  export default {
    data () {
      return {
        isLoading: true,
        newGoods: [],
        fresh: [],
        food: [],
        gy: [],
        isShow: false
      }
    },
    components: {
      'sy-loading': loading
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData () {
        this.$http.get(this.siteInfo.host + '/api/index.php?act=bizbuy')
          .then(res => {
            this.newGoods = res.data.content[0].list
            this.fresh = res.data.content[1].list
            this.food = res.data.content[2].list
            this.gy = res.data.content[3].list
            this.isLoading = false
          })
      },
//      alter_t (){
//        /*this.$toast({
//         message: "因系统维护升级，扶贫码暂停购买，具体恢复时间敬请期待。",
//         duration: 2000
//         })*/
//        this.isShow = true;
//      },
//      alter_n(){
//        this.isShow = false;
//      }
    }
  }
</script>

<style scoped>
  .pubImg {
    width: 3.38rem;
    height: 2.4rem;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #e1e1e1;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .tit {
    padding: 0.36rem 0 0.21rem;
    text-align: center;
  }

  .tit h3 {
    font-size: 0.34rem;
    color: #606060;
    padding-bottom: 0.2rem;
  }

  .tit h3 span {
    display: inline-block;
    height: 0.35rem;
    width: 0.35rem;
    background: url("/bocm/platformjs/static/image/goods/group.png") no-repeat center;
    background-size: 0.35rem, 0.35rem;
    margin-left: 0.1rem;
    vertical-align: bottom;
  }

  .tit p {
    font-size: 0.28rem;
    color: #B1B1B1;
  }

  .header {
    background-color: #fff;
    padding: 0.44rem 0.24rem 0.54rem;
  }

  .new {
    margin-top: 0.2rem;
    background-color: #fff;
  }

  .newContent {
    padding: 0 0.24rem 0.1rem;
  }

  .newContent li {
    width: 100%;
    height: 3.4rem;
    margin-bottom: 0.24rem;
    border: 1px solid #ccc;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #e1e1e1;
  }

  .more {
    padding: 0.28rem 0;
    font-size: 0.24rem;
    color: #b1b1b1;
    border-top: 1px solid #eee;
  }

  .more .icon {
    display: inline-block;
    height: 0.2rem;
    width: 0.13rem;
    background: url("/bocm/platformjs/static/image/goods/icon02.png") no-repeat center;
    -webkit-background-size: 0.13rem, 0.2rem;
    background-size: 0.13rem, 0.2rem;
    vertical-align: middle;
    margin-left: 0.1rem;
  }

  .fresh {
    margin-top: 0.2rem;
    background-color: #fff;
    padding: 0 0.24rem 0.3rem;
  }

  .fresh .pubImg {
    -webkit-border-radius: 8px 8px 0 0;
    -moz-border-radius: 8px 8px 0 0;
    border-radius: 8px 8px 0 0;
  }

  .fresh .freshCon li {
    width: 48%;
    margin-bottom: 0.26rem;
    border: 1px solid #ddd;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    overflow: hidden;
  }

  .fresh .freshCon li:nth-child(2n) {
    float: right;
  }

  .freshTit {
    padding: 0.15rem 0.2rem;
    text-align: left;
    width: 90%;
    height: 0.65rem;
    font-size: 0.28rem;
    color: #606060;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 0.4rem;
  }

  .price {
    padding: 0.15rem 0.2rem;
    text-align: left;
    color: #f13e52;
    font-size: 0.34rem;
  }

  /*.midautumn{
    width: 7.5rem;
  }
  .midautumn > img{width: 100%;}*/
  .alter_a {
    z-index: 999;
    width: 7.5rem;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .alter_c {
    width: 5rem;
    height: 3rem;
    background: #fff;
    position: absolute;
    top: 3rem;
    left: 1.25rem;
    border-radius: 0.1rem;
  }

  .alter_t {
    width: 4rem;
    height: 1rem;
    margin: 0 auto;
    line-height: 0.3rem;
    font-size: 0.28rem;
    text-align: center;
  }

  .alter_b {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
    text-align: center;
  }
</style>
