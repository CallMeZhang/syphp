<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

	export default {
		name: 'app'
	}
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
    {
        opacity: 0
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background: #f7f9fa;
        height: 100%;
    }

    #index-outbox {
        position: relative;
    }

    /*reset*/
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, menu, nav, output, ruby, section, summary, time, mark, audio, video, input {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-weight: normal;
        vertical-align: baseline;
    }

    .divider {
        height: 16px;
        width: 100%;
        background: #f3f5f7;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    /* HTML5 display-role reset for older browsers */

    article, aside, details, figcaption, figure, footer, header, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after, q:before, q:after {
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* custom */

    a {
        color: #7e8c8d;
        text-decoration: none;
        -webkit-backface-visibility: hidden;
    }

    li {
        list-style: none;
    }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-track-piece {
        background-color: rgba(0, 0, 0, 0.2);
        -webkit-border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:vertical {
        height: 5px;
        background-color: rgba(125, 125, 125, 0.7);
        -webkit-border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        width: 5px;
        background-color: rgba(125, 125, 125, 0.7);
        -webkit-border-radius: 6px;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    body {
        -webkit-text-size-adjust: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    /*global*/
    @media only screen and (max-width: 320px) {
        html {
            font-size: 42.66px;
        }
    }

    @media only screen and (min-width: 321px) and (max-width: 352px) {
        html {
            font-size: 46px;
        }
    }

    @media only screen and (min-width: 353px) and (max-width: 370px) {
        html {
            font-size: 48px;
        }
    }

    @media only screen and (min-width: 371px) and (max-width: 380px) {
        html {
            font-size: 50px;
        }
    }

    @media only screen and (min-width: 381px) and (max-width: 390px) {
        html {
            font-size: 52px;
        }
    }

    @media only screen and (min-width: 391px) and (max-width: 400px) {
        html {
            font-size: 53px;
        }
    }

    @media only screen and (min-width: 401px) and (max-width: 410px) {
        html {
            font-size: 54px;
        }
    }

    @media only screen and (min-width: 411px) and (max-width: 413px) {
        html {
            font-size: 54.8px;
        }
    }

    @media only screen and (min-width: 414px) and (max-width: 420px) {
        html {
            font-size: 55.2px;
        }
    }

    @media only screen and ( min-width: 421px) and ( max-width: 440px) {
        html {
            font-size: 58px;
        }
    }

    @media only screen and ( min-width: 441px) and ( max-width: 699px) {
        html {
            font-size: 58px;
        }
    }

    @media only screen and ( min-width: 700px) and (max-width: 768px) {
        html {
            font-size: 102.4px;
        }
    }

    @media only screen and ( min-width: 769px) and (max-width: 800px) {
        html {
            font-size: 106.667px;
        }
    }

    @media only screen and ( min-width: 801px) and (max-width: 1024px) {
        html {
            font-size: 136.533px;
        }
    }
    /*iphoneX-footer-fixed 适配*/
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
      .phonex-footer-h{height:auto!important;}
      .iphonex-margin-bottom{margin-bottom:0.68rem;}
      .iphonex-padding-bottom{padding-bottom:0.68rem;}
      .iphonex-jicai-padd-b{padding-bottom:1.98rem!important;}
      .has-topbar{height:100%;box-sizing:border-box;}
      .has-topbar:before{content: '';position: fixed;top: 0; left:0; width:100%;height: 44px;background:#000;z-index: 9998;}
      .has-bottombar{height: 100%;box-sizing: border-box;padding-bottom: 34px;}
      .has-bottombar:after{content: '';z-index: 9998;position: fixed; left:0; bottom:0; width:100%;height:34px;background: #f7f9fa;}
      /*分享按钮*/
      .recruit-share-btn1{bottom:3.08rem!important;}
      .recruit-share-btn2{bottom:1.98rem!important;}
      .vol-detail-btn1{bottom:2.28rem!important;}
      .vol-detail-btn2{bottom:1.18rem!important;}
      .iphonex-act-share{bottom:1.48rem!important;}
      .iphonex-syshop-share{top:calc(80% - 0.46rem)!important;}
      .iphonex-div{width: 100%;height: 0.68rem;}
      /*导航操作栏上移*/
      .iphonex-publicwel-bottom{bottom:2.48rem!important;}
      .iphonex-bizbuylist-marginbottom{margin-bottom:2.68rem!important;}
      .iphonex-strong-bottom{bottom:0.68rem!important;}
      .iphonex-bottom-div{padding-bottom:0.68rem;}
      .iphonex-bottom-div:after{display:block;content:"";width:100%;height:0.68rem;background:#fff;}
      .iphonex-btn-bottom{bottom:0.68rem;}
      .bottom-menu-fixed{bottom: 34px;}

    }
    body {
        font-family: "Helvetica Neue", "Lantinghei SC", "Hiragino Sans GB", "Microsoft Yahei", Arial, sans-serif;
        color: #333;
        background: #f4f6f5;
        font-size: 0.28rem;
    }

    body, ul, li, img, ol, input, table, tr, td, th {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    body {
        width: 7.5rem;
        margin: 0 auto;
    }

    body, input, textarea, a {
        outline: none;
    }

    html {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }

    body h1 {
        font-size: 0.34rem;
    }

    body h2 {
        font-size: 0.34rem;
        font-weight: normal;
        line-height: 0.34rem;
    }

    body h3 {
        font-size: 0.32rem;
        font-weight: normal;
        line-height: 0.32rem;
    }

    body h4 {
        font-size: 0.3rem;
        font-weight: normal;
        line-height: 0.3rem;
    }

    body h1, body h2, body h3, body h4 {
        padding: 0;
        margin: 0;
    }

    body a {
        text-decoration: underline;
    }

    body a:link, body a:visited {
        color: #2854ad
    }

    body a:active {
        color: #f31e37
    }

    body a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        text-decoration: none;
    }

    .main-color {
        color: #f31e37
    }

    .second-color {
        color: #4ca4fe
    }

    .third-color {
        color: #666
    }

    .fourth-color {
        color: #999
    }

    .def-color {
        color: #333 !important
    }

    .bg {
        background: #fff;
    }

    .hide {
        overflow: hidden;
    }

    /* 线 */
    body .line {
        height: 1px;
        background: #e9e9e9;
    }

    body .line-m {
        height: 1px;
        background: #e9e9e9;
        margin: 0 0.24rem;
    }

    .blk05 {
        height: 0.1rem;
    }

    .blk1 {
        height: 0.2rem;
    }

    .blk2 {
        height: 0.4rem;
    }

    .blk3 {
        height: 0.6rem;
    }

    .blk4 {
        height: 0.8rem;
    }

    .border-both {
        border-bottom: 1px solid #e9e9e9;
        border-top: 1px solid #e9e9e9;
    }

    .active:active {
        background: #e1e1e1;
    }

    .top {
        height: 0.98rem;
        line-height: 0.98rem;
        width: 7.5rem;
        margin: 0 auto;
        text-align: center;
        background: #f31e37;
        color: #fff;
        font-size: 0.34rem;
    }

    .content {
        padding: 0 0.24rem;
    }

    .second-top {
        height: 0.96rem;
        width: 7.5rem;
        margin: 0 auto;
        background: #fff;
        border-bottom: 0.02rem solid #ccc;
        line-height: 0.96rem;
        text-align: center;
        font-size: 0.34rem;
        position: relative;
    }

    .back {
        position: absolute;
        top: 0.28rem;
        left: 0.24rem;
    }

    .back img {
        display: block;
        height: 0.4rem;
    }

    /*public*/
    body {
        font-family: "Helvetica Neue", "Lantinghei SC", "Hiragino Sans GB", "Microsoft Yahei", Arial, sans-serif;
        color: #333;
        background: #f4f6f5;
        font-size: 0.28rem;
    }

    body, ul, li, img, ol, input, table, tr, td, th {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    body {
        width: 7.5rem;
        margin: 0 auto;
    }

    body, input, textarea, a {
        outline: none;
    }

    html {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }

    /*列表样式一*/
    .v2-zizhu-list {
        padding: 0 0.24rem;
        height: 0.88rem;
        width: 7.02rem;
        overflow: hidden;
        background: #fff;
    }

    .v2-zizhu-list div {
        height: 0.88rem;
        line-height: 0.88rem;
    }

    .v2-zizhu-list-L {
        width: 3rem;
        float: left;
        font-size: 0.28rem;
        text-align: left;
    }

    .v2-zizhu-list-C {
        width: 3.64rem;
        text-align: right;
        color: #999;
        float: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.28rem;
    }

    .v2-zizhu-list-R {
        width: 0.36rem;
        background: url(/bocm/platformjs/static/image/ap27.png) no-repeat right center;
        background-size: 0.15rem 0.26rem;
        float: right;
    }

    /*物流流程*/
    .logistics-cont {
        width: 7.02rem;
        padding: 0 .24rem;
        border-bottom: .02rem solid #f0f0f0;
    }

    .logistics-cont table {
        width: 7.02rem;
    }

    .logistics-cont tr {
        background: #fff;
    }

    .logistics-cont td {
        padding: .2rem 0;
        border-bottom: .02rem solid #f0f0f0;
    }

    .logistics-first {
        width: 1.24rem;
    }

    .logistics-first-top {
        font-size: .24rem;
        line-height: .3rem;
    }

    .logistics-first-bot {
        font-size: .36rem;
        line-height: .4rem;
        margin-top: .06rem;
        text-align: center
    }

    .logistics-second {
        width: .7rem;
    }

    .logistics-third {
        width: 4.9rem;
        font-size: .26rem;
        line-height: .36rem;
    }

    .logistics-third .space {
        margin-left: .16rem;
    }

    /*输入框*/
    .tianjia {
        padding: 0.24rem 0.24rem 0.3rem;
        width: 7.5rem;
        box-sizing: border-box;
    }

    .tianjia-top {
        line-height: 0.4rem;
        font-size: 0.28rem;
        margin-bottom: 0.2rem;
    }

    .input-box {
        width: 7.02rem;
        height: 0.84rem;
        border: 0.02rem solid #ccc;
        border-radius: 0.06rem;
    }

    .input-box input {
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.26rem;
        border: none;
        width: 6.8rem;
        margin-top: 0.2rem;
        padding-left: 0.24rem;
        box-sizing: border-box;
        font-family: "微软雅黑";
    }

    /*长按钮*/
    .primary-btn {
        height: 0.88rem;
        width: 7.02rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
        font-size: 0.3rem;
        margin: 0 0.24rem;
        border-radius: 0.1rem;
        background: #f31e37;
    }

    .primary-btn:active {
        background: #c91328
    }

    .agree-box {
        overflow: hidden;
        padding: 0.24rem;
        width: 7.02rem;
    }

    .agree-box-fonts {
        height: 0.4rem;
        line-height: 0.4rem;
        float: left;
        margin-left: 0.1rem;
    }

    /*评价 table*/
    .assess-mana-tab {
        overflow: hidden;
        border-bottom: 1px solid #e0e0e0;
        width: 7.5rem;
    }

    .assess-mana-tab li {
        width: 1.875rem;
        float: left;
        height: 0.86rem;
        line-height: 0.86rem;
        text-align: center;
    }

    .assess-mana-tab li span {
        line-height: 0.80rem;
        padding: 0 0.2rem;
        font-size: 0.3rem;
        display: inline-block;
    }

    .assess-mana-tab a:link, .assess-mana-tab a:visited {
        color: #666;
    }

    .assess-mana-tab li .assess-mana-li-curr {
        border-bottom: 0.06rem solid #f31e37;
        color: #f31e37;
    }

    /*评价详情*/
    .assess-mana-cont-list {
        padding: 0 0.24rem 0.24rem;
        margin-top: -0.02rem;
        margin-bottom: 0.22rem;
        width: 7.02rem;
    }

    .assess-mana-cont-list-top {
        padding: 0.3rem 0;
        border-bottom: 1px solid #e0e0e0;
        overflow: hidden;
        width: 7.02rem;
    }

    .assess-mana-cont-list-img {
        float: left;
        width: 1rem;
        height: 0.7rem;
        margin-right: 0.2rem;
    }

    .assess-mana-cont-list-img img {
        display: block;
    }

    .assess-mana-cont-list-right {
        float: left;
        width: 5.82rem;
    }

    .assess-mana-cont-list-name {
        width: 5.82rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 0.38rem;
        font-size: 0.28rem;
    }

    .assess-mana-cont-list-bianhao {
        font-size: 0.24rem;
        color: #666;
        line-height: 0.36rem;
    }

    .assess-details {
        position: relative;
    }

    .assess-details-top {
        padding: 0.2rem 0 0.14rem;
    }

    .assess-details-name {
        color: #666;
        margin-right: 0.12rem;
        font-size: 0.28rem;
    }

    .assess-details-top img {
        height: 0.26rem;
        width: 1.72rem;
        display: inline-block;
        position: relative;
        top: 0.02rem;
    }

    .assess-details-time {
        font-size: 0.24rem;
        margin-left: 0.2rem;
        color: #999;
    }

    .assess-details-article {
        line-height: 0.4rem;
        font-size: 0.28rem;
    }

    .assess-details-review {
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        right: 0;
        top: 0.18rem;
    }

    .assess-reply {
        position: relative;
        padding-top: 0.28rem;
    }

    .assess-reply-top {
        position: absolute;
        width: 0.22rem;
        height: 0.19rem;
        top: 0.06rem;
        left: 0.36rem;
        z-index: 9
    }

    .assess-reply-top img {
        width: 0.22rem;
        height: 0.19rem;
    }

    .assess-reply-cont {
        width: 6.98rem;
        padding: 0.16rem 0.16rem 0.1rem;
        box-sizing: border-box;
        background: #f6f6f6;
        border: 1px solid #eee;
        border-radius: 0.06rem;
        position: relative;
    }

    .assess-reply-cont-top {
        line-height: 0.36rem;
        font-size: 0.26rem;
        margin-bottom: 0.04rem;
    }

    .assess-reply-img {
        position: absolute;
        top: 0.12rem;
        right: 0.16rem;
        width: 0.37rem;
        height: 0.4rem;
    }

    .assess-reply-fonts {
        line-height: 0.38rem;
        font-size: 0.26rem;
    }

    /*暂无捐赠记录 */
    .no_record_wp {
        padding-bottom: 0.4rem;
        margin-top: 30%;
    }

    .no_record_wp .tip_img {
        margin: 0.56rem 0 0.2rem;
        text-align: center !important;
    }

    .no_record_wp img {
        display: inline;
    }

    .no_record_wp .tip_title {
        font-size: 0.3rem;
        margin-bottom: 0.4rem;
        text-align: center;
    }

    .no_record_wp .tip_intro {
        margin: 0 12% 0.5rem;
        font-size: 0.24rem;
        color: #666;
        text-align: center;
        line-height: 0.36rem;
    }

    .jicai-content {
        width: 7.5rem;
        box-sizing: border-box;
        padding-bottom: 0.1rem;
    }

    .jc-goods-list {
        width: 7.5rem;
        padding: 0.1rem 0.24rem 0;
        box-sizing: border-box;
        overflow: hidden;
    }

    .jc-goods-list-left {
        width: 2.24rem;
        height: 1.56rem;
        float: left;
        margin-right: 0.3rem;
        overflow: hidden;
    }

    .jc-goods-list-left img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .jc-goods-list-right {
        float: left;
        width: 4.48rem;
        height: 1.66rem;
        border-bottom: 1px solid #e0e0e0;
        position: relative;
    }

    .jc-goods-list-right-tit {
        width: 4.48rem;
        font-size: 0.3rem;
        line-height: 0.46rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
    }

    .jc-goods-list-right-norm {
        width: 4.48rem;
        line-height: 0.34rem;
        font-size: 0.24rem;
        color: #666;
        margin-top: 0.04rem;
    }

    .jc-goods-list-right-bot {
        position: absolute;
        bottom: 0.2rem;
        width: 4.48rem;
        height: 0.42rem;
    }

    .free-shipping {
        position: absolute;
        right: 0;
    }

    .jc-goods-list-right-bot-price {
        float: left;
    }

    .jc-goods-rmb {
        color: #f31e37;
        font-size: 0.28rem;
    }

    .jc-goods-number {
        color: #f31e37;
        font-size: 0.32rem;
    }

    .jc-goods-crate {
        color: #999;
        font-size: 0.24rem;
    }

    .free-shipping {
        float: right;
        color: #999;
        font-size: 0.24rem;
        margin-top: 0.1rem;
    }

    /*顶部进度 */
    .purchase-process {
        height: 0.88rem;
        line-height: 0.88rem;
        width: 7.5rem;
        padding-left: 0.24rem;
        box-sizing: border-box;
        font-size: 0.24rem;
    }

    .purchase-process-list {
        float: left;
        overflow: hidden;
        color: #999;
    }

    .purchase-process-list div {
        float: left;
    }

    .purchase-process-list-number {
        height: 0.32rem;
        width: 0.32rem;
        text-align: center;
        border-radius: 0.5rem;
        background: #ccc;
        color: #fff;
        margin: 0.28rem 0.08rem 0 0;
        line-height: 0.32rem;
    }

    .purchase-process-list-line {
        width: 0.36rem;
        height: 0.1rem;
        border-bottom: 1px solid #ccc;
        margin: 0.34rem 0.16rem 0 0.06rem;
    }

    .purchase-process-list1 {
        width: 2.76rem;
    }

    .purchase-process-list2 {
        width: 2.24rem;
    }

    .purchase-process-list-current {
        color: #333;
    }

    .purchase-process-list-current .purchase-process-list-line {
        border-bottom: 1px solid #333;
    }

    .purchase-process-list-current .purchase-process-list-number {
        background: #f31e37;
    }

    @media ( max-width: 350px) {
        .purchase-process-list-line {
            display: none;
        }

        .purchase-process-list1 {
            width: 2.5rem;
        }

        .purchase-process-list2 {
            width: 2.06rem;
        }

        .purchase-process-list3 {
            width: 2.46rem;
        }
    }

    /*列表数量加减 */
    .sku-count-box-left {
        height: 1.16rem;
        line-height: 1.16rem;
        float: left;
        width: 3.8rem;
        margin-left: 0.24rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .sku-count-box-right {
        float: right;
        margin-right: 0.24rem;
        margin-top: 0.3rem;
    }

    .sku-count-box-right div {
        float: right;
        margin-left: 0.12rem;
    }

    .sku-count-box-righ-in input {
        width: 1.14rem;
        height: 0.5rem;
        border: none;
        box-sizing: border-box;
        margin: 0.04rem 0 0 0.04rem;
        text-align: center;
    }

    /*列表页可输入框 */
    .v2-zizhu-list-C input {
        border: none;
        width: 1.5rem;
        text-align: center;
        font-size: 0.28rem;
    }

    /*二选一 */
    .agree-box3 {
        padding: 0;
        width: 3.5rem;
        float: left;
    }

    .agree-box3 .agree-check {
        display: none;
    }

    /*多选一 */
    .v2-zizhu-list-R2 {
        display: none;
    }

    .v2-zizhu-list .v2-zizhu-list-L2 {
        width: 6.5rem;
    }

    .v2-zizhu-list .v2-zizhu-list-L2 span {
        color: #999;
        font-size: 0.24rem
    }

    .v2-zizhu-list .v2-zizhu-list-R2 {
        background: url(/bocm/platformjs/static/image/ap37.png) no-repeat right center;
        background-size: 0.3rem auto;
    }

    /*多选一 */
    .exp {
        height: 0.66rem;
        padding: 0.04rem 0 0 0.24rem;
        color: #999;
        font-size: 0.24rem;
        box-sizing: border-box;
    }

    /*底部提交订单按钮 */
    .goods-bot-sure {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 7.5rem;
    }

    .goods-bot-sure-btn:hover {
        background: #bb3337;
    }

    .goods-bot-sure-btn {
        float: right;
        width: 2rem;
        height: 0.9rem;
        border-top: 1px solid #f31e37;
        line-height: 0.88rem;
        color: #fff;
        text-align: center;
        background: #f31e37;
        box-sizing: border-box;
        font-size: 0.24rem;
        font-size: 0.3rem
    }

    .bot-all-money {
        width: 5.3rem;
        float: left;
        text-align: right;
        height: 0.9rem;
        line-height: 0.88rem;
        box-sizing: border-box
    }

    .bot-all-money span span {
        font-size: 0.32rem;
    }

    /*地址部分 */
    .donate-goods-top {
        padding: 0 0.24rem 0.24rem;
        background: #fff;
    }

    .dona-good-top-title {
        height: 0.56rem;
        padding-top: 0.4rem;
        border-bottom: 1px solid #ccc;
    }

    .goods-ad {
        overflow: hidden;
    }

    .goods-ad-L {
        width: 8.92%;
        float: left;
        padding-top: 0.2rem;
    }

    .goods-ad-R {
        width: 70%;
        float: left;
        padding-top: 0.22rem;
        line-height: 0.28rem;
    }

    .goods-ad-R2 {
        padding-top: 0.04rem;
        color: #666;
        font-size: 0.24rem;
        width: 91%;
        line-height: 0.34rem;
    }

    .v3-list-styles-C2 {
        margin-top: 0.18rem;
        height: 0.32rem;
        line-height: 0.3rem;
        width: 1.2rem;
        float: right;
        background-position: 92% 84%;
        font-size: 0.24rem;
        color: #666;
        background: url(/bocm/platformjs/static/image/ap27.png) no-repeat right center;
        background-size: 0.1rem 0.2rem;
    }

    /*选择产品底部按钮 */
    .selcet-goods-bot {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 7.5rem;
        height: 0.94rem;
    }

    .selcet-goods-bot-home {
        width: 1.9rem;
        height: 0.94rem;
        float: left;
        position: relative;
    }

    .selcet-goods-bot-home-sum {
        position: absolute;
        top: 0.06rem;
        right: 0.56rem;
        width: 0.32rem;
        height: 0.32rem;
        line-height: 0.32rem;
        text-align: center;
        font-size: 0.2rem;
        color: #fff;
        background: #f31e37;
        border-radius: 0.6rem;
    }

    .selcet-goods-bot-btn {
        width: 5.6rem;
        height: 0.94rem;
        line-height: 0.94rem;
        font-size: 0.32rem;
        color: #fff;
        float: left;
        text-align: center;
        background: #f31e37;
    }

    .selcet-goods-bot-btn:hover {
        background: #d01027;
    }

    /*选择产品加减按钮*/
    .jc-goods-list-box {
        position: relative;
    }

    .select-new-goods-box {
        position: absolute;
        width: 0.8rem;
        height: 0.8rem;
        top: 0.5rem;
        right: 0.06rem;
    }

    /*淘宝样式一*/
    .v3-list-styles {
        height: 0.88rem;
        width: 7.5rem;
        box-sizing: border-box;
        padding: 0 0.24rem;
    }

    .v3-list-styles-L {
        line-height: 0.88rem;
        font-size: 0.26rem;
        float: left;
        margin-right: 0.24rem;
    }

    .v3-list-styles-C {
        float: left;
        height: 0.88rem;
        width: 0.6rem;
    }

    .v3-list-styles-R {
        float: right;
        height: 0.88rem;
        width: 2.4rem;
        line-height: 0.88rem;
        text-align: right;
        color: #f31e37;
        font-size: 0.26rem;
    }

    .goods-orders {
        overflow: hidden;
        background: #f4f6f5;
        padding: 0.2rem 0.24rem;
        width: 7.5rem;
        box-sizing: border-box;
    }

    .goods-orders img {
        display: block;
    }

    .goods-orders-left {
        width: 2.24rem;
        float: left;
        margin-right: 0.28rem;
    }

    .goods-orders-center {
        width: 2.94rem;
        float: left;
    }

    .goods-orders-center-first-chird {
        font-size: 0.26rem;
        line-height: 0.38rem;
        height: 0.76rem;
        overflow: hidden;
    }

    .goods-orders-center-second-chird {
        color: #999;
        font-size: 0.625em;
        margin-top: 0.08rem;
    }

    .goods-orders-right {
        width: 1.46rem;
        float: right;
        text-align: right;
        overflow: hidden;
    }

    .goods-orders-right-bot {
        font-size: 0.26rem;
        color: #999;
    }

    .list-value {
        height: 0.88rem;
        text-align: right;
        font-size: 0.24rem;
        line-height: 0.84rem;
        padding-right: 0.12rem;
    }

    .goods-order-btn {
        height: 0.88rem;
        padding: 0 0.24rem;
        line-height: 0.88rem;
        font-size: 0.26rem;
        overflow: hidden;
    }

    .goods-order-first-btn {
        border: 1px solid #f31e37;
        margin-left: 0.2rem;
    }

    .goods-order-second-btn {
        border: 1px solid #ccc;
    }

    .goods-order-first-btn, .goods-order-second-btn {
        height: 0.56rem;
        width: 1.32rem;
        line-height: 0.56rem;
        text-align: center;
        border-radius: 0.06rem;
        float: right;
        margin-top: 0.14rem;
    }

    .goods-order-first-a:link, .goods-order-first-a:visited {
        color: #f31e37;
    }

    .goods-order-second-a:link, .goods-order-second-a:visited {
        color: #333;
    }

    .finish {
        float: right;
        color: #ccc;
    }

    .delete {
        color: #999;
        text-decoration: line-through;
    }

    /*四方格样式*/
    .gy-bangdan-top {
        height: 1rem;
        text-align: center;
    }

    .gy-bangdan-top-tit {
        height: 1rem;
        line-height: 1rem;
        padding-left: 0.5rem;
        font-size: 0.3rem;
    }

    .my-paiming-box-L {
        width: 3.72rem;
        float: left;
        text-align: center;
        padding-bottom: 0.24rem;
    }

    .my-paiming-box-C {
        width: 1px;
        border-right: 1px solid #e0e0e0;
        height: 1.04rem;
        margin-top: 0.16rem;
        float: left;
        margin-bottom: 0.16rem;
    }

    .my-paiming-box-L-top {
        line-height: 0.5rem;
        margin-top: 0.26rem;
    }

    .my-paiming-box-L-bot {
        line-height: 0.3rem;
        color: #999;
        font-size: 0.24rem;
    }

    .line-box div {
        width: 3.16rem;
        height: 0.02rem;
        border-bottom: 1px solid #e0e0e0;
    }

    .line-box-L {
        margin-left: 0.24rem;
        float: left;
    }

    .line-box-R {
        margin-right: 0.24rem;
        float: right;
    }

    /*查看更多*/
    .slide-more {
        height: 0.84rem;
        line-height: 0.84rem;
        text-align: center;
        color: #666;
        text-align: center;
        font-size: 0.26rem;
    }

    /*排行榜列表样式*/
    .zh-geren-box {
        padding: 0 0.24rem;
        width: 7.5rem;
        box-sizing: border-box;
        margin-top: 0.08rem;
    }

    .zh-geren-box-left {
        float: left;
        height: 1.16rem;
        padding-top: 0.16rem;
        width: 0.92rem;
        box-sizing: border-box;
        position: relative;
    }

    .zh-geren-box-left-top {
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 2rem;
    }

    .zh-geren-box-left-top img {
        display: block;
    }

    .zh-geren-box-right {
        float: right;
        width: 5.94rem;
        height: 1.14rem;
        border-bottom: 1px solid #e0e0e0;
        box-sizing: border-box;
        overflow: hidden;
    }

    .zh-geren-box-right-L {
        float: left;
        width: 3.56rem;
    }

    .zh-geren-box-right-L-top {
        margin-top: 0.26rem;
        line-height: 0.36rem;
    }

    .zh-geren-box-right-L-bot {
        font-size: 0.24rem;
        line-height: 0.28rem;
    }

    .zh-geren-box-right-R {
        float: right;
        width: 1.8rem;
        height: 1.14rem;
        line-height: 1.14rem;
        text-align: right;
    }

    .medals {
        position: absolute;
        width: 0.28rem;
        height: 0.16rem;
        top: 0;
        left: 0.26rem;
    }

    /*3列数据展示*/
    .v2-biaoge {
        padding: 0.26rem 0;
        overflow: hidden;
        width: 7.5rem;
        box-sizing: border-box;
    }

    .v2-biaoge li {
        float: left;
        width: 33.3%;
        text-align: center;
        color: #999;
        font-size: 0.22rem;
    }

    .v2-biaoge li span {
        display: inline-block;
        width: 100%;
        text-align: center;
    }

    .v2-biaoge-top {
        font-size: 0.32rem;
        color: #333;
        margin: 0.06rem 0 0.1rem
    }

    /*排行榜头部-无头像*/
    .ranking {
        width: 7.5rem;
        height: 3.6rem;
    }

    .ranking-name {
        font-size: 0.3rem;
        width: 4.3rem;
        line-height: 0.4rem;
        height: 0.8rem;
        margin: 0.9rem auto 0.54rem;
        text-align: center;
    }

    .ranking-bot-sum {
        text-align: center;
        width: 100%;
        color: #fff;
    }

    .ranking-bot-sum-top {
        width: 2rem;
        height: 0.56rem;
        line-height: 0.54rem;
        background: #f6454b;
        margin: 0 auto;
    }

    .ranking-bot-sum-top span {
        font-size: 0.34rem;
        margin: 0 0.02rem
    }

    .ranking-bot-sum-bot {
        margin-top: 0.12rem;
        font-size: 0.26rem;
        color: #666;
    }

    /*排行榜头部-头像*/
    .ranking-avatar {
        width: 1.36rem;
        height: 1.36rem;
        border-radius: 5rem;
        margin: 0 auto;
        overflow: hidden;
        padding: 0.6rem 0 0.3rem;
    }

    .ranking-avatar img {
        width: 100%;
        height: 100%;
        display: block;
    }

    /* 底部红色按钮2 */
    .bot-box {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1.12rem;
        background: rgba(255, 255, 255, .89);
        width: 7.5rem;
        box-sizing: border-box;
        border-top: 1px solid #e9e9e9;
        z-index: 999;
    }

    .bot-btn {
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        background: #f31e37;
        margin: 0.16rem 0.24rem;
        border-radius: 0.16rem;
        text-align: center;
    }

    .bot-box a:link, .bot-box a:visited {
        color: #fff;
        text-decoration: none;
    }

    .bot-box a:hover {
        background: #bb3337
    }

    .btn-hover:active {
        background: #bb3337;
    }

    /* 搜索框 */
    .search-box {
        margin: 0 0.24rem;
        overflow: hidden;
        width: 7.02rem;
        box-sizing: border-box;
    }

    .search-cont {
        height: 0.52rem;
        border: 1px solid #ccc;
        border-radius: 1rem;
        width: 6.2rem;
        float: left;
    }

    .search-btn {
        float: right;
        height: 0.52rem;
        line-height: 0.56rem;
    }

    .search-box-R {
        width: 5.26rem;
        float: left;
    }

    .search-box-R input {
        width: 5.42rem;
        height: 0.34rem;
        padding-left: 8px;
        line-height: 0.34rem;
        margin-top: 0.08rem;
        border: none;
        background: none;
    }

    .search-box a:link, .search-box a:visited {
        color: #666;
    }

    /* 小按钮 */
    .small-btn-default, .small-btn-danger {
        width: 1.4rem;
        height: 0.6rem !important;
        line-height: 0.6rem !important;
        border-radius: 0.08rem;
        text-align: center;
    }

    .small-btn-danger {
        background: #f31e37;
        color: #fff;
    }

    .small-btn-danger:active {
        background: #c91328
    }

    .small-btn-default {
        background: #ccc;
        color: #333;
    }

    /* 展开收起 */
    .togglo-box {
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color: #406fbd;
        font-size: 0.24rem;
    }

    .togglo-box span {
        height: 0.32rem;
        line-height: 0.32rem;
        padding-right: 0.32rem;
        display: inline-block;
    }

    .togglo-box .togglo-open {
        background: url(/bocm/platformjs/static/image/zh79.png) no-repeat right bottom;
        background-size: 0.24rem auto;
    }

    .togglo-box .togglo-close {
        background: url(/bocm/platformjs/static/image/zh79.png) no-repeat right top;
        background-size: 0.24rem auto;
    }

    /*图文列表*/
    .ineed-list-box {
        padding: 0 0.24rem 0.2rem;
    }

    .ineed-lists {
        overflow: hidden;
        margin: 0.2rem 0;
    }

    .ineed-lists .qes-answer-tit {
        line-height: 0.38rem;
        height: 0.38rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.28rem;
    }

    .ineed-lists img {
        display: block;
    }

    .ineed-lists-left {
        width: 1.66rem;
        float: left;
        margin-right: 0.18rem;
    }

    .ineed-lists-right {
        width: 5.18rem;
        float: right;
    }

    .ineed-lists-text {
        overflow: hidden;
        margin: 0.08rem 0 0;
        color: #999;
        font-size: 0.24rem;
        line-height: 0.36rem;
        height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .new-ineed-box a:link, .new-ineed-box a:visited {
        color: #333
    }

    .ineed-lists-no-img .ineed-lists-right {
        width: 7.02rem;
    }

    /*底部俩按钮*/
    .bot-btn-left, .bot-btn-right {
        width: 2.4rem;
        float: left;
        background: #f31e37;
        border-radius: 0.08rem;
        height: 0.72rem;
        line-height: 0.72rem;
        font-size: 0.3rem;
        text-align: center;
        margin-top: 0.2rem;
    }

    .bot-btn-left {
        margin: 0.2rem 0.68rem 0 0.98rem;
    }

    .bot-btn-default {
        background: #999
    }

    /*一行三图标*/
    .edit-box {
        width: 7.5rem;
        padding: 0.2rem 0 0.2rem;
    }

    .edit-box li {
        width: 2.5rem;
        float: left;
        text-align: center;
        border-right: 1px solid #eee;
        height: 0.56rem;
        line-height: 0.56rem;
        box-sizing: border-box;
    }

    .edit-box li span {
        color: #666;
        padding-left: 0.46rem;
        display: inline-block;
        height: 0.56rem;
    }

    /*弹出框样式1*/
    .blk-bg {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, .6);
        z-index: 2;
        display: none;
    }

    .bomb-box2 {
        position: absolute;
        top: 3.6rem;
        left: 5%;
        width: 90%;
        background: #fff;
        border-radius: 0.16rem;
        z-index: 3;
        display: none;
    }

    .bomb-box2-content {
        margin: 0.44rem 0.5rem 0.5rem;
        text-align: center;
    }

    .bomb-box2-fonts {
        line-height: 0.4rem;
    }

    .bomb-box2-btn {
        line-height: 0.28rem;
        padding: 0.2rem 0.54rem;
        border-radius: 0.16rem;
        border: 1px solid #f31e37;
        display: inline-block;
    }

    .bomb-box2-content a:link, .bomb-box2-content a:visited {
        color: #f31e37;
        text-decoration: none;
    }

    /*头像简介*/
    .organizers-box {
        padding: 0.3rem 0.24rem;
    }

    .organizers-left {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.6rem;
        overflow: hidden;
        float: left;
        margin-right: 0.2rem;
    }

    .organizers-left img {
        display: block
    }

    .organizers-right-top {
        line-height: 0.46rem;
    }

    .organizers-right-top span {
        margin-left: 0.1rem;
        background: #f31e37;
        border-radius: 0.04rem;
        padding: 0.02rem 0.1rem 0.04rem;
        color: #fff;
        font-size: 0.24rem;
        line-height: 0.26rem;
    }

    .organizers-right-bot {
        line-height: 0.38rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .organizers-right {
        width: 5.62rem;
        float: right
    }

    /*报名项弹出框*/
    .task-bg {
        width: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 1000;
        display: none;
    }

    .task-popbox {
        width: 6.7rem;
        height: 4.8rem;
        position: fixed;
        top: 2rem;
        left: 0.4rem;
        border-radius: 0.12rem;
        z-index: 1001;
        display: none;
    }

    .task-popbox-top {
        height: 1.26rem;
        line-height: 1.26rem;
        text-align: center;
        font-size: 0.28rem;
        border-bottom: 1px solid #e0e0e0;
    }

    .task-popbox-outer {
        height: 2.24rem;
        overflow-y: auto;
    }

    .task-popbox-cont {
        width: 6.7rem;
        padding: 0 0.24rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e0e0e0;
    }

    .task-popbox-cont-L {
        width: 4.6rem;
        float: left;
    }

    .task-popbox-cont-L-top {
        margin-top: 0.2rem;
        line-height: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }

    .task-popbox-cont-L-bot {
        line-height: 0.3rem;
        font-size: 0.24rem;
        color: #999;
        margin-bottom: 0.2rem;
    }

    .task-popbox-cont-R {
        float: right;
        text-align: right;
        height: 1.1rem;
        line-height: 1.1rem;
        width: 1.2rem
    }

    /*空页面*/
    .img-no {
        display: block;
        width: 2.53rem;
        height: 1.98rem;
        margin: 2rem auto 0.2rem;
    }

    .content-no {
        line-height: 0.5rem;
        text-align: center;
        font-size: 0.32rem;
    }

    /* 列表样式3*/
    .list3-box {
        padding: 0 0.24rem;
        overflow: hidden;
        width: 7.5rem;
        box-sizing: border-box;
    }

    .list3-box-L {
        height: 0.8rem;
        width: 0.8rem;
        float: left;
        border-radius: 0.4rem;
        overflow: hidden;
        margin-top: 0.22rem
    }

    .list3-box-L img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .list3-box-C {
        float: left;
        margin-left: 0.3rem;
        height: 1.22rem;
        line-height: 1.22rem;
        width: 5.92rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.28rem;
    }

    .container {
        width: 7.5rem;
        box-sizing: border-box;
        margin: 0 auto;
    }

    input, textarea {
        font-size: 0.28rem;
    }

    /* 普通网页table*/
    .volunteers-table {
        width: 7.5rem;
    }

    .volunteers-table li {
        width: 25%;
        height: 0.88rem;
        line-height: 0.88rem;
        float: left;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        font-size: 0.3rem;
        box-sizing: border-box;
    }

    .volunteers-table .volunteers-table-curr {
        border-bottom: 3px solid #f31e37;
        color: #f31e37;
    }

    /* 底部tbablebar*/
    .bot-bar-blkbox {
        height: 50px;
        display: none;
    }

    .bot-tablebar {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
        width: 100%;
        z-index: 9999;
        box-sizing: border-box;
        background: #f8f8f8;
        border-top: 1px solid #e0e0e0;
        display: none;
    }

    .tablebar-list {
        width: 25%;
        float: left;
        box-sizing: border-box;
        height: 50px;
    }

    .tablebar-list-img {
        width: 24px;
        height: 22px;
        margin: 6px auto 0;
    }

    .tablebar-list-img img {
        display: block;
        width: 100%;
    }

    .tablebar-list-fonts {
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #666;
    }

    .tablebar-list-fonts-curr {
        color: #f31e37;
    }

    /* 新登录注册页面输入框*/
    .login-v2-inputbox {
        margin: 0 0 0.38rem 0.24rem;
        font-size: 0.3rem;
    }

    .login-v2-inputbox-left {
        width: 1.08rem;
        margin-right: 0.24rem;
        height: 0.72rem;
        float: left;
        line-height: 0.72rem;
        color: #666;
        text-align: right;
    }

    .login-v2-inputbox-right {
        width: 5.1rem;
        height: 0.72rem;
        float: left;
        line-height: 0.72rem;
        color: #666;
        text-align: right;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        padding-top: 0.1rem
    }

    .login-v2-inputbox-right input {
        float: left;
        height: 0.52rem;
        line-height: 0.52rem;
        font-size: 0.3rem;
        background: none
    }

    .login-v2-inputbox-right .phone-put {
        width: 5.1rem;
        box-sizing: border-box;
        border: none;
    }

    .login-v2-inputbox-right .mima-put {
        width: 3.5rem;
        box-sizing: border-box;
        border: none;
    }

    .login-v2-yam {
        width: 1.6rem;
        height: 0.52rem;
        line-height: 0.52rem;
        text-align: right;
        color: #406fbd;
        float: right;
    }

    /* 新登录注册页面按钮*/
    .login-v2-btn {
        width: 6rem;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
        background: #f31e37;
        border-radius: 0.44rem;
        margin: 0.8rem auto 0.4rem;
        box-shadow: 0 0.1rem 0.16rem rgba(182, 0, 42, .25)
    }

    /*暂无内容*/
    .project-noicon {
        margin: 0.88rem 0 0.2rem;
        text-align: center;
    }

    .project-noicon img {
        width: 1.56rem;
    }

    .project-nofont {
        font-size: 0.3rem;
        margin-bottom: 0.24rem;
        text-align: center;
    }

    /*个人中心头部*/
    .index-box {
        background: #fff;
        background-size: 100% auto;
        overflow: hidden;
        padding-top: 0.3rem;
    }

    .me-top-box {
        margin: 0 0.24rem 0.26rem;
        overflow: hidden;
    }

    .me-top-box-L {
        width: 1.3rem;
        float: left;
        border-radius: 0.65rem;
        overflow: hidden;
    }

    .me-top-box-L img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .me-top-box-C {
        width: 5.42rem;
        margin-left: 0.3rem;
        float: left;
    }

    .new-person-tit {
        line-height: 0.4rem;
        color: #666;
        font-size: 0.24rem;
        margin-top: 0.06rem;
    }

    /*input单页*/
    .v3-input-tit {
        height: 0.8rem;
        width: 100%;
        box-sizing: border-box;
        line-height: 0.4rem;
        padding: 0.24rem 0.24rem 0;
    }

    .v3-input-box {
        width: 7.02rem;
        height: 0.84rem;
        margin: 0 auto 0.3rem;
        padding-top: 0.2rem;
        border: 1px solid #e0e0e0;
        border-radius: 0.06rem;
        box-sizing: border-box;
    }

    .v3-input-box input {
        width: 6.8rem;
        height: 0.44rem;
        padding-left: 0.24rem;
        line-height: 0.44rem;
        font-size: 0.28rem;
        border: none;
        box-sizing: border-box;
    }

    /*style*/
    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-header {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #26a2ff;
        box-sizing: border-box;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 14px;
        height: 40px;
        line-height: 1;
        padding: 0 10px;
        position: relative;
        text-align: center;
        white-space: nowrap;
    }

    .mint-header .mint-button {
        background-color: transparent;
        border: 0;
        box-shadow: none;
        color: inherit;
        display: inline-block;
        padding: 0;
        font-size: inherit
    }

    .mint-header .mint-button::after {
        content: none;
    }

    .mint-header.is-fixed {
        top: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
    }

    .mint-header-button {
        -webkit-box-flex: .5;
        -ms-flex: .5;
        flex: .5;
    }

    .mint-header-button > a {
        color: inherit;
    }

    .mint-header-button.is-right {
        text-align: right;
    }

    .mint-header-button.is-left {
        text-align: left;
    }

    .mint-header-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: inherit;
        font-weight: 400;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 4px;
        border: 0;
        box-sizing: border-box;
        color: inherit;
        display: block;
        font-size: 18px;
        height: 41px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center
    }

    .mint-button::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute
    }

    .mint-button:not(.is-disabled):active::after {
        opacity: .4
    }

    .mint-button.is-disabled {
        opacity: .6
    }

    .mint-button-icon {
        vertical-align: middle;
        display: inline-block
    }

    .mint-button--default {
        color: #656b79;
        background-color: #f6f8fa;
        box-shadow: 0 0 1px #b8bbbf
    }

    .mint-button--default.is-plain {
        border: 1px solid #5a5a5a;
        background-color: transparent;
        box-shadow: none;
        color: #5a5a5a
    }

    .mint-button--primary {
        color: #fff;
        background-color: #26a2ff
    }

    .mint-button--primary.is-plain {
        border: 1px solid #26a2ff;
        background-color: transparent;
        color: #26a2ff
    }

    .mint-button--danger {
        color: #fff;
        background-color: #ef4f4f
    }

    .mint-button--danger.is-plain {
        border: 1px solid #ef4f4f;
        background-color: transparent;
        color: #ef4f4f
    }

    .mint-button--large {
        display: block;
        width: 100%
    }

    .mint-button--normal {
        display: inline-block;
        padding: 0 12px
    }

    .mint-button--small {
        display: inline-block;
        font-size: 14px;
        padding: 0 12px;
        height: 33px
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-cell {
        background-color: #fff;
        box-sizing: border-box;
        color: inherit;
        min-height: 48px;
        display: block;
        overflow: hidden;
        position: relative;
        text-decoration: none;
    }

    .mint-cell img {
        vertical-align: middle;
    }

    .mint-cell:first-child .mint-cell-wrapper {
        background-origin: border-box;
    }

    .mint-cell:last-child {
        background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: bottom;
    }

    .mint-cell-wrapper {
        background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
        background-origin: content-box;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 16px;
        line-height: 1;
        min-height: inherit;
        overflow: hidden;
        padding: 0 10px;
        width: 100%;
    }

    .mint-cell-mask {
    }

    .mint-cell-mask::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
    }

    .mint-cell-mask:active::after {
        opacity: .1;
    }

    .mint-cell-text {
        vertical-align: middle;
    }

    .mint-cell-label {
        color: #888;
        display: block;
        font-size: 12px;
        margin-top: 6px;
    }

    .mint-cell-title {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .mint-cell-value {
        color: #888;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .mint-cell-value.is-link {
        margin-right: 24px;
    }

    .mint-cell-left {
        position: absolute;
        height: 100%;
        left: 0;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }

    .mint-cell-right {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }

    .mint-cell-allow-right::after {
        border: solid 2px #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 20px;
        position: absolute;
        width: 5px;
        height: 5px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-cell-swipe .mint-cell-wrapper {
        position: relative;
    }

    .mint-cell-swipe .mint-cell-wrapper, .mint-cell-swipe .mint-cell-left, .mint-cell-swipe .mint-cell-right {
        -webkit-transition: -webkit-transform 150ms ease-in-out;
        transition: -webkit-transform 150ms ease-in-out;
        transition: transform 150ms ease-in-out;
        transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;
    }

    .mint-cell-swipe-buttongroup {
        height: 100%;
    }

    .mint-cell-swipe-button {
        height: 100%;
        display: inline-block;
        padding: 0 10px;
        line-height: 48px;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-field {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .mint-field .mint-cell-title {
        width: 105px;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
    }

    .mint-field .mint-cell-value {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: inherit;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .mint-field.is-nolabel .mint-cell-title {
        display: none;
    }

    .mint-field.is-textarea {
        -webkit-box-align: inherit;
        -ms-flex-align: inherit;
        align-items: inherit;
    }

    .mint-field.is-textarea .mint-cell-title {
        padding: 10px 0;
    }

    .mint-field.is-textarea .mint-cell-value {
        padding: 5px 0;
    }

    .mint-field-core {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0;
        border: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        outline: 0;
        line-height: 1.6;
        font-size: inherit;
        width: 100%;
    }

    .mint-field-clear {
        opacity: .2;
    }

    .mint-field-state {
        color: inherit;
        margin-left: 20px;
    }

    .mint-field-state .mintui {
        font-size: 20px;
    }

    .mint-field-state.is-default {
        margin-left: 0;
    }

    .mint-field-state.is-success {
        color: #4caf50;
    }

    .mint-field-state.is-warning {
        color: #ffc107;
    }

    .mint-field-state.is-error {
        color: #f44336;
    }

    .mint-field-other {
        top: 0;
        right: 0;
        position: relative;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-badge {
        color: #fff;
        text-align: center;
        display: inline-block
    }

    .mint-badge.is-size-large {
        border-radius: 14px;
        font-size: 18px;
        padding: 2px 10px
    }

    .mint-badge.is-size-small {
        border-radius: 8px;
        font-size: 12px;
        padding: 2px 6px
    }

    .mint-badge.is-size-normal {
        border-radius: 12px;
        font-size: 15px;
        padding: 2px 8px
    }

    .mint-badge.is-warning {
        background-color: #ffc107
    }

    .mint-badge.is-error {
        background-color: #f44336
    }

    .mint-badge.is-primary {
        background-color: #26a2ff
    }

    .mint-badge.is-success {
        background-color: #4caf50
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-switch {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
    }

    .mint-switch * {
        pointer-events: none;
    }

    .mint-switch-label {
        margin-left: 10px;
        display: inline-block;
    }

    .mint-switch-label:empty {
        margin-left: 0;
    }

    .mint-switch-core {
        display: inline-block;
        position: relative;
        width: 52px;
        height: 32px;
        border: 1px solid #d9d9d9;
        border-radius: 16px;
        box-sizing: border-box;
        background: #d9d9d9;
    }

    .mint-switch-core::after, .mint-switch-core::before {
        content: " ";
        top: 0;
        left: 0;
        position: absolute;
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s, -webkit-transform .3s;
        border-radius: 15px;
    }

    .mint-switch-core::after {
        width: 30px;
        height: 30px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    }

    .mint-switch-core::before {
        width: 50px;
        height: 30px;
        background-color: #fdfdfd;
    }

    .mint-switch-input {
        display: none;
    }

    .mint-switch-input:checked + .mint-switch-core {
        border-color: #26a2ff;
        background-color: #26a2ff;
    }

    .mint-switch-input:checked + .mint-switch-core::before {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    .mint-switch-input:checked + .mint-switch-core::after {
        -webkit-transform: translateX(20px);
        transform: translateX(20px);
    }

    .mint-spinner-snake {
        -webkit-animation: mint-spinner-rotate 0.8s infinite linear;
        animation: mint-spinner-rotate 0.8s infinite linear;
        border: 4px solid transparent;
        border-radius: 50%;
    }

    @-webkit-keyframes mint-spinner-rotate {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes mint-spinner-rotate {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    .mint-spinner-double-bounce {
        position: relative;
    }

    .mint-spinner-double-bounce-bounce1, .mint-spinner-double-bounce-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: mint-spinner-double-bounce 2.0s infinite ease-in-out;
        animation: mint-spinner-double-bounce 2.0s infinite ease-in-out;
    }

    .mint-spinner-double-bounce-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes mint-spinner-double-bounce {
        0%, 100% {
            -webkit-transform: scale(0.0);
            transform: scale(0.0);
        }
        50% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }

    @keyframes mint-spinner-double-bounce {
        0%, 100% {
            -webkit-transform: scale(0.0);
            transform: scale(0.0);
        }
        50% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }

    .mint-spinner-triple-bounce {
    }

    .mint-spinner-triple-bounce-bounce1, .mint-spinner-triple-bounce-bounce2, .mint-spinner-triple-bounce-bounce3 {
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: mint-spinner-triple-bounce 1.4s infinite ease-in-out both;
        animation: mint-spinner-triple-bounce 1.4s infinite ease-in-out both;
    }

    .mint-spinner-triple-bounce-bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .mint-spinner-triple-bounce-bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes mint-spinner-triple-bounce {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }

    @keyframes mint-spinner-triple-bounce {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }

    .mint-spinner-fading-circle {
        position: relative
    }

    .mint-spinner-fading-circle-circle {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute
    }

    .mint-spinner-fading-circle-circle::before {
        content: " ";
        display: block;
        margin: 0 auto;
        width: 15%;
        height: 15%;
        border-radius: 100%;
        -webkit-animation: mint-fading-circle 1.2s infinite ease-in-out both;
        animation: mint-fading-circle 1.2s infinite ease-in-out both
    }

    .mint-spinner-fading-circle-circle.is-circle2 {
        -webkit-transform: rotate(30deg);
        transform: rotate(30deg)
    }

    .mint-spinner-fading-circle-circle.is-circle2::before {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s
    }

    .mint-spinner-fading-circle-circle.is-circle3 {
        -webkit-transform: rotate(60deg);
        transform: rotate(60deg)
    }

    .mint-spinner-fading-circle-circle.is-circle3::before {
        -webkit-animation-delay: -1s;
        animation-delay: -1s
    }

    .mint-spinner-fading-circle-circle.is-circle4 {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg)
    }

    .mint-spinner-fading-circle-circle.is-circle4::before {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s
    }

    .mint-spinner-fading-circle-circle.is-circle5 {
        -webkit-transform: rotate(120deg);
        transform: rotate(120deg)
    }

    .mint-spinner-fading-circle-circle.is-circle5::before {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s
    }

    .mint-spinner-fading-circle-circle.is-circle6 {
        -webkit-transform: rotate(150deg);
        transform: rotate(150deg)
    }

    .mint-spinner-fading-circle-circle.is-circle6::before {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s
    }

    .mint-spinner-fading-circle-circle.is-circle7 {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }

    .mint-spinner-fading-circle-circle.is-circle7::before {
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s
    }

    .mint-spinner-fading-circle-circle.is-circle8 {
        -webkit-transform: rotate(210deg);
        transform: rotate(210deg)
    }

    .mint-spinner-fading-circle-circle.is-circle8::before {
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s
    }

    .mint-spinner-fading-circle-circle.is-circle9 {
        -webkit-transform: rotate(240deg);
        transform: rotate(240deg)
    }

    .mint-spinner-fading-circle-circle.is-circle9::before {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s
    }

    .mint-spinner-fading-circle-circle.is-circle10 {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg)
    }

    .mint-spinner-fading-circle-circle.is-circle10::before {
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s
    }

    .mint-spinner-fading-circle-circle.is-circle11 {
        -webkit-transform: rotate(300deg);
        transform: rotate(300deg)
    }

    .mint-spinner-fading-circle-circle.is-circle11::before {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s
    }

    .mint-spinner-fading-circle-circle.is-circle12 {
        -webkit-transform: rotate(330deg);
        transform: rotate(330deg)
    }

    .mint-spinner-fading-circle-circle.is-circle12::before {
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s
    }

    @-webkit-keyframes mint-fading-circle {
        0%, 39%, 100% {
            opacity: 0
        }
        40% {
            opacity: 1
        }
    }

    @keyframes mint-fading-circle {
        0%, 39%, 100% {
            opacity: 0
        }
        40% {
            opacity: 1
        }
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-tab-item {
        display: block;
        padding: 7px 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-decoration: none
    }

    .mint-tab-item-icon {
        width: 24px;
        height: 24px;
        margin: 0 auto 5px
    }

    .mint-tab-item-icon:empty {
        display: none
    }

    .mint-tab-item-icon > * {
        display: block;
        width: 100%;
        height: 100%
    }

    .mint-tab-item-label {
        color: inherit;
        font-size: 12px;
        line-height: 1
    }

    .mint-tab-container-item {
        -ms-flex-negative: 0;
        flex-shrink: 0;
        width: 100%
    }

    .mint-tab-container {
        overflow: hidden;
        position: relative;
    }

    .mint-tab-container .swipe-transition {
        -webkit-transition: -webkit-transform 150ms ease-in-out;
        transition: -webkit-transform 150ms ease-in-out;
        transition: transform 150ms ease-in-out;
        transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;
    }

    .mint-tab-container-wrap {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-navbar {
        background-color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        text-align: center;
    }

    .mint-navbar .mint-tab-item {
        padding: 17px 0;
        font-size: 15px
    }

    .mint-navbar .mint-tab-item:last-child {
        border-right: 0;
    }

    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 3px solid #26a2ff;
        color: #26a2ff;
        margin-bottom: -3px;
    }

    .mint-navbar.is-fixed {
        top: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-tabbar {
        background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: top left;
        position: relative;
        background-color: #fafafa;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        text-align: center;
    }

    .mint-tabbar > .mint-tab-item.is-selected {
        background-color: #eaeaea;
        color: #26a2ff;
    }

    .mint-tabbar.is-fixed {
        right: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        z-index: 1;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-search {
        height: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .mint-searchbar {
        position: relative;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #d9d9d9;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 8px 10px;
        z-index: 1;
    }

    .mint-searchbar-inner {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #fff;
        border-radius: 2px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 28px;
        padding: 4px 6px;
    }

    .mint-searchbar-inner .mintui-search {
        font-size: 12px;
        color: #d9d9d9;
    }

    .mint-searchbar-core {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        outline: 0;
    }

    .mint-searchbar-cancel {
        color: #26a2ff;
        margin-left: 10px;
        text-decoration: none;
    }

    .mint-search-list {
        overflow: auto;
        padding-top: 44px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-checklist .mint-cell {
        padding: 0;
    }

    .mint-checklist.is-limit .mint-checkbox-core:not(:checked) {
        background-color: #d9d9d9;
        border-color: #d9d9d9;
    }

    .mint-checklist-label {
        display: block;
        padding: 0 10px;
    }

    .mint-checklist-title {
        color: #888;
        display: block;
        font-size: 12px;
        margin: 8px;
    }

    .mint-checkbox {
    }

    .mint-checkbox.is-right {
        float: right;
    }

    .mint-checkbox-label {
        vertical-align: middle;
        margin-left: 6px;
    }

    .mint-checkbox-input {
        display: none;
    }

    .mint-checkbox-input:checked + .mint-checkbox-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
    }

    .mint-checkbox-input:checked + .mint-checkbox-core::after {
        border-color: #fff;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
    }

    .mint-checkbox-input[disabled] + .mint-checkbox-core {
        background-color: #d9d9d9;
        border-color: #ccc;
    }

    .mint-checkbox-core {
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
        border: 1px solid #ccc;
        position: relative;
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }

    .mint-checkbox-core::after {
        border: 2px solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        top: 3px;
        left: 6px;
        position: absolute;
        width: 4px;
        height: 8px;
        -webkit-transform: rotate(45deg) scale(0);
        transform: rotate(45deg) scale(0);
        -webkit-transition: -webkit-transform .2s;
        transition: -webkit-transform .2s;
        transition: transform .2s;
        transition: transform .2s, -webkit-transform .2s;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-radiolist .mint-cell {
        padding: 0;
    }

    .mint-radiolist-label {
        display: block;
        padding: 0 10px;
    }

    .mint-radiolist-title {
        font-size: 12px;
        margin: 8px;
        display: block;
        color: #888;
    }

    .mint-radio {
    }

    .mint-radio.is-right {
        float: right;
    }

    .mint-radio-label {
        vertical-align: middle;
        margin-left: 6px;
    }

    .mint-radio-input {
        display: none;
    }

    .mint-radio-input:checked + .mint-radio-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
    }

    .mint-radio-input:checked + .mint-radio-core::after {
        background-color: #fff;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    .mint-radio-input[disabled] + .mint-radio-core {
        background-color: #d9d9d9;
        border-color: #ccc;
    }

    .mint-radio-core {
        box-sizing: border-box;
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
        border: 1px solid #ccc;
        position: relative;
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }

    .mint-radio-core::after {
        content: " ";
        border-radius: 100%;
        top: 5px;
        left: 5px;
        position: absolute;
        width: 8px;
        height: 8px;
        -webkit-transition: -webkit-transform .2s;
        transition: -webkit-transform .2s;
        transition: transform .2s;
        transition: transform .2s, -webkit-transform .2s;
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    .mint-loadmore {
        overflow: hidden
    }

    .mint-loadmore-content {
    }

    .mint-loadmore-content.is-dropped {
        -webkit-transition: .2s;
        transition: .2s
    }

    .mint-loadmore-top, .mint-loadmore-bottom {
        text-align: center;
        height: 50px;
        line-height: 50px
    }

    .mint-loadmore-top {
        margin-top: -50px
    }

    .mint-loadmore-bottom {
        margin-bottom: -50px
    }

    .mint-loadmore-spinner {
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle
    }

    .mint-loadmore-text {
        vertical-align: middle
    }

    .mint-actionsheet {
        position: fixed;
        background: #e0e0e0;
        width: 100%;
        text-align: center;
        bottom: 0;
        left: 50%;
        -webkit-transform: translate3d(-50%, 0, 0);
        transform: translate3d(-50%, 0, 0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: -webkit-transform .3s ease-out;
        transition: -webkit-transform .3s ease-out;
        transition: transform .3s ease-out;
        transition: transform .3s ease-out, -webkit-transform .3s ease-out;
    }

    .mint-actionsheet-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .mint-actionsheet-listitem {
        border-bottom: solid 1px #e0e0e0;
    }

    .mint-actionsheet-listitem, .mint-actionsheet-button {
        display: block;
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        color: #333;
        background-color: #fff;
    }

    .mint-actionsheet-listitem:active, .mint-actionsheet-button:active {
        background-color: #f0f0f0;
    }

    .actionsheet-float-enter, .actionsheet-float-leave-active {
        -webkit-transform: translate3d(-50%, 100%, 0);
        transform: translate3d(-50%, 100%, 0);
    }

    .v-modal-enter {
        -webkit-animation: v-modal-in .2s ease;
        animation: v-modal-in .2s ease;
    }

    .v-modal-leave {
        -webkit-animation: v-modal-out .2s ease forwards;
        animation: v-modal-out .2s ease forwards;
    }

    @-webkit-keyframes v-modal-in {
        0% {
            opacity: 0;
        }
        100% {
        }
    }

    @keyframes v-modal-in {
        0% {
            opacity: 0;
        }
        100% {
        }
    }

    @-webkit-keyframes v-modal-out {
        0% {
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes v-modal-out {
        0% {
        }
        100% {
            opacity: 0;
        }
    }

    .v-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
    }

    .mint-popup {
        position: fixed;
        background: #fff;
        top: 50%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: .2s ease-out;
        transition: .2s ease-out;
    }

    .mint-popup-top {
        top: 0;
        right: auto;
        bottom: auto;
        left: 50%;
        -webkit-transform: translate3d(-50%, 0, 0);
        transform: translate3d(-50%, 0, 0);
    }

    .mint-popup-right {
        top: 50%;
        right: 0;
        bottom: auto;
        left: auto;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0);
    }

    .mint-popup-bottom {
        top: auto;
        right: auto;
        bottom: 0;
        left: 50%;
        -webkit-transform: translate3d(-50%, 0, 0);
        transform: translate3d(-50%, 0, 0);
    }

    .mint-popup-left {
        top: 50%;
        right: auto;
        bottom: auto;
        left: 0;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0);
    }

    .popup-slide-top-enter, .popup-slide-top-leave-active {
        -webkit-transform: translate3d(-50%, -100%, 0);
        transform: translate3d(-50%, -100%, 0);
    }

    .popup-slide-right-enter, .popup-slide-right-leave-active {
        -webkit-transform: translate3d(100%, -50%, 0);
        transform: translate3d(100%, -50%, 0);
    }

    .popup-slide-bottom-enter, .popup-slide-bottom-leave-active {
        -webkit-transform: translate3d(-50%, 100%, 0);
        transform: translate3d(-50%, 100%, 0);
    }

    .popup-slide-left-enter, .popup-slide-left-leave-active {
        -webkit-transform: translate3d(-100%, -50%, 0);
        transform: translate3d(-100%, -50%, 0);
    }

    .popup-fade-enter, .popup-fade-leave-active {
        opacity: 0;
    }

    .mint-swipe {
        overflow: hidden;
        position: relative;
        height: 100%;
    }

    .mint-swipe-items-wrap {
        position: relative;
        overflow: hidden;
        height: 100%;
    }

    .mint-swipe-items-wrap > div {
        position: absolute;
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
        width: 100%;
        height: 100%;
        display: none
    }

    .mint-swipe-items-wrap > div.is-active {
        display: block;
        -webkit-transform: none;
        transform: none;
    }

    .mint-swipe-indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }

    .mint-swipe-indicator {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #000;
        opacity: 0.2;
        margin: 0 3px;
    }

    .mint-swipe-indicator.is-active {
        background: #fff;
    }

    .mt-range {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 30px;
        line-height: 30px
    }

    .mt-range > * {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box
    }

    .mt-range *[slot=start] {
        margin-right: 5px
    }

    .mt-range *[slot=end] {
        margin-left: 5px
    }

    .mt-range-content {
        position: relative;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin-right: 30px
    }

    .mt-range-runway {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 0;
        right: -30px;
        border-top-color: #a9acb1;
        border-top-style: solid
    }

    .mt-range-thumb {
        background-color: #fff;
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        cursor: move;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4)
    }

    .mt-range-progress {
        position: absolute;
        display: block;
        background-color: #26a2ff;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 0
    }

    .mt-range--disabled {
        opacity: 0.5
    }

    .picker {
        overflow: hidden;
    }

    .picker-toolbar {
        height: 40px;
    }

    .picker-items {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 0;
        text-align: right;
        font-size: 24px;
        position: relative;
    }

    .picker-center-highlight {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        width: 100%;
        top: 50%;
        margin-top: -18px;
        pointer-events: none
    }

    .picker-center-highlight:before, .picker-center-highlight:after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: #eaeaea;
        display: block;
        z-index: 15;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }

    .picker-center-highlight:before {
        left: 0;
        top: 0;
        bottom: auto;
        right: auto;
    }

    .picker-center-highlight:after {
        left: 0;
        bottom: 0;
        right: auto;
        top: auto;
    }

    .picker-slot {
        font-size: 18px;
        overflow: hidden;
        position: relative;
        max-height: 100%
    }

    .picker-slot.picker-slot-left {
        text-align: left;
    }

    .picker-slot.picker-slot-center {
        text-align: center;
    }

    .picker-slot.picker-slot-right {
        text-align: right;
    }

    .picker-slot.picker-slot-divider {
        color: #000;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center
    }

    .picker-slot-wrapper {
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .picker-slot-wrapper.dragging, .picker-slot-wrapper.dragging .picker-item {
        -webkit-transition-duration: 0s;
        transition-duration: 0s;
    }

    .picker-item {
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #707274;
        left: 0;
        top: 0;
        width: 100%;
        box-sizing: border-box;
        -webkit-transition-duration: .3s;
        transition-duration: .3s;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .picker-slot-absolute .picker-item {
        position: absolute;
    }

    .picker-item.picker-item-far {
        pointer-events: none
    }

    .picker-item.picker-selected {
        color: #000;
        -webkit-transform: translate3d(0, 0, 0) rotateX(0);
        transform: translate3d(0, 0, 0) rotateX(0);
    }

    .picker-3d .picker-items {
        overflow: hidden;
        -webkit-perspective: 700px;
        perspective: 700px;
    }

    .picker-3d .picker-item, .picker-3d .picker-slot, .picker-3d .picker-slot-wrapper {
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d
    }

    .picker-3d .picker-slot {
        overflow: visible
    }

    .picker-3d .picker-item {
        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out
    }

    .mt-progress {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 30px;
        line-height: 30px
    }

    .mt-progress > * {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box
    }

    .mt-progress *[slot="start"] {
        margin-right: 5px
    }

    .mt-progress *[slot="end"] {
        margin-left: 5px
    }

    .mt-progress-content {
        position: relative;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1
    }

    .mt-progress-runway {
        position: absolute;
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        top: 50%;
        left: 0;
        right: 0;
        background-color: #ebebeb;
        height: 3px
    }

    .mt-progress-progress {
        position: absolute;
        display: block;
        background-color: #26a2ff;
        top: 50%;
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        width: 0
    }

    .mint-toast {
        position: fixed;
        max-width: 80%;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        z-index: 10000000000;
        -webkit-transition: opacity .3s linear;
        transition: opacity .3s linear
    }

    .mint-toast.is-placebottom {
        bottom: 50px;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0)
    }

    .mint-toast.is-placemiddle {
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%)
    }

    .mint-toast.is-placetop {
        top: 50px;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0)
    }

    .mint-toast-icon {
        display: block;
        text-align: center;
        font-size: 56px
    }

    .mint-toast-text {
        font-size: 14px;
        display: block;
        text-align: center
    }

    .mint-toast-pop-enter, .mint-toast-pop-leave-active {
        opacity: 0
    }

    .mint-indicator {
        -webkit-transition: opacity .2s linear;
        transition: opacity .2s linear;
    }

    .mint-indicator-wrapper {
        top: 50%;
        left: 50%;
        position: fixed;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        box-sizing: border-box;
        text-align: center;
    }

    .mint-indicator-text {
        display: block;
        color: #fff;
        text-align: center;
        margin-top: 10px;
        font-size: 16px;
    }

    .mint-indicator-spin {
        display: inline-block;
        text-align: center;
    }

    .mint-indicator-mask {
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: transparent;
    }

    .mint-indicator-enter, .mint-indicator-leave-active {
        opacity: 0;
    }

    .mint-msgbox {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        background-color: #fff;
        width: 85%;
        border-radius: 3px;
        font-size: 16px;
        -webkit-user-select: none;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: .2s;
        transition: .2s;
    }

    .mint-msgbox-header {
        padding: 15px 0 0;
    }

    .mint-msgbox-content {
        padding: 10px 20px 15px;
        border-bottom: 1px solid #ddd;
        min-height: 36px;
        position: relative;
    }

    .mint-msgbox-input {
        padding-top: 15px;
    }

    .mint-msgbox-input input {
        border: 1px solid #dedede;
        border-radius: 5px;
        padding: 4px 5px;
        width: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
    }

    .mint-msgbox-input input.invalid {
        border-color: #ff4949;
    }

    .mint-msgbox-input input.invalid:focus {
        border-color: #ff4949;
    }

    .mint-msgbox-errormsg {
        color: red;
        font-size: 12px;
        min-height: 18px;
        margin-top: 2px;
    }

    .mint-msgbox-title {
        text-align: center;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: 700;
        color: #333;
    }

    .mint-msgbox-message {
        color: #999;
        margin: 0;
        text-align: center;
        line-height: 36px;
    }

    .mint-msgbox-btns {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
        line-height: 40px;
    }

    .mint-msgbox-btn {
        line-height: 35px;
        display: block;
        background-color: #fff;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin: 0;
        border: 0;
    }

    .mint-msgbox-btn:focus {
        outline: none;
    }

    .mint-msgbox-btn:active {
        background-color: #fff;
    }

    .mint-msgbox-cancel {
        width: 50%;
        border-right: 1px solid #ddd;
    }

    .mint-msgbox-cancel:active {
        color: #000;
    }

    .mint-msgbox-confirm {
        color: #26a2ff;
        width: 50%;
    }

    .mint-msgbox-confirm:active {
        color: #26a2ff;
    }

    .msgbox-bounce-enter {
        opacity: 0;
        -webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
        transform: translate3d(-50%, -50%, 0) scale(0.7);
    }

    .msgbox-bounce-leave-active {
        opacity: 0;
        -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);
        transform: translate3d(-50%, -50%, 0) scale(0.9);
    }

    .v-modal-enter {
        -webkit-animation: v-modal-in .2s ease;
        animation: v-modal-in .2s ease;
    }

    .v-modal-leave {
        -webkit-animation: v-modal-out .2s ease forwards;
        animation: v-modal-out .2s ease forwards;
    }

    @-webkit-keyframes v-modal-in {
        0% {
            opacity: 0;
        }
        100% {
        }
    }

    @keyframes v-modal-in {
        0% {
            opacity: 0;
        }
        100% {
        }
    }

    @-webkit-keyframes v-modal-out {
        0% {
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes v-modal-out {
        0% {
        }
        100% {
            opacity: 0;
        }
    }

    .v-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-datetime {
        width: 100%;
    }

    .mint-datetime .picker-slot-wrapper, .mint-datetime .picker-item {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .mint-datetime .picker-toolbar {
        border-bottom: solid 1px #eaeaea;
    }

    .mint-datetime-action {
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #26a2ff;
    }

    .mint-datetime-cancel {
        float: left;
    }

    .mint-datetime-confirm {
        float: right;
    }

    /* Cell Component */
    /* Header Component */
    /* Button Component */
    /* Tab Item Component */
    /* Tabbar Component */
    /* Navbar Component */
    /* Checklist Component */
    /* Radio Component */
    /* z-index */
    .mint-indexlist {
        width: 100%;
        position: relative;
        overflow: hidden
    }

    .mint-indexlist-content {
        margin: 0;
        padding: 0;
        overflow: auto
    }

    .mint-indexlist-nav {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: 0;
        background-color: #fff;
        border-left: solid 1px #ddd;
        text-align: center;
        max-height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center
    }

    .mint-indexlist-navlist {
        padding: 0;
        margin: 0;
        list-style: none;
        max-height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column
    }

    .mint-indexlist-navitem {
        padding: 2px 6px;
        font-size: 12px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none
    }

    .mint-indexlist-indicator {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 50px;
        background-color: rgba(0, 0, 0, .7);
        border-radius: 5px;
        color: #fff;
        font-size: 22px
    }

    .mint-indexsection {
        padding: 0;
        margin: 0
    }

    .mint-indexsection-index {
        margin: 0;
        padding: 10px;
        background-color: #fafafa
    }

    .mint-indexsection-index + ul {
        padding: 0
    }

    .mint-palette-button {
        display: inline-block;
        position: relative;
        border-radius: 50%;
        width: 56px;
        height: 56px;
        line-height: 56px;
        text-align: center;
        -webkit-transition: -webkit-transform .1s ease-in-out;
        transition: -webkit-transform .1s ease-in-out;
        transition: transform .1s ease-in-out;
        transition: transform .1s ease-in-out, -webkit-transform .1s ease-in-out;
    }

    .mint-main-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: blue;
        font-size: 2em;
    }

    .mint-palette-button-active {
        -webkit-animation: mint-zoom 0.5s ease-in-out;
        animation: mint-zoom 0.5s ease-in-out;
    }

    .mint-sub-button-container > * {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 25px;
        height: 25px;
        -webkit-transition: -webkit-transform .3s ease-in-out;
        transition: -webkit-transform .3s ease-in-out;
        transition: transform .3s ease-in-out;
        transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out;
    }

    @-webkit-keyframes mint-zoom {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1)
        }
        10% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1)
        }
        30% {
            -webkit-transform: scale(0.9);
            transform: scale(0.9)
        }
        50% {
            -webkit-transform: scale(1.05);
            transform: scale(1.05)
        }
        70% {
            -webkit-transform: scale(0.95);
            transform: scale(0.95)
        }
        90% {
            -webkit-transform: scale(1.01);
            transform: scale(1.01)
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1)
        }
    }

    @keyframes mint-zoom {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1)
        }
        10% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1)
        }
        30% {
            -webkit-transform: scale(0.9);
            transform: scale(0.9)
        }
        50% {
            -webkit-transform: scale(1.05);
            transform: scale(1.05)
        }
        70% {
            -webkit-transform: scale(0.95);
            transform: scale(0.95)
        }
        90% {
            -webkit-transform: scale(1.01);
            transform: scale(1.01)
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1)
        }
    }

    @font-face {
        font-family: "mintui";
        src: url(data:application/x-font-ttf;base64,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)
    }

    #help_article .article_con img {
        width: 100%;
    }

    #help_article .article_con ul {
        padding: .2rem;
        margin: 0 .2rem;
    }

    #help_article .article_con li {
        list-style: disc;
        /*list-style: square;*/
    }

    #help_article .article_con ul ul {
        margin: 0;
        padding: 0 0 0 .2rem;
    }

    #help_article .article_con li li {
        list-style: circle;
        padding-left: .2rem;
    }

    .mintui {
        font-family: "mintui" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .mintui-search:before {
        content: "\E604";
    }

    .mintui-more:before {
        content: "\E601";
    }

    .mintui-back:before {
        content: "\E600";
    }

    .mintui-field-error:before {
        content: "\E605";
    }

    .mintui-field-warning:before {
        content: "\E608";
    }

    .mintui-success:before {
        content: "\E602";
    }

    .mintui-field-success:before {
        content: "\E609";
    }

    /*swiper*/
    .swiper-container {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        z-index: 1
    }

    .swiper-container-no-flexbox .swiper-slide {
        float: left
    }

    .swiper-container-vertical > .swiper-wrapper {
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column
    }

    .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-transition-property: -webkit-transform;
        -moz-transition-property: -moz-transform;
        -o-transition-property: -o-transform;
        -ms-transition-property: -ms-transform;
        transition-property: transform;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box
    }

    .swiper-container-android .swiper-slide, .swiper-wrapper {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -o-transform: translate(0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0)
    }

    .swiper-container-multirow > .swiper-wrapper {
        -webkit-box-lines: multiple;
        -moz-box-lines: multiple;
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap
    }

    .swiper-container-free-mode > .swiper-wrapper {
        -webkit-transition-timing-function: ease-out;
        -moz-transition-timing-function: ease-out;
        -ms-transition-timing-function: ease-out;
        -o-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
        margin: 0 auto
    }

    .swiper-slide {
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative
    }

    .swiper-container-autoheight, .swiper-container-autoheight .swiper-slide {
        height: auto
    }

    .swiper-container-autoheight .swiper-wrapper {
        -webkit-box-align: start;
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
        -webkit-transition-property: -webkit-transform, height;
        -moz-transition-property: -moz-transform;
        -o-transition-property: -o-transform;
        -ms-transition-property: -ms-transform;
        transition-property: transform, height
    }

    .swiper-container .swiper-notification {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        opacity: 0;
        z-index: -1000
    }

    .swiper-wp8-horizontal {
        -ms-touch-action: pan-y;
        touch-action: pan-y
    }

    .swiper-wp8-vertical {
        -ms-touch-action: pan-x;
        touch-action: pan-x
    }

    .swiper-button-next, .swiper-button-prev {
        position: absolute;
        top: 50%;
        width: 27px;
        height: 44px;
        margin-top: -22px;
        z-index: 10;
        cursor: pointer;
        -moz-background-size: 27px 44px;
        -webkit-background-size: 27px 44px;
        background-size: 27px 44px;
        background-position: center;
        background-repeat: no-repeat
    }

    .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
        opacity: .35;
        cursor: auto;
        pointer-events: none
    }

    .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
        left: 10px;
        right: auto
    }

    .swiper-button-prev.swiper-button-black, .swiper-container-rtl .swiper-button-next.swiper-button-black {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E")
    }

    .swiper-button-prev.swiper-button-white, .swiper-container-rtl .swiper-button-next.swiper-button-white {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")
    }

    .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
        right: 10px;
        left: auto
    }

    .swiper-button-next.swiper-button-black, .swiper-container-rtl .swiper-button-prev.swiper-button-black {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E")
    }

    .swiper-button-next.swiper-button-white, .swiper-container-rtl .swiper-button-prev.swiper-button-white {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")
    }

    .swiper-pagination {
        position: absolute;
        text-align: center;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        transition: .3s;
        -webkit-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        z-index: 10
    }

    .swiper-pagination.swiper-pagination-hidden {
        opacity: 0
    }

    .swiper-container-horizontal > .swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
        bottom: 10px;
        left: 0;
        width: 100%
    }

    .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #000;
        opacity: .2
    }

    button.swiper-pagination-bullet {
        border: none;
        margin: 0;
        padding: 0;
        box-shadow: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -webkit-appearance: none;
        appearance: none
    }

    .swiper-pagination-clickable .swiper-pagination-bullet {
        cursor: pointer
    }

    .swiper-pagination-white .swiper-pagination-bullet {
        background: #fff
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
        background: #f31e37;
    }

    .swiper-pagination-white .swiper-pagination-bullet-active {
        background: #fff
    }

    .swiper-pagination-black .swiper-pagination-bullet-active {
        background: #000
    }

    .swiper-container-vertical > .swiper-pagination-bullets {
        right: 10px;
        top: 50%;
        -webkit-transform: translate3d(0, -50%, 0);
        -moz-transform: translate3d(0, -50%, 0);
        -o-transform: translate(0, -50%);
        -ms-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0)
    }

    .swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 5px 0;
        display: block
    }

    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 5px
    }

    .swiper-pagination-progress {
        background: rgba(0, 0, 0, .25);
        position: absolute
    }

    .swiper-pagination-progress .swiper-pagination-progressbar {
        background: #007aff;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        -webkit-transform: scale(0);
        -ms-transform: scale(0);
        -o-transform: scale(0);
        transform: scale(0);
        -webkit-transform-origin: left top;
        -moz-transform-origin: left top;
        -ms-transform-origin: left top;
        -o-transform-origin: left top;
        transform-origin: left top
    }

    .swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar {
        -webkit-transform-origin: right top;
        -moz-transform-origin: right top;
        -ms-transform-origin: right top;
        -o-transform-origin: right top;
        transform-origin: right top
    }

    .swiper-container-horizontal > .swiper-pagination-progress {
        width: 100%;
        height: 4px;
        left: 0;
        top: 0
    }

    .swiper-container-vertical > .swiper-pagination-progress {
        width: 4px;
        height: 100%;
        left: 0;
        top: 0
    }

    .swiper-pagination-progress.swiper-pagination-white {
        background: rgba(255, 255, 255, .5)
    }

    .swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar {
        background: #fff
    }

    .swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar {
        background: #000
    }

    .swiper-container-3d {
        -webkit-perspective: 1200px;
        -moz-perspective: 1200px;
        -o-perspective: 1200px;
        perspective: 1200px
    }

    .swiper-container-3d .swiper-cube-shadow, .swiper-container-3d .swiper-slide, .swiper-container-3d .swiper-slide-shadow-bottom, .swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top, .swiper-container-3d .swiper-wrapper {
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        transform-style: preserve-3d
    }

    .swiper-container-3d .swiper-slide-shadow-bottom, .swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10
    }

    .swiper-container-3d .swiper-slide-shadow-left {
        background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, 0)));
        background-image: -webkit-linear-gradient(right, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: -moz-linear-gradient(right, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: -o-linear-gradient(right, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0))
    }

    .swiper-container-3d .swiper-slide-shadow-right {
        background-image: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, 0)));
        background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: -moz-linear-gradient(left, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: -o-linear-gradient(left, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: linear-gradient(to right, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0))
    }

    .swiper-container-3d .swiper-slide-shadow-top {
        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, 0)));
        background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: -moz-linear-gradient(bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: -o-linear-gradient(bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: linear-gradient(to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0))
    }

    .swiper-container-3d .swiper-slide-shadow-bottom {
        background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, 0)));
        background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: -moz-linear-gradient(top, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: -o-linear-gradient(top, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0))
    }

    .swiper-container-coverflow .swiper-wrapper, .swiper-container-flip .swiper-wrapper {
        -ms-perspective: 1200px
    }

    .swiper-container-cube, .swiper-container-flip {
        overflow: visible
    }

    .swiper-container-cube .swiper-slide, .swiper-container-flip .swiper-slide {
        pointer-events: none;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: 1
    }

    .swiper-container-cube .swiper-slide .swiper-slide, .swiper-container-flip .swiper-slide .swiper-slide {
        pointer-events: none
    }

    .swiper-container-cube .swiper-slide-active, .swiper-container-cube .swiper-slide-active .swiper-slide-active, .swiper-container-flip .swiper-slide-active, .swiper-container-flip .swiper-slide-active .swiper-slide-active {
        pointer-events: auto
    }

    .swiper-container-cube .swiper-slide-shadow-bottom, .swiper-container-cube .swiper-slide-shadow-left, .swiper-container-cube .swiper-slide-shadow-right, .swiper-container-cube .swiper-slide-shadow-top, .swiper-container-flip .swiper-slide-shadow-bottom, .swiper-container-flip .swiper-slide-shadow-left, .swiper-container-flip .swiper-slide-shadow-right, .swiper-container-flip .swiper-slide-shadow-top {
        z-index: 0;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden
    }

    .swiper-container-cube .swiper-slide {
        visibility: hidden;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        transform-origin: 0 0;
        width: 100%;
        height: 100%
    }

    .swiper-container-cube.swiper-container-rtl .swiper-slide {
        -webkit-transform-origin: 100% 0;
        -moz-transform-origin: 100% 0;
        -ms-transform-origin: 100% 0;
        transform-origin: 100% 0
    }

    .swiper-container-cube .swiper-slide-active, .swiper-container-cube .swiper-slide-next, .swiper-container-cube .swiper-slide-next + .swiper-slide, .swiper-container-cube .swiper-slide-prev {
        pointer-events: auto;
        visibility: visible
    }

    .swiper-container-cube .swiper-cube-shadow {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .6;
        -webkit-filter: blur(50px);
        filter: blur(50px);
        z-index: 0
    }

    .swiper-container-fade.swiper-container-free-mode .swiper-slide {
        -webkit-transition-timing-function: ease-out;
        -moz-transition-timing-function: ease-out;
        -ms-transition-timing-function: ease-out;
        -o-transition-timing-function: ease-out;
        transition-timing-function: ease-out
    }

    .swiper-container-fade .swiper-slide {
        pointer-events: none;
        -webkit-transition-property: opacity;
        -moz-transition-property: opacity;
        -o-transition-property: opacity;
        transition-property: opacity
    }

    .swiper-container-fade .swiper-slide .swiper-slide {
        pointer-events: none
    }

    .swiper-container-fade .swiper-slide-active, .swiper-container-fade .swiper-slide-active .swiper-slide-active {
        pointer-events: auto
    }

    .swiper-zoom-container {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        text-align: center
    }

    .swiper-zoom-container > canvas, .swiper-zoom-container > img, .swiper-zoom-container > svg {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain
    }

    .swiper-scrollbar {
        border-radius: 10px;
        position: relative;
        -ms-touch-action: none;
        background: rgba(0, 0, 0, .1)
    }

    .swiper-container-horizontal > .swiper-scrollbar {
        position: absolute;
        left: 1%;
        bottom: 3px;
        z-index: 50;
        height: 5px;
        width: 98%
    }

    .swiper-container-vertical > .swiper-scrollbar {
        position: absolute;
        right: 3px;
        top: 1%;
        z-index: 50;
        width: 5px;
        height: 98%
    }

    .swiper-scrollbar-drag {
        height: 100%;
        width: 100%;
        position: relative;
        background: rgba(0, 0, 0, .5);
        border-radius: 10px;
        left: 0;
        top: 0
    }

    .swiper-scrollbar-cursor-drag {
        cursor: move
    }

    .swiper-lazy-preloader {
        width: 42px;
        height: 42px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -21px;
        margin-top: -21px;
        z-index: 10;
        -webkit-transform-origin: 50%;
        -moz-transform-origin: 50%;
        transform-origin: 50%;
        -webkit-animation: swiper-preloader-spin 1s steps(12, end) infinite;
        -moz-animation: swiper-preloader-spin 1s steps(12, end) infinite;
        animation: swiper-preloader-spin 1s steps(12, end) infinite
    }

    .swiper-lazy-preloader:after {
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: 50%;
        -webkit-background-size: 100%;
        background-size: 100%;
        background-repeat: no-repeat
    }

    .swiper-lazy-preloader-white:after {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    }

    @-webkit-keyframes swiper-preloader-spin {
        100% {
            -webkit-transform: rotate(360deg)
        }
    }

    @keyframes swiper-preloader-spin {
        100% {
            transform: rotate(360deg)
        }
    }
    .color-blue-v1 {
        color: #4A90E2;
    }

</style>
