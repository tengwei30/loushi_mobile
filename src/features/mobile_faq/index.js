import Vue from 'vue'
import App from './App'
import '@/common/index'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
if (process.env.VUE_APP_DEVELOP_ENV === 'false') {
  Raven.config('https://0d7e1555997c40b68234e4e2caab914c@sentry.io/5184799')
    .addPlugin(RavenVue, Vue)
    .install()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
