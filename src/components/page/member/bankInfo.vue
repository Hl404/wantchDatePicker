<template>
	<div>
		<div class="bankInfo-content">
			<div class="bankInfo-content-header">
				请选择银行卡类型
			</div>
			<div class="bankInfo-from">
				<div class="bankInfo-from-item">
					<mt-field label="卡类型" type="text" v-model="bankname" disabled="disabled"></mt-field>
				</div>
				
				<div class="bankInfo-from-item1 borderTops">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">手机号</span>
							</div>
							<div class="mint-cell-value">
								<input type="number" @focus="sjShow = true" class="mint-field-core" placeholder="请输入手机号码" v-model="userMobile">
								<div class="mint-field-clear" @click="userMobile = ''" v-show="sjShow && userMobile" >
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right">

						</div>
						
					</a>

				</div>
				<div class="bankInfo-from-item1  ">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">验证码</span>
							</div>
							<div class="mint-cell-value">
								<input type="number" @focus="authShow = true" class="mint-field-core" placeholder="验证码" v-model="smsCode">
								<div class="mint-field-clear" @click="smsCode = ''" v-show="authShow && smsCode" style="margin-right: 120px;">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right">

						</div>
							<button  :disabled="disabled" class="yzm" @click="getCode">{{btntxt}}</button>
					</a>

				</div>
				<!--<mt-field label="手机号" placeholder="请输入银行预留手机号" type="Number" v-model="userMobile">
				</mt-field>
				<mt-field label="手机验证码" placeholder="请输入验证码" type="Number" v-model="smsCode">
					<span v-show="codeshow" class="yzm" @click="getCode">获取验证码</span>
					<span v-show="!codeshow" class="yzm">{{count}} 秒</span>
				</mt-field>-->
				<div class="bankInfo-buttonCont">
					<mt-button @click="bankThreeBtn" :disabled="!userMobile  || !smsCode">下一步</mt-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { isbankTwo, isbankThree } from 'src/service/getData'
	import { doAuthRedirect } from 'src/service/redirect'
	import { ApiConst } from 'src/utils/mConst'
	import { getGlobalToken } from 'src/utils/mGlobal'
	import { getTimeStamp, getNonceStr } from 'src/utils/mUtils'
	export default {
		data() {
			return {
				bankname: "",
				userMobile: "",
				smsCode: "",
				disabled:false,
				time:0,
				btntxt:"获取验证码",
				authShow:false,
				sjShow:false
			}
		},

		created() {
			this.initUserInf();			
		},
		mounted() {

			this.bankname = decodeURI(this.$route.query.bankname);
			console.log(this.$route.query.bankname)
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
			async bankTwoData() {
				let _self = this;
				let mobile = _self.userMobile;
				let type = _self.$route.meta.status;
				let token = getGlobalToken();
				let timestamp = getTimeStamp();
				let nonce = getNonceStr();
				//let mobileYzm = await mobileCode(getGlobalToken(), type, mobile, timestamp, nonce);
				//let userMobile = _self.userMobile;
				//token,mobile,timestamp,nonce
				let bank_Two = await isbankTwo(getGlobalToken(), type, mobile, timestamp, nonce);
				console.log(bank_Two);
				if(bank_Two.code == ApiConst.ERROR_SUCCESS) {
					console.log("成功")
					MessageBox.alert(bank_Two.message);
				} else {
					MessageBox.alert(bank_Two.message);
					
				}

			},
			async bankThreeData() {
				let _self = this;
				let smsCode = _self.smsCode;
				let mobile = _self.userMobile;
				let bank_Three = await isbankThree(smsCode);
				console.log(bank_Three);
				if(bank_Three.code == ApiConst.ERROR_SUCCESS) {
					var bank_data = bank_Three.data;
					//console.log(bank_data,"怎么不对")
					var bank_info = _self.userInfo;
					//console.log(bank_info,_self.userInfo,"获取的什么")
					//console.log(info);
					bank_info.lvId = bank_data.lvId;
					bank_info.lvName = bank_data.lvName;
					bank_info.point = bank_data.point;
					bank_info.mp = bank_data.mp;
					bank_info.nextLvPoint = bank_data.nextLvPoint;
					bank_info.bankcard=1;
					MessageBox.alert(bank_Three.message);
					this.RECORD_USERINFO(bank_info);
					_self.$router.push('/member/memberUpgrade');
				}else{
					MessageBox.alert(bank_Three.message);
				}

			},
			getCode() {
				 var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if(this.userMobile==''){
                  MessageBox.alert("请输入手机号码");
                }else if(!reg.test(this.userMobile)){
                    MessageBox.alert("手机格式不正确");
                }else{
                    this.time=60;
                    this.disabled=true;
                    this.timer();
                    console.log("倒计时")
                   
               }
                this.bankTwoData();
			},
			timer(){
				if (this.time > 0) {
                     this.time--;
                     this.btntxt=this.time+"s后重新获取";
                     setTimeout(this.timer, 1000);
                } else{
                     this.time=0;
                     this.btntxt="获取验证码";
                     this.disabled=false;
                }
0			},
			bankThreeBtn() {
				this.bankThreeData();
			}

		}

	}
</script>

<style>
	.bankInfo-content-header {
		padding: 18px 15px;
		font-size: 19px;
		color: #555555;
	}
	
	.bankInfo-from a {
		text-decoration: none;
	}
	
	.bankInfo-from .mint-cell-wrapper {
		padding-left: 0;
		font-size: 15px;
	}
	
	.bankInfo-from .mint-cell-wrapper .mint-cell-title {
		text-align: left;
		padding-left: 15px;
	}
	
	.bankInfo-from .mint-cell-wrapper .mint-cell-value {
		font-size: 13px;
		margin-top: 5px;
	}
	
	.bankInfo-from .mint-cell-wrapper .mint-cell-value .mint-field-core {
		background: #FFFFFF;
	}
	
	.bankInfo-buttonCont {
		width: 100%;
		margin-top: 30px;
		padding: 0 15px;
	}
	
	.bankInfo-from-item {
		margin-bottom: 10px;
	}
	
	.bankInfo-buttonCont .mint-button--normal {
		width: 100%;
		background: #f19e38;
		color: #FFFFFF;
	}
	
	.bankInfo-from .yzm {
		display: block;
		border: none;
		width: 100px;
		height: 35px;
		line-height: 35px;
		background: #f19e38;
		color: #FFFFFF;
		border-radius: 3px;
		position: absolute;
		right: 10px;
		top: 6px;
		font-size: 14px;
	}
	.bankInfo-from-item1 .mint-cell-wrapper{
		background-image: none;
	}
	.borderTop{
		border-top: 1px solid #CCCCCC;
	}
</style>