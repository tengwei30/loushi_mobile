import dsbridge from 'dsbridge'

/**
 * 设置导航栏的自定义方法
 * @param {Object} args 传入一个对象,包含以下参数
 * title: 顶部标题
 * titleColor: 标题颜色
 * rightText: 导航右侧文案
 * rightTextColor: 导航右侧的文字颜色
 * callback: 导航右侧文字的点击回调
 * bgColor: 导航背景颜色
 * iconType: 返回按钮的样式
 */
export const setHeader = (args) => {
  dsbridge.call('setHeaderNative', args)
}

/**
 * 关闭h5的当前页面
 * @param {Function} callback 关闭当前页面后的回调
 */
export const closeCurrentPage = (callback) => {
  dsbridge.call('closePageNative', callback)
}
/**
 * 返回
 * @param {Object} args 对象包含以下参数
 * step: 返回多少层级
 */
export const goBack = (args) => {
  console.log(args)
  dsbridge.call('goBackNative', args)
}

/**
 * 吐司提示
 * @param {Object} args 包含以下属性
 * content: 吐司提示的内容
 */
export const toast = (args) => {
  console.log(args)
  dsbridge.call('showToastNative', args)
}

/**
 * 调用原生的分享
 * @param {Object} args 包含以下属性
 * platform:[]数组，显示的平台有哪些(qq,微信，朋友圈)
 * title: 分享标题
 * desc: 分享描述
 * icon: 分享的图标
 * url: 分享的地址
 * type: 分享的类型(图片，图文链接,文字链接)
 * imgUrl: 如果是图片的话该参数必传
 * @param {*} callback
 */
export const shareMenu = (args, callback) => {
  dsbridge.call('showShareMenuNative', args, callback)
}

/**
 * 跳转url
 * @param {Object} args 对象包含到属性
 * skipUrl: 地址
 */
export const skipUrl = (args) => {
  console.log(args)
  dsbridge.call('skipUrlNative', args)
}

/**
 * 跳转登陆页面
 */
export const skipLoginPage = () => {
  dsbridge.call('skipLoginPage')
}
/**
 * 判断用户是否登陆返回值是boolean
 */
export const judgeIsLogined = (args) => {
  console.log(args, '参数args')
  dsbridge.call('judgeIsLogined', args)
}
