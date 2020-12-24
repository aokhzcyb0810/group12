import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import * as echarts from 'echarts'

Vue.prototype.$echarts=echarts

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.timeout=10000;
axios.defaults.baseURL="http://10.251.253.212:8081"
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

new Vue({
  router,
  store,
  render: h => h(App),
  components: {
    App
  }
}).$mount('#app')


