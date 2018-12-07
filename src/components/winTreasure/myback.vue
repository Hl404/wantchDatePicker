<template>
	<div class="awardRotate">
		<!--我的背包弹窗-->
		<template v-if="ksapArr.length>0&&shophxArr.length>0">
			<div class="knapContent">

				<div class="knap-relateive">

					<div class="knapBase">

						<div class="padding">
							<h1 class="h1"><img src="../../../static/img/beibao222@2x.png" width="100px" height="40px"/></h1>
							<ul>
								<li v-for="(item,index) in ksapArr" @click="knapCode(item)">
									<div class="licur" v-if="item.status=='1'">

										<div class="knapBaseBg">
											<div class="knapImg"><img :src="item.goodimage" /></div>
											<div class="knapDblsit">
												<p class="dbtitle">夺宝物品</p>
												<p class="dbRecord">商品名称：<span class="dbcorlor">{{item.goodname}}</span></p>
												<p class="dbRecord">夺宝时间：{{formatDate(item.createtime)}}</p>
											</div>

										</div>

									</div>

								</li>

							</ul>
						</div>

					</div>

				</div>

				<div class="knapBase" style="margin-top: 20px;">

					<div class="padding">
						<h1 class="h1"><img src="../../../static/img/shancheng2@2x.png" width="100px" height="40px"/></h1>
						<ul>
							<li v-for="(item,index) in shophxArr" @click="shopCode(item)">
								<div class="licur">

									<div class="knapBaseBg">
										<div class="knapImg"><img src="../../../static/img/wantianlogo.png" /></div>
										<div class="knapDblsit">
											<p class="dbtitle">商城订单物品</p>
											<p class="dbRecord">订单编号：<span class="dbcorlor">{{item.tradeSn}}</span></p>
											<p class="dbRecord">夺宝时间：{{formatDate2(item.createTime)}}</p>
										</div>

									</div>

								</div>

							</li>

						</ul>
					</div>

				</div>

			</div>
		</template>

		<!--判断核销夺宝-->
		<template v-else-if="ksapArr.length>0">
			<div class="knapContent">

				<div class="knap-relateive">

					<div class="knapBase">

						<div class="padding">
							<h1 class="h1"><img src="../../../static/img/beibao222@2x.png" width="100px" height="40px"/></h1>
							<ul>
								<li v-for="(item,index) in ksapArr" @click="knapCode(item)">
									<div class="licur" v-if="item.status=='1'">

										<div class="knapBaseBg">
											<div class="knapImg"><img :src="item.goodimage" /></div>
											<div class="knapDblsit">
												<p class="dbtitle">夺宝物品</p>
												<p class="dbRecord">商品名称：<span class="dbcorlor">{{item.goodname}}</span></p>
												<p class="dbRecord">夺宝时间：{{formatDate(item.createtime)}}</p>
											</div>

										</div>

									</div>

								</li>

							</ul>
						</div>

					</div>

				</div>

			</div>

		</template>

		<!--判断核销商品订单-->
		<template v-else-if="shophxArr.length>0">
			<div class="knapContent">

				<div class="knap-relateive">

					<div class="knapBase">
						<div>
							<div class="padding">
								<h1 class="h1"><img src="../../../static/img/shancheng2@2x.png" width="100px" height="40px"/></h1>
								<ul>
									<li v-for="(item,index) in shophxArr" @click="shopCode(item)">
										<div class="licur">

											<div class="knapBaseBg">
												<div class="knapImg"><img src="../../../static/img/wantianlogo.png" /></div>
												<div class="knapDblsit">
													<p class="dbtitle">商城订单物品</p>
													<p class="dbRecord">订单编号：<span class="dbcorlor">{{item.tradeSn}}</span></p>
													<p class="dbRecord">夺宝时间：{{formatDate2(item.createTime)}}</p>
												</div>

											</div>

										</div>

									</li>

								</ul>
							</div>

						</div>
					</div>

				</div>

			</div>

		</template>
		<template v-else>
			<div style="padding-top: 40%;">亲爱的客官,</br>您暂时没有核销订单哟</div>

		</template>
		<!--商品核销码-->
		<div class="writeMask" v-show="writeShow">
			<div class="write-Content">
				<div class="write-relative">
					<div class="shopTitle">
						核销
					</div>
					<span class="knapClose" @click="hxClose"></span>
					<div class="knapBaseBg">
						<!--<div class="knapImg"><img :src="hxImg" /></div>-->
						<div class="knapDblsit knapDblsit2" style="padding-left: 0; text-align: center;margin-top: 15px;">

							<div class="dbRecord" style="color: red;">{{goodname}}</div>
							<canvas id="qrccode-canvas" width="50px" height="50px" style="margin-top: 10px;"></canvas>
							<div style="font-size: 12px;color: #FFFFFF;margin-top: 10px;">夺宝时间：{{formatDate(hexTime)}}</div>
							<div class="adress">
								<p v-html="content"></p>

							</div>

						</div>
					</div>
				</div>
			</div>

		</div>
		<!--商城订单核销-->
		<div class="writeMask" v-show="writeShow2">
			<div class="write-Content2">
				<div class="write-relative">

					<span class="knapClose" @click="hxClose2"></span>
					<div class="knapBaseBg ">
						<div class="shopTitle">
							核销
						</div>
						<div class="knapBaseBg-prisc">
							<!--<div class="knapImg"><img src="../../../static/img/wantianlogo.png" /></div>-->

							<canvas id="jscodeCanvas2"  style="margin-top: 10px;text-align: center;"></canvas>
							<canvas id="qrccode-canvas2" width="50px" height="50px" style="margin-top: 10px;text-align: center;"></canvas>
							<div class="knapDblsit" style="">
								<p class="dbRecord" style="margin-top: 5px;font-size: 12px;">订单编号：{{transn}}</p>
								<p class="dbRecord" style="margin-top: 5px;font-size: 12px;">创建时间：{{formatDate2(hexTime2)}}</p>
								<div class="adress">
									<p v-html="content"></p>
								</div>
							</div>
							<div class="shopDetail">
								<h1>订单详情</h1>

								<ul class="shopDetail-ul">
									<li v-for="item in shoplist">
										<div class="img"><img :src="item.goods_image" /></div>
										<div class="shopDetail-content">
											<div class="shopDetail-left">
												<span class="name">{{item.name}}</span>

											</div>
											<div class="shopDetail-right">
												<p class="subNum">￥:{{item.original_price}}</p>
												<p class="num" style="color: #FFFFFF;">X{{item.num}}</p>
											</div>
										</div>
									</li>
								</ul>
							</div>

							<div class="shopDetail-fl">
								<p>商品总价:￥{{shopZong}}</p>
								<p>优惠金额:￥{{shopYou}}</p>
							</div>

							<div class="shopDetail-ft">
								应付:<span style="color: #F51515;">
								￥:{{shopYmoney}}
							</span>
							</div>
							<!--<p v-html="content2"></p>-->
						</div>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import QRCode from 'qrcode';
	import JsBarcode from 'jsbarcode'
	import { myfun } from 'src/plugins/awardRotate'
	import { mapState, mapMutations } from 'vuex'
	import { prizeCont, reduceCont, knapContHx, knapQcode, lottery, shopHx, pointUser } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import { formatDate, formatDate2 } from 'src/utils/date'
	var canvas = '';
	var canvas2 = '';
	let jscodeCanvas2 = '';
	export default {
		data() {
			return {
				dbShow: true,
				awardGzshow: true,
				knapShow: true,
				writeShow: false,
				writeShow2: false,
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
				},
				dbTrueShop: '',
				dbTrueimg: '',
				dbmoney: '',
				mp: '',
				ksapArr: [],
				shophxArr: [],
				shoplist: [],
				dbGzContent: '',
				knaptext: '',
				hexTime: '',
				hexTime2: '',
				hxImg: '',
				hxImg2: '',
				zjShop: '',
				content: "",
				goodname: "",
				transn: "",
				shopZong: "",
				shopYou: "",
				shopYmoney: "",
				codeUrl: 'https://wxweb.wantech99.com/#/winTreasure/login?',
				shopcodeUrl: 'https://jfmshop.wantech99.com/sellerlogin.html?type=NORMAL&&'
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
			canvas = document.getElementById('qrccode-canvas');
			canvas2 = document.getElementById('qrccode-canvas2');
			jscodeCanvas2 = document.getElementById('jscodeCanvas2');
			if(this.iflogin == true) {
				this.ksapPrizz();
				this.shopFuntion();
			} else {
				login(this);
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
			formatDate2(time) {
				var date = new Date(time * 1000);
				return formatDate(date, 'yyyy-MM-dd');
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

			async reducePrizz() {
				let mp = this.mp;
				console.log(mp, "草拟的MP")
				let reduceBase = await reduceCont(mp);
				console.log(reduceBase, "不出液拿怪怪");
				if(reduceBase.code == ApiConst.ERROR_SUCCESS) {
					this.dbmoney = reduceBase.data;
					console.log(this.dbmoney, "返回积分3")
				}
			},
			async ksapPrizz() {
				let ksapBase = await knapContHx();
				if(ksapBase.code == ApiConst.ERROR_SUCCESS) {
					this.ksapArr = ksapBase.data.list;
					this.content = ksapBase.data.content;
				}
				console.log(ksapBase, "背包成功")
			},
			async shopFuntion() {
				let shopHxcontent = await shopHx();
				if(shopHxcontent.code == ApiConst.ERROR_SUCCESS) {
					this.shophxArr = shopHxcontent.data;

				}
				console.log(shopHxcontent, "背包成功2")
			},

			knapClose() {
				this.knapShow = false;
			},
			knapCode(item) {

				console.log(item)
				//	this.knapcontent(item.id);
				if(item.status == "1") {
					this.writeShow = true;
					this.hxImg = item.goodimage;
					this.hexTime = item.createtime;
					this.goodname = item.goodname;
					let knCode = this.codeUrl + "id=" + item.id;
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
			shopCode(item) {
				console.log(item, "aaaaaa")
				this.writeShow2 = true;
				this.hxImg2 = item.goodimage;
				this.hexTime2 = item.createTime;

				this.transn = item.tradeSn;
				this.shopZong = item.goodsPrice;
				this.shopYou = item.discountPrice;
				this.shopYmoney = item.needPayMoney;
				let shopCode = this.shopcodeUrl + "order_id=" + item.orderId + "&" + "sn=" + item.sn + "&" + "trade_sn=" + item.tradeSn;
				this.shoplist = JSON.parse(item.itemsJson);
				console.log(shopCode, this.shoplist, "/////////////////////////");
				QRCode.toCanvas(canvas2, shopCode, (error) => {
					if(error) {
						console.log(error)
					} else {
						console.log('success')
					}
				})
				//条形码
				let memberId = item.memberId;
				let orderId = item.orderId;
				let catime = item.createTime.toString();
				let catStr = catime.substr(catime.length - 4);
				let shopBarCode=orderId+"m"+memberId+'n'+catStr;
				let shopBarCodesn= shopBarCode.substr(0, 3) + "****" + shopBarCode.substr(8);
				JsBarcode("#jscodeCanvas2", shopBarCode, {

					format: "CODE128", //选择要使用的条形码类型

					text: shopBarCodesn,

					displayValue: true, //是否在条形码下方显示文字

					textPosition: "bottom" //设置文本的垂直位置

				})

				//			var str= "abcdefg";
				//alert(str.substr(str.length-4));
				console.log(catStr, "时间")
				//JsBarcode

			},
			yxGz() {
				this.awardGzshow = true;
			},
			awardClose() {
				this.awardGzshow = false;
			},
			dhSm() {
				this.explainShow = true;
			},
			knapSm() {
				this.explainShow = false;
			},
			hxClose() {
				this.writeShow = false;
			},
			hxClose2() {
				this.writeShow2 = false;
			}
		},
		watch: {
			iflogin(newV, old) {
				if(this.iflogin == true) {
					this.ksapPrizz();
					this.shopFuntion();
				} else {
					login(this);
				}
			}
		}
	}
</script>

<style>
	@import "../../../static/css/winTreasure/myback.css";
</style>