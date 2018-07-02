<template>
    <div>
        <div v-title="type == 'qq'? 'QQ客服':'电话客服'"></div>
        <div class="list-input-box list-input-box2 border-both">
            <input v-model="num" type="tel" maxlength="18" name="member_qq" id="member_qq"  placeholder=""  class="list-input">
        </div>
        <div class="v2-shuzi">{{num_length}}/18</div>
        <div class="blue-btn" @click="tijiao">确定</div>
    </div>
</template>
<script>
    export default {
        data (){
            return{
                num:'',
                qq:'',
                store_tel:'',
                type:''
            }
        },
        computed: {
            num_length:function () {
                return this.num.length
            }
        },
        created:function () {
            this.getData()
        },
        methods:{
            getData(){
                this.type = this.$route.query.type
                this.$http.get(this.siteInfo.host + '/api/index.php?act=home&op=getAgentMobileAndQQ' ).then(res => {
                    let data = res.data.data
                    this.qq = data.qq
                    this.store_tel = data.store_tel
                    this.type=='qq' ? this.num = this.qq : this.num =this.store_tel
                })
            },
            tijiao(){
                let url =  this.siteInfo.host + '/api/index.php?act=home&op=updateAgentMobileAndQQ'
                let data = {type:this.type,data:this.num}
                var qs = require('querystring');
                this.$http.post(url,qs.stringify(data)).then(res =>{
                    let code = res.data.code
                    let message = res.data.message
                    if(code == '200'){
                        this.$toast({
                            message: "设置成功",
                            duration: 2000
                        })
                    }else {
                        this.$toast({
                            message: message,
                            duration: 2000
                        })
                    }
                })
            }
        }
        
    }
</script>
<style scoped>
    .border-both {
        border-bottom: 1px solid #e9e8ef;
        border-top: 1px solid #e9e8ef;
    }
    .list-input-box {
        height: 0.88rem;
        background: #fff;
        line-height: 0.88rem;
        padding-left: 0.24rem;
    }
    .list-input-box2 input {
        color: #4b4f63;
        font-size: 0.28rem;
    }
    .list-input {
        height: 0.4rem;
        line-height: 0.4rem;
        width: 96%;
        padding: 0;
        border: 0;
    }
    .v2-shuzi {
        color: #4a90e2;
        height: 0.24rem;
        line-height: 0.24rem;
        font-size: 0.24rem;
        text-align: right;
        padding: 0 0.24rem;
        margin-top: 0.2rem;
    }
    .blue-btn {
        margin: 0.4rem 0.24rem 0;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        border-radius: 0.16rem;
        background: #4a90e2;
    }
</style>
