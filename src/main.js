import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false
import mock from '../src/plugins/mock'
Vue.prototype.$mock = mock;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
