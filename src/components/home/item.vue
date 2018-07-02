<template>
    <div>
        <div class="v3-me-samlltit color-gray">{{itemTitle.title}}</div>
        <div class="v2-zizhu bg">
            <div v-for="(item, index) in itemTitle.items">
                <div class="v2-zizhu-list active" @click="_appjs.syJsbLaunchWebview(item.touch_url)" v-if="item.touch_url">
                    <div class="v2-zizhu-list-L">{{item.leftText}}</div>
                    <div class="v2-zizhu-list-R"></div>
                    <div class="v2-zizhu-list-C">{{item.rightText}}</div>
                </div>
                <div class="v2-zizhu-list active" v-if="!item.touch_url" @click="item.alert_text && _appjs.syJsbAlert(item.alert_text)">
                    <div class="v2-zizhu-list-L">{{item.leftText}}</div>
                    <div class="v2-zizhu-list-C">{{item.rightText}}</div>
                </div>
                <div class="line" v-if="index+1 < itemTitle.items.length"></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: [
      'itemTitle'
    ],
    data () {
      return {
        member_info: {},
        order_state: '',
        isPoor: false,
        isAgent: false
      }
    }
  }
</script>

<style scoped>
  .v3-me-samlltit{ line-height:0.66rem; padding-left:0.24rem; font-size:0.24rem;text-align: left;}
  .color-gray{color:#818C9E;}
  body .line{background: #DADEE4;}
  .v2-zizhu-list-C{color: #818C9E;}
</style>
