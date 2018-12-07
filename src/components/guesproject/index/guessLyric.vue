<template>
	<div class="guessly">
		<p class="gussImg"><img src="../../../../static/img/kongbaiye@2x.png" /></p>
		<p>程序员还在开发中,敬请期待</p>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { cmusicName } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	export default {
		data() {
			return {

			};
		},
		created() {
			this.initUserInf();
		},

		mounted() {
			this.musicName();
		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
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
					//TODO: 初始化页面中的用户数据
				}
			},
			async musicName() {
				let _self = this;
				let token = _self.userInfo.token;
				let subjectlist = await cmusicName(token);
				console.log(subjectlist, "+++++++++++猜歌词");
				
			}

		}
	};
</script>

<style>
	.guessly {
		padding-top: 20%;
	}
	
	.gussImg img {
		width: 127px;
		height: 127px;
		margin: auto;
	}
</style>