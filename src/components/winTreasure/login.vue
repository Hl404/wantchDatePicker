<template>
	<div>
		
		
		
			<!--商品核销码-->
		<div class="writeMask" v-show="writeShow">
			<div class="write-Content">
				<div class="write-relative">
					<div class="knapBaseBg">
						<div class="knapImg"><img :src="hxImg"/></div>
						<div class="knapDblsit">
							<p class="dbRecord" style="line-height: 50px;">商品名称：{{hexTime}}</p>
						</div>

						<canvas id="qrccode-canvas" width="50px" height="50px"></canvas>
					</div>
				</div>
			</div>

		</div>
		
		<div class="loginMask"  v-show="loginShow">
	
			<div class="login-Content">
				<div class="login-relative">
					<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
					<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
					
					
				</div>
				<div class="loginMask-btn">
				<mt-button type="danger"  style="margin-top: 20px;width: 100%;" :disabled="!username||!password"  @click.native="submit">登录</mt-button>
				</div>
			</div>
		</div>
		
		

	</div>
</template>

<script>
	
	import { Toast,Field  } from 'mint-ui';
	import { myfun } from 'src/plugins/awardRotate'
	import { mapState, mapMutations } from 'vuex'
	import { dblogin,knapQcode } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import { formatDate } from 'src/utils/date'
	export default {
		data() {
			return {
				loginShow:false,
				username:'',
				password:'',
				message:'',
				hxImg:'',
				hexTime:'',
				writeShow:false
			}
		},
		created() {

		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			])
		},
		components: {
			myfun
		},
		mounted() {
			console.log(this.$route.query.id,"aaaaaaakjwh eokj")
			this.dbwin();
			/*if(this.iflogin == true) {

			} else {
				login(this);
			}*/
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO', 'GET_USERINFO'
			]),
			initUserInf() {
				//console.log(this);
				// 从缓存中读取用户信息，包括token与uid
				this.GET_USERINFO();

				if(this.userInfo && this.userInfo.token && this.userInfo.uid) {
					var token = this.userInfo.token;
					var uid = this.userInfo.uid;
					//TODO: 初始化页面中的用户数据
					console.log(token, uid, "哈哈哈哈啊哈哈")
				}
			},
			
			async winprize() {
				let id=this.$route.query.id;
				let username=this.username;
				let password=this.password;
				let mch_id=this.$route.query.mch_id;
				/*let userInfo={};
				userInfo.username=this.username;
				userInfo.memberId=1;
				userInfo.password=this.password;
				userInfo.id=this.id;
				this.RECORD_USERINFO(userInfo);*/
				let prize = await dblogin(id,mch_id,username,password);
				if(prize.code == ApiConst.ERROR_SUCCESS) {
					this.writeShow=true;
					this.hxImg=prize.data.goodimage;
					this.hexTime=prize.data.goodname;
					Toast({
						message: "核销成功",
						position: 'middle',
						duration: 2000
					})
				}else if(prize.code == ApiConst.ERROR_INVALID_UID_OR_PASSWD) {
					this.loginShow=true;
					Toast({
						message: prize.data,
						position: 'middle',
						duration: 2000
					})
				}else{
					
					
					Toast({
						message: prize.data,
						position: 'middle',
						duration: 2000
					})
				
				}
				
				console.log(prize,"验证登录信息 ");
				
			},
			async dbwin() {
				let id=this.$route.query.id;
				let mch_id=this.$route.query.mch_id;
				let dbPrize = await knapQcode(id,mch_id);
				console.log(id,mch_id,"初始化")
				if(dbPrize.code == ApiConst.ERROR_SUCCESS) {
					//this.message = dbPrize.data;
					this.loginShow=false;
					this.writeShow=true;
					this.hxImg=dbPrize.data.goodimage;
					this.hexTime=dbPrize.data.goodname
					Toast({
						message: prize.data,
						position: 'middle',
						duration: 2000
					})
				}else if(dbPrize.code==ApiConst.ERROR_FAIL){					
					Toast({
						message: dbPrize.data,
						position: 'middle',
						duration: 2000
					})
					
				}
				
				else if(dbPrize.code==ApiConst.ERROR_INVALID_UID_OR_PASSWD){
					
					this.loginShow=true;
					Toast({
						message: dbPrize.data,
						position: 'middle',
						duration: 2000
					})
					
				}else{
					Toast({
						message: dbPrize.data,
						position: 'middle',
						duration: 2000
					})
				}
				console.log(dbPrize,"验证成功 ")
			},
			submit(){
				this.winprize();
				this.loginShow=false;
			},
			hxClose(){
				this.writeShow=false;
			}
		
		}
	}
</script>

<style>
	@import "../../../static/css/winTreasure/index.css";
</style>