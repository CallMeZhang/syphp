<template>
    <div class="container contentbox bg">
        <div v-title="'公益中行'"></div>
        <div class="index-box">
            <ul class="me-top-box">
                <li class="me-top-box-L"><img  :src="memberInfo.avatar_url"  alt="正努力加载…"></li>
                <li class="me-top-box-C">
                    <div class="new-name">{{memberInfo.user_name}}</div>
                    <div class="new-person-lable">{{roleName}}</div>
                    <div class="new-person-tit">感谢您参与{{memberInfo.channel_name}}公益精准扶贫{{memberInfo.support_day}}天。<br>担当社会责任，我们一起行动。</div>
                </li>
            </ul>
        </div>
        <div class="v2-zizhu bg">
            <a :href="siteInfo.host + '/bocm/index.php?act=zywallet&op=zywallet_index'">
            <div class="v2-zizhu-list active">
                <div class="v2-zizhu-list-L">中益钱包</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C">{{memberInfo.points}}积分</div>
            </div>
            </a>
            <div class="line"></div>
            <a :href="siteInfo.host + '/bocm/index.php?act=project&op=my_support_poor_order_list'">
            <div class="v2-zizhu-list active">
                <div class="v2-zizhu-list-L">全部订单</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C"></div>
            </div>
            </a>
            <div class="line"></div>
            <a :href="siteInfo.host + '/bocm/index.php?act=project&op=my_support_poor_order_list&order_state=1'">
            <div class="v2-zizhu-list active">
                <div class="v2-zizhu-list-L">待付款</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C"></div>
            </div>
            </a>
            <div class="line"></div>
            <a :href="siteInfo.host + '/bocm/index.php?act=project&op=my_support_poor_order_list&order_state=15'">
            <div class="v2-zizhu-list active">
                <div class="v2-zizhu-list-L">待发货</div>
                <div class="v2-zizhu-list-R"></div>
                <div class="v2-zizhu-list-C"></div>
            </div>
            </a>
            <div class="line"></div>
            <a :href="siteInfo.host + '/bocm/index.php?act=project&op=my_support_poor_order_list&order_state=30'">
                <div class="v2-zizhu-list active">
                    <div class="v2-zizhu-list-L">待收货</div>
                    <div class="v2-zizhu-list-R"></div>
                    <div class="v2-zizhu-list-C"></div>
                </div>
            </a>
            <div class="line"></div>
            <a :href="siteInfo.host + '/bocm/index.php?act=project&op=my_support_poor_order_list&order_state=40'">
                <div class="v2-zizhu-list active">
                    <div class="v2-zizhu-list-L">已完成</div>
                    <div class="v2-zizhu-list-R"></div>
                    <div class="v2-zizhu-list-C"></div>
                </div>
            </a>
            <div class="line"></div>
        </div>
        <div class="cloudlogo bg">
            <div class="cloudlogo-L"><img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/weixin/cloudlogo.png'" alt="正努力加载…"></div>
            <div class="cloudlogo-R">您的数据与“公益中行”APP实时同步 <br>售后&客服等更多功能可在APP中受理</div>
        </div>
        <wx_footer></wx_footer>
    </div>
</template>
<script>
    import footer from './footer.vue'
    export default {
        data () {
            return {
                agentName: '',
                supportName: '',
                roleName:'',
                memberInfo: {},
            }
        },
        created: function () {
            this.setdata()
        },
        components: {
            'wx_footer': footer
        },
        methods: {
            setdata () {
                this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=index')
                    .then(res => {
                        this.roleName = res.data.content.roleName
                        this.memberInfo = res.data.content.memberInfo
                    })
            }

        }

    }
</script>
<style scoped>
    .contentbox{position: relative;margin-bottom: 0.98rem;}
    .v2-zizhu-list-L{color: #000}
    .index-box{ background:url(/bocm/platformjs/static/image/me_top_bg2.jpg) no-repeat; background-size:100% auto; overflow:hidden; padding-top:0.6rem; position:relative;}
    .me-top-box-L{ margin-left:0.2rem;margin-top: 0.04rem}
    .me-top-box-C{ width:5.22rem;text-align: left;margin-top: 0.04rem}
    .new-person-lable{ line-height:0.3rem; font-size:0.22rem; margin-bottom:0.14rem;}
    .new-person-tit{ line-height:0.34rem;}
    .new-name{height:0.3rem;line-height:0.3rem;font-size:0.28rem;}
    .index-box div{color:#fff!important}
    .cloudlogo{width:100%;padding: 1.94rem 0 1.54rem;position: relative}
    .cloudlogo-L{width:1.38rem;height:0.62rem;position: absolute;left: 0.4rem;bottom: 0.58rem;}
    .cloudlogo-L img{width: 100%;height: 100%}
    .cloudlogo-R{position: absolute;left: 2rem;bottom: 0.58rem;font-family: PingFangSC-Regular; font-size: 0.26rem;  color: #727272;}
</style>
