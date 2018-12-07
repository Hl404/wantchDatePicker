<template>
	<div>
		<div class="cashier-buttonCont">
			<mt-field placeholder="请输入手机号码"  type="number" class="orderNum" v-model="shopData.orderNum"></mt-field>
			<div class="btnTop">
				<mt-button class="cashier—sc" @click="getshopCode">生成订单</mt-button>
			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex';
	import { getSpinfo, getSubtest } from 'src/service/getData';
	import { ApiConst } from 'src/utils/mConst';
	import { getGlobalToken } from 'src/utils/mGlobal';
	import { getTimeStamp, getNonceStr } from 'src/utils/mUtils';
	//import login from 'src/plugins/login'
	export default {
		data() {
			return {
				shopData: {
					orderNum: ""
				}
			}
		},
		created() {
			this.initUserInf();
		},
		mounted() {
			
			this.getSpData();
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
			async getSpData() {
				let spInfo = await getSpinfo();
				if(spInfo.code == ApiConst.ERROR_SUCCESS) {
					//this.shopData=spInfo.data;
					this.shopData=spInfo.data;
					//this.shopData.orderNum
				} else {
					MessageBox({
						message: spInfo.message,
						showCancelButton: true
					});

				}
				console.log(spInfo, '++++')
			},
			async getshopData() {
			
				let shopOrder =this.shopData; 
				  shopOrder.mobile=this.shopData.orderNum;
				  let testvalue = Object.assign({},shopOrder)
				
				let getShop = await getSubtest(testvalue);
				if(getShop.code == ApiConst.ERROR_SUCCESS) {
					let  scorderData=getShop.data;
					this.$router.push({path:'/order/cashierTwo', query: { orderData: scorderData}});
				}
			},
			getshopCode() {
				console.log(12);
				this.getshopData();
			}

		}
	}
</script>

<style>
	.cashier-buttonCont {
		padding: 100px 15px;
	}
	.orderNum .mint-field-core{
		padding-left: 20px;
	}
	.btnTop {
		margin-top: 30px;
	}
	
	.mint-button--normal {
		width: 100%;
		background: #f19e38;
		color: #FFFFFF;
	}
</style>