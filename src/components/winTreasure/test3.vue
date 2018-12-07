<template>
	<div class="wapper1">
		<div class="awardContent">
			<el-amap vid="amap" :plugin="plugin" class="amap-demo" style="display: none;">
			</el-amap>
			<p style="font-size: 12px;color: #555555;">当前定位城市</p>
			<p style="margin: 20px 0;font-size: 18px;color: #000000;">
				<div class="toolbar">
					<span v-if="mapLoaded">
         		 <!--location: lng = {{ lng }} lat = {{ lat }}-->
         			 {{address}}
        				</span>
					<span v-else>正在定位中</span>
				</div>
			</p>
			
			<router-link :to="{name:'storeselect',query:{userId:2}}" class="qiehuan">切换商家</router-link>
		</div>
		<div class="wapper-Content">
			<div class="wapper-header">
				<span class="wapper-header-img">
					<img :src="pageUrl"/>
				</span>
				<div class="wapper-header-right ">
					<div class="left">{{goldcoin}}</div>
					<div class="right">
						<router-link to="/guesproject/answerRecordTwo" class="span recharge">答题记录</router-link>
						<!--<router-link to="/member/register" class="span">注册</router-link>-->
					</div>
				</div>
			</div>
			<!--<full-page-slide :data="answerList" @finish="finish">-->
			<div class="wapper-center">

				<div class="publishMask" v-show="publishShow">
					<div class="publishMask-content">
						<div class="publishMask-relative">
							<div class="titleImg"></div>

							<p class="title2">本题公布依据来源于{{dailogData.sitename}}网站 </p>
							<p class="title3">依据网址:{{dailogData.evidence}}</p>
							<div class="title4"><input type="text" name="" disabled="disabled" v-model="dailogData.evidence" id="contents" /></div>
							<button class="publishBtn" type="button" @click="copyToClipboard" id="publishBtn">复制网址</button>
							<span class="closexx" @click="publishShow = false"></span>
						</div>
					</div>
				</div>

				<template v-if="answerList.length > 0">
					<div class="answer-content-item" v-for="(item,index) in answerList" :key="index">

						<p class="answer-tm" v-html="item.guessQuestion.content">{{item.guessQuestion.content}}</p>
						<div class="answer-time">
							<span class="left">预计公布时间：{{!item.guessQuestion.publictime?"待定":formatDate(item.guessQuestion.publictime)}}</span>
							<span class="right" @click="basisGb(item.guessQuestion)">公布依据</span>
						</div>
						<div class="answerMenu">
							<ul>
								<li :ref="'li_1'+index" @click="answer($event,item,'A',index,'li_1')" :class="{active:show==index+'.1'}">
									<!--:class="{active:show==1}"-->
									<span class="option">A</span>
									<div class="answerOption">
										<span class="left">{{item.guessQuestion.option1}}</span>
										<span class="right">奖励×{{item.guessQuestion.odds1}}倍</span>
									</div>
								</li>
								<li :ref="'li_2'+index" @click="answer($event,item,'B',index,'li_2')" :class="{active:show==index+'.2'}">
									<span class="option">B</span>
									<div class="answerOption">
										<span class="left">{{item.guessQuestion.option2}}</span>
										<span class="right">奖励×{{item.guessQuestion.odds2}}倍</span>
									</div>
								</li>
								<li :ref="'li_3'+index" @click="answer($event,item,'C',index,'li_3')" :class="{active:show==index+'.3'}" v-if="item.guessQuestion.option3">
									<span class="option">C</span>
									<div class="answerOption">
										<span class="left">{{item.guessQuestion.option3}}</span>
										<span class="right">奖励×{{item.guessQuestion.odds3}}倍</span>
									</div>
								</li>
								<li :ref="'li_4'+index" @click="answer($event,item,'D',index,'li_4')" :class="{active:show==index+'.4'}" v-if="item.guessQuestion.option4">
									<span class="option">D</span>
									<div class="answerOption">
										<span class="left">{{item.guessQuestion.option4}}</span>
										<span class="right">奖励×{{item.guessQuestion.odds4}}倍</span>
									</div>
								</li>
							</ul>
						</div>

						<div class="answerBet" :ref="'Tan'+index" :style="'height:'+ item.flag">
							<template v-if="item.record">
								<div class="betLeft">
									<div class="tzXuan" v-if="item.record.useranswer">选项:{{item.record.useranswer.toLocaleUpperCase()}}</div>
									<div class="jinD">金豆:{{item.record.wager}}</div>
								</div>

								<span class="btAnswerTz">已投注</span>
							</template>
							<template v-else>
								<ul>
									<li v-for="(itemlsit,i) in wagerList" @click="tzMoney($event,index,i)" :class="{active:show1==index+'.'+i}">{{itemlsit}}</li>
									<!--<li @click="tzMoney($event,'2')" :class="{active:show1==2}"></li>
								<li @click="tzMoney($event,'3')" :class="{active:show1==3}"></li>-->
								</ul>
								<span class="answerTz" @click="betting($event,'投注了')"  >立即投注</span>
							</template>
						</div>
						<p class="answerEnd">截止时间：{{formatDate(item.guessQuestion.endtime)}}</p>
						<!--	弹窗-->
						<div class="answerMage"  v-show="maskShow">
						
						<div class="answerMask">
							<div class="answerMask-dw">

								<p class="true">{{message}}</p>
								
								<span class="answerBtn" @click="answerBtn">确定</span>
							</div>
						</div>
						</div>

					</div>
				</template>
				<template v-else>

					<p>暂时没有题目,敬请期待</p>
				</template>

			</div>
			<!--积分不足-->
			<div class="goldcoinMask" v-show="goldcoinShow">
				<div class="goldcoinCont">
					<div class="goldcoinCont-relative">
						<p class="titleJ">抱歉，您的积分不足</p>

						<!--<router-link to="/guesproject/recharge" class="goldcoinBtn">
							充值
						</router-link>-->

						<span class="closeGj" @click="closeGj()">
							
						</span>
					</div>

				</div>
			</div>

			<!--</full-page-slide>-->
		</div>

		<!--绑定手机号码-->
		<div class="register-box" v-show="maskContent">

			<div class="register-content">
				<div class="register-relative">
					<span class="registClose" @click="registClose"></span>

					<div class="register-content-header">
						手机号验证
					</div>
					<div class="register-from">
						<div class="register-from-item ">
							<a class="mint-cell mint-field">
								<div class="mint-cell-left"></div>
								<div class="mint-cell-wrapper">

									<div class="mint-cell-value">
										<input type="number" @focus="numberShow = true" class="mint-field-core" placeholder="请输入手机号码" v-model="bindIphone">
										<div class="mint-field-clear" @click="bindIphone = ''" v-show="numberShow && bindIphone">
											<i class="mintui mintui-field-error"></i></div>
										<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
										<div class="mint-field-other"></div>
									</div>

								</div>
								<div class="mint-cell-right"></div>
							</a>

						</div>
						<div class="register-from-item " style="margin-top: 10px;">
							<a class="mint-cell mint-field regYzm">
								<div class="mint-cell-left"></div>
								<div class="mint-cell-wrapper">

									<div class="mint-cell-value">
										<input type="number" @focus="authShow = true" class="mint-field-core" placeholder="验证码" v-model="authCode">
										<div class="mint-field-clear" @click="authCode = ''" v-show="authShow && authCode">
											<i class="mintui mintui-field-error"></i></div>
										<span class="mint-field-state is-default">
									<i class="mintui mintui-field-default"></i></span>
										<div class="mint-field-other"></div>
									</div>

								</div>
								<div class="mint-cell-right">

								</div>

								<!--<span v-show="!codeshow" class="yzm">{{count}} 秒</span>-->
							</a>
							<button :disabled="disabled" class="yzm" @click="getCode">{{btntxt}}</button>
						</div>

						<div class="register-buttonCont">
							<mt-button @click="mobileBtn" :disabled="!bindIphone  || !authCode">确认授权</mt-button>
							<!--<p class="status">登录即为同意<span>《万天互娱用户协议》</span></p>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox, Loadmore, Toast ,Picker,Indicator} from 'mint-ui';
	import { VueClipboard } from 'vue-clipboard2'
	import { unser, anwerType2, commitAnwer2, getMobile, authCode, mobileCode, pointUser ,dsAddress} from 'src/service/getData'
	import { mapState, mapMutations } from 'vuex'
	import login from 'src/plugins/login'
	import { ApiConst } from 'src/utils/mConst'
	import { formatDate } from 'src/utils/date'

	export default {
	
		data() {
			let self = this;
			return {
				myAddressProvince: '',
				myAddressCity: '',
				mapLoaded: false,
				disabled: false,
				time: 0,
				btntxt: "获取验证码",
				bindIphone: '',
				authCode: '',
				numberShow: false,
				authShow: false,
				maskContent: false,
				pageUrl: "",
				goldcoin: "",
				answerList: [],
				wagerList: [],
				show: "",
				show1: "",
				id: "",
				option1: "",
				goldcoinJ: "",
				maskShow: false,
				message: "",
				allLoaded: false,
				tzShow: false,
				flag: "",
				goldcoinShow: false,
				publishShow: false,
				mch_id: '',
				dailogData: {
					evidence: ''
				},
				dsP0: [], // 定位经纬度
				shopHasGeted: false, // 是否已经获取过商铺信息
				plugin: [{
					pName: 'Geolocation',
					events: {
						init(o) {

							
							Indicator.open({
								text: '定位中...',
								spinnerType: 'fading-circle'
							});
							// o 是高德地图定位插件
							o.getCurrentPosition((status, result) => {
								console.log(result, "位置");
								
								if(result && result.position) {
									self.lng = result.position.lng;
									self.lat = result.position.lat;
									self.dsP0 = [self.lng, self.lat];
									self.center = [self.lng, self.lat];
									self.address = result.addressComponent.city;
									self.mapLoaded = true;									
									Indicator.close();
								} else {
									// 失败
								}
							});
						}
					}
				}]
			}
		},
		created() {

			this.initUserInf();
		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			])

		},
		mounted() {
			this.userRecordfunction();
			this.myAddressProvince = "广东省";
			this.myAddressCity = "深圳市";
		
			if (this.iflogin) {
				this.userCont();
				this.mapLoaded && this.addressCont();
			} else {
				login(this, () => {
					this.mapLoaded && this.addressCont();
				});
			}
//			if(this.iflogin == true) {
//				this.userCont();
//				this.answerfun();
//			} else {
//				login(this);
//			}

			//获取下注值

		},
		methods: {
			
			copyToClipboard() {

				const range = document.createRange();
				var Url2 = document.getElementById("contents").innerHTML;
				var oInput = document.createElement('input');
				oInput.value = Url2;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				oInput.className = 'oInput';
				oInput.style.display = 'none';
				alert("请手动复制来源网址")
				//ios兼容复制粘贴
				if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //ios  
					var copyDOM = document.querySelector('#contents'); //要复制文字的节点    
					range.selectNode(copyDOM);
					window.getSelection().addRange(range);
					var successful = document.execCommand('copy');
					document.execCommand('copy');
					try {
						var msg = successful ? 'successful' : 'unsuccessful';
						alert("复制成功！");
						console.log('copy is' + msg);
					} catch(err) {
						console.log('Oops, unable to copy');
						alert("复制失败");
					}
					window.getSelection().removeAllRanges();
				} else {
					console.log("android不支持此方式复制");
				}

			},
			finish() {
				this.$router.back()
			},
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),
			prev() {

				alert(11)
			},
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

			},
			async addressCont() {
				if (this.shopHasGeted) {
					return;
				}
				
				this.shopHasGeted = true;
				
				let province = this.myAddressProvince;
				let city = this.myAddressCity;
				let dsLatitude = await dsAddress(province, city);
				console.log(dsLatitude, "经纬度")
				
				if(dsLatitude.code !== ApiConst.ERROR_SUCCESS) {
					// 获取名店信息失败
					return;
				}
					
				let returnArr = dsLatitude.data;
				for(let i=0; i<returnArr.length; i++) {
					let shop = returnArr[i];
					let sortLine = AMap.GeometryUtil.distance(this.dsP0, [shop.shopLng, shop.shopLat]);
					shop.sortLine = sortLine;
				}
				returnArr.sort(function(a, b) {
					return a.sortLine - b.sortLine;
				})

				console.log('returnArr', returnArr);
				var srcStr = localStorage.getItem("mch_id");
				console.log(srcStr,"本地存储的值")
				if(srcStr){
					this.mch_id = srcStr;
				}else{
					this.mch_id = returnArr[0].shopId;
				}
				if(this.mch_id) {
					
					this.answerfun();
				}
				
				console.log(returnArr, this.mch_id, "排序过后")
			},
			async userRecordfunction(remark) {
				let memberid = this.userInfo.uid;
				let content = this.$route.path;
				if(remark) {
					remark = this.$route.meta.title + "&" + remark;

				} else {
					remark = this.$route.meta.title;
				}
				let pointContent = await pointUser(memberid, content, remark);
				console.log(pointContent, "用户点击")
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
					_self.goldcoin = userInfoData.mp;

					//	alert(1);
				}

			},
			async answerfun() {

				let offset = this.$route.query.offset;
				let	 mch_id = this.mch_id;
				console.log(offset, "wwwwwwwwwwwwwwwwwwwwww")
				let anwerlsit = await anwerType2(mch_id);
				console.log(anwerlsit, "获取到的");
				if(anwerlsit.code == ApiConst.ERROR_SUCCESS) {
					anwerlsit.data.resultList.map((e) => {
						e.flag = 0
					});
					//console.log(answerList.data,"++++++")
					this.goldcoin = anwerlsit.data.mp;
					let anwerData = anwerlsit.data.resultList;
					let wagerData = anwerlsit.data.subject;
					this.answerList = anwerData;
					this.wagerList = wagerData.wager.split(",");;
					console.log(anwerData, anwerlsit.data.content, "ijehri wqher oiqhj eoiqh oieqh ");
				}

			},
			async submitAnwer() {
				let subjectid = this.id;
				let useranswer = this.option1;
				let wager = this.goldcoinJ;
				let subAnwer = await commitAnwer2(subjectid, useranswer, wager);
				console.log(subjectid, useranswer, wager, subAnwer, "提交答案")
				if(subAnwer.code == ApiConst.ERROR_SUCCESS) {

					this.message = subAnwer.data.status;
					this.goldcoin = subAnwer.data.mp;

				} else if(subAnwer.code == ApiConst.ERROR_FAIL) {
					this.message = subAnwer.data;
				}

			},
			answer(e, item, chat, index, ele) {

				let Elmemnt = this.$refs[ele + index][0];
				this.id = item.guessQuestion.id;
				console.log(item, "当前item")
				let el = this.$refs['Tan' + index];
				this.answerList.map((e) => {
					e.flag = 0;
				})
				if(chat == "A") {
					this.option1 = "A";
					this.show = index + '.1';
					this.goldcoinJ = "";
					this.answerList[index].flag = this.answerList[index].flag == 0 ? 'auto' : 0;
				} else if(chat == "B") {
					this.show = index + '.2';
					this.goldcoinJ = "";
					this.option1 = "B";
					this.answerList[index].flag = this.answerList[index].flag == 0 ? 'auto' : 0;
				} else if(chat == "C") {
					this.show = index + '.3';
					this.goldcoinJ = "";
					this.option1 = "C";
					this.answerList[index].flag = this.answerList[index].flag == 0 ? 'auto' : 0;
				} else if(chat == "D") {
					this.show = index + '.4';
					this.option1 = "D";
					this.goldcoinJ = "";
					this.answerList[index].flag = this.answerList[index].flag == 0 ? 'auto' : 0;
				} else {
					this.show = 0;
				}
				if(Elmemnt.classList.contains('active')) {
					Elmemnt.classList.remove('active')
					this.answerList[index].flag = 0

				} else {
					this.answerList[index].flag = 'auto'
					Elmemnt.classList.add('active')
				}

			},
			async isMobile() {
				let mobileStatus = await getMobile();
				if(mobileStatus.code == ApiConst.ERROR_SUCCESS) {
					if(this.goldcoin < this.goldcoinJ) {
						//this.maskShow = true;
						this.goldcoinShow = true;
					} else {
						this.maskShow = true;
						this.show = 0;
						this.submitAnwer();
					}
				} else {
					this.maskContent = true;
					console.log("您没有绑定手机号码");
				}

			},
			async mobileCodeData() {
				let mobile = this.bindIphone;
				
				let mobileYzm = await mobileCode(mobile);
				console.log(mobileYzm, "手机验证码")
				if(mobileYzm.code == ApiConst.ERROR_SUCCESS) {
					Toast({
						message: mobileYzm.data,
						position: 'middle',
						duration: 2000
					})

				} else {
					Toast({
						message: mobileYzm.data,
						position: 'middle',
						duration: 2000
					})
				}
				//console.log(mobileYzm, "11111111111111");
			},
			async authcodeData() {
				let mobile = this.bindIphone;
				let code = this.authCode;
				let authCont = await authCode(mobile, code);
				if(authCont.code == ApiConst.ERROR_SUCCESS) {
					this.goldcoin = authCont.data.mp;
					//				
					this.maskContent = false;
					let toBindMp = authCont.data.bindMp;
					let thisMessage = "绑定手机成功,系统赠送" + toBindMp + "积分";

					Toast({
						message: thisMessage,
						position: 'middle',
						duration: 2000
					})

				} else {
					this.maskContent = true;
					Toast({
						message: authCont.data,
						position: 'middle',
						duration: 2000
					})

				}
				console.log(authCont, "11111111111111");
			},

			getCode() {
				console.log("Wwwwwwwwwwwwwwwwwww")
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;

				if(!reg.test(this.bindIphone)) {

					Toast({
						message: '手机格式不正确',
						position: 'middle',
						duration: 2000
					})
					return false;
				} else {
					this.time = 60;
					this.disabled = true;
					this.timer();
					this.mobileCodeData();

				}

				//this.timer();
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s后重新获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
				}
			},

			mobileBtn() {
				this.authcodeData();
			},
			tzMoney($event, num, i) {
				console.log($event.currentTarget.innerHTML)
				//				if(i == "1") {
				this.show1 = num + '.' + i;
				this.goldcoinJ = $event.currentTarget.innerHTML;

			},
			betting($event,conent) {
				let remark = conent;
				
				this.userRecordfunction(remark);
				if(navigator.onLine == false) {

					Toast({
						message: '网络超时，请检查您的网络设置！',
						position: 'middle'
					})
				}
				this.isMobile();

				//	this.submitAnwer();
			},
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			},
			answerBtn() {
				this.answerfun();
				this.maskShow = false;
			},
			closeGj() {
				this.goldcoinShow = false;

			},
			basisGb(item) {
				this.publishShow = true;
				this.dailogData = item;
			},

			registClose() {
				this.maskContent = false;
			},
		},
		watch: {
			dsP0: {
				deep: true,
				handler: function(newPos) {
//					console.log('地址发生变动', newPos)
					if (this.iflogin) {
						this.addressCont();
					} else {
						login(this, () => {
							this.addressCont();
						});
					}
				}
			}
		}

	}
</script>

<style>
	@import "/static/css/guesproject/interestCompet.css";
</style>