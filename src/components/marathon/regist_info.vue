<template>
  <div>
    <div v-title="'报名信息'"></div>
    <div class="must">
      <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill.png'">
      下列信息中带 * 的为必填项。
    </div>
    <div class="info_wrap">
      <div class="info_title">个人基本信息</div>
      <div class="line"></div>
      <form action="" ref="ref">
        <div class="item clearfix">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;姓名
          </div>
          <input type="text" class="info_input" placeholder="请输入" maxlength='21'
                 @blur="upKey(info.enroll_name, 20,'showNameTips')"
                 v-model="info.enroll_name">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'" class="error"
               alt="error"
               v-show="showNameTips">
        </div>
        <div class="line"></div>
        <div class="item clearfix">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;姓名拼音
          </div>
          <input type="url" class="info_input" placeholder="请输入大写字母全拼" maxlength="40"
                 @blur="upKey(info.enroll_name_pinyin,40,'showPnameTips')"
                 v-model="info.enroll_name_pinyin" @change="capitalize(info.enroll_name_pinyin)">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'" class="error"
               alt="error"
               v-show="showPnameTips">
        </div>
        <div class="line"></div>
        <div class="item clearfix" @click="sheetVisible = true">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;性别
          </div>
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right; margin-right: 0.3rem;">
          <input type="text" class="info_input" placeholder="请选择" readonly="readonly"
                 v-model="info.sexText">
          <mt-actionsheet
              :actions="actions"
              v-model="sheetVisible">
          </mt-actionsheet>
        </div>
        <div class="line"></div>
        <div class="item clearfix" @click="isCountry = true">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;国籍
          </div>
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right; margin-right: 0.3rem;">
          <input type="text" class="info_input" placeholder="请选择" readonly="readonly"
                 v-model="info.nationality_china" @click="popupVisible =true">
          <input type="hidden" class="info_input" placeholder="请选择" readonly='readonly'
                 v-model="info.enroll_nationality">
          <mt-popup v-model="popupVisible" position="bottom" closeOnClickModal="true">
            <div class="toolbar">
              <div class="picker-toolbar">
                                <span class="mint-datetime-action mint-datetime-cancel"
                                      @click="quxiao('popupVisible','nationality_china')"
                                >取消</span>
                <span class="mint-datetime-action mint-datetime-confirm"
                      @click="popupVisible =false">确定</span>
              </div>
              <mt-picker :slots="slots" @change="onValuesChange" v-model="info.nationality_china"
                         v-show="isCountry"
              ></mt-picker>
            </div>
          </mt-popup>

        </div>
        <div class="line"></div>
        <div class="item clearfix" @click="isId = true">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;证件类型
          </div>
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right; margin-right: 0.3rem;">
          <input type="text" class="info_input" placeholder="请选择" readonly='readonly' v-model="info.idcard"
                 @click="popup =true">
          <input type="hidden" class="info_input" placeholder="请选择" readonly='readonly'
                 v-model="info.id_type">
          <mt-popup v-model="popup" position="bottom" closeOnClickModal="true">
            <div class="toolbar">
              <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="quxiao('popup','idcard')">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="popup =false">确定</span>
              </div>
              <mt-picker :slots="id" @change="onChangeId" v-model="info.id_type_china"
                         v-show="isId"
              ></mt-picker>
            </div>
          </mt-popup>
        </div>
        <div class="line"></div>
        <div class="item clearfix">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;证件号
          </div>
          <input type="number" class="info_input" placeholder="请输入" v-model="info.id_value"
                 @blur="shenfenzheng(info.id_type,info.id_value,verify.id,'showIdTips')">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'" class="error"
               alt="error" v-show="showIdTips">
        </div>
        <div class="line"></div>
        <div class="item clearfix">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;出生日期
          </div>
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right; margin-right: 0.3rem;">
          <input type="text" class="info_input" placeholder="请选择" readonly="readonly"
                 v-model="info.enroll_birthday" @click="openPicker">
          <div>
            <mt-datetime-picker ref="picker"
                                type="date"
                                :startDate="startDate"
                                :endDate="endDate"
                                v-model="pickerValue"
                                @confirm="onChangeDate">
            </mt-datetime-picker>
          </div>
        </div>
        <div class="line"></div>
        <div class="item clearfix">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;手机号
          </div>
          <input
              type="number"
              class="info_input" placeholder="请输入11位数手机号码" v-model="info.enroll_mobile"
              @blur="verifyId(info.enroll_mobile,verify.tel,'showTelTips')">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'" class="error"
               alt="error" v-show="showTelTips">
        </div>
        <div class="line"></div>
        <div class="item clearfix">
          <div class="name">
            <span style="width: 0.05rem;"></span>
            &nbsp;&nbsp;固定电话
          </div>
          <input type="number" class="info_input" placeholder="请输入" v-model="info.enroll_phone">
        </div>
        <div class="line"></div>
        <div class="item clearfix">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;邮箱
          </div>
          <input type="email" class="info_input" placeholder="请输入" v-model="info.enroll_email"
                 @blur="verifyId(info.enroll_email,verify.email,'showEmailTips')">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'" class="error"
               alt="error"
               v-show="showEmailTips">
        </div>
        <div class="line"></div>
        <div class="item clearfix" @click="isAddress=true">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;选择地址
          </div>
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right; margin-right: 0.3rem;">
          <input type="text" class="info_input" placeholder="请选择" readonly="readonly"
                 v-model="info.address_name"
                 @click="addresspopup=true">
          <input type="hidden" class="info_input" placeholder="请选择" readonly="readonly"
                 v-model="info.province_id">
          <input type="hidden" class="info_input" placeholder="请选择" readonly="readonly"
                 v-model="info.city_id">
          <input type="hidden" class="info_input" placeholder="请选择" readonly="readonly"
                 v-model="info.enroll_province">
          <input type="hidden" class="info_input" placeholder="请选择" readonly="readonly"
                 v-model="info.enroll_city">
          <mt-popup v-model="addresspopup" position="bottom" class="mint-popup-4">
            <div class="picker-toolbar">
                            <span class="mint-datetime-action mint-datetime-cancel"
                                  @click="quxiao('addresspopup','address_name')">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm"
                    @click="addresspopup=false">确定</span>
            </div>
            <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="5"
                       valueKey="area_name"
                       v-show="isAddress">
            </mt-picker>
          </mt-popup>
        </div>
        <div class="line"></div>
        <div class="item clearfix">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;详细地址
          </div>
          <input type="text" class="info_input" placeholder="请输入" v-model="info.enroll_address"
                 @blur="showDetail">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'" class="error"
               alt="error"
               v-show="showAddressDetail">
        </div>
        <div class="line"></div>
        <div class="item clearfix">
          <div class="name">
            <span>*</span>&nbsp;&nbsp;邮编
          </div>
          <input type="number" class="info_input" placeholder="请输入" v-model="info.enroll_postcode"
                 @blur="zip()">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'" class="error"
               alt="error"
               v-show="showZipcodeTips">
        </div>
        <div class="line"></div>
      </form>
      <div class="item_b">
        <P class="line"></P>
        <P>一起善源 爱 · 源于善</P>
        <P class="line"></P>
      </div>
      <div style="height: 1rem;width: 100%;"></div>
    </div>
    <div class="next" @click="infoSave">下一步</div>
  </div>
</template>

<script>
  import area from './area.json'

  export default {
    data () {
      return {
        marathon_id: '',  //马拉松id
        enroll_type: '', //赛事id
        showNameTips: false, // 控制显示姓名
        showPnameTips: false, // 控制显示拼音
        showIdTips: false, // 控制显示证件类型
        showTelTips: false, //控制显示手机号码
        showEmailTips: false, // 控制显示邮件
        showZipcodeTips: false, //控制显示邮编
        sheetVisible: false, //控制显示性别
        isCountry: false, //控制显示国籍
        popupVisible: false, //控制显示国籍遮罩层
        popup: false, //控制显示证件类型遮罩层
        isId: false, //控制显示证件号
        datepopup: false, //控制显示时间遮罩层
        addresspopup: false, //控制显示地址遮罩层
        isBrithday: false,
        isAddress: false,
        pickerValue: new Date("September 01,1985 22:19:35"), //初始化时间选择器
        showAddressDetail: false, //详细地址
        area: [],
        tmpCode: '', //获取数据code
        sendCode: '', //发送数据code
        info: {address_name: ''},
//                验证正则
        verify: {
          id: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
//                    tel: /^1[0-9]{10}$/,
          tel: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})$/,
          email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          zipCode: /^[1-9][0-9]{5}$/
        },
//                修改性别内容
        actions: [
          {
            name: '男',
            method: this.selectMan
          }, {
            name: '女',
            method: this.selectWoman
          }
        ],
//                选择国籍
        slots: [
          {
            flex: 1,
            values: ['', '中国大陆', '中国香港', '中国澳门', '中国台北'],
            className: 'slot',
            textAlign: 'center'
          }
        ],
        //选择证件类型
        id: [
          {
            flex: 1,
            values: ['', '身份证', '港澳居民来往大陆通行证', '台胞证', '护照'],
            className: 'slot',
            textAlign: 'center'
          }
        ],
//                选择地址
        citySlots: [
          {
            flex: 1,
            values: area.content,
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: area.content[0]['city'],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
//                选择出生日期
        startDate: new Date('1950-01-01'),
        endDate: new Date('1997-12-31'),
        h: ''
      }
    },
    created() {
      this.getData()
    },
    mounted() {
//            修改actionsheet中的内容
      this.sexs = [{
        name: '男',
        method: this.selectMan
      }, {
        name: '女',
        method: this.selectWoman
      }]
    },
    methods: {
      getData() {
        this.enroll_type = this.$route.query.enroll_type
        this.$http.get(this.siteInfo.host + '/api/index.php?act=marathon_enroll&op=getUserSignInfo').then(res => {

          this.info.code = res.data.code
          this.tmpCode = res.data.code
          this.info = res.data.content
            console.log(this.info)
          this.info.enroll_type = this.enroll_type
//          console.log(res.data.content.enroll_province)
          localStorage.setItem("userInfo", JSON.stringify(this.info))
          console.log(localStorage.getItem('userInfo', JSON.stringify(this.info)))
//                    初始化性别
          if (this.info.enroll_sex === '1') {
            this.info.sexText = '女'
          } else if (this.info.enroll_sex === '0') {
            this.info.sexText = '男'
          }
          else {
            this.info.sexText = ''
          }
//                    初始化国籍
          if (this.info.enroll_nationality === '1') {
            this.info.nationality_china = '中国大陆'
          } else if (this.info.enroll_nationality === '2') {
            this.info.nationality_china = '中国香港'
          } else if (this.info.enroll_nationality === '3') {
            this.info.nationality_china = '中国澳门'
          } else if (this.info.enroll_nationality === '4') {
            this.info.nationality_china = '中国台北'
          } else {
            this.info.nationality_china = ''
          }
//                    初始化证件
          if (this.info.id_type === '0') {
            this.info.idcard = '身份证'
          } else if (this.info.id_type === '1') {
            this.info.idcard = '港澳居民往来大陆通行证'
          } else if (this.info.id_type === '2') {
            this.info.idcard = '台胞证'
          } else if (this.info.id_type === '3') {
            this.info.idcard = '护照'
          } else {
            this.info.idcard = ''
          }
//                      初始化出生日期
          if(this.info.enroll_birthday == '1985-09-01'){
            this.info.enroll_birthday = ''
          }else {
            this.info.enroll_birthday = res.data.content.enroll_birthday
          }
//                    初始化地址
          if (!(res.data.content.enroll_province == '' && res.data.content.enroll_city == '')) {
            this.info.address_name = area.content[0]['area_name'] + area.content[0]['city'][0]['area_name']
          } else {
            this.info.address_name = res.data.content.enroll_province + res.data.content.enroll_city
          }
        })
      },
//      拼音姓名转换成大写
      capitalize(value){
        if (!value) {
          return ''
        } else {
          this.info.enroll_name_pinyin = value.toUpperCase()
          console.log(value.toUpperCase())
        }
      },
//      点击取消按钮选项为空
      quxiao (shows, value) {
        this[shows] = false
        this.info[value] = ''
      },
//            验证长度
      upKey(info, num, tip) {
        if (info === undefined || info === '') {
          this.$toast({
            message: "信息填写不完整",
            duration: 2000
          })
          this[tip] = true
        } else if (info.length > num) {
          this.$toast({
            message: "输入的字符不能超过" + num + "个",
            duration: 2000
          })
          this[tip] = true
        } else {
          this[tip] = false
        }
      },
//            选择性别
      selectMan() {
        this.info.enroll_sex = '0'
        this.info.sexText = '男'
      },
      selectWoman() {
        this.info.enroll_sex = '1'
        this.info.sexText = '女'
      },
//            选择国籍
      onValuesChange(picker, values) {
        this.info.nationality_china = values[0]
        switch (values[0]) {
          case '中国大陆':
            this.info.enroll_nationality = 1
            break;
          case '中国香港' :
            this.info.enroll_nationality = 2
            break;
          case '中国澳门' :
            this.info.enroll_nationality = 3
            break;
          case '中国台北' :
            this.info.enroll_nationality = 4
            break;
        }
      },
//            选择证件类型
      onChangeId(picker, values) {
        this.info['idcard'] = values[0]
        switch (values[0]) {
          case '身份证':
            this.info.id_type = 0
            break;
          case '港澳居民来往大陆通行证' :
            this.info.id_type = 1
            break;
          case '台胞证' :
            this.info.id_type = 2
            break;
          case '护照' :
            this.info.id_type = 3
            break;
        }
      },
//            验证
      verifyId(info, veriy, tip) {
        if (info === undefined) {
          this.$toast({
            message: '信息填写不完整！',
            duration: 2000
          })
          this[tip] = true
        } else if (!veriy.test(info)) {
          this[tip] = true
          this.$toast({
            message: '信息填写不正确或者填写不完整！',
            duration: 2000
          })
        } else {
          this[tip] = false
        }
        this.$refs.ref.style.transform = 'translateY(0px)'
      },
//            验证身份证
      shenfenzheng(id_type, id_value, veriy, tip) {
        if (id_type === 0) {
          if (!veriy.test(id_value)) {
            this[tip] = true
            this.$toast({
              message: '信息填写不正确或者填写不完整！',
              duration: 2000
            })
          } else {
            this[tip] = false
          }
        } else {
          this[tip] = false
        }
      },
//            选择出生日期
      onChangeDate(picker) {
        var b = picker
        var y = b.getFullYear()
        var m = b.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = b.getDate()
        d = d < 10 ? ('0' + d) : d
        this.info.enroll_birthday = y + '-' + m + '-' + d
      },
//            选择地址
      onCityChange(picker, values) {
        if (typeof(values[0]) == 'undefined') {
          values[0] = area.content[0]
        }
        if (typeof(values[1]) == 'undefined') {
          values[1] = area.content[0]['city'][0]
        }
        let address_name = values[0]['area_name']
        let shi = values[0]['city']
        address_name += values[1]['area_name']
        picker.setSlotValues(1, shi)
        this.info.address_name = address_name
        this.info.province_id = values[0]['area_id']
        this.info.city_id = values[1]['area_id']
        this.info.enroll_province = values[0]['area_name']
        this.info.enroll_city = values[1]['area_name']
      },
      infoSave: function () {
        if (this.info.enroll_name === undefined || this.info.enroll_name.trim() === '') {
          this.$toast('信息填写不完整或填写错误')
          this.showNameTips = true
        }
        else if (this.info.enroll_name_pinyin === undefined || this.info.enroll_name_pinyin.trim() === '') {
          this.$toast('信息填写不完整或填写错误')
          this.showPnameTips = true
        }
        else if (this.info.enroll_sex === undefined || this.info.enroll_sex.trim() === '') {
          this.$toast('信息填写不完整或填写错误')
        }
        else if (this.info.enroll_nationality === undefined || this.info.enroll_nationality.toString().trim() === '') {
          this.$toast('信息填写不完整或填写错误')
        }
        else if (this.info.id_type === undefined || this.info.id_type.toString().trim() === '') {
          this.$toast('信息填写不完整或填写错误')
        }
        else if (this.info.id_value === undefined || this.info.id_value.trim() === '') {
          this.$toast('信息填写不完整或填写错误')
        }
        else if (this.info.enroll_birthday === undefined || this.info.enroll_birthday.trim() === '') {
          this.$toast('信息填写不完整或填写错误')
        }
        else if (this.info.enroll_mobile === undefined || this.info.enroll_mobile.trim() === '') {
          this.$toast('信息填写不完整或填写错误')
          this.showTelTips = true
        } else if (this.info.enroll_email === undefined || this.info.enroll_email.toString().trim() === '') {
          this.$toast('信息填写不完整或填写错误')
          this.showEmailTips = true
        } else if (this.info.province_id === undefined || this.info.province_id.trim() === '' || this.info.city_id.trim() === '') {
          this.$toast('信息填写不完整或填写错误')
        } else if (this.info.enroll_address === undefined || this.info.enroll_address.trim() === '') {
          this.$toast('信息填写不完整或填写错误')
          this.showAddressDetail = true
        } else if (this.info.enroll_postcode === undefined || this.info.enroll_postcode.trim() === '' || !this.verify.zipCode.test(this.info.enroll_postcode)) {
          this.$toast('信息填写不完整或填写错误')
          this.showZipcodeTips = true
        } else {
          this.send()
        }
      },
      openPicker() {
        this.$refs.picker.open();
      },
//      验证邮编
      zip(){
        if (this.verify.zipCode.test(this.info.enroll_postcode)) {
          this.showZipcodeTips = false
        } else {
          this.showZipcodeTips = true

        }
      },
      showDetail() {
        if (this.info.enroll_address === undefined || this.info.enroll_address.trim() === '') {
          this.showAddressDetail = true
        } else {
          this.showAddressDetail = false
        }
      },
      send() {
        this.marathon_id = this.$route.query.marathon_id
        this.enroll_type = this.$route.query.enroll_type
        this.info.code = this.tmpCode

        var userInfo = {
          'enroll_name': this.info.enroll_name,
          'enroll_name_pinyin': this.info.enroll_name_pinyin,
          'sexText': this.info.sexText,
          'enroll_sex': this.info.enroll_sex,
          'nationality_china': this.info.nationality_china,
          'enroll_nationality': this.info.enroll_nationality,
          'idcard': this.info.idcard,
          'id_type': this.info.id_type,
          'id_value': this.info.id_value,
          'enroll_birthday': this.info.enroll_birthday,
          'enroll_mobile': this.info.enroll_mobile,
          'enroll_address': this.info.enroll_address,
          'province_id': this.info.province_id,
          'city_id': this.info.city_id + '',
          'enroll_province': this.info.enroll_province,
          'enroll_city': this.info.enroll_city,
          'enroll_postcode': this.info.enroll_postcode,
          'enroll_email': this.info.enroll_email,
          'code': this.info.code,
          'enroll_type': this.enroll_type
        }

//        更改code
        var qs = require('querystring')
        this.$http.post(this.siteInfo.host + '/api/index.php?act=marathon_enroll&op=userSign&marathon_id=1', qs.stringify(userInfo)).then(res => {
            console.log(userInfo)
            console.log(res.data.code )
          if (res.data.code === 402) {
            switch (res.data.message) {
              case '请写入有效姓名，长度不能超过20个字符！':
                this.$toast('信息填写不完整或填写错误')
                break;
              case '请写入有效姓名拼写，长度不能超过40个字符！':
                this.$toast('信息填写不完整或填写错误')
                break;
              case '性别请选择男/女！':
                this.$toast('信息填写不完整或填写错误')
                break;
              case '请选择类型！':
                this.$toast('信息填写不完整或填写错误')
                break;
              case '请选择正确国籍！':
                this.$toast('信息填写不完整或填写错误')
                break;
              case '请选择有效的证件类型！':
                this.$toast('信息填写不完整或填写错误')
                break;
              case '请填写有效的证件号码！':
                this.$toast('信息填写不完整或填写错误')
                this.showIdTips = true
                break;
              case '请写入有效出生日期并且不得晚于1997-12-31！':
                this.$toast('信息填写不完整或填写错误')
                break;
              case '请填写有效的手机号码！':
                this.$toast('信息填写不完整或填写错误')
                this.showTelTips = true
                break;
              case '请填写有效的email地址！':
                this.$toast('信息填写不完整或填写错误')
                this.showEmailTips = true
                break;
              case '请选择正确的地区！':
                this.$toast('信息填写不完整或填写错误')
                break;
              case '请写入有效详细地址！':
                this.$toast('信息填写不完整或填写错误')
                this.showAddressDetail = true
                break;
              case '请输入6位有效邮编！':
                this.$toast('信息填写不完整或填写错误')
                this.showZipcodeTips = true
                break;
            }
          } else if (res.data.code === 403) {
            this.$toast("未登录无权报名！")
          } else if (res.data.code === 500) {
            this.$toast("操作失败！")
          } else if (res.data.code === 404) {
            let url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_end&marathon_id=' + this.marathon_id + ''
            this._appjs.syJsbLaunchWebview(url)
          } else if (res.data.code === 302) {
            let url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_reg_suc&marathon_id=' + this.marathon_id + ''
            this._appjs.syJsbLaunchWebview(url)
          } else {
            this.tmpCode = 200
            let url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_regist_info2&sex=' + this.info.enroll_sex + '&marathon_id=' + this.marathon_id + ''
            this._appjs.syJsbLaunchWebview(url)
          }
//          this.tmpCode = 200
        })
      },
      // 下载app
      linkToDownload(){
        window.location.href = this.siteInfo.host + '/boc/index.php'
      }
    }
  }
</script>
<style scoped>
  .must {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 7.5rem;
    height: 0.6rem;
    background: #FFF59B;
    font-size: 0.24rem;
    font-weight: 300;
    color: #F25B4B;
    line-height: 0.6rem;
    text-align: left;
  }

  .must img {
    width: 0.26rem;
    height: 0.26rem;
    margin-left: 0.18rem;
    margin-right: 0.1em;
    vertical-align: middle;
    /*vertical-align: text-top;*/
    display: inline-block;
  }

  .info_wrap {
    padding-top: 0.6rem;
  }

  .info_title {
    width: 7.5rem;
    height: 0.7rem;
    background: #F7F9FA;
    font-weight: 300;
    font-size: 0.26rem;
    color: #666A7F;
    line-height: 0.7rem;
    padding-left: 0.3rem;
    text-align: left;
    box-sizing: border-box;
  }

  .item {
    width: 7.5rem;
    height: 0.88rem;
    background: #fff;
    font-weight: 300;
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.88rem;
    padding-left: 0.3rem;
    text-align: left;
    /*position: relative;*/
    box-sizing: border-box;
  }

  .item span {
    display: inline-block;
    width: 0.1rem;
    font-size: 0.32rem;
    font-weight: 300;
    color: #F25B4B;
    vertical-align: middle;
    /*vertical-align: -webkit-baseline-middle;*/
  }

  .item .error {
    width: 0.3rem;
    height: 0.3rem;
    float: right;
    margin-right: 0.3rem;
  }

  .item .name {
    float: left;
    width: 25%;
    height: 0.88rem;
    line-height: 0.88rem;
  }

  .item .info_input {
    /*position: absolute;*/
    /*left: 2.6rem;*/
    font-size: 0.28rem;
    font-weight: 300;
    height: 0.88rem;
    width: 65%;
    background: transparent;
    color: #818C9E;
  }

  .item .info_input::-webkit-input-placeholder {
    color: #DADEE4;
  }

  .item .info_input_r {
    /*position: absolute;*/
    /*left: 3.4rem;*/
    width: 65%;
    float: right;
    margin-right: 0.2rem;
    font-size: 0.28rem;
    font-weight: 300;
    height: 0.88rem;
    text-align: right;
    background: transparent;
  }

  .item .info_input_r::-webkit-input-placeholder {
    color: #DADEE4;
  }

  .item img {
    width: 0.12rem;
    height: 0.24rem;
    /*position: absolute;*/
    /*right: 0.3rem;*/
    /*top: 0.32rem;*/
    margin-right: 0.3rem;
    margin-top: 0.33rem;
    float: right;
  }

  .item_b {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #f4f6f5;
  }

  .item_b p {
    display: inline-block;
    font-size: 0.24rem;
    color: #DADEE4;
  }

  .item_b .line {
    height: 1px;
    width: 0.8rem;
    background-color: #DADEE4;
    vertical-align: middle;
    margin: 0 0.15rem;
  }

  .next {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 7.5rem;
    height: 1rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    background: #4A90E2;
    line-height: 1rem;
    text-align: center;
  }

  .mint-popup {
    width: 100%;
  }

  .toolbar {
    width: 7.5rem;
  }

  .picker {
    background: #fff;
    height: 180px;
  }

  .picker-toolbar {
    width: 100%;
    position: absolute;
    top: -40px;
    left: 0;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }

  .picker-toolbar span {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #26a2ff;
  }

  .mint-toast {
    text-align: left;
  }

  .mint-toast-text {
    text-align: justify;
    font-size: 0.3rem;
    line-height: 0.5rem;
  }
</style>
