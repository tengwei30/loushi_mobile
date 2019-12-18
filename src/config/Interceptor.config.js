import axios from 'axios'
import BROWSER from '@/utils/browser'
import { getQueryObject, getAppVersion } from '@/utils/url'
import webViewBridge, { showToast } from '@/utils/native'
const { channel, platform, token } = getQueryObject()
axios.defaults.retry = 3 //设置默认重发送次数
axios.defaults.retryDelay = 1000 // 设置重发送间隔时间
axios.defaults.timeout = 5000 // 设置请求超时时间
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 300
}
function getToken() {
  //兼容之前介绍页iOS未在queryString上配置token情况
  if (BROWSER.isiOS && !token) {
    return new Promise(resolve => {
      webViewBridge.callNative(
        'browserGETToken',
        { data: {}, ok: true },
        res => {
          const token = res.token
          resolve(token)
        }
      )
    })
  }
}
/**
 * @description 请求拦截器
 */
axios.interceptors.request.use(
  async config => {
    let nowToken = await getToken()
    nowToken = nowToken ? nowToken : token
    config.headers.common['eventTime'] = Date.now()
    config.headers.common['client-version'] = getAppVersion()
    config.headers.common['client-channel'] = channel
    config.headers.common['client-type'] = platform || 'h5'
    config.headers.common['Authorization'] = decodeURIComponent(nowToken)
    return config
  },
  error => {
    Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function(response) {
    return response && response['data']
  },
  function(error = {}) {
    let response = error.response
    console.log(error)
    if (response === undefined) {
      showToast('网络异常, 请稍后重试')
    }
    return Promise.reject(error)
    // var config = error.config || {}
    // config.__retryCount = config.__retryCount || 0
    // if (config.__retryCount >= config.retry) {
    //   return Promise.reject(error)
    // }
    // config.__retryCount += 1
    // var backoff = new Promise(function(resolve) {
    //   setTimeout(function() {
    //     resolve()
    //   }, config.retryDelay || 1)
    // })
    // return backoff.then(function() {
    //   return axios(config)
    // })
  }
)
export default axios
