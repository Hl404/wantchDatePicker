<template>
	<div>
		<div class="coupon-content">
			<div class="coupon-content-header">
				可用优惠券
			</div>
			<div class="" style="height: calc(100vh - 48px)">

				<scroll ref="scroll" :data="couponlist" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(0)" @pullingDown="loadTop" @pullingUp="loadBottom">
					<div slot="list">
						<div class="couponList" v-if="couponlist.length>0">

							<div class="couponList-item " v-for="item in couponlist">
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
											<p class="referral">消费满{{item.min_goods_amount}}减{{item.type_money}}</p>
											<p class="address">地址:{{item.shop_add}}</p>
										</div>
										<div class="couponList-info-timeCont">
											<div class="time">{{formatDate(item.use_start_date)}}<span>至{{formatDate(item.use_end_date)}}</span></div>
											<router-link :to="{path: '/member/couponInfo', query: { conponObj: item ,sn:item.bonus_sn}}" class="infoRight">立即使用</router-link>
										</div>
									</div>
								</div>
							</div>

						</div>
						<div class="couponList" v-else>
							<div v-show="hasData" class="paddingTop">
								<p>
									<router-link to="/member/discount" class="lqClass">立即领取</router-link>
								</p>
								<p>暂时没有可使用优惠券</p>
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
		<register @emitRegister="emitRegister"></register>

		<!--<register @emitRegister="emitRegister" ></register>-->
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { myCoupon } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import { formatDate } from 'src/utils/date'
	import Scroll from '../libs/scroll.vue'
	import login from 'src/plugins/login'
	import register from '../member/register.vue'

	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				couponlist: [],
				pageCount: 0,
				hasData: false,
				scrollbar: true,
				scrollbarFade: true,
				mobileShow: false
			}
		},
		created() {
			this.initUserInf();
		},
		components: {
			register,
			Scroll
		},
		mounted() {
			let info = this.userInfo;
			console.log(this.iflogin, info.mobile, 'fasdfasdfasdfasdfasdfas')
			if(this.iflogin == true && info.mobile == ApiConst.ERROR_SUCCESS) {
				console.log("成功了")
				this.conponData();
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
				this.conponData();
			},
			initUserInf() {
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();

				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//TODO: 初始化页面中的用户数据
				}

			},
			///下拉刷新
			loadTop() {
				console.log("下拉111111")
				this.pageNo = 1;
				this.conponData(0);

			},
			loadBottom() {

				console.log("上拉222222222")
				this.pageNo++;
				if(this.pageNo > this.pageCount) {
					this.$refs.scroll.forceUpdate()
					return
				}
				this.conponData(1)

			},
			//确认授权的时候在调用这个方法
			async conponData(type) {
				let page = this.pageNo;
				let pageSize = this.pageSize;
				let couponlist = await myCoupon(page, pageSize);
				this.pageCount = couponlist.data.totalPageCount;
				console.log(couponlist)
				console.log(couponlist, couponlist.data.totalPageCount);
				if(couponlist.code = ApiConst.ERROR_SUCCESS) {
					console.log("成功了")
					let desCoupon = couponlist.data;
					let couponDatalsit = desCoupon.bonusList;
					this.pageNo = desCoupon.page;
					this.pageSize = desCoupon.pageSize;
					setTimeout(() => {
						this.couponlist = type == 0 ? couponDatalsit : this.couponlist.concat(couponDatalsit)
						this.hasData = couponlist.length > 0 ? false : true;
					}, 1000)

				} else {
					this.hasData = couponlist.length > 0 ? false : true;
				}
			},
			formatDate(time) {
				var date = new Date(time * 1000);
				return formatDate(date, 'yyyy-MM-dd');
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
				if(this.iflogin == true) {
					this.conponData();
				} else {
					login(this);
					MessageBox.alert("您还没有登录");
				}
			}
		}

	}
</script>

<style>
	@import "/static/css/page/coupon.css";
</style>