<template>
	<div>
		<div class="register-box" v-show="maskContent">

			<div class="register-content">
				<div class="register-content-header">
					手机号验证
				</div>
				<div class="register-from">
					<div class="register-from-item borderTop">
						<a class="mint-cell mint-field">
							<div class="mint-cell-left"></div>
							<div class="mint-cell-wrapper">
								<div class="mint-cell-title">
									<span class="mint-cell-text">
										<img src="/static/img/ragiter_name.png"/>
									</span>
								</div>
								<div class="mint-cell-value">
									<input type="number" @focus="numberShow = true" class="mint-field-core" placeholder="请输入手机号码" v-model="bindIphone" >
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
					<div class="register-from-item ">
						<a class="mint-cell mint-field">
							<div class="mint-cell-left"></div>
							<div class="mint-cell-wrapper">
								<div class="mint-cell-title">
									<span class="mint-cell-text"><img src="/static/img/register_yzm.png"/></span>
								</div>
								<div class="mint-cell-value">
									<input type="number" @focus="authShow = true" class="mint-field-core" placeholder="验证码" v-model="authCode">
									<div class="mint-field-clear" @click="authCode = ''" v-show="authShow && authCode" style="margin-right: 120px;">
										<i class="mintui mintui-field-error"></i></div>
									<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
									<div class="mint-field-other"></div>
								</div>

							</div>
							<div class="mint-cell-right">

							</div>
							<button :disabled="disabled" class="yzm" @click="getCode">{{btntxt}}</button>
							<!--<span v-show="!codeshow" class="yzm">{{count}} 秒</span>-->
						</a>

					</div>

					<div class="register-buttonCont">
						<mt-button @click="mobileBtn" :disabled="!bindIphone  || !authCode">确认授权</mt-button>
						<!--<p class="status">登录即为同意<span>《万天互娱用户协议》</span></p>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { mobileCode, authCode } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import { getGlobalToken } from 'src/utils/mGlobal'
	import { getTimeStamp, getNonceStr ,getStore} from 'src/utils/mUtils'
	import login from 'src/plugins/login'
	export default {
		data() {
			return {
				disabled: false,
				time: 0,
				btntxt: "获取验证码",
				bindIphone: '',
				authCode: '',
				numberShow: false,
				authShow: false,
				maskContent:true
			}
		},
		created() {
			this.initUserInf();
			//判断手机号授权
			let info=this.userInfo;
			//this.maskContent = info.mobile==0 ? true : false;
		},
		mounted() {
			this.reditPath = this.$route.query.path;
			
			if(this.iflogin == true) {
				console.log("成功")
				//this.discountData();
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
				let type = this.$route.meta.status;
				let token = getGlobalToken();
				let timestamp = getTimeStamp()
				let nonce = getNonceStr()
				let mobileYzm = await mobileCode(getGlobalToken(), type, mobile, timestamp, nonce);
				if(mobileYzm.code == ApiConst.ERROR_SUCCESS) {
					MessageBox.alert(mobileYzm.message);
					
				} else {
					MessageBox.alert(mobileYzm.message);
				}
				//console.log(mobileYzm, "11111111111111");
			},
			async authcodeData() {
				let mobile = this.bindIphone;
				let code = this.authCode;
				let authCont = await authCode(mobile, code);
				if(authCont.code == ApiConst.ERROR_SUCCESS) {
					let authContData = authCont.data;
					let info = this.userInfo;
					info.lvId = authContData.lvId;
					info.lvName = authContData.lvName;
					info.point = authContData.point;
					info.mp = authContData.mp;
					info.nextLvPoint = authContData.nextLvPoint;
					info.mobile = 1;
					this.RECORD_USERINFO(info);
					this.maskContent=false;
					
					this.$emit('emitRegister', authContData)
					//this.$router.push(this.reditPath);
				} else {
					this.maskContent=true;
					MessageBox.alert(authCont.message);
					
				}
				console.log(authCont, "11111111111111");
			},

			getCode() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(this.bindIphone == '') {
					MessageBox.alert("请输入手机号码");
				} else if(!reg.test(this.bindIphone)) {
					MessageBox.alert("手机格式不正确");
				} else {
					this.time = 60;
					this.disabled = true;
					this.timer();

				}
				
				this.mobileCodeData();
				//this.timer();
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s后重新获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
				}
			},
		
			mobileBtn() {
				this.authcodeData();
			}
		}
	}
</script>

<style>
	@import "/static/css/page/register.css";
</style>