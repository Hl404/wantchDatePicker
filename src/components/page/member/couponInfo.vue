<template>
	<div>
		<div class="couponInfo-Content">
			<div class="couponInfo-handle">
				<i class="couponInfo-fk"></i> 扫条形码立减优惠
			</div>
			<div class="couponInfo-ietm">
				<img :src="couponUrl" style="width: 100%;height: 100%;">
			</div>
			<div class="couponInfo-status">
				<p class="handline">优惠信息说明：</p>
				<p class="conpon-referral">消费满{{couponMax}}元减{{couponMin}}元</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { couponInfo } from 'src/service/getData'
	import { doAuthRedirect } from 'src/service/redirect'
	import { ApiConst } from 'src/utils/mConst'
	import { getGlobalToken } from 'src/utils/mGlobal'
	export default {
		data() {
			return {
				couponUrl:'',
				couponMax:'',
				couponMin:'',
				sn:''	
			}
		},
		
		created() {
			//console.log($router.params.id)
		},
		mounted() {
			this.couponInfoData()
			//this.sn = this.$router.params.sn;
		},
		methods: {
			async couponInfoData(){
				let couponData=this.$route.query.conponObj;
			
				console.log(couponData);
				
				let infoSn=this.$route.query.sn;
				let couponJson= await couponInfo(infoSn,getGlobalToken());
				console.log(couponJson);
				if(couponJson.code == ApiConst.ERROR_SUCCESS) {
					this.couponUrl=couponJson.data.url;
					this.couponMax=couponData.min_goods_amount;
					this.couponMin=couponData.type_money;
				}else{
					MessageBox.alert(couponJson.message);
				}
				console.log(this.$route.query.conponObj);
				console.log(this.$route.query.sn)
				
			}
		
			
		}

	}
	
	
</script>

<style>
	.couponInfo-Content {
		padding: 40px 15px;
	}
	
	.couponInfo-fk {
		display: block;
		width: 10px;
		height: 10px;
		background: #f19e38;
		position: absolute;
		left: 0;
		top: 7px;
	}
	
	.couponInfo-handle {
		text-align: left;
		position: relative;
		padding-left: 15px;
	}
	
	.couponInfo-ietm {
		border: 1px solid #D5D5D5;
		border-radius: 5px;
		
		margin-top: 10px;
	}
	
	.couponInfo-status{
		margin-top: 10px;
	}
	.couponInfo-status .handline{
		font-size: 15px;
		text-align: left;
	}
	
	.couponInfo-status .conpon-referral{
		font-size: 12px;
		color: #999999;
		margin-top: 10px;
		text-align: left;
	}
</style>