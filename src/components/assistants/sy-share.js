var component= require("./sy-share.vue")
function getIndexLayer(Vue, props) {
  let layerIndex = Vue.extend(component);
  Vue.component("sy-share", layerIndex);
}
let syShare={ v: '1.0'}
syShare.install = function (Vue, options) {
  getIndexLayer(Vue);
  Vue.directive('sydrag',{bind:function (el, binding) {
      let tag= el;   //当前元素
    tag.addEventListener("touchstart",function(e){
      let clientX =  e.touches[0].clientX;
      let clientY =  e.touches[0].clientY;
      let top = parseInt(this.style.bottom.substr(0,this.style.bottom.length-2))||0
      let left = parseInt(this.style.right.substr(0,this.style.right.length-2))||0
        tag.addEventListener("touchmove" , function (e) {
          e.preventDefault();
         let dX = e.touches[0].clientX-clientX;
         let dY = e.touches[0].clientY-clientY;
         this.style.bottom=top-dY+"px";
         this.style.right=left-dX+"px";
        })
      });
    }
  });
  Vue.prototype.$syShare = function (jsonParams,text,url) {
    this._appjs.syJsbShare(jsonParams,text,url)
  }
}
export default syShare
