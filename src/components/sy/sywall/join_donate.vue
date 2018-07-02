<template>
  <div class="container">
    <div class="donate-con">
      <p class="donate-tip">捐赠金额</p>
      <div class="donate-items">
        <span class="d-item">5 元</span>
        <span class="d-item">10 元</span>
        <span class="d-item">20 元</span>
        <span class="d-item">50 元</span>
        <span class="d-item">100 元</span>
        <span class="d-item">200 元</span>
        <div class="input-con">
          <input class="d-input" type="text" placeholder="请输入金额"/>
          <span>元</span>
        </div>
      </div>

      <p class="donate-tip">选择支付方式</p>
      <form action="" method="">
        <ul class="pay-con">
          <li class="pay-list">
            <div class="pay-icon"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/boc_pay_sy.png'" alt="gypay"></div>
            <div class="pay-txt-con">
              <h3 class="pay-title">中益钱包</h3>
              <p class="pay-descr">仅支持中国银行的银行卡</p>
            </div>
            <div class="pay-choose"><input name="pay" type="radio"><img class="choose-img" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/correct_mark3x.png'" alt="choose.png"></div>
          </li>
          <li class="pay-list">
            <div class="pay-icon"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/wx_pay.png'" alt="wxpay"></div>
            <div class="pay-txt-con">
              <h3 class="pay-title">微信支付</h3>
              <p class="pay-descr">推荐已安装微信客户端的用户使用</p>
            </div>
            <div class="pay-choose"><input name="pay" type="radio"><img class="choose-img" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/correct_mark3x.png'" alt="choose.png"></div>
          </li>
          <li class="pay-list">
            <div class="pay-icon"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/zfb_pay.png'" alt="zfbpay"></div>
            <div class="pay-txt-con">
              <h3 class="pay-title">支付宝支付</h3>
              <p class="pay-descr">推荐支付宝用户使用</p>
            </div>
            <div class="pay-choose"><input name="pay" type="radio"><img class="choose-img" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/correct_mark3x.png'" alt="choose.png"></div>
          </li>
          <li class="pay-list">
            <div class="pay-icon"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/gy_pay2x.png'" alt="zfbpay"></div>
            <div class="pay-txt-con">
              <h3 class="pay-title">公益钱包 (可用金额 <span>¥9,999,999.00</span>)</h3>
              <p class="pay-descr">享受1.2倍公益积分</p>
            </div>
            <div class="pay-choose"><input name="pay" type="radio"><img class="choose-img" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/correct_mark3x.png'" alt="choose.png"></div>
          </li>
        </ul>
        <button class="pay-sure">确认支付</button>
      </form>
    </div>
  </div>
</template>
<script>
  import app from '../../../modules/_appJs/index.js'
  import popUp from './common/popups.vue'
  export default {
    data () {
      return {

      }
    },
    components:{
      'pop-up': popUp
    },
    created () {

    },
    mounted () {

    },
    methods:{

    }
  }
</script>
<style lang="scss" scoped>
  button{margin:0;padding:0;border:none;background:none;}
   .donate-con{
     width:100%;
     height:100%;
     text-align:left;
     background: #F7F9FA;
     -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
     box-sizing: border-box;
     .donate-tip{
       padding:0 0.3rem;
       height:0.7rem;
       line-height:0.7rem;
       font-size:0.26rem;
       color: #666A7F;
     }
     .donate-items{
       padding:0.3rem;
       background:#fff;
       display:flex;
       flex-flow:row wrap;
       justify-content: space-between;
       .d-item{
         display:inline-block;
         margin-bottom:0.3rem;
         width:2rem;
         height:0.7rem;
         line-height:0.7rem;
         text-align:center;
         border:1px solid #B1B8C4;
         -webkit-border-radius:0.08rem;
         -moz-border-radius:0.08rem;
         border-radius:0.08rem;
       }
       .input-con{
         width:6.9rem;
         height:0.7rem;
         margin-bottom:0.3rem;
         border: 1px solid #B1B8C4;
         -webkit-border-radius:0.08rem;
         -moz-border-radius:0.08rem;
         border-radius:0.08rem;
       }
       .d-input{
         border:none;
         background:none;
         padding-left:0.3rem;
         width:6.02rem;
         height:0.7rem;
         line-height:0.7rem;
       }
     }
     .pay-con{
       background:#fff;
     }
     .pay-list{
       display:flex;
       padding:0 0.3rem;
       height:1.2rem;
       border-bottom:1px solid rgba(218,222,228,0.60);;
        .pay-icon{
          width:0.5rem;
          height:0.5rem;
          padding-top:0.3rem;
          img{
            width:100%;
            height:100%;
          }
        }
       .pay-txt-con{
         flex:1;
         padding-top:0.3rem;
         margin-left:0.22rem;
         .pay-title{
           font-size:0.3rem;
           line-height:0.42rem;
           color: #4B4F63;
         }
         .pay-descr{
           font-size:0.24rem;
           line-height:0.33rem;
           color: #B1B8C4;
         }
       }
       .pay-choose{
         position:relative;
         display:flex;
         flex-flow:row nowrap;
         justify-content: center;
         align-items: center;
         width:0.42rem;
         .choose-img{
           position:absolute;
           left:0;
           top:0;
           width:0.42rem;
           height:0.37rem;
         }
         /*input[type=radio] {
           visibility: hidden;
         }*/
       }
     }
     .pay-sure{
       display:inline-block;
       position:fixed;
       left:0;
       bottom:0;
       width:7.5rem;
       height:1rem;
       text-align:center;
       line-height:1rem;
       background: #4A90E2;
       font-size:0.32rem;
       color: #FFFFFF;
     }

   }
</style>
