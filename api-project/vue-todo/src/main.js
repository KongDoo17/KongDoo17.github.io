import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import router from './store/router'

Vue.config.productionTip = false

new Vue({
  el : '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
