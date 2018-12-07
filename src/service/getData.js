import fetch from '../utils/fetch'
import { getStore, getTimeStamp, getNonceStr } from '../utils/mUtils'
import { makeSignature } from 'src/utils/sha1Hex';

/**
 * 登录, by: code and state
 */
export const loginByCode = (code, state) => fetch('/api/user/login', {
	code: code,
	state: state,
}, 'GET', 'force-cache');



/**
 * 登录, by: token and uid
 */
/*export const loginByToken = (token, uid) => fetch('/api/wantech/wxweb/login', {
	token: token,
	uid: uid,
	timestamp: '',
	nonce: '',
	signature: '',
}, 'GET', 'no-cache');*/
export const loginByToken = (token, uid, timestamp, nonce, signature) => fetch('/api/user/login', {
	token: token,
	uid: uid,
	timestamp: timestamp,
	nonce: nonce,
	signature: signature ? signature : makeSignature([token, uid, timestamp, nonce])
}, 'GET', 'force-cache');

//获取我的积分
export const myScore = (page, pageSize) => fetch('/api/user/mp/record', {
	
	pageNo: page,
	pageSize: pageSize
}, 'GET');

//获取所有商家可用优惠券
export const couponlist = (page, pageSize) => fetch('/api/wantech/bonus/list-bonus', {
	type: 1,
	page: page,
	pageSize: pageSize
}, 'GET', 'force-cache')

//获取我的优惠券
export const myCoupon = (page, pageSize) => fetch('/api/wantech/bonus/list-mybonus', {
	//type: 1,
	isCanUse: 1,
	page: page,
	pageSize: pageSize

}, 'GET', 'force-cache')

//领取商家可用优惠券 
export const getCoupon = (type_id, store_id) => fetch('/api/wantech/bonus/receive-bonus', {
	type_id: type_id,
	store_id: store_id

}, 'GET', 'force-cache')

//我的订单　　　
export const myOrder = (page, pageSize) => fetch('/api/wantech/order/get-order', {
	type: 1,
	page: page,
	pagesize: pageSize

}, 'GET')

//退货订单　　　
export const returnOrder = (page, pageSize) => fetch('/api/wantech/order/get-backorder', {
	type: 1,
	page: page,
	pagesize: pageSize

}, 'GET')

//优惠券详情
export const couponInfo = (sn) => fetch('/api/wantech/bonus/get-bonusbarcode', {
	sn: sn
}, 'GET', 'force-cache')

//获取文章公告
export const commonality = (title) => fetch('/api/wantech/notice/get-article', {
	title: title
}, 'GET', 'force-cache')

//  * 获取短信验证码
export const mobileCode = ( mobile) => fetch('/api/user/sendMessage', {
	mobile: mobile
}, 'GET');
//export const mobileCode = ( mobile) => fetch('/api/user/sendMessage', {
//	type: type,
//	mobile: mobile,
//	timestamp: timestamp,
//	nonce: nonce,
//	signature: makeSignature([token, type, mobile, timestamp, nonce])
//}, 'GET', 'force-cache');


//  * 绑定手机号码
export const authCode = (mobile, code) => fetch('/api/user/bindMobile', {
	mobile: mobile,
	code: code
}, 'GET');

//  * 绑定邮箱
export const bindEmail = (email) => fetch('/api/wantech/user/bind-email', {
	email: email
}, 'GET');

/*//  * 会员升级-绑定
export const isMember = (type) => fetch('/api/wantech/user/getbindinfo', {
	type: type
}, 'GET','force-cache');*/

//会员卡
export const memberCard = () => fetch('/api/wantech/barcode/get-memberbarcode', {

}, 'GET');

//绑定银行卡第一步
export const isbankOne = (userName, bankCardNumber) => fetch('/api/wantech/user/add-bankcard-step1', {
	userName: userName,
	bankCardNumber: bankCardNumber
}, 'POST');

//绑定银行卡第二步-获取验证码
export const isbankTwo = (token, type, mobile, timestamp, nonce) => fetch('/api/wantech/user/send-sms-code', {
	type: type,
	mobile: mobile,
	timestamp: timestamp,
	nonce: nonce,
	signature: makeSignature([token, type, mobile, timestamp, nonce])
}, 'GET');

//绑定银行卡第三步-获取绑定银行卡信息
export const isbankThree = (smsCode) => fetch('/api/wantech/user/add-bankcard-step2', {
	smsCode: smsCode
}, 'POST');

//  * 实名认证
export const realnameBd = (realName, idCardNumber) => fetch('/api/wantech/user/realname-authentication', {
	realName: realName,
	idCardNumber: idCardNumber
}, 'POST');

//检测是否设置支付密码
export const yzPassword = () => fetch('/api/wantech/user/issetpayment-password', {}, 'GET');

//检测密码验证身份
export const ckeckPassword = (password) => fetch('/api/wantech/user/checkpayment-password', {
	password: password
}, 'POST');

//设置支付密码
export const szPassword = (password, passwordAgain) => fetch('/api/wantech/user/setpayment-password', {
	password: password,
	passwordAgain: passwordAgain
}, 'POST');

//修改支付密码
export const xgPassword = (oldPassword, newPassword) => fetch('/api/wantech/user/changepayment-password', {
	oldPassword: oldPassword,
	newPassword: newPassword
}, 'POST');

//收银模拟--获取商品信息
export const getSpinfo = () => fetch('/api/wantech/order/getshopinfo', {}, 'GET');

/*export const getSubtest = (
	shopOrder
) => fetch('/api/wantech/order/getshopuserInfo', {
	payment_type: shopOrder.payment_type,
	total_cnt: shopOrder.total_cnt,
	total_money: shopOrder.total_money,
	create_time: shopOrder.create_time,
	trade_sn: shopOrder.trade_sn,
	serial_sn: shopOrder.serial_sn,
	mobile: shopOrder.mobile,
	id: shopOrder.id,
	member_id: shopOrder.member_id,
	member_name: shopOrder.member_name,
	seller_id: shopOrder.seller_id,
	seller_name: shopOrder.seller_name,
	shop_money: shopOrder.shop_money,
	discount_money: shopOrder.discount_money,
	receive_money: shopOrder.receive_money,
	payed_money: shopOrder.payed_money,
	change_money: shopOrder.change_money,
	curPoint: shopOrder.curPoint,
	allPoint: shopOrder.allPoint,
	order_staus: shopOrder.order_staus,
	shopInfo:shopOrder.shopInfo
}, 'POST');*/
//收银模拟--获取用户积分信息
/*export const getSubtest = (shopOrder,token) => fetch('/api/wantech/order/getshopdata',{
	shopOrder:JSON.stringify(shopOrder),token
},'POST');*/

export const getSubtest = (shopOrder) => fetch('/api/wantech/order/getshopuserInfo', {
	shopOrder: JSON.stringify(shopOrder)
}, 'POST');

export const getconfirm = (confirmPay) => fetch('/api/wantech/order/paymoney', {
	shopOrder: JSON.stringify(confirmPay)
}, 'POST');

export const referOrder = (tradesn) => fetch('/api/wantech/order/getshoporder', {
	tradesn: tradesn
}, 'GET');

export const returnGoods = (tradesn) => fetch('/api/wantech/order/backshoporder', {
	tradesn: tradesn
}, 'GET');

//////////趣味竞猜

//获取题型列表GET /api/anon/guess/subject/list

export const subjectList = (token) => fetch('/api/anon/guess/subject/list', {
	token: token
}, 'GET');




//获取用户信息
export const unser = (token) => fetch('/api/user/info', {
	token: token

}, 'GET');

//export const unser2 = () => fetch('/api/user/info', {
//	token: token
//
//}, 'GET');
//获取题目列表
export const anwerType = (typeid) => fetch('/api/guess/question/list', {
	typeid: typeid

}, 'GET');

export const anwerType2 = (mch_id) => fetch('/api/guess/question/list', {
	typeid: 2,
	mch_id:mch_id
	

}, 'GET');

//题目答案提交
export const commitAnwer = (subjectid, useranswer, typeid) => fetch('/api/guess/answer/commit', {
	subjectid: subjectid,
	useranswer: useranswer,
	typeid: typeid

}, 'POST');
export const commitAnwer2 = (subjectid, useranswer,wager) => fetch('/api/guess/answer/commit', {
	subjectid: subjectid,
	useranswer: useranswer,
	wager:wager,
	typeid: 2

}, 'POST');

//
export const commitAnwer3 = (subjectid, useranswer, typeid) => fetch('/api/guess/answer/commit', {
	subjectid: subjectid,
	useranswer: useranswer,
	typeid: typeid

}, 'POST');
//
/*export const commitAnwer = (subjectid,userAnswer,guessstate,wager) => fetch('/api/guess/answer/commit',{
	subjectid:subjectid,
	userAnswer:userAnswer,
	guessstate:guessstate,
	wager:wager
	
},'POST');
*/

//金豆交易记录GET /api/user/goldbean/record
export const goldbase = (pageNo,pageSize, token) => fetch('/api/user/goldbean/record', {
	pageNo: pageNo,
	pageSize:pageSize,
	token: token

}, 'GET');

//获取地址列表/api/user/getaddress
export const addresslist = (token) => fetch('/api/user/getaddress', {
	token: token

}, 'GET');

//添加用户地址/api/user/addaddress
export const addressCont = (
	name,
	mobile,
	addr,
	
	province,
	city,
	region,
	memberId
	
	/*country,
	addrId,
	provinceId,
	regionId,
	townId,
	town,
	zip,
	tel,
	defAddr,
	isdel,
	shipaddressname*/

) => fetch('/api/user/addaddress', {
	name: name,
	mobile: mobile,
	addr: addr,
	province: province,
	city: city,
	region: region,
	memberId: memberId
	/*addrId: addrId,
	country: country,
	provinceId: provinceId,
	regionId: regionId,
	townId: townId,
	town: town,
	zip: zip,
	tel: tel,
	defAddr: defAddr,
	isdel: isdel,
	shipaddressname: shipaddressname*/
	
}, 'POST');

//删除用户地址GET /api/user/deleteaddress

export const deteleAddress = (addrId) => fetch('/api/user/deleteaddress', {
	addrId: addrId

}, 'GET');

//修改用户地址POST /api/user/updateaddress

export const modifyAddress = (
	name,
	mobile,
	addr,
	province,
	city,
	region,
	memberId,
	addrId
	/*country,
	addrId,
	provinceId,
	regionId,
	townId,
	town,
	zip,
	tel,
	defAddr,
	isdel,
	shipaddressname*/

) => fetch('/api/user/updateaddress', {
	name: name,
	mobile: mobile,
	addr: addr,
	province: province,
	city: city,
	region: region,
	memberId: memberId,
	addrId:addrId
	/*addrId: addrId,
	country: country,
	provinceId: provinceId,
	regionId: regionId,
	townId: townId,
	town: town,
	zip: zip,
	tel: tel,
	defAddr: defAddr,
	isdel: isdel,
	shipaddressname: shipaddressname*/
	
}, 'POST');

//答题记录
export const recordanwer = (pageNo,pageSize) => fetch('/api/guess/answer/record/list', {
	typeid:2,
	pageNo:pageNo,
	pageSize:pageSize

}, 'GET');


export const cmusicName = (token) => fetch('/api/guess/question/count', {
	token:token
}, 'GET');




//////////夺宝

//商品列表
export const dbmodity = (mch_id) => fetch('/api/duobao/list', {
	
	mch_id:mch_id
}, 'GET');


//夺宝提交GET /api/duobao/createRecord
export const prizeCont = (mch_id,goodid,type) => fetch('/api/duobao/createRecord', {
	mch_id:mch_id,
	goodid:goodid,
	type:type
}, 'GET');

export const reduceCont = (mp) => fetch('/api/duobao/subCoin', {
	mp:mp
}, 'GET');
export const knapCont = (mch_id) => fetch('/api/duobao/record', {
	mch_id:mch_id
}, 'GET');

export const knapContHx = () => fetch('/api/duobao/record', {
	mch_id:1,
	status:1
}, 'GET');

//检测手机号是否注册

export const getMobile = (token) => fetch('/api/user/checkMobile', {
	token
}, 'GET');
//试下不就好了？？、什么意思  就这样子 两个一样的名字 可以这亚航写那我打包测下，测试来了嗯

export const knapQcode = (id,mch_id) => fetch('/manage/duobao/validateQRCode', {
	id:id,
	mch_id:mch_id
}, 'GET');


export const dblogin = (id,mch_id,username,password) => fetch('/manage/duobao/login', {
	id:id,
	mch_id:mch_id,
	username:username,
	password:password
}, 'POST');


export const lottery = (mch_id) => fetch('/api/duobao/lottery', {
	mch_id:mch_id
}, 'GET');


export const shopHx = () => fetch('/api/shop/order/getOrder', {
	status:"WAITHX"
}, 'GET');

export const rechageBase = (paymoney) => fetch('/api/user/recharge', {
	paymoney:paymoney
}, 'GET');

//export const  rechageBase= (czNumber)=> {
//	return new Promise((resolve, reject) => {
//			 let	requestObj = new XMLHttpRequest();
//			
//			//let params = new URLSearchParams();
//			
//			requestObj.open("GET", "http://192.168.0.111:8082/api/user/recharge?paymoney="+czNumber,true);
//			requestObj.setRequestHeader("Accept", "application/json;charset=UTF-8");
//			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
//			//requestObj.setRequestHeader("token", );
//			//requestObj.setRequestHeader("If-None-Match", etag);
//			requestObj.send();
//
//			requestObj.onreadystatechange = () => {
//				if(requestObj.readyState == 4) {
//					if(requestObj.status == 200) {
//						let obj = requestObj.response
//						if(typeof obj !== 'object') {
//							obj = JSON.parse(obj);
//						}
//						resolve(obj)
//					} else {
//						reject(requestObj)
//					}
//				}
//			}
//		})
//
//
//};



//星趴世界杯竞猜

export const subxpList = (username,phonenumber,usernaswer1,usernaswer2) => fetch('/api/anon/football/setData', {
	username:username,
	phonenumber:phonenumber,
	usernaswer1:usernaswer1,
	usernaswer2:usernaswer2,
}, 'GET');


/*export const subxpList = (username,phonenumber,usernaswer1,usernaswer2) => fetch('/api/anon/football/setData', {
	uuid:uuid,
	username:username,
	phonenumber:phonenumber,
	usernaswer1:usernaswer1,
	usernaswer2:usernaswer2,
}, 'GET');
*/

//票房竞猜

export const movieQuestion = () => fetch('/api/anon/wtBoxOffice/getQuestion', {
	questionid:1
}, 'GET');


export const movieSub= (username,phonenumber,estimate) => fetch('/api/anon/wtBoxOffice/subRecord', {
	username:username,
	phonenumber:phonenumber,
	questionid:1,
	estimate:estimate,
}, 'GET');



//用户点击埋点


export const pointUser = (memberid,content,remark) => fetch('/api/anon/getEventInfo', {
	memberid:memberid,
	content:content,
	remark:remark
}, 'POST');


//多商家\n

export const dsAddress = (province,city) => fetch('/api/anon/getShopList', {
	province:province,
	city:city
}, 'GET');




//乐园卡

export const cardrecord = () => fetch('/api/card/wx/record', {
	
}, 'GET');

//乐园卡套餐列表
export const cardlist= (token) => fetch('/api/card/wx/modList', {
	token
}, 'GET');

//更换手机号码/api/user/changeMobile
export const restMobile = (mobile, code) => fetch('/api/user/changeMobile', {
	mobile: mobile,
	code: code
}, 'GET');
//上传图片
export const uploadPhoto= (id,url) => fetch('/api/card/wx/changPhoto', {
	id:id,
	url:url
}, 'GET');

export const getcardNo= (cardNo) => fetch('/api/card/wx/getCardOutNo', {
	cardNo:cardNo
}, 'GET');



//老板看板
export const getGarden= (starttime,endtime) => fetch('/api/card/statistics/getCardData', {
	starttime,
	endtime
}, 'GET');

//买品
export const getGood= (starttime,endtime) => fetch('/api/card/statistics/getGoodsData', {
	starttime,
	endtime
}, 'GET');

//乐园
export const getWantech= (starttime,endtime) => fetch('/api/card/statistics/getTotalData', {
	starttime,
	endtime
}, 'GET');

export const getMembr= (starttime,endtime) => fetch('/api/card/statistics/getTotalData', {
	starttime,
	endtime
}, 'GET');

