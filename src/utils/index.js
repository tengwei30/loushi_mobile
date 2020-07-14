import {
  getQueryString,
  getAppVersion,
  getQueryObject,
  getUrlParamsByObject,
} from '@/utils/url'
import { compareVersion } from '@/utils/string'
import { getCookie } from '@/utils/utils'
import { routerToNative } from '@/utils/native'
import { mBuryPoint } from '@/utils/buryPoint'
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
  routerToNative,
  mBuryPoint
}
