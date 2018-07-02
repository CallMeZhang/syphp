<template>
  <div id="help_center">
    <div v-title="'全部问题'"></div>
    <div>
      <div class="list_title">
        <p>{{ topTitle }}</p>
      </div>
      <list-content :list="content" :text="'ac_name'" :url="'url'" :right="'article_num'"></list-content>
    </div>
  </div>
</template>
<script>
  import listContent from '../list/list.vue'
  export default {
    data(){
      return {
        topTitle:'',
        content:[],
        showBottomBar:true,
        showAllQuestion:'',
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        let hotUrl = this.siteInfo.host + '/api/index.php?act=helpcenter&op=class_list'
        this.$http.get(hotUrl).then(res => {
          if(res.data.code != 200){console.log('接口错误'); return}
          this.topTitle = res.data.content.ac_title;
          let data = res.data.content.category_list;
          data.forEach(item =>{
            item.url = item.article_list_url
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
    background:#f7f9fa;
    color:#4b4f63;
  }
  .list_title p{
    color:#4b4f63;
  }


</style>
