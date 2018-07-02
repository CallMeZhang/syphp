<template>
  <div id="volunteer_index">
    <div v-title="'一起志愿'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading" class="volunteer_index1">
        <download></download>
        <div class="banner">
          <div class="swiper-container swiper-container22" ref="pr">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in bannerData">
                <img :src="item.img_url" :class="'top-swiper-shop'+index" alt=""
                     @click="_appjs.syJsbLaunchWebview(item.touch_url)">
              </div>
            </div>
            <div pr class="swiper-pagination" v-if="bannerData.length>1"></div>
          </div>
        </div>
        <div class="two-list">
          <div class="div-one"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_apply')">
            <p class="p-one">组织入驻</p>
            <p class="p-two">志愿组织 {{numberData.volunteer_org}} 个</p>
          </div>
          <div class="div-two"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=become_volunteer')">
            <p class="p-one">成为志愿者</p>
            <p class="p-two">志愿者 {{numberData.volunteer}} 个</p>
          </div>
        </div>
        <div style="background: #F7F9FA;height: 0.2rem"></div>
        <div class="wrapper-content">
          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st02&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org1.png'" alt="">
            <p>扶贫助困</p>
          </div>
          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st01&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org2.png'" alt="">
            <p>敬老助老</p>
          </div>

          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st04&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org3.png'" alt="">
            <p>关爱儿童</p>
          </div>

          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st18&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org4.png'" alt="">
            <p>社区便民</p>
          </div>

          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st15&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org5.png'" alt="">
            <p>教育科普</p>
          </div>

          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st16&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org6.png'" alt="">
            <p>绿色环保</p>
          </div>

          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st17&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org7.png'" alt="">
            <p>文化活动</p>
          </div>

          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st12&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org8.png'" alt="">
            <p>语言服务</p>
          </div>
          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st09&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org9.png'" alt="">
            <p>赛事服务</p>
          </div>
          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st10&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org10.png'" alt="">
            <p>应急救援</p>
          </div>
          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_list&service_type=st19&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/org11.png'" alt="">
            <p>国际志愿</p>
          </div>
          <div class="wrapper-item"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_organization&is_share=yes')">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/more12.png'" alt="">
            <p class="last-p">全部组织</p>
          </div>

        </div>
        <div style="background: #F7F9FA;height: 0.2rem"></div>
        <div class='wrapper-list'>
          <div class="wrapper-top">
            <span class="span-one"></span><span class="span-two">最新招募</span><span class="span-three"
                                                                                  @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_recruit&is_share=yes')">查看更多 <span
              class="sworr"> ></span></span>
          </div>
          <div class="content-div">
            <div v-for="item in listsNew" class="list-wrapper"
                 @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id+'&is_share=yes')">
              <div class="title-wrapper">
                <div class="title-div has-width">{{item.recruit_name}}</div>
              </div>
              <div style="overflow: hidden">
                <span class="address">{{(item.city + item.area) || "线上"}}</span><span
                  class='time'>{{item.add_time}}</span>
              </div>
              <div class="name-wrapper no-enter" style="width:72%;">
                发起方：{{item.volunteer_org_name}}
              </div>
              <img :src="item.avatar" alt="">
            </div>
          </div>
        </div>

        <div class="wrapper-list" style="padding:0">
          <div class="wrapper-top" style="border-bottom: none;padding:0 .3rem;">
            <span class="span-one"></span><span class="span-two">友情合作</span><span class="span-three"
                                                                                  @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_friendteam')">查看更多 <span
              class="sworr"> ></span></span>
          </div>
          <!--友情合作-->
          <div class="swiper-container pub_swipe" ref="pub_swipe">
            <div class="swiper-wrapper swiper-wrapper1">
              <div class="swiper-slide" v-for="index in 5">
                <div class="swiper_item1">
                  <div class="tabItem clearfix">
                    <div class="">
                      <div>
                        <!--<img :src="siteInfo.cdn_host+'/bocm/paltformjs/static/image/volunteer/tip_offs.png'" alt="">-->
                        <!--<img :src="'../../../static/image/volunteer/friend1'+index+'.png'" alt="" class="friend_img">-->
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/friend2'+index+'.png'"
                             alt="" class="friend_img">
                        <div class="bm absolute"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>


          </div>
        </div>

        <div class="tab-one-footer"> 一起善源 爱 · 源于善 </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  import download from '@/components/common/download_app.vue'
  var img_url = require('../../../static/image/volunteer/vol_banner.jpg')
  export default {
    data () {
      return {
        isLoading: true,
        bannerData: [],
        listsNew: [],
        getDataDone: true,
        page: 1,
        numberData: {},
        token: '',
        code_type: ''
//        imgList:'friend11.png,friend12.png,friend13.png,friend14.png,friend15.png'.split(',')
//        imgList:'org1.png,org2.png,org3.png'.split(',')
      }
    },
    created () {
      this._appjs.syJsbShowTitleBar('true');
      this._appjs.syJsbSetTitleText('一起志愿')
      this.token = this.getCookie("token")
      this.code_type = this.$route.query.code_type
      this.getUp()
//      this.sendInfo()
//      this.getData()
//      this.getDataList()
//      setTimeout(() => {
//        this.getNumber()
//      }, 150)
//      setTimeout(() => {
//        this.isLoading = false;
//      }, 2000)
      
    },
    mounted () {
      //window.addEventListener('scroll', this.handleScroll);
      new Swiper(this.$refs.pub_swipe, {
        initialSlide: 0,
        direction: 'horizontal',
        slidesPerView: 2.6,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true,
        observer: true,
        observeParents: true,
        freeModeMomentum: true,
        freeModeMomentumRatio: .5,
        slidesOffsetAfter: 0,
//        pagination: '.swiper-pagination',
        slideActiveClass: 'swiper-slide-active-d'
      });
    },
    methods: {
      getUp(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_volunteer_updating').then(res=>{
          if(res.data.code == 701){
            window.location.href= this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=is_updating'
          }else{
            this.goLogin()
          }
        })
      },
      goLogin(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=is_login').then(res => {
          this.isLoading = false
          if(res.data.code !== 200){
            let callback = encodeURIComponent(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=qrcode_go_volunteer&code_type='+this.code_type)
            let url = this.siteInfo.host + '/api/index.php?act=login&callback=' +callback
            window.location.href = url
          }else {
            this.sendInfo()
            this.getData()
            this.getDataList()
            setTimeout(() => {
              this.getNumber()
            }, 150)
          }
        })
      },
      sendInfo(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=volunteer&op=record_volunteer_member&token=' + this.token + '&code_type=' + this.code_type).then(res => {
          if (res.data.code == 200) {
            console.log(res.data.message)
          } else {
            alert(res.data.message)
          }
        })
      },
      //      获取cookie
      getCookie(token){
        if (document.cookie.length > 0) {
          var c_start = document.cookie.indexOf(token + "=")
          if (c_start != -1) {
            c_start = c_start + token.length + 1
            var c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
          }
        }
        return ""
      },
      getData () {
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=index_banner'
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.bannerData = res.data.content
            if (this.bannerData.length === 0) {
              this.bannerData = [{img_url: img_url}]
            }
//            this.bannerData = [this.bannerData[0]]
            if (this.bannerData.length > 1) {
              this.$nextTick(() => {
                new Swiper(this.$refs.pr, {
                  initialSlide: 0,
                  paginationClickable: true,
                  autoplay: 3000,
                  autoplayDisableOnInteraction: false,
                  observer: true,
                  observeParents: true,
                  loop: true,
                  pagination: '.swiper-pagination',
                })

                let e = 'top-swiper-shop0';
                let f = 'top-swiper-shop' + (this.bannerData.length - 1);
                let _this = this;
                document.getElementsByClassName(e)[1].onclick = function () {
                  _this._appjs.syJsbLaunchWebview(_this.bannerData[0].touch_url)
                };
                document.getElementsByClassName(f)[0].onclick = function () {
                  _this._appjs.syJsbLaunchWebview(_this.bannerData[_this.bannerData.length - 1].touch_url)
                }
              })


            }
          } else {
          }
          this.isLoading = false;
        }, (error) => {
          console.log(error)
        })
      },
      getNumber () {
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=index_statistics'
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {

            this.numberData = res.data.content
          } else {
          }
        }, (error) => {
          console.log(error)
        })
      },
      getDataList () {
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=index_recent_recruit&curpage=' + this.page
        this.$http.get(url).then((res) => {
          if (res.data.code === 200 && res.data.content.length !== 0) {
            this.listsNew = this.listsNew.concat(res.data.content)
            this.page++
            this.getDataDone = true
          } else {
          }
        }, (error) => {
          console.log(error)
        })
      },
    },
    components: {loading, download},
  }
</script>

<style>
  .volunteer_index1 .banner .swiper-wrapper {
    height: 3.6rem;
  }

  div[pr] .swiper-pagination-bullet-active {
    background-image: linear-gradient(0deg, #3993FC 0%, #67A9F7 100%);
  }
</style>

<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";

  #volunteer_index {
    height: 100%;
    width: 100%;

  }

  .swiper-container22 {
    height: 3.6rem;
    overflow: hidden;
  }

  .banner {
    height: 3.6rem;
    overflow: hidden;
    img {
      height: 100%;
      display: block;
      border: 0;
      width: 100%;
    }
  }

  .two-list {
    margin: 0.3rem 0;
    width: 100%;
    overflow: hidden;
    & > div {
      float: left;
      width: 3.15rem;
      height: 1rem;
      overflow: hidden;
    }
    .div-one {
      margin: 0 0.4rem 0 0.4rem;
      background-image: linear-gradient(to right, #54DCD5, #4C98FE);
      border-radius: .08rem;
    }
    .div-two {
      background-image: linear-gradient(to right, #A289F7 26%, #778EFF 100%);
      border-radius: 0.08rem;
    }
    .p-one {
      padding: 0.15rem 0 0.19rem;
      font-size: .30rem;
      color: #FFFFFF;
    }
    .p-two {
      font-size: .24rem;
      color: #FFFFFF;
    }
  }

  .wrapper-content {
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    padding: 0.04rem 0.15rem 0.34rem;
    .wrapper-item {
      float: left;
      width: 25%;
      box-sizing: border-box;
      overflow: hidden;
      padding: 0.3rem 0.15rem 0 0.15rem;
      img {
        /*width: 0.5rem;*/
        height: 0.56rem;
        margin-bottom: 0.17rem;
      }
      p {
        font-size: .24rem;
        color: #666A7F;
      }
      .last-p {
        color: #99C6FC;
      }
    }
  }

  .wrapper-list {
    padding: 0 0.3rem;
    overflow: hidden;
    .wrapper-top {
      height: 1rem;
      border-bottom: .01rem solid #DADEE4;
      & > span {
        float: left;
        display: block;
        font-size: .32rem;
        color: #4B4F63;
        line-height: 1rem;
        .sworr {
          transform: scale(1, 2);
        }
      }
      .span-one {
        background: #F8E71C;
        box-shadow: 0 0 .16rem 0 #F0D35B;
        border-radius: 1.1719rem;
        width: 0.06rem;
        height: 0.4rem;
        margin-right: 0.1rem;
        margin-top: 0.28rem;
      }
      .span-three {
        float: right;
        font-size: .26rem;
        color: #B1B8C4;
      }
    }
    .content-div {
      overflow: hidden;

      .list-wrapper:last-of-type {
        border-bottom: 0;
      }
      & > div {
        width: 6.9rem;
        padding: 0.35rem 0 0.47rem;
        box-sizing: border-box;
        font-weight: 300;
        border-bottom: .01rem solid #DADEE4;
        position: relative;
        img {
          position: absolute;
          right: 0;
          width: 1.64rem;
          height: 1.64rem;
          background: #eee;
          top: 0.3rem;
          border: 0;
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
          width: 5.04rem;
          margin-bottom: 0.1rem;
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
          padding-top: .06rem;
          padding-right: 0.49rem;
          border-right: 1px solid #DADEE4;
          margin-right: 0.49rem;
          max-width: 2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          padding-top: .06rem;
          padding-left: 0.36rem;
          background: url(../../../static/image/volunteer/vol-time.png) left center no-repeat;
          background-size: .26rem auto;
        }
        .name-wrapper {
          overflow: hidden;
          padding-top: 0.42rem;
          vertical-align: middle;
          font-size: .24rem;

          color: #99C6FC;
          /*font-weight: 300;*/
          text-align: left;
          height: 0.4rem;
          line-height: 0.4rem;
        }
      }
    }
  }

  .tab-one-footer {
    background: #F7F9FA;
    height: 0.5rem;
    font-size: .24rem;
    color: #DADEE4;
    letter-spacing: 0;
    line-height: .5rem;
  }

  .pub_swipe {
    /*width:100%;*/
    padding-left: .3rem;
    padding-bottom: .3rem;
    /*padding-right:.6rem;*/
  }

  .friend_img {
    /*width:2.5rem;*/
    width: 100%;
  }
</style>
