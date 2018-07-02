<template>
  <div class="container" id="thanks-body">
    <div v-title="'感谢卡'" v-if="changeTitle == true"></div>
    <div v-title="'一起善源 感谢卡'" v-if="changeTitle == false"></div>
    <div class="b-line"></div>
    <div class="thanks-con">
      <div class="t-img-con">
        <div><img class="t-img" v-lazy="itemImg" alt="card.png加载失败"></div>
        <div :class="{'thanks-share':hideClass}" @click="shareImg()" v-if="showPng"><img  class="share-img" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/detail_share_w.png'" alt="share"></div>
        <div class="decoration"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/special_bg3.png'" alt="decoration.png"></div>
      </div>
      <div class="thanks-descr margin-top05">
        <p class="descr-txt">感谢 <span>{{loveMan}}</span> 奉献爱心</p>
        <p class="descr-txt">{{shareDescription}}</p>
        <p class="descr-right-txt">{{initiator}}敬上</p>
      </div>
      <div class="item-name">
        <div @click="goItem(itemProjectId)">
          <h3>{{projectName}}</h3>
          <p>{{projectIntro}}</p>
          <img class="right-j" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/gt_blue.png'" alt=">">
        </div>
      </div>
    </div>
    <p class="bottom-descr">一起善源提供平台支持</p>
    <sy-download v-if="is_download"></sy-download>
    <sy-share v-if="is_Share" @click.native="is_Share=false"></sy-share>

  </div>
</template>
<script>
  import share_img from '../../common/shared_img.vue'
  import share_top from '../../common/download_app.vue'
  export default{
    data () {
      return {
        itemsOrderSn:'',
        itemImg:'',
        loveMan:'',
        isAnonymous:'',
        projectName:'项目名称',
        projectIntro:'项目简介项目简述项目简述项目简述项目简述项目简述',
        itemProjectId:'',
        showPng:true,//分享按钮
        hideClass:false,
        changeTitle:true,//false 为：一起善源 感谢卡
        is_Share:false,
        is_download:false,
        shareDescription:'爱之花开放的地方，生命便能欣欣向荣。',
        initiator:'',
        shareItemLogo:this.siteInfo.cdn_host +'/bocm/platformjs/static/image/detail/logo_pwcn.png',
        shareAddr:'',
        shareTitle:'',
      }
    },
    created () {
      this.getData();
      if(this.$route.query.is_share == 'yes'){
        this.is_download = true
        this.showPng = false
        this.hideClass = true
        this.changeTitle = false
      }
      console.log("is_share: "+this.$route.query.is_share)
    },
    components: {
      'sy-share':share_img,
      'sy-download':share_top
    },
    methods:{
      getData(){
        this.itemsOrderSn = this.$route.query.order_sn
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_thanks_card&order_sn='+this.itemsOrderSn).then(res=>{
          let con = res.data
          if(con.code == 200){
            this.isAnonymous = con.content.isanonymous
            if(this.isAnonymous == '0'){
              this.loveMan = con.content.buyer_name//name
            }else{
              this.loveMan = '爱心人士'
            }
            this.projectName = con.content.project_name//项目名称
            this.projectIntro = con.content.project_intro //项目描述
            this.itemProjectId = con.content.public_project_id // 项目跳转id
            this.itemImg = con.content.project_thanks_image
            let initiator = con.content.project_organizer //项目发起方
            if( initiator != null){
              this.initiator = con.content.project_organizer
            }else{
              this.initiator = '善源发起方'
            }
          }else if(con.code == 400){
            this.$toast('暂无数据')
          }

          this.shareAddr = window.location.href
//          console.log(this.shareTitle)
        })
      },
      goItem(projectId){
        if(projectId == undefined){
          projectId = '38';
        }
        let url = this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_detail&project_id='+projectId
        this._appjs.syJsbLaunchWebview(url)
      },
      shareImg(){
        if(this.$route.query.is_share === 'yes'){
          this.is_Share = true
        }else{
          this.shareFn()
          this.is_download = false
        }
      },
      shareFn(){
//        document.title = '一起善源 感谢卡'
        let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=pubwel_router&op=pubwel_thanks&order_sn='+this.itemsOrderSn+'&is_share=yes'; //banner第一张图
        let shareText = "来自《"+ this.projectName +"》的感谢卡"
        let shareTitle = '爱之花开放的地方，生命便能欣欣向荣'
        let shareLogo = (this.itemImg == '' || this.itemImg == null ||this.itemImg == undefined ) ? this.shareItemLogo : this.itemImg
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
      }
    }
  }
</script>
<style lang="scss" scoped>
  #thanks-body{
    height:100%;
  }
  .b-line{
    width:100%;
    height:0.3rem;
  }
  .thanks-con{
    width:6.7rem;
    margin:0 0.4rem;
    padding-bottom:0.45rem;
    background:#fff;
    -webkit-border-radius:0.08rem;
    -moz-border-radius:0.08rem;
    border-radius: 0.08rem;
    box-shadow: 0 4px 36px 0 rgba(0,0,0,0.10);
    .t-img-con{
      position:relative;
      width:6.7rem;
      height:6.5rem;
      /*background: #f1f1f1;*/
      .t-img{
        width:100%;
        height:6.5rem;
        -webkit-border-radius:0.08rem 0.08rem 0 0;
        -moz-border-radius:0.08rem 0.08rem 0 0;
        border-radius:0.08rem 0.08rem 0 0;
      }
      .thanks-share{
        display:none;
      }
      .share-img{
        position:absolute;
        top:0.46rem;
        right:0.34rem;
        width:0.85rem;
        height:0.85rem;
      }
      .decoration{
        position:absolute;
        bottom:0;
        width:6.7rem;
        height:0.6rem;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .thanks-descr{
      padding:0 0.4rem;
      .descr-txt{
        height:0.62rem;
        line-height:0.62rem;
        font-size:0.3rem;
        color: #4B4F63;
        text-align:left;
        border-bottom: 1px solid #DEDCDC;
      }
      .descr-right-txt{
        height:1.06rem;
        line-height:1.06rem;
        text-align:right;
        font-size:0.28rem;
        color: #4B4F63;
      }
    }
    .item-name{
      position:relative;
      margin:0 0.4rem;
      width:5.9rem;
      padding:0.21rem 0.22rem 0.24rem;
      height:1.3rem;
      text-align:left;
      background: #EBF4FF;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-border-radius: 0.09rem;
      -moz-border-radius: 0.09rem;
      border-radius: 0.09rem;
      h3{
        font-size:0.3rem;
        line-height:0.42rem;
        color: #666A7F;
      }
      p{
        margin-top:0.1rem;
        width:4.99rem;
        white-space: nowrap;
        overflow:hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        font-size:0.24rem;
        line-height:0.33rem;
        color: #666A7F;
      }
      .right-j{
        position:absolute;
        top:0.51rem;
        right:0.22rem;
        width:0.15rem;
        height:0.28rem;
      }
    }
  }
  .bottom-descr{
    height:0.85rem;
    line-height:0.85rem;
    text-align:center;
    font-size:0.24rem;
    color: #B1B8C4;
  }
  .margin-top05{
    margin-top:0.5rem;
  }
</style>
