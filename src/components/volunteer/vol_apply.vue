<template>
  <div>
    <div v-title="'志愿组织入驻'"></div>
    <div class="banner">
      <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/vol_apply12.png'" alt="banner2">
      <!--<img src="../../../static/image/volunteer/vol_apply12.png" alt="banner2">-->
    </div>
    <div class="allQuestion">
      <div class="volwhat">
        <div class="allTitle">
          <span class="line"></span>
          志愿组织是什么？
        </div>
        <div class="allContent">
          <p class="volInt">由有志于社会公益事业的义务工作志愿者自愿组成的非营利性组织。</p>
        </div>
      </div>
      <div class="volWhen">
        <div class="allTitle">
          <span class="line"></span>
          如何注册志愿组织？
        </div>
        <div class="whenContent">
          <div class="item clearfix">
            <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/copy3.png'" class="fl">
            <div class="info fl">
              <h2>寻找您的志愿小伙伴</h2>
              <p>您首先需要有一群志同道合的志愿小伙伴。</p>
            </div>
          </div>
          <div class="item clearfix">
            <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/copy5.png'" class="fl">
            <div class="info fl">
              <h2>注册您的志愿组织</h2>
              <p>打开电脑，访问<span style="color: #99C6FC;">https://www.17shanyuan.com/zyz </span>注册账号用于创建及管理您的志愿组织。</p>
            </div>
          </div>
          <div class="item clearfix">
            <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/copy1.png'" class="fl">
            <div class="info fl">
              <h2>完善您的组织信息</h2>
              <p>国家鼓励志愿组织到当地民政局备案登记，若您已经备案登记，可入驻为“社会组织或企/事业”。</p>
              <p style="margin-top:.16rem;">若还没来得及登记也没有关系，可以选择一个已经备案登记的组织作为联络组织，在他们的帮助下开展志愿者活动。</p>
            </div>
          </div>
          <div class="item clearfix">
            <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/copy2.png'" class="fl">
            <div class="info fl">
              <h2>等待申请通过</h2>
              <p>组织信息需要经过审核后才能被大家看到，请务必保证您的组织信息真实有效。</p>
            </div>
          </div>
          <div class="item clearfix">
            <img v-lazy="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/copy4.png'" class="fl">
            <div class="info fl">
              <h2>发布志愿者招募</h2>
              <p>审核通过之后，您就可以发布您的志愿者招募信息，招募合适的志愿者。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="volHow">
        <div class="allTitle">
          <span class="line"></span>
          <span class="font">作为志愿组织的创建者，我有什么样的权利和义务？</span>
        </div>
        <div class="howItem" style="margin-top: 0.7rem;">
          <p><span class="span1">1.</span><span class="span2">可以招募更多的小伙伴一起参与公益活动。</span></p>
          <p><span class="span1">2.</span><span class="span2">审核：确保小伙伴们不犯错。</span></p>
          <p><span class="span1">3.</span><span class="span2">信息的正确性：保证发布的信息是合规的。</span></p>
        </div>
      </div>
      <!--<div class="volHow">-->
        <!--<div class="allTitle">-->
          <!--<span class="line"></span>-->
          <!--我原来的志愿队哪去了？-->
        <!--</div>-->
        <!--<div class="howItem">-->
          <!--<p class="bott23">新的系统取代了旧有的系统，若您原来有比较重要且有意义的活动想保留，请联系客服<span style="color: #99C6FC;float:none;display: inline" @click="_appjs.syJsbCallPhone('4006667308')">400-666-7308</span>，客服会登记您旧有活动的关键信息，协助您恢复原来的数据。-->
          <!--</p>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="footer">一起善源 爱 · 源于善</div>
  </div>
</template>
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
      display: block;
      float: left;
      height: 0.4rem;
      width: 0.06rem;
      background: #F8E71C;
      box-shadow: 0 0 16px 0 #F0D35B;
      border-radius: 0.06rem;
      margin-right: 0.1rem;
    }
    .font {
      display: block;
      float: left;
      width: 95%;
    }
  }

  .allContent {
    .volInt {
      font-size: 0.28rem;
      color: #818C9E;
      line-height: 0.4rem;
      margin-bottom: 0.43rem;
    }
  }

  .volHow {
    .howItem {
      p {
        font-size: 0.28rem;
        color: #818C9E;
        line-height: 0.4rem;
        text-align: justify;
        overflow: hidden;
        span {
          float: left;
          display: block;
        }
        .span1 {
          width: 5%;
        }
        .span2 {
          width: 95%;
        }
      }
    }
  }
.whenContent{
  .item{
    margin-top: 0.26rem;
    margin-bottom: 0.6rem;
    img{
      height: 1.18rem;
      margin-right: 0.23rem;
    }
    .info{
      width: 76%;
      h2{
        font-size: 0.28rem;
        color: #666A7F;
        line-height: 0.4rem;
        padding-bottom: 0.1rem;
      }
      p{
        font-size: 0.24rem;
        color: #B1B8C4;
        line-height: 0.33rem;
      }
    }
  }

}
  .footer {
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
