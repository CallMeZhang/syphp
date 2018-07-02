<template>
  <div></div>
</template>
<script>
  export default {
    data(){
      return{
        code_type:''
      }
    },
    created(){
      this.code_type = this.$route.query.code_type
      let that = this
      setTimeout(()=>{
        console.log(that.code_type)
        that.getLogin()
      },500)
    },
    methods:{
      getLogin(){
        let callback = encodeURIComponent(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=qrcode_go_volunteer&code_type='+this.code_type)
        let url = this.siteInfo.host + '/api/index.php?act=login&callback=' +callback
        this._appjs.syJsbLaunchWebview(url)
      }
    }
  }
</script>

