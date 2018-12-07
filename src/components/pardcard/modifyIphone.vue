<template>
	<div>

		<div class="register-content">
			<div class="register-content-header">
				更换手机号
			</div>
			<div class="register-from">
				<div class="register-from-item">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">
										手机号码
									</span>
							</div>
							<div class="mint-cell-value">
								<input type="number" @focus="numberShow = true" class="mint-field-core" placeholder="请输入手机号码" v-model="bindIphone">
								<div class="mint-field-clear" @click="bindIphone = ''" v-show="numberShow && bindIphone">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>
				<div class="register-from-item borderTop">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">验证码</span>
							</div>
							<div class="mint-cell-value">
								<input type="number" @focus="authShow = true" class="mint-field-core" placeholder="请输入验证码" v-model="authCode">
								<div class="mint-field-clear" @click="authCode = ''" v-show="authShow && authCode" style="margin-right: 110px;">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right">

						</div>
						<mt-button :disabled="!bindIphone" class="yzm" v-show="show" @click="getCode">获取验证码</mt-button>
						<mt-button class="yzm" v-show="!show">{{count}}s后重试</mt-button>
						<!--<span  @click="getCode">获取验证码</span>
<span v-show="!show" class="count">{{count}} s</span>-->
						<!--<span v-show="!codeshow" class="yzm">{{count}} 秒</span>-->
					</a>

				</div>

				<div class="register-buttonCont">
					<mt-button @click="mobileBtn" :disabled="!bindIphone  || !authCode">确认</mt-button>
					<!--<p class="status">登录即为同意<span>《万天互娱用户协议》</span></p>-->
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { mobileCode, restMobile } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import { getGlobalToken } from 'src/utils/mGlobal'
	import { getTimeStamp, getNonceStr, getStore } from 'src/utils/mUtils'
	import login from 'src/plugins/login'
	export default {
		data() {
			return {
				bindIphone: '',
				authCode: '',
				numberShow: false,
				authShow: false,
				disabled: false,
				show: true,
				count: '',
				timer: null,

			}
		},
		created() {
			this.initUserInf();
			//判断手机号授权
			let info = this.userInfo;
			//this.maskContent = info.mobile==0 ? true : false;
		},
		mounted() {
			//this.reditPath = this.$route.query.path;

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
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();
				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//TODO: 初始化页面中的用户数据
				}
			},
			async mobileCodeData() {
				let mobile = this.bindIphone;
				let mobileYzm = await mobileCode(mobile);
				if(mobileYzm.code == ApiConst.ERROR_SUCCESS) {
					Toast("获取验证码成功");

				} else {
					Toast(mobileYzm.message);
				}
				//console.log(mobileYzm, "11111111111111");
			},
			async authcodeData() {
				let mobile = this.bindIphone;
				let code = this.authCode;
				let authCont = await restMobile(mobile, code);
				if(authCont.code == ApiConst.ERROR_SUCCESS) {
					let authContData = authCont.data;
					let info = this.userInfo;
					console.log(this.userInfo, "当前的用户信息+++++++++++++++++")
					info.uid = authContData.uid;
					info.token = authContData.token;
					this.RECORD_USERINFO(info);

					Toast("更换成功");
					//this.$emit('emitRegister', authContData)
					this.$router.push("/pardcard/membercard");

				} else {
					//this.maskContent=true;
					Toast(authCont.data);

				}
				console.log(authCont, "11111111111111");
			},

			getCode() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(!reg.test(this.bindIphone)) {
					Toast("手机格式不正确");
				} else {
					this.mobileCodeData();
					const TIME_COUNT = 60;
					if(!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
							if(this.count > 0 && this.count <= TIME_COUNT) {
								this.count--;
							} else {
								this.show = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
					//this.timer();
				};

			},

			mobileBtn() {
				this.authcodeData();
			}
		}
	}
</script>

<style>
	@import "../../assets/css/pardcard/registerIphone.css";
</style>