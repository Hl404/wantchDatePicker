<template>
	<div class="memberCard">

		<div class="membeCcard-header">
			<span class="wxImg">
				<img :src="pageUrl" class="wxinfo" width="50" height="50"/>
			</span>
			<div class="wxinfoRight">
				<p class="t1">{{nickname}}</p>
				<p class="t2" v-if="cardno">会员卡号:<span>{{cardNum}}</span></p>
				<p class="t3">手机号码:<span>{{iphone}}</span></p>
			</div>
		</div>

		<div class="memberCard-middle">
			<div class="memberCard-content" v-if="cardno">
				<div class="memberCard-title" @click="cardToggle">
					<span>乐园卡</span>
				</div>

				<div class="memberCard-fl" v-show="boxshow">
					<ul>
						<li v-for="item in cardArr" @click="cardback(item)" v-if="item.type=='measuredCard'" class="active1">
							<!--<p v-if="item.type=='measuredCard'">次卡</p>
							<p v-else-if="item.type=='monthlyCard'">月卡</p>
							<p v-else-if="item.type=='quarterlyCard'">季卡</p>
							<p v-else-if="item.type=='yearlyCard'">年卡</p>-->
							<p class="cardName">{{item.cName}}</p>
							<p class="cardNumber">{{item.id}}</p>
							<img src="../../assets/images/guoqi@2x.png" v-show="item.guoqi" class="guoqi" />
							<img src="../../assets/images/yiyongwan@2x.png" v-show="item.Yend" class="guoqi" />
						</li>
						<li v-for="item in cardArr" @click="cardback(item)" v-if="item.type=='monthlyCard'" class="active2">
							<!--<p v-if="item.type=='measuredCard'">次卡</p>
							<p v-else-if="item.type=='monthlyCard'">月卡</p>
							<p v-else-if="item.type=='quarterlyCard'">季卡</p>
							<p v-else-if="item.type=='yearlyCard'">年卡</p>-->
							<p class="cardName">{{item.cName}}</p>
							<p class="cardNumber"> {{item.id}}</p>
							<img src="../../assets/images/guoqi@2x.png" v-show="item.guoqi" class="guoqi" />
							<img src="../../assets/images/yiyongwan@2x.png" v-show="item.Yend" class="guoqi" />
						</li>
						<li v-for="item in cardArr" @click="cardback(item)" v-if="item.type=='quarterlyCard'" class="active3">
							<!--<p v-if="item.type=='measuredCard'">次卡</p>
							<p v-else-if="item.type=='monthlyCard'">月卡</p>
							<p v-else-if="item.type=='quarterlyCard'">季卡</p>
							<p v-else-if="item.type=='yearlyCard'">年卡</p>-->
							<p class="cardName">{{item.cName}}</p>
							<p class="cardNumber">{{item.id}}</p>
							<img src="../../assets/images/guoqi@2x.png" v-show="item.guoqi" class="guoqi" />
							<img src="../../assets/images/yiyongwan@2x.png" v-show="item.Yend" class="guoqi" />
						</li>
						<li v-for="item in cardArr" @click="cardback(item)" v-if="item.type=='yearlyCard'" class="active4">
							<!--<p v-if="item.type=='measuredCard'">次卡</p>
							<p v-else-if="item.type=='monthlyCard'">月卡</p>
							<p v-else-if="item.type=='quarterlyCard'">季卡</p>
							<p v-else-if="item.type=='yearlyCard'">年卡</p>-->
							<p class="cardName">{{item.cName}}</p>
							<p class="cardNumber">{{item.id}}</p>
							<img src="../../assets/images/guoqi@2x.png" v-show="item.guoqi" class="guoqi" />
							<img src="../../assets/images/yiyongwan@2x.png" v-show="item.Yend" class="guoqi" />
						</li>

					</ul>
				</div>

			</div>

			<div class="memberCard-menu">
				<!--<router-link to="/pardcard/registerIphone" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">购买套餐</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>-->
				<router-link to="/pardcard/cardrecord" class="mint-cell" v-if="cardno">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div><i class="indexicon icon-toast"></i> <span class="name">交易记录</span></div>
						</div>
					</div>
					<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
				</router-link>
				<router-link to="/pardcard/modifyIphone" class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div><i class="indexicon icon-toast"></i> <span class="name">更换手机号</span></div>
						</div>
					</div>
					<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
				</router-link>
			</div>
		</div>

	</div>
</template>

<script>
	//import { makeSignature } from 'src/utils/sha1Hex';
	import { MessageBox, Toast } from 'mint-ui';
	import { cardlist, unser, getMobile, getcardNo } from 'src/service/getData'
	import { mapState, mapMutations } from 'vuex'
	import login from 'src/plugins/login'
	import { ApiConst } from 'src/utils/mConst'
	export default {
		data() {
			return {
				boxshow: true,
				pageUrl: "",
				nickname: "",
				iphone: "",
				cardno: "",
				cardArr: [],
				guoqShow: false,
				cardNum: ""

			}
		},
		created() {
			this.initUserInf();
		},
		mounted() {
			
			if(this.iflogin == true) {
				
				this.isMobile();
				
			} else {
				login(this);
			}

		},//在调用一次ismobile方法就好了貌似相当于在请求一次
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
					//console.log(uid);
					//console.log(token);

					//TODO: 初始化页面中的用户数据
					//this.fillPageData(this.userInfo);
					//this.userCont();
					//console.log(this.userInfo,"++++++++++++++");
					console.log(token, uid, "token----------uid")
				}
			},
			cardToggle() {
				this.boxshow = !this.boxshow;
			},
			fillPageData(userInfo) {
				console.log(userInfo, "个人信息");
				//this.unserInfo.pageUid = userInfo.uid;
				//this.unserInfo.pagelvId = userInfo.lvId;
				//this.unserInfo.accountRemain = userInfo.accountRemain;
				this.pageUrl = userInfo.headImgUrl;

			},
			async userCont() {
				let _self = this;
				let token = JSON.parse(window.localStorage.getItem('userInfo')).token;
				let userlist = await unser(token);
				if(userlist.code == ApiConst.ERROR_SUCCESS) {
					let userInfoData = userlist.data;
					_self.pageUrl = userInfoData.face;
					_self.nickname = userInfoData.nickname;
					_self.iphone = userInfoData.mobile.substr(0, 3) + "****" + userInfoData.mobile.substr(7);
					_self.cardno = userInfoData.cardno;
					console.log(userInfoData,"删除")
					//var str2 = str.substr(0,3)+"****"+str.substr(7);  
					this.getNo(); // 
					//	alert(1);
				}

			},
			async getNo() {
				let cardNo = this.cardno;
				let getCardnum = await getcardNo(cardNo);
				if(getCardnum.code == ApiConst.ERROR_SUCCESS) {
					this.cardNum = getCardnum.data;
					//alert("11")
				}
			},
			async getcardList() {
				let _self = this;
				let token = JSON.parse(window.localStorage.getItem('userInfo')).token;
				let cardDataList = await cardlist(token);
				console.log(cardDataList, "卡列表")
				if(cardDataList.code == ApiConst.ERROR_SUCCESS) {
					let cardData = cardDataList.data;
					let cardDetail = cardData.modDefineList;
					let cardDataArr = cardData.modList;
					console.log(cardDetail, "uuuuuuuuuuu");
					//let _endtime=cardDataList.data.endtime;
					cardDataArr.forEach(datalsit => {
						let _thisTime = +new Date();
						let _endtime = datalsit.endtime;
						let Aid = datalsit.modDefId;
						if(_endtime < _thisTime) {
							datalsit.guoqi = true;
						} else {
							if(datalsit.canusetimes == 0) {
								datalsit.Yend = true;
							}
						}
						cardDetail.forEach(data => {
							let Bid = data.id;
							if(Aid == Bid) {
								//console.log("AID" + Aid, "BID" + Bid, "IDDDDDDDDD");
								//datalsit.map()
								datalsit.cName = data.cName;
								datalsit.rule = data.rule;
							}
						})
					})
					console.log(cardDataArr, "----------------------")
					_self.cardArr = cardDataArr;
					console.log(_self.cardArr, "添加的数组")
					//var str2 = str.substr(0,3)+"****"+str.substr(7);  
					//	alert(1);
				}

			},
			async isMobile() {
				
				// 试试  我去吃饭。看了再去吧
					let token = JSON.parse(window.localStorage.getItem('userInfo')).token;
				let mobileStatus = await getMobile(token);  //、这个是主页面的。如果没用绑定就路由到手机绑定页面要他去绑定啊
				if(mobileStatus.code == ApiConst.ERROR_SUCCESS) {
					
					this.userCont();
					this.getcardList();

				} else {
					//this.maskContent = true;
					this.$router.push("/pardcard/registerIphone");//这不就是吗   你特么上面那个接口没有传token
				}
			},
			cardback(item) {
				let _thisTime = +new Date()
				let _endtime = item.endtime;
				//				if(_OneTime < _thisTime) {
				console.log(item)

				if(_endtime < _thisTime) {
					Toast({
						message: '您的卡已过期',
						position: 'middle',
						duration: 1000
					});
					//Toast("您的卡已过期")
					return false;
				} else {
					if(item.canusetimes == 0) {

						Toast({
							message: '您的套餐次数已用尽',
							position: 'middle',
							duration: 1000
						});
						//Toast("您的卡已过期")
						return false;
					}
					localStorage.setItem('cardData', JSON.stringify(item));
					this.$router.push("/pardcard/carddetail");
				}

			},
			watchCard() {

			}

		},
		watch: {
			iflogin(newV, old) {
				if(this.iflogin == true) {
					this.isMobile();
					
				} else {
					login(this);
				}
			}
		}
	}
</script>

<style>
	@import "../../assets/css/pardcard/membercard.css";
</style>