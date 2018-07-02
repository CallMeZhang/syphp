<template>
  <div class="wrapper">
    <!--<div v-title="'教育注册'"></div>-->
    <div class="con">
      <div class="img">
        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/icon-project.png'" alt="暂无项目">
        <p>暂无项目</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {}
    }
  }
</script>
<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .con {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .con .img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .con img {
    width: 2.4rem;
    height: 2.4rem;
    margin-bottom: 0.65rem;
  }

  .con .img p {
    font-size: 0.32rem;
    color: #B1B8C4;
    font-weight: 300;
  }
</style>