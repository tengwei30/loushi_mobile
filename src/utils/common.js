/**
 * 常用的活动调用的js方法
 */
import BROWSER from './browser'
/**
 * 下载app
 * @param {Number}} time 业务需求，延时跳转商店单位毫秒
 */
export function downLoadApp(andoridApk, iosStoreUrl, time) {
  if (BROWSER.isiOS || BROWSER.isiPhone) {
    if (time) {
      setTimeout(() => {
        window.location.href = iosStoreUrl
      }, time)
    } else {
      window.location.href = iosStoreUrl
    }
  } else {
    window.location.href = andoridApk
  }
}
