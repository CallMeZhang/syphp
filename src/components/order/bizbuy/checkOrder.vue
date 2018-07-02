<template>
  <div class="top-content">
    <!--tab start-->
    <div v-title="'单位集采'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="process">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/users/last.png'" alt="">
          <p><span>发票信息</span><span class="middle">采购量和配送</span><span class="activity">核对订单</span></p>
        </div>
        <div class="address-list iphonex-padding-bottom">
          <div v-for="(item,index) in goodsAddressList">
            <div class="goods-list">
              <p class="one"><span class="name">{{item.address.true_name}}</span><span
                class="tell">{{item.address.mob_phone}}</span></p>
              <p class="two">{{item.address.area_info + item.address.address}}</p>
              <div class="goods-wrapper">
                <div class="goods-item" v-for="(iem,$index) in item.goodsList">
                  <p class="p-name">{{iem.goods_name}}</p>
                  <div>
                    <p class="one">{{'￥' + (iem.goods_price * iem.count).toFixed(2)}}</p>
                    <p class="count">{{'x' + iem.count}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style="background: #F7F9FA;height: 0.2rem"></div>
          </div>
          <div class="info">
            <div class="info-list-one">
              <p class="one">集采积分归属</p>
              <p class="two">{{allInfo.circle_name}}</p>
            </div>
            <p class='paper-info'>发票信息</p>
            <div class="info-list-paper">
              <p class="one">发票类型：<span class="name">{{allInfo.inv_state === '1' ? '增值税普通发票' : '增值税专用发票'}}</span>
              </p>
              <p class="two"><span class="one">名称<span class="justify"></span></span><span
                class="two">{{allInfo.inv_title}}</span></p>
              <p class="two"><span class="one">税号<span class="justify"></span></span><span
                class="two">{{allInfo.inv_code}}</span></p>
              <p class="two"><span class="one">地址<span class="justify"></span></span><span
                class="two">{{allInfo.inv_reg_addr}}</span></p>
              <p class="two"><span class="one">开户行<span class="justify"></span></span><span
                class="two">{{allInfo.inv_reg_bname}}</span>
              </p>
              <p class="two"><span class="one">账号<span class="justify"></span></span><span
                class="two">{{allInfo.inv_reg_baccount}}</span></p>
              <p class="three">发票内容：<span style="padding: 0.24rem;">购物明细</span></p>
              <p class="four">发票特殊要求：</p>
              <p class="five">{{allInfo.inv_special_mark || '无'}}</p>
              <p>发票邮寄地址：</p>
              <p class="six">
                {{allInfo.inv_rec_address.true_name + ' ' + allInfo.inv_rec_address.mob_phone + ' ' + allInfo.inv_rec_address.area_info + ' ' + allInfo.inv_rec_address.address}}</p>
            </div>
            <div class="checked">
              <p><span :class="isAgree||'activity'" @click="isAgree=!isAgree"></span>同意<i @click="goContract()">《平台集中采购合同》</i>
              </p>
              <p class="two"><span :class="!needPaper||'activity'" @click="needPaper=!needPaper"></span>需要纸质合同</p>
            </div>
          </div>
        </div>
        <div class="footer iphonex-padding-bottom">
          <div class="footer-two">
            <div class="footer-two-left">分 <span
              class="red-txt"> {{goodsAddressList.length}} </span>处配送<br>共<span>{{'￥' + allPay}}</span>
            </div>
            <div class="footer-two-right" @click="sendDataFn">确认订单</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  var qs = require('qs')
  import { Toast } from 'mint-ui'
  import loading from '@/components/loading/loading.vue'

  export default {
    data () {
      return {
        isLoading: true,
        isAgree: false,
        needPaper: false,
        goodsAddressList: [],
        allInfo: {
          inv_rec_address: {
            true_name: ''
          }
        },
      }
    },
    created () {
      if (JSON.parse(localStorage.getItem('goodsAddress')) == '-1') {
        this.goodsAddressList = []
      } else {
        this.goodsAddressList = JSON.parse(localStorage.getItem('goodsAddress'))
      }
      this.getPaperInfo()
    },
    components: {loading},
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
      goContract () {
        this._appjs.syJsbLaunchWebview(this.siteInfo.host + '/bocm/index.php?act=bizbuy&op=biz_agreement&circle_id=' + this.allInfo.circle_id)
      },
      getPaperInfo () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_invoice_info'
        this.$http.get(url).then((res) => {
          this.isLoading = false
          if (res.data.code === 200 && res.data.content.circle_name !== '') {
            this.allInfo = res.data.content
          }
        })
      },
      sendDataFn () {
        if (this.isAgree) {
          Toast('请同意平台采购协议')
          return
        }
        var arr = []
        for (var i = 0; i < this.goodsAddressList.length; i++) {
          var arrObj = []
          for (var j = 0; j < this.goodsAddressList[i].goodsList.length; j++) {
            arrObj.push({
              goods_id: this.goodsAddressList[i].goodsList[j].goods_id,
              goods_num: this.goodsAddressList[i].goodsList[j].count
            })
          }
          var address = {
            'address_id': this.goodsAddressList[i].address.address_id,//收货地址id
            'member_id': this.goodsAddressList[i].address.member_id,//地址会员id
            'true_name': this.goodsAddressList[i].address.true_name,//收获人姓名
            'area_info': this.goodsAddressList[i].address.area_info,
            'address': this.goodsAddressList[i].address.address,
            'tel_phone': this.goodsAddressList[i].address.tel_phone,
            'mob_phone': this.goodsAddressList[i].address.mob_phone,
            'is_default': this.goodsAddressList[i].address.is_default,
            'address_type': this.goodsAddressList[i].address.address_type,
            'last_id': this.goodsAddressList[i].address.last_id
          }

          arr.push({
            'goods_list': arrObj,
            'address': address
          })
        }
        var dataList = {
          'address_goods_list': arr,
          'inv_info': {//发票信息
            'inv_state': this.allInfo.inv_state,//1普通发票2增值税发票
            'inv_title': this.allInfo.inv_title,
            'inv_code': this.allInfo.inv_code,
            'inv_reg_addr': this.allInfo.inv_reg_addr,
            'inv_reg_bname': this.allInfo.inv_reg_bname,
            'inv_reg_baccount': this.allInfo.inv_reg_baccount,
            'inv_reg_phone': this.allInfo.inv_reg_phone,//注册电话
            'inv_content': this.allInfo.inv_content,//1：农产品，2：明细
            'inv_special_mark': this.allInfo.inv_special_mark,//开票特殊要求
            'inv_rec_address': {
              'address_id': this.allInfo.inv_rec_address.address_id,
              'member_id': this.allInfo.inv_rec_address.member_id,
              'true_name': this.allInfo.inv_rec_address.true_name,
              'area_info': this.allInfo.inv_rec_address.area_info,
              'address': this.allInfo.inv_rec_address.address,
              'tel_phone': this.allInfo.inv_rec_address.tel_phone,
              'mob_phone': this.allInfo.inv_rec_address.mob_phone,
              'is_default': this.allInfo.inv_rec_address.is_default,
              'address_type': this.allInfo.inv_rec_address.address_type,
              'last_id': this.allInfo.inv_rec_address.last_id
            },
          },
          'dept_info': {//部门信息
            'dept_id': this.allInfo.circle_id,
          },
          'payment_role': 'payment_role_ent',//支付角色：企业支付
          'paper_contract': !this.needPaper ? 'paper_contract_yes' : 'paper_contract_no'//是否需要纸质合同paper_contract_no不需要，paper_contract_yes需要
        }
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=create_biz_main_goods_order'
        this.$http.post(url, qs.stringify({order_info: dataList})).then((res) => {
          if (res.data.code === 200) {
            localStorage.removeItem('goodsAddress')
            localStorage.removeItem('department_id')
            localStorage.removeItem('goods')
            localStorage.removeItem('addressPaper')
            localStorage.removeItem('routerParth')

            window.location.href = this.siteInfo.host + '/bocm/index.php?act=bizbuy&op=my_biz_order_list'
          } else if (res.data.code === 401) {
            this._appjs.showToast('登录有误','success')
            //alert('登录有误')
          } else if (res.data.code === 0) {
            this._appjs.showToast(res.data.message,'success')
            //alert(res.data.message)
          }
        }, (error) => {
          console.log(error)
        })
      },
      getData () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_address_list&curpage=1'
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .top-content {
    text-align: left;
    overflow: hidden;
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
      margin-bottom: 1rem;
      .goods-list {
        font-size: 0.26rem;
        color: #666A7F;
        background: #fff;
        padding-top: 0.23rem;
        p.one {
          padding-bottom: 0.17rem;
          .name {
            margin-right: 0.3rem;
            margin-left: 0.3rem;
            padding-left: 0.4rem;
            width: 1.5rem;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
          padding-left: 0.7rem;
          padding-right: 0.3rem;
          padding-bottom: 0.21rem;
          border-bottom: 1px solid #DADEE4;
          background: url(../../../../static/image/bizbuy/address.png) no-repeat 0.3rem 0.05rem;
          background-size: 0.2rem 0.24rem;
          font-size: 0.26rem;
          line-height: .40rem;
        }
        .goods-wrapper {
          overflow: hidden;
          .goods-item {
            position: relative;
            height: 1.25rem;
            margin: 0 0 0 0.3rem;
            padding-top: 0.2rem;
            box-sizing: border-box;
            border-bottom: 1px solid #DADEE4;
            .p-name {
              width: 4.6rem;
              height: 0.84rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              font-size: .28rem;
              color: #818C9E;
              line-height: .42rem;
            }
            div {
              position: absolute;
              top: 0.3rem;
              text-align: right;
              float: right;
              right: 0.3rem;
              p.one {
                color: #4A90E2;
              }
              p.count {
                color: #818C9E;
              }
            }
          }
          .goods-item:last-of-type {
            border: 0;
          }
        }
      }
      .info {
        overflow: hidden;
        background: #fff;
        font-size: .28rem;
        .info-list-one {
          border-bottom: 1px solid #DADEE4;
          padding-left: 0.3rem;
          font-size: .28rem;
          p.one {
            font-weight: 900;
            color: #4B4F63;
            padding: 0.3rem 0 0.16rem;
          }
          p.two {
            color: #666A7F;
            line-height: 0.42rem;
            padding-bottom: 0.2rem;
          }
        }
        .paper-info {
          height: 0.86rem;
          margin-left: 0.3rem;
          border-bottom: 1px solid #DADEE4;
          color: #4B4F63;
          font-weight: 900;
          box-sizing: border-box;
          line-height: 0.86rem;
        }
        .info-list-paper {
          padding-left: 0.3rem;
          p.one {
            padding-top: 0.23rem;
            padding-bottom: 0.15rem;
            color: #4B4F63;
            position: relative;
            .name {
              position: absolute;
              left: 1.6rem;
              color: #666A7F;
            }
          }
          p.two {
            position: relative;
            color: #818C9E;
            line-height: .42rem;
            height: 0.42rem;
            overflow: hidden;
            span.one {
              display: inline-block;
              width: 0.84rem;
              text-align: justify;
              span.justify {
                display: inline-block; /* Opera */
                padding-left: 100%;
              }
            }
            span.two {
              position: absolute;
              left: 1.6rem;

            }
          }
          p.three {
            padding: 0.15rem 0 0.16rem;
            color: #4B4F63;
            span {
              color: #666A7F;
            }
          }
          p.four {
            padding-bottom: 0.06rem;
          }
          p.five {
            padding: 0.1rem 0 0.2rem 0;
            color: #666A7F;
          }
          p.six {
            padding: 0.08rem 0.3rem .22rem 0;
            color: #666A7F;
            line-height: 0.42rem;
          }
        }
        .checked {
          height: 1.5rem;
          background: #F7F9FA;
          padding-left: 0.3rem;
          position: relative;
          p {
            position: absolute;
            float: left;
            padding-top: 0.3rem;
            font-size: .26rem;
            line-height: 0.46rem;
            span {
              width: 0.4rem;
              height: 0.4rem;
              display: inline-block;
              border-radius: 50%;
              border: 1px solid #DADEE4;
              float: left;
              margin-right: 0.1rem;
            }
            span.activity {
              border: 1px solid #F7F9FA;
              background: url("../../../../static/image/checked_address.png") no-repeat center;
            }
            i {
              font-style: normal;
              color: #4A90E2;
            }
          }
          p.two {
            left: 4.62rem;
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
      text-align: center;
      .footer-two {
        box-sizing: border-box;
        height: 1rem;
        border-top: 1px solid #DADEE4;
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
          .red-txt {
            color: #F25B4B;
          }
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
  }
</style>
