<template>
    <div id="mine_medal_wall">
      <div v-title="'勋章墙'"></div>
      <!--顶部勋章背景-->
      <div class="top_bg_medal">
        <div class="mine_medal">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/medal/mine_medal_img2.png'" alt="" class="mine_bg_img fr">
          <div class="mine_left_text colorf text-left"> 我的勋章 </div>
          <div class="mine_left_bottom_text">
            <div class="mine_star text-left">
              <div class="mine_star_con font28">
                <span class="mine_star_text">已获得{{achieved_items.length}}/{{achieved_items.length + un_achieved_items.length}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--已获勋章-->
      <div v-if="achieved_items.length">
        <div class="medal_bg_interval text-left">已获勋章</div>
        <div class="had_medal">
          <ul class="clearfix">
            <li v-for="item in achieved_items">
              <img v-lazy="item.glory_show_img_hilighted" alt="" @click="_appjs.syJsbLaunchWebview(item.detial_url)">
            </li>
          </ul>
        </div>
      </div>

      <!--待获勋章-->
      <div style="padding-bottom:.5rem;" v-if="un_achieved_items.length">
        <div class="medal_bg_interval text-left">待获勋章</div>
        <div class="had_medal">
          <ul class="clearfix">
            <li v-for="item in un_achieved_items" class="relative" @click="_appjs.syJsbLaunchWebview(item.detial_url)" style="padding:.3rem 0;">
              <img :src="item.glory_show_img_gary" alt="">
              <div class="get_medal_progress absolute">
                <div style="width:100%;height:100%;">
                  <div class="child_progress" :style="{width:(item.progress_step * 100)/item.total_progress_step + '%'}"></div>
                  <div class="absolute progress_text">{{item.progress_step}}/{{item.total_progress_step}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--勋章弹窗-->
      <div class="mask medal_mask" v-if="has_new_medal">
      <!--<div class="mask medal_mask" v-if="true">-->
      <!--<div class="mask medal_mask">-->
        <div class="mask_box cen">
          <div class="medal_box_title text-right">
            <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/medal/close_medal2.png'" alt="" class="close_medal_box" @click="has_new_medal = false">
          </div>
          <div class="medal_box_con">
            <div class="pop_title">恭喜您获得新勋章</div>
            <div class="new_medal_img_box">
              <img :src="splash_items[0]['glory_show_img_hilighted']" alt="" class="new_medal_img">
              <div class="relative" style="height:1rem">
                <div class="absolute shadow_medal grey_shadow_medal"></div>
              </div>
            </div>
            <div class="new_medal_ranking">您是第{{splash_items[0].achieve_count_index}}位获得该勋章的人</div>
            <div class="operate_medal clearfix">
              <div class="oprate_left_btn fl" @click="_appjs.syJsbLaunchWebview(splash_items[0].detial_url)">了解详情</div>
              <div class="oprate_left_btn fr" @click="shareFn">去炫耀</div>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="mask medal_mask" v-if="true">
        &lt;!&ndash;<div class="mask medal_mask" v-if="true">&ndash;&gt;
        &lt;!&ndash;<div class="mask medal_mask">&ndash;&gt;
        <div class="mask_box cen">
          <div class="medal_box_title text-right">
            <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/medal/close_medal2.png'" alt="" class="close_medal_box" @click="has_new_medal = false">
          </div>
          <div class="medal_box_con">
            <div class="pop_title">恭喜您获得新勋章</div>
            <div class="new_medal_img_box">
              <img src="/bocm/platformjs/static/image/medal/order10_2.png" alt="" class="new_medal_img">
              <div class="relative" style="height:1rem">
                <div class="absolute shadow_medal grey_shadow_medal"></div>
              </div>
            </div>
            <div class="new_medal_ranking">您是第位获得该勋章的人</div>
            <div class="operate_medal clearfix">
              <div class="oprate_left_btn fl" @click="_appjs.syJsbLaunchWebview()">了解详情</div>
              <div class="oprate_left_btn fr" @click="shareFn">去炫耀</div>
            </div>
          </div>
        </div>
      </div>-->



      <!--<embed src="http://player.youku.com/player.php/sid/XOTUwMjE0NDMy/v.swf" quality="high" width="675" height="425" align="middle" allowscriptaccess="always" allowfullscreen="true" mode="transparent" type="application/x-shockwave-flash">-->

      <!--<video id="my_video_1" class="video-js vjs-default-skin" controls preload="auto" width="100%" height="auto" poster="video-js/my_video_poster.png"    data-setup="{}">-->
        <!--<source src="/bocm/platformjs/static/aaa.mp4" type='video/mp4'>-->
      <!--</video>-->

    </div>
</template>

<script>

//  import appTitleBg from '@/components/common/title_bg.vue'

  export default {
    data(){
        return {
          has_new_medal:false,
          mamberid:'117',
          achieved_items:[],  //已获勋章
          un_achieved_items:[], // 未获勋章
          splash_items:[] ,   // 刚刚获得勋章
          res:{
          }
        }
    },
    created(){
      this.mamberid = this.$route.query.mamberid ? this.$route.query.mamberid : '0'
      this.getData();
    },
    methods:{
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=glory&op=getPersonalGlory&member_id=' + this.mamberid).then(res => {

//          console.log(res)
          if(res.data.code == 400){this._appjs.syJsbAlert('暂无数据'); return}
          this.has_new_medal = res.data.content.splash_items.length > 0 ;
          this.achieved_items = res.data.content.achieved_items;
          this.un_achieved_items = res.data.content.un_achieved_items;
          this.splash_items = res.data.content.splash_items;
        })

//        this.achieved_items = this.res.content.achieved_items;
//        this.un_achieved_items = this.res.content.un_achieved_items;
//        this.splash_items = this.res.content.splash_items;
//        this.has_new_medal = this.splash_items.length > 0 ;
//        this.has_new_medal = true ;
      },
      shareFn(){
        let shareUrl = this.splash_items[0]['share_url'];
//        let shareText = '我在公益中国获得一枚【'+this.splash_items[0].glory_name+'】勋章！邀你一起照亮公益之路'
        let shareText = '我在公益中国点亮一枚【'+this.splash_items[0].glory_name+'】勋章，邀你一起点亮更多爱心勋章，照亮公益前行路。'
        let shareTitle = '公益勋章'
        let shareLogo = this.splash_items[0]['glory_show_img_share'];
//        let shareLogo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/medal/share_img_d3.jpg';
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
      },

    },
    components:{
//      'app-title':appTitleBg,
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../static/css/common.css";
  .colorf{
    color:#fff;
  }
  #mine_medal_wall{
    font-weight: 500;
    background: #fff;
    min-height:100%;
  }
  .weight{
    font-weight: 700;
  }
  .font-normal{
    font-weight: 500;
  }
  .top_bg_medal{
    height:3.16rem;
    background: linear-gradient(120deg,#4A90E2,#24B5E8);
  }
  .mine_bg_img{
    margin-right:.5rem;
    width:auto;
    height:2.95rem;
    max-height:3.16rem;

  }
  .mine_left_text{
    padding-top:.8rem;
    font-size: .6rem;
    font-weight:600;
    padding-left:.86rem;
  }
  .mine_left_bottom_text{
    padding-top:.3rem;
    padding-left:.86rem;
    color:#74BFFF;
  }
  .mine_star{

  }
  .medal_box_title{
    height:.6rem;
    padding-bottom:.3rem;
    padding-right:.2rem;
  }
  .medal_box_con{
    width:6.5rem;
    height:8.8rem;
    border-radius: .16rem;
    background: linear-gradient(to bottom,#24B5E8,#4A90E2);
  }
  .mine_star_con{
    display: inline-block;
    /*height: .46rem;*/
    border-radius: .23rem;
    /*line-height: .46rem;*/
    padding: .1rem .23rem;
    background: #2A6EBD;
    letter-spacing:1px;
    box-sizing: border-box;
  }
  .mine_star_text{
    padding-left:.3rem;
    background: url("/bocm/platformjs/static/image/medal/star11.png") left center no-repeat;
    background-size: .24rem auto;
  }
  .medal_bg_interval{
    height:.58rem;
    line-height: .58rem;
    background: #F7F9FA;
    padding-left:.3rem;
    font-size: .24rem;
    color:#B7C8D3
  }
  .had_medal{
    padding:.2rem .3rem ;
  }
  .had_medal li{
    float: left;
    width:33.333333%;
    /*padding-bottom:.1rem;*/
    padding:.2rem 0;
  }
  .had_medal img{
    width:74%;
    height:auto;
  }
  .get_medal_progress{
    left:10%;
    bottom:0;
    width:80%;
    height:.3rem;
    line-height: .3rem;
    border-radius: .15rem;
    overflow: hidden;
    background: linear-gradient(to right,#EEEEEE,#D8D8D8);
  }
  .child_progress{
    height:.3rem;
    line-height: .3rem;
    /*width:1rem;*/
    border-radius: .15rem;
    background: linear-gradient(to right,#4A90E2,#24B5E8);
  }
  .progress_text{
    left:0;
    top: 0;
    width:100%;
    height:100%;
    color:#fff;
    font-weight: 500;
  }
  .close_medal_box{
    width:.6rem;
    height:auto;
  }
  .medal_mask{
    background: rgba(58,58,58,0.80);;
  }
  .pop_title{
    padding-top:.75rem;
    font-size: .5rem;
    color:#fff;
    font-weight:500;
  }
  .new_medal_img_box{
    padding:.5rem 0 .3rem;
  }
  .new_medal_img{
    width:3.2rem;
    /*height:4.6rem;*/
    height:auto;
  }

  .new_medal_ranking{
    font-size: .34rem;
    color:#fff;
    font-weight: 300;
  }

  .oprate_left_btn{
    width:2rem;
    height:.8rem;
    line-height: .8rem;
    background: #FF9947;
    border-radius: .4rem;
    color:#fff;
    font-size: .34rem;
  }

  .operate_medal{
    padding:.7rem .9rem;
  }
  .mask_box{
    margin-top:-.6rem;
  }
  .shadow_medal{
    bottom:.38rem;
    left:50%;
    height:.4rem;
    /*background: #006590;*/
    width:3rem;
    margin-left:-1.5rem;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(0, 101, 144,.6) 0%, rgba(22, 131, 182,.3) 80%);
    box-shadow: 0 0 5px 5px rgba(22, 131, 182,.3);
  }
  .grey_shadow_medal{
    /*top: 4rem;*/
    bottom:.3rem;
    height:.3rem;
    width:2.4rem;
    margin-left:-1.2rem;
  }
</style>
