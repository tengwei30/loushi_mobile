import Vue from 'vue'
import App from './App'
import '@/common/index'
import arms from '@/utils/arms'

Vue.config.errorHandler = (err, vm, info) => {
  arms.error(err, { filename: `${vm.$vnode.tag}, ${info}` })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
