<template>
  <div class="top-content">
    <!--tab start-->
    <div v-title="'单位集采'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div style="position:fixed;top:0px;overflow-y:scroll;height: 100%;-webkit-overflow-scrolling:touch;">
      <div v-show="!isLoading">
        <div class="process">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/users/middle.png'" alt="">
          <p><span>发票信息</span><span class="middle activity">采购量和配送</span><span class="">核对订单</span></p>
        </div>
        <div class="address-list">
          <div v-for="(item,index) in goodsAddressList" v-if="goodsAddressList.length!==0">
            <div class="address-title"><span class="span-one">配送地址{{changeNumber(index + 1)}}</span>
              <span class="span-three" @click="editChooseAddress(item.address.address_id)">编辑</span>
              <span class="span-two" @click="del(item.address.address_id)">删除</span>
            </div>
            <div class="goods-list">
              <p class="one"><span class="name">{{item.address.true_name}}</span><span
                class="tell">{{item.address.mob_phone}}</span></p>
              <p class="two">{{item.address.area_info + item.address.address}}</p>
              <div class="goods-wrapper">
                <div class="goods-item" v-for="iem in item.goodsList">
                  <img :src="iem.goods_image_url" alt="" class="goods-img" @click="showInfo(iem)">
                  <p class="hander">
                    <span class="left"
                          @click="iem.count<1||delCount({address_id:item.address.address_id,goods_id:iem.goods_id})"> - </span>
                    <input class='middle' type="number" :value="iem.count"
                           @change="setGoodsNumber($event,{address_id:item.address.address_id,goods_id:iem.goods_id})">
                    <span class="right"
                          @click="addCount({address_id:item.address.address_id,goods_id:iem.goods_id})">+</span>
                  </p>
                </div>
              </div>
            </div>
            <div style="background: #F7F9FA;height: 0.2rem"></div>
          </div>
          <div class="btn-wrapper">
            <div class="button" @click="goChooseAddress">+&nbsp;配送地址</div>
          </div>
          <div class="tab-one-footer iphonex-padding-bottom">一起善源 爱 · 源于善</div>
        </div>
      </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="showModal" class="modal-bg" @click="showModal=false" @touchmove.prevent>
        <div class="modal-info">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/close.png'" alt="" class="modal-close"
               @click="showModal=false">
          <p class="title">{{'商品详情'}}</p>
          <img :src="showData.goods_image_url" alt="" class="modal-img">
          <p class="modal-dec">{{showData.goods_name}}</p>
          <p class="modal-price">￥ <span>{{showData.goods_price}}</span></p>
        </div>
      </div>
    </transition>
    <div class="footer iphonex-padding-bottom">
      <div class="footer-two">
        <div class="footer-two-left">分 <span
          class="red-color"> {{goodsAddressList.length}} </span>处配送<br>共<span>{{'￥' + allPay}}</span></div>
        <div class="footer-two-right" @click="sendDataFn">下一步：核对订单</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import loading from '@/components/loading/loading.vue'

  export default {
    data () {
      return {
        isLoading: true,
        watch: [],
        dataListArr: [],
        listData: [],
        goodsAddressList: [],
        showModal: false,
        showData: ''
      }
    },
    created () {
      localStorage.setItem('routerParth', '')
      if (localStorage.getItem('goodsAddress')) {
        this.isLoading = false
        var gAList = JSON.parse(localStorage.getItem('goodsAddress'))
        if (gAList.constructor === Array && gAList.length !== 0) {
          var dataList = gAList
          this.goodsAddressList = dataList
        } else {
          this.getData()
        }
      }
      else {
        this.getData()
      }
    },
    computed: {
      allPay () {
        var count = 0
        for (var i = 0; i < this.goodsAddressList.length; i++) {
          for (var k = 0; k < this.goodsAddressList[i].goodsList.length; k++) {
            count += this.goodsAddressList[i].goodsList[k].goods_price * this.goodsAddressList[i].goodsList[k].count
          }
        }
        return count.toFixed(2)
      },
    },

    mounted () {
    },
    watch: {},
    methods: {
      showInfo (item) {
        this.showData = item
        this.$nextTick(function () {
          this.showModal = true
        })
      },
      del (Payload) {
        for (var i = 0; i < this.goodsAddressList.length; i++) {
          if (Payload === this.goodsAddressList[i].address.address_id) {
            if (this.goodsAddressList.length - 1 <= 0) {
              this._appjs.showToast('配送地址不能为空','success')
              //alert('')
              return
            }
            this.goodsAddressList.splice(i, 1)
          }
        }
        localStorage.setItem('goodsAddress', JSON.stringify(this.goodsAddressList))
      },
      changeNumber (str) {
        str = str + ''
        var num = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九']
        var data = ''
        for (var i = 0; i < str.length; i++) {
          data += num[str[i]]
        }
        if (str == 10) {
          data = '十'
        }
        return data
      },
      delCount (Payload) {
        var x = 0, y = 0, countx = 0, county = 0
        for (var i = 0; i < this.goodsAddressList.length; i++) {
          if (Payload.address_id === this.goodsAddressList[i].address.address_id) {
            for (var k = 0; k < this.goodsAddressList[i].goodsList.length; k++) {
              if (Payload.goods_id === this.goodsAddressList[i].goodsList[k].goods_id) {
                x = i
                y = k
                for (var j = 0; j < this.goodsAddressList[x].goodsList.length; j++) {
                  countx += this.goodsAddressList[x].goodsList[j].count
                }
                //地址不能为0
                for (var j = 0; j < this.goodsAddressList.length; j++) {
                  county += this.goodsAddressList[j].goodsList[y].count
                }
                if (countx > 1 && county > 1) {
                  this.goodsAddressList[i].goodsList[k].count--
                } else if (county > 1) {
                  this._appjs.showToast('同一地址商品发货量不能为0','success')
                  //alert('')
                } else if (countx > 1) {
                  this._appjs.showToast('同一商品发货量不能为0','success')
                  //alert('同一商品发货量不能为0')
                } else {
                  this._appjs.showToast('同一地址同一商品发货量都不能为0','success')
                  //alert('同一地址同一商品发货量都不能为0')
                }
                return
              }
            }
          }
        }
      },
      addCount (Payload) {
        var dataLength = this.goodsAddressList.length
        for (var i = 0; i < dataLength; i++) {
          if (Payload.address_id === this.goodsAddressList[i].address.address_id) {
            for (var k = 0; k < this.goodsAddressList[i].goodsList.length; k++) {
              if (Payload.goods_id === this.goodsAddressList[i].goodsList[k].goods_id) {
                var storage = 0
                for (var j = 0; j < dataLength; j++) {
                  storage += parseInt(this.goodsAddressList[j].goodsList[k].count)
                }
                if (storage < parseInt(this.goodsAddressList[i].goodsList[k].goods_storage)) {
                  this.goodsAddressList[i].goodsList[k].count++
                } else {
                  this._appjs.showToast('此商品库存不足','success')
                  //alert('此商品库存不足')
                  return
                }
              }
            }
          }
        }
      },
      setGoodsNumber (el, Payload) {
        Payload.setNumber = parseInt(el.target.value)
        if (Payload.setNumber <= 0) {
          this._appjs.showToast('输入产品数量不合法','success')
          //alert('输入产品数量不合法')
        }
        var dataLength = this.goodsAddressList.length
        var x = 0, y = 0
        for (var i = 0; i < dataLength; i++) {
          if (Payload.address_id === this.goodsAddressList[i].address.address_id) {
            for (var k = 0; k < this.goodsAddressList[0].goodsList.length; k++) {
              if (Payload.goods_id === this.goodsAddressList[0].goodsList[k].goods_id) {
                x = i
                y = k
                var count = 0
                for (var n = 0; n < dataLength; n++) {
                  if (n !== x) {
                    count += this.goodsAddressList[n].goodsList[y].count
                  }
                }
                this.goodsAddressList[x].goodsList[y].count = ''
                if (Payload.setNumber > parseInt(this.goodsAddressList[0].goodsList[y].goods_storage)) {
                  this.goodsAddressList[x].goodsList[y].count = parseInt(this.goodsAddressList[0].goodsList[y].goods_storage) - count
                  return
                } else {
                  this.goodsAddressList[x].goodsList[y].count = Payload.setNumber
                  return
                }
              }
            }
          }
        }
      },
      sendDataFn () {
        var dataLength = this.goodsAddressList.length
        for (var i = 0; i < dataLength; i++) {
          var count = 0
          for (var j = 0; j < this.goodsAddressList[i].goodsList.length; j++) {
            count += this.goodsAddressList[i].goodsList[j].count
          }
          if (count === 0) {
            this._appjs.showToast('同一地址发货不能为0','success')
            //alert('同一地址发货不能为0')
            return
          }
        }
        for (var i = 0; i < this.goodsAddressList[0].goodsList.length; i++) {
          var count = 0
          for (var j = 0; j < this.goodsAddressList.length; j++) {
            count += this.goodsAddressList[j].goodsList[i].count
          }
          if (count === 0) {
            this._appjs.showToast(this.goodsAddressList[0].goodsList[i].goods_name + '产品出货量不能为0','success')
            //alert(this.goodsAddressList[0].goodsList[i].goods_name + '产品出货量不能为0')
            return
          }
        }
        for (var j = 0; j < this.goodsAddressList[0].goodsList.length; j++) {
          var count = 0
          for (var m = 0; m < this.goodsAddressList.length; m++) {
            count += this.goodsAddressList[m].goodsList[j].count
            if (this.goodsAddressList[0].goodsList[j].goods_storage < count) {
              this._appjs.showToast(this.goodsAddressList[0].goodsList[j].goods_name + '库存不足','success')
              //alert(this.goodsAddressList[0].goodsList[j].goods_name + '库存不足')
              return
            }
          }
        }
        localStorage.setItem('goodsAddress', JSON.stringify(this.goodsAddressList))
//        window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=check_order'
        this.$router.push({path: '/checkOrder'})
      },
      editChooseAddress (id) {
        localStorage.setItem('routerParth', '/addSendAddress')
        localStorage.setItem('goodsAddress', JSON.stringify(this.goodsAddressList))
//        window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=choose_address&path=add_send_address'
        this.$router.replace({path: '/add_address', query: {address_id: id}})
      },
      goChooseAddress () {
        localStorage.setItem('routerParth', '/addSendAddress')
        localStorage.setItem('goodsAddress', JSON.stringify(this.goodsAddressList))
//        window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=choose_address&path=add_send_address'
        this.$router.replace({path: '/choose_address', query: {path: '/addSendAddress'}})
      },
      getData () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_address_list&curpage=1'
        this.$http.get(url).then((res) => {
          this.isLoading = false
          if (res.data.code === 200) {
            if (!localStorage.getItem('goods') || JSON.parse(localStorage.getItem('goods')).constructor !== Array) {
              this._appjs.showToast('系统错误','success')
              //alert('系统错误')
              return
            }
            var obj = {address: res.data.content[0], goodsList: JSON.parse(localStorage.getItem('goods'))}
            localStorage.setItem('goodsAddress', JSON.stringify([obj]))
            this.goodsAddressList = JSON.parse(localStorage.getItem('goodsAddress'))
            if (res.data.content.length === 0) {
              this.goodsAddressList = []
            }
          } else if (res.data.code === 401) {
          }

        }, (error) => {
          console.log(error)
        })
      },
    },
    components: {loading},
  }
</script>
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0
  }

  .top-content {
    text-align: left;
    height: 100%;
    position: relative;
    .modal-bg {
      background: rgba(0, 0, 0, 0.3);
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .modal-info {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 6.5rem;
      height: 6rem;
      margin: -3rem 0 0 -3.25rem;
      background: #FFFFFF;
      border-radius: .16rem;
      text-align: center;
      .modal-close {
        float: right;
        margin-right: 0.3rem;
        width: 0.6rem;
        height: 0.6rem;
        margin-top: -0.9rem;
      }
      .title {
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: .34rem;
        font-weight: 300;
        color: #4B4F63;
        border-bottom: 1px solid rgba(218, 222, 228, 0.60);
      }
      .modal-img {
        display: block;
        width: 4rem;
        height: 2.8rem;
        margin: 0 auto;
        margin-top: 0.49rem;
        background: #EBF4FF;
      }
      .modal-dec {
        font-size: .28rem;
        color: #4B4F63;
        padding: 0.24rem 0.3rem 0.05rem;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
      }
      .modal-price {
        font-size: .28rem;
        color: #4A90E2;
        line-height: .40rem;
        span {
          font-size: .30rem;
          color: #4A90E2;
        }
      }
    }
    .process {
      height: 1.44rem;
      background: #F7F9FA;
      overflow: hidden;
      img {
        width: 5.5rem;
        height: 0.4rem;
        display: block;
        margin: 0.3rem auto 0.14rem;
      }
      p {
        text-align: center;
        font-size: .26rem;
        color: #B1B8C4;
        span.middle {
          margin: 0 1.22rem 0 1.24rem;
        }
        span.activity {
          color: #666A7F;
        }
      }
    }
    .address-list {
      overflow: hidden;
      .address-title {
        height: 0.88rem;
        line-height: 0.88rem;
        background: #fff;
        position: relative;
        font-size: .28rem;
        padding: 0 0.3rem 0;
        border-bottom: 1px solid #DADEE4;
        .span-one {
          float: left;
          font-size: .30rem;
          color: #4B4F63;
        }
        .span-two {
          float: right;
          color: #F25B4B;
          letter-spacing: 0;
          margin-right: 0.39rem;
        }
        .span-three {
          float: right;
          color: #4A90E2;
          padding-left: 0.39rem;
          border-left: 1px solid #DADEE4;
          height: 0.26rem;
          margin-top: 0.3rem;
          line-height: .3rem;
        }
      }
    }
    .goods-list {
      font-size: 0.26rem;
      color: #666A7F;
      background: #fff;
      padding-top: 0.23rem;
      line-height: 0.40rem;
      p.one {
        padding-bottom: 0.17rem;
        .name {
          margin-right: 1rem;
          margin-left: 0.3rem;
          padding-left: 0.4rem;
          background: url(../../../../static/image/bizbuy/person.png) no-repeat left center;
          background-size: 0.2rem 0.24rem;
        }
        .tell {
          padding-left: 0.35rem;
          background: url(../../../../static/image/bizbuy/phone.png) no-repeat left center;
          background-size: 0.15rem 0.24rem;
        }
      }
      .two {
        margin-left: 0.3rem;
        padding-left: 0.4rem;
        padding-right: 0.3rem;
        padding-bottom: 0.21rem;
        background: url(../../../../static/image/bizbuy/address.png) no-repeat left 0.05rem;
        background-size: 0.2rem 0.24rem;
      }
      .goods-wrapper {
        overflow: hidden;
        margin: 0 0.075rem;
        .goods-item {
          float: left;
          width: 2rem;
          margin: 0 0.225rem;
          .hander {
            text-align: center;
            border: 1px solid #DADEE4;
            border-radius: 8px;
            padding: 0 0.1rem;
            box-sizing: border-box;
            margin: 0.1rem 0 0.2rem;
            width: 2rem;
            height: 0.4rem;
            line-height: 0.4rem;
            position: relative;
            span.left {
              color: #666A7F;
              overflow: hidden;
              float: left;
              width: 20%;
              display: inline-block;
              text-align: center;
            }
            .middle {
              color: #666A7F;
              position: absolute;
              left: 20%;
              width: 60%;
              display: inline-block;
              float: left;
              text-align: center;
              background: transparent;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
            span.right {
              color: #666A7F;
              overflow: hidden;
              float: right;
              width: 20%;
              display: inline-block;
              text-align: center;
            }
          }
          .goods-img {
            width: 100%;
            height: 1.4rem;
            display: block;
            border: 0;
            background: #EBF4FF;
          }
        }
      }
    }
    .btn-wrapper {
      padding: 0.3rem;
      background: #fff;
      .button {
        border: 1px solid #4A90E2;
        border-radius: .08rem;
        width: 6.9rem;
        height: 0.88rem;
        box-sizing: border-box;
        line-height: 0.88rem;
        font-size: .30rem;
        color: #4A90E2;
        text-align: center;
      }
    }
    .tab-one-footer {
      text-align: center;
      background: #F7F9FA;
      font-size: .24rem;
      color: #DADEE4;
      letter-spacing: 0;
      height: 0.5rem;
      line-height: 0.5rem;
      margin-bottom: 1rem;
    }
    .footer {
      position: fixed;
      bottom:0;
      overflow: hidden;
      background: #fff;
      width: 100%;
      text-align: center;
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
          line-height: 0.3rem;
          padding-top: 0.1rem;
          text-align: left;
          padding-left: 0.3rem;
          span {
            padding: 0 0.1rem;
            font-size: .28rem;
            color: #4A90E2;
            letter-spacing: 0;
            line-height: .40rem;
          }
          .red-color {
            color: #f25b4b;
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
  }
</style>
