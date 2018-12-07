<template>
	<div class="wapper-wantch">
		<div class="wantchHeader">
			<yd-button class="headDate" @click.native="wantchPupup" :status="false">{{MessDate}}<i class="triangle_border_bottom"></i></yd-button>
			<div class="headMidle">
				<div class="head-left" v-show="previousLeft" @click="previousMouse()">
					<div class="headLeftPage">
						<span class="startDate">{{previous}}</span>
						<i class="triangle_border_left"></i>
					</div>
				</div>
				<div class="headMiddle">
					<div class="middlePotile">
						<span class="leftDy">今日<br>数量</span> {{totalMoney}}
						<span class="rigtDY">万</span>
					</div>
					<p class="bjTime">北京时间：11:24</p>
					<p class="xzNum">新增会员人数：21人</p>
				</div>
				<div class="head-right" v-show="nextRight" @click="nextMouse()">
					<div class="headRightPage">
						<span class="endDate">{{next}}</span>
						<i class="triangle_border_right"></i>
					</div>
				</div>
			</div>
			<div class="headFooter">
				<div class="headTd">总收入:{{totalMoney}}万</div>
				<div class="headTd">线上收入:{{onlineMoney}}万</div>
				<div class="headTd">线下收入:{{offlineDataMoney}}万 </div>
			</div>
		</div>
		<div class="wantchMiddle">
			<!--饼图-->
			<div>
				<m-echarts  
					ref="myCharts" 
				:echartStyle="mChart"    
				:opinionData="wantchData"    
				v-on:currentEchartData="getEchartData">
				</m-echarts>
			</div>
			<div class="tableTitle">
				详细排名
			</div>
			<div class="wantchTable">
				<table>
					<thead>
						<th>项目名称</th>
						<th>收入(元)</th>
						<th>占比</th>
					</thead>
					<tbody>
						<tr>
							<td>卖品</td>
							<td>{{cardMoney}}</td>
							<td>{{cardRote}}</td>
						</tr>
						<tr>
							<td>乐园</td>
							<td>{{goodMoney}}</td>
							<td>{{goodRote}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<yd-popup v-model="show2" position="bottom" height="100%">
			<div class="yd-Content">
				<yd-button type="warning" class="close" @click.native="close()">X</yd-button>
				<h2>选择日期</h2>
			</div>
			<clenderTab @mbClose="close" @getYearDay="getYearDay"></clenderTab>
		</yd-popup>
		<div class="wantchFooter">
			<Tabs></Tabs>
		</div>
	</div>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	import { getWantech } from 'src/service/getData'
	//import   setTempDateData from '../utils/mGlobal'
	import { ApiConst } from 'src/utils/mConst'
	import mEcharts from '../calendarPlug/echart';
	import Tabs from '../member/memtab.vue'
	import clenderTab from '../calendarPlug/clenderTab.vue'
	import { getDayByMonth, getWeeks, getDateLimitOfWeek, getMonthDay } from 'src/plugins/date.js';

	export default {
		data() {
			return {
				show2: false,
				starttime: "",
				endtime: "",
				timeType: "",
				totalMoney: "",
				onlineMoney: "",
				offlineDataMoney: "",
				wantchlist: [],
				previous: "",
				next: "",
				previousLeft: true,
				nextRight: true,
				htmltype: "",
				MessDate: "",
				cardMoney: "",
				goodMoney: "",
				cardRote:"",
				goodRote:"",
				
				wantchData: [{
					value:"" ,
					name: '乐园'
				},{
					value: "",
					name: '卖品'
				}],
				mChart: {          
					height:   "150px"        
				}
			}
		},
		created() {
			
		},
		mounted() {
			this.initDate();
		},
		computed: {},
		methods: {
			getEchartData(val) {        
				console.log(val);      
			},
			initDate() {
				let myDate = new Date();
				myDate.getFullYear(); //获取完整的年份(4位,1970-????)
				myDate.getMonth(); //获取当前月份(0-11,0代表1月)
				myDate.getDate(); //获取当前日(1-31)
				this.starttime = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate();
				this.endtime = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate();
				let selectVal = {
					type: "day",
					list: ["2018-11-29", "2018-11-29"]
				}
				this.getYearDay(selectVal);

			},
			getYearDay(date) {
				this.getLyMethod(date);
				//这里是获取到的时间
				this.starttime = date.list[0];
				this.endtime = date.list[1];
				this.htmltype = date.type;
				let startimeMonth = date.list[0].substring(5, 7) + "月" + date.list[0].substring(8, 10) + "日";
				let endtimeMonth = date.list[1].substring(5, 7) + "月" + date.list[1].substring(8, 10) + "日";
				
				if(date.type == "day") {
					this.previousLeft = true,
						this.nextRight = true;
					this.previous = "前一天";
					this.next = "后一天";
					this.MessDate = "日收入"
					this.MessDate = "日收入" + date.list[0].substring(0, 4) + "年" + startimeMonth;
				} else if(date.type == "week") {
					this.previousLeft = true,
						this.nextRight = true;
					this.previous = "前一周";
					this.next = "后一周";
					this.MessDate = "周收入"
					this.MessDate = "周收入" + startimeMonth + "-" + endtimeMonth;

				} else if(date.type == "month") {
					this.previousLeft = true,
						this.nextRight = true;
					this.previous = "前一月";
					this.next = "后一月";
					this.MessDate = "月收入" + date.list[0].substring(0, 4) + "年" + date.list[0].substring(5, 7) + "月"

				} else if(date.type == "year") {
					this.previousLeft = true,
						this.nextRight = true;
					this.previous = "前一年";
					this.next = "后一年";
					this.MessDate = "年收入" + date.list[0].substring(0, 4) + "年";
				} else if(date.type == "diy") {

					this.previousLeft = false,
						this.nextRight = false;
					this.MessDate = date.list[0].substring(0, 4) + "年" + startimeMonth + "-" + endtimeMonth;
				}
			},
			async getLyMethod(date) {
				let _self = this;
				//				let startimeMonth = date.list[0].substring(5, 7) + "月" + date.list[0].substring(8, 10) + "日";
				//				if(date.type == "day") {
				//					_self.htmltype="day";
				//					_self.previousLeft = true,
				//					_self.nextRight = true;
				//					_self.previous = "前一天";
				//					_self.next = "后一天";
				//					_self.MessDate = "日收入"
				//					_self.MessDate = "日收入" + date.list[0].substring(0, 4) + "年" + startimeMonth;
				//				}

				let starttime = date.list[0];
				let endtime = date.list[1];
				let getLydata = await getWantech(starttime, endtime);
				if(getLydata.code == ApiConst.ERROR_SUCCESS) {
					let getYearData = getLydata.data;
					_self.totalMoney = getYearData.totalMoney;
					_self.onlineMoney = getYearData.onlineMoney;
					_self.offlineDataMoney = getYearData.offlineDataMoney;
					_self.cardMoney=parseInt(getYearData.cardOfflineMoney)+parseInt(getYearData.cardOnlineMoney);
					_self.cardRote=parseInt(getYearData.cardOfflineRate)+parseInt(getYearData.cardOnlineRate);
					_self.goodMoney=parseInt(getYearData.goodsOfflineMoney)+parseInt(getYearData.goodsOnlineMoney);
					_self.goodRote=parseInt(getYearData.goodsOfflineRate)+parseInt(getYearData.goodsOnlineRate);
					_self.wantchData[0].value=parseInt(getYearData.cardOfflineMoney)+parseInt(getYearData.cardOnlineMoney);
					_self.wantchData[1].value=parseInt(getYearData.goodsOfflineMoney)+parseInt(getYearData.goodsOnlineMoney);
					_self.$refs.myCharts.drawPie('myChart')
				}
			},
			//向前递减
			previousMouse() {
				if(this.htmltype == "day") {
					this.starttime = this.addDate(this.starttime, -1);
					this.endtime = this.addDate(this.endtime, -1);
					let starttime = this.starttime.substring(5, 7) + "月" + this.starttime.substring(8, 10) + "日";
					this.MessDate = "日收入" + this.starttime.substring(0, 4) + "年" + starttime;
					let selectVal = {
						type: "day",
						list: [this.starttime, this.endtime]
					}
					this.getLyMethod(selectVal);
				} else if(this.htmltype == "week") {
					this.starttime = this.addDate(this.starttime, -7);
					this.endtime = this.addDate(this.endtime, -7);
					let starttime = this.starttime.substring(5, 7) + "月" + this.starttime.substring(8, 10) + "日";
					let endtime = this.endtime.substring(5, 7) + "月" + this.endtime.substring(8, 10) + "日";
					this.MessDate = "月收入" + starttime + "-" + endtime;
					let selectVal = {
						type: "week",
						list: [this.starttime, this.endtime]
					}
					this.getLyMethod(selectVal);
				} else if(this.htmltype == "month") {
					this.prevNextMonth("prev");
				} else if(this.htmltype == "year") {
					this.prevNextyear("prev");
				}
			},
			//向后增加
			nextMouse() {
				if(this.htmltype == "day") {
					this.starttime = this.addDate(this.starttime, 1);
					this.endtime = this.addDate(this.endtime, 1);
					let starttime = this.starttime.substring(5, 7) + "月" + this.starttime.substring(8, 10) + "日";
					this.MessDate = "日收入" + this.starttime.substring(0, 4) + "年" + starttime;
					let selectVal = {
						type: "day",
						list: [this.starttime, this.endtime]
					}
					this.getLyMethod(selectVal);
				} else if(this.htmltype == "week") {
					this.starttime = this.addDate(this.endtime, 1);
					this.endtime = this.addDate(this.endtime, 7);
					let starttime = this.starttime.substring(5, 7) + "月" + this.starttime.substring(8, 10) + "日";
					let endtime = this.endtime.substring(5, 7) + "月" + this.endtime.substring(8, 10) + "日";
					this.MessDate = "月收入" + starttime + "-" + endtime;
					let selectVal = {
						type: "week",
						list: [this.starttime, this.endtime]
					}

					this.getLyMethod(selectVal);
				} else if(this.htmltype == "month") {
					this.prevNextMonth("next");
				} else if(this.htmltype == "year") {
					this.prevNextyear("next");
				}
			},
			prevNextMonth(prevOrNext) {
				let oStartDate = new Date(this.starttime);
				if(prevOrNext == "next") {
					oStartDate = oStartDate.setMonth(oStartDate.getMonth() + 1);
				} else {
					oStartDate = oStartDate.setMonth(oStartDate.getMonth() - 1);
				}
				oStartDate = new Date(oStartDate);
				let yearValue = oStartDate.getFullYear();
				let monthValue = oStartDate.getMonth() + 1;
				let lastDay = new Date(yearValue, monthValue, 0); //获取某月的最后一天s

				this.starttime = yearValue + '-' + monthValue + '-' + 1;
				this.endtime = yearValue + '-' + monthValue + '-' + lastDay.getDate();

				var selectVal = {
					type: "year",
					list: [this.starttime, this.endtime]
				}
				this.MessDate = "月收入" + yearValue + "年" + monthValue + "月";

				this.getLyMethod(selectVal);

			},
			prevNextyear(prevOrNext) {
				let curYear = new Date().getFullYear();
				let oStartDate = new Date(this.starttime);
				let yearValue = undefined;
				if(prevOrNext === 'next') {
					yearValue = oStartDate.getFullYear() + 1;
					if(yearValue > curYear) {
						alert(curYear)
						return;
					}
				} else {
					yearValue = oStartDate.getFullYear() - 1;
					if(yearValue < 2016) {
						alert("2106");
						return;
					}
				}
				let monthValue = oStartDate.getMonth() + 1;
				let dateValue = oStartDate.getDate();
				this.starttime = yearValue + '-' + monthValue + '-' + dateValue;
				this.endtime = yearValue + '-12-31';
				oStartDate.setFullYear(yearValue);
				var selectVal = {
					type: "year",
					list: [this.starttime, this.endtime]
				}
				this.MessDate = "年收入" + yearValue + "年";
				this.getLyMethod(selectVal);
			},
			wantchPupup() {
				this.show2 = true;
				let showdig = this.show2;
			},
			close(e) {
				this.show2 = e;
			},
			addDate(dateParam, days) {
				if(days == undefined || days == '') {
					days = 1;
				}
				var dateVal = new Date(dateParam); //2018-01-10
				dateVal.setDate(dateVal.getDate() + days);
				var month = dateVal.getMonth() + 1;
				var day = dateVal.getDate();
				return dateVal.getFullYear() + '-' + this.getFormatDate(month) + '-' + this.getFormatDate(day);
			},
			getFormatDate(arg) {
				if(arg == undefined || arg == '') {
					return '';
				}
				var re = arg + '';
				if(re.length < 2) {
					re = '0' + re;
				}
				return re;
			}
		},
		components: {
			Tabs,
			clenderTab,
			mEcharts
		}

	}
</script>

<style>
	@import "../../../assets/css/bossject/wantch.css";
</style>