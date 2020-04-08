/**
 * arms 阿里监控接入
 * 配置文档 https://www.npmjs.com/package/alife-logger
 */
import BrowerLogger from 'alife-logger'

const logger = (() => {
  if (process.env.NODE_ENV === 'production') {
    try {
      return BrowerLogger.singleton({
        pid: 'iiabd5we3q@7f045d08f353a77', // 项目ID
        imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?', // 日志上传地址
        enableSPA: true, // 是否是但页面应用
        sendResource: true // 是否上报资源数据
        // disabledHook: true // 禁用自动API上报
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('init logger fail', e)
    }
  } else {
    return {
      error() {}
    }
  }
})()

export default logger