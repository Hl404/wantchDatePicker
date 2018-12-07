<template>
	<div>
		<div class="emailCation-content">
			<div class="emailCation-content-header">
				邮箱绑定
			</div>
			<div class="emailCation-from">
				<div class="emailCation-from-item">
					<div class="szPassword-from-item">
						<a class="mint-cell mint-field">
							<div class="mint-cell-left"></div>
							<div class="mint-cell-wrapper">
								<div class="mint-cell-title">
									<span class="mint-cell-text">邮箱地址</span>
								</div>
								<div class="mint-cell-value">
									<input class="mint-field-core" @focus="emailShow = true" placeholder="请输入邮箱地址" type="email" v-model="emailCode">
									<div class="mint-field-clear" @click="emailCode = ''" v-show="emailShow && emailCode">
										<i class="mintui mintui-field-error"></i></div>
									<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
									<div class="mint-field-other"></div>
								</div>

							</div>
							<div class="mint-cell-right"></div>
						</a>

					</div>
					
				</div>
				<div class="emailCation-buttonCont">
					<mt-button @click="emailBtn" :disabled="!emailCode ">发送验证邮件</mt-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox, Indicator } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { setGlobalToken, getGlobalToken } from 'src/utils/mGlobal'
	import { formatDate } from 'src/utils/date'
	import { bindEmail } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	//console.log(getCoupon);
	export default {
		data() {
			return {
				emailCode: '',
				message: '',
				emailShow: false
			}
		},
		created() {
			this.initUserInf();
		},
		mounted() {
			console.log(this.iflogin)
			if(this.iflogin == true) {
				console.log("登录成功")
				//this.emailData ();
			} else {
				login(this);
				console.log("失败哎")
			}

		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),
			initUserInf() {
				//console.log(this);
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();

				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//TODO: 初始化页面中的用户数据
				}
			},
			async emailData() {
				let email = this.emailCode;
				let emailCount = await bindEmail(email);
				let emailCountDetail = emailCount.data;
				console.log(emailCount, "11111111111111");
				if(emailCount.code == ApiConst.ERROR_SUCCESS) {

					this.emailCountList = emailCountDetail;
					console.log(this.emailCountList);
					this.$router.push('/member/memberUpgrade');

					this.message = emailCount.message;
					MessageBox.alert(emailCount.message);
				} else {
					this.message = emailCount.message;
					MessageBox.alert(emailCount.message);
				}
			},
			emailBtn() {
				this.emailData();
				console.log(11)
			}

		}
	}
</script>

<style>
	@import "/static/css/page/emailCation.css";
</style>