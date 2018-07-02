<template>
  <div style="width: 100%;height: 100%;">
    <div v-title="'搜索结果'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name="fade">
      <div class="publicList">
        <!--搜索框-->
        <div class="search">
          <div class="searchBox">
            <input type="text" placeholder="搜索项目" v-model="key">
            <span @click="searchkey()">
              <img src="../../../../static/image/sywelfare/icon-ser.png" alt="搜索" style="height: 100%;width: 100%;">
            </span>
          </div>
        </div>
        <!--tab切换-->
        <div class="publicTab">
          <div class="tabContent" v-show="!isLoading">
            <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText"
                         :bottom-pull-text="bottomPullText" :bottom-method="loadBottom"
                         :bottom-all-loaded="bottomAllLoaded"
                         :auto-fill="false" ref="loadmore" v-if="isShow">
              <div style="width: 100%;margin-top: 0.3rem;" v-for="item in list"
                   @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=pubwel_router&op=pubwel_detail&project_id='+ item.rec_id+'&project_name='+item.project_name)"
                   v-if="item.process_status == '未开始'?false:true">
                <div class="tabItem">
                  <div class="img">
                    <img class="banner" v-lazy="item.project_ad_image_url">
                    <div class="time" v-if="(item.process_status=='进行中'?true:false) && item.project_remaining_time">
                      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-time.png'" alt="时间">
                      {{item.project_remaining_time}}
                    </div>
                  </div>
                  <div class="progress">
                    <div class="line" :style="{width:item.progressLength}" v-if="item.finished_money == 0?false:true">
                      <div class="redImg" :style="{right:item.right}">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-bg.png'" alt="进度条">
                        <span>{{item.progressFont}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="itemInfo">
                    <div class="title">
                      <span>{{item.project_mode_str}}&nbsp;&nbsp;<i
                          style="font-size: 0.30rem; font-style: normal">|</i></span>
                      <span>&nbsp;&nbsp;{{item.project_name}}&nbsp;</span>
                      <span v-if="item.project_name_suffix">&nbsp;<i
                          style="font-size: 0.30rem; font-style: normal">|</i>&nbsp;{{item.project_name_suffix}}</span>
                    </div>
                    <div class="desc" v-if="item.project_mode_str =='个人求助'?false:true">{{item.project_intro}}</div>
                    <div class="icon" v-if="item.project_mode_str =='个人求助'?true:false">
                      <div class="item">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-money.png'"
                             style="width: 0.24rem;height: 0.24rem;" alt="款项">
                        目标金额: ￥{{item.target_money}}
                      </div>
                      <div class="item" v-if="item.order_count==0">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-xin.png'"
                             style="width: 0.28rem;height: 0.24rem;" alt="爱心">
                        期待爱心
                      </div>
                      <div class="item" v-if="item.order_count!=0">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-xin.png'"
                             style="width: 0.28rem;height: 0.24rem;" alt="爱心">
                        获得爱心: {{item.order_count}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </mt-loadmore>
            <div class="dataNone" v-if="isNone">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-file.png'" alt="暂无数据">
              <p>暂无相关记录</p>
            </div>
          </div>
        </div>
        <div class="footLine" ref="footer">
          <span>一起善源 爱 · 源于善</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  export default{
    data () {
      return {
        isLoading: true,
        bottomAllLoaded: false, // 是否可以上拉属性
        bottomPullText: '', // 下拉加载的文字
        curpage: 1, // 当前分页
        bottomDistance: 0, // 触发上拉距离
        bottomDropText: '',
        type: 'get_all_list',
        key: '',
        list: [],
        isHelp: true,
        isOther: false,
        isNone: false,
        isShow: true,
        a: []
      }
    },
    created () {
      this.getData()
    },
    components: {
      loading
    },
    methods: {
      addPercent(a, b){
        function remove(str) {
          if (!str) {
            return '0';
          } else {
            return (str + '').split(',').join('')
          }
        }

        let tmp, result;
        if (remove(b) == 0) {
          result = 0
        } else {
          tmp = remove(a) / remove(b)
          result = tmp >= 1 ? 100 : tmp * 100
        }
        return result;
      },
      foo(a){
        this.a = a
//          计算进度条
        for (var i = 0; i < a.length; i++) {
          var number = this.addPercent(a[i].finished_money, a[i].target_money)
          a[i].progressLength = parseInt(number) + '%'
          a[i].progressFont = a[i].progressLength
          a[i].right = '-1rem'
//            判断显示百分比还是文字
          if (a[i].process_status === '已完成' || number >= 100) {
            a[i].progressLength = '100%'
            a[i].progressFont = '完成'
            a[i].right = '-0.23rem'
          } else if (number <= 1) {
            a[i].progressFont = '1%'
            a[i].progressLength = '1%'
          } else if (number >= 80) {
            a[i].right = '-0.23rem'
          }
          if (a[i].process_status === '已结束') {
            a[i].progressFont = '结束'
          }
        }
        return this.a
      },
      footer(b){
        //          footer的位置
        if (b.length < 2) {
          this.$refs.footer.style.position = 'absolute'
        } else {
          this.$refs.footer.style.position = 'relative'
        }
      },
      getData(){
        this.key = this.$route.query.keyword
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_search_result&keyword=' + this.key).then(res => {
          this.isLoading = false
          if (res.data.code == 400) {
            this.isNone = true
            this.isShow = false
            this.$refs.footer.style.position = 'absolute'
          } else if (res.data.code == 200) {
            this.isNone = false
            this.isShow = true
            this.foo(res.data.content)
            this.list = this.a
            this.footer(this.list)
          }
        })
      },
      loadBottom () {
        if (this.bottomAllLoaded) {
//          固定方法 查询完固定一次
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        this.curpage++
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_search_result' + '&curpage=' + this.curpage).then(res => {
          console.log(this.curpage)
          if (res.data.code === 400) {
            this.bottomAllLoaded = true
            this.$refs.loadmore.onBottomLoaded()
            return
          }
          this.foo(res.data.content)
          this.list = this.list.concat(this.a)
          this.footer(this.list)
          this.$refs.loadmore.onBottomLoaded()
        })
      },
      searchkey(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_search_result&keyword=' + this.key).then(res => {
          this.isLoading = false
          if (res.data.code == 400) {
            this.isNone = true
            this.isShow = false
            this.$refs.footer.style.position = 'absolute'
          } else if (res.data.code == 200) {
            this.isNone = false
            this.isShow = true
            this.foo(res.data.content)
            this.list = this.a
            this.footer(this.list)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  $bg: red;

  div {
    box-sizing: border-box;
  }

  .mint-loadmore {
    overflow: visible;
  }

  .publicList {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .search {
    padding: 0.15rem 0.3rem;
    background: #F7F9FA;
  }

  .search .searchBox {
    position: relative;
    width: 100%;
    height: 0.7rem;
    background: #FFFFFF;
    border: 1px solid #DADEE4;
    /*box-shadow: inset 1px 1px 0px 0 #DADEE4;*/
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
    height: 100%;
    padding: 0 0.15rem;
    text-align: center;
  }

  .tabList .sel {
    border-bottom: 2px solid #4A90E2;
    color: #4A90E2;
  }

  .tabContent {
    padding: 0.09rem 0.3rem 0.7rem;
  }

  .tabContent .tabItem {
    width: 100%;
    /*height: 4.8rem;*/
    -webkit-border-radius: 0.08rem;
    -moz-border-radius: 0.08rem;
    border-radius: 0.08rem;
    background: #FFFFFF;
    box-shadow: 0 0 15px 0 rgba(74, 144, 226, 0.20);
    margin: 0 auto;
    overflow: hidden;
  }

  .tabContent .tabItem .img {
    width: 100%;
    height: 3.12rem;
    position: relative;
    overflow: hidden;
  }

  .tabContent .tabItem .img .banner {
    min-width: 100%;
    min-height: 3.12rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .tabContent .tabItem .img .time {
    width: 2.51rem;
    height: 0.3rem;
    line-height: 0.32rem;
    float: right;
    margin-right: 0.2rem;
    margin-top: 0.15rem;
    padding-right: 0.1rem;
    opacity: 0.7;
    background: #4A90E2;
    border-radius: 0.3rem 0.3rem 0.3rem 0.1rem;
    color: #fff;
    font-size: 0.24rem;
    font-weight: 300;
    text-align: right;
  }

  .tabContent .tabItem .time img {
    width: 0.24rem;
    height: 0.24rem;
    vertical-align: text-top;
  }

  .tabContent .tabItem .progress {
    width: 100%;
    height: 0.08rem;
    background: #C8DDF5;
    position: relative;
  }

  .tabItem .progress .line {
    position: absolute;
    width: 80%;
    height: 100%;
    background-image: linear-gradient(-90deg, #00ECBC 0%, #4A90E2 100%);
  }

  .tabItem .progress .line .redImg {
    height: 0.8rem;
    width: 1.2rem;
    position: absolute;
    top: -0.36rem;
    right: -0.8rem;
  }

  .tabItem .progress .line .redImg img {
    width: 100%;
    height: 100%;
  }

  .tabItem .progress .line span {
    color: #fff;
    font-size: 0.24rem;
    position: absolute;
    top: 0.27rem;
    right: 0.2rem;
    display: inline-block;
    width: 0.8rem;
    text-align: center;
  }

  .tabItem .itemInfo {
    padding: 0.3rem 0.2rem 0.24rem;
  }

  .tabItem .itemInfo .title {
    text-align: left;
    font-size: 0.30rem;
    color: #4B4F63;
    line-height: 0.42rem;
    font-weight: 300;
  }

  .tabItem .itemInfo .desc {
    text-align: left;
    font-size: 0.24rem;
    color: #818C9E;
    line-height: 0.32rem;
    font-weight: 300;
  }

  .tabItem .itemInfo .icon {
    margin-top: 0.34rem;
    width: 100%;
  }

  .tabItem .itemInfo .icon .item {
    display: inline-block;
    border-right: 1px solid #DADEE4;
    font-size: 0.24rem;
    color: #818C9E;
    line-height: 0.3rem;
    width: 49%;
    text-align: left;
  }

  .tabItem .itemInfo .icon .item:last-child {
    border: none;
    padding-left: 0.55rem;

  }

  .tabItem .itemInfo .icon img {
    vertical-align: baseline;
    margin-right: 0.12rem;
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

  .dataNone {
    padding: 3rem 0;
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
