import {WX_APP_ID} from '../utils/mConst'
import {wxCodeUrl,wxWebUrl} from '../../config/env'

//import StringBuffer from 'src/utils/StringBuffer'

/**
 * 重定向到请求微信授权url
 * params: callback(回调地址)
 * /wxoauth2/getwxcode.html
 * /api/wantech/wxweb/oauth2code
 */
export const doAuthRedirect= (_this,callback) =>{
	// 由于 #号会被切断，用JING代替，回调时在服务端进行替换
	callback = wxWebUrl + '/JINGHAO' + callback;

	var path = "/api/wechat/oauth2code";
	//var path = "/wxoauth2/getwxcode.html";
	var fromVal = _this.$route.query.from;
	if(!fromVal){
	 	//let	WX_APP_ID=fromVal;
	 	fromVal=WX_APP_ID;
	}
	
    var redirectUri = wxCodeUrl + path 
      //+ "?app=" + WX_APP_ID
      + "?from=" + fromVal
	  + "&redirect_uri=" + encodeURIComponent(callback);
	console.log("redirectUri---------------------:"+redirectUri)
	location.href = redirectUri;
}
