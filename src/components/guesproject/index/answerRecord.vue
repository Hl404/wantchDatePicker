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
										<p style="color: #ffa146;">{{!item.useranswer?'-1金币':item.rightanswer.toLocaleUpperCase() ==item.useranswer?'+2金币':'-1金币'}}</p>
										<p	style="color:#dd3131">
											{{!item.useranswer?'答题超时':item.rightanswer.toLocaleUpperCase() == item.useranswer?'答题正确':'答题错误'}}
											</p>
										<!--先是这上面的-->
									</div>
								</div>

								<div class="answer-detail" :ref="'Tan'+idx" :style="'height:'+ item.flag">
									<p class="answer-detail-title">{{item.wtGuessQuestion.content}}</p>
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
												{{!item.rightanswer?'未公布':item.rightanswer == 'A'?item.option1
												:item.rightanswer == 'B'?item.option2
												:item.rightanswer == 'C'?item.option3
												:item.rightanswer== 'D'?item.option4
												:""}}
											<!--	{{item.option1}}-->
											</p>
											<!--<p>{{item}}</p>-->
										</div>
										<div class="right" v-if="item.wager">
											<span>奖励倍数：
												{{!item.rightanswer?'未公布':item.rightanswer == 'A'?item.odds1
												:item.rightanswer == 'B'?item.odds2
												:""}}
												
												倍</span>

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
								<p>暂时没有答题数据</p>
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
	import { recordanwer, unser } from 'src/service/getData'
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

			let info = this.userInfo;
			this.recordanwerCont();
			

		},
		updated() {

			console.log()
			 
			 //因为是数组，这样得不到里面的rightanswer，
			/* if(_self.recordList.rightanswer == "null") {
					alert("答案未揭晓");
					_self.cMessage = "答案未揭晓";
				} else if(_self.recordList.useranswer == "null") {
					_self.cMessage = "答题超时";
					_self.thisColor = "red";
					//this.$refs.message.style.color="";	

				} else if((_self.recordList.rightanswer == _self.recordList.useranswer) {
					//*console.log(_self.recordList.rightanswer, _self.recordList.useranswer, "111111111111111111111111111")
					_self.cMessage = "答题正确";
					_self.useranswer = _self.recordList.useranswer;
					console.log("回答正确");
					//判断正确答案
					if(_self.recordList.useranswer == "A") {
						_self.thisContent = _self.recordList.option1;
					} else if(_self.recordList.useranswer == "B") {
						_self.thisContent = _self.recordList.option2;
					} else if(_self.recordList.useranswer == "C") {
						_self.thisContent = _self.recordList.option3;
					} else if(_self.recordList.useranswer == "D") {
						_self.thisContent = _self.recordList.option4;
					}
					//这个判断不能再那里判断吧
				} else {
					_self.cMessage = "答题错误";
					_self.thisColor = "#06b4ba";
					_self.useranswer = "答题错误";
				}*/
			 
			 // 我的目的是想通过rightanswer   useranswer 这2个字段去判断显示不同的状态，而状态我这边自定义就上面的几种，就是这样
			//console.log(_self.recordList.rightanswer, _self.recordList.useranswer, "我要的答案")

		},
		beforeUpdate(){
//			let _self = this;
			//console.log(_self.recordList, _self.recordList.id,_self.item, "当前数组");
			/*for(let i in _self.recordList){
				console.log(_self.recordList[i],"AA奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥奥")
			}*/
			
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
			async recordanwerCont(type) {
				let _self = this;
				let typeid = _self.$route.params.id;
				let pageNo = this.pageNo;
				let pageSize = this.pageSize;

				let recordanwerlist = await recordanwer(typeid, _self.pageNo, _self.pageSize);
				_self.pageCount = recordanwerlist.data.total;
				console.log(typeid, pageNo, pageSize, recordanwerlist, _self.pageCount, "返回题目成功");
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