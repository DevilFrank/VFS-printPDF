// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vant from 'vant'
import 'vant/lib/index.css';
import { Button, NavBar,Field ,Picker ,Popup  } from 'vant';
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Popup);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vant,
  components: { App },
  template: '<App/>'
})
