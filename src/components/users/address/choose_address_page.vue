<template>
  <div>
    <ul v-if='dataList.length!=0' class="ul-wraper iphonex-margin-bottom">
      <li v-for="item in dataList" class="li-wrapper" @click="chooseAddresss(item)">
        <div class="div-wrepper-first">
          <span class="name">{{item.true_name}}</span>
          <span class="phone">{{item.mob_phone}}</span>
          <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/users/edit.png'" alt="" class="edit"
               @click.stop="goEdit(item.address_id)">
        </div>
        <div class="address">
          <span class="is-default" :class="item.is_default==1||'un-default'">{{item.is_default == 1 ? '默认' : ''}}</span>
          <span class="address-txt">{{item.area_info + item.address}}</span>
        </div>
      </li>
      <li class="blank"></li>
    </ul>
    <div v-if='dataList.length==0' class="no-address">
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/bizbuy/noaddress.png'" alt="">
      <p>暂无地址</p>
    </div>
    <div class="address-footer iphonex-margin-bottom">
      <div class="address-btn" @click="newAddress">新增地址</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataList: [],
        curpage: 1,
        getDataDone:true
      }
    },
    created () {
      document.title = '管理地址'
      this.getData()
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll(){
        var offsetHeight = document.body.scrollHeight
        var clientHeight = document.body.clientHeight
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        if (offsetHeight - clientHeight - scrollTop <= 50 && this.getDataDone) {
          this.getDataDone = false
          this.curpage++
          this.getData()
        }

      },
      goEdit (id) {
//        window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=add_address&address_id='+id
        this.$router.replace({path: '/add_address', query: {address_id: id}})
      },
      newAddress () {
//        window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=add_address'
        this.$router.replace({path: '/add_address'})
      },
      getData () {
        let url = this.siteInfo.host + '/api/index.php?act=bizbuy&op=biz_address_list&curpage=' + this.curpage
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            //this.dataList = res.data.content
            this.dataList = this.dataList.concat(res.data.content)
            if(res.data.content.length!=0)this.getDataDone=true

          } else if (res.data.code === 401) {
          }
        }, (error) => {
          console.log(error)
        })
      },
      chooseAddresss (address) {
        if (localStorage.getItem('routerParth') === '/addSendAddress') {
          if (localStorage.getItem('goodsAddress')) {
            var arrtype = JSON.parse(localStorage.getItem('goodsAddress'))
            if (arrtype.constructor === Array) {
              var flag = false
              for (var i = 0; i < arrtype.length; i++) {
                if (arrtype[i].address.address_id === address.address_id) {
                  arrtype[i].address = address
                  flag = true
                  break
                }
              }
              var obj = {address: address, goodsList: JSON.parse(localStorage.getItem('goods'))}
              flag || arrtype.push(obj)
              localStorage.setItem('goodsAddress', JSON.stringify(arrtype))
//              window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=add_send_address'
              this.$router.replace({path: '/addSendAddress'})
            }
          } else {
            var obj = {address: address, goodsList: JSON.parse(localStorage.getItem('goods'))}
            localStorage.setItem('goodsAddress', JSON.stringify([obj]))
          }
        } else {
          localStorage.setItem('addressPaper', JSON.stringify(address))
//          window.location.href=this.siteInfo.host + '/bocm/index.php?act=vbizbuy&op=biz_invoice'
          this.$router.replace({path: '/jicaiUnit'})
        }
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .blank {
    height: 1.88rem;
  }

  .ul-wraper {
    width: 100%;
    overflow: hidden;
    margin-top: 0.2rem;
    .li-wrapper {
      overflow: hidden;
      text-align: left;
      padding-left: 0.5rem;
      background: #fff;
      margin-bottom: 0.2rem;
      padding-bottom: 0.22rem;
      .div-wrepper-first {
        padding: 0.24rem 0 0.1rem 0;
        overflow: hidden;
      }
      .edit {
        width: 0.28rem;
        height: 0.27rem;
        float: right;
        margin-right: 0.3rem;
      }
      .name, .phone {
        font-size: .30rem;
        float: left;
        color: #4B4F63;
        font-weight: 300;
      }
      .name {
        margin-right: 0.3rem;
        width: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: justify;
      }
      .address {
        .is-default, .address-txt {
          float: left;
        }
        .is-default {
          margin-top: 0.1rem;
          width: 0.66rem;
          height: 0.34rem;
          text-align: center;
          line-height: 0.34rem;
          display: inline-block;
          box-sizing: border-box;
          font-weight: 300;
          font-size: .24rem;
          color: #4A90E2;
          border: 1px solid #4A90E2;
          border-radius: 0.08rem;
        }
        .un-default {
          border: 0;
          width: 0.66rem;
        }
        .address-txt {
          font-size: .26rem;
          color: #4B4F63;
          line-height: .40rem;
          width: 4.6rem;
          display: inline-block;
          margin-left: 0.64rem;
          font-weight: 300;
        }
      }
    }
  }

  .no-address {
    overflow: hidden;
    img {
      width: 2.12rem;
      height: 2.23rem;
      display: block;
      margin: 0 auto;
      margin-top: 3.81rem;
    }
    p {
      padding-top: 0.65rem;
      text-align: center;
      font-size: .32rem;
      color: #DADEE4;
    }
  }

  .address-footer {
    position: fixed;
    bottom: 0rem;
    width: 100%;
    background: #f4f6f5;
    .address-btn {
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: .32rem;
      color: #FFFFFF;
      background: #4A90E2;
    }
  }

</style>
