<template>
  <div class="feedback-over-con">
    <div v-title="'2017年公益回馈'"></div>
    <div class="feedback-over">
      <div class="over-img"><img src="/bocm/platformjs/static/image/activities/feedback/back_over_logo.png" alt="over.png加载中…"></div>
      <div class="over-tip">活动截止日期为：2018.01.19</div>
      <div class="over-descr">如您已提交领取信息<br/>爱心回馈礼品将于2018年1月19日后陆续发出。</div>
      <div class="over-bottom">精准扶贫，感谢有您</div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
      }
    },
    created () {},
    methods : {},
  }
</script>
<style lang="scss" scoped>
  $body-bg:#fff;
  img{display:block;border:0;}
  .feedback-over-con{
    position:relative;
    width:100%;
    height:100%;
    background:$body-bg;
  }
  .feedback-over{
    width:7.5rem;
    padding-top:2.82rem;
    margin:0 auto;
    text-align:center;
    .over-img{
      width:2.97rem;
      height:2.29rem;
      margin:0 auto;
      img{
        width:100%;
        height:100%;
      }
    }
    .over-tip{
      padding-top:0.9rem;
      width:4.95rem;
      margin:0 auto;
      font-size:0.32rem;
      line-height:0.45rem;
      color: #333333;
    }
    .over-descr{
      width:5.15rem;
      margin:0 auto;
      padding-top:0.9rem;
      font-size:0.24rem;
      line-height:0.42rem;
      color: #666666;
    }
    .over-bottom{
      position:fixed;
      left:50%;
      bottom:0.9rem;
      transform: translate(-50%,-50%);
      font-size:0.24rem;
      line-height:0.32rem;
      color: #5D8FDC;
    }
  }
</style>
