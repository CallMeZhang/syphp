<template>
  <div id="member_list">
    <div v-title="'我招募的志愿者'"></div>

    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name="fade">
      <div class="member_list">
        <div class="bg_interval"></div>
        <div class="member_top relative">
          <div class="activity_name font34 text-normal">
            {{recruit_name}}
          </div>
          <div class="msg11 font28">
            <span>已录用：{{joined_count}} 人</span>
            <span class="msg_span2">待审核：{{applied_count}} 人</span>
          </div>
        </div>
        <div class="bg_interval"></div>

        <div class="list_content " :style="{'-webkit-overflow-scrolling': scrollMode}">
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="false" :auto-fill="false" ref="loadmore" :bottomPullText="'上拉加载更多'" >

            <div>
              <div class="member_com member_pub text-left" v-for="(item,index) in memberList" v-if="memberList.length">
                <div class="clearfix" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=member_detail&member_id='+item.member_id)">
                  <div class="fl avatar">
                    <img :src="item.member_avatar" alt="">
                  </div>
                  <template v-if="status == 2">
                  <!--<template v-if="true">-->
                    <div class="member_msg2 fl" v-if="item.service_time > 0">
                    <!--<div class="member_msg2 fl" v-if="false">-->
                      <div class="msg_top2">
                        <span class="font30">{{item.truename}}</span>
                      </div>
                      <div class="msg_bot2 colorb1">
                        <span class="serve_time">服务时长：{{item.service_time_str}}</span>
                      </div>
                    </div>
                    <!--<div class="member_msg2 fl" v-else>-->
                    <div class="member_msg2 fl" v-if="!item.service_time">
                    <!--<div class="member_msg2 fl" v-if="true">-->
                      <div style="height:.76rem;line-height: .76rem;">
                        <span class="font30">{{item.truename}}</span>
                      </div>

                    </div>
                  </template>
                  <template v-if="status != 2">
                    <div class="member_msg2 fl">
                      <div class="msg_top2">
                        <span class="font30">{{item.truename}}</span>
                      </div>
                      <div class="msg_bot2 colorb1">
                        <span class="serve_time" v-if="item.service_time > 0">服务时长：{{item.service_time_str}}</span>
                        <span class="time_bg" v-else>{{item.add_time_str}}</span>
                      </div>
                    </div>
                  </template>
                  <div class="fr right_btn4" v-if="item.auditing_result == '0'">
                  <!--<div class="fr right_btn4" v-if="true">-->
                    <div @click.stop="auditing(item,2,index)">拒绝</div>
                    <div @click.stop="auditing(item,1,index)" style="color:#fff;background: #4A90E2;">同意</div>
                  </div>
                  <div class="fr right_btn4" v-else-if="item.service_time > 0 && item.admin_comment_id > 0">
                    <div style="color:#4B4F63;border:1px solid #B1B8C4" @click.stop="goto(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_appraise_info&recruit_id='+recruit_id+'&member_id='+item.member_id+'&gyfrom=member')">查看评价</div>
                  </div>
                  <div class="fr right_btn4" v-else-if="item.service_time > 0 && item.admin_comment_id == 0">
                    <div @click.stop="goto(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=act_evaluate&recruit_id='+recruit_id+'&to_id='+item.member_id+'&gycallback='+loc)">评价</div>
                  </div>
                  <div class="fr right_btn4" v-else-if="item.auditing_result == '1' ">
                    <div style="color:#F25B4B;border:1px solid #F25B4B" @click.stop="remove(item)">移除</div>
                  </div>


                </div>
              </div>
              <div class="no_content text-center" v-if="!memberList.length">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/zhaomu.png'" alt="" style="margin-top:2rem;width:3rem;">
                <div class="font32 color81" style="padding-top:.8rem;">暂无招募志愿者信息</div>
              </div>
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
        isLoading:true,
        scrollMode:'auto',
        volunteer_org_id:'',
        joined_count:'',
        isAdmin:'',
        applied_count:'',
        recruit_name:'',
        role:'2',    // 用户身份 //0其他, 1游客, 2成员, 3管理员
        volunteer_id:'',
        is_manger:'',
        number:'',
        memberList:[],
        curpage:1,
        adminMsg:{},
        recruit_id:'',
        status:'',
        loc:encodeURIComponent(location.href)
      }
    },
    created(){

      this.recruit_id = this.$route.query.recruit_id || 11;
//      this.volunteer_id = this.$route.query.volunteer_id || 18;
      this.getData()
      this.get_list()
    },
    mounted(){

    },
    methods:{
      getData(){
        // 获取招募状态的接口（活动结束的招募，在成员列表里要显示服务时长，评价和查看评价等）
        this.$http.get(this.query('recruit_status',{recruit_id:this.recruit_id})).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.status = res.data.content
          }
        })
        // 获取招募管理组织成员列表页的统计信息（管理员）
        this.$http.get(this.query('recruit_member_statistics',{recruit_id:this.recruit_id})).then(res=>{
//          var res = {}
//          res.data = {
//            "code": 200,
//            "message": "success",
//            "content": {
//              "joined_count": "1",
//              "applied_count": "1",
//              "recruit_name": "测试招募成员列表（不需要审核）"
//            }
//          }

          if(res && res.data && res.data.code == 200){
            let data = res.data.content;
            this.joined_count = data.joined_count;
            this.applied_count = data.applied_count;
            this.recruit_name = data.recruit_name;
          }
          this.isLoading = false;
        })
      },
      get_list(){
        this.$http.get(this.query('recruit_member_list',{recruit_id:this.recruit_id,curpage:this.curpage})).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.curpage ++;
            if(res.data.content.length === 0){
              this.allCommentLoad = true;
              this.$refs.loadmore.onBottomLoaded();
              return;
            }
            this.memberList = this.memberList.concat(res.data.content);


          }else{
            this.allCommentLoad = true;
          }
          this.$refs.loadmore.onBottomLoaded();
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
        this.get_list();
      },
      // 同意/拒绝加入申请的接口
      auditing(item,pass,index){
        let str = pass == 1?'您确认同意录用'+item.truename+'吗？':'您确认拒绝'+item.truename+'的报名申请吗？'
        this._appjs.syJsbConfirm(str,'确认','取消',(data) => {if(data){
          var qs = require('querystring');
          let data = qs.stringify({
            recruit_id:this.recruit_id,
            member_id:item.member_id,
            pass:pass,
          })
          this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=auditing_recruit_member',data).then(res=>{


            if(res && res.data && res.data.code == 200){
              Toast({
                message:pass == 1?'已通过':'已拒绝',
                duration:1000,
                className:'toast'
              })
              if(pass == 1){
                this.joined_count ++;
                item.auditing_result = '1'
              }else{
                this.memberList.splice(index,1)
//              this.joined_count --;
              }

              this.applied_count --


            }else if(res && res.data && res.data.code){
              Toast({
                message:res.data.message,
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
        }})

      },
      // 志愿组织成员列表页的移除成员的接口 remove_volunteer_org_member
      remove(item){
        this._appjs.syJsbConfirm('移除'+item.truename+'后不可恢复，确认移除吗？','继续','算了吧',(data) => {if(data){
          var qs = require('querystring');
          let data = qs.stringify({
            recruit_id:this.recruit_id,
            member_id:item.member_id,
          })

          this.$http.post(this.siteInfo.host+'/api/index.php?act=volunteer&op=remove_recruit_member',data).then(res=>{


            if(res && res.data && res.data.code == 200){

              let index = this.memberList.findIndex( k => k.member_id === item.member_id );
              this.memberList.splice( index , 1);
              this.joined_count --;
              Toast({
                message:'移除成功',
                duration:1000,
                className:'toast'
              })

            }else if(res && res.data && res.data.code){
              Toast({
                message:res.data.message,
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
        }})


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

      goto(url){
        location.href = url
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
            /*margin-left:.5rem;*/
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
    background: url('/bocm/platformjs/static/image/volunteer/time2.png') no-repeat left 30%;
    padding-left:.24rem;
    background-size:.2rem auto;
  }
</style>
