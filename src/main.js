import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from '@/api/axios'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import "@/assets/css/scrollbar.css";
// import './permisson'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios //将axios用Vue.prototype添加到vue原型链上使用
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
}).$mount('#app')
