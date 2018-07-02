<template>
    <div>
        <div v-title="'待支付购物清单'"></div>
        <div class="donate-goods-top border-both" >
            <div>
                <ul class="goods-ad">
                    <li class="goods-ad-L"><img src="https://t1.17shanyuan.com/bocm/templates/default/assets/images/ap39.png" height="16"></li>
                    <li class="goods-ad-R">{{receive_info.receiver_name}}&nbsp;&nbsp;收<span style=" margin-left: 24px;">{{receive_info.phone}}</span></li>
                    <!--<div class="v3-list-styles-C">其他地址</div>-->
                </ul>
                <ul class="goods-ad">
                    <li class="goods-ad-L" style="padding-top:2px;"></li>
                    <li class="goods-ad-R" style="padding-top:2px; font-weight:normal; color:#4b4f63;font-weight:300; font-size:14px; width: 91%; line-height: 18px;" v-html="receive_info.address"></li>

                </ul>
            </div>
            <div style="clear: both;"></div>
        </div>
        <div class="blk1" style="background:#f7f9fa;"></div>
        <!--优惠券部分-->
        <div class="youhuiquan">
            <div class="youhuiquan-1">
                <div class="youhuiquan-L">商品总额</div><div class="youhuiquan-R">￥{{total_goods_amount_cut[0]}}<span>.{{total_goods_amount_cut[1]}}</span></div>
            </div>
            <div class="youhuiquan-1">
                <div class="youhuiquan-L">运费</div><div class="youhuiquan-R">+￥{{total_shipping_fee_amount_cut[0]}}<span>.{{total_shipping_fee_amount_cut[1]}}</span></div>
            </div>
            <div class="youhuiquan-1" v-if="total_discount_amount != 0">
                <div class="youhuiquan-L">商品优惠</div><div class="youhuiquan-R">-￥{{total_discount_amount_cut[0]}}<span>.{{total_discount_amount_cut[1]}}</span></div>
            </div>
            <div class="youhuiquan-1 " v-if="total_coupon_pay_amount != 0">
                <div class="youhuiquan-L">扶贫电子码</div><div class="youhuiquan-R">-￥{{total_coupon_pay_amount_cut[0]}}<span>.{{total_coupon_pay_amount_cut[1]}}</span></div>
            </div>
        </div>
        <div class="line"></div>
        <div class="youhuiquan-b">
            <div class="youhuiquan-bottom">实付款：￥{{total_money_pay_amount}}<span v-if="total_points !=0 ">+{{total_points}}积分</span></div>
        </div>

        <div class="blk1"></div>
        <div class="banyuan"></div>
        <!--<div class="daizhifu"><div class="daizhifu-L">待支付：￥{{total_amount}} <span v-if="total_points !=0 "> + {{total_points}}积分</span></div></div>-->
        <div class="caption-content">
            <div class="caption" v-if="poor_get_fee != 0">
                <div class="caption-L"></div>
                <div class="caption-R">
                    <div class="pinkunhu">贫困户将获得帮扶<span>{{poor_get_fee}}</span>元</div>
                    <div class="jijinhiu" v-if="normal_fund_fee != 0">扶贫基金会将获得捐赠<span style="color:#4a90e2;">{{normal_fund_fee}}</span>元</div>
                    <div class="jifen">交易完成后您将获得奖励<span style="color:#4a90e2;">{{will_get_points}}</span>积分</div>
                </div>
            </div>
        </div>
        <div class="zhuijia">
            <div class="xin"><img v-if="syshop_fund_fee_list.length != 0" src="../../../../static/image/subpage/xin-38-32.png" alt="图片正在加载..."></div>
            <div class="zhuijia-R">
                <div class="zhuijia-zi" v-if="syshop_fund_fee_list.length != 0" v-for="item in syshop_fund_fee_list">感谢您的爱心，{{item.publisher_name}}将额外追加捐赠{{item.total_fund_fee}}元</div>
            </div>
        </div>
        <div class="banyuan-xian">
            <div class="banyuan-L"></div><div class="xuxian"></div><div class="banyuan-R"></div>
        </div>
        <div class="qingdan">
            <div class="qingdan-zi">购物清单</div>
            <div class="qingdanlist " v-for="item in orderList">
                <div class="list-top clearfix">
                    <div class="role">
                        <img v-if="item.publisher_tag == '贫困户'" class="icon-logo" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-poor.png'" alt="poor">
                        <img v-if="item.publisher_tag == '助理人'" class="icon-logo" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-zhuliren.png'" alt="zhuli">
                        <img v-if="item.publisher_name == '善源甄选'" class="icon-logo" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-logo.png'" alt="zhenxuan">
                        <img v-if="item.publisher_tag == '善企'" class="icon-logo" :src="siteInfo.cdn_host + '/bocm/platformjs/static/image/icon-store.png'" alt="shanqi">
                        <span>{{item.publisher_tag}}{{item.publisher_name}}</span>
                    </div>
                    <div class="icon-ma" v-if="item.bottom_text != ''">码</div>
                    <div class="pinkun">{{item.top_text}}</div>
                    <div class="carriage">运费:{{item.shipping_fee}}元</div>
                </div>
                <div class="jc-goods-list active" v-for="goods in item.order_goods_list" @click="appjs('syJsbLaunchWebview', goods.touch_url)">
                    <div class="jc-goods-list-left" ><img :src="goods.goods_image" alt="图片正在加载..."/></div>
                    <div class="jc-goods-list-center">
                      <div class="jc-goods-list-center-tit">{{goods.goods_name}}</div>
                      <div class="jc-goods-list-center-norm"></div>
                      <div class="jc-goods-list-center-sku">{{goods.goods_spec}}</div>
                      <!--<div class="jc-goods-quan" v-if="item.bottom_text">{{item.bottom_text}}</div>-->
                    </div>
                    <div class="jc-goods-list-right">
                      <div class="list-right-con1">
                        <p class="right-price"><span class="jc-goods-rmb">￥</span><span class="jc-goods-number">{{goods.goods_price}}</span></p>
                        <p class="right-integral"><span v-if="goods.points" class="jc-goods-jifen">+{{goods.points}}积分</span></p>
                      </div>
                      <p class="count">x{{goods.goods_num}}</p>
                    </div>
                </div>
                <div class="line-bottom"></div>
            </div>
        </div>
        <div class="banyuan1"></div>
    </div>
</template>
<script>
    import appjs from '../../appjs/appjs.js'
    export default {
        data: function () {
           return{
               receive_info:{},
               orderList:[],
               total_amount:'',
               total_points:'',
               normal_fund_fee:'',
               poor_get_fee:'',
               will_get_points:'',
               syshop_fund_fee_list:[],
               total_goods_amount:'',
               total_shipping_fee_amount:'',
               total_coupon_pay_amount:'',
               total_discount_amount:'',
               total_money_pay_amount:'',
            }
        },
        computed:{
            total_goods_amount_cut: function () {
                return this.total_goods_amount.split(".")
            },
            total_shipping_fee_amount_cut:function () {
                return this.total_shipping_fee_amount.split(".")
            },
            total_discount_amount_cut:function () {
                return this.total_discount_amount.split(".")
            },
            total_coupon_pay_amount_cut:function () {
                return this.total_coupon_pay_amount.split(".")
            },
        },
        created:function () {
            this.getPayorder()
        },
        methods: {
            getPayorder (){
                var pay_sn = this.$route.params.pay_sn;
                this.$http.get(this.siteInfo.host + '/api/index.php?act=project&op=unpay_order_detail&pay_sn='+ pay_sn).then(res => {
                    this.receive_info = res.data.content.receive_info
                    this.orderList = res.data.content.order_list
                    for(var i=0,len=this.orderList.length; i<len; i++){
                      if(this.orderList[i].publisher_tag == '集采' && this.orderList[i].publisher_name == '公益中国'){
                        this.orderList[i].publisher_tag = '';
                        this.orderList[i].publisher_name = '善源甄选';
                      }
                      if(this.orderList[i].publisher_tag == '善企'){
                        if(this.orderList[i].company_abbreviation != ''){
                          this.orderList[i].publisher_name = this.orderList[i].company_abbreviation;
                        }else{
                          this.orderList[i].publisher_name = this.orderList[i].publisher_name;
                        }
                      }
                    }
                    this.total_amount = res.data.content.total_amount
                    this.total_points = res.data.content.total_points
                    this.normal_fund_fee = res.data.content.normal_fund_fee
                    this.poor_get_fee = res.data.content.poor_get_fee
                    this.will_get_points = res.data.content.will_get_points
                    this.syshop_fund_fee_list = res.data.content.syshop_fund_fee_list
                    for(var j=0,length=this.syshop_fund_fee_list.length; j<length; j++){
                      if(this.syshop_fund_fee_list[j].publisher_tag == '善企'){
                        if(this.syshop_fund_fee_list[j].company_abbreviation != ''){
                          this.syshop_fund_fee_list[j].publisher_name = this.syshop_fund_fee_list[j].company_abbreviation;
                        }else{
                          this.syshop_fund_fee_list[j].publisher_name = this.syshop_fund_fee_list[j].publisher_name;
                        }
                      }
                    }
                    this.total_goods_amount = res.data.content.total_goods_amount
                    this.total_shipping_fee_amount = res.data.content.total_shipping_fee_amount
                    this.total_coupon_pay_amount = res.data.content.total_coupon_pay_amount
                    this.total_discount_amount = res.data.content.total_discount_amount
                    this.total_money_pay_amount = res.data.content.total_money_pay_amount
                })
            },
            appjs (method, params='') {
                appjs(method, params)
            }
        }
    }
</script>
<style scoped>
    /*.donate-goods-top{ background:#fff;}*/
    .clearfix:after{content:"";display:block;clear:both;height:0;visibility: hidden;line-height:0;}
    .clearfix{zoom:1;}
    .goods-ad{ overflow:hidden;color:#4b4f63;}
    .goods-ad-L{ width:8.92%; float:left; padding-top:10px; text-align: left}
    .goods-ad-R{ width:70%; float:left; padding-top:11px; font-size: 0.28rem;line-height:0.14rem; font-weight:normal;text-align: left;}
    /*.v3-list-styles-C{background:url(../../../static/image/ap27.png) no-repeat left center;padding-top: 9px;height:16px;width:60px;float:right;background-position:100% 65%; font-size: 12px; color: #666;background-size: 5px 10px;}*/
    .banyuan{width:100%;height:0.12rem;background: url(/bocm/platformjs/static/image/subpage/banyuan26-12.png) repeat;background-size: 0.26rem 0.12rem }
    .daizhifu{width: 100%;height: 1.1rem;background: #fff;font-size:0.3rem;color: #666;line-height: 1.1rem;text-align: left;}
    .daizhifu-L{margin-left: 0.24rem}
    .caption-content{width: 100%;background: #fff;padding-top: 0.14rem;}
    .caption{width: 7rem;height: 2.08rem;background: #F6FAFF;margin: 0 auto;border-radius: 0.1rem 0 0 0.1rem;overflow: hidden}
    .caption-L{width: 0.1rem;height: 100%;background: #4a90e2;border-radius: 0.1rem 0 0 0.1rem;float: left}
    .caption-R{width: 6.9rem;height: 1.9rem;padding:0.1rem 0 0.05rem 0;float: left;display: -webkit-flex;display: flex;flex-direction: column;justify-content: space-around}
    .caption-R div{font-size:0.28rem;font-weight:300;color: #818c9e;text-align: left;padding-left:0.2rem;}
    .zhuijia{width:100%;background: #fff;overflow: hidden;}
    .zhuijia-R{float: left;width: 6.58rem}
    .caption-R span{font-size: 0.28rem;color: #4a90e2;font-weight:300;}
    .xin{width: 0.38rem;padding: 0.26rem 0.06rem 0.16rem 0.24rem;float: left}
    .xin img{width: 100%;height: 0.32rem;}
    .zhuijia-zi{font-size: 0.26rem;color: #F31e37;padding: 0.26rem 0 0.1rem 0.06rem;text-align: left }
    .banyuan-xian{width:100%;height:0.5rem;background:#fff;overflow: hidden}
    .banyuan-L{width: 0.24rem;height:0.46rem;float:left;background: url(/bocm/platformjs/static/image/subpage/banyuan-L.png)  no-repeat;background-size: 0.24rem 0.46rem;}
    .banyuan-R{width: 0.24rem;height:0.46rem;float:right;background: url(/bocm/platformjs/static/image/subpage/banyuan-R.png) no-repeat;background-size: 0.24rem 0.46rem;}
    .xuxian{width:6.55rem;height: 0.23rem;float:left;border-bottom:0.02rem dashed #ccc;padding-left:0.44rem;}

    /*清单*/
    .qingdan-zi{padding: 0.4rem 0 0.5rem 0.24rem;font-size: 0.3rem;color: #4b4f63;text-align: left;font-weight: normal;background: #fff}
    .qingdanlist{background: #fff;overflow: hidden;padding-bottom: 0.01rem}
    .list-top{position:relative;overflow:hidden;height:0.6rem;line-height:0.6rem;}
    .role{float:left;/*margin: 0.1rem 0 0.2rem 0.24rem;*/margin-left:0.32rem;overflow: hidden;padding-left:0.4rem;font-size: 0.24rem;color: #4b4f63;text-align: left;text-overflow: ellipsis;white-space: nowrap;max-width: 60%;}
    .icon-ma{float: left;width: 0.3rem;height: 0.3rem;margin: .14rem 0 0 .2rem;border-radius: 4px;line-height: 0.3rem;text-align: center;font-size: 0.24rem;color: #fff;background: #4A90E2;}
    .icon-logo{position:absolute;left:0.24rem;top:45%;transform:translateY(-51%);width:0.4rem;height:0.4rem;}
    /*.free-shipping{ float:right;color:#b1bbc4; font-size:0.24rem;padding-right: 0.24rem}*/
    .carriage{float:right;height:0.6rem;color:#b1bbc4; font-size:0.24rem;padding-right: 0.24rem}
    .jc-goods-list{ width:7.5rem; padding:0.1rem 0.24rem 0; box-sizing:border-box; overflow:hidden;}
    .jc-goods-list-left{ width:2.24rem; height:1.58rem; float:left; margin-right:0.3rem; overflow:hidden;border:0.02rem solid #eee;}
    .jc-goods-list-left img{ display:block; width:100%; height:100%;}
    .jc-goods-list-center{ float:left; width:3.18rem; height:1.66rem;border-bottom:none; position:relative;}
    .jc-goods-list-center-tit{ width:3.18rem;margin-bottom:0.17rem;font-size:0.28rem;font-weight:300;height:0.63rem;line-height:0.32rem;text-align: left; overflow:hidden; white-space:normal;color: #4B4F63;margin-top: 0.2rem;
        display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
    .jc-goods-list-center-sku{width:3.18rem;font-size:0.26rem;font-weight:300;line-height:0.37rem;text-align:left;color: #818C9E;white-space:nowrap;text-overflow: ellipsis;overflow:hidden;}
    /*.jc-goods-list-center-norm{width:4.48rem; height:0.34rem;line-height:0.34rem; font-size:0.22rem; color:#666; margin-top:0.1rem;text-align: left;}
    .jc-goods-list-center-bot{ font-size:0.26rem; width:4.48rem;position:static;color: #333}
    */
    .jc-goods-list-right{float:left;width:1.24rem;border-bottom:none;}
    .list-right-con1{margin-top:0.2rem;width:1.24rem;height:0.64rem;margin-bottom: 0.17rem;}
    .jc-goods-list-right .right-price{margin-bottom:0.04rem;width:1.24rem;line-height:0.32rem;text-align:right;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
    .jc-goods-list-right .right-integral{width:1.24rem;font-size:0.26rem;line-height:0.32rem;text-align:right;color:#4A90E2;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
    .jc-goods-list-center-bot{ position:absolute; bottom:0.28rem; width:3.18rem; height:0.42rem;}
    .jc-goods-rmb{ color:#4b4f63; font-size:0.24rem;}
    .jc-goods-number{ color:#4b4f63; font-size:0.28rem;line-height:0.32rem;}
    .jc-goods-jifen{ color:#333; font-size:0.26rem;color:#4A90E2;}
    .jc-goods-quan{color: #F31e37; font-size: 0.24rem;text-align:left;}
    .count{font-size: 0.3rem;color:#818c9e; float: right;padding-right: 0.24rem;text-align: right}
    .pinkun{width:2.96rem;height:0.6rem;line-height:0.6rem;color:#999; font-size:0.24rem;/*line-height:0.25rem;margin: 0.1rem 0 0.3rem 0.1rem;*/float: left;overflow:hidden;text-overflow:ellipsis; white-space:nowrap;}
    .banyuan1{width:100%;height:0.12rem;background: url(/bocm/platformjs/static/image/subpage/banyuanxia26-12.png) repeat;background-size: 0.26rem 0.12rem;margin-bottom: 1rem; }
    /*.line:last-child{display: none}
    .jc-goods-list-center:last-child{border-bottom: none}*/
    .line-bottom{width: 7.02rem;height: 0.02rem;border-bottom: 0.02rem solid #eee;margin: 0.2rem auto}
    /*优惠券部分*/
    .youhuiquan{width: 100%;padding-top:0.3rem;background: #fff;font-size: 0.28rem;color: #4b4f63;font-weight:300;/*display: -webkit-flex;display: flex;flex-direction: column;justify-content: space-around*/}
    .youhuiquan-1{width:7.02rem;height:0.3rem;padding-bottom: 0.3rem;margin-left: 0.24rem;}
    .youhuiquan-L{float: left}
    .youhuiquan-R{float: right;font-size: 0.28rem;color:#4a90e2;}
    .youhuiquan-R span{font-size:0.2rem; color:#4a90e2;}
    .youhuiquan-b{background: #fff;}
    .youhuiquan-bottom{width:7.02rem;height: 0.88rem;margin: 0 auto;font-size: 0.3rem;line-height:0.88rem;text-align:right;font-weight:normal;color: #4b4f63;background: #fff;}
    .youhuiquan-bottom span{font-size: 0.3rem;color: #333;font-weight: bold;}
</style>
