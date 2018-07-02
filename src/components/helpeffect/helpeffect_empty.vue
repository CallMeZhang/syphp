<template>
    <div>
        <div v-title="'帮扶成效'"></div>
        <div class="helpeffect-emp">
            <div style="width: 100%;height: 0.01rem;"></div>
            <div class="helpeffect-zi" style="margin-top: 7.48rem;">{{xname}}刚刚入驻</div>
            <div class="helpeffect-zi">帮扶数据暂未生成 敬请关注~</div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "helpeffect_empty",
        props:{
            xname:{
                type:'',
                default:'贫困县'
            }
        }
    }
</script>

<style scoped>
    .helpeffect-emp{
        width: 7.5rem;
        height: 12.06rem;
        background: url("/bocm/platformjs/static/image/helpEffect/helpeffect-bbg.png") no-repeat;
        background-size: 7.5rem 12.06rem;
        box-sizing: border-box;
        margin-top: 0;
    }
    .helpeffect-zi{
        width: 100%;
        height: 0.5rem;
        font-size: 0.36rem;
        color: #FFF;
        line-height: 0.5rem;
        text-align: center;

    }
</style>