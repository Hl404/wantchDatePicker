<template>
	<div id="">
		<Tabs></Tabs>
		<h1>商城</h1>
	</div>
</template>

<script>
		import { Field } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import Tabs from '../common/tabbar.vue'
	export default {

		data() {
			return {
				selected: "tab-user"
			};
		},
		components: {
			Tabs
		}
	};
</script>

<style>
</style>