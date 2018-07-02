<template>
  <div>
    <div v-title="'招募信息审核结果'"></div>
    <div class="wrapper">
      <div class="header">
        <img src="../../../static/image/volunteer/icon-fail.png" alt="fail">
        <p>审核未通过</p>
      </div>
      <div class="volcontent">
        <div>
          <span class="span1">招募信息名称：</span>
          <span class="span2">{{recruit_name}}</span>
        </div>
        <div>
          <span class="span1">提&nbsp;&nbsp;审&nbsp;&nbsp;&nbsp;时&nbsp;&nbsp;间：</span>
          <span class="span2">{{add_time}}</span>
        </div>
        <div>
          <span class="span1">审&nbsp;&nbsp;核&nbsp;&nbsp;&nbsp;时&nbsp;&nbsp;间：</span>
          <span class="span2">{{addtime}}</span>
        </div>
      </div>
      <div class="volresult">
        <div class="voltit">审核未通过原因：</div>
        <div class="volCon">{{log_do}}</div>
      </div>
      <div class="footer">
        <p class="p1">修改招募信息请在电脑浏览器中操作</p>
        <p class="p2">网址：https://www.17shanyuan.com/zyz </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        recruit_name:'',//名称
        add_time:'', //提审时间
        addtime:'', //审核时间
        log_do:'' //拒绝原因
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        let recruit_id = this.$route.query.recruit_id
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=get_my_refused_recruit&recruit_id='+recruit_id).then(res=>{
          let a = res.data.content
          if(res.data.code == 200){
            this.recruit_name = a.recruit_name
            this.add_time = a.add_time
            this.addtime = a.addtime
            this.log_do = a.log_do
          }else {
            this._appjs.syJsbAlert(res.data.message)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    .header{
      padding-top: 0.8rem;
      padding-bottom: 0.37rem;
      text-align: center;
      img{
        width: 1.6rem;
        height: 1.6rem;
        margin-bottom: 0.31rem;
      }
      p{
        font-size: 0.4rem;
        color: #4A90E2;
        line-height: 0.56rem;
      }
    }
    .volcontent{
      margin-top: 0.37rem;
      padding-left: 0.5rem;
      div{
        margin-bottom: 0.1rem;
        text-align: left;
      }
      .span1{
        display: inline-block;
        width: 2.3rem;
        font-size: 0.3rem;
        color: #4B4F63;
        line-height: 0.42rem;
        text-align: justify;
      }
      .span2{
        font-size: 0.3rem;
        color: #818C9E;
      }
    }
    .volresult{
      padding: 0.32rem 0.5rem 0;
      text-align: left;
      .voltit{
        font-size: 0.3rem;
        color: #4B4F63;
      }
      .volCon{
        font-size: 0.28rem;
        color: #818C9E;
        line-height: 0.4rem;
        padding-top: 0.2rem;
      }
    }
    .footer{
      position: absolute;
      bottom: 0.85rem;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      .p1{
        font-size: 0.32rem;
        color: #B1B8C4;
      }
      .p2{
        font-size: 0.28rem;
        color: #A1C5EF;
        line-height: 45px;
      }
    }
  }
</style>