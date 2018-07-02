<template>
    <div class="container">
        <div class="login-v2-logo hide">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/gyzg_icon.png'" width="100%" height="100%" alt=""/>
        </div>
        <div class="login-v2-inputbox hide">
            <div class="login-v2-inputbox-left login-v2-inputbox-left-icon-phone"></div>
            <div class="login-v2-inputbox-right">
                <input id="mobile" type="tel" autofocus="autofocus" name="mobile" placeholder="请输入您的手机号 "
                       class="phone-put">
            </div>
        </div>
        <div class="login-v2-inputbox hide">
            <div class="login-v2-inputbox-left login-v2-inputbox-left-icon-mima"></div>
            <div class="login-v2-inputbox-right">
                <input type="tel" autofocus="autofocus" placeholder="请输入验证码  " class="mima-put" id="code">
                <div class="login-v2-yam color-blue-v1" id="get_code" onclick="get_code()">发送验证码</div>
            </div>
        </div>
        <div class="login-v2-btn" style="font-size: .28rem;" onclick="sure_click();">确定</div>
        <div class="login-v2-edt">*注册代表您已同意
            <div>
                <a onclick="syJsbLaunchWebview('<?php echo SHOP_SITE_URL;?>/index.php?act=login&op=user_protocol_pwcn');" class="color-blue-v1">《公益中国用户协议》</a>
                <a onclick="syJsbLaunchWebview('<?php echo SHOP_SITE_URL;?>/index.php?act=login&op=user_privacy_agreement');" class="color-blue-v1">《公益中国用户隐私保护规则》</a>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
    .container {
        height: 100%;
        background: url(/bocm/platformjs/static/image/login/zh231.jpg);
        background-size: 100% 100%;
    }
    .login-v2-logo {
        width: 100%;
        height: 3.2rem;
    }

    .login-v2-logo img {
        width: 1.4rem;
        height: 1.4rem;
        margin: 0.8rem auto 1rem;
        border-radius: 0.3rem;
        box-shadow: 0 2px 2px rgba(188, 188, 188, .25)
    }

    .login-v2-edt {
        text-align: center;
        font-size: 0.24rem;
    }

    .login-v2-inputbox-left-icon-phone {
        background: url(/bocm/platformjs/static/image/login/zh229.png) no-repeat center right;
        background-size: 0.37rem 0.44rem
    }

    .login-v2-inputbox-left-icon-mima {
        background: url(/bocm/platformjs/static/image/login/zh230.png) no-repeat center right;
        background-size: 0.37rem 0.44rem
    }

</style>