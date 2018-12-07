<template>
	<div>
		<div class="revamp-content">
			<div class="revamp-content-header">
				修改支付密码
			</div>
			<div class="revamp-from">

				<div class="revamp-from-item borderTop">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">密码</span>
							</div>
							<div class="mint-cell-value">
								<input type="password" @input="watchOne" class="mint-field-core" @focus="oldShow = true" placeholder="请输入旧密码" maxlength="6" v-model="oldPassword" @blur="getInput">

								<div class="mint-field-clear" @click="oldPassword = ''" v-show="oldShow && oldPassword">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>
				<div class="revamp-from-item">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">新密码</span>
							</div>
							<div class="mint-cell-value">
								<input class="mint-field-core" @input="watchTwo" @focus="newShow = true" placeholder="输入新密码" maxlength="6" type="password" v-model="newPassword" @blur="getInput('new')">

								<div class="mint-field-clear" @click="newPassword = ''" v-show="newShow && newPassword">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>
						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>
				<div class="revamp-buttonCont">
					<mt-button @click="getxgBtn()" :disabled="!oldPassword || !newPassword ">确定</mt-button>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import { Indicator, MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { xgPassword } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import crypto from 'crypto';
	export default {
		data() {
			return {
				oldPassword: "",
				newPassword: "",
				oldShow: false,
				newShow: false
			}
		},
		created() {
			//this.initUserInf();			
		},
		mounted() {

		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
		},
		methods: {
			async memberUpgrade() {
				let _self = this;
				let oldPassword = crypto.createHmac('md5', _self.oldPassword).digest('hex');
				let newPassword = crypto.createHmac('md5', _self.newPassword).digest('hex');
				let xg_mobile = await xgPassword(oldPassword, newPassword);
				if(xg_mobile.code == ApiConst.ERROR_SUCCESS) {
					this.$router.push('/member/center');
					
					MessageBox.alert(xg_mobile.message);
				} else {
					MessageBox.alert(xg_mobile.message);
				}

			},

			getxgBtn() {
				if(this.oldPassword === this.newPassword) {
					MessageBox.alert('新密码不能和旧密码一样');
					return
				}
				this.memberUpgrade();

			},
			focus() {
				this.newShow = true

			},
			getInput(e) {
				if(e == "new") {
					if(this.newPassword.length <= 6) {
						//MessageBox( "",'密码至少输入6个数字');
					} else {
						//MessageBox( "",'密码至少输入6个数字');
					}
				} else {
					if(this.oldPassword.length <= 6) {
						//MessageBox( "",'密码至少输入6个数字');
					} else {
						//MessageBox( "",'密码至少输入6个数字');
					}
				}

				if(this.oldPassword === this.newPassword) {
					//MessageBox( "",'新密码不能和旧密码一样');
				}

			},
			watchOne(){
				    this.oldPassword=this.oldPassword.replace(/[^\d]/g,'');
			},
			watchTwo(){
				    this.ensure_password=this.newPassword.replace(/[^\d]/g,'');
			},

		}
	}
</script>

<style>
	.revamp-content-header {
		padding: 18px 15px;
		font-size: 19px;
		color: #555555;
	}
	
	.revamp-from a {
		text-decoration: none;
	}
	
	.revamp-from .mint-cell-wrapper {
		padding-left: 0;
		font-size: 15px;
	}
	
	.revamp-from .mint-cell-wrapper .mint-cell-title {
		text-align: left;
		padding-left: 15px;
	}
	
	.revamp-from .mint-cell-wrapper .mint-cell-value {
		font-size: 13px;
		margin-top: 5px;
	}
	
	.revamp-buttonCont {
		width: 100%;
		margin-top: 30px;
		padding: 0 15px;
	}
	
	.revamp-buttonCont .mint-button--normal {
		width: 100%;
		background: #f19e38;
		color: #FFFFFF;
	}
	
	.revamp-from-item .mint-cell-wrapper {
		background-image: none;
	}
	
	.borderTop {
		border-top: 1px solid #CCCCCC;
	}
</style>