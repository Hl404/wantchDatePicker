<template>
	<div class="lunckContainer">
		<div class="lunckContent">
			<div class="lunkTitle">
				<img src="../../../static/img/piaofang.png" />

			</div>
			<div class="lunckBase">
				<div class="luncnk-item">
					<div class="movieText">{{movieText}}</div>
					<div class="lunck-movie"  @click="foChange">
						预估票房<input type="text" v-model="estimate" @focus="change" id="input1">
						<span style="color: #fcec00;">百万</span>

					</div>
					<div class="luncnk-movieTime">
						<div class="luncnkMovie-left">
							预计公布时间： {{formatDate(publictime)}}
						</div>
						<div class="luncnkMovie-right">
							截止时间：{{formatDate(endtime)}}
						</div>
					</div>

					<!--<mt-button @click="lunckBtn()">确认竞猜</mt-button>-->
					<button class="lunckBtn" @click="lunckBtn()" id="wrapperBtn" :class="{active4:show3==5}">
					提交结果
				</button>
				</div>

			</div>

			<!--弹窗-->
			<div class="lunckMask" v-show="lunckShow">
				<div class="lunck-wrapper">
					<div class="lunck-wrapper-relative">
						<i class="lkCsole" @click="lkCsole"></i>
						<p style="color: #bf9100;font-size: 16px;">请输入提交结果的手机号码</p>
						<div class="lunck-wrapper-overflow">
							<label class="wrapper-left">姓名:</label>
							<input type="text" class="wrapper-right" v-model="username" />
						</div>
						<div class="lunck-wrapper-overflow">
							<label class="wrapper-left">手机号码:</label>
							<input type="text" class="wrapper-right" v-model="iphoneNumber" />
						</div>
						<input type="button" class="lunck-wrapperBtn" value="确定提交" @click="wrapperBtn" />
					</div>

				</div>

			</div>

			<!--确定提交-->
			<div class="lunckMask2" v-show="lunckShow2">
				<div class="lunck-wrapper2">
					<div class="lunck-wrapper-relative2">
						<p style="color: #bf9100;font-size: 16px;margin-bottom: 15px;">请确认您提交的信息？</p>
						<p style="margin-bottom: 10px;font-size: 16px;text-align: left;">姓名:<span style="color: red;">{{username2}}</span></p>
						<p style="margin-bottom: 10px;font-size: 16px;text-align: left;">手机号码：<span style="color: red;">{{iphoneNumber2}}</span></p>
						<div class="lunck-wrapper-overflow2">
							<input type="button" class="lunck-wrapperBtn2" value="确定" @click="wrapperBtn2" />
							<input type="button" class="lunck-wrapperBtn3" value="取消" @click="wrapperBtn3" />
						</div>

					</div>

				</div>

			</div>

		</div>

	</div>

</template>

<script>
	import { Toast } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { movieQuestion, movieSub } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import { formatDate } from 'src/utils/date'
	export default {
		data() {
			return {

				isDiseb1: false,
				lunckShow: false,
				lunckShow2: false,
				isDisebTime: false,
				//isDisebTime1: false,
				movieText: "",
				publictime: "",
				endtime: "",
				estimate: "",
				show: "",
				show3: "",
				username: "",
				iphoneNumber: "",
				usernaswer1: "",
				usernaswer2: "",
				currTime1: "",
				currTime2: "",
				username2: "",
				iphoneNumber2: ""
			}

		},
		created() {
			//this.initUserInf();

		},
		computed: {
			...mapState([
				'userInfo'
			])
		},
		mounted() {
			this.movieFun();
			this.initUserInf()
			this.timeValte(),

				this.estimate = this.userInfo.estimate;

		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),

			timeValte() {
				let _thisTime = +new Date()
				//let _OneTime = +new Date('2018-07-1 2:00:00')
				//let _TwoTime = +new Date('2018-07-01 02:00:00')
				let _OneTime = this.endtime;

				if(_OneTime < _thisTime) {
					//alert('第一场时间过期')
					this.show = 1
					this.show3 = "";
					//document.getElementById("input1").disabled = true;
					
				}
			},
			change() {
				//alert(11);
				this.show3 = 5;
				console.log(this.show3, "Aa")

			},
			initUserInf() {
				this.GET_USERINFO();

				//if(Object.prototype.toString.call(this.userInfo) === '[object Object]') {
				if(this.userInfo.estimate) {
					this.show = 1
					this.show3 = "";
					document.getElementById("input1").disabled = true;
				}

				//}

			},
			async movieFun() {
				let movieContent = await movieQuestion();
				console.log(movieContent, "获取题目成功")
				if(movieContent.code == ApiConst.ERROR_SUCCESS) {
					this.movieText = movieContent.data.content;
					this.publictime = movieContent.data.publictime;
					this.endtime = movieContent.data.endtime;
				}
			},
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			},
			async subxpList() {
				let username = this.username;
				let phonenumber = this.iphoneNumber;
				let estimate = this.estimate;
				console.log(username, phonenumber, estimate);
				let ksapBase = await movieSub(username, phonenumber, estimate);
				console.log(ksapBase, "结果")
				if(ksapBase.code == ApiConst.ERROR_SUCCESS) {
					let userinfo3 = {};
					userinfo3.username = this.username;
					userinfo3.phonenumber = this.iphoneNumber;
					userinfo3.estimate = this.estimate;
					this.RECORD_USERINFO(userinfo3);
					this.initUserInf();
					this.show3 = "";
					Toast({
						message: ksapBase.message,
						position: 'middle',
						duration: 5000
					});

				} else if(ksapBase.code == ApiConst.ERROR_FAIL) {
					Toast({
						message: ksapBase.message,
						position: 'middle',
						duration: 5000
					});
				}

			},
			foChange() {
			
				let _thisTime = +new Date()
				//let _OneTime = +new Date('2018-07-1 2:00:00')
				//let _TwoTime = +new Date('2018-07-01 02:00:00')
				let _OneTime = this.endtime;
				if(_OneTime < _thisTime) {
					this.show = 1
					this.show3 = "";
					document.getElementById("input1").disabled = true;
					alert("竞猜已经过期了");
				}
				
				if(this.userInfo.estimate) {
					alert("您已经竞猜过了");
				}

			},
			wrapperBtn() {
				this.username2 = this.username;
				this.iphoneNumber2 = this.iphoneNumber;
				this.lunckShow2 = true;

			},
			lunckBtn() {
				this.lunckShow = this.show3 == 5 ? true : false;
				
				let _thisTime = +new Date()
				//let _OneTime = +new Date('2018-07-1 2:00:00')
				//let _TwoTime = +new Date('2018-07-01 02:00:00')
				let _OneTime = this.endtime;
				if(_OneTime < _thisTime) {
					this.show = 1
					this.show3 = "";
					document.getElementById("input1").disabled = true;
					alert("竞猜已经过期了");
				}

				//this.lunckShow = true;
				if(this.userInfo.estimate) {
					alert("您已经竞猜过了");
				}

			},
			lkCsole() {
				this.lunckShow = false;
			},
			wrapperBtn2() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(!reg.test(this.iphoneNumber)) {
					Toast({
						message: "手机号码格式不对",
						position: 'middle',
						duration: 5000
					});

					return false;
				}
				this.subxpList();
				this.lunckShow = false;
				this.lunckShow2 = false;
			},
			wrapperBtn3() {
				this.lunckShow2 = false;
			}

		}
	}
</script>

<style>
	.lunckContainer {
		position: fixed;
		background: #5b2d99;
		height: 100%;
		overflow: scroll;
	}
	
	.lunkTitle {
		height: 165px;
	}
	
	.lunkTitle img {
		width: 100%;
		height: 165px;
	}
	
	.lunckBase {
		padding: 20px 15px;
	}
	
	.luncnkBox {
		padding: 0 50px;
		position: relative;
		margin-top: 17px;
		height: 120px;
	}
	
	.lunck-movie {
		background: #7c44dd;
		padding: 21px 20px;
		border-radius: 10px;
		font-size: 19px;
		color: #FFFFFF;
		text-align: left;
		margin-top: 15px;
	}
	
	.lunck-movie input {
		width: 100px;
		height: 40px;
		display: inline-block;
		border: 1px solid #FFFFFF;
		border-radius: 5px;
		margin: 0 10px;
		background: #7c44dd;
		color: #fcec00;
		text-align: center;
	}
	
	.luncnk-movieTime {
		overflow: hidden;
		margin-top: 15px;
		color: #FFFFFF;
		font-size: 12px;
	}
	
	.luncnkMovie-left {
		width: 50%;
		float: left;
		text-align: left;
	}
	
	.luncnkMovie-right {
		width: 50%;
		float: right;
		text-align: right;
	}
	
	.movieText {
		color: #FFFFFF;
		text-align: left;
		font-size: 15px;
	}
	
	.lunckBtn {
		display: block;
		width: 100%;
		margin-top: 50px;
		background: #cfcebb;
		color: #000000;
		height: 40px;
		line-height: 40px;
		margin: auto;
		text-align: center;
		font-size: 18px;
		border: none;
		border-radius: 5px;
		margin-top: 40px;
	}
	
	.lunckBase .active4 {
		background: #ede45f;
		color: #000;
	}
	
	.lunckMask {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	
	.lunck-wrapper {
		position: fixed;
		left: 45px;
		right: 45px;
		height: 230px;
		top: 30%;
		background: #daebdc;
		border-radius: 10px;
		padding: 20px 35px;
		z-index: 105;
	}
	
	.lunck-wrapper-relative {
		position: relative;
		z-index: 110;
	}
	
	.lunck-wrapper-overflow {
		overflow: hidden;
		margin-top: 20px;
	}
	
	.wrapper-left {
		width: 60px;
		float: left;
		font-size: 14px;
		color: #a79765;
	}
	
	.wrapper-right {
		width: 130px;
		height: 25px;
		line-height: 25px;
		border-left: none;
		border-top: none;
		border-right: none;
		border-bottom: 1px solid #CCCCCC;
		background: #daebdc;
		font-size: 14px;
	}
	
	.lunck-wrapperBtn {
		display: block;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 17px;
		color: #000;
		border: none;
		margin: 25px auto;
		border-radius: 5px;
		background: #f0b403;
	}
	
	.lkCsole {
		display: block;
		width: 30px;
		height: 30px;
		background: url(../../../static/img/lkClose@2x.png) no-repeat;
		background-size: 30px;
		position: absolute;
		right: -45px;
		top: -30px;
		z-index: 115;
	}
	
	.lunckMask2 {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	
	.wrapperBtn2 {
		display: block;
		width: 120px;
		height: 40px;
		line-height: 40px;
		margin: auto;
		text-align: center;
		font-size: 18px;
		background: #f0b403;
		background: #cac6ba;
		border: none;
		border-radius: 5px;
		margin-top: 40px;
	}
	
	.lunck-wrapper2 {
		position: fixed;
		left: 45px;
		right: 45px;
		height: 240px;
		top: 30%;
		background: #daebdc;
		border-radius: 10px;
		padding: 20px 35px;
		z-index: 105;
		float: left;
	}
	
	.lunck-wrapperBtn2 {
		display: block;
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 17px;
		color: #000;
		border: none;
		margin: 15px auto;
		border-radius: 5px;
		background: #f0b403;
		float: left;
	}
	
	.lunck-wrapperBtn3 {
		display: block;
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 17px;
		color: #000;
		border: none;
		margin: 15px auto;
		border-radius: 5px;
		background: #f0b403;
		float: right;
	}
	
	.lunck-wrapper-overflow2 {
		overflow: hidden
	}
</style>