<template>
    <div class="zh-index-list-top-box container">
      <div class="zh-index-list-top-inbox">
        <div class="zh-index-list-top-left"></div>
        <div class="zh-index-list-top-tit">{{modulesTitle}}</div>
        <div class="zh-index-list-top-right"></div>
      </div>
    </div>
</template>

<script>
    export default {
      props: ['modulesTitle']
    }
</script>

<style>
  .blk1 {height:0.2rem;background:#f4f5f6}
  .bg { background: #fff;}
  .zh-index-list,.zh-index-list-top-box{ width: 7.5rem; box-sizing: border-box; background:#fff;}
  .zh-index-list-top-inbox{ overflow:hidden; margin:0 auto; width:5.16rem;}
  .zh-index-list-top-inbox div{ float:left; line-height:0.94rem; height:0.94rem;}
  .zh-index-list-top-left{ width:0.94rem; background:url(/bocm/platformjs/static/image/title_l.png) no-repeat center right/0.62rem 0.12rem;}
  .zh-index-list-top-tit{ width:3.28rem; font-size:0.3rem; color:#f31e37; text-align:center;}
  .zh-index-list-top-right{ width:0.94rem; background:url(/bocm/platformjs/static/image/title_r.png) no-repeat center left/0.62rem 0.12rem;}
</style>
