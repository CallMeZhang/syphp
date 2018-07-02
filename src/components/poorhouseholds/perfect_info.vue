<template>
  <div>
    <div v-title="'完善我的资料'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="con-bg">
          <p class="basic-title">基础信息（不可编辑）</p>
          <ul class="basic-info">
            <li><span class="info-li-left">姓&ensp;&ensp;&ensp;&ensp;名</span><span class="info-li-right">{{peopleInfo.member_name}}</span></li>
            <li><span class="info-li-left">身份证号</span><span class="info-li-right">{{peopleInfo.member_card}}</span></li>
            <li><span class="info-li-left">手&nbsp; 机 &nbsp;号</span><span class="info-li-right">{{peopleInfo.member_mobile}}</span></li>
            <li><span class="info-li-left">住址信息</span><span class="info-li-right">{{peopleInfo.member_area}}</span></li>
            <li><span class="info-li-left">致贫原因</span><span class="info-li-right">{{peopleInfo.member_poor_reason}}</span></li>
            <li><span class="info-li-left">家庭人数</span><span class="info-li-right">{{peopleInfo.family_member_num}}</span></li>
            <li><span class="info-li-left">人均纯收入</span><span class="info-li-right">{{peopleInfo.income_year_per_person}}</span></li>
          </ul>
          <p class="basic-title">家庭情况</p>
          <div class="family-status">
            <textarea name="family_status" id="" cols="30" rows="10" maxlength="140" placeholder="请简单描述您的家庭情况，例如孩子学业，老人身体，
收入来源等" v-model="familyContent" @input="descNum(1,maxLen,familyContent)"></textarea>
            <p class="right-txt" :class="{'input-color':inputColor1}">{{remnant1}}/{{maxLen}}</p>
          </div>
          <p class="basic-title">心愿与诉求</p>
          <div class="family-status">
            <textarea name="family_status" id="" cols="30" rows="10" maxlength="140" placeholder="请填写您的愿望及对平台及帮扶人的诉求是什么。"
                      v-model="wishContent" @input="descNum(2,maxLen,wishContent)"></textarea>
            <p class="right-txt" :class="{'input-color':inputColor2}">{{remnant2}}/{{maxLen}}</p>
          </div>
          <p class="basic-title">个人脱贫计划</p>
          <div class="family-status">
            <textarea name="family_status" id="" cols="30" rows="10" maxlength="140" placeholder="请填写您的个人脱贫计划"
                      v-model="planContent" @input="descNum(3,maxLen,planContent)"></textarea>
            <p class="right-txt" :class="{'input-color':inputColor3}">{{remnant3}}/{{maxLen}}</p>
          </div>
          <p class="basic-title">个人生活照（最好在务农环境中的照片）</p>
          <div class="personal-photo">
            <div v-for="(item,index) in imgPersonalList" class="img-parent" >
              <img :src="item" alt="" class="upload-img" >
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/delete.png'" alt=""
                   class="delete-img" @click="deleteFn(index,imgPersonalList,imgPersonalData)">
            </div>
            <div class="img-parent">
              <img id="personal_p"  :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/upload.png'" alt=""
                   class="upload-img" @click="uploadImg($event)">
            </div>
          </div>
          <p class="basic-title">家庭合影照片</p>
          <div class="personal-photo" >
            <div v-for="(item,index) in imgFamilyList" class="img-parent" >
              <img :src="item" alt="" class="upload-img">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/delete.png'" alt=""
                   class="delete-img" @click="deleteFn(index,imgFamilyList,imgFamilyData)">
            </div>
            <div class="img-parent">
              <img id="family_p" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/upload.png'" alt=""
                   class="upload-img" @click="uploadImg($event)">
            </div>
          </div>
          <p class="basic-title">居住环境照片</p>
          <div class="personal-photo" ref="condition_p">
            <div v-for="(item,index) in imgConditionList" class="img-parent" >
              <img :src="item" alt="" class="upload-img">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/delete.png'" alt=""
                   class="delete-img" @click="deleteFn(index,imgConditionList,imgConditionData)">
            </div>
            <div class="img-parent">
              <img id="condition_p" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/upload.png'" alt=""
                   class="upload-img" @click="uploadImg($event)">
            </div>
          </div>
          <div class="bottom_bar">一起善源 爱 · 源于善</div>
          <div class="photos-btn iphonex-bottom-div" @click="sendData()">确认</div>
        </div>

      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  export default {
    data () {
      return {
        isLoading:false,
        peopleInfo:{},
        poor_member_id:'',//364763
        inputColor:false,
        maxLen:140,
        familyContent:'',//家庭情况
        wishContent:'',//心愿诉求
        planContent:'',//脱贫计划
        inputColor1:false,
        inputColor2:false,
        inputColor3:false,
        remnant1:140, //剩余字数
        remnant2:140, //剩余字数
        remnant3:140, //剩余字数
        imgUrl:{},//
        imgObj:{},
        imgPersonalList:[],//个人生活照
        imgPersonalData:[],
        imgFamilyList:[],//家庭合照
        imgFamilyData:[],
        imgConditionList:[],//居住环境照
        imgConditionData:[]
      }
    },
    created () {
      this._appjs.syJsbSetTitleText('完善我的资料')
      this.getPoorInfo();
    },
    mounted () {
      this.$nextTick(()=>{

      })
    },
    methods:{
      getPoorInfo(){
//        this.poor_member_id = this.$router.query.member_id
        let poor_url = this.siteInfo.host + '/api/index.php?act=v_poor&op=complete_poorperson_info'
        this.$http.get(poor_url).then(res=>{
          let code = res.data.code
          let messages = res.data.message
          let con = res.data.content
          this.imgObj = res.data.content.img //接口里img
          if(code == 200){
              this.peopleInfo = res.data.content
              this.poor_member_id = res.data.content.member_id
              this.familyContent = con.poor_intro////描述家庭情况
              this.wishContent = con.poor_wish//表达心愿与诉求
              this.planContent = con.overcome_poverty_plan//个人脱贫计划
              if(con.img[1].name != '' && con.img['1'].name != undefined){
                this.imgPersonalList[0] = con.imgurl['1'].name
                this.imgPersonalData[0] = con.img['1'].name
              }
              if(con.img[2].name != '' && con.img['2'].name != undefined){
                this.imgFamilyList[0] = con.imgurl['2'].name
                this.imgFamilyData[0] = con.img['1'].name
              }
              if(con.img[3].name != '' && con.img['3'].name != undefined){
                this.imgConditionList[0] = con.imgurl['3'].name
                this.imgConditionData[0] = con.img['3'].name
              }
            }else if(code ==300){
//                未登录
                this.$toast(messages)
            }else if(code ==400){
                this.$toast(messages)
            }
          console.log(res.data)
        })
      },
      sendData(){
        var url2 = this.siteInfo.host+'/api/index.php?act=v_poor&op=complete_poorperson_info'
        var skipUrl = this.siteInfo.host + '/bocm/index.php?act=goods&op=poor_info_v2&member_id=' + this.poor_member_id
        var qs = require('querystring')
        let params = qs.stringify({
          'poor_intro':this.familyContent,
          'poor_wish':this.wishContent,
          'overcome_poverty_plan':this.planContent,
          'person_photo':this.imgPersonalData[0],
          'family_photo':this.imgFamilyData[0],
          'live_photo':this.imgConditionData[0],
          'form_submit':'ok'
        });
        if(this.familyContent.trim() === '' || this.familyContent === undefined){
          this.$toast('请输入家庭情况')
        }else if(this.wishContent.trim() === '' || this.wishContent === undefined){
          this.$toast('请输入心愿与诉求')
        }else if(this.planContent.trim() === ''|| this.planContent === undefined){
          this.$toast('请输入个人脱贫计划')
        }else if(this.imgPersonalData[0] === '' || this.imgPersonalData[0] === undefined){
          this.$toast('请上传个人生活照')
//          alert(this.imgPersonalData[0])
        }else if(this.imgFamilyData[0] === '' || this.imgFamilyData[0] === undefined){
          this.$toast('请上传家庭合影照片')
        }else if(this.imgConditionData[0] === '' || this.imgConditionData[0] === undefined){
          this.$toast('请上传居住环境照片')
        }else{
          this.$http.post(url2,params).then(res=>{
            if(res.data.code == 200){
//              this._appjs.showToast(res.data)
              window.location.href = skipUrl
//              this._appjs.syJsbLaunchWebview(skipUrl)
            }else if(res.data.code ==300){
              this.$toast(res.data.message)
            }else if(res.data.code == 400){
              this.$toast('请将所有信息填写完整(包含图片)')
            }
          })
        }

      },
      descNum(num,len,content){
        if(num == 1){
          let familyVal = this.familyContent.length;
          familyVal !=0 ?this.inputColor1 = true : this.inputColor1 = false
          this.remnant1 = len -familyVal;
//          console.log(this.familyContent)
        }
        else if(num == 2){
          let wishVal = this.wishContent.length;
          wishVal !=0 ?this.inputColor2 = true : this.inputColor2 = false
          this.remnant2 = len -wishVal;
        }
        else if(num == 3){
          let planVal = this.planContent.length;
          planVal !=0 ?this.inputColor3 = true : this.inputColor3 = false
          this.remnant3 = len -planVal;
        }
      },
      uploadImg(el){
//        let poorId = this.poor_member_id
        if(el.target.id == 'personal_p'){
//          console.log(el.target.id)
          let index = this.imgPersonalList.length
          if(++index >1){
            this.$toast('请删除后更换')
            return
          }
          var _that = this
          let tokenStr=""
          let params = {
            id: 1,
            uploadType: "poor",
            rateX: '10',
            rateY: '10'
          };
          this._appjs.syJsbUploadImage(JSON.stringify(params))
          window.setImageByUrl = function (objId, filebUrl, fileName) {
            if (_that.imgPersonalList.length < 1) {
              _that.imgPersonalList.push(filebUrl)
              _that.imgPersonalData.push(fileName)
            }
          }
        }else if(el.target.id == 'family_p'){
//          console.log(el.target.id)
          let index2 = this.imgFamilyList.length
          if(++index2 >1){
            this.$toast('请删除后更换')
            return
          }
          var that = this
          let tokenStr=""
          let params = {
            id: 2,
            uploadType: "poor",
            rateX: '10',
            rateY: '10'
          };
          this._appjs.syJsbUploadImage(JSON.stringify(params))
          window.setImageByUrl = function (objId, filebUrl, fileName) {
//            this._appjs.syJsbAlert(objId, filebUrl, fileName)
            if (that.imgFamilyList.length < 1) {
              that.imgFamilyList.push(filebUrl)
              that.imgFamilyData.push(fileName)
            }
          }
        }else if(el.target.id == 'condition_p'){
//          console.log(el.target.id)
          let index3 = this.imgConditionList.length
          if(++index3 > 1){
            this.$toast('请删除后更换')
            return
          }
          var that2 = this
          let tokenStr=""
          let params = {
            id: 3,
            uploadType: "poor",
            rateX: '10',
            rateY: '10'
          };
          this._appjs.syJsbUploadImage(JSON.stringify(params))
          window.setImageByUrl = function (objId, filebUrl, fileName) {
//            this._appjs.syJsbAlert(objId, filebUrl, fileName)
            if (that2.imgConditionList.length < 1) {
              that2.imgConditionList.push(filebUrl)
              that2.imgConditionData.push(fileName)
            }
          }
        }
      },
      deleteFn(index,imgList,imgData){
        imgList.splice(index,1)
        imgData.splice(index,1)
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
  .family-status textarea{outline:none}
  .family-status textarea{resize:none}
  $bg-white:#fff;
  $conbg:#F7F9FA;
  .con-bg{
    width:7.5rem;
    height:100%;
    text-align:left;
    .basic-title{
      width:100%;
      padding:0 0.24rem;
      height:0.7rem;
      line-height:0.7rem;
      font-size:0.26rem;
      color: #666A7F;
      box-sizing:border-box;
    }
    .basic-info{
      width:100%;
      background:$bg-white;
      padding:0.14rem 0.3rem;
      box-sizing:border-box;
      li{
        display:flex;
        flex-flow:row nowrap;
        font-size:0.28rem;
        color: #4B4F63;
        line-height:0.4rem;
      }
      .info-li-left{
        display:inline-block;
        width:1.86rem;
        margin-bottom:0.25rem;
      }
      .info-li-right{
        display:inline-block;
        flex:1;
        margin-bottom:0.25rem;
      }
    }
    .family-status{
      background:$bg-white;
    }
    .family-status textarea{
      width:100%;
      height: 3rem;
      border:none;
      font-size:0.28rem;
      color: #818C9E;
      padding:0.24rem 0.3rem;
      box-sizing:border-box;
      background:$bg-white;
    }
    .family-status .right-txt{
      width:6.9rem;
      margin:0 auto;
      line-height:0.37rem;
      text-align:right;
      color: #DADEE4;
    }
    .family-status .input-color{
      color: #B1B8C4;
    }
    .personal-photo{
      display:flex;
      width:100%;
      padding:0.3rem 0.3rem 0 0;
      background:$bg-white;
      box-sizing:border-box;
    }
    .img-parent{
      float: left;
      margin-left: 0.3rem;
      margin-bottom: 0.3rem;
      overflow: hidden;
      position: relative;
      border-radius: 0.1rem;
    }
    .upload-img{
      width:1.5rem;
      height:1.5rem;
      display: block;
      border: 0rem;
    }



    .img-item{
      position:relative;
    }
    .photos{
      position:relative;
      width:1.5rem;
      height:1.5rem;
      margin:0 0 0.3rem 0.3rem;
      border: 1px dotted #B1B8C4;
      border-radius:0.08rem;
    }
    .photos:before{
       display:block;
       position:absolute;
       left:50%;
       top:50%;
       transform: translate(-50%,-50%);
       content:'';
       width:0.02rem;
       height:0.8rem;
       background: #B1B8C4;
     }
    .photos:after{
      display:block;
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      content:'';
      height:0.02rem;
      width:0.8rem;
      background: #B1B8C4;
    }
    .delete-img{
      width: 0.38rem;
      height: 0.38rem;
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
    }
    .bottom_bar {
      color: #DADEE4;
      /*padding:.13rem;*/
      text-align:center;
      font-size: .24rem;
      height: .5rem;
      line-height: .5rem;
      background: #F7F9FA;
    }
    .photos-btn{
      width:100%;
      height:1rem;
      line-height:1rem;
      font-size:0.32rem;
      color:#fff;
      text-align:center;
      background: #4A90E2;
    }
  }

</style>
