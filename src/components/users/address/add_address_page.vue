<template>
  <div class="top-wrapper">
    <div style="height: 0.2rem;background: #f4f6f5;"></div>
    <div class="normal">
      <label for="name">
        <span>收货人</span>
        <input class="info-txt" type="text" v-model="userAddress.true_name" id="name" placeholder="请输入收货人姓名">
      </label>
    </div>
    <div class="normal">
      <label for="phone">
        <span>手机号</span>
        <input class="info-txt" type="tel" v-model="userAddress.mob_phone" id="phone" placeholder="请输入收货人手机号"
               oninput="if(value.length>11)value=value.slice(0,11)">
      </label>
    </div>
    <div class="normal" @click="userAddress.county_name==''?isOk=false:isOk=true;set_province('picker1')">
      <span>省市区</span>
      <span
        class="info-txt unmargin"
        :class="{'light-color':userAddress.province_name=='请选择省市区'}">{{userAddress.province_name}}&nbsp;{{userAddress.city_name}}&nbsp;{{userAddress.county_name}}</span>
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/users/arrow.png'" alt="" class="address-arrow">
    </div>
    <div class="normal big">
      <textarea v-model="userAddress.address" placeholder="请填写详细地址。"></textarea>
    </div>
    <div class="set-address">
      <span class="cr" :class="userAddress.is_default==0||'activity'" @click="set_default_address"></span>
      <span class="default_text">设为默认地址</span>
    </div>
    <div class="footer-btns">
      <button class="save-msg" @click="saveMsg">保存</button>
      <button class="del-msg" @click="delMsg" v-if="delIsShow">删除</button>
    </div>
    <sy-popup ref='picker1' position="bottom">
      <div class="pop-wrapper iphonex-padding-bottom" @click.stop>
        <div class="header-top">
          <div :class="isActivity=='province'||'is-activity'" @click="isActivity='province'" id="pr">
            {{userAddress.province_name || '省'}}
          </div>
          <div :class="isActivity=='city'||'is-activity'" v-if='cityFlag' @click="isActivity='city'" id="ci">
            {{userAddress.city_name || '市'}}
          </div>
          <div :class="isActivity=='county'||'is-activity'" v-if='countyFlag' @click="isActivity='county'" id="co">
            {{userAddress.county_name || '县'}}
          </div>
          <div class="confirm" :class="!isOk||'isDone'" @click="isDone">确定</div>
        </div>
        <div class="content-address">
          <sy-tab-container v-model="isActivity" swipeable>
            <sy-tab-container-item id="province">
              <div class="content-province">
                <div v-for="item in provinceData" @click="provinceFn(item,$event)">{{item.area_name}}</div>
              </div>
            </sy-tab-container-item>
            <sy-tab-container-item id="city" v-if='cityFlag'>
              <div class="content-province">
                <div v-for="item in cityData" @click="cityFn(item,$event)">{{item.area_name}}</div>
              </div>
            </sy-tab-container-item>
            <sy-tab-container-item id="county" v-if='countyFlag'>
              <div class="content-province">
                <div v-for="item in countyData" @click="countryFn(item,$event)">{{item.area_name}}</div>
              </div>
            </sy-tab-container-item>
          </sy-tab-container>
        </div>
      </div>
    </sy-popup>
  </div>
</template>

<script>
  import { trim } from '../../../packages/utils/dom.js'
  import { Toast } from 'mint-ui'
  var qs = require('qs')
  export default {
    data () {
      return {
        default_address: false,
        userAddress: {
          address: '',
          city_name: '',
          county_name: '',
          mob_phone: '',
          province_name: '请选择省市区',
          true_name: '',
          address_id: '',
          last_id: '',
          is_default: 0
        },

        provinceData: [],
        cityData: [],
        countyData: [],
        isActivity: 'province',
        cityFlag: false,
        countyFlag: false,
        isOk: false,
        delIsShow: false,
        address_id: '',
      }
    },
    created () {
      this.getProvince()
      var id = this.$route.query.address_id
      if (id) {
        this.address_id = id
      } else {
        this.address_id = ''
      }
      if (this.address_id === '') {
        this.delIsShow = false
        document.title = '新增地址'
      } else {
        this.delIsShow = true
        document.title = '编辑地址'
        this.getAddress()
      }
    },
    methods: {
      getAddress () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_address_list&address_id=' + this.address_id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200 && res.data.content.length !== 0) {
            this.userAddress = res.data.content[0]
          } else if (res.data.code === 401) {

          }
        }, (error) => {
          console.log(error)
        })
      },
      getProvince () {
        let url = this.siteInfo.host + '/api/index.php?act=v_area&op=get_area_list'
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.provinceData = res.data.content
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      set_default_address () {
        this.userAddress.is_default = this.userAddress.is_default == 1 ? '0' : '1'
      },
      saveMsg () {
        if (trim(this.userAddress.true_name) === '') {
          this._appjs.showToast('姓名不能为空')
          return
        }
        if (trim(this.userAddress.mob_phone) === '') {
          this._appjs.showToast('电话不能为空')
          return
        }
        if (trim(this.userAddress.province_name) === '' || trim(this.userAddress.city_name) === '' || trim(this.userAddress.county_name) === '') {
          this._appjs.showToast('省市区不能为空')
          return
        }
        if (trim(this.userAddress.address) === '') {
          this._appjs.showToast('详细地址不能为空')
          return
        }
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_address_edit'
        this.$http.post(url, qs.stringify({
          last_id: this.userAddress.last_id,
          address_id: this.userAddress.address_id,
          address: this.userAddress.address,
          true_name: this.userAddress.true_name,
          mob_phone: this.userAddress.mob_phone,
          is_default: this.userAddress.is_default
        })).then((res) => {
          if (res.data.code === 200) {
            this.$router.replace({path: '/choose_address'})
          } else {
//            alert('保存失败')
            Toast(res.data.message )
          }
        }, (error) => {
          console.log(error)
        })
      },
      delMsg () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_address_del&address_id=' + this.userAddress.address_id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
//            this._appjs.syJsbLaunchWebview(this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=choose_address')
            this.$router.replace({path: '/choose_address'})
          } else {
            Toast('删除失败')
          }
        }, (error) => {
          console.log(error)
        })
      },
      set_province (picker) {
        this.$refs[picker].open()
        this.isActivity = 'province'
      },
      setBlue (e) {
        var elParent = e.target.parentNode
        for (var i = 0; i < elParent.childNodes.length; i++) {
          elParent.childNodes[i].style.color = '#4B4F63'
        }
        e.target.style.color = '#4A90E2'
      },
      provinceFn (item, e) {
        this.setBlue(e)
        document.getElementById('pr').style.color = '#4B4F63'
        this.userAddress.province_name = item.area_name
        this.userAddress.city_name = ''
        this.userAddress.county_name = ''
        this.isOk = false
        this.cityFlag = false
        this.countyFlag = false
        let url = this.siteInfo.host + '/api/index.php?act=v_area&op=get_area_list&area_parent_id=' + item.area_id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.cityData = res.data.content
            this.isActivity = 'city'
            this.cityFlag = true
            this.countyFlag = false
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })

      },
      cityFn (item, e) {
        this.setBlue(e)
        document.getElementById('ci').style.color = '#4B4F63'
        this.userAddress.city_name = item.area_name
        this.userAddress.county_name = ''
        this.countyFlag = false
        this.isOk = false
        let url = this.siteInfo.host + '/api/index.php?act=v_area&op=get_area_list&area_parent_id=' + item.area_id
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.countyData = res.data.content
            this.isActivity = 'county'
            this.countyFlag = true
          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      countryFn (item, e) {
        this.setBlue(e)
        this.isOk = true
        document.getElementById('co').style.color = '#4B4F63'
        this.userAddress.county_name = item.area_name
        this.userAddress.last_id = item.area_id
      },
      isDone () {
        if (trim(this.userAddress.province_name) === '' || trim(this.userAddress.city_name) === '' || trim(this.userAddress.county_name) === '') {
          this._appjs.showToast('省市区不能为空')
          return
        }
        if (!this.isOk) return
        this.$refs['picker1'].close()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 0.88rem;
  $bigHeight: 1.75rem;
  $width_height: 0.32rem;
  $paddingLeft: 0.3rem;
  $fontSize: 0.28rem;
  $textColor: #4B4F63;
  .top-wrapper {
    height: 100%;
    position: relative;
    .normal {
      height: $height;
      background: #fff;
      border-bottom: 1px solid rgba(218, 222, 228, 0.60);
      line-height: $height;
      text-align: left;
      padding: 0 $paddingLeft 0 $paddingLeft;
      font-size: $fontSize;
      overflow: hidden;
      color: $textColor;
      box-sizing: border-box;
      span, input {
        float: left;
        font-size: $fontSize;
      }
      input {
        height: 99%;
        font-weight: 300;
      }
      .info-txt {
        font-size: $fontSize;
        color: #818C9E;
        line-height: 0.88rem;
        width: 4rem;
      }
      .unmargin {
        margin: 0;
      }
      .light-color {
        color: #DADEE4;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: #DADEE4;
        font-weight: 300;
      }
      input:-moz-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: #DADEE4;
        font-weight: 300;
      }
      input::-moz-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: #DADEE4;
        font-weight: 300;
      }
      input:-ms-input-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: #DADEE4;
        font-weight: 300;
      }
      span {
        display: inline-block;
        font-weight: 300;
        font-size: $fontSize;
        color: #4B4F63;
        margin-right: 1.1rem;
      }
      .address-arrow {
        width: 0.12rem;
        height: 0.24rem;
        float: right;
        margin: 0.32rem 0rem 0 0;
      }
    }
    .big {
      height: $bigHeight;
      line-height: $bigHeight;
      position: relative;
      border: 0;
      span {
        line-height: 0.7rem;
        position: absolute;
      }
      textarea {
        width: 100%;
        height: 83%;
        border: 0;
        resize: none;
        line-height: 0.5rem;
        font-size: $fontSize;
        color: #818C9E;
        font-weight: 300;
      }
    }
    div.set-address {
      text-align: left;
      padding-top: 0.22rem;
      padding-left: $paddingLeft;
      font-size: $fontSize;
      overflow: hidden;
      position: relative;
      .cr {
        display: inline-block;
        width: $width_height;
        height: $width_height;
        border-radius: 50%;
        border: 1px solid #DADEE4;
        margin-right: 0.1rem;
        box-sizing: border-box;
        float: left;
      }
      .activity {
        border: 0;
        background: url("../../../../static/image/checked_address.png");
        background-size: cover;
      }
      .default_text {
        font-weight: 300;
        float: left;
        font-size: .24rem;
        color: #666A7F;
        line-height: 0.32rem;
      }
    }
    .footer-btns {
      width: 100%;
      position: absolute;
      bottom: 0.9rem;
      .del-msg, .save-msg {
        width: 6.9rem;
        text-align: center;
        height: 0.88rem;
        line-height: 0.88rem;
        border: 0;
        border-radius: 0.08rem;
        padding: 0;
        font-size: .32rem;
      }
      .save-msg {
        background: #4A90E2;
        color: #FFFFFF;
      }
      .del-msg {
        background: #f7f9fa;
        color: #4B4F63;
        border: 1px solid #DADEE4;
        margin-top: 0.4rem;
      }
    }
  }

  .pop-wrapper {
    width: 100%;
    background: #fff;
    overflow: hidden;
  }

  .header-top {
    border-bottom: 1px solid #DADEE4;
    width: 100%;
    height: 1.04rem;
    box-sizing: border-box;
    > div {
      float: left;
      border-bottom: 0.04rem solid #4A90E2;
      margin-right: 0.5rem;
      font-size: .30rem;
      color: #818C9E;
      height: 1rem;
      line-height: 1rem;
      font-weight: 300;
      max-width: 1.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .is-activity {
      border-bottom: 0;
    }
    div:nth-of-type(1) {
      margin-left: 0.5rem;
    }
    .confirm {
      float: right;
      margin-right: 0.5rem;
      font-size: .30rem;
      color: #DADEE4;
      border: 0;
      font-weight: 300;
    }
    .isDone {
      font-size: .30rem;
      color: #4A90E2;
    }
  }

  .content-address {
    overflow: hidden;
    width: 100%;
    .content-province {
      width: 104%;
      height: 7.04rem;
      padding-left: 0.5rem;
      overflow: scroll;
      overflow-x: hidden;
      > div {
        line-height: 0.88rem;
        text-align: left;
        height: 0.88rem;
        font-size: .30rem;
        font-weight: 300;
        color: #4B4F63;
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
