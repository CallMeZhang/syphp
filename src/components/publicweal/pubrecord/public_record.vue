<template>
  <div class="record self-bg">
    <div v-title="'公益记录'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div class="container-all">
        <!--tab-切换-->
        <div class="head-con">
          <div class="top-line"></div>
          <div class="tab-con">
            <ul>
              <li @click="switchItems('a')">
                <div :class="type == 'get_all_record'?'sel':''">全部项目</div>
              </li>
              <li @click="switchItems('b')">
                <div :class="type == 'get_crowdfunding_record'?'sel':''">公益众筹</div>
              </li>
              <li @click="switchItems('c')">
                <div :class="type == 'get_donate_record'?'sel':''">慈善项目</div>
              </li>
              <li @click="switchItems('d')">
                <div :class="type == 'get_personalhelp_record'?'sel':''">个人求助</div>
              </li>
            </ul>
          </div>
        </div>
        <!--tab-content-->
        <div class="tab-content" v-show="!isLoading">
          <!--全部项目-->
        <div class="my-loadmore" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText"
                       :bottom-pull-text="bottomPullText" :bottom-method="loadBottom"
                       :bottom-all-loaded="bottomAllLoaded"
                       :auto-fill="false" ref="loadmore" v-if="showCon === true">
            <div class="tab-all" >
              <div >
                <!--item 开始-->
                <div class="items-container" v-for="item in dataList">
                  <div class="item-con clearfix"
                       @click="app.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_thanks&order_sn='+item.order_sn)">
                    <div class="con-left fl"><img v-lazy="item.img_url" alt="items.png"></div>
                    <div class="con-right fl">
                      <h3 class="right-title"><span>{{item.project_name}}</span></h3>
                      <p class="right-time" v-if="itemShow === true">{{item.payment_time}}</p>
                      <p class="item-close" v-if="itemShow === false">项目关闭</p>
                      <p class="right-money" v-if="itemShow === true">捐款金额：<span
                          class="blue-txt">￥&nbsp;&nbsp;{{item.money}}</span></p>
                      <p class="right-money c-oranage" v-if="itemShow === false">退回捐款金额：<span class="c-oranage">￥&nbsp;&nbsp;{{item.money}}</span>
                      </p>
                    </div>
                  </div>
                  <div class="item-replenish ">
                    <p class="clearfix">
                      <span class="span1 fl">订单号：</span>
                      <span class="span2 fl">{{item.order_sn}}</span>
                      <span class="span3 fr">{{item.feedback_str}}</span>
                    </p>
                    <p class="clearfix" v-if="item.address !== null || item.address !== undefined ">
                      <span class="span1 fl" v-if="item.bazaar_payment == 1">配送地址：</span>
                      <span class="span1 fl" v-if="item.bazaar_payment == 2">领取地址：</span>
                      <span class="span2 fl">{{item.address}}</span>
                    </p>
                    <p v-if="explain !== null && explain !== undefined ">{{explain}}</p>
                  </div>
                </div>
              </div>
              <!--item结束-->
              <!--<div class="no-data" v-if="showCon === false">
                <div class="no-files"><img
                    :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-file.png'" alt="file.png">
                </div>
                <p class="no-files-txt">暂无相关记录</p>
              </div>-->
            </div>
          </mt-loadmore>
        </div>
          <!--暂无项目-->
          <div class="no-data" v-if="showCon === false">
            <div class="no-files"><img
              :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-file.png'" alt="file.png">
            </div>
            <p class="no-files-txt">暂无相关记录</p>
          </div>

          <div class="footlink">一起善源 爱 · 源于善</div>
        </div>

      </div>
    </transition>

  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  import app from '../../../modules/_appJs/index.js'
  export default{
    data () {
      return {
        app,
        isLoading: true,
        type: 'get_all_record',
        showCon: true, //所有项目数据
        dataList: [],
        haveAddr: '',//配送地址或领取地址
        bazaar_payment: '', //1 配送地址，2领取地址
        explain: '',//领取说明
        itemShow: true,//项目是否关闭
        bottomAllLoaded: false,
        bottomPullText: '', // 下拉加载的文字
        curpage: 1,// 分页
//        bottomDistance: 0,// 触发上拉距离
        bottomDropText: '',
        scrollMode: 'auto',//移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        isAjaxLoading: false
      }

    },
    created () {
      this.getData()
    },
    components: {
      'sy-loading': loading,
    },
    methods: {
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=' + this.type).then(res => {
          this.isLoading = false
          let data = res.data
          this.dataList = data.content
//          console.log(this.siteInfo.host + '/api/index.php?act=pubwel&op=' + this.type)
          if (data.code == 200) {
            this.showCon = true
//            console.log(data.content.length)
//            for(var i = 0; i< data.content.length; i++){}

          } else if (data.code == 400) {
            this.showCon = false

          } else if (data.code == 402) {
            this.$toast(data.message)
          }
        })
      },
      switchItems(items){
        this.bottomAllLoaded = false
        this.curpage = 1
        this.isLoading = true
        switch (items) {
          case 'a':
            this.type = 'get_all_record'
            this.getData();
            break;
          case 'b':
            this.type = 'get_crowdfunding_record';
            this.getData();
            break;
          case 'c':
            this.type = 'get_donate_record';
            this.getData();
            break;
          case 'd':
            this.type = 'get_personalhelp_record';
            this.getData();
            break;
          default:
            this.type = 'get_all_record';
            this.getData();
            break;
        }
      },
      loadBottom(){
        console.log('loadBottom触发')
        if (this.bottomAllLoaded) {
//          固定方法 查询完固定一次
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        if (this.isAjaxLoading) {
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        this.isAjaxLoading = true
        this.curpage++
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=' + this.type + '&curpage=' + this.curpage).then(res => {
          this.isAjaxLoading = false
//          console.log(this.curpage)
          if (res.data.code === 400) {
            this.bottomAllLoaded = true
            this.$refs.loadmore.onBottomLoaded()
            return
          }
          this.dataList = this.dataList.concat(res.data.content)
          this.$refs.loadmore.onBottomLoaded()
          this.$nextTick(function () {
            this.scrollMode = "touch";
          });
        })
      },
      showLog(log){
        console.log(log)
      },
    }
  }
</script>
<style lang="scss" scoped>
  .self-bg {
    height: auto;
    background: #fff;
  }

  .top-line {
    width: 100%;
    height: 0.2rem;
    background: #F7F9FA;
  }

  .record {
    width: 7.5rem;
    margin: 0 auto;
    .container-all{
      position:relative;
    }
    .head-con {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 2;
      background: #fff;
    }
    .tab-con {
      background: #fff;
      width: 100%;
      height: 0.89rem;
      font-size: 0.3rem;
      color: #4B4F63;
      /*border-bottom:1px solid #DADEE4;*/
    }
    .tab-con ul {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 0 0.2rem;
      background: #fff;
      border-bottom: 1px solid #DADEE4;
      li {
        position: relative;
        width: 25%;
        line-height: 0.89rem;
        font-weight: 300;
        color: #4B4F63;
        div {
          color: #4B4F63;
          font-weight: 300;
        }
        .sel {
          border-bottom: 2px solid #4A90E2;
          color: #4A90E2;
          font-weight: normal;
        }
      }

    }
    .tab-content {
      width: 7.5rem;
      text-align: left;
      /*margin:1.14rem 0.3rem 0;*/
      background: #fff;
      padding-top: 1.14rem;
      .items-container {
        padding-top: 0.29rem;
        padding-left: 0.3rem;
        border-bottom: 1px solid rgba(218, 222, 228, 0.6);
        .item-con {
          padding-bottom: 0.2rem;
          border-bottom: 1px dotted #DADEE4;
          font-weight: 300;
          .con-left {
            width: 2rem;
            height: 2rem;
            background: #F7F9FA;
            border: 1px solid #DADEE4;
            border-radius: 0.11rem;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            img {
              width: 100%;
              height: 100%;
              -webkit-border-radius: 0.11rem;
              -moz-border-radius: 0.11rem;
              border-radius: 0.11rem;
            }
          }
          .con-right {
            width: 4.7rem;
            margin-left: 0.2rem;
            .right-title {
              height: 0.8rem;
              line-height: 0.4rem;
              font-size: 0.28rem;
              color: #4B4F63;
              font-weight: 300;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .right-time {
              margin-top: 0.19rem;
              font-size: 0.24rem;
              font-weight: 300;
              color: #B1B8C4;
            }
            .item-close {
              margin-top: 0.19rem;
              font-size: 0.24rem;
              font-weight: 300;
              line-height: 0.33rem;
              color: #F25B4B;
            }
            .right-money {
              margin-top: 0.18rem;
              font-size: 0.26rem;
              font-weight: 300;
              line-height: 0.37rem;
              color: #000000;
              .blue-txt {
                font-size: 0.26rem;
                line-height: 0.37rem;
                color: #4A90E2;
                font-weight: normal;
              }
            }
            .c-oranage {
              font-size: 0.24rem;
              color: #F25B4B;
              font-weight: normal;
            }
          }

        }
        .item-con:last-of-type {
          border-bottom: none;
        }
        .item-replenish {
          padding: 0.12rem 0 0.23rem;
          p {
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: #818C9E;
            word-wrap: break-word;
            font-weight: 300;
            .span1 {
              display: inline-block;
              width: 1.2rem;
              color: #818C9E;
              font-weight: 300;
            }
            .span2 {
              display: inline-block;
              width: 3rem;
              color: #818C9E;
              font-weight: 300;
            }
            .span3{
              display: inline-block;
              color: #818C9E;
              font-weight: 300;
              margin-right: 0.3rem;
            }
          }
        }
      }
      .no-data {
        height: 11.65rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
      }
      .no-files {
        margin: 0 auto;
        width: 2.47rem;
        height: 2.3rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .no-files-txt {
        padding-top: 0.55rem;
        width: 6.9rem;
        margin: 0 auto;
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.45rem;
        color: #B1B8C4;
      }
    }
    .footlink {
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.24rem;
      color: #DADEE4;
      font-weight: 300;
      background: #f4f6f5;
      text-align:center;
    }

  }

</style>
