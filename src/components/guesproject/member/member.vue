<template>
	<div class="wapper">
		<Tabs></Tabs>
		<div class="wapper-Content">
			<header class="header-bg">
				<div class="header-Img">
					<img :src="unserInfo.pageUrl"/>
				</div>
				<p class="header-name">
					{{unserInfo.pageName}}
				</p>

			</header>
			<div class="wapper-list">
				<div class="wapper-list-item marTop">
					<span class="lmazamox">{{unserInfo.goldcoin}}</span>
					<!--<router-link>兑换</router-link>-->
					<span class="lmazamoxBtn">兑换</span>
				</div>
				<router-link to="/guesproject/currency" class="mint-cell marTop">
						<div class="mint-cell-wrapper">
								<i class="indexicon "></i> 
								<span class="name">虚拟货币记录</span>
						</div>
						
				</router-link>
				<router-link to="/guesproject/exchange" class="mint-cell ">
						<div class="mint-cell-wrapper">
								<i class="indexicon1 "></i> 
								<span class="name">兑换记录</span>
						</div>
						
				</router-link>
				<router-link to="/guesproject/receAddress" class="mint-cell ">
						<div class="mint-cell-wrapper">
								<i class="indexicon2 "></i> 
								<span class="name">收货地址</span>
						</div>
						
				</router-link>
				<router-link to="/guesproject/order" class="mint-cell ">
						<div class="mint-cell-wrapper">
								<i class="indexicon3 "></i> 
								<span class="name">订单</span>
						</div>
						
				</router-link>
				<router-link to="/guesproject/about" class="mint-cell ">
						<div class="mint-cell-wrapper">
								<i class="indexicon4 "></i> 
								<span class="name">关于</span>
						</div>
						
				</router-link>
				<router-link to="/guesproject/gogao" class="mint-cell ">
						<div class="mint-cell-wrapper">
								<i class="indexicon4 "></i> 
								<span class="name">公告</span>
						</div>
						
				</router-link>
				
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	//import { isMember} from 'src/service/getData'
	import { mapState, mapMutations } from 'vuex'
	import login from 'src/plugins/login'
	import { ApiConst } from 'src/utils/mConst'
	import Tabs from '../common/tabbar.vue'
	export default {
		data() {
			return {
				unserInfo: {
					pageUrl:"",
					pageName:"",
					goldcoin:""
				}
			}
		},
		created() {
			this.initUserInf();			
		},
		mounted() {
			
			//console.log(this.userInfo)
			console.log(this.iflogin);
			if (!this.iflogin) {
				login(this, this.fillPageData);	
				
			}
		},
		computed: {
			...mapState([
				'userInfo','iflogin'
			]),
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
					//console.log(uid);
					//console.log(token);
					
					//TODO: 初始化页面中的用户数据
					this.fillPageData(this.userInfo);
					//console.log(this.userInfo,"++++++++++++++");
			
				}
			},
			fillPageData(userInfo) {
				this.unserInfo.pageUid = userInfo.uid;
				this.unserInfo.pagelvId = userInfo.lvId;
				this.unserInfo.accountRemain = userInfo.accountRemain;
				this.unserInfo.pageUrl=userInfo.headImgUrl;
				this.unserInfo.pageName=userInfo.nickname;
				this.unserInfo.goldcoin=userInfo.goldcoin;
			}
			
		},
		components: {
			Tabs
		}
		
	}
	
</script>

<style>
	
	@import "/static/css/guesproject/member.css";
</style>