 <template>
    <div id="donate_index_page">
      <div v-title="'报名信息'"></div>
      <template v-if="!sign_success">
        <div class="donate_box iphonex-margin-bottom">
          <div class="explain_title">个人基本信息</div>
          <div class="input_item bor-bot">
            <div class="name_box h88">
              <div class="fl input_name"><span class="color-red">*</span> 姓名</div>
              <div class="input_box fl"><input type="text" placeholder="请输入" v-model="person_name" @blur="checkedName(person_name)"></div>
              <div class="fr input_tip" v-show="person_name_tip"></div>
            </div>
          </div>
          <div class="input_item bor-bot">
            <div class="name_box h88">
              <div class="fl input_name"><span class="color-red">*</span> 身份证号</div>
              <div class="input_box fl"><input type="text" placeholder="请输入" v-model="identity_id" @keyup="checkedCard(identity_id)"></div>
              <div class="fr input_tip" v-show="identity_id_tip"></div>
            </div>
          </div>
          <div class="bor-bot">
            <!--<div class="name_box clearfix department_container relative">
              <div class=" input_name department_box height100"><span class="color-red">*</span> 所属部门</div>
              <div class=" input_box department department_box">{{department_name}}</div>
              <div class=" department_box department_right" @click="show_change_department = true"></div>
            </div>-->
            <table class="table3">
              <tr>
                <td class="department1"><span class="color-red"><span style="visibility: hidden">*</span></span> 所属部门</td>
                <td class="department2">{{department_name}}</td>
                <td class="department3"><div class=" department_box department_right" @click="show_change_department = true"></div></td>
              </tr>
            </table>
          </div>

          <div class="explain_title">捐赠信息</div>
          <div>
            <div class="donate_select_box">
              <div class="select_box">
                <div class="select_title font30">
                  我要捐赠“中银尊享卡积分”
                </div>
                <div>
                  <div class="bank_card">
                    <div class="fl input_name2">捐赠卡号</div>
                    <div class="input_box2 fl"><input type="text" placeholder="请输入" v-model="bank_card1"></div>
                  </div>

                  <div class="bank_card">
                    <div class="fl input_name2">绑定的手机号</div>
                    <div class="input_box2 fl"><input type="text" placeholder="请输入" v-model="phone_num1" @keyup = checkedPhone(phone_num1)></div>
                  </div>

                  <div class="bank_card">
                    <div class="fl input_name2">捐赠积分</div>
                    <div class="input_box2 fl"><input type="text" placeholder="请输入捐赠积分" v-model="donate_score1" @keyup="checkedNum(donate_score1)"></div>
                  </div>
                </div>

              </div>

              <div class="select_box" style="margin-top:.2rem;">
                <div class="select_title font30">
                  我要捐赠“交易积分”
                </div>
                <div>
                  <div class="bank_card">
                    <div class="fl input_name2">捐赠信用卡卡号</div>
                    <div class="input_box2 fl"><input type="text" placeholder="请输入" v-model="bank_card2"></div>
                  </div>

                  <div class="bank_card">
                    <div class="fl input_name2">绑定的手机号</div>
                    <div class="input_box2 fl"><input type="text" placeholder="请输入" v-model="phone_num2" @keyup = checkedPhone(phone_num1)></div>
                  </div>

                  <div class="bank_card">
                    <div class="fl input_name2">捐赠积分</div>
                    <div class="input_box2 fl"><input type="text" placeholder="请输入1000的倍数" v-model="donate_score2" @keyup="checkedNum(donate_score2,true)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div class="fixed bot_btn_donate iphonex-bottom-div font32 text-center" @click.stop="sendMsg">
          提交信息
        </div>
      </template>

      <popups v-if="show_change_department" @close = "show_change_department = false">
        <div class="pop_department">
          <div class="change_department_title">更改部门信息</div>
          <div class="change_department_content">
            <div class="change_con_text">
              显示的部门信息是您在“一起善源”平台填写的部门信息。
            </div>
            <div class="change_con_tip">
              <div class="tip_text">
                若需要修改您的部门信息：
              </div>
              <div>
                <div class="flow_chart">
                  <!--<img src="/bocm/platformjs/static/image/default/flow_chart.png" alt="" class="fl">-->
                  <div class=" flow_text">
                    <p>1、打开“我的”-“设置”界面，找到“选择部门”选项</p>
                    <p>2、更改您的部门信息</p>
                    <p>3、修改成功</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </popups>

      <!--报名成功-->
      <div v-if="sign_success">
        <div class="sign_img_box">
          <img src="/bocm/platformjs/static/image/donate/sign_success1.png" alt="">
        </div>
        <div class="sign_text">报名成功</div>
        <div class="sign_p">
          <p>感谢您的爱心捐赠，请按照您填写的 <br>信息在中国银行活动页面进行积分捐赠。</p>
          <p>活动结束后，工作人员会核实信息并统一<br>发放公益中国积分。</p>
        </div>
      </div>

    </div>
</template>

<script>
  import popups from '../common/popups.vue'
  import { Toast } from 'mint-ui';
  export default {
    data(){
        return {
          department_name:'',
          show_change_department:false,
          person_name:'',
          person_name_tip:false,
//          identity_id:'130523199010143411',
          identity_id:'',
          identity_id_tip:false,
//          phone_num1:'12345678901',
          phone_num1:'',
          phone_num2:'',
//          bank_card1:'6226660204235788',
          bank_card1:'',
          bank_card2:'',
          donate_score1:'',
          donate_score2:'',
          sign_success:false,
          circle_id:'',
          cpdonation_id:''

        }
    },
    created(){
      this.department_name = this.$route.query.circle_full
      this.circle_id = this.$route.query.circle_id
      this.cpdonation_id = this.$route.query.cpdonation_id
//      this.checked()
    },
    methods:{
      //校验姓名
      checkedName(name){
        if(name == ''){
          this.person_name_tip = true;
          return '请填写姓名'
        }else {
          this.person_name_tip = false;
          return true
        }
      },
      checkedPhone(num){
        // 校验手机号
        let phone = /^1[0-9]{10}$/;
        if(phone.test(num)){
          return true
        }else{
          return '请填写正确的手机号'
        }
      },
      // 校验身份证
      checkedCard(num){
        let isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(isIDCard1.test(num)){
          this.identity_id_tip = false;
          return true
        }else{
          this.identity_id_tip = true;
          return '请填写正确的身份证号'
        }
      },
      // 校验是否是数字
      checkedNum(num,flag){
          if(flag){
            if( num%1000  != 0){
              return '交易积分请填写1000的倍数'
            }
          }
        if(num % 1 != 0){
          return '请填写整数'
        }
        if(isNaN(num - 0)){
          return '请填写正确数字'
        }
        if(num < 0 ){
          return '捐赠积分不能为负数'
        }
        if(Number(num) === 0 ){
          return '捐赠积分不能为0'
        }
        if(!num) return '请填写捐赠积分';
        return true
      },
      // 校验银行卡号
      checkedBankCard(num){
        if(!num) return '请填写信用卡号';
        if(num.length < 16 || num.length > 19) {
          return "银行卡号长度必须在16到19之间";
        }
        let numTmp = /^\d*$/; //全数字
        if(!numTmp.exec(num)) {
          return "银行卡号必须全为数字";
        }
        //开头6位
        let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if(strBin.indexOf(num.substring(0, 2)) == -1) {
          return "银行卡号开头6位不符合规范";
        }
        return true
      },
      checkedfrom(bank_card,phone_num,donate_score,flag){
        if(this.checkedBankCard(bank_card) !== true){
          return this.checkedBankCard(bank_card)
        }
        if(this.checkedPhone(phone_num) !== true){
          return '请填写正确的手机号'
        }
        if(this.checkedNum(donate_score,flag) !== true){
          return this.checkedNum(donate_score,flag)
        }
        return true
      },
      checked(){
        if(this.checkedName(this.person_name) !== true){
          return '请填写姓名'
        }
        if(this.checkedCard(this.identity_id) !== true){
          return '请填写正确的身份证号'
        }
        if((this.phone_num1.trim() !== '' || this.bank_card1.trim() !== '' || this.donate_score1.trim() !== '') && (this.phone_num2.trim() === '' && this.bank_card2.trim() === '' && this.donate_score2.trim() === '')){
          return this.checkedfrom(this.bank_card1,this.phone_num1,this.donate_score1)
        }
        else if((this.phone_num2.trim() !== '' || this.bank_card2.trim() !== '' || this.donate_score2.trim() !== '') && (this.phone_num1.trim() === '' && this.bank_card1.trim() === '' && this.donate_score1.trim() === '')){
            return this.checkedfrom(this.bank_card2,this.phone_num2,this.donate_score2,true)
        }else {
            return this.checkedfrom(this.bank_card1,this.phone_num1,this.donate_score1) === true ? this.checkedfrom(this.bank_card2,this.phone_num2,this.donate_score2,true): this.checkedfrom(this.bank_card1,this.phone_num1,this.donate_score1)
        }
      },
      sendMsg(){
        if(this.checked() === true){
//            console.log('校验成功')
          var qs = require('querystring')
            let sendData = qs.stringify({
              cpdonation_id:this.cpdonation_id,    //信用卡积分捐赠活动id
              member_name:this.person_name,  // 姓名
              id_value:this.identity_id,    // 身份证号
              circle_id:this.circle_id,  // 部门id
              circle_name:this.department_name, // 部门名称
              zyzx_credit:this.bank_card1,//捐赠中银尊享积分的银行卡号
              zyzx_mobile:this.phone_num1,//捐赠中银尊享积分的手机号
              zyzx_point:this.donate_score1,  //捐赠中银尊享积分
              trade_credit:this.bank_card2,
              trade_mobile:this.phone_num2,
              trade_point:this.donate_score2
            })
//          console.log(sendData)
            this.$http.post(this.siteInfo.host + '/api/index.php?act=cpdonation_enroll&op=enrollSubmit',sendData).then(res=>{
//                console.log(res)
              let code = res.data.code;
              let message = res.data.message
              if(code == 200){
//                console.log('success')
                this.sign_success = true;
//                this.app.syJsbSetGoBackUrl("goBackOfDetail()"); // 定制返回

              }
//              else if(code == 405){
//                this.appjs.syJsbLaunchWebview()  // 登陆url
//              }
              else {
                  this._appjs.syJsbAlert(message)
              }
            })

        }else{
//            this._appjs.syJsbAlert(this.checked())
          let instance = Toast({
              message: this.checked(),
              duration: 1500
          });
          document.addEventListener('click',function(){instance.close()})
        }
      }

    },
    components:{popups}
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/css/common.css";
#donate_index_page{
  width:100%;
  height: calc(100% + 0.68rem);
  background: #fff;
  text-align: left;
  color:#4B4F63;
  font-weight:300;
  /*padding-bottom:1rem;*/
}
  .donate_box{
    padding-bottom:1rem;
  }
  .donate_box > div {
    padding:0 .3rem;
  }
  .explain_title{
    height:.7rem;
    line-height: .7rem;
    font-size: .26rem;
    color:#666A7F;
    background: #F7F9FA;
  }
  .height100{
    height:100%;
  }
  .h88{
    height:.88rem;
    line-height: .88rem;
  }
  .line-h88{
    line-height: .88rem;
  }
  .pl24{
    padding-left:.24rem;
  }
  .color-red{
    color:red;
  }
  .input_item{
    box-sizing: border-box;
  }
  .bor-bot{
    border-bottom: 1px solid #E9EBEF;
  }
  :-moz-placeholder {
    color: #DADEE4 ; opacity:1;
  }

  ::-moz-placeholder {
    color: #DADEE4 ;opacity:1;
  }

  input:-ms-input-placeholder{
    color: #DADEE4 ;opacity:1;
  }

  input::-webkit-input-placeholder{
    color: #DADEE4 ;opacity:1;
  }
  .input_name{
    font-size:.28rem;
    width:30%;
  }
  .input_name2{
    width:32.5%;
    font-size: .28rem;
  }
  .input_box2{
    width:65%;
  }
  .input_box{
    width:62%;
  }
  .input_tip{
    height:100%;
    width:6%;
    background: url("/bocm/platformjs/static/image/default/false_tip2.png") right center no-repeat;
    background-size:.3rem auto;
  }
  .department{
    line-height: .34rem;
    padding:4px 0;
    width:60%;
  }
  .department_box{
    vertical-align: middle;
    display:inline-block;
    box-sizing: border-box;

  }
  .table_td{
    text-align: left;
    vertical-align: middle;
    box-sizing: border-box;

  }
.department_container{
  width:100%;
  display: table-cell;
  text-align: left;
  vertical-align: middle;
  padding-right:0;
  min-height: .88rem;
  box-sizing: border-box;
}
  .department_right{
    position: absolute;
    right: 0;
    top:50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    box-sizing: border-box;
    text-align: right;
    height:.5rem;
    width:6%;
    background: url("/bocm/platformjs/static/image/default/explain_tip.png") right center no-repeat;
    background-size:.3rem auto;
  }
  .donate_select_box{
    padding: .3rem 0;
  }
  .select_box{
    background: #F6FAFF;
    border:1px solid #C8DDF5;
    border-radius: .1rem;
    /*padding-left:.3rem;*/
  }
  .select_title{
    border-bottom:1px solid #C8DDF5;
    height:.88rem;
    line-height: .88rem;
    box-sizing: border-box;
    padding-left:.3rem;
  }
  .bank_card{
    height:.8rem;
    line-height: .8rem;
    padding-left:.3rem;
    box-sizing: border-box;
  }
  .bank_card input{
    background: #F6FAFF;
  }
  .bot_btn_donate{
    background: #4A90E2;
    height:1rem;
    line-height: 1rem;
    width:100%;
    left:0;
    bottom:0;
    color:#fff;
  }
  .pop_department{
    width:6.5rem;
    border-radius: .16rem;
    background: #fff;
    /*height:1rem;*/
  }
  .change_department_title{
    font-size: .34rem;
    height:.9rem;
    line-height: .9rem;
    text-align: center;
    border-bottom: 1px solid #DADEE4;
  }
  .change_department_content{
    padding:.5rem .3rem;
  }
  .change_con_text{
    font-size: .28rem;
    line-height: .4rem;
  }
  .change_con_tip{
    border:1px dashed #C8DDF5;
    box-sizing: border-box;
    background: #F6FAFF;
    padding:.3rem;
    margin-top:.3rem;
    border-radius: .1rem;
  }
  .change_con_tip .tip_text{
    font-size: .3rem;
    color:#4A90E2;
  }
  .flow_chart{

  }
  .flow_chart img{
    width:4%;
    height:1.8rem;
  }

  .flow_text{
    margin-top:.3rem;
    /*height:1.8rem;*/
    /*width:96%;*/
    /*padding-left:.15rem;*/
  }
  .flow_text p{
    font-size: .24rem;
    line-height: .4rem;
  }
  .table3{
    min-height: .88rem;
    text-align: left;
    vertical-align: middle;
    width:100%;
    position: relative;
    font-size: .28rem;
    line-height: .34rem;
  }
  .table3 tr{
    min-height: .88rem;

  }
  .table3 tr td{
    vertical-align: middle;
  }
  .department1{
    width:30%;
  }
  .department2{
    width:62%;
    padding:.1rem 0;
    color:#818C9E;
  }
  .department3{
    width:6%;
  }
  .sign_img_box{
    padding-top:.86rem;
    text-align: center;
  }
  .sign_img_box img{
    width:1.6rem;
    height:auto;
  }
  .sign_text{
    padding: .3rem 0 .1rem;
    text-align: center;
    font-size: .4rem;
    color:#4A90E2;
  }
  .sign_p{
    padding-top:.3rem;
    text-align: center;
    font-size: .26rem;
    line-height: .42rem;
    color:#666A7F
  }
  input{
    color:#818C9E;
  }
</style>
