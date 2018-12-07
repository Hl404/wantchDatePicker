<template>

	<div class="rechage-Content">
		<h1>充值</h1>
		<div class="">
			<input type="text" v-model="czNumber" />

			<button @click="rechageBtn">充值</button>

		</div>

	</div>
</template>

<script>
	import { Toast, Field } from 'mint-ui';
	import { myfun } from 'src/plugins/awardRotate'
	import { mapState, mapMutations } from 'vuex'
	import { rechageBase } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import { formatDate } from 'src/utils/date'
	export default {
		data() {
			return {
				czNumber: ""
			}
		},
		created() {

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

		},
		methods: {

			async getCzfun() {
				let czNumber = this.czNumber;
				let rechageCont = await rechageBase(czNumber);
				if(rechageCont.code == ApiConst.ERROR_SUCCESS) {
					let rechageData = rechageCont.data;
					this.onBridgeReady(rechageData)
				}
				console.log(rechageCont, "回掉成功");
			},
			rechageBtn() {

				this.getCzfun();

			},
			onBridgeReady: function(rechageData) {
				let _this=this;
				console.log(rechageData,"返回的对象");
				console.log(rechageData.appId,'返回的appid');
//				const openId = localStorage.getItem('openId')
//				payService.payment(this.$route.params.orderId, 1, openId).then(rt => { //1:支付类型，可不填
//					this.message = rt.t
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							'appId': rechageData.appId,
							'timeStamp': rechageData.timeStamp,
							'nonceStr': rechageData.nonceStr,
							'package': rechageData.package,
							'signType': rechageData.signType,
							'paySign': rechageData.paySign
						},
						function(res) {
							
							if(res.err_msg === 'get_brand_wcpay_request:ok') {
								console.log(res)
								Toast('微信支付成功')
								this.$router.push('/MineOrder')
							} else if(res.err_msg === 'get_brand_wcpay_request:cancel') {
								Toast('用户取消支付')
								// window.location.href = 'gift_failview.do?out_trade_no=' + this.orderId
							} else if(res.err_msg === 'get_brand_wcpay_request:fail') {
								Toast('网络异常，请重试',res)
							}
						}
					)
				//})
			},
			callpay: function() {
				if(typeof WeixinJSBridge === 'undefined') {
					if(document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false)
					} else if(document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady())
						document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady())
					}
				} else {
					this.onBridgeReady()
				}
			}

		}
	}
</script>

<style>

</style>