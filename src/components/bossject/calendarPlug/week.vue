<template>
	<div id="week-wapper">
		<div class="week-content">
			<div class="week-tab-left">
				<ul class="week-tab-ul">
					<li v-for="(item, key) in list" :key="key" :class="item === year && 'active'" @click="loadWeeks(item)">{{item}}年</li>
				</ul>
			</div>
			<!--<div class="week-tab-right">
				<div class="dateTitle">{{year}}</div>
				<ul>
					<li v-for="item in dateList">{{item}}</li>
				</ul>
			</div>-->
			<section class="week-tab-right ">
				<h3 class="dateTitle">{{year}}年</h3>
				<ul class="week-list">
					<li v-for="(w, key) in weeks" :key="key" @click="selectWeek(w)">
						第{{w.num}}周<span>({{w.startDate}}-{{w.endDate}})</span>
					</li>
				</ul>
			</section>

		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import clenderTab from '../calendarPlug/clenderTab.vue'
	import { getWeeks, getDateLimitOfWeek } from 'src/plugins/date.js';
	export default {
		name: "week-wapper",

		data() {
			let year = new Date().getFullYear();
			return {
				list: [],
				year,
				lastYear: year,
				weeks: []
			}
		},
		created() {
			//this.initUserInf();
		},
		beforeCreate() {},
		mounted() {
			this.loadYear();
			this.loadWeeks(this.year);
		},
		computed: {

		},
		methods: {
			loadYear() {
				let list = [];
				for(let i = 0; i < 10; i++) {
					list.push(this.lastYear - i);
				}
				this.lastYear = this.lastYear - 10;
				this.list = this.list.concat(list);
			},
			// 选择年份
			// 加载某年年对应周时间
			loadWeeks(year) {
				this.year = year;
				this.weeks = getWeeks(year);
			},
			// 选择月份
			selectWeek(week) {
				this.$emit('onSelectDate', week.date);
				this.$emit('close',false);
			}
		}

	}
</script>

<style>
	html body {
		position: static;
	}
	
	.week-tab-left {
		width: 80px;
		border-right: 1px solid #e5e5e5;
		overflow: auto;
		float: left;
		position: absolute;
		top: 93px;
	}
	
	.week-tab-ul {}
	
	.week-tab-ul li {
		padding: 15px 0;
		text-align: center;
		font-size: 16px;
	}
	
	.week-tab-ul .active {
		color: red;
		background: #FFFFFF;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
	}
	
	.week-tab-right {
		width: 100%;
		padding-left: 80px;
		float: left;
	}
	
	.week-tab-right ul li {
		padding: 10px 0;
		text-align: left;
		margin-left: 10px;
		font-size: 15px;
		border-bottom: 1px solid #E5E5E5;
	}
	
	.week-tab-right .dateTitle {
		padding: 5px 0;
		margin-left: 10px;
		background: #fafafa;
		border-bottom: 1px solid #E5E5E5;
		font-size: 13px;
	}
</style>