<template>
  <div>
    <div v-title="'善源公益'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade" >
      <div class="container hide" v-show="!isLoading" v-if="isAllShow">
        <!--公益方式开始-->
        <template v-if="wealTogether.length">
          <div class="blk1 bg"></div>
          <div class="blk05 bg"></div>
          <div class=" index-nav bg">
            <ul>
              <li>
                <div class="touxiang"
                     @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=index&op=project_money_list')">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/zh213.png'" alt=""></div>
                <div class="index-nav-tit">捐款</div>
              </li>
              <li>
                <div class="touxiang"
                     @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=project&op=active_class_list&type=')">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/zh214.png'" alt=""></div>
                <div class="index-nav-tit">捐物</div>
              </li>
              <li>
                <div class="touxiang"
                     @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=index&op=bazaar_list')">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/sy_sale.png'" alt=""></div>
                <div class="index-nav-tit">义卖</div>
              </li>
            </ul>
          </div>
          <div class=" index-nav index-nav2 bg">
            <ul>
              <li>
                <div class="touxiang" @click="_appjs.showToast('即将上线','success');">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/zh216.png'" alt=""></div>
                <div class="index-nav-tit">健康公益</div>
              </li>
              <li>
                <div class="touxiang" @click="_appjs.showToast('即将上线','success');">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/zh217.png'" alt=""></div>
                <div class="index-nav-tit">秒针公益</div>
              </li>
              <li>
                <div class="touxiang" @click="_appjs.showToast('即将上线','success');">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/zh218.png'" alt=""></div>
                <div class="index-nav-tit">知识公益</div>
              </li>
              <li>
                <div class="touxiang"
                     @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=home&op=my_public_archives_boc')">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/zh219.png'" alt=""></div>
                <div class="index-nav-tit">我的公益</div>
              </li>
            </ul>
            <div class="blk2"></div>
          </div>

        <!--公益方式结束-->
        <!--一起公益开始-->
          <div class="blk1" ></div>
          <div class="bg hide" >
            <div class="welfare-task-tit ">一起公益</div>
            <div class="just-no-content-exp ">参与社会公益,共担社会责任</div>
            <div class="line" style="background:#f4f5f6"></div>
            <div class="blk05"></div>
            <div class="activity-outbox bg" v-if="wealTogether.length > 0" v-for="item in wealTogether"
                 @click="_appjs.syJsbLaunchWebview(item.touch_url)">
              <div class="jicai-content bg">
                <div class="jc-goods-list-box">
                  <div class="jc-goods-list active">
                    <div class="jc-goods-list-left"><img :src="item.image_url" alt=""/></div>
                    <div class="jc-goods-list-right">
                      <div class="jc-goods-list-right-tit">{{item.project_name}}</div>
                      <div class="jc-goods-list-right-norm">类   型：{{item.project_mode }} — {{ item.project_type}}</div>
                      <div class="jc-goods-list-right-norm">时   间：{{item.project_starttime}}</div>
                      <div class="jc-goods-list-right-norm">已参与：<a class="main-color">{{item.part_num}}</a>人</div>
                    </div>
                  </div>
                  <div class="activity-inbox-img"><img :src="item.status_image_url" width="100%" alt=""></div>
                </div>
              </div>
            </div>
            <div class="just-no-content hide bg" v-if="wealTogether.length == 0">
              <div class="just-no-content-img">暂无数据</div>
            </div>
            <div class="line"></div>
            <div class="welfare-task-join-btn bg"
                 @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=index&op=public_project_list')">
              进入广场，查看所有公益 &gt;
            </div>
          </div>
        </template>
        <template v-if="is_boc_channel">
          <div class="blk1" style="background:#f4f5f6;"></div>
          <!--大标题开始-->
          <div class="welfare-module-box hide volunteers">
            <div class="welfare-module-tit">志愿者广场</div>
            <div class="welfare-module-line"></div>
            <div class="welfare-module-exp">领取志愿队活动</div>
          </div>
          <!--大标题结束-->

          <!--志愿者组织开始-->
          <div class="welfare-task bg">
            <div class="welfare-task-tit">热门活动</div>
          </div>
          <div class="line" style="background:#f4f5f6;"></div>
          <div class="blk1 bg"></div>
          <div class="activity-outbox bg" v-if="hotActivity.length > 0" v-for="item in hotActivity"
               @click="_appjs.syJsbLaunchWebview(item.touch_url)">
            <div class="jicai-content bg">
              <div class="jc-goods-list-box">
                <div class="jc-goods-list active">
                  <div class="jc-goods-list-left"><img :src="item.image_url" alt=""/></div>
                  <div class="jc-goods-list-right">
                    <div class="jc-goods-list-right-tit">{{item.activity_name}}</div>
                    <div class="jc-goods-list-right-norm">时   间：{{item.activity_starttime}}</div>
                    <div class="jc-goods-list-right-norm">地   点：{{item.activity_address}}</div>
                    <div class="jc-goods-list-right-norm">已报名：<a class="main-color">{{item.register_count}}</a>人</div>
                  </div>
                </div>
                <div class="activity-inbox-img"><img :src="item.status_image_url" width="100%" alt=""></div>
              </div>
            </div>
          </div>
          <div class="just-no-content hide bg" v-if="hotActivity.length == 0">
            <div class="just-no-content-img">暂无数据</div>
          </div>
          <div class="line"></div>
          <div class="welfare-task-join-btn bg"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=help&op=help_activity_class_list')">
            进入广场，查看所有活动 &gt;
          </div>
          <!--志愿者活动结束-->
          <div class="blk1"></div>

          <!--志愿者组织开始-->
          <div class="welfare-task bg">
            <div class="welfare-task-tit">志愿者组织</div>
          </div>
          <div class="welfare-task-littitle">员工志愿者组织</div>
          <div class="index-nav index-nav-sy bg">
            <ul v-if="volunteerList.length > 0">
              <li v-for="item in volunteerList" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                <div class="touxiang"><img :src="item.volunteer_image" alt=""/></div>
                <div class="index-nav-tit">{{item.volunteer_name}}</div>
              </li>
            </ul>
            <div class="just-no-content hide bg" v-if="volunteerList.length == 0">
              <div class="just-no-content-img">暂无数据</div>
            </div>
            <div class="line"></div>
            <div class="welfare-task-join-btn bg"
                 @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer&op=volunteer_all_list')">
              查看所有组织 &gt;
            </div>
          </div>
          <!--志愿者组织结束-->
          <div v-if="isLogin">
            <div class="blk1"></div>
            <!--志愿者活动开始-->
            <div class="welfare-task bg">
              <div class="welfare-task-tit">志愿队活动</div>
              <div class="welfare-task-cont">
                <div class="welfare-task-cont-join" v-if="max_register_info.length === 0">我最近参与的活动：<span
                  class="welfare-task-cont-join-no" style="color: #999">您还没有参与哦！</span></div>
                <div class="welfare-task-cont-join" v-if="max_register_info.length !== 0">我最近参与的活动：<span
                  class="welfare-task-cont-join-no" style="color: #999">{{max_register_info.activity_name}}</span></div>
                <div id="activity_content" v-if="is_volunteer_member">
                  <div class="welfare-task-cont-join" v-if="max_publisher_info.length === 0">我最近发布的活动：<span
                    class="welfare-task-cont-join-yes" style="color: #999">您还没有发布哦！</span></div>
                  <div class="welfare-task-cont-join" v-if="max_publisher_info.length !== 0">我最近发布的活动：<span
                    class="welfare-task-cont-join-yes" style="color: #999">{{max_publisher_info.activity_name}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!--<div class="blk1"></div>-->
        <!--<div class="welfare-module-box hide my-welfare">-->
          <!--<div class="welfare-module-tit">我的公益我主张</div>-->
          <!--<div class="welfare-module-line"></div>-->
          <!--<div class="welfare-module-exp">建立您专属的公益资金账户，按照您的要求使用</div>-->
        <!--</div>-->
        <!--<div class="bg hide">-->
          <!--<div class="welfare-task-tit ">单位公益</div>-->
          <!--<div class="line" style="background:#f4f5f6"></div>-->
          <!--<div class="bg hide">-->
            <!--<div class="blk05"></div>-->
            <!--<div class="sy-fund-box" v-for="(item, index) in fundList" v-if="index !== 2">-->
              <!--<div class="sy-fund-box-list hide">-->
                <!--<div class="sy-fund-box-list-L">资金名称：</div>-->
                <!--<div class="sy-fund-box-list-R" style="height:auto;">{{item.fund_name}}</div>-->
              <!--</div>-->
              <!--<div class="sy-fund-box-list sy-fund-box-list2 hide" style="margin-top:-0.08rem">-->
                <!--<div class="sy-fund-box-list-L">当前余额：</div>-->
                <!--<div class="sy-fund-box-list-R"><span class="main-color">{{item.yue}}</span>元-->
                  <!--<div class="sy-fund-box-list-R-btn" @click="_appjs.showToast('尚未开放','success');">使用</div>-->
                  <!--<div class="sy-fund-box-list-R-btn" @click="_appjs.showToast('尚未开放','success');">捐入</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-if="fundList.length > 2">-->
            <!--<div class="line"></div>-->
            <!--<div class="welfare-task-join-btn bg"-->
                 <!--@click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=index&op=fund_list')">查看更多-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="just-no-content hide" v-if="fundList.length  == 0">-->
            <!--<div class="just-no-content-img">暂无数据</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="blk1"></div>-->
        <!--&lt;!&ndash;一起公益联盟&ndash;&gt;-->
        <!--<div class="welfare-module-box hide welfare-union">-->
          <!--<div class="welfare-module-tit">一起公益联盟</div>-->
          <!--<div class="welfare-module-line"></div>-->
          <!--<div class="welfare-module-exp">参与社会公益，共担社会责任</div>-->
        <!--</div>-->
        <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/zh220.jpg'" width="100%" alt=""-->
             <!--style=" display:block;">-->
      </div>


    </transition>
    <div class="is_all_show" v-if="!isAllShow">
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/sywelfare11.png'" alt="">
      <!--<img src="../../../../static/image/syweal/sywelfare1.png" alt="">-->
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/sywelfare13.png'" alt="">
      <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/sywelfare3.png'" alt="">-->
    </div>
  </div>
</template>

<script type="application/javascript">
  import loading from '../../loading/loading.vue'
  export default {
    data () {
      return {
        isLoading: true,
        wealTogether: [],
        hotActivity: [],
        volunteerList: [],
        fundList: [],
        isLogin: false,
        max_register_info: [],
        is_volunteer_member: false,
        max_publisher_info: [],
        is_boc_channel:false,  // 是否是中行渠道
        isAllShow:true,   // 全部是否显示
        has_project:false

      }
    },
    components: {
      'sy-loading': loading
    },
    created () {
      this.getDate()
    },
    mounted () {
      this._appjs.syJsbShowTitleBar('true')
    },
    methods: {
      getDate () {
        this.$http.get(this.siteInfo.host + '/api/index.php?act=sypw&op=index').then(res => {
          this.is_boc_channel = res.data.content.is_boc_channel
          this.wealTogether = res.data.content.bazaar_list
          this.fundList = res.data.content.fund_list
          this.isLogin = res.data.content.is_login
          this.isLoading = false
          if(this.is_boc_channel){
            this.hotActivity = res.data.content.activity_list
            this.max_register_info = res.data.content.max_register_info
            this.max_publisher_info = res.data.content.max_publisher_info
            this.is_volunteer_member = res.data.content.is_volunteer_member
            this.volunteerList = res.data.content.volunteer_list
          }
          this.isAllShow = this.is_boc_channel || this.wealTogether.length
//          this.isAllShow = false
          this.has_project = res.data.content.has_project
        });
      }
    }
  }
</script>
<style scoped>
  .welfare-module-box {
    width: 7.5rem;
    height: 1.3rem;
    text-align: center;
    color: #fff;
  }

  .welfare-module-tit {
    width: 7.5rem;
    font-size: 0.32rem;
    line-height: 0.5rem;
    margin-top: 0.16rem;
  }

  .welfare-module-line {
    width: 0.42rem;
    height: 0.06rem;
    background: #fff;
    margin: 0 auto;
  }

  .welfare-module-exp {
    font-size: 0.28rem;
    line-height: 0.46rem;
    width: 7.5rem;
  }

  .volunteers {
    background: url(/bocm/platformjs/static/image/syweal/zh166.jpg) no-repeat;
    background-size: 100% 100%;
  }

  .my-welfare {
    background: url(/bocm/platformjs/static/image/syweal/zh168.jpg) no-repeat;
    background-size: 100% 100%;
  }

  .welfare-union {
    background: url(/bocm/platformjs/static/image/syweal/zh170.jpg) no-repeat;
    background-size: 100% 100%;
  }

  .volunteer-organization-img img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .welfare-task {
    width: 7.5rem;
  }

  .welfare-task-tit {
    height: 1rem;
    width: 7.5rem;
    background: url(/bocm/platformjs/static/image/syweal/zh158.png) no-repeat center 0.12rem;
    background-size: 3.52rem 0.5rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.3rem;
  }

  .welfare-task-cont {
    padding: 0 0.24rem 0.4rem;
    box-sizing: border-box;
    color: #666;
  }

  .welfare-task-cont-join {
    line-height: 0.34rem;
    padding: 0.06rem 0;
    font-size: .28rem;
  }

  .welfare-task-cont-join-no {
    color: #999;
  }

  .welfare-task-cont-join-yes {
    color: #333;
  }

  .welfare-task-littitle {
    height: 0.68rem;
    line-height: 0.68rem;
    width: 7.5rem;
    box-sizing: border-box;
    padding-left: 0.44rem;
    background: url(/bocm/platformjs/static/image/syweal/zh159.png) no-repeat left top;
    background-size: 0.35rem 0.43rem;
    color: #666;
    font-size: 0.24rem;
  }

  .welfare-task-join-btn {
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.28rem;
    color: #666;
  }

  .lm-download-line-box span {
    line-height: 0.72rem;
    padding: 0 0.2rem;
    color: #666;
    float: left;
  }

  .activity-inbox-img {
    position: absolute;
    left: 0.24rem;
    top: 0.1rem;
    width: 0.92rem;
    height: 0.92rem;
  }

  .jc-goods-list-box {
    position: relative;
  }

  .jc-goods-list .jc-goods-list-right {
    border: none;
  }

  .just-no-content-exp {
    line-height: 0.3rem;
    font-size: 0.24rem;
    color: #666;
    text-align: center;
    width: 7.5rem;
    margin-bottom: 0.4rem
  }

  .just-no-content {
    padding: 0.24rem 0;
    width: 7.5rem;
    box-sizing: border-box;
  }

  .just-no-content-img {
    width: 2rem;
    text-align: right;
    height: 0.92rem;
    line-height: 1rem;
    color: #999;
    font-size: 0.24rem;
    margin: 0 auto;
    background: url(/bocm/platformjs/static/image/syweal/zh160.png) no-repeat left center;
    background-size: 0.81rem 0.85rem;
  }

  .index-nav {
    width: 7.5rem;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .index-nav li {
    width: 2.5rem;
    float: left;
    text-align: center;
    padding: .16rem 0 0.2rem;
    box-sizing: border-box;
    border-left: none;
    position: relative;
  }

  .touxiang {
    width: 1.2rem;
    height: 1.2rem;
    display: block;
    margin: 0 auto .12rem;
    border-radius: 0.6rem;
    overflow: hidden;
  }

  .index-nav ul {
    overflow: hidden;
  }

  .index-nav li img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .index-nav-tit, .index-nav-fonts {
    font-size: .26rem;
    height: .40rem;
    line-height: .40rem;
    color: #333;
  }

  .index-nav a {
    color: #444;
  }

  .index-nav2 .touxiang {
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    margin: 0 auto .12rem;
    border-radius: 2rem;
    overflow: hidden;
  }

  .index-nav2 ul {
    padding: 0 0.24rem;
  }

  .index-nav2 li {
    width: 1.755rem;
    float: left;
    text-align: center;
    padding: .24rem 0 0.2rem;
    box-sizing: border-box;
    border-left: none;
  }

  .index-nav2 li span {
    width: 0.2rem;
    height: 0.24rem;
    background: url(/bocm/platformjs/static/image/syweal/zh44.png) no-repeat center center/0.2rem 0.23rem;
    position: absolute;
    right: 0.54rem;
    bottom: 0.72rem;
  }

  .index-outer-slide ul {
    width: 7.5rem;
    box-sizing: border-box;
    padding: 0 0 0 0.24rem;
  }

  .index-outer-slide ul li {
    float: left;
    margin-right: 0.24rem;
    background: #fff;
    margin-bottom: 0.2rem;
  }

  .slide-top img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .slide-bot-number span {
    font-size: 0.24rem;
    color: #333;
  }

  .techanguan li {
    float: left;
    width: 1.65rem;
    height: 1.15rem;
    margin-right: 0.14rem;
    margin-bottom: 0.2rem;
  }

  .techanguan img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .sy-fund-box {
    padding: 0.1rem 0;
  }

  .sy-fund-box-list {
    padding: 0 0.24rem;
    width: 7.5rem;
    box-sizing: border-box;
    margin-bottom: 0.1rem
  }

  .sy-fund-box-list2 {
    margin-bottom: 0.04rem;
  }

  .sy-fund-box-list-L {
    width: 1.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    color: #666;
    float: left;
    font-size: 0.24rem;
  }

  .sy-fund-box-list-R {
    width: 5.62rem;
    height: 0.4rem;
    line-height: 0.4rem;
    color: #333;
    float: left;
    font-size: 0.3rem;
    text-align: left;
  }

  .sy-fund-box-list-R-btn {
    width: 1.32rem;
    height: 0.56rem;
    line-height: 0.56rem;
    text-align: center;
    color: #fff;
    background: #f31e37;
    border-radius: 0.04rem;
    float: right;
    margin-left: 0.1rem;
  }

  .sy-fund-box-list2 .sy-fund-box-list-L, .sy-fund-box-list2 .sy-fund-box-list-R {
    height: 0.56rem;
    line-height: 0.56rem;
  }

  .index-nav-sy {
    width: 7.5rem;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0.06rem 0.24rem 0;
  }

  .index-nav-sy li {
    width: 1.755rem;
    float: left;
    text-align: center;
    padding: .16rem 0 0.2rem;
    box-sizing: border-box;
    border-left: none;
    position: relative;
  }

  .touxiang {
    width: 1.2rem;
    height: 1.2rem;
    display: block;
    margin: 0 auto .12rem;
    border-radius: 2rem;
    overflow: hidden;
    border: 1px solid #e0e0e0;
  }

  ul {
    overflow: hidden;
  }

  .index-nav-sy li img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .index-nav-sy .index-nav-tit {
    width: 80%;
    margin: 0 auto;
    font-size: .26rem;
    line-height: .40rem;
    color: #333;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .is_all_show img{
    width:100%;
    display: block;
  }

</style>
