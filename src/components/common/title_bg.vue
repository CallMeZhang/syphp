<template>
  <div id="global_title">
    <div class="index_top border-box" :style=[topStyle] style="background: transparent">
      <div class="index_top_title">
        <div class="index_top_left fl" @click="goBack">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/default/go_back2.png'" alt="">
          <!--<img src="/bocm/platformjs/static/image/default/go_back2.png" alt="">-->
        </div>
        <div class="index_top_cen fl font36 text-center color4 font-normal">{{title}}</div>
        <div class="index_top_right fr" v-if="showMenu">
          <div class="index_menu" @click="_appjs.syJsbShowMoreMenu()">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'global_title',
    props:{
      title:{
        type: String,
        default: '首页'
      },
      showMenu:{
        type:Boolean,
        default:true,
      },
      backImg:{
        type: String,
        default: '首页'
      }
    },
    data(){
      return {
        bgHeight:'',
        topStyle:'',
        backColor:{
          background:this.bgColor
        }
      }
    },
    created(){
      this._appjs.syJsbShowTitleBar('false')
      if(this._appjs.isAndroid()){
        this.bgHeight = '1rem';
        this.topStyle = {
          height:'1rem',
          paddingTop:'.1rem'
        }
      }else{
        this.bgHeight = '1.28rem';
        this.topStyle = {
          height:'1.28rem',
          paddingTop:'.48rem'
        }
      }
    },
    methods:{
      goBack(){
        this._appjs.syJsbCloseAppPage()
      }
    },
    mounted(){
      this._appjs.syJsbShowTitleBar('false')
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/common.css";
  .index_top{
    position: fixed;
    width:100%;
    top:0;
    left:0;
    height:1.28rem;
    padding-top:.48rem;
    /*border-bottom:1px solid #eee;*/
    background: #fff;
    z-index: 100000;
    /*box-shadow: 0 1px 4px rgba(200,200,200,.1);*/
  }
  .border-box{
    box-sizing: border-box;
  }
  .font-normal{
    font-weight: 500;
  }
  .index_top_title{
    height:.8rem;
    line-height: .8rem;
    padding: 0 .3rem 0 .2rem;
    box-sizing: border-box;
    /*border-bottom: 1px solid #ccc;*/
  }
  .index_top_title > div {
    height:100%;
  }
  .index_top_left{
    width:8%;
  }
  .index_top_left img{
    width:.2rem;
    height:auto;
    vertical-align: middle;
  }
  .index_top_cen{
    width:84%;
  }
  .index_top_right{
    width:8%
  }
  .index_menu{
    width:.6rem;
    text-align: center;
  }
  .index_menu > div{
    display: inline-block;
    width:.1rem;
    height:.1rem;
    border-radius: .05rem;
    background: #818C9E;
  }
  .font36{
    font-size: .36rem;
  }
</style>
