<template>
  <div class="payment">
    <div v-title="'交纳报名费'"></div>
    <div class="userInfo">
      <div class="ming clearfix">
        <span class="fl">报名项</span>
        <span class="fr">半程马拉松</span>
      </div>
      <div class="money clearfix">
        <span class="fl">费用</span>
        <span class="fr">￥120.00</span>
      </div>
    </div>
    <div class="pay">
      <p class="slePay" style="box-sizing: border-box">选择支付方式</p>
      <div class="paySelect">
        <input type="hidden" v-model="key">
        <div class="payItem" v-for="i in 3" @click="select(i,$event)">
          <span><img src="../../../static/image/marathon/logo-sy.png" alt="中益钱包"></span>
          <div>
            <h2>中益钱包</h2>
            <p>仅支持中国银行的银行卡</p>
          </div>
          <i :class="{'act': nowIndex == i}"></i>
        </div>
      </div>
    </div>
    <div class="footer clearfix">
      <div class="add fl">合计：<span>￥120.00</span></div>
      <div class="btn fr" @click="send()">提交</div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        hide: false,
        nowIndex: 0,
        key: ''
      }
    },
    methods: {
      select (i, event) {
        this.hide = true
        console.log(i)
        this.nowIndex = i
        this.key = i
      },
      send (){
//          this.$http.get(url+key).then(res=>{
//              if(code === 200){
//                  跳转到支付页面
//              }else if(code ===)
//          })
      }
    }
  }
</script>
<style scoped>
  .userInfo div {
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    padding: 0 0.3rem;
    border-bottom: 1px solid #ddd;
    font-size: 0.3rem;
    color: #4B4F63;
    box-sizing: border-box;
    background-color: #fff;
  }

  .userInfo div span {
    font-weight: 300;
  }

  .userInfo div span:last-child {
    color: #818C9E;
  }

  .slePay {
    font-size: 0.26rem;
    color: #666A7F;
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: left;
    padding: 0 0.3rem;
    font-weight: 300;
  }

  .payItem {
    width: 100%;
    height: 1.2rem;
    /*line-height: 1.2rem;*/
    border-bottom: 1px solid #ddd;
    text-align: left;
    padding: 0 0.3rem;
    background-color: #fff;
    box-sizing: border-box;
  }

  .payItem span {
    display: inline-block;
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.22rem;
    margin-top: 0.35rem;
  }

  .payItem span img {
    width: 100%;
    height: 100%;
  }

  .payItem div {
    display: inline-block;
  }

  .payItem h2 {
    font-size: 0.30rem;
    color: #4B4F63;
    padding-bottom: 0.1rem;
    font-weight: 300;
  }

  .payItem p {
    font-size: 0.24rem;
    color: #B1B8C4;
    font-weight: 300;
  }

  .payItem .act {
    display: inline-block;
    /*display: none;*/
    float: right;
    width: 0.42rem;
    height: 0.37rem;
    background: pink;
    margin-top: 0.41rem;
    background: url("../../../static/image/marathon/icon-dg.png") no-repeat;
    -webkit-background-size: 0.42rem, 0.37rem;
    background-size: 0.42rem, 0.37rem;
  }

  .footer {
    width: 100%;
    height: 1rem;
    position: fixed;
    line-height: 1rem;
    bottom: 0;
    left: 0;
  }

  .footer .add {
    width: 65%;
    background-color: #fff;
    font-size: 0.3rem;
    color: #4B4F63;
    padding: 0 0.3rem;
    text-align: left;
    box-sizing: border-box;
  }

  .footer .add span {
    color: #4A90E2;
  }

  .footer .btn {
    width: 35%;
    background: #4A90E2;
    color: #fff;
    font-size: 0.3rem;
    text-align: center;
  }
</style>
