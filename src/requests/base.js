import axios from 'axios'
import ls from '../modules/_ls'

/**
 * get方法获取可被ls缓存的数据
 * @param url api url
 * @param lskey ls参数key
 * @returns {Promise}
 */
function $httpGetWithLs (url, lskey) {
  return new Promise(function (resolve, reject) {
    $httpGet(url)
      .then(res => {
        ls.setLsItem(lskey+'D', res.data.content)
        ls.setExpiresKey(lskey)
        resolve(res.data.content)
      })
  })
}

/**
 * get方法获取不可被ls缓存的数据
 * @param url
 * @returns {Promise}
 */
function $httpGetNoLs (url) {
  return new Promise(function (resolve, reject) {
    $httpGet(url)
      .then(res => {
        resolve(res.data.content)
      })
  })
}

function $httpGet (url) {
  return axios.get(url);
}

export default {
  $httpGetWithLs,
  $httpGetNoLs,
  $httpGet
}
