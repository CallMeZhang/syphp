<template>
  <div id="list_component">
    <div class="list_con">
      <ul>
        <li v-for="(item,index) in list" @click="fn(item[url],item[right])" >
        <!--<li v-for="(item,index) in list" @click="fn(item[url])" >-->
          <div class="clearfix">
            <div class="fl no-enter list_text">{{ item[text] }}</div>
            <div class="fr list_num">
              <div class="clearfix">
                <div class="fl margin_r2" style="color:#4A90E2;">{{ item[right] }}</div>
                <div class="fr bg_gt right_gt"></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import _appjs from '../../modules/_appJs/index.js'
  export default {
    name: 'list',
    props: {
      list:{
        type:Array,
        required: true
      },
      url:{
        type: String,
        default: 'url'
      },
      text:{
        type:String,
        default:'text'
      },
      right:{
        type:String,
        default:'num'
      }
    },
    methods:{
      fn(a,num){
        if(num === 0 || num === '0'){
          _appjs.syJsbAlert('未添加问题'); return false;
        }
        this._appjs.syJsbLaunchWebview(a);
      }
    }
  }
</script>
<style scoped>
  @import "/bocm/platformjs/static/css/common.css";

  #list_component{
    text-align: left;
    background: #f7f9fa;
  }
  .list_con{
    background: #fff;
    font-size: .28rem;
    padding:0 0.2rem;
  }
  .list_con li{
    height:.88rem;
    line-height: .88rem;
    box-sizing: border-box;
    border-bottom:1px solid #E9EBEF;
    color: #4b4f63;
    font-weight: 300;
  }
  .margin_r2{
    margin-right:.15rem;
  }
  .right_gt{
    box-sizing: border-box;
    margin-right:.08rem;
  }
  .list_con .fl,.list_con .fr{
    height:.88rem;
    line-height: .88rem;
  }

  .list_text{
    width:90%;
  }
  .list_num{
    width:10%;
    font-weight:300;
  }

</style>
