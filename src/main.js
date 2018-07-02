/**
 * vue项目核心文件----启动文件
 */
import Vue from 'vue'
import mintUI from 'mint-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import siteInfo from './global'
import _appjs from './modules/_appJs'
import _ls from './modules/_ls'
import syShare from './components/assistants/sy-share'
import 'babel-polyfill'
import syPlugs from './packages'
let VueCookie = require('vue-cookie');
Vue.prototype.$http = axios
Vue.prototype.siteInfo = siteInfo
Vue.prototype._appjs = _appjs
Vue.prototype._ls = _ls

Vue.use(mintUI)
Vue.use(VueCookie)
Vue.use(syShare);
Vue.use(syPlugs);

import store from '../src/store'

// Vue.use(axios)

Vue.config.productionTip = false

Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = binding.value
    }
})
Vue.directive('title-txt', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.prototype.getUuid=function () {
  navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
      M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
      tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();

//var pathname = encodeURIComponent(window.location.pathname);
  var title  = document.title;
  var url    = encodeURIComponent(window.location.href);
  var width  = $(window).width();
  var height = $(window).height();
// other
  var page_ts = $.now()/1000;
//var pageid = $("#pageid").html();
  var uuid = localStorage.getItem('statistics_uuid');
  if(!uuid) {
    uuid = "sys"+guid();
    localStorage.setItem('statistics_uuid', uuid)
  }
  $("#pts").text(page_ts);
  var $req_url = 'https://d1.17shanyuan.com';
  if(window.location.origin !== 'https://www.17shanyuan.com') {
    $req_url = 'http://dt1.17shanyuan.com';
  }
 return $.ajax({
    type: "GET",
    url: $req_url + "/greeting/webclick?url="+url+"&title="+title
    +"&page_ts="+page_ts+"&browser="+navigator.sayswho+"&width="
    +width+"&height="+height + "&uuid=" + uuid,
    cache:false,
    success: function (data) {
      console.log(data)
    },
    error: function (data) {
      console.log(data)
    }
  });

  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
}
