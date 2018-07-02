<template>
  <div>
    <div v-title="'组织信息'"></div>

    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>

    <transition name="fade">
      <div class="org-con">
        <div class="top-space"></div>
        <div class="org-con-n">
          <h2 class="org-name">{{orgData.volunteer_org_name}}</h2>
          <div class="org-photo"><img :src="vOrgPhoto" alt="photo" style="border-radius: 50%;"></div>
        </div>
        <div class="bg-p after-scale-b">基本信息</div>
        <ul class="basic-info">
          <li class="clearfix">
            <div class="basic-l fl">组织常驻地址</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child no-enter">{{orgData.city}}&nbsp;&nbsp;&nbsp;{{orgData.area}}&nbsp;&nbsp;&nbsp;{{orgData.address}}</div>
            </div>
          </li>
          <li class="clearfix">
            <div class="basic-l fl">成立日期</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.establish_time}}</div>
            </div>
          </li>
          <li class="clearfix">
            <div class="basic-l fl">组织宣言</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.summary}}</div>
            </div>
          </li>
        </ul>
        <!--组织详细介绍-->
        <div class="org-info">
          <h2 class="descr-title">组织详细介绍</h2>
          <div v-bind:class="{'descr-con':true, 'descr-con-min':slideDU}">
            <p class="org334" v-html="orgData.my_introduction"></p>
            <div v-bind:class="{'slide-con':true,'slide-con-no-bg':slideDU}">
              <div class="con-relative">
                <div class="up-down" @click="slideDownUp()"><span v-bind:class="{'slide-up':slideDU}"></span></div>
              </div>
            </div>
          </div>
        </div>
        <!--服务类型-->
        <div class="server-type clearfix">
          <div class="ser-l fl">服务类型</div>
          <div class="ser-r my-table fl">
            <div class="ser-r-con my-table-cell">
              <span class="services" v-for="item in serviceType">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="bg-p after-scale-b">组织负责人</div>
        <ul class="basic-info">
          <li class="clearfix li-last-t">
          <div class="basic-l fl">负责人姓名</div>
          <div class="basic-r margin-l08 fl">
            <div class="basic-child">{{orgData.manager_name}}</div>
          </div>
        </li>
          <li class="clearfix">
            <div class="basic-l fl">负责人手机</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.manager_mobile}}</div>
            </div>
          </li>
          <li class="clearfix">
            <div class="basic-l fl">办公电话</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.manager_phone}}</div>
            </div>
          </li>
          <li class="clearfix li-last-b">
            <div class="basic-l fl">电子邮箱</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.manager_email}}</div>
            </div>
          </li>
        </ul>
        <div class="bg-p after-scale-b">组织联系人</div>
        <ul class="basic-info">
          <li class="clearfix li-last-t">
            <div class="basic-l fl">联系人姓名</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.contact_name}}</div>
            </div>
          </li>
          <li class="clearfix">
            <div class="basic-l fl">联系人手机</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.contact_mobile}}</div>
            </div>
          </li>
          <li class="clearfix">
            <div class="basic-l fl">办公电话</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.contact_phone}}</div>
            </div>
          </li>
          <li class="clearfix li-last-b">
            <div class="basic-l fl">电子邮箱</div>
            <div class="basic-r margin-l08 fl">
              <div class="basic-child">{{orgData.contact_email}}</div>
            </div>
          </li>
        </ul>
        <div class="bottom-descr">一起善源 爱 · 源于善</div>
      </div>
    </transition>

  </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  export default {
    data(){
      return {
        isLoading:false,
        slideDU:true,
        vOrgId:'87',
        vOrgPhoto:'',//头像
        serviceType:[],
        orgData:{}
      }
    },
    created(){
      this.getData()
    },
    mounted(){

    },
    methods:{
      getData(){
//        volunteer_org_auditing_detail
        this.vOrgId = this.$route.query.volunteer_org_id
        this.state = this.$route.query.state
          let url = '/api/index.php?act=volunteer&op=volunteer_org_auditing_detail&volunteer_org_id='+this.vOrgId + '&state='+this.state
        this.$http.get(this.siteInfo.host + url).then((res)=>{
            let con = res.data
          console.log(con)
          if(con.code == 200){
            this.orgData = res.data.content
            this.vOrgPhoto = res.data.content.my_avatar
           let typeStr = res.data.content.my_service_type.split(',')
            this.serviceType = typeStr
          }else if(con.code==400){
              this.$toast(con.message)
          }else if(con.code ==402){

          }

        })
      },
      slideDownUp(){
        this.slideDU = !this.slideDU
      }

    },
    components:{loading}

  }
</script>

<style>
  .org-con .org334 img{
    margin:0.2rem 0;
    max-width:100% !important;
  }
  .org-con .org334 p{
    text-align: justify;
    font-weight:300;
    font-size: .28rem !important;
    color:#818C9E !important;
  }
</style>
<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";
  .org-con{
    text-align:left;
    font-weight:300;
  }
  .top-space{
    width:100%;
    height:0.23rem;
    background:#f7f9fa;
  }
  .margin-l08{margin-left:0.8rem;}
  .org-con-n{
    width:6.9rem;
    padding:0 0.3rem;
    height:1.57rem;
    display:flex;
    flex-flow:row nowrap;
    align-items:center;
    text-align:left;
    .org-name{
      width:5.9rem;
      font-size:0.34rem;
      line-height:0.48rem;
      color: #4B4F63;
    }
    .org-photo{
      width:1rem;
      height:1rem;
      border-radius:50%;
      background: #D8D8D8;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  .bg-p{
    width:7.5rem;
    padding:0 0.3rem;
    height:0.7rem;
    font-weight:300;
    font-size:0.26rem;
    line-height:0.7rem;
    background: #F7F9FA;
    box-sizing:border-box;
  }
  .basic-info{
    width:7.5rem;
    li{
      width:100%;
      min-height:0.86rem;
      font-size:0.28rem;
      color: #4B4F63;
      padding:0 0.3rem;
      border-bottom:1px solid rgba(218,222,228,0.6);
      box-sizing:border-box;
      .basic-l{
        min-width:1.68rem;
        min-height:0.86rem;
        line-height:0.86rem;
        color: #4B4F63;
        font-weight:300;
      }
      .basic-r{
        display:table;
        width:4.42rem;
        min-height:0.86rem;
        .basic-child{
          display:table-cell;
          vertical-align: middle;
          white-space: normal;
          line-height:0.4rem;
          color: #818C9E;
          font-weight:300;
        }
      }
    }
    .li-last-b{
      border-bottom:0;
    }
    .li-last-t{
      border-top:0;
    }
  }
  .org-info{
    width:7.5rem;
    .descr-title{
      width:100%;
      padding:0 0.3rem;
      font-size:0.28rem;
      font-weight:300;
      line-height:0.4rem;
      color: #4B4F63;
      margin-top:0.23rem;
      margin-bottom:0.12rem;
      box-sizing:border-box;
    }
    .descr-con{
      position:relative;
      width:7.5rem;
      height:1.94rem;
      font-size:0.28rem;
      color: #818C9E;
      line-height:0.4rem;
      overflow:hidden;
      padding-bottom:0.24rem;
      border-bottom: 1px solid rgba(218,222,228,0.6);
      p{
        width:6.9rem;
        margin:0 auto;
        padding-bottom: 0.24rem;
      }
      .slide-con{
        position:absolute;
        bottom:0;
        width:100%;
        height:0.82rem;
        background-image: linear-gradient(-180deg, rgba(238,238,238,0.00) 0%, #FFFFFF 50%);

      }
      .slide-con-no-bg{
        position:absolute;
        bottom:0;
        width:100%;
        height:0.82rem;
        background-image: linear-gradient(-180deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.00) 50%);
      }
      .con-relative{
        position:relative;
        height:0.82rem;
      }
      .up-down{
        width:2rem;
        margin:0 auto;
        height:0.82rem;
        position:relative;
        span{
          position:absolute;
          /*top:50%;*/
          left:50%;
          bottom:0.2rem;
          margin-left:-0.12rem;
          margin-top:-0.06rem;
          display:inline-block;
          width:0.24rem;
          height:0.12rem;
          background:url(/bocm/platformjs/static/image/sywall/icon-xia.png)no-repeat;
          background-size:100%;
        }
        .slide-up{
          position:absolute;
          top:50%;
          left:50%;
          margin-left:-0.12rem;
          margin-top:-0.06rem;
          display:inline-block;
          width:0.24rem;
          height:0.12rem;
          background:url(/bocm/platformjs/static/image/sywall/icon-shang.png)no-repeat;
          background-size:100%;

        }
      }
    }
    .descr-con-min{
      width:7.5rem;
      font-size: 0.28rem;
      color: #818C9E;
      line-height: 0.4rem;
      position: relative;
     /* min-height:1.68rem;
      height:auto!important;
      height:1.68rem;*/
      height:auto;
    }
  }
  .my-table{
    display:table;
  }
  .my-table-cell{
    display:table-cell;
    vertical-align: middle;
    white-space: normal;
    font-weight:300;
  }
  .server-type{
    width:6.9rem;
    padding:0.22rem 0.3rem 0.22rem;
    /*min-height:1.22rem;*/
    font-size:0.28rem;
    color: #4B4F63;
    .ser-l{
      width:2.48rem;
      padding-top:.05rem;
      font-weight:300;
    }
    .ser-r{
      width:4.42rem;
    }
    .ser-r-con{
      font-size:0.28rem;
      line-height:0.42rem;
      color: #818C9E;
      font-weight:300;
    }
    .services{
      line-height:0.42rem;
      padding:0 0.14rem;
      font-weight:300;
    }
  }
  .bottom-descr{
    width:7.5rem;
    height:0.5rem;
    text-align:center;
    line-height:0.5rem;
    font-size:0.24rem;
    color: #DADEE4;
    background: #F7F9FA;
  }
</style>
