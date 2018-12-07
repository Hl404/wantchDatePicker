<template>
	<div class="page-tabbar">
		<mt-tabbar v-model="selected">
			<ul class="tab-bar" >
				<router-link class="index col-33" tag="li" to="/guesproject/index">
					<i class="ico-index"></i>
					<span>首页</span>
				</router-link>
				<router-link class="order col-33" tag="li" to="/guesproject/shopping">
					<i class="ico-order"></i>
					<span>商城</span>
				</router-link>
				<router-link class="mine col-33" tag="li" to="/guesproject/member">
					<i class="ico-mine"></i>
					<span>我的</span>
				</router-link>
			</ul>
		</mt-tabbar>
	</div>
</template>

<script>
	import { Field } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	export default {

		data() {
			return {
				selected:"tab-user"
			};
		}
	};
</script>

<style>
	@import "../../../../static/css/guesproject/tabbar.css";
</style>