
<template>
	<div>

		<div class="center-header">
			<div class="center-info">
				<span class="center-info-img">
					<img :src="unserInfo.pageUrl"/>
				</span>
				<div class="info-right">
					<p class="account">账号:<span>{{unserInfo.pageUid}}</span></p>
					<p class="grade">账户等级：<span>{{unserInfo.pagelvId}}</span></p>
				</div>
			</div>
			<div class="center-score">
				<div class="center-scoreLeft">
					账户：<span>¥0.00
						<!--{{unserInfo.accountRemain}}-->
					</span>
				</div>
				<div class="center-scoreRight">
					<router-link to="/pay/balance">充值提现</router-link>
				</div>
			</div>
			<div class="myScore">
				<div class="myScore-left">
					<router-link to="/score/myscore" class="myScore-link">
						<p class="Bimg"><img src="/static/img/jifen.png" /></p>
						<p class="font">我的积分</p>
					</router-link>
				</div>
				<div class="myScore-right">
					<router-link to="/member/coupon" class="myScore-link">
						<p class="Bimg"><img src="/static/img/youhuijuan.png" /></p>
						<p class="font">我的优惠券</p>
					</router-link>
					<!--<router-link to="/member/register" v-show="!unserInfo.iphoneShwo" class="myScore-link">
						<p class="Bimg"><img src="/static/img/youhuijuan.png" /></p>
						<p class="font">我的优惠券</p>
					</router-link>-->
					
					
				</div>
			</div>
		</div>
		<div class="center-middle">
			<div class="headline">
				<h1>会员权益</h1></div>
			<div class="center-menu">
				<div class="center-menu-ietm">
					<router-link to="/member/discount" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">折扣优惠</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					<router-link to="/member/discountsKac" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">生日礼包</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					<router-link to="/score/scoreConvert" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">积分兑换</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					
					
				</div>
				<div class="center-menu-ietm second">
					<router-link to="/order/myOrder" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">我的订单</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					
					
					<router-link to="/order/cashierOne" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">生成订单</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					<router-link to="/order/cashierThree" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">查看订单</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					<router-link to="/order/returnedGoods" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">退货订单</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link> 
					<router-link to="/order/cashierFour" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">确定退货</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					<router-link to="/member/memberSystem" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">会员制度</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					<router-link to="/member/memberUpgrade" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">会员升级</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
					<router-link to="/setting/revisePassword" class="mint-cell">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<div><i class="indexicon icon-toast"></i> <span class="name">修改支付密码</span></div>
							</div>
						</div>
						<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
					</router-link>
				</div>
			</div>

		</div>

	</div>
	</div>
</template>

<script>
	//import { makeSignature } from 'src/utils/sha1Hex';
	import { MessageBox } from 'mint-ui';
	//import { isMember} from 'src/service/getData'
	import { mapState, mapMutations } from 'vuex'
	import login from 'src/plugins/login'
	import { ApiConst } from 'src/utils/mConst'
	export default {
		data() {
			return {
				unserInfo: {
					pageUid: '',
					pagelvId: '',
					pageUrl:'',
					accountRemain: '',
					iphoneShwo:true
				}
			}
		},
		created() {
			this.initUserInf();			
		},
		mounted() {
			
			//console.log(this.userInfo)
			
			if (!this.iflogin) {
				login(this, this.fillPageData);	
				this.getMemberUpgrade();
			}
		},
		computed: {
			...mapState([
				'userInfo','iflogin'
			]),
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),

			initUserInf() {
				//console.log(this);
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();
				/*
				console.log("-------------------")
				console.log(this.userInfo.token)
				console.log("-------------------")//*/

				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//console.log(uid);
					//console.log(token);
					
					//TODO: 初始化页面中的用户数据
					this.fillPageData(this.userInfo);
					console.log(this.userInfo,"++++++++++++++");
			
				}
			},
			fillPageData(userInfo) {
				this.unserInfo.pageUid = userInfo.uid;
				this.unserInfo.pagelvId = userInfo.lvId;
				this.unserInfo.accountRemain = userInfo.accountRemain;
				this.unserInfo.pageUrl=userInfo.headImgUrl;				
			},
			getMemberUpgrade(){
				let memberStatus=this.userInfo;
				if(memberStatus.mobile == ApiConst.ERROR_SUCCESS) {
						this.unserInfo.iphoneShwo = true;
						
					} else {
						this.unserInfo.iphoneShwo = false;
					}
			}
		}
	}
</script>

<style>
	@import "/static/css/page/myCenter.css";
</style>