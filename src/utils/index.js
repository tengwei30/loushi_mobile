import {
  getQueryString,
  getAppVersion,
  getQueryObject,
  getUrlParamsByObject,
} from '@/utils/url'
import { compareVersion } from '@/utils/string'
import {
  throttle,
  formatIsoTime,
  getType,
  isIPhoneXCallback,
  requestAnimFrame,
} from '@/utils/utils'
import BROWSER from '@/utils/browser'
import { nBuryPoint } from '@/utils/buryPoint'
import webViewBridge, {
  routerToNative,
  showToast,
  iosPay,
  setBrowserStatusBarWhite,
} from '@/utils/native'
export {
  getUrlParamsByObject,
  isIPhoneXCallback,
  getQueryString,
  getQueryObject,
  getAppVersion,
  compareVersion,
  BROWSER,
  nBuryPoint,
  formatIsoTime,
  getType,
  throttle,
  webViewBridge,
  routerToNative,
  showToast,
  iosPay,
  setBrowserStatusBarWhite,
  requestAnimFrame,
}
