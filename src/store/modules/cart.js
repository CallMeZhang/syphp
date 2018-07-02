import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  userAddress: {true_name: '请选择', mob_phone: '地址', area_info: '', address: ''},
  allInfo: {},
  goods: [],
  dataList: [],
}

// getters
const getters = {
  userAddress: state => {
    return state.userAddress
  },
  dataList: state => {
    console.log(state.dataList)
    return state.dataList
  },
  allPay: state => {
    var count = 0
    for (var i = 0; i < state.dataList.length; i++) {
      for (var k = 0; k < state.dataList[i].goodsList.length; k++) {
        count += state.dataList[i].goodsList[k].goods_price * state.dataList[i].goodsList[k].count
      }
    }
    return count.toFixed(2)
  },
  allInfo: state => {
    console.log(state.allInfo)
    return state.allInfo
  },
  goods: state => {
    return state.goods
  },
}

// actions
const actions = {
  add_address ({commit}, payload) {
    commit('ADDRESS', payload)
  },
  add_goods ({commit}, payload) {
    commit('ADDGOODS', payload)
  }
}

// mutations
const mutations = {
  //里面为同步操作
  [types.DEL] (state, Payload) {
    for (var i = 0; i < state.dataList.length; i++) {
      if (Payload === state.dataList[i].address.address_id) {
        if (state.dataList.length - 1 <= 0) {
          alert('配送地址不能为空')
          return
        }
        state.dataList.splice(i, 1)
      }
    }
  },
  [types.SETINFO] (state, Payload) {
    state.allInfo = [JSON.parse(Payload)]
  },
  [types.DELCOUNT] (state, Payload) {
    var x = 0, y = 0, countx = 0, county = 0
    for (var i = 0; i < state.dataList.length; i++) {
      if (Payload.address_id === state.dataList[i].address.address_id) {
        for (var k = 0; k < state.dataList[i].goodsList.length; k++) {
          if (Payload.goods_id === state.dataList[i].goodsList[k].goods_id) {
            x = i
            y = k
            for (var j = 0; j < state.dataList[x].goodsList.length; j++) {
              countx += state.dataList[x].goodsList[j].count
            }
            //地址不能为0
            for (var j = 0; j < state.dataList.length; j++) {
              county += state.dataList[j].goodsList[y].count
            }
            if (countx > 1 && county > 1) {
              state.dataList[i].goodsList[k].count--
            } else if (county > 1) {
              alert('同一地址商品发货量不能为0')
            } else if (countx > 1) {
              alert('同一商品发货量不能为0')
            } else {
              alert('同一地址同一商品发货量都不能为0')
            }
            return
          }
        }
      }
    }
  },
  [types.SETCOUNT] (state, Payload) {
    var dataLength = state.dataList.length
    var x = 0, y = 0
    for (var i = 0; i < dataLength; i++) {
      if (Payload.address_id === state.dataList[i].address.address_id) {
        for (var k = 0; k < state.dataList[0].goodsList.length; k++) {
          if (Payload.goods_id === state.dataList[0].goodsList[k].goods_id) {
            x = i
            y = k
            var count = 0
            for (var n = 0; n < dataLength; n++) {
              if (n !== x) {
                count += state.dataList[n].goodsList[y].count
              }
            }
            state.dataList[x].goodsList[y].count = ''
            state.dataList[x].goodsList[y].count = parseInt(state.dataList[0].goodsList[y].goods_storage) - count
            return
          }
        }
      }
    }
  },
  [types.ADDCOUNT] (state, Payload) {
    var dataLength = state.dataList.length
    console.log(Payload)
    for (var i = 0; i < dataLength; i++) {
      if (Payload.address_id === state.dataList[i].address.address_id) {
        for (var k = 0; k < state.dataList[i].goodsList.length; k++) {
          if (Payload.goods_id === state.dataList[i].goodsList[k].goods_id) {
            var storage = 0
            for (var j = 0; j < dataLength; j++) {
              storage += parseInt(state.dataList[j].goodsList[k].count)
            }
            console.log(storage)
            if (storage < parseInt(state.dataList[i].goodsList[k].goods_storage)) {
              state.dataList[i].goodsList[k].count++
            }
            return
          }
        }
      }
    }
  },
  [types.ADDDATA] (state, Payload) {

    for (var i = 0; i < state.dataList.length; i++) {
      if (state.dataList[i].address.address_id === Payload.address_id) {
        alert('您选的地址已经存在！')
        return
      }
    }
    var goods = localStorage.getItem('goods')
    state.dataList.push({
      'goodsList': JSON.parse(goods),
      'address': Payload
    })
  },
  [types.UPDATA](state){
    if(state.dataList.length!==0){
      var goods = localStorage.getItem('goods')
      for(var i=0;i<state.dataList.length;i++){
        state.dataList[i].goodsList=JSON.parse(goods)
      }
    }
  },
  [types.ADDRESS] (state, Payload) {
    console.log(Payload)
    state.userAddress = Payload
  },
  [types.ADDGOODS] (state, Payload) {
    state.goods = Payload

  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
