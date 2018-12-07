<!--<template>
	<div class="wapper">
		<div class="wapper-Content">
			<h1>金豆问题</h1>
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>-->

<template>
	<div>
		<div class="ss">
			<i :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']" @click="start"></i>
		</div>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				rotate: false
			}
		},
		methods: {
			start() {
				this.rotate = !this.rotate;
				console.log(this.rotate)
			}
		}
	}
</script>
<style>
	.ss {
		width: 200px;
		height: 200px;
		background: #000000;
	}
	
	.ss i {
		display: block;
		width: 100px;
		height: 100px;
		background: #DD3E3E;
	}
	
	.aa {
		transition: all 2s;
		transform: rotate(0deg);
	}
	
	.go {
		transform: rotate(180deg);
		transition: all 2s;
	}
</style>