<template>
  <div class="off-shelves">
    <div v-title="'产品详情'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition >
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="shelves-top">
          <div class="shelves-img"><img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/detail/products_xj.png'" alt=""></div>
          <div class="shelves-tip">{{productsExplain}}</div>
        </div>
        <div class="shelves-center">
          <div class="center-title">
            <span class="left"></span>
            <div class="right">您可能还在找</div>
          </div>
          <ul class="center-products">
            <li v-for="item in goodsList" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
              <div><img class="pro-img" v-lazy="item.goods_image" alt="products-img"></div>
              <h3 class="pro-title">{{item.goods_name}}</h3>
              <p class="pro-price">￥{{item.goods_price}}</p>
            </li>

          </ul>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  export default{
    data (){
      return{
        isLoading: true,
        commonId:'',
        memberId:'',
        pageTitle:'产品详情',
        productsExplain: '',
        goodsList:Object,
      }
    },
    created (){
      if(this.$route.query.publisher_id){
        this.memberId = this.$route.query.publisher_id;
      }
      if(this.$route.query.goods_commonid || this.$route.query.gc_id){
        if(this.$route.query.goods_commonid){
          this.commonId = this.$route.query.goods_commonid;
        }
        if(this.$route.query.gc_id){
          this.commonId = this.$route.query.gc_id;
        }
      }
      this.getData();
    },
    mounted (){},
    methods: {
      getData (){
        let dataurl = this.siteInfo.host + '/api/index.php?act=project&op=get_goods_list&goods_commonid='+this.commonId+'&member_id='+this.memberId;
        this.$http.get(dataurl).then((res) => {
          let codeM = res.data.code;
          let content = res.data.content;
          if (codeM == 200) {
            this.isLoading = false;
            this.goodsList = content.goods_list;
            let explain = content.title_goods_name
            this.productsExplain = "该产品已下架"
            document.title = explain;
            this._appjs.syJsbSetTitleText(explain);
//            console.log(res.data.message)
          }else if(codeM ==400){
            this.isLoading = false;
            this.goodsList = res.data.qulity_goods_list
            this.productsExplain = "该产品不存在"
            document.title = this.productsExplain;
            this._appjs.syJsbSetTitleText(this.productsExplain);
          }
        },error =>{
          console.log(error);
        })
      }
    },
    components: {
      "sy-loading":loading,
    }
  }
</script>
<style lang="scss" scoped>
  .off-shelves{
    margin-top:0.2rem;
    width: 100%;
    min-height: 13.34rem;
    background: #fff;
    .shelves-top{
      padding-top:0.8rem;
    }
    .shelves-img{
      width: 3.85rem;
      height: 2.68rem;
      margin: 0 auto;
      img{
        width: 100%;height:100%;
      }
    }
    .shelves-tip{
      margin-top: 0.32rem;
      margin-bottom: 0.8rem;
      font-size:0.32rem;
      line-height: 0.45rem;
      color: #DADEE4;
      text-align: center;
    }
    .shelves-center{
      margin-top: 0.2rem;
      .center-title{
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        padding: 0 0.3rem;
        box-sizing: border-box;
        height: 1rem;
        text-align:left;
        .left{
          margin-top: 0.27rem;
          display:inline-block;
          width: 0.06rem;
          height: 0.4rem;
          background:url(/bocm/platformjs/static/image/index/yellow22.png) center;
        }
        .right{
          margin-left: 0.1rem;
          margin-top: 0.27rem;
          font-size: 0.32rem;
          line-height: 0.45rem;
        }
      }
    }
    .center-products{
      padding: 0 0.3rem 0.34rem;
      text-align:left;
      display:flex;
      flex-flow: row wrap;
      /*justify-content: space-between;*/
      li{margin-right: 0.1rem;width: 3.4rem;margin-bottom:0.21rem;}
      li:nth-of-type(even){margin-right: 0;}
      li .pro-img{
        width: 3.4rem;
        height: 2.38rem;
        border-radius: 0.04rem;
      }
      li .pro-title{
        width: 3.4rem;
        height: 0.76rem;
        margin-top: 0.26rem;
        font-size: 0.28rem;
        line-height: 0.38rem;
        color: #4B4F63;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        overflow: hidden;
      }
      li .pro-price{
        width: 3.4rem;
        margin-top: 0.13rem;
        font-size: 0.26rem;
        color: #4A90E2;
        line-height: 0.3rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
