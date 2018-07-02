import siteInfo from '../global'
import ls from '../modules/_ls'
import request_base from './base'
//api url
let indexFirstLs_url = siteInfo.host + '/api/index.php?act=v_index&op=index_r_f_v_2W'
let indexFirst_url = siteInfo.host + '/api/index.php?act=v_index&op=index_r_f_v_2W'
let indexPoll_url = siteInfo.host + '/api/index.php?act=v_index&op=index_platform_d_pollW'
let indexThird_url = siteInfo.host + '/api/index.php?act=v_index&op=index_r_s_v_2W'
let indexUnionRank_url = siteInfo.host + '/api/index.php?act=union&op=get_index'
let getUnion_url = 'https://apit.17shanyuan.com/SelectUnion/select_union_W'
let getUnionByType_url = 'https://apit.17shanyuan.com/SelectUnion/select_union_step2_W'
let getBanner_url = siteInfo.host + '/api/index.php?act=ad&op=getIndexBanner'
//ls key
let indexFirstKey = 'indexFirstLs'
let localUnionKey = 'localUnion'

export const indexFirstLs = (lskey = indexFirstKey) => {
  let expire = ls.getExpiresKey(lskey)
  let data = ls.getLsItem(lskey+'D')
  if (!expire || !data) {
    return request_base.$httpGetWithLs(indexFirstLs_url, lskey)
  } else {
    return data
  }
}
export const indexFirst = () => request_base.$httpGetNoLs(indexFirst_url)

export const indexPoll = () => request_base.$httpGetNoLs(indexPoll_url)

export const indexThird = () => request_base.$httpGetNoLs(indexThird_url)

export const indexUnionRank = () => request_base.$httpGetNoLs(indexUnionRank_url)

export const getUnion = () => request_base.$httpGetNoLs(getUnion_url)

export const getUnionByType = (unionType) => request_base.$httpGetNoLs(getUnionByType_url+'?type='+unionType)

export const getLocalUnion = () => {
  return ls.getLsItem(localUnionKey)
}

export const saveUnion = (union) => {
  ls.setLsItem(localUnionKey, union)
}

export const getBanner = () => request_base.$httpGetNoLs(getBanner_url)