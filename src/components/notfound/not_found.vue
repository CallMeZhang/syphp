<template>
  <div id="not_found">
    <div v-title="'资源未找到'"></div>
    <div class="wrap">
      <div class="top_img text-center">
        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/not_found.png'" alt="图片加载失败">
      </div>
      <div class="not_found_text text-center font32 color666">
        <p>您访问的页面不存在...</p>
        <p>页面可能被删除</p>
      </div>
      <div class="operate">
        <div class="font34">
          <a href="javascript:;">返回首页</a>
          <a href="javascript:window.history.go(-1);">返回上一页</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "/bocm/platformjs/static/css/common.css";
  .top_img img{
    margin-top: 1.55rem;
    width:74%;
  }
  .not_found_text{
    padding-top:1.46rem;
    line-height: .56rem;
  }
  .operate{
    padding-top:1rem;
  }
  .operate a{
    color:#66B2EA;
    margin-left:.4rem;
    padding:.2rem .1rem;
  }
</style>
