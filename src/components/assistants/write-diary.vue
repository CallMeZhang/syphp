<template>
    <div class="top-content">
        <div v-title="'扶贫日记'"></div>
        <process></process>
        <div class="tab-one-footer">一起善源 爱 · 源于善</div>
        <div class="iphonex-div"></div>
        <div class="write-diary iphonex-padding-bottom" @click="addDiary">
            <div class="write-btn">写日记</div>
        </div>
    </div>
</template>

<script>
  import Process from "./process.vue"
  export default {
    data() {
      return {}
    },
    created() {
	  this._appjs.syJsbSetTitleText('扶贫日记')
      let that = this
      window.goBack = function() {
        that._appjs.syJsbCloseAppPage()
      }
      let info = that._appjs.syJsbGetAppVersion()
      if (info['platform'] === 'ios' || info['platform'] === 'android') {
        that._appjs.syJsbSetGoBackUrl("goBack()");
      }
    },
    methods: {
      addDiary(){
        let agent_id = this.$route.params.agent_id
        window.location.href = this.siteInfo.host + '/bocm/index.php?act=home&op=agent_edit_note_page';
      },
    },
    components: {Process}
  }
</script>

<style lang="scss" scoped>
    .top-content {
      width: 100%;
      overflow: hidden;
    }
    .tab-one-footer {
        background: #F7F9FA;
        font-size: .24rem;
        color: #DADEE4;
        letter-spacing: 0;
        height: 0.5rem;
        line-height: 0.5rem;
      margin-bottom: 1rem;
    }
    .write-diary {
        background: #fff;
        position: fixed;
        bottom: 0;
        text-align: center;
        width: 100%;
    }
    .write-btn{
        font-size: .32rem;
        color: #FFFFFF;
        height: 1rem;
        line-height: 1rem;
        background: #4A90E2;
    }
</style>
