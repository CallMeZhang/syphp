<template>
  <div>
    <div>
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syShop/icon-share.png'" alt="shareBtn" @click="getShare()">
    </div>
  </div>
</template>
<script>
  export default{
    props:['share_info'],
    data(){
      return{}
    },
    methods:{
      getShare(){
        let shareUrl = this.share_info['shareUrl'];
        let shareText = this.share_info['shareText'];
        let shareTitle = this.share_info['shareTitle'];
        let shareLogo = this.share_info['shareLogo'];
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
      }
    }
  }
</script>
<style scoped>
  img{
    position: fixed;
    right: .16rem;
    width: .9rem;
    height: .9rem;
    bottom: 2.5rem;
  }
</style>