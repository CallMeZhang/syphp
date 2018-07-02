<template>
    <div id="member_list">
        <div v-title="isAdmin?'志愿者管理':'志愿组织成员'"></div>

      <transition name="fade">
        <loading v-show="isLoading"></loading>
      </transition>

      <transition name="fade">
        <div class="member_list">
          <div class="bg_interval"></div>
          <div class="member_top relative" >
            <div class="activity_name font34 text-normal">
              {{ v_name }}
            </div>
            <div class="msg11 font28">
              <span>已录用：{{member_joined}} 人</span>
              <span class="msg_span2" v-if="isAdmin">待审核：{{ member_applied?member_applied:'0' }} 人</span>
            </div>
            <div class="quit absolute" v-if="!isAdmin" @click.stop="quit">
              退出
            </div>
          </div>
          <div class="bg_interval"></div>
          <!--管理员信息-->
          <div class="member_com member_admin text-left">
            <div class="clearfix" @click="isAdmin && _appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=member_detail&member_id='+adminMsg.member_id)">
              <div class="fl avatar">
                <img :src="adminMsg.member_avatar" alt="">
              </div>
              <div class="member_msg2 fl">
                <div class="msg_top2">
                  <span class="font30">{{ isAdmin?adminMsg.auth_name:adminMsg.member_truename }}</span>
                  <span class="admin_txt">管理员</span>
                  <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/volunteer/star.png'" alt="" v-for="k in parseInt((adminMsg.star||0)-0) ">
                  <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/volunteer/half_star.png'" alt="" v-if="!isInteger((adminMsg.star||0)-0)">

                </div>
                <div class="msg_bot2">
                  <span>服务时长：{{ adminMsg.service_time }}</span>
                  <span class="serve_time">服务次数：{{ adminMsg.service_number }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg_interval"></div>


          <div class="list_content " :style="{'-webkit-overflow-scrolling': scrollMode}" >
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="false" :auto-fill="false" ref="loadmore" :bottomPullText="'上拉加载更多'" >
              <div v-if="!isAdmin">
                <div class="member_com member_pub text-left" v-for="(item,index) in volunteer" v-if="volunteer.length">
                  <div class="clearfix">
                    <div class="fl avatar">
                      <img :src="item.member_avatar" alt="">
                    </div>
                    <div class="member_msg2 fl">
                      <div class="msg_top2">
                        <span class="font30">{{ item.member_truename }}</span>
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/star.png'" alt="" v-for="k in parseInt(item.star-0)">
                        <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/volunteer/half_star.png'" alt="" v-if="!isInteger(item.star-0)">

                      </div>
                      <div class="msg_bot2 colorb1">
                        <span>服务时长：{{ item.service_time }}</span>
                        <span class="serve_time">服务次数：{{ item.service_number }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="isAdmin ">
                <div class="member_com member_pub text-left" v-for="(item,index) in volunteer" v-if="volunteer.length" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=member_detail&member_id='+item.member_id)">
                  <div class="clearfix">
                    <div class="fl avatar">
                      <img :src="item.member_avatar" alt="">
                    </div>
                    <div class="member_msg2 fl">
                      <div class="msg_top2">
                        <span class="font30">{{ item.auth_name }}</span>
                        <!--<img src="/bocm/platformjs/static/image/volunteer/star.png" alt="" v-for="item in 3">-->
                      </div>
                      <div class="msg_bot2 colorb1">
                        <span class="time_bg">{{ item.applytime }}</span>
                        <!--<span class="serve_time">服务次数：62次</span>-->
                      </div>

                    </div>
                    <div class="fr right_btn4" v-if="item.auditing_result == 0">
                      <div @click.stop="auditing(item,2,index)">拒绝</div>
                      <div style="color:#fff;background: #4A90E2;" @click.stop="auditing(item,1,index)">同意</div>
                    </div>
                    <div class="fr right_btn4" v-if="item.auditing_result == 1">
                      <div style="color:#F25B4B;border:1px solid #F25B4B" @click.stop="remove(item,index)">移除</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="no_content text-center" v-if="!volunteer.length">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/zhaomu.png'" alt="" style="margin-top:2rem;width:3rem;">
                <div class="font32 color81" style="padding-top:.8rem;">暂无成员信息</div>
              </div>
            </mt-loadmore>
          </div>

          <!---->


        </div>
      </transition>

    </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  import {Toast} from 'mint-ui'
//  import {} from '@/requests/index'
//  import pop from '../components/common/popup.vue'

//  import Swiper from '../../../static/js/swiper-3.4.2.min'
  export default {
    data(){
        return {
          isLoading:false,
          isAdmin:false,
          scrollMode:'auto',
          basic:{},
          volunteer_org_id:'',
          member_joined:'',
          member_applied:'',
          role:'2',    // 用户身份 //0其他, 1游客, 2成员, 3管理员
          volunteer_id:'',
          is_manger:'',
          number:'',
          volunteer:[],
          curpage:1,
          adminMsg:{},
          v_name:'',
          allCommentLoad:false,

        }
    },
    created(){
      this.volunteer_org_id = this.$route.query.volunteer_org_id || 23;
//      this.volunteer_id = this.$route.query.volunteer_id || 18;
      this.getData()
    },
    mounted(){

    },
    methods:{
      getData(){

        // 获取志愿组织成员列表页的成员列表（队员，管理员两种情况）
        this.$http.get(this.query('volunteer_org_member_list',{volunteer_id:this.volunteer_org_id,curpage:this.curpage})).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.curpage ++;
            let data = res.data.content;
            this.member_joined = data.number.join;
            this.member_applied = data.number.auditing;
            this.is_manger = data.is_manger;
            this.isAdmin = data.is_manger == 1;
//            this.isAdmin = true;
            if(this.isAdmin){
              this._appjs.syJsbSetTitleText('志愿者管理');
            }else{
              this._appjs.syJsbSetTitleText('志愿组织成员');
            }
            this.adminMsg = data.manger;
            this.volunteer = data.volunteer;
            this.v_name = data.volunteer_org.volunteer_org_name
          }
          this.$nextTick( () => {
            this.scrollMode = "touch";
          });
        })
      },
      loadBottom(){
        if(this.allCommentLoad) {
          setTimeout(()=>{
            this.$refs.loadmore.onBottomLoaded();
            Toast({
              message:'暂无更多数据',
              duration:1000,
            });
          },300);
          return;
        }
        this.getList()
      },

      getList(){
        this.$http.get(this.query('volunteer_org_member_list',{volunteer_id:this.volunteer_org_id,curpage:this.curpage})).then(res=>{
          if(res && res.data && res.data.code == 200){
            this.curpage ++;
            if(res.data.content.volunteer.length === 0){
              this.allCommentLoad = true;
              this.$refs.loadmore.onBottomLoaded();
              return;
            }
            this.volunteer = this.volunteer.concat(res.data.content.volunteer);
          }else{
            this.allCommentLoad = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        });
      },
      // 同意/拒绝加入申请的接口
      auditing(item,pass,index){
        let str = pass == 1?'您确认同意'+item.auth_name+'的申请吗':'您确认拒绝'+item.auth_name+'的申请吗'
        this._appjs.syJsbConfirm(str,'确认','取消',(data) => {if(data){
          var qs = require('querystring');
          let data = qs.stringify({
            volunteer_org_id:this.volunteer_org_id,
            member_id:item.member_id,
            pass:pass,
          })
          this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=auditing_volunteer_org_member',data).then(res=>{


            if(res && res.data && res.data.code == 200){
              item.auditing_result = 1 - item.auditing_result;
              if(pass==1){
                this.member_joined ++;
                this.member_applied --;
              }else{
                this.volunteer.splice(index,1);
                this.member_applied --;
              }
              Toast({
                message:pass == 1?'已通过':'已拒绝',
                duration:1000,
                className:'toast'
              })

            }
          })
        }})


      },
      // 志愿组织成员列表页的移除成员的接口 remove_volunteer_org_member
      remove(item,index){
        this._appjs.syJsbConfirm('移除后不可恢复，确认移除吗？','继续','算了吧',(data) => {
          if(data){
            var qs = require('querystring');
            let data = qs.stringify({
              volunteer_org_id:this.volunteer_org_id,
              member_id:item.member_id,
            });
            this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=remove_volunteer_org_member',data).then(res=>{


              if(res && res.data && res.data.code == 200){
                this.volunteer.splice(index,1)
                this.member_joined --;
                Toast({
                  message:'移除成功',
                  duration:1000,
                  className:'toast'
                })

              }else if(res && res.data && res.data.code){
                Toast({
                  message:res.data.content.message,
                  duration:1000,
                  className:'toast'
                })
              }else{
                Toast({
                  message:'网络不给力',
                  duration:1000,
                  className:'toast'
                })
              }
            })
          }
        })

      },

      // 退出志愿队
      quit(){
        this._appjs.syJsbConfirm('确认退出吗？','继续','算了吧',(data) => {if(data){
          var qs = require('querystring');
          let data = qs.stringify({volunteer_org_id:this.volunteer_org_id})
          this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=quit_volunteer_org',data).then(res=>{


            if(res && res.data && res.data.code == 200){
              Toast({
                message:'退出成功',
                duration:1000,
                className:'toast'
              })
              setTimeout(()=>{
                this._appjs.syJsbCloseAppPage()
              },1000)
            }
          })
        }})


      },
      isInteger(obj) {
        return obj%1 === 0
      },
      query(api,obj){
        let str = '';
        if(obj){
          for(var k in obj){
            str += '&'+ k + '=' + obj[k]
          }
        }
        return this.siteInfo.host+'/api/index.php?act=volunteer&op='+api+str
      }



    },
    components:{loading}

  }
</script>

<style lang="scss" scoped>
@import "/bocm/platformjs/static/css/common.css";
#member_list{
  width:100%;
  min-height:100%;
  font-weight: 300;
  background: #fff;
  color:#4B4F63;
}
.member_list{
  .member_top{
    text-align: left;
    padding:.36rem .3rem;

    .msg11{
      padding-top:.2rem;
      .msg_span2{
        margin-left:1.6rem;
      }
    }

    .quit{
      right:.3rem;
      top:50%;
      height:.6rem;
      line-height:.64rem;
      text-align: center;
      width:1rem;
      margin-top:-.3rem;
      border:1px solid #4A90E2;
      color:#4A90E2;
      border-radius: .08rem;
    }
  }

  .member_com{
    padding:.22rem .3rem;

    .avatar{
      height:.76rem;
      width:.76rem;
      border-radius: 50%;
      overflow: hidden;
      img{
        width:100%;
        height:100%;
        border-radius: 50%;
      }
    }
    .member_msg2{
      margin-left:.22rem;
      .msg_top2{
        padding-top:.1rem;
        .admin_txt{
          font-size: .22rem;
          padding:.04rem .1rem;
          border-radius: 2px;
          background: #99C6FC;
        }
        img{
          width:.18rem;
          vertical-align: middle;
          margin-top:-.1rem;
        }
      }
      .msg_bot2{
        padding-top:.1rem;
        .serve_time{
          margin-left:.5rem;
        }
      }
    }

    .right_btn4{
      padding-top:.08rem;
      div{
        display: inline-block;
        /*width:1rem;*/
        padding:0 .24rem;
        height:.6rem;
        line-height: .62rem;
        text-align: center;
        border-radius: .08rem;
        border:1px solid #4A90E2;
        color:#4A90E2;
        margin-left:.2rem;
      }
    }
  }
  .member_pub{
    border-bottom:1px solid #DADEE4;
  }
}

.text-normal{
  font-weight: normal;
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
.address_bg{
  background: url('/bocm/platformjs/static/image/volunteer/address.png') no-repeat left top;
  padding-left:.24rem;
  background-size:auto .22rem;
}
.time_bg{
  background: url('/bocm/platformjs/static/image/volunteer/time2.png') no-repeat left 45%;
  padding-left:.24rem;
  background-size:.2rem auto;
}
</style>
