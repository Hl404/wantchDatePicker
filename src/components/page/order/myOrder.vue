<template>
	<div>
		<div class="myOder-Content">
			<div class="myOder-Content-header">
				我的订单
			</div>
			<!--			<div class="myOder-list" :style="{'-webkit-overflow-scrolling': scrollMode}"-->
			<div class="myOder-list" style="height: calc(100vh - 48px)">
				<scroll ref="scroll" :data="orderlist" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(0)" @pullingDown="loadTop" @pullingUp="loadBottom">
					<template v-if="orderlist.length > 0">
						<ul slot="list">
							<li class="myOder-list-item" v-for="(item,$index) in orderlist">
								<div class="order-message">
									<span class="spImg">
									<img :src="orderlist.orderUrl"/>
								</span>
									<div class="order-message-right">
										<p class="headline">{{item.seller_name}}</p>
										<p class="time">下单时间:<span>{{item.create_time}}</span></p>
										<p class="gross-price">总价:<span class="color">¥{{item.order_amount}}</span></p>
										<!--<p class="status">{{item.order_status_text}}</p>-->
									</div>
								</div>
							</li>
						</ul>
					</template>
					<template v-else>
						<div slot="list">
							<div v-show="hasData" class="paddingTop">
								<p>暂时没有订单数据</p>
							</div>
							<div v-show="!hasData" class="paddingTop">
								<p><img src="../../../../static/img/loading.gif" /></p>
								<p>内容加载中,请稍后....</p>
							</div>
						</div>
					</template>
					<!--		<div v-show="allLoaded" style="padding:0.3em 0;">我是有底线的-.-</div>-->
				</scroll>

			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox, Loadmore } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { myOrder } from 'src/service/getData'
	import { doAuthRedirect } from 'src/service/redirect'
	//import { sh1Hex } from 'src/utils/sha1Hex'
	import { ApiConst } from 'src/utils/mConst'
	import Scroll from '../libs/scroll.vue'

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
			///下拉刷新都无所谓，主要是下拉加载
			loadTop() {
				console.log("下拉111111")
				this.pageNo = 1;
				this.orderData(0);

			},
			loadBottom() {

				console.log("上拉222222222")
				this.pageNo++;
				if(this.pageNo > this.pageCount) {
					this.$refs.scroll.forceUpdate()
					return
				}
				this.orderData(1)

			},
			async orderData(type) {
				let orderMenu = await myOrder(this.pageNo, this.pageSize);
				this.pageCount = orderMenu.data.totalPageCount;
				if(orderMenu.code == ApiConst.ERROR_SUCCESS) {
					let pageData = orderMenu.data;
					let menuData = pageData.code;
					this.pageNo = pageData.currentPageNo;

					this.pageSize = pageData.pageSize;
					setTimeout(() => {
						this.orderlist = type == 0 ? menuData : this.orderlist.concat(menuData)
						this.hasData = menuData.length > 0 ? false : true;
					}, 500)
					
				}
			},
			rebuildScroll() {
				Vue.nextTick(() => {
					this.$refs.scroll.destroy();
					this.$refs.scroll.initScroll();
				})
			}

		}

	}
</script>

<style>
	.myOder-Content-header {
		padding: 13px 15px;
		font-size: 14px;
		text-align: left;
		background: #FFFFFF;
	}
	
	.myOder-list {
		position: relative;
		height: 100%;
	}
	
	.myOder-list ul .myOder-list-item {
		margin-top: 10px;
		border-bottom: 1px solid #e5e5e5;
		background: #FFFFFF;
	}
	
	.myOder-list-item .order-message {
		padding: 15px;
		display: flex;
		display: -webkit-flex;
	}
	
	.order-message .spImg {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: #CCCCCC;
		margin-right: 10px;
	}
	
	.order-message-right {
		width: 100%;
		position: relative;
	}
	
	.order-message-right p {
		text-align: left;
	}
	
	.order-message-right .headline {
		font-size: 16px;
		color: #333333;
		padding: 0;
	}
	
	.order-message-right .time,
	.order-message-right .gross-price {
		font-size: 12px;
		color: #999999;
	}
	
	.order-message-right .time span,
	.order-message-right .gross-price span {
		margin-left: 10px;
	}
	
	.order-message-right .gross-price .color {
		color: #555555;
	}
	
	.order-message-right .status {
		text-align: right;
		color: #dd3e3e;
		font-size: 14px;
	}
</style>