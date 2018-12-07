/**
 * 配置编译环境和线上环境之间的切换
 *
 * apiUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * wxCodeUrl: 微信授权登录地址
 * wxWebUrl: 本项目前端地址
 */

var wxWebUrl = window.location.protocol+"//"+window.location.host;
var routerMode = 'history';
//var imgBaseUrl = 'http://imgs.szwantech.com';
var wxCodeUrl = 'https://api.wantech99.com';
var loginUrl = 'https://api.wantech99.com';
var apiUrl = 'https://api.wantech99.com';


console.log("env: " + process.env.NODE_ENV)

if (process.env.NODE_ENV == 'development') {
   // wxWebUrl = 'https://wxweb.hengyangphz.com';
   wxWebUrl = 'https://wxweb.szwantech.com';//测试环境
    
  // wxWebUrl = 'http://go.szwantech.com';
} else if (process.env.NODE_ENV == 'test') {
} else if (process.env.NODE_ENV == 'production') {
   // wxWebUrl = 'https://wxweb.hengyangphz.com';
   wxWebUrl = 'https://wxweb.wantech99.com';//正室环境
  
   //wxWebUrl = 'https://wxweb.wantech99.com';
}

export {
	routerMode,
	apiUrl,
	loginUrl,
	imgBaseUrl,
	wxCodeUrl,
	wxWebUrl,
}
