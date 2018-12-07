<template>
	<div>
		<div class="withdraw-content">
			<div class="withdraw-bank">
				<span class="withdraw-label">提现到</span>
				<div class="withdraw-bank-info">农业银行(4275)</div>
				<span class="withdraw-selects"></span>
			</div>
			<div class="withdraw-tx">
				<div class="withdraw-tx-content">
					<p class="hand">提现金额</p>
					<div class="withdraw-tx-input">
						<i class="dols">¥</i>
						<input type="" name="" id="" value="" class="moneyNum" />
					</div>
				</div>
				<div class="withdraw-tx-bance">
					可提金额：<i class="figure">288.00</i>
					<span class="withdraw-qtx">全部提现</span>
				</div>
			</div>
			<div class="withdraw-buttonCont">
					<mt-button>提现</mt-button>
					<p class="status">提交完成后48小时内审核到账</p>
				</div>
		</div>
		<!--弹层-->
			<div class="withdraw-bankMask">
				<div class="withdraw-bankMask-content">
					<div class="withdraw-content-header">
						<p>选择到账银行卡</p>
						<p class="status">请留意个银行卡到账时间</p>
						<span class="close_X">
							
						</span>
					</div>
					<div class="withdraw-bankCard-Content">
						<div class="withdraw-bankCard-item">
							<span class="bankImg">
								
							</span>
							<div class="card-item">
								<p class="bankID">招商银行 储蓄卡 (1345)</p>
								<p class="status">2小时内到账</p>
							</div>
						</div>
						<div class="withdraw-bankCard-item">
							<span class="bankImg">
								
							</span>
							<div class="card-item">
								<p class="bankID">招商银行 储蓄卡 (1345)</p>
								<p class="status">2小时内到账</p>
							</div>
						</div>
						<div class="withdraw-bankCard-item last-child">
							<div class="card-item">使用新卡提现</div>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
</script>

<style>
	@import "/static/css/page/withdraw.css";
</style>