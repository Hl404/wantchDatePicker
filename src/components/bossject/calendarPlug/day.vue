<template>
	<div class="body-content day-content">
		<div class="date-title">
			<div>日</div>
			<div>一</div>
			<div>二</div>
			<div>三</div>
			<div>四</div>
			<div>五</div>
			<div>六</div>
		</div>
		<div class="day-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">

			<ul v-for="(item, key) in months" :key="key" :data-name="chineseMonth[item.month] + '月'">
				<h2 class="datetitleyear">{{`${item.year}年${item.month}月`}}</h2>
				<li v-for="(day, i) in item.days" :key="i" :style="{marginLeft: day === 1 ? getFirstMarginLeft(item.year, item.month) : 0}" :class="isWeekEnd(item.year, item.month, day) && 'red'" @click="selectDay(item.year, item.month, day)">{{day}}</li>
			</ul>
			<!--<a class="more" @click="loadMore">加载更多</a>-->

		</div>
	</div>
</template>

<script>
	import { getDayByMonth, chineseMonth } from 'src/plugins/date.js';
	import { MessageBox, Loadmore } from 'mint-ui';
	import Scroll from '../libs/scroll.vue'

	export default {
		data() {
			return {
				loading: false,
				chineseMonth,
				months: [],
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1
			};
		},
		mounted() {
			this.loadMore();
		},
		methods: {
			// 每次加载5个月数据
			loadMore() {
				//				let year = this.year,
				//					month = this.month;
				//				for(let i = 0; i < 5; i++) {
				//					this.getDays(year, month);
				//					//
				//					month--;
				//					if(month === 0) {
				//						month = 12;
				//						year--;
				//					}
				//				}
				//				this.year = year;
				//				this.month = month;
				let _self = this;
				_self.loading = true;
				let year = _self.year,
					month = _self.month;
				setTimeout(() => {
					//let last = this.list[this.list.length - 1];
					for(let i = 0; i < 1; i++) {
						_self.getDays(year, month);
						month--;
						//this.list.push(last + i);
						if(month === 0) {
							month = 12;
							year--;
						}
					}
					_self.year = year;
					_self.month = month;
					_self.loading = false;
				},500);

			},
			getFirstMarginLeft(year, month) {
				let d = new Date(year, month - 1, 1);
				let w = d.getDay();
				return w * (100 / 7) + '%';
			},
			isWeekEnd(year, month, day) {
				let d = new Date(year, month - 1, day);
				return [0, 6].includes(d.getDay());
			},
			getDays(year, month) {
				let days = getDayByMonth(year,month);
				this.months.push({
					year,
					month,
					days
				});
			},

			// 选择天
			selectDay(y, m, d) {
				let date = [`${y}-${m}-${d}`, `${y}-${m}-${d}`];
				
				this.$emit('onSelectDate', date);
				this.$emit('close',false);
				console.log(date)
			}
		}
	}
</script>
<style lang="less" scoped>
	.date-title {
		display: flex;
		padding: .10rem 0;
		text-align: center;
		border-bottom: .01rem solid #d1d1d1;
		background: #f5f5f5;
		div {
			flex: 1;
			font-size: 13px;
			color: #555555;
		}
	}
	
	.day-list {}
	
	.day-list ul {
		position: relative;
		clear: both;
		padding-top: 40px;
	}
	
	.day-list .datetitleyear {
		position: absolute;
		height: 41px;
		margin: auto;
		line-height: 41px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F8F8F8;
	}
	
	.day-list ul li {
		width: 14.28571%;
		padding: 0.5rem 0.3rem;
		font-size: 14px;
		float: left;
	}
	
	.day-list ul .red {
		color: red;
	}
	
	.week-item {
		display: flex;
	}
	
	.week-item li {
		padding: .10rem 0;
		-webkit-box-flex: 1;
		float: left;
		text-align: center;
	}
</style>