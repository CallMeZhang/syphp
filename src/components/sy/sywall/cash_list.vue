<template>
  <div class="wrapper">
    <div v-title="'提现记录'"></div>
    <div class="list" v-if="show">
      <div class="item">
        <p class="p1 clearfix">
          <span class="fl font">提取至尾号3456 中国银行借记卡</span>
          <span class="fr price">￥ 200.00</span>
        </p>
        <p class="p2 clearfix">
          <span class="fl time">2017年8月10日 23:21</span>
          <span class="fr" :class="[{blue:true},{red:false}]">提取成功</span>
        </p>
      </div>
      <div class="item">
        <p class="p1 clearfix">
          <span class="fl font">提取至尾号3456 中国银行借记卡</span>
          <span class="fr price">￥ 200.00</span>
        </p>
        <p class="p2 clearfix">
          <span class="fl time">2017年8月10日 23:21</span>
          <span class="fr" :class="[{blue:false},{red:true}]">提取处理中</span>
        </p>
      </div>
    </div>
    <div class="con" v-if="hide">
      <div class="img">
        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-cash.png'" alt="icon">
        <p>您还没有提现记录</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        show: true,
        hide: false,
        list:{}
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=withdrawCashLog').then(res => {
          if (res.data.code == 200) {
            this.list = res.data.content
            this.hide = false
            this.show = true
          } else {
            this.hide = true
            this.show = false
          }
        })
      }
    }
  }
</script>
<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
  }

  .list {
    margin-top: 0.2rem;
    background-color: #fff;
  }

  .list .item {
    box-sizing: border-box;
    padding: 0.32rem 0.3rem 0.28rem;
    width: 100%;
    box-shadow: inset 0 1px 0 0 rgba(218, 222, 228, 0.60), inset 0 -1px 0 0 rgba(218, 222, 228, 0.60);
    text-align: left;
    margin-top: -1px;
    font-size: 0.28rem;
  }

  .list .item .p1 {
    padding-top: 0.02rem;
  }

  .list .item .p1 .font {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #4B4F63;
    font-weight: 300;
  }

  .list .item .p1 .price {
    color: #818C9E;
  }

  .list .item .p2 {
    padding-top: 0.09rem;
  }

  .list .time {
    font-size: 0.24rem;
    color: #B1B8C4;
    font-weight: 300;
  }

  .list .blue {
    font-size: 0.24rem;
    color: #4A90E2;
    font-weight: 300;
  }

  .list .red {
    font-size: 0.24rem;
    color: #F25B4B;
    font-weight: 300;
  }

  .con {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .con .img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .con img {
    width: 2.4rem;
    height: 2.4rem;
    margin-bottom: 0.65rem;
  }

  .con .img p {
    font-size: 0.32rem;
    color: #B1B8C4;
    font-weight: 300;
  }
</style>
