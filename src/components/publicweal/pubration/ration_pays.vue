<template>
  <div class="ration_pay">
    <div v-title="'支持方式'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade" style="z-index:1000">
      <div v-show="!isLoading">

        <div class="select-money font26">
          <p>选择支持金额</p>
        </div>
        <!--列表-->

        <div class="list-total">
            <div class="clearfix" v-for="item in list" :class="item.support_number_left_str ==='名额已满'?'ration-list':''">
              <div class="checkbox-l fl"  @click="checkFn(item)">
                <img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/sywelfare/agree.png'" alt="" class="checkbox-l-img" v-show="item.project_support_id == sportId">
              </div>
              <div class="list-content fl">
                <div class="list-top clearfix">
                  <div class="list-top-l fl">
                    <div :style="{backgroundImage:'url('+item.support_thanks_img_url+')'}"
                         style="display: inline-block;float: left; margin: 0.3rem 0;height: 0.8rem;width: 0.8rem;background-size: contain;background-repeat: no-repeat;background-position: center;border: 1px solid #ECECEC;"></div>
                    <!--<img :src="item.support_thanks_img_url" alt="" class="list-top-l-img fl">-->
                    <p class="list-top-l-p font30 fl">{{item.support_title}} <span class="list-top-l-span-span">{{item.support_money}}</span> 元</p>
                  </div>
                  <div class="list-top-r fr">
                      <img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/pubration/avatar-2.png'" alt="" class="list-top-r-img fl">
                    <p class="list-top-r-p fl" style="font-size: 0.24rem">{{item.support_number_left_str}}</p>
                  </div>
                </div>
                <div class="list-bottom">
                  <p class="font28" style="text-align: justify;word-wrap: break-word;">{{item.support_return}}</p>
                </div>
              </div>
            </div>
        </div>
        <div class="d-blank iphonex-margin-bottom"></div>
      </div>
    </transition>

    <!--下一步-->
    <div class="next-position iphonex-bottom-div">
      <div class="next">
        <div class="next-money">
          <p class="next-p">支持金额：<span class="next-span">￥{{sportMoney}}</span></p>
        </div>
        <div class="next-jump">
          <span class="next-jump-span" @click="goPay">下一步</span>
        </div>
      </div>

    </div>
    <!--toast弹框-->
    <div class="toast-center toast-top" v-if="showMsg1"><p class="toast-center-p">请选择支持金额</p></div>
    <div class="toast-center toast-bottom" v-if="showMsg2"><p class="toast-center-p">名额已满，请选择其他金额</p></div>


  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import loading from "@/components/loading/loading.vue"

  export default {
    data() {
      return {
        isLoading: true,
        detail: "",
        bottomPullText: "",//上拉加载的文字
        bottomDropText: "",//释放时加载的文字
        bottomDistance: 0,//上拉的距离
        bottomAllLoaded: false, // 是否可以上拉属性
        autoFill: false,
        curpage: 0,//当前分页
        scrollMode: "auto",
        uid: '',
        list: [],
        sportMoney: 0,
        sportId:'',
        showMsg1:false,//显示toast信息
        showMsg2:false,//显示toast信息
        project_support_id:''
      }
    },
    created() {
//      console.log(this.$route.query);
      this.uid = this.$route.query.public_project_id || '';
//      this.uid = 38;

      this.loadBottom()


    },
    mounted(){

    },
    methods: {
      //分页
      loadBottom(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=pubwel&op=get_project_support_list&public_project_id='+this.uid)
          .then(res=>{
            /*var res = {
              data:{
                "code": 200,
                "message": "success",
                "content": [
                  {
                    "project_support_id": "1",
                    "support_thanks_img_url": "https://cdn.17shanyuan.com/syproject/oss_ef190a7cb2a20c094b1ff43afb4266c2.png",
                    "support_money": "10",
                    "support_title": "无私奉献",
                    "support_number_left": "-1",
                    "support_number_left_str": "名额不限",
                    "support_return": "支持项目名称，奉献您的爱心支持鸡冠山政府自助脱贫，奉献您的爱心",
                    "support_has_address": "0"
                  },
                  {
                    "project_support_id": "2",
                    "support_thanks_img_url": "https://cdn.17shanyuan.com/syproject/oss_ef190a7cb2a20c094b1ff43afb4266c2.png",
                    "support_money": "50",
                    "support_title": "支持",
                    "support_number_left": "0",
                    "support_number_left_str": "名额已满",
                    "support_return": "获得鸡冠山 1 岁散养母鸡一年的认养权作为回报，众筹成功后，从10月起，您将在接下来的12个月中，每个月收到 一份有10只鸡蛋的礼包作为回报。",
                    "support_has_address": "1"
                  },
                  {
                    "project_support_id": "3",
                    "support_thanks_img_url": "https://cdn.17shanyuan.com/syproject/oss_ef190a7cb2a20c094b1ff43afb4266c2.png",
                    "support_money": "100",
                    "support_title": "支持",
                    "support_number_left": "256",
                    "support_number_left_str": "剩余256个名额",
                    "support_return": "获得鸡冠山 1 岁散养母鸡一年的认养权作为回报，众筹成功后，从10月起，您将在接下来的12个月中，每个月收到 一份有10只鸡蛋的礼包作为回报。",
                    "support_has_address": "1"
                  },
                  {
                    "project_support_id": "4",
                    "support_thanks_img_url": "https://cdn.17shanyuan.com/syproject/oss_ef190a7cb2a20c094b1ff43afb4266c2.png",
                    "support_money": "10",
                    "support_title": "支持",
                    "support_number_left": "256",
                    "support_number_left_str": "剩余256个名额",
                    "support_return": "获得鸡冠山 1 岁散养母鸡一年的认养权作为回报，众筹成功后，从10月起，您将在接下来的12个月中，每个月收到 一份有10只鸡蛋的礼包作为回报。",
                    "support_has_address": "1"
                  },
                  {
                    "project_support_id": "5",
                    "support_thanks_img_url": "https://cdn.17shanyuan.com/syproject/oss_ef190a7cb2a20c094b1ff43afb4266c2.png",
                    "support_money": "100",
                    "support_title": "支持",
                    "support_number_left": "256",
                    "support_number_left_str": "剩余256个名额",
                    "support_return": "获得鸡冠山 1 岁散养母鸡一年的认养权作为回报，众筹成功后，从10月起，您将在接下来的12个月中，每个月收到 一份有10只鸡蛋的礼包作为回报。",
                    "support_has_address": "1"
                  }
                  ,
                  {
                    "project_support_id": "6",
                    "support_thanks_img_url": "https://cdn.17shanyuan.com/syproject/oss_ef190a7cb2a20c094b1ff43afb4266c2.png",
                    "support_money": "100",
                    "support_title": "支持",
                    "support_number_left": "256",
                    "support_number_left_str": "剩余256个名额",
                    "support_return": "获得鸡冠山 1 岁散养母鸡一年的认养权作为回报，众筹成功后，从10月起，您将在接下来的12个月中，每个月收到 一份有10只鸡蛋的礼包作为回报。",
                    "support_has_address": "1"
                  }

                ]
              }

            }*/

            if(res && res.data && res.data.code == 200){
              this.list = this.list.concat(res.data.content)
            }
            this.isLoading = false;

          }
        )

      },
      checkFn(item){
        if(item.support_number_left_str ==='名额已满'){
//          Toast({
//            message:'名额已满，请选择其他金额'
//          })
          this.showMsg2 = true;
          setTimeout(()=>{
            this.showMsg2 = false;
          },1500);

          return;
        }
        this.sportMoney = item.support_money
        this.sportId = item.project_support_id
        this.project_support_id = item.project_support_id

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
      checkLogin(){
        return this.$http.get(this.query('is_login')).then(res=>{
          return res && res.data && res.data.code == 200 ? true : false;
        })
      },
      goLogin(fn) {
        this.checkLogin().then(flag => {
          if (flag) {
            fn()
          } else {
            window.location.href = this.siteInfo.host + '/mobile/index.php?act=volunteer_router&op=login&gycallback=' + encodeURIComponent('volunteer/vol_detail?volunteer_org_id=' + this.uid)
          }
        })
      },
      goPay(){

        if(this.sportMoney == ''){
//            Toast({
//              message:'请选择支持金额'
//            })
          this.showMsg1 = true;
          setTimeout(()=>{
            this.showMsg1 = false;
          },1500);
          return
        }
        this.$http.get(this.siteInfo.host+'/api/index.php?act=pubwel&op=project_support_is_full&project_support_id='+this.project_support_id).then(res =>{
          if(res && res.data && res.data.code == 200){
            if(res.data.content.is_full == 0){
              let params = {
                money:this.sportMoney.split(',').join('')-0,
                isCheck:'ok',
                public_project_id:this.uid,
                support_id:this.sportId
              }
              var qs = require('qs')
//              var sendData = qs.stringify(params)
              this.$http.post(this.siteInfo.host+'/api/index.php?act=pubwel&op=createDonationOrder',qs.stringify(params)).then(res=>{
                if(res && res.data && (res.data.status === 'success')){
                  window.location.href = res.data.url+'&support_id='+ this.sportId
//            this._appjs.syJsbLaunchWebview(this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_list&project_mode=get_donate_list&payMoney='+this.sportMoney)

                }else{
                  this.$toast(res.data.msg)
                }
              })
            }else{
              this.showMsg2 = true;
              setTimeout(()=>{
                this.showMsg2 = false;
              },1500);
            }
          }else if(res && res.data.code == 404){
            Toast({
              message:'支持方式不存在'
            })
          }
        })



      },

    },
    components: {loading}
  }
</script>
<style scoped>
  @import "/bocm/platformjs/static/css/common.css";
  .ration_pay {
    width:100%;
    background: #F7F9FA;
  }
  .select-money {
    color: #666A7F;
    text-align:left;
    padding:.16rem 0 .17rem .3rem;
    line-height:.37rem;
  }
  .ration-list {
    background:#fff;
    opacity: .4;
  }
  .list-total {
    padding-top:.3rem;
    margin-bottom:0.5rem;
    background: #FFF;
  }
  .d-blank{height: 1rem;width: 100%;}
  .checkbox-l {
    width:.4rem;
    height:.4rem;
    box-sizing: border-box;
    border: 1px solid #DADEE4;
    margin:.2rem 0 0 .3rem;
    border-radius: 50%;
  }
  .checkbox-l-img {
    width:.4rem;
    height:.4rem;
    box-sizing: border-box;
    margin-top:-1px;
    margin-left:-1px;
    position: relative;
  }

  .list-content {
    background: #FFF;
    border: 1px solid #DADEE4;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.10);
    margin:0 .3rem .3rem .16rem;
    padding-left:.3rem;
    width:5.95rem;
  }
  .list-top {
    border-bottom:1px dashed #DADEE4;
  }
  .list-top-l-img {
    width:.8rem;
    background: #ECECEC;
    margin:.3rem 0 .2rem 0;
  }
  .list-top-l-p {
    color: #666A7F;
    line-height: .46rem;
    padding:.47rem 0 0 .2rem;

  }
  .list-top-l-span-span {
    color:  #4A90E2;
  }
  .list-top-r-img {
    height:.26rem;
    margin-top:.56rem;
  }
  .list-top-r-p {
    color: #818C9E;
    line-height: .33rem;
    padding:.54rem .3rem 0 .1rem;
  }
  .list-bottom {
    text-align: justify;
    color: #666A7F;
    line-height: .42rem;
    padding:.1rem .3rem .2rem 0;
  }
  /*下一步*/
  .next-position {
    position:fixed;
    bottom:0;
    width:100%;
    height:1rem;
    border-top:1px solid #DADEE4;
  }
  .next {
    position:relative;
    height:1rem;
    background:#fff;
  }
  .next-money {
    height:1rem;
    width:3.3rem;
    font-size: .28rem;
    color: #4B4F63;
    letter-spacing: 0;
    line-height: .4rem;
    position:absolute;
    top:0;
    left:0;
  }
  .next-p {
    position:absolute;
    top:.28rem;
    left:.3rem;
  }
  .next-span {
    color: #4A90E2;;

  }
  .next-jump {
    height:1rem;
    width:4.2rem;
    background: #4A90E2;
    font-size: .3rem;
    color: #FFFFFF;
    letter-spacing: 0;
    position:absolute;
    top:0;
    right:0;
  }
  .next-jump-span {
    position:absolute;
    top:.35rem;
    right:1.6rem;
  }

  /*toast*/
  .toast-center {
    height:1.04rem;
    background: rgba(0,0,0,0.70);
    border-radius: .1rem;
  }
  .toast-top {
    width:3.73rem;
    position: fixed;
    top:40%;
    left:25%;
  }
  .toast-bottom {
    width:5.53rem;
    position: fixed;
    top:40%;
    left:14%;
  }
  .toast-center-p {
    padding-top:.35rem;
    color: #FFF;
    letter-spacing: 0;
    font-size: .36rem;
  }
</style>
