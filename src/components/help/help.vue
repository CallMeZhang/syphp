<template>
  <div id="help_center">
    <div v-title="'公益平台客服'"></div>
    <div>
      <div class="list_title clearfix">
        <p class="fl">{{ topTitle }}</p>
        <p class="fr" style="color: #4a90e2" @click="_appjs.syJsbLaunchWebview(showAllQuestion)">全部问题</p>
      </div>
      <list-content :list="content" :text="'article_title'" :url="'url'" :right="'num'"
                    class="list_content"></list-content>
      <!--<div class="fixed bottom_bar" v-if="showBottomBar" @click="link(showAllQuestion)">-->
      <div class="fixed bottom_bar iphonex-padding-bottom" v-if="showBottomBar">
        <div class="bottom_text font28">
          <div @click="getKefu('qq')" v-if="!show7mo">
            <img src="../../../static/image/marathon/icon-kefu.png" alt="kefu">
            在线联系
          </div>
          <div @click="getKefu('7mo')" v-if="show7mo">
            <img src="../../../static/image/marathon/icon-kefu.png" alt="kefu">
            在线联系
          </div>
          <div class="line"></div>
          <div @click="getKefu('tel')">
            <img src="../../../static/image/icon-call.png" alt="kefu">
            电话联系
          </div>
        </div>
      </div>
      <div class="mask" v-if="isToast">
        <div class="toase-n">
          {{toast_content}}
          <div class="know" @click.stop="clickToast">我知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import listContent from '../list/list.vue'
  export default {
    data(){
      return {
        topTitle: '',
        content: [],
        showBottomBar: true,
        showAllQuestion: '',
        show7mo:false,
        memberInfo:{},
        isToast:false,
        toast_content:''
      }
    },
    created(){
      this.getData()
    },
    mounted(){
      this.info = this._appjs.syJsbGetAppVersion()
      if (this.info['platform'] === 'android' && this.info['version'] > 88) {
        this.show7mo = true
      }
      if (this.info['platform'] === 'ios') {
        var info = this.info['version']
        info.scope = this
        info.then(function (version) {
          if (version > 29) {
            info.scope.show7mo = true
          }
        })
      }
    },
    methods: {
      getData(){
        let hotUrl = this.siteInfo.host + '/api/index.php?act=helpcenter&op=article_list&toTop=1'
        this.$http.get(hotUrl).then(res => {
          if (res.data.code != 200) {
            console.log('接口错误');
            return
          }
          this.topTitle = res.data.content.ac_title;
          let data = res.data.content.article_list;
          this.showAllQuestion = res.data.content.category_url;
          data.forEach(item => {
//          item.url = this.siteInfo.host + '/api/index.php?act=helpcenter&op=article_list&page=0&toTop=1&a&ac_id='+item.ac_id+'&num=10&ajax=1'
            item.url = item.detail_url
//          console.log(item.url)
          });
          this.content = data
          this.memberInfo = res.data.member_info
          this.iftoast= res.data.prompt.ifshow
          this.toast_content=res.data.prompt.content
        })
      },
      getCall(){
        if( this.$route.query.is_share == 'yes'){
          window.location.href='tel:'+ '4006667308'
        }else{
          this._appjs.syJsbCallPhone('4006667308');
        }
      },
      getKefu(type){
          if(this.iftoast == "1"){
              this.isToast = true
          }else{
              switch(type){
                  case "qq":
                      this._appjs.syJsbOpenQq('3540154608');
                      break;
                  case "7mo":
                      this._appjs.syJsbm7Chat(this.memberInfo.member_truename, this.memberInfo.avatar);
                      break;
                  case "tel":
                      this.getCall();
                      break;
              }
          }
      },
      clickToast(){
          this.isToast = false
      }
    },
    components: {
      'list-content': listContent
    }
  }
</script>
<style scoped>
  @import "/bocm/platformjs/static/css/common.css";

  #help_center {
    text-align: left;
    background: #f7f9fa;
  }

  .list_title {
    font-size: .24rem;
    line-height: .28rem;
    padding: .35rem 0.2rem .2rem;
    background: #f7f9fa;
  }

  .list_title p {
    color: #999;
  }

  .bottom_bar {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.4rem;
    background: #fff;
  }

  .list_content {
    padding-bottom: 1.45rem;
  }

  .bottom_text div {
    display: inline-block;
    width: 48%;
    text-align: center;
    color: #4B4F63;
  }

  .bottom_text div img {
    width: 0.54rem;
    height: 0.54rem;
    display: block;
    margin: 0.27rem auto 0.08rem;
  }
  .bottom_bar .line{
    width: 0.03rem;
    height: 0.61rem;
    background: #E9EBEF;
    margin-bottom: 0.1rem;
  }
  .toase-n{width: 4rem;margin-left: 1.35rem;background: #fff;
    font-size: 0.28rem;color: #606060;line-height: 0.4rem;
    padding: 0.4rem;
    border-radius: 0.1rem;
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
  }
  .know{width: 100%;height: 0.3rem;margin-top: 0.4rem;text-align: center;color: #0e90d2;}
</style>
