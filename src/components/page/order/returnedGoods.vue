<template>
	<div>
		<div class="returnOder-Content">
			<div class="returnOder-Content-header">
				退货订单
			</div>
			<div class="returnOder-list" style="height: calc(100vh - 48px)">
				<scroll ref="scroll" :data="orderlist" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(0)" @pullingDown="loadTop" @pullingUp="loadBottom">
					<template v-if="orderlist.length > 0">
						<ul slot="list">
							<li class="returnOder-list-item" v-for="(item,$index) in orderlist">
								<div class="order-message">
									<span class="spImg">
								<img :src="orderlist.orderUrl"/>
							</span>
									<div class="order-message-right">
										<span class="statusQx">{{item.order_status_text}}</span>
										<p class="headline">{{item.seller_name}}</p>
										<p class="time">下单时间:<span>{{item.create_time}}</span></p>
										<p class="time">退货时间:<span>{{item.ship_time}}</span></p>
										<p class="gross-price">退货金额:<span class="color">¥{{item.shipping_amount}}</span></p>
									</div>
								</div>

							</li>

						</ul>
					</template>
					<template v-else>
						<div slot="list">
							<div v-show="hasData" class="paddingTop">
								<p></p>
								<p>暂时没有订单数据</p>
							</div>
							<div v-show="!hasData" class="paddingTop">
								<p><img src="../../../../static/img/loading.gif" /></p>
								<p>内容加载中,请稍后....</p>
							</div>
						</div>
					</template>
					< </scroll>

			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox, Loadmore } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { returnOrder } from 'src/service/getData'
	import { doAuthRedirect } from 'src/service/redirect'
	//import { sh1Hex } from 'src/utils/sha1Hex'
	import { ApiConst } from 'src/utils/mConst'
	import Scroll from '../libs/scroll.vue'
	console.log(Loadmore);
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				pageCount: 0,
				orderlist: [],
				scrollbar: true,
				scrollbarFade: true,
				hasData: false

			}
		},
		created() {},
		components: {
			Scroll
		},
		mounted() {
			this.orderData();
		},
		computed: {
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
			loadTop() {
				console.log("下拉111111")
				this.pageNo = 1;
				this.orderData(0);
			},
			loadBottom() {
				console.log("上拉222222222")
				this.pageNo++;
				if(this.pageNo >= this.pageCount) {
					this.$refs.scroll.forceUpdate()
					return
				}
				this.orderData(1)
			},
			async orderData(type) {
				let page = this.pageNo;
				let pageSize = this.pageSize;
				let orderMenu = await returnOrder(page, pageSize);
				this.pageCount = orderMenu.data.totalPageCount;
				if(orderMenu.code == ApiConst.ERROR_SUCCESS) {
					let pageData = orderMenu.data;
					let menuData = pageData.code;

					this.pageNo = pageData.currentPageNo;
					this.pageSize = pageData.pageSize;

					setTimeout(() => {
						this.orderlist = type == 0 ? menuData : this.orderlist.concat(menuData)
						this.hasData = menuData.length > 0 ? false : true;
					}, 1000)
				}
				//console.log(this.pageNo, this.pageSize, this.pageCount, this.allLoaded)

			},
			rebuildScroll() {
				Vue.nextTick(() => {
					this.$refs.scroll.destroy()
					this.$refs.scroll.initScroll()
				})
			}

		}

	}
</script>

<style>
	@import "/static/css/page/returnedGoods.css";
</style>