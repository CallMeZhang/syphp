<template>
  <div id="help_center">
    <div v-title="app_title"></div>
    <div>
      <div class="list_title">
        <p>{{ topTitle }}</p>
      </div>
      <list-content :list="content" :text="'article_title'" :url="'url'"></list-content>
    </div>
  </div>
</template>
<script>
  import listContent from '../list/list.vue'
  export default {
    data(){
      return {
        app_title:'',
        topTitle:'',
        content:[],
      }
    },
    created(){
      this.app_title = this.$route.query.app_title
      this.getData()
    },
    methods:{
      getData(){
        let ac_id = this.$route.query.ac_id
        let hotUrl = this.siteInfo.host + '/api/index.php?act=helpcenter&op=article_list&ac_id='+ac_id
        this.$http.get(hotUrl).then(res => {
          if(res.data.code != 200){console.log('接口错误'); return}
          this.topTitle = res.data.content.ac_title;
          let data = res.data.content.article_list;
          console.log(data)
          data.forEach(item =>{
//          item.url = this.siteInfo.host + '/api/index.php?act=helpcenter&op=article_list&page=0&toTop=1&a&ac_id='+item.ac_id+'&num=10&ajax=1'
            item.url = item.detail_url

          });
          this.content = data
        })
      }
    },
    components:{
      'list-content':listContent
    }
  }
</script>
<style scoped>
  @import "/bocm/platformjs/static/css/common.css";

  #help_center{
    text-align: left;
    background: #F4F5F6;
  }
  .list_title{
    font-size: .24rem;
    line-height: .28rem;
    padding:.35rem 0 .2rem .2rem;
    background: #f7f9fa;
    color: #4b4f63;
  }
  .list_title p{
    color: #4b4f63;
  }
  .bottom_bar{
    bottom:0;
    left:0;
    width:100%;
    border-top:1px solid #ccc;
    height:.88rem;
    line-height: .88rem;
  }
  .bottom_text{
    color:#66B2EA;

  }

</style>
