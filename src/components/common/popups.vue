<template>
    <div>
      <div class="mask_container">
        <div class="center">
          <div class="box_title">
            <img :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/sywall/close_x2.png'" alt="" class="close_box" @click="close">
          </div>
          <div class="box_content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

  export default {
    data(){
        return {
//          show_box:true
        }
    },
    methods:{
      close(){
          this.$emit('close',true)
      }
    }
  }
</script>

<style lang="scss" scoped>
.mask_container{
  position: fixed;
  z-index: 100000000;
  width:100%;
  height:100%;
  left:0;
  top:0;
  background: rgba(0,0,0,.5);
}
  .center{
    position: absolute;
    left: 50%;
    top: 45%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .box_title{
    padding-bottom:.1rem;
    padding-right:.1rem;
    text-align: right;
  }
.close_box{
  width:.6rem;
  height:auto;
}
.box_content{
  border-radius: .16rem;
}
</style>
