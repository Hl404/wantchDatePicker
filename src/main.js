// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*组件*/
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import App from './App'
import crypto from 'crypto'
import BScroll from 'better-scroll'
import axios from 'axios';
import VueAMap from 'vue-amap';
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
import echarts from "echarts";

/*css*/

import "../static/css/libs/ui-reset.css";
/*import "../static/css/main.css";*/
import "../static/css/libs/sm.css";

import store from './store/'
Vue.prototype.$http= axios
Vue.config.productionTip = false
Vue.use(MintUI);
Vue.use(VueAMap);
Vue.use(YDUI);
/*axios.defaults.withCredentials=true;*/

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;


VueAMap.initAMapApiLoader({
 
    key: '480ae07ab3332d66901dfac5f156b3da',
    plugin: [
        'AMap.Autocomplete', 
        'AMap.PlaceSearch', 
        'AMap.Scale', 
        'AMap.OverView', 
        'AMap.ToolBar', 
        'AMap.MapType', 
        'AMap.PolyEditor',
        'AMap.CircleEditor',
        'AMap.Geolocation'
    ]
    // 默认高德 sdk 版本为 1.4.4
    
});




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

