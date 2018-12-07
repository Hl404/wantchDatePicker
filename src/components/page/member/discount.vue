<template>
	<div>
		<div class="coupon-content">
			<!--			<div class="coupon-content-header">
				可领取优惠券
			</div>-->
			<div style="height: calc(100vh  )">
				<scroll ref="scroll" :data="discountList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(0)" @pullingDown="loadTop" @pullingUp="loadBottom">
					<div slot="list">
			
						<div class="couponList" v-if="discountList.length>0">
							<div class="couponList-item " v-for="item in discountList">
								<div class="row no-gutter">
									<div class="couponList-item-left col-25">
										<div class="couponList-ticket ">
											<span class="numMony">{{item.type_money}}</span>元
										</div>
										<div class="couponList-font ">代金券</div>
									</div>
									<div class="couponList-item-right col-75">
										<div class="couponList-info">
											<div class="headl">{{item.type_name}}</div>
											<p class="referral">消费{{item.min_goods_amount}}元减{{item.type_money}}元</p>
											<p class="address">地址:{{item.shop_add}}</p>
										</div>
										<div class="couponList-info-timeCont">
											<div class="time">{{formatDate(item.use_start_date)}}<span>至{{formatDate(item.use_end_date)}}</span></div>
											<span class="infoRight" @click="getCoupon(item)">立即领取
												
											
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="couponList" v-else>
							<div v-show="hasData" class="paddingTop">
								<p>暂时没有可领取优惠券</p>
							</div>
							<div v-show="!hasData" class="paddingTop">
								<p><img src="../../../../static/img/loading.gif" /></p>
								<p>内容加载中,请稍后....</p>
							</div>
						</div>
					</div>
				</scroll>
			</div>
		</div>
		<!-- 这样是不需要更改页面的状态的。 -->
												<register @emitRegister="emitRegister" v-show="showNumber "></register>
	</div>
</template>

<script>
	import { MessageBox, Indicator } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { setGlobalToken, getGlobalToken } from 'src/utils/mGlobal'
	import { formatDate } from 'src/utils/date'
	import { couponlist, getCoupon } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import Scroll from '../libs/scroll.vue'
	import register from '../member/register.vue'
	console.log(getCoupon);
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				pageCount: 0,
				discountList: [],
				hasData: false,
				scrollbar: true,
				scrollbarFade: true,
				showNumber:false
			}
		},
		created() {
			this.initUserInf();
		},
		components: {
			Scroll,
			register
		},
		mounted() {
			//console.log(this.iflogin)
			let info = this.userInfo;
			if(this.iflogin == true) {
				console.log("登录成功")
				setTimeout(() => {
					this.getdiscountData();
				}, 500)
			} else {
				login(this);
				
			}

		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
			scrollbarObj: function() {
				return this.scrollbar ? {
					fade: this.scrollbarFade
				} : false
			},
			pullDownRefreshObj: function() {
				return {
					threshold: parseInt(90),
					stop: parseInt(50)
				}
			},
			pullUpLoadObj: function() {
				return {
					threshold: parseInt(0),
					txt: {
						more: '更多',
						noMore: '没有更多数据了'
					}
				}
			}

		},
		methods: {

			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),
			emitRegister(info) {
				this.getCoupon();
			},
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
			///下拉刷新都无所谓，主要是下拉加载
			loadTop() {
				console.log("下拉111111")
				this.pageNo = 1;
				this.getdiscountData(0);

			},
			loadBottom() {

				console.log("上拉222222222")
				this.pageNo++;
				if(this.pageNo > this.pageCount) {
					this.$refs.scroll.forceUpdate()
					return
				}
				this.getdiscountData(1)

			},

			async getdiscountData(type) {
				let page = this.pageNo;
				let pageSize = this.pageSize;
				let distCount = await couponlist(page, pageSize);
				console.log(distCount);
				//this.pageCount = scoreWay.pointSum;
				this.pageCount = distCount.data.totalPageCount;
				if(distCount.code == ApiConst.ERROR_SUCCESS) {
					console.log(distCount)
					let discountData = distCount.data;
					let disList = discountData.bonusList;
					this.pageNo = discountData.page;
					this.pageSize = discountData.pageSize;
					setTimeout(() => {
						this.discountList = type == 0 ? disList : this.discountList.concat(disList)
						this.hasData = discountData.length > 0 ? false : true;
					}, 500)
					console.log(this.discountList);

				} else {
					MessageBox.alert(distCount.message);
				}
			},
			async getCoupon(item) {
				console.log(this.discountList);
				//let item =this.item;
				console.log(item,"sshhshhsssssssssssssssssssssssssssssssssssssssssssss")
				let info = this.userInfo;
				console.log(info,"sssssssssssssshqkweh  +++++++")
				if(info.mobile == ApiConst.ERROR_SUCCESS) {
					this.showNumber=false;
					console.log(item,item.type_id,"sshhshhsssssssssssssssssssssssssssssssssssssssssssss")
					let type_id = item.type_id;
					let store_id = item.store_id;
					let getcode = await getCoupon(type_id, store_id);
					console.log(getcode.code);
					if(getcode.code == ApiConst.ERROR_SUCCESS) {
						MessageBox.alert(getcode.message);
					} else {
						MessageBox.alert(getcode.message);
					}
				}else{
					this.showNumber=true;
					//console.log("对不起，我失败了");
				}

			},
			formatDate(time) {
				var date = new Date(time * 1000);
				return formatDate(date, 'yyyy-MM-dd ');
			},
			rebuildScroll() {
				Vue.nextTick(() => {
					this.$refs.scroll.destroy()
					this.$refs.scroll.initScroll()
				})
			}

		},
		watch: {
			iflogin(newV, old) {
				let info = this.userInfo;
				if(this.iflogin == true) {
					setTimeout(() => {
						this.getdiscountData();
					}, 500)

				} else {
					MessageBox.alert("您还没有登录，请重新登录");
					login(this);

				}
			}
		}
	}
</script>

<style>
	@import "/static/css/page/coupon.css";
</style>