<template>
    <div id="medal_index">
      <download :bgColor="bgColor"></download>

      <div class="colorf">
        <!--勋章人物信息-->
        <div class="person_msg">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/default/no_person11.png'" alt="">
          <div class="person_name font30">{{person_name}}</div>
          <div class="medal_num font24">第{{num}}位获得该勋章</div>
        </div>
        <div class="medal_img">
          <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/default/no_person11.png'" alt="">
          <div class="medal_name">{{medal_name}}</div>
          <div class="medal_date">{{medal_date}}</div>
          <div class="medal_score">积分达到{{medal_score}}</div>
        </div>
      </div>
      <div class="bottom_bar_share"></div>
    </div>
</template>

<script>
//  import {} from '@/requests/index'
//  import loading from '@/components/loading/loading.vue'
  import download from '../common/download_app.vue'
  export default {
    data(){
        return {
          person_name:'王晓彤',
          num:'2342',
          bgColor:'#4A90E2',
          medal_name:'公益大咖',
          medal_date:'2017.3.5',
          medal_score:'2342342',
        }
    },
    methods(){

    },
    components:{
        download
    }
  }
</script>

<style lang="scss" scoped>
  @import "/bocm/platformjs/static/css/common.css";

  $blue:#4A90E2;

  #medal_index{
    min-height: 100%;
    background: $blue;
    font-weight: 300;
  }

  .colorf{
    color:#fff;
  }
  .person_msg{
    padding-top:.54rem;
  }
  .person_msg img{
    height:.95rem;
    width:.95rem;
    border-radius: 50%;
  }
  .person_name{
    padding:.2rem 0 .1rem;
  }
  .medal_num{

  }
  .medal_img{
    padding-top:.3rem;
  }
  .medal_img img{
    /*height:3.34rem;*/
    width:3.78rem;
  }
  .medal_name{
    font-size: .68rem;
    padding-top:.5rem;
  }
  .medal_date{
    font-size: .32rem;
    padding-top:.2rem;
  }
  .medal_score{
    font-size: .34rem;
    padding: .2rem;
  }
  .bottom_bar_share{
    position: fixed;
    left:0;
    bottom:0;
    width:100%;
    height:1.86rem;
    background: url("/bocm/platformjs/static/image/medal/Group.png") center center no-repeat;
    background-size: 2.6rem auto;
    background-color:rgba(0,0,0,0.35);
  }

</style>
