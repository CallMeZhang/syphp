<template>
  <div class="wrapper-appraise">
    <div v-title="'评价详情'"></div>
    <div class="blank"></div>
    <div class="header">
      <img class="head-img" v-lazy="msg.member_avatar" alt=""><span class="name">{{msg.truename}}</span><span class="time">{{msg.add_time}}</span>
    </div>
    <div class="perfect-degree">
      <div class="degree-wrapper">
        <span>满意度</span>
        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/star.png'" alt="" v-for="n in parseInt(msg.star)" class="star">
        <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/volunteer/half_star.png'" alt="" v-if="!isInteger(msg.star)">

      </div>
      <div class="descript">{{msg.content}}</div>
    </div>
    <div class="blank" v-show="!gyfrom && msg.replay_content"></div>
    <div class="footer" v-show="!gyfrom && msg.replay_content">
      <div class="title" >组织管理员回复</div>
      <b class="arrow-top">
        <i class="top-arrow1"></i>
        <i class="top-arrow2"></i>
      </b>
    </div>
    <p class="appraise-txt" v-show="msg.replay_content">{{msg.replay_content}}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gyfrom:false,
        msg:{star:0 },
      }
    },
    created () {
      this.recruit_id = this.$route.query.recruit_id;
      this.member_id = this.$route.query.member_id;
      this.gyfrom = this.$route.query.gyfrom === 'member'; // 是否从我招募的志愿者列表 查看评价
      this.getData();

    },
    methods: {
      getData(){
        this.$http.get(this.query(this.gyfrom?'my_comment':'member_comment',{recruit_id:this.recruit_id,member_id:this.member_id})).then(res=>{

          if(res && res.data && res.data.code == 200){
            this.msg = res.data.content;
          }else{
            this._appjs.syJsbAlert(res.data.message)
          }
          this.isLoading = false;
        })

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
      isInteger(obj) {
        return obj%1 === 0
      },
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  $color: '#B1B8C4';

  .normal-color {
    color: $color;
    font-size: .32rem;
    font-weight: 300;
  }

  .wrapper-appraise {
    overflow: hidden;
    .blank {
      background: #F7F9FA;
      height: 0.2rem;
    }
    .header {
      text-align: left;
      height: 1.2rem;
      border-bottom: .01rem solid #DADEE4;
      .head-img {
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        border: 0;
        background: #D8D8D8;
        margin-top: 0.2rem;
        float: left;
        margin-left: 0.3rem;
        border-radius: 50%;
      }
      .name {
        margin-left: 0.2rem;
        line-height: 1.2rem;
        height: 100%;
        float: left;
        font-size: .28rem;
        color: #666A7F;
      }
      .time {
        float: right;
        font-size: .24rem;
        color: #B1B8C4;
        font-weight: 300;
        line-height: 1.2rem;
        margin-right: 0.3rem;
      }
    }
    .perfect-degree {
      overflow: hidden;
      padding: 0.23rem 0.3rem 0.21rem;
      text-align: left;
      .degree-wrapper {
        overflow: hidden;
        height: 0.3rem;
        span {
          margin-right: 0.1rem;
          font-size: .26rem;
          font-weight: 300;
          color: #4B4F63;
          line-height: 0.3rem;
        }
        span, img {
          float: left;
        }
        .star {
          display: inline-block;
          border: 0;
          width: 0.31rem;
          height: 0.3rem;
          margin-right: 0.06rem;
        }
      }
      .descript {
        font-size: 0.30rem;
        color: #666A7F;
        font-weight: 300;
        line-height: .46rem;
        margin-top: 0.18rem;
      }
    }
    .footer {
      height: 0.8rem;
      text-align: left;
      border-bottom: 0.01rem solid #DADEE4;
      position: relative;
      .title {
        font-size: .26rem;
        line-height: 0.8rem;
        padding-left: 0.3rem;
        color: #666A7F;
      }
    }
    .appraise-txt {
      font-size: .24rem;
      color: #818C9E;
      line-height: .36rem;
      padding: 0.22rem 0.3rem;
      text-align: left;
      font-weight: 300;
    }
  }
  .arrow-top {
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 2;
    left: .76rem;
    bottom: -0.02rem;
  }

  .top-arrow1{
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5; /*兼容ie8-*/
    border-top: 10px transparent dashed;
    border-left: 10px transparent dashed;
    border-right: 10px transparent dashed;
    border-bottom: 10px #DADEE4 solid;
    overflow: hidden;
  }
  .top-arrow2 {
     width: 0;
     height: 0;
     display: block;
     position: absolute;
     left: 0;
     top: 1px;
     z-index: 5; /*兼容ie8-*/
     border-top: 10px transparent dashed;
     border-left: 10px transparent dashed;
     border-right: 10px transparent dashed;
     border-bottom: 10px white solid;
     overflow: hidden;
   }
</style>
