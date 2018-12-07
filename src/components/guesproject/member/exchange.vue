<template>
	<div class="wapper">

		<div class="wapper-list">
			<ul>
				<li class="row">
					<div class="col-66 left">
						<img class="leftImg" src="../../../../static/img/Avatar.png"/>
						<div class="leftName">
							<p class="leftHead">哇哇哇哇机</p>
							<p class="titleMony">哇哇哇哇机</p>
						</div>
					</div>
					<div class="col-33 right">2018-8-8</div>
				</li>
				<li class="row">
					<div class="col-66 left">
						<img class="leftImg" src="../../../../static/img/Avatar.png"/>
						<div class="leftName">
							<p class="leftHead">哇哇哇哇机</p>
							<p class="titleMony">哇哇哇哇机</p>
						</div>
					</div>
					<div class="col-33 right">2018-8-8</div>
				</li>
				<li class="row">
					<div class="col-66 left">
						<img class="leftImg" src="../../../../static/img/Avatar.png"/>
						<div class="leftName">
							<p class="leftHead">哇哇哇哇机</p>
							<p class="titleMony">哇哇哇哇机</p>
						</div>
					</div>
					<div class="col-33 right">2018-8-8</div>
				</li>
				<li class="row">
					<div class="col-66 left">
						<img class="leftImg" src="../../../../static/img/Avatar.png"/>
						<div class="leftName">
							<p class="leftHead">哇哇哇哇机</p>
							<p class="titleMony">哇哇哇哇机</p>
						</div>
					</div>
					<div class="col-33 right">2018-8-8</div>
				</li>

			</ul>

		</div>

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
	.wapper-list ul li {
		
		border-bottom: 1px solid #D5D5D5;
		background: #FFFFFF;
		padding: 10px 15px;
		min-height: 60px;
	}
	
	.wapper-list ul li .left {
		text-align: left;
		font-size: 14px;
		position: relative;
		
	}
	
	.wapper-list ul li .left .leftImg{
		display: block;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.leftName{
		margin-left: 54px;
	}
	.leftName .leftHead{
		font-size: 15px;
	}
	.leftName .titleMony{
		font-size: 12px;
	}
	.wapper-list ul li .right {
		text-align: right;
		font-size: 18px;
	}
</style>