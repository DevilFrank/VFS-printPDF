import Vue from 'vue'
import Router from 'vue-router'
import Preview from '../views/Preview.vue'
import Payfor from '../views/Payfor.vue'
import Order from '../views/Order.vue'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Preview',
    component: Preview
  },
  {
    path: '/payfor',
    name: 'Payfor',
    component: Payfor
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  }
]
const router = new Router({
  routes
})

export default router


