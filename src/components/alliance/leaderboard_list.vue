<template>
  <div class="wrapper" :class="!unheight||'unheight'">
    <div v-title="'精准扶贫报告'"></div>
    <div class="for-li" v-for="(item, index) in TopList">
      <div class="titContent clearfix">
        <div class="left fl">
          <span class="pubColor fl num">{{index | indexFilter}}</span>
          <span class="adress">{{item.circle_name}}</span>
        </div>
        <div class="right fr">
          <span class="pubColor" v-if="list=='staff'">{{item.count_num > 100 ? 100 : item.count_num}}</span>
          <span class="pubColor" v-else>{{item.count_num}}</span>
          <span v-if="list=='order_avg'">元/人</span>
          <span v-if="list=='member'">人</span>
          <span v-if="list=='order_amount'">元</span>
          <span v-if="list=='staff'">%</span>
        </div>
      </div>
      <div class="redLine" v-if="list !== 'staff'">
        <p v-if="Number(TopList[0].count_num)" class="p progress" :class="{'bg-light': index>=3}" :index='index'
           :style="{width:100*item.count_num/TopList[0].count_num+'%'}"></p>
        <p v-if="!Number(TopList[0].count_num)" class="p progress" :class="{'bg-light': index>=3}" :index='index'
           style="width:0%;"></p>
      </div>
      <div class="redLine" v-if="list === 'staff'">
        <p v-if="Number(TopList[0].count_num)"
           class="p progress" :class="{'bg-light': index>=3}" :index='index'
           :style="{width:item.count_num +'%'}"></p>
        <p v-if="!Number(TopList[0].count_num)"
           class="p progress" :class="{'bg-light': index>=3}" :index='index'
           style="width: 0%"></p>
      </div>
    </div>
    <div class="footer">
      <p>—— {{name}} <span v-if="list==='member'" style="color: #999;font-size:0.22rem;">累计注册</span>
        <span v-if="list==='order_avg'" style="color: #999;font-size:0.22rem;">人均消费金额</span>
        <span v-if="list==='order_amount'" style="color: #999;font-size:0.22rem;">累计消费金额</span>
        <span v-if="list==='staff'" style="color: #999;font-size:0.22rem;">累计注册比率</span>
        <span>{{val}}</span>
        <span v-if="list==='order_avg'">元/人</span>
        <span v-if="list==='member'">人</span>
        <span v-if="list==='order_amount'">元</span>
        <span v-if="list==='staff'">%</span> ——</p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        curpage: 1,
        TopList: [],
        union_id: '2',
        list: 'member',
        getDataDone: true,
        name: '公益国电',
        val: 0,
        unheight: false
      }
    },
    created () {
      this.union_id = this.$route.query.union_id
      this.list = this.$route.query.list
      this.getData()
    },
    components: {},
    filters: {
      indexFilter: function (num) {
        num = (num + 1) > 9 ? (num + 1) : '0' + (num + 1)
        return num
      },
      registNum: function (val) {
        val = val > 100 ? 100 : val
        return val
      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      getData () {
        //let url = 'https://t2.17shanyuan.com/bocm/index.php?act=test&op=get_list&union_id='+this.union_id+'&list='+this.list+'&page='+this.curpage
        let url = this.siteInfo.host + '/api/index.php?act=union&op=get_list&union_id=' + this.union_id + '&list=' + this.list + '&page=' + this.curpage
        this.$http.get(url).then((res) => {
          if (res.data.code === 200 && res.data.content.length !== 0) {
            //this.memberList=this.memberList.concat(res.data.content.top_list.member_top_list)
            this.name = res.data.content.union_info.union_name
            if (this.list === 'member') {
              this.val = res.data.content.union_info.full_total_member
              this.TopList = this.TopList.concat(res.data.content.top_list.member_top_list)
            } else if (this.list === 'order_avg') {
              this.val = res.data.content.union_info.full_total_pay_order_avg
              this.TopList = this.TopList.concat(res.data.content.top_list.order_avg_top_list)
            } else if (this.list === 'order_amount') {
              this.val = res.data.content.union_info.full_total_pay_order_amount
              this.TopList = this.TopList.concat(res.data.content.top_list.order_amount_top_list)
            } else if (this.list === 'staff') {
              this.val = res.data.content.union_info.full_total_register_percent
              this.TopList = this.TopList.concat(res.data.content.top_list.staff_top_list)
              for(var i =0;i<this.TopList.length;i++){
                if(this.TopList[i].count_num>100){
                  this.TopList[i].count_num = 100
                }
              }
            }
            this.curpage++
            this.getDataDone = true
          } else {
            console.log(res.data.code + ' 404 无数据')
          }
        }, (error) => {
          console.log(error)
        })
      },
      handleScroll(){
        var offsetHeight = document.body.scrollHeight
        var clientHeight = document.body.clientHeight
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        if (offsetHeight - clientHeight - scrollTop <= 80 && this.getDataDone) {
          this.getData()
          this.unheight = true
          this.getDataDone = false
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    padding: 0.3rem;
    background: #fff;
    height: 110%;
  }

  .unheight {
    height: auto;
  }

  .for-li {
    text-align: left;
    margin-bottom: 0.3rem;
  }

  span {
    color: #999;
    font-size: .26rem;
  }

  .pubColor {
    color: #4A90E2;
    font-weight: 600;
  }

  .num {
    margin-right: 0.23rem;
    line-height: 0.33rem;
    display: inline-block;
    width: 0.4rem;
    text-align: right;
  }

  .adress {
    width: 4.3rem;
    font-size: 0.24rem;
    line-height: 0.33rem;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .redLine {
    margin-top: .15rem;
    margin-left: .6rem;
    width: 90%;
    height: .1rem;
    border-radius: .1rem;
  }

  .progress {
    width: 100%;
    height: 100%;
    border: 1px solid #4A90E2;
    border-radius: .1rem;
    background: rgba(74, 144, 226, .6);
  }

  .footer {
    width: 100%;
    margin-top: 0.3rem;
    color: #b1b1b1;
    font-size: 0.22rem;
  }

  .footer p {
    width: 100%;
    text-align: center;
  }

  .footer p span {
    color: #0b0b0b;
  }

  .bg-light {
    background: #edf4fc;
  }
</style>
