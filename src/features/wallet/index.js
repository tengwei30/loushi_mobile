import Vue from 'vue'
import App from './App'
import '@/common/index'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import arms from '@/utils/arms'
import Toast from '@/components/Toast/toast.js'

Vue.use(Toast)
require('es6-promise').polyfill()
Es6Promise.polyfill()
Vue.config.errorHandler = (err, vm, info) => {
  arms.error(err, { filename: `${vm.$vnode.tag}, ${info}` })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
