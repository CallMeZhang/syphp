<template>
    <div style="background: #F2F8FF;">
        <div v-title="'帮扶成效'"></div>
        <transition name="fade">
            <loading v-show="isLoading"></loading>
        </transition>
        <transition name="fade" v-if="isBase">
            <div v-show=" !isLoading">
                <shareImg v-if="is_share" @click.native = "is_share=false"></shareImg>
                <div class="top-img"><img :src="baseData.head_image_1" alt="图片正在加载..."></div>
                <div class="base-mess">
                    <div class="base-item" v-if="isplace">
                        <div class="item-l">所属地区</div>
                        <div class="item-r">{{baseData.place}}</div>
                    </div>
                    <div class="base-item" v-if="iscoordinates">
                        <div class="item-l">经纬度</div>
                        <div class="item-r">{{baseData.coordinates}}</div>
                    </div>
                    <div class="base-item" v-if="isclimate">
                        <div class="item-l">气候</div>
                        <div class="item-r">{{baseData.climate}}</div>
                    </div>
                    <div class="base-item" v-if="isterrain">
                        <div class="item-l">地势</div>
                        <div class="item-r">{{baseData.terrain}}</div>
                    </div>
                    <div class="base-item" v-if="istotal">
                        <div class="item-l">总人口</div>
                        <div class="item-r">{{baseData.total_pop}}</div>
                    </div>
                    <div class="base-item" v-if="isAcreage">
                        <div class="item-l">面积</div>
                        <div class="item-r">{{baseData.acreage}}</div>
                    </div>
                    <div class="base-item" v-if="ispoorpop">
                        <div class="item-l">贫困人口</div>
                        <div class="item-r">{{baseData.poor_pop}}</div>
                    </div>
                    <div class="base-item" v-if="ispoorincome">
                        <div class="item-l" style="line-height: 0.3rem">人均收入 <span>(贫困户)</span></div>
                        <div class="item-r">{{baseData.poor_income}}</div>
                    </div>
                    <div class="base-item" v-if="ishardpop">
                        <div class="item-l">困难人口</div>
                        <div class="item-r">{{baseData.hard_pop}}</div>
                    </div>
                    <div class="base-item" v-if="ishardincome">
                        <div class="item-l" style="line-height: 0.3rem">人均收入 <span>(困难户)</span></div>
                        <div class="item-r">{{baseData.hard_income}}</div>
                    </div>
                    <div class="base-item" v-if="isview">
                        <div class="item-l">当地景点</div>
                        <div class="item-r">{{baseData.view_spot}}</div>
                    </div>
                    <div class="base-item" v-if="isspecialty">
                        <div class="item-l">农特产</div>
                        <div class="item-r">{{baseData.specialty}}</div>
                    </div>
                </div>

                <div v-show="isReason">
                    <div class="help-title">当地致贫原因</div>
                    <div id="container-pie" style="min-width: 7.5rem;height: 6rem;margin-bottom: 0.8rem;" ref="pie"></div>
                </div>

                <div v-show="isSupply">
                    <div class="help-title">脱贫，他们在努力</div>
                    <div class="gjdata">
                        <div class="gjdata-item" style="margin-right: 1.1rem">
                            <div class="gj-zhu">{{supply_data.agent_number}}<span>位</span></div>
                            <div class="gj-title">脱贫助理人</div>
                        </div>
                        <div class="gjdata-item" style="margin-right: 1.4rem">
                            <div class="gj-zhu">{{supply_data.self_poor_number}}<span>位</span></div>
                            <div class="gj-title">自营贫困户</div>
                        </div>
                        <div class="gjdata-item">
                            <div class="gj-zhu">{{supply_data.love_goods_number}}<span>件</span></div>
                            <div class="gj-title">爱心产品</div>
                        </div>
                    </div>
                </div>

                <div v-show="isHelp">
                    <div class="help-title">扶贫，我们在行动</div>
                    <div class="gjdata">
                        <div class="gjdata-item2" style="margin-right: 0.45rem">
                            <div class="gj-zhu">{{help_data.industries_income}}<span>元</span></div>
                            <div class="gj-title">产业增收</div>
                        </div>
                        <div class="gjdata-item2" style="margin-right:0.6rem">
                            <div class="gj-zhu">{{help_data.poor_income}}<span>元</span></div>
                            <div class="gj-title">贫困户增收</div>
                        </div>
                        <div class="gjdata-item2" style="width:1.4rem;">
                            <div class="gj-zhu">{{help_data.benefit_people}}<span>人</span></div>
                            <div class="gj-title">受益人口</div>
                        </div>
                    </div>
                </div>

                <div class="lianmeng" v-show="isUnion">
                    <div class="title">帮扶联盟</div>
                    <div class="icon-c">
                        <div class="icon-item" v-for="item in this.union_list">
                            <div class="icon-img"><img :src="item.union_image" alt=""></div>
                            <div class="icon-name">{{item.union_name}}</div>
                        </div>
                        <div class="icon-item" v-if="this.union_list.length < 2">
                            <div class="icon-expect">期待加入</div>
                        </div>
                    </div>
                </div>

                <div v-show="isYunying">
                    <div class="help-title">运营中心建设</div>
                    <div class="yydata">
                        <div class="yy-des">{{baseData.oper_center}}</div>
                        <div class="yy-img" v-for="item in baseData.oper_center_img"><img :src="item" ></div>
                    </div>
                </div>

                <div v-show="isXiaoliang">
                    <div class="help-title">农产品销量</div>
                    <div class="activeCon">
                        <div class="for-li" v-for="(item,index) in county_goods_sale_num">
                            <div class="titContent clearfix">
                                <div class="left fl">
                                    <span class="pubColor fl num">{{index | indexNum}}</span>
                                    <span class="adress">{{item.gc_name}}</span>
                                </div>
                                <div class="right fr">
                                    <span class="pubColor">{{item.sale_sum_order}}</span>
                                    <span>单</span>
                                </div>
                            </div>
                            <div class="redLine">
                                <p class="p progress"
                                   :style="{width:100*item.sale_sum_order/county_goods_sale_num[0].sale_sum_order+'%'}"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lianmeng" v-show="isBrand">
                    <div class="title">当地品牌</div>
                    <div class="icon-c">
                        <div class="icon-item" v-for="item in baseData.brand_info">
                            <div class="icon-img"><img v-lazy="item.img"></div>
                            <div class="icon-name">{{item.name}}</div>
                        </div>
                    </div>
                </div>

                <div class="sy-zi">
                    <div class="zi-l">您的每一次帮扶，</div>
                    <div class="zi-l">正在让贫困地区发生美好的改变</div>
                    <div class="zi-r">——— 一起善源</div>
                </div>
                <div class="sy-des">
                    <div class="des-tit">直接增收</div>
                    <div class="des-zi">该县所有订单金额的10%，将均分给当地扶贫办认证的贫困户。</div>
                    <div class="des-tit">电商环境</div>
                    <div class="des-zi">多次对助理人进行电商行业培训，帮助改善当地物流设施，建立运营中心，大幅降低当地物流成本。</div>
                    <div class="des-tit">长效脱贫</div>
                    <div class="des-zi">互联网更加便利的销售农产品，拓宽当地农产品销路，为当地贫困户长效脱贫打下基础。</div>
                </div>
                <sy-share @click.native="shareFn" style="margin-right: 0.2rem;" class="iphonex-act-share"></sy-share>
            </div>
        </transition>
        <transition name="fade" v-if="!isBase">
            <effectEmpty v-show="!isLoading" :xname="xname"></effectEmpty>
        </transition>

    </div>
</template>

<script>
    import HighCharts from 'highcharts'
    import wx_share from '@/assets/js/share.js'
    import shareImg from '@/components/common/shared_img.vue'
    import loading from '@/components/loading/loading.vue'
    import effectEmpty from './helpeffect_empty'
    export default {
        name: "helpeffect",
        data(){
            return{
                is_share:false,
                isLoading:true,
                isBase:false,
                isReason:false,
                isYydata:false,
                isSupply:false,
                isHelp:false,
                isXiaoliang:false,
                isYunying:false,
                isBrand:false,
                isUnion:false,
                poverty_reason:[],
                supply_data:{},
                help_data:{},
                county_goods_sale_num:Array,
                union_list:Array,
                baseData:{},
                isAcreage:false,
                isclimate:false,
                iscoordinates:false,
                ishardincome:false,
                ishardpop:false,
                isplace:false,
                ispoorincome:false,
                ispoorpop:false,
                isspecialty:false,
                isterrain:false,
                istotal:false,
                isview:false,
                areaid:'',
                title:'',
                resean_data:[],
                option:{},
                xname:'',
            }
        },
        created(){
            this.getTitle()
            this.getBase()
            this.getStat()
            this.youmeng()
            setTimeout(()=>{
                this.shareSecond()
            },100)
        },
        filters: {
            indexNum: function (val) {
                val = (val + 1) > 9 ? (val + 1) : '0' + (val + 1)
                return val
            }
        },
        mounted() {
            // console.log(1,this.xname)
        },
        methods:{
            getTitle(){
                let areaid = this.$route.query.areaid
                this.$http.get(this.siteInfo.host + '/api/index.php?act=county&op=getCountyName&areaid_3=' + areaid).then(res =>{
                    // this.title = '帮扶成效-' + res.data.content
                    this.title = '帮扶成效'
                    this.xname = res.data.content
                    //显示标题
                    document.title = this.title;
                    this._appjs.syJsbSetTitleText(this.title)

                })
            },
            getBase(){
                let areaid = this.$route.query.areaid
                this.$http.get(this.siteInfo.host + '/api/index.php?act=county&op=getCountyBaseInfo&areaid_3=' + areaid).then( res => {
                        // this.$http.get('https://t2.17shanyuan.com/api/index.php?act=county&op=getCountyBaseInfo&areaid_3=' + areaid).then( res => {
                    if(res.data.code != 200){
                        this.isBase = false
                        this.isLoading = false

                    }else{
                        this.isBase = true
                        this.baseData = res.data.content
                        if(this.baseData.acreage_type == '1'){
                            this.isAcreage = true
                        }
                        if(this.baseData.climate_type == '1'){
                            this.isclimate = true
                        }
                        if(this.baseData.coordinates_type == '1'){
                            this.iscoordinates = true
                        }
                        if(this.baseData.hard_income_type == '1'){
                            this.ishardincome = true
                        }
                        if(this.baseData.hard_pop_type == '1'){
                            this.ishardpop = true
                        }
                        if(this.baseData.place_type == '1'){
                            this.isplace = true
                        }
                        if(this.baseData.poor_income_type == '1'){
                            this.ispoorincome = true
                        }
                        if(this.baseData.poor_pop_type == '1'){
                            this.ispoorpop = true
                        }
                        if(this.baseData.specialty_type == '1'){
                            this.isspecialty = true
                        }
                        if(this.baseData.terrain_type == '1'){
                            this.isterrain = true
                        }
                        if(this.baseData.total_pop_type == '1'){
                            this.istotal = true
                        }
                        if(this.baseData.view_spot_type == '1'){
                            this.isview = true
                        }
                        if(this.baseData.oper_center.length != 0 || this.baseData.oper_center_img.length != 0){
                            this.isYunying = true
                        }
                        if(this.baseData.brand_info.length >= 1){
                            this.isBrand = true
                        }

                        this.isLoading = false
                    }
                })
            },
            getStat(){
                let areaid = this.$route.query.areaid
                this.$http.get(this.siteInfo.host + '/api/index.php?act=county&op=getCountyStatInfo&areaid_3=' + areaid).then(res =>{
                    this.poverty_reason = res.data.content.poverty_reason
                    this.supply_data = res.data.content.supply_data
                    this.help_data = res.data.content.help_data
                    this.union_list = res.data.content.union_list
                    this.county_goods_sale_num = res.data.content.county_goods_sale_num;
                    (this.supply_data.agent_number == 0 && this.supply_data.self_poor_number == 0) ? this.isSupply = false : this.isSupply = true;
                    (this.help_data.industries_income != 0) ? this.isHelp = true : this.isHelp = false;
                    this.county_goods_sale_num.length != 0 ? this.isXiaoliang = true : this.isXiaoliang = false;
                    this.union_list.length != 0 ? this.isUnion = true : this.isUnion = false;
                   //pie options
                    if (this.poverty_reason[0].poor_num != 0){
                        this.isReason = true
                        this.resean_data = [ {name:'',y:Number},{name:'',y:Number},{name:'',y:Number},{name:'',y:Number},{name:'',y:Number},{name:'',y:Number}]
                        let color = ['#7296A8','#ACD1DD','#D3E7EE','#F5EAD7','#EED7A2','#C7A577']
                        for (var i=0 ; i<6; i++ ){
                            this.resean_data[i].name = this.poverty_reason[i].poverty_reason + ' ' + this.poverty_reason[i].percent + '%'
                            this.resean_data[i].y =  this.poverty_reason[i].percent
                            this.resean_data[i].color = color[i]
                        }
                        this.option = {
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie',
                                backgroundColor:'#F2F8FF',
                            },
                            legend:{
                                itemWidth:150,
                                itemStyle: { color:'#4B4F63',fontWeight: '300'},
                                itemMarginBottom: 10,
                            },
                            loading: {
                                hideDuration: 10,
                                showDuration: 10
                            },
                            credits:{enabled:false},
                            title: {
                                text:''
                            },
                            tooltip: {
                                animation:false,
                                enabled:false,
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: false,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false
                                    },
                                    startAngle:-180,
                                    showInLegend: true,
                                    point: {
                                        events: {
                                            legendItemClick: function(e) {
                                                return false; // 直接 return false 即可禁用图例点击事件
                                            },

                                        }
                                    }
                                }
                            },
                            series: [{
                                name: 'Brands',
                                colorByPoint: true,
                                innerSize: '48%',
                            }]
                        }
                        this.option.series[0].data = this.resean_data
                        let that = this
                        setTimeout(()=>{
                            that.pie(this.option)
                        },300)
                        // this.pie(this.option)
                    }
                })
            },
            pie(options){
                HighCharts.chart('container-pie',options)
            },
            shareFn(){
                let areaid = this.$route.query.areaid
                if(this.$route.query.is_share == 'yes'){
                    this.is_share = true
                }
                let shareUrl = this.siteInfo.host_share + '/bocm/index.php?act=index&op=showvue#/helpEffect?areaid='+ areaid +  '&is_share=yes';
                let shareText = '你的每一次帮扶，正在让贫困地区发生美好的改变！';
                let shareTitle = '帮扶成效-' + this.xname;
                let shareLogo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png';
                let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo};
                let jsonParam = JSON.stringify(params);

                //分享成功后回调
                /*window.callbackShareResult = function (platform, status){
                    // syJsbAlert("分享到" + platform + "平台" + '---' + status)
                    alert('platfrom:'+platform+'status:'+status)
                    if（status == 'success'）{
                        this.$http.get()
                    }

                }*/
                this._appjs.syJsbShare(jsonParam, shareText, shareUrl);

            },
            shareSecond(){
                let areaid = this.$route.query.areaid
                let name = '帮扶成效-' + this.xname
                let shareUrl = this.siteInfo.host_share+ '/bocm/index.php?act=index&op=showvue#/helpEffect?areaid='+ areaid +  '&is_share=yes';
                let shareText = '你的每一次帮扶，正在让贫困地区发生美好的改变！';
                let shareTitle = name;
                let shareLogo = this.siteInfo.cdn_host + '/bocm/platformjs/static/image/detail/logo_pwcn.png';
                var params = {
                    text: shareText,
                    title: shareTitle,
                    logo: shareLogo,
                    url: shareUrl
                }
                wx_share(params)
            },

            youmeng(){
                var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                // console.log(cnzz_protocol)
                document.write(unescape("%3Cspan style='visibility:hidden;position:absolute;left:0;bottom:0;z-index:-1;' id='cnzz_stat_icon_1261993546'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1261993546%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));

            }
        },
        components: {
            shareImg,loading,effectEmpty
        }
    }
</script>

<style lang="scss" scoped>
    .top-img{width: 7.5rem;height: 3rem;}
    .top-img img{width: 100%;height: 100%;}
    .base-mess{padding: 0.3rem;margin-bottom: 0.3rem; box-sizing: border-box;}
    .base-item{overflow: hidden;margin-bottom: 0.2rem;}
    .item-l{
        width:1.12rem ;
        font-size: 0.28rem;
        color: #818C9E;
        line-height: 0.4rem;
        float: left;
        font-weight: 300;
        text-align: justify;
        text-align-last:justify;
    }
    .item-l span{font-size: 0.24rem;color:#B1B8C4;}
    .item-r{
        width: 4.88rem;
        font-size: 0.28rem;
        color: #4B4F63;
        line-height: 0.4rem;
        float: left;
        margin-left: 0.9rem;
        text-align: left;
    }
    .help-title{
        width: 3.5rem;
        height: 0.86rem;
        background: url("/bocm/platformjs/static/image/helpEffect/helpeffect-title.png") no-repeat center;
        background-size: 3.5rem 0.86rem;
        margin: 0 auto;
        font-size: 0.36rem;
        color: #FFFFFF;
        text-align: center;
        line-height: 0.76rem;
    }
    .gjdata{padding: 0.5rem 0.3rem 0.8rem 0.5rem;box-sizing: border-box;overflow: hidden;}
    .gjdata-item{width: 1.4rem;float: left;text-align: left;}
    .gjdata-item2{width: 2.1rem;float: left;text-align: left;}
    .gj-zhu{font-size: 0.32rem; color: #4A90E2;font-weight: 600;line-height: 0.45rem;}
    .gj-zhu span{font-size: 0.22rem;color: #818C9E;font-weight: 300;}
    .gj-title{font-size: 0.28rem;color: #4B4F63;font-weight: 300;margin-top: 0.06rem;}
    .lianmeng{width: 6.9rem;margin: 0 auto 0.8rem;background: #fff;box-sizing: border-box;border: 0.01rem dashed #4A90E2;border-radius: 0.08rem;
        .title{width: 100%;height: 0.98rem;font-size: 0.34rem;color: #4B4F63;line-height: 0.98rem;text-align:center;}
        .icon-c{
            width: 6.9rem;
            overflow: hidden;
            .icon-item{
                width: 1.72rem;
                height: 1.8rem;
                float:left;
                .icon-img{
                    width: 0.8rem;
                    height: 0.8rem;
                    margin: 0 auto 0.1rem;
                    img{width: 100%;height: 100%;}
                }
                .icon-name{
                    width: 1.4rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    margin: 0 auto;
                    font-size: 0.28rem;
                    color: #4B4F63;
                    font-weight:300;
                }
                .icon-expect{
                    width: 1.26rem;
                    height: 1.26rem;
                    margin: 0 auto;
                    background: #EDF4FC;
                    border: 0.01rem solid #DADEE4;
                    font-size: 0.24rem;
                    color: #B1B8C4;
                    line-height: 1.26rem;
                    text-align: center;
                }
            }
        }
    }
    .yydata{
        width: 7.5rem;
        padding: 0.5rem 0.3rem 0.8rem;
        box-sizing: border-box;
        .yy-img{
            width: 6.9rem;
            height: 3.54rem;
            background: #C8DDF5;
            margin-bottom: 0.3rem;
            img{width: 100%;height: 100%;}
        }
    }
    .yy-des{
        display: inline-block;
        width: 6.9rem;
        word-wrap : break-word;
        margin:0 auto 0.3rem;
        font-size: 0.3rem;
        color: #666A7F;
        font-weight: 300;
        line-height: 0.42rem;
        text-align: justify;
    }
    .xiaoliang{width: 6.9rem;height: 5.54rem;margin: 0.64rem auto 0.5rem;}
    .sy-zi{
        width: 6.9rem;
        font-size: 0.4rem;
        color: #4A90E2;
        line-height: 0.56rem;
        margin: 0 auto;
        .zi-l{text-align: left;font-weight: 600;}
        .zi-r{text-align: right;margin-top: 0.18rem;margin-bottom: 0.09rem;font-weight: 600;}
    }
    .sy-des{
        width: 7.5rem;
        height: 7.85rem;
        padding: 1.24rem 0.3rem 1.05rem;
        box-sizing: border-box;
        text-align: left;
        background: url("/bocm/platformjs/static/image/helpEffect/helpeffect-bg.png") no-repeat;
        background-size: 7.5rem 7.85rem;
        .des-tit{
            font-size: 0.34rem;
            color: #FFF;
            font-weight: 600;
            line-height: 0.48rem;
        }
        .des-zi{
            font-size: 0.3rem;
            color: #FFF;
            line-height: 0.42rem;
            margin: 0.2rem auto 0.5rem;
        }
    }


    //
    .activeCon {
        width: 7.5rem;
        padding: 0 .3rem .45rem .32rem;
        box-sizing: border-box;
    }

    .activeCon li {
        margin-top: .3rem;
        text-align: left;
    }

    .tit {
        color: #999;
        font-size: .26rem;
    }

    .red {
        color: #f13e52;
    }

    .activeCon .tit span:first-child {
        margin-right: .23rem;
        font-weight: 600;
    }

    .activeCon .tit span:nth-child(2) {
        display: inline-block;
        overflow: hidden;
        width: 60%;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: .24rem;
    }

    .activeCon .tit span:nth-child(4) {
        display: inline-block;
        width: 18%;
        text-align: right;
    }

    .redLine {
        margin-top: .15rem;
        margin-left: .5rem;
        width: 90%;
        height: .1rem;
        border-radius: .1rem;
    }

    .activeCon .for-li {
        margin-top: 0.3rem;
        text-align: left;
    }

    .activeCon .for-li:nth-child(1) .redLine p, .activeCon .for-li:nth-child(2) .redLine p, .activeCon .for-li:nth-child(3) .redLine p {
        /*background-color: rgba(74, 144, 226, .6);*/
        background-image: linear-gradient(45deg, #4A90E2 0%, #958EF8 100%);
    }

    .for-li {
        text-align: left;
        margin-bottom: 0.3rem;
    }

    span {
        font-size: 0.26rem;
        color: #818C9E;
        font-weight: 300;
    }

    .pubColor {
        font-size: 0.3rem;
        color: #4A90E2;
    }
    .num {
        margin-right: 0.23rem;
        line-height: 0.33rem;
        font-weight: 600;
    }

    .adress {
        width: 4.3rem;
        font-size: 0.28rem;
        line-height: 0.33rem;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666A7F;
        font-weight: 300;
    }

    .redLine {
        margin-top: .15rem;
        margin-left: .5rem;
        width: 90%;
        height: .1rem;
        border-radius: .1rem;
    }

    .progress {
        width: 100%;
        height: 0.1rem;
        background: #CDE4FF;
        border: 0.01rem solid #4A90E2;
        border-radius: 1rem;
    }
</style>
