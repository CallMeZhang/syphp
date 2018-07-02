<template>
  <div class="wrapper">
    <div v-title="'公益钱包'"></div>
    <div class="wrapper">
      <div class="header">
        <!--头像-->
        <div class="photo">
          <div class="one"></div>
          <div class="two"></div>
          <div class="three">
            <img :src="member_avatar" :onerror="'this.src=\''+siteInfo.host+'/bocm/platformjs/static/image/bigLoveShop/man.png\''" alt="头像">
          </div>
        </div>
        <!--钱包未激活-->
        <div class="moneyNo" v-if="wallet_active==0">
          <div class="moneyNum">
            <p>￥{{available_predeposit}}</p>
            <span>暂未激活</span>
          </div>
          <div class="moneyBtn">
            <button type="button" @click="activate">激活钱包</button>
            <span class="icon" @click.stop="tip()"></span>
            <p>激活成功，赠送<span>300</span>公益积分</p>
          </div>
        </div>
        <!--激活弹窗-->
        <sy-popups v-if="isActivate" :isActivate="isActivate" @act-pop-up="tip"></sy-popups>
        <!--钱包激活-->
        <div class="moneyHave" v-if="wallet_active==1 && isshow">
          <div class="config" @click="config">
            <div class="img">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-config.png'">
            </div>
          </div>
          <div class="moneyNum">
            <p><span>钱包余额</span>￥{{available_predeposit}}</p>
            <p v-if="false">可提现金额：￥{{cashable}} <span v-if="false">提现</span></p>
          </div>
          <div class="moneyBtn">
            <button type="button" @click="recharge">充值</button>
          </div>
        </div>
        <!--钱包冻结-->
        <div class="moneyFrozen" v-if="wallet_freeze ==1">
          <p>￥{{available_predeposit}}</p>
          <div class="icon">已冻结 <span @click.stop="frostPopUp()"></span></div>
        </div>
        <div class="bolang">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-bolang.png'" alt="">
        </div>
        <!--冻结弹窗-->
        <sy-popups v-if="isFrost" :is-frost="isFrost" @frost-pop-up="frostPopUp" :frost-cause="frostCause"></sy-popups>
      </div>
      <div class="privilege">
        <!--未激活状态-->
        <div class="privilegeNo" v-if="wallet_active==0">
          <div class="tit">
            <p>公益钱包是公益人士的公益账户</p>
            <p>使用钱包可以享受以下特权</p>
          </div>
          <div class="list">
            <ul class="clearfix">
              <li class="fl">
                <div class="img">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-group1.png'" alt="group1.png">
                </div>
                <p>快速支付</p>
              </li>
              <li class="fl">
                <div class="img">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-group2.png'" alt="group2.png">
                </div>
                <p>公益支付享受</p>
                <p>1.2倍公益积分</p>
              </li>
              <li class="fl">
                <div class="img">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-group3.png'" alt="group3.png">
                </div>
                <p>公益项目</p>
                <p>精准推送</p>
              </li>
              <li class="fl">
                <div class="img">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-group4.png'" alt="group4.png">
                </div>
                <p>保值增值</p>
              </li>
            </ul>
          </div>
        </div>
        <!--激活状态-->
        <div class="privilegeHave" v-if="wallet_active==1 && isshow">
          <div class="xiangmu" v-if="isProject">
            <div class="titl">
              <span class="line"></span>
              <span class="tit">订阅的项目</span>
            </div>
            <div v-bind:class="{'list':isT, 'showh':isH}" ref="list" id="showH">
              <div class="item clearfix" v-for="item in tag" @click="_appjs.syJsbLaunchWebview(item.list_url)">
                <span class="fl">{{item.tag_name}}</span>
                <img class="fr" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-aow.png'" alt=">">
                <span class="fr">{{item.project_num}}个项目进行中</span>
              </div>
            </div>
          </div>
          <div class="more" @click="more" v-if="isProject && tag.length>2">
            <span>{{moreF}} <img :src="imgPath" alt=""></span>
          </div>
          <div class="wallList">
            <div class="titl">
              <span class="line"></span>
              <span class="tit">钱包明细</span>
            </div>
            <div class="list">
              <div class="item clearfix" @click="rechargeList">
                <span class="fl">充值明细</span>
                <img class="fr" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-aow.png'" alt=">">
                <span class="fr">累计充值{{rechargeCount}}元</span>
              </div>
              <div class="item clearfix" @click="usageList">
                <span class="fl">使用明细</span>
                <img class="fr" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-aow.png'" alt=">">
                <span class="fr">累计使用{{usedCount}}元</span>
              </div>
              <div class="item clearfix" v-if="false">
                <span class="fl">提现记录</span>
                <img class="fr" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-aow.png'" alt=">">
                <span class="fr">累计提现{{withdrawCount}}元</span>
              </div>
            </div>
          </div>
        </div>
        <!--冻结状态-->
        <div class="privilegeFrozen" v-if="wallet_freeze ==1">
          <p>有任何疑问请拨打客服电话：<a href="javascript:void(0);" @click="getAsk($event)">400-666-7308</a></p>
        </div>
      </div>
      <div class="link" style="height: 0.3rem;background-color:#fff;"></div>
    </div>
  </div>
</template>
<script>
  import popups from './common/popups.vue'
  export default{
    data(){
      return {
        moreF: '点击展开更多',
        isT:true,
        isH: false,
        imgPath: this.siteInfo.cdn_host + '/bocm/platformjs/static/image/sywall/icon-xia.png', // 图片路径
        isActivate: false, //弹窗
        isFrost: false, //冻结弹窗
        frostCause: '',//冻结原因
        member_avatar: '', //用户头像
        available_predeposit: '', //钱包余额
        wallet_active: '',//激活状态
        wallet_freeze: '',//冻结状态
        cashable: '', //可提现金额
        tag: [],
        isProject: false,
        withdrawCount: '', //提现明细
        usedCount: '', //使用明细
        rechargeCount: '',//充值明细
        isshow: true
      }
    },
    components: {
      'sy-popups': popups
    },
    created: function () {
      this.getData()
    },
    mounted () {
      this.$nextTick(()=>{
        /*if (this.tag.length > 2) {
         this.$refs.list.style.height = '1.78rem'
         } else {
         this.$refs.list.style.height = 'auto'
         }*/
      })
    },
    methods: {
      getData(){
//        获取激活状态
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=getWalletBasicInfo').then(res => {
          if (res.data.code == 200) {
            let a = res.data.content
            this.member_avatar = a.member_avatar
            this.available_predeposit = a.available_predeposit
            this.wallet_active = a.wallet_active
            this.wallet_freeze = a.wallet_freeze
            this.frostCause = a.wallet_freeze_reason
            this.cashable = a.cashable
            if (this.wallet_active == 1) {
//              获取项目标签
              this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=getCountConcerned').then(res => {
                if (res.data.code === 400) {
                  this.isProject = false
                } else {
                  this.isProject = true
                  let b = res.data
                  this.tag = b.content
                  if (this.tag.length > 2) {
                    this.isH = true
                  } else {
                    this.isH = false
                  }
                }
              })
//              获取统计明细
              this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=walletLogCount').then(res => {
                this.usedCount = res.data.content.usedCount
                this.withdrawCount = res.data.content.withdrawCount
                this.rechargeCount = res.data.content.rechargeCount
              })
            }
            if (this.wallet_freeze == 1) {
              this.isshow = false
            } else {
              this.isshow = true
            }
          } else {
            this.$toast('获取失败或未登录')
          }
        })
      },
      more () {
        if (this.moreF == '点击展开更多') {
          this.$refs.list.style.height = 'auto'
          this.moreF = '点击收起'
          this.imgPath = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/sywall/icon-shang.png'

        } else if (this.moreF == '点击收起') {
          this.$refs.list.style.height = '1.78rem'
          this.moreF = '点击展开更多'
          this.imgPath = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/sywall/icon-xia.png'
        } else {
          this.$refs.list.style.height = 'auto'
        }
      },
      tip(){
        this.isActivate = !this.isActivate
      },
      frostPopUp(){
        this.isFrost = !this.isFrost
      },
      activate(){
//        激活公益钱包
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=sywall_activation'
        this._appjs.syJsbLaunchWebview(url)
      },
      recharge(){
        //跳转到充值页面
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=pd_recharge'
        this._appjs.syJsbLaunchWebview(url)
//        window.location.href = url
      },
      config(){
        //跳转到修改信息页面
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=edit_info'
        this._appjs.syJsbLaunchWebview(url)
      },
      rechargeList(){
        //充值明细页面
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=recharge_list'
        this._appjs.syJsbLaunchWebview(url)
      },
      usageList(){
        //使用明细
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=usage_list'
        this._appjs.syJsbLaunchWebview(url)
      },
//      clickTag(){
//        this.$toast('项目暂未开启，敬请期待！')
//      },
      getAsk(e){
        if (this.$route.query.is_share == 'yes') {
          e.target.herf = 'tel:' + '4006667308'
        } else {
          this._appjs.syJsbCallPhone('4006667308')
        }
      }
    }
  }
</script>
<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .header {
    background-image: linear-gradient(0deg, #00ECBC 0%, #4A90E2 100%);
    padding-top: 0.63rem;
    padding-bottom: 1.93rem;
    position: relative;
  }

  .header .bolang {
    width: 100%;
    height: 0.93rem;
    /*margin-top: 0.5rem;*/
    /*margin-bottom: -1px;*/
    position: absolute;
    bottom: -1px;
    left: 0;
  }

  .header .bolang img {
    width: 100%;
    height: 100%;
  }

  .header .photo {
    position: relative;
    height: 3rem;
    width: 3rem;
    margin: 0 auto;
  }

  .header .photo .one,
  .header .photo .two,
  .header .photo .three {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
  }

  .header .photo .one {
    z-index: 1;
    height: 3rem;
    width: 3rem;
    background: rgba(255, 255, 255, 0.25);
  }

  .header .photo .two {
    top: 0.335rem;
    left: 0.335rem;
    z-index: 2;
    height: 2.33rem;
    width: 2.33rem;
    background: rgba(255, 255, 255, 0.5);
  }

  .header .photo .three {
    top: 0.63rem;
    left: 0.63rem;
    z-index: 3;
    height: 1.74rem;
    width: 1.74rem;
    /*background: pink;*/
  }

  .header .photo .three img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  /*钱包未激活*/
  .header .moneyNo,
  .header .moneyFrozen {
    margin-top: 0.5rem;
  }

  .header .moneyNum p,
  .header .moneyFrozen p {
    text-align: center;
    font-size: 0.6rem;
    color: #fff;
    padding-bottom: 0.21rem;
  }

  .header .moneyNum span {

    text-align: center;
    font-size: 0.28rem;
    color: #fff;
    opacity: 0.91;
    font-weight: 300;
  }

  .header .moneyBtn {
    margin-top: 0.73rem;
    position: relative;
  }

  .header .moneyBtn button {
    height: 1rem;
    width: 3rem;
    margin: 0 auto;
    background: #4A90E2;
    border: 1px solid #4A90E2;
    box-shadow: 0 0 30px 0 #4A90E2;
    border-radius: 0.08rem;
    color: #fff;
    text-align: center;
    font-size: 0.36rem;
    outline: none;
  }

  .header .moneyBtn .icon {
    display: inline-block;
    height: 0.4rem;
    width: 0.4rem;
    background: url("/bocm/platformjs/static/image/sywall/icon-wenhao.png") no-repeat center;
    background-size: contain;
    position: absolute;
    top: 0.3rem;
    right: 1.53rem;
  }

  .header .moneyBtn p {
    font-size: 0.24rem;
    color: #FFF;
    font-weight: 300;
    padding-top: 0.2rem;
  }

  .header .moneyBtn p span {
    color: #F8E71C;
  }

  /*钱包激活*/
  .header .moneyHave {
    margin-top: 0.5rem;
  }

  .header .moneyHave .moneyNum p:first-child span {
    display: inline-block;
    width: 1.4rem;
    padding: 0.09rem 0.14rem;
    /*height: 0.44rem;*/
    /*line-height: 0.44rem;*/
    margin-bottom: 0.15rem;
    margin-right: 0.2rem;
    background: #15DD95;
    border-radius: 1rem;
    color: #fff;
    text-align: center;
    font-size: 0.28rem;
    font-weight: 300;
    vertical-align: middle;
  }

  /*.header .moneyHave .moneyNum p:last-child {*/
    /*font-size: 0.28rem;*/
    /*color: #FFF;*/
    /*opacity: 0.91;*/
    /*font-weight: 300;*/
    /*padding-top: 0.15rem;*/
  /*}*/

  /*.header .moneyHave .moneyNum p:last-child span {*/
    /*color: #4A90E2;*/
    /*text-decoration: underline;*/
    /*padding-left: 0.12rem;*/
  /*}*/

  .header .moneyHave .config {
    position: absolute;
    top: 0.63rem;
    right: 0.5rem;
  }

  .header .moneyHave .config img {
    width: 0.4rem;
    height: 0.4rem;
  }

  /*钱包冻结*/
  .header .moneyFrozen {
    padding-bottom: 2.21rem;
  }

  .header .moneyFrozen .icon {
    font-weight: 300;
    /*padding-top: 0.15rem;*/
    text-align: center;
    font-size: 0.28rem;
    color: #fff;
    font-weight: 300;
    height:0.4rem;
    line-height:0.4rem;
  }

  .header .moneyFrozen .icon span {
    display: inline-block;
    height: 0.3rem;
    width: 0.3rem;
    background: url("/bocm/platformjs/static/image/sywall/icon-small.png") no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  .privilege {
    padding-top: 0.15rem;
    background-color: #fff;
  }

  /*未激活钱包下面的内容样式*/
  .privilege .tit p {
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.4rem;
    font-weight: 300;
  }

  .privilege .privilegeNo .list {
    margin-top: 0.75rem;
  }

  .privilege .privilegeNo .list li {
    width: 50%;
    margin-bottom: 0.25rem;
    text-align: center;
  }

  .privilege .privilegeNo .list li .img {
    width: 1.16rem;
    height: 1.16rem;
    margin: 0 auto;
    padding-bottom: 0.28rem;
  }

  .privilege .privilegeNo .list li img {
    width: 100%;
    height: 100%;
  }

  .privilege .privilegeNo .list li p {
    font-size: 0.26rem;
    color: #666A7F;
    font-weight: 300;
    line-height: 0.36rem;
  }

  /*激活钱包下面的内容*/
  .privilege .privilegeHave .titl {
    padding: 0.32rem 0 0.2rem 0.3rem;
    text-align: left;
    position: relative;
  }

  .privilege .privilegeHave .titl .line {
    display: inline-block;
    height: 0.4rem;
    width: 0.06rem;
    background: #F8E71C;
    box-shadow: 0 0 16px 0 #F0D35B;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
  }

  .privilege .privilegeHave .titl .tit {
    font-size: 0.3rem;
    color: #4B4F63;
    position: absolute;
    top: 0.4rem;
    left: 0.5rem;
    font-weight: 300;
  }

  .privilege .privilegeHave .list .item {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    background: #F6FAFF;
    border-top: 1px solid rgba(218, 222, 228, 0.60);
  }

  .privilege .privilegeHave .list .item:last-child {
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
  }

  .privilege .privilegeHave .list .item span {
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .privilege .privilegeHave .list .item span:last-child {
    color: #B1B8C4;
  }

  .privilege .privilegeHave .list .item img {
    width: 0.12rem;
    height: 0.24rem;
    margin-left: 0.2rem;
    margin-top: 0.32rem;
  }

  .privilege .privilegeHave .more {
    font-size: 0.24rem;
    color: #B1B8C4;
    font-weight: 300;
    padding: 0.2rem 0;
  }

  .privilege .privilegeHave .more img {
    width: 0.2rem;
    height: 0.1rem;
    vertical-align: middle;
    margin-left: 0.1rem;
  }

  .privilege .privilegeHave .xiangmu .list {
    overflow: hidden;
    /*height: 1.78rem;*/
    height:auto;
  }
  .privilege .privilegeHave .xiangmu .showh{
    height:1.78rem;
  }

  /*冻结钱包下面的内容*/
  .privilege .privilegeFrozen {
    position: absolute;
    bottom: 1rem;
    width: 100%;
  }

  .privilege .privilegeFrozen p {
    font-size: 0.26rem;
    color: #818C9E;
    font-weight: 300;
  }

  .privilege .privilegeFrozen p a {
    color: #A1C5EF;
  }
</style>
