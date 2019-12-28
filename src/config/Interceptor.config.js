import axios from 'axios'
import { Base64 } from 'js-base64'
import { getCookie } from '@/utils/utils'
axios.defaults.retry = 3 //设置默认重发送次数
axios.defaults.retryDelay = 1000 // 设置重发送间隔时间
axios.defaults.timeout = 5000 // 设置请求超时时间
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 300
}

function setHeader() {
  let xClient =
    getCookie('xclient') ||
    'c3Y9OTtwbT1NSSs4K1VEO3NzPTEwODAqMjAyOTtpbWVpPTg2OTc4NTAzMTkzNTk1NjtpbXNpPTQ2MDAyNTMwMjYwMzk4ODttYWM9MDI6MDA6MDA6MDA6MDA6MDA7ZElEPTU1MjYyNTI4YWU2YzU5MDI7dmVyc2lvbj01LjEuMzAuMi4xMDt1c2VybmFtZT1jODc5M2RkNDc2ZDM0NjEyOGQ0OWM4Yzg4OTRjYzY0NztzaWduVmVyc2lvbj0yO3dlYlZlcnNpb249bmV3O29haWQ9bnVsbDtwa3Y9MTs='
  if (xClient !== null && typeof xClient !== 'undefined' && xClient !== '') {
    var xstr = Base64.decode(xClient)
    return xstr
  }
}
/**
 * @description 请求拦截器
 */
axios.interceptors.request.use(
  async config => {
    config.headers.common['Cache-Control'] = 'no-cache'
    config.headers['Accept'] =
      'application/json, text/plain, */*; charset=utf-8'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.common['Pragma'] = 'no-cache'
    config.headers.common['X-client'] = setHeader()
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
      console.error('网络异常, 请稍后重试')
    }
    return Promise.reject(error)
  }
)
export default axios
