<template>
    <div class="container">
        <div v-title="'专题推荐'"></div>
        <img class="headerimg" :src="themeInfo.theme_img_url" alt="正努力加载…">
        <div class="content">
            <div class="title">{{themeInfo.title}}</div>
            <div class="creatDate">{{themeInfo.online_time}}</div>
            <div class="article">
                <pre style="white-space:pre-wrap;margin:0px;">{{themeInfo.content}}</pre>
            </div>
            <div class="goodslist">
                <a :href="siteInfo.host+'/bocm/index.php?act=project&op=project_detail&gc_id='+item.goods_commonid+'&goods_project_type=17'" v-for="item in themeGoods">
                    <div class="goods" >
                        <div class="goodsimg"><img :src="item.goods_image_url" alt=""></div>
                        <div class="goodsDescription">{{item.goods_name}}</div>
                        <div class="price">￥{{item.goods_price}}</div><div class="freight">{{item.shipping_fee}}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script >
    export default {
        created: function () {
            this.getData()
        },
        data () {
            return {
                themeInfo:{},
                themeGoods:[]
            }
        },
        methods: {
            getData () {
                this.$http.get(this.siteInfo.host + '/api/index.php?act=bocfx&op=theme_detail&theme_id='+this.$route.query.theme_id).then(res => {
                    this.themeInfo= res.data.content.theme_info
                    this.themeGoods=res.data.content.theme_goods
                })
            }
        }
    }
</script>
<style scoped>
    .content{background: #fff;padding-bottom: 0.01rem;}
    .headerimg{
        width: 100%;
        height: auto;
    }
    .title{
        width: 6.4rem;
        padding-top: 0.24rem;
        margin: 0 auto 0;
        font-family: PingFangSC-Regular;
        font-size: 0.34rem;
        color: #333333;
        letter-spacing: 0;
        line-height: 0.52rem;
        text-align: left;

    }
    .creatDate{
        width: 6.4rem;
        height: 0.52rem;
        ont-family: PingFangSC-Regular;
        font-size: 0.2rem;
        color: #666666;
        letter-spacing: 0;
        line-height: 0.52rem;
        text-align: left;
        margin: 0 auto;
    }
    .article{
        width: 6.4rem;
        /*height: 5.72rem;*/
        margin: 0.5rem auto 0.58rem;
        font-family: PingFangSC-Regular;
        font-size: 0.28rem;
        color: #333333;
        letter-spacing: 0;
        line-height: 0.52rem;
        text-align: left;
    }
    .goods{
        width: 6.8rem;
        height: 6rem;
        margin: 0 auto 0.46rem;
        overflow: inherit;
    }
    .goodsimg img{
        width: 6.8rem;
        height: 4.78rem;
        border-radius:0.2rem;
        margin-bottom: 0.1rem;
    }
    .goodsDescription{
        width: 6.8rem;
        /*height: 0.42rem;*/
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        color: #333;
        line-height: 0.42rem;
        text-align: left;
    }
    .price{
        display: inline-block;
        width: 1.08rem;
        height: 0.42rem;
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        color: #666666;
        line-height: 0.42rem;
        text-align: left;
        float: left;
        margin-left: -0.03rem;
    }
    .freight{
        display: inline-block;
        /*width: 0.9rem;*/
        height: 0.42rem;
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        color: #666666;
        line-height: 0.42rem;
        float: right;
    }

</style>
