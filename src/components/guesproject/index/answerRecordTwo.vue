<template>
	<div class="wapper">
		<div class="wapper-content">
			<div class="answerRecord-list" style="height: calc(100vh)">
				<scroll ref="scroll" :data="recordList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(0)" @pullingDown="loadTop" @pullingUp="loadBottom">
					<template >
						<div slot="list" v-if="recordList.length>0">
							<div class="answerRecord-list-item" v-for="(item,idx) in recordList" :key="idx">
								<div class="answerRecord-head">
									<span class="answerRecord-time " style="color: #999;">
										
							{{formatDate(item.ctime)}}
							</span>
									<div class="answerRecord-status">
										<p style="color: #ffa146;">{{!item.rightanswer?'':item.rightanswer == item.useranswer?item.coinChange+'金币':item.coinChange+'金币'}}</p>
										<p	style="color:#dd3131">
											{{!item.rightanswer?'答案未揭晓':!item.useranswer?'答题超时':item.rightanswer.toLocaleUpperCase() == item.useranswer?'猜中了':'未猜中'}}
											</p>
										<!--先是这上面的-->
									</div>
								</div>

								<div class="answer-detail" :ref="'Tan'+idx" :style="'height:'+ item.flag">
									<p class="answer-detail-title" v-html="item.wtGuessQuestion.content"></p>
									<div class="answer-xz">
										<div class="left">
											<p style="color: #555555;">您的答案：{{item.useranswer}} 
												{{!item.useranswer?'未作答':item.useranswer.toLocaleUpperCase() == 'A'?item.option1
												:item.useranswer.toLocaleUpperCase() == 'B'?item.option2
												:item.useranswer.toLocaleUpperCase() == 'C'?item.option3
												:item.useranswer.toLocaleUpperCase() == 'D'?item.option4
												:""}}
											</p>
											<p style="color: #555555;">正确答案：{{!item.rightanswer?"未公布":item.rightanswer.toLocaleUpperCase()}} 
												{{!item.rightanswer?'':item.rightanswer.toLocaleUpperCase() == 'A'?item.option1
												:item.rightanswer.toLocaleUpperCase() == 'B'?item.option2
												:item.useranswer.toLocaleUpperCase() == 'C'?item.option3
												:item.useranswer.toLocaleUpperCase() == 'D'?item.option4
												:""}}
											<!--	{{item.option1}}-->
											</p>
											<!--<p>{{item}}</p>-->
										</div>
										<div class="right" v-if="item.wager">
											<span>奖励倍数：
												{{!item.rightanswer?'未公布':item.rightanswer.toLocaleUpperCase() == 'A'?item.odds1+"倍"
												:item.rightanswer.toLocaleUpperCase() == 'B'?item.odds2+"倍"
												:item.useranswer.toLocaleUpperCase() == 'C'?item.odds3+"倍"
												:item.useranswer.toLocaleUpperCase() == 'D'?item.odds4+"倍"
												:""}}
												
												</span>

										</div>

									</div>
								</div>

								<div @click="showToggle(item,idx)" class="answer-button">
									<span :class="'siberX '+(item.flag==0?'siberS':'')"></span>
								</div>

							</div>
						</div>
						<div v-else slot="list">
							<div v-show="hasData" class="paddingTop" style="margin-top: 20%;">
								<p>暂时没有答题记录</p>
							</div>
							<div v-show="!hasData" class="paddingTop" style="margin-top: 20%;">
								<p><img src="../../../../static/img/loading.gif" /></p>
								<p>内容加载中,请稍后....</p>
							</div>
						</div>
						
					</template>
					
				</scroll>
			</div>

		</div>

	</div>
</template>

<script>
	import { Field, Loadmore } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import { recordanwer, unser,pointUser } from 'src/service/getData'
	import { ApiConst } from 'src/utils/mConst'
	import login from 'src/plugins/login'
	import { formatDate } from 'src/utils/date'
	import Scroll from '../libs/scroll.vue'

	console.log(Scroll, "ccccccccccccccccccccc")

	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				pageCount: 0,
				recordList: [],
				isSubShow: false,
				isMenu: true,
				answerShow: false,
				scrollbar: true,
				scrollbarFade: true,
				cMessage: "",
				flag: "",
				thisColor: "",
				useranswer: "",
				thisContent: "",
				hasData:false
			};
		},
		created() {
			this.initUserInf();
		},
		components: {
			Scroll
		},
		mounted() {
			this.userRecordfunction();
			let info = this.userInfo;
			this.recordanwerCont();
		},
		computed: {
			...mapState([
				'userInfo', 'iflogin'
			]),
			scrollbarObj: function() {
				//alert(1111111)
				return this.scrollbar ? {
					fade: this.scrollbarFade
				} : false
			},
			pullDownRefreshObj: function() {
				//alert(2222)
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
			loadTop() {
				//alert("下拉")
				console.log("下拉111111")
				this.pageNo = 1;
				this.recordanwerCont(0);

			},
			loadBottom() {
				console.log("上拉222222222");
				//alert("上拉")
				if(this.pageNo >=  Math.ceil(this.pageCount/this.pageSize)    ) {
					console.log("生效")
					this.$refs.scroll.forceUpdate();
					return false;
				}
				this.pageNo++;
				this.recordanwerCont(1);

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
			async recordanwerCont(type) {
				let _self = this;
				
				let pageNo = this.pageNo;
				let pageSize = this.pageSize;

				let recordanwerlist = await recordanwer( _self.pageNo, _self.pageSize);
				_self.pageCount = recordanwerlist.data.total;
				console.log( pageNo, pageSize, recordanwerlist, _self.pageCount, "返回题目成功");
				if(recordanwerlist.code == ApiConst.ERROR_SUCCESS) {
					recordanwerlist.data.list.map((e) => {
						e.flag = 0
					})
					let menuData = recordanwerlist.data.list;
					//let menuData=recordanwerlist.data;

					//下面的不是吗pageNo total pageSize
					_self.pageNo = recordanwerlist.data.pageNo;
					_self.pageSize = recordanwerlist.data.pageSize;
					console.log(recordanwerlist.data.pageNo,recordanwerlist.data.pageSize,"当前的页数")

					setTimeout(() => {

						_self.recordList = type == 0 ? menuData : _self.recordList.concat(menuData);
						_self.hasData = menuData.length > 0 ? false : true;
						//this.hasData = menuData.length > 0 ? false : true;*/
					}, 500)


				}
			},
			showToggle(item, idx) {

				let el = this.$refs['Tan' + idx]

				//				console.log(el.height)
				//				var style = window.getComputedStyle ? window.getComputedStyle(el,null) : null || el.currentStyle;
				this.recordList[idx].flag = this.recordList[idx].flag == 0 ? 'auto' : 0

			},
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			},
			rebuildScroll() {
				Vue.nextTick(() => {
					this.$refs.scroll.destroy()
					this.$refs.scroll.initScroll()
				})
			}
		}

	};
</script>

<style>
	.answerRecord-list-item {
		padding: 15px 15px 0 15px;
		background: #FFFFFF;
		margin-top: 10px;
		border-bottom: 1px solid #D5D5D5;
	}
	
	.answerRecord-head {
		overflow: hidden;
		width: 100%;
	}
	
	.answerRecord-time {
		width: 65%;
		float: left;
		text-align: left;
		font-size: 14px;
		margin-top: 25px;
	}
	
	.answerRecord-status {
		width: 35%;
		float: right;
		text-align: center;
		font-size: 13px;
	}
	
	.answerRecord-status p {
		margin-top: 5px;
	}
	
	.answer-detail {
		overflow: hidden;
		/*padding-top: 10px;*/
	}
	
	.answer-xz {
		overflow: hidden;
		margin-top: 10px;
	}
	
	.answer-detail-title {
		width: 100%;
		padding-top: 10px;
		font-size: 14px;
		text-align: left;
		color: #999999;
	}
	
	.answer-xz .left {
		font-size: 15px;
		text-align: left;
		float: left;
	}
	
	.answer-xz .right {
		font-size: 15px;
		text-align: left;
		float: right;
	}
	
	.answer-button {
		margin-top: 10px;
		height: 25px;
	}
	
	.siberX {
		display: block;
		width: 14px;
		height: 10px;
		background: url(../../../../static/img/pathX@2x.png) no-repeat;
		background-size: 14px 10px;
		margin: auto;
	}
	
	.answer-button .siberS {
		background-image: url(../../../../static/img/pathS@2x.png)
	}
</style>