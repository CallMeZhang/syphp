<template>
  <div class="top-content">
    <!--<div v-title="'志愿者组织详情'"></div>-->
    <div class="input-wrapper">
      <input type="text" class="search-input" :placeholder="this.type==='index_recent_volunteer_org'?'请输入志愿组织名称':'请输入招募信息名称'" v-model="key">
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/search-title.png'" alt=""
           class="input-title" @click="newCurpage.first=1;seachData('search')">
    </div>
    <div class="content-address" ref="wrapper">
      <div v-if='type==="index_recent_volunteer_org"' class="content-div1">
        <div v-for="item in listsNew" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+item.volunteer_org_id+'&is_share='+share)">
          <img :src="item.avatar" alt="" class="title-wrapper-img">
          <div class="title-wrapper">
            <div class="title-div">{{item.volunteer_org_name}}</div>
            <span class="address">{{item.city + item.area}}</span><span class='time'>{{item.number}}人</span>
            <div class="descript">{{item.summary}}</div>
          </div>
        </div>
      </div>
      <div v-if='type==="index_recent_recruit"' class="content-div2">
        <div v-for="item in listsNew" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id+'&is_share='+share)">
          <div class="title-wrapper">
            <div class="title-div" :class="!(item.recruit_state==1||item.recruit_state==0)||'has-width'">
              {{item.recruit_name}}
            </div>
            <span v-if="item.recruit_state==1||item.recruit_state==0"
                  class="recruit-img" :class="{'recruit-img-blue':item.recruit_state==0}">{{getState(item.recruit_state)}}</span>
          </div>
          <span class="address">{{item.city + item.area || '线上'}}</span><span
          class='time'>{{item.add_time}}</span>
          <div class="descript">{{item.summary}}</div>
          <div class="name-wrapper">
            <img :src="item.avatar" alt="" class="img-name">{{item.volunteer_org_name}}
          </div>
        </div>
      </div>
      <div v-if="listsNew.length===0">
        <img src="../../../static/image/volunteer/Iin.png" alt="" class="noData">
        <p class="unInfo">暂无搜索结果</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        getDataDone: false,
        newCurpage: {
          first: 1,
        },
        listsNew: [],
        key: '',
        service_type: '',
        typeData:'',
        share:''
      }
    },
    created () {//volunteer_org_name=//recruit_name=
      this.key=''+this.$route.query.key||''
      this.type=this.$route.query.type||'index_recent_volunteer_org'
      this.share = this.$route.query.is_share || ''
      if(this.type==='index_recent_volunteer_org'){
        document.title = '搜索结果'
        this.typeData='volunteer_org_name='
      }else{
        document.title = '搜索结果'
        this.typeData='recruit_name='
      }

      this.seachData()
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {},
    watch: {},
    methods: {
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
      handleScroll () {
        var offsetHeight = document.body.scrollHeight
        var clientHeight = document.body.clientHeight
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        if (offsetHeight - clientHeight - scrollTop <= 10 && this.getDataDone) {
          this.getDataDone = false
          this.newCurpage.first++
          this.seachData()
        }
      },
      seachData (p) {
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op='+this.type+'&curpage=' + this.newCurpage.first + '&' + this.typeData+this.key
        this.$http.get(url).then((res) => {
          console.log(res)
          if (res.data.code === 200 ) {
            if (p === 'search') {
              this.listsNew = res.data.content
            } else if(res.data.content.length !== 0){
              this.listsNew = this.listsNew.concat(res.data.content)
              this.getDataDone = true
            }
          } else {
            console.log(res.data.code + ' 404 无数据')
          }
        }, (error) => {
          console.log(error)
        })
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .top-content {
    min-height: 100%;
  }
  .noData{
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
  .content-address {
    padding: 0 0.1rem;
    .content-div1 {
      padding-top: 0.39rem;
      margin-bottom: 0.27rem;
      overflow: hidden;
      height: 100%;
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
        .list-wrapper {
          overflow: hidden;
        }
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
          border-right: 0.01rem solid #E9EBEF;
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
    .content-div2 {
      padding-top: 0.39rem;
      margin-bottom: 0.27rem;
      overflow: hidden;
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
          /*width: 0.94rem;*/
          /*height: 0.3rem;*/
          display: inline-block;
          background: #F8E71C;
          /*border-radius: 102.63px 102.63px 102.63px 1.58px;*/
          border-radius: .17rem .17rem .17rem 0;
          font-size: .24rem;
          /*line-height: 0.3rem;*/
          height:.34rem;
          line-height: .38rem;
          padding:0 .14rem;
          color: #4A90E2;
          position: absolute;
          font-weight: 300;
          right: 0rem;
          top: 0.05rem;
        }
        .recruit-img-blue{
          background: #99C6FC;
          color: #fff;
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
          background-size: .24rem auto;
        }
        .address {
          padding-left: 0.32rem;
          padding-top:.06rem;
          padding-right: 0.49rem;
          border-right: 1px solid #E9EBEF;
          margin-right: 0.49rem;
        }
        .time {
          padding-top:.06rem;
          padding-left: 0.36rem;
          background: url(../../../static/image/volunteer/vol-time.png) left center no-repeat;
          background-size: .26rem auto;
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
  .input-wrapper {
    height: 1rem;
    background: #F7F9FA;
    width: 100%;
    position: relative;
    .search-input {
      width: 6.9rem;
      height: 0.7rem;
      margin: 0.16rem 0 0 0.3rem;
      font-size: .28rem;
      background: #FFFFFF;
      border: 0.01rem solid #E9EBEF;
      box-shadow: inset 0.01rem 0.01rem 0.01rem 0 #E9EBEF;
      border-radius: 0.08rem;
      padding-left: 0.3rem;
      box-sizing: border-box;
      float: left;
      font-weight: 300;
      -webkit-appearance: none;
      &::-webkit-input-placeholder {
        color: #DADEE4;
        padding-left: 0.08rem;
      }
    }
    .input-title {
      position: absolute;
      right: 0.5rem;
      cursor: pointer;
      width: 0.34rem;
      height: 0.34rem;
      top: 0.36rem;
    }
  }
</style>
