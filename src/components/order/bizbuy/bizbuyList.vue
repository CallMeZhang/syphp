<template>
  <div class="top-content">
    <!--tab start-->
    <div v-title="'单位集采清单'"></div>
    <div class="table-list"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="navbar">
      <span
        @click="loadUrl">采购记录</span>
          <span @click.prevent="active = 'tab-container2'"
                :class="active=='tab-container2'?'nar-activity':''">单位集采</span>
        </div>
        <div class="page-tab-container">
          <mt-tab-container class="page-tabbar-tab-container" v-model="active">
            <mt-tab-container-item id="tab-container1">
              <div class="tab-content">
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2" class="">
              <div v-if="listData.length!==0" class="jcqd-list">
                <div v-for="item in listData" class="jcqd-item">
                  <div class="item-sel-c">
                    <span @click="isSel=false;choose(item)"
                          :class="item.goods_state==0?'item-unsel-n':item.state ? 'item-sel-y':'item-sel-n'"></span>
                  </div>
                  <div class="item-goods">
                    <div class="item-goods-l">
                      <img src="../../../../static/image/detail/youp.png" style="width: 0.32rem;height: 0.52rem;position: absolute;top: 0;left: 0.16rem" alt="" v-if="item.is_quality_goods==='true'">
                      <img :src="item.goods_image_url" alt="商品图片">
                      <div v-if='item.goods_state==0' class="unUp">已下架</div>
                    </div>
                    <div class="item-goods-r">
                      <div class="item-goods-title">{{item.goods_name}}</div>
                      <div class="item-goods-b">
                        <div class="item-goods-price"><span>￥</span>{{item.goods_price}}</div>
                        <!--<div class="item-goods-pifa-icon">批</div><div class="item-goods-pifa-price"><span>￥</span>{{item.goods_price}}</div>-->
                        <div class="item-goods-ku">库存 {{item.goods_storage}}</div>
                      </div>
                      <div class="item-goods-pian" v-if="item.minfreight_list.length!=0" @click="showErrorInfo(item)">
                        偏远地区起售限制  查看
                      </div>
                    </div>
                  </div>
                </div>
                <div class="goods-more" @click="chooseGoods">挑选更多产品&nbsp;
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/union/list_title_right.png'" alt="">
                </div>
              </div>
              <div v-if="listData.length===0" class="jcqd-no">
                <div class="nogoods-img">
                  <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/bizbuy/nogoods.png'">
                </div>
                <div class="nogoods-des">您还没有心仪的采购产品</div>
                <div class="nogoods-btn" @click="chooseGoods">去挑选  <span>></span></div>
              </div>
              <div class="table-list"></div>
              <div class="hot-list ">
                <div class="title">
                  <span class="hot-title-img"></span><span>热门集采产品</span>
                </div>
                <div class="product-list">
                  <div style="position: relative" class="child-div" v-for="item in hotData"
                       @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=project&op=project_detail&gc_id='+item.goods_commonid)">
                    <img src="../../../../static/image/detail/youp.png" style="width: 0.32rem;height: 0.52rem; position: absolute;top: 0;left: 0.16rem" alt="" v-if="item.is_quality_goods==='true'">
                    <img :src="item.goods_image_url" alt="">
                    <p>{{item.goods_name}}</p>
                    <p class="two"><span>￥</span>{{item.goods_price}}</p>
                  </div>
                </div>
              </div>
              <div class="footer iphonex-padding-bottom">
                <div class="footer-one">
                  <span class="one" @click="allChoose" :class="isSel ? 'item-sel-y on-border':''"></span>
                  <span class='two'>全选</span>
                  <span class='five' v-if='!isEdit' @click="isEdit=!isEdit;delChoose()">完成</span>
                  <span class='four' v-if='!isEdit' @click="delData">删除</span>
                  <span class='three' v-if='isEdit' @click="isEdit=!isEdit">编辑</span>
                </div>
                <div class="footer-two">
                  <div class="footer-two-left">已选<span>{{number}}</span>款产品</div>
                  <div class="footer-two-right" @click="sendDataFn">确认采购</div>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
        <div class="iphonex-div"></div>
      </div>
    </transition>
  </div>
</template>
<script>
  import { Navbar, TabItem, MessageBox } from 'mint-ui'
  import { Toast } from 'mint-ui'
  import loading from '@/components/loading/loading.vue'

  export default {
    data () {
      return {
        isLoading: true,
        active: 'tab-container2',
        isSel: false,
        listData: [],
        hotData: [],
        sendData: [],
        isEdit: true,
        storage: null,
        _hub: null
      }
    },
    created () {
      this.getData()
      this.getDataHot()
    },
    components: {loading},
    computed: {
      number: function () {
        var index = 0
        for (var i = 0; i < this.listData.length; i++) {
          if (this.listData[i].state) {
            index++
          }
        }
        return index
      },
    },
    mounted () {

    },
    methods: {
      loadUrl () {
        window.location.href = this.siteInfo.host + '/bocm/index.php?act=bizbuy&op=my_biz_order_list'
      },
      chooseGoods () {
        window.location.href = this.siteInfo.host + '/bocm/index.php?act=goods&op=bizbuy_goods_list'
//        this.$router.push({path:this.siteInfo.host+''})
      },
      showErrorInfo (item) {
        MessageBox.alert(item.minfreight_info_str, '').then(action => {
        })
      },
      deleteList () {
        for (var i = 0; i < this.listData.length; i++) {
          if (this.listData[i].state) {
            this.listData.splice(i, 1)
            i--
          }
        }
      },
      getData () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_cart_list'
        this.$http.get(url).then((res) => {
          this.isLoading = false
          if (res.data.code === 200) {
            this.listData = res.data.content

          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      delData () {
        this.postData()
        var sendData = []
        for (var i = 0; i < this.sendData.length; i++) {
          sendData.push(this.sendData[i].cart_id)
        }
        if (sendData.length === 0) {
          Toast('您未选择要删除的商品')
          // this._appjs.showToast('您未选择要删除的商品')
          return
        }
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=edit_biz_cart&cart_ids=' + sendData + '&optype=del'
        this.$http.get(url).then((res) => {

          if (res.data.code === 200) {
            Toast('删除成功')
            //this._appjs.showToast('删除成功')
            this.deleteList()
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      sendDataFn () {
        this.postData()
        if (this.sendData.length === 0 || !this.isEdit) {
          if (this.sendData.length === 0) {
            this._appjs.showToast('未选择商品','success')
            //alert('未选择商品')
          }
          return
        }
        localStorage.setItem('goods', JSON.stringify(this.sendData))
        localStorage.setItem('goodsAddress', '-1')
//        window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=biz_invoice'
        localStorage.setItem('addressPaper', '-1')
        this.$router.push({path: '/jicaiUnit'})
      },
      getDataHot () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_hot_goods'
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.hotData = res.data.content
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      delChoose () {
        for (var i = 0; i < this.listData.length; i++) {
          if (this.listData[i].goods_state == 0 || this.listData[i].goods_storage == 0) {
            this.$set(this.listData[i], 'state', false)
          }
        }
      },
      allChoose () {
        this.isSel = !this.isSel
        for (var i = 0; i < this.listData.length; i++) {
          if (!this.isEdit || this.listData[i].goods_state != 0 && this.listData[i].goods_storage != 0) {
            this.isSel ? this.$set(this.listData[i], 'state', true) : this.$set(this.listData[i], 'state', false)
          }
        }
      },
      choose (item) {
        if (!this.isEdit || item.goods_state != 0 && item.goods_storage != 0) {
          !item.state ? this.$set(item, 'state', true) : this.$set(item, 'state', false)
        }
      },
      postData () {
        this.sendData = []
        for (var i = 0; i < this.listData.length; i++) {
          if (this.listData[i].state) {
            this.$set(this.listData[i], 'count', 0)
            this.sendData.push(this.listData[i])
          }
        }
      }
    },
  }
</script>
<style>
  .mint-msgbox-message {
    font-size: .32rem;
    color: rgba(0, 0, 0, 0.54);
    line-height: .46rem;
  }

  .mint-msgbox-content {
    border: 0;
  }

  .mint-msgbox-confirm {
    font-size: .28rem;
    color: #4A90E2;
    letter-spacing: 1px;
  }
</style>
<style lang="scss" scoped>

  .jct-check-c {
    width: 6.5rem;
    height: 0.4rem;
  }

  .jct-check-sel {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border: 1px solid #dadee4;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .jct-check-sel img {
    width: 100%;
    height: 100%;
  }

  .jct-check-z {
    display: inline-block;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.26rem;
    color: #666A7F;
    vertical-align: bottom;
    margin-left: 0.1rem;
  }

  .jct-btn {
    width: 2.7rem;
    height: 0.8rem;
    background: #4A90E2;
    border-radius: 0.08rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    margin: 0.4rem 0.3rem 0 0;
    display: inline-block;
  }

  .jct-btn2 {
    width: 2.7rem;
    height: 0.8rem;
    background: #4A90E2;
    border-radius: 0.08rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    display: inline-block;
  }

  img {
    border: 0;
  }

  .page-tab-container {
    margin-bottom: 2rem;
    overflow: hidden;
    .tab-content {
      .tab-one {
        height: 100%;
        .love-img {
          margin: 0.99rem auto 0;
          width: 1.61rem;
          height: 1.99rem;
        }
        .love-txt {
          height: 0.87rem;
          line-height: 0.87rem;
          font-size: 0.28rem;
          color: #B1B8C4;
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    width: 100%;
    .footer-one {
      height: 0.67rem;
      padding: 0.23rem 0.3rem 0 0.3rem;
      border-top: 1px solid #DADEE4;
      border-bottom: 1px solid #DADEE4;
      span {
        float: left;
        line-height: 0.46rem;
        font-size: .28rem;
      }
      span.one {
        border: 1px solid #DADEE4;
        border-radius: 50%;
        width: 0.4rem;
        height: 0.4rem;
        display: inline-block;
        margin-top: 0;
        box-sizing: border-box;
      }
      span.on-border {
        border: 0;
      }
      span.two {
        vertical-align: middle;
        color: #4B4F63;
        letter-spacing: 0;
        margin-left: 0.2rem;
      }
      span.three {
        float: right;
        color: #4A90E2;
        letter-spacing: 0;
      }
      span.four {
        float: right;
        color: #F25B4B;
        letter-spacing: 0;
      }
      span.five {
        float: right;
        color: #4A90E2;
        letter-spacing: 0;
        margin-left: 0.8rem;
      }
    }
    .footer-two {
      box-sizing: border-box;
      height: 1rem;
      .footer-two-left, .footer-two-right {
        height: 1rem;
        float: left;
        line-height: 1rem;
        box-sizing: border-box;
      }
      .footer-two-left {
        width: 3.3rem;
        font-size: .28rem;
        color: #4B4F63;
        letter-spacing: 0;
        text-align: left;
        padding-left: 0.3rem;
        span {
          padding: 0 0.1rem;
          font-size: .28rem;
          color: #4A90E2;
          letter-spacing: 0;
          line-height: .40rem;
        }
      }
      .footer-two-right {
        width: 4.2rem;
        background: #4A90E2;
        font-size: .30rem;
        color: #FFFFFF;
        letter-spacing: 0;
      }
    }
  }

  .hot-list {
    .title {
      padding: 0.27rem 0.3rem 0.28rem 0.3rem;
      text-align: left;
      .hot-title-img {
        display: inline-block;
        width: 0.06rem;
        height: 0.4rem;
        background: #F8E71C;
        box-shadow: 0 0 .16rem 0 #F0D35B;
        border-radius: 1.1719rem;
      }
      span {
        margin-right: 0.1rem;
        font-size: .32rem;
        color: #4B4F63;
        vertical-align: middle;
      }
    }
    .product-list {
      overflow: hidden;
      padding: 0 0.25rem 0;
      > div.child-div {
        float: left;
        width: 3.4rem;
        height: 4.12rem;
        margin: 0 0.05rem;
        overflow: hidden;
        img {
          display: block;
          width: 3.4rem;
          height: 2.38rem;
          background: #eee;
          border-radius: 0.08rem;
        }
        p {
          margin-top: 0.26rem;
          width: 3.16rem;
          text-align: left;
          font-size: .28rem;
          color: #4B4F63;
          line-height: .38rem;
          margin-bottom: 0.13rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        p.two {
          font-size: .30rem;
          color: #4A90E2;
          line-height: .31rem;
          margin: 0;
        }
        span {
          font-size: .26rem;
          color: #4A90E2;
        }
      }
    }
  }

  .top-content {
    background: #fff;
  }

  .table-list {
    height: 0.2rem;
    background: #F7F9FA;
  }

  .navbar {
    height: 0.9rem;
    border-bottom: 0.01rem solid #DADEE4;
    box-sizing: border-box;
  }

  .navbar span:nth-last-of-type(2) {
    margin-left: 0.9rem;
    float: left;
  }

  .navbar span:nth-last-of-type(1) {
    margin-right: 0.9rem;
    float: right;

  }

  .navbar span {
    height: 0.86rem;
    line-height: 0.87rem;
    font-size: 0.30rem;
    color: #4A90E2;
    display: inline-block;
    width: 1.8rem;
    overflow: hidden;
  }

  .navbar .nar-activity {
    color: #4A90E2;
    border-bottom: 0.04rem solid #4A90E2;
  }

  .jcqd-list {
    margin-top: 0.1rem;
  }

  .jcqd-item {
    height: 2.12rem;
    width: 7.5rem;
    overflow: hidden;
  }

  .item-sel-c {
    width: 1rem;
    height: 2.12rem;
    float: left;
  }

  .item-sel-n {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.86rem auto 0;
    box-sizing: border-box;
    border: 1px solid #DADEE4;
    border-radius: 50%;
  }

  .item-sel-y {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.86rem auto 0;
    background: url("/bocm/platformjs/static/image/checked_address.png") no-repeat center;
    background-size: 0.4rem;
  }

  .item-unsel-n {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.86rem auto 0;
    background: url("/bocm/platformjs/static/image/default/unable_c2x.png") no-repeat center;
    background-size: 0.4rem;
  }

  .item-goods {
    width: 6.5rem;
    height: 2.12rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e9ebef;
    float: left;
    padding: 0.29rem 0.3rem 0.29rem 0;
  }

  .item-goods-l {
    width: 2.2rem;
    height: 1.54rem;
    float: left;
    position: relative;
    img {
      width: 2.2rem;
      height: 1.54rem;
      background: #EBF4FF;
    }
    .unUp {
      position: absolute;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      font-size: .26rem;
      color: #4B4F63;
      top: 0.27rem;
      left: 0.6rem;
      background: #FFFFFF;
      line-height: 1rem;
      text-align: center;
    }
  }

  .item-goods-r {
    width: 3.8rem;
    height: 1.54rem;
    float: left;
    margin-left: 0.2rem;
  }

  .item-goods-title {
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: left;
  }

  .item-goods-b {
    width: 3.8rem;
    height: 0.31rem;
    overflow: hidden;
    padding-top: 0.05rem;
  }

  .item-goods-price {
    font-size: 0.28rem;
    color: #4A90E2;;
    line-height: 0.31rem;
    text-align: left;
    margin-top: 0.06rem;
    float: left;
    span {
      font-size: 0.26rem;
    }
  }

  .item-goods-pifa-icon {
    float: left;
    width: 0.3rem;
    height: 0.3rem;
    background: #F25B4B;
    border-radius: 0.04rem;
    margin-left: 0.16rem;
    font-size: 0.24rem;
    color: #fff;
    line-height: 0.3rem;
    text-align: center;
  }

  .item-goods-pifa-price {
    font-size: 0.28rem;
    color: #F25B4B;
    line-height: 0.31rem;
    text-align: left;
    margin-top: 0.06rem;
    float: left;
    span {
      font-size: 0.26rem;
    }
  }

  .item-goods-ku {
    font-size: 0.26rem;
    color: #818C9E;
    line-height: 0.31rem;
    float: right;
    margin-top: .06rem;
  }

  .item-goods-pian {
    font-size: 0.24rem;
    color: #B1B8C4;
    line-height: 0.42rem;
    text-align: left;
    margin-top: 0.05rem;
  }

  .goods-more {
    height: 0.87rem;
    line-height: 0.87rem;
    font-size: 0.28rem;
    color: #B1B8C4;
  }

  .goods-more img {
    width: 0.12rem;
    height: 0.22rem;
  }

  .jcqd-no {
    width: 7.5rem;
    height: 6.51rem;
  }

  .nogoods-img {
    margin: 0.99rem auto 0;
    width: 1.61rem;
    height: 1.99rem;
  }

  .nogoods-img img {
    width: 100%;
    height: 100%;
  }

  .nogoods-des {
    font-size: 0.32rem;
    color: #DADEE4;
    height: 0.45rem;
    line-height: 0.45rem;
    margin-top: 0.56rem;
  }

  .nogoods-btn {
    width: 2.6rem;
    height: 0.88rem;
    border: 1px solid #4A90E2;
    border-radius: 0.08rem;
    font-size: 0.32rem;
    color: #4A90E2;
    line-height: 0.88rem;
    text-align: center;
    margin: 0.64rem auto 0;
  }

  .nogoods-btn span {
    display: inline-block;
    transform: scaleY(2);
    font-size: 0.2rem;
  }
</style>
