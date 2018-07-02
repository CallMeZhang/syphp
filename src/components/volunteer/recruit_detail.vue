<template>
    <div id="recruit_detail">
      <div v-title="'招募详情'"></div>

      <transition name="fade">
        <loading v-show="isLoading"></loading>
      </transition>

      <transition name="fade">
        <div class="recruit text-left iphonex-padding-bottom">
          <div class="bg_interval"></div>
          <div class="top43 pl3">
            <div class="title32 font34 font-normal" style="color:#4B4F63">
              {{content.recruit_name}}
            </div>
            <div class="detail font28" style="color:#666A7F">{{content.summary}}</div>
          </div>
          <div class="bg_interval"></div>
          <div class="con43">

            <div class="item1 font28 clearfix first_item1">
              <div class="fl">招募人数</div>
              <div class="fr color81">{{content.recruit_number}}/{{content.max_number}}</div>
            </div>
            <div class="item1 font28 clearfix" @click="isTimeShow = !isTimeShow">
              <div class="fl">报名起止</div>
              <div class="fr item_right32 color81"><span>{{content.recruit_begintime}} ~ {{content.recruit_endtime}}</span> <span class="right_gt" :class="{down:!isTimeShow}"></span></div>
            </div>
            <div class="time_msg color81 text-center" :class="{time_show:isTimeShow}">


              <div>
                <div>招募开始时间</div>
                <div>{{content.recruit_begintime}}</div>
              </div>
              <div class="dashed_line"></div>
              <div>
                <div>招募结束时间</div>
                <div>{{content.recruit_endtime}}</div>
              </div>
              <div class="dashed_line"></div>
              <div>
                <div>执行时间</div>
                <div>{{content.activity_begintime}}</div>
              </div>

            </div>

            <!--活动地点-->
            <div class="item1 font28 clearfix" @click="isAddressShow = !isAddressShow">
              <div class="fl">活动地点</div>
              <div class="fr item_right32 color81"><span v-if="content.offline_flag != '1'">{{ content.city }},{{ content.area }}</span><span v-if="content.offline_flag == '1'">线上</span> <span class="right_gt" :class="{down:!isAddressShow}"></span></div>
            </div>
            <div class="time_msg color81 text-left" :class="{time_show:isAddressShow}">
              <p style="padding: 0 .3rem;" class="no-enter"><span v-if="content.offline_flag != '1'">{{ content.full_address }}</span><span v-if="content.offline_flag == '1'">线上</span></p>
            </div>

            <div class="item1 font28 clearfix" @click="isDurShow = !isDurShow">
              <div class="fl">奖励</div>
              <div class="fr item_right32 color81"><span>服务时长</span> <span class="right_gt" :class="{down:!isDurShow}"></span></div>
            </div>
            <div class="time_msg color81 text-left" :class="{time_show:isDurShow}">
              <p style="padding: 0 .3rem;">{{content.service_time}}</p>
            </div>

            <div class="item1 font28 clearfix" @click="isPhoneShow = !isPhoneShow" style="">
              <div class="fl">咨询人</div>
              <div class="fr item_right32 color81"><span>{{content.contact_name}}</span> <span class="right_gt" :class="{down:!isPhoneShow}"></span></div>
            </div>
            <div class="time_msg color81 text-left" :class="{time_show:isPhoneShow}"  style="border-top:none">
              <p class="phone">
                <!--<a :href="'tel:'+content.contact_tel" @click="getAsk($event)" ref="call">-->
                  <!--<span>{{content.contact_tel}}</span>-->
                <!--</a>-->
                <a @click="getAsk($event)">{{content.contact_tel}}</a>
              </p>
            </div>
          </div>

          <!---->
          <div class="bg_interval" v-show="isPhoneShow"></div>
          <div class="vol pl3">

            <div @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+content.volunteer_org_id+'&is_share='+is_share)">
              <div class="clearfix ">
                <div class="avatar fl">
                  <img :src="content.avatar" alt="">
                </div>
                <div class="vol_msg fl">
                  <div class="no-enter font28 line-h42">{{content.volunteer_org_name}}</div>
                  <div class="no-enter font26 line-h32">{{content.volunteer_org_summary}}</div>
                </div>
                <!--<div class="gt43 absolute "><span class="right_gt"></span></div>-->
              </div>
            </div>
          </div>

          <!---->
          <div class="re_detail">
            <div class="tit font26 color66">招募详情</div>
            <div class="cont font26 color66">
              <div v-html="content.introduction">asdfasdf</div>

            </div>
          </div>
        </div>




      </transition>
      <!--<div class=" text-center" style="padding:1rem;font-size: .36rem;">
            <div style="display: inline-block;padding:.2rem .3rem; background: rgba(1,1,1,.7);color:#fff;border-radius: .1rem;font-weight: 500;">文字大小</div>
          </div>
          <div class="font32 text-center" style="padding:1rem;">
            <div style="display: inline-block;padding:.2rem .3rem; background: rgba(1,1,1,.7);color:#fff;border-radius: .1rem;font-weight: 500;">文字大小</div>
          </div>-->
      <!-- 分享和举报-->
      <!--投诉-->
      <pop @close="popComplaint = false" v-show="popComplaint">
        <div class="reply_box" :style="(isA&&p)?address:''">
          <div class="title4">投诉</div>
          <div class="check_box">
            <ul>
              <li v-for="item in complaintList" @click="complaint(item)">
                <div class="clearfix">
                  <div class="check_img fl" :style="{borderColor:item.checked?'#fff':''}">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/checked3.png'" alt="" v-show="item.checked">
                  </div>
                  <div class="check_text fl">
                    {{item.text}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="content4">
            <textarea name="" id="" cols="30" rows="10" placeholder="请填写举报内容，不少于10个汉字。" autofocus v-model="inform_content" @focus="p=true" @blur="onBlur" :disabled="other?false:'disabled'"></textarea>
          </div>
          <div class="button4">
            <div class="btn" @click.stop="inform">提交</div>
          </div>
        </div>
      </pop>
      <div v-if="!preview">
        <a class="vol_share_img1 recruit-share-btn1" @click="shareFn()" ref="call">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/sywelfare/icon-share.png'" alt="">
        </a>
        <a class="vol_accuse_img1 recruit-share-btn2  " @click="goInform">
          <img src="/bocm/platformjs/static/image/volunteer/tip_offs.png" alt="">
        </a>
        <!--分享-->
        <share-img v-if="showShareImg" @click.native= "showShareImg = false"></share-img>
        <div class="btn_bot2 iphonex-bottom-div" :class="{btn_disabled:btnDisabled}" @click="goto">
          {{btnText}}
        </div>

      </div>

    </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
//  import {} from '@/requests/index'
  import pop from '@/components/common/popups.vue'
  import shareImg from '@/components/common/shared_img.vue'
  import {Toast} from 'mint-ui'
  import vue_share from '@/assets/js/share'

//  import Swiper from '../../../static/js/swiper-3.4.2.min'
  export default {
    data(){
        return {
          p:false,
          isA:false,
          address:{
            transform:'translateY(-2.4rem)',
            transition:'all .2s'
          },
          isLoading:true,
          isLogin:false,
          isLoginReturn:false,
          isTimeShow:true,
          isDurShow:true,
          isAddressShow:true,
          is_share:false,
          preview:false,
          isPhoneShow:true,
          btnDisabled:false,
          btnText:'报 名',
          recruit_id:'',
          content:'',
          is_auditing:'',
          other:false,
          showShareImg:false,  //分享
          popComplaint:false, // 举报
          inform_content:'', // 举报内容
          complaintList:[ // 1广告、欺诈内容, 2包含色情、淫秽或暴力内容, 3虚假的志愿招募信息, 4发布反动言论, 5其他原因
            {
              checked:false,
              text:'广告、欺诈内容',
              id:'1'
            },
            {
              checked:false,
              text:'包含色情、淫秽或暴力内容',
              id:'2'
            },
            {
              checked:false,
              text:'虚假的志愿招募信息',
              id:'3'
            },
            {
              checked:false,
              text:'发布反动言论',
              id:'4'
            },
            {
              checked:false,
              text:'其他原因',
              id:'5'
            },
          ],
          appinfo:false
        }
    },
    created(){
      this.recruit_id = this.$route.query.recruit_id || 13;
      this.is_share = this.$route.query.is_share || '';
      this.is_auditing = this.$route.query.is_auditing || '';
      this.preview = this.$route.query.is_auditing === 'yes';
      this.getUp()
    },
    mounted(){
      this.$nextTick(()=>{
        let info = this._appjs.syJsbGetAppVersion()
        if (info['platform'] === 'ios' || info['platform'] === 'android') {
          this._appjs.syJsbSetGoBackUrl("goBackOfDetail()");
        }
      })
    },
    methods:{
      getUp(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_volunteer_updating').then(res=>{
          if(res.data.code == 701){
            window.location.href= this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=is_updating'
          }else{
            this.getData()
            this.isA = this._appjs.isAndroid()
            setTimeout(()=>{
              this.isLoading = false;
            },2000)
            this.getInfo()
          }
        })
      },
      getInfo(){
        var _this = this
        this._appjs.syJsbGetAppInfo(function (appInfo) {
          if (!appInfo) {
            _this.is_share = 'yes'
            console.log('wai')
          } else {
            _this.is_share = ''
            console.log('nei')
          }
        })
      },
      onBlur(){
        setTimeout(()=>{this.p=false},100)
      },
      getData(){
        this.$http.get(this.query('is_login')).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.isLogin = true;
          }
          this.isLoginReturn = true;
          this.isLogin = true;

        })
        this.$http.get(this.query('recruit_auditing_detail',{recruit_id:this.recruit_id,state:this.preview?'1':'2'})).then(res=>{

          if(res && res.data && res.data.code == 200){

            this.content = res.data.content;
//            this.role = 3
//            this.content.recruit_state = 2

            if(this.content.recruit_state == 0){
              this.btnDisabled = true;
              this.btnText = '未开始';
            }else if(this.content.recruit_state == 2){
              this.btnDisabled = true;
              this.btnText = '招募结束';
            }else if(this.content.recruit_state == 3){
              this.btnDisabled = true;
              this.btnText = '已取消';
            }else if(this.content.recruit_state == 4){
              this.btnDisabled = true;
              this.btnText = '活动结束';
            }else{
              if(this.content.recruit_member_auditing_result == 1){
                this.btnDisabled = true;
                this.btnText = '已报名';
              }else if(this.content.recruit_member_auditing_result == 0){
                this.btnDisabled = true;
                this.btnText = '待审核';
              }
            }
//            this.content.contact_tel = '18233081866'
            // 微信二次分享

            setTimeout(() => {
              let shareUrl = this.siteInfo.host_share + '/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+this.recruit_id + '&is_share=yes' + '&is_auditing=' + this.is_auditing;
              let shareText = this.content['summary'];
              let shareTitle = this.content['recruit_name'];
              let shareLogo = this.content['avatar'];
              let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo}
              vue_share(params)

            },10)

          }
          this.isLoading = false;
        })
      },
      goto(){

        if(this.btnDisabled) {return}
        var qs = require('querystring');
        this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_realname_auth').then(res=>{
          if(res && res.data && res.data.code == 200){
            if(!res.data.content.is_realname_auth){
              // 需要实名认证
              //@click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id)"
              this._appjs.syJsbLaunchWebview(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=authentication&recruit_id='+this.recruit_id+'&is_share='+(this.is_share?'yes':''))
            }else{

              let data = qs.stringify({
                recruit_id:this.recruit_id,
              })
              this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=apply_recruit',data).then(res=>{

                if(res && res.data && res.data.code == 200){
                  // "apply_result": 1 //"0报名失败, 1报名已申请待审核, 2报名成功已录用"
                  if(res.data.content.apply_result == 0){
                    if(res.data.content.message){
                      Toast({
                        message: res.data.content.message,
                        duration: 1000
                      });
                    }
                  }else if(res.data.content.apply_result == 1){
                    this.btnText = '待审核';
                    this.btnDisabled = true;
                    Toast({
                      message: '报名申请已提交',
                      duration: 1000
                    });
                  }else{
                    this.btnText = '已报名';
                    this.btnDisabled = true;
                    Toast({
                      message: '已报名',
                      duration: 1000
                    });
                  }

                }else if(res && res.data && res.data.code == 501){
                    this._appjs.syJsbAlert('招募人数已满')
                }else{
                  this._appjs.syJsbAlert('操作失败')
                }
              })

            }
          }else if(res && res.data && res.data.code == 403){
            if(!this.is_share){
              location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+(encodeURIComponent('volunteer/recruit_detail?recruit_id='+this.recruit_id+'&is_auditing='+this.is_auditing+'&is_share='))
//              this._appjs.syJsbLaunchWebview(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login')
            }else{
              location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+(encodeURIComponent('volunteer/recruit_detail?recruit_id='+this.recruit_id+'&is_auditing='+this.is_auditing+'&is_share=yes'))
//              location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login'
            }
          }else{
              this._appjs.syJsbAlert(res.data.message)
          }
        })

      },

      getAsk(e){

//        this.is_share = true
//        if(this.is_share){
//          this.$refs.call.href='tel:'+ this.content.contact_tel
//        }else{
//          e.preventDefault();
//          this._appjs.syJsbCallPhone(this.content.contact_tel);
//        }
        if (this.$route.query.is_share == "yes") {
          e.target.href = "tel:" + this.content.contact_tel;
        } else {
          this._appjs.syJsbCallPhone(this.content.contact_tel);
        }
      },
      complaint(item){
        item.checked = !item.checked
      },
      shareFn(){
//        this.is_share = true
        if(this.is_share){
          this.showShareImg = true;
        }else{
          let shareUrl = this.siteInfo.host_share + '/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+this.recruit_id + '&is_share=yes' + '&is_auditing=' + this.is_auditing;
          let shareText = this.content['summary'];
          let shareTitle = this.content['recruit_name'];
          let shareLogo = this.content['avatar'];
          let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
          let jsonParam = JSON.stringify(params);
          this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
        }

      },
      goInform(){
        this.goLogin(()=>{
          this.popComplaint = true
        })


      },
      // 举报
      inform(){
        var qs = require('querystring');
        let arr = this.complaintList.filter( k => k.checked === true )
        if(!arr.length){
          Toast({
            message:'请至少选择一项投诉原因',
            duration:1000,
            className:'toast'
          });
          return
        }
//        this.other = this.complaintList[this.complaintList.length - 1]['checked']
        if(this.other && this.inform_content.trim().length < 10){
          Toast({
            message:'举报原因不少于10个字',
            duration:1000,
            className:'toast'
          });
          return
        }
        this.popComplaint = false
        let sendData = qs.stringify({
          recruit_id:this.recruit_id,
          inform_subject_ids:arr.map( k => k.id).join(','),  // 举报原因
          inform_content:this.inform_content
        })

        this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=recruit_inform_submit',sendData).then(res=>{
          if(res && res.data && res.data.code == 200){
            Toast({
              message:'举报成功',
              duration:1000,
              className:'toast'
            });
          }else if(res && res.data && res.data.code == 403){
            if(!this.is_share){
              this._appjs.syJsbLaunchWebview(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+encodeURIComponent('volunteer/recruit_detail?recruit_id='+this.recruit_id+'&is_auditing='+this.is_auditing+'&is_share='))
            }else{
              location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+encodeURIComponent('volunteer/recruit_detail?recruit_id='+this.recruit_id+'&is_auditing='+this.is_auditing+'&is_share=yes')
            }
          }else{
            Toast({
              message:'举报失败',
              duration:1000,
              className:'toast'
            });
          }
        })
      },
      query(api,obj){
        let str = '';
        if(obj){
          for(var k in obj){
            str += '&'+ k + '=' + obj[k]
          }
        }
        return this.siteInfo.host+'/api/index.php?act=volunteer&op='+api+str
      },
      goLogin(fn){
        if(this.isLogin && this.isLoginReturn){
          fn()
        }else{
          if(!this.is_share){
            location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+(encodeURIComponent('volunteer/recruit_detail?recruit_id='+this.recruit_id+'&is_auditing='+this.is_auditing+'&is_share='))
          }else{
            location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+(encodeURIComponent('volunteer/recruit_detail?recruit_id='+this.recruit_id+'&is_auditing='+this.is_auditing+'&is_share=yes'))
          }
        }
      },


    },
    watch:{
      complaintList:{
        handler:function(val,old) {
          this.other = val[val.length - 1]['checked']
        },
        deep: true

      }
    },
    components:{loading,pop,shareImg}

  }
</script>

<style lang=scss>
  #recruit_detail .re_detail img{
    max-width:100% !important;
  }
  #recruit_detail .re_detail b,#recruit_detail .re_detail strong{
    font-weight:bold !important;
  }
  #recruit_detail .re_detail{
    font-size: .26rem !important;
    color:#818C9E !important;
  }
</style>

<style lang="scss" scoped>
@import "/bocm/platformjs/static/css/common.css";
$text: #4B4F63;
$middle:#666A7F;
$min:#818C9E;
$bule3:#4A90E2;
$border:#E9EBEF;
#recruit_detail{
  width:100%;
  min-height:100%;
  font-weight: 300;
  background: #fff;
  position: relative;
  /*vertical-align: bottom;*/
  .btn_bot2{
    position: fixed;
    left:0;
    bottom:0;
    height:1rem;
    width:100%;
    line-height: 1.02rem;
    overflow: hidden;
    background: #4A90E2;
    color:#fff;
    font-size: .32rem;
  }
  .btn_disabled{
    /*color:#fff;*/
    background:$border;
  }
}
  .recruit{
    .top43{
      padding:.22rem .3rem;
      .detail{
        padding-top:.12rem;
        line-height: .42rem;
      }
    }
    .item1{
      height:.88rem;
      line-height: .9rem;
      overflow: hidden;
      padding: 0 .3rem;
      box-sizing: border-box;

      .item_right32{
        span{
          display: inline-block;
          margin-left:.2rem;
        }
        .right_gt{
          width:.15rem;
          height:.26rem;
          background: url("/bocm/platformjs/static/image/volunteer/arrow43.png") no-repeat center center;
          background-size: cover;
          transition: all .3s;
          /*transform: rotate(90deg);*/
        }
        .down{
          transform: rotate(90deg)
        }
      }



    }
    .con43{
      .first_item1{
        border-bottom:1px solid $border;
      }
      .time_msg{
        box-sizing: border-box;
        transition:all .3s;
        background: #F7F9FA;
        padding:.25rem 0;
        line-height: .38rem;
        > div {
          display: inline-block;

        }

        .dashed_line{
          width:.8rem;
          height:.2rem;
          margin: 0 .1rem;
          /*background: red;*/
          color:#818C9E;
          border-top:1px dashed $border;
        }


      }
      .time_show{
        height:0;
        border-top:1px solid $border;
        overflow: hidden;
        padding:0;
      }
      .phone{
        padding-left:.3rem;
        a{
          color:#4A90E2;
          padding:.04rem 0 .04rem .5rem;
          background: url("/bocm/platformjs/static/image/volunteer/phone341.png") no-repeat left center;
          background-size: .3rem auto;
        }
      }
    }

    .vol{
      padding: .3rem;
      > div{
        background: url("/bocm/platformjs/static/image/volunteer/arrow43.png") no-repeat right center;
        background-size: .15rem auto;
      }
      .avatar{
        width:.9rem;
        height:.9rem;
        border-radius: 50%;
        overflow: hidden;
        img{
          width:.9rem;
          height:.9rem;
          border-radius: 50%;
        }
      }
      .vol_msg{
        margin-left:.2rem;
        width:5.2rem;
        >div{
          padding-top:.04rem;
        }
      }
      .gt43{
        width:.2rem;
        height:.3rem;
        right:0.3rem;
        top:50%;
      }
    }

    .re_detail{
      padding-bottom:.12rem;
      .tit{
        padding:0 0.3rem;
        height:.7rem;
        line-height: .72rem;
        background: #F7F9FA;
        overflow: hidden;
      }
      .cont{
        padding:.24rem 0.3rem 1.2rem;
        line-height: .34rem;
      }

    }
  }

  .reply_box{
    width:6.5rem;
    background: #fff;
    border-radius: .16rem;
    color:#4B4F63;
    padding-bottom:.4rem;

    .title4{
      font-size: .34rem;
      line-height: .9rem;
      height:.9rem;
      border-bottom: 1px solid #DADEE4;
    }

    .check_box{
      padding:.4rem .3rem 0;

      li{
        margin-bottom:.2rem;
      }
      li:last-child{
        margin-bottom:0.1rem;
      }
      .check_img{
        height:.5rem;
        width:.5rem;
        border-radius: 50%;
        border:1px solid #DADEE4;
        box-sizing: border-box;
        overflow: hidden;

        img{
          position: relative;
          /*<!--margin-left:-1px;-->*/
          /*<!--margin-top:-1px;-->*/
          /*height:.5rem;*/
          /*width:.5rem;*/
          width:100%;
          height:100%;
          box-sizing: border-box;
        }
      }

      .check_text{
        margin-left:.3rem;
        font-size: .3rem;
        line-height: .5rem;
        height:.5rem;
      }
    }
    .content4{
      padding-top:.43rem;
      textarea{
        border:1px solid #B1B8C4;
        height:1.6rem;
        width:5.7rem;
        padding:.2rem;
        border-radius: .08rem;
        resize: none;
      }
    }

    .button4{
      padding:.5rem;
      .btn{
        font-size: .32rem;
        width:3.5rem;
        height:.88rem;
        line-height: .9rem;
        margin:0 auto;
        background: #4A90E2;
        color:#fff;
        border-radius: .08rem;
      }
    }
  }
  .vol_share_img1,.vol_accuse_img1{
    position: fixed;
    right:.3rem;
    width:.9rem;
    height:.9rem;
    img{
      width:.9rem;
      height:.9rem;
    }
  }
  .vol_share_img1{
    bottom:2.4rem;
  }
  .vol_accuse_img1{
    bottom:1.3rem;
  }




.border_item{
  border:1px solid $border;
}
.color4b{
  color:#4B4F63;
}
.color81{
  color:#818C9E;
}
.color66{
  color:#666A7F;
}
.colorb1{
  color:#B1B8C4;
}
.bg_interval{
  background: #F7F9FA;
  height:.2rem;
}
.font-normal{
  font-weight: 500;
}
  .pl3{
    padding-left:.3rem;
    padding-right:.3rem;
  }

  .line-h42{
    line-height: .42rem;
  }
  .line-h32{
    line-height: .32rem;
  }
</style>
