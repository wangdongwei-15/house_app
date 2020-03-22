import Vue from 'vue'
import App from './App.vue'
import router from './router'


import axios from 'axios';
Vue.prototype.$http = axios;

import "amfe-flexible";

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);




axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

