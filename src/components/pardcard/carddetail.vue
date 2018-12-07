<template>

	<div class="card-detail">

		<input id="upload_file" ref="upload_file" type="file" style="display: none;" accept='image/*' name="file" @change="fileChange($event)" />
		<div class="image-item space" @click="showActionSheet()">
			<div class="image-up"></div>
		</div>

		<div class="upload_warp" v-show="loadShow">

			<div class="upload_warp_img">
				<div class="upload_warp_img_div" v-if="imgUrl" >
					<!--<div class="upload_warp_img_div_top">
						<img src="../../assets/images/anwerX2@2x.png" class="upload_warp_img_div_del" @click="fileDel(index)">
					</div>-->
					<div class="loadImg">
						<img :src="imgUrl" class="img"  />
						
					</div>
				</div>
				<div class="upload_warp_img_div" v-else >
					<div class="loadImg">
						<img src="../../assets/images/moren@2x.png" class="img"/>
					</div>
				</div>

			</div>
			<div class="upload_warp_left" id="upload_warp_left" @click="fileClick()" v-if="this.imgList.length < 6">
			
				更换图像
			</div>

		</div>

		<!--<div class="upload_warp_text">
			
		</div>-->

		<div class="card-qcode">
			<div class="trcode">
				<canvas id="trCode" width="100" height="60"></canvas>
			</div>
			<div class="ercode">
				<canvas id="qrccode-canvas2" width="180" height="180"></canvas>
			</div>
			<div class="cardInfo">
				<p>{{cardTitle}}</p>
				<p v-show="cardY">剩余:{{cardNum}}次</p>
				<p v-show="cardTime1" style="color: #555555;">有效期至：{{formatDate(endTime)}}</p>
				<p v-show="cardTime2" style="color: #555555;">使用时间:{{formatDate(startTime2)}}-{{formatDate(endTime2)}}</p>
			</div>
			<div class="cardgz">
				<p class="tic">使用规则:</p>
				<p>{{cardgzInfo}}</p>
			</div>
		</div>

	</div>

</template>

<script>
	import { MessageBox, Toast,Indicator  } from 'mint-ui';
	import QRCode from 'qrcode';
	import JsBarcode from 'jsbarcode'
	import { mapState, mapMutations } from 'vuex'
	import { mobileCode, authCode, uploadImg, uploadImgs, uploadPhoto } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	//	import 'src/assets/js/libs/webuploader.min.js'
	import { formatDate } from 'src/utils/date'
	let OSS = require('ali-oss');
	///console.log(OSS)
	let canvas2 = '';
	var trCode='';
	export default {
		data() {
			return {
				imgList: [],
				//datas: new FormData(),
				files: null,
				size: 0,
				imgUrl: '',
				cardY: false,
				cardTitle: "",
				cardTime1: false,
				cardTime2: false,
				startTime: "",
				startTime2: "",
				endTime: "",
				endTime2: "",
				cardNum: "",
				loadShow: false,
				cardgzInfo:""

			}
		},
		mounted() {
			let cardData = JSON.parse(localStorage.getItem('cardData'));
			let shopCode = cardData.id.toString() ;
			
			console.log(shopCode);
			let canvas2 = document.getElementById('qrccode-canvas2');
			let trCode = document.getElementById('trCode');

			QRCode.toCanvas(canvas2,shopCode , (error) => {
				if(error) {
					console.log("error")
				} else {
					console.log('success')
				}
			});
			
			
			JsBarcode(trCode, shopCode, {

					format: "CODE128", //选择要使用的条形码类型

					text: shopCode,

					displayValue: false, //是否在条形码下方显示文字

					textPosition: "bottom" //设置文本的垂直位置

				})
			if(cardData.type == 'measuredCard') {

				this.cardY = true;
				this.cardNum = cardData.canusetimes;
				this.cardTime1 = true;
				this.cardTime2 = false;
				this.endTime = cardData.endtime;
				this.loadShow = false;
				this.cardgzInfo=cardData.rule;

			} else if(cardData.type == 'monthlyCard') {
				this.imgUrl = cardData.photos;
				this.cardTitle = "月卡套餐";
				this.cardY = false;
				this.cardTime1 = false;
				this.cardTime2 = true;
				this.startTime2 = cardData.starttime;
				this.endTime2 = cardData.endtime;
				this.loadShow = true;
			} else if(cardData.type == 'quarterlyCard') {
				this.imgUrl = cardData.photos;
				this.cardTitle = "季卡套餐";
				this.cardY = false;
				this.cardTime1 = false;
				this.cardTime2 = true;
				this.startTime2 = cardData.starttime;
				this.endTime2 = cardData.endtime;
				this.loadShow = true;
			} else if(cardData.type == 'yearlyCard') {
				this.imgUrl = cardData.photos;
				this.cardTitle = "年卡套餐";
				this.cardY = false;
				this.cardTime1 = false;
				this.cardTime2 = true;
				this.startTime2 = cardData.starttime;
				this.endTime2 = cardData.endtime;
				this.loadShow = true;
			}

		},
		methods: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy年 MM月 dd日');
			},
			fileClick() {
				let cardData = JSON.parse(localStorage.getItem('cardData'));
				if(cardData.usedtimes>0){
					 
					Toast({
						message: '您的卡已消费过,不能更换图片',
						position: 'middle',
						duration: 1000
					});
				}else{
					 this.$refs.upload_file.click();
				}
				
				 
				
				
				
				//$('#upload_file').click();

			},

			uploadImg(res, file) {
				
				let that = this;
				res.file = file;
				var suffix = that.get_suffix(res.file.name);
				var random_name = that.random_string(32);
				var key = res.dir + '/' + random_name + suffix;
				var formFile = new FormData();
				formFile.append("key", key);
				//formFile.append("dir", res.dir);
				formFile.append("policy", res.policy);
				formFile.append("OSSAccessKeyId", res.OSSAccessKeyId);
				formFile.append("success_action_status", "200");
				formFile.append("signature", res.signature);
				formFile.append("callback", res.callback);
				formFile.append("file", file);
				
				$.ajax({
					type: "POST",
					//url:'/upload'
					url: "https://wantech.oss-cn-hangzhou.aliyuncs.com",
					//url: res.action,  //动态
					async: true,
					data: formFile,
					processData: false,
					// 告诉jQuery不要去设置Content-Type请求头
					contentType: false,
					dataType: "json",
					success: function(res) {
						Indicator.close();
						 //console.log(res, "上传图片")
						let   dataImg=res.data.filename +"?x-oss-process=style/thumb_300x300";
						that.imgUrl = dataImg;
						
						let cardData = JSON.parse(localStorage.getItem('cardData'));
						cardData.photos=dataImg;
						localStorage.setItem('cardData', JSON.stringify(cardData));
						that.unloadphoto(dataImg)
						console.log(that.imgUrl);
						
					},
					error: function(res) {
						//console.log(res, "上传失败")
						Indicator.close();
					}
				});
			},
			upload(file) {
				let that = this;
				Indicator.open('上传中...');
				let promis = new Promise(function(resolve, reject) {
					$.ajax({
						type: "get",
						url: "https://oss.wantech99.com/aliyun/oss/policy",
						async: true,
						dataType: "jsonp",
						jsonp: "callback",
						success: function(res) {
							resolve(res)
							
						},
						error: function(res) {
							reject(res)
							
						}
					});
				})
				promis.then(function(res) {
					console.log(res, 'canshu')
					that.uploadImg(res, file)

				}).catch(function(res) {
					console.log(res)
				})

			},
			unloadphoto(loadurl) {
				let cardData = JSON.parse(localStorage.getItem('cardData'));
				let id = cardData.id;
				uploadPhoto(id, loadurl).then(function(res) {
					if(res.code == ApiConst.ERROR_SUCCESS) {
						Toast("上传成功")
					} else {
						Toast("上传失败")
					}

				})

			},
			fileChange(e) {
				this.files = e.srcElement.files[0];
				console.log(this.files, "获取文件");
				if(this.files.size / 1024 / 1024 === 10) {
					alert("上传的文件不能大于10M")
				}else{
					this.upload(this.files)
				}

				
					e.target.value = ''
				
			},
			// 根据路径获取后缀
			get_suffix(filename) {
				var pos = filename.lastIndexOf('.');
				var suffix = '';
				if(pos != -1) {
					suffix = filename.substring(pos);
				}
				return suffix;
			},
			// 随机字符串
			random_string(len) {
				len = len || 32;
				var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				var maxPos = chars.length;
				var pwd = '';
				for(var i = 0; i < len; i++) {
					pwd += chars.charAt(Math.floor(Math.random() * maxPos));
				}
				return pwd;
			}
		},
	}
</script>

<style>
	.upload_warp_left {
		width: 100px;
		height: 30px;
		margin: auto;
		line-height: 30px;
		text-align: center;
		color: #555555;
	}
	
	.upload_warp_img_div .loadImg {
		width: 90px;
		height: 90px;
		margin: auto;
	}
	
	.upload_warp_img_div .loadImg .img {
		display: block;
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		
	}
	.card-qcode{
		padding: 0 15px;
		margin-top: 10px;
	}
	.card-detail {
		height: 100%;
		background: #FFFFFF;
		padding-top: 50px;
	}
	
	.card-qcode p {
		font-size: 14px;
	}
	
	.ercode {
		margin-top: -10px;
	}
	
	.ercode #qrccode-canvas2 {
		width: 140px !important;
		height: 140px !important;
	}
	
	.cardInfo {
		margin-top: -10px;
	}
	
	.upload_warp_img {
		width: 100px;
		height: 100px;
		overflow: hidden;
		border-radius: 5px;
		margin: auto;
		position: relative;
	}
	#trCode{
		width: 95%;
		height: 100px;
		margin: auto;
	}
	
	
	.cardgz{
		margin-top: 10px;
		margin-bottom: 5px;
	}
	
	.cardgz .tic{
		font-size: 13px;
		
	}
	.cardgz p{
		text-align: left;
		color: #999999;
		font-size: 12px;
	}
</style>