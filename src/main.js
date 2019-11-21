import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import VCharts from 'v-charts'

Vue.use(VCharts)

Vue.config.productionTip = false
import http from './plugins/http'
import store from './store'
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
