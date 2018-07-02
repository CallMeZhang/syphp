<template>
    <div class="share-content" style="bottom:20px;right:10px">
      <img class="share" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/share.png'" alt="">
    </div>
</template>

<script>
	export default {
		data() {
			return {
      }
		},
		created() {
		},
    methods: { },
		components: {}
	}
</script>

<style lang="scss" scoped>
  .share-content{
    position: fixed;
    z-index: 99999;
  }
  .share{
    width:0.9rem;
    height: 0.9rem;
    display: block;
  }
</style>
