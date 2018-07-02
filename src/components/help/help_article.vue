<template>
  <div id="help_article">
    <div v-title="app_title"></div>
    <div class="help_wrap">
      <img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/default/share_btn.png'" alt="" style="width:1rem;position: fixed;right:0.5rem;bottom:0.8rem;" v-drag @click="onShare">
      <div class="article_title">
        <p class="font34 title_a">{{article_title}}</p>
      </div>
      <div class="article_con" v-html="article_content">
      <!--<div class="article_con" id="content">-->
        <!--<p>为了更好的服务集中采购的机构、部门。善源集采版块，是大爱超市的基础上，优选产品，既要保证产品的高质量、高品质，又要能开发票，满足客户的要求。</p>-->
        <!--<img src="../../../static/image/ap42.png" alt="">-->
        <!--<p>为了更好的服务集中采购的机构、部门。善源集采版块，是大爱超市的基础上，优选产品，既要保证产品的高质量、高品质，又要能开发票，满足客户的要求。</p>-->
        <!--<img src="../../../static/image/apple.png" alt="">-->

      </div>
    </div>

    <!--分享之后再次点击分享显示图片-->
    <shared-img v-show="isShareClick" @click.native="isShareClick = false"></shared-img>
  </div>
</template>
<script>
  import Vue from 'vue'
  import share_img from '../common/shared_img.vue'
  Vue.directive('drag',function(block){
    let oW,oH;
    // 绑定touchstart事件
    block.addEventListener("touchstart", function(e) {
      let touches = e.touches[0];
      oW = touches.clientX - block.offsetLeft;
      oH = touches.clientY - block.offsetTop;
    },false);

    block.addEventListener("touchmove", function(e) {
      e.preventDefault();
      let touches = e.touches[0];
      let oLeft = touches.clientX - oW;
      let oTop = touches.clientY - oH;
      if(oLeft < 0) {
        oLeft = 0;
      }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
        oLeft = (document.documentElement.clientWidth - block.offsetWidth);
      }
      block.style.left = oLeft + "px";
      block.style.top = oTop + "px";
    },false);

    block.addEventListener("touchend",function() {
      block.removeEventListener("touchmove",null,false);
    },false);
  });
export default {
  data(){
    return {
      app_title:'',
      article_title:'',
      article_content:'',
      isShareClick:false,
    }
  },
  created(){
    this.app_title = this.$route.query.app_title
    this.getData();
  },
  components:{
    sharedImg:share_img
  },
    
  methods:{
    getData(){
      let article_id = this.$route.query.article_id
      let url = this.siteInfo.host + '/api/index.php?act=helpcenter&op=article_detail&article_id='+article_id
      this.$http.get(url).then(res => {
        let data = res.data.content.article_detail;
        this.article_title = data.article_title;
        this.article_content = data.article_content;
        this.shareText = data.article_intro;
        this.shareUrl = res.data.content.detail_url_share
        this.shareLogo = data.article_image;

      }).then(res =>{

      })
    },
    // 分享 调webview
    shareFn(){

      let shareUrl = this.shareUrl;
      let shareText = this.shareText;
      let shareTitle = this.article_title;
      let shareLogo = this.shareLogo;
      console.log(shareUrl)
//      console.log(shareText)
//      console.log(shareTitle)
//      console.log(shareLogo)
      let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
      let jsonParam = JSON.stringify(params);
      this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
    },
    // 分享
    onShare(){
      let params = this.$route.query;
      if(params.isshare == 'yes'){
        this.isShareClick = true;
      }else{
        this.shareFn()
      }
    },
  }
}

</script>
<style scoped>
  @import "/bocm/platformjs/static/css/common.css";

  .help_wrap{
    text-align: left;
    padding:0 .2rem;
    max-width:640px;
    margin:0 auto;
    background:#f7f9fa;
  }
  .article_title p{
    line-height: .52rem;
    padding:.3rem 0;
    color:#4b4f63;
  }
  .title_a{
    color:#333
  }
  .article_con{
    color:#4b4f63;
    font-weight:300;
  }
  .article_con p{
    font-size: .28rem;
    line-height: .42rem;
    color:#4b4f63;
    font-weight:300;
  }
  .article_con img{
    width:100%;
    margin: .2rem 0;
    /*width:7.5rem;*/
  }
  .article_con{
    font-size:.3rem;
    line-height: .45rem;
    color:#666;
  }
  ul{
    padding:.2rem;
    margin:0 .2rem;
  }
  li{
    list-style: disc;
    /*list-style: square;*/
  }

  ul ul{
    margin:0;
    padding:0 0 0 .2rem;
  }
  li li{
    list-style: circle;
    padding-left:.2rem;
  }
</style>
