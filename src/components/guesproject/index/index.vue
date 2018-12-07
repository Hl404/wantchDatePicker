<template>
	<div class="wappeI" ref="wapper">
		<!--<Tabs></Tabs>-->
		<div class="wapper-ContentPS" ref="wapperContent">
			<div class="wapper-header2" ref="wapperHeader">
				<span class="wapper-header-img">
					<img :src="pageUrl"/>
				</span>
				<div class="wapper-header-right2 ">
					<div class="left">{{goldcoin}}</div>
					<div class="right">
						<!--<span class="span recharge">充值</span>
						<span class="span">兑换</span>-->
					</div>
				</div>
			</div>
			<div class="wapper-center3" ref="wapperCenter" >
				<div class="no-gutte row">
					<div class="col-50 compet1" v-for="(item,index) in questionlist"  :style="'height:'+competHeight+';background: url('+item.backgroudimg+');'">
							<router-link :to="{name:urlList[index],query:{id:item.id,wager:item.wager,offset:0}}" class="remake" :style="'height:'+remakeBg">
								<div class="head">{{item.remark}}</div>
								<div class="headImg1" :style="'background-image: url('+item.imgurl+')'"></div>
							</router-link>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { Field } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	//import Tabs from '../common/tabbar.vue'
	import { subjectList, unser } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	export default {
		data() {
			return {
				pageUrl: "",
				goldcoin: "",
				questionlist: {},
				urlList: [
					'interestAnswer',
					'interestCompet',
					'guessName',
					'guessLyric'
				],
				competHeight: "",
				competImg: "",
				remakeBg:""

			};
		},
		
		created() {
			console.log(this.$route.query,'+_++_+_+_+_+_+_+_+_+_+_+_+_+');
			this.initUserInf();
		},

		mounted() {

			this.userCont();
			console.log(this.iflogin);
			if(this.iflogin == true) {
				this.userCont();
				this.subjectCont();

			} else {
				login(this);
			}
			let info = this.userInfo;
			//自适应屏幕
			let wapperContentHg = this.$refs.wapper.offsetHeight - 40;
			let wapperHeaderHg = this.$refs.wapperHeader.offsetHeight;
			let wapperCenterHg = wapperContentHg - wapperHeaderHg;
			console.log(wapperContentHg,wapperHeaderHg,wapperCenterHg,"lailailailai o")
			this.competHeight = (wapperCenterHg / 2 - 20) + "px";
			this.competImg=(wapperCenterHg / 2  ) + "px";
			this.remakeBg=(wapperCenterHg / 2 ) + "px";
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
			async subjectCont() {
				let _self = this;
				let token = _self.userInfo.token;
				let subjectlist = await subjectList(token);
				console.log(subjectlist, "+++++++++++题型列表");
				if(subjectlist.code == ApiConst.ERROR_SUCCESS) {
					let subjectData = subjectlist.data;
					_self.pageurl = subjectData.face;
					_self.questionlist = subjectData.subjectList;

				}

			},
			routeTo(item) {},
			async userCont() {
				let _self = this;
				let token = _self.userInfo.token;
				let userlist = await unser(token);
				console.log(userlist, "用户信息")
				if(userlist.code == ApiConst.ERROR_SUCCESS) {
					//alert(111111);
					let userInfoData = userlist.data;
					_self.pageUrl = userInfoData.face;
					_self.goldcoin = userInfoData.goldcoin;
					//	alert(1);
				}

			}

		},
		watch: {
			iflogin(newV, old) {
				let info = this.userInfo;
				if(this.iflogin == true) {
						this.userCont();
						this.subjectCont();

				} else {
					login(this);

				}
			}
		}

	};
</script>

<style>
	.wappeI {
		height: 100%;
	}
	
	@import "/static/css/guesproject/index.css";
</style>