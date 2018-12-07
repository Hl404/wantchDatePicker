<template>
	<div>
		<div class="srDay-Content" v-show="disShow">
			<div v-show="disShow">
				<p v-html="srDay_Content.page_title" class="srDay-title"></p>
				<div v-html="srDay_Content.content"></div>
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
				errorMess:"",
				srDay_Content: {

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
				let srDay_commonality = await commonality(title);
				//let
				console.log(srDay_commonality)
				if(srDay_commonality.code == ApiConst.ERROR_SUCCESS) {
					this.disShow = true;
					this.srDay_Content=srDay_commonality.data;
					console.log(this.srDay_Content.length)
				} else {
					console.log(11)
					//this.srDay_Content
					this.errorMess=srDay_commonality.message;
					this.disShow = false;
				}

			}

		}

	}
</script>

<style>
	.srDay-Content {
		margin: 15px;
		background: #FFFFFF;
		padding: 15px;
	}
	
	.srDay-Content .srDay-title {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		color: #000000;
	}
	
	.srDay-Content p {
		text-align: left;
		line-height: 1.0;
		margin-top: 10px;
	}
	
	.srDay-Content p img {
		text-align: center;
		margin: auto;
	}
</style>