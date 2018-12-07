<template>
	<div>
		<div class="certif-content">
			<div class="certif-content-header">
				实名认证
			</div>
			<div class="certif-from">
				<div class="register-from-item borderTop">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">用户名</span>
							</div>
							<div class="mint-cell-value">
								<input class="mint-field-core" @focus="userShow = true" placeholder="输入用户名"  type="text" v-model="username">
								<div class="mint-field-clear" @click="username = ''" v-show="userShow && username">
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
								<span class="mint-cell-text">身份证号码</span>
							</div>
							<div class="mint-cell-value">
								<input class="mint-field-core"    @input="onCard"　 @focus="sfShow = true" placeholder="输入身份证号码" 　 type="text"   v-model="nameCard"  pattern="[0-9]*">
								<div class="mint-field-clear" @click="nameCard = ''" v-show="sfShow && nameCard">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>
						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>
				<!--<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
				<mt-field label="身份证号码" placeholder="请输入身份证号码" v-model="nameCard"></mt-field>-->
				<div class="certif-buttonCont">
					<!--<span class="realNameBtn" @click="realNameBtn" >认证</span>-->
					<div class="register-buttonCont">
						<mt-button class="realNameBtn" @click="realNameBtn" :disabled="!username||!nameCard">认证</mt-button>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { realnameBd } from 'src/service/getData'
	import { doAuthRedirect } from 'src/service/redirect'
	import { ApiConst } from 'src/utils/mConst'
	import { getGlobalToken } from 'src/utils/mGlobal'
	export default {
		data() {
			return {
				username: "",
				nameCard: "",
				userShow:false,
				sfShow:false
				
			}
		},

		created() {
			this.initUserInf();
		},
		mounted() {},
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
			onCard(){
				    this.nameCard=this.nameCard.replace(/[\W]/g,'');
			},
			async nameData() {

				let realName = encodeURIComponent(this.username);
				let idCardNumber = this.nameCard;
				let realnaJson = await realnameBd(realName, idCardNumber);
				console.log(realnaJson);
				if(realnaJson.code == ApiConst.ERROR_SUCCESS) {
					MessageBox.alert(realnaJson.message);
					var sm_data = realnaJson.data;
					var info = this.userInfo;
					console.log(info);
					info.lvId = sm_data.lvId;
					info.lvName = sm_data.lvName;
					info.point = sm_data.point;
					info.mp = sm_data.mp;
					info.nextLvPoint = sm_data.nextLvPoint;
					info.idcard=1;
					this.RECORD_USERINFO(info);
						this.$router.push('/member/memberUpgrade');
					
					
				} else {
					MessageBox.alert(realnaJson.message,'');
				}

			},
			
			realNameBtn() {
				
				
				this.nameData();
				console.log(11)
			}

		}

	}
</script>

<style>
	.certif-content-header {
		padding: 18px 15px;
		font-size: 19px;
		color: #555555;
	}
	
	.certif-from .mint-cell-wrapper{
		background: none;
	}
	.certif-from a {
		text-decoration: none;
	}
	.borderTop{
		border-top: 1px solid #CCCCCC;
	}
	.certif-from .mint-cell-wrapper {
		padding-left: 0;
		font-size: 15px;
	}
	
	.certif-from .mint-cell-wrapper .mint-cell-title {
		text-align: left;
		padding-left: 15px;
	}
	
	.certif-from .mint-cell-wrapper .mint-cell-value {
		font-size: 13px;
		margin-top: 5px;
	}
	
	.certif-buttonCont {
		width: 100%;
		margin-top: 30px;
		padding: 0 15px;
	}
	
	.realNameBtn {
		display: block;
		width: 100%;
		background: #f19e38;
		color: #FFFFFF;
		border-radius: 4px;
		border: 0;
		box-sizing: border-box;
		font-size: 18px;
		height: 41px;
		line-height: 41px;
		outline: 0;
		overflow: hidden;
		text-align: center;
	}
</style>