<template>
  <div class="ration-archives">
    <div v-title="'公益档案'"></div>
    <transition name="fade">
      <loading v-show="!isLoading"></loading>
    </transition>
    <transition name="fade" style="z-index: 1000">
      <div v-show="isLoading">
        <!--主体start-->


        <div class="">
          <div class="empty"></div>
          <div class="archives-title">
            <div class="title-li">
              <div>全部项目</div>
              <div class="title-line"></div>
            </div>
            <div class="title-li">
              <div class="title-li-color">公益众筹</div>
              <div class="title-line title-line-color"></div>
            </div>
            <div class="title-li">
              <div>慈善募捐</div>
              <div class="title-line"></div>
            </div>
            <div class="title-li">
              <div>个人求助</div>
              <div class="title-line"></div>
            </div>
          </div>
          <!--列表  -->
          <div>
            <div class="list">
              <div class="list-l">
                <img src="/bocm/platformjs/static/image/sywelfare/icon-redxin.png" alt=""  class="list-img">
              </div>
              <div class="list-r">
                <div class="list-title">6.1倾听心灵的声音6.1倾听心灵的声音6.1倾听心灵的声音</div>
                <div class="list-date">2017/08/08  14:32</div>
                <div class="list-money">支持金额：<span class="money-color">￥1.00</span></div>
              </div>
            </div>
            <div class="order">
              <div class="order-number">订单号：XXXXXXXXXXXX</div>
              <div class="order-get">爱心回馈物品暂未发放</div>
            </div>
          </div>
          <div class="line"></div>

          <!-- start -->
          <!--列表  -->
          <div>
            <div class="list">
              <div class="list-l">
                <img src="/bocm/platformjs/static/image/sywelfare/icon-redxin.png" alt=""  class="list-img">
              </div>
              <div class="list-r">
                <div class="list-title">6.1倾听心灵的声音6.1倾听心灵的声音6.1倾听心灵的声音</div>
                <div class="list-date">2017/08/08  14:32</div>
                <div class="list-money">支持金额：<span class="money-color">￥1.00</span></div>
              </div>
            </div>
            <div class="order">
              <div class="order-number">订单号：XXXXXXXXXXXX</div>
              <div class="order-get"  style="display:none">爱心回馈物品暂未发放</div>
            </div>
          </div>
          <div class="line"></div>
          <!--列表  -->
          <div>
            <div class="list">
              <div class="list-l">
                <img src="/bocm/platformjs/static/image/sywelfare/icon-redxin.png" alt=""  class="list-img">
              </div>
              <div class="list-r">
                <div class="list-title">6.1倾听心灵的声音6.1倾听心灵的声音6.1倾听心灵的声音</div>
                <div class="list-date">2017/08/08  14:32</div>
                <div class="list-money">支持金额：<span class="money-color">￥1.00</span></div>
              </div>
            </div>
            <div class="order">
              <div class="order-number">订单号：XXXXXXXXXXXX</div>
              <div class="order-get" style="display:none">爱心回馈物品暂未发放</div>
            </div>
          </div>
          <div class="line"></div>
          <!--列表  -->
          <div>
            <div class="list">
              <div class="list-l">
                <img src="/bocm/platformjs/static/image/sywelfare/icon-redxin.png" alt=""  class="list-img">
              </div>
              <div class="list-r">
                <div class="list-title">6.1倾听心灵的声音6.1倾听心灵的声音6.1倾听心灵的声音</div>
                <div class="list-date">2017/08/08  14:32</div>
                <div class="list-money">支持金额：<span class="money-color">￥1.00</span></div>
              </div>
            </div>
            <div class="order">
              <div class="order-number">订单号：XXXXXXXXXXXX</div>
              <div class="order-get " style="display:none">爱心回馈物品暂未发放</div>
            </div>
          </div>
          <!-- end -->
        </div>
        <footer>
          <div class="footer">一起善源 爱 · 源于善</div>
        </footer>



        <!--主体end-->
      </div>
    </transition>


  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'

  export default {
    data() {
      return {
        isLoading:true,
        detail: 0,
      }
    },
    create(){this.isLoading = false},
    methods: {},
    components: {loading}
  }
</script>

<style scoped>
  .ration-archives {
    width:100%;
    background:#fff;
  }

  body{
    padding:0;
    margin:0;
    list-style:none;
  }
  *{
    padding:0;
    margin:0;
    list-style:none;
  }
  .archives{
    height:100%;
    width:100%;
    background:#fff;
  }
  .empty{
    height:.2rem;
    background: #F7F9FA;
  }
  .archives-title{
    height:.42rem;
    padding:.23rem .4rem .2rem;
    border-bottom: 1px solid #DADEE4;
  }
  .title-li{
    float:left;
    font-size: .3rem;
    color: #4B4F63;
    text-align:center;
  }
  .title:hover{
    color: #4A90E2;
  }
  .title-line{
    width:1.6rem;
    height:.04rem;
    margin-top:.3rem;
  }
  .title-li-color {
    color:#4A90E2;
  }
  .title-line-color {
    background: #4A90E2;
  }

  .list{
    height:2.59rem;
    /*opacity: 0.6;*/
    border-bottom: 1px dashed #DADEE4;
    position:relative;
  }
  .list-l{
    position:absolute;
    top:.39rem;
    left:.3rem;
    bottom:.2rem;
  }
  .list-r{
    position:absolute;
    top:.39rem;
    right:.3rem;
  }
  .list-img{
    width:2rem;
    height:2rem;
    background: #F7F9FA;
    border: 1px solid #DADEE4;
    border-radius: .11rem;
  }
  .list-title{
    width:4.7rem;
    font-size: .28rem;
    color: #4B4F63;
    line-height: .4rem;
    text-align:left;
  }
  .list-date{
    font-size: .24rem;
    line-height:.33rem;
    color: #B1B8C4;
    padding-top:.19rem;
    text-align:left;
  }
  .list-money{
    font-size: .26rem;
    line-height:.37rem;
    color: #4B4F63;
    padding-top:.18rem;
    text-align:left;
  }
  .money-color{
    color: #4A90E2;
  }
  .order{
    height:.71rem;
    position:relative;
  }
  .order-number{
    font-size: .24rem;
    color: #818C9E;
    line-height: .36rem;
    position:absolute;
    top:.12rem;
    left:.3rem;
  }
  .order-get{
    font-size: .24rem;
    color: #818C9E;
    line-height: .36rem;
    position:absolute;
    top:.12rem;
    right:.3rem;
  }
  .line{
    opacity: 0.6;
    /*border: .2px solid #DADEE4;*/
  }

  .footer {
    width: 100%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    background: #F7F9FA;
    font-size: 0.24rem;
    color: #DADEE4;
    font-weight: 300;
  }
</style>
