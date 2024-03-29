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
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://127.0.0.1:3000'

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

Vue.prototype.changeMask = function (masked) {
  if (masked) {
    document.querySelector('.drawer-bg').style.left = 0
    document.querySelector('.drawer-bg').style.background = 'rgba(0,0,0,0.3)'
  } else {
    document.querySelector('.drawer-bg').style.left = '-100vw'
    document.querySelector('.drawer-bg').style.background = 'transparent'
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
