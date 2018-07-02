<template>
  <div class="choose-con">
    <div v-title="'选择捐赠金额'" ref="d-title"></div>
    <div class="choose-top">
      <div class="flex-con">
        <div v-for="(item, index) in sumList" :class="{'add-bg':item.checked}" @click="choice(index)">{{item.sum}}</div>
      </div>
      <div class="flex-input">
        <input type="number" placeholder="请输入金额" v-model.trim="otherValue" class="txt-input" @focus="importValue()" @blur="handleFilterLetters()">
        <span class="txt-unit">元</span>
      </div>
    </div>
    <div class="choose-bott" @click="checkImg()">
      <p class="tip-con"><span class="check-con"><img src="/bocm/platformjs/static/image/default/icon-agree.png" alt="agree.png" v-if="chooseImg"></span> 匿名捐赠 （您的姓名、头像将不公开）</p>
      <button class="btn-s">确定</button>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        chooseImg:false,
        sumList:[
          {"sum":"1元","checked":false},
          {"sum":"5元","checked":false},
          {"sum":"10元","checked":false},
          {"sum":"20元","checked":false},
          {"sum":"50元","checked":false},
          {"sum":"100元","checked":false},
          {"sum":"200元","checked":false},
          {"sum":"500元","checked":false},
          ],
        chooseValue:'',
        otherValue:null,
      }
    },
    created () {

    },
    components: {

    },
    methods:{
      getData(){

      },
      checkImg(){
        this.chooseImg = !this.chooseImg
      },
      choice(index){
        let len = this.sumList.length
        for(var i=0; i<len; i++){
          if(index == i){
            this.sumList[i].checked = true
            let str = this.sumList[i].sum
            str = str.replace(/元/g,'')
            this.chooseValue = str //选中的value
          }else{
            this.sumList[i].checked = false
          }
        }
        this.$toast('选择的是：'+this.chooseValue)
       /* console.log(this.chooseValue)
        console.log(index)*/
      },
      importValue(){
        let leng = this.sumList.length
        for(var j=0; j<leng; j++){
          this.sumList[j].checked = false
        }
        this.chooseValue = '' //清空
        this.$toast('请勿输入非数字类型！')
       /* console.log(this.chooseValue)
        console.log(this.otherValue)*/
      },
      handleFilterLetters(){
        //过滤非数字
        this.otherValue = this.otherValue.replace(/[^\d]/g,'');
        this.$toast('输入的为：'+ this.otherValue)
        console.log(this.otherValue)
      },
    }
  }
</script>
<style lang="scss" scoped>
  button,input{
    border:none;
    background:none;
  }
  .choose-con{
    width:7.5rem;
    height:100%;
    font-family: "PingFangSC-Light";
    font-size:0.28rem;
    font-weight:300;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .choose-top{
    padding:0.2rem 0.3rem 0.3rem;
    background:#fff;
  }
  .flex-con{
    width:100%;
    padding:0.3rem 0;
    display:flex;
    flex-flow: row wrap;
    justify-content: space-between;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    div{
      /*margin-right:0.17rem;*/
      width:1.6rem;
      height:0.7rem;
      line-height:0.7rem;
      text-align:center;
      font-size:0.28rem;
      color: #4B4F63;
      border: 1px solid #B1B8C4;
      margin-bottom:0.3rem;
      -webkit-border-radius: 0.08rem;
      -moz-border-radius: 0.08rem;
      border-radius: 0.08rem;
    }
    .add-bg{
      background: #4A90E2;
      font-size:0.28rem;
      color:#fff;
    }
  }
  .flex-input{
    display:flex;
    /*width:6.9rem;*/
    height:0.7rem;
    border: 1px solid #B1B8C4;
    -webkit-border-radius: 0.08rem;
    -moz-border-radius: 0.08rem;
    border-radius: 0.08rem;
    .txt-input{
      border:none;
      background:#fff;
      padding:0 0.3rem;
      width:5.72rem;
      height:0.7rem;
    }
    .txt-unit{
      display:inline-block;
      height:0.7rem;
      line-height:0.7rem;
    }
  }
  .choose-bott{
    position:fixed;
    left:50%;
    margin-left:-3.45rem;
    bottom:0.9rem;
    .tip-con{
      width:6.9rem;
      text-align:center;
      position:relative;
      font-size:0.24rem;
      height:0.33rem;
      line-height:0.33rem;
      color: #666A7F;
      .check-con{
        display:inline-block;
        height: 0.3rem;
        width: 0.3rem;
        border: 1px solid #aaa;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        vertical-align: middle;
        margin-right:0.18rem;
        img{
          width: 100%;
          height: 100%;
        }
      }

    }
    .btn-s{
      margin-top:0.5rem;
      width:6.9rem;
      height:0.88rem;
      line-height:0.88rem;
      text-align:center;
      font-size:0.32rem;
      color:#fff;
      background: #4A90E2;
      -webkit-border-radius: 0.08rem;
      -moz-border-radius:0.08rem;
      border-radius: 0.08rem;
    }
  }
</style>
