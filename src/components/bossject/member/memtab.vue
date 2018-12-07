<template>
	<div id="pagetab">
		<div class="page-tabbar">
			<mt-tabbar v-model="selected">
				<ul class="tab-bar">
					<router-link class="index col-33" tag="li" to="/bossject/garden">
						<i class="ico-index"></i>
						<span>乐园</span>
					</router-link>
					<router-link class="order col-33" tag="li" to="/bossject/wantch">
						<i class="ico-order"></i>
						<span>万天</span>
					</router-link>
					<router-link class="maip col-33" tag="li" to="/bossject/shop">
						<i class="ico-maip"></i>
						<span>卖品</span>
					</router-link>
					<router-link class="mine col-33" tag="li" to="/bossject/member">
						<i class="ico-mine"></i>
						<span>会员</span>
					</router-link>
				</ul>
			</mt-tabbar>
		</div>
	</div>
</template>

<script>
	import { Field } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	export default {
		name: "pagetab",
		data() {
			return {
				selected: ""
			};
		}
	};
</script>

<style>
	@import "../../../assets/css/bossject/memtab.css";
</style>