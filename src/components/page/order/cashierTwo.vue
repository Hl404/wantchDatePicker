<template>
	<div>
		<div class="cashier-Two">
			<div class="cashier-dz">
				<p>订单号：<span>{{otderData.trade_sn}}</span></p>
				<p>流水号：<span>{{otderData.serial_sn}}</span></p>
				<p>下单时间：<span>{{formatDate(otderData.create_time)}}</span></p>
			</div>
			<div class="cashier-table">
				<table>
					<tr>
						<td style="width: 25%;">商品ID</td>
						<td style="width: 25%;">商品名称</td>
						<td style="width: 10%;">单价</td>
						<td style="width: 10%;">数量</td>
						<td style="width: 10%;">小计</td>
					</tr>
					<tr v-for="item in otderData.shopInfo">
						<td>{{item.shopid}}</td>
						<td>{{item.shopname}}</td>
						<td>{{item.price}}</td>
						<td>{{item.cnt}}</td>
						<td>{{item.smallcnt}}</td>
					</tr>
				</table>
				<div class="shopBottom">
					<span class="shopBottom-num">商品数量:{{otderData.total_cnt}}</span>
					<span class="shopBottom-tocont">商品总价:{{otderData.total_money}}</span>
				</div>
			</div>
			<div class="cashier-bottom">
				<table>
					<tr>
						<td style="width: 50%;">会员ID:{{otderData.member_id}}</td>
						<td style="width: 50%;">折扣金额：{{otderData.discount_money}}</td>
					</tr>
					<tr>
						<td>本次积分:{{otderData.curPoint}}</td>
						<td>应收金额：{{otderData.receive_money}}</td>
					</tr>
					<tr>
						<td>总积分：{{otderData.allPoint}}</td>
						<td>已收金额：{{otderData.payed_money}}</td>
					</tr>
					<tr>
						<td>收款方式：{{otderData.payment_type}}</td>
						<td>找零金额：{{otderData.change_money}}</td>
					</tr>
				</table>
			</div>
			<div class="cashier-btn">
				<mt-button class="cashier-left" @click="getMoney">确认收钱</mt-button>
				<mt-button class="cashier-right" @click="closeMoney">放弃支付</mt-button>
			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex';
	import { getconfirm } from 'src/service/getData';
	import { ApiConst } from 'src/utils/mConst';
	import { getGlobalToken } from 'src/utils/mGlobal';
	import { formatDate } from 'src/utils/date';
	import { getTimeStamp, getNonceStr } from 'src/utils/mUtils';
	import login from 'src/plugins/login';
	export default {
		data() {
			return {
				otderData: {
					trade_sn: "",
					serial_sn: "",
					create_time: "",
					shopInfo: [],
					total_cnt: "",
					total_money: "",
					member_id: "",
					discount_money: "",
					curPoint: "",
					receive_money: "",
					allPoint: "",
					payed_money: "",
					payment_type: "",
					change_money: ""
				}
			}

		},

		created() {
			this.initUserInf();
		},
		mounted() {
			console.log(this.iflogin)
			if(this.iflogin == true) {
				console.log("成功")
				this.shopinfoData();
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

			formatDate(time) {
				var date = new Date(time * 1000);

				return formatDate(date, 'yyyy-MM-dd ');
			},

			shopinfoData() {
				//获取提交商品信息
				let goodData = this.$route.query.orderData;
				this.otderData.trade_sn = goodData.trade_sn;
				this.otderData.serial_sn = goodData.serial_sn;
				this.otderData.create_time = goodData.create_time;
				this.otderData.shopInfo = goodData.shopInfo;
				this.otderData.total_cnt = goodData.total_cnt;
				this.otderData.total_money = goodData.total_money;
				this.otderData.member_id = goodData.member_id;
				this.otderData.discount_money = goodData.discount_money;
				this.otderData.curPoint = goodData.curPoint;
				this.otderData.receive_money = goodData.receive_money;
				this.otderData.allPoint = goodData.allPoint;
				this.otderData.payed_money = goodData.payed_money;
				this.otderData.payment_type = goodData.payment_type;
				this.otderData.change_money = goodData.change_money;
				console.log(this.otderData.shopInfo, "当前数组");
				console.log(goodData, "传过来了")
			},
			async confirmData() {
				let confirmJson = this.$route.query.orderData;
				let confirmPay = await getconfirm(confirmJson);
				if(confirmPay.code == ApiConst.ERROR_SUCCESS) {
					MessageBox({
						message:confirmPay.message ,
						showCancelButton: true
					});
					this.$router.push('/order/cashierOne')
				}else{
					MessageBox({
						message:confirmPay.message ,
						showCancelButton: true
					});
				}
				console.log(confirmPay)
			},
			getMoney() {
				this.confirmData();
				console.log("确认成功")
			},
			closeMoney(){
				this.$router.push('/order/cashierOne');
			}

		}
	}
</script>

<style>
	.cashier-Two {
		background: #FFFFFF;
		padding: 0 15px;
	}
	
	.cashier-dz {
		padding: 15px 0;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.cashier-dz p {
		text-align: left;
		font-size: 13px;
		color: #555555;
	}
	
	.cashier-table {
		padding: 15px 0;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.cashier-table table {
		width: 100%;
		color: #555555;
		font-size: 12px;
	}
	
	.cashier-table table tr td {
		text-align: left;
		padding: 3px;
	}
	
	.cashier-bottom {
		padding: 15px 0;
	}
	
	.cashier-bottom table {
		width: 100%;
	}
	
	.cashier-bottom table tr td {
		text-align: left;
		font-size: 13px;
	}
	
	.cashier-btn {
		margin-top: 20px;
		padding-bottom: 30px;
	}
	
	.cashier-btn .cashier-left {
		width: 40%;
		background: #f19e38;
		color: #FFFFFF;
		font-size: 16px;
		margin-right: 20px;
		height: 40px;
		line-height: 40px;
	}
	
	.cashier-btn .cashier-right {
		width: 40%;
		background: #CCCCCC;
		color: #FFFFFF;
		font-size: 16px;
		height: 40px;
		line-height: 40px;
	}
	
	.shopBottom {
		margin-top: 15px;
		text-align: right;
	}
	
	.shopBottom .shopBottom-num,
	.shopBottom .shopBottom-tocont {
		display: inline-block;
		text-align: left;
		font-size: 14px;
		margin-left: 10px;
	}
	
	.cashier-bottom table {
		width: 100%;
		color: #555555;
		font-size: 12px;
	}
	
	.cashier-bottom table tr td {
		padding: 3px 0;
	}
</style>