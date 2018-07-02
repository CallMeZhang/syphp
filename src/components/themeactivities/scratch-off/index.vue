<template>
    <div class="c-lottery">
        <div class="bg">
            <div v-show="isZhong" class="zhong" :index = "num">
                <img class="headimg" :src="zhong.img">
                <div class="message"><div class="name">{{zhong.name}}中{{zhong.money}}元扶贫码</div></div>
            </div>
            <div class="times">积分抽奖得<span>66</span>元扶贫码<div>你还剩 <span>{{chance}}</span> 次刮奖机会</div></div>
            <div class="router" @click="rulesPop">活动规则<div class="icon"></div></div>
            <div>
                <div id="gua" class="gua_bj" :class="{'gua-z-bj':guaZ, 'gua-n-bj':guaN}" v-show="isGuabg">
                  <div v-if="isHit">
                    <div class="money money2" v-if="lotteryResultData.is_hit === 0"></div>
                    <div class="money" v-if="lotteryResultData.is_hit === 1">{{lotteryResultData.reward_value}}元</div>
                  </div>
                    <div class="btn" id="r-btn" v-show="isShowBtn" @click="initImg"></div>
                </div>
                <!--刮奖遮罩-->
                <div class="scrape-shade" v-show="scrapeArea == 0">
                  <div class="scrape-shade-con">
                    <div class="scrape-btn" @click="showScrapeArea">立即刮奖</div>
                  </div>
                </div>
                <div class="show-scrape-area" v-show="scrapeArea == 1">
                  <canvas id="lotteryContainer" ref="c1" v-show="isShow"></canvas>
                  <div v-show="isShowCanNot" class="cannot" @click="initImg"><img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/activities/scratch-off/gua_top.jpg'" alt=""></div>
                </div>

            </div>
        </div>
        <!--<div class="date">
            <img v-show="active == '0'" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/scratch-off/0420.jpg'" alt="">
            <img v-show="active == '1'" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/scratch-off/0421.jpg'" alt="">
            <img v-show="active == '2'" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/scratch-off/0422.jpg'" alt="">
            <img v-show="active == '3'" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/activities/scratch-off/0444.jpg'" alt="">
        </div >-->
        <!--弹窗-->
        <div v-show="showPop">
          <div class="pop-bj" @click="showPop = false;"></div>
          <div class="pop-con">
            <h3 class="pop-con-t">抽奖规则</h3>
            <p class="pop-con-d">1、每个用户id限抽取3次。</p>
            <p class="pop-con-d">2、每次抽奖消耗200积分，活动期间新注册用户可免积分抽奖1次。</p>
            <p class="pop-con-d">3、抽奖获得的扶贫码将可在“我的-扶贫电子码”中查看。</p>
            <p class="pop-con-d">4、奖品说明：扶贫码可用于购买善源甄选商品，扶贫码有效期至2018年4月26日。</p>
            <h4 class="pop-con-btn" @click="showPop = false;">确定</h4>
          </div>
        </div>

    </div>

</template>

<script>
    import { MessageBox } from 'mint-ui'

    export default {
      name: "scratch-offv2",
      data (){
        return {
          scrapeArea: 0,//点击显示刮奖区域
          activeId: '',//活动id
          chance: 3,
          freeNum: 0,//新用户无积分参与抽奖
          freeUserBj: false,//新用户显示的刮奖背景
          havePoints: 1,//是否有积分
          zhong: {},
          hitRecord: [],
          num: 0,
          isZhong: false,
          active: 3,//显示活动日期图
          currentId: 0,
          offLine: false,
          notBegin: false,
          activityEnd: false,//活动结束
          isGuabg: true,
          c1: {},
          ctx: {},
          isOk: 0,
          ismousedown: false,
          is_share: false,
          lottery_token: '',
          whetherToken:false,//是否有token
          lotteryResultData: {},//抽奖结果
          isHit:false,//是否中奖
          guaZ:false,
          guaN:false,
          isShow:true,
          isShowBtn: false,
          isShowCanNot: false,//无机会时显示
          fontEm:0,//配合@media自动调节刮的宽度
          showPop:false,//弹窗
          is_app: false,//是否是app
        }
      },
      created(){
        this.$route.query.is_share == 'yes' ? this.is_share = true : this.is_share = false
        if(this.$route.query.is_share instanceof Array){
         let fx =  this.$route.query.is_share[0] == 'yes'
          if(fx){
//            console.log(this.$route.query.is_share[0]);
            this.is_share = true
          }
        }
        if(this.is_share){
//          console.log('嵌套活动页 if is_share')
        }else{
//          console.log('else is_share')
        }
        if(this.$route.query.topic_id){
          this.activeId =this.$route.query.topic_id;
        }
        this.platformMethods();
        this.fontEm = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);//这是为了不同分辨率上配合@media自动调节刮的宽度
        this.showDefaultData();
      },
      mounted(){
        this.lottery_token = this.getCookie('token');
//        this.lottery_token = 'f1364ac19e8f155d5d8a570c2dfaac9d';
        if(!this.lottery_token){
          this.whetherToken = true;
        }else{
          this.whetherToken = false;
          this.getData();
        }
        this.$nextTick(() => {
          this.canvasFn();
        })
      },
      watch: {
        chance: function (val, oldVal) {
//          console.log(val + ':' + oldVal)
        },
        freeNum: function(val, oldVal){
//          console.log(val + ':' + oldVal)
        },
      },
      methods: {
        showScrapeArea(){
          //显示刮奖区域
          if (this.is_share || !this.is_app) {
            MessageBox({
              title: '提示',
              message: '<div style="text-align: justify;">请打开公益中国APP进行刮奖，新用户赠送1次免积分刮奖机会</div>',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: '打开APP',//确认按钮文本
              cancelButtonText: '先逛逛',//取消按钮文本
            }).then(action => {
              if(action === 'confirm'){
                window.location.href= 'http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn'
              }
            });
          }else{
            this.scrapeArea = 1;
            this.$nextTick(() => {
              this.canvasFn();
            })
          }
        },
        initImg(){
          if(this.freeNum < 1){
            if(this.havePoints === 0){
//              this.ismousedown = false;
//              this.isShowBtn = false;
              MessageBox({
                title: '',
                message: '亲，您的积分不足',
                confirmButtonText: '我知道了'
              });
            }
          }
          if (this.chance === 0) {
            this.isShowCanNot = true;
//            this.isShowBtn = false;
            MessageBox({
              title: '',
              message: '亲，今日您的刮奖次数已用完',
              confirmButtonText: '我知道了'
            })
            return false;
          }
          console.log('initImg 执行');
          this.isShow = true;
          this.guaZ = false;
          this.guaN = false;
          this.isHit = false;
          this.isShowBtn = false;
          this.$nextTick(()=>{
            this.canvasFn()
          })
        },
        platformMethods (){
          let _that = this;
          this._appjs.syJsbGetAppInfo(function (appInfo) {
            if (appInfo) {
              _that.is_app = true;
//              console.log('appInfo 有');
            } else {
              _that.is_app = false;
//              console.log('appInfo 无');
            }
            return _that.is_app;
          });
        },
        showDefaultData(){
          //中奖信息
          let zurl = this.siteInfo.host + '/api/index.php?act=lottery&op=lotteryHitRecord';
          let that = this;
          this.$http.get(zurl).then(res => {
            this.hitRecord = res.data.data;
            if (this.hitRecord.length > 0) {
              this.zhong.img = this.hitRecord[0].avatar
              this.zhong.name = this.hitRecord[0].member_name
              this.zhong.money = this.hitRecord[0].reward_value
              this.isZhong = true
              setInterval(() => {
                that.activeZhong()
              }, 5000)
            }
          })
        },
        getData() {
          //活动信息
          let that = this;
          let dateurl = this.siteInfo.host + '/api/index.php?act=lottery&op=lotteryList&token=' + this.lottery_token
          that.$http.get(dateurl).then(res => {
            let activitys = res.data.data.list;
            that.chance = res.data.data.remain_num;
            that.freeNum = res.data.data.free_num;
            if(that.freeNum > 0){
              that.freeUserBj = true;
              console.log('新用户')
            }
            that.havePoints = res.data.data.has_enough_points;
            let activitys_not_begin = true;
            activitys.forEach((item, index, arr) => {
              if (item.is_current == 1) {
                that.active = index
                that.currentId = item.lottery_id
                if (item.lottery_status == 'OffLine') {
                  that.offLine = true
                } else if (item.lottery_status == 'Finished') {
                  that.activityEnd = true;
                }
                activitys_not_begin = false;
              }
            });
            if (activitys_not_begin) {
              that.notBegin = true;
            }

          }).then(() => {
            this.statistics();
            this.$nextTick(() => {
              this.canvasFn();
            })
          })

        },
        activeZhong() {
          this.num++
          let max = this.hitRecord.length - 1
          if (this.num > max) {
            this.num = 0
          }
          this.zhong.img = this.hitRecord[this.num].avatar
          this.zhong.name = this.hitRecord[this.num].member_name
          this.zhong.money = this.hitRecord[this.num].reward_value
        },
        rulesPop(){
          this.showPop = true;
        },
        canvasFn() {
          let _that = this;
          this.c1 = this.$refs.c1;
          this.c1.width = this.c1.clientWidth;
          this.c1.height = this.c1.clientHeight;
          this.ctx = this.c1.getContext("2d");

          //PC端的处理
          this.c1.addEventListener("mousemove", this.eventMove, false);
          this.c1.addEventListener("mousedown", this.eventDown, false);
          this.c1.addEventListener("mouseup", this.eventUp, false);

          //移动端的处理
          this.c1.addEventListener('touchstart', this.eventDown, false);
          this.c1.addEventListener('touchend', this.eventUp, false);
          this.c1.addEventListener('touchmove', this.eventMove, false);
          //初始化
          this.initCanvas();
        },
        initCanvas() {
          let _this = this;
          var imageBj = new Image();
          if(_this.freeNum > 0){
//            console.log('_this.freeNum > 0');
            imageBj.src = '/bocm/platformjs/static/image/activities/scratch-off/gua_top_new_user.jpg';
          }else{
//            console.log('no NewUser')
            imageBj.src = '/bocm/platformjs/static/image/activities/scratch-off/gua_top.jpg';
          }
          imageBj.onload = function () {
//            _this.ctx.drawImage(this, 0, 0, 322, 126);
            _this.ctx.drawImage(this, 0, 0, _this.c1.width, _this.c1.height);
            _this.ctx.globalCompositeOperation = 'destination-out';
          }
        },
        //鼠标按下 和 触摸开始
        eventDown(e){
          e.preventDefault();
          let _that = this;
          if (this.is_share || !this.is_app) {
            MessageBox({
                title: '提示',
                message: '<div style="text-align: justify;">请打开公益中国APP进行刮奖，新用户赠送1次免积分刮奖机会</div>',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '打开APP',//确认按钮文本
                cancelButtonText: '先逛逛',//取消按钮文本
              }).then(action => {
              if(action === 'confirm'){
                window.location.href= 'http://a.app.qq.com/o/simple.jsp?pkgname=com.syrs.pwcn'
              }
            });
          }else if(this.whetherToken){
//            MessageBox('请登录')
            this.jumpLogin();
          }else if (this.notBegin) {
            MessageBox('','活动未开始');
          } else if (this.activityEnd) {
            MessageBox({
              title: '',
              message: '哎，活动已结束，下次早点来哦！',
            })
          } else if (this.offLine) {
            MessageBox({
              title: '',
              message: '哎，活动已下线，下次早点来哦！',
            })
          } else {
            this.ismousedown = true;
            if (this.chance === 0) {
              this.isShowCanNot = true;
              MessageBox({
                title: '',
                message: '亲，您的刮奖次数已用完',
                confirmButtonText: '我知道了'
              })
              return false;
            }
            if(this.freeNum < 1){
              if(this.havePoints === 0){
                this.isShowCanNot = true;
//                this.ismousedown = false;
                MessageBox({
                  title: '',
                  message: '亲，您的积分不足',
                  confirmButtonText: '我知道了'
                })
              }
            }
//            console.log('eventDown this.chance: ' + this.chance)
          }
        },
        //鼠标抬起 和 触摸结束
        eventUp(e){
          e.preventDefault();
          //得到canvas的全部数据
          var a = this.ctx.getImageData(0, 0, this.c1.width, this.c1.height);
          var j = 0;
          for (var i = 3; i < a.data.length; i += 4) {
            if (a.data[i] == 0) j++;
          }
          //当被刮开的区域等于一半时，则可以开始处理结果
          if (j >= a.data.length / 12) {
            this.isOk = 1;
            if(this.isOk){
              this.isShow = false;
//              console.log('eventUp');
              this.lotteryResultMethod();
            }
          }
          this.ismousedown = false;
        },
        //鼠标移动 和 触摸移动
        eventMove(e){
          e.preventDefault();
          if (this.ismousedown) {
            if (e.changedTouches) {
              e = e.changedTouches[e.changedTouches.length - 1];
            }
            var topY = document.getElementById("gua").offsetTop;
            var oX = this.c1.offsetLeft,
              oY = this.c1.offsetTop + topY;
            var x = (e.clientX    + document.body.scrollLeft || e.pageX) - oX || 0,
              y = (e.clientY -68  + document.body.scrollTop || e.pageY) - oY || 0;


            //画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
            //画出来是透明的
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.fontEm * 0.4, 0, Math.PI * 2, true); //fontem 15 * 1.2

            //下面3行代码是为了修复部分手机浏览器不支持destination-out
            //我也不是很清楚这样做的原理是什么
            this.c1.style.display = 'none';
            this.c1.offsetHeight;
            this.c1.style.display = 'inherit';

            this.ctx.fill();
          }
          if (this.isOk) {
            var btn = document.getElementsByClassName ("btn");
            for (var i = 0; i < btn.length; i++) {
              btn[i].style.zIndex = '3';
            }
            document.getElementsByClassName("btn")[0].style.zIndex = "3";
          }

        },
        //cookie
        getCookie(name) {
          var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
          if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
          } else {
            return null;
          }
        },
        statistics(){
          let _that = this;
          //pv uv统计
          let url = this.siteInfo.host + '/api/index.php?act=lottery&op=lotteryStat&lottery_id=' + _that.currentId + '&token=' + _that.lottery_token
          this.$http.get(url).then(res => {
            let code = res.data.code
            if (code === '200') {
//              console.log(res.data.message)
            } else {
//              console.log(res.data.message)
            }
          })
        },
        lotteryResultMethod(){
          let _this = this;
          //抽奖结果接口
          let resultUrl = this.siteInfo.host + '/api/index.php?act=lottery&op=lotteryGo&lottery_id=' + _this.currentId + '&token=' + this.lottery_token;
          this.$http.get(resultUrl).then(res => {
//            console.log(res.data);
            if (res.data.code === 200) {
              this.ismousedown = true;
              this.lotteryResultData = res.data.data;
              this.freeNum = res.data.data.free_num;
              if(this.lotteryResultData.is_hit === 1){
                this.guaZ = true;
                this.guaN = false;
                this.isHit = true;
              }else if(this.lotteryResultData.is_hit === 0){
                this.guaN = true;
                this.guaZ = false;
                this.isHit = true;
              }
              this.chance = res.data.data.remain_num
              if(this.chance >= 0){
                this.isShowBtn = true;
              }
            } else if (res.data.code === 300) {
              _this.$nextTick(()=>{
                _this.isShowCanNot = true;
                window.location.reload();
              })
            }else if(res.data.code === 301){
              _this.jumpLogin()
            }else{
              MessageBox({
                title: '',
                message: res.data.message,
                confirmButtonText: '我知道了'
              })
            }

          })
        },
        jumpLogin() {
          let callbackUrl = encodeURIComponent(this.siteInfo.host + '/bocm/index.php?act=topic&op=welfareday&topic_id='+this.activeId);
          window.location.href = this.siteInfo.host + '/api/index.php?act=login&callback=' + callbackUrl;
        },
      }
    }
</script>

<style lang="scss" scoped>
    .bg{
      width: 100%;
      height: 4.55rem;
      background: url("/bocm/platformjs/static/image/activities/scratch-off/gua_bj.jpg") no-repeat;
      background-size: 7.5rem 4.55rem;
      position: relative;
      overflow: hidden;
      .zhong {
        width: 2.1rem;
        height: 0.6rem;
        border-radius: 0 0.5rem 0.5rem 0;
        background: #fff;
        position: absolute;
        top: 0.74rem;
        left: 0;
        overflow: hidden;
        animation: myfirst 5s linear infinite;
        .headimg {
          width: 0.5rem;
          height: 0.5rem;
          margin-top: 0.05rem;
          margin-left: 0.02rem;
          border-radius: 50%;
          float: left;
        }
        .message {
          display: flex;
          align-items: center;
          width: 1.48rem;
          height: 0.5rem;
          font-size: 0.16rem;
          color: #a8272a;
          float: left;
          line-height: 0.25rem;
          font-weight: 200;
          margin-left: 0.02rem;
          margin-top: 0.05rem;
          text-align: left;
          .name{
            width: 1.5rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
          /*.name {
            display: inline-block;
            max-width: 1.2rem;
            font-weight: 200;
            font-size: 0.16rem;
            vertical-align: bottom;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
          }*/
        }
      }
      .times {
        width: 3.4rem;
        height: 0.88rem;
        font-size: 0.3rem;
        line-height: 0.44rem;
        font-weight: 900;
        color: black;
        div {
          display: inline-block;
          font-size: 0.3rem;
        }
        span {
          color: #ffe400;
        }
        position: absolute;
        left: 2.24rem;
        top: 0.8rem;
      }
      .router {
        height: 0.3rem;
        line-height: 0.3rem;
        color: #fff;
        font-size: 0.24rem;
        position: absolute;
        top: 0.8rem;
        left: 5.8rem;
        .icon {
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          background: url("/bocm/platformjs/static/image/activities/scratch-off/icon.png");
          background-size: 0.3rem;
          vertical-align: middle;
          margin-left: 0.1rem;
        }
      }
      .scrape-shade{
        width: 6.44rem;
        height: 2.52rem;
        position: absolute;
        left: 0.54rem;
        top: 1.9rem;
        z-index: 2;
        background-image: url("/bocm/platformjs/static/image/activities/scratch-off/gua_shade_bj.jpg");
        background-size: 6.44rem 2.52rem;
        .scrape-shade-con{
          position: relative;
        }
        .scrape-btn{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          margin-top:1.535rem;
          width: 53%;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          font-size: 0.3rem;
          font-weight: 900;
          color: red;
          background: #fff;
          border-radius: 0.8rem;
        }
      }
      .gua_bj {
        width: 6.44rem;
        height: 2.52rem;
        position: absolute;
        left: 0.54rem;
        top: 1.9rem;
        background-image: url("/bocm/platformjs/static/image/activities/scratch-off/c_go_on.jpg");
        background-size: 6.44rem 2.52rem;
        .money {
          font-size: 0.38rem;
          color: #a8272a;
          font-weight: bold;
          margin-top: 1.26rem;
          margin-left: 2.7rem;
          text-align: left;
        }
        .money2 {
          margin-top: 1.64rem;
        }
        .btn {
          width: 2rem;
          height: 0.6rem;
          background: url("/bocm/platformjs/static/image/activities/scratch-off/more-btn.png") no-repeat;
          background-size: 2rem 0.6rem;
          margin-left: 2.24rem;
          margin-top: 0.1rem;
        }
      }
      .gua-z-bj {
        background-image: url("/bocm/platformjs/static/image/activities/scratch-off/gua_bottom2.jpg");
        background-size: 6.44rem 2.52rem;
      }
      .gua-n-bj {
        background-image: url("/bocm/platformjs/static/image/activities/scratch-off/gua_bottom1.jpg");
        background-size: 6.44rem 2.52rem;
      }
      #lotteryContainer {
        position: absolute;
        left: 0.54rem;
        top: 1.9rem;
        width: 6.44rem;
        height: 2.52rem;
      }
      .cannot {
        position: absolute;
        left: 0.54rem;
        top: 1.9rem;
        width: 6.44rem;
        height: 2.52rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      @keyframes myfirst {
        0% {
          opacity: 1;
        }
        33% {
          opacity: 1;
        }
        66% {
          opacity: 0;
        }
        100% {
          opacity: 0;
        }
      }
    }
    .date {
      width: 100%;
      height: 2.04rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .c-lottery{
      .pop-bj{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 9;
        opacity: 0.5;
        background: #000;
      }
      .pop-con{
        position: fixed;
        z-index: 10;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        width: 6.375rem;
        background: #fff;
        border-radius: 0.08rem;
        box-sizing: border-box;
        .pop-con-t{
          width: 100%;
          padding-top: 0.3rem;
          text-align: center;
          font-size: 0.32rem;
          font-weight: 700;
          color: #333;
          box-sizing: border-box;
        }
        .pop-con-d{
          width: 100%;
          padding: 0 0.3rem;
          font-size: 0.3rem;
          line-height: 0.72rem;
          text-align: justify;
          color: #999;
          box-sizing: border-box;
        }
        .pop-con-btn{
          color: #26a2ff;
          width: 100%;
          height:0.8rem;
          line-height: 0.72rem;
          border-top: 1px solid #f1f1f1;
        }
      }

    }

</style>
