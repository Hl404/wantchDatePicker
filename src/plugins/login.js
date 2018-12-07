import { loginByCode, loginByToken } from 'src/service/getData'
import { MessageBox } from 'mint-ui';
import { doAuthRedirect } from 'src/service/redirect'
import { ApiConst } from 'src/utils/mConst'
import { setGlobalToken, getGlobalToken } from 'src/utils/mGlobal'
import { getTimeStamp, getNonceStr } from 'src/utils/mUtils'
import { makeSignature } from 'src/utils/sha1Hex';
import {setStore, getStore} from 'src/utils/mUtils'

export default async(o, callback) => {
	let _this = o;
	var code = _this.$route.query.code;
	var state = _this.$route.query.state;
	var step = _this.$route.query.step;
	var uid = _this.$route.query.uid;
	var token = _this.$route.query.token;
	var path=_this.$route.path;
	//var form=_this.$route.form;
	//console.log(_this.$route.form,"form是啥")
	//console.log(_this.$route.path,"路由啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊 ");
	console.log("进不来1",info)
	var info;
	var codeUsed = false;
	//var  ="[]";
	
	let codeCacheName = 'pre-login-wxcode';
	
	if(code && state) {
		// 判断code是否被使用了（或者是现在是刷新动作）
		let preCode = getStore(codeCacheName);
		
		if (preCode == code) {
			console.log("code is used!");
			codeUsed = true;
		} else {
			setStore(codeCacheName, code);
		}
	}
	
	if (token && uid && (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test')) {
		// 此段用于开发，不对外。
		var timestamp = _this.$route.query.timestamp
		var nonce = _this.$route.query.nonce;
		var signature = _this.$route.query.signature;
		
		var s = makeSignature([token, uid, timestamp, nonce]);
		console.log('loginByToken', token, uid, timestamp, nonce, s, '签名11111');
		
		if (signature) {
			info = await loginByToken(token, uid, timestamp, nonce, signature);	
		} else {
			alert("非法请求");
		}
	} else if(code && state && !codeUsed) {
		// 登录, 获取用户信息，包括token与uid
		console.log("loginByCode", code, state);
		info = await loginByCode(code, state);
	} else if(_this.userInfo && _this.userInfo.token && _this.userInfo.uid) {
		var token = _this.userInfo.token;
		var uid = _this.userInfo.uid;
		var timestamp = getTimeStamp();
		var nonce = getNonceStr();
		
		var s = makeSignature([token, uid, timestamp, nonce]);
		console.log('loginByToken', token, uid, timestamp, nonce,s,'签名22222');
		
		// 登录, 获取用户信息，包括token与uid
		info = await loginByToken(_this.userInfo.token, _this.userInfo.uid,timestamp, nonce);
	} else {
		if(!step) {
			doAuthRedirect(_this,path+'?step=1');
			
		} else {
			alert("参数错误");
		}

		return;
	}

	procLoginResult(_this, info, callback);
	
	function procLoginResult(_this, info, callback) {
		console.log('procLoginResult: '+ info.code,"******************");
		var path=_this.$route.path;
		/*if(info.code == ApiConst.ERROR_SUCCESS) {*/
			if(info.code == ApiConst.ERROR_SUCCESS) {
			let userInfo = info.data;
			console.log(userInfo,"成功了用户信息+++++++++++++");
			setGlobalToken(userInfo.token);
			_this.RECORD_USERINFO(userInfo);

			if(callback) {
				callback(userInfo);
			}
		} else if(info.code == ApiConst.ERROR_INVALID_TOKEN) {
			if (process.env.NODE_ENV != 'development') {
				// token已过期无效,重新授权登录
					doAuthRedirect(_this,path+'?step=1');				
			}
		} else if(info.code == ApiConst.ERROR_FAIL) {
			MessageBox.alert(info.message, "登录失败，请稍后再试！");
		}
	}
}