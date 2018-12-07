<template>
	<div>
		<div class="szPassword-content">
			<div class="szPassword-content-header">
				设置支付密码
			</div>
			<div class="szPassword-from">
				<div class="szPassword-from-item borderTop">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">密码</span>
							</div>
							<div class="mint-cell-value">
								<input type="password"  @input="watchOne" @focus="oldShow = true" class="mint-field-core" placeholder="请输入密码" maxlength="6" v-model="set_password">
								<div class="mint-field-clear" @click="set_password = ''" v-show="oldShow && set_password">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>
				<div class="szPassword-from-item">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">确认密码</span>
							</div>
							<div class="mint-cell-value">
								<input class="mint-field-core"  @input="watchTwo" @focus="newShow = true" placeholder="再次输入密码" maxlength="6" type="password" v-model="ensure_password">
								<div class="mint-field-clear" @click="ensure_password = ''" v-show="newShow && ensure_password">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>

				<div class="szPassword-buttonCont">
					<mt-button class="mint-button mint-button--normal" :disabled="!set_password  || !ensure_password" @click="getPassword()">确定</mt-button>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { szPassword } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import { getGlobalToken } from 'src/utils/mGlobal'
	import { getTimeStamp, getNonceStr } from 'src/utils/mUtils'
	import login from 'src/plugins/login';
	import crypto from 'crypto';
	//console.log() 

	export default {
		data() {
			return {
				set_password: "",
				ensure_password: "",
				newShow: false,
				oldShow: false
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
			async passwordData() {

				let _self = this;
				let password = crypto.createHmac('md5', _self.set_password).digest('hex');
				let passwordAgain = crypto.createHmac('md5', _self.ensure_password).digest('hex');
				console.log(this.set_password, password, this.ensure_password, passwordAgain)
				let setting_password = await szPassword(password, passwordAgain);
				if(setting_password.code == ApiConst.ERROR_SUCCESS) {
					this.$router.push('/member/memberUpgrade');
				} else {
					this.$router.push('/setting/revisePassword');
				}
			},
			getPassword() {
				if(this.set_password.length==6||  this.ensure_password.length==6) {
					if(this.set_password === this.ensure_password) {
						console.log()
						this.passwordData();
					} else {
						MessageBox('', '密码必须一样');
					}
				}else{
					MessageBox.alert("请输入6位数字密码！");
				}
			},
			watchOne(){
				    this.set_password=this.set_password.replace(/[^\d]/g,'');
			},
			watchTwo(){
				    this.ensure_password=this.ensure_password.replace(/[^\d]/g,'');
			},

		},

	}
</script>

<style>
	.borderTop {
		border-top: 1px solid #CCCCCC;
	}
	
	.szPassword-content-header {
		padding: 18px 15px;
		font-size: 19px;
		color: #555555;
	}
	
	.szPassword-from-item .mint-cell-wrapper {
		background-image: none;
	}
	
	.szPassword-from a {
		text-decoration: none;
	}
	
	.szPassword-from .mint-cell-wrapper {
		padding-left: 0;
		font-size: 15px;
	}
	
	.szPassword-from .mint-cell-wrapper .mint-cell-title {
		text-align: left;
		padding-left: 15px;
	}
	
	.szPassword-from .mint-cell-wrapper .mint-cell-value {
		font-size: 13px;
		margin-top: 5px;
	}
	
	.szPassword-buttonCont {
		width: 100%;
		margin-top: 30px;
		padding: 0 15px;
	}
	
	.szPassword-buttonCont .mint-button--normal {
		width: 100%;
		background: #f19e38;
		color: #FFFFFF;
		line-height: 41px;
	}
</style>