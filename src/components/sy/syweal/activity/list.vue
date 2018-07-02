<template>
    <div style="height: 100%;">
        <div v-title="'公益活动'"></div>
        <transition name="fade">
            <sy-loading v-show="isLoading"></sy-loading>
        </transition>
        <transition name="fade">
            <div class="list">
                <div class="wrapper">
                    <div class="nav">
                        <ul class="clearfix">
                            <li class="fl" @click="sladeTab('a')">
                                <div :class="type=='online_project' ? 'sel' : ''">线上联动</div>
                            </li>
                            <li class="fl" @click="sladeTab('b')">
                                <div :class="type=='offline_project' ? 'sel' : ''">同城善行</div>
                            </li>
                        </ul>
                    </div>
                    <!--公益求助-->
                    <div class="gyqz gyact" v-show="!isLoading">
                        <div class="grqzCon" v-if="list.length > 0">
                            <mt-loadmore :bottom-distance="bottomDistance" :bottom-drop-text="bottomDropText" :bottom-pull-text="bottomPullText" :bottom-method="loadBottom" :bottom-all-loaded="bottomAllLoaded" :auto-fill="false" ref="loadmore">
                                <ul>
                                    <li class="clearfix" v-for="item in list" @click="_appjs.syJsbLaunchWebview(item.detial_url)">
                                        <div class="img fl">
                                            <img v-lazy="item.project_image">
                                            <img v-if="item.project_progress_state =='finished'" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/icon-end.png'" alt="角标" class="biao">
                                            <img v-if="item.project_progress_state =='progressing'" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/icon-start.png'" alt="角标" class="biao">
                                            <img v-if="item.project_progress_state =='waiting'" :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/syweal/icon-wei.png'" alt="角标" class="biao">
                                        </div>
                                        <div class="info fr">
                                            <h2>{{item.activity_name}}</h2>
                                            <p>时间：{{item.project_time_formatted}}</p>
                                            <p>地址：{{item.activity_address}}</p>
                                            <p>已报名：{{item.register_count}}人</p>
                                        </div>
                                    </li>
                                </ul>
                            </mt-loadmore>
                        </div>
                        <div class="grqzCon" v-if="list.length == 0">
                            <div class="ooo">
                                <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/activity_list_null.jpg'" alt="">
                                <p>当前暂无活动</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import loading from '@/components/loading/loading.vue'
    export default {
        data () {
            return {
                isLoading: true,
                type: 'online_project',
                allLoaded: false,
                current_page: 1,
                bottomAllLoaded: false,
                bottomPullText: '',
                bottomDropText: '',
                bottomDistance: 0,
                list: []
            }
        },
        created: function () {
            let p_t = this.$route.params.project_type
            this.type = p_t
            this.initData()
        },
        components: {
            'sy-loading': loading
        },
        methods: {
            initData () {
                this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteerproject&op=volunteer_project_list&project_type='+this.type).then(res=>{
                    this.list = res.data.content
                    this.isLoading = false
                })
            },
            sladeTab (tab) {
                this.bottomAllLoaded = false
                this.current_page = 1
                this.isLoading = true
                switch (tab) {
                    case 'a':
                        this.type = 'online_project'
                        this.initData();break;
                    case 'b':
                        this.type = 'offline_project'
                        this.initData();break;
                    default:
                        this.type = 'online_project'
                        this.initData();break;
                }
            },
            loadBottom () {
                if(this.bottomAllLoaded) {
                    this.$refs.loadmore.onBottomLoaded()
                    return
                }
                this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteerproject&op=volunteer_project_list&project_type='+this.type+'&cur_page='+this.current_page).then(res=>{
                    this.current_page++
                    if(res.data.code === 400) {
                        this.bottomAllLoaded = true
                        this.$refs.loadmore.onBottomLoaded()
                        return
                    }
                    this.list = this.list.concat(res.data.content)
                    this.$refs.loadmore.onBottomLoaded()
                })

            }
        }
    }
</script>
<style>
    body, html, #app {
        height: 100%;
        width: 100%;
    }
</style>
<style scoped>
    .ooo {
        width: 2.74rem;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .ooo img {
        height: 1.83rem;
        width: 1.98rem;
        margin-bottom: 0.3rem;
    }

    .ooo p {
        font-size: .28rem;
        color: #ccc;
    }
    .mint-loadmore {
        overflow: visible;
    }
    .list {
        height: 100%;
        width: 100%;
    }

    .wrapper {
        height: 100%;
        width: 100%;
        background-color: #fff;
    }

    .nav {
        width: 100%;
        height: 1.04rem;
        border-bottom: 0.02rem solid #ddd;
        border-top: 0.02rem solid #ddd;
        background-color: #fff;
        position: fixed;
        z-index: 999;
    }

    .nav li {
        width: 50%;
        line-height: 1rem;
        height: 1rem;
        font-size: 0.3rem;
        color: #4B4F63;
        box-sizing: border-box;
    }

    .nav li div {
        width: 1.6rem;
        margin: 0 auto;
        border-bottom: 0.04rem solid transparent;
        box-sizing: border-box;
        margin-top: 2px;
    }

    .nav .sel {
        color: #4A90E2;
        border-bottom: 0.04rem solid #4a90e2;
        box-sizing: border-box
    }

    .gyqz {
        padding-top: 1.34rem;
        background-color: #fff;
    }

    .grqzCon {
        padding: 0 0.24rem;
    }

    .img {
        width: 2.24rem;
        height: 1.56rem;
        margin-right: 0.3rem;
        background: #e1e1e1;
        position: relative;
    }

    .img img {
        width: 100%;
        height: 100%;
    }

    .img .biao {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.92rem;
        height: 0.93rem;
    }

    .info {
        text-align: left;
        width: 63%;
    }

    .info h2 {
        font-size: 0.28rem;
        color: #4B4F63;
        padding: 0.05rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .info p {
        font-size: 0.24rem;
        color: #666A7F;
        line-height: 0.37rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    li {
        margin-bottom: 0.3rem;
        width: 100%;
    }

    .more {
        padding: 0.27rem 0;
        text-align: center;
        background: #fff;
        font-size: 0.24rem;
        color: #818C9E;
        border-top: 1px solid #ddd;
    }

    .more .icon {
        display: inline-block;
        width: 0.13rem;
        height: 0.18rem;
        background: url("../../../../../static/image/syweal/icon-xia.png") no-repeat center;
        -webkit-background-size: contain;
        background-size: contain;
        vertical-align: middle;
    }

    .mt {
        margin-top: 0.2rem;
    }

    .gyact .img {
        width: 2.24rem;
        height: 2.24rem;
        position: relative;
        overflow: hidden;
    }

    .gyact .img img:first-child {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: auto;
        min-height: 2.24rem;
    }

    .gyact .info h2 {
        padding-top: 0.38rem;
    }

    .org {
        background: #fff;
    }

    .org li {
        width: 25%;
    }

    .org .img {
        width: 1.28rem;
        height: 1.28rem;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 0.2rem;
    }

    .org .img img {
        width: 100%;
        height: 100%;
    }

    .org li p {
        width: 1.3rem;
        line-height: 0.4rem;
        font-size: 0.26rem;
        color: #4B4F63;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>