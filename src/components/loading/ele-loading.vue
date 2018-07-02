<template>
  <div class="loading_container">
    <div class="load_img" :style="{backgroundPositionY: -(positionY%7)*1.5 + 'rem'}">
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        positionY: 0,
        timer: null,
      }
    },
    mounted(){
      this.timer = setInterval(() => {
        this.positionY++;
      }, 600)
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes load {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes ellipse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.3);
    }
    100% {
      transform: scale(1);
    }
  }

  .loading_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.5rem;
    height: 1.5rem;
  }

  .load_img {
    width: 100%;
    height: 100%;
    background: url(../../../static/image/icon_loading.png) no-repeat 0 0;
    background-size: 1.5rem auto;
    transform: translateY(0px);
    animation: load .6s infinite ease-in-out;
    position: relative;
    z-index: 11;
  }

  .load_ellipse {
    position: absolute;
    width: 2.6rem;
    height: 2rem;
    top: 2.2rem;
    left: 0.2rem;
    z-index: 10;
    animation: ellipse .6s infinite ease-in-out;
  }
</style>
