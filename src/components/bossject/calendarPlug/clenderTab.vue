<template>
	  <div class="main" id="clenderTab">
        <div class="tab-bar" >
            <li v-for="(item, index) in navs" :key="index"
                :class="curType === item.type && 'active'"
                @click="changeType(item)">
                {{item.text}}
            </li>
        </div>
        <section class="body">
            <component :is="curType" @close="closeFn"  @onSelectDate="onSelectDate" v-bind="$attrs" v-on="$listeners"></component>
        </section>
    </div>
</template>

<script>
	import { Field } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	//import Custom from '../calendarPlug/custom.vue'
	export default {
		"name":"clenderTab",
    data () {
        return {
            // curComponents: 'Day',
            curType: 'day',
            navs: [
                {type: 'day', text: '日收入'},
                {type: 'week', text: '周收入'},
                {type: 'month', text: '月收入'},
                {type: 'year', text: '年收入'},
                {type: 'diy', text: '自定义'}
            ]
        }
    },
    props: {
   		 status: false
  		},
    components: {
        day: () => import('./day.vue'),
        week: () => import('./week.vue'),
        month: () => import('./month.vue'),
        year: () => import('./year.vue'),
        diy: () => import('./diy.vue')
    },
    methods: {
        changeType (item) {
            this.curType = item.type;
        },
        closeFn(e){
        	this.$emit('mbClose', e)
        },
        onSelectDate (date) {
        	let getObj=new Object();
        		getObj.type= this.curType;
        		getObj.list=date;
        	this.getDate=getObj;
            console.log('选择时间: ', date[0]);
           this.$emit('getYearDay',getObj)
        }
    },
    mounted () {
        let body = document.querySelector('.body');
        body.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'LI') {
                e.target.classList.add('touch');
            }
        }, false);
        //
        body.addEventListener('touchend', (e) => {
            let lis = document.querySelectorAll('li');
					
            for (let i = 0; i<lis.length; i++) {
                lis[i].classList.remove('touch');
            }
        }, false);
    }
}
	
</script>

<style Scoped>

	
	* {
		margin: 0;
		padding: 0;
	}
	/*底部导航*/
	
	html body {
		position: static;
	}
	
	#clenderTab{
		height: 49px;
	}
	
	

	/*.mint-tabbar {
		position: fixed;
		background: #FFFFFF;
		top: 0;
		height: 49px;
		z-index: 10;
	}*/
	
	.tab-bar {
		width: 100%;
		background: #FFFFFF;
		border-bottom: 1px solid #F5F5F5;
	}
	
	.tab-bar li {
		width: 20%;
		display: block;
		float: left;
		font-size: 16px;
		
	}
	
	.tab-bar .active{
		color: red;
		border-bottom: 2px solid red;
	}
	
	.tab-bar li i {
		display: block;
		width: 20px;
		height: 20px;
		margin: 0 auto 2px;
	}

</style>