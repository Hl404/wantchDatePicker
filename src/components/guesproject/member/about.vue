<template>
	<div class="wapper">
		<div class="wapper-Content">
			<router-link to="/guesproject/lmazamox" class="mint-cell ">
						<div class="mint-cell-wrapper">
								<i class="indexicon "></i> 
								<span class="name">金豆问题</span>
						</div>
						
				</router-link>
				<router-link to="/guesproject/customer" class="mint-cell ">
						<div class="mint-cell-wrapper">
								<i class="indexicon "></i> 
								<span class="name">商品售后</span>
						</div>
						
				</router-link>
				<router-link to="/guesproject/contactUs" class="mint-cell ">
						<div class="mint-cell-wrapper">
								<i class="indexicon "></i> 
								<span class="name">联系我们</span>
						</div>
						
				</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style>
.wapper-Content .mint-cell{
	border-bottom: 1px solid #D5D5D5;
	font-size: 15px;
	color: #333333;
}

.wapper-Content .mint-cell:last-child{
	background-image: none;
}
</style>