<template>
  <div name="shared_img">
    <div class="mask" style="z-index: 999999999;background: rgba(0,0,0,0.5);">
     <img style="width:100%" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/share_img.png'" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    methods:{

    }
  }
</script>
<style scoped>
  @import "/bocm/platformjs/static/css/common.css";
</style>
