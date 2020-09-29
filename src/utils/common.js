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

// js原生动画滚动
export function scrollAnimation(currentY, targetY) {
  // 动画滚动
  let needScrollTop = targetY - currentY
  let _currentY = currentY
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10)
    _currentY += dist
    window.scrollTo(0, currentY)
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY)
    } else {
      window.scrollTo(0, targetY)
    }
  }, 1)
}
