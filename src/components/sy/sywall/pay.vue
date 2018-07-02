<template>
  <div class="wrapper">
    <div v-title="'公益钱包支付'"></div>
    <div class="link"></div>
    <div class="eidt">
      <div class="tips" v-if="false">请输入您的支付密码</div>
      <div class="error">
        <p class="p1">密码错误，请重新输入</p>
        <p class="p2">您还可以尝试<span>2</span>次</p>
      </div>
      <div class="list" @keypress="getFocus1($event)" @keyup="getFocus2($event)">
        <span contenteditable="true"></span>
        <span contenteditable="true"></span>
        <span contenteditable="true"></span>
        <span contenteditable="true"></span>
        <span contenteditable="true"></span>
        <span contenteditable="true"></span>
      </div>
    </div>
    <div class="btn" @click.stop="send">
      <p>确认</p>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activeIndex: 0,
        passWord: ''
      }
    },
    created:function () {
      this.getInfo()
    },
    methods: {
      getInfo(){
        var spanList = document.getElementsByTagName('span')
        spanList[0].focus()
      },
      send(){
        alert(passWord)
      },
      getFocus1(e){
        var spanList = document.getElementsByTagName('span')
        if (e.target.tagName.toLowerCase() == 'span') {
          e.preventDefault()
          if (e.target.innerHtml.length == 0 && this.activeIndex < spanList.length && e.keyCode != 8) {
            var k = String.fromCharCode(e.charCode)
            if (/\d/.test(k)) {
              spanList[this.activeIndex].classList.add('circle')
              this.passWord.push(k)
              if (this.activeIndex != spanList.length - 1) {
                go(this.activeIndex + 1)
              }
              this.activeIndex++
            } else {
              alert('请输入数字密码')
            }
          }
        }
      },
      getFocus2(e){

      },
      go(index){
        var spanList = document.getElementsByTagName('span')
        for (var i = 0, len = spanList.length; i < len; i++) {
          spanList[i].setAttribute('contenteditable', false)
        }
        spanList[index].setAttribute('contenteditable', true)
        spanList[index].focus()
      }
    }
  }
</script>
<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .link {
    width: 100%;
    height: 0.2rem;
    background-color: #f4f6f5;
  }

  .tips {
    padding: 0.8rem 0 0.9rem;
    font-size: 0.32rem;
    font-weight: 300;
    color: #4B4F63;
  }

  .error {
    padding: 0.8rem 0 0.46rem;
  }

  .error .p1 {
    font-size: 0.32rem;
    color: #4B4F63;
    font-weight: 300;
  }

  .error .p2 {
    font-size: 0.26rem;
    color: #666A7F;
    font-weight: 300;
    line-height: 0.6rem;
  }

  .error .p2 span {
    color: red;
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .btn p {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: #4A90E2;
    color: #fff;
    font-size: 0.32rem;
  }

  .list {
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
    font-size: 0;
  }

  .list span {
    display: inline-block;
    height: 1.2rem;
    width: 0.8rem;
    box-sizing: border-box;
    font-size: 0.6rem;
    text-align: center;
    line-height: 1.2rem;
    position: relative;
    cursor: text;
    border: 1px solid #B1B8C4;;
    border-radius: 0.08rem;
    margin-right: 0.3rem;
  }

  .list span:last-child {
    margin-right: 0;
  }

  .circle:after {
    content: "";
    width: 8px;
    height: 8px;
    background: #000;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -4px;
    margin-left: -4px;
  }

</style>