import { nBuryPoint } from '@/utils/buryPoint'
/**
 * 防抖函数 - 我们希望频繁事件的回调函数在某段连续时间内，在事件触发后只执行一次
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，单位是毫秒（ms）
 * @return {Function} 返回一个具备防抖能力的函数
 */
let timer = null
export function debounce(fn, delay) {
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function() {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this
    const args = arguments
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    if (timer) clearTimeout(timer)
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），再过 delay 毫秒就执行 fn
    timer = setTimeout(() => fn.call(context, args), delay)
  }
}

/**
 * 节流函数
 *
 */
// 记录上次执行的时间
let last
// 定时器
let throttleTimer
export function throttle(fn, threshhold) {
  // 默认间隔为 250ms
  threshhold || (threshhold = 250)

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function() {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    var now = +new Date()

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(throttleTimer)

      // 保证在当前时间区间结束后，再执行一次 fn
      throttleTimer = setTimeout(function() {
        last = now
        fn.apply(context, args)
      }, threshhold)

      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

export function isIPhoneXCallback() {
  var u = navigator.userAgent
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isIOS) {
    if (screen.height === 812 && screen.width === 375) {
      return 1
    } else if (screen.height === 896 && screen.width === 414) {
      return 2
    } else {
      return 0
    }
  }
}
export function formatIsoTime(isoDateStr) {
  if (isoDateStr === undefined) return ''
  const isoDate = new Date(isoDateStr)
  const year = isoDate.getFullYear()
  const month = isoDate.getMonth() + 1
  const date = isoDate.getDate()
  return year + '-' + month + '-' + date
}
export const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()
export function getType(obj) {
  let type = Object.prototype.toString.call(obj)
  if (type === '[object Array]') {
    return 'Array'
  } else if (type === '[object Object]') {
    return 'Object'
  }
  return null
}

export const randomString = (randomFlag, min, max) => {
  var str = '',
    range = min,
    arr = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ]

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return sessionStorage.setItem('randomNum', str)
}

export const performance = () => {
  if (performance) {
    window.addEventListener('load', () => {
      const timing = window.performance.timing
      setTimeout(() => {
        let obj = {
          emptyTime: timing.domLoading - timing.fetchStart, //白屏时间
          tcpT: timing.connectEnd - timing.connectStart, // TCP建立连接完成握手的时间
          unloadT: timing.unloadEventEnd - timing.unloadEventStart, //卸载页面时间
          dnsCacheT: timing.domainLookupStart - timing.fetchStart, //DNS缓存时间
          onloadT: timing.loadEventEnd - timing.fetchStart, // 页面总加载时间
          requestT: timing.responseEnd - timing.responseStart, // 资源加载完成的时间（考虑资源压缩）
          ttfT: timing.responseStart - timing.navigationStart, // 读取页面第一个字节的时间
          dnsT: timing.domainLookupEnd - timing.domainLookupStart, // DNS 查询时间
          redirectT: timing.redirectEnd - timing.redirectStart, // 重定向时间
          domReadyT: timing.domComplete - timing.domInteractive, //解析DOM树的时间
        }
        let info = {
          baseLog: obj,
          timing,
        }
        console.log(info)
        nBuryPoint(
          'dev_LogInfo',
          {
            position: 'vip-payment',
            info: info,
          },
          'setting'
        )
      }, 0)
    })
  }
}

export function throttled(func, wait, options) {
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}
  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  var throttled = function() {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }
  return throttled
}
