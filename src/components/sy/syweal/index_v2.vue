<template>
  <div class="sy_weal" style="height: 100%;background-color: #fff;">
    <div v-title="'善源公益'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div class="wrapper" v-show="!isLoading">
        <div v-if="cur_channel">
          <!--公益求助-->
          <div v-if="crowd.length>0">
            <div class="line"></div>
            <!--公益众筹-->
            <div class="gyqz mt">
              <div class="tit clearfix">
                <div class="fl">
                  <span class="line"></span>
                  <span>公益众筹</span>
                </div>
                <div class="more fr" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=index&op=public_project_list_v2&type=public_project')">
                  查看更多
                  <span class="icon"></span>
                </div>
              </div>
              <div class="grqzCon">
                <ul>
                  <li class="clearfix" v-for="item in crowd" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                    <div class="img fl">
                      <img v-lazy="item.image_url">
                      <img :src="item.status_image_url" alt="角标" class="biao">
                    </div>
                    <div class="info fr">
                      <h2>{{item.project_name}}</h2>
                      <p>类型：{{item.project_mode}}-{{item.project_type}}</p>
                      <p>截止：{{item.project_endtime}}</p>
                      <p>已参与：{{item.part_num}}人</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="bazaar.length>0">
            <div class="line"></div>
            <!--慈善项目-->
            <div class="gyqz mt">
              <div class="tit clearfix">
                <div class="fl">
                  <span class="line"></span>
                  <span>慈善项目</span>
                </div>
                <div class="more fr" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=index&op=public_project_list_v2&type=charitable_project')">
                  查看更多
                  <span class="icon"></span>
                </div>
              </div>
              <div class="grqzCon">
                <ul>
                  <li class="clearfix" v-for="item in bazaar" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                    <div class="img fl">
                      <img v-lazy="item.image_url">
                      <img :src="item.status_image_url" alt="角标" class="biao">
                    </div>
                    <div class="info fr">
                      <h2>{{item.project_name}}</h2>
                      <p>类型：{{item.project_mode}}-{{item.project_type}}</p>
                      <p>截止：{{item.project_endtime}}</p>
                      <p>已参与：{{item.part_num}}人</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="gyqz" v-if="personal.length>0">
            <div class="tit clearfix">
              <div class="fl">
                <span class="line"></span>
                <span>个人求助</span>
              </div>
              <div class="more fr" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=index&op=public_project_list_v2&type=private_project')">
                查看更多
                <span class="icon"></span>
              </div>
            </div>
            <div class="grqzCon">
              <ul>
                <li class="clearfix" v-for="item in personal" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                  <div class="img fl">
                    <img v-lazy="item.image_url">
                    <img :src="item.status_image_url" alt="角标" class="biao">
                  </div>
                  <div class="info fr">
                    <h2>{{item.project_name}}</h2>
                    <p>类型：{{item.project_mode}}-{{item.project_type}}</p>
                    <p>截止：{{item.project_endtime}}</p>
                    <p>已参与：{{item.part_num}}人</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="show4 && activety.length>0">
            <div class="line"></div>
            <!--公益活动-->
            <div class="gyqz mt gyact">
              <div class="tit clearfix">
                <div class="fl">
                  <span class="line"></span>
                  <span>公益活动</span>
                </div>
                <div class="more fr" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=help&op=help_activity_class_list')">
                  查看更多
                  <span class="icon"></span>
                </div>
              </div>
              <div class="grqzCon">
                <ul>
                  <li class="clearfix" v-for="item in activety" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                    <div class="img fl">
                      <img v-lazy="item.image_url">
                      <img :src="item.status_image_url" alt="角标" class="biao">
                    </div>
                    <div class="info fr">
                      <h2>{{item.activity_name}}</h2>
                      <p>时间：{{item.activity_starttime}}</p>
                      <p>地址：{{item.activity_address}}</p>
                      <p>已报名：{{item.register_count}}人</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="show5 && volunteer.length>0">
            <div class="line"></div>
            <!--志愿者组织-->
            <div class="org mt">
              <div class="tit clearfix">
                <div class="fl">
                  <span class="line"></span>
                  <span>志愿者组织</span>
                </div>
                <div class="more fr" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer&op=volunteer_all_list')">
                  查看更多
                  <span class="icon"></span>
                </div>
              </div>
              <div class="con">
                <ul class="clearfix">
                  <li class="fl" v-for="item in volunteer" @click="_appjs.syJsbLaunchWebview(item.touch_url)">
                    <div class="img">
                      <img v-lazy="item.volunteer_image">
                    </div>
                    <p>{{item.volunteer_name}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!cur_channel" class="is_all_show">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/sywelfare11.png'" alt="">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/sywelfare13.png'" alt="">
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  export default{
    data () {
      return {
        isLoading: true,
        activety:[],
        volunteer:[],
        bazaar:[],
        crowd:[],
        cur_channel: true,
        personal:[],
        show1:true,
        show2:true,
        show3:true,
        show4:true,
        show5:true,
      }
    },
    created:function () {
      this.getData()
    },
    mounted: function () {
      this._appjs.syJsbShowTitleBar('true')
    },
    components: {
      'sy-loading': loading
    },
    methods:{
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=sypw&op=index_v2').then(res=>{
          let info = res.data.content
          this.activety = info.activity_list
          this.volunteer = info.volunteer_list
          this.bazaar = info.charity_list
          this.crowd = info.crowd_list
          this.personal = info.personal_list
          if(!info.is_boc_channel){
            this.show5 = false
            this.show4 = false
          }
          if(!info.has_project){
            this.cur_channel = false
          }
          this.isLoading = false
        })
      }
    }
  }
</script>
<style scoped>
  .is_all_show img{
    width:100%;
    display: block;
  }
  .gyqz {
    background-color: #fff;
  }

  .grqzCon {
    padding: 0 0.24rem 0rem;
  }

  .tit {
    padding: 0.3rem 0.24rem;
    font-size: 0.32rem;
    color: #4B4F63;
    text-align: left;
  }

  .tit .line {
    display: inline-block;
    height: 0.4rem;
    width: 0.06rem;
    background-color: #F8E71C;
    box-shadow: 0 0 4px 0 rgba(240,211,91,1);
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    vertical-align: sub;
  }

  .img {
    width: 2.24rem;
    height: 1.56rem;
    margin-right: 0.3rem;
    background: #e1e1e1;
    position: relative;
  }

  .img img {
    width: 100%;
    height: 100%;
  }

  .img .biao {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.92rem;
    height: 0.93rem;
  }

  .info {
    text-align: left;
    width: 63%;
  }

  .info h2 {
    font-size: 0.28rem;
    color: #4B4F63;
    padding: 0.05rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info p {
    font-size: 0.24rem;
    color: #666A7F;
    line-height: 0.37rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  li {
    padding-bottom: 0.3rem;
  }

  .more {
    /*padding: 0.27rem 0;*/
    /*text-align: center;*/
    /*background: #fff;*/
    line-height: 0.4rem;
    font-size: 0.24rem;
    color: #818C9E;
    /*margin-left: 0.2rem;*/
    /*border-top: 1px solid #ddd;*/
  }

  .more .icon {
    display: inline-block;
    width: 0.13rem;
    height: 0.18rem;
    background: url(/bocm/platformjs/static/image/syweal/icon-xia.png) no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
    /*vertical-align: middle;*/
  }

  .line {
    width: 100%;
    height: 0.2rem;
    background-color: #f4f6f5;
  }

  .gyact .img {
    width: 2.24rem;
    height: 2.24rem;
    position: relative;
    overflow: hidden;
  }
  .gyact .img img:first-child{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width:auto;
    min-height:2.24rem;
  }

  .gyact .info h2 {
    padding-top: 0.38rem;
  }

  .org {
    background: #fff;
  }

  .org li {
    width: 25%;
  }

  .org .img {
    width: 1.28rem;
    height: 1.28rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 0.2rem;
  }

  .org .img img {
    width: 100%;
    height: 100%;
  }

  .org li p {
    width: 1.3rem;
    line-height: 0.4rem;
    font-size: 0.26rem;
    color: #4B4F63;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
