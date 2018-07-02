<template>
    <div class="footer-content">
        <div class="line"></div>
        <div class="footer">
            <a :href="this.siteInfo.host + '/bocm/index.php?act=bocfx&op=index&appVariant=pwcn&wfrom='+this.wfrom+'&from='+this.wfrom+'&channel=boc#/' + this.index_tpl"><div class="tuijian tb"><img :src="tuijian_icon" alt=""><div :class="this.$route.path=='/wx_index' ? 'tb-zi tb-zi-sel' : 'tb-zi'">精品推荐</div></div></a>
            <a :href="this.siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&appVariant=pwcn&wfrom='+this.wfrom+'&from='+this.wfrom+'&channel=boc'" ><div class="allproduct tb"><img :src="product_icon" alt=""><div class="tb-zi">全部产品</div></div></a>
            <a :href="this.siteInfo.host + '/bocm/index.php?act=bocfx&op=member_home&appVariant=pwcn&wfrom='+this.wfrom+'&from='+this.wfrom+'&channel=boc#/wx_myorder'" ><div class="myorder tb"><img :src="mylist_icon" alt=""><div :class="this.$route.path=='/wx_myorder' ? 'tb-zi tb-zi-sel' : 'tb-zi'">我的订单</div></div></a>
        </div>
    </div>
</template>
<script>
    export default {
        created: function () {
            this.updateUrl();
            this.updateToolBar();
        },
        data () {
            return {
                tuijian_icon:'',
                product_icon:'',
                mylist_icon:'',
                wfrom:'',
                index_tpl:''
            }
        },
        methods: {
            updateUrl () {
                this.wfrom=this.getQueryString('wfrom');
//                if (this.wfrom === 'wx_boctw'){
//                    this.index_tpl = 'wx_index'
//                }else {
//                    this.index_tpl = 'wx_index_v2'
//                }
                this.index_tpl = 'wx_index';
            },
            updateToolBar(){
                this.tuijian_icon=this.siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/tuijian.png';
                this.product_icon=this.siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/product1.png';
                this.mylist_icon=this.siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/mylist.png';
                if(this.$route.path=='/wx_index' || this.$route.path=='/wx_index_v2'){
                    this.tuijian_icon=this.siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/tuijian-sel.png';
                }else if(this.$route.path=='/wx_myorder'){
                    this.mylist_icon=this.siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/mylist-sel.png';
                }
            },
            getQueryString(name)
            {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)return unescape(r[2]);
                return '';
            }
        }
    }
</script>
<style scoped>
    .footer-content{width:7.5rem;position: fixed;bottom: 0; background: #fff;z-index:99999;}
    .footer { width: 100%; height: 0.96rem; display: -webkit-flex; display: flex; justify-content: space-around; align-items: center;margin:0 auto;}
    .tb {  width: 1rem;height: 0.8rem;text-align: center;margin-top: 0.08rem;}
    .tb img {  width: 0.48rem;  height: 0.48rem;  margin: 0 auto; }
    .tb-zi{  width: 1rem;  height: 0.28rem; line-height: 0.28rem; font-family: PingFangSC-Regular;  font-size: 0.2rem;color: #666666;text-align: center;}
    .tb-zi-sel{color: #F31e37}
    @media (max-height: 400px) {
        .footer-content {
            display: none;
        }
    }
</style>
