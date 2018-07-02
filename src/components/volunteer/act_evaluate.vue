<template>
  <div>
    <div v-title="'评价'"></div>

    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name="fade">
      <div class="evaluate-con">
        <div class="top-line"></div>
        <form action="">
          <div class="top-con">
            <div class="con-left">满意度</div>
            <ul class="con-right">
              <li v-for="(itemClass,index) in itemClasses" >
                <div class="start-item" :class="itemClass" :track-by="index" @click="startClick(index)"></div>
              </li>
            </ul>
          </div>
          <div class="evaluate-descr">
            <textarea name="evaluate" id="" placeholder="请填写评价内容" maxlength="120" @input = "descNum(maxLen)" v-model="content" class="txt-area" autofocus>
            </textarea>
            <p class="right-txt" :class="{'input-color':inputColor}">{{remnant}}/{{maxLen}}</p>
          </div>
        </form>
        <div class="btn-bottom" @click="sendData()">提交</div>
      </div>
    </transition>

  </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  export default {
    data(){
      return {
        isLoading:false,
        volunteerOrgId:'',//志愿组织id
        recruit_id:'',//招募id
        toId:'',//被评价人id
        content:'',
        maxLen:120,//最大字数
        starts:5, //星数
        star:5, //评分
        selectNum:5,//选择的评分
        remnant:120, //剩余字数
        inputColor:false,//输入颜色
      }
    },
    created(){


    },
    mounted(){

    },
    methods:{
     /* getData () {
        this.$http.get(this.siteInfo+'?act=volunteer&op=comment_submit').then(res=>{

        })
      },*/
      sendData(){
//          this.volunteerOrgId = this.$route.query.volunteer_org_id
        this.recruit_id = this.$route.query.recruit_id
        this.toId = this.$route.query.to_id || '0'
        let qs = require('querystring')
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=comment_submit'
        let startNum = this.selectNum
        let areaString = this.content
        let parameters = qs.stringify({
          recruit_id:this.recruit_id,
          to_id:this.toId,
          star:startNum,
          content:areaString
        })
        if(areaString ==''){
          this.$toast({message:'评价内容不能为空', duration: 1500})
          return
        }
        console.log(startNum+"星评价："+areaString)
        this.$http.post(url,parameters).then(res=>{
          if (res.data.code == 200) {
            this.$toast('评价成功')
            setTimeout(()=>{
//                location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_member_list&recruit_id='+this.recruit_id
              location.href = decodeURIComponent(this.getCallback())
            },1000)
//              this._appjs.syJsbLaunchWebview(goBackurl)
//              this._appjs.syJsbCloseAppPage()
          } else if (res.data.code == 400) {
              this.$toast('操作失败')
          } else if (res.data.code == 401) {

          } else {
            this._appjs.syJsbAlert(res.data.message)
          }
        })
      },
      startClick (index) {
        this.star = index +1
        this.selectNum = this.star
      },
      descNum(len){
        let txtVal = this.content.length;
        txtVal !=0 ?this.inputColor = true : this.inputColor = false
        this.remnant = len -txtVal;
      },
      getCallback(){
        let arr = location.href.split('gycallback=')
        return arr.length > 1 ? arr[1] : '';
      },
    },
    computed:{
      itemClasses(){
        let starts = this.starts
        this.star > starts ? this.star = starts : this.star
        let result = []
        let isDecimals = this.star %1 !== 0;
        let integer = Math.floor(this.star)
        let star = Math.floor(this.star *2)/2
        for(let i=0; i<integer; i++){
          result.push("on")
        }
        if(isDecimals){
          result.push("half")
        }
        while(result.length < starts){
          result.push("off")
        }
        /*for(let j=result.length; j<starts; j++){
          result.push("off")
        }*/
//        console.log(result)
        return result;
      }
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
  .evaluate-descr textarea{outline:none}
  .evaluate-descr textarea{resize:none}
  .evaluate-con .after-scale-b:after{
    border-bottom: 1px solid rgba(218,222,228,0.6);
  }
  form{font-weight:300;}
  .top-line{
    width:100%;
    height:0.23rem;
    background:#f7f9fa;
  }
  .top-con{
    width:6.9rem;
    padding:0 0.3rem;
    height:0.84rem;
    display:flex;
    flex-flow:row nowrap;
    border-bottom: 1px solid rgba(218,222,228,0.6);
    .con-left{
      font-size:0.28rem;
      font-weight:300;
      line-height:0.84rem;
      color: #4B4F63;
    }
    .con-right{
      margin-left:2.1rem;
      padding-top:0.19rem;
      display:flex;
      flex-flow:row nowrap;
      li{
        margin-right:0.34rem;
        .start-item{
          width:0.52rem;
          height:0.5rem;
          background-repeat: no-repeat;
          background-size:100%;
        }
        .on{
          background-image:url(/bocm/platformjs/static/image/volunteer/star_selected.png);
        }
        .half{
          background-image:url(/bocm/platformjs/static/image/volunteer/half_star.png);
        }
        .off{
          background-image:url(/bocm/platformjs/static/image/volunteer/star_2x.png);
        }
      }
      li:last-of-type{
        margin-right:0;
      }

    }
  }
  .evaluate-descr{
    width:7.5rem;
    padding-bottom:0.23rem;
    box-sizing:border-box;
    border-bottom: 1px solid rgba(218,222,228,0.6);
    .txt-area{
      border:0;
      width:6.9rem;
      height:3.38rem;
      padding-top:0.21rem;
      color: #818C9E;
      font-size:0.28rem;
      line-height:0.42rem;
    }
    .right-txt{
      width:6.9rem;
      margin:0 auto;
      line-height:0.37rem;
      text-align:right;
      color: #DADEE4;
    }
    .input-color{
      color: #B1B8C4;
    }
  }
  .btn-bottom{
    position:fixed;
    left:50%;
    margin-left:calc(((6.9rem / 2)* -1));
    bottom:0.9rem;
    width:6.9rem;
    height:0.88rem;
    line-height:0.88rem;
    font-size:0.32rem;
    color:#fff;
    background: #4A90E2;
    border-radius:0.16rem;
  }
</style>
