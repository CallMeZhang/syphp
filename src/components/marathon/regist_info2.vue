<template>
  <div>
    <div v-title="'报名信息'"></div>
    <div class="must">
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/marathon/Fill.png'">
      下列信息中带 * 的为必填项。
    </div>
    <div class="info_wrap">
      <div class="info_title">个人补充信息</div>
      <div class="line"></div>
      <form action="">
        <div class="item" v-on:click.stop="isBlood = true">
          &nbsp;&nbsp;血型
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right;margin-right: 0.3rem;right: 0;">
          <input type="text" class="info_input " placeholder="请选择" v-model="bloodtype"
                 readonly="readonly">
        </div>
        <mt-popup v-model="isBlood" position="bottom" class="isBlood">
          <div class="toolbar">
            <div class="picker-toolbar">
              <span class="mint-datetime-action mint-datetime-cancel" @click="quxiaos('isBlood','bloodtype')">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="isBlood=false">确定</span>
            </div>
          </div>
          <mt-picker :slots="bloodSlots" @change="onSlot1Change" :visible-item-count="5"
                     v-model="bloodtype"></mt-picker>
        </mt-popup>
        <div class="line"></div>
        <div class="item" v-on:click.stop="isZhiye = true">
          &nbsp;&nbsp;职业
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right;margin-right: 0.3rem;right: 0;">
          <input type="text" class="info_input" placeholder="请选择" v-model="zhiye"
                 readonly="readonly">
        </div>
        <mt-popup v-model="isZhiye" position="bottom">
          <div class="toolbar">
            <div class="picker-toolbar">
              <span class="mint-datetime-action mint-datetime-cancel"
                    @click="quxiao('isZhiye','zhiye')">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="isZhiye=false">确定</span>
            </div>
          </div>
          <mt-picker :slots="zhiyeSlots" @change="onZhiyeChange" :visible-item-count="5"
                     v-model="zhiye"></mt-picker>
        </mt-popup>
        <div class="line"></div>
        <div class="item" v-on:click.stop="isEdu = true">
          &nbsp;&nbsp;教育程度
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right;margin-right: 0.3rem;right: 0;">
          <input type="text" class="info_input" placeholder="请选择" v-model="edu" readonly="readonly">
        </div>
        <mt-popup v-model="isEdu" position="bottom">
          <div class="toolbar">
            <div class="picker-toolbar">
              <span class="mint-datetime-action mint-datetime-cancel" @click="quxiao('isEdu','edu')">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="isEdu=false">确定</span>
            </div>
          </div>
          <mt-picker :slots="eduSlots" @change="onEduChange" :visible-item-count="5"
                     v-model="edu"></mt-picker>
        </mt-popup>
        <div class="line"></div>
        <div class="item" v-on:click.stop="isMoney = true">
          &nbsp;&nbsp;个人年收入
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right;margin-right: 0.3rem;right: 0;">
          <input type="text" class="info_input" placeholder="请选择" v-model="money" readonly="readonly">
        </div>
        <mt-popup v-model="isMoney" position="bottom">
          <div class="toolbar">
            <div class="picker-toolbar">
              <span class="mint-datetime-action mint-datetime-cancel"
                    @click="quxiao('isMoney','money')">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="isMoney=false">确定</span>
            </div>
          </div>
          <mt-picker :slots="moneySlots" @change="onMoneyChange" :visible-item-count="5"
                     v-model="money"></mt-picker>
        </mt-popup>
        <div class="line"></div>
        <div class="item" v-on:click.stop="isSize = true">
          <span>*</span>&nbsp;&nbsp;服装尺码
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right;margin-right: 0.3rem;right: 0;">
          <input type="text" class="info_input" placeholder="请选择" v-model="size" readonly="readonly"
                 v-on:blur="checkout_size(size)">
        </div>
        <mt-popup v-model="isSize" position="bottom">
          <div class="toolbar">
            <div class="picker-toolbar">
              <span class="mint-datetime-action mint-datetime-cancel" @click="quxiaos('isSize','size')">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="isSize=false">确定</span>
            </div>
          </div>
          <mt-picker :slots="genderfun" @change="onSizeChange" :visible-item-count="5" v-model="size"></mt-picker>
        </mt-popup>
        <div class="line"></div>
        <div class="item" v-on:click.stop="isBing = true">
          <span>*</span>&nbsp;&nbsp;是否患有疾病
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right;margin-right: 0.3rem;right: 0;">
          <input type="text" class="info_input" placeholder="请选择" v-model="info.disease_china" readonly="readonly"
                 v-on:blur="checkout_disease(info.disease_china)">
          <input type="hidden" class="info_input" v-model="info.enroll_disease" readonly="readonly">
        </div>
        <mt-popup v-model="isBing" position="bottom">
          <div class="toolbar">
            <div class="picker-toolbar">
              <span class="mint-datetime-action mint-datetime-cancel" @click="quxiaos('isBing','info.disease_china')">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="isBing=false">确定</span>
            </div>
          </div>
          <mt-picker :slots="bingSlots" @change="onBingChange" :visible-item-count="5" v-model="info.enroll_disease"></mt-picker>
        </mt-popup>
        <div class="line"></div>
        <div class="info_title">紧急联系人信息</div>
        <div class="line"></div>
        <div class="item">
          <span>*</span>&nbsp;&nbsp;姓名
          <input type="text" class="info_input" placeholder="请输入紧急联系人姓名" maxlength="21" v-model="info.enroll_urg_person"
                 v-on:blur="checkout_name(info.enroll_urg_person)">
          <img v-if="noName" class="err" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'">
        </div>
        <div class="line"></div>
        <div class="item">
          <span>*</span>&nbsp;&nbsp;手机号
          <input type="tel" class="info_input" placeholder="请输入紧急联系人手机号" maxlength="11" v-model="info.enroll_urg_mobile"
                 v-on:blur="checkout_tel(info.enroll_urg_mobile)">
          <img v-if="noTel" class="err" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'">
        </div>
        <div class="line"></div>
        <div class="info_title">历史参赛信息</div>
        <div class="line"></div>
        <div class="item">
          <span style="width: 0.05rem;"></span>
          &nbsp;&nbsp;全马完赛次数
          <input type="tel" class="info_input" placeholder="请输入" v-model="info.enroll_finished_times">
          <div class="ci">次</div>
        </div>
        <div class="line"></div>
        <div class="item item_h" v-on:click.stop="isQuan = true">
          <span>*</span>&nbsp;&nbsp;<div class="item_h_L">年内是否参加过全马</div>
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
               style="float: right;margin-right: 0.3rem;right: 0;">
          <input type="text" class="info_input" placeholder="请选择" v-model="quan" readonly="readonly"
                 v-on:blur="checkout_quan(quan)">
        </div>
        <mt-popup v-model="isQuan" position="bottom">
          <div class="toolbar">
            <div class="picker-toolbar">
              <span class="mint-datetime-action mint-datetime-cancel" @click="quxiaos('isQuan','quan')">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="isQuan=false">确定</span>
            </div>
          </div>
          <mt-picker :slots="quanSlots" @change="onQuanChange" :visible-item-count="5" v-model="quan"></mt-picker>
        </mt-popup>
        <div v-if="this.quan === '是'">
          <div class="line"></div>
          <div class="item">
            <span>*</span>&nbsp;&nbsp;最好成绩赛事
            <input type="text" class="info_input" v-model="info.enroll_oneyear_bestmatch" placeholder="请输入赛事名称"
                   v-on:blur="checkout_saishi(info.enroll_oneyear_bestmatch)">
            <img v-if="noBest" class="err" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/Fill2.png'">
          </div>
          <div class="line"></div>
          <div class="item" v-on:click.stop="isScore = true">
            <span>*</span>&nbsp;&nbsp;赛事成绩
            <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/icon-aow.png'"
                 style="float: right;margin-right: 0.3rem;right: 0;">
            <input type="text" class="info_input" placeholder="请选择" v-model="showFormatTime"
                   readonly="readonly" >
          </div>
          <mt-popup v-model="isScore" position="bottom" class="isBlood">
            <div class="toolbar">
              <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="quxiaos('isScore','info.enroll_oneyear_besttime')">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="isScore=false">确定</span>
              </div>
            </div>
            <mt-picker :slots="scoreSlots" @change="onScoreChange" :visible-item-count="5"
                       v-model="info.enroll_oneyear_besttime"></mt-picker>
          </mt-popup>
        </div>
        <div class="line"></div>
      </form>
      <div class="item_xy">
        <div class="yuan" @click="agree()"></div>
        <img v-if="isAgree" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/marathon/agree.png'"
             @click="agree()">
        <p>我已阅读并同意<span
            @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=marathon_router&op=marathon_agreement')">《赛事声明》</span>
        </p>
      </div>
      <div style="width: 100%;height: 1rem;"></div>
    </div>
    <div class="next" @click="info_finish">完成</div>
  </div>
</template>
<script>
  export default{
    created (){
      this.getGender()
    },
      mounted(){
        setTimeout(this.getData(),1)
      },
    data(){
      return {
        gender: '',
        marathon_id: '',
        isAgree: false,
        noTel: false,
        noName: false,
        noBest:false,
        isBlood: false,
        bloodtype: '',
        showFormatTime:'',
        bloodSlots: [
          {
            flex: 1,
            values: ['', 'A型', 'B型', 'AB型', 'O型', 'Rh型'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        isZhiye: false,
        zhiye:'',
        zhiyeSlots: [
          {
            flex: 1,
            values: ['', '职工', '企业高级职员', '机关及事业单位工作者', '专业人员', '学生', '私营业主', '自由职业者', '无业', '退休', '其他'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        isEdu: false,
        edu:'',
        eduSlots: [{
          flex: 1,
          values: ['', '高中及以下', '大专', '本科', '硕士', '博士'],
          className: 'slot1',
          textAlign: 'center'
        }],
        isMoney: false,
        money:'',
        moneySlots: [
          {
            flex: 1,
            values: ['', '5万以内', '5~10万', '10~15万', '15~20万', '20万以上'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        isSize: false,
        size: '',
        sizeSlots: [
          {
            flex: 1,
            values: ['', 'XS(170/88A)', 'S(175/92A)', 'M(175/96A)', 'L(180/100A)', 'XL(185/104A )', '2XL(185/108A)', '3XL(190/112A)'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        size1Slots: [
          {
            flex: 1,
            values: ['', 'XS(155/80A)', 'S(160/83A)', 'M(165/88A)', 'L(170/92A)', 'XL(170/96A )'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        isBing: false,
        bingSlots: [
          {
            flex: 1,
            values: ['', '无', '高血压', '糖尿病', '冠心病', '贫血', '哮喘', '肺气肿', '肾功能不全', '手术史', '严重外伤史', '其它'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        isQuan: false,
        quan: '',
        quanSlots: [
          {
            flex: 1,
            values: ['', '是', '否'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        isScore: false,
        scoreSlots: [
          {
            flex: 1,
            values: ['','0小时', '1小时', '2小时', '3小时', '4小时', '5小时', '6小时', '7小时', '8小时', '9小时', '10小时', '11小时', '12小时', '13小时', '14小时', '15小时', '16小时', '17小时', '18小时', '19小时', '20小时', '21小时', '22小时', '23小时', '24小时'],
//            values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: ':',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['','0分', '1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分', '11分', '12分', '13分', '14分', '15分', '16分', '17分', '18分', '19分', '20分', '21分', '22分', '23分', '24分', '25分', '26分', '27分', '28分', '29分', '30分', '31分', '32分', '33分', '34分', '35分', '36分', '37分', '38分', '39分', '40分', '41分', '42分', '43分', '44分', '45分', '46分', '47分', '48分', '49分', '50分', '51分', '52分', '53分', '54分', '55分', '56分', '57分', '58分', '59分'],
//            values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: ':',
            className: 'slot4'
          }, {
            flex: 1,
//            values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
            values: ['','0秒', '1秒', '2秒', '3秒', '4秒', '5秒', '6秒', '7秒', '8秒', '9秒', '10秒', '11秒', '12秒', '13秒', '14秒', '15秒', '16秒', '17秒', '18秒', '19秒', '20秒', '21秒', '22秒', '23秒', '24秒', '25秒', '26秒', '27秒', '28秒', '29秒', '30秒', '31秒', '32秒', '33秒', '34秒', '35秒', '36秒', '37秒', '38秒', '39秒', '40秒', '41秒', '42秒', '43秒', '44秒', '45秒', '46秒', '47秒', '48秒', '49秒', '50秒', '51秒', '52秒', '53秒', '54秒', '55秒', '56秒', '57秒', '58秒', '59秒'],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        info: {},

      }
    },
    computed: {
      genderfun: function () {
        if (this.gender === '0') {
          return this.sizeSlots
        } else {
          return this.size1Slots
        }
      }
    },
    methods: {
      addZero(num){
        return num < 10 ? '0' + num : num;
      },
      //      点击取消按钮选项为空
      quxiao (shows, value) {
        this[shows] = false
        this.info[value] = ''
      },
      //点击取消
      quxiaos(shows, value){
        this[shows] = false
        this[value] = ''
      },
      agree(){
        if (this.isAgree === false) {
          this.isAgree = true;
        } else if (this.isAgree === true) {
          this.isAgree = false
        }
      },
      checkout_tel(sos_tel){
        var sos_tel = this.info.enroll_urg_mobile;
        var marg = /^1[3-9][0-9]\d{8}$/;
        if (sos_tel == undefined){
            this.$toast({
                message: "信息填写不完整",
                duration: 2000
            })
            this.noTel = true;
        }else if(!marg.test(sos_tel)) {
          this.$toast({
            message: "信息填写错误",
            duration: 2000
          })
          this.noTel = true;
        } else {
          this.noTel = false;
        }
      },
      checkout_name(sos_man){
        var sos_man = this.info.enroll_urg_person
        if (sos_man == undefined) {
          this.$toast({
            message: "信息填写不完整",
            duration: 2000
          })
          this.noName = true
        }else if(sos_man.length >20){
            this.$toast({
                message: "信息填写错误",
                duration: 2000
            })
            this.noName = true
        }else {
          this.noName = false
        }
      },
      onSlot1Change(picker, values){
        this.bloodtype = values[0]
        if (this.bloodtype == '') {
            this.info.enroll_bloodtype = ''
        } else {
          this.info.enroll_bloodtype = this.bloodtype.substr(0, this.bloodtype.length - 1)
        }
      },
      onZhiyeChange(picker, values){
        this.zhiye = values[0]
          switch (values[0]){
              case '':
                  this.info.enroll_profession = 0;
                  break;
              case '职工':
                  this.info.enroll_profession = 1;
                  break;
              case '企业高级职员':
                  this.info.enroll_profession = 2;
                  break;
              case '机关及事业单位工作者':
                  this.info.enroll_profession = 3;
                  break;
              case '专业人员':
                  this.info.enroll_profession = 4;
                  break;
              case '学生':
                  this.info.enroll_profession = 5;
                  break;
              case '私营业主':
                  this.info.enroll_profession = 6;
                  break;
              case '自由职业者':
                  this.info.enroll_profession = 7;
                  break;
              case '无业':
                  this.info.enroll_profession = 8;
                  break;
              case '退休':
                  this.info.enroll_profession = 9;
                  break;
              case '其他':
                  this.info.enroll_profession = 10;
                  break;
          }
      },
      onEduChange(picker, values){
        this.edu = values[0]
          switch (values[0]){
              case '':
                  this.info.enroll_edu = 0;
                  break;
              case '高中及以下':
                  this.info.enroll_edu = 1;
                  break;
              case '大专':
                  this.info.enroll_edu = 2;
                  break;
              case '本科':
                  this.info.enroll_edu = 3;
                  break;
              case '硕士':
                  this.info.enroll_edu = 4;
                  break;
              case '博士':
                  this.info.enroll_edu = 5;
                  break;
          }
      },
      onMoneyChange(picker, values){
        this.money = values[0]
        switch (values[0]){
            case '':
                this.info.enroll_income = 0;
                break;
            case '5万以内':
                this.info.enroll_income = 1;
                break;
            case '6~10万':
                this.info.enroll_income = 2;
                break;
            case '11~15万':
                this.info.enroll_income = 3;
                break;
            case '16~20万':
                this.info.enroll_income = 4;
                break;
            case '20万以上':
                this.info.enroll_income = 5;
                break;
        }
      },
      onSizeChange(picker, values){
        this.size = values[0]
        switch (values[0]) {
          case 'XS(170/88A)':
            this.info.enroll_size_male = 1;
            break;
          case 'XS(155/80A)':
            this.info.enroll_size_female = 1;
            break;
          case 'S(175/92A)':
            this.info.enroll_size_male = 2;
            break;
          case 'S(160/83A)':
            this.info.enroll_size_female = 2;
            break;
          case 'M(175/96A)':
            this.info.enroll_size_male = 3;
            break;
          case 'M(165/88A)':
            this.info.enroll_size_female = 3;
            break;
          case 'L(180/100A)':
            this.info.enroll_size_male = 4;
            break;
          case 'L(170/92A)':
            this.info.enroll_size_female = 4;
            break;
          case 'XL(185/104A )':
            this.info.enroll_size_male = 5;
            break;
          case 'XL(170/96A )':
            this.info.enroll_size_female = 5;
            break;
          case '2XL(185/108A)':
            this.info.enroll_size_male = 6;
            break;
          case '3XL(190/112A)':
            this.info.enroll_size_male = 7;
            break;
          case '':
            if (this.gender === '0') {
              this.info.enroll_size_male = 0;

            } else {
              this.info.enroll_size_female = 0;
            }
            break;
        }
      },
      onBingChange(picker, values){
        this.info['disease_china'] = values[0]
        switch (values[0]) {
          case '':
            this.info.enroll_disease = -1
            break;
          case '无':
            this.info.enroll_disease = 0
            break;
          case '高血压':
            this.info.enroll_disease = 1
            break;
          case '糖尿病':
            this.info.enroll_disease = 2
            break;
          case '冠心病':
            this.info.enroll_disease = 3
            break;
          case '贫血':
            this.info.enroll_disease = 4
            break;
          case '哮喘':
            this.info.enroll_disease = 5
            break;
          case '肺气肿':
            this.info.enroll_disease = 6
            break;
          case '肾功能不全':
            this.info.enroll_disease = 7
            break;
          case '手术史':
            this.info.enroll_disease = 8
            break;
          case '严重外伤史':
            this.info.enroll_disease = 9
            break;
          case '其它':
            this.info.enroll_disease = 10
            break;
        }
      },
      onQuanChange(picker, values){
        this.quan = values[0]
        switch (values[0]) {
          case '':
            this.info.enroll_oneyear = -1
          case '否':
            this.info.enroll_oneyear = 0
            break;
          case '是':
            this.info.enroll_oneyear = 1
            break;
        }
      },
      onScoreChange(picker, values){
        var h = values[0]
        var m = values[1]
        var s = values[2]
        this.info.enroll_oneyear_besttime = this.addZero(parseInt(h)) + ':' + this.addZero(parseInt(m)) + ':' + this.addZero(parseInt(s))
          if( h== undefined){
              h = '0小时'
              this.showFormatTime = h +  m +  s
          } else {
              this.showFormatTime = h +  m +  s
          }
        /*if(parseInt(h) || parseInt(m) || parseInt(s)){
            if( h='undefined' || h=='NaN'){
                this.showFormatTime = '0小时' +  m +  s
            } else {
                this.showFormatTime = h +  m +  s
            }
        }*/

      },
      checkout_size(data){
        if (this.size.length == 0) {
          this.$toast({
            message: "信息填写不完整",
            duration: 2000
          })
        }
      },
      checkout_disease(data){
        if (this.info.disease_china.length == 0) {
          this.$toast({
            message: "信息填写不完整",
            duration: 2000
          })
        }
      },
      checkout_quan(){
        if (this.quan.length == 0) {
          this.$toast({
            message: "信息填写不完整",
            duration: 2000
          })
        }
      },
      checkout_saishi(){
          if (this.info.enroll_oneyear_bestmatch == undefined) {
              this.$toast({
                  message: "信息填写不完整",
                  duration: 2000
              })
              this.noBest = true
          }else {
              this.noBest = false
          }
      },
      getGender(){
        this.gender = this.$route.query.sex
      },
      getData(){
        let userInfo = localStorage.getItem("userInfo");
        let dataTmp = JSON.parse(userInfo)
          for(let k in dataTmp){
            this.info[k] = dataTmp[k]
          }
//
        console.log(this.info)
        this.info.marathon_id = this.$route.query.marathon_id
//        初始化血型
          if(this.info.enroll_bloodtype == ''){
              this.bloodtype = ''
          }else {
              this.bloodtype = this.info.enroll_bloodtype + '型'
          }
//          初始化职业
          switch (this.info.enroll_profession){
              case '0':
                  this.zhiye = '';
                  break;
              case '1':
                  this.zhiye = '职工';
                  break;
              case '2':
                  this.zhiye = '企业高级职员';
                  break;
              case '3':
                  this.zhiye = '机关及事业单位工作者';
                  break;
              case '4':
                  this.zhiye = '专业人员';
                  break;
              case '5':
                  this.zhiye = '学生';
                  break;
              case '6':
                  this.zhiye = '私营业主';
                  break;
              case '7':
                  this.zhiye = '自由职业者';
                  break;
              case '8':
                  this.zhiye = '无业';
                  break;
              case '9':
                  this.zhiye = '退休';
                  break;
              case '10':
                  this.zhiye = '其他';
                  break;

          }
//          初始化教育程度
          switch (this.info.enroll_edu){
              case '0':
                  this.edu = '';
                  break;
              case '1':
                  this.edu = '高中及以下';
                  break;
              case '2':
                  this.edu = '大专';
                  break;
              case '3':
                  this.edu = '本科';
                  break;
              case '4':
                  this.edu = '硕士';
                  break;
              case '5':
                  this.edu = '博士';
                  break;

          }
//          初始化收入
          switch (this.info.enroll_income){
              case '0':
                  this.money = '';
                  break;
              case '1':
                  this.money = '5万以内';
                  break;
              case '2':
                  this.money = '6~10万';
                  break;
              case '3':
                  this.money = '11~15万';
                  break;
              case '4':
                  this.money = '16~20万';
                  break;
              case '5':
                  this.money = '20万以上';
                  break;
          }

//      初始化尺码
        if (this.gender == 0) {
          if (this.info.enroll_size_male == '1') {
            this.size = 'XS(170/88A)'
          } else if (this.info.enroll_size_male == '2') {
            this.size = 'S(175/92A)'
          } else if (this.info.enroll_size_male == '3') {
            this.size = 'M(175/96A)'
          } else if (this.info.enroll_size_male == '4') {
            this.size = 'L(180/100A)'
          } else if (this.info.enroll_size_male == '5') {
            this.size = 'XL(185/104A )'
          } else if (this.info.enroll_size_male == '6') {
            this.size = '2XL(185/108A)'
          } else if (this.info.enroll_size_male == '7') {
            this.size = '3XL(190/112A)'
          }
        } else {
          if (this.info.enroll_size_female == '1') {
            this.size = 'XS(155/80A)'
          } else if (this.info.enroll_size_female == '2') {
            this.size = 'S(160/83A)'
          } else if (this.info.enroll_size_female == '3') {
            this.size = 'M(165/88A)'
          } else if (this.info.enroll_size_female == '4') {
            this.size = 'L(170/92A)'
          } else if (this.info.enroll_size_female == '5') {
            this.size = 'XL(170/96A )'
          }
        }
//       初始化疾病
        if (this.info.enroll_disease == '0') {
          this.info.disease_china = '无'
        } else if (this.info.enroll_disease == '1') {
          this.info.disease_china = '高血压'
        } else if (this.info.enroll_disease == '2') {
          this.info.disease_china = '糖尿病'
        } else if (this.info.enroll_disease == '3') {
          this.info.disease_china = '冠心病'
        } else if (this.info.enroll_disease == '4') {
          this.info.disease_china = '贫血'
        } else if (this.info.enroll_disease == '5') {
          this.info.disease_china = '哮喘'
        } else if (this.info.enroll_disease === '6') {
          this.info.disease_china = '肺气肿'
        } else if (this.info.enroll_disease === '7') {
          this.info.disease_china = '肾功能不全'
        } else if (this.info.enroll_disease === '8') {
          this.info.disease_china = '手术史'
        } else if (this.info.enroll_disease === '9') {
          this.info.disease_china = '严重外伤史'
        } else if (this.info.enroll_disease === '10') {
          this.info.disease_china = '其它'
        }


//               全年内是否参加过全马
        if (this.info.enroll_oneyear == 0) {
          this.quan = '否'
        } else {
          this.quan = '是'
        }
//      初始化最好成绩时间
          if (this.info.enroll_oneyear_besttime == undefined || this.info.enroll_oneyear_besttime == '' ||this.info.enroll_oneyear_besttime == '00:00:00' ){
              this.showFormatTime = ''
          }else {
              let time = this.info.enroll_oneyear_besttime.split(':')
              console.log(time)
              this.showFormatTime = time[0]+'小时'+time[1]+'分'+time[2]+'秒'
          }
      },
      info_finish(){
        this.info.enroll_sex = this.gender
        if (this.info.enroll_disease == -1) {
          this.$toast({
            message: "信息填写不完整",
            duration: 2000
          })
        } else if (this.info.enroll_oneyear == -1) {
          this.$toast({
            message: "信息填写不完整",
            duration: 2000
          })
        } else {
          var qs = require('querystring')
          this.$http.post(this.siteInfo.host + '/api/index.php?act=marathon_enroll&op=enrollSubmitStep2', qs.stringify(this.info)).then(res => {
            this.code = res.data.code
            if (this.isAgree == true) {
              if (this.code == '200') {
                var url = this.siteInfo.host + '/bocm/index.php?act=marathon_enroll&op=pay&marathon_id=' + this.info.marathon_id
                this._appjs.syJsbLaunchWebview(url)
              } else if (this.code == '405') {
                this.$toast({
                  message: "信息填写不完整或填写错误",
                  duration: 2000
                })
              } else if (this.code == '410') {
                var url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_end&marathon_id=' + this.info.marathon_id
                this._appjs.syJsbLaunchWebview(url)
              } else if (this.code == '408') {
                var url = this.siteInfo.host + '/bocm/index.php?act=marathon_router&op=marathon_reg_suc&marathon_id=' + this.info.marathon_id
                this._appjs.syJsbLaunchWebview(url)
              } else {
                this.$toast({
                  message: "系统内部错误" + this.code,
                  duration: 2000
                })
              }
            } else {
              this.$toast({
                message: "报名活动请先同意赛事声明",
                duration: 2000
              })
            }
          })
        }
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
    font-weight: 300;
    font-size: 0.24rem;
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
    font-weight: 300;;
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
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
  }

  .item span {
    display: inline-block;
    width: 0.1rem;
    font-size: 0.32rem;
    font-weight: 300;
    color: #F25B4B;
    /*vertical-align: middle;*/
    vertical-align: middle;
  }

  .item .info_input {
    position: absolute;
    left: 2.6rem;
    font-size: 0.28rem;
    font-weight: 300;
    height: 0.88rem;
    color: #818C9E;
  }

  .item .info_input::-webkit-input-placeholder {
    color: #DADEE4;
  }

  .item .info_input_r {
    /*position: absolute;*/
    /*left: 3.4rem;*/
    font-size: 0.28rem;
    font-weight: 300;
    height: 0.88rem;
    text-align: right;
    float: right;
    margin-right: 0.62rem;
  }

  .item . ::-webkit-input-placeholder {
    color: #DADEE4;
  }

  .item img {
    width: 0.12rem;
    height: 0.24rem;
    position: absolute;
    right: 0.3rem;
    top: 0.32rem;
  }

  .item .err {
    width: 0.3rem;
    height: 0.3rem;
    float: right;
    margin-right: 0.3rem;
  }

  .item .ci {
    display: inline-block;
    font-size: 0.28rem;
    font-weight: 300;
    color: #818C9E;
    line-height: 0.88rem;
    position: absolute;
    right: 0.3rem;
  }

  .item_h {
    width: 7.5rem;
    height: 0.94rem;
    background: #fff;
    font-size: 0.28rem;
    color: #4B4F63;
    line-height: 0.28rem;
    padding-left: 0.3rem;
    text-align: left;
    position: relative;
  }

  .item_h .item_h_L {
    display: inline-block;
    width: 1.68rem;
    height: 0.68rem;
    text-align: left;
    margin-top: 0.16rem;
    font-weight: 300;

  }

  .item_xy {
    width: 7.5rem;
    height: 1.1rem;
    background: #F7F9FA;
    position: relative;
    overflow: hidden;
  }

  .yuan {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    border: 0.02rem solid #aaa;
    /*position: absolute;*/
    /*left: 0.3rem;*/
    /*top: 0.3rem;*/
    float: left;
    margin-left: 0.3rem;
    margin-top: 0.3rem;
  }

  .item_xy img {
    width: 0.34rem;
    height: 0.34rem;
    position: absolute;
    left: 0.3rem;
    top: 0.3rem;
  }

  .item_xy p {
    width: 6.41rem;
    height: 0.68rem;
    position: absolute;
    left: 0.79rem;
    top: 0.3rem;
    text-align: left;
    font-size: 0.24rem;
    color: #666A7F;
    line-height: 0.34rem;
  }

  .item_xy span {
    font-size: 0.24rem;
    color: #4A90E2;
    line-height: 0.34rem;
  }

  .next {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 7.5rem;
    height: 1rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    background: #4A90E2;
    line-height: 1rem;
    text-align: center;
  }

  .isBlood {
    width: 100%;
  }

  .isBlood.picker-slot-wrapper, .isBlood.picker-item {
    backface-visibility: hidden;
  }

  .toolbar {
    width: 7.5rem;
  }

  .picker {
    background: #fff;
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

</style>
