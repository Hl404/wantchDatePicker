<template>
	<div>
		<div class="bankCation-content">
			<div class="bankCation-content-header">
				请绑定持卡人本人的银行卡
			</div>
			<div class="bankCation-from">
				<div class="bankCation-from-item borderTop">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">持卡人</span>
							</div>
							<div class="mint-cell-value">
								<input type="text" @focus="nameShow = true" class="mint-field-core" placeholder="请输入用户名" v-model="username">
								<div class="mint-field-clear" @click="username = ''" v-show="nameShow && username">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>
				<div class="bankCation-from-item ">
					<a class="mint-cell mint-field">
						<div class="mint-cell-left"></div>
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<span class="mint-cell-text">银行卡号</span>
							</div>
							<div class="mint-cell-value">
								<input type="number" @focus="bankShow = true" class="mint-field-core" placeholder="请输入银行卡号" v-model="bankCardNumber">
								<div class="mint-field-clear" @click="bankCardNumber = ''" v-show="bankShow && bankCardNumber">
									<i class="mintui mintui-field-error"></i></div>
								<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
								<div class="mint-field-other"></div>
							</div>

						</div>
						<div class="mint-cell-right"></div>
					</a>

				</div>
				
				<div class="bankCation-buttonCont">
					<mt-button class="mint-button mint-button--normal" @click="bankOneBtn" :disabled="!username  || !bankCardNumber">下一步</mt-button>
					<!--<router-link to="/member/bankInfo" class="mint-button mint-button--normal">下一步</router-link>-->
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { isbankOne } from 'src/service/getData'
	import { doAuthRedirect } from 'src/service/redirect'
	import { ApiConst } from 'src/utils/mConst'
	import { getGlobalToken } from 'src/utils/mGlobal'
	export default {
		data() {
			return {
				username: "",
				bankCardNumber: "",
				bankShow:false,
				nameShow:false
			}
		},

		created() {
			//console.log($router.params.id)
		},
		mounted() {
			//this.bankOneData()
			//this.sn = this.$router.params.sn;
		},
		methods: {
			async bankOneData() {
				let _self = this;
				let username = encodeURIComponent(_self.username);
				let bankCardNumber = _self.bankCardNumber;
				let bank_One = await isbankOne(username,bankCardNumber);
				console.log(bank_One);
				if(bank_One.code == ApiConst.ERROR_SUCCESS) {
					let data=bank_One.data.bankname;
					///this.$router.push('/member/bankInfo');
					_self.$router.push({path:'/member/bankInfo', query: { bankname: data}});
				}else{
					MessageBox.alert(bank_One.message);
				}
				/*console.log(this.$route.query.conponObj);
				console.log(this.$route.query.sn)*/

			},
			bankOneBtn(){
				this.bankOneData();
			}
			

		}

	}
</script>

<style>
	.bankCation-content-header {
		padding: 18px 15px;
		font-size: 19px;
		color: #555555;
	}
	
	.bankCation-from a {
		text-decoration: none;
	}
	
	.bankCation-from .mint-cell-wrapper {
		padding-left: 0;
		font-size: 15px;
	}
	
	.bankCation-from-item .mint-cell-wrapper{
		background-image: none;
	}
	
	.bankCation-from .mint-cell-wrapper .mint-cell-title {
		text-align: left;
		padding-left: 15px;
	}
	
	.bankCation-from .mint-cell-wrapper .mint-cell-value {
		font-size: 13px;
		margin-top: 5px;
	}
	
	.bankCation-buttonCont {
		width: 100%;
		margin-top: 30px;
		padding: 0 15px;
	}
	
	.bankCation-buttonCont .mint-button--normal {
		width: 100%;
		background: #f19e38;
		color: #FFFFFF;
		line-height: 41px;
	}
	
	.borderTop{
		border-top: 1px solid #CCCCCC;
	}
</style>