<template>
  <div class="wrapper">
    <div v-title="'使用明细'"></div>
    <div v-if="isList">
      <div class="header">
        <p class="money">{{intNum}}.<span>{{foolNum}}</span></p>
        <p class="add">累计捐赠（元）</p>
      </div>
      <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText"
                   :bottom-pull-text="bottomPullText" :bottom-method="loadBottom" :bottom-all-loaded="bottomAllLoaded"
                   :auto-fill="false" ref="loadmore">
        <div class="list">
          <div class="item" v-for="item in list">
            <p class="p1">{{item.log_desc}}</p>
            <p class="p2 clearfix">
              <span class="fl time">{{item.add_time}}</span>
              <span class="fr">￥ {{item.total_amount}}</span>
            </p>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <div class="con" v-if="isUsage">
      <div class="img">
        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-usage.png'" alt="usage.png">
        <p>您还没有使用记录</p>
      </div>
      <div class="btn" @click="goProject">
        <p>去看看有什么项目</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        isUsage: false,
        isList: true,
        list: [],
        intNum: '',
        foolNum: '',
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
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=usedLog').then(res => {
          if (res.data.code == 200) {
            this.list = res.data.content.list
            var sum_amount = res.data.content.sum_amount
            this.intNum = sum_amount.split('.')[0]
            this.foolNum = sum_amount.split('.')[1]
            this.isUsage = false
            this.isList = true
          } else {
            this.isUsage = true
            this.isList = false
          }
        })
      },
      goProject(){
        let url = this.siteInfo.host + '/bocm/index.php?act=pubwel_router&op=pubwel_list'
        this._appjs.syJsbLaunchWebview(url)
      },
      loadBottom () {
        if (this.bottomAllLoaded) {
//          固定方法 查询完固定一次
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=usedLog&curpage=' + this.curpage).then(res => {
          this.curpage++
          if (res.data.code === 400) {
            this.bottomAllLoaded = true
            this.$refs.loadmore.onBottomLoaded()
            return
          }
          this.list = this.list.concat(res.data.content.list)
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

  .header {
    width: 100%;
    height: 2.5rem;
    box-sizing: border-box;
    padding: 0.81rem 0 0.68rem;
    background-image: linear-gradient(0deg, #4A90E2 0%, #2AA7DC 74%);
    color: #fff;
  }

  .header .money {
    padding-bottom: 0.2rem;
    font-size: 0.6rem;
  }

  .header .money span {
    font-size: 0.36rem;
  }

  .header .add {
    font-size: 0.32rem;
  }

  .list {
    margin-top: 0.2rem;
    background-color: #fff;
  }

  .list .item {
    box-sizing: border-box;
    padding: 0.23rem 0.3rem 0.21rem;
    width: 100%;
    box-shadow: inset 0 1px 0 0 rgba(218, 222, 228, 0.60), inset 0 -1px 0 0 rgba(218, 222, 228, 0.60);
    text-align: left;
    margin-top: -1px;
  }

  .item .p1 {
    font-size: 0.3rem;
    color: #4B4F63;
    font-weight: 300;
    padding-top: 0.02rem;
    padding-bottom: 0.02rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item .p2 {
    padding-top: 0.13rem;
    font-size: 0.28rem;
    color: #818C9E;
    font-weight: 300;
  }

  .item .time {
    font-size: 0.24rem;
    color: #B1B8C4;
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
    position: absolute;
    bottom: 1rem;
    left: 50%;
    margin-left: -3.45rem;
    border: 1px solid #4A90E2;
    border-radius: 0.08rem;
    color: #4A90E2;
    font-size: 0.32rem;
    font-weight: 300;
  }
</style>
