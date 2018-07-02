<template>
  <div>
    <div v-title="'我报名的招募'"></div>
    <div style="background: #F7F9FA;height: .2rem;"></div>
    <div class="header-top">
      <div class='first-div':class="isActivity=='one'||'is-activity'" @click="isActivity='one'">等待录用</div>
      <div class='second-div':class="isActivity=='two'||'is-activity'" @click="isActivity='two'">已录用</div>
      <div class='third-div':class="isActivity=='third'||'is-activity'" @click="isActivity='third'">已拒绝</div>
    </div>
    <div class="content-address">
      <sy-tab-container v-model="isActivity">
        <sy-tab-container-item id="one">
          <div v-if="oneData.length!=0"class="content-div">
          <!--<div v-if="true" class="content-div">-->
            <div v-for="item in oneData" class="list-wrapper" :class="!item.evaluate||'unpadding'" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id)">
              <div class="title-wrapper">
                <div class="title-div" >{{item.recruit_name}}</div>
              </div>
              <div class="add-time-div">
                <span class="address">{{item.offline_flag=='0'?item.province+item.city:'线上'}}</span><span class='time'>{{item.add_time}}</span>
              </div>
              <div class="descript">{{item.summary}}</div>
              <div class="name-wrapper">
                <img :src="item.avatar" alt="" class="img-name">{{item.volunteer_org_name}}
              </div>
            </div>
          </div>
          <div class="noData" v-if="oneData.length==0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/no-pic.png'" alt="">
            <p>暂无报名信息</p>
            <div class="btnBM" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_recruit')">去报名</div>
          </div>
        </sy-tab-container-item>
        <sy-tab-container-item id="two">
          <div class="content-div" v-if="twoData.length!=0">
          <!--<div class="content-div" v-if="true">-->
            <div v-for="item in twoData" class="list-wrapper" :class="!item.is_comment!='0'||'unpadding'" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id)">
            <!--<div v-for="item in 2" class="list-wrapper" :class="!item.is_comment!='0'||'unpadding'" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id)">-->
              <div class="title-wrapper">
                <div class="title-div">{{item.recruit_name}}</div>
              </div>
              <div class="add-time-div">
                <span class="address">{{item.offline_flag=='0'?item.province+item.city:'线上'}}</span><span class='time'>{{item.add_time}}</span>
              </div>
              <div class="descript">{{item.summary}}</div>
              <div class="name-wrapper">
                <img :src="item.avatar" alt="" class="img-name"><span class="no-enter" style="max-width:3.5rem;display: inline-block">{{item.volunteer_org_name}}</span><span class="isOk" v-if="item.is_comment=='1'||item.is_comment=='2'">{{'服务时长已确认'}}</span>
              </div>
              <div class="footer-div" v-if="item.is_comment!='0'">
                <button :class="item.is_comment!=='1'?'is-done':'undone'" @click.stop=goComment(item)>{{item.is_comment=='1'?'评价':'查看评价'}}</button>
              </div>
            </div>
          </div >
          <div class="noData" v-if="twoData.length==0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/no-pic.png'" alt="">
            <p>暂无报名信息</p>
          </div>
        </sy-tab-container-item>
        <sy-tab-container-item id="third" >
          <div class="content-div" v-if="thirdData.length!=0">
            <div v-for="item in thirdData" class="list-wrapper" :class="!item.evaluate||'unpadding'" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id)">
              <div class="title-wrapper">
                <div class="title-div" :class="!item.recruit_state=='3'||'has-width'">{{item.recruit_name}}</div>
                <span v-if="item.recruit_state=='3'" class="recruit-img">招募已取消</span>
              </div>
              <div class="add-time-div">
                <span class="address">{{item.offline_flag=='0'?item.province+item.city:'线上'}}</span><span class='time'>{{item.add_time}}</span>
              </div>
              <div class="descript">{{item.summary}}</div>
              <div class="name-wrapper">
                <img :src="item.avatar" alt="" class="img-name">{{item.volunteer_org_name}}
              </div>
            </div>
          </div>
          <div class="noData" v-if="thirdData.length==0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/no-pic.png'" alt="">
            <p>暂无报名信息</p>
          </div>
        </sy-tab-container-item>
      </sy-tab-container>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isActivity:"one",
        oneData:[],
        twoData:[],
        thirdData:[],
        member_id:'',
        page:{
          first:1,
          second:1,
          third:1
        },
        getDataDone:true,
      }
    },
    created () {
      this.isActivity = this.$route.query.tab_index == '3' ? 'third' : this.$route.query.tab_index == '2'?'two':'one'
      if(this.isActivity==='one') {
        this.getDataList()
      }
    },
    computed: {},
    watch: {
      isActivity: function () {
        this.getDataDone = true
        switch(this.isActivity){
          case 'one':
            this.oneData=[]
            this.page.first=1;
            this.getDataList()
            break;
          case 'two':
            this.twoData=[]
            this.page.second=1
            this.getDataList()
            break;
          case 'third':
            this.thirdData=[]
            this.page.third=1
            this.getDataList()
            break;
        }
      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll(){
        var offsetHeight = document.body.scrollHeight
        var clientHeight = document.body.clientHeight
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        if (offsetHeight - clientHeight - scrollTop <= 50 && this.getDataDone) {
          switch (this.isActivity) {
            case 'one':this.page.first++;break;
            case 'two':this.page.second++;break;
            case 'third':this.page.third++;break;
          }
          this.getDataList()
          this.getDataDone = false
        }

      },
      curStateFn(){
        this.state=1
        this.curpage=this.page.first
        switch(this.isActivity){
          case 'one':
            this.state=0;
            this.curpage=this.page.first;
            break;
          case 'two':
            this.state=1;
            this.curpage=this.page.second;
            break;
          case 'third':
            this.state=2;
            this.curpage=this.page.third;
            break;
        }
      },
      getDataList(){
        this.curStateFn()
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=my_recruit_list&status='+this.state+'&curpage='+this.curpage
        this.$http.get(url).then((res) => {
          console.log(res)
          if (res.data.code === 200&&res.data.content.length!==0) {
            switch (this.isActivity) {
              case 'one':
                this.oneData=this.oneData.concat(res.data.content)
                break;
              case 'third':
                this.thirdData=this.thirdData.concat(res.data.content)
                break;
              case 'two':
                this.twoData=this.twoData.concat(res.data.content)
                break;
            }
            this.getDataDone = true
          } else {
            console.log(res.data.code + res.data.message)
          }
        }, (error) => {
          console.log(error)
        })
      },
      goComment(item){
        if(item.is_comment=='1'){
          location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=act_evaluate&recruit_id='+item.recruit_id+'&to_id=0'+'&gycallback='+encodeURIComponent(location.href.replace('tab_index=','tab_index=2'))
        }else{
          this._appjs.syJsbLaunchWebview(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_appraise_info&recruit_id='+item.recruit_id+'&member_id='+item.member_id)
        }
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>

  .noData{
    overflow: hidden;
    img{
      margin: 0 auto;
      margin-top: 2.73rem;
      display: block;
      width: 2.21rem;
    }
    p{
      margin-top: 0.68rem;
      text-align: center;
      font-size: .32rem;
      color: #B1B8C4;
    }
    .btnBM{
      border: 1px solid #4A90E2;
      border-radius: .08rem;
      font-size: .32rem;
      color: #4A90E2;
      width: 6.9rem;
      height: 0.88rem;
      line-height: 0.89rem;
      margin: 0 auto;
      margin-top: 2.5rem;
    }
  }
  .no-enter {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .header-top{
    height:0.89rem;
    border-bottom: 0.01rem solid #E9EBEF;
    position: relative;
    box-sizing: border-box;
    &>div{
      float: left;
      line-height: 0.9rem;
      height: 0.86rem;
      border-bottom: 0.04rem solid #4A90E2;
      padding:0 0.2rem;
      font-size: .30rem;
      color: #4A90E2;
      font-weight: normal;
    }
    .is-activity{
      border-bottom: 0;
      color: #4B4F63;
      font-weight: 300;
    }
    .first-div{
      margin-left: 0.6rem;
    }
    .second-div{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .third-div{
      float: right;
      margin-right: 0.6rem;
    }
  }
  .content-address{
    padding:0 0.1rem;
    .content-div{
      padding-top: 0.39rem;
      margin-bottom: 0.27rem;
      overflow: hidden;
      div.unpadding{
        padding-bottom: 0;
      }
      .list-wrapper{
        width: 6.9rem;
        padding:0.23rem 0rem 0.3rem;
        box-sizing: border-box;
        font-weight: 300;
        background: #FFFFFF;
        box-shadow: 0 0 .15rem 0 rgba(74,144,226,0.20);
        border-radius: .08rem;
        margin: 0 auto 0.3rem;
        .title-wrapper,.add-time-div,.descript,.name-wrapper,.footer-div{
          padding:0 0.3rem;
        }
        .title-wrapper{
          position: relative;
          .title-div{
            font-size: .30rem;
            color: #4B4F63;
            line-height: .42rem;
            text-align: left;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .has-width{
            width: 4.4rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .recruit-img{
            width: 1.44rem;
            height: 0.3rem;
            display: inline-block;
            background: #F5A623;
            border-radius: 102.63px 102.63px 102.63px 1.58px;
            font-size: .24rem;
            line-height: .32rem;
            font-weight: 300;
            color: #FFFFFF;
            position: absolute;
            right: 0.3rem;
            top:0.05rem;
          }
        }
        .add-time-div{
          .address,.time{
            float: left;
            font-size: .24rem;
            color: #818C9E;
            margin-top: 0.08rem;
            font-weight: 300;
            background: url(../../../static/image/volunteer/vol-address.png) left center no-repeat;
            background-size: contain;
          }
          .address{
            padding-left: 0.32rem;
            padding-right: 0.49rem;
            border-right: 0.01rem solid #eee;
            margin-right: 0.49rem;
            padding-top:2px;
            max-width: 2.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time{
            padding-left: 0.36rem;
            background: url(../../../static/image/volunteer/vol-time.png) left center no-repeat;
            background-size: contain;
          }
        }
        .descript{
          overflow: hidden;
          clear: both;
          height: 0.8rem;
          font-weight: 300;
          font-size: .26rem;
          color: #666A7F;
          line-height: .40rem;
          text-align: left;
          padding-top: 0.09rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .name-wrapper{
          padding-top: 0.11rem;
          vertical-align: middle;
          font-size: .24rem;
          color: #818C9E;
          font-weight: 300;
          text-align: left;
          height: 0.4rem;
          line-height: 0.4rem;
          position: relative;
          .img-name{
            width:0.4rem;
            height: 0.4rem;
            float: left;
            border: 0;
            border-radius: 50%;
            margin-right: 0.12rem;
            background: #EBF4FF;
          }
          .isOk{
            position: absolute;
            right: 00.3rem;
            font-size: .24rem;
            /*color: #15DD95;*/
            color: #B1B8C4;
            padding-left:0.4rem ;
            float: right;
            border-left:.01rem solid #E9EBEF;
            display: inline-block;
            height: 0.26rem;
            line-height: 0.26rem;
            margin-top: 0.07rem;
            font-weight: 300;
          }
        }
        .footer-div{
          height: 0.99rem;
          border-top: .01rem solid #E9EBEF;
          margin-top: 0.2rem;
          button{
            border: .01rem solid #4A90E2;
            border-radius: .08rem;
            width: 1.6rem;
            height: 0.5rem;
            line-height: 0.5rem;
            color: #4A90E2;
            font-size: .26rem;
            font-weight: 300;
            background: #fff;
            margin-top: 0.24rem;
          }
          .undone{
            border: 0.01rem solid #E9EBEF;
            border-radius: .08rem;
            color:#4B4F63;
          }
        }
      }
    }
  }
</style>
