<template>
  <div class="selectList">
    <div v-title="'甄选分类'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div class="wrapper clearfix">
        <!--搜索-->
        <div class="search clearfix">
          <div class="searchInput fl clearfix">
            <img class="icon-search fl"
                 :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/sywelfare/icon-ser.png'" alt="搜索图标">
            <input class="fl" type="text" placeholder="搜索" v-model="keyword">
            <img class="icon-close fr"
                 :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/syselection/icon-close.png'" alt="清除"
                 @click="getNone">
          </div>
          <div class="seearchFont fl" @click="getSearch()">搜索</div>
        </div>
        <!--侧边导航-->
        <div class="slideNav fl">
          <ul>
            <li :class="index == typeId?'selected':''" v-for="(item,index) in list" @click="getTab(index)">
              <span :class="index == typeId?'line':''"></span>
              {{item.gc_name}}
            </li>
          </ul>
        </div>
        <!--导航内容-->
        <div class="navContent fr">
          <div class="navWidth">
            <div class="bg" style="width: 100%;height: 0.2rem;background:#F7F9FA;"></div>
            <!--banner位-->
            <div class="navBanner">
              <img :src="imgPath" alt="banner" v-if="imgPath" @click="_appjs.syJsbLaunchWebview(imgUrl)">
              <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-banner4.jpg'" alt="banner"
                   v-if="!imgPath">
            </div>
            <!--分类商品-->
            <div class="navGoods" v-for="item in sublist">
              <div class="navTitle">{{item.gc_name}}</div>
              <div class="navGoodsList">
                <ul class="clearfix">
                  <li class="fl" @click="getInfo(i.gc_id,i.gc_name)" v-for="(i,index) in item[gc_deep3_list]">
                    <div class="tabImg">
                      <div :style="{backgroundImage:'url('+i.gc_image+')'}" style="width: 100%;height: 100%;background-size: contain;background-repeat: no-repeat;background-position: center;"></div>
                    </div>
                    <p>{{i.gc_name}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg" style="width: 100%;height: 0.5rem;background:#F7F9FA;"></div>
          </div>
        </div>
        <!--引导弹窗-->
        <div class="selectTip" v-if="showTip">
          <div class="selectTipContent">
            <div class="tipClose" @click="showTip = false">
              <img src="../../../../static/image/sywall/close_x2.png" alt="">
            </div>
            <div class="swiper-container" ref="swiper" style="height: 90%;">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="tipTitle">
                    单位集中采购新流程·步骤1
                  </div>
                  <div class="tipContent">
                    <p>单位集中采购可以在<span>产品详情页</span></p>
                    <p>点击“<span>集采清单</span>”按钮加入集采清单</p>
                    <div class="tipList">
                      <img src="../../../../static/image/syselection/icon1.png" alt="step1">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="tipTitle">
                    单位集中采购新流程·步骤2
                  </div>
                  <div class="tipContent">
                    <p>已添加的产品</p>
                    <p>可以在“<span>我的</span>”-“<span>单位集采清单</span>”中找到</p>
                    <div class="tipList">
                      <img src="../../../../static/image/syselection/icon2.png" alt="step2">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="tipTitle">
                    单位集中采购新流程·步骤3
                  </div>
                  <div class="tipContent">
                    <p>选择<span>单位集采清单</span>中的产品<span>确认采购</span></p>
                    <p>并填写订单信息提交订单</p>
                    <div class="tipList" style="height: 4.5rem;margin-top: 0.5rem;">
                      <img src="../../../../static/image/syselection/icon3.png" alt="step2">
                    </div>
                  </div>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination"></div>
            </div>
            <div class="tipAgree">
              <div class="tipDg" @click="getAgree">
                <img src="../../../../static/image/syselection/icon-dg.png" v-show="showDg">
              </div>
              <div>已知悉，不再提示</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  export default{
    data(){
      return {
        isLoading: true,
        list: [],
        sublist: [],
        typeId: '',
        imgPath: '', //banner
        keyword: '', // 搜索内容
        gclist: 'gc_deep2_list',
        gc_deep3_list: 'gc_deep3_list',
//        goodsInfo: [],
//        inputVal: '',
        imgUrl: '',
        showDg: false,
        showTip: false,
        showKey: ''
      }
    },
    components: {
      loading
    },
    created(){
      this.getData()
    },
    mounted(){
      new Swiper(this.$refs.swiper, {
        direction: 'horizontal',
        loop: true,
        pagination: '.swiper-pagination'
      })
    },
    methods: {
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=v_goods&op=select_goods_class').then((res) => {
          this.isLoading = false
          this.list = res.data.content
          let a = []
          for (var k in this.list) {
            a.push(k)
          }
//          分类id
          this.typeId = a[0]
          this.getTab(this.typeId)
        })
      },
//      tab切换
      getTab(id){
        this.typeId = id
//        二级分类
        this.sublist = this.list[this.typeId][this.gclist]
//        banner图片路径
        this.imgPath = this.list[this.typeId].img
//        点击url
        this.imgUrl = this.list[this.typeId].url
      },
//      点击获取分类id和名称
      getInfo(goodsId, goodsName){
        let url = this.siteInfo.host + '/bocm/index.php?act=goods&op=bizbuy_goods_list&goods_type=' + goodsId + ':' + goodsName
        this._appjs.syJsbLaunchWebview(url)

      },
//      清除搜索
      getNone(){
        this.keyword = ''
      },
//      搜索
      getSearch(){
        if (this.keyword == '') {
          this.$toast('请输入搜索内容')
          return
        } else {
          this._appjs.syJsbLaunchWebview(this.siteInfo.host + '/bocm/index.php?act=goods&op=bizbuy_goods_list&key='+this.keyword)
        }
      },
//      勾选
      getAgree(){
        this.showDg = !this.showDg
        if (this.showDg == true) {
          this.showTip = false
          this.showKey = 1
        } else {
          this.showTip = true
          this.showKey = 0
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  //引导弹窗
  .selectTip {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .selectTipContent {
    width: 6.5rem;
    height: 9rem;
    background: #fff;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .selectTipContent .tipTitle {
    width: 100%;
    padding: 0.22rem 0;
    text-align: center;
    font-size: 0.34rem;
    color: #4B4F63;
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
  }

  .selectTipContent .tipContent {
    padding: 0 0.4rem;
    margin-top: 0.5rem;
  }

  .selectTipContent .tipContent p {
    font-size: 0.3rem;
    color: #4B4F63;
    line-height: 0.46rem;
  }

  .selectTipContent .tipContent p span {
    color: #4A90E2;;
  }

  .tipList {
    width: 5.8rem;
    height: 3rem;
    margin-top: 1.21rem;
  }

  .tipList img {
    width: 100%;
    height: 100%;
  }

  .tipAgree {
    margin-top: 0.25rem;
  }

  .tipAgree div {
    display: inline-block;
    font-size: 0.24rem;
    color: #A1C5EF;
  }

  .tipDg {
    width: 0.3rem;
    height: 0.3rem;
    border: 1px solid #DADEE4;
    margin-right: 0.16rem;
    vertical-align: middle;
  }

  .tipDg img {
    width: 100%;
    height: 100%;
  }

  .tipClose {
    position: absolute;
    top: -0.9rem;
    right: 0.3rem;
    width: 0.6rem;
    height: 0.6rem;
  }

  .tipClose img {
    width: 100%;
    height: 100%;
  }

  .selectList {
    height: 100%;
  }

  .wrapper {
    height: 100%;
  }

  //搜索样式
  .search {
    width: 100%;
    height: 1.03rem;
    background: #fff;
    box-sizing: border-box;
    padding: 0.19rem 0.39rem 0.19rem 0.3rem;
  }

  .search .searchInput {
    height: 0.6rem;
    line-height: 0.6rem;
    width: 5.86rem;
    background: #F6F6F6;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
  }

  .search .searchInput input {
    height: 0.6rem;
    line-height: 0.6rem;
    background: #F6F6F6;
    font-size: 0.28rem;
    font-weight: 300;
    width: 4rem;
    margin-left: 0.24rem;
    color: #4B4F63;
  }

  .icon-search {
    height: 0.3rem;
    width: 0.3rem;
    margin-top: 0.15rem;
    margin-left: 0.22rem;
  }

  .icon-close {
    height: 0.28rem;
    width: 0.28rem;
    margin-top: 0.16rem;
    margin-right: 0.2rem;
  }

  .seearchFont {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.32rem;
    color: #666A7F;
    font-weight: 300;
    margin-left: 0.28rem;
  }

  //侧边栏样式
  .slideNav {
    width: 1.8rem;
    background: #fff;
    height: calc(100% - 1.03rem);
  }

  .slideNav li {
    width: 100%;
    height: 1.02rem;
    text-align: center;
    line-height: 1.02rem;
    font-size: 0.28rem;
    color: #828D9F;
    background: #fff;
  }

  .slideNav li.selected {
    background: #F7F9FA;
  }

  .selected .line {
    display: inline-block;
    height: 0.4rem;
    width: 0.08rem;
    background: #4A90E2;
    float: left;
    margin-top: 0.3rem;
  }

  //导航内容
  .navContent {
    width: calc(100% - 1.8rem);
    box-sizing: border-box;
    height: calc(100% - 1.03rem);
    overflow-x: hidden;
  }

  .navWidth {
    height: 100%;
    overflow-y: auto;
    width: 110%;
    padding-right: calc(10% + 0.18rem);
    padding-left: 0.2rem;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }

  .navBanner {
    width: 100%;
    height: 1.84rem;
    position: relative;
    overflow: hidden;
  }

  .navBanner img {
    width: 100%;
    min-height: 1.84rem;
    position: absolute;
    top: 50%;
    left: 0;
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }

  .navGoods {
    width: 100%;
  }

  .navGoods .navTitle {
    font-size: 0.28rem;
    color: #666A7F;
    padding: 0.18rem 0;
    text-align: left;
  }

  .navGoods .navGoodsList {
    width: 100%;
    background-color: #fff;
    padding-top: 0.42rem;
    padding-bottom: 0.14rem;
    box-sizing: border-box;
  }

  .navGoods .navGoodsList li {
    width: 33.3%;
    text-align: center;
    margin-bottom: 0.28rem;
  }

  .navGoods li .tabImg {
    width: 1.16rem;
    height: 1.24rem;
    margin: 0 auto 0.16rem;
    position: relative;
    overflow: hidden;
  }

  .navGoods .navGoodsList li img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .navGoods .navGoodsList li p {
    font-size: 0.24rem;
    color: #818C9E;
    line-height: 0.33rem;
  }
</style>