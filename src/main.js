// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vant from 'vant'
import axios from 'axios'
import wx from "weixin-js-sdk"
import 'vant/lib/index.css';
import { Button, NavBar,Field ,Picker ,Popup ,NoticeBar ,Uploader  } from 'vant';
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(NoticeBar);
Vue.use(Uploader);
Vue.config.productionTip = false
Vue.prototype.$ajax=axios
router.beforeEach((to, from, next) => {
  // 让页面回到顶部
   // chrome
   document.body.scrollTop = 0;
   // firefox
   document.documentElement.scrollTop = 0;
   // safari
   window.pageYOffset = 0;
  // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
 next()
})
const wxconfig = function(data){
	wx.config({
	 debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	 appId: data.appId, // 必填，公众号的唯一标识
	 timestamp: data.timestamp, // 必填，生成签名的时间戳
	 nonceStr: data.nonceStr, // 必填，生成签名的随机串
	 signature: data.signature, // 必填，签名，见附录1
	 jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
}
const wexinPay = function(data) {
  console.log('发起微信支付');
  //下面要发起微信支付了
  wx.ready(function () {
   wx.chooseWXPay({
    timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: data.paySign, // 支付签名
    success: function (res) {
     // 支付成功后的回调函数
	 var userdata = JSON.parse(window.localStorage.userInfo);
	 userdata.rechargeNum = data.money;
	 window.localStorage.userInfo = JSON.stringify(userdata);
	 window.location.href="https://www.ixuestar.com/api/ixuestarPay/index.html#/finish";
    },
    fail: function (res) {
     //失败回调函数
     // errorCb(res);
	 console.log(res);
    }
   });
  });
  wx.error(function (res) {
	  console.log(res);
   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
   /*alert("config信息验证失败");*/
  });
 }
 // 超时时间
axios.defaults.timeout = 15000;
axios.defaults.baseURL = 'http://qa.travbao.com/goabraod/';
Vue.prototype.$axios = axios;
Vue.prototype.wxconfig = wxconfig;
Vue.prototype.wexinPay = wexinPay;
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vant,
  components: { App },
  template: '<App/>'
})
