<template>
  <div class="pop-container">
      <!--<app-title title="hi app-title" ></app-title>-->

    <!--激活钱包-->
    <div v-if="isActivate">
      <!--背景-->
      <div class="popup-bj"></div>
      <div class="popup-con">
        <div id="isActX" class="popup-close"><img @click="actPopUp()" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/close_x2.png'" alt="close-img"></div>
        <div class="con">
          <h2 class="c-title">{{activateTitle}}</h2>
          <p class="c-descr">{{activateDescr}}</p>
          <div class="c-rules">
            <h3 class="rules-title">激活流程</h3>
            <div class="rules-con">
              <!--<div class="con-l">提供您的身份证信息</div>
              <div class="con-c">收到工作人员电话<br/>与您核实信息</div>
              <div class="con-r">激活钱包<br/>成功</div>-->
              <div class="col-t">提供您的身份证信息</div>
              <div class="col-b">激活钱包成功</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--手机号弹出-->
    <div v-if="isPhonePop">
      <div class="popup-bj"></div>
      <div class="popup-con">
        <div class="popup-close"><img @click="phonePopUp()" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/close_x2.png'" alt="close-img"></div>
        <div class="con">
          <h2 class="c-title">{{phoneTitle}}</h2>
          <p class="c-descr">{{phoneDescr}}</p>
          <div class="c-rules">
            <h3 class="rules-title text-alignL">若需要修改您的手机号：</h3>
            <div class="phone-con">
              <p>打开“我的”-“设置”界面，找到“手机号”选项</p>
              <p class="margin-t32">验证原有手机号</p>
              <p class="margin-t34">验证新的手机号</p>
              <p class="margin-t35">修改成功</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--订阅公益项目弹窗-->
    <div v-if="isSubscibe" >
      <div class="popup-bj"></div>
      <div class="popup-con">
        <div class="popup-close"><img @click="subscibeChangePop()" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/close_x2.png'" alt="close-img"></div>
        <div class="con">
          <h2 class="c-title">{{subscibeTitle}}</h2>
          <p class="c-descr">{{subscibeDescr}}</p>
          <div class="c-rules">
            <h3 class="rules-title text-alignL">查看订阅的公益项目</h3>
            <div class="subscibe-con">
              <p>打开“我的”-“公益钱包”界面<br/>找到“订阅的项目”</p>
              <p class="margin-t27">点击“订阅的项目”下的分类<br/>查看对应的公益项目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--钱包冻结弹窗-->
    <div v-if="isFrost">
      <div class="popup-bj"></div>
      <div class="popup-con">
        <div class="popup-close"><img @click="frostPopUp()" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/close_x2.png'" alt="close-img"></div>
        <div class="frost-con-all">
          <h2 class="f-title">{{frostTitle}}</h2>
          <div class="frost-con">
            <p class="f-descr">{{frostDescr}}</p>
            <div class="frost-con-txt">
              <p>冻结原因:</p>
              <p>{{frostCause}}</p>
            </div>
          </div>
          <div class="f-shade"></div>
        </div>
      </div>
    </div>
    <!--参加捐赠弹窗-->
    <div v-if="isDonate" :class="{'d-hide':closeX}">
      <div class="popup-bj"></div>
      <div class="popup-con">
        <div class="popup-close"><img @click="closePopUp(closeX)" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/close_x2.png'" alt="close-img"></div>
        <div class="con">
          <h2 class="c-title">{{donateTitle}}</h2>
          <p class="c-descr">{{donateDescr}}</p>
          <div class="c-rules">
            <h3 class="rules-title text-alignL">分益钱包五重特权：</h3>
            <ol class="donate-list">
              <li style="margin-top:-0.12rem;">1.快速支付</li>
              <li>2.公益支付享受1.2倍公益积分</li>
              <li>3.公益项目精准推送</li>
              <li>4.随时提现免手续费</li>
              <li>5.资金保值增值，惊喜不停</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import app from '../../../../modules/_appJs/index.js'
  export default {
    name: 'popups',
    props:{
      isActivate:{//激活钱包
        type:Boolean,
        default:false
      },
      isPhonePop:{//钱包绑定手机号
        type:Boolean,
        default:false
      },
      isSubscibe:{//订阅公益项目
        type:Boolean,
        default:false
      },
      isFrost:{//冻结原因
        type:Boolean,
        default:false
      },
      isDonate:{//参加捐赠
        type:Boolean,
        default:false
      },
      activateTitle:{
        type:String,
        default:'激活钱包'
      },
      activateDescr:{
        type:String,
        default:'为了保障您的资金安全，您需要先认证个人身份后才能激活钱包。'
      },
      phoneTitle:{
        type:String,
        default:'钱包绑定手机号'
      },
      phoneDescr:{
        type:String,
        default:'钱包绑定手机号为您在“一起善源”的登录手机号。'
      },
      subscibeTitle:{
        type:String,
        default:'订阅公益项目'
      },
      subscibeDescr:{
        type:String,
        default:'订阅公益项目可以按项目分类更精准、便捷的获取项目信息。'
      },
      frostTitle:{
        type:String,
        default:'冻结原因'
      },
      frostDescr:{
        type:String,
        default:'尊敬的用户，为了保障您的财产安全，您的钱包已暂时冻结。'
      },
      frostCause:{
        type:String,
        default:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin Lorem ipsum dolor sit amet, consecteturean euismod bibendum laoree adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sitsodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu'
      },
      donateTitle:{
        type:String,
        default:'公益钱包'
      },
      donateDescr:{
        type:String,
        default:'公益钱包是公益人士的公益账户，您可以在“我的”-“公益钱包”中激活钱包，现在激活额外赠送300积分。'
      }
    },
    data () {
      return {
        //弹窗关闭状态
        closeX:false,
        actX: this.isActivate,
        subscibeX:this.isSubscibe,
        frostX:this.isFrost,
        phonePopX:this.isPhonePop,
        /*donateX:false,*/
      }
    },
    watch: {
      isActivate(val){//监听外部props属性isActivate变更并同步到组件内data actX中
        this.actX = val;
      },
      actX(val){//组件内对actX变更后向外部发送事件通知
        this.$emit('act-pop-up',val)
      },
      isPhonePop(val){
        this.phonePopX = val
      },
      phonePopX(val){
        this.$emit('phone-pop-up',val)
      },
      isSubscibe(val){
        this.subscibeX = val;
      },
      subscibeX(val){
        this.$emit('subscibe-pop-up',val)
      },
      isFrost(val){
        this.frostX = val;
      },
      frostX(val){//冻结
        this.$emit('frost-pop-up',val)
      },

    },
    components: {

    },
    created () {

    },
    mounted () {

    },
    methods: {
      closePopUp(closeX){
//        console.log('closePopUp() 执行')
        this.closeX == false ? this.closeX=true : this.closeX=false
      },
      actPopUp(){//激活弹窗关闭
//        console.log('actPopUp 执行')
        this.actX = ! this.actX
      },
      phonePopUp(){
//        console.log(' phonePopUp() 执行')
        this.phonePopX = !this.phonePopX
      },
      subscibeChangePop(){
//        console.log('changePop 执行')
        this.subscibeX = !this.subscibeX
      },
      frostPopUp(){
//        console.log('frostPopUp 执行')
        this.frostX = !this.frostX
      },
    }
  }
</script>

<style lang="scss" scoped>
  .pop-container{
    position:relative;
    width:7.5rem;
  }
  .popup-bj{
    position: fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index:999;
    background: rgba(58,58,58,0.80);
  }
  .popup-con{
    position:fixed;
    z-index:1000;
    left:50%;
    top:50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    width:6.5rem;
  }
  .popup-close{
    position:relative;
    width:100%;
    height:0.9rem;
  }
  .popup-close img{
    position:absolute;
    top:0;
    right:0;
    width:0.6rem;
    hegiht:0.6rem;
  }
  .text-alignL{
    text-align:left;
  }
  .margin-t27{
    margin-top:0.27rem;
  }
  .margin-t32{
     margin-top:0.32rem;
   }
  .margin-t34{
    margin-top:0.34rem;
  }
  .margin-t35{
    margin-top:0.35rem;
  }
  .con{
    width:100%;
    padding-bottom:0.8rem;
    min-height:5.76rem;
    height: auto!important;
    height:5.76rem;
    background:#fff;
    -webkit-border-radius:0.16rem;
    -moz-border-radius: 0.16rem;
    border-radius: 0.16rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .c-title{
      height:0.89rem;
      padding:0 0.3rem;
      line-height:0.89rem;
      font-size: 0.34rem;
      color: #4B4F63;
      border-bottom: 1px solid rgba(218,222,228,0.60);
      overflow:hidden;
    }
    .c-descr{
      margin-top:0.43rem;
      margin-bottom:0.22rem;
      padding:0 0.3rem;
      line-height: 0.4rem;
      text-align:left;
      font-size: 0.28rem;
      color: #4B4F63;
    }
    .c-rules{
      margin:0 0.3rem;
      padding:0 0.35rem;
      background: #F6FAFF;
      border: 1px dotted #C8DDF5;
      border-radius: 0.08rem;
      .rules-title{
        margin:0.24rem 0 0.45rem 0;
        line-height:0.42rem;
        font-size: 0.3rem;
        color: #4A90E2;
      }
      /*激活钱包*/
      .rules-con{
        min-height:1rem;
        height:auto !important;
        height:1rem;
        display:flex;
        flex-flow:column nowrap;
        justify-content:space-between;

        background:url(/bocm/platformjs/static/image/sywall/flow_act_two2x.png) no-repeat;
        background-size:0.32rem 1.36rem;
        div{
          padding-left:0.45rem;
          text-align:left;
          font-size:0.24rem;
          line-height:0.4rem;
          color: #4B4F63;
        }
       /* .con-l{width:1.2rem;text-align:left;}
        .con-c{flex:1;}
        .con-r{width:1.2rem;text-align:right;}*/
        .col-b{margin-top:0.69rem;margin-bottom:0.21rem;}


      }
      /*手机号弹窗*/
      .phone-con{
        padding-bottom:0.27rem;
        background:url(/bocm/platformjs/static/image/sywall/flow_col.png) no-repeat;
        background-size:0.3rem 2.56rem;
        p{
          padding-left:0.45rem;
          text-align:left;
          font-size:0.24rem;
          line-height:0.4rem;
          color: #4B4F63;
        }
      }
      /*订阅公益项目*/
      .subscibe-con{
        padding-bottom:0.21rem;
        background:url(/bocm/platformjs/static/image/sywall/flow_act_two2x.png) no-repeat;
        background-size:0.32rem 1.4rem;
        p{
          padding-left:0.45rem;
          text-align:left;
          font-size:0.24rem;
          line-height:0.4rem;
          color: #4B4F63;
        }
      }
      /*参加捐赠*/
      .donate-list{
        text-align:left;
        li{
          font-size:0.24rem;
          line-height:0.4rem;
          color: #4B4F63;
        }
        li:last-of-type{
          padding-bottom:0.21rem;
        }
      }
    }
  }
  /*冻结钱包*/
  .frost-con-all{
    position:relative;
    width:100%;
    height:6.34rem;
    background:#fff;
    -webkit-border-radius:0.16rem;
    -moz-border-radius: 0.16rem;
    border-radius: 0.16rem;
    /*-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;*/
    .f-shade{
      position:absolute;
      z-index:2;
      left:0;
      bottom:0;
      width:98%;
      height:0.8rem;
      background-image: linear-gradient(0deg, #FFFFFF 40%, rgba(255,255,255,0.73) 79%, rgba(255,255,255,0.00) 100%);
      -webkit-border-radius:0 0 0.16rem 0.16rem;
      -moz-border-radius:0 0 0.16rem 0.16rem;
      border-radius:0 0 0.16rem 0.16rem;
    }
    .f-title{
      height:0.89rem;
      padding:0 0.3rem;
      line-height:0.89rem;
      font-size: 0.34rem;
      color: #4B4F63;
      border-bottom: 1px solid rgba(218,222,228,0.60);
    }
    .frost-con{
      height:5.43rem;
      padding:0 0.3rem;
      text-align:left;
      overflow-x:hidden;
      overflow-y:auto;
      .f-descr{
        margin-top:0.43rem;
        margin-bottom:0.22rem;
        line-height: 0.4rem;
        text-align:left;
        font-size: 0.28rem;
        color: #4B4F63;
      }
      .frost-con-txt{
        padding-bottom:0.8rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
        color: #4B4F63;
      }
    }

  }
  //隐藏
  .d-hide{
    display:none;
  }
  .d-show{
    display:block;
  }
</style>
