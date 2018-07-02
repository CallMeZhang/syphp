<template>
  <div>
    <div v-title="'下级组织招募管理'"></div>
    <div class="header-top">
      <div class='first-div' :class="isActivity=='one'||'is-activity'" @click="isActivity='one'">待审核<span
        class="number">{{statistics.recruit_autdit_num}}</span></div>
      <div class='third-div' :class="isActivity=='third'||'is-activity'" @click="isActivity='third'">下级招募信息<span
        class="number">{{statistics.recruit_autdited_num}}</span></div>
    </div>
    <div class="content-address">
      <sy-tab-container v-model="isActivity">
        <sy-tab-container-item id="one">
          <div v-if="oneData.length===0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/zhaomu.png'" alt="" class="noData">
            <p class="unInfo">暂无信息</p>
          </div>
          <div v-if="oneData.length!==0" class="content-div">
            <div v-for="item in oneData" class="list-wrapper paddingBno">
              <div @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id+'&is_auditing=yes')" >
                <div class="title-wrapper magin30">
                  <div class="title-div"  :class="!(item.state==1||item.state==0)||'has-width'">{{item.recruit_name}}</div>
                  <span v-if="item.recruit_state==1||item.recruit_state==0" class="recruit-img">{{getState(item.state)}}</span>
                </div>
                <div class="magin30">
                  <span class="address">{{item.offline_flag=='0'?item.city+item.area:"线上"}}</span><span class='time'>{{item.add_time}}</span>
                </div>
                <div class="descript magin30">{{item.summary}}</div>
                <div class="name-wrapper magin30">
                  <img :src="item.avatar" alt="" class="img-name">{{item.volunteer_org_name}}
                </div>

              </div>
              <div class="btns">
                <button class="btn-one" @click.stop="addMember(item.recruit_id,1)">通过</button>
                <button class="btn-two" @click="getShow(item.recruit_id)">拒绝</button>
              </div>
            </div>
          </div>
        </sy-tab-container-item>
        <sy-tab-container-item id="third">
          <div v-if="twoData.length===0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/zhaomu.png'" alt="" class="noData">
            <p class="unInfo">暂无信息</p>
          </div>
          <div v-if="twoData.length!==0"class="content-div"  >
          <!--<div v-if="true"class="content-div"  >-->
            <div v-for="item in twoData" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id+'&preview=yes')" style="position: relative">
            <!--<div v-for="item in 2" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id+'&preview=yes')" style="position: relative">-->
              <div class="title-wrapper">
                <div style="width:77%;" class="title-div" :class="!item.recruit||'has-width'">{{item.recruit_name}}</div>
                <span v-if="item.recruit" class="recruit-img">招募中</span>
              </div>
              <span class="address" style="overflow:hidden;text-overflow: ellipsis;display: inline-block;max-width: 35%;white-space: nowrap;">{{item.offline_flag=='0'?item.city+item.area:"线上"}}</span><span class='time'>{{item.add_time}}</span>
              <div class="descript">{{item.summary}}</div>
              <div class="name-wrapper">
                <img :src="item.avatar" alt="" class="img-name">{{item.volunteer_org_name}}
              </div>
              <div class="tag" v-if="item.activity_state =='未开始'" style="background: #99C6FC;color:#fff">
              <!--<div class="tag" v-if="true" style="background: #99C6FC;color:#fff">-->
                <!--<div class="absolute tag" v-if="true">-->
                {{item.activity_state}}
              </div>
              <div class="tag" v-if="item.activity_state == '招募中'">
                <!--<div class="absolute tag" v-if="true">-->
                {{item.activity_state}}
              </div>
            </div>
          </div>
        </sy-tab-container-item>
      </sy-tab-container>
    </div>
    <div class="mark" v-if="markClose" @touchmove.prevent>
      <div class="markContent">
        <div class="markTit">拒绝原因</div>
        <div class="markCon">
          <textarea placeholder="请输入拒绝原因。" v-model="refusekeys"></textarea>
          <button @click="addMember(itemTmp,2)">提交</button>
        </div>
        <div class="close" @click="closeMark">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/close.png'" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isActivity: 'one',
        oneData: [],
        twoData: [],
        statistics:{},
        itemTmp:'',
        getDataDone:true,
        page: {
          first: 1,
          third: 1
        },
        markClose:false,
        refusekeys:''
      }
    },
    created () {
      this.getData()
      this.getDataList()
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
    },
    watch: {
      isActivity: function () {
        this.getDataDone = true
        switch(this.isActivity){
          case 'one':
            this.state=1;
            this.page.first=1
            break;
          case 'third':
            this.state=2;
            this.page.third=1
            break;
        }
        this.getDataList('newStatus')
      }
    },
    computed: {},
    methods: {
      getShow(val){
        this.markClose = true
        this.itemTmp = val
      },
      getState (state) {
        var str = '招募未开始'
        switch (state) {
          case '0':
            str = '未开始'
            break
          case '1':
            str = '招募中'
            break
          case '2':
            str = '招募已结束'
            break
          case '3':
            str = '招募已取消'
            break
          case '4':
            str = '活动已结束'
            break
        }
        return str
      },
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
            case 'third':this.page.third++;break;
          }
          this.getDataList()
          this.getDataDone = false
        }

      },
      getData(){
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=subordinate_recruit_statistics'
        this.$http.get(url).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.statistics=res.data.content
          } else {
            console.log(res.data.code + ' 404 无数据')
          }
        }, (error) => {
          console.log(error)
        })
      },
      curStateFn(){
        this.state=1
        this.curpage=this.page.first
        switch(this.isActivity){
          case 'one':
            this.state=1;
            this.curpage=this.page.first;
            break;
          case 'third':
            this.state=2;
            this.curpage=this.page.third;
            break;
        }
      },
      getDataList(p){
        this.curStateFn()
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=subordinate_recruit_list&state='+this.state+'&curpage='+this.curpage
        this.$http.get(url).then((res) => {
          console.log(res)
//          var res = {
//            data:{"code":200,"message":"success","content":[{"recruit_name":"\u4e00\u8d77\u5fd7\u613f\uff0c\u770b\u8c01\u6700\u516c\u76ca\uff01\u5566\u5566\u5566\u5566\u5566\u5566\u5566\u5566\u5566\u5566","recruit_id":"59","activity_state":"\u62db\u52df\u4e2d","offline_flag":"0","city":"\u5317\u4eac\u5e02\u8f96\u53bf","province":"\u5317\u4eac\u5e02","area":"\u5bc6\u4e91\u53bf","add_time":"2017\/11\/28    17:31:41","summary":"\u798f\u5efa\u80af\u5fb7\u57fa\u53cd\u9988\u7684\u6350\u6b3e\u5230\u51e0\u70b9\u53cd\u9988\u9644\u8fd1\u7684\u5f00\u53d1\u8d37\u6b3e","volunteer_org_name":"\u4e2d\u76ca\u5584\u6e90\u671b\u4eac\u5206\u90e8","avatar":"https:\/\/cdnt.17shanyuan.com\/volunteer\/oss_769fbcf55222c4aba24d820f4993577b.jpeg"},{"recruit_name":"\u82b1\u8349\u4e1b\u4e2d\u7b11\uff0c\u56ed\u5916\u8d4f\u5176\u8c8c80","recruit_id":"53","activity_state":"","offline_flag":"0","city":"\u5929\u6d25\u5e02","province":"\u5929\u6d25\u5e02","area":"\u548c\u5e73\u533a","add_time":"2017\/11\/23    19:13:37","summary":"\u5c31\u4ed8\u6b3e\u591a\u4ea4\u6d41\u53d1\u591a\u5c11\u89d2\u5ea6\u8003\u8651\u623f\u95f4\u6253\u5f00jfldkfl","volunteer_org_name":"\u81ea\u5df1\u6302\u9760\u81ea\u5df1","avatar":"https:\/\/cdnt.17shanyuan.com\/volunteer\/oss_95e41982fa8d5bacedb74b2981bcd9c7.jpeg"},{"recruit_name":"\u6d4b\u8bd5\u81ea\u52a8\u786e\u8ba4\u670d\u52a1\u65f6\u957f","recruit_id":"51","activity_state":"","offline_flag":"0","city":"\u9102\u5c14\u591a\u65af\u5e02","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","area":"\u9102\u6258\u514b\u65d7","add_time":"2017\/11\/23    17:23:01","summary":"\u5f88\u75af\u72c2\u51cf\u80a5\u770b\u5230\u4e86\u89e3\u653e\u4e1c\u8def","volunteer_org_name":"\u6d4b\u8bd5\u5907\u6848\u7ec4\u7ec7","avatar":"https:\/\/cdnt.17shanyuan.com\/volunteer\/oss_6f2d3afa8d8ac6655b51415a8e1f9d22.jpeg"},{"recruit_name":"\u6d4b\u8bd5\u6dfb\u52a0\u670d\u52a1\u65f6\u957f","recruit_id":"49","activity_state":"","offline_flag":"0","city":"\u957f\u6cbb\u5e02","province":"\u5c71\u897f\u7701","area":"\u8944\u57a3\u53bf","add_time":"2017\/11\/23    16:58:45","summary":"\u5feb\u9012\u653e\u7406\u79d1\u4f46\u662f\u4f46\u662f\u591a","volunteer_org_name":"\u6d4b\u8bd5\u5907\u6848\u7ec4\u7ec7","avatar":"https:\/\/cdnt.17shanyuan.com\/volunteer\/oss_6f2d3afa8d8ac6655b51415a8e1f9d22.jpeg"},{"recruit_name":"\u6ca1\u6709\u5730\u7403\u7684\u5065\u5eb7\u5c31\u6ca1\u6709\u4eba\u7c7b\u7684\u5065\u5eb7","recruit_id":"48","activity_state":"","offline_flag":"1","city":"","province":"","area":"","add_time":"2017\/11\/23    16:32:06","summary":"\u653e\u5f97\u5f00\u96f6\u51e0\u5206\u7535\u8def\u8bbe\u8ba1\u653e\u5f97\u5f00\u623f\u95f4\u6253\u5f00","volunteer_org_name":"\u6d4b\u8bd5\u5907\u6848\u7ec4\u7ec7","avatar":"https:\/\/cdnt.17shanyuan.com\/volunteer\/oss_6f2d3afa8d8ac6655b51415a8e1f9d22.jpeg"},{"recruit_name":"\u5c0f\u8349\u6709\u751f\u547d\uff0c\u8db3\u4e0b\u591a\u7559\u201c\u9752\u201d\u3002","recruit_id":"46","activity_state":"","offline_flag":"0","city":"\u79e6\u7687\u5c9b\u5e02","province":"\u6cb3\u5317\u7701","area":"\u9752\u9f99\u6ee1\u65cf\u81ea\u6cbb\u53bf","add_time":"2017\/11\/23    15:45:17","summary":"\u5c0f\u8349\u6709\u751f\u547d\uff0c\u8db3\u4e0b\u591a\u7559\u201c\u9752\u201d\u3002 \t\t\u5c0f\u8349\u6709\u751f\u547d\uff0c\u8db3\u4e0b\u591a\u7559\u201c\u9752\u201d\u3002","volunteer_org_name":"\u81ea\u5df1\u6302\u9760\u81ea\u5df1","avatar":"https:\/\/cdnt.17shanyuan.com\/volunteer\/oss_95e41982fa8d5bacedb74b2981bcd9c7.jpeg"},{"recruit_name":"\u7231\u5fc3\uff0c\u5728\u8fd9\u91cc\u4f20\u9012","recruit_id":"44","activity_state":"","offline_flag":"1","city":"","province":"","area":"","add_time":"2017\/11\/22    19:04:01","summary":"\u653e\u5f97\u5f00\u623f\u95f4\u6253\u5f00\u4e86\u79ef\u5206\u6253\u5f00\u4e86\u623f\u95f4\u6253\u5f00\u4e86\u51cf\u80a5\u7684\u770b","volunteer_org_name":"\u4e2d\u76ca\u5584\u6e90\u671b\u4eac\u5206\u90e8","avatar":"https:\/\/cdnt.17shanyuan.com\/volunteer\/oss_769fbcf55222c4aba24d820f4993577b.jpeg"},{"recruit_name":"2017\u7231\u4f51\u6148\u5584\u591c\u6c47\u805a2.73\u4ebf\u7231\u5fc3","recruit_id":"28","activity_state":"","offline_flag":"1","city":"","province":"","area":"","add_time":"2017\/11\/22    16:08:07","summary":"\u611f\u6069\u6709\u4f60\uff0c\u4e0d\u5fd8\u521d\u5fc3\u3002","volunteer_org_name":"\u4e2d\u76ca\u5584\u6e90\u671b\u4eac\u5206\u90e8","avatar":"https:\/\/cdnt.17shanyuan.com\/volunteer\/oss_769fbcf55222c4aba24d820f4993577b.jpeg"}]}
//          }
          if (res.data.code === 200) {
            switch (this.isActivity) {
              case 'one':
                this.oneData=this.oneData.concat(res.data.content)
                break;
              case 'third':
                this.twoData=this.twoData.concat(res.data.content)
                break;
            }
            if(p=='newStatus'){
              switch (this.isActivity) {
                case 'one':
                  this.oneData=res.data.content
                  break;
                case 'third':
                  this.twoData=res.data.content
                  break;
              }
            }
            this.getDataDone = true
          }else {
            console.log(res.data.code + res.data.message)
          }
          if(res.data.code === 200&&res.data.content.length!==0){
            this.getDataDone = true
          }else if(res.data.code === 200&&res.data.content.length ==0){
            this.getDataDone = false
          }
        }, (error) => {
          console.log(error)
        })
      },
      addMember(orgId,pass){
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=auditing_recruit&resu='+this.refusekeys
        var qs = require("qs")
        if(pass == 2 && this.refusekeys == ''){
          this.$toast('请填写拒绝原因')
          return
        }
        this.markClose = false
        this.$http.post(url, qs.stringify({
          'recruit_id':  orgId,//成员id
          'pass':pass
        })).then((res) => {
          if (res.data.code === 200) {
            switch (this.isActivity) {
              case 'one':this.page.first=1;break;
              case 'third':this.page.third=1;break;
            }
            if(pass===1){
              this.$toast('审核通过')
            }else{
              this.$toast('已拒绝')
              this.refusekeys = ''
            }
            this.getData()
            this.getDataList('newStatus')
          } else if(res.data.code ===401){
            console.log(res.data.message)
          }
        },(error)=>{
          console.log(error)
        })
      },
      closeMark(){
        this.markClose = false
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .noData {
    width: 2rem;
    height: 2rem;
    display: inline-block;
    border: 0;
    margin: 2.5rem auto 0.58rem;
  }
  p.unInfo{
    font-size: .32rem;
    color: #B1B8C4;
  }
  .header-top {
    height: 0.89rem;
    border-bottom: 0.01rem solid #E9EBEF;
    position: relative;
    box-sizing: border-box;
    .number {
      display: inline-block;
      background: #F5F5F5;
      border-radius: .84rem;
      width: 0.4rem;
      height: 0.28rem;
      font-size: .24rem;
      color: #4A90E2;
      letter-spacing: 0;
      line-height: .24rem;
      margin-right: 0.02rem;
    }
    & > div {
      float: left;
      line-height: 0.9rem;
      height: 0.86rem;
      border-bottom: 0.04rem solid #4A90E2;
      padding: 0 0.2rem;
      font-size: .30rem;
      color: #4A90E2;
      font-weight: normal;
    }
    .is-activity {
      border-bottom: 0;
      color: #4B4F63;
      font-weight: 300;
    }
    .first-div {
      margin-left: 0.66rem;
    }
    .third-div {
      float: right;
      margin-right: 0.91rem;
    }
  }

  .content-address {
    padding: 0 0.1rem;
    .content-div {
      padding-top: 0.39rem;
      margin-bottom: 0.27rem;
      overflow: hidden;
      .paddingBno {
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        .magin30 {
          margin-left: 0.3rem;
          margin-right: 0.3rem;
        }
      }
      & > div {
        width: 6.9rem;
        padding: 0.23rem 0.3rem 0.3rem;
        box-sizing: border-box;
        font-weight: 300;
        background: #FFFFFF;
        box-shadow: 0 0 .15rem 0 rgba(74, 144, 226, 0.20);
        border-radius: .08rem;
        margin: 0 auto 0.3rem;
        .list-wrapper {
        }
        .title-wrapper {
          position: relative;
        }
        .title-div {
          font-size: .30rem;
          color: #4B4F63;
          line-height: .42rem;
          text-align: left;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .recruit-img {
          width: 0.94rem;
          height: 0.3rem;
          display: inline-block;
          background: #F8E71C;
          border-radius: 102.63px 102.63px 102.63px 1.58px;
          font-size: .24rem;
          line-height: 0.3rem;
          color: #4A90E2;
          position: absolute;
          font-weight: 300;
          right: 0rem;
          top: 0.05rem;
        }
        .has-width {
          width: 4.4rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .address, .time {
          float: left;
          font-size: .24rem;
          color: #818C9E;
          margin-top: 0.08rem;
          font-weight: 300;
          background: url(../../../static/image/volunteer/vol-address.png) left center no-repeat;
          background-size: contain;
        }
        .address {
          padding-left: 0.32rem;
          padding-right: 0.49rem;
          border-right: 0.01rem solid #eee;
          margin-right: 0.49rem;
        }
        .time {
          padding-left: 0.36rem;
          background: url(../../../static/image/volunteer/vol-time.png) left center no-repeat;
          background-size: contain;
        }
        .descript {
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
        .btns {
          border-top: 0.01rem solid #E9EBEF;
          height: 0.99rem;
          padding-top: 0.24rem;
          box-sizing: border-box;
          clear: both;
          margin-top: 0.24rem;
          .btn-one, .btn-two {
            font-weight: 300;
            padding: 0;
            border-radius: 0.08rem;
            width: 1.3rem;
            height: 0.5rem;
            font-size: .26rem;
          }
          .btn-one {
            margin-right: 0.35rem;
            border: 0;
            background: #4A90E2;
            color: #FFFFFF;
          }
          .btn-two {
            margin-left: 0.35rem;
            border: .01rem solid #4A90E2;
            background: #fff;
            color: #4A90E2;
          }
        }
        .name-wrapper {
          padding-top: 0.11rem;
          vertical-align: middle;
          font-size: .24rem;
          color: #818C9E;
          font-weight: 300;
          text-align: left;
          height: 0.4rem;
          line-height: 0.4rem;
          .img-name {
            width: 0.4rem;
            height: 0.4rem;
            float: left;
            border: 0;
            border-radius: 50%;
            margin-right: 0.12rem;
            background: #EBF4FF;
          }
        }
      }
    }
  }
  .mark{
    /*position: absolute;*/
    position: fixed;
    z-index: 99999;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.4);
    .markContent{
      width: 6.5rem;
      height: 5.19rem;
      background: #fff;
      -webkit-border-radius: 16px;
      -moz-border-radius: 16px;
      border-radius: 16px;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .markTit{
        padding: 0.22rem 0;
        text-align: center;
        border-bottom: 1px solid rgba(218,222,228,0.60);
        font-size: 0.34rem;
        color: #4B4F63;
        font-weight: 300;
      }
      .markCon{
        padding: 0.4rem 0.4rem;
        textarea{
          width: 5.7rem;
          height: 1.6rem;
          border: 1px solid #B1B8C4;
          border-radius: 8px;
          padding: 0.19rem 0.3rem 0;
          box-sizing: border-box;
          margin-bottom: 0.5rem;
        }
        textarea::-webkit-input-placeholder{
          font-size: 0.26rem;
          color: #DADEE4;
          font-weight: 300;
        }
        button{
          width: 3.5rem;
          height: 0.88rem;
          line-height: 0.88rem;
          text-align: center;
          color: #fff;
          background: #4A90E2;
          border-radius: 8px;
          font-size: 0.32rem;
          border:none;
        }
      }
      .close{
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: 0.1rem;
        top: -1rem;
        img{
          width: 100%;
          height: 100%;
        }
      }

    }
  }

  .tag{
    position: absolute;
    right:.3rem;
    top:.2rem;
    background: #F8E71C;
    /*padding:.04rem .2rem;*/
    height:.34rem;
    line-height: .38rem;
    padding:0 .14rem;
    border-radius: .17rem .17rem .17rem 0;
    color: #4A90E2;
  }
</style>
