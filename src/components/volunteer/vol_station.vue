<template>
    <div>
      <div v-title="'志愿组织入驻'"></div>

      <!--<transition name="fade">-->
        <!--<loading v-show="isLoading"></loading>-->
      <!--</transition>-->

      <transition name="fade">
        <div>hello</div>
      </transition>

    </div>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
//  import {} from '@/requests/index'
//  import pop from '../components/common/popup.vue'

//  import Swiper from '../../../static/js/swiper-3.4.2.min'
  export default {
    data(){
        return {
//            isLoading:true
        }
    },
    created(){
        this.getData().then(()=>{
            //this.isLoading = false
        })
    },
    mounted(){

    },
    methods:{
        getData(){
            return this.$http.get()
        }

    },
    components:{loading}

  }
</script>

<style lang="scss" scoped>
@import "/bocm/platformjs/static/css/common.css";
</style>
