<template>
	<div class="wapper">
		<div class="wapper-list" style="height: calc(100vh)">
			
			<scroll ref="scroll" :data="goldArry" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(0)" @pullingDown="loadTop" @pullingUp="loadBottom">
			<template v-if="goldArry.length > 0">
			<ul slot="list">
				<li class="row" v-for="(item,idx) in goldArry">
					<div class="col-50 left">{{formatDate(item.ctime)}}</div>
					<div class="col-50 right">{{item.score}}</div>
				</li>
				
			</ul>
			</template>
			<template else>
				<p>暂时没有金豆记录</p>
			</template>
			</scroll>
		</div>
			
	</div>
</template>

<script>
	
	import { Field } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import Tabs from '../common/tabbar.vue'
	import { goldbase, unser } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import Scroll from '../libs/scroll.vue'
	import { formatDate } from 'src/utils/date'
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				pageCount: 0,
				goldArry:[],
				scrollbar: true,
				scrollbarFade: true
			};
		},
		created() {

			this.initUserInf();
		},
		components: {
			Scroll
		},
		
		mounted() {

			this.goldbeanCont();
			let info = this.userInfo;
			//console.log(this.iflogin,this.userInfo,"登录状态");
			/*if(this.iflogin == true) {
				console.log("登录成功")
				setTimeout(() => {
					this.userCont();
					this.subjectCont();
				}, 500)
			} else {
				login(this);
				
			}*/
	
		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
			scrollbarObj: function() {
				//alert(1111111)
				return this.scrollbar ? {
					fade: this.scrollbarFade
				} : false
			},
			pullDownRefreshObj: function() {
				//alert(2222)
				return {
					threshold: parseInt(90),
					stop: parseInt(50)
				}
			},
			pullUpLoadObj: function() {

				return {
					threshold: parseInt(0),
					txt: {
						more: '更多',
						noMore: '没有更多数据了'
					}
				}
			}
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),
			initUserInf() {
				//console.log(this);
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();
				/*
				console.log("-------------------")
				console.log(this.userInfo.token)
				console.log("-------------------")//*/

				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//TODO: 初始化页面中的用户数据
					console.log(token, uid, "哈哈哈哈啊哈哈")
				}
				console.log(this.GET_USERINFO(), "成功了吗")
			},
			loadTop() {
				//alert("下拉")
				console.log("下拉111111")
				this.pageNo = 1;
				this.goldbeanCont(0);

			},
			loadBottom() {

				console.log("上拉222222222");
				//alert("上拉")
				this.pageNo++;
				if(this.pageNo > this.pageCount) {
					console.log("生效")
					this.$refs.scroll.forceUpdate();
					return
				}
				this.goldbeanCont(1);

			},
			async goldbeanCont(type){
				let _self=this;
				let pageNo=_self.pageNo;
				let pageSize=_self.pageSize;
				let token = _self.userInfo.token;
				let goldList = await  goldbase(pageNo,pageSize,token);
				console.log(goldList,"成功了haaaaaa");
				
				_self.pageCount = goldList.data.total;
				console.log( pageNo, pageSize, goldList, _self.pageCount, "成功了haaaad qw qw aaa");
				if(goldList.code == ApiConst.ERROR_SUCCESS) {
				
					let menuData = goldList.data.list;
					//let menuData=goldList.data;

					console.log(menuData, "AAAAAAAAAAAAAAAAAAAAAAA");
					_self.pageNo = goldList.data.pageNo;
					_self.pageSize = goldList.data.pageSize;
						
					setTimeout(() => {

						_self.goldArry = type == 0 ? menuData : _self.goldArry.concat(menuData);
						console.log(_self.recordList, "qjkweh oiqhwe oiqwh eoqih eoqiw eh")
						//this.hasData = menuData.length > 0 ? false : true;
					}, 500);
					//_self.goldArry=menuData;
					//_self.recordList = goldList.data.list;

				}
				
			},
			rebuildScroll() {
				Vue.nextTick(() => {
					this.$refs.scroll.destroy()
					this.$refs.scroll.initScroll()
				})
			},
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd ');
			},
			
			
		}

	};
	
</script>

<style>
	
	.wapper-list ul li{
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #D5D5D5;
		background: #FFFFFF;
		padding: 0 15px;
	}
	
.wapper-list ul li .left{
	text-align: left;
	font-size: 14px;
}
.wapper-list ul li .right{
	text-align: right;
	font-size: 18px;
}
</style>