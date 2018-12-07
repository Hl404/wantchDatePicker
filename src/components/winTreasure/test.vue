<template>
	<div class="awardRotate">
		<!--<img src="../../../static/img/ragiter_name.png" id="shan-img" style="display:none;" />
		<img src="../../../static/img/ragiter_name.png" id="sorry-img" style="display:none;" />-->
		<div class="banner">
			<div class="turnplate">
				<canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
				<img class="pointer" src="../../../static/img/jiantou@2x.png" v-on:click="pointer" />
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import QRCode from 'qrcode';
	import { myfun } from 'src/plugins/awardRotate'
	import { mapState, mapMutations } from 'vuex'
	import { dbmodity, prizeCont, reduceCont, knapCont, knapQcode, lottery, getMobile, authCode, mobileCode, pointUser } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import { formatDate } from 'src/utils/date'
		var canvas = '';
	export default {

		data() {
			return {
				msg: '',
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
				codeUrl: 'https://wxweb.wantech99.com/#/winTreasure/login?'
				//codeUrl: 'http://ngrok.szwantech.com/#/winTreasure/login?'
			}
		},
		created() {
			this.initUserInf();
		},
		mounted() {
			//this.awardCont();
			if(this.iflogin) {
				this.awardCont();
			} else {
				login(this, () => {
					this.awardCont();
				});
			}
		},
		components: {
			myfun
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
			rotateFn: function(item, txt) {
				var angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2))
				if(angles < 270) {
					angles = 270 - angles
				} else {
					angles = 360 - angles + 270
				}
				var bRotateT = this.turnplate.bRotate
				this.$nextTick(() => {
					$('#wheelcanvas').stopRotate()
					$('#wheelcanvas').rotate({
						angle: 0,
						animateTo: angles + 1800,
						duration: 8000,
						callback: function() {
							Toast({
								message: txt,
								position: 'middle'
							})
							if(bRotateT) {
								bRotateT = false
							} else {
								bRotateT = true
							}
						}
					})
				})
				this.turnplate.bRotate = bRotateT
			},
			pointer() {
				// if (this.turnplate.bRotate) return
				
				
				this.turnplate.bRotate = !this.turnplate.bRotate
				// 获取随机数(奖品个数范围内)
				var item = Math.floor(Math.random() * (this.turnplate.restaraunts.length - 1 + 1) + 1)
				// 奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
				
				
				this.rotateFn(item, this.turnplate.restaraunts[item - 1])
				console.log(11111)
			},
			async awardCont() {
				let _self = this;
				let mch_id=1;
				let dbShop = await dbmodity(mch_id);
				console.log(dbShop,"dbShop成功")
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
						imgArr.push(obj.goodimage);
						typeArr.push(obj.type);
					}
					_self.turnplate.restaraunts = dbArr;
					_self.turnplate.id = idArr;
					_self.turnplate.img = imgArr;
					_self.turnplate.type = typeArr;

					_self.turnplate.colors = ['#f6cb78', '#fff2d8', '#f6cb78', '#fff2d8', '#f6cb78', '#fff2d8', '#f6cb78', '#fff2d8', '#f6cb78', '#fff2d8',

						'#f6cb78', '#fff2d8'
					]
					//this.drawRouletteWheel();
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
				let prize = await prizeCont(id, type);
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
			drawRouletteWheel() {
				var canvas = document.getElementById('wheelcanvas')
				if(canvas.getContext) {
					// 根据奖品个数计算圆周角度
					var arc = Math.PI / (this.turnplate.restaraunts.length / 2)
					var ctx = canvas.getContext('2d')
					// 在给定矩形内清空一个矩形
					ctx.clearRect(0, 0, 422, 422)
					// strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
					ctx.strokeStyle = '#FFBE04'
					// font 属性设置或返回画布上文本内容的当前字体属性
					ctx.font = '16px Microsoft YaHei'
					for(var i = 0; i < this.turnplate.restaraunts.length; i++) {
						var angle = this.turnplate.startAngle + i * arc
						ctx.fillStyle = this.turnplate.colors[i]
						ctx.beginPath()
						//  arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
						ctx.arc(211, 211, this.turnplate.outsideRadius, angle, angle + arc, false)
						ctx.arc(211, 211, this.turnplate.insideRadius, angle + arc, angle, true)
						ctx.stroke()
						ctx.fill()
						// 锁画布(为了保存之前的画布状态)
						ctx.save()

						// ----绘制奖品开始----
						ctx.fillStyle = '#E5302F'
						var text = this.turnplate.restaraunts[i];
						//console.log(text)
						var lineHeight = 17;
						// translate方法重新映射画布上的 (0,0) 位置
						ctx.translate(211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius)

						// rotate方法旋转当前的绘图
						ctx.rotate(angle + arc / 2 + Math.PI / 2)

						/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
						if(text.indexOf('M') > 0) { // 流量包
							var texts = text.split('M')
							for(var j = 0; j < texts.length; j++) {
								ctx.font = j === 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei'
								if(j === 0) {
									ctx.fillText(texts[j] + 'M', -ctx.measureText(texts[j] + 'M').width / 2, j * lineHeight)
								} else {
									ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
								}
							}
						} else if(text.indexOf('M') === -1 && text.length > 6) { // 奖品名称长度超过一定范围
							text = text.substring(0, 6) + '||' + text.substring(6)
							var textst = text.split('||')
							for(var ji = 0; ji < textst.length; ji++) {
								ctx.fillText(textst[ji], -ctx.measureText(textst[ji]).width / 2, ji * lineHeight)
							}
						} else {
							// 在画布上绘制填色的文本。文本的默认颜色是黑色
							// measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
							ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
						}
					var img = new Image()
						img.src = this.turnplate.img[i]
						ctx.drawImage(img, -15, 30, 30, 30)
						ctx.restore()
//						// 添加对应图标
//						if(text.indexOf('Q币') > 0) {
//							var img = document.getElementById('shan-img')
//							ctx.drawImage(img, -15, 10)
//						} else if(text.indexOf('谢谢参与') >= 0) {
//							img = document.getElementById('sorry-img')
//							ctx.drawImage(img, -15, 10)
//						}
						// 把当前画布返回（调整）到上一个save()状态之前
						ctx.restore()
						// 绘制奖品结束
					}
				}
			}
		}
	}
</script>

<style>
	.awardRotate {
		/*background: rgb(230, 45, 45);*/
		height: 100%;
		max-width: 375px;
		margin: 0px auto;
	}
	
	ul,
	ol {
		list-style-type: none;
	}
	
	select,
	input,
	img,
	select {
		vertical-align: middle;
	}
	
	input {
		font-size: 12px;
	}
	
	a {
		text-decoration: none;
		color: #000;
	}
	
	a:hover {
		color: #c00;
		text-decoration: none;
	}
	
	.clear {
		clear: both;
	}
	/* 大转盘样式 */
	
	.banner {
		display: block;
		width: 95%;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 20px;
		padding-top: 120px;
	}
	
	.banner .turnplate {
		display: block;
		width: 100%;
		position: relative;
		background-size: 100% 100%;
	}
	
	.banner .turnplate canvas.item {
		width: 100%;
	}
	
	.banner .turnplate img.pointer {
		position: absolute;
		width: 31.5%;
		height: 42.5%;
		left: 34.6%;
		top: 23%;
	}
</style>