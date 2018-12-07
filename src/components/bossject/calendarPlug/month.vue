<template>
	<div id="month-wapper">
		<div class="month-content">
			<div class="month-tab-left">
				<ul class="month-tab-ul">
					<li v-for="(item, key) in list" :key="key" :class="item === year && 'active'" @click="loadMonth(item)">{{item}}年</li>
				</ul>
			</div>
			<div class="month-tab-right">
				<div class="dateTitle">{{titleMonth}}</div>
				<ul class="month-list">
					<li v-for="(m, key) in months" :key="key" @click="selectMonth(m)">{{m}}月</li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	//import { isMember} from 'src/service/getData'k
	import clenderTab from '../calendarPlug/clenderTab.vue'
	//import monthJson from 'src/service/month.json';
	import { getMonths, getDateLimitOfMonth } from 'src/plugins/date.js';
	//console.log(monthJson,"111111111111")
export default {
	name:"month-wapper",
    data () {
    	
        let year = new Date().getFullYear();
        return {
            list: [],
            year,
            titleMonth:"",
            lastYear: year,
            months: []
        };
    },
    mounted () {
        this.loadYear();
        this.loadMonth(this.year);
    },

    methods: {
        loadYear () {
            let list = [];
            for (let i = 0; i < 5; i++) {
                list.push(this.lastYear - i);
            }
            this.lastYear = this.lastYear - 5;
            this.list = this.list.concat(list);
            console.log()
        },
        // 选择年份
        // 加载某年年对应月份
        loadMonth (year) {
            this.year = year;
            this.months = getMonths(year);
        },

        // 选择月份
        selectMonth (month) {
            let date = getDateLimitOfMonth(this.year, month);
            this.$emit('onSelectDate', date);
             this.$emit('close',false);
        }
    }
}
</script>

<style>
	html body {
		position: static;
	}
	
	.month-tab-left {
		width: 80px;
		border-right: 1px solid #e5e5e5;
		overflow: auto;
		float: left;
		position: absolute;
		top: 93px;
	}
	
	.month-tab-ul {}
	
	.month-tab-ul li {
		padding: 15px 0;
		text-align: center;
		font-size: 16px;
	}
	
	.month-tab-ul .active {
		color: red;
		background: #FFFFFF;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
	}
	
	.month-tab-right {
		width: 100%;
		padding-left: 80px;
		float: left;
	}
	
	.month-tab-right ul li {
		padding: 10px 0;
		text-align: left;
		margin-left: 10px;
		font-size: 15px;
		border-bottom: 1px solid #E5E5E5;
	}
	
	.month-tab-right .dateTitle {
		padding: 5px 0;
		margin-left: 10px;
		background: #fafafa;
		border-bottom: 1px solid #E5E5E5;
		text-align: left;
		font-size: 13px;
	}
</style>