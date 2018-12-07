<template>
	<div>
		<div class="memberUpdate-content">
			<div class="memberUpdate-header">
				<div class="gradeCont">
					会员等级：<span>{{lvName}}</span>
				</div>
				<div class="progressCont">
					<div class="progress-length" :style="{width:widthContent }" id="progress-length">
						<span class="progress-inner" ref="ele" :style="{width: initVal}" id="progress-inner">
							<i class="czNum">{{point}}</i>
						</span>
					</div>
					<div class="progress-zt">
						<span>{{nextLvPoint}}</span>
					</div>
				</div>
			</div>
			<div class="memberUpdate-middle">
				<div class="headBt">
					升级任务
				</div>
				<div class="memberUpdate-menu">
					<div class="memberUpdate-menu-item">
						<div class="leftInfo">
							<p class="conmmon-head"><span>手机号绑定</span></p>
							<p class="info">即日手机号绑定即获得10元星趴电影代金券</p>
						</div>
						<button class="forbid" v-show="mobileShow">已注册</button>
						<!--<div class=""></div>-->
						<button v-show="!mobileShow" class="active" @click="getMobile">升级
							<register @emitRegister="emitRegister" v-show="showNumber "></register>
						</button>
						
						
					</div>
					<div class="memberUpdate-menu-item">
						<div class="leftInfo">
							<p class="conmmon-head"><span>实名认证</span></p>
							<p class="info">实名认证后，会员升级为。。。。。</p>
						</div>
						<button class="forbid" v-show="isNameShow">已认证</button>
						<router-link to="/member/certifiCation" v-show="!isNameShow" class="active">升级</router-link>
					</div>
					<div class="memberUpdate-menu-item">
						<div class="leftInfo">
							<p class="conmmon-head"><span>邮箱绑定</span></p>
							<p class="info">邮箱绑定后，会员升级为。。。。。</p>
						</div>
						<button class="forbid" v-show="emailShow">已绑定</button>
						<router-link to="/member/emailCation" v-show="!emailShow" class="active">升级</router-link>
					</div>
					<div class="memberUpdate-menu-item">
						<div class="leftInfo">
							<p class="conmmon-head"><span>银行卡绑定</span></p>
							<p class="info">银行卡绑定后，会员升级为。。。。。</p>
						</div>

						<button class="forbid" v-if="bankShowBtn==1">已绑定</button>
						<router-link v-else-if="bankShowBtn==0" to="/setting/detectionPassword" class="active">升级</router-link>
						<router-link v-else to="/pay/szPassword" class="active">升级</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox, Indicator } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { setGlobalToken, getGlobalToken } from 'src/utils/mGlobal'
	import { formatDate } from 'src/utils/date'
	import { isMember, yzPassword } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import register from '../member/register.vue'
	//import Bubble from '../libs/bubble.vue
	//console.log(getCoupon);
	export default {
		data() {
			return {
				widthContent: "",
				initVal: "",
				lvName: "",
				point: "",
				nextLvPoint: "",
				mobileShow: true,
				isNameShow: true,
				emailShow: true,
				bankShow: true,
				bankShowBtn: 1,
				showNumber:false
			}
		},
		created() {
			this.initUserInf();
		},
		components: {
			register
		},
		mounted() {
			if(this.iflogin == true) {
				console.log(this.iflogin, "")
				this.memberUpgrade();
			} else {
				login(this);
				console.log("失败哎")
			}

		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),
			
			emitRegister(flag){
				console.log(flag,"你点了授权按钮并且成功了+++++++++——————————————————————————+++++++++++++++++++")
//				if(){
					this.memberUpgrade();
//				}
			},
			initUserInf() {
				//console.log(this);
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();

				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//TODO: 初始化页面中的用户数据
				}
			},
			async memberUpgrade() {
				var bar = document.getElementById("bar");
				let _self = this;
				let type = _self.$route.meta.status;

				let czPage_info = _self.userInfo;
				console.log(czPage_info, "当前的++++++++++++++++++++++")

				_self.point = czPage_info.point; //成长积分
				_self.lvName = czPage_info.lvName;
				_self.nextLvPoint = czPage_info.nextLvPoint;
				_self.initVal = (czPage_info.point / czPage_info.nextLvPoint) * 100 + "%";
				console.log(_self.point, "初始积分")

				let bank_Status = await yzPassword();
				console.log(bank_Status, "检查是否设置支付密码")
				//手机号码绑定

				let memberStatus = czPage_info;
				//console
				//console.log(memberStatus);
				if(memberStatus.mobile == ApiConst.ERROR_SUCCESS) {
					console.log("成功手机")
					_self.mobileShow = true;
					let mobile_info = _self.userInfo;
					_self.point = mobile_info.point; //成长积分
					_self.lvName = mobile_info.lvName;
					_self.nextLvPoint = mobile_info.nextLvPoint; //总积分
					_self.initVal = (mobile_info.point / mobile_info.nextLvPoint) * 100 + "%";
					//console.log( _self.point,_self.nextLvPoint,_self.initVal)
				} else {
					_self.mobileShow = false;
					console.log("失败手机")
				}
				//实名认证
				if(memberStatus.idcard == ApiConst.ERROR_SUCCESS) {
					_self.isNameShow = true;
					//let userInfo = _self.userInfo;
					let rlname_info = _self.userInfo;
					_self.point = rlname_info.point; //成长积分
					_self.lvName = rlname_info.lvName;
					_self.nextLvPoint = rlname_info.nextLvPoint; //总积分
					_self.initVal = (rlname_info.point / rlname_info.nextLvPoint) * 100 + "%";
					console.log("成功实名认证")
					//console.log( _self.point,_self.nextLvPoint,_self.initVal)
					//console.log(userInfo)
				} else {
					_self.isNameShow = false;
					console.log("失败实名认证")
				}
				//邮箱绑定
				if(memberStatus.email == ApiConst.ERROR_SUCCESS) {
					_self.emailShow = true;
					console.log("成功邮箱绑定")
				} else {
					this.emailShow = false;
					console.log("失败邮箱绑定")
				}
				//银行卡绑定
				if(bank_Status.code == ApiConst.ERROR_SUCCESS) {
					//let bind_bankcard = await isbankcard();
					//console.log(bind_bankcard, "银行卡是否绑定")
					if(memberStatus.bankcard == ApiConst.ERROR_SUCCESS) {
						_self.bankShowBtn = 1;
						let bank_info = _self.userInfo;
						_self.point = bank_info.point; //成长积分
						_self.lvName = bank_info.lvName;
						_self.nextLvPoint = bank_info.nextLvPoint; //总积分
						_self.initVal = (bank_info.point / bank_info.nextLvPoint) * 100 + "%";
						console.log("成功银行卡绑定")
					} else {
						_self.bankShowBtn = 0;
						console.log("失败银行卡绑定")
					}
				} else {
					_self.bankShowBtn = -1;
				}

			},
			getMobile(){
				this.initUserInf();
				this.showNumber=true;
				let _self=this;
				let get_mobileInfo = _self.userInfo;
				if(get_mobileInfo.mobile==ApiConst.ERROR_SUCCESS){
					alert("成功了哈啊啊啊啊 ")
					_self.mobileShow = true;
				}
			}

		},
		watch: {
			iflogin(newV, old) {
				if(this.iflogin == true) {
					this.memberUpgrade();
				} else {
					login(this);
					//MessageBox.alert("您还没有登录，请重新登录");
				}
			}
		}
	}
</script>

<style>
	@import "/static/css/page/memberUpgrade.css";
</style>