<template>
	<div>
		<div class="register-content" >
			<div class="register-content-header">
				请输入支付密码，以验证身份
			</div>
			<div class="register-from">
				<div class="register-from-item borderTop">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">新密码</span>
							</div>
							<div class="mint-cell-value">
								<input class="mint-field-core" @input="watchOne" @focus="newShow = true" placeholder="输入支付密码" maxlength="6" type="password" v-model="yz_Passwoed" >
								<div class="mint-field-clear" @click="yz_Passwoed = ''" v-show="newShow && yz_Passwoed">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>
						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>
				<div class="register-buttonCont">
					<mt-button @click="yzBtn" :disabled="!yz_Passwoed">确定</mt-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex';
	import { ckeckPassword } from 'src/service/getData';
	import { ApiConst } from 'src/utils/mConst';
	import { getGlobalToken } from 'src/utils/mGlobal';
	import { getTimeStamp, getNonceStr } from 'src/utils/mUtils';
	import login from 'src/plugins/login';
	import crypto from 'crypto';
	export default {
		data() {
			return {
				yz_Passwoed: "",
				newShow: false
			}
		},
		created() {
			this.initUserInf();
		},
		mounted() {
			console.log(this.iflogin)
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
			async checkData() {
				let _self = this;
				let password = crypto.createHmac('md5', _self.yz_Passwoed).digest('hex');
				let checkPassword = await ckeckPassword(password);
				if(checkPassword.code == ApiConst.ERROR_SUCCESS) {

					this.$router.push('/member/bankCation');
				} else {
					MessageBox.alert(checkPassword.message);
				}
				console.log(checkPassword, "11111111111111");
			},
			yzBtn() {
				if(this.yz_Passwoed.length==6) {
					this.checkData();
				}else{
					MessageBox.alert("密码至少设置6个数字和最多6个数字");
				}
				

			},
			watchOne(){
				    this.yz_Passwoed=this.yz_Passwoed.replace(/[^\d]/g,'');
			},
		}
	}
</script>

<style>
	@import "/static/css/page/detectionPassword.css";
</style>