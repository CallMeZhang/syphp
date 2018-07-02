// import index from '@/components/volunteer/index'
const index = r => require.ensure([], () => r(require('@/components/volunteer/index')), 'gy_volunteer')
const vol_detail = r => require.ensure([], () => r(require('@/components/volunteer/vol_detail')), 'gy_volunteer')
const vol_organization = r => require.ensure([], () => r(require('@/components/volunteer/vol_organization')), 'gy_volunteer')
const vol_list = r => require.ensure([], () => r(require('@/components/volunteer/vol_list')), 'gy_volunteer')
const vol_recruit = r => require.ensure([], () => r(require('@/components/volunteer/vol_recruit')), 'gy_volunteer')
const vol_enrol_info = r => require.ensure([], () => r(require('@/components/volunteer/vol_enrol_info')), 'gy_volunteer')
const vol_my_info = r => require.ensure([], () => r(require('@/components/volunteer/vol_my_info')), 'gy_volunteer')
const vol_appraise_info = r => require.ensure([], () => r(require('@/components/volunteer/vol_appraise_info')), 'gy_volunteer')
const vol_idcard = r => require.ensure([], () => r(require('@/components/volunteer/vol_idcard')), 'gy_volunteer')
const act_evaluate = r => require.ensure([], () => r(require('@/components/volunteer/act_evaluate')), 'gy_volunteer')
const vol_review = r => require.ensure([], () => r(require('@/components/volunteer/vol_review')), 'gy_volunteer')
const vol_recruit_review = r => require.ensure([], () => r(require('@/components/volunteer/vol_recruit_review')), 'gy_volunteer')
const organization_detail = r => require.ensure([], () => r(require('@/components/volunteer/organization_detail')), 'gy_volunteer')
const authentication = r => require.ensure([], () => r(require('@/components/volunteer/authentication')), 'gy_volunteer')
const vol_protocol = r => require.ensure([], () => r(require('@/components/volunteer/vol_protocol')), 'gy_volunteer')
const authentication_succeed = r => require.ensure([], () => r(require('@/components/volunteer/authentication_succeed')), 'gy_volunteer')
const member_list = r => require.ensure([], () => r(require('@/components/volunteer/member_list')), 'gy_volunteer')
const member_detail = r => require.ensure([], () => r(require('@/components/volunteer/member_detail')), 'gy_volunteer')
const recruit_member_list = r => require.ensure([], () => r(require('@/components/volunteer/recruit_member_list')), 'gy_volunteer')
const recruit_detail = r => require.ensure([], () => r(require('@/components/volunteer/recruit_detail')), 'gy_volunteer')
const vol_result = r => require.ensure([], () => r(require('@/components/volunteer/vol_result')), 'gy_volunteer')
const vol_result_fail = r => require.ensure([], () => r(require('@/components/volunteer/vol_result_fail')), 'gy_volunteer')
const vol_volunteer_result_fail = r => require.ensure([], () => r(require('@/components/volunteer/vol_volunteer_result_fail')), 'gy_volunteer')
const vol_goods_list = r => require.ensure([], () => r(require('@/components/volunteer/vol_goods_list')), 'gy_volunteer')
const become_volunteer = r => require.ensure([], () => r(require('@/components/volunteer/become_volunteer')), 'gy_volunteer')
const vol_apply = r => require.ensure([], () => r(require('@/components/volunteer/vol_apply')), 'gy_volunteer')
const vol_friendteam = r => require.ensure([], () => r(require('@/components/volunteer/vol_friendteam')), 'gy_volunteer')
const qrcode_go_volunteer = r => require.ensure([], () => r(require('@/components/volunteer/qrcode_go_volunteer')), 'gy_volunteer')
const qrcode_go_login = r => require.ensure([], () => r(require('@/components/volunteer/qrcode_go_login')), 'gy_volunteer')
const update = r => require.ensure([], () => r(require('@/components/volunteer/update')), 'gy_volunteer')
    // import vol_detail from '@/components/volunteer/vol_detail'
    // import vol_organization from '@/components/volunteer/vol_organization.vue'
    // import vol_list from '@/components/volunteer/vol_list.vue'
    // import vol_recruit from '@/components/volunteer/vol_recruit.vue'
    // import vol_enrol_info from '@/components/volunteer/vol_enrol_info.vue'
    // import vol_my_info from '@/components/volunteer/vol_my_info.vue'
    // import vol_appraise_info from '@/components/volunteer/vol_appraise_info.vue'
    // import vol_idcard from '@/components/volunteer/vol_idcard.vue'
    // import act_evaluate from '@/components/volunteer/act_evaluate.vue'
    // import vol_review from '@/components/volunteer/vol_review.vue'
    // import vol_recruit_review from '@/components/volunteer/vol_recruit_review.vue'
    // import organization_detail from '@/components/volunteer/organization_detail.vue'
    // import authentication from '@/components/volunteer/authentication.vue'
    // import vol_protocol from '@/components/volunteer/vol_protocol.vue'
    // import authentication_succeed from '@/components/volunteer/authentication_succeed.vue'
    // import member_list from '@/components/volunteer/member_list.vue'
    // import member_detail from '@/components/volunteer/member_detail.vue'
    // import recruit_member_list from '@/components/volunteer/recruit_member_list.vue'
    // import recruit_detail from '@/components/volunteer/recruit_detail.vue'
    // import vol_result from '@/components/volunteer/vol_result.vue'
    // import vol_result_fail from '@/components/volunteer/vol_result_fail.vue'
    // import vol_volunteer_result_fail from '@/components/volunteer/vol_volunteer_result_fail.vue'
    // import vol_goods_list from '@/components/volunteer/vol_goods_list.vue'
    // import become_volunteer from '@/components/volunteer/become_volunteer.vue'
    // import vol_apply from '@/components/volunteer/vol_apply.vue'
    // import organization_info from '@/components/volunteer/organization_info.vue'


export default [{ // 志愿组织首页
        path: 'index',
        component: index
    },
    { // 搜索页
        path: 'vol_goods_list',
        component: vol_goods_list
    },
    { // 志愿组织详情页
        path: 'vol_detail',
        component: vol_detail
    },
    { // 下级志愿组织详细信息
        path: 'vol_organization',
        component: vol_organization
    },
    { // 下级志愿组织详细信息
        path: 'vol_list',
        component: vol_list
    },
    { // 志愿招募列表页
        path: 'vol_recruit',
        component: vol_recruit
    },
    { // 我报名的招募信息
        path: 'vol_enrol_info',
        component: vol_enrol_info
    },
    { //志愿组织成员列表
        path: 'member_list',
        component: member_list
    },
    { //招募管理组织成员列表
        path: 'recruit_member_list',
        component: recruit_member_list
    },
    { // 我报名的招募信息
        path: 'vol_my_info',
        component: vol_my_info
    },
    { // 招募详情
        path: 'recruit_detail',
        component: recruit_detail
    },

    { // 评价详情
        path: 'vol_appraise_info',
        component: vol_appraise_info
    },
    { // 我的志愿者服务卡
        path: 'vol_idcard',
        component: vol_idcard
    },
    { //评价
        path: 'act_evaluate',
        component: act_evaluate
    },
    { //下级志愿组织信息
        path: 'organization_detail',
        component: organization_detail
    },
    { //志愿者审核
        path: 'vol_review',
        component: vol_review
    },
    { //招募审核
        path: 'vol_recruit_review',
        component: vol_recruit_review
    },
    { //实名认证
        path: 'authentication',
        component: authentication
    },
    { //志愿者志愿者信息交互平台用户协议
        path: 'vol_protocol',
        component: vol_protocol
    },
    { //认证成功
        path: 'authentication_succeed',
        component: authentication_succeed
    },
    { //志愿组织成员列表
        path: 'member_detail',
        component: member_detail
    },
    { //志愿组织具体列表
        path: 'vol_list',
        component: vol_list
    },
    { //审核结果页
        path: 'service_time_confirm_notice',
        component: vol_result
    },
    { //招募信息审核结果
        path: 'recruit_refused',
        component: vol_result_fail
    },
    { //志愿组织审核结果
        path: 'vol_refused',
        component: vol_volunteer_result_fail
    },
    { //成为志愿者
        path: 'become_volunteer',
        component: become_volunteer
    },
    { //志愿组织入驻
        path: 'vol_apply',
        component: vol_apply
    },
    { //志愿组织入驻
        path: 'vol_friendteam',
        component: vol_friendteam
    },
    { //扫二维码进入页面 (登录前)
        path: 'qrcode_go_login',
        component: qrcode_go_login
    },
    { //扫二维码进入页面 (登录后页面)
        path: 'qrcode_go_volunteer',
        component: qrcode_go_volunteer
    },
    { //升级中页面
        path: 'update',
        component: update
    }
]