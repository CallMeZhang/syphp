<template>
    <div class="content" style="height: 100%;">
        <div v-title="'马拉松赛事报名'"></div>
        <!--提示下载app-->
        <div v-if="isShare">
            <div class="fixed" style="z-index: 1999999;background: rgba(0,0,0,.7);width:100%;height:1.2rem;">
                <ul class="clearfix" @click="linkToDownload">
                    <li class="fl" @click.stop="isDownload = false">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/CombinedShapeClose.png'" alt=""
                             style="width:.44rem;height:.44rem;vertical-align: middle;margin:0.38rem 0.12rem;">
                    </li>
                    <li class="fl">
                        <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group2_2x.png'"
                             style="width:0.9rem;height:0.92rem;margin:0.14rem 0.12rem 0;">
                    </li>
                    <li class="fl">
                        <p style="color:#fff;font-size:.28rem;line-height: 0.4rem;margin-top:0.21rem;">一起善源</p>
                        <p style="color:#B7B7B7;font-size:.24rem;line-height:0.34rem;margin-top:0.03rem;">爱 · 源于善</p>
                    </li>
                    <li class="fr">
                        <a :href="siteInfo.host+'/boc/index.php'"
                           style="display:inline-block;height:0.72rem;width:2.13rem;font-size:.32rem;line-height:0.72rem;text-align: center;color:#fff;background: #4A90E2;border-radius: 0.1rem;margin:0.24rem 0.4rem 0;">立即下载</a>
                    </li>
                </ul>
            </div>
            <div style="height:1.2rem;background: #fff;"></div>
        </div>
        <img class="game_end_img" src="../../../static/image/marathon/end.png" >
        <div class="game_end_t">报名已结束,感谢您的参与!</div>
        <div class="game_end_b">您可以下载“一起善源”app，了解更多公益活动信息</div>
    </div>
</template>
<script>

    export default{
        data(){
            return{
                isShare:false
            }
        },
        created:function () {
            this.$route.query.is_share ? this.isShare = 'yes' : this.isShare = false

        },
        methods:{
            // 下载app
            linkToDownload(){
                window.location.href= this.siteInfo.host+'/boc/index.php'
            },
        }
    }

</script>
<style scoped>
    .content{margin:0;padding:0;width: 7.5rem;height: 12.06rem;background: #fff;}
.game_end_img{
    width: 2.24rem;
    height: 2.45rem;
    margin-top: 3.14rem;
}
    .game_end_t{
        width: 7.5rem;
        height: 0.42rem;
        line-height: 0.42rem;
        margin: 0.73rem auto 0;
        font-weight: 300;
        font-size: 0.32rem;
        color: #B1B8C4;
        text-align: center;
    }
.game_end_b{
    width: 7.5rem;
    height: 0.42rem;
    line-height: 0.42rem;
    margin: 0 auto;
    font-weight: 300;
    font-size: 0.26rem;
    color: #B1B8C4;
    text-align: center;
}
</style>
