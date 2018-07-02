<template>
  <div>
    <div v-title="'我的志愿服务'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="top-wrapper">
          <img class='idcard-bg' :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/blank-bg.png'" alt="">
          <img class='idcard-bg' :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/header-bg.png'" alt="">
          <div class="name-list">
            <p class="name">{{is_realname_auth == true?user.name:'暂未认证信息'}}</p>
            <p class="img-list" v-if="user.star">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/star.png'" alt="" v-for="n in parseInt(user.star)">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/half_star.png'" alt="" v-if="!isInteger(user.star)">
            </p>
          </div>
          <div class="head-text">
            <span class="left-span" v-if="is_realname_auth">志愿服务时长</span>
            <span class="right-span"v-if="is_realname_auth">{{user.time}}</span>
          </div>
          <button v-if="!is_realname_auth" @click="goto">去认证</button>
        </div>
        <div class="blank"></div>
        <div class="header-top">
          <div class='first-div' :class="isActivity=='one'||'is-activity'" @click="isActivity='one'">我加入的</div>
          <div class='second-div' :class="isActivity=='two'||'is-activity'" @click="isActivity='two'">我创建的</div>
        </div>
        <div class="content-address">
          <sy-tab-container v-model="isActivity">
            <sy-tab-container-item id="one">
              <div class="content-div" v-if="listsData.length!==0">
                <div v-for="item in listsData" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+item.volunteer_org_id)">
                  <img v-lazy="item.avatar" alt="" class="title-wrapper-img">
                  <div class="title-wrapper">
                    <div class="title-div">{{item.volunteer_org_name}}</div>
                    <span class="address">{{item.city+item.area}}</span><span class='time'>{{item.number}}人</span>
                    <div class="descript">{{item.summary}}</div>
                  </div>
                </div>
              </div>
              <div v-if="listsData.length==0" class="list-one">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/untakein.png'" alt="">
                <p >您还未加入任何志愿组织</p>
                <button @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_organization')">去看看 <i class="bg_blue"></i></button>
              </div>
            </sy-tab-container-item>
            <sy-tab-container-item id="two">
              <div class="content-div" v-if="list.length!==0">
                <div v-for="item in list" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+item.volunteer_org_id)">
                  <img v-lazy="item.avatar" alt="" class="title-wrapper-img">
                  <div class="title-wrapper">
                    <div class="title-div">{{item.volunteer_org_name}}</div>
                    <span class="address">{{item.city+item.area}}</span><span class='time'>{{item.number}}人</span>
                    <div class="descript">{{item.summary}}</div>
                  </div>
                </div>
              </div>

              <div v-if="list.length==0" class="list-one">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/Iin.png'" alt="">
                <p >请在电脑浏览器端创建志愿组织</p>
                <p class="web-address" style="color:#97C6F3">网址：https://www.17shanyuan.com/zyz</p>
              </div>
            </sy-tab-container-item>
          </sy-tab-container>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  export default {
    data () {
      return {
        isLoading:true,
        isActivity: 'one',
        list: [],
        listsData:[],
        user: {
          name: '',
          star: 0,
          time: ''
        },
        curpage1:1,
        curpage2:1,
        getDataDone:false,
        allData1:false,
        allData2:false,
        is_realname_auth:false //是否完成实名认证
      }
    },
    created () {
      this.getData();
      this.get_my_joined();
      this.get_my_created();
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll)
      this.$nextTick(()=>{
        let info = this._appjs.syJsbGetAppVersion()
        if (info['platform'] === 'ios' || info['platform'] === 'android') {
          this._appjs.syJsbSetGoBackUrl("goBackOfDetail()");
        }
      })
    },
    computed: {   },
    methods: {
      getData(){

        // 是否认证
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_realname_auth').then(res=>{
          if(res && res.data && res.data.code == 200){
            if(!res.data.content.is_realname_auth){
//              this.user.name = false;
              this.is_realname_auth = false
            }else {
              this.is_realname_auth = true
            }
          }
        });
        // 基本信息
        this.$http.get(this.query('service_card_basic_info')).then(res=>{

          if(res && res.data && res.data.code == 200){
            //all_service_time: null,
            //truename: "张国福",
            //star_sum: 15,
            //star_count: 3
            let content = res.data.content;
            this.user.name = content.truename || '';
            this.user.time = content.all_service_time || '';
            this.user.star = (content.star_sum || '') / content.star_count || '';

          }
          this.isLoading = false;
        })




      },
      get_my_joined(){
        if(this.allData1) return;
        //my_joined_volunteer_org_list 获取我加入的志愿队列表的接口
        this.$http.get(this.query('my_joined_volunteer_org_list&curpage='+this.curpage1)).then(res=>{
          if(res && res.data && res.data.code == 200){
            //volunteer_org_name：志愿队名字
            //city+area：地区
            //number：人数
            //summary：宣言
            this.curpage1 ++
            this.listsData = this.listsData.concat(res.data.content)
            this.allData1 = res.data.content.length === 0
          }else{
            this.listsData = [];
          }
          this.getDataDone = true
        });
      },
      get_my_created(){
        if(this.allData2) return;
        //my_created_volunteer_org_list 获取我创建的志愿队列表的接口
        this.$http.get(this.query('my_created_volunteer_org_list&curpage='+this.curpage2)).then(res=>{
          if(res && res.data && res.data.code == 200){
            this.curpage2 ++
            this.list = this.list.concat(res.data.content);
            this.allData2 = res.data.content.length === 0
          }else{
            this.list = [];
          }
          this.getDataDone = true
        });
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
        if (offsetHeight - clientHeight - scrollTop <= 20 && this.getDataDone) {
          this.getDataDone = false
          switch (this.isActivity) {
            case 'one':this.curpage1++;this.get_my_joined();
              break;
            case 'two':this.curpage1++;this.get_my_created();
              break;
          }
        }
      },

      goto(){
        location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=authentication&gycallback='+encodeURIComponent(location.href)
      },
      isInteger(obj) {
        return obj%1 === 0
      },
      query(api,obj){
        let str = '';
        if(obj){
          for(var k in obj){
            str += '&'+ k + '=' + obj[k]
          }
        }
        return this.siteInfo.host+'/api/index.php?act=volunteer&op='+api+str
      }
    },
    watch: {
      isActivity: function () {
        this.getDataDone = true
      }
    },
    components: {loading}
  }
</script>

<style lang="scss" scoped>
  .blank {
    height: 0.2rem;
    background: #F7F9FA;
  }

  .top-wrapper {
    position: relative;
    height: 4.6rem;
    overflow: hidden;
    img.idcard-bg {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .name-list {
      position: absolute;
      top: 0.8rem;
      z-index: 99;
      right: 0.8rem;
      .name {
        font-size: .40rem;
        color: #FFFFFF;
        margin-bottom: 0.27rem;
        font-weight: 300;
      }
      .img-list {
        text-align: right;
        img{
          width:.3rem;
          margin-left:2px;
        }
      }
    }
    .head-text {
      position: absolute;
      width: 7.5rem;
      bottom: 0.7rem;
      .left-span {
        float: left;
        margin-left: 0.7rem;
        font-size: .28rem;
        color: #4B4F63;
        line-height: .42rem;
        font-weight: 300;
      }
      .right-span {
        float: right;
        margin-right: 0.7rem;
        font-size: .28rem;
        color: #818C9E;
        line-height: .42rem;
        font-weight: 300;
      }
    }
    button {
      position: absolute;
      bottom: 1rem;
      width: 2rem;
      height: 0.7rem;
      font-size: .28rem;
      color: #FFFFFF;
      line-height: 0.7rem;
      border: 0;
      background-image: linear-gradient(90deg, #30C1FF 0%, #4A90E2 100%);
      border-radius: .08rem;
      padding: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .header-top {
    height: 0.89rem;
    border-bottom: 0.01rem solid #DADEE4;
    position: relative;
    box-sizing: border-box;
    & > div {
      float: left;
      line-height: 0.9rem;
      height: 0.86rem;
      border-bottom: 0.04rem solid #4A90E2;
      padding: 0 0.2rem;
      font-size: .30rem;
      font-weight: normal;
      color: #4A90E2;
      width: 2.4rem;
    }
    .is-activity {
      border-bottom: 0;
      color: #4B4F63;
      font-weight: 300;
    }
    .first-div {
      margin-left: 0.6rem;
    }
    .second-div {
      float: right;
      margin-right: 0.6rem;
    }

  }

  .content-address {
    padding: 0 0.1rem;
    .content-div {
      padding-top: 0.39rem;
      margin-bottom: 0.27rem;
      overflow: hidden;
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
  .web-address{
    margin-top:.2rem;

  }
  .list-one{
    overflow: hidden;
    img{
      width: 2rem;
      height: 2rem;
      display: inline-block;
      border: 0;
      margin: 0.93rem auto 0.56rem;
    }
    p{
      font-size: .32rem;
      color: #B1B8C4;
      font-weight: 300;
      width: 100%;
    }
    button{
      width: 2.66rem;
      height: 0.88rem;
      border: 1px solid #4A90E2;
      border-radius: .08rem;
      line-height: 0.82rem;
      background: #fff;
      font-size: .32rem;
      color: #4A90E2;
      margin: 0.64rem auto 0.9rem;
      padding-right:.54rem;
      background: url("/bocm/platformjs/static/image/volunteer/arrow_bule2.png") 74% center no-repeat;
      background-size: .18rem auto;
    }
  }
</style>
