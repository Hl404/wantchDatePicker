<template>
	<div>
		<div class="clubCard-content">
			<p class="handline">万天互娱会员卡</p>
			<div class="clubCard-item">
				<img :src="clubUrl" />
			</div>

			<div class="clubCard-ID">会员卡ID：{{member_sn}}</div>
			<div class="clubCard-status">星趴电影10元优惠抵用券星趴电影10元优惠抵用券星趴电 影10元优惠抵用券影10元优惠抵用券
			</div>
		</div>
		<register @emitRegister="emitRegister"></register>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { memberCard } from 'src/service/getData'
	import { doAuthRedirect } from 'src/service/redirect'
	import { ApiConst } from 'src/utils/mConst'
	import { getGlobalToken } from 'src/utils/mGlobal'
	import login from 'src/plugins/login'
	import register from '../member/register.vue'
	export default {
		data() {
			return {
				clubUrl: "",
				member_sn: ""
			}
		},

		created() {
			this.initUserInf();
		},
		components: {
			register
			
		},
		mounted() {
			let info = this.userInfo;
			if(this.iflogin == true&& info.mobile == ApiConst.ERROR_SUCCESS) {
				this.bankOneData();
			} else {
				login(this);
			}

		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			])
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),
			emitRegister(info) {
				this.bankOneData();
			},
			initUserInf() {
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();

				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;

					//TODO: 初始化页面中的用户数据
				}

			},
			async bankOneData() {
				let _self = this;
				let clubInfo = await memberCard();
				console.log(clubInfo);
				if(clubInfo.code == ApiConst.ERROR_SUCCESS) {
					//let data=bank_One.data.bankname;
					this.clubUrl = clubInfo.data.url;
					this.member_sn = clubInfo.data.member_sn;
				} else {
					MessageBox({
						message: clubInfo.message,
						showCancelButton: true
					});
				}

			}
		},
		watch: {
			iflogin(newV, old) {
				let info = this.userInfo;
				if(this.iflogin == true&& info.mobile == ApiConst.ERROR_SUCCESS) {
					this.bankOneData();
				} else {
					login(this);
				}
			}
		}

	}
</script>

<style>
	.clubCard-content {
		padding: 40px 15px;
		background: #FFFFFF;
	}
	
	.clubCard-item {
		border: 1px solid #D5D5D5;
		border-radius: 5px;
		margin-top: 10px;
	}
	
	.clubCard-item img {
		width: 100%;
	}
	
	.clubCard-content .handline {
		font-size: 18px;
		color: #dd3e3e;
	}
	
	.clubCard-ID {
		font-size: 15px;
		margin-top: 10px;
	}
	
	.clubCard-status {
		text-align: left;
		margin-top: 15px;
		color: #999999;
		font-size: 12px;
	}
</style>