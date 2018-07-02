<template>
  <div class="ration-report">
    <div v-title="'举报'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade" style="z-index: 1000">
      <div class="iphonex-margin-bottom" v-show="!isLoading">
        <!--主体-->

        <div class="report-body">
          <div style="height: 0.2rem;width: 100%;background:#f4f6f5;"></div>
          <div class="report-detail" v-if="showName">
            <span class="report-rel">真实姓名 </span>
            <input type="text" class="report-name" placeholder="请填写您的真实姓名（1—10字)" autofocus v-model="truename">
          </div>
          <div class="report-line" style="height:1px;"></div>

          <div class="report-detail" v-if="showName">
            <span class="report-rel">身份证号</span>
            <input type="text" class="report-name" placeholder="请输入您的身份证号" v-model="id_value">
          </div>
          <div class="report-line" style="height:1px;"></div>
          <div class="report-txt">
            <span class="report-reason">举报原因 </span>
            <div class="rz-textarea">
              <textarea name="rz" id="rz-arear" cols="30" rows="10" placeholder="请输入举报原因，15—150字。" maxlength="150"
                        v-model="report_con">
              </textarea>
            </div>
            <div class="report-num" :style="{color:report_con.length == 150?'#f25b4b':''}">{{ report_con.length }}/150
            </div>
          </div>
        </div>

        <div class="report-title" v-if="!isShare">上传举报图片</div>
        <!--上传图片-->
        <div class="report-picture clearfix" v-if="!isShare">
          <div class="img-position" v-for="(tmp,index) in imgList">
            <!--<img :src="siteInfo.host +'/bocm/platformjs/static/image/sywelfare/icon-redxin.png'" alt="" class="report-img linear" @click="clickImg(index)">-->
            <img :src="tmp" alt="" class="report-img linear" @click="showImg(index)">
            <div class="img-font" @click="showImg(index)">点击预览</div>
            <img src="/bocm/platformjs/static/image/pubration/error-2.png" alt="" class="report-error"
                 @click="deleteImg(index)">
          </div>

          <div class="report-img line" style="background: #fff;" v-show="imgList.length<5" @click="addImg">
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3">上传照片</div>
          </div>
        </div>

      </div>
    </transition>
    <!--提交-->
    <div class="submit-fixed iphonex-bottom-div" @click="submitReport">
      <button class="submit-button">提交</button>
    </div>

    <!-- 图片查看-->
    <div class="mask" @click="showLargeImg = false" v-show="showLargeImg">
      <div class="cen img-large">
        <!--<mt-swipe :auto="0" :defaultIndex="commentImgShowNum">-->
        <!--<mt-swipe-item v-for="item in imgList"><img :src="item" alt="" style="width:100%;height:auto;"></mt-swipe-item>-->
        <!--</mt-swipe>-->
        <img :src="imgList[commentImgShowNum]" alt="" style="width:100%;">
      </div>
    </div>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'

  export default {
    data() {
      return {
        isLoading: true,
        showName: true, //显示姓名身份证号
        imgList: [],//上传的照片列表
        showLargeImg: false,//显示图片
        report_con: '',
        imgData: [],
        rec_id: '',
        truename: '',
        id_value: '',
        commentImgShowNum: 0,
        isShare:true
      }
    },
    created(){
      this.isShare = this.$route.query.is_share ==='yes'
      console.log(this.isShare)
      this.rec_id = this.$route.query.public_project_id || '';
      this.isLoading = false
      this.imgList = [
//        "/bocm/platformjs/static/image/sywelfare/agree.png",
//        "/bocm/platformjs/static/image/sywelfare/Fill1.png",
//        "/bocm/platformjs/static/image/sywelfare/Fill2.png",
//        "/bocm/platformjs/static/image/sywelfare/Fill3.png",
//        "/bocm/platformjs/static/image/sywelfare/icon-redxin.png"
      ]
      if (localStorage.getItem('truename') && localStorage.getItem('id_value')) {
        this.showName = false;
        localStorage.removeItem('truename');
        localStorage.removeItem('id_value');
      }


      let that = this
      window.setImageByUrl = function (objId, filebUrl, fileName) {
//        alert(filebUrl)
        if (that.imgList.length < 5) {
          that.imgList.push(filebUrl)
          that.imgData.push(fileName)
        }
      }

    },
    methods: {
      showImg(index){
        this.commentImgShowNum = index
        this.showLargeImg = true;
      },
      addImg(){
        let index = this.imgList.length
        if (index > 5) {
          return;
        }
        let tokenStr = ""
        let params = {
          id: 'gongyi',
          uploadType: "syproject",
          token: '',
          rateX: '10',
          rateY: '10'
        };
        this._appjs.syJsbUploadImage(JSON.stringify(params))
      },
      deleteImg(index){
        this.imgList.splice(index, 1)
      },
      submitReport(){
        if (this.showName) {
          if (this.truename.trim().length < 1 || this.truename.trim().length > 10) {
            this.$toast('姓名字数在1到10之间');
            return;
          }
          let isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
          if (this.id_value.trim() === '') {
            this.$toast('请填写身份证号')
            return;
          }
          if (!isIDCard1.test(this.id_value.trim())) {
            this.$toast('请填写正确的身份证号')
            return;
          }
        }
        if (this.report_con.trim().length < 15) {
          this.$toast('举报原因最少为15字')
          return;
        }
        var qs = require('querystring')
        let sendData = qs.stringify({
          rec_id: this.rec_id,
          truename: this.truename,
          id_value: this.id_value,
          inform_content: this.report_con,
          inform_image: this.imgData.join(',')
        })
//          console.log(sendData)
        this.$http.post(this.siteInfo.host + '/api/index.php?act=pubwel&op=project_inform', sendData).then(res => {
          if (res.data.code == 200) {
            this.$toast('举报信息已提交')
//            test
//            return
            if(this.isShare){
              setTimeout(()=>{
//                关闭页面
//                window.close()
                console.log(1)
                window.history.back()
                console.log(2)
              },1000)
            }else {
              setTimeout(()=>{
                this._appjs.syJsbCloseAppPage();
              },1000)
            }
          }else if(res.data.code == 1001){
            let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=ration_report&public_project_id=' + this.rec_id + '&is_share=' + this.isShare);
            window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl
          }else {
            this.$toast(res.data.message)
          }
        })

      }
    },
    components: {loading}
  }
</script>
<style scoped>
  @import "/bocm/platformjs/static/css/common.css";

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #DADEE4;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #DADEE4;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #DADEE4;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #DADEE4;
  }

  .ration-report {
    height: 100%;
    width: 100%;
    background: #F7F9FA;
  }

  .report-body {
    background: #fff;
    padding-bottom: .23rem;
    /*margin-top: .2rem;*/
  }

  .report-detail {
    padding: 0 .3rem 0;
    text-align: left;
  }

  .report-rel {
    font-size: .28rem;
    color: #4B4F63;
    display: inline-block;
    width: 1.94rem;

  }

  .report-name {
    height: .88rem;
    font-size: .28rem;
    color: #4B4F63;
    min-width: 4.03rem;
  }

  .report-line {
    width: 100%;
    height: .01rem;
    background: rgba(218, 222, 228, 0.60);

  }

  .report-txt {
    position: relative;
  }

  .report-reason {
    position: absolute;
    top: .23rem;
    left: .3rem;
    font-size: .28rem;
    color: #4B4F63;
  }

  .rz-textarea {
    background: #fff;
    min-height: 4.73rem;
  }

  .rz-textarea textarea {
    width: 7.5rem;
    background: #fff;
    font-size: 0.28rem;
    color: #818C9E;
    line-height: 0.4rem;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    padding: .2rem .3rem 0 2.3rem;
  }

  .report-num {
    position: absolute;
    bottom: .23rem;
    right: .3rem;
    font-size: .26rem;
    color: #DADEE4;
  }

  .report-title {
    font-size: .26rem;
    color: #666A7F;
    line-height: .37rem;
    padding: .17rem 0 .16rem .3rem;
    text-align: left;
  }

  .report-picture {
    padding: .3rem .5rem .8rem .3rem;
    background: #fff;
    min-height: 2.1rem;
  }

  .img-position {
    position: relative;
    float: left;
  }

  .report-error {
    width: .4rem;
    height: .4rem;
    position: absolute;
    top: -0.1rem;
    left: 1.3rem;
  }

  .report-img {
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px dotted #B1B8C4;
    border-radius: 8px;
    margin-bottom: .3rem;
    margin-right: .6rem;
  }

  .img-font {
    position: absolute;
    bottom: .48rem;
    left: .27rem;
    font-size: .24rem;
    color: #FFFFFF;
  }

  .linear {
    background-image: linear-gradient(to top, #666 0%, #fff 40%);
  }

  .line {
    position: relative;
  }

  .line-1 {
    width: .02rem;
    height: .6rem;
    position: absolute;
    top: .28rem;
    left: .74rem;
    background: #B1B8C4;
  }

  .line-2 {
    width: .6rem;
    height: .02rem;
    position: absolute;
    top: .57rem;
    left: .45rem;
    background: #B1B8C4;
  }

  .line-3 {
    position: absolute;
    bottom: .17rem;
    left: .27rem;
    font-size: .24rem;
    color: #B1B8C4;
  }

  .submit-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
  }

  .submit-button {
    font-size: .3rem;
    color: #FFF;
    letter-spacing: 0;
    height: 1rem;
    width: 100%;
    background: #4A90E2;
    padding: 0;
    border: 0;
  }

  .img-large {
    width: 100%;
    height: auto;
  }
</style>
