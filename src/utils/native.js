
const platformId = Number(localStorage.getItem('platformId')) // 平台号

/**
 * 路径跳转
 * 站内 H5 跳转 H5 页面
 * 3平台是浏览器～不需要编码
 */

export function routerToNative(url) {
  if (platformId === 3) {
    window.location.assign(url)
  } else {
    window.location.assign(`breader://common/browser?url=${encodeURIComponent(url)}`)
  }
}