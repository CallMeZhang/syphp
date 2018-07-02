<template>
  <div class="container">
    <div v-title="'订阅公益项目'"></div>
    <form class="subscibe-con" action="/api/index.php?act=wallet&op=saveConcernTag" method="post">
      <p class="subscibe-tip">
        <span>订阅感兴趣的公益项目</span>
        <img @click="closeX()" class="icon-q" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/sywall/q_mark3x.png'" alt="?">
      </p>
      <div class="items">
        <div class="item-con" v-for="(item, index) in itemList" @click="getClick(index)">
          <p class="item" :class="{'add-bg2':item.checked}">{{item.tag_name}}</p>
        </div>
      </div>

      <div class="check-all" @click="selectAll()">
        <span class="icon-con"><img v-show="iconT" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/default/icon-agree.png'" alt="correct.png"></span>
        <p class="all-d">{{checkboxTxt ? "取消全选":"全部订阅"}}</p>
      </div>
      <input @click="send" type="button" class="subscibe-btn" value="保存"/>
    </form>
    <pop-up v-if="slected" v-bind:is-subscibe="slected" @subscibe-pop-up="closeX"></pop-up>

  </div>
</template>
<script>
  import app from '../../../modules/_appJs/index.js'
  import popUp from './common/popups.vue'
  export default {
    data () {
      return {
        iconT: false,
        checkboxTxt: false,
        slected : false,
        initSelect:false,
        tip: true,
        itemList: [],
      }
    },
    computed: {

    },
    components: {
      'pop-up': popUp
    },
    created () {
      this.getData()
    },
    methods: {
      getData(){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=wallet&op=getProjectAllTag').then(res => {
          if(res.data.code == 401){
            this.$toast('未登录！')
          }else if(res.data.code == 200){
            this.itemList = res.data.content
          }
        })
      },
      getClick(index){
        this.itemList[index].checked = !this.itemList[index].checked
        this.iconT = !true
        this.checkboxTxt = !true
      },
      selectAll(){
        this.iconT = this.initSelect = this.flag = !this.initSelect;
        this.itemList.forEach(item=>{
          item.checked = this.flag
        })
      },
      send () {
        let list = this.itemList.filter((item) => {
          return item.checked === true
        })
        let numList = []
        for (var i = 0; i < list.length; i++) {
          numList.push(list[i].tag_id)
        }
        if (numList.length == 0) {
          this.$toast('请至少选择一个项目分类后保存')
        } else {
          var qs = require('querystring')
          this.$http.post(this.siteInfo.host + '/api/index.php?act=wallet&op=saveConcernTag', qs.stringify({'tags[]': numList})).then(res => {
            if(res.data.code == 200){
              let url = this.siteInfo.host + '/bocm/index.php?act=wallet_router&op=sywall_index'
              this._appjs.syJsbLaunchWebview(url)
//              this._appjs.syJsbCloseAppPage()
            }else{
              this.$toast('保存失败！')
            }

          })
        }
      },
      closeX(){
        this.slected == false ? this.slected = true : this.slected = false
      }
    },
    watch:{
      'itemList' : {
        handler:function(val) {
          let index = val.find(item=>{
            return item.checked === false
          })
          index?this.iconT =this.checkboxTxt = false:this.iconT = this.checkboxTxt = true
        },
        deep: true
      }
    }

  }
</script>
<style lang="scss" scoped>
  input[type="checkbox"] {
    /*visibility: hidden;*/
  }

  .subscibe-con {
    width: 100%;
    height: 100%;
    /*background: #F7F9FA;*/
    text-align: left;
    overflow: hidden;
    .subscibe-tip {
      position: relative;
      padding: 0 0.3rem;
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.26rem;
      color: #666A7F;
      font-weight: 300;
      .icon-q {
        width: 0.29rem;
        height: 0.29rem;
        margin-left: 0.05rem;
        position: absolute;
        top: 50%;
        margin-top: -0.145rem;
      }
    }
    .items {
      display: flex;
      flex-flow: row wrap;
      padding: 0.3rem 0.3rem 0 0.3rem;
      /*padding-top:0.3rem;*/
      background: #fff;
      justify-content: space-between;
      .item-con {
        position: relative;
        .item {
          display: inline-block;
          margin-bottom: 0.3rem;
          align-self: flex-start;
          width: 2rem;
          height: 0.7rem;
          line-height: 0.7rem;
          font-size: 0.28rem;
          text-align: center;
          border: 1px solid #4A90E2;
          -webkit-border-radius: 0.08rem;
          -moz-border-radius: 0.08rem;
          border-radius: 0.08rem;
          color: #4A90E2;
          font-weight: 300;
        }
      }
      .hide-checkbox {
        position: absolute;
        left: 0;
        top: 0;
      }
      .add-bg {
        background: #4A90E2;
        color: #FFFFFF;
      }
      .add-bg2 {
        background: #4A90E2;
        color: #fff!important;
      }
    }
    .check-all {
      position: relative;
      padding: 0 0.3rem;
      font-size: 0.26rem;
      line-height: 0.33rem;
      color: #666A7F;
      margin-top: 0.3rem;
      .icon-con {

        position: absolute;
        left: 0.28rem;
        top: -0.03rem;
        z-index: 2;
        display: inline-block;
        width: 0.28rem;
        height: 0.28rem;
        border: 1px solid #aaa;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .all-d {
        margin-left: 0.5rem;
      }
      .btn-check {
        border: none;
        background: none;
        line-height: 0.32rem;
        color: #666A7F;
      }
    }
    .subscibe-btn {
      position: fixed;
      left: 50%;
      margin-left: -3.45rem;
      bottom: 0.9rem;
      width: 6.9rem;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.32rem;
      color: #FFFFFF;
      background: #4A90E2;
      -webkit-border-radius: 0.08rem;
      -moz-border-radius: 0.08rem;
      border-radius: 0.08rem;
    }
    .tip {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      max-width: 6.9rem;
      padding: 0.27rem 0.6rem;
      font-size: 0.36rem;
      line-height: 0.5rem;
      color: #fff;
      background: rgba(0, 0, 0, 0.70);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-border-radius: 0.1rem;
      -moz-border-radius: 0.1rem;
      border-radius: 0.1rem;
    }
    .hide {
      display: none;
    }
    .show {
      display: block;
    }
  }
</style>
