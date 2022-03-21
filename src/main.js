// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = process.env.BASE_API
// Axios.defaults.baseURL = 'http://127.0.0.1:3000/api'

Vue.filter('convertAmount', function (data) {
  if (data.toString().length >= 13) {
    const temp = (data / 1000000000000).toString()
    const val = parseFloat(temp).toFixed(1)
    return val + '万亿'
  } else if (data.toString().length >= 9) {
    const temp = (data / 100000000).toString()
    const val = parseFloat(temp).toFixed(1)
    return val + '亿'
  } else if (data.toString().length >= 5) {
    const temp = (data / 10000).toString()
    const val = parseFloat(temp).toFixed(1)
    return val + '万'
  } else {
    return data
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
