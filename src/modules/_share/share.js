/**
 *
 * share
 */

import axios from 'axios'
// import weixin from '../../assets/js/jweixin-1.2.0'
let wiexin = require('../../assets/js/jweixin-1.2.0')
let qs = require('qs')


//微信初始化函数
function wx_config(appId,timestamp,nonceStr,signature){
  wx.config({
    debug: false, //调试阶段建议开启
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
      "chooseImage",
      "previewImage",
      "uploadImage",
      "downloadImage",
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      "onMenuShareQQ",
      "onMenuShareQZone"
    ]
  });
}
function share_config(title,desc,link,imgUrl,signPackage){
  //初始化配置信息
  wx_config(signPackage.appId, signPackage.timestamp, signPackage.nonceStr, signPackage.signature);
  //微信加载完后调用
  wx.ready(function(){
    wx.onMenuShareTimeline({//分享朋友圈
      title: title, // 分享标题
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
      }
    });
    wx.onMenuShareAppMessage({//分享朋友
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是m usic或video，则要提供数据链接，默认为空
      success: function () {
      },
      cancel: function () {
      }
    });
    wx.onMenuShareQQ({//分享到QQ
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareQZone({//分享到QQ空间
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });

  });
}

// function wx_share(title,desc,link,imgUrl){
//   $.ajax({
//     type: "POST",
//     url: "https://"+document.domain+"/api/index.php?act=wx&op=ajaxGetSignPackage",
//     data: 'request_url='+ encodeURIComponent(window.location.href),
//     dataType: "json",
//     success: function(data){
//       share_config(title,desc,link,imgUrl,data);
//     },
//     error: function(data){
//       alert('网络异常，请刷新！');
//     }
//   });
// }

export default function wx_share(title,desc,link,imgUrl){
  axios({
    type: "POST",
    url: "https://"+document.domain+"/api/index.php?act=wx&op=ajaxGetSignPackage",
    data: {request_url:encodeURIComponent(window.location.href)}
  }).then(res => {
    let data = JSON.stringify(res);
    share_config(title,desc,link,imgUrl,data);
  })
}
