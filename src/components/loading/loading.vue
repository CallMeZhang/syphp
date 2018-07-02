<template>
  <div class="loading_container">
    <div class="box">
      <div class="wai">
      </div>
      <div class="nei">
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        name:'loading_container',
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

  .loading_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.7rem;
    height: 0.7rem;
  }

  .box {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .wai {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation: rotate 2s linear infinite;
    transform-origin: center center;
    z-index: 12;
    background: url("./assets/images/icon-xin2.png") no-repeat center;
    background-size: contain;
  }

  .nei {
    width: 30%;
    height: 30%;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: url("./assets/images/‭icon-xin1.png") no-repeat center;
    z-index: 11;
    background-size: contain;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
