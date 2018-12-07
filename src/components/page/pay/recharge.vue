<template>
	<div>
		<div class="recharge-Content">
			<div class="recharge-Content-head">
				选择充值方式
			</div>
			<div class="recharge-middle">
				<div class="recharge-middle-item">
					<div class="cz-left cz_Wx">微信充值</div>
					<span class="span"></span>
				</div>
				<div class="recharge-middle-item marTop">
					<div class="recharge-middle-header">
						<div class="cz-left cz_bank">银行卡充值</div>
						<span class="span active"></span></div>
					<div class="add-bankMask">
						<div class="recharge-bankInfo">
							<div class="bankInfo-detail"><!--中国农业银行储蓄卡（4275）-->添加银行卡</div>
							<i class="select"></i>
						</div>
						<div class="recharge-bankInput">
							<label class="label">充值金额</label>
							<div class="srInput">
								<i class="buck">¥</i>
								<input type="" name="" id="" value="" class="moneyNum" />
							</div>
						</div>
					</div>
				</div>

				<div class="recharge-buttonCont">
					<mt-button>下一步</mt-button>
				</div>
			</div>
			<!--弹层-->
			<div class="bankMask">
				<div class="bankMask-content">
					<div class="bankMask-content-header">
						<p>选择充值银行卡</p>
						<span class="close_X">
							
						</span>
					</div>
					<div class="bankCard-Content">
						<div class="bankCard-item">
							<span class="bankImg">
								
							</span>
							<div class="card-item">招商银行 储蓄卡 (1345)</div>
						</div>
						<div class="bankCard-item">
							<span class="bankImg">
								
							</span>
							<div class="card-item">招商银行 储蓄卡 (1345)</div>
						</div>
						<div class="bankCard-item last-child">
							<div class="card-item">添加银行卡</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	@import "/static/css/page/recharge.css";
</style>