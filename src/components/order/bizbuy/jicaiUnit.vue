<template>
  <div>
    <div v-title="'单位集采'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="process">
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/users/first.png'" alt="">
          <p><span class="activity">发票信息</span><span class="middle">采购量和配送</span><span>核对订单</span></p>
        </div>
        <div class="piddingBottom1 iphonex-jicai-padd-b">
          <div class="content-province">
            <div class="one-list" @click="$refs['picker1'].open()">
              <label for="paperType">发票类型</label>
              <input type="text" class='no-bg inputone' id="paperType" v-model="dataShow.paper" disabled
                     placeholder=""/>
              <span> > </span>
            </div>
            <div class="one-list">
              <label for="paperName">购货方名称</label>
              <input type="text" id="paperName" v-model="user.inv_title"/>
            </div>
            <div class="one-list">
              <label for="paperId">纳税人识别号</label><img @click="askFn" class="ask-img"
                                                      :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/order/ask.png'"
                                                      alt="">
              <input type="text" id="paperId" v-model="user.inv_code"/>
            </div>
            <div class="one-list">
              <label for="paperAddress">单位地址</label>
              <input type="text" id="paperAddress" v-model="user.inv_reg_addr"/>
            </div>
            <div class="one-list">
              <label for="paperTell">单位电话</label>
              <input type="tel" name='mobile' id="paperTell"
                     v-model="user.inv_reg_phone"/>
            </div>
            <div class="one-list">
              <label for="paperBank">开户银行</label>
              <input type="text" id="paperBank" v-model="user.inv_reg_bname"/>
            </div>
            <div class="one-list">
              <label for="paperAccount">银行账号</label>
              <input type="tel" id="paperAccount" v-model="user.inv_reg_baccount"/>
            </div>
            <div class="one-list unHeight" :class="dataShow.ask==='有特殊要求'?'':'height2'">
              <label for="paperAsk">特殊要求</label>
              <input type="text" id="paperAsk" class='no-bg inputone' :value="dataShow.ask" disabled  @click="$refs['picker3'].open()"/>
              <div class="content-info">
                <textarea placeholder='请您填写要求内容。' class="text-content" v-if="show"
                          v-model="user.inv_special_mark"></textarea>
                <p class="descript-paper "><i>注: 1.</i>若有特殊要求必须注明，否则按国家规定正常开具，且不予退票；</p>
                <p class="descript-paper descript-paper-one"><i>2.</i>发票内容只能为购物明细。</p>
              </div>
              <span @click="$refs['picker3'].open()" class="top0"> > </span>
            </div>
            <div class="one-list status-txt boder-bottom0" @click="goAddress">
              <label>发票寄送地址</label>
              <p v-if="userAddress.true_name" class="pFloatone">{{userAddress.true_name + ' ' + userAddress.mob_phone
                }}<br>{{userAddress.area_info + userAddress.address}}</p>
              <i v-if="!userAddress.true_name">请选择地址</i>
              <span> >  </span>
            </div>
            <div style="height: 0.2rem;background: #F7F9FA;"></div>
            <div class="one-list heightAuto status-txt boder-bottom0" @click="Init">
              <label for="paperjc">集采积分归属</label>
              <p id="paperjc" class='no-bg inputtwo pFloat'>
                {{txtStack.length != 0 ? txtStack.toString().replace(/,/g, " -> ") : user.circle_name}}</p>
              <i v-if="txtStack.length === 0&&!user.circle_name">{{'默认使用采购人所属部门'}}</i>
              <span> > </span>
            </div>
          </div>
        </div>
        <div class="footer iphonex-padding-bottom">
          <div class="footer-two">
            <div class="footer-two-left">已选<span>{{goodsList.length}}</span>款产品</div>
            <div class="footer-two-right" @click="postData">下一步：采购量和配送</div>
          </div>
        </div>
      </div>
    </transition>
    <sy-popup ref='picker1' position="bottom" :close-flag="false">
      <div class="picker1">
        <div v-for="item in slots.paper" class="picker1-children" @click="dataShow.paper=item.values">
          {{item.values}}
        </div>
      </div>
      <div class="d-blank-h iphonex-padding-bottom"></div>
    </sy-popup>
    <sy-popup ref='picker2' position="bottom" :close-flag="true">
      <div class="btn-list">
        <span class="btn-right span-one" @click="partmentOk">确定</span>
        <span class="btn-right " @click="nextPart()">下一级</span>
      </div>
      <div class="picker1 picker-height">
        <div v-for="item in typeData" class="picker1-children" @click="changeState(item,$event)">
          {{item.circle_name}}
        </div>
      </div>
      <div class="d-blank-h iphonex-padding-bottom"></div>
    </sy-popup>
    <sy-popup ref='picker3' position="bottom" :close-flag="false">
      <div class="picker1">
        <div v-for="item in slots.ask" class="picker1-children" @click="dataShow.ask=item.values">
          {{item.values}}
        </div>
      </div>
      <div class="d-blank-h iphonex-padding-bottom"></div>
    </sy-popup>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import * as type from '../../../packages/utils/dom.js'
  import loading from '@/components/loading/loading.vue'

  var trim = type.trim
  var qs = require('qs')
  export default {
    data () {
      return {
        isLoading: true,
        value4: ['增值税普通发票'],
        isActivity: 'one',
        attr: 'paper',
        slots: {
          paper: [
            {
              values: '增值税普通发票',
            }, {
              values: '增值税专用发票',
            }
          ],
          ask: [
            {
              values: '无特殊要求（全月合并开具)',
              id: '0'
            },
            {
              values: '有特殊要求',
              id: '1'
            }
          ],
          type: [
            {
              values: ['默认使用采购人所属部门'],
            }
          ]
        },
        number: 0,
        dataShow: {
          paper: '增值税普通发票',
          ask: '无特殊要求',
          type: '默认使用采购人所属部门'
        },
        user: {
          inv_rec_address: {
            area_info: '',
            address: '',
            mob_phone: '',
            true_name: ''
          }
        },
        parent_circle: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 0,
          }
        ],
        typeData: {},
        intext: [],
        txtStack: [],
        idStack: '',
        indexDeep: 0,
        address: '',
        goodsList: '',
        userAddress: {}
      }
    },
    created () {
      localStorage.setItem('routerParth', '')
      if (localStorage.getItem('goods')) {
        this.goodsList = JSON.parse(localStorage.getItem('goods'))
      } else {
        this.goodsList = []
      }
      this.getData()
      this.select_dept('')
    },
    computed: {
      show () {
        return this.dataShow.ask === '有特殊要求'
      },
    },
    watch: {
      user: function (val, oldVal) {
        val.inv_state === '2' ? this.dataShow.paper = '增值税专用发票' : this.dataShow.paper = '增值税普通发票'
        val.inv_special_mark !== '' ? this.dataShow.ask = '有特殊要求' : this.dataShow.ask = '无特殊要求（全月合并开具）'
      }
    },
    methods: {
      partmentOk () {
        var circleId = document.getElementsByClassName('picker-height')[0].getAttribute('circleId')
        if (circleId) {
          for (var i = 0; i < this.typeData.length; i++) {
            if (this.typeData[i].circle_id == circleId) {
              this.txtStack.push(this.typeData[i].circle_name)
              this.idStack = circleId
              if (this.typeData[i].have_child === 'no') {

                this.$refs['picker2'].close()
              } else {
                this.select_dept(circleId)
              }
            }
          }
          this.$refs['picker2'].close()
        } else {
          Toast('请选择部门')
          return
        }

      },
      setBlue (e) {
        var elParent = e.target.parentNode
        for (var i = 0; i < elParent.childNodes.length; i++) {
          elParent.childNodes[i].style.color = ''
        }
        e.target.style.color = '#4A90E2'
      },
      changeState (item, e) {
        this.setBlue(e)
        var elParent = e.target.parentNode
        elParent.setAttribute('circleId', item.circle_id)
      },
      goAddress () {
        this.saveData().then((res) => {
          if (res.data.code === 200) {
            localStorage.setItem('routerParth', '/jicaiUnit')
//            window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=choose_address'
            this.$router.replace({path: '/choose_address'})
          }
        })
      },
      postData () {
        if (!trim(this.user.inv_title)) {
          Toast('请输入购货方名称')
          return
        }
        if (!trim(this.user.inv_code)) {
          Toast('请输入纳税人识别号')
          return
        }
        if (!trim(this.user.inv_reg_addr)) {
          Toast('请输入单位地址')
          return
        }
        if (!trim(this.user.inv_reg_phone)) {
          Toast('请输入单位电话')
          return
        }
        if (!trim(this.user.inv_reg_bname)) {
          Toast('请输入开户银行')
          return
        }
        if (!trim(this.user.inv_reg_baccount)) {
          Toast('请输入银行帐户')
          return
        }
        if (this.show && !trim(this.user.inv_special_mark)) {
          Toast('请输入特殊要求')
          return
        }
        if (!trim(this.userAddress.true_name)) {
          Toast('请输入地址')
          return
        }
        if (this.txtStack.length === 0 && !trim(this.user.circle_name)) {
          Toast('请输入采购人所属部门')
          return
        }
        var sendData = {
          inv_state: this.dataShow.paper === '增值税普通发票' ? '1' : '2',
          inv_title: this.user.inv_title,
          inv_code: this.user.inv_code,
          inv_reg_addr: this.user.inv_reg_addr,
          inv_reg_bname: this.user.inv_reg_bname,
          inv_reg_baccount: this.user.inv_reg_baccount,
          inv_reg_phone: this.user.inv_reg_phone,
          inv_content: this.user.inv_content,
          inv_special_mark: this.dataShow.ask === '有特殊要求' ? this.user.inv_special_mark : '',
          inv_rec_address: this.userAddress,
          circle_id: this.idStack || this.user.circle_id
        }
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=edit_invoice_info'
        this.$http.post(url, qs.stringify(sendData)).then((res) => {
          if (res.data.code === 200) {
//            window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=add_send_address'
            this.$router.push({path: '/addSendAddress'})
          }
        })
      },
      saveData () {
        var sendData
        sendData = {
          inv_state: this.dataShow.paper === '增值税普通发票' ? '1' : '2',
          inv_title: this.user.inv_title,
          inv_code: this.user.inv_code,
          inv_reg_addr: this.user.inv_reg_addr,
          inv_reg_bname: this.user.inv_reg_bname,
          inv_reg_baccount: this.user.inv_reg_baccount,
          inv_reg_phone: this.user.inv_reg_phone,
          inv_content: this.user.inv_content,
          inv_special_mark: this.dataShow.ask === '有特殊要求' ? this.user.inv_special_mark : '',
          inv_rec_address: this.userAddress,
          circle_id: this.idStack || this.user.circle_id
        }
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=edit_invoice_info'
        return this.$http.post(url, qs.stringify(sendData))
      },
      Init () {
        this.idStack = ''
        this.txtStack = []
        this.select_dept('')
        this.$refs['picker2'].open()
      },
      getData () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_invoice_info'
        this.$http.get(url).then((res) => {
          this.isLoading = false
          if (res.data.code === 200) {
            this.user = res.data.content
            this.userAddress = res.data.content.inv_rec_address || {}
            if (localStorage.getItem('addressPaper') != '-1' && JSON.parse(localStorage.getItem('addressPaper'))) {
              this.userAddress = JSON.parse(localStorage.getItem('addressPaper'))
            }
          } else if (res.data.code === 401) {

          }
        }, (error) => {
          console.log(error)
        })
      },
      askFn () {
        Toast('工会组织纳税人识别号填写000000')
      },
      nextPart () {
        var circleId = document.getElementsByClassName('picker-height')[0].getAttribute('circleId')
        if (circleId) {
          for (var i = 0; i < this.typeData.length; i++) {
            if (this.typeData[i].circle_id == circleId) {
              this.txtStack.push(this.typeData[i].circle_name)
              if (this.typeData[i].have_child === 'no') {
                this.idStack = circleId
                this.$refs['picker2'].close()
              } else {
                this.select_dept(circleId)
              }
            }
          }
        } else {
          Toast('请选择部门')
        }

      },
      select_dept (id) {
        let url = this.siteInfo.host + '/api/index.php?act=v_member&op=select_dept&parent_circle_id=' + id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.typeData = res.data.content
            document.getElementsByClassName('picker-height')[0].setAttribute('circleId', '')
            var elList = document.getElementsByClassName('picker1-children')
            for (var i = 0; i < elList.length; i++) {
              elList[i].style.color = ''
            }
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      }
    },
    components: {loading},
  }
</script>

<style lang="scss" scoped>
  .btn-list {
    background: #fff;
    line-height: 0.88rem;
    font-size: .30rem;
    font-weight: 400;
    height: 0.88rem;
    padding: 0 0.3rem;
    .btn-left {
      float: left;
    }
    .btn-right {
      float: right;
    }
    .span-one {
      margin-left: 0.2rem;
    }
  }

  .picker1 {
    max-height: 0.88*5rem;
    background: #fff;
    overflow: hidden;
    overflow-y: scroll;
    width: 105%;
    color: #4B4F63;
    > div {
      height: 0.88rem;
    }
    .picker1-children {
      line-height: 0.88rem;
      font-size: .30rem;
      font-weight: 400;
      border-bottom: 1px solid #fafafa;
    }
    .picker1-children:last-of-type {
      border: 0;
    }
  }

  .picker-height {
    height: 0.88*5rem;
  }
  .d-blank-h{height: 0.34rem;background: #fff;}
  .sy-top {
    height: 1.14rem;
    background: #F7F9FA;
    & > li {
      float: left;
    }
    .li-left {

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

  .piddingBottom1 {
    padding-bottom: 1.3rem;
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

  .content-province {
    background: #fff;
    box-sizing: border-box;
    .status-txt {
      i {
        font-style: normal;
        line-height: 0.88rem;
        font-size: .28rem;
        color: #4B4F63;
        margin-left: 0.5rem;
      }
    }
    div.boder-bottom0 {
      border-bottom: 0;
      i {
        color: #DADEE4;
      }
    }
    .one-list {
      position: relative;
      padding: 0 0.3rem;
      text-align: left;
      height: 0.88rem;
      box-sizing: border-box;
      border-bottom: 1px solid #DADEE4;
      input {
        position: absolute;
        left: 2.62rem;
        top: .26rem;
        width: 4rem;
        color: #818c9e;
      }
      input:disabled {
        -webkit-text-fill-color: #818c9e;
        -webkit-opacity: 1;
        color: #818c9e;
      }
      .inputone {
      }
      .inputtwo {
      }
      .pFloatone {
        position: absolute;
        left: 2.62rem;
        top: 0.1rem;
        font-size: 0.28rem;
        color: #818C9E;
        width: 4.23rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 0.38rem;

      }
      label {
        line-height: 0.88rem;
        font-size: .28rem;
        color: #4B4F63;
      }
      .content-info {
        position: absolute;
        right: 0.3rem;
        width: 4.6rem;
        p {
          font-size: .24rem;
          color: #B1B8C4;
          line-height: .36rem;
        }
        .descript-paper {
          width: 3.9rem;
          right: 0;
          display: inline-block;
          position: relative;
          padding-left: 0.70rem;
          i {
            position: absolute;
            top: 0rem;
            left: 0rem;
            font-style: normal;
          }
        }
        .descript-paper-one {
          i {
            left: 0.34rem;
          }
        }
      }
      span {
        font-size: 0.2rem;
        display: inline-block;
        color: #DADEE4;
        transform: scaleY(2);
        float: right;
        margin-top: 0.35rem;
        text-align: right;
      }
      .top0 {
        position: absolute;
        top: 0;
        right: 0.3rem;
      }
      .no-bg {
        background: #fff;
        color: #818C9E;
      }
    }
    .heightAuto {
      position: relative;
      height: auto;
      overflow: hidden;
      .pFloat {
        position: absolute;
        left: 2.62rem;
        width: 4rem;
        top: .26rem;
        font-size: 0.28rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0.04rem 0;
      }
    }
    .unHeight {
      position: relative;
      height: 4rem;
      .text-content {
        box-sizing: border-box;
        width: 4.58rem;
        height: 1.6rem;
        padding: 0.19rem 0.3rem 0 0.3rem;
        border-radius: 0.08rem;
        border: 1px solid #B1B8C4;
        margin-bottom: 0.20rem;
      }
    }
    .height2 {
      height: 2.12rem
    }
    .ask-img {
      width: 0.29rem;
      height: 0.29rem;
      border: 0;
      vertical-align: middle
    }
  }

  .part-parent {
    width: 100%;
    overflow: hidden;
    background: #fff;
  }

  .fter-wrapper {
    background: #fff;
    height: 1rem;
    line-height: 1rem;
    span {
      width: 50%;
      display: inline-block;
      box-sizing: border-box;
      font-size: 0.3rem;

    }
    span.one {
      text-align: left;
      padding-left: .5rem;
      float: left;
    }
    span.two {
      text-align: right;
      padding-right: .5rem;
      float: right;
    }
  }
</style>
