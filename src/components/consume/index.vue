<template>
  <div class="consume">
    <p>公益消费产生于{{area_name}}的证明</p>
    <table id="table-4">
      <tr>
        <td class="time">下单时间</td>
        <td class="number">订单号</td>
        <td>买家姓名</td>
        <td>订单金额</td>
        <td>买家类型</td>
      </tr>
      <tr v-for="item in dataList">
        <td class="time">{{item.add_time}}</td>
        <td class="number">{{item.order_sn}}</td>
        <td>{{item.buyer_name}}</td>
        <td>￥{{item.order_amount}}</td>
        <td>{{item.buyer_type_name}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        curPage: 1,
        getDataDone: true,
        dataList: [],
        area_id: '',
        area_name: ''
      }
    },
    created () {
      this.area_id = this.$route.query.area_id
      this.getData()
    },
    methods: {
      handleScroll () {
        var offsetHeight = document.body.scrollHeight
        var clientHeight = document.body.clientHeight
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        if (offsetHeight - clientHeight - scrollTop <= 50 && this.getDataDone) {
          this.getDataDone = false
          this.curPage++
          this.getData()
        }
      },
      getData () {
        let url = this.siteInfo.host + '/api/index.php?act=areadetail&op=area_order_detail&area_id=' + this.area_id + '&curpage=' + this.curPage
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            if (res.data.content.list.length !== 0) {
              this.getDataDone = true
              this.area_name = res.data.content.area_name
              this.dataList = this.dataList.concat(res.data.content.list)
            } else {
              this.getDataDone = false
            }
          } else if (res.data.code === 401) {
            window.location.href = this.siteInfo.host + '/bocm/index.php?act=areadetail&op=login&area_id=' + this.area_id
          }
        }, (error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .consume {
    width: 100%;
    box-sizing: border-box;
    p {
      text-align: center;
      font-size: 0.28rem;
      padding: 0.3rem 0;
    }
    /* Border styles */
    #table-4 {
      width: 100%;
      word-wrap: break-word;
      word-break: break-all;
    }
    #table-4 thead, #table-4 tr {
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: rgb(211, 202, 221);
    }
    #table-4 {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: rgb(211, 202, 221);
    }

    /* Padding and font style */
    #table-4 td, #table-4 th {
      padding: 15px 2px;
      font-size: 12px;
      font-family: Verdana;
      color: rgb(95, 74, 121);
    }

    /* Alternating background colors */
    #table-4 tr:nth-child(even) {
      background: rgb(223, 216, 232)
    }
    #table-4 tr:nth-child(odd) {
      background: #FFF
    }
  }
</style>
