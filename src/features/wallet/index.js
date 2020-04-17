import Vue from 'vue'
import App from './App'
import '@/common/index'
import 'babel-polyfill'
import arms from '@/utils/arms'
import Toast from '@/components/Toast/toast.js'

Vue.use(Toast)
Vue.config.errorHandler = (err, vm, info) => {
  arms.error(err, { filename: `${vm.$vnode.tag}, ${info}` })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
