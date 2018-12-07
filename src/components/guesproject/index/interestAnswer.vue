<template>
	<div class="wapper">
		<div class="wapper-Content">
			<div class="wapper-header1">
				<span class="wapper-header-img">
					<img :src="pageUrl"/>
				</span>
				<div class="wapper-header-right ">
					<div class="left">{{goldcoin}}</div>
					<div class="right">
						<router-link :to="{name:'answerRecord',params:{id:typeId}}" class="span recharge">答题记录</router-link>
						<span class="span">答题规则</span>
					</div>
				</div>
			</div>
			<div class="wapper-center1">
				<template v-if="answerList.length > 0">
					<div class="answer-content" v-for="item in answerList">
						<p class="answer-tm">{{item.content}}</p>
						<div class="count-press">
							<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" :width="width" :height="width">
								<circle cx="100" cy="100" :r="100 - border / 2" fill="none" opacity=".2" :stroke="color" :stroke-width="border" />
								<circle cx="100" cy="100" :r="100 - border / 2" fill="none" transform="rotate(270,100,100)" :stroke="color" :stroke-width="border" :stroke-dasharray="dashLen" :stroke-dashoffset="dashOffset" style="transition: stroke-dashoffset 0.4s" />
								<text x="100" y="100" text-anchor="middle" :font-size="fontSize + 20" :fill="color">
      						{{ countDown }}s
   							 </text>
								<text x="100" y="150" text-anchor="middle" :font-size="fontSize" fill="#d4d4d4">
     							 剩余
    						</text>
							</svg>
						</div>
						<div class="answerMenu">
							<ul id="answerUl">
								<li @click="answer($event,item,'A')" :class="{active:show==1}">
									<span class="option">A</span>
									<div class="answerOption">
										<span class="left">{{item.option1}}</span>

									</div>
								</li>
								<li @click="answer($event,item,'B')" :class="{active:show==2}">
									<span class="option">B</span>
									<div class="answerOption">
										<span class="left">{{item.option2}}</span>
									</div>
								</li>
								<li @click="answer($event,item,'C')" :class="{active:show==3}" v-if="item.option3">
									<span class="option">C</span>
									<div class="answerOption">
										<span class="left">{{item.option3}}</span>

									</div>
								</li>
								<li @click="answer($event,item,'D')" :class="{active:show==4}" v-if="item.option4">
									<span class="option">D</span>
									<div class="answerOption">
										<span class="left">{{item.option4}}</span>
									</div>
								</li>
							</ul>

						</div>
						<!--	弹窗-->
						<div class="answer-fixed" v-show="maskShow">
							<div class="answerMask">
								<div class="answerMask-dw">
									<p class="money" v-show="moneyShow">+2金币</p>
									<p class="money" v-show="moneyFalse">正确答案是:{{item.answer.toLocaleUpperCase()}}</p>
									<p class="true" v-show="trueShow">恭喜你,答对了</p>
									<p class="false" v-show="falseShow">非常遗憾,答错了</p>

									<span class="answerBtn" @click="answerBtn">下一题</span>
								</div>
							</div>
						</div>

					</div>
				</template>
				<template v-else>

					<p><img src="../../../../static/img/falseTP.jpg" style="width: 100%;"/></p>

				</template>
			</div>
			<div class="goldcoinMask" v-show="goldcoinShow">
				<div class="goldcoinCont">
					<div class="goldcoinCont-relative">
						<p class="titleJ">抱歉，您的金币不足</p>
						<p class="titleJ">请进行充值</p>
						<router-link to="/guesproject/recharge" class="goldcoinBtn">
							充值
						</router-link>

						<span class="closeGj" @click="closeGj()">
							
						</span>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { unser, anwerType, commitAnwer } from 'src/service/getData'
	import { mapState, mapMutations } from 'vuex'
	import login from 'src/plugins/login'
	import { ApiConst } from 'src/utils/mConst'
	let setTimer = 10 * 1000;
	export default {

		props: {
			width: {
				type: Number,
				default: 80
			},
			border: {
				type: Number,
				default: 20
			},
			color: {
				type: String,
				default: '#d73f3f'
			},
			fontSize: {
				type: Number,
				default: 30
			}
		},
		data() {
			return {
				pageUrl: "",
				goldcoin: "",
				answerList: {},
				maskShow: false,
				trueShow: true,
				falseShow: false,
				timeLeft: setTimer,
				dashLen: (100 - this.border / 2) * Math.PI * 2,
				show: "",
				optionShow: true,
				typeId: "",
				moneyShow: false,
				moneyFalse: false,
				goldcoinShow: false
			}
		},
		created() {

			this.initUserInf();
		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
			countDown() {
				let time = this.timeLeft
				if(time <= 0) {
					return '0'
				} else {
					let result = []
					result.push(Math.floor(time % 60000 / 1000))
					return result.map(x => x < 10 ? '0' + x : x).join(':')
				}
			},
			dashOffset() {
				return this.dashLen + this.timeLeft / setTimer * this.dashLen
			}
		},
		mounted() {
			this.answerfun();
			this.userCont();

		},
		beforeUpdate() {

		},
		methods: {
			fn() {
				this.lastDate = Date.now()
				clearInterval(this.interval)
				this.interval = setInterval(() => {
					let curDate = Date.now()
					let diff = Math.round((curDate - this.lastDate) / 1000) * 1000
					this.timeLeft -= diff
					if(this.timeLeft <= 0) {
						clearInterval(this.interval);
						this.maskShow = true;
						this.falseShow = true;
						this.trueShow = false;
						this.moneyFalse = true;
						this.moneyShow=false;
					}
					if(diff >= 1000) {
						this.lastDate = curDate;

					}
				}, 1000)
			},
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),
			initUserInf() {
				//console.log(this);
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();

				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//TODO: 初始化页面中的用户数据
					console.log(token, uid, "哈哈哈哈啊哈哈")
				}
				console.log(this.GET_USERINFO(), "成功了吗")
			},
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
					if(_self.goldcoin == "0") {
						_self.goldcoinShow = true;
					}
				}
			},
			async answerfun() {
				let typeId = this.$route.query.id;
				let id = typeId;
				let anwerlsit = await anwerType(typeId);
				this.typeId = this.$route.query.id;
				//let anwerlist=await 
				console.log(typeId, anwerlsit, "获取到的ID");
				if(anwerlsit.code == ApiConst.ERROR_SUCCESS) {
					
					this.goldcoin = anwerlsit.data.goldcoin;
					let anwerData = anwerlsit.data.list;
					this.timeLeft = (anwerData[0].countdown * 1000) || 10 * 1000;
					this.fn();
					console.log(this.goldcoin, "当前的金币数量");
					//this.$router.push({path:'/guesproject/answerRecord',query:{ typeId: typeId }});

					this.answerList = anwerData;
					console.log(anwerData, anwerlsit.data.content, "获取到的题目答案 ");
				}else if(anwerlsit.code==ApiConst.ERROR_FAIL&&anwerlsit.data.goldcoin==ApiConst.ERROR_FAIL){
					this.goldcoinShow = true;
				}

			},
			async submitAnwer(id, chat) {
				let subjectid = id;
				let useranswer = chat;;
				let typeid = this.$route.query.id;
				console.log(typeid, "typeIdtypeIdtypeIdtypeIdtypeIdtypeIdtypeIdtypeIdtypeId");
				let subAnwer = await commitAnwer(subjectid, useranswer, typeid);
				if(subAnwer.code == ApiConst.ERROR_SUCCESS) {
					this.goldcoin = subAnwer.data.goldcoin;

				}
				//console.log(subAnwer,typeId, "提交答案")

			},
			answer(e, item, chat) {

				console.log(item.countdown, "当前的秒数");
				let id = item.id;
				this.submitAnwer(id, chat);
				let anwerTure = item.answer.toLocaleUpperCase();
				clearInterval(this.interval)
				if(chat == "A") {
					this.show = 1;
				} else if(chat == "B") {
					this.show = 2;
				} else if(chat == "C") {
					this.show = 3;
				} else if(chat == "D") {
					this.show = 4;
				}
				this.maskShow = true;
				//判断题目的对错
				if(anwerTure == chat) {
					this.trueShow = true;
					this.falseShow = false;
					this.moneyShow = true;
					this.moneyFalse = false;
				} else {
					//alert("我是错的");
					this.trueShow = false;
					this.falseShow = true;
					this.moneyFalse = true;
					this.moneyShow = false;
				}

				console.log(this.countDown, "倒计时");
			},
			answerBtn() {

				let _self = this;
				this.answerfun();
				_self.maskShow = false;
				_self.show = 0;
				/*}, 500);*/

			},
			closeGj() {
				this.$router.push('/guesproject/index');
				
			}

		}

	}
</script>

<style>
	@import "/static/css/guesproject/interestAnswer.css";
</style>