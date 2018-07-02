import Vue from 'vue'
Vue.directive('imgCenter',{
    bind:function (el, binding) {
      let tag= el;   //当前元素
      var img=new Image();
      img.src=tag.src;
      img.onload=function(){
        let width = this.width
        let height = this.height
        console.log(width,height)
        if(width>height){
          tag.style="position:absolute;height: 1.86rem;width:auto;border: 0px;left: 50%;-webkit-transform: translate3d(-50%,0%,0);transform: translate3d(-50%,0%,0);"
        }else{
          tag.style="position:absolute;width: 1.86rem;height:auto;border: 0px;top: 50%;-webkit-transform: translate3d(0%,-50%,0);transform: translate3d(0%,-50%,0);"
        }

      };
      img.onerror=function(){
        console.log("error!")
      };
    }
  })
