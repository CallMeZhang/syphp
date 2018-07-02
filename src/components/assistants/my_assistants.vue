<template>
    <div class="top-content">
        <div v-title="'我关注的扶贫驿站'"></div>
        <ul class="ul-content" v-if="assistants.length>0">
            <li class="li-first"></li>
            <li v-for="item in assistants" class="list-li"
                @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/bocm/index.php?act=goods&op=agent_poor_goods_list&member_id='+item.cared_member_id)">
                <img :src="item.member_avatar" alt="" class="head-img">
                <p class="name">
                    <span class="name-content">{{showStoreName(item.store_name)}}</span><br/>
                    <span class="name-text">助理人：{{item.member_truename}}</span>
                </p>
                <div class='btn' @click.stop="rightBtn(item)">{{'取消关注'}}</div>
            </li>
        </ul>
        <div v-if="assistants.length==0" class="un-list">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/assistants/icon-uncare.png'" alt=""
                 class="uncare">
            <p class="uncare-txt">您还没有关注的扶贫驿站</p>
        </div>
    </div>
</template>

<script>

	export default {
		data() {
			return {
				assistants: [],
				cur_page: 0,
				getDataDone: true
			}
		},
		created() {
			this._appjs.syJsbSetTitleText('我关注的扶贫驿站')
			this.getAgentList()
			window.addEventListener('scroll', this.handleScroll);
		},
		methods: {
			showStoreName: function (store_name) {
				if ((/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(store_name))) {
					return '扶贫驿站'
				} else {
					return store_name
			    }
			},
			rightBtn(params){
				this._appjs.syJsbConfirm('确认取消关注该扶贫驿站吗？', "确认", '取消', (data) => {
					if (data) {
						let url = this.siteInfo.host + '/api/index.php?act=v_agent&op=uncare_agent&cared_member_id=' + params.cared_member_id
						this.$http.get(url).then((res) => {
							console.log(res)
							if (res.data.code === 200) {
								let $V_child = this.assistants.length
								for (let i = 0; i < $V_child; i++) {
									let id = this.assistants[i].cared_member_id
									if (params.cared_member_id === id) {
										this.assistants.splice(i, 1)
										break;
									}
								}
								this._appjs.showToast("取消关注成功")
							} else {
								console.log(res.data.code + ' 404 无数据')
							}
						}, (error) => {
							console.log(error)
						})
					}
				})
			},
			handleScroll(){
				var offsetHeight = document.body.scrollHeight
				var clientHeight = document.body.clientHeight
				var scrollTop = 0;
				if (document.documentElement && document.documentElement.scrollTop) {
					scrollTop = document.documentElement.scrollTop;
				} else if (document.body) {
					scrollTop = document.body.scrollTop;
				}
				if (offsetHeight - clientHeight - scrollTop <= 50 && this.getDataDone) {
					this.getAgentList()
					this.getDataDone = false
				}
			},
			getAgentList(){
				let url = this.siteInfo.host + '/api/index.php?act=v_agent&op=my_care_agent_list&cur_page=' + this.cur_page
				this.$http.get(url).then((res) => {
					if (res.data.code === 200) {
						this.assistants = res.data.member_list//cared_member_id
						this.cur_page++
						this.getDataDone = true
					} else {
						console.log(res.data.code + ' 404 无数据')
					}
				}, (error) => {
					console.log(error)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
    .name-content {
        font-weight: 300;
        font-size: .30rem;
        color: #4B4F63;
    }

    .name-text {
        font-weight: 300;
        font-size: .24rem;
        color: #B1B8C4;
    }

    .un-list {
        text-align: center;
        width: 100%;
    }

    .uncare-txt {
        margin-bottom: 4.75rem;
        text-align: center;
        font-weight: 300;
        font-size: .32rem;
        color: #B1B8C4;
        margin-top: 0.57rem;
    }

    .uncare {
        width: 2.62rem;
        height: 2.57rem;
        margin: 3.72rem 0 0 0rem;
    }

    .li-first {
        width: 100%;
        height: 0.2rem;
        background: #F7F9FA;
    }

    .name {
        float: left;
        font-size: 0.34rem;
        color: #4B4F63;
        font-weight: 300;
        text-align: left;
        margin-top: 0.25rem;
    }

    .ul-content {
        height: 100%;
        background: #fff;
        overflow: hidden;
    }

    .list-li {
        height: 1.2rem;
        border-bottom: 0.01rem solid #DADEE4;
        overflow: hidden;
    }

    .btn {
        float: right;
        width: 1.4rem;
        height: 0.6rem;
        border: 1px solid #4A90E2;
        border-radius: 0.08rem;
        margin: 0.3rem 0.3rem 0 0;
        background: #fff;
        font-size: 0.26rem;
        color: #4A90E2;
        letter-spacing: 0;
        font-weight: 300;
        padding: 0;
        text-align: center;
        line-height: 0.6rem;
        box-sizing: border-box;
    }

    img {
        display: inline-block;
        border: 0;
    }

    .head-img {
        width: 0.75rem;
        height: 0.76rem;
        border-radius: 50%;
        display: inline-block;
        float: left;
        margin: 0.22rem 0.22rem 0 0.3rem;
    }

    .top-content {
        width: 100%;
        height: 100%;
    }
</style>
