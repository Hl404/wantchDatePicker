<template>
	<div class="amap-page-container">

		<div class="storeContent">
			<div class="storeHeader">
				<el-amap vid="amap" :plugin="plugin" class="amap-demo">
				</el-amap>

				<p style="font-size: 12px;color: #555555;">当前定位城市</p>
				<p style="margin: 20px 0;font-size: 18px;color: #000000;">
					<div class="toolbar">
						<span v-if="loaded">
         		 <!--location: lng = {{ lng }} lat = {{ lat }}-->
         			 {{address}}
        				</span>
						<span v-else>正在定位</span>
					</div>
				</p>
				<p style="font-size: 12px;color: #999999;">请选择你当前所在城市进入下单购买</p>

				<div class="storeHeader-map " style="margin-top: 5px;">
					<div class="storeHeader-map-item" @click="oncity">
						<input type="" name="" id="" disabled="disabled" v-model="myAddressProvince" />
						<img class="xiah" src="../../../static/img/xiah.png" />
					</div>
					<div class="storeHeader-map-item" @click="oncity">
						<input type="" name="" id="" disabled="disabled" v-model="myAddressCity" />
						<img class="xiah" src="../../../static/img/xiah.png" />
					</div>
				</div>

				<div class="storeMiddle">
					<div class="storeMiddle-title">选择门店</div>
					<div class="store-list">
						<div v-if="returnArr.length>0">
							<ul class="store-ul">
								<li v-for="(item,i) in returnArr" @click="choiceshop(item,i)" :class="{active:show=='.'+i}">
									<div class="store-li-address">
										<p class="store-cs">{{item.shopCity}}</p>
										<p class="store-dz">{{item.shopRegion}}{{item.shopName}}</p>
										<p class="store-jl" >{{item.sortLine}}</p>
									</div>
								</li>

							</ul>
						</div>
						<div v-else>
							<p style="margin-top: 30px;color: #999999;">该城市暂时还没有门店</p>
						</div>

					</div>

				</div>

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
	import { Field, Picker, Toast, Indicator } from 'mint-ui';
	import { myfun } from 'src/plugins/awardRotate'
	import { mapState, mapMutations } from 'vuex'
	import { dsAddress } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import myaddress from 'src/service/city.json';
	export default {
		data() {
			let self = this;
			return {
				lng: 0,
				lat: 0,
				loaded: false,
				cityShow: false,
				address: '',
				returnArr: [],
				dsP0: [],
				dsP1: [],
				sortLine: '',
				show: "",
				myAddressProvince: '',
				myAddressCity: '',
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
				plugin: [{
					pName: 'Geolocation',
					events: {
						init(o) {

							Indicator.open({
								text: '定位中...',
								spinnerType: 'fading-circle'
							});
							// o 是高德地图定位插件实可以拿出来吗
							o.getCurrentPosition((status, result) => {
								console.log(result, "位置")
								if(result && result.position) {
									self.lng = result.position.lng;
									self.lat = result.position.lat;
									self.dsP0 = [self.lng, self.lat];
									self.center = [self.lng, self.lat];
									self.address = result.addressComponent.city;
									self.loaded = true;
									self.$nextTick();
									Indicator.close();
									self.addressCont();
								}
							});
						}
					}
				}]
			};
		},
		mounted() {
			this.myAddressProvince = "广东省";
			this.myAddressCity = "深圳市";

		},
		methods: {
			async addressCont() {
				let province = this.myAddressProvince;
				let city = this.myAddressCity;
				let dsLatitude = await dsAddress(province, city);
				console.log(dsLatitude, "经纬度")
				if(dsLatitude.code == ApiConst.ERROR_SUCCESS) {

					this.returnArr = dsLatitude.data;
					for(let i in this.returnArr) {
						this.sortLine = AMap.GeometryUtil.distance(this.dsP0, [this.returnArr[i].shopLng, this.returnArr[i].shopLat]);
						console.log(this.sortLine)
						this.returnArr[i].sortLine = this.sortLine;
					}
					this.returnArr.sort(function(a, b) {
						return a.sortLine - b.sortLine;
					})
					this.returnArr.map((item) => {
						if(item.sortLine < 1000) {
							item.sortLine = item.sortLine + 'm'
						} else {
							item.sortLine = (item.sortLine / 1000).toFixed(1) + 'km'
						}
					})
					console.log(this.returnArr, "排序过后")

				}
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
					_self.myAddressProvince = values[0]
					_self.myAddressCity = values[1];
					_self.myAddresscounty = values[2];

				}
			},
			submitAdress() {
				let _self = this;
				_self.address = _self.myAddressCity;
				_self.cityShow = false;
				this.addressCont();
				console.log("地址地址")
			},
			falseAdress() {
				this.cityShow = false;
			},
			choiceshop(item, i) {
				this.show = '.' + i;
				let userId=this.$route.query.userId;
				let shopId=item.shopId;
				console.log(shopId)
				console.log(item)
				if(this.$route.query.userId="1"){
					console.log("夺宝");
					localStorage.setItem("mch_id",item.shopId);
					this.$router.push({ name: 'test2'});
				}
				//console.log(this.$route.query.userId,"当前ID");

			}
		}

	};
</script>

<style>
	/*@import "../../../static/css/winTreasure/storeselect.css";*/
	
	.storeHeader {
		padding: 35px 0;
		background: #FFFFFF;
	}
	
	.storeMiddle {
		margin-top: 10px;
		background: #FFFFFF;
	}
	
	.store-ul {
		overflow: hidden;
		padding-bottom: 30px;
	}
	
	.store-ul li {
		width: 50%;
		float: left;
		padding: 15px 15px 0 15px;
	}
	
	.store-ul li .store-li-address {
		background: #fff2e0;
		padding: 15px;
	}
	
	.store-ul .active .store-li-address {
		background: #fdbc5e;
		color: #FFFFFF;
	}
	
	.store-ul .active .store-li-address p{
		color: #FFFFFF;
	}
	.store-li-address .store-cs {
		color: #222222;
		font-size: 14px;
	}
	.store-li-address .store-dz {
		color: #555555;
		font-size: 12px;
	}
	
	.store-li-address .store-jl {
		color: #999999;
		font-size: 12px;
	}
	
	.storeMiddle-title {
		height: 35px;
		line-height: 35px;
		text-align: left;
		padding-left: 15px;
		font-size: 12px;
		border-bottom: 1px solid #F5F5F5;
	}
	
	.storeHeader-map-item {
		width: 230px;
		height: 35px;
		margin: auto;
		position: relative;
		margin-top: 10px;
	}
	
	.storeHeader-map-item input {
		text-align: center;
		height: 35px;
		line-height: 35px;
		border: none;
		background: #46aaf8;
		border-radius: 5px;
		color: #FFFFFF;
		width: 100%;
		font-size: 15px;
	}
	
	.storeHeader-map-item .xiah {
		position: absolute;
		right: 0;
		top: 0;
		right: 10px;
		top: 12px;
	}
	
	.address-city {
		width: 100%;
		position: absolute;
		bottom: 0;
		background: #e4e4e4;
	}
	
	.city-title {
		border-bottom: 1px solid #D5D5D5;
		padding: 10px 15px;
		overflow: hidden;
	}
	
	.city-title .left {
		float: left;
	}
	
	.city-title .right {
		float: right;
	}
	
	.mint-cell .mint-cell-wrapper {
		background-image: none;
	}
	
	.store-li-address p {
		margin: 5px;
	}
</style>