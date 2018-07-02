<template>
    <div>
        <div v-title="'写日记'"></div>
        <div>
            <div class="part-one">
                <p class="text">文字描述</p>
                <div class="textarea-parent">
          <textarea class="diary-content" maxlength="140" @input="descInput" v-model="desc"
                    placeholder="跟大家说说贫困户家庭情况/农产品生产收购情况/ 帮扶成果...">
          </textarea>
                    <span class="text-number">{{remnant}}/140</span>
                </div>
            </div>
        </div>
        <div class="part-two">
            <p class="text">添加图片</p>
            <div class="img-content">
                <div v-for="(item,index) in imgList" class="img-parent" :index="index">
                    <img :src="item" alt="" class="upload-img">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/delete.png'" alt=""
                         class="delete-img" @click="deleteFn(index)">
                </div>
                <div class="img-parent">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/upload.png'" alt=""
                         class="upload-img" @click="uploadImg">
                </div>
            </div>
            <div class="btn-commit-c iphonex-padding-bottom">
                <button class="btn-commit" @click="addDiary">发布</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        remnant: 0,
        desc: '',
        imgList: [],
        imgData: []
      }
    },
    created() {
	    this._appjs.syJsbSetTitleText('写日记')
      let that = this
      window.setImageByUrl = function (objId, filebUrl, fileName) {
        if (that.imgList.length < 9) {
          that.imgList.push(filebUrl)
          that.imgData.push(fileName)
        }
      }
    },
    methods: {
      addDiary(){
        if(this.desc.replace(/(^\s*)|(\s*$)/g, "").length<=10){
          this.desc=this.desc.replace(/(^\s*)|(\s*$)/g, "")
          this._appjs.showToast("输入内容不得低于十个字。")
//          this.$LayerToast({
//            message:"输入内容不得低于十个字。",
//            position:"middle",
//            duration:2000
//          })
          return;
        }
        //this.$router.push({path:'assistants_index'})
        var url = this.siteInfo.host+'/api/index.php?act=v_agent&op=add_agent_note'
        var qs = require("qs")
        this.$http.post(url, qs.stringify({
          'content': this.desc,
          'images': this.imgData
        })).then((res) => {
          if (res.data.code === 200) {
            this._appjs.showToast("日记发布成功")
//            this.$LayerToast({
//              message:"日记发布成功",
//              position:"middle",
//              duration:2000
//            })
            window.location.href = this.siteInfo.host + '/bocm/index.php?act=home&op=agent_add_note_page';
          } else {
            this._appjs.showToast("日记发布失败")
//            this.$LayerToast({
//              message:"日记发布失败",
//              position:"middle",
//              duration:2000
//            })
            console.log('日记发布失败')
          }
        },(error)=>{
          console.log(error)
        })
      },
      descInput(){
        var txtVal = this.desc.length;
        this.remnant = txtVal;
      },
      uploadImg(){
        let agent_id = this.$route.params.agent_id
        let index = this.imgList.length
        if (++index > 9) {
          return;
        }
        let tokenStr=""
        let params = {
          id: index,
          uploadType: "agentnotes",
          token: agent_id,
          rateX: '10',
          rateY: '10'
        };
        this._appjs.syJsbUploadImage(JSON.stringify(params))
      },
      deleteFn(index){
        this.imgList.splice(index,1)
        this.imgData.splice(index,1)
      },
    },
		components: {}
	}
</script>

<style lang="scss" scoped>
.text{
  font-size: 0.32rem;
  color: #4B4F63;
  letter-spacing: -0.0077rem;
  text-align: left;
  margin: 0.42rem 0 0.23rem 0.3rem;
}
.diary-content{
  border: 1px solid #B1B8C4;
  border-radius: 0.08rem;
  width:6.9rem;
  height:3.22rem;
  resize:none;
  margin: 0 0.3rem 0.5rem 0.3rem;
  box-sizing: border-box;
  padding:0.3rem;
}
.textarea-parent{
  position: relative;
  font-size: 0.28rem;
}
textarea::-webkit-input-placeholder{
  color: #b1b8c4;
}
textarea:-moz-placeholder {
  color:#b1b8c4;
}
textarea::-moz-placeholder {
  color: #b1b8c4;
}
textarea:-ms-input-placeholder {
  color: #b1b8c4;
}
.text-number{
  position: absolute;
  bottom: 0.8rem;
  right: 0.6rem;
  color: #b1b8c4;
}
.part-one,.part-two{
  background: #fff;
  margin-top: 0.2rem;
  overflow: hidden;
}
.part-two{
  height: 100%;
}
.img-content{
  text-align: left;
}
.upload-img{
  width:1.5rem;
  height:1.5rem;
  display: block;
  border: 0rem;
}
.img-parent{
  float: left;
  margin-left: 0.3rem;
  margin-bottom: 0.3rem;
  overflow: hidden;
  position: relative;
  border-radius: 0.1rem;
}
.delete-img{
  width: 0.38rem;
  height: 0.38rem;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
}
.btn-commit-c{
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
}
.btn-commit{
  font-size: 0.32rem;
  color: #FFFFFF;
  border: 0;
  background: #4A90E2;
  display: block;
  height: 1rem;
  line-height: 1rem;
  width: 100%;
  text-align: center;
}
</style>
