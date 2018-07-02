<template>
  <div id="cart_list_2">
    <div v-title="'心愿单'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="blk1" v-if="store_cart_list.length > 0"></div>
        <div v-if="store_cart_list.length > 0" class="edit_all border-both"><span id="edit_all_item"
                                                                                  all_show_flag="true"
                                                                                  @click="edit_all()">{{edit_text}}</span>
        </div>
        <div class="blk1" v-if="store_cart_list.length > 0"></div>
        <form id="buy_form" v-if="store_cart_list.length > 0">
          <!--goods_project_type-->
          <div v-for="item in goods_project_type[1]">
            <input name="goods_project_type[]" :value="item" type="hidden" class="goods_projet_type_array">
          </div>
          <input type="hidden" value="1" name="ifcart" class="ifcart">
          <!-- 付款方 -->
          <input type="hidden" name="payer" id="payer">
          <!--begin store foreach store foreach store foreach store foreach store foreach store foreach store foreach store foreach store foreach-->
          <div class="bg border-both hide" style="border-bottom: 0px;" v-for="(item, index) in store_cart_list[0]">
            <div v-show="item.length > 0">
              <div class="v3-list-styles bg">
                <!-- 按店铺分类的 多选 -->
                <!--<div class="all-select most-goods-select" check_flag='false'></div>-->
                <div class="v3-list-styles-L" style="position: relative; line-height: 0">
                  <!--<img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/ap106.png'" height="20" alt=""-->
                  <!--style="margin-right:10px;position:absolute; top:0.2rem;"/>-->
                  <img v-if="item[0]['goods_owner_type']['type'] == 'sy_poor'"
                       :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/icon-poor.png'" height="20"
                       style="margin-right:10px;position:absolute;top:49%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);"/>
                  <img v-else-if="item[0]['goods_owner_type']['type'] == 'sy_agent'"
                       :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/icon-zhuliren.png'" height="20"
                       style="margin-right:10px;position:absolute; top:49%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);"/>
                  <img v-else-if="item[0]['goods_owner_type']['type'] == 'sy_shop'"
                       :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/icon-store.png'" height="20"
                       style="margin-right:10px;position:absolute; top:49%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);"/>
                  <img v-else="item[0]['goods_owner_type']['type'] == 'sy_biz'"
                       :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/icon-logo.png'" height="20"
                       style="margin-right:10px;position:absolute; top:49%;-webkit-transform: translateY(-50%);-moz-transform: translateY(-50%);-ms-transform: translateY(-50%);-o-transform: translateY(-50%);transform: translateY(-50%);"/>
                  <span
                      style="width:5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display: inline-block;line-height: 0.88rem;text-align: left;
padding-left: 0.5rem" v-if="item[0]['goods_owner_type']['type'] =='sy_poor'">贫困户{{item[0]['poor_info']['trna']}}</span>
                  <span
                      style="width:5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display: inline-block;line-height: 0.88rem;text-align: left;
padding-left: 0.5rem" v-if="item[0]['goods_owner_type']['type'] =='sy_agent'">助理人{{item[0]['poor_info']['trna']}}</span>
                  <span
                      style="width:5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display: inline-block;line-height: 0.88rem;text-align: left;
padding-left: 0.5rem" v-if="item[0]['goods_owner_type']['type'] =='sy_biz'">善源甄选</span>
                  <span
                      style="width:5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display: inline-block;line-height: 0.88rem;text-align: left;
padding-left: 0.5rem"
                      v-if="item[0]['goods_owner_type']['type'] =='sy_shop'">善企{{item[0]['goods_owner_type']['company_abbreviation'] == '' ? item[0]['poor_info']['trna'] : item[0]['goods_owner_type']['company_abbreviation']}}</span>
                </div>
                <!-- <div class="v3-list-styles-C"></div> -->
                <div class="v3-list-styles-R" style="width: auto;"></div>
              </div>
            </div>
            <!--begin goods foreach goods foreach goods foreach goods foreach goods foreach goods foreach goods foreach goods foreach goods foreach-->
            <div v-for="v in item">
              <div>
                <div class="goods-orders">
                  <!-- 购物车选择 -->
                  <div @click="select_item(v)"
                       :class="'most-left-select ' + ((v['checked'] === '1' && v['state'] && v['storage_state']) ? 'most-left-select-checked' : '')"></div>
                  <!-- 用来存储价格 -->

                  <!-- 显示图片的 -->
                  <div class="goods-orders-left">
                    <a style="position: relative;">
                      <div style="position:relative;">
                        <div v-if="!v['state'] || !v['storage_state']">
                          <div
                              style="position:absolute;right:0px;bottom:0px;top:0px;left:0px;background:#fff;filter:alpha(opacity=30); -moz-opacity:0.3; -khtml-opacity: 0.3; opacity: 0.3;"></div>
                          <div
                              style="position:absolute;right:0px;top:0.2rem;left:0px;height:1rem;line-height:1rem;width:1rem;text-align:center;margin:0 auto;margin-top:0.1rem;font-size:14px;color:#fff;background:#000;filter:alpha(opacity=60); -moz-opacity:0.6; -khtml-opacity: 0.6; opacity: 0.6;border-radius:45px;">
                            {{!v['state'] ? '已下架' : '无货'}}
                          </div>
                        </div>
                        <img src="../../../../static/image/detail/youp.png" style="width: 0.32rem;height: 0.52rem; position: absolute;top: 0;left: 0.16rem" alt="" v-if="v.is_quality_goods==='true'">
                        <img
                            @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=project&op=project_detail&goods_id=' + v['goods_id'] + '&goods_project_type=' + v['goods_project_type'])"
                            :src="v['image_full_url']" alt=""/>
                      </div>
                    </a>
                  </div>
                  <div style="float: left;width:55%;">
                    <div class="goods-orders-center" style="width: 55%;">
                      <div
                          @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=project&op=project_detail&goods_id=' + v['goods_id'] + '&goods_project_type=' + v['goods_project_type'])"
                          class="goods-orders-center-first-chird" style="text-align: left;">
                        <a style="color: #333;">{{v['goods_name']}}</a>
                      </div>
                    </div>
                    <!-- 弹出的菜单  -->
                    <div v-show="!edit_all_status">
                      <div class="goods-orders-right" style="width: 40%;">
                        <div class="red" style="font-size: 14px;">￥{{v['goods_price']}}</div>
                        <div class="goods-orders-right-bot">x{{v['goods_num']}}</div>
                      </div>

                      <div class="goods-modify-box-left" style="width: 100%;height:auto;margin-top:0px;">
                        <div class="goods-modify-box-left-L-box" @click="reduceNum(v)">
                          <div class="goods-modify-box-left-L">-</div>
                        </div>
                        <div class="goods-modify-box-left-C"><input readonly :value="v['goods_num']"></div>
                        <div class="goods-modify-box-left-R-box" @click="addNum(v)">
                          <div class="goods-modify-box-left-R">+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <transition name="fade">
                    <div class="goods-modify-box" @click="delCart(v, item)" show_flag="true"
                         style="height: 100%; right: 0px;" v-show="edit_all_status">
                      <div class="goods-modify-box-right">
                        <div>删除</div>
                      </div>
                    </div>
                  </transition>
                </div>
                <div class="blk05"></div>
              </div>
            </div>
            <!--end goods foreach goods foreach goods foreach goods foreach goods foreach goods foreach goods foreach goods foreach goods foreach-->
            <div class="blk1"></div>
          </div>
          <!--end store foreach store foreach store foreach store foreach store foreach store foreach store foreach store foreach store foreach-->
        </form>
        <!--购物车为空-->
        <div class="no_record_wp" v-if="store_cart_list.length === 0" style="margin-top:0;padding-top:2.5rem;">
          <!--<div class="tip_img"><img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/ap42.png'" width="78" alt=""/>
          </div>
          <div class="tip_title">您的心愿单是空的哦！</div>
          <a class="red-btn-a">
            <div class="red-btn" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=goods&op=support_poor_goods_list')">去挑选</div>
          </a>-->

          <div class="no_cart_img" style="text-align: center;">
            <img src="/bocm/platformjs/static/image/default/no_cart.png" alt="" style="width:2.56rem;">
            <div style="padding:1rem 0 2.13rem;color:#B1B8C4;font-size: .32rem;">
              你的心愿单是空的哦
            </div>
          </div>
          <div class="red-btn" style="color:#4A90E2;border:1px solid #4A90E2;background: #F7F9FA;font-size: .32rem;"
               @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=goods&op=support_poor_goods_list')">
            去挑选
          </div>
        </div>
        <div style="height: 44px;" v-if="store_cart_list.length > 0"></div>
        <div class="iphonex-div"></div>
        <transition name="fade">
          <div class="goods-bot-sure bg iphonex-padding-bottom" v-if="store_cart_list.length > 0 && !edit_all_status">
            <div :class="select_all_class" @click="select_all()">全选</div>
            <a>
              <div @click="goPay()" class="goods-bot-sure-btn2" style="margin-left:10px;width:110px;">
                去结算({{total_num}})
              </div>
            </a>
            <div class="list-value3">
              <div class="heji">合计:<span class="red" style="font-size:15px;">￥{{total_price}}</span></div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'

  export default {
    data () {
      return {
        isLoading: true,
        store_cart_list: {},
        store_list: {},
        mansong_rule_list: {},
        free_freight_list: {},
        goods_project_type: {},
        edit_all_status: false,
        edit_text: '全部编辑',
        select_all_status: false,
        select_all_class: 'select-all',
        total_price: 0,
        total_num: 0,
        ORDER_PAY_SELF: 1
      }
    },
    created: function () {
      this.getData()
    },
    mounted: function () {
      this._appjs.syJsbShowTitleBar('true')
    },
    components: {
      'sy-loading': loading
    },
    methods: {
      getData () {
        let goods_project_type = this.$route.params.goods_project_type
        this.$http.get(this.siteInfo.host + '/api/index.php?act=cart&op=index&goods_project_type=' + goods_project_type).then(res => {
          this.store_cart_list =  res.data.content.store_cart_list
          this.store_list = res.data.content.store_list
          this.mansong_rule_list = res.data.content.mansong_rule_list
          this.free_freight_list = res.data.content.free_freight_list
          this.goods_project_type = res.data.content.goods_project_type
          this.ORDER_PAY_SELF = res.data.content.ORDER_PAY_SELF
          this.isLoading = false
          this.updateTotalPrice()
        })
      },
      //编辑全部
      edit_all () {
        if (this.edit_all_status) {
          this.edit_all_status = false
          this.edit_text = '全部编辑'
        } else {
          this.edit_all_status = true
          this.edit_text = '全部完成'
        }
      },
      //选中全部
      select_all () {
        if (this.select_all_class === 'select-all') {
          for (let key in this.store_cart_list[0]) {
            for (let k in this.store_cart_list[0][key]) {
              let cart_id = this.store_cart_list[0][key][k]['cart_id']
              this.$http.get(this.siteInfo.host + '/api/index.php?act=cart&op=update_checked&cart_id=' + cart_id + '&checks_tate=1')
                .then(res => {
                  if (res.data.code === 200) {
                    this.select_all_class = 'select-all select-all-checked'
                    this.store_cart_list[0][key][k]['checked'] = '1'
                    this.updateTotalPrice()
                  }
                })
            }
          }
        } else {
          for (let key in this.store_cart_list[0]) {
            for (let k in this.store_cart_list[0][key]) {
              let cart_id = this.store_cart_list[0][key][k]['cart_id']
              this.$http.get(this.siteInfo.host + '/api/index.php?act=cart&op=update_checked&cart_id=' + cart_id + '&checks_tate=0')
                .then(res => {
                  if (res.data.code === 200) {
                    this.select_all_class = 'select-all'
                    this.store_cart_list[0][key][k]['checked'] = '0'
                    this.updateTotalPrice()
                  }
                })
            }
          }
        }
      },
      //选中单个
      select_item (v) {
        this.selectRequest(v)
      },
      //选中处理
      selectRequest (v) {
        let ckd = '1'
        if (v['checked'] === '0') {
          ckd = '1'
        } else {
          ckd = '0'
        }
        this.$http.get(this.siteInfo.host + '/api/index.php?act=cart&op=update_checked&cart_id=' + v['cart_id'] + '&checks_tate=' + ckd)
          .then(res => {
            if (res.data.code === 200) {
              if (v['checked'] === '0') {
                v['checked'] = '1'
              } else {
                v['checked'] = '0'
              }
              this.updateTotalPrice()
            }
          })
      },
      delCart (v, item) {
        this.$http.get(this.siteInfo.host + '/api/index.php?act=cart&op=del&cart_id=' + v['cart_id'] + '&goods_id=' + v['goods_id'])
          .then(res => {
            if (res.data.state === 'true') {
              this.getData()
              this.edit_all_status = true
            }
          })
      },
      //计算总价格
      updateTotalPrice () {
        this.total_price = 0
        this.total_num = 0
        for (let key in this.store_cart_list[0]) {
          for (let k in this.store_cart_list[0][key]) {
            let p = this.store_cart_list[0][key][k]
            if (p['state'] && p['storage_state'] && p['checked'] === '1') {
              this.total_price += (p['goods_price'] * p['goods_num'])
              this.total_price = Math.round(this.total_price * 100) / 100
              this.total_num += parseInt(p['goods_num'])
            }
          }
        }
      },
      //增加库存
      addNum (v) {

        let num = parseInt(v['goods_num']) + 1
        console.log('num ' + num)
        let cart_id = v['cart_id']
        this.$http.get(this.siteInfo.host + '/api/index.php?act=cart&op=update&cart_id=' + cart_id + '&quantity=' + num)
          .then(res => {
            console.log(res)
            if (res.data.state === 'true') {
              v['goods_num']++
              console.log('cart_id2 ' + v['goods_num'])
              this.updateTotalPrice()
            }
          })
      },
      //减少库存
      reduceNum (v) {
        if (parseInt(v['goods_num']) < 2) {
          return false
        }
        let num = parseInt(v['goods_num']) - 1
        let cart_id = v['cart_id']
        this.$http.get(this.siteInfo.host + '/api/index.php?act=cart&op=update&cart_id=' + cart_id + '&quantity=' + num)
          .then(res => {
            if (res.data.state === 'true') {
              v['goods_num']--
              this.updateTotalPrice()
            }
          })
      },
      //去结算
      goPay () {
        let type = this.goods_project_type[1]
        let type_text = ''
        for (let k in type) {
          type_text += ',' + type[k]
        }
        type_text = type_text.substr(1)
        //----
        let cart_text = ''
        let goods_num = 0
        for (let key in this.store_cart_list[0]) {
          for (let k in this.store_cart_list[0][key]) {
            let p = this.store_cart_list[0][key][k]
            if (p['checked'] === '1' && (p['state'] && p['storage_state'])) {
              cart_text += ',' + p['cart_id'] + '|' + p['goods_num']
              goods_num += parseInt(p['goods_num'])
            }
          }
        }
        if (goods_num === 0) {
          this._appjs.syJsbAlert('请勾选您需要购买的产品哦')
          return false
        }
        cart_text = cart_text.substr(1)
        let state = this.ORDER_PAY_SELF
        let url = this.siteInfo.host += '/bocm/index.php?act=buy&op=buy_step1&goods_project_type=' + type_text + '&ifcart=1&payer=' + state + '&cart_id=' + cart_text
        this._appjs.syJsbLaunchWebview(url)
      }
    }
  }
</script>

<style scoped>
  .goods-orders-center-first-chird {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  #cart_list_2 {
    width: 100%;
    height: 100%;
    background: #F7F9FA;
  }

  .red-btn {
    margin: 0 12px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    border-radius: 8px;
    background: #f31e37;
  }

  .search-cont {
    background: #fff;
  }

  .goods-orders {
    width: 100%;
  }

  .donate-goods-top {
    padding: 0 12px 20px;
    background: #fff;
    margin-top: 10px;
  }

  .dona-good-top-title {
    height: 28px;
    padding-top: 20px;
    border-bottom: 1px solid #ccc;
  }

  .goods-ad {
    overflow: hidden;
  }

  .goods-ad-L {
    width: 8.92%;
    float: left;
    padding-top: 10px;
  }

  .goods-ad-R {
    width: 90.8%;
    float: left;
    padding-top: 11px;
    line-height: 14px;
    font-weight: bold;
  }

  .goods-bot-sure {
    line-height: 44px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: solid 1px #e0e0e0;
  }

  .goods-bot-sure-btn {
    width: 100px;
    height: 45px;
    border-top: 1px solid #f31e37;
    line-height: 44px;
    color: #fff;
    text-align: center;
    float: right;
    background: #f31e37;
    margin-left: 10px;
  }

  .list-value2 {
    border-top: 1px solid #e9e9e9;
  }

  .goods-bot-sure-btn:hover {
    background: #bb3337;
  }

  .most-left-select, .most-goods-select {
    float: left;
    width: 16px;
    margin-right: 8px;
    background: url(/bocm/platformjs/static/image/ap93.png) no-repeat center center;
    background-size: 16px 16px;
  }

  .most-left-select-checked {
    float: left;
    width: 16px;
    margin-right: 8px;
    /*background: url(/bocm/platformjs/static/image/ap44.png) no-repeat center center;*/
    background: url(/bocm/platformjs/static/image/sywall/icon-agree.png) no-repeat center center;
    background-size: 16px 16px;
  }

  .most-goods-select {
    height: 44px;
  }

  .goods-orders-center {
    width: 35%;
  }

  .v3-list-styles-R {
    color: #333;
  }

  .goods-orders {
    position: relative;
  }

  .goods-modify-box {
    position: absolute;
    width: 16%;
    top: 0;
    right: -250px;
  }

  .goods-modify-box-left {
    float: left;
    overflow: hidden;
    width: 76%;
    height: 50px;
    margin-top: 10px;
  }

  .goods-modify-box-left-L-box, .goods-modify-box-left-R-box {
    height: 36px;
    width: 36px;
    padding: 4px 0 0 4px;
    box-sizing: border-box;
  }

  .goods-modify-box-left-L, .goods-modify-box-left-R {
    height: 26px;
    width: 26px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 23px;
    color: #ccc;
    font-size: 20px;
  }

  .goods-modify-box-left-R {
    line-height: 22px;
  }

  .goods-modify-box-left-L-box {
    float: left;
  }

  .goods-modify-box-left-L {
    float: left;
    margin-right: 6px;
  }

  .goods-modify-box-left-C {
    width: 40%;
    height: 26px;
    float: left;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 0px;
    text-align: center;
  }

  .goods-modify-box-left-C input {
    height: 26px;
    width: 70%;
    text-align: center;
    background: none;
    border: none;
    border-radius: 0px;
  }

  .goods-modify-box-left-R-box {
    float: left;
  }

  .goods-modify-box-left-R {
    float: left;
  }

  .goods-modify-box-right {
    float: right;
    width: 50px;
    text-align: center;
    height: 100%;
    /*background: #f31e37;*/
    background: #4A90E2;
    line-height: 100%;
    display: table;
  }

  .goods-modify-box-right div {
    display: table-cell;
    vertical-align: middle;
    color: #fff;
  }

  .select-all {
    height: 44px;
    width: 33px;
    line-height: 46px;
    background: url(/bocm/platformjs/static/image/ap93.png) no-repeat 12px center;
    background-size: 16px 16px;
    padding-left: 35px;
    font-size: 13px;
    float: left;
  }

  .select-all-checked {
    height: 44px;
    width: 33px;
    line-height: 46px;
    /*background: url(/bocm/platformjs/static/image/ap44.png) no-repeat 12px center;*/
    background: url(/bocm/platformjs/static/image/sywall/icon-agree.png) no-repeat 12px center;
    background-size: 16px 16px;
    padding-left: 35px;
    font-size: 13px;
    float: left;
  }

  .goods-bot-sure-btn2, .goods-bot-sure-btn3 {
    width: 85px;
    height: 45px;
    border-top: 1px solid #4A90E2;
    line-height: 44px;
    color: #fff;
    text-align: center;
    float: right;
    background: #4A90E2;
    font-size: 14px;
  }

  .goods-bot-sure-btn3 {
    margin-left: 10px;
    background: #ff912a;
    border-top: 1px solid #ff912a;
  }

  .heji {
    line-height: 18px;
    margin-top: 6px;
    font-size: 14px;
  }

  .yunfei {
    line-height: 14px;
    font-size: 12px;
  }

  .list-value3 {
    float: right;
    text-align: right;
  }

  .most-left-select {
    height: 77.65px;
  }

  .goods-orders-left img {
    height: 78px;
    width: 100%;
  }

  .edit_all {
    height: 48px;
    padding-right: 12px;
    background: #fff;
    line-height: 48px;
    text-align: right;
    font-size: 15px;
  }

  @media ( max-width: 330px) {
    .goods-orders-center {
      width: 33%;
    }

    .goods-modify-box-left {
      width: 73%;
    }

    .goods-modify-box-left-C {
      width: 52%;
    }

    .goods-orders-left img {
      height: 68px;
    }
  }

  @media ( min-width: 331px) and (max-width: 370px) {
    .most-left-select {
      height: 74.34px;
    }

    .goods-orders-left img {
      height: 75px;
    }
  }

  @media ( min-width: 410px) {
    .goods-modify-box-left-C {
      width: 55%;
    }

    .goods-orders-left img {
      height: 87px;
    }
  }

  .v2-zizhu-bg2 {
    background: #fff;
  }

  /*.v2-zizhu-list-icon2{background: url(<?php echo SHOP_TEMPLATES_URL;?>/assets/images/zh9.png) no-repeat 12px center/ 21px 15px; padding-left:40px; line-height:44px; height:44px;}*/
</style>

