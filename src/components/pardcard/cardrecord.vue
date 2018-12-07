<template>
	<div class="cardContent">

		<table class="table">
			<thead>
				<tr>
					<th>消费套餐</th>
					<th>消费时间</th>
					<th>消费编号</th>
					<th>次数、金额</th>

				</tr>
			</thead>
			<tbody v-if="record.length>0">
			
				<tr v-for="item in record">
					<td v-if="item.cardmodname=='measuredCard'">次卡</td>
					<td v-else-if="item.cardmodname=='monthlyCard'">月卡</td>
					<td v-else-if="item.cardmodname=='quarterlyCard'">季卡</td>
					<td v-else-if="item.cardmodname=='yearlyCard'">年卡</td>
					<td>{{formatDate(item.ctime)}}</td>
					<td>{{item.id}}</td>
					<td>{{item.cost}}</td>

				</tr>

			</tbody>
			<tbody v-else>
			
				<tr >
					<td colspan="4" style="text-align: center;">暂无消费记录</td>
				</tr>

			</tbody>
		</table>

	</div>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { cardrecord } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import { formatDate } from 'src/utils/date'
	//import login from 'src/plugins/login'
	export default {
		data() {
			return {
				record: []
			}
		},
		created() {

		},
		mounted() {
			this.getrecord();
		},

		methods: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			},
			async getrecord() {

				let mobileYzm = await cardrecord();
				if(mobileYzm.code == ApiConst.ERROR_SUCCESS) {

					this.record = mobileYzm.data;
				}
				console.log(mobileYzm, "11111111111111");
			}

		}
	}
</script>

<style>
	html body{
		position: static;
	}
	
	.cardContent {
		background: #FFFFFF;
		padding-bottom: 50px;
	}
	
	.table {
		width: 100%;
	}
	
	.table thead th {
		width: 25%;
		font-size: 13px;
		padding: 20px 0;
		font-weight: 100;
		border-bottom: 1px solid #EEEEEE;
	}
	
	.table tbody td {
		font-size: 12px;
		padding-top: 15px;
	}
</style>