<template>
  <div class="con">
    <div v-title="'2017年公益回馈'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="feedback-con" v-if="isStart">
        <!--<div class="feedback-banner01"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/activities/feedback/feedback_last01.png'" alt="banner-top.png加载中…"></div>
        <div class="feedback-banner01"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/activities/feedback/feedback_last02.png'" alt="banner-top.png加载中…"></div>
        <div class="feedback-banner01"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/activities/feedback/feedback_last03.png'" alt="banner-top.png加载中…"></div>-->
        <div class="banner01"></div>
        <div class="banner02"></div>
        <div class="banner03" :class="{'spacing-h':spacingH}">
          <div class="info-con">
            <div class="input-con">
              <input type="text" maxlength="8"  v-model="peopleInfo.names"  @focus="inputGoUp" @blur="examine(peopleInfo.names, '请输入姓名')" placeholder="请输入姓名">
            </div>
            <div class="input-con">
              <input type="number" max="11" v-model="peopleInfo.phone" oninput="if(value.length>11)value=value.slice(0,11)" @focus="inputGoUp" @blur="checkMobile(peopleInfo.phone)" placeholder="请输入手机号">
            </div>
            <div class="input-con margin-top03 content-restrict" @click="userAddress.county_name==''?isOk=false:isOk=true;set_province('picker1')">
              <span
                class="info-txt unmargin"
                :class="{'light-color':userAddress.province_name=='请选择省市区'}">{{userAddress.province_name}}&nbsp;{{userAddress.city_name}}&nbsp;{{userAddress.county_name}}</span>
            </div>
            <div class="input-con">
              <input type="text" v-model="peopleInfo.addressDetail" placeholder="请输入详细收货地址" @focus="inputGoUp" @blur="examine(peopleInfo.address, '请输入详细收货地址')">
            </div>
          </div>
          <div class="feedback-btn" @click="sendActData()"></div>
        </div>
          <!--省市区-->
        <sy-popup ref='picker1' position="bottom">
          <div class="pop-wrapper iphonex-padding-bottom" @click.stop>
            <div class="header-top">
              <div :class="isActivity=='province'||'is-activity'" @click="isActivity='province'" id="pr">
                {{userAddress.province_name || '省'}}
              </div>
              <div :class="isActivity=='city'||'is-activity'" v-if='cityFlag' @click="isActivity='city'" id="ci">
                {{userAddress.city_name || '市'}}
              </div>
              <div :class="isActivity=='county'||'is-activity'" v-if='countyFlag' @click="isActivity='county'" id="co">
                {{userAddress.county_name || '县'}}
              </div>
              <div class="confirm" :class="!isOk||'isDone'" @click="isDone">确定</div>
              <!--<div class="confirm margin-r024" :class="!isOk||'isDone'" @click="cancelAddr">取消</div>-->
            </div>
            <div class="content-address">
              <sy-tab-container v-model="isActivity" swipeable>
                <sy-tab-container-item id="province">
                  <div class="content-province">
                    <div v-for="item in provinceData" @click="provinceFn(item,$event)">{{item.area_name}}</div>
                  </div>
                </sy-tab-container-item>
                <sy-tab-container-item id="city" v-if='cityFlag'>
                  <div class="content-province">
                    <div v-for="item in cityData" @click="cityFn(item,$event)">{{item.area_name}}</div>
                  </div>
                </sy-tab-container-item>
                <sy-tab-container-item id="county" v-if='countyFlag'>
                  <div class="content-province">
                    <div v-for="item in countyData" @click="countryFn(item,$event)">{{item.area_name}}</div>
                  </div>
                </sy-tab-container-item>
              </sy-tab-container>
            </div>
          </div>
        </sy-popup>
          <!--省市区-->
      </div>
        <!--活动结束-->
        <div class="feedback-over-con" v-if="!isStart">
          <div v-title="'2017年公益回馈'"></div>
          <div class="feedback-over">
            <div class="over-img"><img src="/bocm/platformjs/static/image/activities/feedback/back_over_logo.png" alt="over.png加载中…"></div>
            <div class="over-tip">活动截止日期为：2018.01.19</div>
            <div class="over-descr">如您已提交领取信息<br/>爱心回馈礼品将于2018年1月19日后陆续发出。</div>
            <div class="over-bottom">精准扶贫，感谢有您</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
//  import addressData from '../../../../static/json/address3.json'
  import { trim } from '../../../packages/utils/dom.js'
  import { Picker } from 'mint-ui';
  import {Toast} from 'mint-ui';
  export default{
    data () {
      return {
        isLoading:false,//加载动画
        myShade:false,//遮罩
        isLogin:false,//是否登录
        isStart:true,//是否开始活动
        isActivity: 'province',
        spacingH:false,//底部高度
        userAddress: {
          address: '',
          city_name: '',
          county_name: '',
          mob_phone: '',
          province_name: '请选择省市区',
          true_name: '',
          address_id: '',
          last_id: '',
          is_default: 0
        },
        provinceData:[],
        cityData: [],
        countyData: [],
        isActivity: 'province',
        isOk: false,
        cityFlag: false,
        countyFlag: false,
        peopleInfo:{
          names:'',
          phone:'',
          area:'',
          addressDetail:'',
          myAddressProvince:'省',
          myAddressCity:'市',
          myAddressCounty:'区/县',
        },
      }
    },
    created () {
      this.getIfLogin();
      this.getProvince()
    },
    mounted () {

    },
    methods : {
      getProvince () {
        let url = this.siteInfo.host + '/api/index.php?act=v_area&op=get_area_list'
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.provinceData = res.data.content
//            console.log(this.provinceData)
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      set_province (picker) {
        this.$refs[picker].open()
        this.isActivity = 'province'
      },
      getIfLogin(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=home&op=feedback_iflogin_api').then((res) => {
          let code = res.data.code
          if(code == 200){//用户是登陆的可用的用户
            this.isLogin = true
          }else if(code == 460){//no login
            this.isLogin = false
              let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=message&op=showfeedback');
              window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
          }else if(code == 450){//活动结束
            /*let url = this.siteInfo.host + '/bocm/index.php?act=index&op=showvue#/good_feedback_over';
            this._appjs.syJsbLaunchWebview(url);*/
            this.isStart = false
          }else{//用户无权访问这个页面
//            Toast({message: res.data.message,position: 'top',duration: 2000});
            let url = this.siteInfo.host + '/bocm/index.php?act=index&op=index&appVariant=pwcn'
            this._appjs.syJsbLaunchWebview(url)
          }
        },(error) => {
          console.log(error)
        })
      },
      provinceFn (item, e) {
        this.setBlue(e)
        document.getElementById('pr').style.color = '#4B4F63'
        this.userAddress.province_name = item.area_name
        this.userAddress.city_name = ''
        this.userAddress.county_name = ''
        this.isOk = false
        this.cityFlag = false
        this.countyFlag = false
        let url = this.siteInfo.host + '/api/index.php?act=v_area&op=get_area_list&area_parent_id=' + item.area_id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.cityData = res.data.content
            this.isActivity = 'city'
            this.cityFlag = true
            this.countyFlag = false
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      cityFn (item, e) {
        this.setBlue(e)
        document.getElementById('ci').style.color = '#4B4F63'
        this.userAddress.city_name = item.area_name
        this.userAddress.county_name = ''
        this.countyFlag = false
        this.isOk = false
        let url = this.siteInfo.host + '/api/index.php?act=v_area&op=get_area_list&area_parent_id=' + item.area_id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.countyData = res.data.content
            this.isActivity = 'county'
            this.countyFlag = true
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      countryFn (item, e) {
        this.setBlue(e)
        this.isOk = true
        document.getElementById('co').style.color = '#4B4F63'
        this.userAddress.county_name = item.area_name
        this.userAddress.last_id = item.area_id
      },
      isDone () {
        if (trim(this.userAddress.province_name) === '' || trim(this.userAddress.city_name) === '' || trim(this.userAddress.county_name) === '') {
          this._appjs.showToast('省市区不能为空')
          return
        }
        if (!this.isOk) return
        this.$refs['picker1'].close()
      },
      cancelAddr(){
        this.userAddress.county_name = ''
        this.userAddress.city_name = ''
        this.userAddress.province_name = ''
        this.userAddress.province_name = '请选择省市区'
        if (!this.isOk) return
        this.$refs['picker1'].close()
      },
      inputGoUp(){
        let isAndroid = this._appjs.isAndroid()
        if (isAndroid) {
          var windowHeight = document.documentElement.clientHeight;
          document.body.style.height = windowHeight + 'px';
          this.spacingH = true
        }
      },
      setBlue (e) {
        var elParent = e.target.parentNode
        for (var i = 0; i < elParent.childNodes.length; i++) {
          elParent.childNodes[i].style.color = '#4B4F63'
        }
        e.target.style.color = '#4A90E2'
      },
      sendActData(){
        if(!this.isLogin){
          let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=message&op=showfeedback');
          window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
        }else{
          if(this.peopleInfo.names === undefined || this.peopleInfo.names.trim() === ''){
            Toast({message: '请输入姓名',position: 'center',duration: 2000});
          }else if(this.peopleInfo.phone === undefined || this.peopleInfo.phone.trim() === ''){
            Toast({message: '请输入手机号',position: 'center',duration: 2000});
          }else if((this.userAddress.province_name === '') || (this.userAddress.city_name === '') || (this.userAddress.county_name === '')){
            Toast({message: '请选择省市区',position: 'center',duration: 2000});
          }else if(this.peopleInfo.addressDetail === undefined || this.peopleInfo.addressDetail.trim() === ''){
            Toast({message: '请输入详细收货地址',position: 'center',duration: 2000});
          }else{
            var query =require('querystring')
            let url = this.siteInfo.host+'/api/index.php?act=home&op=feedback_save_api';
            let params= {
              'post_name': this.peopleInfo.names,
              'post_mobile':this.peopleInfo.phone,
              'post_areaid': this.userAddress.last_id,
              'post_areainfo':this.peopleInfo.addressDetail,
            };
//            console.log(params)
            this.$http.post(url,query.stringify(params)).then((res) => {
              let code = res.data.code;
              let message = res.data.message;
//              console.log(code)
              if(code == 200){
//                this._appjs.syJsbSetTitleText('提交成功');
                Toast({message: '提交成功',position: 'center',duration: 2000});
                setTimeout(() => {
                  this._appjs.syJsbCloseAppPage()
                },2500)
              }else if(code == 450){//param error
                Toast({message: '提交失败，请重试',position: 'center',duration: 2000});
              }else if(code == 480){//您已提交过领取信息
                Toast({message: message,position: 'center',duration: 2000});
              }else if(code == 460){//no login
//                Toast({message: message,position: 'center',duration: 2000});
                let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=message&op=showfeedback');
                window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
              }else if(code == 470){//wrong user
//                Toast({message: message,position: 'center',duration: 2000});
                let url = this.siteInfo.host + '/bocm/index.php?act=index&op=index&appVariant=pwcn'
                this._appjs.syJsbLaunchWebview(url)
              }else{//提交失败，请重试
                Toast({message: message,position: 'center',duration: 2000});
              }
            },(error) => {
              console.log(error)
            })
          }
        }
      },
      examine(value, str){
        if(value == ''){
          Toast({
            message: str,
            position: 'center',
            duration: 2000
          });
        }
        this.spacingH = false
      },
      //      点击取消按钮选项为空
      /*deselect(shows, value) {
        this[shows] = false
        this.peopleInfo[value] = ''
        this.peopleInfo.area = ''
      },
      confirm(){
        this.myShade = false;
        this.peopleInfo.area = this.userAddress.province_name + ' '+this.userAddress.city_name+' '+this.userAddress.county_name;
      },*/
      checkAddrInfo(){
        if (trim(this.userAddress.province_name) === '' || trim(this.userAddress.city_name) === '' || trim(this.userAddress.county_name) === '') {
          Toast({message: '请选择省市区',position: 'center',duration: 2000});
        }
      },
      checkMobile(str) {
        var re = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if (!re.test(str)) {
          Toast({message: '请输入正确的手机号',position: 'center',duration: 2000});
        }
        this.spacingH = false
      },
      trimStr(str){//去除首尾空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
      }
    },
    components: {
      'loading' : loading,
      'mt-picker' : Picker
    },
  }
</script>
<style lang="scss" scoped>
  $bg:#5d8fdc;
  $body-bg:#fff;
  $fontSize: 0.28rem;
  h2{background:$bg;}
  img{display:block;border:0;}
  input{background:none;}
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #DADEE4;}
  input:-moz-placeholder, textarea:-moz-placeholder {color: #DADEE4;}
  input::-moz-placeholder, textarea::-moz-placeholder {color: #DADEE4;}
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {color: #DADEE4;}
  .con{height:100%;background:#fff;}
  .feedback-con{
    overflow-x:hidden;
    margin:0 auto;
    padding-top:1.35rem;
    width:7.5rem;
    background:$bg;
    text-align:left;
    .feedback-banner01{
      width:100%;
      img{
        width:100%;
      }
    }
    .banner01{
      width:100%;
      height:6.69rem;
      background:url("/bocm/platformjs/static/image/activities/feedback/feedback_first01.png") no-repeat;
      background-size: 100%;
    }
    .banner02{
      width:100%;
      height:9.25rem;
      background:url("/bocm/platformjs/static/image/activities/feedback/feedback_first02.png") no-repeat;
      background-size: 100%;
    }
    .banner03{
      position:relative;
      width:100%;
      height:8.2rem;
      background:url("/bocm/platformjs/static/image/activities/feedback/feedback_last03.png") no-repeat;
      background-size: 100%;
      .info-con{
        position:absolute;
        top:0;
        left:2.35rem;
        width:100%;
        .input-con{
          width:3.94rem;
          height:0.8rem;
          margin-top:0.39rem;
          box-sizing:border-box;
          input{
            width:100%;
            height:0.8rem;
            line-height:0.8rem;
            padding:0 0.24rem;
            box-sizing:border-box;
            /*border:1px solid red;*/
          }
        }
        .info-txt {
          font-size: $fontSize;
          /*color: #818C9E;*/
          line-height: 0.88rem;
          width: 4rem;
          padding-left:0.24rem;
          box-sizing:border-box;
        }
        .light-color {
          color: #DADEE4;
        }
        .margin-top03{margin-top:0.44rem;}
        .content-restrict{
          width:3.94rem;
          overflow:hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .feedback-btn{
        position:absolute;
        left:50%;
        bottom:1rem;
        transform: translate(-50%,-50%);
        width:4.5rem;
        height:1.2rem;
      }
    }
    .margin-r024{
      margin-right:0.24rem!important;
    }
    .spacing-h{
      width:100%;
      margin-bottom:5rem!important;
    }


  }
  .pop-wrapper {
    width: 100%;
    background: #fff;
    overflow: hidden;
  }
  .header-top {
    border-bottom: 1px solid #DADEE4;
    width: 100%;
    height: 1.04rem;
    box-sizing: border-box;
    > div {
      float: left;
      border-bottom: 0.04rem solid #4A90E2;
      margin-right: 0.5rem;
      font-size: .30rem;
      color: #818C9E;
      height: 1rem;
      line-height: 1rem;
      font-weight: 300;
      max-width: 1.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .is-activity {
      border-bottom: 0;
    }
    div:nth-of-type(1) {
      margin-left: 0.5rem;
    }
    .confirm {
      float: right;
      margin-right: 0.5rem;
      font-size: .30rem;
      color: #DADEE4;
      border: 0;
      font-weight: 300;
    }
    .isDone {
      font-size: .30rem;
      color: #4A90E2;
    }
  }
  .content-address {
    overflow: hidden;
    width: 100%;
    .content-province {
      width: 104%;
      height: 7.04rem;
      padding-left: 0.5rem;
      overflow: scroll;
      overflow-x: hidden;
      > div {
        line-height: 0.88rem;
        text-align: left;
        height: 0.88rem;
        font-size: .30rem;
        font-weight: 300;
        color: #4B4F63;
      }
    }
  }
  /*activities-over*/
  .feedback-over-con{
    position:relative;
    width:100%;
    /*height:13.34rem;*/
    background:$body-bg;
    img{display:block;border:0;}
  }
  .feedback-over{
    width:7.5rem;
    padding-top:2.82rem;
    margin:0 auto;
    text-align:center;
    .over-img{
      width:2.97rem;
      height:2.29rem;
      margin:0 auto;
      img{
        width:100%;
        height:100%;
      }
    }
    .over-tip{
      padding-top:0.9rem;
      width:4.95rem;
      margin:0 auto;
      font-size:0.32rem;
      line-height:0.45rem;
      color: #333333;
    }
    .over-descr{
      width:5.15rem;
      margin:0 auto;
      padding-top:0.9rem;
      font-size:0.24rem;
      line-height:0.42rem;
      color: #666666;
    }
    .over-bottom{
      position:fixed;
      left:50%;
      bottom:0.9rem;
      transform: translate(-50%,-50%);
      font-size:0.24rem;
      line-height:0.32rem;
      color: #5D8FDC;
    }
  }
</style>
