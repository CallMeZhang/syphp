<template>
  <div v-if="closed" class="mask" style="z-index: 999999999">
    <div class="jct-close" @click="closed=false"></div>
    <div class="jct-content">
      <div class="jct-title">关于集采清单</div>
        <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name:"sy-dialog",
    data () {
      return {
        closed:true
      }
    },
    created () {
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  .jct-close{height: 0.6rem;margin-right:0.7rem;margin-top:1.83rem;background: url("/bocm/platformjs/static/image/icon-close.png")no-repeat right;background-size: 0.6rem 0.6rem;}
  .jct-content{width: 6.5rem;height: 8.37rem;margin: 0.3rem auto 0;background: #fff;border-radius: 0.16rem;}
  .jct-title{width: 6.5rem;height: 0.93rem;line-height: 0.93rem;font-size: 0.34rem;color: #4B4F63;border-bottom: 0.02rem solid rgba(218,222,228,0.60);}
  .jct-c{width: 6.5rem;height:5.36rem; overflow-y: auto;}
  .jct-site{width: 5.7rem;height: 0.84rem;margin: 0.4rem auto 0;font-size: 0.28rem;color: #4B4F63;line-height: 0.42rem;text-align: left;}
  .jct-img{width: 5.7rem;height: 2.78rem;margin: 0.21rem auto 0.13rem;}
  .jct-img img{width: 100%;height: 100%;}
  .jct-des{width: 5.7rem;margin: 0.3rem auto 0;font-size: 0.28rem;color: #4B4F63;line-height: 0.42rem;text-align: left;}
  .jct-p{width:6.5rem;height: 1rem;background-image: linear-gradient(0deg, #FFFFFF 40%, rgba(255,255,255,0.73) 79%, rgba(255,255,255,0.00) 100%);position:absolute;left:0;bottom:0;}
  </style>
