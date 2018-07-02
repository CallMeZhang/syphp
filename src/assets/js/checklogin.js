/**
 * Created by 海盗 on 2017/12/18.
 */


import axios from 'axios'
import siteInfo from '@/global'
let qs = require('qs')

function checkLogin(){
  return axios.get(siteInfo.host+'/api/index.php?act=volunteer&op=is_login').then(res=>{
    return res && res.data && res.data.code == 200
  })
}
export default function goLogin(goUrl,fn){
  this.checkLogin().then(flag=>{
    if(flag){
      fn()
    }else{
        window.location.href = this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=login&gycallback='+encodeURIComponent(goUrl)
    }
  })
}
