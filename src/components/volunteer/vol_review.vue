<template>
  <div>
    <div v-title="'下级志愿组织管理'"></div>
    <div class="header-top">
      <div class='first-div' :class="isActivity=='one'||'is-activity'" @click="isActivity='one'">待审核<span
          class="number">{{statistics.audit_num}}</span>
      </div>
      <div class='third-div' :class="isActivity=='third'||'is-activity'" @click="isActivity='third'">
        下级志愿组织<span class="number">{{statistics.audited_num}}</span></div>
    </div>
    <div class="content-address">
      <sy-tab-container v-model="isActivity">
        <sy-tab-container-item id="one">
          <div v-if="oneData.length===0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/untakein.png'" alt="" class="noData">
            <p class="unInfo">暂无信息</p>
          </div>
          <div class="content-div">
            <div v-for="item in oneData" class="list-wrapper paddingBno">
              <div
                  @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=organization_detail&volunteer_org_id='+item.volunteer_org_id+'&state=1')">
                <img :src="item.avatar" alt="" class="title-wrapper-img">
                <div class="title-wrapper">
                  <div class="title-div">{{item.volunteer_org_name}}</div>
                  <span class="address">{{item.province}}{{item.city}}</span>
                  <div class="descript">{{item.summary}}</div>
                  <div class="status-txt">{{item.id < 0 ? "该组织申请成为下级" : "该组织修改信息"}}</div>
                </div>
              </div>
              <div class="btns">
                <button class="btn-one" @click.stop="addMember(item.volunteer_org_id,1)">通过</button>
                <button class="btn-two" @click="getShow(item.volunteer_org_id)">拒绝</button>
              </div>
            </div>
          </div>
        </sy-tab-container-item>
        <sy-tab-container-item id="third">
          <div v-if="twoData.length===0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/untakein.png'" alt="" class="noData">
            <p class="unInfo">暂无信息</p>
          </div>
          <div class="content-div">
            <div v-for="item in twoData" class="list-wrapper"
                 @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=organization_detail&volunteer_org_id='+item.volunteer_org_id+'&state=2')">
              <img :src="item.avatar" alt="" class="title-wrapper-img">
              <div class="title-wrapper">
                <div class="title-div">{{item.volunteer_org_name}}</div>
                <span class="address">{{item.province}}{{item.city}}</span>
                <div class="descript">{{item.summary}}</div>
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
        statistics: {},
        itemTmp: '',
        getDataDone: true,
        page: {
          first: 1,
          third: 1
        },
        markClose: false,
        refusekeys: ''
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
        switch (this.isActivity) {
          case 'one':
            this.page.first = 1
            break;
          case 'third':
            this.page.third = 1
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
        console.log(this.itemTmp)
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
          this.getDataDone = false
          switch (this.isActivity) {
            case 'one':
              this.page.first++;
              break;
            case 'third':
              this.page.third++;
              break;
          }
          this.getDataList()

        }

      },
      getData(){
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=subordinate_volunteer_org_statistics'
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.statistics = res.data.content
          } else {
            console.log(res.data.code + ' 404 无数据')
          }
        }, (error) => {
          console.log(error)
        })
      },
      curStateFn(){
        this.state = 1
        this.curpage = this.page.first
        switch (this.isActivity) {
          case 'one':
            this.state = 1;
            this.curpage = this.page.first;
            break;
          case 'third':
            this.state = 2;
            this.curpage = this.page.third;
            break;
        }
      },
      getDataList(p){
        this.curStateFn()
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=subordinate_volunteer_org_list&state=' + this.state + '&curpage=' + this.curpage
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            switch (this.isActivity) {
              case 'one':
                this.oneData = this.oneData.concat(res.data.content)
                break;
              case 'third':
                this.twoData = this.twoData.concat(res.data.content)
                break;
            }
            if (p == 'newStatus') {
              switch (this.isActivity) {
                case 'one':
                  this.oneData = res.data.content
                  break;
                case 'third':
                  this.twoData = res.data.content
                  break;
              }
            }
            this.getDataDone = true
          } else {
            console.log(res.data.code + res.data.message)
          }
          if (res.data.code === 200 && res.data.content.length !== 0) {
            this.getDataDone = true
          }else if(res.data.code ===200 && res.data.content.length == 0){
            this.getDataDone = false
          }
        }, (error) => {
          console.log(error)
        })
      },
      addMember(orgId, pass){
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=auditing_volunteer_org&resu=' + this.refusekeys
        var qs = require("qs")
        if (pass == 2 && this.refusekeys == '') {
          this.$toast('请填写拒绝原因')
          return
        }
        this.markClose = false
        this.$http.post(url, qs.stringify({
          'volunteer_org_id': orgId,//成员id
          'pass': pass //1通过, 2不通过
        })).then((res) => {
          if (res.data.code === 200) {
            switch (this.isActivity) {
              case 'one':
                this.page.first = 1;
                break;
              case 'third':
                this.page.third = 1;
                break;
            }
            if (pass === 1) {
              this.$toast('审核通过')
            } else {
              this.$toast('已拒绝')
              this.refusekeys = ''
            }
            this.getData()
            this.getDataList('newStatus')
          } else if (res.data.code === 401) {
            console.log(res.data.message)
          }
        }, (error) => {
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

  p.unInfo {
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
      line-height: .28rem;
      margin-right: 0.02rem;
    }
    & > div {
      float: left;
      line-height: 0.9rem;
      height: 0.86rem;
      border-bottom: 0.04rem solid #4A90E2;
      padding: 0 0.2rem;
      font-size: .30rem;
      font-weight: normal;
      color: #4A90E2;

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
        .title-wrapper-img {
          margin-left: 0.2rem;
        }
      }
      & > div {
        width: 6.9rem;
        padding: 0.23rem 0.2rem 0.3rem 0.2rem;
        box-sizing: border-box;
        font-weight: 300;
        background: #FFFFFF;
        box-shadow: 0 0 .15rem 0 rgba(74, 144, 226, 0.20);
        border-radius: .08rem;
        margin: 0 auto 0.3rem;
        overflow: hidden;

        .title-wrapper-img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
          background: #F5F5F5;
          float: left;
          display: inline-block;
          margin-right: 0.2rem;
        }
        .title-wrapper {
          width: 5.1rem;
          float: left;
          overflow: hidden;
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
          background: url(../../../static/image/volunteer/yellow-bg.png) left center no-repeat;
          background-size: contain;
          font-size: .24rem;
          line-height: 0.3rem;
          color: #4A90E2;
          position: absolute;
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
          margin-right: 0.49rem;
        }
        .time {
          padding-left: 0.36rem;
          background: url(../../../static/image/volunteer/vol-person.png) left center no-repeat;
          background-size: contain;
        }
        .descript {
          overflow: hidden;
          clear: both;
          width: 5.1rem;
          font-weight: 300;
          font-size: .26rem;
          color: #666A7F;
          line-height: .40rem;
          text-align: left;
          padding-top: 0.13rem;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
        .status-txt {
          text-align: left;
          font-weight: 300;
          font-size: .24rem;
          color: #B1B8C4;
          margin-top: 0.12rem;
          margin-bottom: 0.13rem;
        }
        .btns {
          border-top: 0.01rem solid #E9EBEF;
          height: 0.99rem;
          padding-top: 0.24rem;
          box-sizing: border-box;
          clear: both;
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
      }
    }
  }

  .mark {
    /*position: absolute;*/
    position: fixed;
    z-index: 99999;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    .markContent {
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
      .markTit {
        padding: 0.22rem 0;
        text-align: center;
        border-bottom: 1px solid rgba(218, 222, 228, 0.60);
        font-size: 0.34rem;
        color: #4B4F63;
        font-weight: 300;
      }
      .markCon {
        padding: 0.4rem 0.4rem;
        textarea {
          width: 5.7rem;
          height: 1.6rem;
          border: 1px solid #B1B8C4;
          border-radius: 8px;
          padding: 0.19rem 0.3rem 0;
          box-sizing: border-box;
          margin-bottom: 0.5rem;
        }
        textarea::-webkit-input-placeholder {
          font-size: 0.26rem;
          color: #DADEE4;
          font-weight: 300;
        }
        button {
          width: 3.5rem;
          height: 0.88rem;
          line-height: 0.88rem;
          text-align: center;
          color: #fff;
          background: #4A90E2;
          border-radius: 8px;
          font-size: 0.32rem;
          border: none;
        }
      }
      .close {
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: 0.1rem;
        top: -1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }

    }
  }
</style>
