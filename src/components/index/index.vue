<template>
    <div>
      <transition name="fade">
        <sy-loading v-show="isLoading"></sy-loading>
      </transition>
      <transition name="fade">
        <div v-show="!isLoading">
          <!--弹窗-->
          <div class="mark" v-if="indexPop && pop_info" @click="close_add_cookie()">
            <div class="markCon">
              <div class="markImg">
                <img @click="_appjs.syJsbLaunchWebview(pop_info.touch_url)" :src="pop_info.img_url">
              </div>
              <div class="markClose">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-close.png'">
              </div>
            </div>
          </div>
          <div class="headcon container">
            <!-- 搜索框 -->
            <div id="top_search" class="index-search-outer-box">
              <form id="key_form" method="post" class="top-form-search" v-on:submit.prevent="search();">
                <div class="index-search-box">
                  <div class="index-search-left">
                    <div class="index-search-icon"></div>
                    <div class="index-search-in"><input id="key" placeholder="大家都在搜：杂粮、香菇、核桃" name="key" v-model="key"></div>
                  </div>
                  <div class="index-search-center" @click="search()">搜索</div>
                  <div class="index-search-right" @click="_appjs.syJsbShowMoreMenu()"></div>
                </div>
              </form>
            </div>
            <!--轮播图-->
            <div class="swiper-container" ref="lunbotu">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in banners">
                  <img :class="'top-swiper'+index" :src="item.banner_image" alt="banner正努力加载…"  @click="_appjs.syJsbLaunchWebview(item.banner_url)">
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
            <div v-if="system_notify" style="left:0;top:0;width:100%;height:0.7rem;font-size:.28rem;z-index: 9999999">
              <div id="gongao">
                <div class="hide">
                  <div class="gonggao-left"></div>
                  <!--<a @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=index&op=index#/ranking_list')"><div class="gonggao-left"></div></a>-->
                  <div id="scroll_div" class="scroll_div">
                    <div style="width:30000px">
                      <div id="scroll_begin" style="min-width:6.5rem;text-align: left;">
                        {{system_notify}}
                      </div>
                      <div id="scroll_end">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 公益问答 -->
            <div class="v2-zizhu bg">
              <div class="v2-zizhu-list active" @click="_appjs.syJsbLaunchWebview(question_day.touch_url)">
                <div class="v2-zizhu-list-L v2-zizhu-list-L-ques ">
                  <span class="line-left1"></span>
                  <a class="ques-txt">{{question_day.title}}</a>
                </div>
                <div class="v2-zizhu-list-R"></div>
              </div>
            </div>
            <!-- 公益排名 -->
            <div v-if="club_circle ==='no'">
              <div class="blk1"></div>
              <div class="zh-index-list bg">
                <div class="index-ranking-box hide">
                  <div class="index-ranking-box-L">
                    <a @click="_appjs.syJsbLaunchWebview(member_rank.touch_url_more)" class="rank">
                      <div class="index-ranking-box-L-top">您在所属单位的排名</div>
                      <div class="index-ranking-box-L-center"><em><span>{{member_rank.used_syb_rank}}</span> / {{member_rank.total_member}}</em></div>
                      <div class="index-ranking-box-L-bot">No.1：{{member_rank.danwei_no_1}}</div>
                    </a>
                  </div>
                  <div class="index-ranking-box-C"></div>
                  <div class="index-ranking-box-L index-ranking-box-L2">
                    <a @click="_appjs.syJsbLaunchWebview(dept_rank.touch_url_more)" class="rank">
                      <div class="index-ranking-box-L-top">您在所属部门的排名</div>
                      <div class="index-ranking-box-L-center"><em><span>{{dept_rank.member_dept_rank}}</span> / {{dept_rank.total_dept_member}}</em></div>
                      <div class="index-ranking-box-L-bot">No.1：{{member_rank.dept_no_1}}</div>
                    </a>
                  </div>
                  <a @click="_appjs.syJsbLaunchWebview(member_rank.touch_url_more)">
                    <div class="index-ranking-box-R"></div>
                  </a>
                </div>
              </div>
              <!-- 帮扶快讯 -->
              <div class="thanks bg">
                <div class="thanks-left"></div>
                <div class="thanks-right">
                  <div class="scrollbox">
                    <ul :class="{scrolldiv:isscrolldiv,scroll:isscroll}"  :style="{ marginTop }" >
                      <li v-for="item in bangfukuixun"><span>{{ item }}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="blk1"></div>
          </div>
            <!--运营活动-->
            <!--<div class="nianzhonghuikui">-->
                <!--<img @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=topic&op=smile_v3')" :src="siteInfo.host+'/bocm/platformjs/static/image/yunyingactivity/20170815_smile_v3.jpg'" alt="">-->
            <!--</div>-->
            <!--<div class="blk1"></div>-->
            <!--index-tabbar开始-->
            <ul class="index-tabbar container">
                <li class="index-tabbar-daai"
                    @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index')">
                    <img :src="union_banner_url" alt="加载中"></li>
            </ul>
            <!--大爱超市-->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <sy-daai></sy-daai>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
      </transition>
    </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  import daaichaoshi from './daaichaoshi.vue'
  import Swiper from '../../../static/js/swiper-3.4.2.min'
  export default {
    data () {
      return {
        isLoading: true,
        selected: '1',
        banners: [],
        member_rank: {},
        club_circle: "no",
        dept_rank: {},
        question_day: {},
        bangfukuixun: [],
        bfkxText: '',
        bfkxIndex: 0,
        key: '',
        isscrolldiv: true,
        isscroll: false,
        union_banner_url: '',
        system_notify: '',
        indexPop: false,
        pop_info: {},
        info: [],
      }
    },
    computed: {
      marginTop () {
        return - this.bfkxIndex * 0.44 + 'rem'
      }
    },
    created: function () {
      this._appjs.syJsbShowToolBar('true')
      this.getData()
    },
    mounted: function () {
      this._appjs.syJsbShowTitleBar('false')
      setInterval( () => {
        if( this.bfkxIndex < this.bangfukuixun.length-1) {
          this.bfkxIndex+= 1
          this.isscrolldiv = true
          this.isscroll = false
        }else{
          this.isscroll= true
          this.isscrolldiv = false
          this.bfkxIndex = 0
        }
      },1800)
    },
    components: {
      'sy-daai': daaichaoshi,
      'sy-loading': loading
    },
    methods: {
      getData () {
        this.$http.get(this.siteInfo.host + '/api/index.php?act=index&op=index&page=1')
          .then(res => {
            this.banners = res.data.content.banner_list
            this.question_day = res.data.content.question_day
            this.bangfukuixun = res.data.content.bangfukuaixun
            this.rank_info = res.data.content.rank_info
            this.club_circle = this.rank_info.club_circle
            this.member_rank = this.rank_info
            this.dept_rank = this.rank_info
            this.channel = res.data.content.channel
            this.update_channel = res.data.content.update_channel
            this.union_banner_url = res.data.content.union_banner_url
            this.system_notify = res.data.content.system_notify
            this.isLoading = false
            this.pop_info = res.data.content.pop_info
            if (!this.union_banner_url) {
              this.union_banner_url = this.siteInfo.host+'/bocm/platformjs/static/image/daai01.jpg'
            }
            if(this.update_channel === 'yes') {
              this._appjs.saveChannel(this.channel)
            }
          }).then(()=>{
          this.$nextTick(()=>{
            new Swiper(this.$refs.lunbotu, {
              initialSlide: 0,
              pagination: '.swiper-pagination',
              paginationClickable: true,
              autoplay: 2000,
              autoplayDisableOnInteraction: false,
              observer: true,
              observeParents: true,
              loop: true
            });
            let _this = this;
            let firstSelector = 'top-swiper0';
            let lastSelector = 'top-swiper'+ (this.banners.length - 1);
            document.getElementsByClassName(firstSelector)[1].onclick = function(){
              _this._appjs.syJsbLaunchWebview(_this.banners[0].banner_url)
            };
            document.getElementsByClassName(lastSelector)[0].onclick = function(){
              _this._appjs.syJsbLaunchWebview(_this.banners[_this.banners.length - 1].banner_url)
            }
          })
        }).then(()=>{
            let index_pop = this.$cookie.get('index_pop')
            if(index_pop !== '1') {
                this.info = this._appjs.syJsbGetAppVersion()
                if(this.info['platform'] === 'ios') {
                    var info = this.info['version']
                    info.scope = this
                    info.then(function (version) {
                        if(version > 31) {
                            info.scope.indexPop = true
                            if(info.scope.indexPop && info.scope.pop_info) {
                                info.scope.hideToolBar()
                            }
                        }
                    })
                }
                if(this.info['platform'] === 'android') {
                    this.indexPop = true
                    if(this.indexPop && this.pop_info) {
                        this.hideToolBar()
                    }
                }
            }
        })
      },
      hideToolBar () {
        this._appjs.syJsbShowToolBar('false')
      },
      search () {
        var url = this.siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index&key=' + this.key;
        this._appjs.syJsbLaunchWebview(url)
      },
      close_add_cookie () {
        this._appjs.syJsbShowToolBar('true')
        this.$cookie.set('index_pop', '1', 1)
        this.indexPop = false
        /*var url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_index&marathon_id=1&from_action=index&key=' + this.key;
        this._appjs.syJsbLaunchWebview(url)*/
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*弹窗*/
  .mark{
    height: 100%;
    width: 100%;
    background:rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999999;
  }
  .mark .markCon{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .mark .markImg{
    width: 5.54rem;
    height: 7.12rem;
    background-color: #e1e1e1;
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    border-radius:20px;
  }
  .mark .markImg img{
    width: 100%;
    height: 7.12rem;
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    border-radius:20px;
  }
  .mark .markClose{
    margin-top: 0.66rem;
  }
  .mark .markClose img{
    height: 0.84rem;
    width: 0.84rem;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
  }
  /* hscroll */
  #gongao {
    height: 0.7rem;
    top: 0;
    left: 0;
    background: #ffeddb;
    padding: 0 0.24rem;
    box-sizing: border-box;
  }

  .gonggao-left {
    height: 0.7rem;
    width: 0.62rem;
    float: left;
    background:url(/bocm/platformjs/static/image/detail/detail-inform.png) no-repeat left center; background-size:0.3rem 0.31rem;
  }

  .scroll_div {
    width: 6.4rem;
    height: 0.7rem;
    float: left;
    white-space: nowrap;
    overflow: hidden;
  }

  #scroll_begin, #scroll_end {
    line-height: 0.7rem;
    color: #f37120;
    float: left;
    /*transform: translateX(100%);*/
  }
  #scroll_begin{
    -webkit-animation: delay_scroll 20s linear 0s infinite normal;
    animation: delay_scroll 20s linear 0s infinite normal;
  }

  @-webkit-keyframes delay_scroll {
    0%{
      -webkit-transform: translateX(6.5rem);
      transform: translateX(6.5rem);
    }
    100%{
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
  @keyframes delay_scroll {
    0%{
      -webkit-transform: translateX(6.5rem);
      transform: translateX(6.5rem);
    }
    100%{
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
  .system_notify {line-height: 0.6rem; background: #f4f5f6; padding-left: 0.24rem; color: #f00; width: 7.5rem; box-sizing: border-box; font-size: 0.24rem;}
  #top_search {background: rgba(180, 180, 180, 0.1);}
  .top-form-search {width: 99%;}
  .swiper-container {width: 7.5rem; height:3.5rem;}
  .swiper-slide { text-align: center;font-size: 18px; background: #fff;/* Center slide text vertically */display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;
    display: flex;-webkit-box-pack: center;-ms-flex-pack: center; -webkit-justify-content: center;justify-content: center;-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;}
  .swiper-wrapper img{ width:7.5rem; height:3.5rem; display:block;}
  .mint-swipe-item img{ width:7.5rem; height:100%; display:block;}
  .swiper-pagination .swiperpaginationactive {background: #f31e37;}
  /*head*/
  .headcon{position: relative;}
  .index-search-outer-box{ width:7.5rem; padding:0.5rem 0 0.16rem 0.5rem; z-index:10; box-sizing:border-box; background:url(/bocm/platformjs/static/image/zh48.png) repeat-x;}
  .index-search-outer-box{ position: absolute;  top:0; left:0;}
  .index-search-box{  width:6.72rem; overflow:hidden; }
  .index-search-left{ width:5.32rem; height:0.64rem; background:rgba(255,255,255,0.8); border-radius:2rem; overflow:hidden;float:left;}
  .index-search-icon{ width:0.64rem; height:0.64rem; background:url(/bocm/platformjs/static/image/zh35.png) no-repeat center center/0.3rem 0.3rem; float:left;}
  .index-search-in{ float:left; padding:0.12rem 0;}
  .index-search-in input{ font-size:0.24rem; height:0.4rem; width:4.3rem; line-height:0.4rem; border:none; background:rgba(0,0,0,0)}
  .index-search-center{ float: left; height: 0.64rem; line-height: 0.68rem; font-size: 0.26rem; color: #666; width: 0.58rem; margin-left: 0.12rem;}
  .index-search-right{ float:right; height:0.64rem; width:0.5rem; background:url(/bocm/platformjs/static/image/zh36.png) no-repeat center center/0.3rem 0.3rem;}

  .v2-zizhu-list-L-ques{position:relative;width: 6.4rem; height: 0.88rem;line-height: 0.88rem;padding-top:0.14rem; background:url(/bocm/platformjs/static/image/zh100.png) no-repeat center left/1.27rem 0.32rem; padding-left: 1.4rem; box-sizing: border-box; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;text-align: left}
  .line-left1{display:inline-block;height:0.4rem;width:0.02rem;background:#e9e9e9;margin:0 0.18rem;}
  .v2-zizhu-list-L-ques .ques-txt {position:absolute;top:0.32rem;font-size:0.3rem;color:#676767;display:inline-block;height:0.52rem;line-height:0.3rem;}
  .index-ranking-box{ padding-top:0.4rem;}
  .index-ranking-box-L{ width:3.75rem; float:left; padding-left:0.5rem; box-sizing:border-box;text-align:left;}
  .rank {color:#333;}
  .index-ranking-box-L.index-ranking-box-L2{ width:3.12rem; float:left; padding-left:0.5rem; box-sizing:border-box;}
  .index-ranking-box-L-top{ line-height:0.44rem; font-size:0.26rem;}
  .index-ranking-box-L-center{ line-height:0.6rem; font-size:0.28rem;}
  .index-ranking-box-L-center span{ font-size:0.4rem; color:#f31e37;}
  .index-ranking-box-L-bot{ line-height:0.44rem; font-size:0.26rem; color:#999;}
  .index-ranking-box-C{ width:1px; height:0.82rem; float:left; background:#eee; margin-top:0.32rem}
  .index-ranking-box-R {width: 0.36rem; height:1.54rem; background:url(/bocm/platformjs/static/image/ap27.png) no-repeat right center;background-size: 0.15rem 0.26rem;float: right; margin-right:0.24rem;}

  .thanks{ height:0.88rem; width:7.5rem; padding-left:0.24rem; box-sizing:border-box; line-height:0.88rem; margin:0 auto 0.01rem; color:#666; font-size:0.26rem;}
  .thanks-left{ width:0.8rem; height:0.88rem; float:left; background:url(/bocm/platformjs/static/image/bugle.png) no-repeat 0.3rem center/0.35rem 0.34rem;}
  .thanks-right{float:left;  box-sizing:border-box;width:5.4rem; height:0.44rem; margin-top:0.22rem; line-height:0.44rem; padding-left:0.2rem; text-align:left;}
  .scrollbox{ width:5.4rem; height:0.44rem;overflow:hidden;}
  $times: 30s;
  .scrolldiv{
    width:5.4rem;
    overflow:hidden;
    -webkit-transition: margin-top 0.7s cubic-bezier(0.42,0,0.58,1);
    transition: margin-top 0.7s cubic-bezier(0.42,0,0.58,1);
    /* animation: broadcast $times ease 1s infinite ;
     -moz-animation:broadcast $times ease 1s infinite; !* Firefox *!
     -webkit-animation:broadcast $times ease 1s infinite; !* Safari and Chrome *!
     -o-animation:broadcast $times ease 1s infinite;!* Opera *!*/
  }
  .scroll{
    width:5.4rem;
    overflow:hidden;
  }
  /**********************/
  .scrolldiv li{height:0.44rem;line-height:0.44rem; zoom:1; text-align: left;overflow:hidden;}
  .scrolldiv li span{display:inline-block;height:0.44rem;margin-bottom:0.22rem;text-align: left;}
  @keyframes broadcast{0%{margin-top:0}
    5.26%{margin-top:-.44rem}
    10.52%{margin-top:-.88rem}
    15.78%{margin-top:-1.32rem}
    21.04%{margin-top:-1.76rem}
    26.3%{margin-top:-2.2rem}
    31.56%{margin-top:-2.64rem}
    36.82%{margin-top:-3.08rem}
    42.08%{margin-top:-3.52rem}
    47.34%{margin-top:-3.96rem}
    52.6%{margin-top:-4.4rem}
    57.86%{margin-top:-4.84rem}
    63.12%{margin-top:-5.28rem}
    68.38%{margin-top:-5.72rem}
    73.64%{margin-top:-6.16rem}
    78.9%{margin-top:-6.6rem}
    84.16%{margin-top:-7.04rem}
    89.42%{margin-top:-7.48rem}
    94.68%{margin-top:-7.92rem}
    100%{margin-top:-8.36rem}
  }
  @-webkit-keyframes broadcast{0%{margin-top:0}
    5.26%{margin-top:-.44rem}
    10.52%{margin-top:-.88rem}
    15.78%{margin-top:-1.32rem}
    21.04%{margin-top:-1.76rem}
    26.3%{margin-top:-2.2rem}
    31.56%{margin-top:-2.64rem}
    36.82%{margin-top:-3.08rem}
    42.08%{margin-top:-3.52rem}
    47.34%{margin-top:-3.96rem}
    52.6%{margin-top:-4.4rem}
    57.86%{margin-top:-4.84rem}
    63.12%{margin-top:-5.28rem}
    68.38%{margin-top:-5.72rem}
    73.64%{margin-top:-6.16rem}
    78.9%{margin-top:-6.6rem}
    84.16%{margin-top:-7.04rem}
    89.42%{margin-top:-7.48rem}
    94.68%{margin-top:-7.92rem}
    100%{margin-top:-8.36rem}
  }
  @-moz-keyframes broadcast{0%{margin-top:0}
    5.26%{margin-top:-.44rem}
    10.52%{margin-top:-.88rem}
    15.78%{margin-top:-1.32rem}
    21.04%{margin-top:-1.76rem}
    26.3%{margin-top:-2.2rem}
    31.56%{margin-top:-2.64rem}
    36.82%{margin-top:-3.08rem}
    42.08%{margin-top:-3.52rem}
    47.34%{margin-top:-3.96rem}
    52.6%{margin-top:-4.4rem}
    57.86%{margin-top:-4.84rem}
    63.12%{margin-top:-5.28rem}
    68.38%{margin-top:-5.72rem}
    73.64%{margin-top:-6.16rem}
    78.9%{margin-top:-6.6rem}
    84.16%{margin-top:-7.04rem}
    89.42%{margin-top:-7.48rem}
    94.68%{margin-top:-7.92rem}
    100%{margin-top:-8.36rem}
  }
  @-ms-keyframes broadcast{0%{margin-top:0}
    5.26%{margin-top:-.44rem}
    10.52%{margin-top:-.88rem}
    15.78%{margin-top:-1.32rem}
    21.04%{margin-top:-1.76rem}
    26.3%{margin-top:-2.2rem}
    31.56%{margin-top:-2.64rem}
    36.82%{margin-top:-3.08rem}
    42.08%{margin-top:-3.52rem}
    47.34%{margin-top:-3.96rem}
    52.6%{margin-top:-4.4rem}
    57.86%{margin-top:-4.84rem}
    63.12%{margin-top:-5.28rem}
    68.38%{margin-top:-5.72rem}
    73.64%{margin-top:-6.16rem}
    78.9%{margin-top:-6.6rem}
    84.16%{margin-top:-7.04rem}
    89.42%{margin-top:-7.48rem}
    94.68%{margin-top:-7.92rem}
    100%{margin-top:-8.36rem}
  }
  @-o-keyframes broadcast{0%{margin-top:0}
    5.26%{margin-top:-.44rem}
    10.52%{margin-top:-.88rem}
    15.78%{margin-top:-1.32rem}
    21.04%{margin-top:-1.76rem}
    26.3%{margin-top:-2.2rem}
    31.56%{margin-top:-2.64rem}
    36.82%{margin-top:-3.08rem}
    42.08%{margin-top:-3.52rem}
    47.34%{margin-top:-3.96rem}
    52.6%{margin-top:-4.4rem}
    57.86%{margin-top:-4.84rem}
    63.12%{margin-top:-5.28rem}
    68.38%{margin-top:-5.72rem}
    73.64%{margin-top:-6.16rem}
    78.9%{margin-top:-6.6rem}
    84.16%{margin-top:-7.04rem}
    89.42%{margin-top:-7.48rem}
    94.68%{margin-top:-7.92rem}
    100%{margin-top:-8.36rem}
  }
  .index-table{width:7.5rem; box-sizing:border-box;}
  .index-table .title{height:0.8rem ;border-bottom: 3px solid #e7e7e7;padding-bottom:0.2rem;}
  .index-table .title-list{ position: relative; top:0.12rem;}
  .index-table .title-list li{ width:3.748rem; line-height:0.8rem; text-align: center; float: left; display: inline; font-size:0.3rem; box-sizing:border-box;}
  .index-table .title-list li>a{ color:#333;}
  .index-table .title-list li .on{ color: #f31e37;}
  .index-table .title-list p{position:absolute!important;top:0.9rem;left:0px;width:3.75rem;height:0.14rem;border-top: 3px solid #f31e37; overflow: hidden; text-align: center;}
  .index-table .title-list b{display:inline-block;width:0;height:0;margin-top:-0.06rem;border-style:solid dashed dashed dashed;border-width:0.18rem;border-color: #f31e37 #fff #fff #fff;overflow: hidden;zoom: 1;font-size: 0;}

  .line1 {
        height: 0.1rem;
    }

    .fontS > div {
        font-size: 0.3rem !important;
    }

    .daaibar {
        width: 100%;
        height: 1rem;
    }

    .daaibar img {
        width: 100%;
        height: 100%;
    }

    .index-table .title {
        height: 0.8rem;
        border-bottom: 3px solid #e7e7e7;
        padding-bottom: 0.2rem;
    }

    .index-table .title-list {
        position: relative;
        top: 0.12rem;
    }

    .index-table .title-list li {
        width: 3.748rem;
        line-height: 0.8rem;
        text-align: center;
        float: left;
        display: inline;
        font-size: 0.3rem;
        box-sizing: border-box;
    }

    .index-table .title-list li.on {
        color: #f31e37;
    }

    .index-table .title-list p {
        position: absolute;
        top: 0.866rem;
        left: 0px;
        width: 3.75rem;
        height: 0.14rem;
        border-top: 3px solid #f31e37;
        overflow: hidden;
        text-align: center;
        z-index: 2;
    }

    .index-table .title-list b {
        display: inline-block;
        width: 0;
        height: 0;
        margin-top: -0.06rem;
        border-style: solid dashed dashed dashed;
        border-width: 0.18rem;
        border-color: #f31e37 transparent transparent transparent;
        overflow: hidden;
        zoom: 1;
        font-size: 0;
    }

    .index-tabbar {
        width: 7.5rem;
        height: 1.4rem;
        overflow: hidden;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
    }

    .index-tabbar-daai {
        width: 100%;
        height: 1.4rem;
    }

    .index-tabbar-daai > img {
        width: 100%;
        height: 100%;
    }

    .index-tabbar-sy > img {
        width: 2.2rem;
        height: 1.4rem;
    }

    .nianzhonghuikui {
        width: 100%;
    }

    .nianzhonghuikui img {
        width: 100%;
        display: block;
        height: auto;
    }
</style>
