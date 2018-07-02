<template>
  <div class="uniondetail">
    <div v-title="'精准扶贫报告'" ref="d-title"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <!--banner-->
        <div class="banner">
          <a><img :src="unnionBanner" onerror="this.src='/bocm/platformjs/static/image/union/union_defadult_banner.png'" alt="banner正在加载..."></a>
        </div>
        <!--运行成果-->
        <div class="achievements">
          <div class="achiTit">
            <div class="achiTitCon share-con clearfix">
              <div class="line"></div>
              <div class="title">
                <h2>运行成果</h2>
                <p class="time">更新于{{updateTime}}</p>
              </div>
              <div class="share-c"><img class="share-img" :src="shareImgUrl" alt="share" @click="onShare"></div>
            </div>

          </div>
          <div class="achiNum">
            <ul class="clearfix">
              <li>
                <p><span class="red">{{assistants}}</span>位</p>
                <h2>脱贫助理人</h2>
              </li>
              <li>
                <p><span class="red">{{pauper}}</span>位</p>
                <h2>自营贫困户</h2>
              </li>
              <li>
                <p><span class="red">{{loveProduct}}</span>件</p>
                <h2>爱心产品上线</h2>
              </li>
              <li>
                <p><span class="red">{{unionEnrollment}}</span>人</p>
                <h2>公益人士</h2>
              </li>
              <li>
                <p><span class="red">{{unionSpending}}</span>元</p>
                <h2>联盟购买</h2>
              </li>
              <li class="union-sale">
                <p><span class="red">{{unionSalesAmount}}</span>元</p>
                <h2>联盟销售</h2>
              </li>
            </ul>
          </div>
          <!--展开收缩开始-->
          <div class="achiContent" ref="achiContent" v-if="unionDescr">
            <div class="shade" ref="shade"></div>
            <!--内容-->
            <div class="achiCont">
              {{unionDescr}}
            </div>
          </div>
          <div class="achiStop" ref="achiStop" @click="changeSlideDown">收起 <img
              src="../../assets/images/icon/icon-arow.png" alt="箭头"></div>
          <div v-if="unionDescr" @click="changeSlideUp" class="achiOpen" ref="achiOpen">展开 <img
              src="../../assets/images/icon/icon-arow2.png" alt="箭头"></div>
        </div>
        <!--展开收缩结束-->
        <!--扶贫成果-->
        <div class="achievements" style="margin-top: 0.2rem;">
          <div class="achiTit">
            <div class="achiTitCon share-con clearfix">
              <div class="line"></div>
              <div class="title">
                <h2>扶贫成果</h2>
                <p class="time">更新于{{updateTime}}</p>
              </div>
            </div>

          </div>
          <div class="achiNum">
            <ul class="clearfix">
              <li>
                <p><span class="red">{{union_donation}}</span> 元</p>
                <h2>公益捐赠</h2>
              </li>
              <li>
                <p><span class="red">{{full_total_support_amount}}</span> 元</p>
                <h2>联盟帮扶</h2>
              </li>
              <li v-if="union_id == '2'">
                <p><span class="red">{{full_total_fund_amount}}</span> 元</p>
                <h2>帮扶金</h2>
              </li>
            </ul>
          </div>
        </div>
        <!--明星产品-->
        <div class="startProduct">
          <div class="achiTit">
            <div class="achiTitCon clearfix">
              <div class="line"></div>
              <div class="title">
                <h2>明星产品</h2>
                <p class="time">昨日最受欢迎的产品</p>
                <div class="supermarket" @click="goSupermarket()">
                  <div class="clearfix">{{unionName}}大爱超市<img
                      src="/bocm/platformjs/static/image/default/jiao_right2x.png" alt=">"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="startPro">
            <div class="proCont">
              <ul class="clearfix">
                <li v-for="item in startProduct" @click="app.syJsbLaunchWebview(item.url)">
                  <div class="proImg">
                    <img v-lazy="item.goods_image_url" alt="img加载中">
                  </div>
                  <h2>{{item.goods_name}}</h2>
                  <p class="proCont-p">昨日获得<span>{{item.goods_total}}</span>次帮扶</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--员工累计注册人数-->
        <div class="actives" v-if="member_top_list.length">
          <div class="achiTit" @click="_appjs.syJsbLaunchWebview(goUrl+'member')">
            <div class="achiTitCon clearfix">
              <div class="line"></div>
              <div class="title">
                <h2>员工累计注册</h2>
                <p class="time">员工累计注册人数最多的单位</p>
              </div>
              <div class="achiAow fr">
                <img src="../../../static/image/sywall/icon-aow.png" alt="箭头">
              </div>
            </div>
          </div>
          <div class="activeContent">
            <div class="activeCon">
              <div class="for-li" v-for="(item,index) in member_top_list">
                <div class="titContent clearfix">
                  <div class="left fl">
                    <span class="pubColor fl num">{{index | indexNum}}</span>
                    <span class="adress">{{item.circle_name}}</span>
                  </div>
                  <div class="right fr">
                    <span class="pubColor">{{item.count_num}}</span>
                    <span>人</span>
                  </div>
                </div>
                <div class="redLine">
                  <p v-if="Number(member_top_list[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     :style="{width:100*item.count_num/member_top_list[0].count_num+'%'}"></p>
                  <p v-if="!Number(member_top_list[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     style="width: 0%"></p>
                </div>
              </div>
            </div>
            <div class="activeFoo">
              <span class="line"></span>
              <p>{{unionName}}累计注册<span class="gray">{{addRegister}}</span>人</p>
              <span class="line"></span>
            </div>
          </div>
        </div>
        <!--员工注册比率-->
        <div class="actives" v-if="staff_register_percent_top_list.length">
          <div class="achiTit" @click="_appjs.syJsbLaunchWebview(goUrl+'staff')">
            <div class="achiTitCon clearfix">
              <div class="line"></div>
              <div class="title">
                <h2>员工注册比率</h2>
                <p class="time">员工累计比率最多的单位</p>
              </div>
              <div class="achiAow fr">
                <img src="../../../static/image/sywall/icon-aow.png" alt="箭头">
              </div>
            </div>
          </div>
          <div class="activeContent">
            <div class="activeCon">
              <div class="for-li" v-for="(item,index) in staff_register_percent_top_list">
                <div class="titContent clearfix">
                  <div class="left fl">
                    <span class="pubColor fl num">{{index | indexNum}}</span>
                    <span class="adress">{{item.circle_name}}</span>
                  </div>
                  <div class="right fr">
                    <span class="pubColor">{{item.count_num | registnum}}</span>
                    <span>%</span>
                  </div>
                </div>
                <div class="redLine">
                  <p v-if="Number(staff_register_percent_top_list[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     :style="{width:item.count_num +'%'}"></p>
                  <p v-if="!Number(staff_register_percent_top_list[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     style="width: 0%"></p>
                </div>
              </div>
            </div>
            <div class="activeFoo">
              <span class="line"></span>
              <p><span>{{unionName}}</span>累计员工注册比率<span class="gray">{{full_total_register_percent}}</span>%</p>
              <span class="line"></span>
            </div>
          </div>
        </div>
        <!--员工累计消费-->
        <div class="actives" v-if="order_amount_top_list.length">
          <div class="achiTit" @click="_appjs.syJsbLaunchWebview(goUrl+'order_amount')">
            <div class="achiTitCon clearfix">
              <div class="line"></div>
              <div class="title">
                <h2>员工累计消费</h2>
                <p class="time">员工累计公益消费最多的单位（含单位集采）</p>
              </div>
              <div class="achiAow fr">
                <img src="../../../static/image/sywall/icon-aow.png" alt="箭头">
              </div>
            </div>
          </div>
          <div class="activeContent">
            <div class="activeCon">
              <div class="for-li" v-for="(item,index) in order_amount_top_list">
                <div class="titContent clearfix">
                  <div class="left fl">
                    <span class="pubColor fl num">{{index | indexNum}}</span>
                    <span class="adress">{{item.circle_name}}</span>
                  </div>
                  <div class="right fr">
                    <span class="pubColor">{{item.count_num}}</span>
                    <span>元</span>
                  </div>
                </div>
                <div class="redLine">
                  <p v-if="Number(order_amount_top_list[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     :style="{width:100*item.count_num/order_amount_top_list[0].count_num+'%'}"></p>
                  <p v-if="!Number(order_amount_top_list[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     style="width: 0%"></p>
                </div>
              </div>
            </div>
            <div class="activeFoo">
              <span class="line"></span>
              <p><span>{{unionName}}</span>累计消费金额<span class="gray">{{helpMoney}}</span>元</p>
              <span class="line"></span>
            </div>
          </div>
        </div>
        <!--员工人均消费-->
        <div class="actives" v-if="order_avg_top_list.length">
          <div class="achiTit" @click="_appjs.syJsbLaunchWebview(goUrl+'order_avg')">
            <div class="achiTitCon clearfix">
              <div class="line"></div>
              <div class="title">
                <h2>员工人均消费</h2>
                <p class="time">员工累计人均公益消费最多的单位</p>
              </div>
              <div class="achiAow fr">
                <img src="../../../static/image/sywall/icon-aow.png" alt="箭头">
              </div>
            </div>
          </div>
          <div class="activeContent">
            <div class="activeCon">
              <div class="for-li" v-for="(item,index) in order_avg_top_list">
                <div class="titContent clearfix">
                  <div class="left fl">
                    <span class="pubColor fl num">{{index | indexNum}}</span>
                    <span class="adress">{{item.circle_name}}</span>
                  </div>
                  <div class="right fr">
                    <span class="pubColor">{{item.count_num}}</span>
                    <span>元/人</span>
                  </div>
                </div>
                <div class="redLine">
                  <p v-if="Number(order_avg_top_list[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     :style="{width:100*item.count_num/order_avg_top_list[0].count_num+'%'}"></p>
                  <p v-if="!Number(order_avg_top_list[0].count_num)"
                     class="p progress" :class="{'bg-light': index>=3}" :index='index'
                     style="width: 0%"></p>
                </div>
              </div>
            </div>
            <div class="activeFoo">
              <span class="line"></span>
              <p><span>{{unionName}}</span>累计人均消费金额<span class="gray">{{full_total_pay_order_avg}}</span>元</p>
              <span class="line"></span>
            </div>
          </div>
        </div>

        <!--分享之后再次点击分享显示图片-->
        <div class="mask" style="z-index: 999999999;background: rgba(0,0,0,0.5);" v-if="isShare && isShareClick"
             @click="isShareClick = false">
          <img style="width:100%" :src="againShareImg" alt="再次分享加载中">
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
  import siteInfo from '../../global'
  import app from '../../modules/_appJs/index.js'
  import appTitle from '@/components/common/title.vue'
  import loading from '@/components/loading/loading.vue'
  export default {
    data () {
      return {
        app,
        isLoading: true,
        isActive: true,
        hsError: false,
        docTitle: '',//title
        unnionBanner: '', //头图
        assistants: '', //助理人上线
        pauper: '', //贫困户上线
        loveProduct: '', //爱心产品上线
        lovetoBuy: '', //爱心购买
        unionEnrollment: '',//公益人士
        singleBenefit: '', //贫困户增收
        unionSpending: '',//联盟购买
        moreBenefit: '', //贫困人口受益
        unionSalesAmount: '',//联盟销售
        unionDescr: '', //联盟介绍
        updateTime: '', //更新时间
        union_donation: '', //公益捐赠
        full_total_support_amount:'',//本联盟的人购买本联盟产品的金额
        full_total_fund_amount:'',//公益基金
        textArr: [],//文本
        union_id: '', //跳转接口Id
        unionId: '',//接口id
        union_name: '', //跳转name
        union_channel:'',//公益联盟
        web_share: '', //二次分享
        startProduct: {}, // 明星产品
        startImg: '', //
        startPname: '', // 明星产品name
        units: '', //单位
        addRegister: '', //累计注册
        helpMoney: '', //帮扶金额
        inviteCustomer: '',   //邀请益客
        unionName: '', //联盟名称
        isShare: false,// 是否分享
        isShareClick: false,   // 是否点击分享按钮
        currentUrl: '', //当前页url
        currentTitle: '', //当前页title
        appIcon: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png',//app icon
        shareImgUrl: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/default/share_2.png', //分享图片
        againShareImg: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/share_img.png', //二次分享弹窗图
        goUrl: '',
        member_top_list: [], // 累计注册
        order_amount_top_list: [], // 累计消费
        order_avg_top_list: [], //人均消费
        staff_register_percent_top_list: [],//注册比率
        full_total_pay_order_avg: '',//人均消费累计金额
        full_total_register_percent: ''  //累计注册比率
      }
    },
    components: {
      'app-title': appTitle,
      'sy-loading': loading,
    },
    created () {
      this.union_id = this.$route.query.union_id
      this.web_share = this.$route.query.web_share
      var web_share = this.$route.query.web_share || ''
      var union_channel = this.$route.query.union_channel || ''
      this.isShare = this.$route.query.web_share === 'yes'
      this.goUrl = this.siteInfo.host + '/bocm/index.php?act=union&op=top_list_all&union_id=' + this.union_id + '&web_share=' + web_share + '&union_channel=' + union_channel + '&list='
      this.requestDate()
    },
    mounted () {

    },
    filters: {
      indexNum: function (val) {
        val = (val + 1) > 9 ? (val + 1) : '0' + (val + 1);
        return val;
      },
      registnum: function (val) {
        val = val > 100 ? 100 : val;
        return val;
      }
    },
    methods: {
      requestDate () {
        this.$http.get(this.siteInfo.host + '/api/index.php?act=union&op=get_info&union_id=' + this.union_id).then((res) => {
          let content = res.data.content
          this.isLoading = false
          this.unnionBanner = content.union_info.union_banner
          this.assistants = content.union_info.agent_count
          this.pauper = content.union_info.poor_self_count
          this.loveProduct = content.union_info.goods_count
          this.unionEnrollment = content.union_info.union_enrollment
          this.unionSpending = content.union_info.union_spending
          this.unionSalesAmount = content.union_info.union_sales_amount
          this.unionDescr = content.union_info.union_introduction
          this.unionId = content.union_info.union_id
          this.union_channel = content.union_info.union_channel
          this.updateTime = content.union_info.update_time
          this.unionName = content.union_info.union_name
          this.union_donation = content.union_info.union_donation
          this.full_total_support_amount = content.union_info.full_total_support_amount
          this.full_total_fund_amount = content.union_info.full_total_fund_amount

          //单位
          this.units = content.union_info.circle_count
          //累计注册人数
          this.addRegister = content.union_info.full_total_member
          //邀请益客
          this.inviteCustomer = content.union_info.invite_num
          //帮扶金额
          this.helpMoney = content.union_info.full_total_pay_order_amount
//          累计人均消费金额
          this.full_total_pay_order_avg = content.union_info.full_total_pay_order_avg
//          累计注册比率
          this.full_total_register_percent = content.union_info.full_total_register_percent

          //明星产品
          this.startProduct = content.union_top_list.goods_list

          this.currentTitle = document.title
//          员工累计注册
          this.member_top_list = content.union_top_list.member_top_list
//          累计消费
          this.order_amount_top_list = content.union_top_list.order_amount_top_list
//          人均消费
          this.order_avg_top_list = content.union_top_list.order_avg_top_list
//          注册比率
          this.staff_register_percent_top_list = content.union_top_list.staff_register_percent_top_list
          for(var i=0;i<this.staff_register_percent_top_list.length;i++){
            if(this.staff_register_percent_top_list[i].count_num>100){
              this.staff_register_percent_top_list[i].count_num = 100
            }
          }

        })
      },
      goSupermarket () {
        let url = this.siteInfo.host + '/bocm/index.php?act=goods&op=support_poor_goods_list_union&union_id=' + this.unionId + '&path=union&union_channel='+this.union_channel+'&union_name=' + encodeURI(this.unionName)
//        encodeURI() //编码
//        decodeURI() //解码
        this._appjs.syJsbLaunchWebview(url)
      },
      changeSlideUp () {
        this.$refs.shade.style.display = 'none'
        this.$refs.achiContent.style.height = 'auto'
        this.$refs.achiContent.style.overflow = 'hidden'
        this.$refs.achiStop.style.display = 'block'
        this.$refs.achiOpen.style.display = 'none'
      },
      changeSlideDown () {
        this.$refs.shade.style.display = 'block'
        this.$refs.achiContent.style.height = '1.2rem'
        this.$refs.achiContent.style.overflow = 'hidden'
        this.$refs.achiStop.style.display = 'none'
        this.$refs.achiOpen.style.display = 'block'
      },
      onShare () {
//        console.log('Onshare() 执行')
        if (this.isShare) {
          this.isShareClick = true;
        } else {
          this.shareFn()
        }
      },
      // 分享 调webview
      shareFn () {
        this.share_content = false;
        let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=union&op=get_info&union_id=' + this.union_id + '&web_share=yes';
        let shareText = (this.unionDescr == '' || this.unionDescr == null || this.unionDescr == undefined) ? '一起善源' : this.unionDescr;
        let shareTitle = this.currentTitle;
        let shareLogo = this.appIcon;
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        app.syJsbShare(jsonParam, shareText, shareUrl);
      },
      getQueryString(name)
      {
        //查询url参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let $hash = window.location.hash;
        var r = $hash.substr($hash.indexOf('?') + 1).match(reg);
        if (r != null)return unescape(r[2]);
        return '';
      },

    }

  }
</script>

<style scoped>
  @import "../../../static/css/common.css";

  .banner {
    width: 100%;
  }

  .banner img {
    width: 100%;
    display: block;
  }

  .achievements {
    width: 100%;
    background-color: #fff;
  }

  .achiTit {
    padding: .53rem 0 .28rem;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }

  .achiTit .line {
    float: left;
    width: .16rem;
    height: .7rem;
    background-color: #4A90E2;
  }

  .achiTit .title {
    float: left;
    margin-left: .14rem;
    text-align: left;
  }

  .achiTit .title h2 {
    color: #606060;
    font-size: .34rem;
  }

  .achiTit .title p {
    padding-top: .14rem;
    color: #b1b1b1;
    font-size: .24rem;
  }

  .achiTit .achiAow {
    width: 0.6rem;
    height: 0.4rem;
    margin-top: 0.15rem;
  }

  .achiTit .achiAow img {
    height: 0.4rem;
    width: 0.25rem;
  }

  .achiTitCon {
    position: relative;
  }

  .achiTitCon .supermarket {
    position: absolute;
    top: 50%;
    margin-top: -0.18rem;
    right: 0.3rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    color: #4A90E2;
    font-weight: 300;
    padding: 0 0.12rem;
    border: 1px solid #4A90E2;
    border-radius: 0.18rem;
  }

  .achiTitCon .supermarket div {
    position: relative;
    overflow: hidden;
    height: 0.36rem;
    line-height: 0.36rem;
  }

  .achiTitCon .supermarket div img {
    display: inline-block;
    float: right;
    margin-top: 0.06rem;
    width: 0.12rem;
    height: 0.2rem;
    margin-left: 0.12rem;
  }

  .share-c {
    position: absolute;
    right: 0.3rem;
    top: 0;
    border-left: 1px solid #DADEE4;;
  }

  .share-img {
    margin-left: 0.19rem;
    width: 0.48rem;
    height: 0.48rem;
  }

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
  }

  .achiNum {
    padding-left: .3rem;
  }

  .achiNum ul {
    padding-bottom: .2rem;
  }

  .achiNum li {
    float: left;
    margin-top: .25rem;
    width: 33.3%;
    text-align: left;
  }

  .achiNum .union-sale {
    float: left;
    margin-top: .25rem;
    width: 33.3%;
    padding-right: 0.3rem;
    text-align: left;
    box-sizing: border-box;
    overflow: hidden;
  }

  .achiNum li p {
    padding-bottom: .15rem;
    color: #999;
    font-size: .22rem;
    width: 100%;
    overflow: hidden;
  }

  .achiNum li .red {
    color: #4A90E2;
    font-weight: 600;
    font-size: .32rem;
  }

  .achiNum li h2 {
    color: #606060;
    font-size: .26rem;
  }

  .achiContent {
    position: relative;
    overflow: hidden;
    padding: 0 .3rem;
    height: 1.2rem;
  }

  /*遮罩*/
  .shade {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.2rem;
    background: -moz-linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .8));
    background: -webkit-linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .8));
    background: -o-linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .8));
    background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .8));
  }

  .achiContent .achiCont p {
    margin-top: .25rem;
    color: #606060;
    text-align: left;
    font-size: .28rem;
    line-height: .5rem;
  }

  .achiContent .achiCont {
    line-height: 0.48rem;
    color: #606060;
    /*text-align: left;*/
    font-size: 0.28rem;
    text-indent: 2em;
    border-top: 1px solid #ddd;
    text-align:justify;
  }

  .achiContent .achiCont .achiConImg {
    margin-top: .25rem;
  }

  .achiContent .achiCont .achiConImg div {
    position: relative;
    height: 2.2rem;
    border-radius: 8px;
    background-color: #f2f2f2;
  }

  .achiContent .achiCont .achiConImg div img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    min-height: 2.2rem;
    height: auto !important;
    height: 2.2rem;
    border-radius: 8px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    border: 1px solid #e2e2e2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .achiContent .achiCont .achiConImg .img1 {
    width: 3rem;
  }

  .achiContent .achiCont .achiConImg .img2 {
    width: 3.8rem;
  }

  .achiContent .achiCont .achiConImg .img3 {
    width: 6.9rem;
    height: 3.4rem;
  }

  .achiContent .achiCont .achiConImg .img3 img {
    min-height: 3.4rem;
    height: auto !important;
    height: 3.4rem;
  }

  .achiOpen, .achiStop {
    position: relative;
    width: 100%;
    height: .93rem;
    color: #979797;
    text-align: center;
    font-size: .24rem;
    line-height: .93rem;
    margin-left: -0.18rem;
  }

  .achiOpen {
    font-size: 0.24rem;
  }

  .achiOpen img, .achiStop img {
    position: absolute;
    top: 50%;
    margin-top: -.05rem;
    margin-left: .06rem;
    width: .24rem;
    height: .12rem;
  }

  .achiStop {
    display: none;
  }

  .startProduct {
    margin-top: .2rem;
    width: 100%;
    background-color: #fff;
  }

  .startProduct .startPro {
    padding: 0 .3rem .34rem;
  }

  .startPro .proCont li {
    float: left;
    margin-top: .33rem;
    width: 49%;
    text-align: left;
  }

  .startPro .proCont li:nth-child(2n) {
    float: right;
  }

  .startPro .proCont li .proImg {
    position: relative;
    width: 3.4rem;
    height: 2.2rem;
    border-radius: 8px;
    background-color: #f2f2f2;
  }

  .startPro .proCont li .proImg img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    height: 2.2rem;
    border-radius: 8px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    border: 1px solid #e2e2e2;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .startPro .proCont li h2 {
    overflow: hidden; /*width:80%;*/
    color: #606060;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .26rem;
    line-height: .5rem;
  }

  .startPro .proCont li p {
    color: #999;
    font-size: .24rem;
    width: 100%;
    line-height: 0.33rem;
  }

  .startPro .proCont li p span {
    color: #4A90E2;
  }

  .actives {
    margin-top: .2rem;
    background-color: #fff;
  }

  .actives .activeCon {
    padding: 0 .3rem .45rem .32rem;
  }

  .activeCon li {
    margin-top: .3rem;
    text-align: left;
  }

  .tit {
    color: #999;
    font-size: .26rem;
  }

  .red {
    color: #f13e52;
  }

  .activeCon .tit span:first-child {
    margin-right: .23rem;
    font-weight: 600;
  }

  .activeCon .tit span:nth-child(2) {
    display: inline-block;
    overflow: hidden;
    width: 60%;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .24rem;
  }

  .activeCon .tit span:nth-child(4) {
    display: inline-block;
    width: 18%;
    text-align: right;
  }

  .redLine {
    margin-top: .15rem;
    margin-left: .5rem;
    width: 90%;
    height: .1rem;
    border-radius: .1rem;
  }

  /*.redLine p{width:50%;height:100%;border:1px solid #f13e52;border-radius:.1rem;background:rgba(241,62,82,.6);}*/
  /*for-li*/
  .activeCon .for-li {
    margin-top: 0.3rem;
    text-align: left;
  }

  .activeCon .for-li:nth-child(1) .redLine p, .activeCon .for-li:nth-child(2) .redLine p, .activeCon .for-li:nth-child(3) .redLine p {
    background-color: rgba(74, 144, 226, .6);
  }

  .activeFoo {
    padding-bottom: .36rem;
    color: #b1b1b1;
    text-align: center;
    font-size: .22rem;
  }

  .activeFoo .line {
    width: .5rem;
    height: .02rem;
    background-color: #b1b1b1;
    vertical-align: middle;
  }

  .activeFoo .line, .activeFoo p {
    display: inline-block;
  }

  .activeFoo .gray {
    color: #3f3f3f;
  }

  .display-show {
    display: block;
  }

  .display-hide {
    display: none;
  }

  .for-li {
    text-align: left;
    margin-bottom: 0.3rem;
  }

  span {
    color: #999;
    font-size: .26rem;
  }

  .pubColor {
    color: #4A90E2;
    font-weight: 600;
  }

  .num {
    margin-right: 0.23rem;
    line-height: 0.33rem;
  }

  .adress {
    width: 4.3rem;
    font-size: 0.24rem;
    line-height: 0.33rem;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .redLine {
    margin-top: .15rem;
    margin-left: .5rem;
    width: 90%;
    height: .1rem;
    border-radius: .1rem;
  }

  .progress {
    width: 100%;
    height: 100%;
    border: 1px solid #4A90E2;
    border-radius: .1rem;
    background: rgba(74, 144, 226, .6);
  }

  .bg-light {
    background: #edf4fc;
  }

  .activeFoo span {
    font-size: 0.22rem;
  }
  .fr{float:right;}
  /*.fl{float:right;}*/
</style>
