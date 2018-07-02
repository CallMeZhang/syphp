<template>
  <div id="pub_index">
    <div v-title="'善源公益'"></div>

    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name="fade">
      <div v-show="!isLoading" style="height: 100%;">
        <!--顶部-->
        <div class="top_bg2 relative fff text-center">
          <!--<div class="top_text1 ">博施济众 积善成德</div>-->
          <!--<div class="top_text2"><span>我们的承诺</span></div>-->
          <div class="absolute horse">
              <div style="width:100%;height:100%;overflow: hidden">
                <div class="horse_animate" :style="{width:horse_lamp.length * 150 + '%'}" style="height:100%;" ref="horse_animate">
                  <div class="horse_box font26 fl" ref="horse_item" v-for="item in horse_lamp" style="width:11.25rem;">
                    <img :src="item.member_avatar" alt="" class="people_img" style="vertical-align: middle;margin-right:.1rem;"><span style="color:#4B4F63;">{{item.buyer_name}}捐赠了</span><span style="color:#4A90E2">￥{{item.money}}</span>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <!--志愿者广场-->
        <!--<div v-if="index_activities.length && !isNewVolunteer">-->
        <!--<div v-if="false">-->
          <!--<div class="sub_left_title" style="padding-right:.3rem;padding-top:0.1rem;" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_active')">-->
            <!--<div class="more_goods_gt">-->
              <!--<span class="sub_left_title_text font32 color4">志愿者广场</span><span class="font26 ml2 fr" style="margin-right:.2rem;color:#B1B8C4;margin-top:2px;">查看更多</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;志愿者广场轮播图1&ndash;&gt;-->
          <!--<div class="swiper-container pub_swipe" ref="pub_swipe">-->
            <!--<div class="swiper-wrapper swiper-wrapper1">-->
              <!--<div class="swiper-slide" v-for="item in index_activities" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/mobile/index.php?act=help&op=help_activity_detail&project_id='+ item.goods_id)">-->
                <!--<div class="swiper_item1">-->
                  <!--<div class="tabItem clearfix">-->
                    <!--<div class="img fl">-->
                      <!--<div style="width:100%;height:100%;position: relative">-->
                        <!--<img v-lazy="item.image_url" alt="">-->
                        <!--<div class="bm absolute">{{item.activity_process_state}}</div>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="info fl">-->
                      <!--<h2>{{item.activity_name}}</h2>-->
                      <!--&lt;!&ndash;<div>-->
                        <!--<p class="p1">-->
                          <!--<span class="icon1" style="width: 0.28rem;height: 0.28rem;"></span>{{item.activity_starttime}}-->
                          <!--<span class="icon2" style="width: 0.24rem;height: 0.26rem;"></span>{{item.register_count}}人-->
                        <!--</p>-->
                        <!--<p><span class="icon3" style="width: 0.26rem;height: 0.29rem;"></span>{{item.activity_address}}</p>-->
                        <!--<p><span class="icon4" style="width: 0.28rem;height: 0.3rem;"></span>{{item.volunteer_name}}</p>-->
                      <!--</div>&ndash;&gt;-->
                      <!--<div>-->
                        <!--<p class="p1">-->
                        <!--<span class="icon1"-->
                              <!--style="width: 0.28rem;height: 0.28rem;">-->
                          <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/Fill2.png'" style="width: 100%;height: 100%;">-->
                        <!--</span>{{item.activity_starttime}}-->
                          <!--<span class="icon2" style="width: 0.24rem;height: 0.26rem;">-->
                           <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/Fill1.png'" style="width: 100%;height: 100%;">-->
                        <!--</span>{{item.register_count}}人-->
                        <!--</p>-->
                        <!--<p><span class="icon3" style="width: 0.26rem;height: 0.29rem;">-->
                        <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/Fill4.png'" style="height: 100%;width: 100%;">-->
                      <!--</span>{{item.activity_address}}</p>-->
                        <!--<p><span class="icon4" style="width: 0.28rem;height: 0.3rem;">-->
                         <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/Fill3.png'" style="height: 100%;width: 100%;">-->
                      <!--</span>{{item.volunteer_name}}</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

            <!--<div class="swiper-pagination" id="pagination22"></div>-->

          <!--</div>-->
        <!--</div>-->

        <!--最新项目进展-->
        <div>
          <div>
            <div class="bg_interval"></div>
            <div class="sub_left_title" style="padding-right:.3rem;" >
              <span class="sub_left_title_text font32 color4">最新项目进展</span>
            </div>
          </div>
          <div class="swiper-container pub_swipe2" ref="pub_swipe2">
            <div class="swiper-wrapper swiper-wrapper1">
              <div class="swiper-slide" v-for="item in recent_report" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_detail&project_id=' + item.project_id)">
                <div class="swiper_item2 relative">
                  <div style="height:3rem;width:100%; position: relative;overflow: hidden;border-radius: .1rem;">
                    <img v-lazy="item.project_ad_image_url" alt="" class="swiper_item2_img cen">
                  </div>
                  <div class="absolute project_personal" v-show="item.project_mode == 1">个人求助</div>
                  <div class="absolute recent">
                    <div class="no-enter">{{item.project_name}}</div>
                    <div class="no-enter">{{item.report_time}}最新汇报</div>
                  </div>
                </div>

              </div>
            </div>



          </div>
        </div>


        <!--慈善项目-->
        <div v-if="donate_list.length">
          <div class="bg_interval"></div>
          <div class="sub_left_title" style="padding-right:.3rem;" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_list&project_mode=get_donate_list')">
            <div class="more_goods_gt">
              <span class="sub_left_title_text font32 color4">慈善项目</span><span class="font26 ml2 fr" style="margin-right:.2rem;color:#B1B8C4;margin-top:2px;">查看更多</span>
            </div>
          </div>
          <div class="pl3">

            <div class="item_box1" v-for="item in donate_list" @click="_appjs.syJsbLaunchWebview(item.touch_url )">
              <div class="relative img_box1">
                <img v-lazy="item.project_ad_image_url" alt="" class="item_box1_img cen">
                <div class="absolute remaining_time" v-if="item.project_remaining_time">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/time_icon33.png'" style="width:.22rem;vertical-align: top">
                  {{item.project_remaining_time}}
                </div>
              </div>
              <div class="progress22">
                <div style="width:100%;height:100%;" v-show="item.finished_money != 0">
                  <div class="progress_con22 " :style="{width:(item.percent>100?100:item.percent) +'%'}"></div>
                  <div class="progress_num_box2">
                    <div class="progress_num_box_con relative">
                      <div class="absolute progress_num22" v-if="item.process_status === '已结束' && item.percent != 100" :style="{left:(item.percent>100?100:item.percent) + '%'}">结束</div>
                      <div class="absolute progress_num22" v-else :style="{left:(item.percent>100?100:item.percent) + '%'}">{{item.percent == 100 ? '完成':item.percent + '%'}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding:0 .2rem;">
                <div class="no-enter project_title2 font30">{{item.project_mode_str}} | {{item.project_name}} </div>
                <div class="project_con2">{{item.project_intro}}</div>
              </div>
            </div>

          </div>
        </div>

        <!--公益众筹-->
        <div v-if="crowdfunding_list.length">
          <div class="bg_interval"></div>
          <div class="sub_left_title" style="padding-right:.3rem;" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_list&project_mode=get_crowdfunding_list')">
            <div class="more_goods_gt">
              <span class="sub_left_title_text font32 color4">公益众筹</span><span class="font26 ml2 fr" style="margin-right:.2rem;color:#B1B8C4;margin-top:2px;">查看更多</span>
            </div>
          </div>
          <div class="pl3">

            <div class="item_box1" v-for="item in crowdfunding_list" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
              <div class="relative img_box1">
                <img v-lazy="item.project_ad_image_url" alt="" class="item_box1_img cen">
                <!--<div class="absolute remaining_time">-->
                <div class="absolute remaining_time" v-if="item.project_remaining_time">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/time_icon33.png'" style="width:.22rem;vertical-align: top">
                  <!--<img src="/bocm/platformjs/static/image/default/time_icon33.png" style="width:.22rem;vertical-align: top">-->
                  {{item.project_remaining_time}}
                </div>
              </div>
              <div class="progress22">
                <div style="width:100%;height:100%;" v-show="item.finished_money != 0 ">
                  <div class="progress_con22 " :style="{width:(item.percent>100?100:item.percent) +'%'}"></div>
                  <div class="progress_num_box2">
                    <div class="progress_num_box_con relative">
                      <div class="absolute progress_num22" v-if="item.process_status === '已结束' && item.percent != 100" :style="{left:(item.percent>100?100:item.percent) + '%'}">结束</div>
                      <div class="absolute progress_num22" v-else :style="{left:(item.percent>100?100:item.percent) + '%'}">{{item.support_type == 1 ? (item.percent == 100 ? '完成':item.percent + '%'):item.percent + '%'}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding:0 .2rem;">
                <div class="no-enter project_title2 font30">{{item.project_name_prefix}} | {{item.project_name}} </div>
                <div class="project_con2">{{item.project_intro}}</div>
              </div>
            </div>

          </div>
        </div>

        <!--个人求助-->
        <div v-if="personalhelp_list.length">
          <div class="bg_interval"></div>
          <div class="sub_left_title" style="padding-right:.3rem;" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_list&project_mode=get_personalhelp_list')">
            <div class="more_goods_gt clearfix">
              <span class="sub_left_title_text font32 color4 fl">个人求助</span>
              <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/explain_tip.png'" alt="" class="fl" style="height:.3rem;width:.3rem;margin-left:.1rem;">-->

              <span class="font26 ml2 fr" style="margin-right:.2rem;color:#B1B8C4;margin-top:2px;">查看更多</span>
            </div>
          </div>
          <div class="pl3">

            <div class="item_box1" v-for="item in personalhelp_list" @click="_appjs.syJsbLaunchWebview(item.touch_url )">
              <div class="relative img_box1">
                <img v-lazy="item.project_ad_image_url" alt="" class="b item_box1_img cen">
                <div class="absolute remaining_time" v-if="item.project_remaining_time">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/time_icon33.png'" style="width:.22rem;vertical-align: top">
                  {{item.project_remaining_time}}
                </div>
              </div>

              <div class="progress22">
                <div style="width:100%;height:100%;" v-show="item.finished_money != 0">
                <!--<template v-show="false">-->
                  <div class="progress_con22" :style="{width:(item.percent>100?100:item.percent) + '%'}"></div>
                  <div class="progress_num_box2">
                    <div class="progress_num_box_con relative">
                      <div class="absolute progress_num22" v-if="item.process_status === '已结束' && item.percent != 100" :style="{left:(item.percent>100?100:item.percent) + '%'}">结束</div>
                      <div class="absolute progress_num22" v-else :style="{left:(item.percent>100?100:item.percent) + '%'}">{{item.percent == 100 ? '完成':item.percent + '%'}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding:0 .2rem;">
                <div class="no-enter project_title2 font30">{{ item.project_name_prefix }} | {{item.project_name}}</div>
                <div class="person_help1">
                  <!--<div class="icon" v-if="true">
                    <div class="item">
                      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-money.png'"
                           style="width: 0.24rem;height: 0.24rem;" alt="款项">
                      目标金额：￥{{item.target_money == 0 ? '0元':item.target_money}}
                    </div>
                    <div class="item" v-if="item.order_count==0">
                      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-xin.png'"
                           style="width: 0.28rem;height: 0.24rem;" alt="爱心">
                      期待爱心
                    </div>
                    <div class="item" v-if="item.order_count!=0">
                      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-xin.png'"
                           style="width: 0.28rem;height: 0.24rem;" alt="爱心">
                      已获得爱心：{{item.order_count}}份
                    </div>
                  </div>-->
                  <div class="icon">
                    <div class="item">
                      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-money.png'"
                           style="width: 0.24rem;height: 0.24rem;" alt="款项">
                      目标金额: ￥{{item.target_money}}
                    </div>
                    <div class="item" v-if="item.order_count==0">
                      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-xin.png'"
                           style="width: 0.28rem;height: 0.24rem;" alt="爱心">
                      期待爱心
                    </div>
                    <div class="item" v-if="item.order_count!=0">
                      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-xin.png'"
                           style="width: 0.28rem;height: 0.24rem;" alt="爱心">
                      获得爱心: {{item.order_count}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--大家关注-->
        <!--<div v-if="false">
          <div class="bg_interval"></div>
          <div class="sub_left_title" style="padding-right:.3rem;" @click="_appjs.syJsbLaunchWebview()">
            <div class=" clearfix">
              <span class="sub_left_title_text font32 color4 fl">大家关注</span>
            </div>
          </div>

          <div class="">
            <ul class="clearfix keep">
              <li v-for="item in hot_tag" v-html="item.tag_name + ' ' + item.project_count"></li>
            </ul>
          </div>

        </div>-->

        <div class="bottom_bar">
          <span>一起善源 爱 · 源于善</span>
        </div>


      </div>
    </transition>

  </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  //  import {} from '@/requests/index'
  //  import pop from '../components/common/popup.vue'

    import Swiper from '../../../../static/js/swiper-3.4.2.min'
  export default {
    data(){
      return {
        isLoading:true,
        index_activities:[],  // 志愿者广场
        crowdfunding_list:[], // 公益众筹
        donate_list:[],       // 慈善项目
        personalhelp_list:[],  // 个人求助
        recent_report:[],  // 最新项目进展
        hot_tag:[],
        horse_lamp:[],
        isNewVolunteer:false,
      }
    },
    created(){
//      this.isLoading = false
      this.getData()
      this._appjs.syJsbShowTitleBar('true')
      this.getVersion((platform,version)=>{
        if(platform === 'android'){
          if(version > 95){
            this.isNewVolunteer = true
          }
        }else if(platform === 'ios'){
          if(version > 85){
            this.isNewVolunteer = true;
          }
        }
      })
    },
    mounted(){

        // horse_lamp_ref
//        console.log(this.$refs.pub_swipe)
    },
    methods:{
      getData(){

        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_index_activities').then(res => {
          if(res && res.data && res.data.code == 200){
            this.index_activities = res.data.content
          }

        }).then(()=>{
          this.$nextTick(()=>{
            this.swiper()
          })
          this.isLoading = false;

        });

        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_recent_report').then(res => {
          if(res && res.data && res.data.code == 200){
              this.recent_report = res.data.content;
          }
        });

        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_index').then(res => {
          if(res && res.data && res.data.code == 200){

//            var res = {data:{"code":200,"message":"success","content":{"personalhelp_list":[{"rec_id":"2","project_id":"2","project_type":"1","project_name":"6.1\u503e\u542c\u5fc3\u7075\u7684\u58f0\u97f3","project_image":"pubwel_head_2.jpg","project_ad_image_url":"https:\/\/t2.17shanyuan.com\/data\/upload\/syrs\/syproject\/pubwel_ad_2.jpg","support_type":1,"target_money":"35,200","finished_money":"35,200","percent":"10","process_status":"进行中","project_name_prefix":"\u4e2a\u4eba\u6c42\u52a9","order_count":"384","project_remaining_time":"","touch_url":"https:\/\/t2.17shanyuan.com\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=2","touch_url_short":"\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=2"},{"rec_id":"8","project_id":"3","project_type":"2","project_name":"\u5d69\u5e97\u4e2d\u5b66\u56fe\u4e66\u6350\u8d60\u9879\u76ee","project_image":"pubwel_head_8.jpg","project_ad_image_url":"https:\/\/t2.17shanyuan.com\/data\/upload\/syrs\/syproject\/pubwel_ad_8.jpg","support_type":1,"target_money":"88,000","finished_money":"188,000","percent":"100","process_status":"\u5df2\u5b8c\u6210","project_name_prefix":"\u4e2a\u4eba\u6c42\u52a9","order_count":"105","project_remaining_time":"","touch_url":"https:\/\/t2.17shanyuan.com\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=8","touch_url_short":"\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=8"},{"rec_id":"20","project_id":"9","project_type":"2","project_name":"\u67a3\u56ed\u9547\u5b66\u6821\u56fe\u4e66\u5ba4\u6350\u8d60\u9879\u76ee","project_image":"pubwel_head_20.jpg","project_ad_image_url":"https:\/\/t2.17shanyuan.com\/data\/upload\/syrs\/syproject\/pubwel_ad_20.jpg","support_type":1,"target_money":"15,977","finished_money":"115,977","percent":"100","process_status":"\u5df2\u5b8c\u6210","project_name_prefix":"\u4e2a\u4eba\u6c42\u52a9","order_count":"193","project_remaining_time":"","touch_url":"https:\/\/t2.17shanyuan.com\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=20","touch_url_short":"\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=20"}],"crowdfunding_list":[{"rec_id":"26","project_id":"15","project_type":"2","project_name":"\u5507\u816d\u88c2\u513f\u7ae5\u5fae\u7b11\u884c\u52a8","project_image":"pubwel_head_26.jpg","project_intro":"\u7ec4\u7ec7\u4e2d\u56fd\u94f6\u884c\u7cfb\u7edf\u5185\u90e8\u5458\u5de5\u8d44\u52a9\u5e7f\u897f\u8d2b\u56f0\u5bb6\u5ead\u5507\u816d\u88c2\u60a3\u513f\u8fdb\u884c\u624b\u672f\uff0c\u8ba9\u5507\u816d\u88c2\u5b69\u5b50\u7684\u5fae\u7b11\u6ca1\u6709\u201c\u7f3a\u61be\u201d\u3002","project_ad_image_url":"https:\/\/t2.17shanyuan.com\/data\/upload\/syrs\/syproject\/pubwel_ad_26.jpg","support_type":1,"target_money":"200,000","finished_money":"306,675","percent":"139","process_status":"","project_name_prefix":"\u516c\u76ca\u4f17\u7b79","order_count":"2,305","project_remaining_time":"","touch_url":"https:\/\/t2.17shanyuan.com\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=26","touch_url_short":"\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=26"},{"rec_id":"27","project_id":"16","project_type":"2","project_name":"\u817e\u683c\u91cc\u6c99\u6f20\u9501\u8fb9\u884c\u52a8","project_image":"pubwel_head_27.png","project_intro":"\u6295\u4e0b\u7eff\u8272\u5e0c\u671b\u7684\u79cd\u5b50\uff0c\u8ba9\u817e\u683c\u91cc\u6c99\u6f20\u7115\u53d1\u751f\u673a\u3002","project_ad_image_url":"https:\/\/t2.17shanyuan.com\/data\/upload\/syrs\/syproject\/pubwel_ad_27_v2.png","support_type":1,"target_money":"100,000","finished_money":"200,000","percent":"100","process_status":"\u5df2\u5b8c\u6210","project_name_prefix":"\u516c\u76ca\u4f17\u7b79","order_count":"5,096","project_remaining_time":"","touch_url":"https:\/\/t2.17shanyuan.com\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=27","touch_url_short":"\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=27"},{"rec_id":"28","project_id":"17","project_type":"2","project_name":"\u201c\u51ac\u5b63\u6696\u5fc3\u8ba1\u5212\u201d\u7b2c\u4e00\u671f","project_image":"pubwel_head_28_32.jpg","project_intro":"\u201c\u51ac\u5b63\u6696\u5fc3\u8ba1\u5212\u201d\u7b2c\u4e00\u671f\uff08\u957f\u6b66\u53bf\u3001\u6c38\u5bff\u53bf\uff09\uff0c\u4e3a\u8d2b\u56f0\u5bb6\u5ead\u7684\u5b66\u751f\u6350\u52a9\u7fbd\u7ed2\u670d\uff0c\u8ba9\u4ed6\u4eec\u4e0d\u754f\u4e25\u5bd2\u3001\u6e29\u6696\u8fc7\u51ac\uff01","project_ad_image_url":"https:\/\/t2.17shanyuan.com\/data\/upload\/syrs\/syproject\/pubwel_ad_28_32.jpg","support_type":1,"target_money":"30,000","finished_money":"130,002","percent":"100","process_status":"\u5df2\u5b8c\u6210","project_name_prefix":"\u516c\u76ca\u4f17\u7b79","order_count":"740","project_remaining_time":"","touch_url":"https:\/\/t2.17shanyuan.com\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=28","touch_url_short":"\/bocm\/index.php?act=pubwel_router&op=pubwel_detail&project_id=28"}],"donate_list":[],"more":{"crowdfunding_list_url":"\/bocm\/index.php?act=index&op=showvue#\/pubwel_list?project_mode=get_crowdfunding_list","personalhelp_list_url":"\/bocm\/index.php?act=index&op=showvue#\/pubwel_list?project_mode=get_personalhelp_list"}}}}
            this.personalhelp_list = res.data.content.personalhelp_list;
            this.crowdfunding_list = res.data.content.crowdfunding_list;
            this.donate_list = res.data.content.donate_list;
            this.addPercent(this.crowdfunding_list)
//            console.log(this.crowdfunding_list)
          }

        })

        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_horse_lamp').then(res => {
            if(res && res.data && res.data.code == 200){
                this.horse_lamp = res.data.content;
            }
//            console.log(this.$refs.horse_item)
          let distance = 0.5 * Math.PI / 1.5;

          let time = this.horse_lamp.length * 11.25 / distance;


          setTimeout(()=>{
            this.$refs.horse_animate.style.animation = 'lamp '+ time+'s infinite linear';
            this.$refs.horse_animate.style.webkitAnimation = 'lamp '+ time+'s infinite linear';
          },1000)
//          this.$refs.horse_item.style.transform = 'translateX(-2rem)';
//          let index = 0;
//          setTimeout(()=>{
//            setInterval(()=>{
////                console.log(44)
////              this.$refs.horse_item.style.color = '#eee';
//              this.$refs.horse_item.style.transform = 'translate3d(' + distance * index + 'rem,0,0)';
//              this.$refs.horse_item.style.webkitTransform = 'webkitTranslate3d(' + distance * index + 'rem,0,0)'
////              this.$refs.horse_item.style.marginLeft = distance * index + 'rem';
//              index ++;
//            },20)
//          },0)

        });
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=get_hot_tag').then(res => {
          if(res && res.data && res.data.code == 200){
              this.hot_tag = res.data.content;
          }
        });


      },
      addPercent(arr){
        function remove(str){
          if(!str) {
              return '0';
          }else{
            return (str + '').split(',').join('')
          }
        }
        if(!arr || !arr.length) return [];
        arr.forEach(item => {
          let tmp;
          if(remove(item.target_money) == 0){
            item.percent = 1
          }else{
            tmp= remove(item.finished_money) / remove(item.target_money);
            item.percent = tmp >= 1 ? 100 : parseInt(tmp * 100) < 1 ? 1 : parseInt(tmp * 100);
          }

        });
        return arr;
      },
      swiper(){
        this.$nextTick(()=>{
//          new Swiper(this.$refs.pub_swipe,{
//            initialSlide : 0,
//            direction : 'horizontal',
//            slidesPerView : 1.04,
//            paginationClickable: true,
//            spaceBetween: 10,
//            freeMode: true,
//            observer:true,
//            observeParents:true,
//            freeModeMomentum:true,
//            freeModeMomentumRatio:.5,
//            slidesOffsetAfter:0,
//            pagination: '.swiper-pagination',
//            slideActiveClass: 'swiper-slide-active-d'
//          });

          new Swiper(this.$refs.pub_swipe2,{
            initialSlide : 0,
            direction : 'horizontal',
            slidesPerView : 2.08,
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true,
            observer:true,
            observeParents:true,
            freeModeMomentum:true,
            freeModeMomentumRatio:.5,
            slidesOffsetAfter:0,
          })
        })
      },
      getVersion(fn){
        let info = this._appjs.syJsbGetAppVersion()
        if (info['platform'] === 'android') {
          fn(info['platform'],info['version'])
        }
        if (info['platform'] === 'ios') {
          info['version'].then( version => {
            fn(info['platform'],version)
          })
        }
      },

    },
    components:{loading}

  }
</script>

<style>
  #pagination22 .swiper-pagination-bullet-active {
    background:#007aff;
  }
</style>

<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";
  @import "./aa.css";

  #pub_index{
    width:100%;
    min-height:100%;
    background: #fff;
    font-weight:300;
    color:#4B4F63;
    text-align: left;
  }
  .fff{
    color:#fff;
  }
  .bg_interval{
    height:.2rem;
    background: #F7F9FA;
  }

  .sub_left_title{
    padding:.3rem 0 .3rem .46rem;
  }
  .sub_left_title_text::before{
    content:'';
    display: block;
    background: url("/bocm/platformjs/static/image/index/yellow22.png") center center no-repeat;
    background-size: .38rem .7rem;
    width:.1rem;
    height:.4rem;
    border-radius: .03rem;
    position: absolute;
    left:.3rem;
    margin-top:-.06rem;
  }

  .more_goods_gt{
    background:url("/bocm/platformjs/static/image/union/list_title_right.png") right 46% no-repeat;
    background-size: .14rem .25rem;
  }
  .top_bg2{
    height:3.43rem;
    background: url("/bocm/platformjs/static/image/sywelfare/pul_index_bg43.png")  no-repeat ;
    background-size: cover;
  }
  .top_text1{
    font-size: .4rem;
    padding-top:.65rem;
  }
  .top_text2{
    margin:.3rem auto;
    /*padding:.1rem 0;*/
    height:.4rem;
    line-height: .4rem;
    font-size: .26rem;
    border-radius: .2rem;
    width:1.9rem;
    text-align: center;
    background: rgba(74,144,226,.5);
  }
  .top_text2 span{
    padding-right:.2rem;
    background: url("/bocm/platformjs/static/image/default/arrow_fff.png") no-repeat right center;
    background-size: auto .22rem;
  }
  .swiper-wrapper1{
    padding:0 .3rem;
  }

  .swiper-wrapper1 h2{
    height:.8rem;
    overflow: hidden;
  }
  .pub_swipe{
    padding-bottom:.6rem;
    padding-right:.6rem;
  }
  .pub_swipe2{
    padding-bottom:.3rem;
    padding-right:.6rem;
  }
  .swiper_item1{

  }

  .tabItem {
    width: 98%;
    height: 2.41rem;
    background: #FFFFFF;
    border: 1px solid #DADEE4;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.10);
    border-radius: 0.08rem;
    overflow: hidden;
    margin: 0 auto;
    /*padding: 0 0.3rem;*/
  }

  .tabItem .img {
    height: 2.41rem;
    /*width: 2.41rem;*/
    width:37%;
    box-sizing: border-box;
    background: pink;
  }

  .tabItem .img img {
    width: 100%;
    height: 100%;
  }

  .tabItem .img .bm {
    left:.2rem;
    top:.15rem;
    /*width: 1.03rem;*/
    padding:.04rem .16rem .03rem;
    height: 0.33rem;
    line-height: 0.33rem;
    background: #F8E71C;
    border-radius: 0.33rem 0.33rem 0.33rem 0;
    font-size: 0.26rem;
    color: #4A90E2;
    font-weight: 300;
  }

  .tabItem .info {
    /*width: 4.3rem;*/
    width: 63%;
    box-sizing: border-box;
    /*width: calc(98% - 2.41rem);*/
    text-align: left;
    padding: 0.16rem 0.11rem 0.15rem 0.11rem;
  }

  .tabItem .info h2 {
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.4rem;
    font-weight: 300;
  }

  .tabItem .info p {
    font-size: 0.26rem;
    color: #666A7F;
    line-height: 0.4rem;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tabItem .info p span {
    display: inline-block;
    margin-right: 0.1rem;
    vertical-align: text-top;
  }

  .tabItem .info .icon1 {
    /*background: url("/bocm/platformjs/static/image/sywelfare/icon.png") no-repeat left top;*/
    background-size: cover;
  }

  .tabItem .info .icon2 {
    /*<!--background: url("/bocm/platformjs/static/image/sywelfare/icon.png") no-repeat left -0.23rem;-->*/
    background-size: cover;
    margin-left: 0.3rem;
  }

  .tabItem .info .icon3 {
    /*<!--background: url("/bocm/platformjs/static/image/sywelfare/icon.png") no-repeat left -0.49rem;-->*/
    background-size: cover;
  }

  .tabItem .info .icon4 {
    /*background: url("/bocm/platformjs/static/image/sywelfare/icon.png") no-repeat left bottom;*/
    background-size: cover;
  }
  .swiper_item2_img{
    /*width:3rem;*/
    height:3rem;
    width:100%;
    /*height:3rem;*/
    border-radius: .08rem;
    box-sizing: border-box;
    display: block;
  }
  .pl3{
    padding:0 0.3rem;
  }
  .bottom_bar{
    text-align: center;
    color:#DADEE4;
    font-size: .24rem;
    height:.5rem;
    line-height: .5rem;
    background: #F7F9FA;
  }

  .slide_box13{
    height:2.2rem;
  }
  .slide_img1{
    height:2.2rem;
    width:2.2rem;
  }

  .progress22{
    height:.08rem;
    background: #C8DDF5;
    /*padding:0 .4rem;*/
    /*background-image: linear-gradient(-90deg, #00ECBC 0%, #4A90E2 100%);*/
  }
  .progress_num_box2{
    width:100%;
    height:100%;
    padding-right:0.8rem;
    box-sizing: border-box;
  }
  .progress_num_box_con{
    height:100%;
  }
  .progress_con22{
    height:100%;
    background-image: linear-gradient(-90deg, #00ECBC 0%, #4A90E2 100%);
  }
  .progress_num22{
    left:0;
    top:0;
    margin-top:-.19rem;
    width:.8rem;
    height:.3rem;
    line-height: .33rem;
    background: #E35050;
    box-shadow: 0 0 22px 0 rgba(227,80,80,0.83);
    border-radius: .15rem;
    color:#fff;
    text-align: center;
  }
  .project_title2{
    color:#4B4F63;
    padding-top:.3rem;
    font-weight: 300;
  }
  .project_con2{
    font-size: .24rem;
    line-height: .34rem;
    color:#818C9E;
    padding-top:.06rem;
    max-height: .64rem;
    overflow: hidden;
    font-weight: 300;
  }

  .item_box1{
    box-sizing: border-box;
    /*border:1px solid #ccc;*/
    padding-bottom:.2rem;
    margin-bottom:.3rem;
    border-radius: .1rem;
    box-shadow: 0 0 15px 0 rgba(74,144,226,.2)
  }
  .img_box1{
    width:100%;
    height:3.2rem;
    border-radius: .1rem .1rem 0 0;
    overflow: hidden;
  }
  .item_box1_img{
    box-sizing: border-box;
    width:100%;
    min-height:3.2rem;
    display: block;
    border-radius: .08rem .08rem 0 0;
  }
  .keep{
    padding:0 .3rem;
  }
  .keep li{
    float: left;
    padding:.12rem .2rem;
    box-sizing: border-box;
    color:#4A90E2;
    border:1px solid #4A90E2;
    border-radius:.25rem;
    margin-left:.2rem;
    margin-bottom:.2rem;
  }
  .horse{
    left:0;
    bottom:.1rem;
    height:.5rem;
    width:100%;
    /*overflow: hidden;*/
    text-align: left;
    /*background: pink;*/
  }
  .horse_box{
    /*left:0;*/
    /*margin-left:100%;*/
    height:.5rem;
    /*width:20rem;*/
    width:100%;
    font-weight: 300;
    /*transform: translateX(-3rem);*/
  }
  .horse .people_img{
    height:.5rem;
    width:.5rem;
    border-radius: 50%;
    /*-webkit-animation:circle 2s infinite linear;*/
    /*animation:circle 2s infinite linear;*/
  }
  @-webkit-keyframes circle{
    0%{ transform:rotate(0deg); }
    100%{ transform:rotate(-360deg); }
  }
  @keyframes circle{
    0%{ transform:rotate(0deg); }
    100%{ transform:rotate(-360deg); }
  }
  @-webkit-keyframes lamp{
    0%{ transform:translateX(7.5rem); }
    100%{ transform:translateX(-100%); }
  }
  @keyframes lamp{
    0%{ transform:translateX(7.5rem); }
    100%{ transform:translateX(-100%); }
  }
  .horse_animate{
    transform:translateX(7.5rem);
    -webkit-transform:translateX(7.5rem);
  }
  .recent{
    /*left:.1rem;*/
    /*bottom:.16rem;*/
    /*color:#fff;*/
    /*font-size: .26rem;*/
    /*line-height: .38rem;*/
    /*background: rgba(100,100,100,.5);*/
    /*border-radius: .1rem;*/
    /*padding:.05rem 0 .05rem .12rem;*/
    /*max-width: 2.68rem;*/
    left:0;
    bottom:0;
    height:2.6rem;
    color:#fff;
    padding-top:1.82rem;
    box-sizing: border-box;
    width:100%;
    padding-right:.16rem;
    font-size: .26rem;
    line-height: .34rem;
    padding-left:.2rem;
    border-radius: .08rem;
    background-image: linear-gradient(180deg, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.60) 100%);;
  }
  .person_help1{
    /*padding-top:.3rem;*/
  }
  .person_help1  .target_money{
    width:50%;
  }
  .person_help1  .has_help{
    width:50%;
  }
  .person_help1 .p_img{
    padding-left:.28rem;
  }

  .p_img_r{}
  .icon {
    margin-top: 0.34rem;
    width: 100%;
  }

  .icon .item {
    display: inline-block;
    border-right: 1px solid #DADEE4;
    box-sizing: border-box;
    font-size: 0.24rem;
    color: #818C9E;
    line-height: 0.3rem;
    width: 49%;
    text-align: left;
  }

  .icon .item:last-child {
    border: none;
    padding-left: 0.55rem;
  }

  .icon img {
    vertical-align: middle;
    margin-right: 0.12rem;
  }
  .project_personal{
    /*top:.16rem;*/
    /*right: .16rem;*/
    color:#fff;
    background: rgba(74,144,226,0.70);
    /*padding:.1rem .16rem;*/
    /*line-height:.3rem;*/
    /*padding:.1rem .14rem;*/
    /*font-size: .24rem;*/
    /*!*height:.3rem;*!*/
    /*!*width:1.2rem;*!*/
    /*text-align: center;*/
    /*border-radius: .44rem;*/
    /*border-bottom-left-radius: 0;*/
    left:.2rem;
    top:.15rem;
    /*width: 1.03rem;*/
    padding:.04rem .16rem .03rem;
    height: 0.33rem;
    line-height: 0.33rem;
    /*background: #F8E71C;*/
    border-radius: 0.33rem 0.33rem 0.33rem 0;
    font-size: 0.26rem;
    /*color: #4A90E2;*/
    font-weight: 300;
  }
  .remaining_time{
    color:#fff;
    right:.2rem;
    top:.15rem;
    font-size: .24rem;
    background: rgba(74,144,226,0.70);
    padding:.1rem .16rem;
    border-radius: .44rem;
    border-bottom-left-radius: 0;
    font-weight: 300;
  }
  .icon {
    margin-top: 0.34rem;
    width: 100%;
  }

  .icon .item {
    display: inline-block;
    border-right: 1px solid #DADEE4;
    font-size: 0.24rem;
    color: #818C9E;
    line-height: 0.3rem;
    width: 49%;
    text-align: left;
  }

  .item:last-child {
    border: none;
    padding-left: 0.25rem;

  }

  .icon img {
    vertical-align: bottom;
    margin-right: 0.12rem;
    margin-bottom: 0.05rem;
  }
</style>
