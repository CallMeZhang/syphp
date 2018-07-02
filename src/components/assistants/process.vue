<template>
    <div class="top-content">
        <div v-if='msg.length>0' v-for="item in msg" class="list-div">
            <div class="year" v-if="item.year">{{item.create_time.substring(0, 4)}}年</div>
            <div class="month" v-if="item.month">
                {{parseInt(item.create_time.substring(5, 7))}}月
            </div>
            <div class="content-p">
                <div class="left">
                    <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/cr.png'" alt="" >
                    <div class="bg" v-if="item.type!=='3'" ></div>
                </div>
                <div class="right">
                    <div class="right-top-div">
                        <span class="time">{{item.create_time}}</span>
                        <span class="title">{{item.type | filterType}}</span>
                        <span class="del" v-if="item.can_del" @click="delFn" :msgId="item.note_id">删除</span>
                    </div>
                    <div class="content-div">
                        <div v-if="item.type==='1'">
                            <p class="content-default" v-if="item.type!=='3'">{{item.content}}</p>
                            <div class="img-list">
                              <div class="img-parent" v-for="urlItem in item.images_url" >
                                <img class="img-item" :src="urlItem" v-imgCenter>
                              </div>
                            </div>
                        </div>
                        <div v-else>
                            <img class="content-img" :src="item.images_url" alt="" v-if="item.images_url.length==1">
                            <p class="content-text" v-if="item.type!=='3'">{{item.content}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: [],
        state: {"time":{}},
        cur_page: 1,
        getDataDone:true
      }
    },
    mounted(){
    },
    created() {
      this.getDiaryList();
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleData(val){
        for(var i=0;i<val.length;i++){
          var time = val[i].create_time
          var year = time.substring(0, 4)
          var month = time.substring(5, 7)
          if(!this.state[year]){
            this.state['time'][time]=time
            this.state[year]=year
            val[i]['year']=true;
            val[i]['month']=true;

          }else{
            val[i]['year']=false;
            for(var key in this.state['time']){
              if(this.state['time'][key].substring(0, 7)!==time.substring(0, 7)){
                this.state['time'][time]=time
                val[i]['month']=true;
              }else{
                val[i]['month']=false;
              }
            }
          }
        }
        return val
      },
      delFn(e){
        let that = this
        that._appjs.syJsbConfirm('删除后不可恢复，确认删除吗？', "确认", '取消', (data) => {
          if(data) {
            that.delDiary(e)
          }
        })
      },
      delDiary(e){
        let msgId = e.target.attributes["msgId"].value
        let url = this.siteInfo.host + '/api/index.php?act=v_agent&op=del_agent_note&note_id=' + msgId
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            let $V_child = this.msg.length
            for (let i = 0; i < $V_child; i++) {
              if (msgId === this.msg[i].note_id) {
                this.state = {"time":{}}
                this.msg.splice(i, 1)
                this.msg=this.handleData(this.msg)
                break;
              }
            }
          } else {
            console.log('删除接口数据错误')
          }
        }, (error) => {
          console.log(error)
        })
      },
      handle(val){
        val.sort(function (a, b) {
          var firstArr = a.create_time.split("-")
          var secondArr = b.create_time.split("-")
          let i = 0;
          while (firstArr[i] && secondArr[i]) {
            if (firstArr[i] !== secondArr[i]) {
              return parseInt(firstArr[i]) < parseInt(secondArr[i])
              break;
            }
            i++
          }
        })
        return val
      },
      getDiaryList(){
        let agent_id = this.$route.params.agent_id
        let url = this.siteInfo.host + '/api/index.php?act=v_agent&op=get_agent_note&member_id='+agent_id+'&cur_page=' + this.cur_page
        this.$http.get(url).then((res) => {
          if (res.data.code === 200) {
            this.state = {"time":{}}
            this.msg = this.msg.concat(res.data.content)
            this.msg=this.handleData(this.msg)
            this.cur_page++;
            this.getDataDone=true
          } else {
            console.log('404 无数据')
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
        if (offsetHeight - clientHeight - scrollTop <= 50 && this.getDataDone) {
          this.getDiaryList();
          this.getDataDone = false
        }
      },
    },
    filters: {
      filterType(val){
        var str = "入驻平台"
        switch (val) {
          case "1":
            str = "";
            break;
          case "2":
            str = "发布爱心产品";
            break;
          case "3":
            str = "入驻平台";
            break;
        }
        return str
      }
    },
    components: {},
  }
</script>

<style lang="scss" scoped>
  .content-default {
    font-size: .30rem;
    color: #4B4F63;
    letter-spacing: 0;
    width: 6rem;
    font-weight: 300;
    line-height: 0.36rem;
  }

  .no-diary {
    padding: 2rem 0;
    text-align: center;
    font-size: .32rem;
    color: #B1B8C4;
    margin-bottom: 1.32rem;
    height: 0.45rem;
    line-height: 0.45rem;
  }

  .img-list {
    position: relative;
    overflow: hidden;
    margin-top: 0.23rem;
  }
  .img-parent{
    width: 1.86rem;
    height: 1.86rem;
    float: left;
    display: inline-block;
    margin: 0 0.1rem 0.1rem 0;
    position: relative;
    overflow: hidden;
  }
  .img-item {
    height: 1.86rem;
    width: 1.86rem;
    border: 0px;
  }

  .del {
    float: right;
    font-size: .28rem;
    color: #4A90E2;
    letter-spacing: 0;
  }

  .bg {
    height: 100%;
    width: 0.02rem;
    position: absolute;
    left: 50%;
    margin-left: -0.01rem;
    background: #4A90E2;
    top: 0.5rem;
  }

  .right-top-div {
    height: 0.37rem;
    margin-bottom: 0.2rem;
    line-height: 0.37rem;
  }

  .list-div {
    overflow: hidden;
    padding-right: 0.3rem;
  }

  .content-div {
    overflow: hidden;
  }

  .top-content {
    background: #fff;
    width: 100%;
    overflow: hidden;
  }

  .content-p {
    overflow: hidden;
    text-align: left;
    align-items: stretch;
    display: flex;
    margin-bottom: 0.11rem;
  }

  .right {
    width: 6rem;
    padding-bottom: 0.39rem;
  }

  .left {
    min-width: 1.2rem;
    flex: 1;
    position: relative;
  }

  .left img {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: -0.1rem;
    left: 50%;
    margin-left: -0.3rem;
  }

  .year, .month {
    font-size: .28rem;
    color: #4B4F63;
    letter-spacing: 0;
    text-align: left;
  }

  .year {
    margin-top: 0.33rem;
    margin-left: 0.3rem;
  }

  .month {
    height: 0.4rem;
    line-height: 0.4rem;
    margin: 0.23rem 0 0.25rem 0.37rem;
  }

  .time {
    font-size: .26rem;
    color: #666A7F;
    letter-spacing: 0;
    line-height: .37rem;
    margin-right: 0.3rem;
  }

  .title {
    font-size: .26rem;
    color: #818C9E;
    letter-spacing: 0;
    line-height: .37rem;
  }

  .content-img {
    width: 1.2rem;
    height: 0.84rem;
    float: left;
    margin-right: 0.16rem;
  }

  .content-text {
    float: left;
    font-size: .30rem;
    color: #4B4F63;
    letter-spacing: 0;
    width: 4.64rem;
    font-weight: 300;
    line-height: 0.42rem;
  }
</style>
