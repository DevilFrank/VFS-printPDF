// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vant from 'vant'
import axios from 'axios'
import 'vant/lib/index.css';
import { Button, NavBar,Field ,Picker ,Popup ,NoticeBar  } from 'vant';
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(NoticeBar);
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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vant,
  components: { App },
  template: '<App/>'
})
