<template>
    <div>
        <div v-title="'升级中'"></div>
       <img :src="siteInfo.cdn_host +'/bocm/platformjs/static/image/volunteer/update.png'" alt="升级中">
       <p>很抱歉，一起志愿相关功能正在升级维护</p>
       <p>暂不支持访问，敬请理解~~~</p>
    </div>
</template>
<style scoped>
    img{
        width: 2.3rem;
        height: 2.3rem;
        padding-top: 2.1rem;
        padding-bottom: 1rem;
    }
    p{
        font-weight: 300;
        color: #818C9E;
        font-size: 0.23rem;
        text-align: center;
        line-height: 0.4rem;
    }
</style>

