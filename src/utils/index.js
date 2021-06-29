import {
  getQueryString,
  getAppVersion,
  getQueryObject,
  getUrlParamsByObject,
} from '@/utils/url'
import { compareVersion } from '@/utils/string'
import { getCookie } from '@/utils/utils'
import {
  throttle,
  formatIsoTime,
  getType,
  isIPhoneXCallback,
  requestAnimFrame,
} from '@/utils/utils'
import BROWSER from '@/utils/browser'

export {
  getUrlParamsByObject,
  isIPhoneXCallback,
  getQueryString,
  getQueryObject,
  getAppVersion,
  compareVersion,
  BROWSER,
  formatIsoTime,
  getType,
  throttle,
  requestAnimFrame,
  getCookie,
}
