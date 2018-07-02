
<template>
  <div class="volunteer_index" style="height:100%;">
    <div v-title="'实名认证'"></div>

    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name="fade">
      <div class="rz-con" v-show="!isLoading" >
        <div class="bgline" style="background: #f7f9fa;height: 0.2rem;"></div>
        <div v-show="!isSuccess">
          <div class="item-bar" style="box-shadow: none">
            <span class="left-txt">真实姓名</span>
            <input type="text" maxlength="8" placeholder="请输入真实姓名" v-model="info.trueName" @blur="userInfo(info.trueName)" :disabled="info.isDisabled">
            <i :class="userRedImg ?'error-img' : ''"></i>
          </div>
          <div class="item-bar">
            <span class="left-txt">身&nbsp;&nbsp;份&nbsp;&nbsp;证</span>
            <input type="text" placeholder="请输入真实的身份证号" v-model="info.idCard" @blur="checkedCard(info.idCard)" :disabled="info.isDisabled">
            <i :class="idRedImg?'error-img':'' "></i>
          </div>
          <div class="item-bar">
            <span class="left-txt">年&emsp;&emsp;龄</span>
            <input type="number" placeholder=""  v-model="info.age"  readonly>
            <!--<i :class="info.age == ''? 'error-img' : '' "></i>-->
          </div>
          <div class="item-bar">
            <span class="left-txt">性&emsp;&emsp;别</span>
            <!--@click="sheetVisible = true"-->
            <input type="text" placeholder=""  v-model="info.sexText" readonly><!--<i :class="info.sexText == '' ? 'error-img': '' " ></i>-->
          </div>
          <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
          </mt-actionsheet>

          <div class="space-line"></div>
          <div>
            <div class="politics-status" @click="isPoliticsStatus = true">
              <div class="item-bar" style="box-shadow: none">
                <span class="left-txt">政治面貌</span>
                <input type="text" placeholder="请点击滑动选择" readonly v-model="info.politicsStatus" @click="popStatus =true">
                <i :class="{'right-j':!statusImg,'error-img':statusImg}" ></i>
              </div>
              <mt-popup v-model="popStatus" position="bottom" closeOnClickModal="true">
                <div class="toolbar">
                  <div class="picker-toolbar">
                                <span class="mint-datetime-action mint-datetime-cancel"
                                      @click="quxiao('popStatus','politicsStatus')"
                                >取消</span>
                    <span class="mint-datetime-action mint-datetime-confirm"
                          @click="popStatus =false">确定</span>
                  </div>
                  <!--@change="onChangeStatus"-->
                  <mt-picker :slots="politicsSlots" @change="onChangeStatus"  v-model="info.politicsSlots"
                             v-show="isPoliticsStatus"></mt-picker>
                </div>
              </mt-popup>
            </div>
            <!--所属行业-->
            <div class="industry" @click="isProfession = true">
              <div class="item-bar">
                <span class="left-txt">所属行业</span>
                <input type="text" placeholder="请点击滑动选择" readonly v-model="info.profession"
                       @click="popProfession = true">
                <i :class="{'right-j':!professionImg,'error-img':professionImg}" ></i>
              </div>
              <mt-popup v-model="popProfession" position="bottom" closeOnClickModal="true">
                <div class="toolbar">
                  <div class="picker-toolbar">
                                <span class="mint-datetime-action mint-datetime-cancel"
                                      @click="quxiao('popProfession','profession')"
                                >取消</span>
                    <span class="mint-datetime-action mint-datetime-confirm"
                          @click="popProfession =false">确定</span>
                  </div>
                  <!--@change="onChangeProfession" -->
                  <mt-picker :slots="professionSlots" v-model="info.profession"
                             v-show="isProfession" @change="onChangeProfession"></mt-picker>
                </div>
              </mt-popup>
            </div>
            <div class="item-bar">
              <span class="left-txt">工作单位</span>
              <input type="text" placeholder="请输入真实的工作单位" v-model="info.companyName" @blur="testValue(info.companyName,'请输入工作单位')">
              <!--<i :class="{'right-j':true,'error-img':companyImg}"></i>-->
            </div>
            <div class="special-txt">个人简介(选填)</div>
            <div class="rz-textarea">
              <textarea @focus="inputTextarea" @blur="spacingH=false" class="rz-textarea" name="rz" id="rz-arear" cols="30" rows="10" v-model="summary" placeholder="请简单描述您的个人信息，志愿经历，自我评价等..."></textarea>
            </div>
            <div>
              <div class="submit">
                <div class="clearfix xy" @click.stop="agreeProtocol">
                  <div class="check-img-con">
                    <div class="yuan fl relative" :style="{borderColor:agreeImg?'#fff':'#aaa'}">
                      <img class="check-img" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-agree.png'" v-if="agreeImg">
                    </div>
                  </div>
                  <p class="fl">我已同意<span @click.stop="getClick">《“一起善源”志愿者信息交互平台用户协议》</span></p>
                </div>
                <button type="button" @click.stop="sendData">提交</button>
              </div>
            </div>
            <div :class="{'spacing-h':spacingH}"></div>
          </div>

          <!--popUp-->
          <div v-show="showToast">
            <span class="rz-popup" ref="popup">{{rzToast}}</span>
          </div>
        </div>
        <div v-show="isSuccess">
          <div class="success23">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/icon-suc.png'" alt="">
            <div class="success-text">
              认证成功
            </div>
            <div>
              <div class="btn23" @click.stop="goto">确定</div>
            </div>
          </div>
        </div>
      </div>

    </transition>

  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'

  export default {
    data(){
      return {
        isLoading:true,
        isSuccess:false,
        spacingH:false,
        statusImg:false,//政治面貌！
        professionImg:false,
        companyImg:false,
        intrImg:false,
        popStatus:false,//政治面貌遮罩
        isPoliticsStatus:false,//
        popProfession:false,//行业遮罩
        isProfession:false,//控制显示行业
        rzToast:'',//认证toast
        isUsername:false,//
        userRedImg:false,//user !
        idRedImg:false,//id !
        isCardTrue:false,//身份证
        inputAge:'',//手动输入年龄
        inputSex:'',//手动输入性别
        showToast:false,
        agreeImg: false,//协议img
        menOrWom:'',//男或女
        recruit_id:'',
        is_share:'',
        info:{
          trueName:'',
          idCard:'',
          age:'',
          sexText:'',
          sexInt:0,
          politics:0,//政治类型
          politicsStatus:'',//政治面貌
          profession:'',//行业
          companyName:'',//工作单位
          personalIntr:'',//个人介绍
          isDisabled:false //是否禁止输入
        },
        summary:'',
        sheetVisible: false, //控制显示性别
        actions: [
          {
            name: '男',
            method: this.selectMan
          }, {
            name: '女',
            method: this.selectWoman
          }
        ],
        politicsSlots: [
          {
            flex: 1,
            values: ['中共党员', '共青团员', '民主党派成员', '无党派人士', '群众'],
            className: 'slot',
            textAlign: 'center',
          }
        ],
        professionSlots: [
          {
            flex: 1,
            values: 'IT/通信/电子/互联网,金融业,房地产/建筑业,商业服务,贸易/批发/零售/租赁业,文体教育/工艺美术,生产/加工/制造,交通/运输/物流/仓储,服务业,文化/传媒/娱乐/体育,能源/矿产/环保,政府/非营利机构,农林牧渔,自由职业,离退休,学生,其他'.split(','),
            className: 'slot',
            textAlign: 'center'
          }
        ],
        political_status1:['中共党员','共青团员','民主党派成员','无党派人士','群众'],
        profession1: 'IT/通信/电子/互联网,金融业,房地产/建筑业,商业服务,贸易/批发/零售/租赁业,文体教育/工艺美术,生产/加工/制造,交通/运输/物流/仓储,服务业,文化/传媒/娱乐/体育,能源/矿产/环保,政府/非营利机构,农林牧渔,自由职业,离退休,学生,其他'.split(','),
      }
    },
    created(){
      this.recruit_id = this.$route.query.recruit_id || 23;
      this.is_share = this.$route.query.is_share;
      this.isLoading = false
//      this.isSuccess= true
      this.getName()

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
      getName(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_realname_auth').then(res=>{
          let content = res.data.content
          if(res && res.data && res.data.code == 200){
           if(content.truename && content.id_value){
             this.info.trueName = content.truename
             this.info.idCard = content.id_value
             this.info.isDisabled = true
             this.checkedCard(content.id_value)
           }
          }
        })
      },
      sendData(){
//          console.log('sendData()触发')
        if(this.info.trueName === undefined || this.info.trueName.trim() === '' ){
              this.$toast('请填写姓名')
        }else if(this.info.idCard === undefined || this.info.idCard.trim() === ''){
          this.$toast('请填写身份证号')
        }else if(this.info.politicsStatus === ''){
          this.$toast('请选择政治面貌')
        }else if(this.info.profession === ''){
          this.$toast('请选择行业')
        }else if(this.info.companyName === undefined || this.info.companyName.trim() ===''){
          this.$toast('请输入工作单位')
        }else if(this.agreeImg == false){
          this.$toast('请阅读并同意《一起善源志愿者信息交互平台用户协议》')
        }else{
          let query =require('querystring')
          let url = this.siteInfo.host+'/api/index.php?act=volunteer&op=realname_auth';

          let parameters = {
            'truename':this.info.trueName,
            'id_type':'1',
            'id_value':this.info.idCard,
//            'birthday':this.info.age,
            'sex':this.info.sexInt,
            'political_status':this.political_status1.indexOf(this.info.politicsStatus[0]) + 1,
            'profession':this.profession1.indexOf(this.info.profession[0]) + 1,
            'company_name':this.info.companyName,
            'summary':this.summary
          }

//          console.log(parameters)

          this.$http.post(url,query.stringify(parameters)).then((res)=>{
            let code = res.data.code
            let message = res.data.message
            if(code == '200'){
//              console.log(message)
              this.isSuccess = true;
              this._appjs.syJsbSetTitleText('认证成功');
            }else if(code == '401'){
              this.$toast(message)
              console.log(message)
            }else if(code == '402'){
              this.$toast(message)
              console.log(message)
            }else{
              this.$toast(message)
              console.log(message)
            }
          })
        }
      },
      getCallback(){
        let arr = location.href.split('gycallback=')
        return arr.length > 1 ? arr[1] : '';
      },
      goto(){
        let url = this.getCallback('gycallback');
        if(!url){
            location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+this.recruit_id+'&is_share='+this.is_share
          }else{
            let str = '&v#/volunteer/authentication';
            let tmp = decodeURIComponent(url);
            if(this._appjs.isAndroid()){
              url = tmp.split(str)[0]
            }
            location.href = decodeURIComponent(url)
          }
      },
      //            选择性别
      selectMan() {
        this.info.enroll_sex = '0'
        this.info.sexText = '男'
      },
      selectWoman() {
        this.info.enroll_sex = '1'
        this.info.sexText = '女'
      },
      //      点击取消按钮选项为空
      quxiao (shows, value) {
        this[shows] = false
        this.info[value] = ''
      },
      //            政治面貌
      onChangeStatus(picker, values) {
       /* this.info['politicsStatus'] = values[0];
        switch (values[0]) {
          case '中共党员':
            this.info.politicsStatus = '中共党员';
            break;
          case '共青团员' :
            this.info.politicsStatus = "共青团员";
            break;
          case '民主党派成员' :
            this.info.politicsStatus = "民主党派成员";
            break;
          case '无党派人士' :
            this.info.politicsStatus = "无党派人士";
            break;
          case '群众' :
            this.info.politicsStatus = "群众";
            break;
        }*/
        this.info['politicsStatus'] = values;
      },
      onChangeProfession(picker, values){
        this.info['profession'] = values
        let length = values.length;
        let professionArr = this.professionSlots[0].values
        let professionLen = professionArr.length
        for(var m=0; m<length; m++){
          for(var n=m; n<professionLen; n++){
            if(values[n] == professionArr[m]){
              picker.setSlotValue(n, values[n]);
            }
          }
        }
      },
      userInfo(txt){
          if(txt == ''){
              this.userRedImg = true
            this.$toast('请填写姓名')
          }else{
            this.isUsername = true
            this.userRedImg = false
          }
      },
      // 校验身份证
      checkedCard(num){
        if(num == ''){
          this.$toast('请填写身份证号')
          this.idRedImg = true
          this.info.age=""
          this.info.sexText=""
        }else{
          this.idRedImg = false
          let isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
          if(isIDCard1.test(num)){
            this.isCardTrue = true;
            this.checkoutAgeSex(num)
          }else{
            this.$toast('请填写正确的身份证号')
            this.idRedImg = true;
          }
        }
      },
      checkoutAgeSex(idnumber){
          if(idnumber == ''){
            this.info.age=""
            this.info.sexText=""
          }else if(idnumber !=='' && this.isCardTrue==true){
            this.info.age = this.readIdCard(idnumber,3)
            this.inputAge = this.info.age
            this.info.sexText = this.readIdCard(idnumber,2)
            this.inputSex = this.info.sexText
            if(this.info.sexText == '男'){
                this.info.sexInt =0
            }else{
              this.info.sexInt =1
            }
          }
      },
      ageMethods(){
          if(this.info.age !==''){
            this.info.age =this.inputAge
          }
//          console.log('手动输入 '+this.inputAge)
      },
      sexMethods(){
        if(this.info.sexText !==''){
          this.info.age =this.inputSex
        }
//        console.log('手动输入 '+this.inputSex)
      },
      ////根据idCard 判断年龄性别
      readIdCard(UUserCard,num){
        if(num==1){
          //获取出生日期
          var birth=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
          return birth;
        }
        if(num==2){
          //获取性别
          if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            //男
            return "男";
          } else {
            //女
            return "女";
          }
        }
        if(num==3){
          //获取年龄
          var myDate = new Date();
          var month = myDate.getMonth() + 1;
          var day = myDate.getDate();
          var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
          if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
          }
          return age;
        }
      },
      agreeProtocol(){
        //      同意协议
        console.log('触发')
        this.agreeImg = !this.agreeImg
      },
      getClick(){
        //      协议跳转
        let url = this.siteInfo.host + '/mobile/index.php?act=volunteer_router&op=vol_protocol'
        this._appjs.syJsbLaunchWebview(url)
      },
      testValue(val,message){
        if(val = '' || val.trim() === ''){
          this.exclamation = true
          this.$toast(message)
        }else{
          this.exclamation = false
        }
      },
      inputTextarea(){
        let isAndroid = this._appjs.isAndroid()
        if (isAndroid) {
          var windowHeight = document.documentElement.clientHeight;
          document.body.style.height = windowHeight + 'px';
          this.spacingH = true
        }
      },
      setScrollTop(val){
        console.log(val)
        if(document.documentElement&&document.documentElement.scrollTop)
        {
          document.documentElement.scrollTop=val;
        }
        else if(document.body)
        {
          document.body.scrollTop=val;
        }
      },
    },

    components:{loading}

  }

</script>

<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #DADEE4;}
  input:-moz-placeholder, textarea:-moz-placeholder {color: #DADEE4;}
  input::-moz-placeholder, textarea::-moz-placeholder {color: #DADEE4;}
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {color: #DADEE4;}
  .volunteer_index{
    width:100%;
    margin:0 auto;
    /*background:#f7f9fa;*/
    background:#fff;
    position:absolute;
    top:0;
  }
  .rz-con{
    width:7.5rem;
    /*padding-top:0.2rem;*/
    margin:0 auto;
    text-align:left;
    font-size:0.28rem;
    font-weight:300;
    .space-line{
      width:100%;
      height:0.2rem;
      background: #F7F9FA;
    }
    .item-bar{
      position: relative;
      width:6.9rem;
      padding:0 0.3rem;
      height:0.88rem;
      background:#fff;
      box-shadow: inset 0 1px 0 0 rgba(218,222,228,0.60);
    }
    .left-txt{
      font-size:0.28rem;
      font-weight:300;
      display:inline-block;
      width:1.2rem;
      line-height:0.88rem;
      color:#4B4F63;
      /*文本两端对齐*/
      /*text-align:justify;*/
      /*text-align-last:justify;*/
    }
    .left-txt:after{
      display:inline-block;
      overflow:hidden;
      width:100%;
      height:0;
      vertical-align: top;
    }
    input{
      margin-left:0.82rem;
      width:4.23rem;
      color: #818C9E;
      font-weight:300;
      background: #fff;
    }
    input[type="text"]:disabled
    {
      /*color: #818C9E;*/
      -webkit-text-fill-color: #818C9E;
      -webkit-opacity: 1;
      color: #818C9E;
    }
    .error-img{
      position:absolute;
      top:50%;
      right:0.4rem;
      margin-top:-0.15rem;
      font-style: normal;
      display:inline-block;
      width:0.3rem;
      height:0.3rem;
      background:url(/bocm/platformjs/static/image/marathon/Fill2.png)no-repeat;
      background-size:100%;
    }
    .right-j{
      position:absolute;
      top:50%;
      right:0.3rem;
      margin-top:-0.12rem;
      font-style: normal;
      display:inline-block;
      width: 0.12rem;
      height: 0.24rem;
      background:url(/bocm/platformjs/static/image/marathon/icon-aow.png)no-repeat;
      background-size:100%;
    }
    .special-txt{
      width:6.9rem;
      padding:0 0.3rem;
      font-size:0.26rem;
      height:0.7rem;
      line-height:0.7rem;
      font-weight:300;
      background:#f7f9fa;
      color: #666A7F;
    }
    .rz-textarea{
      margin-bottom:0.5rem;
      background:#fff;
    }
    .rz-textarea textarea{
      width:7.5rem;
      height:3rem;
      background:#fff;
      padding:0.3rem 0.3rem 0;
      font-size:0.28rem;
      color:#818C9E;
      line-height:0.4rem;
      box-sizing:border-box;
      outline: none;
      resize:none;
      border:none;
      /*border-bottom: 1px solid rgba(218,222,228,0.60);*/
    }
    .rz-btn{
      position:absolute;
      bottom:0;
      left:0;
      width:7.5rem;
      height:1rem;
      font-size:0.32rem;
      line-height:1rem;
      text-align:center;
      color:#fff;
      background: #4A90E2;
    }
  }
  .toolbar {
    width: 7.5rem;
  }
  .picker-toolbar {
    width: 100%;
    position: absolute;
    top: -40px;
    left: 0;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }

  .picker-toolbar span {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #26a2ff;
  }
  .rz-popup{
    position:absolute;
    left:50%;
    top:50%;
    z-index:999;
    max-width: 6.9rem;
    padding:0.27rem 0.6rem;
    color:#fff;
    font-size:0.36rem;
    line-height:0.5rem;
    text-align:center;
    background: rgba(0,0,0,0.70);
    border-radius:0.1rem;
    transform:translate(-50%,-50%);
    -webkit-animation: show3 3s ease;
    animation: show3 3s ease;
  }
  .hide{visibility: hidden;}
  .show{visibility: visible;}
  @-webkit-keyframes show3 {
    0%{
      visibility:visible;
    }
    100%{
      visibility:hidden;
    }
  }
  @keyframes show3 {
    0%{
      visibility:visible;
    }
    100%{
      visibility:hidden;
    }
  }
  .submit {
    width: 100%;
    /*position: absolute;
    bottom: 0;
    left: 0;*/
    text-align: center;
  }
  .submit-absolute{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
  }
  .submit .xy {
    width: 100%;
    text-align: center;
    position: relative;
    height: 1rem;
    line-height: 1rem;
    background: #f7f9fa;
  }

  .check-img-con{
    position:relative;
    padding:0 0.3rem;
    box-sizing:border-box;
  }
  .check-img{
    position:absolute;
    left:0;
    top:0;
    width:.3rem;
    height:.3rem;
    box-sizing: border-box;
  }
  .submit .yuan {
    height: 0.3rem;
    width: 0.3rem;
    box-sizing: border-box;
    border: 1px solid #aaa;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-top: 0.32rem;
  }

  .submit p {
    /*line-height: 0.34rem;*/
    font-size: 0.24rem;
    color: #666A7F;
    font-weight: 300;
    /*margin-bottom: 0.5rem;*/
    padding-left: 0.18rem;
  }

  .submit p span {
    color: #4A90E2;
  }

  .submit button {
    width:7.5rem;
    height:1rem;
    font-size:0.32rem;
    line-height:1rem;
    text-align:center;
    color:#fff;
    background: #4A90E2;
    margin: 0 auto;
    border:none;
    outline: none;
  }
  .spacing-h{
    width:100%;
    height:3.26rem;
    background:#f7f9fa;
  }
  .success23{
    text-align: center;
    color:#4A90E2;
    .success-text{
      padding-top:.31rem;
      padding-bottom:1.34rem;
      font-size: .4rem;
    }
    img{
      width:1.6rem;
      margin-top:.86rem;
    }
  }
  .btn23{
    width:6.9rem;
    height:1rem;
    margin:0 auto;
    text-align: center;
    color:#fff;
    font-size: .32rem;
    line-height:1.02rem;
    border-radius: .08rem;
    background: #4A90E2;
  }
</style>

