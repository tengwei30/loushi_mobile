
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
/**
 * 这个是去书籍的排行榜页面
 */

export function jumpBookRanking() {
  window.location.assign('breader://bookstore/ranking')
}

/**
 * 跳转书籍详情
 * @param {Object} json bookId 书籍的bookId
 */
export function jumpBookDetail(json = { bookId: '' }) {
  const { bookId } = json
  console.log(bookId)
  window.location.assign(`breader://bookstore/bookDetails?bookId=${bookId}`)
}

/**
 * 绑定微信
 */
export function bindingWechat() {
  window.location.assign('breader://binding/wechat')
}