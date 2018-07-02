<template>
    <div id="member_detail">
      <div v-title="'详细资料'"></div>

      <transition name="fade">
        <loading v-show="isLoading"></loading>
      </transition>

      <transition name="fade">
        <div class="member_detail">
          <div class="avatar5">
            <img :src="content.member_avatar" alt="">
          </div>
          <div class="member_name">
            {{content.truename}}
          </div>
          <div class="desc colorb1 font26">
            {{content.my_sex}}  {{content.my_age}}岁 {{content.my_profession}}
          </div>

          <div class="bg_interval"></div>
          <div class="title12 color66 font30" v-if="content.summary">个人简介</div>
          <div class="intro text-left">
            {{content.summary}}
            <div v-if="!content.summary" style="text-align: center;padding-top:1.94rem;">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/no_sm.png'" alt="" style="width:2.54rem;">
              <div style="padding-top:.57rem;font-size: .32rem;color:#B1B8C4">暂无简介</div>
            </div>
          </div>
        </div>
      </transition>

    </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
//  import {} from '@/requests/index'
//  import pop from '../components/common/popup.vue'

//  import Swiper from '../../../static/js/swiper-3.4.2.min'
  export default {
    data(){
        return {
          isLoading:false,
          member_id:'',
          content:{},
        }
    },
    created(){
      this.member_id = this.$route.query.member_id || '1177504';
      this.getData().then(()=>{this.isLoading = false})
    },
    mounted(){

    },
    methods:{
      getData(){
        return this.$http.get(this.query('volunteer_org_member_detail',{member_id:this.member_id})).then(res=>{
          if(res && res.data && res.data.code == 200){
            this.content = res.data.content[0];
          }

        })
      },
      query(api,obj){
        let str = '';
        if(obj){
          for(var k in obj){
            str += '&'+ k + '=' + obj[k]
          }
        }
        return this.siteInfo.host+'/api/index.php?act=volunteer&op='+api+str
      }

    },
    components:{loading}

  }
</script>

<style lang="scss" scoped>
@import "/bocm/platformjs/static/css/common.css";
  #member_detail{
    width:100%;
    min-height:100%;
    font-weight: 300;
    background: #fff;
    /*vertical-align: bottom;*/
  }
  .member_detail{
    padding-top:.6rem;
    padding-bottom:.5rem;
    color:#4B4F63;
    .avatar5{
      width:1.6rem;
      height:1.6rem;
      overflow: hidden;
      margin:0 auto;
      border-radius: 50%;
      text-align: center;
      img{
        width:1.6rem;

      }
    }
    .member_name{
      font-size: .36rem;
      line-height: .5rem;
      padding-top:.4rem;
    }
    .desc{
      margin-top:.07rem;
      line-height: .4rem;
      padding-bottom:.46rem;
    }

    .title12{
      padding:.34rem 0;
    }
    .intro{
      font-size: .26rem;
      line-height: .37rem;
      padding:0 .3rem;
    }

  }

  .color4b{
    color:#4B4F63;
  }
  .color81{
    color:#818C9E;
  }
  .color66{
    color:#666A7F;
  }
  .colorb1{
    color:#B1B8C4;
  }
  .bg_interval{
    background: #F7F9FA;
    height:.2rem;
  }
</style>
