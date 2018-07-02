import siteInfo from '../global'
import ls from '../modules/_ls'
import request_base from './base'
//api url
let getChildrenAddressByIdUrl = siteInfo.host + '/api/index.php?act=member&op=getChildrenAddressById'
let getAddressInfoByIdUrl = siteInfo.host + '/api/index.php?act=member&op=getAddressInfo'

export const getChildrenAddressById = (parent_area_id) => request_base.$httpGetNoLs(getChildrenAddressByIdUrl+'&parent_area_id='+parent_area_id)

export const getAddressInfoById = (address) => request_base.$httpGetNoLs(getAddressInfoByIdUrl+'&address_id='+address)

