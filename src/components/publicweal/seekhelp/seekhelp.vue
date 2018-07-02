<template>
  <div id='detail' @click="getBodyss()">
    <div v-title="'项目详情'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="seekhelp" v-if="isAll">
          <sy_share v-if="is_Share" @click.native="is_Share=false"></sy_share>
          <!--下载-->
          <sy-download v-if="is_download"></sy-download>
          <!--banner-->
          <div class="header">
            <!--轮播图-->
            <div class="swiper-container" ref="head" v-if="project_image_urls.length > 1">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in project_image_urls">
                  <img :src="item" alt="banner加载中...">
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination seekhelp-buller"></div>
            </div>
            <!--一张图-->
            <img v-lazy="project_image_urls[0]" alt="banner加载中..." v-if="project_image_urls.length == 1"
                 class="bannerImg">
          </div>
          <!--募捐进度-->
          <div class="seekhelpInfo">
            <!--标题-->
            <div class="seekhelp-title">
              <span>{{project_mode}}&nbsp;&nbsp;|&nbsp;&nbsp;{{project_name}}</span>
            </div>
            <!--进度条-->
            <div class="seekhelp-progress">
              <div class="deepLine"></div>
              <!--<div class="topLine" :style="{width:progressNum}">-->
              <div class="topLine" :style="{width:progressNum}">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-redxin.png'" alt="红心">
                <span>{{progressNumFont}}</span>
              </div>
            </div>
            <!--捐款信息-->
            <div class="seekhelp-money">
              <ul class="clearfix">
                <li class="fl">
                  <div class="con">
                    <p class="p1">{{target_money}}</p>
                    <p class="p2">项目筹款/元</p>
                  </div>
                </li>
                <li class="fl">
                  <div class="con">
                    <p class="p1">{{finished_money}}</p>
                    <p class="p2">已筹款/元 </p>
                  </div>
                </li>
                <li class="fl">
                  <div class="con">
                    <p class="p1">{{person_time}}</p>
                    <p class="p2">捐款人次/次</p>
                  </div>
                </li>
              </ul>
              <div class="seekhelp-other">
                <h2>发起方：{{provider}}</h2>
                <p class="p1" v-if="cont.project_code">项目备案编号：{{cont.project_code}}</p>
                <p class="p1">{{project_intro}}</p>
                <p class="p2" v-if="project_mode=='公益众筹'?false:true"><img
                    :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-tip.png'" alt="">个人求助项目的真实性由发起方负责
                </p>
              </div>
            </div>

          </div>
          <!--tab切换-->
          <div class="seekhelpTab">
            <div class="link"></div>
            <ul class="clearfix">
              <li class="fl" @click="tabswich('a')">
                <div :class="type == 'detail'?'sel':''">项目详情</div>
              </li>
              <li class="fl" @click="tabswich('b')">
                <div :class="type == 'dynamics'?'sel':''">{{ iszhongchou == true ? '众筹动态' : '项目动态'}}
                  <span v-if="trend_count">{{person_time}}</span>
                </div>
              </li>
              <li class="fl" @click="tabswich('c')">
                <div :class="type == 'progress'?'sel':''">
                  进展汇报<span v-if="report_count">{{report_count}}</span>
                </div>
              </li>
            </ul>
          </div>
          <!--tab内容-->
          <div class="tabContent">
            <!--项目详情-->
            <div v-if="detail">
              <div class="project-detail" v-if="!iszhongchou">
                <!--开始/截止时间-->
                <div class="detail-time clearfix">
                  <div class="item fl">
                    <p class="p1">{{project_starttime}}</p>
                    <p class="p2">开始时间</p>
                  </div>
                  <div class="item2">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-line.png'" alt="">
                  </div>
                  <div class="item fr">
                    <p class="p1">{{project_endtime}}</p>
                    <p class="p2">截止时间</p>
                  </div>
                </div>
                <!--募捐内容-->
                <div class="detail-content" v-html="project_content">
                  <!--<div v-html="project_content"></div>-->
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--募捐目的-->
                <div class="detail-objective" v-if="project_purpose">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>募捐目的</p>
                  </div>
                  <p v-html="project_purpose"></p>
                </div>
                <!--受益人-->
                <div class="detail-beneficiary" v-if="project_beneficiary_info">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>受益人</p>
                  </div>
                  <p v-html="project_beneficiary_info"></p>
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--募得款项用途-->
                <div class="detail-purpose" v-if="project_fund_use">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>募得款项用途</p>
                  </div>
                  <p v-html="project_fund_use"></p>
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--剩余财产处理方案-->
                <div class="detail-plan" v-if="project_residual_disposal">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>剩余财产处理方案</p>
                  </div>
                  <p v-html="project_residual_disposal"></p>
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--捐赠发票索取-->
                <div class="detail-invoice" v-if="project_mode=='慈善募捐'?true:false">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>捐赠发票索取</p>
                  </div>
                  <p>根据民政部《慈善组织互联网公开募捐信息平台基本管理规范》MZ/T 088-2017 规定，个人求助项目不属于慈善募捐，其信息的真实性由信息提供方负责。
                    您的捐赠记录平台将会永久保留，但无法为您提供捐赠发票。
                    您的捐赠是自愿且自由的，感谢您的参与。</p>
                </div>
                <!--温馨提示-->
                <div class="detail-tips" v-if="project_mode=='慈善募捐'?true:false">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>温馨提示</p>
                  </div>
                  <p>一起善源仅提供公益平台服务，您捐赠的善款将直接存入发起方的帐户，不会进入一起善源帐户。
                    您的慈善捐款退款同样也不能由一起善源平台直接退回。</p>
                </div>
              </div>
              <div class="project-detail" v-if="iszhongchou">
                <!--开始/截止时间-->
                <div class="detail-time clearfix">
                  <div class="item fl">
                    <p class="p1">{{project_starttime}}</p>
                    <p class="p2">开始时间</p>
                  </div>
                  <div class="item2">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-line.png'" alt="">
                  </div>
                  <div class="item fr">
                    <p class="p1">{{project_endtime}}</p>
                    <p class="p2">截止时间</p>
                  </div>
                </div>
                <!--项目详情-->
                <div class="detail-content" v-html="project_content">
                  <!--<div v-html="project_content"></div>-->
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--募捐目的-->
                <div class="detail-objective" v-if="project_purpose">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>募捐目的</p>
                  </div>
                  <p v-html="project_purpose"></p>
                </div>
                <!--募得款项用途-->
                <div class="detail-purpose" v-if="project_fund_use">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>募得款项用途</p>
                  </div>
                  <p v-html="project_fund_use"></p>
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--受益人-->
                <div class="detail-beneficiary" v-if="project_beneficiary_info">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>受益人</p>
                  </div>
                  <p v-html="project_beneficiary_info"></p>
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--支持方式-->
                <div class="detail-purpose" v-if="support_list.length">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>支持方式</p>
                  </div>
                  <div>
                    <div class="clearfix" v-for="item in support_list"
                         :class="item.support_number_left_str ==='名额已满'?'ration-list':''">

                      <div class="list-content">
                        <div class="list-top clearfix">
                          <div class="list-top-l fl">
                            <img :src="item.support_thanks_img_url" alt="" class="list-top-l-img fl">
                            <p class="list-top-l-p font30 fl">{{item.support_title}} <span class="list-top-l-span-span">{{item.support_money}}</span>
                              元</p>
                          </div>
                          <div class="list-top-r fr">
                            <img src="/bocm/platformjs/static/image/pubration/avatar-2.png" alt=""
                                 class="list-top-r-img fl">
                            <p class="list-top-r-p fl" style="font-size: 0.24rem">{{item.support_number_left_str}}</p>
                          </div>
                        </div>
                        <div class="list-bottom">
                          <p style="font-size: 0.28rem">{{item.support_return}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--剩余财产处理方案-->
                <div class="detail-plan" v-if="project_residual_disposal">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>剩余财产处理方案</p>
                  </div>
                  <p v-html="project_residual_disposal"></p>
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--项目负责人联系方式-->
                <div class="detail-plan" v-if="cont.leader_mobile">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>项目负责人联系方式</p>
                  </div>
                  <p v-html="cont.leader_mobile"></p>
                  <!--<div class="img">-->
                  <!--<img src="" alt="">-->
                  <!--</div>-->
                </div>
                <!--温馨提示-->
                <div class="detail-tips">
                  <div class="detail-tit">
                    <p style="font-size: 0.30rem;color: #4B4F63;text-align: left;padding: 0.34rem 0 0.18rem;font-weight: 500;line-height: 0;">
                      <span></span>温馨提示 <a class="fr inform2" @click="inform">举报该项目</a></p>
                  </div>
                  <p>该项目不属于慈善公开募捐信息，真实性由信息发布人负责，提醒您了解项目后再帮助Ta</p>
                </div>
              </div>
            </div>
            <!--项目动态-->
            <div class="project-dynamics" v-if="dynamics">
              <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText"
                           :bottom-pull-text="bottomPullText" :bottom-method="loadBottom"
                           :bottom-all-loaded="bottomAllLoaded"
                           :auto-fill="false" ref="loadmore" v-if="isdynamicsList || isselfList">
                <!--自己的-->
                <div class="dynamics-slef clearfix" v-if="isselfList">
                  <div class="photo fl">
                    <img v-lazy="selfPhoto" alt="头像">
                  </div>
                  <div class="dynamics-list fl">
                    <div class="item" v-for="item in selfList" @click="goSelf">
                      <span class="time">{{item.payment_time}}</span>
                      <span class="id">{{item.buyer_name}}</span>
                      <span class="spport">{{item.isanonymous == nimingNum ? nimingFont : ""}}支持了<span
                          class="red">{{item.money}}</span>元</span>
                      <span class="img fr"><img
                          :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-arw.png'"
                          alt="箭头"></span>
                    </div>
                  </div>
                </div>
                <!--其他人的-->
                <div class="dynamics-other" v-if="isdynamicsList">
                  <div class="item" v-for="item in dynamicsList">
                    <div class="photo fl">
                      <img v-lazy="item.face_img" alt="头像">
                    </div>
                    <div class="con">
                      <p class="clearfix"><span class="name fl">{{item.buyer_name}}</span><span class="mon fr">捐赠<span
                          class="red">{{item.money}}</span>元</span></p>
                      <p class="time">{{item.payment_time}}</p>
                    </div>
                  </div>
                </div>
              </mt-loadmore>
              <div class="dataNone" v-if="isNone">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-none.png'" alt="暂无数据">
                <p>暂无动态</p>
              </div>
            </div>
            <!--进展汇报-->
            <div class="project-report" v-if="report">
              <div v-if="isHave">
                <div class="release" v-for="item in allList">
                  <!--标题-->
                  <div class="report-title">
                    <span class="quan"></span>
                    <span :class="item.is_begin_report || item.is_end_report?'blue':'black'">{{item.type_str}}</span>
                  </div>
                  <!--内容-->
                  <div class="report-info">
                    <p v-html="item.title"></p>
                    <p class="lorem" v-html="item.content"></p>
                    <div class="result" v-if="item.is_end_report">
                      <div class="aixin">
                    <span><img class="img1"
                               :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-xin.png'"
                               alt="爱心"></span>{{item.person_time}}份爱心
                      </div>
                      <div class="kuan">
                      <span><img class="img2"
                                 :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-money.png'"
                                 alt="￥"></span>
                        款项￥{{item.finished_money}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dataNone" v-if="isno">
                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-none.png'" alt="暂无动态">
                <p>暂无进展</p>
              </div>
            </div>
          </div>
          <div class="footlink iphonex-margin-bottom">一起善源 爱 · 源于善</div>
          <div style="width: 100%;height: 1rem;"></div>
          <div class="footer phonex-footer-h iphonex-padding-bottom">
            <div class="footerCon clearfix">
              <div class="fl" style="width:28%;padding:0 .16rem;">
                <div class="zx fl" @click.stop="callservice">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-kefu.png'" alt="客服">
                  <p>咨询</p>
                </div>
                <div class="zx fl" @click.stop="share_detail">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/share_2.png'" alt="客服">
                  <p>分享</p>
                </div>
              </div>
              <div class="cy fr" @click="getAttend()" ref="button">{{attend}}</div>
              <!--<div v-if="is_btnShare == true" class="cy fr" @click="shareGetAttend()" ref="button">{{attend}}</div>-->
            </div>
            <div class="list iphonex-margin-bottom" v-if="isService">
              <a @click="getMobile($event)">联系发起方</a>
              <a @click="getTel($event)">电话客服</a>
              <!--<p @click="getService">在线客服</p>-->
            </div>
          </div>
          <!--分享-->
          <!--<div class="project-share iphonex-publicwel-bottom">-->
            <!--<div class="share" @click="share_detail()">-->
              <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-share.png'" alt="分享">-->
            <!--</div>-->
            <!--<div class="report" @click="tipshows()" v-if="false">-->
              <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-report.png'" alt="举报">-->
            <!--</div>-->
          <!--</div>-->
          <!--举报弹框-->
          <!--<div class="mark" v-if="tipShow">-->
            <!--<div class="markCon">-->
              <!--<div class="mark-tit">-->
                <!--举报项目-->
              <!--</div>-->
              <!--<div class="mark-select">-->
                <!--<div class="item" v-for="(item,index) in selArr" @click="selectImg(index)">-->
                  <!--<span :class="{sel:nowIndex == index}"></span>{{item.info}}-->
                  <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/agree.png'" alt="对勾"-->
                       <!--v-if="nowIndex == index">-->
                <!--</div>-->
                <!--<textarea placeholder="请填写举报内容，不少于10个汉字" v-model="descriptions" maxlength="500"></textarea>-->
              <!--</div>-->
              <!--<div class="mark-btn">-->
                <!--<button type="button" @click="tipOff">举报</button>-->
              <!--</div>-->
              <!--<div class="mark-close" @click="tipclose()">-->
                <!--<img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywelfare/icon-close.png'" alt="关闭">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  import share_img from '@/components/common/shared_img.vue'
  import share_top from '@/components/common/download_app.vue'
  import Swiper from '../../../../static/js/swiper-3.4.2.min'
  import wx_share from '@/assets/js/share'

  export default{
    data () {
      return {
        nimingNum: '1',
        nimingFont: '匿名',
        isAll: true,
        is_download: false,
        is_Share: false,
//        is_btnShare:false,
        isLoading: true,
        type: 'detail',
        detail: true,
        dynamics: false,
        report: false,
        tipShow: false,
        project_image_urls: [],
        project_mode: '',
        provider: '',
        project_name: '',
        project_intro: '',
        target_money: '',
        finished_money: '',
        person_time: '',
        progressNum: '',//进度
        progressNumFont: '',//进度文字
        project_starttime: '',
        project_endtime: '',
        project_mobile: '',
        project_content: '',
        project_purpose: '',
        project_beneficiary_info: '',
        project_fund_use: '',
        project_residual_disposal: '',
        trend_count: '',
        report_count: '',
        selArr: [
          {info: '项目描述不实'},
          {info: '项目汇报不实'},
          {info: '资金用途违规'},
          {info: '其他'}
        ],
        nowIndex: 0,
        descriptions: '',
        isService: false,
        bottomAllLoaded: false, // 是否可以上拉属性
        bottomPullText: '', // 下拉加载的文字
        curpage: 2,// 当前分页
        bottomDistance: 0,// 触发上拉距离
        bottomDropText: '',
        dynamicsList: [],
        reportList: [],
        selfList: [],
        isdynamicsList: true,
        isselfList: true,
        selfPhoto: '',
        isNone: false,
        isno: false,
        isHave: true,
        attend: '立即参与',
        project_process_status: '',
        allList: [],
        project_name: '',// 项目名称
        codeUnit: '',// 是否在联盟内
        public_project_id: '', // 项目id
        iszhongchou: false,
        support_list: [],  // 支持方式
        cont: {}
      }
    },
    created () {
      this.getDetail()
      if (this.$route.query.is_share == 'yes') {
        this.is_download = true
      }
      if (this.$route.query.tab_index == 3) {
        this.type = 'progress';
        this.tabswich('c')
      }
    },
    mounted () {
//      this.getInit()
    },
    components: {
      loading,
      'sy_share': share_img,
      'sy-download': share_top
    },
    methods: {
      addPercent(a, b){
        function remove(str) {
          if (!str) {
            return '0';
          } else {
            return (str + '').split(',').join('')
          }
        }

        let tmp, result;
        if (remove(b) == 0) {
          result = 0
        } else {
          tmp = remove(a) / remove(b)
          result = tmp * 100
        }
        return result;
      },
      getDetail(){
//        获取项目id
        this.public_project_id = this.$route.query.project_id
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=project_detail&public_project_id=' + this.public_project_id).then(res => {

          if (res.data.code == 400) {
            this.isAll = false
            this._appjs.syJsbAlert(res.data.message)
          } else if (res.data.code == 200) {
            this.isAll = true
          }
          this.codeUnit = res.data.code
//          else if(res.data.code == 403){
//            this.isAll = true
//            this.is_btnShare = true
//          }
          this.isLoading = false
          let a = res.data.content
          this.cont = res.data.content
          this.project_image_urls = a.project_image_urls // banner图片路径
          this.project_name = a.project_name // 项目名称
          this.project_mode = a.project_mode // 项目分类
          this.target_money = a.target_money // 项目筹款
          this.finished_money = a.finished_money // 已筹款
          this.person_time = a.person_time // 捐款人次
          this.project_starttime = a.project_starttime // 开始时间
          this.project_endtime = a.project_endtime // 结束时间
          this.project_mobile = a.project_mobile // 咨询电话
          this.project_content = a.project_content // 项目详情
          this.project_intro = a.project_intro // 项目简介
          this.project_purpose = a.project_purpose // 募捐目的
          this.project_beneficiary_info = a.project_beneficiary_info // 受益人
          this.project_fund_use = a.project_fund_use // 款项用途
          this.project_residual_disposal = a.project_residual_disposal // 剩余财产处理
          this.trend_count = a.trend_count //项目动态值
          this.report_count = a.report_count //进展汇报值
          this.provider = a.provider //主办方
          this.project_name = a.project_name
          this.iszhongchou = a.project_mode === '公益众筹'
          this.support_list = a.support_list;
          document.title = this.project_name
//          this._appjs.syJsbShowTitleBar('true')
          this._appjs.syJsbSetTitleText(this.project_name)

//          参加按钮
          this.project_process_status = a.project_process_status
          if (this.project_process_status == '已完成') {
            this.attend = '爱心已注满'
            this.$refs.button.style.background = '#DADEE4'
          } else if (this.project_process_status == '已结束' || this.project_process_status == '失败') {
            this.attend = '项目已结束'
            this.$refs.button.style.background = '#DADEE4'
          } else {
            this.attend = '立即参与'
            this.$refs.button.style.background = ' #4A90E2'
          }

//          微信二次分享
          setTimeout(()=>{
            let logo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png'//banner第一张图
            let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=pubwel_router&op=pubwel_detail&project_id=' + this.public_project_id + '&is_share=yes';
            let shareText = this.project_intro
            let shareTitle = this.project_name
            let shareLogo = this.project_image_urls[0] ? this.project_image_urls[0] : logo
            let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo}
            wx_share(params)
          },10)

          return a
        }).then(a => {
          this.$nextTick(() => {
            new Swiper(this.$refs.head, {
              paginationClickable: true,
              autoplay: 3000,
              observer: true,
              observeParents: true,
              loop: true,
              pagination: '.swiper-pagination',
              paginationType: 'bullets'
            })

//            处理捐赠数据格式
            setTimeout(()=>{

              let number = this.addPercent(a.finished_money, a.target_money)
              this.progressNum = (a.percent || parseInt(number)) + '%'
              if (number == 0) {
                this.progressNumFont = '爱心'
              } else if (number >= 100) {
                if (a.project_mode === '公益众筹' && a.support_type == 2) {
                  this.progressNumFont = this.progressNum
                } else {
                  this.progressNumFont = '完成'
                }
                this.progressNum = '100%'
              } else if (number <= 1 && number > 0) {
                this.progressNumFont = '1%'
                this.progressNum = '1%'
              } else {
                this.progressNumFont = this.progressNum
              }
              if (a.project_process_status === '已结束') {
                this.progressNumFont = '结束'
              }
            }, 0)
          })
        })
      },
      getDynamics(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=project_trend&public_project_id=' + this.public_project_id).then(res => {
          if (res.data.code == 400) {
            this.isNone = true
            this.isdynamicsList = false
            this.isselfList = false
          } else if (res.data.code == 200) {
            this.dynamicsList = res.data.content.trend  //其他人捐款信息
            this.selfList = res.data.content.my_trend  //我的捐款信息
            if (res.data.content.trend.length == 0 && res.data.content.my_trend.length == 0) {
//              没有数据的时候显示空白页
              this.isNone = true
              this.isdynamicsList = false
              this.isselfList = false
              this.selfPhoto = ''
            } else if (res.data.content.trend.length == 0) {
//              其他人的数据没有的时候不显示
              this.isdynamicsList = false
              this.isselfList = true
              this.isNone = false
              this.selfPhoto = res.data.content.my_trend[0].face_img
            } else if (res.data.content.my_trend.length == 0) {
//              自己的数据没有的时候不显示
              this.isdynamicsList = true
              this.isselfList = false
              this.isNone = false
              this.selfPhoto = ''
            } else {
              this.selfPhoto = res.data.content.my_trend[0].face_img
              this.isNone = false
            }
          }
        })
      },
      getReport(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=project_report&public_project_id=' + this.public_project_id).then(res => {
          if (res.data.code == 200) {
            this.allList = res.data.content.list
          } else if (res.data.code == 400) {
            this.isno = true
            this.isHave = false
          }
        })
      },
      getInit(){
        var seekhelpTab = document.getElementsByClassName('seekhelpTab')[0]
        var seekhelpTabHeight = seekhelpTab.offsetTop
        var tabContent = document.getElementsByClassName('tabContent')[0]
        window.onscroll = function () {
          if (window.scrollY > seekhelpTabHeight) {
            seekhelpTab.style.position = 'fixed'
            seekhelpTab.style.top = '0'
            tabContent.style.marginTop = '0.87rem'
          } else {
            seekhelpTab.style.position = 'relative'
            tabContent.style.marginTop = '0'
          }
        }
      },
      tabswich(tab){
        switch (tab) {
          case 'a':
            this.type = 'detail'
            this.detail = true
            this.report = false
            this.dynamics = false
            break
          case 'b':
            this.type = 'dynamics'
            this.detail = false
            this.report = false
            this.dynamics = true
            this.getDynamics()
            break
          case 'c':
            this.type = 'progress'
            this.detail = false
            this.report = true
            this.dynamics = false
            this.getReport()
            break
          default:
            this.type = 'detail'
            this.detail = true
            this.report = false
            this.dynamics = false
        }
      },
      tipshows(){
        this.tipShow = true
      },
      tipclose(){
        this.tipShow = false
      },
      selectImg(index){
        this.nowIndex = index
      },
      callservice(){
        this.isService = !this.isService
      },
      loadBottom () {
        if (this.bottomAllLoaded) {
//          固定方法 查询完固定一次
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=project_trend&public_project_id=' + this.public_project_id + '&curpage=' + this.curpage).then(res => {
          this.curpage++
          if (res.data.code === 400) {
            this.bottomAllLoaded = true
            this.$refs.loadmore.onBottomLoaded()
            return
          }
          this.dynamicsList = this.dynamicsList.concat(res.data.content.trend)
          this.$refs.loadmore.onBottomLoaded()
        })
      },
      getAttend(){
        let is_share = this.$route.query.is_share
        this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=is_login').then(res => {
          if (res.data.code == 200 && this.project_process_status == '进行中') {
            if (this.codeUnit == '403') {
              this.$toast('您不在该项目的参与范围内')
            } else {
              // 公益众筹 定制捐赠
              if (this.iszhongchou && this.cont.support_type == 2) {
                let url = this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=ration_pays&public_project_id=' + this.public_project_id + '&is_share=' + is_share
                this._appjs.syJsbLaunchWebview(url)
              } else {
                let url = this.siteInfo.host + '/mobile/index.php?act=syproject&op=project_money_pay&public_project_id=' + this.public_project_id
                this._appjs.syJsbLaunchWebview(url)
              }


            }
          } else if (res.data.code == 402 && this.project_process_status == '进行中') {
            var callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_detail&project_id=' + this.public_project_id + '&is_share=' + is_share);
            window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
          }
        })
      },
//      shareGetAttend(){
//        this.$toast('感谢您对公益的关注，请下载一起善源参与更多项目')
//      },
      tipOff(){
        var qs = require('querystring')
        if (this.nowIndex == 3 && this.descriptions == '') {
          this._appjs.syJsbAlert('请填写举报理由')
        } else if (this.nowIndex == 3 && this.descriptions.trim().length < 10) {
          this._appjs.syJsbAlert('举报理由不能少于10个字')
        } else {
          this.$http.post(this.siteInfo.host + '/api/index.php?act=pubwel&op=inform_project', qs.stringify({
            'inform_subject_content': this.nowIndex,
            'inform_content': this.descriptions,
            'public_project_id': this.public_project_id
          })).then(res => {
            if (res.data.code == 401) {
              this._appjs.syJsbAlert(res.data.message)
            } else if (res.data.code == 402) {
              this._appjs.syJsbAlert(res.data.message)
            } else if (res.data.code == 200) {
              this.tipclose()
            }
          })
        }

      },
      getTel(e){
        if (this.$route.query.is_share == 'yes') {
          e.target.href = 'tel:' + '4006667308'
        } else {
          this._appjs.syJsbCallPhone('4006667308')
        }
      },
      getMobile(e){
        if (this.$route.query.is_share == 'yes') {
          e.target.href = 'tel:' + this.project_mobile
        } else {
          this._appjs.syJsbCallPhone(this.project_mobile)
        }
      },
      share_detail(){
        let is_share = this.$route.query.is_share
        if (is_share == 'yes') {
          this.is_Share = true
        } else {
          this.share()
          this.is_download = false
        }
      },
      // 举报
      inform(){
        let is_share = this.$route.query.is_share
        this.$http.get(this.siteInfo.host + '/api/index.php?act=volunteer&op=is_realname_auth').then(res => {
          if (res.data.code == 200) {
            this.$http.get(this.siteInfo.host + '/api/index.php?act=pubwel&op=has_informed&public_project_id=' + this.public_project_id).then(res => {
              if (res && res.data && res.data.code == 200) {
                if (res.data.content.has_informed == 1) {
                  this.$toast('您已举报过该项目')
                } else {
//                  if(is_share == 'yes'){
//                    console.log(1111)
//                    let url = this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=ration_report&public_project_id=' + this.public_project_id + '&is_share=' + is_share
//                    window.open(url)
//                  }else {
                    this._appjs.syJsbLaunchWebview(this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=ration_report&public_project_id=' + this.public_project_id + '&is_share=' + is_share)
//                  }
                }
              } else {
                console.log(res && res.data && res.data.message)
              }
            })
            localStorage.setItem('truename', res.data.content.truename);
            localStorage.setItem('id_value', res.data.content.id_value);
          } else if (res.data.code == 403) {
            let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_detail&project_id=' + this.public_project_id + '&is_share=' + is_share);
            window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
          }
        })

      },
      share(){
        let logo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png'
        let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=pubwel_router&op=pubwel_detail&project_id=' + this.public_project_id + '&is_share=yes'; //banner第一张图
        let shareText = this.project_intro
        let shareTitle = this.project_name
        let shareLogo = this.project_image_urls[0] ? this.project_image_urls[0] : logo
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
        let jsonParam = JSON.stringify(params);
        this._appjs.syJsbShare(jsonParam, shareText, shareUrl);
      },
      goSelf(){
        let url = this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_orderlist'
        window.location.href = url
      },
      // 下载app
      linkToDownload(){
        window.location.href = this.siteInfo.host + '/boc/index.php'
      },
      getBodyss(){
        this.isService = false
      }
    }
  }
</script>
<style>
  /*.ani{*/
  /*transition: width 1s;*/
  /*}*/
  .seekhelp-buller .swiper-pagination-bullet {
    height: 0.1rem;
    width: 0.1rem;
    background: #C8DDF5;
  }

  .seekhelp-buller .swiper-pagination-bullet-active {
    width: 0.3rem;
    height: 0.1rem;
    background-image: linear-gradient(0deg, #3993FC 0%, #67A9F7 100%);
    border-radius: 0.1rem;
    vertical-align: middle;
  }

  .detail-content {
    font-size: 0.3rem;
    color: #666A7F;
    line-height: 0.46rem;
    font-weight: 300;
    text-align: justify;
    word-break: break-all;
  }

  .detail-content p,
  .detail-objective p,
  .detail-beneficiary p,
  .detail-purpose p,
  .detail-plan p,
  .detail-invoice p,
  .detail-tips p {
    font-size: 0.3rem;
    color: #666A7F;
    line-height: 0.46rem;
    font-weight: 300;
    text-align: justify;
    word-break: break-all;
  }

  .detail-content img,
  .detail-beneficiary img,
  .detail-purpose img,
  .detail-plan img {
    display: block;
    width: 6.9rem;
    margin: 0.24rem 0 0.18rem;
  }

  .report-info .lorem {
    margin-top: 0.15rem;
    font-size: 0.24rem;
  }

  .report-info .lorem img {
    display: block;
    width: 6.3rem;
    /*height: 2rem;*/
    margin-top: 0.2rem;
    /*margin-left: 0.48rem;*/
  }

  .report-info .img img {
    width: 100%;
    height: 100%;
  }

  .report-info .result {
    margin-top: 0.15rem;
    margin-left: 0.48rem;
  }

  .report-info .result div {
    display: inline-block;
    margin-right: 0.8rem;
    font-size: 0.24rem;
    color: #666A7F;
    font-weight: 300;
  }

  .report-info .result .img1 {
    width: 0.28rem;
    height: 0.24rem;
    margin-right: 0.12rem;
    vertical-align: text-top;
  }

  .report-info .result .img2 {
    width: 0.26rem;
    height: 0.26rem;
    margin-right: 0.12rem;
    vertical-align: text-top;
  }

</style>
<style lang="scss" scoped>
  $bg: red;
  div {
    box-sizing: border-box;
  }

  .dataNone {
    padding: 1rem 0;
    text-align: center;
  }

  .dataNone img {
    width: 2.4rem;
    height: 2.2rem;
    margin-bottom: 0.65rem;
  }

  .dataNone p {
    font-size: 0.32rem;
    color: #B1B8C4;
    font-weight: 300;
  }

  .seekhelp {
    /*margin-bottom: 1rem;*/
  }

  .header {
    width: 7.5rem;
    height: 7.5rem;
    position: relative;
    overflow: hidden;
  }

  .header img {
    width: 100%;
    min-height: 7.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .header .swiper-container {
    height: 100%;
    width: 100%;
  }

  .seekhelpInfo {
    padding: 0.2rem 0.3rem 0.3rem;
    background: #fff;
    overflow: hidden;
  }

  .seekhelpInfo .seekhelp-title {
    font-size: 0.34rem;
    color: #4B4F63;
    line-height: 0.5rem;
    text-align: left;
    font-weight: 300;
  }

  .seekhelpInfo .seekhelp-title span {
    font-weight: 300;
  }

  .seekhelp-progress {
    padding: 0.56rem 0 0.65rem;
    position: relative;
  }

  .seekhelp-progress .deepLine {
    position: absolute;
    top: 0.56rem;
    left: 0;
    width: 6.9rem;
    height: 0.12rem;
    background: #EBF4FF;
    -webkit-border-radius: 0.12rem;
    -moz-border-radius: 0.12rem;
    border-radius: 0.12rem;
  }

  .seekhelp-progress .topLine {
    padding: 0 0.15rem;
    position: absolute;
    top: 0.56rem;
    left: 0;
    width: 0;
    height: 0.12rem;
    background-image: linear-gradient(-90deg, #00ECBC 0%, #4A90E2 100%);
    -webkit-border-radius: 0.12rem;
    -moz-border-radius: 0.12rem;
    border-radius: 0.12rem;
  }

  .seekhelp-progress .topLine img {
    height: 0.92rem;
    width: 1rem;
    position: absolute;
    right: -0.4rem;
    top: -0.4rem;
  }

  .seekhelp-progress .topLine span {
    position: absolute;
    right: -0.15rem;
    top: -0.08rem;
    font-size: 0.22rem;
    color: #FFFFFF;
    font-weight: 300;
    display: inline-block;
    width: 0.5rem;
    text-align: center;
  }

  .seekhelp-money li {
    text-align: left;
    padding-bottom: 0.39rem;
    width: 33%;
  }

  .seekhelp-money li:last-child {
    text-align: right;
    width: 30%;
  }

  .seekhelp-money li .con {
    border-right: 1px solid #DADEE4;
  }

  .seekhelp-money li:nth-child(2) {
    width: 37%;
  }

  .seekhelp-money li:nth-child(2) > .con {
    padding-left: 0.35rem;
  }

  .seekhelp-money li:last-child > .con {
    border: none;
  }

  .seekhelp-money li .p1 {
    font-size: 0.36rem;
    color: #4A90E2;
    line-height: 0.3rem;
  }

  .seekhelp-money li .p2 {
    font-size: 0.26rem;
    color: #666A7F;
    line-height: 0.26rem;
    padding-top: 0.14rem;
  }

  .seekhelp-other {
    width: 100%;
    padding: 0.12rem 0.2rem 0.19rem;
    text-align: left;
    border: 1px dashed #4A90E2;
    -webkit-border-radius: 0.08rem;
    -moz-border-radius: 0.08rem;
    border-radius: 0.08rem;
  }

  .seekhelp-other h2 {
    font-size: 0.26rem;
    color: #818C9E;
    line-height: 0.4rem;
    font-weight: 300;
  }

  .seekhelp-other .p1 {
    font-size: 0.26rem;
    line-height: 0.4rem;
    color: #B1B8C4;
    font-weight: 300;
    word-break: break-all;
    text-align: justify;
  }

  .seekhelp-other .p2 {
    padding-top: 0.1rem;
    line-height: 0.3rem;
    font-size: 0.24rem;
    color: #B1B8C4;
  }

  .seekhelp-other .p2 img {
    width: 0.27rem;
    height: 0.27rem;
    vertical-align: sub;
    margin-right: 0.1rem;
  }

  .seekhelpTab {
    width: 100%;
    background-color: #fff;
    position: relative;
    z-index: 90;
  }

  .seekhelpTab .link {
    width: 100%;
    height: 0.2rem;
    background-color: #f4f6f5;
  }

  .seekhelpTab ul {
    width: 100%;
    height: 0.87rem;
    border-bottom: 1px solid #DADEE4;
  }

  .seekhelpTab ul li {
    width: 33.3%;
    height: 0.87rem;
    line-height: 0.87rem;
    font-size: 0.3rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .seekhelpTab ul li span {
    background: #F5F5F5;
    border-radius: 0.5rem;
    margin-left: 0.07rem;
    font-size: 0.24rem;
    color: #4A90E2;
    line-height: 0.24rem;
    padding: 0 0.15rem;
  }

  .seekhelpTab ul li div {
    display: inline-block;
    box-sizing: content-box;
    height: 0.85rem;
    padding: 0 0.15rem;
    text-align: center;
    font-weight: 300;
  }

  .seekhelpTab .sel {
    border-bottom: 2px solid #4A90E2;
    color: #4A90E2;
    font-weight: 500;
  }

  .tabContent {
    background-color: #fff;
  }

  .project-detail {
    padding: 0.3rem;
  }

  .project-detail .detail-time {
    position: relative;
    padding-bottom: 0.23rem;
    text-align: left;
  }

  .detail-time .item {
    display: inline-block;
    /*padding: 0 0.6rem;*/
    text-align: center;
    width: 50%;
  }

  .detail-time .item2 {
    width: 0.75rem;
    height: 0.56rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .detail-time .item2 img {
    width: 100%;
    height: 100%;
  }

  .detail-time .item .p1 {
    font-size: 0.3rem;
    color: #4B4F63;
  }

  .detail-time .item .p2 {
    font-size: 0.24rem;
    color: #666A7F;
    padding-top: 0.1rem;
  }

  /*.detail-content p,*/
  /*.detail-objective p,*/
  /*.detail-beneficiary p,*/
  /*.detail-purpose p,*/
  /*.detail-plan p,*/
  /*.detail-invoice p,*/
  /*.detail-tips p {*/
  /*font-size: 0.3rem;*/
  /*color: #666A7F;*/
  /*line-height: 0.46rem;*/
  /*font-weight: 300;*/
  /*text-align: justify;*/
  /*}*/

  /*.detail-content img,*/
  /*.detail-beneficiary img,*/
  /*.detail-purpose img,*/
  /*.detail-plan img {*/
  /*display: block !important;*/
  /*width: 6.9rem !important;*/
  /*height: 3rem !important;*/
  /*margin: 0.24rem 0 0.18rem !important;*/
  /*}*/

  .detail-tit p span {
    display: inline-block;
    height: 0.4rem;
    width: 0.06rem;
    background-color: #F8E71C;
    box-shadow: 0 0 16px 0 #F0D35B;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    vertical-align: sub;
    margin-right: 0.1rem;
  }

  .project-dynamics {
    padding: 0.4rem 0 0 0.3rem;
    background-color: #fff;
  }

  .project-dynamics .dynamics-slef {
    border-bottom: 1px solid #DADEE4;
    padding-bottom: 0.3rem;
  }

  .project-dynamics .photo {
    width: 0.7rem;
    height: 0.7rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
  }

  .project-dynamics .photo img {
    width: 100%;
    height: 100%;
  }

  .project-dynamics .dynamics-list {
    margin-top: 0.1rem;
    margin-left: 0.2rem;
    font-size: 0.26rem;
    font-weight: 300;
    width: 87%;
  }

  .dynamics-list .item {
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: left;
  }

  .dynamics-list .item .time {
    color: #B1B8C4;
    text-align: left;
    display: inline-block;
    width: 2.18rem;
  }

  .dynamics-list .item .id {
    color: #4B4F63;
    padding-right: 0.2rem;
  }

  .dynamics-list .item .spport {
    color: #818C9E;
  }

  .red {
    color: red;
    padding: 0 0.1rem;
  }

  .dynamics-list .item .img {
    display: inline-block;
    width: 0.12rem;
    height: 0.24rem;
    float: right;
    margin-right: 0.3rem;
  }

  .dynamics-list .item .img img {
    width: 100%;
    height: 100%;
  }

  .dynamics-other {
    padding-bottom: 0.5rem;
    padding-right: 0.3rem;
    margin-top: 0.29rem;
  }

  .dynamics-other .item {
    height: 0.7rem;
    margin-top: 0.3rem;
    /*padding-right: 0.3rem;*/
  }

  .dynamics-other .item .con {
    margin-left: 0.9rem;
    /*padding-top: 0.05rem;*/
  }

  .dynamics-other .item .con p {
    display: inline-block;
    width: 100%;
  }

  .dynamics-other .item .con .name {
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
    /*padding-bottom: 0.1rem;*/
    display: inline-block;
    width: 3rem;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: .4rem;
    line-height: .4rem;
    /*margin-top: 0.05rem;*/
  }

  .dynamics-other .item .con .mon {
    font-size: 0.26rem;
    color: #818C9E;
    font-weight: 300;
    /*padding-bottom: 0.1rem;*/
    height: 0.4rem;
    line-height: 0.4rem;
  }

  .dynamics-other .item .con .time {
    text-align: left;
    font-size: 0.24rem;
    color: #B1B8C4;
    font-weight: 300;
  }

  .project-share {
    position: fixed;
    right: 0.3rem;
    bottom: 1.8rem;
    z-index: 98;
  }

  .project-share div {
    width: 0.9rem;
    height: 0.9rem;
    margin-top: 0.2rem;
  }

  .project-share div img {
    width: 100%;
    height: 100%;
  }

  .project-report {
    padding: 0.3rem;
    text-align: left;
  }

  .project-report div:last-child > .report-info {
    padding-bottom: 0;
  }

  .project-report .report-title {
    margin-top: 0.2rem;
  }

  .report-title .quan {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    background: #4A90E2;
    box-shadow: 0 0 22px 0 rgba(74, 144, 226, 0.70);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 0.3rem;
    vertical-align: bottom;
  }

  .report-title span {
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.30rem;
    font-weight: 300;
  }

  .report-title .blue {
    color: #4A90E2;
  }

  .report-title .black {
    color: #4B4F63;
  }

  .report-info {
    padding-bottom: 0.5rem;
    margin-left: 0.14rem;
    margin-top: 0.1rem;
    border-left: 2px solid #4A90E2;
  }

  .report-info p {
    font-size: 0.26rem;
    color: #666A7F;
    line-height: 0.4rem;
    font-weight: 300;
    padding-left: 0.48rem;
    text-align: justify;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    border-top: 1px solid #DADEE4;
    background-color: #fff;
    z-index: 999999;
  }

  .footer .footerCon {
    width: 100%;
    height: 100%;
    text-align: left;
  }

  .footer .footerCon div {
    display: inline-block;
    text-align: center;
  }

  .footer .footerCon .zx {
    display: inline-block;
    /*width: 18%;*/
    width: 50%;
  }

  .footer .footerCon .zx img {
    width: 0.42rem;
    height: 0.4rem;
    padding-top: 0.17rem;
  }

  .footer .footerCon .zx p {
    font-size: 0.24rem;
    color: #4B4F63;
    margin-top: 0.05rem;
  }

  .footer .footerCon .cy {
    width: 70%;
    margin-top: 0.08rem;
    background: #4A90E2;
    border-radius: 0.16rem;
    height: 0.84rem;
    line-height: 0.84rem;
    color: #fff;
    font-size: 0.28rem;
    margin-right: 0.08rem;
  }

  .footer .list {
    position: absolute;
    left: 0.1rem;
    bottom: 1.2rem;
    width: 2.2rem;
    /*height: 2.8rem;*/
    border: 1px solid #DADEE4;
    -webkit-border-radius: 0.08rem;
    -moz-border-radius: 0.08rem;
    border-radius: 0.08rem;
    background-color: #fff;
  }

  .footer .list::before {
    content: "";
    position: absolute;
    left: .5rem;
    bottom: -0.34rem;
    border: 0.16rem solid transparent;
    border-top: 0.18rem solid #DADEE4;
  }

  .footer .list::after {
    content: "";
    position: absolute;
    left: .5rem;
    bottom: -0.33rem;
    border: 0.16rem solid transparent;
    border-top: 0.18rem solid #fff;
  }

  .footer .list a {
    display: block;
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.92rem;
    border-bottom: 1px solid #DADEE4;
  }

  .footer .list a:last-child {
    border-bottom: none;
  }

  .footlink {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.24rem;
    color: #DADEE4;
    font-weight: 300;
    background: #f4f6f5;
  }

  .mark {
    position: fixed;
    z-index: 100;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .mark .markCon {
    width: 6.5rem;
    height: 8.3rem;
    padding-bottom: 0.8rem;
    background-color: #fff;
    -webkit-border-radius: 0.16rem;
    -moz-border-radius: 0.16rem;
    border-radius: 0.16rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .mark-tit {
    font-size: 0.34rem;
    color: #4B4F63;
    font-weight: 300;
    height: 0.9rem;
    line-height: 0.9rem;
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
  }

  .mark-select {
    padding: 0 0.4rem;
    text-align: left;
    font-size: 0.28rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .mark-select .item {
    margin-top: 0.48rem;
    position: relative;
  }

  .mark-select .item img {
    position: absolute;
    width: 0.32rem;
    height: 0.32rem;
    left: 0.04rem;
    top: -0.02rem;
  }

  .mark-select span {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.2rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 2px solid #DADEE4;
    vertical-align: middle;
  }

  .mark-select .sel {
    border: none;
  }

  .mark-select textarea {
    width: 100%;
    height: 1.6rem;
    resize: none;
    font-size: 0.26rem;
    font-weight: 300;
    padding: 0.3rem 0.2rem;
    border: 1px solid #B1B8C4 !important;
    border-radius: 0.08rem;
    box-sizing: border-box;
    margin-top: 0.36rem;
    color: #4B4F63;
  }

  textarea::-webkit-input-placeholder {
    color: #DADEE4;
  }

  .mark-btn {
    margin-top: 0.5rem;
    width: 100%;
  }

  .mark-btn button {
    width: 4rem;
    height: 0.9rem;
    text-align: center;
    line-height: 0.9rem;
    background: #4A90E2;
    border-radius: 0.08rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    border: none;
    outline: none;
  }

  .mark-close {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: -0.9rem;
    right: 0.15rem;
  }

  .mark-close img {
    width: 100%;
    height: 100%;
  }

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .phonex-footer-h{height:auto;}
    .iphonex-margin-bottom{margin-bottom:0.68rem;}
    .iphonex-padding-bottom{padding-bottom:0.68rem;}
  }*/

  .list-total {
    padding-top: .3rem;
    margin-bottom: 1.5rem;
    background: #FFF;
  }

  .checkbox-l {
    width: .4rem;
    height: .4rem;
    box-sizing: border-box;
    border: 1px solid #DADEE4;
    margin: .2rem 0 0 .3rem;
    border-radius: 50%;
  }

  .checkbox-l-img {
    width: .4rem;
    height: .4rem;
    box-sizing: border-box;
    margin-top: -1px;
    margin-left: -1px;
    position: relative;
  }

  .list-content {
    background: #FFF;
    border: 1px solid #DADEE4;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.10);
    margin: 0 0 .3rem 0;
    padding-left: .3rem;
    /*width:5.95rem;*/
  }

  .list-top {
    border-bottom: 1px dashed #DADEE4;
  }

  .list-top-l-img {
    width: .8rem;
    background: #ECECEC;
    margin: .3rem 0 .2rem 0;
  }

  .list-top-l-p {
    color: #666A7F;
    line-height: .46rem;
    padding: .47rem 0 0 .2rem;

  }

  .list-top-l-span-span {
    color: #4A90E2;
  }

  .list-top-r-img {
    height: .26rem;
    width: auto;
    margin-top: .56rem;
  }

  .list-top-r-p {
    color: #818C9E;
    line-height: .33rem;
    padding: .54rem .3rem 0 .1rem;
  }

  .list-bottom {
    text-align: justify;
    color: #666A7F;
    line-height: .42rem;
    padding: .1rem .3rem .2rem 0;
  }

  .inform2 {
    padding-top: .24rem;
    font-size: .26rem;
    color: #4A90E2
  }

</style>
