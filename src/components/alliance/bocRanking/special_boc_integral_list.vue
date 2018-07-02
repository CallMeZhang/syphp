<template>
  <div class="indie-integral">
    <div v-title="'个人扶贫光荣榜'"></div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading" class="indie-integral-con">
        <!--<div class="integral-con-top">{{union_name}}个人积分排名&ensp;&ensp;本排名每天更新一次</div>-->
        <div class="integral-con-top">本排名每天更新一次</div>
        <div class="ranking-list" v-for="(list, index) in integralLists" :key="index" @click="valIndex=-1;showToast(index)">
          <div class="left-con">
            <span :class="[{top1:list.member_rank == 1,top2:list.member_rank == 2,top3:list.member_rank == 3}]"></span><img
            v-lazy="list.member_avatar" alt="photo">
          </div>
          <div class="right-con">
            <div class="right-con-l">
              <p>{{list.member_truename}}</p>
              <p>{{list.boc_points}}积分</p>
            </div>
            <div class="right-con-c">{{list.circle_name}}</div>
            <div class="right-con-r">第{{index + 1}}名</div>
          </div>
          <!--toast-->
          <div class="ranking-t" :class="{'ranking-toast':valIndex == index}">{{list.circle_name}}</div>
        </div>
        <!--bottom-->
        <div class="footer">
          <!--<p>—— {{union_name}}<span style="color: rgb(153, 153, 153); font-size: 0.22rem;">个人积分排名</span>——</p>-->
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import loading from '@/components/loading/loading.vue'
  export default{
    data (){
      return {
        isLoading: true,
        union_name:'',//联盟名称
        union_code:'',
        jumpUrl:'',
        typeS:'',
        getDataDone: true,
        curPage: 1,//分页
        integralLists: [],
        valIndex:Number,
      }
    },
    mounted (){
      this.$nextTick(() => {
        window.addEventListener('scroll', this.handleScroll);
      })
    },
    created (){
      this.getData();
    },
    methods: {
      getData(){
        this.typeS = 'points';
        let url = this.siteInfo.host + '/api/index.php?act=union&op=get_special_dept_rank_list&circle_id='+this.$route.query.circle_id+'&type='+this.typeS+'&curpage='+this.curPage;
        this.$http.get(url).then((res) => {
          this.isLoading = false;
          if (res && res.data.code == 200) {
            let circleInfo = res.data.content.circle_info;
            this.union_name = circleInfo.circle_name;
            /*document.title = this.union_name  + '个人扶贫光荣榜';
            this._appjs.syJsbSetTitleText(this.union_name  + '个人扶贫光荣榜');*/
            if(res.data.content.list && res.data.content.list.length){
              this.integralLists = this.integralLists.concat(res.data.content.list);
            }
            this.curPage++;
            this.getDataDone = true;
          }else{
            console.log(res.message);
          }
        }, (error)=>{
          console.log(error);
        });
      },
      toast(str){
        Toast({message: str,position: 'center',duration: 1500});
      },
      showToast(index){
        this.$nextTick(()=>{
          this.valIndex = index;
          let _that = this;
          setTimeout(()=>{
            _that.valIndex = -1;
          },2000)
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
        if (offsetHeight - clientHeight - scrollTop <= 300 && this.getDataDone) {
          this.getData();
          this.unheight = true;
          this.getDataDone = false;
        }
      }
    },
    components: {
      'sy-loading': loading,
    },
  }
</script>
<style lang="scss" scoped>
  .indie-integral {
    width: 100%;
  }

  .indie-integral-con {
    width: 7.5rem;
    margin: 0 auto;
    text-align: left;
    .integral-con-top {
      padding: 0.14rem 0.3rem 0;
      background: #f7f9fa;
      color: #b1b1b1;
      font-size: .24rem;
    }
    .ranking-list {
      position:relative;
      display: flex;
      flex-flow: row wrap;
      height: 1.16rem;
      padding: 0 0.3rem;
      background: #fff;
    }
    .ranking-list .left-con {
      position: relative;
      display: flex;
      justify-content: center;
      flex-flow: row nowrap;
      align-items: center;
      width: 0.8rem;
      height: 1.16rem;
      padding-top: 0.1rem;
      .top1 {
        position: absolute;
        top: 0.1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        width: 0.36rem;
        height: 0.26rem;
        background: url("../../../../static/image/default/top1.png") no-repeat;
        background-size: cover;
      }
      .top2 {
        position: absolute;
        top: 0.1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        width: 0.36rem;
        height: 0.26rem;
        background: url("../../../../static/image/default/top2.png") no-repeat;
        background-size: cover;
      }
      .top3 {
        position: absolute;
        top: 0.1rem;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
        width: 0.36rem;
        height: 0.26rem;
        background: url("../../../../static/image/default/top3.png") no-repeat;
        background-size: cover;
      }
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }
    .ranking-list .right-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      padding-top: 0.1rem;
      font-size: 0.26rem;
      line-height: 0.4rem;
      color: #333;
      padding-left: 0.24rem;
      border-bottom: 1px solid #e0e0e0;
    }
    .right-con .right-con-l{
      width: 2.4rem;
      text-align:left;
      p{
        width: 2.4rem;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
      }
    }
    .right-con .right-con-c{
      display:flex;
      flex:1;
      height: 0.8rem;
      justify-content: center;
      align-items: flex-start;
      line-height: 0.4rem;
      text-align:left;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .right-con .right-con-r{
      width: 1.8rem;
      text-align: right;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
    }
    .footer{
      width: 100%;
      padding: 0.3rem 0;
      color: #b1b1b1;
      font-size: .22rem;
      background:#fff;
      p{
        width: 100%;
        text-align: center;
      }
    }
  }
  .ranking-t{
    display:none;
    visibility: hidden;
    position:absolute;
    padding:0.1rem;
    left:50%;
    top:50%;
    max-width:4rem;
    font-size:0.24rem;
    line-height:0.36rem;
    color:#fff;
    transform:translate(-50%,-50%);
    background:rgba(0,0,0,0.5);
    border-radius:0.08rem;
  }
  .ranking-toast{
    display:block;
    visibility: hidden;
    animation: tip-toast ease 2s;
  }
  @keyframes tip-toast {
    0% {
      visibility: visible;
    }
    25% {
      visibility: visible;
    }
    50% {
      visibility: visible;
      opacity: 1;
    }
    75% {
      visibility: visible;
    }
    100% {
      visibility: hidden;
      opacity: 0;
    }
  }
</style>
