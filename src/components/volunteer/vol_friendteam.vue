<template>
  <div class="fr-d">
    <div v-title="'友情合作'"></div>
    <div class="friend—box">
      <ul class="fr-ul">
        <li class="fr-li" v-for="tmp in imgUrl">
          <img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/volunteer/'+tmp.img" alt="北京成龙慈善基金会" class="fr-img">
          <p class="fr-p" v-html="tmp.title"></p>
        </li>
      </ul>
      <footer>
        <!--<div class="tab-one-footer" >———— 一起善源 爱 · 源于善 ————</div>-->
      </footer>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        imgUrl:[
          {img:'vol_friend1.png',title:'北京成龙<br>慈善基金会'},
          {img:'vol_friend2.png',title:'生态家庭志愿者<br>服务队'},
          {img:'vol_friend3.png',title:'中国光华科技<br>基金会'},
          {img:'vol_friend4.png',title:'北京市海淀惠泽<br>社会工作事务所'},
          {img:'vol_friend19.png',title:'西部阳光<br>基金会'},
          {img:'vol_friend6.png',title:'北京上善扶贫<br>公益促进中心'},
          {img:'vol_friend7.png',title:'北京海归<br>协会'},
          {img:'vol_friend8.png',title:'北京理工大学<br>外语学院'},
          {img:'vol_friend9.png',title:'北京市京师社会<br>工作事务所'},
          {img:'vol_friend10.png',title:'北京市青少年法律与心理咨询服务中心'},
          {img:'vol_friend11.png',title:'北京铁刷<br>自行车俱乐部'},
          {img:'vol_friend12.png',title:'北京壹家人<br>爱心联盟'},
          {img:'vol_friend13.png',title:'丰宁<br>团县委'},
          {img:'vol_friend14.png',title:'清泉成才<br>公益基金'},
          {img:'vol_friend15.png',title:'北京奇点公益<br>信息技术服务中心'},
          {img:'vol_friend16.png',title:'一线希望成瘾问<br>题咨询服务中心'},
          {img:'vol_friend17.png',title:'北京青少年社团<br>发展促进中心'},
          {img:'vol_friend18.png',title:'兵舞艺术团'}
        ]
      }
    }
  }
</script>
<style scoped>
  .friend—box{
    min-height: 100%;
  }
  .fr-d{
    width:100%;
    height:100%;
    padding-top:0.27rem;
    box-sizing: border-box;
  }
  .fr-ul{
    height:100%;
    width:100%;
    box-sizing: border-box;
    padding:0.23rem 0.2rem;
    float:left;
  }
  .fr-d:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
    line-height: 0;
  }
  .fr-li{
    padding-top:0.3rem;
    width:33.333%;
    float:left;
    text-align: center;
  }
  .fr-img{
    width:0.9rem;
    height:0.9rem;
    margin:0 auto;
    /*padding-right:0.9rem;*/
  }
  .fr-p{
    width:2.2rem;
    margin:0 auto;
    height:0.72rem;
    font-family:PingFangSC-Light;
    font-size:0.26rem;
    color:#4B4F63;
    line-height:0.36rem;
  }
  .tab-one-footer {
    float:left;
    width:100%;
    /*height:0.5rem;*/
    background: #F7F9FA;
    margin:auto;
    font-family: PingFangSC-Light;
    font-size: 0.24rem;
    /*line-height:0.33rem;*/
    color: #DADEE4;
    letter-spacing: 0;
    padding:0 0.15rem;
    height:.5rem;
    line-height: .5rem;
    /*background: #F7F9FA;*/
    /*height: 0.5rem;*/
    /*font-size: .24rem;*/
    /*color: #DADEE4;*/
    /*letter-spacing: 0;*/
    /*line-height: .5rem;*/
  }
</style>
