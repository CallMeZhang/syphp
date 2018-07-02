<template>
  <div class="top-content">
    <!--<div v-title="'志愿者组织详情'"></div>-->
    <div class="input-wrapper">
      <input type="text" class="search-input" placeholder=" 请输入志愿组织名称" v-model="key">
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/search-title.png'" alt=""
           class="input-title" @click="newCurpage.first=1;seachData('search')">
    </div>
    <div class="content-address" ref="wrapper">
      <div class="content-div">
        <div v-for="item in listsNew" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+item.volunteer_org_id+'&is_share='+share)">
          <img :src="item.avatar" alt="" class="title-wrapper-img">
          <div class="title-wrapper">
            <div class="title-div">{{item.volunteer_org_name}}</div>
            <span class="address">{{item.city + item.area}}</span><span class='time'>{{item.number}}人</span>
            <div class="descript">{{item.summary}}</div>
          </div>
        </div>
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
        share:''
      }
    },
    created () {
      console.log(this.$route)
      var obj = {
        'st01': '敬老助老',
        'st02': '扶贫助困',
        'st03': '助残服务',
        'st04': '关爱儿童',
        'st05': '法律服务',
        'st06': '纠纷调解',
        'st07': '医疗卫生',
        'st08': '心理健康',
        'st09': '赛会服务',
        'st10': '应急救援',
        'st11': '行政支持',
        'st12': '语言服务',
        'st13': '禁毒防艾',
        'st14': '交通治安',
        'st15': '教育科普',
        'st16': '绿色环保',
        'st17': '文体活动',
        'st18': '社区便民',
        'st19': '国际志愿服务',
        'st20': '其他'
      }
      this.service_type = this.$route.query.service_type || ''
      for (var prop in obj) {
        if (this.service_type === prop) {
          document.title = obj[prop]+'组织'
          break ;
        }
      }
      this.share = this.$route.query.is_share?'yes':''
      this.seachData()
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {},
    watch: {},
    methods: {
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
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=index_recent_volunteer_org&curpage=' + this.newCurpage.first + '&service_type=' + this.service_type + '&volunteer_org_name=' + this.key
        this.$http.get(url).then((res) => {
          console.log(res)
          if (res.data.code === 200 && res.data.content.length !== 0) {
            if (p === 'search') {
              this.listsNew = res.data.content
            } else {
              this.listsNew = this.listsNew.concat(res.data.content)
            }
            this.getDataDone = true
          } else if(res.data.code === 200 && res.data.content.length === 0){
              if(p === 'search'){
                this.listsNew = res.data.content;
              }
          }else{
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

  .content-address {
    padding: 0 0.1rem;
    .content-div {
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
          border-right: 0.01rem solid #eee;
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
      border: 0.01rem solid #DADEE4;
      box-shadow: inset 0.01rem 0.01rem 0.01rem 0 #DADEE4;
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
