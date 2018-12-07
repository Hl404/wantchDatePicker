<template>
	<div>
		<div class="dh-Content">
			<div v-show="disShow">
				<p v-html="dh_Content.page_title" class="dh-title"></p>
				<div v-html="dh_Content.content">
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
				disShow:true,
				errorMess:"",
				dh_Content: {

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
				let dh_commonality = await commonality(title);
				console.log(dh_commonality)
				if(dh_commonality.code == ApiConst.ERROR_SUCCESS) {
					this.disShow = true;
					this.dh_Content = dh_commonality.data;
				}else{
					this.errorMess=dh_commonality.message;
					this.disShow = false;
				}
			}

		}

	}
</script>

<style>
	.dh-Content {
		margin: 15px;
		background: #FFFFFF;
		padding: 15px;
	}
	
	.dh-Content .dh-title {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		color: #000000;
	}
	
	.dh-Content p {
		text-align: left;
		line-height: 1.0;
		margin-top: 10px;
	}
	
	.dh-Content p img {
		text-align: center;
		margin: auto;
	}
</style>