<template>
    <div>
        <div class="product-wrap container">
            <!--<div class="product show bg">-->
            <!--&lt;!&ndash;大爱超市开始&ndash;&gt;-->
            <!--&lt;!&ndash;icon区&ndash;&gt;-->
            <!--<div  class="index-nav index-nav2">-->
            <!--<ul>-->
            <!--<a v-for="(item,index) in iconlist" @click="appjs('syJsbLaunchWebview', item.touch_url)">-->
            <!--<li>-->
            <!--<div class="touxiang shop-touxiang"  style="position: relative">-->
            <!--<div style="width:100%;position: absolute;margin:.3rem auto" v-show="!iconlistImgLoad[index]['isLoaded']">加载中</div>-->
            <!--<img v-show="iconlistImgLoad[index]['isLoaded']" :src="item.url" @load="isImgLoaded(index)" width="100%" height="100%" alt="'tab-icon'正努力加载…"/>-->
            <!--</div>-->
            <!--<div class="index-nav-fonts">{{item.title}}</div>-->
            <!--</li>-->
            <!--</a>-->
            <!--</ul>-->
            <!--</div>-->

            <div class="product-icon-title">
                <a @click="appjs('syJsbLaunchWebview', iconlist[0].touch_url)">
                    <dl class="icon-title-jicai">
                        <dt>
                        <h3 class="jicai-title">{{iconlist[0].title}}</h3>
                        <p class="jicai-txt">{{iconlist[0].description}}</p>
                        </dt>
                        <dd class="jicai-png" style="position: relative">
                            <div v-show="!iconlistleftImgLoad" style="width:100%;position: absolute;margin:.9rem auto;">加载中</div>
                            <img @load="isImgLoaded('iconlistleftImgLoad')" :src="iconlist[0].url" alt="">
                        </dd>
                    </dl>
                </a>
                <div class="icon-title2">
                    <dl class=" renzhen-con padd-left" @click="appjs('syJsbLaunchWebview', iconlist[1].touch_url)">
                        <dt class="renzhen">
                        <h3 class="jicai-title">{{iconlist[1].title}}</h3>
                        <p class="renzhen-txt">{{iconlist[1].description}}</p>
                        </dt>
                        <dd class="renzhen-img" style="position: relative">
                            <div v-show="!iconlistTopImgLoad" style="position: absolute;width:100%;margin:.6rem auto">加载中</div>
                            <img @load="isImgLoaded('iconlistTopImgLoad')" :src="iconlist[1].url" alt="">
                        </dd>
                    </dl>
                    <dl class=" renzhen-con padd-left border-top1" @click="appjs('syJsbLaunchWebview', iconlist[2].touch_url)">
                        <dt class="renzhen margin-top30">
                        <h3 class="jicai-title">{{iconlist[2].title}}</h3>
                        <p class="renzhen-txt">{{iconlist[2].description}}</p>
                        </dt>
                        <dd class="renzhen-img margin-top30" style="position: relative">
                            <div v-show="!iconlistBottomImgLoad" style="position: absolute;width:100%;margin:.6rem auto">加载中</div>
                            <img @load="isImgLoaded('iconlistBottomImgLoad')" :src="iconlist[2].url" alt="">
                        </dd>
                    </dl>
                </div>
            </div>

            <!--icon结束-->
            <!--最需要帮扶的开始-->
            <div class="blk1"></div>
            <module_title modules-title="大家帮" id="zx"></module_title>
            <!--div class="poor_support"></div-->
            <ul class="index-need-help bg">
                <a v-for = "(item,index) in zxbf" @click="appjs('syJsbLaunchWebview', item.touch_url)" >
                    <li class="index-need-help-list1">
                        <div class="index-need-help-list-left">
                            <div class="index-need-help-list-left-tit">{{item.goods_name}}</div>
                            <div class="index-need-help-list-left-price main-color"><span>￥</span>{{item.goods_price}}</div>
                        </div>
                        <div class="index-need-help-list-right" style="position: relative">
                            <div v-show="!zxbfImgLoad[index]['isLoaded']" style="width:100%;position: absolute;margin:.3rem auto;text-align: center">加载中</div>
                            <img @load="iszxbfImgLoad(index)" :src="item.real_goods_image" width="100%" alt="">
                        </div>
                    </li>
                </a>
            </ul>
            <div class="slide-more"><a @click="appjs('syJsbLaunchWebview',zxbfMore)">查看更多&gt;</a></div>
            <!--最需要帮扶的结束-->
            <!--我帮扶的贫困户开始-->
            <div class="blk1"></div>
            <module_title modules-title="我关注的贫困户"></module_title>
            <div class="bg myhelp-con">
                <ul id="mypoor" class="mypoor-con" v-if="poorLength > 0">
                    <a v-for="item in helppoor" @click="appjs('syJsbLaunchWebview', item.touch_url)">
                        <li class="mypoor-slide">
                            <div class="touxiang"><img :src="item.real_avatar" width="100%" height="100%" alt="" ></div>
                            <div class="index-nav-tit">{{item.member_truename}}</div>
                        </li>
                    </a>
                    <a @click="appjs('syJsbLaunchWebview', helppoorAttention)">
                        <li class="mypoor-slide">
                            <div class="touxiang touxiang-add">+添加</div>
                        </li>
                    </a>
                </ul>
                <!-- 没有关注贫困户的状态-->
                <div id="myattention" v-else>
                    <div class="attention-no-top">您还没有关注过贫困户，赶紧行动吧！</div>
                    <a @click="appjs('syJsbLaunchWebview', helppoorAttention)" class="attention-no-bot"><div class="attention-no-btn">去关注</div></a>
                </div>
            </div>
            <!--我帮扶的贫困户结束-->
            <!--贫困户自营开始-->
            <div class="blk1"></div>
            <module_title modules-title="贫困户自营"></module_title>
            <!--list-->
            <ul class="index-need-help bg ">
                <a @click="appjs('syJsbLaunchWebview', selfSale0.touch_url)" v-if="selfSale0">
                    <li class="index-need-help-list1 index-need-help-list3"  >
                        <div class="index-need-help-list-right" style="position: relative">
                            <div v-show="!poorImgLoadLeft" style="width:100%;position: absolute;margin:.9rem auto">加载中</div>
                            <img @load="ispoorImgLoadLeft" v-show="poorImgLoadLeft" :src="selfSale0.real_goods_image" width="100%" alt="">
                        </div>
                        <div class="index-need-help-list-left">
                            <div class="index-need-help-list-left-tit3">{{selfSale0.goods_name}}</div>
                            <div class="index-need-help-list-left-price main-color"><span>￥</span>{{selfSale0.goods_price}}</div>
                        </div>
                    </li>
                </a>
                <a v-for="(item,index) in selfSale1" @click="appjs('syJsbLaunchWebview', item.touch_url)">
                    <li class="index-need-help-list2">
                        <div class="index-need-help-list-left">
                            <div class="index-need-help-list-left-tit">{{item.goods_name}}</div>
                            <div class="index-need-help-list-left-price main-color"><span>￥</span>{{item.goods_price}}</div>
                        </div>
                        <div class="index-need-help-list-right" style="position: relative">
                            <div v-show="!selfSale1ImgLoad[index]['isLoaded']" style="position: absolute;width:100%;margin:.5rem auto">加载中</div>
                            <img @load="isselfSale1ImgLoad(index)" v-show="selfSale1ImgLoad[index]['isLoaded']" :src="item.real_goods_image" width="100%" alt="">
                        </div>
                    </li>
                </a>
            </ul>
            <div class="slide-more"><a @click="appjs('syJsbLaunchWebview', selfMore)">查看更多&gt;</a></div>
            <!--贫困户自营结束-->
            <!--无公害产品开始-->
            <div class="blk1"></div>
            <div class="zh-index-list bg">
                <module_title modules-title="无公害"></module_title>
                <div class="line"></div>
                <div class="blk2"></div>
                <div  class="index-outer-slide">
                    <div class="swiper-container swiper-container3" ref="wugonghai" v-if="wgh.length > 0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in wgh" >
                                <a @click="appjs('syJsbLaunchWebview', item.touch_url)">
                                    <div class="slide-top"><img :src="item.real_goods_image" alt=""></div>
                                    <div class="slide-bot">
                                        <div class="slide-bot-tit">{{item.goods_name}}</div>
                                        <div class="slide-bot-number">￥{{item.goods_price}}</div>
                                    </div>
                                </a>
                            </div>
                            <div class="swiper-slide">
                                <div class="wg-slide-more wg-slide">
                                    <a @click="appjs('syJsbLaunchWebview', wghtouchmore+'&from_action=index')"><div>查看更多&gt;</div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="blk2 bg"></div>
            <!--无公害产品结束-->

            <!--有机认证产品开始-->
            <div class="blk1"></div>
            <module_title modules-title="有机"></module_title>
            <!--col2-list-->
            <ul class="index-need-help bg">
                <a @click="appjs('syJsbLaunchWebview', youjigoods0.touch_url)" v-if="youjigoods0">
                    <li class="index-need-help-list1 index-need-help-list3" >
                        <div class="index-need-help-list-right" style="position: relative">
                            <div v-show="!youjiLeftImgLoad" style="position: absolute;width:100%;margin:.8rem auto">加载中</div>
                            <img @load="isyoujiLeftImgLoad" v-show='youjiLeftImgLoad' :src="youjigoods0.real_goods_image" width="100%" alt="">
                        </div>
                        <div class="index-need-help-list-left">
                            <div class="index-need-help-list-left-tit3">{{youjigoods0.goods_name}}</div>
                            <div class="index-need-help-list-left-price main-color"><span>￥</span>{{youjigoods0.goods_price}}</div>
                        </div>
                    </li>
                </a>
                <a v-for="(item,index) in youjigoodsList" @click="appjs('syJsbLaunchWebview', item.touch_url)">
                    <li class="index-need-help-list2">
                        <div class="index-need-help-list-left">
                            <div class="index-need-help-list-left-tit">{{item.goods_name}}</div>
                            <div class="index-need-help-list-left-price main-color"><span>￥</span>{{item.goods_price}}</div>
                        </div>
                        <div class="index-need-help-list-right" style="position: relative">
                            <div v-show="!youjirightImgLoad[index]['isLoaded']" style="width:100%;position: absolute;margin:.5rem auto">加载中</div>
                            <img @load="isyoujirightImgLoad(index)" :src="item.real_goods_image" width="100%" alt="">
                        </div>
                    </li>
                </a>
            </ul>
        </div>
        <div class="slide-more"><a @click="appjs('syJsbLaunchWebview', youji.touch_url_more)">查看更多&gt;</a></div>
        <!--有机认证产品结束-->


        <!--特产馆开始-->
        <div id="teChanG" v-if="techanok">
            <div class="blk1" ></div>
            <module_title modules-title="特产馆"></module_title>
            <div class="blk1" style="background: #fff"></div>
            <div class="index-nav bg"></div>
            <!--图片row-4-->
            <div class="bg">
                <ul class="techanguan">
                    <li><img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/pian01.jpg'" alt="淳化县" @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&send_area=陕西省 咸阳市 淳化县&province_id=610&city_id=610400000000&area_id=610430000000')"></li>
                    <li v-for="img in chunhua">
                        <a @click="appjs('syJsbLaunchWebview', img.touch_url)"><img :src="img.real_goods_image" alt=""></a>
                    </li>
                </ul>
                <ul class="techanguan">
                    <li><img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/pian02.jpg'" alt="xunyi"  @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&send_area=陕西省 咸阳市 旬邑县&province_id=610&city_id=610400000000&area_id=610429000000')"></li>
                    <li v-for="img in xunyi">
                        <a @click="appjs('syJsbLaunchWebview', img.touch_url)"><img :src="img.real_goods_image" alt=""></a>
                    </li>
                </ul>
                <ul class="techanguan">
                    <li><img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/pian03.jpg'" alt="changwu"  @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&send_area=陕西省 咸阳市 长武县&province_id=610&city_id=610400000000&area_id=610428000000')"></li>
                    <li v-for="img in changwu">
                        <a @click="appjs('syJsbLaunchWebview', img.touch_url)"><img :src="img.real_goods_image" alt=""></a>
                    </li>
                </ul>
                <ul class="techanguan">
                    <li><img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/pian04.jpg'" alt="yongshou"  @click="appjs('syJsbLaunchWebview', siteInfo.host + '/bocm/index.php?act=goods&op=search_poor_goods_list&send_area=陕西省 咸阳市 永寿县&province_id=610&city_id=610400000000&area_id=610426000000')"></li>
                    <li v-for="img in yongshou">
                        <a @click="appjs('syJsbLaunchWebview', img.touch_url)"><img :src="img.real_goods_image" alt=""></a>
                    </li>
                </ul>
                <div class="blk1" style="background:#fff"></div>
            </div>
        </div>
        <!--特产馆结束-->

        <!--脱贫先锋开始-->
        <div class="blk1"></div>
        <module_title modules-title="脱贫先锋"></module_title>
        <div class=" index-nav index-nav2 bg">
            <ul>
                <li class="overflowH" v-for="(tuopin,index) in tuopinAll">
                    <a @click="appjs('syJsbLaunchWebview', tuopin.touch_url)">
                        <div class="touxiang" style="position: relative">
                            <div v-show="!tuopinImgLoad[index]['isLoaded']" style="width:100%;position: absolute;margin:.25rem auto;">加载中</div>
                            <img @load="istuopinImgLoad(index)" :src="tuopin.real_avatar" width="100%"
                                 :onerror="'this.src=\''+siteInfo.cdn_host+'/bocm/platformjs/static/image/bigLoveShop/man.png\''" height="100%" alt=""/>
                        </div>
                        <div class="index-nav-tit">{{tuopin.member_info.member_truename}}
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <!--脱贫先锋结束-->
        <!--优秀助理人开始-->
        <div class="blk1"></div>
        <module_title modules-title="优秀助理人"></module_title>
        <div class=" index-nav bg">
            <ul>
                <li v-for="(zhuliren,index) in zhulirenAll">
                    <a @click="appjs('syJsbLaunchWebview', zhuliren.touch_url)">
                        <div class="touxiang" style="position: relative">
                            <div v-show="!zhulirenImgLoad[index]['isLoaded']" style="position: absolute;width:100%;margin:.5rem auto">加载中</div>
                            <img @load="iszhulirenImgLoad(index)"  :src="zhuliren.real_avatar"
                                 :onerror="'this.src=\''+siteInfo.cdn_host+'/bocm/platformjs/static/image/bigLoveShop/man.png\''" width="100%" height="100%" alt="">
                        </div>
                        <p class="index-nav-tit">{{zhuliren.member_info.member_truename}}</p>
                        <p class="index-nav-fonts">总评分 {{zhuliren.store_score}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <!--优秀助理人结束-->
    </div>
</template>

<script scoped>
	import moduleTitle from './modules_title.vue'
	import appjs from '../appjs/appjs.js'
	import Swiper from '../../../static/js/swiper-3.4.2.min'
	export default {
		data () {
			return {
				iconlist: [
					{url: this.siteInfo.cdn_host+'/bocm/platformjs/static/image/guolan.png',title: '善源甄选',description: '企业集采，扶贫码专区',touch_url: this.siteInfo.host+'/bocm/index.php?act=goods&op=bizbuy'},
					{url: this.siteInfo.cdn_host+'/bocm/platformjs/static/image/apple.png',title: '有机认证',description: '天然产品，农药无残留',touch_url: this.siteInfo.host+'/bocm/index.php?act=goods&op=search_poor_goods_list&publisher_type=poor&goods_cert=organic'},
					{url: this.siteInfo.cdn_host+'/bocm/platformjs/static/image/xin.png',title: '无公害认证',description: '产地无污染，生产过程规范',touch_url: this.siteInfo.host+'/bocm/index.php?act=goods&op=search_poor_goods_list&publisher_type=poor&goods_cert=wgh'},
					{title: '全部产品',touch_url: this.siteInfo.host+'/bocm/index.php?act=goods&op=search_poor_goods_list&from_action=index'}
				],
				iconlistImgLoad:[{isLoaded:false},{isLoaded:false},{isLoaded:false},{isLoaded:false}],
				iconlistleftImgLoad:false,
				iconlistTopImgLoad:false,
				iconlistBottomImgLoad:false,
				zxbfImgLoad:[],
				poorImgLoadLeft:false,
				selfSale1ImgLoad:[],
				youjiLeftImgLoad:false,
				youjirightImgLoad:[],
				zhulirenImgLoad:[],
				tuopinImgLoad:[],
				zhulirenAll: '',
				tuopinAll: '',
				zxbf: [],
				zxbfMore: '',
				helppoor: [],
				poorLength: 0,
				helppoorAttention: '',
				selfSale0: {},
				selfSale1: [],
				selfMore: '',
				zhulirenDisplay: [],
				tuopinDisplay: [],
				youji: {},
				youjigoods0: {},
				wgh: [],
				wghtouchmore:'',
				youjigoodsList: [],
				chunhua: [],
				xunyi: [],
				changwu: [],
				yongshou: [],
				techanguan: {},
				techanok:''
			}
		},
		components: {
			module_title: moduleTitle
		},
		created: function () {
			this.getData()
		},
		methods: {
			isImgLoaded(dataImg){
				this[dataImg] = true;
			},
			iszxbfImgLoad(index){
				this.zxbfImgLoad[index]['isLoaded'] = true;
			},
			ispoorImgLoadLeft(){
				this.poorImgLoadLeft = true;
			},
			isselfSale1ImgLoad(index){
				this.selfSale1ImgLoad[index]['isLoaded'] = true;
			},
			isyoujiLeftImgLoad(){
				this.youjiLeftImgLoad = true;
			},
			isyoujirightImgLoad(index){
				this.youjirightImgLoad[index]['isLoaded'] = true;
			},
			iszhulirenImgLoad(index){
				this.zhulirenImgLoad[index]['isLoaded'] = true;
			},
			istuopinImgLoad(index){
				this.tuopinImgLoad[index]['isLoaded'] = true;
			},
			getData () {
				this.$http.get(this.siteInfo.host + '/api/index.php?act=index&op=index&page=3').then(res => {
					this.zxbf = res.data.content.most_help_info.goods_list
					this.zxbf.forEach(()=>this.zxbfImgLoad.push({isLoaded:false}))
					this.zxbfMore = res.data.content.most_help_info.touch_url_more
					this.poorLength = res.data.content.iwanthelp.poor_list.length
					if(this.poorLength !== 0) {
						this.helppoor = res.data.content.iwanthelp.poor_list
						this.poorLength = this.helppoor.length
					}
					this.helppoorAttention = res.data.content.iwanthelp.touch_more_url
					this.selfSale0 = res.data.content.self_sale.goods_list[0]
					this.selfAll = res.data.content.self_sale.goods_list
					this.selfSale1 = []
					for (let j = 1; j < this.selfAll.length; j++) {
						this.selfSale1.push(this.selfAll[j])
						this.selfSale1ImgLoad.push({isLoaded:false})
					}
					this.selfMore = res.data.content.self_sale.touch_url_more
					this.wgh = res.data.content.wugonghai.goods_list
					this.wghtouchmore = res.data.content.wugonghai.touch_url_more
          this.$nextTick(() => {
            var mySwiper = new Swiper(this.$refs.wugonghai, {
              initialSlide : 0,
              direction : 'horizontal',
              slidesPerView : 2.5,
              paginationClickable: true,
              spaceBetween: 15,
              freeMode: true,
              observer:true,
              observeParents:true
            })
          })
				})
				this.$http.get(this.siteInfo.host + '/api/index.php?act=index&op=index&page=4').then(res => {
					this.zhulirenAll = res.data.content.youxiuzhuliren
					this.zhulirenAll.forEach(()=>this.zhulirenImgLoad.push({isLoaded:false}))
					this.tuopinAll = res.data.content.tuopinxianfeng
					this.tuopinAll.forEach(()=>this.tuopinImgLoad.push({isLoaded:false}))
					this.youji = res.data.content.youji
					this.youjigoodsAll = this.youji.goods_list
					this.youjigoods0 = this.youjigoodsAll[0]
					this.youjigoodsList = []
					for (let i = 1; i < this.youjigoodsAll.length; i++) {
						this.youjigoodsList.push(this.youjigoodsAll[i])
						this.youjirightImgLoad.push({isLoaded:false})
					}
					this.techanguan = res.data.content.techanguan
					if (typeof this.techanguan === "object" && !(this.techanguan instanceof Array)) {
						this.changwu = this.techanguan.changwu
						this.xunyi = this.techanguan.xunyi
						this.yongshou = this.techanguan.yongshou
						this.chunhua = this.techanguan.chunhua
						this.techanok = true
					} else {
						this.techanok = false
					}
				})
			},
			appjs (method, params='') {
				appjs(method, params)
			}
		}
	}
</script>

<style scoped>
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .main-color {color: #f41e37}
    .product { height:auto; min-height:2rem; overflow: hidden; padding-top: 0.2rem; box-sizing:border-box; width:7.5rem;}
    .product-wrap .show{ display: block;}
    /*product-icon-title*/
    .product-icon-title{width:7.5rem;height:3.4rem;background-color:#fff;padding:0.34rem 0 0.30rem 0;}
    .icon-title-jicai{float: left;width: 3.492rem;height: 3.4rem;border-right: 0.01rem solid #e1e1e1; margin-left: 0.24rem;overflow: hidden;-webkit-box-sizing: border-box;-moz-box-sizing:border-box;-o-box-sizing:border-box;box-sizing: border-box;}
    .jicai-title{font-size:0.3rem;color:#2c2c2c;text-align:left;line-height:0.45rem;}
    .jicai-txt{font-size:0.2rem;line-height:0.36rem;text-align:left;color:#929292;height:0.72rem;}
    .jicai-png{width:2.35rem;height:1.75rem;padding-left:0.35rem;}
    .jicai-png>img{width:100%;height:100%;}
    .icon-title2{float:left;width:3.75rem;height:3.4rem; box-sizing: border-box}
    .padd-left{padding-left:0.24rem;}
    .padd-bottom{padding-bottom:0.2rem;}
    .margin-top30{margin-top:0.3rem;}
    .renzhen-con{width:3.5rem;height:1.46rem;padding-bottom:0.08rem;}
    .border-top1{border-top:0.01rem solid #e1e1e1;}
    .renzhen{float:left;width:1.7rem;text-align:left;height:1.28rem; padding-top: 0.12rem;}
    .renzhen-txt{font-size:0.2rem;line-height:0.36rem;color:#929292;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;  -webkit-box-orient: vertical;}
    .renzhen-img{float:left;width:1.14rem;height:1.28rem; margin-left: 0.2rem}
    .renzhen-img>img{width:100%;height:100%;}

    /*.product-no { line-height:7rem; text-align:center; font-size:0.28rem; color:#666;}*/
    .index-nav{  width:7.5rem; box-sizing:border-box; margin:0 auto; }
    .bg { background: #fff;}
    .blk1 {height:0.2rem;background:#f4f5f6}
    .overflowH { overflow:hidden; }
    /*woBangFuDePinKunHu*/
    .myhelp-con {width:7.5rem; box-sizing:border-box; margin:0 auto;}
    .mypoor-con { overflow:hidden;display:flex;display: -webkit-flex;}
    .mypoor-con .mypoor-slide {width:1.875rem;display:inline-block;text-align:center; padding:.16rem 0 0.2rem; box-sizing:border-box;border-left:none; position:relative;}
    .loading {display:flex;justify-content: center;}
    .index-nav li{ width:1.875rem; float:left; text-align:center; padding:.16rem 0 0.2rem; box-sizing:border-box; border-left:none; position:relative;}
    .touxiang{ width:1.2rem; height:1.2rem; display:block; margin:0 auto .12rem; border-radius:2rem; overflow:hidden;}
    .index-nav ul{ overflow:hidden;}
    .index-nav li img{ width:100%; height:100%;display:block;}
    .index-nav-tit,.index-nav-fonts{ font-size:.26rem; height:.40rem; line-height:.40rem; color:#333;}
    .index-nav-fonts{ color:#666; font-size:.24rem;}
    .index-nav a{ color:#444;}
    .index-nav2  .touxiang{ width:0.8rem; height:0.8rem; display:block; margin:0 auto .12rem; border-radius:2rem; overflow:hidden;}
    .index-nav2 ul{ padding:0 0.24rem;}
    .index-nav2 li{ width:1.755rem; float:left; text-align:center; padding:.24rem 0 0.2rem; box-sizing:border-box; border-left:none;}
    .index-nav2 li span{ width:0.2rem; height:0.24rem; background:url(/bocm/platformjs/static/image/zh44.png) no-repeat center center/0.2rem 0.23rem; position:absolute; right:0.54rem; bottom:0.72rem;}
    .index-nav2 .shop-touxiang{ width:1rem; height:1rem;}
    /*有关注状态*/
    /*.mypoor {display:block;}*/
    /*无关注状态*/
    /*.myattention {display:none;}*/
    .attention-no-top{ text-align:center; font-size:0.3rem; color:#999; line-height:0.6rem;}
    .attention-no-bot{display:block;background:#fff;padding-bottom:0.4rem;}
    .attention-no-btn{ margin:0.2rem auto; height:0.6rem; line-height:0.6rem; width:2.4rem; text-align:center; border:1px solid #f31e37; border-radius:0.08rem; color:#f31e37;}

    .index-need-help-list-right img{ width:100%; height:100%; display:block;}

    .index-need-help{ width:7.5rem; overflow:hidden;}
    .index-need-help li{ width:50%; box-sizing:border-box; padding:0.32rem 0.2rem 0.4rem 0.24rem; overflow:hidden; float:left;}
    .index-need-help .index-need-help-list1{ border-top:none; border-left:none;}
    .index-need-help-list-left{ float:left; width:1.56rem; text-align: left}
    .index-need-help-list-left-tit{ line-height:0.34rem; color:#333; margin-bottom:0.1rem; font-size:0.24rem; overflow:hidden;text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
    .index-need-help-list-left-price{ font-size:0.3rem;}
    /*col-2*/
    .index-need-help-list-right{ float:right; width:1.66rem; height:1.16rem; overflow:hidden; /*margin-top:0.08rem;*/}
    .index-need-help-list-right img{ width:100%; height:100%; display:block;}
    /*查看更多*/
    .slide-more { background:#fff;width:7.5rem;height:0.84rem;margin:0 auto; line-height:0.84rem; text-align:center; color:#666; text-align:center; font-size:0.26rem; border-top:1px solid #f4f5f6;}
    .slide-more { background:#fff;width:7.5rem;height:0.84rem;margin:0 auto; line-height:0.84rem; text-align:center; color:#666; text-align:center; font-size:0.26rem; border-top:1px solid #f4f5f6;}
    .slide-more>a {display:block;width:100%;color:#7e8c8d!important;}
    /*我帮扶的贫困户*/
    .touxiang{ width:1.2rem; height:1.2rem; display:block; margin:0 auto .12rem; border-radius:2rem; overflow:hidden;}
    .touxiang-add{ border:1px solid #e0e0e0; line-height:1.2rem; text-align:center; color:#999; font-size:0.24rem;}
    /*贫困户自营*/
    .index-need-help .index-need-help-list3{ height:3.96rem; box-sizing:border-box; overflow:hidden;}
    .index-need-help .index-need-help-list3 .index-need-help-list-left{ float:left; width:2.9rem; text-align: left}
    .index-need-help .index-need-help-list3 .index-need-help-list-left-tit3{width:2.9rem; line-height:0.36rem; color:#333;  font-size:0.24rem; overflow:hidden;text-overflow:ellipsis;  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; margin:0.14rem 0 0.04rem;}
    .index-need-help .index-need-help-list3 .index-need-help-list-left-price{ font-size:0.3rem;}
    .index-need-help .index-need-help-list3 .index-need-help-list-right{ float:left; width:2.9rem; height:2.03rem; overflow:hidden; margin-top:0.08rem}
    /*无公害*/
    .index-outer-slide{ overflow-y:auto;}
    .swiper-container { height:3.5rem;}
    .swiper-container3 .swiper-slide{ width:2.9rem; text-align:left;}
    .swiper-container3 .slide-more div { width:2.38rem;height:2.01rem; border: 1px solid #e9e9e9; line-height:2.01rem; text-align: center; color: #666; text-align: center; font-size: 0.24rem; position:relative; }
    .wg-slide-more{width:2.38rem;height:2.01rem; border: 1px solid #e9e9e9; line-height:2.01rem; text-align: center; color: #666; text-align: center; font-size: 0.24rem; position:relative;}
    .wg-slide{align-self:flex-start;}
    /*.swiper-wrapper img{ width:7.5rem; height:100%; display:block;}*/
    .slide-top{ width:2.9rem; height:2.03rem; overflow:hidden; margin-bottom:0.2rem; }
    .slide-top img{ display:block; width:100%; height:100%;}
    .slide-bot{ width:2.8rem; text-align: left}
    .slide-bot-tit{line-height:0.32rem; height: 0.64rem; overflow:hidden; text-overflow:ellipsis;  font-size:0.24rem; color:#000;margin-left:0.2rem; display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
    .slide-bot-number{ height:0.5rem; line-height:0.5rem;font-size:0.32rem; color:#f41e37; margin-bottom:0.04rem; margin-left:0.14rem;}
    .techanguan{ width:7.5rem; padding:0 0.24rem; overflow:hidden;}
    .techanguan li{ float:left; width:1.65rem; height:1.15rem; margin-right:0.14rem; margin-bottom:0.2rem;}
    .techanguan img{ display:block; width:100%; height:100%;}
</style>
