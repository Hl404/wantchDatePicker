<template>
	<div>
		<div class="cashier-Two">
			<div class="cashier-dz">
				<p>订单号：<span>{{goodsData.trade_sn}}</span></p>
				<p>流水号：<span>{{goodsData.serial_sn}}</span></p>
				<p>下单时间：<span>{{formatDate(goodsData.create_time)}}</span></p>
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
					<tr v-for="item in goodsData.shopInfo">
						<td>{{item.shopid}}</td>
						<td>{{item.shopname}}</td>
						<td>{{item.price}}</td>
						<td>{{item.cnt}}</td>
						<td>{{item.smallcnt}}</td>
					</tr>
				</table>
				<div class="shopBottom">
					<span class="shopBottom-num">商品数量:{{goodsData.total_cnt}}</span>
					<span class="shopBottom-tocont">商品总价:{{goodsData.total_money}}</span>
				</div>
			</div>
			<div class="cashier-bottom">
				<table>
					<tr>
						<td style="width: 50%;">会员ID:{{goodsData.member_id}}</td>
						<td style="width: 50%;">折扣金额：{{goodsData.discount_money}}</td>
					</tr>
					<tr>
						<td>本次积分:{{goodsData.curPoint}}</td>
						<td>应收金额：{{goodsData.receive_money}}</td>
					</tr>
					<tr>
						<td>总积分：{{goodsData.allPoint}}</td>
						<td>已收金额：{{goodsData.payed_money}}</td>
					</tr>
					<tr>
						<td>收款方式：{{goodsData.payment_type}}</td>
						<td>找零金额：{{goodsData.change_money}}</td>
					</tr>
				</table>
			</div>
			<div class="cashier-btn">
				<mt-button class="cashier-left" @click="exitBtn">确认退货</mt-button>
				
			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex';
	import { returnGoods } from 'src/service/getData';
	import { ApiConst } from 'src/utils/mConst';
	import { getGlobalToken } from 'src/utils/mGlobal';
	import { formatDate } from 'src/utils/date';
	import { getTimeStamp, getNonceStr } from 'src/utils/mUtils';
	export default {
		data() {
			return {
				goodsData: {
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
		created() {},
		mounted() {
			this.shopinfoData();
		},
		computed: {
			
		},
		methods: {
			formatDate(time) {
				var date = new Date(time * 1000);

				return formatDate(date, 'yyyy-MM-dd ');
			},

			shopinfoData() {
				//获取提交商品信息
				let goodData = this.$route.query.refundData;
				this.goodsData.trade_sn = goodData.trade_sn;
				this.goodsData.serial_sn = goodData.serial_sn;
				this.goodsData.create_time = goodData.create_time;
				this.goodsData.shopInfo = goodData.shopInfo;
				this.goodsData.total_cnt = goodData.total_cnt;
				this.goodsData.total_money = goodData.total_money;
				this.goodsData.member_id = goodData.member_id;
				this.goodsData.discount_money = goodData.discount_money;
				this.goodsData.curPoint = goodData.curPoint;
				this.goodsData.receive_money = goodData.receive_money;
				this.goodsData.allPoint = goodData.allPoint;
				this.goodsData.payed_money = goodData.payed_money;
				this.goodsData.payment_type = goodData.payment_type;
				this.goodsData.change_money = goodData.change_money;
				console.log(this.goodsData.shopInfo, "当前数组");
				console.log(goodData, "传过来了")
			},
			async exitData() {
				let tradesn=this.goodsData.trade_sn;
				let  exitInfo= await returnGoods(tradesn);
				if(exitInfo.code == ApiConst.ERROR_SUCCESS) {
					MessageBox({
						message: exitInfo.message,
						showCancelButton: true
					});
					this.$router.push('/member/center')
				} else {
					MessageBox({
						message: exitInfo.message,
						showCancelButton: true
					});
				}
				//console.log(confirmPay)
			},
			exitBtn() {
				this.exitData();
				console.log("确认成功")
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