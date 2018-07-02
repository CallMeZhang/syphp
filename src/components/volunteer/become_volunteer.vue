<template>
  <div>
    <div v-title="'成为志愿者'"></div>
    <div class="banner">
      <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/icon-banner1.png'" alt="banner">
    </div>
    <div class="allQuestion">
      <div class="volwhat">
        <div class="allTitle">
          <span class="line"></span>
          志愿者是什么？
        </div>
        <div class="allContent">
          <p class="volInt">志愿者是指以自己的时间、知识、技能、体力等从事志愿服务的自然人。</p>
          <div class="imgContent">
            <div class="item" @click="goPage">
              <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/item1.png'" alt="item1">
              <div class="font">
                <p class="p1 bg1">成为志愿者 <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/apply12.png'" alt="" style="height:.2rem;width:auto;margin-left:.04rem;"></p>
                <!--<p class="p1 bg1">成为志愿者 <img src="/bocm/platformjs/static/image/volunteer/apply12.png" alt="" style="height:.2rem;width:auto;margin-left:.04rem;"></p>-->
                <p class="p2">实名认证信息，成为志愿者</p>
              </div>
            </div>
            <div class="item" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_organization')">
              <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/item2.png'" alt="item1">
              <div class="font">
                <p class="p1 bg1">找组织 <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/apply12.png'" alt="" style="height:.2rem;width:auto;margin-left:.04rem;"></p>
                <p class="p2">寻找我的志愿组织，找到志同道合的小伙伴</p>
              </div>
            </div>
            <div class="item" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_recruit&tab_index=1')">
              <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/item3.png'" alt="item1">
              <div class="font">
                <p class="p1 bg1">报名活动 <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/apply12.png'" alt="" style="height:.2rem;width:auto;margin-left:.04rem;"></p>
                <p class="p2">找到感兴趣的招募信息，和有相同兴趣的小伙伴一起参与志愿活动</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="volHow">
        <div class="allTitle">
          <span class="line"></span>
          作为志愿者，我有什么样的权利和义务？
        </div>
        <div class="howItem">
          <p><span class="span1">1.</span><span class="span2">找到更多志同道合的小伙伴。</span></p>
          <p><span class="span1">2.</span><span class="span2">定期参与志愿组织活动，获取服务时长。</span></p>
          <p><span class="span1">3.</span><span class="span2">保证登记信息的真实性，完整性，准确性。</span></p>
          <p><span class="span1">4.</span><span class="span2">报名参与志愿者活动，并参与志愿者培训，遵守志愿活动规范。</span></p>
        </div>
      </div>
      <div class="volHow">
        <div class="allTitle">
          <span class="line"></span>
          哪些志愿组织可以接收我？
        </div>
        <div class="howItem">
          <p><span class="span1">1.</span><span class="span2">如果您的所属单位或团组织已在平台上入驻，您可以申请加入。</span></p>
          <p><span class="span1">2.</span><span class="span2">在平台中找到您感兴趣的组织，申请加入。</span></p>
          <p><span class="span1">3.</span><span class="span2">您还可以在平台上自己申请创建组织，成为组织的管理员。</span></p>
        </div>
      </div>
      <div class="volHow">
        <div class="allTitle">
          <span class="line"></span>
          服务时长有什么用处？
        </div>
        <div class="howItem">
          <p><span class="span1">1.</span><span class="span2">服务时长是您在平台中所做公益行为时间累计记录，长期从事公益事业的小伙伴，会优先被志愿组织招募录用。</span></p>
          <p><span class="span1">2.</span><span class="span2">服务时长在部分学校及企事业单位中，是对学生及员工的考核标准之一。</span></p>
        </div>
      </div>
      <div class="volHow">
        <div class="allTitle">
          <span class="line"></span>
          我原来参加的志愿队去哪了？
        </div>
        <div class="howItem">
          <p>新的系统取代了旧有系统，您之前的参与过的志愿组织已在平台上注册了新的组织，您可以去咨询原组织负责人新的组织名称，在平台中搜索组织名称，找到组织。</p>
        </div>
      </div>
    </div>
    <div class="footer">一起善源 爱 · 源于善</div>
  </div>
</template>
<script>
//  import loading from '@/components/loading/loading.vue'
  import storage from '@/modules/_ls/index'
  export default {
    data(){
      return {
        isLoading:false,

      }
    },
    created(){
//      this.getData()
    },
    mounted(){

      let info = this._appjs.syJsbGetAppVersion()
      if (info['platform'] === 'ios' || info['platform'] === 'android') {
        this._appjs.syJsbSetGoBackUrl("goBackOfDetail()");
      }

    },
    methods:{
      getData(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=recruit_inform_submit').then((res)=>{

        })
      },
      goPage(){
        this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_realname_auth').then(res=>{
          if(res && res.data && res.data.code == 200){
            if(!res.data.content.is_realname_auth){
              // 没有实名认证 需要实名认证
              //@click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id)"

              location.href = (this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=authentication&gycallback='+encodeURIComponent(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_idcard'))
            }else{
              // 实名认证了
              location.href = (this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_idcard')
            }
          }else if(res && res.data && res.data.code == 403){
              location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+encodeURIComponent('volunteer/become_volunteer?tmp=1')
//            location.href = this.siteInfo.host+'/api/index.php?act=login&callback='+encodeURIComponent('volunteer/become_volunteer?tmp=1')

          }else{
            this._appjs.syJsbAlert(res.data.message)
          }
        })
      },

    },

//    components:{loading}

  }
</script>
<style lang="scss" scoped>
  .banner {
    width: 100%;
    height: 3.6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .allQuestion {
    padding: 0 0.3rem 0.4rem;
    text-align: left;
  }

  .allTitle {
    margin-top: 0.54rem;
    margin-bottom: 0.24rem;
    height: 0.4rem;
    line-height: 0.45rem;
    font-size: 0.34rem;
    color: #4B4F63;
    .line {
      display: inline-block;
      height: 0.4rem;
      width: 0.06rem;
      background: #F8E71C;
      box-shadow: 0 0 16px 0 #F0D35B;
      border-radius: 0.06rem;
      float: left;
      margin-right: 0.1rem;
    }
  }
  .allContent{
    .bg1{
      /*float: left;*/
      /*height:.3rem;*/
      /*padding-bottom:.3rem;*/
      /*background: url("/bocm/platformjs/static/image/volunteer/apply12.png") right center no-repeat;*/
      /*background-size: .26rem;*/
    }
    .volInt{
      font-size: 0.28rem;
      color: #818C9E;
      line-height: 0.4rem;
      margin-bottom: 0.43rem;
    }
    .item{
      height: 2.1rem;
      width: 6.9rem;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      margin-bottom: 0.34rem;
      img{
        width: 100%;
        height: 100%;
      }
      .font{
        position: absolute;
        bottom: 0.3rem;
        left: 0.32rem;
        .p1{
          font-size: 0.28rem;
          line-height: 0.4rem;
          font-weight: 600;
          color: #fff;
        }
        .p2{
          /*margin-top:.4rem;*/
          width: 4.6rem;
          font-size: 0.24rem;
          line-height: 0.33rem;
          color: #fff;
        }
      }
    }
  }
  .volHow{
    .howItem{
      p{
        font-size: 0.28rem;
        color: #818C9E;
        line-height: 0.4rem;
        text-align: justify;
        overflow: hidden;
        span{
          float: left;
          display: block;
        }
        .span1{
          width: 5%;
        }
        .span2{
          width: 95%;
        }
      }
    }
  }
  .footer{
    width: 100%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    background: #F7F9FA;
    font-size: 0.24rem;
    color: #DADEE4;
    font-weight: 300;
  }
</style>
