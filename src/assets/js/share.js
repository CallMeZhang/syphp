/**
 *
 * share
 */
import wx from 'weixin-js-sdk'
import _app from '@/modules/_appJs/index'
import axios from 'axios'
import siteInfo from '@/global'
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
  /*wx.checkJsApi({
    jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      alert(JSON.stringify(res));
    }
  });*/
  wx.ready(function(){
    wx.onMenuShareTimeline({//分享朋友圈
      title: title, // 分享标题
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function (res) {
        // _app.syJsbAlert(res.toString())

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
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function (res) {
        // _app.syJsbAlert(res.toString())
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

  wx.error(function(){
    // _app.syJsbAlert('微信error错误')
  })
}
function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
function app_share(title,desc,link,imgUrl){
  let params = {text: desc, url: link, title: title, logo: imgUrl};
  let jsonParam = JSON.stringify(params);
  _app.syJsbShare(jsonParam, desc, link);
}
function wx_share(title,desc,link,imgUrl){
  // let tmp = '{"appId":"wxd28e2eb6ab457d84","nonceStr":"mlmUrGsxx5cyenFk","timestamp":1508310596,"url":"http:\/\/localhost:8080\/#\/mall_detail?goods_id=105794","signature":"99729267009021dd729749f54ed0b1204311d7ad","rawString":"jsapi_ticket=kgt8ON7yVITDhtdwci0qeb6577wh4_9x3ecLHoc1K9INYjhVAiSPJY_f8qqVnfN8hDRlULa0oPBNXzoUyiISEQ&noncestr=mlmUrGsxx5cyenFk&timestamp=1508310596&url=http:\/\/localhost:8080\/#\/mall_detail?goods_id=105794"}'
  // share_config(title,desc,link,imgUrl,JSON.parse(tmp));
  // return;
  axios.post("https://"+document.domain+'/api/index.php?act=wx&op=ajaxGetSignPackage',
  // axios.post('/api/index.php?act=wx&op=ajaxGetSignPackage',
    qs.stringify({request_url:encodeURIComponent(window.location.href)})
    // qs.stringify({request_url:encodeURIComponent(window.location.href.split('#')[0])})
  ).then(res => {
    /*console.log('post')
    console.log(res)*/
    share_config(title,desc,link,imgUrl,res.data);
  }).catch(err => {
    // alert('网络异常，请刷新')
  })
}

/*'/api/!*': {
  target: 'https://t2.17shanyuan.com',
    secure: true, // 接受 运行在 https 上的服务
    changeOrigin: true
}*/
export default function(obj){
  if(!arguments.length){
    throw '请传入分享参数'
  }
  if (arguments.length === 1){
    if(typeof obj !== 'object'){
      throw '请传入对象,{url:...,title:...,text:...,logo:...}'
    }
    let link = obj.url;
    let title = obj.title;
    let desc = obj.text;
    let imgUrl = obj.logo;
    wx_share(title,desc,link,imgUrl)
  }else{
    if(arguments.length !== 4){
      throw '请按顺序传入参数,标题title,描述desc,链接link,图片地址imgUrl'
    }
    wx_share.apply(null,arguments)
  }
}
