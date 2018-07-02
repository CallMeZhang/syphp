<template>
  <div>
    <div v-title="'服务时长确认提醒'"></div>
    <div class="wrapper">
      <div class="header">
        您的志愿者招募已到活动结束时间，请及时确认参与活动的志愿者名单并为志愿者添加服务时长。3天内未处理，系统会默认为所有录用的志愿者添加发布招募时填写的服务时长。
      </div>
      <div class="volcontent">
        <div>
          <span class="span1">招募信息名称：</span>
          <span class="span2">{{recruit_name}}</span>
        </div>
        <div>
          <span class="span1">招募开始时间：</span>
          <span class="span2">{{recruit_begintime}}</span>
        </div>
        <div>
          <span class="span1">招募结束时间：</span>
          <span class="span2">{{recruit_endtime}}</span>
        </div>
        <div>
          <span class="span1">活动执行时间：</span>
          <span class="span2">{{activity_begintime}}</span>
        </div>
        <div>
          <span class="span1">活动结束时间：</span>
          <span class="span2">{{activity_endtime}}</span>
        </div>
      </div>
      <div class="footer">
        <p class="p1">确认服务时长请在电脑浏览器中操作</p>
        <p class="p2">网址：https://www.17shanyuan.com/zyz</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        recruit_name: '', // 招募信息名称
        activity_begintime: '', //活动开始时间
        activity_endtime: '',//活动结束时间
        recruit_begintime: '', //招募开始时间
        recruit_endtime: '' //招募结束时间
      }
    },
    created(){
      this.getData()
    },
    methods: {
      getData(){
        let recruit_id = this.$route.query.recruit_id
        this.$http.get(this.siteInfo.host + '/api/index.php?act=volunteer&op=get_service_time_notice&recruit_id=' + recruit_id).then(res => {
          let a = res.data.content
          if (res.data.code == 200) {
            this.activity_begintime = a.activity_begintime
            this.activity_endtime = a.activity_endtime
            this.recruit_begintime = a.recruit_begintime
            this.recruit_endtime = a.recruit_endtime
            this.recruit_name = a.recruit_name
          } else {
//            this._appjs.syJsbAlert(res.data.message)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    width: 100%;
    background: #fff;
    .header {
      box-sizing: border-box;
      padding: 0.6rem 0.5rem 1.18rem;
      font-size: 0.28rem;
      color: #4B4F63;
      line-height: 0.48rem;
      text-align: justify;
    }
    .volcontent {
      text-align: left;
      font-size: 0.3rem;
      color: #4B4F63;
      padding-left: 0.5rem;
      div {
        margin-bottom: 0.1rem;
        span {
          line-height: 0.42rem;
        }
        .span2 {
          color: #818C9E;
        }
      }
    }
    .footer {
      position: absolute;
      bottom: 0.85rem;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      .p1 {
        font-size: 0.32rem;
        color: #B1B8C4;
      }
      .p2 {
        font-size: 0.28rem;
        color: #A1C5EF;
        line-height: 45px;
      }
    }
  }
</style>
