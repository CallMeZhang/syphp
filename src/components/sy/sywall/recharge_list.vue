<template>
  <div class="wrapper">
    <div v-title="'充值明细'"></div>
    <!--有充值记录-->
    <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText" :bottom-pull-text="bottomPullText"
                 :bottom-method="loadBottom" :bottom-all-loaded="bottomAllLoaded" :auto-fill="false" ref="loadmore">
      <div class="list" v-if="isList">
        <div class="item" v-for="item in list">
          <p class="p1">您充值{{item.pdr_amount}}元 <span class="fr">{{item.pdr_add_time}}</span></p>
          <p class="p2">
            <span>{{item.pdr_payment_name}}支付：{{item.pdr_trade_sn}}</span>
          </p>
        </div>
      </div>
    </mt-loadmore>
    <!--没有充值记录-->
    <div class="con" v-if="isRecharge">
      <div class="img">
        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-recharge2x.png'" alt="*.png">
        <p>您还没有任何充值记录</p>
      </div>
      <div class="btn" @click="goRecharge">
        <p>充值</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        isRecharge: false,
        isList: true,
        list: [],
        bottomAllLoaded: false, //是否可以上拉属性
        bottomPullText: '', //下拉加载的文字
        curpage: 2,//当前分页
        bottomDistance: 0,//触发上拉距离
        bottomDropText: ''

      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=depositLog').then(res => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.list = res.data.content
            this.isRecharge = false
            this.isList = true
          } else {
            this.isRecharge = true
            this.isList = false
          }
        })
      },
      goRecharge(){
        //跳转到充值页面
        let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=pd_recharge'
        this._appjs.syJsbLaunchWebview(url)
      },
      loadBottom () {
        if (this.bottomAllLoaded) {
//          固定方法 查询完固定一次
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=depositLog&curpage=' + this.curpage).then(res => {
          this.curpage++
          if (res.data.code === 400) {
            this.bottomAllLoaded = true
            this.$refs.loadmore.onBottomLoaded()
            return
          }
          this.list = this.list.concat(res.data.content)
          this.$refs.loadmore.onBottomLoaded()
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
  }

  .item .p1 {
    font-size: 0.3rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .item .p1 span {
    font-size: 0.24rem;
    color: #B1B8C4;
    font-weight: 300;
  }

  .item .p2 {
    padding-top: 0.09rem;
    font-size: 0.24rem;
    color: #B1B8C4;
    font-weight: 300;
  }

  .con {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .con .img {
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -40%);
    -moz-transform: translate(-50%, -40%);
    -ms-transform: translate(-50%, -40%);
    -o-transform: translate(-50%, -40%);
    transform: translate(-50%, -40%);
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

  .con .btn p {
    width: 6.9rem;
    height: 0.88rem;
    line-height: 0.88rem;
    background: #4A90E2;
    border-radius: 8px;
    color: #fff;
    font-size: 0.32rem;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    margin-left: -3.45rem;
  }
</style>
