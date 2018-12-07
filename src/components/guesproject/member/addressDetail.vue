<template>
	<div class="wapper">
		<div class="wapper-Content">
			<div class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="name">收货人</span>
						<div class="mint-cell-rightCont">
							<input type="text" name="" id="" value="" v-model="name" />
						</div>
					</div>
				</div>
				<div class="mint-cell-right"></div>
			</div>
			<div class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="name">手机号码</span>
						<div class="mint-cell-rightCont">
							<input type="text" name="" id="" value="" v-model="mobile" />
						</div>
					</div>
				</div>
				<div class="mint-cell-right"></div>
			</div>
			<div class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="name">所在地区</span>
						<div class="mint-cell-rightCont" @click="oncity">
							<input type="text" name="" id="" value="" disabled="disabled" v-model="address" />
							<!--<div >{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</div>-->
						</div>
					</div>
				</div>
				<div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
			</div>
			<div class="mint-cell  lastcell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="name">详细地址</span>
						<div class="mint-cell-rightCont">
							<textarea name="" rows="" cols="" v-model="detailedAddress"></textarea>
						</div>
					</div>
				</div>
				<div class="mint-cell-right"></div>
			</div>

			<div class="mintButton">
				<mt-button @click="subAddssRecord()">提交</mt-button>
				<!--:disabled="!name  || !mobile|| !address|| !detailedAddress"-->
			</div>

		</div>
		<div class="address-city" v-show="cityShow">
			<div class="city-title">
				<span class="left" @click="falseAdress()">取消</span>

				<span class="right" @click="submitAdress()">确定</span>
			</div>

			<mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
		</div>
	</div>
</template>

<script>
	import { Field, Picker, Toast } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import Tabs from '../common/tabbar.vue'
	import { addressCont, unser, modifyAddress } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import myaddress from 'src/service/city.json';
	//console.log(myaddress);
	export default {
		data() {
			return {
				cityShow: false,
				cityCont: false,
				myAddressSlots: [{
						flex: 1,
						defaultIndex: 1,
						values: Object.keys(myaddress), //省份数组
						className: 'slot1',
						textAlign: 'center'
					}, {
						divider: true,
						content: '-',
						className: 'slot2'
					}, {
						flex: 1,
						values: [],
						className: 'slot3',
						textAlign: 'center'
					},
					{
						divider: true,
						content: '-',
						className: 'slot4'
					},
					{
						flex: 1,
						values: [],
						className: 'slot5',
						textAlign: 'center'
					}
				],
				myAddressProvince: '省',
				myAddressCity: '市',
				myAddresscounty: '区/县',
				address: '',
				name: '',
				mobile: '',
				detailedAddress: '',
				userInfoAdd: "",
				id: ''

			}
		},

		components: {
			'mt-picker': Picker
		},
		created() {
			this.initUserInf();
			this.id = this.$route.query.id
		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
		},
		updated() {

		},
		mounted() {

			/*console.log(this.$route.query.item, "获取地址")
			let addressData = this.$route.query.item;
			if(){
				
			}else{*/
			let addressData = this.$route.query.item;

			if(addressData) {
				this.name = addressData.name;
				this.mobile = addressData.mobile;
				this.address = addressData.province + addressData.city + addressData.region;
				this.detailedAddress = addressData.addr;
			}

			/*}*/

			this.userCont();
			this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
				this.myAddressSlots[0].defaultIndex = 0

			});
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
			oncity() {
				this.cityShow = true;
				console.log(111)
			},
			onMyAddressChange(picker, values) {
				let _self = this;
				if(myaddress[values[0]]) {
					picker.setSlotValues(1, Object.keys(myaddress[values[0]]));
					picker.setSlotValues(2, myaddress[values[0]][values[1]]);
					_self.myAddressProvince = values[0];
					_self.myAddressCity = values[1];
					_self.myAddresscounty = values[2];
				}
			},
			submitAdress() {
				let _self = this;
				_self.address = _self.myAddressProvince + _self.myAddressCity + _self.myAddresscounty;
				_self.cityShow = false;
				console.log("地址地址")
			},
			falseAdress() {
				this.cityShow = false;
			},
			async userCont() {
				let _self = this;
				let token = _self.userInfo.token;
				let userlist = await unser(token);
				console.log(userlist, "用户信息")
				if(userlist.code == ApiConst.ERROR_SUCCESS) {
					let userInfoData = userlist.data;
					_self.userInfoAdd = userInfoData;

				}

			},
			async addressCont() {
				console.log(this.userInfoAdd, "用户信息");
				let _self = this;
				let userInfoData = _self.userInfoAdd;
				let province = _self.myAddressProvince;
				let city = _self.myAddressCity;
				let region = _self.myAddresscounty;
				let name = _self.name;
				let mobile = _self.mobile;
				let detailedAddress = _self.detailedAddress;
				let memberId = userInfoData.memberId;
				console.log(memberId, "ddddddddddd");
				let cityId = userInfoData.cityId;
				console.log(cityId, "iddididiiddi")
				//console.log(uninfo, "ssssssssssssssss");
				let addressBase = await addressCont(
					name,
					mobile,
					detailedAddress,
					province,
					city,
					region,
					memberId
				);
				if(addressBase.code == ApiConst.ERROR_SUCCESS) {
					Toast({
						message: addressBase.message,
						position: 'middle',
						duration: 2000
					});
				
						_self.$router.push('/guesproject/receAddress');
					

				}
				console.log(addressBase, "提交的地址")
			},
			async modifyAddressCont() {
				console.log(this.userInfoAdd, "用户信息");
				let _self = this;
				let userInfoData = _self.userInfoAdd;
				let province = _self.myAddressProvince;
				let city = _self.myAddressCity;
				let region = _self.myAddresscounty;
				let name = _self.name;
				let mobile = _self.mobile;
				let detailedAddress = _self.detailedAddress;
				let memberId = userInfoData.memberId;
				let addrId = _self.$route.query.item.addrId;
				console.log(memberId, "ddddddddddd");
				//let cityId = userInfoData.cityId;
				//console.log(cityId, "iddididiiddi")
				//console.log(uninfo, "ssssssssssssssss");
				let modifyAddressBase = await modifyAddress(
					name,
					mobile,
					detailedAddress,
					province,
					city,
					region,
					memberId,
					addrId

				);
				if(modifyAddressBase.code == ApiConst.ERROR_SUCCESS) {
					
					Toast({
						message: modifyAddressBase.message,
						position: 'middle',
						duration: 2000
					});
					
						_self.$router.push('/guesproject/receAddress');

				}

			},
			subAddssRecord() {

				this.id ? this.modifyAddressCont() : this.addressCont()
				//修改地址
				//				this.modifyAddressCont();
				//新增地址
				//				this.addressCont()

				//haole
			}

		}

	}
</script>

<style>
	@import "/static/css/guesproject/addressDetail.css";
</style>