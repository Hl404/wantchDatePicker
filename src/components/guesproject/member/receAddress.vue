<template>
	<div class="wapper1">
		<div class="wapper-content">

			<div class="address-list">
				<template v-if="addressList.length>0">
					<div class="address-list-item marTop" v-for="(item,index) in addressList" :key="index">
						<div class="address-nameheader">
							<span>{{item.name}}{{item.lengthj}}</span>
							<span class="address-tel">{{item.mobile}}</span>
						</div>
						<div class="address-content">
							{{item.province}}{{item.city}}{{item.region}}{{item.town}}{{item.addr}}
						</div>
						<div class="address-button">
						
							<router-link :to="{name:'addressDetail',query:{item:item,id:item.addrId}}" class="address-submit">
								修改
							</router-link>
								<span class="address-delete" @click="submitMont(index)">
							删除
							</span>
						</div>

						<div class="mint-msgbox-baseCont" v-show="mintShow==index">
							<div class="mint-msgbox">
								<div class="mint-msgbox-header">
									<div class="mint-msgbox-title">确定删除吗？<p></p></div>
								</div>
								<div class="mint-msgbox-content">
									<div class="mint-msgbox-message"></div>
									<div class="mint-msgbox-input" style="display: none;"><input placeholder="" type="text">
										<div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
									</div>
								</div>
								<div class="mint-msgbox-btns">
									<button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="deClose">取消</button>
									<button class="mint-msgbox-btn mint-msgbox-confirm " @click="deleteAdd(item.addrId,index)"> 确定</button></div>
							</div>
						</div>
					</div>

				</template>
				<template v-else>
					<p style="margin-top: 30%;color: #999999;">暂无收货地址</p>

				</template>
			</div>

			<div class="addressBottom">
				<router-link :to="{name:'addressDetail'}">
					添加收货地址
				</router-link>
			</div>

		</div>

	</div>
</template>

<script>
	import { Field } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import Tabs from '../common/tabbar.vue'
	import { addresslist, unser, deteleAddress } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	export default {
		data() {
			return {
				addressList: [],
				mintShow: -1,
				tMessage: ""

			};
		},
		created() {

			this.initUserInf();
		},

		mounted() {

			this.reaceAderrCont();
			let info = this.userInfo;
			//console.log(this.iflogin,this.userInfo,"登录状态");
			/*if(this.iflogin == true) {
				console.log("登录成功")
				setTimeout(() => {
					this.userCont();
					this.subjectCont();
				}, 500)
			} else {
				login(this);
				
			}*/

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
					//TODO: 初始化页面中的用户数据
					console.log(token, uid, "哈哈哈哈啊哈哈")
				}
				console.log(this.GET_USERINFO(), "成功了吗")
			},
			async reaceAderrCont() {
				let _self = this;
				let token = _self.userInfo.token;

				let addressBase = await addresslist(token);
				if(addressBase.code == ApiConst.ERROR_SUCCESS) {
					_self.addressList = addressBase.data;
				}
				console.log(addressBase, "成功了haaaaaa");
			},
			async deteleAderrCont(addrId) {
				let _self = this;
				let token = _self.userInfo.token;
				let addressCont = await deteleAddress(addrId);
				if(addressCont.code == ApiConst.ERROR_SUCCESS) {
					_self.tMessage = addressCont.data;

				} else {
					_self.tMessage = addressCont.data;
				}
				console.log(addressCont, "成功了haaaaaa");
			},
			submitMont(index) {
				this.mintShow = index;

			},
			deClose() {
				this.mintShow = -1;
			},
			deleteAdd(addId, index) {
				console.log(index, "....")
				this.mintShow = -1;
				this.addressList.splice(index, 1);
				let addrId = addId;
				console.log(addrId)
				this.deteleAderrCont(addrId);

			}

		}

	};
</script>

<style>
	@import "/static/css/guesproject/receAddress.css";
</style>