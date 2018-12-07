<template>
	<div class="lunckContainer">
		<div class="lunckContent">
			<div class="lunkTitle">
				<img src="../../../static/img/sjLunck.png" />

			</div>
			<div class="lunckBase">
				<div class="luncnk-item">
					<p style="color: #a79765;font-size: 15px;">第一场</p>

					<div class="luncnkBox">
						<p style="color: #d6d59d;font-size: 15px;">VS</p>
						<p style="color: #a79765;font-size: 12px;">7月11日 02:00</p>
						<ul class="lunckUi">
							<li :ref="'li_1'" class="luncnk-left" @click="handClick('show',1,'法国')" :class="{active:show==1}">
								<img src="../../../static/img/faguo@2x.png" />
								<input type="button" v-model="cel_1.name_1" id="input1" />

							</li>
							<li :ref="'li_2'" class="luncnk-right" @click="handClick('show',2,'比利时')" :class="{active1:show==2}">
								<img src="../../../static/img/bilishi.png" />
								<input type="button" v-model="cel_1.name_2" id="input2" />
							</li>
						</ul>
					</div>

				</div>
					<div class="luncnk-item">
					<p style="color: #a79765;font-size: 15px;">第二场</p>

					<div class="luncnkBox">
						<p style="color: #d6d59d;font-size: 15px;">VS</p>
						<p style="color: #a79765;font-size: 12px;">7月12日 02:00</p>
						<ul class="lunckUi2">
							<li :ref="'li_1'" class="luncnk-left" @click="handClick('show1',1,'克罗地亚')" :class="{active2:show1==1}">
								<img src="../../../static/img/kldiya.png" />
								<input type="button" v-model="cel_1.name_3" id="input3" />

							</li>
							<li :ref="'li_2'" class="luncnk-right" @click="handClick('show1',2,'英格兰')" :class="{active3:show1==2}">
								<img src="../../../static/img/ygelan.png" />
								<input type="button" v-model="cel_1.name_4" id="input4" />
							</li>
						</ul>
					</div>

				</div>
				<button class="lunckBtn" @click="lunckBtn(5)" id="wrapperBtn" :class="{active4:show3==5}">
					提交结果
				</button>
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
	import { subxpList } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import { formatDate } from 'src/utils/date'
	export default {
		data() {
			return {
				isDiseb: false,
				isDiseb1: false,
				lunckShow: false,
				lunckShow2: false,
				isDisebTime: false,
				isDisebTime1: false,
				cel_1: {
					name_1: '法国',
					name_2: '比利时',
					name_3:'克罗地亚',
					name_4:'英格兰'
				},
				show: "",
				show1:"",
				show3: "",
				username: "",
				iphoneNumber: "",
				usernaswer1: "",
				usernaswer2: "",
				currTime1: "",
				currTime2: "",
				username2:"",
				iphoneNumber2:""
			}

		},
		created() {

		},
		computed: {
			...mapState([
				'userInfo'
			])
		},
		mounted() {
			this.initUserInf()
			this.timeValte()

		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),

			timeValte() {
				let _thisTime = +new Date()
				let _OneTime = +new Date('2018-07-11 02:00:00'.replace(/-/g, "/"))
				let _TwoTime = +new Date('2018-07-12 02:00:00'.replace(/-/g, "/"))

				if(_OneTime < _thisTime) {
					//alert('第一场时间过期')
					this.isDiseb = true
					this.isDisebTime = true
				}
				if(_TwoTime < _thisTime){
					//alert('第二场时间过期')
					this.isDiseb1 = true
					this.isDisebTime1 = true
				}
				if(_OneTime < _thisTime&&_TwoTime < _thisTime){
					//alert('第一场与第二场时间都过期')
					this.isDiseb1 = true
					this.isDisebTime1 = true
					this.isDiseb = true
					this.isDisebTime = true
				}
			},

			initUserInf() {
				//console.log(this);
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();

				if(Object.prototype.toString.call(this.userInfo) === '[object Object]') {
					if(this.userInfo.usernaswer1 == '法国') {
						this.show = 1
						this.isDiseb = true
						this.cel_1.name_1 = '法国'
						this.usernaswer1 = '法国'
						console.log(this.usernaswer1)
					}
					if(this.userInfo.usernaswer1 == '比利时') {
						this.show = 2
						this.isDiseb = true
						this.cel_1.name_2 = '比利时'
						this.usernaswer1 = '比利时'
						console.log(this.usernaswer1)
					}
					if(this.userInfo.usernaswer2 == '克罗地亚'){
						this.show1 = 1
						this.isDiseb1 = true
						this.cel_1.name_3 = '克罗地亚'
						this.usernaswer2 = '克罗地亚'
						
					}
					if(this.userInfo.usernaswer2 == '英格兰'){
						this.show1 = 2
						this.isDiseb1 = true
						this.cel_1.name_4= '英格兰'
						this.usernaswer2 = '英格兰'
					}
					
					if(this.userInfo.usernaswer2 &&this.userInfo.usernaswer1 ){
						this.show3 = '';
					}
				}

			},

			handClick(classname, num, event) {
				this.timeValte()

				if(this.isDisebTime && this.isDisebTime1) {
					alert('比赛已经过期。')
					return
				}
				if(classname == 'show') {
					if(this.isDiseb) {
						if(this.isDisebTime) {
							alert('比赛已经过期。')
						} else {
							alert('你已经竞猜了 ，不能再选择了。')
						}

						return
					}
					this.usernaswer1 = event;
				}
					if(classname == 'show1'){
						if(this.isDiseb1) {
							if(this.isDisebTime1){
								alert('比赛已经过期。')
							}else{
								alert('你已经竞猜了 ，不能再选择了。')
							}
							
							return
						}
						this.usernaswer2 = event;
					}

				this[classname] = num
				this.show3 = 5;
			},
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			},
			async subxpList() {
				
				let username = this.username;
				let phonenumber = this.iphoneNumber;
				let usernaswer1 = this.usernaswer1;
				let usernaswer2 = this.usernaswer2;
				console.log(username, phonenumber, usernaswer1, usernaswer2);
				let ksapBase = await subxpList(username, phonenumber, usernaswer1, usernaswer2);
				console.log(ksapBase, "结果")
				if(ksapBase.code == ApiConst.ERROR_SUCCESS) {
					let userinfo3 = {};
					userinfo3.username = this.username;
					userinfo3.phonenumber = this.iphoneNumber;
					userinfo3.usernaswer1 = this.usernaswer1;
					userinfo3.usernaswer2 = this.usernaswer2;

					this.RECORD_USERINFO(userinfo3);
					this.initUserInf();
					this.show3 = 0;
					Toast({
						message: ksapBase.message,
						position: 'middle',
						duration: 5000
					});
					console.log("我进来了")
				} else if(ksapBase.code == ApiConst.ERROR_FAIL) {
					Toast({
						message: ksapBase.message,
						position: 'middle',
						duration: 5000
					});
				}

			},

			wrapperBtn() {
				this.username2 = this.username;
				this.iphoneNumber2 = this.iphoneNumber;
				this.lunckShow2 = true;

			},
			lunckBtn() {

				this.lunckShow = this.show3 == 5 ? true : false;

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
		background: #157e1f;
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
		padding: 20px;
	}
	
	.luncnkBox {
		padding: 0 50px;
		position: relative;
		margin-top: 17px;
		height: 120px;
	}
	
	.luncnk-left {
		width: 70px;
		position: absolute;
		left: 40px;
		top: 0;
		z-index: 0;
	}
	
	.luncnk-right {
		width: 70px;
		position: absolute;
		right: 40px;
		top: 0;
		z-index: 0;
	}
	
	.luncnk-left img,
	.luncnk-right img {
		width: 50px;
		height: 50px;
		margin: auto;
	}
	
	.lunckUi li input {
		display: block;
		width: 70px;
		height: 30px;
		border-radius: 5px;
		text-align: center;
		line-height: 30px;
		background: #cac6ba;
		margin-top: 10px;
		font-size: 15px;
		border: none;
	}
	
	.lunckUi2 li input {
		display: block;
		width: 70px;
		height: 30px;
		border-radius: 5px;
		text-align: center;
		line-height: 30px;
		background: #cac6ba;
		margin-top: 10px;
		font-size: 15px;
		border: none;
	}
	
	.lunckUi .active #input1 {
		background: #f0b403;
		color: #666666;
	}
	
	.lunckUi .active1 #input2 {
		background: #f0b403;
		color: #666666;
	}
	
	.lunckUi2 .active2  #input3{
		background: #f0b403;
		color: #666666;
	}
	
	.lunckUi2 .active3 #input4{
		background: #f0b403;
		color: #666666;
	}
	/*	.luncnk-left  .active,
	.luncnk-right .active {
		
	}*/
	
	.lunckBtn {
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
	
	.lunckBase .active4 {
		background: #f0b403;
		color: #666666;
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