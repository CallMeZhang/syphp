<template>
  <div class="selectunion">
    <div v-title="'选择您的公益联盟'"></div>
    <transition name="fade">
      <loading v-show="isLoading"></loading>
    </transition>
    <transition name="fade">
      <div class="wrapper">
        <!--选择联盟tab-->
        <div class="selectTab">
          <ul class="clearfix">
            <li :class="type == ''?'selected':''" @click="getSelect()">全部</li>
            <li :class="type == 'STATE'?'selected':''" @click="getSelect('STATE')">地方政府</li>
            <li :class="type == 'COMPANY'?'selected':''" @click="getSelect('COMPANY')">公益企业</li>
          </ul>
        </div>
        <!--相关联盟-->
        <div class="selectContent">
          <ul class="clearfix ">
            <li class="fl" v-for="item in list" @click="select_dept(item.union_channel,item.registable)">
              <div class="selContent">
                <img v-lazy="item.union_image" alt="联盟图标">
                <p class="selName">{{item.union_name}}</p>
                <p class="selNum" v-if="item.registable == 1">{{item.regist_count}}人</p>
                <p class="selNum" v-if="item.registable == 2">即将入驻</p>
              </div>
            </li>
          </ul>
          <div class="iphonex-div"></div>
        </div>
        <!--footer-->
        <div class="selFooter-c iphonex-padding-bottom">
          <div class="selFooter">
            <p @click="goUrl()">
              未找到联盟？以益客身份加入 ></p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loading from '@/components/loading/loading.vue'
  export default{
    data(){
      return {
        isLoading: false,
        type: '',
        list: [],
        gender:'',
        member_truename:'',
        member_avatar:''
      }
    },
    components: {
      loading
    },
    created(){
      this.getData()
    },
    methods: {

      getData(type){
        this.$http.get(this.siteInfo.host + '/api/index.php?act=union&op=getJoinableUnionList&type=' + type).then((res) => {
          this.list = res.data.data
        })
      },
      getSelect(tab){
        switch (tab) {
          case '':
            this.type = ''
            this.getData()
            break;
          case 'STATE':
            this.type = 'STATE'
            this.getData('STATE')
            break;
          case 'COMPANY':
            this.type = 'COMPANY'
            this.getData('COMPANY')
            break;
          default:
            this.type = ''
            this.getData()
        }
      },
      select_dept(name, registable){
        if (registable == 2) {
          this.$toast('企业正在筹备中，即将开放入驻')
          return
        } else {
//          console.log(this.gender,this.member_truename,this.member_avatar)
          window.location.href = this.siteInfo.host + '/bocm/index.php?act=common&op=select_dept_v1&select_channel=' + name
        }
      },
      goUrl(){
        window.location.href = this.siteInfo.host+'/bocm/index.php?act=common&op=weal_club_v1'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .selectunion {
    height: 100%;
    width: 100%;
  }

  .wrapper {
    width: 100%;
    background: #fff;
  }

  .selectTab {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background: #fff;
  }

  .selectTab ul {
    width: 5.6rem;
    margin: 0 auto;
    padding: 0.3rem 0;
  }

  .selectTab li {
    box-sizing: border-box;
    float: left;
    width: 1.8rem;
    height: 0.7rem;
    line-height: 0.7rem;
    color: #3B7CEC;
    font-size: 0.28rem;
    border: 1px solid #3B7CEC;
    margin-left: -1px;
  }

  .selectTab li:first-child {
    -webkit-border-radius: 2rem 0 0 2rem;
    -moz-border-radius: 2rem 0 0 2rem;
    border-radius: 2rem 0 0 2rem;
  }

  .selectTab li:last-child {
    -webkit-border-radius: 0 2rem 2rem 0;
    -moz-border-radius: 0 2rem 2rem 0;
    border-radius: 0 2rem 2rem 0;
  }

  .selected {
    background: #3B7CEC;
    color: #fff !important;
  }

  .selectContent {
    padding-top: 1rem;
    padding-bottom: 1.2rem;
  }

  .selectContent li {
    margin-top: 0.7rem;
    width: 33.3%;
    padding: 0 0.15rem;
    box-sizing: border-box;
  }
  .selectContent li div {
    width: 100%;
    text-align: center;
  }

  .selectContent li div img {
    width: 1.2rem;
    height: 1.2rem;
    margin-bottom: 0.37rem;
  }

  .selectContent li .selName {
    font-size: 0.3rem;
    color: #4B4F63;
    line-height: 0.42rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .selectContent li .selNum {
    font-size: 0.24rem;
    color: #666A7F;
    line-height: 0.33rem;
  }
  .selFooter-c{
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
  }
  .selFooter {
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    background: #4A90E2;
    color: #fff;
    text-align: center;
    font-size: 0.28rem;
  }
</style>
