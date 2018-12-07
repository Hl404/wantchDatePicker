<br /><template>
	<div class="awardRotate">

		<!--<img v-for="(item,index) in turnplate.img" :src="item" :id="'img-'+index" style="display:none; height: 30px; width: 30px;" />-->

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
			<div class="awardMoney">
				{{dbmoney}}
			</div>
			<router-link :to="{name:'storeselect',query:{userId:1}}" class="qiehuan">切换商家</router-link>
		</div>
		<div class="banner">
			<div class="turnplate">
				<canvas class="item" id="wheelcanvas" width="420px" height="420px"></canvas>
				<span class="pointer" @click="pointer($event)" data-value="开始游戏按钮" ref="point">
					<img  src="../../../static/img/jiantou@2x.png"  />
				</span>

			</div>

			<div class="boxShaw"></div>
		</div>
		<div class="awardButton">

			<div class="awardbtmLeft" @click="knapBtn($event)" data-value="打开我的背包按钮" ref="beibao">
				我的背包
			</div>
			<div class="awardbtmRight" @click="yxGz($event)" data-value="查看游戏规则" ref="guiz">
				游戏规则
			</div>
		</div>

		<!--夺宝成功弹窗-->
		<div class="awardDb" v-show="dbShow">
			<div class="dbContent">
				<div class="dbContent-relateive">
					<p class="titledb">夺宝成功</p>
					<p class="conbtent">{{dbTrueShop}}</p>
					<!--<p><img :src="dbTrueimg" style="width: 40px;height: 40px;"/></p>-->
					<div class="dbBtn">
						<button class="dbBtnleft" @click="jxWard($event)" data-value="使用积分继续玩按钮" ref="jifen">{{mp}}积分再玩一次</button>
						<button class="dbBtnright" @click="dbClose($event)" data-value="玩游戏成功确定按钮" ref="center">确定</button>
					</div>
				</div>

			</div>

		</div>
		<!--游戏规则弹窗-->
		<div class="awardMaskGz" v-show="awardGzshow">
			<div class="awardGz">
				<div class="awardGz-relative">
					<span class="gzClose" @click="awardClose($event)" data-value="关闭夺宝游戏规则说明" ref="awardclose"></span>
					<h1 class="awardGzTie">欢乐夺宝规则说明</h1>
					<div class="awardGz-content">

						<p class="awardText" v-html="dbGzContent">{{dbGzContent}}</p>
						<!--<p class="awardText">2、一个口袋中装有完全一样的8个球。</p>
					<p class="awardText">3、一个口袋中装有完全一样的8个球。</p>-->
					</div>
				</div>
			</div>
		</div>

		<!--我的背包弹窗-->
		<div class="knapMask" v-show="knapShow">

			<div class="knapContent">
				<div class="knap-relateive">
					<span class="knapClose" @click="knapClose($event)" data-value="关闭我的背包" ref="knpclose"></span>
					<div class="knapTitle" @click="dhSm" data-value="打开兑换说明的弹窗" ref="dhshuo">
						<img src="/static/img/dbbeibao@2x.png" />

					</div>
					<div class="knapBase">
						<div v-if="ksapArr.length>0">
							<ul>
								<li v-for="(item,index) in ksapArr" @click="knapCode($event,item,'核销商品')">
									<div class="licur" v-if="item.status=='1'">

										<div class="knapBaseBg">
											<div class="knapImg"><img :src="item.goodimage" /></div>
											<div class="knapDblsit">
												<p class="dbtitle">夺宝物品</p>
												<p class="dbRecord">商品名称：<span class="dbcorlor">{{item.goodname}}</span></p>
												<p class="dbRecord">夺宝时间：{{formatDate(item.createtime)}}</p>
											</div>
											<i class="dbRicon"></i>
										</div>

									</div>
									<div class="licur2" v-else>

										<div class="knapBaseBg2">
											<div class="knapImg"><img :src="item.goodimage" /></div>
											<div class="knapDblsit">
												<p class="dbtitle">夺宝物品</p>
												<p class="dbRecord">商品名称：<span class="dbcorlor">{{item.goodname}}</span></p>
												<p class="dbRecord">夺宝时间：{{formatDate(item.createtime)}}</p>
											</div>
											<i class="dbRicon"></i>
										</div>

									</div>
								</li>

							</ul>
						</div>
						<div v-else>
							<p style="color: #fda110;margin-top: 20%;font-weight: bold;">没有商品，快去夺宝吧</p>
						</div>
					</div>

				</div>

			</div>
		</div>

		<!--商品核销码-->
		<div class="writeMask" v-show="writeShow">
			<div class="write-Content">
				<div class="write-relative">
					<span class="knapClose" @click="hxClose($event)" data-value="关闭核销商品二维码弹窗" ref="hexEr"></span>
					<div class="knapBaseBg">
						<div class="knapImg"><img :src="hxImg" /></div>
						<div class="knapDblsit">
							<p class="dbtitle">夺宝物品</p>
							<p class="dbRecord">夺宝时间：{{formatDate(hexTime)}}</p>
						</div>

						<canvas id="qrccode-canvas" width="50px" height="50px"></canvas>
					</div>
				</div>
			</div>

		</div>

		<!--兑换说明-->
		<div class="explainMask" v-show="explainShow">
			<div class="explain-Content">
				<div class="explain-relative">
					<span class="knapClose" @click="knapSm($event)" data-value="关闭核销商品二维码弹窗" ref="hexEr"></span>
					<p style="text-align: center;margin-bottom: 10px;height: 30px;line-height: 30px;">兑换规则</p>
					<div class="knapBaseBg">

						<p v-html="knaptext">{{knaptext}}</p>

					</div>
				</div>
			</div>

		</div>
		<!--积分不足-->
		<div class="goldcoinMask" v-show="goldcoinShow">
			<div class="goldcoinCont">
				<div class="goldcoinCont-relative">
					<p class="titleJ">抱歉，您的积分不足</p>
					<!--<router-link to="/guesproject/recharge" class="goldcoinBtn">
							充值
						</router-link>-->

					<span class="closeGj" @click="closeGj($event)" data-value="关闭积分不足弹窗" ref="gbJfen">
							
						</span>
				</div>

			</div>
		</div>

		<!--绑定手机号码-->
		<div class="register-box" v-show="maskContent">

			<div class="register-content">
				<div class="register-relative">
					<span class="registClose" @click="registClose" data-value="关闭手机号码绑定弹窗" ref="gbMobile"></span>

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
										<div class="mint-field-clear" @click="authCode = ''" v-show="authShow && authCode" style="margin-right: 120px;">
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
							<button :disabled="disabled" class="yzm" @click="getCode($event)" data-value2="获取验证码按钮" ref="hqcode">{{btntxt}}</button>

						</div>

						<div class="register-buttonCont" @click="mobileBtn($event)" data-value3="手机授权按钮" ref="mobilen">
							<mt-button :disabled="!bindIphone  || !authCode">确认授权</mt-button>
							<!--<p class="status">登录即为同意<span>《万天互娱用户协议》</span></p>-->
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { Field, Picker, Toast, Indicator } from 'mint-ui';
	import QRCode from 'qrcode';
	import { myfun } from 'src/plugins/awardRotate'
	import { mapState, mapMutations } from 'vuex'
	import { dbmodity, prizeCont, reduceCont, knapCont,  lottery, getMobile, authCode, mobileCode, pointUser, dsAddress } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import { formatDate } from 'src/utils/date'
	var canvas = '';
	export default {
		data() {
			let self = this;
			return {
				myAddressProvince: '',
				myAddressCity: '',
				mapLoaded: false,
				maskContent: false, //手机号码检测
				goldcoinShow: false,
				dbShow: false,
				awardGzshow: false,
				knapShow: false,
				writeShow: false,
				explainShow: false,
				disabled: false,
				time: 0,
				btntxt: "获取验证码",
				bindIphone: '',
				authCode: '',
				numberShow: false,
				authShow: false,
				turnplate: {
					restaraunts: [],
					colors: [],
					img: [],
					id: [],
					type: [],
					outsideRadius: 185,
					textRadius: 155,
					insideRadius: 70,
					startAngle: 0,
					bRotate: false
				}, //商品内容对象
				dbTrueShop: '',
				dbTrueimg: '',
				dbmoney: '',
				mp: '',
				ksapArr: [],
				dbGzContent: '',
				knaptext: '',
				hexTime: '',
				hxImg: '',
				zjShop: '',
				mch_id: '',
				codeUrl: 'https://wxweb.wantech99.com/#/winTreasure/login?',
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
				//codeUrl: 'http://ngrok.szwantech.com/#/winTreasure/login?'
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
		components: {
			myfun
		},
		mounted() {
			this.userRecordfunction();
			this.myAddressProvince = "广东省";
			this.myAddressCity = "深圳市";
			
			
				canvas = document.getElementById('qrccode-canvas');
			
			// 
			if (this.iflogin) {
				
				this.mapLoaded && this.addressCont();
			} else {
				login(this, () => {
					this.mapLoaded && this.addressCont();
				});
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
				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//TODO: 初始化页面中的用户数据
					console.log(token, uid, "哈哈哈哈啊哈哈")
				}
			},
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
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
					this.awardCont();
				}
				
				console.log(returnArr, this.mch_id, "排序过后")
			},
			async awardCont() {
				let _self = this;
			
				let	 mch_id = this.mch_id;
				
				
				console.log(this.mch_id, "获取this.mch_id")
				let dbShop = await dbmodity(mch_id);
				console.log(dbShop, "dbShop成功了啊")
				if(dbShop.code == ApiConst.ERROR_SUCCESS) {
					let dbShopData = dbShop.data.goodList;
					let dbGzData = dbShop.data;
					_self.dbmoney = dbGzData.mp;
					_self.mp = dbGzData.list.costcoin;
					_self.dbGzContent = dbGzData.list.rulecontent;
					_self.knaptext = dbGzData.list.exchangecontent;
					console.log(_self.mp, "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
					_self.dbObj = dbShopData;
					for(let a in dbShopData) {
						if(dbShopData[a] == "商品11") {
							console.log(dbShopData[a], "腰带id'");
						}
					}
					let dbArr = [];
					let idArr = [];
					let imgArr = [];
					let typeArr = [];
					for(var i = 0; i < dbShopData.length; i++) {
						var last = JSON.stringify(dbShopData[i]);
						var obj = JSON.parse(last);
						dbArr.push(obj.goodname);
						idArr.push(obj.goodid);
//						console.log(obj.goodimage.replace(/http:/, "https:"),"图片")
						imgArr.push(obj.goodimage.replace(/http:/, "https:"));
						
						typeArr.push(obj.type);
					}
					_self.turnplate.restaraunts = dbArr;
					_self.turnplate.id = idArr;
					_self.turnplate.img = imgArr;
					_self.turnplate.type = typeArr;

					_self.turnplate.colors = ['#f6cb78', '#fff2d8', '#f6cb78', '#fff2d8', '#f6cb78', '#fff2d8', '#f6cb78', '#fff2d8', '#f6cb78', '#fff2d8',

						'#f6cb78', '#fff2d8'
					]
					//_self.rotateTimeOut()
					let imgLoadedCount = 0;

					imgArr.forEach(imgUrl => {
						let img = new Image()
						img.src = imgUrl
						img.onload = () => {
							imgLoadedCount++
							if(imgLoadedCount === imgArr.length) {
								this.drawRouletteWheel();
							}
						}
					})
				}
			},

			async winprize(id, type) {
				
				let	 mch_id = this.mch_id;
				let prize = await prizeCont(mch_id,id, type);

				if(prize.code == ApiConst.ERROR_SUCCESS) {
					this.dbmoney = prize.data;
					console.log(this.dbmoney, "返回积分2")
				}
			},

			async reducePrizz() {
				let mp = this.mp;
				let reduceBase = await reduceCont(mp);
				if(reduceBase.code == ApiConst.ERROR_SUCCESS) {
					this.dbmoney = reduceBase.data;
					console.log(this.dbmoney, "返回积分3")
				}
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
			async ksapPrizz() {
				let	 mch_id = this.mch_id;
				let ksapBase = await knapCont(mch_id);
				if(ksapBase.code == ApiConst.ERROR_SUCCESS) {
					this.ksapArr = ksapBase.data.list;

				}
				console.log(ksapBase, "我的背包1")
			},
			async subShop(fn) {
				let	 mch_id = this.mch_id;
				let lotteryBase = await lottery(mch_id);
				if(lotteryBase.code == ApiConst.ERROR_SUCCESS) {
					this.zjShop = lotteryBase.data;
					fn && fn()
					//这里赋值
				}

			},
			async isMobile() {
				let mobileStatus = await getMobile();
				if(mobileStatus.code == ApiConst.ERROR_SUCCESS) {
					if(this.dbmoney < this.mp) {
						console.log("11111")
						this.goldcoinShow = true;

					} else {
						if(this.turnplate.bRotate) {
							return
						}
						this.turnplate.bRotate = !this.turnplate.bRotate;
						this.subShop(this.callback);
						this.reducePrizz();

					}
				} else {
					this.maskContent = true;
					console.log("您没有绑定手机号码");
				}

			},
			async mobileCodeData() {
				let mobile = this.bindIphone;
				let mobileYzm = await mobileCode(mobile);
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
					this.dbmoney = authCont.data.mp;
					this.maskContent = false;
					let toBindMp = authCont.data.bindMp;

					let thisMessage = "绑定手机成功,系统赠送" + toBindMp + "积分";
					console.log(thisMessage, "22222222222222222")
					Toast({
						message: thisMessage,
						position: 'middle',
						duration: 2000
					})
					//this.$router.push(this.reditPath);
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
				let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				//				if(this.bindIphone == '') {
				//					MessageBox.alert("请输入手机号码");
				//				} else 
				if(!reg.test(this.bindIphone)) {
					let remark = this.$refs.hqcode.dataset.value2;

					this.userRecordfunction(remark);
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
					let remark = this.$refs.hqcode.dataset.value2;

					this.userRecordfunction(remark);
				}

				this.mobileCodeData();
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

			mobileBtn($event) {
				let remark = this.$refs.mobilen.dataset.value3;
				this.userRecordfunction(remark);

				this.authcodeData();

			},
			rotateTimeOut: function() {
				$('#wheelcanvas').rotate({
					angle: 0,
					animateTo: 2160,
					duration: 8000,
					callback: function() {
						Toast({
							message: '网络超时，请检查您的网络设置！',
							position: 'middle'
						})
					}
				})
			},
			rotateFn: function(item, txt, dbId, type) {
				this.dbShow = false;
				console.log(item, txt, dbId, "当前方法的值")
				var angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2));
				console.log(angles, "anglesangles1")
				if(angles < 270) {
					angles = 270 - angles;
					console.log(angles, "anglesangles2")
				} else {
					angles = 360 - angles + 270;
					console.log(angles, "anglesangles3")
				}

				var bRotateT = this.turnplate.bRotate;
				console.log(bRotateT, "bRotateT");
				let _self = this;
				this.$nextTick(() => {
					$('#wheelcanvas').stopRotate();
					$('#wheelcanvas').rotate({
						angle: 0,
						animateTo: angles + 1800,
						duration: 8000,
						callback: function() {
							_self.dbShow = true;
							_self.dbTrueShop = txt;
							if(type != null && type != "0") {
								console.log("我进来了")
								_self.winprize(dbId, type);
							}

							//_self.dbTrueimg=img;
							console.log(item, txt, dbId, type, "当前显2222222222222222示的值")
							//console.log(txt, dbId, "当前显示的值")
							if(bRotateT) {
								bRotateT = false;
								_self.turnplate.bRotate = false

								console.log("起作用了")
							} else {
								//bRotateT = true
								_self.turnplate.bRotate = true
								console.log("没起作用了")
							}
						}
					})

				})
				//this.turnplate.bRotate = bRotateT;
			},
			pointer() {
				let remark = this.$refs.point.dataset.value;
				this.userRecordfunction(remark);
				//console.log(this.$refs.point.dataset.value)
				if(navigator.onLine == false) {
					Toast({
						message: '网络超时，请检查您的网络设置！',
						position: 'middle'
					})
				}

				if(this.turnplate.bRotate) {
					return
				} else {
					this.isMobile();
				}
				//console.log(navigator.onLine,"+++++++++++++++++++++++++++++");

				//这里调用了那个方法，然后在用this.zjShop没赋值到，，第二次的时候才有
				// 获取随机数(奖品个数范围内)
				//var item = Math.floor(this.zjShop * (this.turnplate.restaraunts.length - 1 + 1) + 1);

				//再试试

				//var item = Math.floor(Math.random() * (this.turnplate.id.length - 1 + 1) + 1);
				// 奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]

				//this.rotateFn(this.zjShop, this.turnplate.restaraunts[item - 1], this.turnplate.id[item - 1], this.turnplate.type[item - 1]);

			},
			callback() {
				console.log(this.zjShop, "调用返回的下标数=-======xxxxxx")
				var item = this.zjShop;
				this.rotateFn(item, this.turnplate.restaraunts[item - 1], this.turnplate.id[item - 1], this.turnplate.type[item - 1]);
			},
			drawRouletteWheel() {
				var canvas = document.getElementById('wheelcanvas');
				if(canvas.getContext) {
					// 根据奖品个数计算圆周角度
					var arc = Math.PI / (this.turnplate.restaraunts.length / 2);
					var ctx = canvas.getContext('2d');
					// 在给定矩形内清空一个矩形
					ctx.clearRect(0, 0, 420, 420);
					// strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
					ctx.strokeStyle = '#FFBE04';
					//ctx.margin='0px 10px';
					// font 属性设置或返回画布上文本内容的当前字体属性
					ctx.font = '15px Microsoft YaHei';
					for(let i = 0; i < this.turnplate.restaraunts.length; i++) {
						var angle = this.turnplate.startAngle + i * arc;
						ctx.fillStyle = this.turnplate.colors[i];
						ctx.beginPath();
						//  arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
						ctx.arc(210, 210, this.turnplate.outsideRadius, angle, angle + arc, false);
						ctx.arc(210, 210, this.turnplate.insideRadius, angle + arc, angle, true);
						ctx.stroke();
						ctx.fill();
						// 锁画布(为了保存之前的画布状态)
						ctx.save();
						// ----绘制奖品开始----
						ctx.fillStyle = '#E5302F';
						var text = this.turnplate.restaraunts[i];
						var lineHeight = 17;
						// translate方法重新映射画布上的 (0,0) 位置
						ctx.translate(210 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 210 + Math.sin(angle + arc / 2) *

							this.turnplate.textRadius, '5px');
						// rotate方法旋转当前的绘图
						ctx.rotate(angle + arc / 2 + Math.PI / 2);
						let text = text.substring(0, 5) + '||' + text.substring(5);
						let textst = text.split('||');
						let text2 = this.turnplate.id[i];
						//console.log(text,text2, "SSSSSSSSSSSSSSSSSS")
						//let  textSt2=text2.split(',');
						for(let ji = 0; ji < textst.length; ji++) {
							ctx.fillText(textst[ji], -ctx.measureText(textst[ji]).width / 2, ji * lineHeight);
						}
						var img = new Image()
						img.src = this.turnplate.img[i]
						ctx.drawImage(img, -15, 30, 30, 30)
						ctx.restore()
						// 绘制奖品结束

						//ctx.drawImage(this.turnplate.img[j], -15, 10)
					}
				}
			},
			dbClose() {
				let remark = this.$refs.center.dataset.value;
				this.userRecordfunction(remark);
				this.dbShow = false;
			},
			jxWard() {
				let remark = this.$refs.jifen.dataset.value;
				this.userRecordfunction(remark);
				//this.reducePrizz();
				this.pointer();
				this.dbShow = false;
			},
			knapBtn() {
				let remark = this.$refs.beibao.dataset.value;
				this.userRecordfunction(remark);
				this.ksapPrizz();
				this.knapShow = true;
			},
			knapClose() {
				let remark = this.$refs.knpclose.dataset.value;
				this.userRecordfunction(remark);
				this.knapShow = false;
			},
			knapCode($event, item, tom) {

				this.userRecordfunction(tom);
				//	this.knapcontent(item.id);
				if(item.status == "1") {

					this.writeShow = true;
					this.hxImg = item.goodimage;
					this.hexTime = item.createtime;
					let	 mch_id = this.mch_id;
					let knCode = this.codeUrl + "id=" + item.id+"&"+ "mch_id=" + mch_id;
					console.log(knCode, "二维码")
					QRCode.toCanvas(canvas, knCode, (error) => {
						if(error) {
							console.log(error)
						} else {
							console.log('success')
						}
					})
				} else {
					this.writeShow = false;
					Toast({
						message: '您已经核销过该商品',
						position: 'middle'
					})
				}
			},
			yxGz() {
				let remark = this.$refs.guiz.dataset.value;
				this.userRecordfunction(remark);
				this.awardGzshow = true;
			},
			registClose() {
				let remark = this.$refs.gbMobile.dataset.value;
				this.userRecordfunction(remark);
				this.maskContent = false;
			},
			awardClose() {
				let remark = this.$refs.awardclose.dataset.value;
				this.userRecordfunction(remark);
				this.awardGzshow = false;
			},
			dhSm() {
				let remark = this.$refs.dhshuo.dataset.value;
				this.userRecordfunction(remark);
				this.explainShow = true;
			},
			knapSm() {
				let remark = this.$refs.hexEr.dataset.value;
				this.userRecordfunction(remark);
				this.explainShow = false;
			},
			hxClose() {
				let remark = this.$refs.hexEr.dataset.value;
				this.userRecordfunction(remark);
				this.writeShow = false;
			},
			closeGj() {
				let remark = this.$refs.gbJfen.dataset.value;
				this.userRecordfunction(remark);
				this.goldcoinShow = false;
			}
		},
		//		},
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
	@import "../../../static/css/winTreasure/test2.css";
</style>