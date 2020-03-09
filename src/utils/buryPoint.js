// import { post } from '@/config/axios.config'
import axios from 'axios'
import BROWSER from './browser'

/**
 * 获取设备类型
 */
function getOsType() {
  if (BROWSER.isAndroid) {
    return 'android'
  }
  if (BROWSER.isiPad || BROWSER.isiPhone) {
    return 'ios'
  }
  if (BROWSER.isWindows) {
    return 'windows'
  }
  return 'others'
}

/**
 * device string 操作系统 使用者 android、 ios、 windows、 others
 * url string 当前h5页面地址
 * eventTime bigint 埋点触发时间（ 用户设备时间）
 */

/**
 * H5自己发埋点
 * @param {object} eventValue 埋点字段
 */
export function mBuryPoint(eventValue = {}) {
  const defaultData = {
    device: getOsType(),
    eventTime: Date.now(),
    url: window.location.href,
  }

  axios.get('/api/operation/statistics', {
    params: { ...defaultData, ...eventValue }
  }).then(() => {}).catch(err => {
    console.error('error ----> ', err)
  })
}
