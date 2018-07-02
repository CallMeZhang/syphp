<template>
  <div style="height: 100%;width: 100%;">
    <div v-title="'公益活动'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name='fade'>
      <div class="pubwelActive">
        <!--tab切换-->
        <div class="publicTab">
          <div class="tabList">
            <div class="link" style="width: 100%;height: 0.2rem;background-color:#F7F9FA;"></div>
            <ul class="clearfix">
              <li class="fl" @click="selectTab('a')">
                <div :class="type == ''? 'sel':''">全部活动</div>
              </li>
              <li class="fl" @click="selectTab('b')">
                <div :class="type == 'offline_project'? 'sel':''">同城善行</div>
              </li>
              <li class="fl" @click="selectTab('c')">
                <div :class="type == 'online_project'? 'sel':''">线上联动</div>
              </li>
              <li class="fl" @click="selectTab('d')">
                <div :class="type == 'all_ajax'? 'sel':''">志愿队</div>
              </li>
            </ul>
          </div>
          <div class="tabContent" v-show="!isLoading">
            <!--活动-->
            <div :style="{'-webkit-overflow-scrolling': scrollMode}">
              <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText"
                           :bottom-pull-text="bottomPullText" :bottom-method="loadBottom"
                           :bottom-all-loaded="bottomAllLoaded"
                           :auto-fill="false" ref="loadmore" v-if="isActive">
                <div style="height: 2.55rem;margin-top: 0.3rem; padding: 0 0.3rem;" v-for="item in list"
                     @click="_appjs.syJsbLaunchWebview(item.detial_url)">
                  <div class="tabItem clearfix">
                    <div class="img fl">
                      <img v-lazy="item.project_image">
                      <div class="bm">{{item.project_state_description}}</div>
                    </div>
                    <div class="info fr">
                      <h2 style="height:0.8rem;">{{item.activity_name}}</h2>
                      <div>
                        <p class="p1">
                        <span class="icon1"
                              style="width: 0.28rem;height: 0.28rem;">
                          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/Fill2.png'"
                               style="width: 100%;height: 100%;">
                        </span>{{item.project_time_formatted_pubwel}}
                          <span class="icon2" style="width: 0.24rem;height: 0.26rem;">
                           <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/Fill1.png'"
                                style="width: 100%;height: 100%;">
                        </span>{{item.register_count}}人
                        </p>
                        <p><span class="icon3" style="width: 0.26rem;height: 0.29rem;">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/Fill4.png'"
                             style="height: 100%;width: 100%;">
                      </span>{{item.activity_address === font ? font : item.activity_address}}</p>
                        <p><span class="icon4" style="width: 0.28rem;height: 0.3rem;">
                         <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/Fill3.png'"
                              style="height: 100%;width: 100%;">
                      </span>{{item.volunteer_name}}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </mt-loadmore>
            </div>
            <!--志愿队-->
            <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText"
                         :bottom-pull-text="bottomPullText" :bottom-method="vloadBottom"
                         :bottom-all-loaded="bottomAllLoaded"
                         :auto-fill="false" ref="vloadmore" v-if="isVol">
              <div class="volunteercorps">
                <!--搜索框-->
                <div class="search">
                  <div class="searchBox">
                    <input type="text" placeholder="搜索志愿队名称/团委名称" v-model="key">
                    <span @click="searchkey()">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-ser.png'" alt="搜索"
                   style="height: 100%;width: 100%;">
              </span>
                  </div>
                </div>
                <div class="showContent" v-if="isVolter" v-for="item in volList"
                     @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer&op=volunteer_detial&volunteer_id='+item.volunteer_id)">
                  <div class="volterItem">
                    <div class="link" style="width: 100%;height: 0.2rem;background-color:#F7F9FA;"></div>
                    <div class="item">
                      <div class="box clearfix">
                        <div class="img fl">
                          <img v-lazy="item.volunteer_image">
                        </div>
                        <div class="info fl">
                          <h2>{{item.volunteer_name}}</h2>
                          <p>{{item.volunteer_name_suffix}}</p>
                        </div>
                      </div>
                      <p class="p1">志愿队介绍：{{item.volunteer_desc}}</p>
                    </div>
                  </div>
                </div>
                <div class="searchResult" v-if="isSearch">
                  <div class="volterItem" v-for="item in searchList"
                       @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer&op=volunteer_detial&volunteer_id='+item.volunteer_id)">
                    <div class="link" style="width: 100%;height: 0.2rem;background-color:#F7F9FA;"></div>
                    <div class="item">
                      <div class="box clearfix">
                        <div class="img fl">
                          <img v-lazy="item.volunteer_image">
                        </div>
                        <div class="info fl">
                          <h2>{{item.volunteer_name}}</h2>
                          <p>{{item.volunteer_name_suffix}}</p>
                        </div>
                      </div>
                      <p class="p1">志愿队介绍：{{item.volunteer_desc}}</p>
                    </div>
                  </div>
                </div>
                <div class="dataNone" v-if="isNone">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-none.png'" alt="暂无动态">
                  <p>暂无相关记录</p>
                </div>
              </div>
            </mt-loadmore>
          </div>
        </div>
        <div class="footLine" ref="footer">
          <span>一起善源 爱 · 源于善</span>
        </div>
        <!--志愿队新样式-->
        <div class="tabVolunteer" v-if="false">
          <div class="newAdd">
            <div class="tit">
              <span></span>
              <div class="font">最新成立</div>
            </div>
            <div class="newAddCon">
              <ul class="clearfix">
                <li class="fl">
                  <div>
                    <img src="../../../../static/image/sywelfare/icon-share.png" alt="">
                    <p>一二三四五六七</p>
                  </div>
                </li>
                <li class="fl">
                  <div>
                    <img src="../../../../static/image/sywelfare/icon-share.png" alt="">
                    <p>一二三四五六七</p>
                  </div>
                </li>
                <li class="fl">
                  <div>
                    <img src="../../../../static/image/sywelfare/icon-share.png" alt="">
                    <p>一二三四五六七</p>
                  </div>
                </li>
                <li class="fl">
                  <div>
                    <img src="../../../../static/image/sywelfare/icon-share.png" alt="">
                    <p>一二三四五六七</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="newVol">
            <div class="tit">
              <span></span>
              <div class="font">最多志愿者</div>
            </div>
            <div class="newVolCon clearfix">
              <div class="img fl">
                <img src="../../../../static/image/sywelfare/icon-share.png" alt="">
              </div>
              <div class="volInfo fr">
                <h2>公益跑浙江站志愿队 <span class="fr">中国银行团委</span></h2>
                <p class="p1"><span style="margin-right: 0.3rem;">志愿者：10,000名</span><span>活动：1次</span></p>
                <p class="p2">志愿队介绍志愿队介绍志愿队介绍志愿队介绍志愿队介绍志愿队介绍志愿队介绍志愿队介绍志愿队介绍......</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  export default{
    data(){
      return {
        isLoading: false,
        bottomAllLoaded: false, // 是否可以上拉属性
        bottomPullText: '', // 下拉加载的文字
        curpage: 0, // 当前分页
        vcurpage: 1, // 当前分页
        bottomDistance: 0, // 触发上拉距离
        bottomDropText: '',
        type: '',
        key: '',
        list: [],
        volList: [],
        isVol: false,
        isActive: true,
        isVolter: true,
        isSearch: false,
        searchList: [],
        isNone: false,
        font: '线上活动',
        vol: 'volunteer_all_list',
        scrollMode: 'auto',
        isAjaxLoading:false
      }
    },
    components: {
      loading
    },
    created(){
      if (this.$route.query.active_mode === 'volunteer_all_list') {
        this.type = 'all_ajax'
        this.getVol()
      } else if (this.$route.query.active_mode == undefined) {
        this.type = ''
        this.getData()
      } else {
        this.type = this.$route.query.active_mode
        this.getData()
      }
    },
    methods: {
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=volunteerproject&op=volunteer_project_list&project_type=' + this.type).then(res => {
          this.list = res.data.content
          this.isLoading = false
          this.isSearch = false
          this.isVolter = true
          if (this.list.length <= 3) {
            this.$refs.footer.style.position = 'absolute'
          } else {
            this.$refs.footer.style.position = 'relative'
          }
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].project_progress_state_description == '未开始') {
              this.list[i].project_state_description = '报名中'
            } else if (this.list[i].project_progress_state_description == '已完成') {
              this.list[i].project_state_description = '已结束'
            } else {
              this.list[i].project_state_description = '进行中'
            }
          }
        })
      },
      selectTab(tab){
        this.bottomAllLoaded = false
        this.curpage = 0
        this.vcurpage = 1
        this.isLoading = true
        switch (tab) {
          case 'a':
            this.type = ''
            this.getData()
            this.isVol = false
            this.isActive = true
            break
          case 'b':
            this.type = 'offline_project'
            this.getData()
            this.isVol = false
            this.isActive = true
            break
          case 'c':
            this.type = 'online_project'
            this.getData()
            this.isVol = false
            this.isActive = true
            break
          case 'd':
            this.type = 'all_ajax'
            this.getVol()
            this.isVol = true
            this.isActive = false
            break
          default:
            this.type = ''
            this.getData()
            this.isVol = false
            this.isActive = true
        }
      },
      getVol(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=volunteer_all_list').then(res => {
          this.isLoading = false
          this.volList = res.data.content
          if (res.data.code == 400) {
            this.isNone = true
            this.isVolter = false
            this.isSearch = false
          } else if (res.data.code == 200) {
            this.isNone = false
            this.isVolter = true
            this.isSearch = false
            this.isVol = true
            this.isActive = false
            if (this.volList.length <= 4) {
              this.$refs.footer.style.position = 'absolute'
            } else {
              this.$refs.footer.style.position = 'relative'
            }
          }
        })
      },
      loadBottom () {
        console.log(111)
        if (this.bottomAllLoaded) {
//          固定方法 查询完固定一次
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        if(this.isAjaxLoading){
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        this.isAjaxLoading = true
        this.curpage++
        this.$http.get(this.siteInfo.host + '/api/index.php?act=volunteerproject&op=volunteer_project_list&project_type=' + this.type + '&cur_page=' + this.curpage).then(res => {
          this.isAjaxLoading = false
          if (res.data.code === 400) {
            this.bottomAllLoaded = true
            this.$refs.loadmore.onBottomLoaded()
            return
          }
          for (var i = 0; i < res.data.content.length; i++) {
            if (res.data.content[i].project_progress_state_description == '未开始') {
              res.data.content[i].project_state_description = '报名中'
            } else if (res.data.content[i].project_progress_state_description == '已完成') {
              res.data.content[i].project_state_description = '已结束'
            } else {
              res.data.content[i].project_state_description = '进行中'
            }
          }
//          console.log(res.data.content)
          this.list = this.list.concat(res.data.content)
          this.$refs.loadmore.onBottomLoaded()
          this.$nextTick(() => {
            this.scrollMode = "touch"
          })
        })
      },
      vloadBottom () {
        if (this.bottomAllLoaded) {
//          固定方法 查询完固定一次
          this.$refs.vloadmore.onBottomLoaded()
          return
        }
        this.vcurpage++
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=volunteer_all_ajax_list&curpage=' + this.vcurpage).then(res => {
          if (res.data.code === 400) {
            this.bottomAllLoaded = true
            this.$refs.vloadmore.onBottomLoaded()
            return
          }
          this.volList = this.volList.concat(res.data.content)
          this.$refs.vloadmore.onBottomLoaded()
        })
      },
      searchkey(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=volunteer_search&keyword=' + this.key + '&curpage=' + this.curpage).then(res => {
          this.isSearch = true
          this.isVolter = false
          this.searchList = res.data.content
          if (res.data.code == 400) {
            this.isNone = true
            this.isSearch = false
            this.$refs.footer.style.position = 'absolute'
          } else if (res.data.code == 200) {
            if (this.searchList.length <= 4) {
              this.$refs.footer.style.position = 'absolute'
            } else {
              this.$refs.footer.style.position = 'relative'
            }
          } else {
            this.isNone = false
          }
        })
      }
    }
  }
</script>
<style scoped>
  div {
    box-sizing: border-box;
  }

  .volterItem .item {
    padding: 0.25rem 0.3rem;
  }

  .volterItem .item .box .img {
    width: .92rem;
    height: .92rem;
    border-radius: .46rem;
    overflow: hidden;
  }

  .volterItem .item .box .img img {
    width: 100%;
    height: 100%;
  }

  .volterItem .item .box .info {
    margin-left: 0.3rem;
    text-align: left;
  }

  .volterItem .item .box .info h2 {
    font-size: .32rem;
    line-height: 0.4rem;
  }

  .volterItem .item .box .info p {
    font-size: .28rem;
    color: #808080;
    margin-top: .06rem;
  }

  .volterItem .item .p1 {
    margin-top: 0.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.24rem;
    color: #b1b1b1;
    text-align: left;
    height: 0.4rem;
    line-height: 0.4rem;
  }

  .pubwelActive {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .search {
    /*padding: 0.15rem 0.3rem;*/
    /*background: #F7F9FA;*/
    padding: 0.3rem;
  }

  .search .searchBox {
    position: relative;
    width: 100%;
    height: 0.7rem;
    background: #FFFFFF;
    border: 1px solid #DADEE4;
    border-radius: 0.08rem;
    text-align: left;
    overflow: hidden;
  }

  .search .searchBox input {
    box-sizing: border-box;
    padding: 0.15rem 0.4rem;
    border: none;
    background: transparent;
    width: 80%;
    height: 100%;
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
  }

  input::-webkit-input-placeholder {
    color: #DADEE4;
  }

  .search .searchBox span {
    position: absolute;
    top: 50%;
    right: 0;
    width: 0.34rem;
    height: 0.34rem;
    display: inline-block;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .publicTab {
    width: 100%;
    background-color: #fff;
  }

  .publicTab .tabList {
    width: 100%;
    position: fixed;
    z-index: 999;
    background: #fff;
  }

  .publicTab .tabList ul {
    width: 100%;
    height: 0.87rem;
    border-bottom: 1px solid #DADEE4;
  }

  .tabList ul li {
    width: 25%;
    height: 0.87rem;
    line-height: 0.87rem;
    font-size: 0.3rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .tabList ul li div {
    display: inline-block;
    box-sizing: content-box;
    height: 0.85rem;
    padding: 0 0.15rem;
    text-align: center;
    font-weight: 300;
  }

  .tabList .sel {
    border-bottom: 2px solid #4A90E2;
    color: #4A90E2;
    font-weight: 500;
  }

  .tabContent {
    padding-top: 1.1rem;
    padding-bottom: 0.3rem;
  }

  .tabItem {
    width: 100%;
    height: 2.41rem;
    background: #FFFFFF;
    border: 1px solid #DADEE4;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.10);
    border-radius: 0.08rem;
    overflow: hidden;
    margin: 0 auto;
    /*padding: 0 0.3rem;*/
  }

  .tabItem .img {
    height: 2.41rem;
    width: 2.41rem;
    position: relative;
  }

  .tabItem .img img {
    width: 100%;
    height: 100%;
  }

  .tabItem .img .bm {
    width: 1.03rem;
    padding-top: 0.06rem;
    padding-bottom: 0.05rem;
    /*height: 0.33rem;*/
    /*line-height: 0.33rem;*/
    background: #F8E71C;
    border-radius: 0.33rem 0.33rem 0.33rem 0;
    font-size: 0.26rem;
    color: #4A90E2;
    font-weight: 300;
    position: absolute;
    top: 0.16rem;
    left: 0.16rem;
  }

  .tabItem .info {
    width: 4.3rem;
    /*width: calc(98% - 2.41rem);*/
    text-align: left;
    padding: 0.16rem 0.22rem 0.15rem 0.11rem;
  }

  .tabItem .info h2 {
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.4rem;
    font-weight: 300;
    text-align: justify;
  }

  .tabItem .info p {
    font-size: 0.26rem;
    color: #666A7F;
    line-height: 0.4rem;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tabItem .info p span {
    display: inline-block;
    margin-right: 0.1rem;
    vertical-align: text-top;
  }

  .tabItem .info p .icon2 {
    margin-left: 0.2rem;
  }

  .footLine {
    /*position: absolute;*/
    position: relative;
    bottom: 0;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background: #F7F9FA;
    font-size: 0.24rem;
    color: #DADEE4;
    font-weight: 300;
  }

  /*志愿队样式*/
  .tabVolunteer .tit {
    margin-top: 0.35rem;
    margin-bottom: 0.28rem;
    text-align: left;
    font-size: 0.32rem;
    color: #4B4F63;
    height: 0.4rem;
    line-height: 0.4rem;
    overflow: hidden;
  }

  .tabVolunteer .tit span {
    float: left;
    display: inline-block;
    width: 0.06rem;
    height: 0.4rem;
    background: #F8E71C;
    box-shadow: 0 0 16px 0 #F0D35B;
    border-radius: 0.06rem;
    margin-right: 0.1rem;
    vertical-align: middle;
  }

  .tabVolunteer .tit .font {
    float: left;
    display: inline-block;
  }

  .tabVolunteer .newAddCon li {
    width: 25%;
    text-align: center;
  }

  .tabVolunteer .newAddCon li img {
    width: 0.9rem;
    height: 0.9rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-bottom: 0.15rem;
  }

  .tabVolunteer .newAddCon li p {
    width: 80%;
    margin: 0 auto;
    font-size: 0.26rem;
    color: #4B4F63;
    font-weight: 300;
    line-height: 0.4rem;
  }

  .newVolCon {
    width: 100%;
  }

  .newVolCon .img {
    width: 1rem;
    height: 1rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 0.2rem;
    overflow: hidden;
  }

  .newVolCon .img img {
    width: 100%;
    height: 100%;
  }

  .newVolCon .volInfo {
    width: 5.7rem;
    text-align: left;
    border-bottom: 1px solid #DADEE4;
    padding-bottom: 0.32rem;
  }

  .newVolCon .volInfo h2 {
    font-size: 0.3rem;
    color: #4B4F63;
    font-weight: 300;
    line-height: 0.5rem;
  }

  .newVolCon .volInfo h2 span {
    font-size: 0.24rem;
    color: #818C9E;
    font-weight: 300;
  }

  .newVolCon .volInfo .p1 {
    font-size: 0.24rem;
    color: #666A7F;
    font-weight: 300;
    line-height: 0.4rem;
  }

  .newVolCon .volInfo .p2 {
    font-size: 0.24rem;
    color: #818C9E;
    font-weight: 300;
    line-height: 0.4rem;
  }

  .dataNone {
    padding: 1rem 0;
    text-align: center;
  }

  .dataNone img {
    width: 2.4rem;
    height: 2.2rem;
    margin-bottom: 0.65rem;
  }

  .dataNone p {
    font-size: 0.32rem;
    color: #B1B8C4;
    font-weight: 300;
  }
</style>
