<template>
  <div class="leaderboard-con">
    <div v-title="'公益联盟排行榜'"></div>

    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
      <!--tab-切换开始-->
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="title-con">
          <mt-tabbar v-model="selected" class="tab-tabar" >
            <mt-tab-item id="jump" class="most-jump">
              <div class="mint-tab-item-icon"></div>
              帮扶最踊跃
            </mt-tab-item>
            <div id="help" v-show="selected == 'jump'" class="hover-con hover-con-l" ref="show1"><img class="left-img" style="width:100%;" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/union_points_hint.png'"></div>
            <mt-tab-item id="rapid" class="most-rapid">
              <!--拓展最迅速-->
              集结最迅速
            </mt-tab-item>
            <div id="expand" v-show="selected == 'rapid'" class="hover-con hover-con-r" ref="show2"><img class="right-img" style="width:100%;" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/union_user_hint.png'"></div>
          </mt-tabbar>
        </div>


        <!--帮扶-->
        <section class="list-con" id="help-con" v-if="selected == 'jump'">
          <!--更新时间-->
          <p class="turnover-time" v-if="expansion =='enrollment'">更新于 {{expandTime}}</p>
          <!--list 开始-->
          <div class="union-list" v-for="(help, index) in helpList">
            <!--角标-->
            <div class="left-top-j"></div>
            <h2 class="list-title" @click="app.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=union&op=get_info&union_id='+help.union_id+'&union_channel='+help.union_channel)">
                <span class="num">NO.{{help.union_ranking}}</span><span class="union-name">{{help.union_name}}</span><span class="add-persons">(人均{{help.union_points}}公益积分)</span><span class="span-left"></span><img class="right-j" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/list_title_right.png'" alt=">"></h2>
            <div class="public-interest">
              <div class="donate fl">
                <div class="donate-img fl"><img class="icon1" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/donate_icon1.png'" alt="icon"></div>
                <div class="donate-con fl">
                  <p class="donate-title">公益捐赠<i>(元)</i></p>
                  <p class="donate-numbers">{{help.union_donation}}</p>
                </div>
              </div>
              <div class="c-line fl"></div>
              <div class="consume fl">
                <div class="consume-img fl"><img class="icon1" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/consume_icon1.png'" alt="icon"></div>
                <div class="consume-con fl">
                  <p class="consume-title">公益消费<i>(元)</i></p>
                  <p class="consume-numbers">{{help.union_spending}}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--拓展-->
        <section class="list-con" id="expand-con" v-if="selected == 'rapid'">
          <!--更新时间-->
          <p class="turnover-time" v-if="expansion =='enrollment'">更新于 {{expandTime}}</p>
          <!--list 开始-->
          <div class="union-list" v-for="(dev,index) in expansionList">
            <!--角标-->
            <div class="left-top-j"></div>
            <h2 class="list-title"  @click="app.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=union&op=get_info&union_id='+dev.union_id+'&union_channel='+dev.union_channel)">
              <!--<span class="num">NO.{{dev.union_ranking}}</span><span class="union-name">{{dev.union_name}}</span><span class="add-persons">(新增{{dev.union_new_enrollment}}爱心人士)</span><span class="span-left"></span><img class="right-j" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/list_title_right.png'" alt=">"></h2>-->
              <span class="num">NO.{{dev.union_ranking}}</span><span class="union-name">{{dev.union_name}}</span><span class="span-left"></span><img class="right-j" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/list_title_right.png'" alt=">"></h2>
            <div class="public-interest">
              <div class="donate fl">
                <div class="donate-img fl"><img class="icon1" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/icon2.png'" alt="icon"></div>
                <div class="donate-con fl">
                  <!--<p class="donate-title">公益捐赠<i>(元)</i></p>-->
                  <!--<p class="donate-numbers">{{dev.union_donation}}</p>-->
                  <p class="donate-title">公益人士<i>(人)</i></p>
                  <p class="donate-numbers">{{dev.union_enrollment}}</p>
                </div>
              </div>
              <div class="c-line fl"></div>
              <div class="consume fl">
                <div class="consume-img fl"><img class="icon1" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/icon3.png'" alt="icon"></div>
                <div class="consume-con fl">
                  <!--<p class="consume-title">公益消费<i>(元)</i></p>-->
                  <!--<p class="consume-numbers">{{dev.union_spending}}</p>-->
                  <p class="consume-title">昨日集结<i>(人)</i></p>
                  <p class="consume-numbers">{{dev.union_new_enrollment}}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="bottom_bar">一起善源 爱 · 源于善</div>
      </div>
    </transition>
  </div>
</template>

<script>
//  import siteInfo from '../../global'
  import Vue from 'vue'
  import app from '../../modules/_appJs/index.js'
  import { TabContainer, TabContainerItem, Tabbar, TabItem } from 'mint-ui';
  import appTitle from '@/components/common/title.vue'
  import loading from '@/components/loading/loading.vue'
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  export default {
    data () {
        return {
          app,
          isLoading: true,
//          siteInfo:this.siteInfo,
          selected: 'rapid',//帮扶最踊跃
          points: '', //积分接口
          expansion: '', //拓展接口
          pointsTime: '',//积分更新时间
          helpList: [], //帮扶最踊跃list
          jumpLinks: '', //帮扶最踊跃详情跳转链接
          rapidLinks: '', //拓展最迅速详情跳转链接
          expandTime: '', //拓展新增人数更新时间
          expansionList: [], //拓展最迅速list
//          unionId: '', //跳转id
          isActive: true, //
          isError: false,
          visible: true, //show
          delayTime: 0, //延时时间
        }
      },
    components: {
      'app-title': appTitle,
      'sy-loading':loading,
    },
    created () {
        this.requestData()
//        this._appjs.syJsbShowTitleBar('false')
    },
    mounted () {
      this.$nextTick(()=>{
        let $h = this.$refs.show1
        let $e = this.$refs.show2
        if($h.className =='hide'){
          setTimeout(()=>{
            this.$refs.show1.className = 'hover-con'
          },2000)
        }else{
          setTimeout(()=>{
            this.$refs.show1.className = 'hover-con hover-con-l hide'
          },2000)
        }
        if($e.className =='hide'){
          setTimeout(()=>{
            this.$refs.show2.className = 'hover-con hover-con-r'
          },2000)
        }else{
          setTimeout(()=>{
            this.$refs.show2.className = 'hover-con hover-con-r hide'
          },2000)
        }
      })

    },
    watch: {
      selected: function(val, oldVal){
//        console.log(val + ':' + oldVal)
      }
    },
    methods: {
      requestData () {
//        积分接口
        this.$http.get(this.siteInfo.host + '/api/index.php?act=union&op=get_top&top_type=points').then((res)=>{
//          console.log(res.data.content.top_info)
          var dataC = res.data.content
          this.points = dataC.top_info.top_type
          //积分更新时间
          this.pointsTime = dataC.top_info.update_time

          this.helpList = dataC.union_top_list

//          console.log(this.helpList)
//          console.log(dataC)
          this.isLoading = false
        })
//        拓展人数接口
        this.$http.get(this.siteInfo.host + '/api/index.php?act=union&op=get_top&top_type=enrollment').then((res)=>{
          var con = res.data.content
          this.expansion = con.top_info.top_type
          this.expandTime = con.top_info.update_time
          this.expansionList = con.union_top_list
//          console.log(this.expansionList)
          this.isLoading = false
        })

      },
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../static/css/common.css";
  section,p{margin:0;padding:0;}
  h2{margin:0;padding:0;font-weight:normal;}
  .leaderboard-con{
    width:7.5rem;
    height: auto;
    margin: 0 auto;
    background: #F7F9FA;
    position:relative;
  }
  .title-con{
    width:100%;
    background:#F7F9FA;
    position:fixed;
    z-index:1;
  }
  .list-con{
    padding-top:1.18rem;
  }
  /*mint-css-DIY*/
  @keyframes visib {
    /*0%{display:block; opacity:0;}
    50%{display:block; opacity:1;}
    60%{display:block; opacity:1;}
    70%{display:block; opacity:1;}
    100%{display:block; opacity:0;}*/
    0%{display:block;visibility: visible;}
    100%{display:block;visibility: hidden;}
  }
  @-webkit-keyframes visib {
    0%{display:block;visibility: visible;}
    100%{display:block;visibility: hidden;}
  }
  .tab-tabar{
    position: relative;
    margin:0.3rem auto 0.14rem;
    width: 3.6rem;
    height:0.7rem;
    border:1px solid #3B7CEC;
    border-radius: 4rem 4rem 4rem 4rem;
    background: rgba(255, 255, 255, 0.3);
    .hover-con{
      position:absolute;
      left:0.4rem;
      top:0.88rem;
      z-index: 2;
      /*opacity:0;
      filter: alpha(opacity = 0);*/
      line-height: 0.26rem;
      /*box-shadow: 0 0.05rem 0.22rem 0 rgba(0,0,0,0.20);*/
    }
    .left-img{
      float:left;
      margin-top:-0.16rem;
      /*margin-left:-0.4rem;*/
    }
    .right-img{
      float:right;
      margin-top:-0.16rem;
      margin-right:-0.1rem;
    }
    $used-time:2s;
    .hover-con-l{
      left:0.4rem;
      -webkit-animation: visib ease-in $used-time;
      -moz-animation: visib ease-in $used-time;
      -o-animation: visib ease-in $used-time;
      animation: visib ease-in $used-time;
    }
    .left-j{
      width:0.2rem;
      position:absolute;
      top:-0.12rem;
      left:0.2rem;
    }
   /* .hover-con-l:after{
      position:absolute;
      top:-0.21rem;
      left:0.2rem;
      content: '';
      border: 0.12rem solid transparent;
      border-bottom: 0.12rem solid #FFF59B;
    }*/
    .hover-con-r{
      right: 0.4rem;
      -webkit-animation: visib ease-in $used-time;
      -moz-animation: visib ease-in $used-time;
      -o-animation: visib ease-in $used-time;
      animation: visib ease-in $used-time;
    }
    .right-j{
      width:0.2rem;
      position:absolute;
      top:-0.12rem;
      right:0.2rem;
    }
    /*.hover-con-r:after{
      position:absolute;
      top:-0.21rem;
      right:0.2rem;
      content: '';
      border: 0.12rem solid transparent;
      border-bottom: 0.12rem solid #FFF59B;
    }*/
  }
  .tab-tabar .mint-tab-item{
      /*display:inline-block;*/
      font-size: 0.28rem!important;
      color: #4A90E2!important;
      display:flex;
      flex-flow:row nowrap;
      justify-content: center;
      align-self:center;
  }
 .most-rapid .mint-tab-item-label,.most-jump .mint-tab-item-label,.is-selected .mint-tab-item-label{
    font-size: 0.28rem!important;
    color: #4A90E2!important;

  }
  .tab-tabar .most-jump{
    display:inline-block;
    width:1.8rem;
    font-size: 0.28rem!important;
    border-radius:4rem 0 0 4rem;
  }
  .most-jump .mint-tab-item-label{
    font-size: 0.28rem!important;
    color: #4A90E2!important;
    display:flex;
    align-self: center;
  }
  .tab-tabar .most-rapid{
    display:inline-block;
    width:1.8rem;
    font-size: 0.28rem!important;
    border-radius:0 4rem 4rem 0;
  }
  .mint-tabbar> .is-selected{
    background: #3B7CEC!important;
    color: #fff!important;
    font-size: 0.28rem!important;
    display:inline-block;
    height:-webkit-fill-available;
    padding: 0.23rem 0.02rem 0.26rem 0.02rem;
    vertical-align: middle;
    width:100%;
  }
  .turnover-time{
    height: 0.3rem;
    line-height: 0.3rem;
    margin:0.13rem auto 0.17rem;
    padding:0 0.3rem;
    text-align: center;
    font-size: 0.24rem;
    color: #ADADAD;
    overflow: hidden;
    background:#F7F9FA;
  }
  .union-list{
    position:relative;
    margin:0 0.3rem 0.2rem;
    width:6.9rem;
    height:2.22rem;
    background: #FFFFFF;
    box-shadow: 0 0 0.3rem 0 rgba(0,0,0,0.05);
    border-radius: 0.16rem;
    .list-title{
      width:6.36rem;
      height:0.89rem;
      padding-right:0.14rem;
      position:relative;
      line-height:0.89rem;
      border-bottom: 1px solid #DADEE4;
      margin: 0 0.2rem;
      text-align:left;
      overflow:hidden;
      white-space:nowrap;
      text-overflow: ellipsis;
      -webkit-box-sizing: border-box;
      box-sizing:border-box;
      span{
        /*display:inline-block;*/
        font-weight:300;
      }
      .sapn-left{
        /*display:inline-block;
        width:0.5rem;
        margin-left:0.05rem;*/
      }
      .num{
        font-size:0.36rem;
        color: #4A90E2;
        margin:0 0.14rem 0 0.2rem;
        font-weight:500;
      }
      .add-persons{
        margin-left:0.14rem;
        font-size:0.28rem;
        color:#000;
      }
      .right-j{
        position:absolute;
        top:50%;
        right:0;
        margin-left:0.05rem;
        margin-top:-0.125rem;
        width:0.14rem;
        height:0.25rem;
      }
    }
    .public-interest{
      width:6.9rem;
      height:1.08rem;
      margin-top:0.23rem;
      .donate{
        width:3.05rem;
        margin-left:0.4rem;
        height:1.08rem;
        .donate-img img{
          width:0.5rem;
          height:0.5rem;
          margin-right:0.2rem;
        }
          .donate-title{
            line-height:0.37rem;
            text-align:left;
            font-size:0.26rem;
            color: #4B4F63;
            font-weight:300;
            i{
              display:inline-block;
              font-style:normal;
              margin-left:0.04rem;
              font-size:0.22rem;

            }
          }
          .donate-numbers{
            width: 2.3rem;
            overflow:hidden;
            text-align:left;
            line-height:0.44rem;
            font-size:0.32rem;
            color: #4A90E2;
          }
      }
      .c-line{
        width:1px;
        height:0.74rem;
        background:#DADEE4;
      }
      .consume{
        /*width:3.43rem;*/
        box-sizing:border-box;
        height:1.08rem;
        .consume-img img{
          width:0.5rem;
          height:0.5rem;
          margin-left:0.64rem;
          margin-right:0.2rem;
        }
        .consume-title{
          line-height:0.37rem;
          text-align:left;
          font-size:0.26rem;
          color: #4B4F63;
          font-weight:300;
          i{
            display:inline-block;
            font-style:normal;
            margin-left:0.04rem;
            font-size:0.22rem;
          }
        }
        .consume-numbers{
          width:2.07rem;
          overflow:hidden;
          text-align:left;
          line-height:0.44rem;
          font-size:0.32rem;
          color: #4A90E2;
        }
      }
    }
  }
  .union-list:last-of-type{margin-bottom:0;}
  .union-list .left-top-j{
    position:absolute;
    top:0;
    left:0;
    width:0.7rem;
    height:0.7rem;
  }
  .union-list:nth-child(2) .left-top-j{
     background:url(/bocm/platformjs/static/image/union/champion_icon.png) no-repeat;
     background-size: 100%;
   }
  .union-list:nth-child(3) .left-top-j{
    background:url(/bocm/platformjs/static/image/union/runner_up_icon.png) no-repeat;
    background-size: 100%;
  }
  .union-list:nth-child(4) .left-top-j{
    background:url(/bocm/platformjs/static/image/union/second_runner_up.png) no-repeat;
    background-size: 100%;
  }
  .bottom_bar{
    color:#DADEE4;
    /*padding:.13rem;*/
    font-size: .24rem;
    height:.5rem;
    line-height: .5rem;
    background: #F7F9FA;

  }
  .hide{visibility: hidden;}
  .show{visibility: visible;}
</style>
