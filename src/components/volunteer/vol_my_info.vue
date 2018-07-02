<template>
    <div class="wrapper-info">
      <div class="uninfo">
        <img src="/bocm/platformjs/static/image/volunteer/uninfo.png" alt="">
        <p class="untext normal-color">暂无报名信息</p>
        <button>去报名</button>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created () {
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  $color:'#B1B8C4';
  .normal-color{
    color:$color;
    font-size: .32rem;
    font-weight: 300;
  }
  .wrapper-info{
  overflow: hidden;
  .uninfo{
    text-align: center;
    img{
      width:2.21rem;
      height: 2.4rem;
      display: block;
      border: 0;
      margin: 3.73rem auto 0;
    }
    .untext{
      margin-top: 0.58rem;
    }
    button{
      border: .01rem solid #4A90E2;
      border-radius: .08rem;
      font-size: .32rem;
      color: #4A90E2;
      width: 6.9rem;
      height: 0.88rem;
      background: #fff;
      line-height: 0.88rem;
      box-sizing: border-box;
      padding: 0;
      margin-top: 3.14rem;
    }
  }

}
</style>
