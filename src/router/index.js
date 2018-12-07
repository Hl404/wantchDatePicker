import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

Router.prototype.goback = function(isBack) {　　
	this.isBack = true;　　
	window.history.go(-1);

	return isBack;
}

/*export default */

const router = new Router({

	routes: [{
			path: '/',
			redirect: '/member/center'
		},
		//个人中心
		{
			path: '/member/center',
			component: resolve => require(['../components/page/member/myCenter.vue'], resolve),
			meta: {
				title: '个人中心',
				status: "all"
			}
		},
		//我的优惠券
		{
			path: '/member/coupon',
			component: resolve => require(['../components/page/member/coupon.vue'], resolve),
			meta: {
				title: '我的优惠券',
				status: "bind"
			}

		},
		//优惠券详情
		{
			path: '/member/couponInfo',
			component: resolve => require(['../components/page/member/couponInfo.vue'], resolve),
			meta: {
				title: '优惠券付款'
			}
		},
		//折扣优惠
		{
			path: '/member/discount',
			component: resolve => require(['../components/page/member/discount.vue'], resolve),
			meta: {
				title: '折扣优惠',
				status: "bind"
			}
		},
		//生日礼包
		{
			path: '/member/discountsKac',
			component: resolve => require(['../components/page/member/discountsKac.vue'], resolve),
			meta: {
				title: '生日礼包',
				headTitle: "shengrilibao"
			}
		},
		//会员制度
		{
			path: '/member/memberSystem',
			component: resolve => require(['../components/page/member/memberSystem.vue'], resolve),
			meta: {
				title: '会员制度',
				headTitle: "huiyuanzhidu"
			}
		},
		//会员升级
		{
			path: '/member/memberUpgrade',
			component: resolve => require(['../components/page/member/memberUpgrade.vue'], resolve),
			meta: {
				title: '会员升级',
				status: "bind"
			}
		},
		//实名认证
		{
			path: '/member/certifiCation',
			component: resolve => require(['../components/page/member/certifiCation.vue'], resolve),
			meta: {
				title: '实名认证'
			}
		},
		//邮箱认证
		{
			path: '/member/emailCation',
			component: resolve => require(['../components/page/member/emailCation.vue'], resolve),
			meta: {
				title: '邮箱认证'
			}
		},
		//银行卡认证
		{
			path: '/member/bankCation',
			component: resolve => require(['../components/page/member/bankCation.vue'], resolve),
			meta: {
				title: '银行卡认证'
			}
		},
		//银行信息填充
		{
			path: '/member/bankInfo',
			component: resolve => require(['../components/page/member/bankInfo.vue'], resolve),
			meta: {
				title: '银行信息填充',
				status: "check"
			}
		},
		//会员卡
		{
			path: '/member/card',
			component: resolve => require(['../components/page/member/clubCard.vue'], resolve),
			meta: {
				title: '会员卡',
				status: "bind"
			}
		},
		//手机授权
		{
			path: '/member/register',
			component: resolve => require(['../components/page/member/register.vue'], resolve),
			meta: {
				title: '手机授权',
				status: "bind"
			}
		},
		/*支付模块*/
		//账户余额
		{
			path: '/pay/balance',
			component: resolve => require(['../components/page/pay/balance.vue'], resolve),
			meta: {
				title: '账户余额'
			}
		},
		//充值方式
		{
			path: '/pay/recharge',
			component: resolve => require(['../components/page/pay/recharge.vue'], resolve),
			meta: {
				title: '充值方式'
			}
		},
		//提现
		{
			path: '/pay/withdraw',
			component: resolve => require(['../components/page/pay/withdraw.vue'], resolve),
			meta: {
				title: '提现'
			}
		},

		//设置支付密码
		{
			path: '/pay/szPassword',
			component: resolve => require(['../components/page/pay/szPassword.vue'], resolve),
			meta: {
				title: '设置支付密码'
			}
		},

		//我的积分
		{
			path: '/score/myscore',
			component: resolve => require(['../components/page/score/myscore.vue'], resolve),
			meta: {
				title: '我的积分'
			}
		},
		//兑换公告
		{
			path: '/score/scoreConvert',
			component: resolve => require(['../components/page/score/secoreConvert.vue'], resolve),
			meta: {
				title: '积分兑换公告',
				headTitle: "jifenduihuan"
			}
		},
		//退货订单
		{
			path: '/order/returnedGoods',
			component: resolve => require(['../components/page/order/returnedGoods.vue'], resolve),
			meta: {
				title: '退货订单'
			}
		},
		//我的订单
		{
			path: '/order/myOrder',
			component: resolve => require(['../components/page/order/myOrder.vue'], resolve),
			meta: {
				title: '我的订单'
			}
		},

		//设置密码
		{
			path: '/setting/revisePassword',
			component: resolve => require(['../components/page/setting/revisePassword.vue'], resolve),
			meta: {
				title: '修改支付密码'
			}
		},
		//验证身份输入密码
		{
			path: '/setting/detectionPassword',
			component: resolve => require(['../components/page/setting/detectionPassword.vue'], resolve),
			meta: {
				title: '输入支付密码,验证身份'
			}
		},
		//模拟登录1
		{
			path: '/order/cashierOne',
			component: resolve => require(['../components/page/order/cashierOne.vue'], resolve),
			meta: {
				title: '生成订单'
			}
		},
		//模拟登录2
		{
			path: '/order/cashierTwo',
			component: resolve => require(['../components/page/order/cashierTwo.vue'], resolve),
			meta: {
				title: '收钱'
			}
		},
		//模拟登录3
		{
			path: '/order/cashierThree',
			component: resolve => require(['../components/page/order/cashierThree.vue'], resolve),
			meta: {
				title: '查看订单'
			}
		},
		//模拟登录4
		{
			path: '/order/cashierFour',
			component: resolve => require(['../components/page/order/cashierFour.vue'], resolve),
			meta: {
				title: '退货'
			}
		},
		//插件
		{
			path: '/libs/bubble',
			component: resolve => require(['../components/page/libs/bubble.vue'], resolve),
			meta: {
				title: '下拉'
			}
		},
		{
			path: '/libs/Device',
			component: resolve => require(['../components/page/libs/Device.vue'], resolve),
			meta: {
				title: '下拉2'
			}
		},
		{
			path: '/libs/scroll',
			component: resolve => require(['../components/page/libs/scroll.vue'], resolve),
			meta: {
				title: '下拉3'
			}
		},
		/*趣味竞猜//////////////////*/
		{

			path: '/guesproject/tabbar.vue',
			component: resolve => require(['../components/guesproject/common/tabbar.vue'], resolve)
		},
		{
			path: '/guesproject/index',
			component: resolve => require(['../components/guesproject/index/index.vue'], resolve),
			meta: {
				title: '首页'
			}
		},
		{
			path: '/guesproject/member',
			component: resolve => require(['../components/guesproject/member/member.vue'], resolve),
			meta: {
				title: '我的'
			}
		},
		{
			path: '/guesproject/shopping',
			component: resolve => require(['../components/guesproject/member/shopping.vue'], resolve),
			meta: {
				title: '商城'
			}
		},
		{
			path: '/guesproject/order',
			component: resolve => require(['../components/guesproject/member/order.vue'], resolve),
			meta: {
				title: '订单'
			}
		},
		{
			path: '/guesproject/currency',
			component: resolve => require(['../components/guesproject/member/currency.vue'], resolve),
			meta: {
				title: '虚拟货币记录'
			}
		},
		{
			path: '/guesproject/exchange',
			component: resolve => require(['../components/guesproject/member/exchange.vue'], resolve),
			meta: {
				title: '兑换记录'
			}
		},
		{
			path: '/guesproject/receAddress',
			component: resolve => require(['../components/guesproject/member/receAddress.vue'], resolve),
			meta: {
				title: '收货地址'
			}
		},
		{
			path: '/guesproject/addressDetail',
			name: 'addressDetail',
			component: resolve => require(['../components/guesproject/member/addressDetail.vue'], resolve),
			meta: {
				title: '地址管理'
			}
		},
		{
			path: '/guesproject/about',
			component: resolve => require(['../components/guesproject/member/about.vue'], resolve),
			meta: {
				title: '关于'
			}
		},
		{
			path: '/guesproject/lmazamox',
			component: resolve => require(['../components/guesproject/member/lmazamox.vue'], resolve),
			meta: {
				title: '金豆问题'
			}
		},
		{
			path: '/guesproject/customer',
			component: resolve => require(['../components/guesproject/member/customer.vue'], resolve),
			meta: {
				title: '商品售后'
			}
		},
		{
			path: '/guesproject/contactUs',
			component: resolve => require(['../components/guesproject/member/contactUs.vue'], resolve),
			meta: {
				title: '联系我们'
			}
		},

		{
			path: '/guesproject/interestAnswer',
			name: 'interestAnswer',
			component: resolve => require(['../components/guesproject/index/interestAnswer.vue'], resolve),
			meta: {
				title: '趣味答题'
			}
		},
		{
			path: '/guesproject/interestCompet',
			name: 'interestCompet',
			component: resolve => require(['../components/guesproject/index/interestCompet.vue'], resolve),
			meta: {
				title: '趣味竞猜'
			}
		},
		{
			path: '/guesproject/guessName',
			name: 'guessName',
			component: resolve => require(['../components/guesproject/index/guessName.vue'], resolve),
			meta: {
				title: '猜歌名'
			}
		},
		{
			path: '/guesproject/guessLyric',
			name: 'guessLyric',
			component: resolve => require(['../components/guesproject/index/guessLyric.vue'], resolve),
			meta: {
				title: '猜歌词'
			}
		},
		{
			path: '/guesproject/answerRecord/:id',
			name: 'answerRecord',
			component: resolve => require(['../components/guesproject/index/answerRecord.vue'], resolve),
			meta: {
				title: '答题记录'
			}
		},
		{
			path: '/guesproject/answerRecordTwo',
			component: resolve => require(['../components/guesproject/index/answerRecordTwo.vue'], resolve),
			meta: {
				title: '答题记录'
			}
		},
		{
			path: '/guesproject/answerRecord',
			component: resolve => require(['../components/guesproject/index/answerRecord.vue'], resolve),
			meta: {
				title: '答题规则'
			}
		},
		{
			path: '/guesproject/recharge',
			component: resolve => require(['../components/guesproject/index/recharge.vue'], resolve),
			meta: {
				title: '充值'
			}
		},
		{
			path: '/guesproject/gogao',
			component: resolve => require(['../components/guesproject/member/gogao.vue'], resolve),
			meta: {
				title: '公告'
			}
		},

		{
			path: '/winTreasure/index',
			component: resolve => require(['../components/winTreasure/index.vue'], resolve),
			name: "duobao",
			meta: {
				title: '欢乐夺宝'
			}
		},
		{
			path: '/winTreasure/login',
			name: 'dbName',
			component: resolve => require(['../components/winTreasure/login.vue'], resolve),
			meta: {
				title: '夺宝登录'
			}
		},

		{
			path: '/winTreasure/myback',
			component: resolve => require(['../components/winTreasure/myback.vue'], resolve),
			meta: {
				title: '核销'
			}
		},
		{
			path: '/winTreasure/storeselect',
			component: resolve => require(['../components/winTreasure/storeselect.vue'], resolve),
			name: 'storeselect',
			meta: {
				title: '门店选择'
			}
		},

		/*足球竞猜*/

		{
			path: '/lunck/index',
			component: resolve => require(['../components/lunck/index.vue'], resolve),
			meta: {
				title: '品球论足'
			}
		},
		{
			path: '/lunck/movie',
			component: resolve => require(['../components/lunck/movie.vue'], resolve),
			meta: {
				title: '票房竞猜'
			}
		},
		{
			path: '/winTreasure/test',
			component: resolve => require(['../components/winTreasure/test.vue'], resolve),
			meta: {
				title: '测试专用'
			}
		},
		{
			path: '/winTreasure/test2',
			component: resolve => require(['../components/winTreasure/test2.vue'], resolve),
			name: "test2",
			meta: {
				title: '测试专用2'
			}
		},
		{
			path: '/winTreasure/test3',
			component: resolve => require(['../components/winTreasure/test3.vue'], resolve),

			meta: {
				title: '测试专用3'
			}
		},
		//乐园卡
		{
			path: '/pardcard/membercard',
			component: resolve => require(['../components/pardcard/membercard.vue'], resolve),

			meta: {
				title: '乐园卡'
			}
		},
		{
			path: '/pardcard/modifyIphone',
			component: resolve => require(['../components/pardcard/modifyIphone.vue'], resolve),

			meta: {
				title: '更换手机号码'
			}
		},
		
		{
			path: '/pardcard/registerIphone',
			component: resolve => require(['../components/pardcard/registerIphone.vue'], resolve),

			meta: {
				title: '手机号码验证'
			}
		},
		
		{
			path: '/pardcard/carddetail',
			component: resolve => require(['../components/pardcard/carddetail.vue'], resolve),
			meta: {
				title: '乐园卡详情'
			}
		},
		
		{
			path: '/pardcard/cardrecord',
			component: resolve => require(['../components/pardcard/cardrecord.vue'], resolve),

			meta: {
				title: '交易记录'
			}
		},
		
		

		//老板看板
		{
			path: '/bossject/memtab',
			component: resolve => require(['../components/bossject/member/memtab.vue'], resolve),
		},
		{
			path: '/bossject/member',
			component: resolve => require(['../components/bossject/member/member.vue'], resolve),

			meta: {
				title: '会员'
			}
		},
		{
			path: '/bossject/shop',
			component: resolve => require(['../components/bossject/shop/shop.vue'], resolve),

			meta: {
				title: '卖品'
			}
		},
		{
			path: '/bossject/wantch',
			component: resolve => require(['../components/bossject/wantch/wantch.vue'], resolve),

			meta: {
				title: '万天'
			}
		},
		{
			path: '/bossject/garden',
			component: resolve => require(['../components/bossject/garden/garden.vue'], resolve),

			meta: {
				title: '乐园'
			}
		},
		//选项卡
		{
			path: '/bossject/clenderTab',
			name:'clenderTab',
			component: resolve => require(['../components/bossject/calendarPlug/clenderTab.vue'], resolve)

		},

		{
			path: '/bossject/datepicker',
			component: resolve => require(['../components/bossject/calendarPlug/datepicker.vue'], resolve),
			meta: {
				title: '日期'
			}

		}
	
	
		

	]
})

router.beforeEach(function(to, from, next) {

	let routes = to;
	// 从路由的元信息中获取 title 属性
	if(routes.meta.title) {
		document.title = routes.meta.title
		// 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
		/*if(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			const hackIframe = document.createElement('iframe')
			hackIframe.style.display = 'none'
			hackIframe.src = '/robots.txt?r=' + Math.random()

			document.body.appendChild(hackIframe)

			setTimeout(_ => {
				document.body.removeChild(hackIframe)
			}, 300)
		}*/

	}
	next();
})

export default router