<template>
	<div>
		<div class="cashier-buttonCont">
			<mt-field placeholder="请输入订单号" class="orderNum" type="number" v-model="orderNumber" ></mt-field>
			<div class="btnTop">
				<mt-button class="cashier—sc" @click="referBtn">查看订单信息</mt-button>
			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex';
	import { referOrder } from 'src/service/getData';
	import { ApiConst } from 'src/utils/mConst';
	import { getGlobalToken } from 'src/utils/mGlobal';
	import { getTimeStamp, getNonceStr } from 'src/utils/mUtils';
	export default {
		data() {
			return {
				orderNumber: ""
			}
		},
		created() {
			//this.initUserInf();
		},
		mounted() {
			
		},
		computed: {
			
		},
		methods: {
		
			async orderInfoData() {
				
				let tradesn=this.orderNumber;
				let refer_orderInfo = await referOrder(tradesn);
				if(refer_orderInfo.code == ApiConst.ERROR_SUCCESS) {
					let refundData=refer_orderInfo.data;
					console.log("成功了")
					this.$router.push({path:'/order/cashierFour', query: { refundData: refundData}});
				} else {
					MessageBox({
						message: refer_orderInfo.message,
						showCancelButton: true
					});
				}
				
			},
			referBtn() {
				console.log(11)
				this.orderInfoData();

			}
		}
	}
</script>

<style>
	.orderNum .mint-field-core{
		padding-left: 20px;
	}
	.cashier-buttonCont {
		padding: 100px 15px;
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