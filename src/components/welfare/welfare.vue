<template>
    <div id="welfare_index">
      <div v-title="'我的益客圈'"></div>

      <transition name="fade">
        <loading v-show="isLoading"></loading>
      </transition>

      <transition name="fade">
        <div class="welfare_container" v-show="!isLoading">
          <div v-if="!yiKe" class="non-yk">
            <div class="welfare_top relative">
              <div class="top_bg_img"></div>
              <div class="top_text font30">
                <div class="text_num1" style="padding-top:.2rem;">已成功邀请益客 <span class="special1">{{welfare_num}}</span> 位</div>
                <!--<div class="text_num2">通过益客获得{{welfare_score}}公益积分</div>-->
              </div>
            </div>
            <!--没有益客邀请-->
            <div class="no_con" v-if="list0.length == 0">
              <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/default/no_person7.png'" alt="">
              <div class="no_con_text">
                <p>您身边有想做公益事业的朋友吗？机会来啦！</p>
                <p>加入益客俱乐部，汇聚爱心，助力公益，</p>
                <p>还有爱心积分奖励哟！</p>
              </div>

            </div>

            <!--有内容-->
            <div class="welfare_con iphonex-padding-bottom" v-else>
              <div class="welfare_title">
                <ul class="welfare_ul clearfix">
                  <li v-for="item in title_list" v-text="item.title" @click="switcher(item.id)" :class="{act:group_id == item.id}"></li>
                </ul>
              </div>
              <!--列表内容-->

              <div class="list_content" :style="{'-webkit-overflow-scrolling': scrollMode}">


                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="cur_list.length < 8" :auto-fill="false" ref="loadmore" :bottomPullText="'上拉加载更多'" >
                  <ul class="list">
                    <li v-for="item in cur_list">
                      <div class="item_list clearfix">
                        <div class="fl">
                          <img :src="item.member_face" alt="" class="avatar">
                        </div>
                        <div class="fl person_msg text-left">
                          <div class="no-enter person_msg_top"><span class="font30">{{item.member_truename}}</span><span class="font24 span2" v-text="item.mark?'（'+item.mark+'）':'（暂无标注）'"></span></div>
                          <div class="font24 no-enter person_msg_bot">公益积分<span v-text="item.points ? item.points : 0"></span></div>
                        </div>
                        <div class="fr person_status"><div class="status1" :class="{no_css:item.group_id == 0 && group_id != 0}" @click="change_group(item)">{{group_id == 0 ? item.edit : '编辑'}}</div></div>
                      </div>
                    </li>
                    <li v-show="cur_list.length == 0">
                      <div class="no_group">
                        <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/default/no_person7.png'" alt="">
                        <div>此分组暂无益客</div>
                      </div>
                    </li>
                  </ul>
                </mt-loadmore>

              </div>
            </div>

            <pop @close="popShow = false" v-show="popShow">
              <div class="pop_box">
                <div class="pop_title font28">选择标签对“{{cur_member_truename}}”进行分类</div>
                <div class="clearfix group_name_box">
                  <div class="group_name" @click="select_group(1)" :class="{group_color:to_group == 1}">VIP</div>
                  <div class="group_name" @click="select_group(2)" :class="{group_color:to_group == 2}">客户</div>
                  <div class="group_name" style="margin-right:0;" @click="select_group(3)" :class="{group_color:to_group == 3}">好友</div>
                  <div class="group_name other" @click="select_group(4)" :class="{group_color:to_group == 4}">其他</div>
                </div>
                <div class="remark">备注：</div>
                <div class="remark_box">
                  <input type="text" class="remark_input" placeholder="最多输入六个汉字" v-model="input_val">
                </div>
                <div class="save_box">
                  <div class="save_btn" @click="save_group">保存</div>
                </div>
              </div>
            </pop>
            <div class="bottom_btn iphonex-margin-bottom" @click="_appjs.syJsbLaunchWebview(siteInfo.host + '/bocm/index.php?act=mhome&op=weal_club_invite')">邀请益客</div>
          </div>
          <!--是益客-->
          <div v-if="yiKe" class="yk-con">
            <div class="yk-top"><img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/default/no_department.png'" alt="no_department.png"></div>
            <p class="yk-descr">您现在是益客，无法查看此页面<br/>请点击下方按钮，选择部门</p>
            <div class="bottom_btn iphonex-margin-bottom" @click="goSelectUnion()">选择部门</div>
          </div>
        </div>
      </transition>



    </div>
</template>

<script>
//  import {} from '@/requests/index'
  import pop from '../common/popups.vue'
  import { Toast , Loadmore  } from 'mint-ui';
  import item from './welfare.vue'
  import loading from '../loading/loading.vue'
  export default {
    data(){
        return {
          isLoading:true,
          yiKe:false,//本人是益客
          input_val:'',
          input_val2:'',
          cur_member_truename:'',
          popShow:false,
          group_id:0,
          to_group:'1',
//          title_list:['全部','VIP','客户','好友','其他'],
          title_list:[{title:'全部',id:0},{title:'VIP',id:1},{title:'客户',id:2},{title:'好友',id:3},{title:'其他',id:4}],
          title_list1:['去分组','VIP','客户','好友','其他'],
          current_page:'全部',
          cur_list:[],
          list0:[],   // 全部
          list1:[],   // vip
          list2:[],   // 客户
          list3:[],   // 好友
          list4:[],   // 其他
          cur_page:1,
          curpage0:1,
          curpage1:1,
          curpage2:1,
          curpage3:1,
          curpage4:1,
          total_page0:0,
          total_page1:0,
          total_page2:0,
          total_page3:0,
          total_page4:0,
          ajax_cur_page:1,
          bottomStatus:true,
          scrollMode:'auto',
          before_group:'',
          rec_id:'',
          cur_item:'',
          welfare_num:'0',
          welfare_score:'0',
          edit:'编辑',

        }
    },
    created(){

//      console.log([].concat([]))
//      let time = new Date(1506528000000)
//      console.log(new Date('2017-9-29').getTime())
      this.getTotalData();
      this.getYiKeData();
    },
    mounted(){
//      this.loadBottom();
      this.init();
    },
    methods:{
      init(){
        this.getData(0,1).then(()=>{
          this.isLoading = false;
          this.cur_list = this['list' + this.group_id];
            setTimeout(()=>{
              this.getData(1,1);
              this.getData(2,1);
              this.getData(3,1);
              this.getData(4,1);
            },100)
        })
      },
      change_group(item){
          this.popShow = true;
          this.cur_item = item;
          this.cur_member_truename = item.member_truename;
          this.rec_id = item.rec_id;
          this.input_val = this.input_val2 = item.mark;
          if(item.mark == '暂无备注'){
            this.input_val = this.input_val2 = '';
          }
          this.to_group = this.before_group = item.group_id

      },
      select_group(num){
        this.to_group = num;
      },
      save_group(){
        if(this.input_val.length > 6){
          this._appjs.syJsbAlert('最多输入6个汉字');
          return;
        }
        this.popShow = false;
        // 如果和之前切换的分组相同并且不改变标注 不发送请求 return
        if(this.before_group === this.to_group && this.input_val === this.input_val2) return;

        let qs = require('querystring');
        let data = qs.stringify({
          rec_id:this.cur_item.rec_id,
          mark:this.input_val,
          group_id:this.to_group
        });

        this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=move_invite_group&' + data).then(res=>{

          if(res.data.code == 200){
//          if(true){
            // 修改成功
            let tmp,index,index2,index3;
            index = this['list' + this.before_group].findIndex( item => item.rec_id === this.rec_id )
            index2 = this['list' + this.to_group].findIndex( item => item.rec_id === this.rec_id )
            this.cur_item.mark = this.input_val ? this.input_val : '暂无标注';
            this.cur_item.group_id = this.to_group;
            this.input_val = '';

            this.cur_item.edit = this.title_list1[this.cur_item.group_id];

//            if(this.group_id != 0){
//              tmp = this['list' + this.before_group].splice( index , 1);
//            }else{
//
//            }
//
//            index2 = this['list' + this.to_group].findIndex( item => item.rec_id === this.rec_id )
//            if(index2 !== -1){
//              this['list' + this.to_group].splice( index2 , 1);
//            }
//
//            if(this.group_id == 0 || (this.to_group === this.before_group)){
//              this['list' + this.to_group].splice(index , 1 , this.cur_item)
//            }else{
//              this['list' + this.to_group].unshift(this.cur_item);
//            }

            if(this.group_id == 0){

              if(this.before_group !=0){
                this['list' + this.before_group].splice( index , 1);

                this['list' + this.to_group].unshift(this.cur_item);

              }else{
                if(this.to_group == 0){

                }else{
                  this['list' + this.to_group].unshift(this.cur_item);
                }
              }
              index3 = this['list0'].findIndex( item => item.rec_id === this.rec_id )
              this['list0'].splice(index3 , 1 , this.cur_item)


            }else{
               if(this.to_group === this.before_group){
                 this['list' + this.to_group].splice(index , 1 , this.cur_item)
               }else{
                 this['list' + this.before_group].splice( index , 1);
                 this['list' + this.to_group].unshift(this.cur_item);
               }
              index3 = this['list0'].findIndex( item => item.rec_id === this.rec_id )
              this['list0'].splice(index3 , 1 , this.cur_item)
            }

//            this['list' + this.before_group][index].edit = '编辑';
//            this['list' + this.group_id] = this.uniqueArray(this['list' + this.to_group],'rec_id')

            Toast({
              message: res.data.message,
              duration: 800
            })
          }else{
            Toast({
              message: '操作失败',
              duration: 800
            })
          }
        })
      },
      loadBottom:function() {
        this.loadPageList()
      },

      loadPageList:function (){
        if(this['total_page' + this.group_id]  < this['curpage' + this.group_id] ){
          this.$refs.loadmore.onBottomLoaded();
          Toast({
            message: '暂无更多数据',
            duration: 500
          })
          return;
        }
        this.getData(this.group_id,this['curpage'+this.group_id]).then(data =>{
          this.cur_list = this['list' + this.group_id];
          this.$refs.loadmore.onBottomLoaded();
          this.$nextTick( () => {
            this.scrollMode = "touch";
          });
        });
      },

      getData(group_id,cur_page){
          return this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=my_invite_list&group_id='+group_id + '&curpage=' + cur_page).then((res =>{

            if(res.data.code != 200) {
              this['list' + this.group_id] = [];
              return;
            };
            let data = res.data.content;
            let tmp = {
              "code": 200,
              "message": "",
              "content": {
                "inv_list": [
                  {
                    "rec_id": "42153",
                    "member_id": "494447",
                    "circle_id": "12310",
                    "add_time": "2017-07-20",
                    "mark": "",
                    "group_id": "2",
                    "member_truename": "186**5294",
                    "member_face": "https://cdnres.17shanyuan.com/boc/templates/default/assets/images/poor_face_default.png",
                    "group_name": "无标签"
                  },
                  {
                    "rec_id": "24091",
                    "member_id": "411593",
                    "circle_id": "12310",
                    "add_time": "2017-06-29",
                    "mark": "",
                    "group_id": "4",
                    "member_truename": "152**1324",
                    "member_face": "https://cdnres.17shanyuan.com/boc/templates/default/assets/images/poor_face_default.png",
                    "group_name": "无标签"
                  },
                  {
                    "rec_id": "24089",
                    "member_id": "411591",
                    "circle_id": "12310",
                    "add_time": "2017-06-29",
                    "mark": "",
                    "group_id": "0",
                    "member_truename": "152**1325",
                    "member_face": "https://cdnres.17shanyuan.com/boc/templates/default/assets/images/poor_face_default.png",
                    "group_name": "无标签"
                  },
                  {
                    "rec_id": "17953",
                    "member_id": "376915",
                    "circle_id": "12310",
                    "add_time": "2017-06-21",
                    "mark": "",
                    "group_id": "0",
                    "member_truename": "唐琦普",
                    "member_face": "https://cdnres.17shanyuan.com/data/upload/syrs/avatar/05514592714963883.jpeg",
                    "group_name": "无标签"
                  },
                  {
                    "rec_id": "6",
                    "member_id": "42",
                    "circle_id": "12310",
                    "add_time": "2017-04-26",
                    "mark": "",
                    "group_id": "0",
                    "member_truename": "王鹏丽",
                    "member_face": "https://cdnres.17shanyuan.com/data/upload/syrs/avatar/05542265080475874.jpeg",
                    "group_name": "无标签"
                  },
                  {
                    "rec_id": "5",
                    "member_id": "374359",
                    "circle_id": "12310",
                    "add_time": "2017-04-26",
                    "mark": "",
                    "group_id": "0",
                    "member_truename": "马军",
                    "member_face": "https://cdnres.17shanyuan.com/data/upload/syrs/avatar/05550972176505902.jpeg",
                    "group_name": "无标签"
                  },
                  {
                    "rec_id": "4",
                    "member_id": "364757",
                    "circle_id": "12310",
                    "add_time": "2017-04-26",
                    "mark": "",
                    "group_id": "0",
                    "member_truename": "彭麦峰",
                    "member_face": "https://cdnres.17shanyuan.com/data/upload/syrs/avatar/05517878221731193.jpeg",
                    "group_name": "无标签"
                  },
                  {
                    "rec_id": "3",
                    "member_id": "375448",
                    "circle_id": "12310",
                    "add_time": "2017-04-26",
                    "mark": "",
                    "group_id": "0",
                    "member_truename": "152**1707",
                    "member_face": "https://cdnres.17shanyuan.com/boc/templates/default/assets/images/poor_face_default.png",
                    "group_name": "无标签"
                  }
                ],
                "total_page": 1
              }
            }
              this['list' + group_id] = this.uniqueArray(this['list' + group_id].concat(data.inv_list),'rec_id')
//            this['list' + group_id] = this.uniqueArray(this['list' + group_id].concat(tmp.content.inv_list),'rec_id')
//
            if(group_id == 0){
              this['list' + group_id].forEach( item => item.edit = this.title_list1[item.group_id] )
            }
            this['curpage'+group_id] ++;
            this['total_page'+group_id] = data.total_page;

          }));

      },
      getTotalData(){
          this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=my_invite_stats').then(res => {
              if(res.data.code == 200){
                  this.welfare_num = res.data.content.inv_count ? res.data.content.inv_count : 0
                  this.welfare_score = res.data.content.inv_points ? res.data.content.inv_points : 0
              }
          })
      },
      switcher(item){
          this.group_id = item;
          this.cur_list = this['list'+item];
      },
      uniqueArray(array, key){
        if(!array.length){ return [] }
        var result = [array[0]];
        for(var i = 1; i < array.length; i++){
          var item = array[i];
          var repeat = false;
          for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
              repeat = true;
              break;
            }
          }
          if (!repeat) {
            result.push(item);
          }
        }
        return result;
      },
      getYiKeData(){
        let yikeUrl = this.siteInfo.host + '/api/index.php?act=home&op=user_if_yike';
        this.$http.get(yikeUrl).then((res) =>{
          let yiKecode = res.data.code;
          let content = res.data.content;
          if(yiKecode == 200){
            if(content.isCodeYike || content.isNoCodeYike){
              this.yiKe = true;
            }else{
              this.yiKe = false;
            }
          }
        },(error =>{console.log(error)}))
      },
      goSelectUnion(){
        window.location.href = this.siteInfo.host + '/bocm/index.php?act=common&op=selectunion_v3';
       /* let url = this.siteInfo.host + '/bocm/index.php?act=common&op=selectunion_v3';
        this._appjs.syJsbLaunchWebview(url);
        this._appjs.syJsbCloseAppPage();*/
      },
    },
    watch:{

    },
    components:{item,pop,loading}
  }
</script>

<style lang="scss" scoped>
@import "/bocm/platformjs/static/css/common.css";

  #welfare_index{
    width:100%;
    height:100%;
    /*background: #F7F9FA;*/
    background: #fff;
    font-weight: 300;
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
  .welfare_container{
    padding-bottom:1rem;
  }
  .welfare_top{
    height:3.2rem;
    padding-top:.95rem;
    box-sizing: border-box;
    background:linear-gradient(to bottom, #4A90E2,#00ECBC);
    margin-bottom: 5px;
  }
  .top_bg_img{
    position: absolute;
    left:0;
    bottom:-5px;
    width:100%;
    height:1rem;
    background: url("/bocm/platformjs/static/image/sywall/icon-bolang.png") no-repeat left bottom;
    background-size:100% auto;
  }
  .top_text{
    color:#FFD390;
    line-height: .44rem;
  }
  .special1{
    font-size: .48rem;
  }
  .no_con{
    padding-top:1.5rem;
    text-align: center;
  }
  .no_con img{
    width:2.4rem;
    height:auto;

  }
  .no_con_text{
    padding-top:.64rem;
    text-align: center;
    color:#B1B8C4;
    font-size: .28rem;
    line-height: .4rem;
  }
  .welfare_ul{
    background: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(218,222,228,0.6);
  }
  .welfare_ul li{
    float: left;
    width:20%;
    text-align: center;
    font-size: .3rem;
    box-sizing: border-box;
    padding:.1rem 0 .2rem;
    border-bottom:2px solid transparent;
  }
  .welfare_ul li.act{
    border-bottom:2px solid #4A90E2;
    color:#4A90E2;
  }
  .list_content{
    background: #fff;
    /*-webkit-overflow-scrolling:auto;*/
  }
  .item_list{
    padding:0.22rem .3rem;
    color:#4B4F63
  }

  .avatar{
    width:.76rem;
    height:.76rem;
    border-radius: 50%;
  }
  .person_msg{
    margin-left:.2rem;
    max-width:5rem;
  }
  .person_msg_top{
    /*line-height:.42rem;*/
    padding: .1rem 0   .08rem 0;
  }
  .person_msg_bot{
    color:#666A7F;
  }
  .span2{
    color:#818C9E;
  }
  .person_status{
    /*width:1rem;*/
    height:100%;
    padding-top:.18rem;
    /*background: red;*/
  }
  .status1{
    width:1.16rem;
    /*padding:0 .2rem;*/
    height:.4rem;
    line-height: .4rem;
    font-size: .26rem;
    border-radius: .2rem;
    border:1px solid #4A90E2;
    box-sizing: border-box;
    color:#4A90E2;
  }
  .no_css{
    border:1px solid #B1B8C4;
    color:#B1B8C4
  }
  .yk-con{
    width:7.5rem;
    margin:0 auto;
    background:#fff;
    .yk-top{
      padding-top:3.25rem;
      padding-bottom:0.57rem;
      img{
        margin:0 auto;
        width:2.35rem;
        height:2.39rem;
      }
    }
    .yk-descr{
      font-size:0.28rem;
      color: #B1B8C4;
      line-height:0.4rem;
    }
  }

  .bottom_btn{
    position: fixed;
    left:0;
    bottom:0;
    width:100%;
    height:1rem;
    line-height: 1rem;
    text-align: center;
    font-size: .32rem;
    background: #4A90E2;
    color:#fff;
    font-weight: 500;
  }
  .pop_box{
    width:6.5rem;
    box-sizing: border-box;
    height:5.8rem;
    background: #fff;
    border-radius: .16rem;
    padding:.5rem .3rem;
    text-align: left;
    color:#4B4F63;
    /*margin-top:.24rem;*/
  }
  .pop_title{
    padding-bottom:.3rem;
  }
  .group_name_box{
    height:.5rem;
    text-align: center;
  }
  .group_name{
    float: left;
    font-size: .28rem;
    line-height: .5rem;
    height:.5rem;
    width:1.25rem;
    box-sizing: border-box;
    border-radius: .25rem;
    border:1px solid #B1B8C4;
    margin-right:.3rem;
  }
  .group_color{
    color:#4A90E2;
    border:1px solid #4A90E2;
  }
  .group_name.other{
    float: right;
    margin-right:0;
  }
  .remark{
    padding-top:.5rem;
    font-size: .28rem;
  }
  .remark_box{
    padding-top:.2rem;
  }

  .remark_input{
    border:1px solid #B1B8C4;
    height:.7rem;
    box-sizing: border-box;
    width:100%;
    border-radius: .08rem;
    -webkit-appearance: none;
    padding-left:.2rem;
  }
  .save_box{
    padding-top:.8rem;

  }
  .save_btn{
    width:4rem;
    height:.9rem;
    margin: 0 auto;
    line-height: .9rem;
    border-radius: .08rem;
    text-align: center;
    background: #4A90E2;
    color:#fff;
    font-size: .32rem;
    letter-spacing: 2px;
    font-weight: 500;
  }
  .no_group{
    text-align: center;
    padding-top:.7rem;
  }
  .no_group img{
    width:2.4rem;
    height:auto;

  }
  .no_group > div {
    padding-top:.66rem;
    font-size: .32rem;
    color:#B1B8C4;
  }

</style>
