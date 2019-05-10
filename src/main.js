import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueProgressBar from 'vue-progressbar'


Vue.use(VueAxios, axios)

import './assets/main.styl'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.config.productionTip = false

let options = {
  color: '#4CAF50',
  failedColor: '#FF5252',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

axios.defaults.baseURL = 'http://silab.agus-hermanto.com/api/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
