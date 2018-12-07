<template>
	<div>
		<div class="hy-Content">
			<div v-show="disShow">
				<p v-html="hy_Content.page_title" class="hy-title"></p>
				<div class="" v-html="hy_Content.content">
				</div>
			</div>
			<div v-show="disShow" class="">
				{{errorMess}}
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { commonality } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	//import {formatDate} from 'src/utils/date'
	export default {
		data() {
			return {
				disShow: true,
				errorMess: "",
				hy_Content: {

				}
			}
		},
		created() {

		},
		mounted() {
			console.log(this.$route.meta.headTitle)
			this.discountContent();
		},
		computed: {},
		methods: {
			async discountContent() {
				let title = this.$route.meta.headTitle;
				let hy_commonality = await commonality(title);
				console.log(hy_commonality)
				if(hy_commonality.code == ApiConst.ERROR_SUCCESS) {
					this.disShow = true;
					this.hy_Content = hy_commonality.data;
				}else{
					this.errorMess=hy_commonality.message;
					this.disShow = false;
				}
			}

		}

	}
</script>

<style>
	.hy-title {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
	}
	
	.hy-Content {
		margin: 15px;
		background: #FFFFFF;
		padding: 15px;
	}
	
	.hy-Content .hy-title {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		color: #000000;
	}
	
	.hy-Content p {
		text-align: left;
		line-height: 1.0;
		margin-top: 10px;
	}
	
	.hy-Content img {
		width: 100%;
		height: 100%;
	}
</style>