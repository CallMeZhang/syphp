<template>
  <div class="test-pop" v-show="isPopUp">
    <!--弹窗测试-->
    <div class="bg-mask"></div>
    <div class="popup-con">
      <div class="con-top" @click.stop="shut"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/close_x2.png'" alt="X"></div>
      <div class="con-descr">
        <h2 class="popup-t">{{popupTitle}}</h2>
        <h3 class="popup-d">{{subTitleOne}}</h3>
        <ul class="popup-d-con">
          <li class="li1" v-html="subDescrOne"></li>
        </ul>
        <h3 class="popup-d">{{subTitleTwo}}</h3>
        <ul class="popup-d-con">
          <li v-html="subDescrTwo"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'popup',
    props:{
      isPopUp:{//弹窗
        type:Boolean,
        default:false
      },
      popupTitle:{
        type:String,
        default:'积分小贴士'
      },
      subTitleOne:{
        type:String,
        default:'个人如何获得公益积分？'
      },
      subDescrOne:{
        type:String,
        default:'1.在大爱超市进行爱心购买：您每支付1元钱，就可以获得10积分，运费也算哦~'
      },
      subTitleTwo:{
        type:String,
        default:'公益积分如何使用？'
      },
      subDescrTwo:{
        type:String,
        default:'1.目前在“善源商场”板块，可以使用积分抵扣指定的金额，享受双重优惠。'
      }
    },
    data () {
      return {
        closeX:this.isPopUp,
      }
    },
    watch :{
      isPopUp (val){
        this.closeX = val;
      },
      closeX(val){
        this.$emit('pop-up',val)
      },
    },
    methods: {
      shut(){
        this.closeX  = !this.closeX
      }
    }
  }
</script>
<style lang="scss" scoped>
  .test-pop{
    position:relative;
    width:7.5rem;
    height:100%;
  }
  .bg-mask{
    position:fixed;
    left:0;
    top:0;
    z-index:999;
    background: rgba(58,58,58,0.80);
    width:100%;
    height:100%;
  }
  .popup-con{
    position:fixed;
    left:50%;
    top:50%;
    z-index:1000;
    transform: translate(-50%,-50%);
    width:6.5rem;
    text-align:left;
    .con-top{text-align:right;}
    .con-top img{
      width:0.6rem;
      height:0.6rem;
      margin-bottom:0.3rem;
    }
    .con-descr{
      background:#fff;
      border-radius:0.16rem;
      padding-bottom:0.33rem;
      .popup-t{
        height:0.89rem;
        line-height:0.89rem;
        text-align:center;
        font-size:0.34rem;
        font-weight:300;
        color: #4B4F63;
        border-bottom: 1px solid rgba(218,222,228,0.60);
        padding:0 0.3rem;
      }
      .popup-d{
        line-height:0.42rem;
        font-size:0.3rem;
        color: #4A90E2;
        margin:0.33rem 0;
        padding:0 0.3rem;
      }
      .popup-d-con{
       li{
         font-weight:300;
         font-size:0.24rem;
         color: #4B4F63;
         padding:0 0.3rem;
         line-height:0.4rem;
       }
      }
    }
  }
</style>
