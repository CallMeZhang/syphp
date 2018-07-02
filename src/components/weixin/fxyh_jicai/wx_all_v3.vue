<template>
    <div>
        <div v-title="moduleName"></div>
        <div class="line_jc"></div>
        <div class="wgContent">
            <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText" :bottom-pull-text="bottomPullText" :bottom-method="loadBottom" :bottom-all-loaded="bottomAllLoaded" :auto-fill="false" ref="loadmore">
                <ul class="clearfix">
                    <li v-for="item in latestGoodsList">
                        <a :href="item.goods_url">
                            <div class="wgImg">
                                <img :src="item.goods_image_url" alt="正努力加载…">
                            </div>
                            <div class="wgGoodTit">
                                <p>{{item.goods_name}}</p>
                            </div>
                            <div class="wgPrice">
                                <span class="fl red price">￥</span><span class="fl red">{{item.goods_price}}</span>
                                <span class="fr gray">{{item.shipping_fee}}</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
        <div class="line_jc5" v-if="loadover"></div>
    </div>
</template>
<script>
    export default{
        data:function () {
            return{
                latestGoodsList:[],
                moduleName:'',
                allLoaded: false,
                current_page: 2,
                bottomAllLoaded: false,
                bottomPullText: '上拉加载',
                bottomDropText: '释放更新',
                bottomDistance: 0,
                loadover:false,
            }
        },
        created:function () {
            this.moduleName = this.$route.query.module_name
            this.getData()
        },
        methods:{
            getData(){
                this.$http.get(this.siteInfo.host + '/api/index.php?act=bocfx&op=mall_goods_list&module_id='+this.$route.query.module_id).then(res => {
                    this.latestGoodsList=res.data.content.goods_list
                })
            },
            loadBottom () {
                if(this.bottomAllLoaded) {
                    this.$refs.loadmore.onBottomLoaded()
                    return
                }
                this.$http.get(this.siteInfo.host + '/api/index.php?act=bocfx&op=mall_goods_list&module_id='+this.$route.query.module_id+'&curpage='+this.current_page).then(res=>{
                    this.current_page++
                    console.log(this.current_page)
                    if(res.data.code === 400) {
                        this.bottomAllLoaded = true
                        this.$refs.loadmore.onBottomLoaded()
                        this.loadover = true
                        return
                    }
                    this.latestGoodsList = this.latestGoodsList.concat(res.data.content.goods_list)
                    this.$refs.loadmore.onBottomLoaded()
                })

            }
        }
    }
</script>
<style scoped>
    .line_jc{width: 7.5rem;height: 0.2rem;background: #f9f9f9}
    .line_jc5{width: 7.5rem;height: 0.5rem;background: #f9f9f9}
    .wgContent {
        background: #fff;
        padding: 0.4rem 0.2rem 0.2rem 0.2rem;
        /*border-bottom: 1px solid #DDD;*/
    }
    .wgContent li {
        float: left;
        width: 49%;
        margin-bottom: 0.48rem;
    }
    .wgContent li:nth-child(2n) {
        float: right;
    }
    .wgContent .wgImg {
        position: relative;
        width: 3.44rem;
        height: 2.52rem;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        border: 0.02rem solid #eee;
    }
    .wgContent .wgImg img {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-height: 2.52rem;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .wgGoodTit {
        padding-bottom: 0.24rem;
        height: 0.88rem;
    }
    .wgGoodTit p {
        line-height: 0.4rem;
        padding-top: 0.16rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.3rem;
        color: #606060;
        text-align: left;
    }
    .wgPrice{
        /*padding-left: 0.1rem;*/
        padding-right: 0.15rem;
        height: 0.28rem;
    }
    .wgPrice .red {
        color: #F13E52;
        font-size: 0.28rem;
    }
    .wgPrice .price {
        color: #F13E52;
        height: 0.28rem;
        padding-left: 0.1rem;
        line-height: 0.28rem;
        font-size: 0.24rem;
        vertical-align: text-bottom;
    }
    .wgPrice .gray {
        color: #808080;
        font-size: 0.28rem;
    }
</style>
