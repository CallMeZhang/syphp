<template>
  <div>
    <div class="top-content">
      <div ref="flexable">
        <div class="table-list"></div>
        <div class="nav navbar">
              <span @click.prevent="active = 'tab-container1'"
                    :class="active=='tab-container1'?'nar-activity':''">爱心产品</span>
          <span @click.prevent="active = 'tab-container2'"
                :class="active=='tab-container2'?'nar-activity':''">扶贫日记</span>
          <span @click.prevent="active = 'tab-container3'"
                :class="active=='tab-container3'?'nar-activity':''">求助广播</span>
        </div>
      </div>
      <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active">
          <mt-tab-container-item id="tab-container1">
            <div class="tab-content">
              <ul class="item-list"
                  v-if="agentGoodsList.total_goods_num!==0||(agentGoodsList.send_speed!==0&&agentGoodsList.send_speed !=='无')||agentGoodsList.refund_rate!==0||agentGoodsList.complain_rate!==0">
                <li>
                  <div class="lidiv-first">{{agentGoodsList.total_goods_num}}个</div>
                  <div class="lidiv-second">爱心产品</div>
                </li>
                <li>
                  <div class="lidiv-first">{{agentGoodsList.send_speed}}</div>
                  <div class="lidiv-second">发货速度</div>
                </li>
                <li>
                  <div class="lidiv-first">{{agentGoodsList.refund_rate}}%</div>
                  <div class="lidiv-second">退款率&nbsp;<span
                      :class="agentGoodsList.refund_rate_state|filterColor">{{agentGoodsList.refund_rate_state}}</span>
                  </div>
                </li>
                <li>
                  <div class="lidiv-first">{{agentGoodsList.complain_rate}}%</div>
                  <div class="lidiv-second">投诉率&nbsp;<span
                      :class="agentGoodsList.complain_rate_state|filterColor">{{agentGoodsList.complain_rate_state}}</span>
                  </div>
                </li>
              </ul>
              <ul v-if="agentGoodsList.total_goods_num!==0" :index="goodsList.length">
                <li class="product-list" v-for="(item,index) in goodsList"
                    @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                  <img class="list-img" v-lazy="item.real_image_url" alt=""/>
                  <dd :class="index==goodsList.length-1 ?'border-null':''">
                    <p class="p1">{{item.goods_name}}</p>
                    <p class="p2">已获得{{item.sale_num}}次帮扶</p>
                    <span class="span1"><span class="coin">¥</span>&nbsp;{{item.goods_price}}</span>
                    <span class="span1 span2">捐赠&nbsp;¥&nbsp;{{item.poor_get_fee}}</span>
                  </dd>
                </li>
              </ul>
              <div v-if="agentGoodsList.total_goods_num===0">
                <img class='love-img' :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/love-goods.png'"
                     alt="">
                <p class="love-txt">暂无爱心产品</p>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <div v-for="item in msg" class="list-div">
              <div class="year" v-if="item.year">{{item.create_time.substring(0, 4)}}年</div>
              <div class="month" v-if="item.month">{{parseInt(item.create_time.substring(5, 7))}}月</div>
              <div class="content-p">
                <div class="left">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/cr.png'" alt="">
                  <div class="bg" v-if="item.type!=='3'"></div>
                </div>
                <div class="right">
                  <div class="right-top-div">
                    <span class="time">{{item.create_time}}</span>
                    <span class="title">{{item.type | filterType}}</span>
                  </div>
                  <div class="content-div">
                    <div v-if="item.type==='1'">
                      <p class="content-default" v-if="item.type!=='3'">{{item.content}}</p>
                      <div class="img-list">
                        <div class="img-parent" v-for="(urlItem,index) in item.images_url" @click="previewImg(index,item.images_url)">
                          <img class="img-item" :src="urlItem">
                        </div>
                      </div>
                    </div>
                    <div v-else-if="item.type==='2'||item.type==='4'" class="aaa" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                      <img class="content-img" :src="item.images_url" alt="" v-if="item.images_url.length==1">
                      <p class="content-text" v-if="item.type!=='3'" v-html='item.content'></p>
                    </div>
                    <div v-else>
                      <img class="content-img" :src="item.images_url" alt="" v-if="item.images_url.length==1">
                      <p class="content-text" v-if="item.type!=='3'">{{item.content}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container3">
            <div class="help-content">
              <img class="broadcast"
                   :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/help-broadcast.png'">
              <p class="help-text">求助广播即将开放</p>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <!--查看预览图片-->
    <div class="swpMark"
         v-if="isSwiperShow"
         style="position: fixed;top: 0; left: 0; height: 100%; width: 100%; z-index: 999999; background: rgba(0,0,0,0.4);"
         @click="isSwiperShow = !isSwiperShow">
      <div style="width: 100%;height: 100%;position: relative;">
        <mt-swipe :auto="0" :defaultIndex="imgIndex">
          <mt-swipe-item v-for="item in swiperImgUrl">
            <img :src="item" style="border: 1px solid #000; width: 100%;position: absolute;top: 50%;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);" alt="img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
  </div>
</template>

<script>
  import {Navbar, TabItem} from 'mint-ui';
  export default {
    data() {
      return {
        active: 'tab-container2',
        agentGoodsList: {},
        goodsList: [],
        getDataDone: true,
        allData: [],
        cur_page: 0,
        msg: [],
        state: {"time": {}},
        cur_page_diary: 1,
        isSwiperShow: false,  //是否显示大图
        swiperImgUrl: [], //需要预览的图片
        imgIndex:''
      }
    },
    created() {
      let that = this
      let info = that._appjs.syJsbGetAppVersion()
      if (info['platform'] === 'ios' || info['platform'] === 'android') {
        that.isshow = true
      }
      that.getDiaryList()
      that.getAgentGoodsList()
      window.addEventListener('scroll', this.handleScroll);
    },
    filters: {
      filterType(val){
        var str = "入驻平台"
        switch (val) {
          case "1":
            str = "";
            break;
          case "2":
            str = "发布爱心产品";
            break;
          case "3":
            str = "入驻平台";
            break;
          case "4":
            str = "带动贫困户自营";
            break;
        }
        return str
      },
      filterColor: function (value) {
        var flag = "text-red"
        switch (value) {
          case "一般":
            flag = "text-red";
            break;
          case "良好":
            flag = "text-green";
            break;
        }
        return flag
      }
    },
    methods: {
      handleData(val){
        for (var i = 0; i < val.length; i++) {
          var time = val[i].create_time
          var year = time.substring(0, 4)
          var month = time.substring(5, 7)
          if (!this.state[year]) {
            this.state['time'][time] = time
            this.state[year] = year
            val[i]['year'] = true;
            val[i]['month'] = true;

          } else {
            val[i]['year'] = false;
            for (var key in this.state['time']) {
              if (this.state['time'][key].substring(0, 7) !== time.substring(0, 7)) {
                this.state['time'][time] = time
                val[i]['month'] = true;
              } else {
                val[i]['month'] = false;
              }
            }
          }
        }
        return val
      },
      handle(val){
        val.sort(function (a, b) {
          var firstArr = a.create_time.split("-")
          var secondArr = b.create_time.split("-")
          let i = 0;
          while (firstArr[i] && secondArr[i]) {
            if (firstArr[i] !== secondArr[i]) {
              return parseInt(firstArr[i]) < parseInt(secondArr[i])
              break;
            }
            i++
          }
        })
        return val
      },
      getDiaryList(){
        let agent_id = this.$route.params.agent_id
        let url = this.siteInfo.host + '/api/index.php?act=v_agent&op=get_agent_note&member_id=' + agent_id + '&cur_page=' + this.cur_page_diary
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.state = {
              year: false,
              month: false,
              "time": {}
            }
            this.msg = this.msg.concat(res.data.content)
            this.msg = this.handleData(this.msg)
            this.cur_page_diary++;
            this.getDataDone = true
          } else {
            console.log(res.data.code + ' 404 无数据')
          }
        }, (error) => {
          console.log(error)
        })
      },
      isDone(){
        this.getDataDone = true
      },
      getAgentGoodsList(){
        let agent_id = this.$route.params.agent_id
        let url = this.siteInfo.host + '/api/index.php?act=v_agent&op=get_agent_goods_list&member_id=' + agent_id//&member_id=101187&cur_page='+this.cur_page
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.agentGoodsList = res.data.content
            this.allData = res.data.content.goods_list
            this.setGoodsList()
          } else {
            console.log(res.data.code + ' 404 无数据')
          }
        }, (error) => {
          console.log(error)
        })
      },
      setGoodsList(){
        for (let i = 0; i < 8; i++) {
          this.allData[this.cur_page * 8 + i] && this.goodsList.push(this.allData[this.cur_page * 8 + i])
        }
        this.cur_page++
        this.getDataDone = true
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
          switch (this.active) {
            case 'tab-container1':
              this.setGoodsList();
              break;
            case 'tab-container2':
              this.getDiaryList();
              break;
            case 'tab-container3':
              break;
          }

        }
      },
      //      查看大图
      previewImg(index,imgArry){
        this.isSwiperShow = true
        this.swiperImgUrl = imgArry
        this.imgIndex = index
      }
    },
    mounted(){
    },
    components: {Navbar, TabItem},
    watch: {
      active: function (val, oldVal) {
        var that = this
        val === oldVal ? "" : function () {
          that.getDataDone = true;
          that.$emit("setPosition")
        }()
      }
    }
  }
</script>

<style lang="scss" scoped>

  .img-parent {
    width: 1.86rem;
    height: 1.86rem;
    float: left;
    display: inline-block;
    margin: 0 0.1rem 0.1rem 0;
    position: relative;
    overflow: hidden;
  }

  .img-item {
    width: 1.86rem;
    height: 1.86rem;
    border: 0px;
  }

  .love-txt {
    font-weight: 300;
    font-size: .32rem;
    color: #B1B8C4;
    margin-top: 0.57rem;
    text-align: center;
    margin-bottom: 1.32rem;
  }

  .love-img {
    width: 2.44rem;
    height: 2.26rem;
    margin-top: 1.1rem;
  }

  .table-list {
    height: 0.2rem;
    background: #F7F9FA;
  }

  .help-content {
    text-align: center;
  }

  .broadcast {
    margin-top: 1.1rem;
    margin-bottom: 0.58rem;
    display: inline-block;
    border: 0;
    width: 2.17rem;
  }

  .help-text {
    font-size: .32rem;
    color: #B1B8C4;
    margin-bottom: 1.32rem;
    height: 0.45rem;
    line-height: 0.45rem;
  }

  .top-content {
    background: #fff;
  }

  .navbar {
    height: 0.9rem;
    border-bottom: 0.01rem solid #DADEE4;
    box-sizing: border-box;
  }

  .navbar span:nth-last-of-type(1) {
    margin-left: 0.26rem;
  }

  .navbar span:nth-last-of-type(3) {
    margin-right: 0.26rem;
  }

  .navbar span {
    height: 0.86rem;
    line-height: 0.87rem;
    font-size: 0.30rem;
    color: #4B4F63;
    display: inline-block;
    width: 2rem;
  }

  .navbar .nar-activity {
    color: #4A90E2;
    border-bottom: 0.04rem solid #4A90E2;
  }

  .tab-content {
    margin: 0.3rem 0.3rem 0 0.3rem;
    overflow: hidden;
  }

  .item-list {
    width: 6.9rem;
    height: 1.22rem;
    background: #F7FAFD;
    border: 1px dashed #C8DDF5;
    border-radius: 0.08rem;
    box-sizing: border-box;
    padding: 0.23rem 0 0.22rem 0.3rem;
  }

  .item-list li {
    float: left;
    width: 25%;
    text-align: left;
  }

  .lidiv-first {
    font-size: 0.28rem;
    color: #4A90E2;
  }

  .lidiv-second {
    font-size: 0.24rem;
    color: #818C9E;
    margin-top: 0.14rem;
    font-weight: 300;
  }

  .text-red {
    color: #f3695a;
    font-weight: 300;
  }

  .text-green {
    color: #15a404;
    font-weight: 300;
  }

  .border-null {
    border-bottom: 0;
  }

  dd {
    display: inline-block;
    width: 4.44rem;
    border-bottom: 0.01rem solid #DADEE4;
    vertical-align: top;
    margin-left: 0.2rem;
    padding-bottom: 0.28rem;
  }

  .product-list {
    text-align: left;
    padding: 0.3rem 0 0 0;
    overflow: hidden;
  }

  .product-list > img, .product-list > dd {
    float: left;
  }

  .list-img {
    width: 2.26rem;
    height: 1.58rem;
    border-radius: 0.08rem;
  }

  .p1 {
    font-size: .32rem;
    color: #4B4F63;
    letter-spacing: -0.0064rem;
    line-height: 0.45rem;
    height: 0.45rem;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .p2 {
    font-size: .24rem;
    color: #818C9E;
    letter-spacing: -0.0048rem;
    padding: 0.08rem 0 0.3rem 0;
    line-height: 0.33rem;
    height: 0.33rem;
    font-weight: 300;
  }

  .span1 {
    margin-right: 0.3rem;
    font-size: .30rem;
    color: #4A90E2;
    letter-spacing: -0.0056rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }

  .span2 {
    font-size: .28rem;
    color: #4A90E2;
    letter-spacing: -0.0056rem;
    margin-right: 0;
    font-weight: 300;
  }

  .coin {
    font-size: .24rem;
  }

  .content-default {
    font-size: .30rem;
    color: #4B4F63;
    letter-spacing: 0;
    width: 6rem;
    font-weight: 300;
    line-height: 0.42rem;
  }

  .no-diary {
    padding: 2rem 0;
    text-align: center;
    font-size: .32rem;
    color: #B1B8C4;
    margin-bottom: 1.32rem;
    height: 0.45rem;
    line-height: 0.45rem;
  }

  .img-list {
    position: relative;
    overflow: hidden;
    margin-top: 0.23rem;
  }

  .del {
    float: right;
    font-size: .28rem;
    color: #4A90E2;
    letter-spacing: 0;
  }

  .bg {
    height: 100%;
    width: 0.02rem;
    position: absolute;
    left: 50%;
    margin-left: -0.01rem;
    background: #4A90E2;
    top: 0.5rem;
  }

  .right-top-div {
    height: 0.37rem;
    margin-bottom: 0.2rem;
    line-height: 0.37rem;
  }

  .list-div {
    overflow: hidden;
    padding-right: 0.3rem;
  }

  .content-div {
    overflow: hidden;
  }

  .content-p {
    overflow: hidden;
    text-align: left;
    align-items: stretch;
    display: flex;
    margin-bottom: 0.11rem;
  }

  .right {
    width: 6rem;
    padding-bottom: 0.39rem;
  }

  .left {
    min-width: 1.2rem;
    flex: 1;
    position: relative;
  }

  .left img {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: -0.1rem;
    left: 50%;
    margin-left: -0.3rem;
  }

  .year, .month {
    font-size: .28rem;
    color: #4B4F63;
    letter-spacing: 0;
    text-align: left;
  }

  .year {
    margin-top: 0.33rem;
    margin-left: 0.3rem;
  }

  .month {
    height: 0.4rem;
    line-height: 0.4rem;
    margin: 0.23rem 0 0.25rem 0.37rem;
  }

  .time {
    font-size: .26rem;
    color: #666A7F;
    letter-spacing: 0;
    line-height: .37rem;
    margin-right: 0.3rem;
    font-weight: 300;
  }

  .title {
    font-size: .26rem;
    color: #818C9E;
    letter-spacing: 0;
    line-height: .37rem;
    font-weight: 300;
  }

  .content-img {
    width: 1.2rem;
    height: 0.84rem;
    float: left;
    margin-right: 0.16rem;
  }

  .content-text {
    float: left;
    font-size: .30rem;
    color: #4B4F63;
    letter-spacing: 0;
    width: 4.64rem;
    font-weight: 300;
    line-height: 0.42rem;
  }
</style>
