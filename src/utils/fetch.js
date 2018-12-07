import { apiUrl, loginUrl } from '../../config/env'
import { getGlobalToken } from 'src/utils/mGlobal'
import { setStore, getStore } from 'src/utils/mUtils'
import { ApiConst } from 'src/utils/mConst'
import crypto from 'crypto'

/*
 * 返回为json格式:{'code', 'message', 'data'}
 * force-cache: 强制缓存，一般需要用到data项的都要设置此值；且当type为GET时，本地进行缓存。
 */
export default async(url = '', data = {}, type = 'GET', cache = 'force-cache', method = 'fetch') => {

	var token = null;
	var dataStr = ''; //查询data拼接字符串
	var preUrl = apiUrl;
	var apiCacheName;
	var apiCacheObj; // object: {'url', 'etag', 'data'}
	var etag = '';
	// get token
	if(data['token']) {
		token = data['token'];
	} else {
		token = getGlobalToken();
	}
	// type
	type = type.toUpperCase();
	// combine query text
	Object.keys(data).forEach(key => {
		if (key != 'token') {
			let val = typeof data[key]  == 'object' ? 'object' : data[key];
			dataStr += key + '=' + encodeURIComponent(val) + '&';
		}
	})
	dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
	// combine url
	
	
	if(!(url.indexOf("aliyun") != -1) && !(url.indexOf("upload") != -1)){
		url = preUrl + url;
	}
	
	
	if(type == 'GET' && dataStr) {
		url += '?' + dataStr;
		//console.log(url,"get的URL")
	}
	// get etag
	if(type == 'GET' && cache == 'force-cache') {
		// read cache
		apiCacheName = 'api-' + crypto.createHash('md5', url).digest('hex');
//		console.log(apiCacheName,"API")
		let text = getStore(apiCacheName);

		if(text) {
			apiCacheObj = JSON.parse(text);
			//console.log(apiCacheObj)
			if(apiCacheObj) {
				etag = apiCacheObj.etag;
			}
			//console.log("old etag:"+etag);
		}
	}

	if(window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include', //true, include, false
			method: type,
			headers: {
				'Accept': 'application/json;charset=UTF-8',
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				//'X-Csrf-Token': token,
				'token': token,
				'If-None-Match': etag,
			},
			mode: "cors",
			redirect: 'follow',
			cache: cache
		}

		if(type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: dataStr
			
			})
			
			
		}
		try {
			const response = await fetch(url, requestConfig);
			console.log("response:" + response.status,"status1+");
			if(apiCacheName) {
				
				if(response.status == ApiConst.SC_NOT_MODIFIED) {
					console.log(apiCacheObj.data, "截取用户信息")
					return apiCacheObj.data;
					//alert(11)
				} else if(response.status == ApiConst.SC_OK) {
					
					const responseJson = await response.json();
					let newETag = response.headers.get('ETag');
					console.log(responseJson.code, newETag, responseJson,"进来了")

					if(responseJson.code == ApiConst.ERROR_SUCCESS && newETag) {
						// store cache
						var cacheObj = {
							'etag': newETag,
							'url': url,
							'data': responseJson
						}
						//console.log(url,"打印当前URL")
						setStore(apiCacheName, cacheObj);
					}
					return responseJson;
				}
			}
			const responseJson = await response.json();
			return responseJson;
		} catch(error) {
			throw new Error(error);
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if(window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}
			//let params = new URLSearchParams();
			let sendData = '';
			if(type == 'POST') {
				//sendData = JSON.stringify(data);
				sendData = dataStr;
			}
			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Accept", "application/json;charset=UTF-8");
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
			requestObj.setRequestHeader("token", token);
			//requestObj.setRequestHeader("If-None-Match", etag);
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if(requestObj.readyState == 4) {
					if(requestObj.status == 200) {
						let obj = requestObj.response
						if(typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}