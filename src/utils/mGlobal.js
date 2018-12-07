import { getStore } from './mUtils'

var gToken = null;

var gTempDateData=null;

export const setGlobalToken = token => {
	//console.log("---------->"+token);
	gToken = token;
}

export const getGlobalToken = () => {
	if (!gToken) {
		var userInfoText = getStore('userInfo');
		
		if (userInfoText) {
			try{
				var userInfo = JSON.parse(userInfoText);
				gToken = userInfo.token;
			}catch(e){
				console.log(e.message);
			}
		}
	}
	
	if (!gToken) {
		gToken = '';
	}
	
	//console.log("-------222--->"+gToken);
	
	return gToken;
}


//获取时间Data


export const setTempDateData = dateData => {
	//console.log("---------->"+token);
	gTempDateData = dateData;
}


export const getTempDateData = () => {
	//console.log("---------->"+token);
	return gTempDateData;
}
