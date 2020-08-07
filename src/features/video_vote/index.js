import Vue from 'vue'
import App from './App'
import '@/common/index'
const { Scroll } = cube

Vue.use(Scroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
