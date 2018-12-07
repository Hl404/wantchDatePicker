<template>
	<div>
		<div class="scoreContent">
			<div class="scoreHead">
				<p class="headline">我的积分</p>
				<div class="scoreBack">
					<p class="Jnumber">{{totalPoints}}</p>
				</div>
			</div>
			<div class="scoreList" style="height: calc(100vh - 215px)">
				<scroll ref="scroll" :data="scorelist" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(0)" @pullingDown="loadTop" @pullingUp="loadBottom">
					<div slot="list">
						<ul v-if="scorelist.length>0">
							<li class="scoreList-item" v-for="item in scorelist">
								<div class="order-message">

									<div class="order-message-right">
										<p class="headline">{{item.remark}}</p>
										<p class="time">时间:<span>{{formatDate(item.ctime)}}</span></p>
									</div>
								</div>
								<div class="grade-bottom">
									<span class="img">
								
							</span>
									<span class="gradeDeta">积分:{{item.score}}</span>
								</div>
							</li>

						</ul>

						<ul v-else>
							<li>
								<div v-show="hasData" class="paddingTop" style="padding-top: 20px;">
									<p>暂时没有积分数据</p>

								</div>

							</li>
							<li>
								<div v-show="!hasData" class="paddingTop">
									<p><img src="../../../../static/img/loading.gif" /></p>

									<p>内容加载中,请稍后....</p>
								</div>
							</li>

						</ul>
					</div>

				</scroll>

			</div>
		</div>

	</div>
</template>

<script>
	import { MessageBox, Loadmore } from 'mint-ui'
	import { mapState, mapMutations } from 'vuex'
	import { myScore, pointUser } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import { formatDate } from 'src/utils/date'
	import login from 'src/plugins/login'
	import Scroll from '../libs/scroll.vue'
	//console.log(myScore);
	console.log(ApiConst, 111)
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				pageCount: 0,
				totalPoints: "",
				scorelist: [],
				hasData: false,
				scrollbar: true,
				scrollbarFade: true
			}
		},
		created() {
			this.initUserInf();
		},
		components: {
			Scroll
		},
		mounted() {
			this.userRecordfunction();
			if(this.iflogin == true) {
				this.scoreData();;
			} else {
				login(this);
			}

			//this.scoreData();
		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
			scrollbarObj: function() {
				return this.scrollbar ? {
					fade: this.scrollbarFade
				} : false
			},
			pullDownRefreshObj: function() {
				return {
					threshold: parseInt(90),
					stop: parseInt(50)
				}
			},
			pullUpLoadObj: function() {
				return {
					threshold: parseInt(0),
					txt: {
						more: '更多',
						noMore: '没有更多数据了'
					}
				}
			}
		},
		methods: {
			///下拉刷新都无所谓，主要是下拉加载
			loadTop() {
				console.log("下拉111111")
				this.pageNo = 1;
				this.scoreData(0);

			},
			loadBottom() {

				console.log("上拉222222222")

				//				if(this.pageNo > this.pageCount) {
				//					this.$refs.scroll.forceUpdate()
				//					return
				//				}
				console.log(Math.ceil(this.pageCount / this.pageSize));

				if(this.pageNo >= Math.ceil(this.pageCount / this.pageSize)) {
					console.log("生效")
					this.$refs.scroll.forceUpdate();
					return false;
				}
				this.pageNo++;
				this.scoreData(1)

			},
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd   hh:mm:ss');
			},
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

				}
			},
			async userRecordfunction(remark) {
				let memberid = this.userInfo.uid;
				let content = this.$route.path;
				if(remark) {
					remark = this.$route.meta.title + "&" + remark;

				} else {
					remark = this.$route.meta.title;
				}
				let pointContent = await pointUser(memberid, content, remark);
				console.log(pointContent, "用户点击")
			},
			async scoreData(type) {
				let _self = this;
				let page = _self.pageNo;
				let pageSize = _self.pageSize;
				let scoreWay = await myScore(page, pageSize);

				console.log(scoreWay);
				_self.pageCount = scoreWay.data.total;
				if(scoreWay.code == ApiConst.ERROR_SUCCESS) {

					let scoreData = scoreWay.data;
					console.log(scoreData, scoreData.length, "jwehrio whjeo rihrw");
					let scoreDatalist = scoreData.list;
					_self.totalPoints = scoreData.mp;
					_self.pageNo = scoreData.pageNo;
					_self.pageSize = scoreData.pageSize;
					console.log(_self.pageNo, _self.pageSize)

					setTimeout(() => {
						//this.ordescorelistrlist = type == 0 ?
						_self.scorelist = type == 0 ? scoreDatalist : _self.scorelist.concat(scoreDatalist)
						//this.scorelist = scoreDatalist;
						_self.hasData = scoreDatalist.length > 0 ? false : true;
						console.log(_self.hasData, scoreDatalist.length, "长度2");
					}, 1000);

					console.log(scoreDatalist.length, scoreData, "长度");

				} else {
					_self.hasData = scoreDatalist.length > 0 ? true : false;
					console.log(_self.hasData, "长度3");
				}

			},
			rebuildScroll() {
				Vue.nextTick(() => {
					this.$refs.scroll.destroy()
					this.$refs.scroll.initScroll()
				})
			}

		},
		watch: {
			iflogin(newV, old) {
				if(this.iflogin == true) {
					this.scoreData();;
				} else {
					login(this);
				}
			}
		}

	}
</script>

<style>
	@import "/static/css/page/myscore.css";
</style>