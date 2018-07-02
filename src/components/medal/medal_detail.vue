<template>
  <div id="medal_detail">
    <div v-title="'公益勋章'"></div>
    <div class="loading_bg" v-show="isLoading">
      <loading ></loading>
    </div>
    <template v-show="!isLoading">
      <template v-if="!isShared">
        <template v-if="had_medal">
          <div class="colorf">
            <div class="had_medal_img relative">
              <img :src="glory_show_img_hilighted" alt="">
              <!--<img src="/bocm/platformjs/static/image/medal/had_top55.png" alt="">-->
              <div class="absolute shadow_medal"></div>
            </div>
            <div class="had_medal_number font28">第{{achieve_count_index}}位获取勋章的人</div>
            <div class="had_medal_name">{{glory_name}}</div>
            <div class="had_medal_condition font30">
              <!--<p>{{glory_description}}</p>-->
              <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/medal/left_bracket1.png'" alt="" style="width:.1rem;height:auto;vertical-align: bottom">
              <!--<p>这是问题这是问题</p>-->
              <p style="color:#93E0FF">{{glory_description}}</p>
              <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/medal/right_bracket1.png'" alt="" style="width:.1rem;height:auto;vertical-align: bottom">
            </div>
            <div class="share_medal">
              <a class="share_medal_btn" @click="shareFn">晒勋章</a>
            </div>
          </div>
        </template>
        <template v-else>
        <!--<template >-->
          <div class="colorf">
            <div class="medal_image relative">
              <img :src="glory_show_img_gary" alt="">
              <!--<img src="/bocm/platformjs/static/image/medal/had_top55.png" alt="">-->
              <div class="relative" style="height:1.2rem">
                <div class="absolute shadow_medal"></div>
              </div>
              <div class="medal_progress relative">
                <div style="height:100%;width:100%;">
                  <div class="medal_child_progress font28" :style="{width:(progress_step * 100) / total_progress_step + '%'}"></div>
                  <div class="absolute font28 progress_step3">{{progress_step}}/{{total_progress_step}}</div>
                </div>
              </div>
              <div class="county font32 text-center">
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/medal/left_bracket2.png'" alt="" style="width:.1rem;height:auto;vertical-align: bottom;padding-bottom:0">
                <p class="inline-block">{{glory_description}}</p>
                <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/medal/right_bracket2.png'" alt="" style="width:.1rem;height:auto;vertical-align: bottom;padding-bottom:0">
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-if="isShared">
        <div id="medal_index">
          <download :bgColor="bgColor"></download>

          <div class="colorf">
            <!--勋章人物信息-->
            <div class="person_msg">
              <img :src="member_avatar" alt="">
              <div class="person_name font30">{{member_name}}</div>
              <div class="medal_num font24">第{{achieve_count_index}}位获得该勋章的人</div>
            </div>
            <div class="medal_img">
              <div class="medal_img2 relative">
                <img :src="glory_show_img_hilighted" alt="">
                <!--<img src="/bocm/platformjs/static/image/medal/had_top55.png" alt="">-->
                <div class="relative" style="height:.8rem">
                  <div class="absolute shadow_medal grey_shadow_medal"></div>
                </div>
              </div>
              <div class="medal_name">{{glory_name}}</div>
              <div class="medal_date">{{achieve_time_formatted}}</div>
              <div class="medal_score">{{glory_description}}</div>
            </div>
          </div>
          <div class="bottom_bar_share"></div>
        </div>
      </template>
    </template>

  </div>
</template>

<script>
  import download from '../common/download_app.vue'
  import loading from '../loading/loading.vue'
  import shared from './medal_index.vue'
  import vue_share from '@/assets/js/share'

  export default {
    data(){
      return {
        bgColor:'#4A90E2',
        progress:'50%',
        county:'旬邑县',
        completed_num:'10',
        isLoading:true,
        had_medal:true,
        isShared:false,
        detialid:'',
        member_avatar:'',
        member_name:'',
        glory_name:'',
        glory_show_img_hilighted:'',
        glory_show_img_gary:'',
        glory_description:'',
        achieve_state:'',
        total_progress_step:'',
        progress_step:'',
        achieve_count_index:'',
        achieve_time:'',
        achieve_time_formatted:'',
        share_url:'',
        glory_show_img_share:''
      }
    },
    computed:{

    },
    created(){
//        setTimeout(()=>{this.isLoading = false},1000)
//      this.isShare = this.getQueryString('op') == 'glory_detial_share'
      this.isShared = this.$route.query.type == 'share'
//      this.isShared = true
      this.detialid = this.$route.query.detialid ? this.$route.query.detialid : '117'
      this.getData();
    },
    methods:{
      getData(){
          let tmp = {"code":200,"message":"success","content":{"member_avatar":"https:\/\/cdnres.17shanyuan.com\/data\/upload\/syrs\/avatar\/05543931658734558.jpeg","member_name":"\u738b\u91d1\u661f","glory_name":"\u70ed\u5fc3\u53c2\u4e0e","glory_show_img_hilighted":"https:\/\/www.17shanyuan.com\/bocm\/platformjs\/static\/image\/medal\/order1.png","glory_show_img_gary":"https:\/\/www.17shanyuan.com\/bocm\/platformjs\/static\/image\/medal\/order1G.png","glory_description":"\u5927\u7231\u8d85\u5e02\u6216\u96c6\u91c7\u67091\u6b21\u5e2e\u6276\u884c\u4e3a","achieve_state":"1","total_progress_step":"1","progress_step":"1","achieve_count_index":"162","achieve_time":"1505322789","glory_detial_id":"1303","achieve_time_formatted":"2017.09.14","detial_url":"https:\/\/www.17shanyuan.com\/bocm\/index.php?act=glory&op=glory_detial&detial_id=1303","share_url":"https:\/\/share1.17shanyuan.com\/bocm\/index.php?act=glory&op=glory_detial_share&detial_id=1303"}};


          this.$http.get(this.siteInfo.host + '/api/index.php?act=glory&op=getGloryDetial&glory_detial_id=' + this.detialid).then(res=>{
            this.isLoading = false
            this.had_medal = res.data.content.total_progress_step === res.data.content.progress_step
            for(let k in res.data.content){
              this[k] = res.data.content[k]
            }
          }).then(()=>{
            setTimeout(() => {
              let shareUrl = this.share_url;
              let shareText = '我在一起善源平台点亮一枚【'+this.glory_name+'】勋章，邀你一起点亮更多爱心勋章，照亮公益前行路。';
              let shareTitle = '公益勋章';
              let shareLogo = this.glory_show_img_share;
              let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
              vue_share(params)
            },10)
          })
        this.isLoading = false
      },
      shareFn(){
        let shareUrl = this.share_url;
//        let shareText = '我在一起善源平台获得一枚【'+this.glory_name+'】勋章！邀你一起照亮公益之路';
        let shareText = '我在一起善源平台点亮一枚【'+this.glory_name+'】勋章，邀你一起点亮更多爱心勋章，照亮公益前行路。';
        let shareTitle = '公益勋章';
        let shareLogo = this.glory_show_img_share;
//        let shareLogo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/medal/share_img_d3.jpg';
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
      },
      getQueryString(name){
        //查询url参数
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let $hash = window.location.hash;
        let r = $hash.substr($hash.indexOf('?') + 1).match(reg);
        if (r != null)return unescape(r[2]);
        return '';
      }
    },
    components:{download,loading,shared}
  }
</script>

<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";

  $blue:#4A90E2;

  #medal_detail{
    min-height: 100%;
    background: linear-gradient(to bottom,#4A90E2,#24B5E8);
    font-weight: 300;
  }

  .colorf{
    color:#fff;
  }
  .medal_image{
    padding-top:1.26rem;

  }
  .medal_image img{
    width:4.46rem;
    height:auto;
    /*padding-bottom:.9rem;*/
  }
  .person_msg img{
    height:.95rem;
    width:.95rem;
    border-radius: 50%;
  }
  .medal_progress{
    width:66%;
    height:.38rem;
    line-height: .38rem;
    margin:0 auto;
    border-radius: .19rem;
    overflow: hidden;
    background: linear-gradient(to right, #F2F2F2, #E1E1E1);
    /*background: linear-gradient(to right, #F2F2F2, red);*/
  }
  .medal_child_progress{
    height:100%;
    border-radius: .19rem;
    background: linear-gradient(to right, #FF7D34, #FFDD00);
  }
  .county{
    padding-top:.7rem;
  }
  .had_medal_number{

  }
  .had_medal_name{
    font-size: .78rem;
    padding:.3rem 0;
    font-weight: 500;
  }

  .had_medal_condition{
    text-align: center;
  }
  .had_medal_condition p{
    display: inline-block;
  }
  .share_medal{
    padding-top:1.1rem;
  }
  .share_medal_btn{
    display: inline-block;
    height:.94rem;
    width:3.38rem;
    border-radius: .47rem;
    background: #FF9947;
    line-height: .94rem;
    font-size: .46rem;
    color:#fff;
  }
  .loading_bg{
    position: fixed;
    width:100%;
    height:100%;
    background: #fff;
  }
  $blue:#4A90E2;

  #medal_index{
    min-height: 100%;
    font-weight: 300;
    padding-bottom:1.6rem;
  }

  .colorf{
    color:#fff;
  }
  .person_msg{
    padding-top:.54rem;
  }
  .person_msg img{
    height:.95rem;
    width:.95rem;
    border-radius: 50%;
  }
  .person_name{
    padding:.2rem 0 .1rem;
  }
  .medal_num{

  }
  .medal_img{
    padding-top:.2rem;
  }
  .medal_img2{
    padding-top:.2rem;
    /*height:4rem;*/
    width:5rem;
    margin:auto;
    overflow: hidden;
    box-sizing: border-box;
  }
  .medal_img img{
    width:3.78rem;
    height:auto;
  }
  .medal_name{
    font-size: .68rem;
    /*padding-top:.3rem;*/
  }
  .medal_date{
    font-size: .32rem;
    padding-top:.2rem;
  }
  .medal_score{
    font-size: .34rem;
    padding: .2rem;
  }
  .bottom_bar_share{
    position: fixed;
    left:0;
    bottom:0;
    width:100%;
    height:1.6rem;
    background: url("/bocm/platformjs/static/image/medal/Group2.png") center center no-repeat;
    background-size: 2.6rem auto;
    background-color:rgba(0,0,0,0.35);
  }
  .progress_step3{
    width:100%;
    height:100%;
    text-align: center;
    left:0;
    top:0;
  }
  .had_medal_img{
    padding:1rem;
  }
  .had_medal_img img{
    width:4.46rem;
    height:auto;
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
    bottom:.2rem;
    height:.3rem;
    width:2.4rem;
    margin-left:-1.2rem;
  }
</style>
