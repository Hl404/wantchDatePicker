<template>
	<div id="wapper-year">
		<div class="year-content">
			<ul class="year-ul ">
				<li v-for="(item, key) in list" :key="key" @click="selectYear(item)">{{item}}年</li>
			</ul>
			
			<!--这里是三级的组件. ?是的  弹窗在最外面？弹窗控制在garden-->
			 <a class="more" @click="loadData">加载更多</a>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { getDateLimitOfYear } from 'src/plugins/date.js';
	//import { isMember} from 'src/service/getData'
	
	import clenderTab from '../calendarPlug/clenderTab.vue'
	export default {
		name:"wapper-year",
    data () {
        return {
            list: [],
            lastYear: new Date().getFullYear()
        };
    },
    mounted () {
        this.loadData();
    },
    methods: {
        loadData () {
            let list = [];
            for (let i = 0; i < 10; i++) {
                list.push(this.lastYear - i);
            }
            this.lastYear = this.lastYear - 10;
            this.list = this.list.concat(list);
        },
        selectYear (year) {
          let date = getDateLimitOfYear(year);
          this.$emit('onSelectDate', date);
          this.$emit('close',false);
        }
    }
}
</script>

<style>
	.year-content {
		background: #FFFFFF;
		padding-left: 8px;
	}
	
	.year-content .year-ul {}
	
	.year-content .year-ul li {
		text-align: left;
		padding: 15px 0;
		font-size: 16px;
		border-bottom: 1px solid #F0F0F0;
		color: #555555;
	}
</style>