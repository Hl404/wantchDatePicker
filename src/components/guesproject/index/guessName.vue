<template>
	<div class="wapperGyss">
		<div class="wapper-Content">
			<div class="musicContent">

				<div class="musicBg  ">
					<div class="musicBg-mask" v-show="musicTmie">{{count}}s</div>

				</div>
			</div>

			<div class="music-center">
				<div class="left">{{goldcoin}}</div>
				<div class="audioToggle" @click="audioToggle">
					<!--<div class="" v-show="playShow"></div>-->
					<div :class="'musicSuspend '+ (playClass?'musicPlay':'') "></div>
				</div>

				<div class="right"></div>
			</div>
			<template v-if="answerList.length > 0">
				<div class="music-subject" v-for="(item,index) in answerList" :key="index">

					<p class="header">听音乐选择一个正确答案</p>
					<ul class="music-Ul">
						<li @click="answer($event,item,'A')" :class="{active:show==1}">

							<div class="subject">
								{{item.option1}}

							</div>
						</li>
						<li @click="answer($event,item,'B')" :class="{active:show==2}">
							<div class="subject">
								{{item.option2}}
							</div>
						</li>
						<li @click="answer($event,item,'C')" :class="{active:show==3}" v-if="item.option3">
							<div class="subject">
								{{item.option3}}
							</div>
						</li>
						<li @click="answer($event,item,'D')" :class="{active:show==4}" v-if="item.option4">
							<div class="subject">
								{{item.option4}}
							</div>
						</li>
					</ul>

					<audio id="music" :src="item.content" preload="true" ref="player"></audio>

					<!--	弹窗-->
					<div class="answer-fixed" v-show="maskShow">
					<div class="answerMask" >
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
				<p>暂时没有题目,敬请期待</p>

			</template>
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
	import { unser, anwerType, commitAnwer3 } from 'src/service/getData'
	import { mapState, mapMutations } from 'vuex'
	import login from 'src/plugins/login'
	import { ApiConst } from 'src/utils/mConst'
	import { formatDate } from 'src/utils/date'

	export default {

		data() {
			return {
				pageUrl: "",
				goldcoin: "",
				answerList: [],
				player: "",
				playClass: false,
				musicTmie: false,
				show: "",
				maskShow: false,
				trueShow: true,
				falseShow: false,
				count: "",
				show2: "",
				moneyShow:false,
				moneyFalse:false,
				goldcoinShow:false
			}
		},
		created() {
			//this.MusicUrl = 'http://wantech.oss-cn-hangzhou.aliyuncs.com/20180502/%E9%99%88%E5%A5%95%E8%BF%85%20-%20%E5%8D%95%E8%BD%A6%20(%E9%93%83%E5%A3%B0).mp3'
			this.initUserInf();
		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),

		},
		mounted() {

			this.userCont();
			this.answerfun();

		},
		methods: {
			setTmie(type, status) {

				clearInterval(this.timer);
				const TIME_COUNT = 10;
				if(!type) {
					this.count = TIME_COUNT
				} else {
					if(status === 0) {
						return
					}
				}
				this.timer = setInterval(() => {
					if(this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
						
					} else {
						this.show2 = true;
						clearInterval(this.timer);
						this.timer = null;
						this.maskShow = true;
						this.falseShow = true;
						this.trueShow = false;
						this.moneyFalse=true;
						this.moneyShow=false;
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
					if(this.goldcoin=="0"){
						this.goldcoinShow=true;
					}
					//	alert(1);
				}

			},
			async answerfun() {
				let typeId = this.$route.query.id;
				let anwerlsit = await anwerType(typeId);
				//let anwerlist=await 
				console.log(typeId, anwerlsit, "获取到的");
				if(anwerlsit.code == ApiConst.ERROR_SUCCESS) {
					
					let anwerData = anwerlsit.data.list;
					this.answerList = anwerData;
					this.goldcoin = anwerlsit.data.goldcoin;
					
					//这里不可以、
					this.setTmie();
					this.maskShow = false;
					this.show = 0;
					this.$nextTick(() => {
						let ele = document.getElementById("music");
						console.log(ele, "获取不到你")
						ele.currentTime = 0;
						ele.play();
						this.playClass = true;
						this.musicTmie = true;

					})

					console.log(anwerData, anwerlsit.data.option1, "+++++++题型的data ");
				}else if(anwerlsit.code==ApiConst.ERROR_FAIL&&anwerlsit.data.goldcoin==ApiConst.ERROR_FAIL){
					this.goldcoinShow = true;
				}

			},

			async submitAnwer(id, chat) {
				let subjectid = id;
				let useranswer = chat;
				let typeid = this.$route.query.id;
				console.log(typeid, "typeIdtypeIdtypeIdtypeIdtypeIdtypeIdtypeIdtypeIdtypeId");
				let subAnwer = await commitAnwer3(subjectid, useranswer, typeid);
				if(subAnwer.code == ApiConst.ERROR_SUCCESS) {
					this.goldcoin = subAnwer.data.goldcoin;
					
				}
				//console.log(subAnwer,typeId, "提交答案")

			},
			answer(e, item, chat) {
				//this.dashOffset();
				//获取题目id
				clearInterval(this.timer);
				console.log(item.countdown, "当前的秒数");
				let id = item.id;
				console.log();
				this.submitAnwer(id, chat);
				let anwerTure = item.answer.toLocaleUpperCase();

				if(chat == "a") {
					this.show = 1;
				} else if(chat == "b") {
					this.show = 2;
				} else if(chat == "c") {
					this.show = 3;
				} else if(chat == "d") {
					this.show = 4;
				}
				this.maskShow = true;
				
				//判断题目的对错
				if(anwerTure == chat) {
					//alert("我是对的");
					this.trueShow = true;
					this.falseShow = false;
					this.moneyShow=true;
					this.moneyFalse=false;
				}else {
					this.trueShow = false;
					this.falseShow = true;
					this.moneyShow=false;
					this.moneyFalse=true;
					
				}
				console.log(this.show, "倒计时");
			},
			audioToggle() {
				let ele = document.getElementById("music");
				//这里可以
				console.log(ele)
				//console.log(this.$refs.player.paused())
				if(ele.paused) {
					ele.play();
					this.playClass = true;
					this.musicTmie = true;
					this.setTmie(true, 1);

				} else {

					this.setTmie(true, 0);
					ele.pause();
					this.playClass = false;
					this.musicTmie = false;

				}
			},
			answerBtn() {
				let _self = this;
				this.answerfun();
				
			},
			closeGj(){
				this.$router.push('/guesproject/index');
			}

		},

	}
</script>

<style>
	@import "/static/css/guesproject/gussName.css";
</style>