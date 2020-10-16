import Vue from 'vue'
import Router from 'vue-router'
import Preview from '../views/Preview.vue'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Preview',
    component: Preview
  }
]
const router = new Router({
  routes
})

export default router


