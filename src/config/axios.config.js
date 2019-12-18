import fetch from './Interceptor.config'
import DOMAIN from '@/utils/domain'

const DEFAULT_CONFIG = {
  isAutoMsg: true, // 报错是否自动toast
  isLoading: true, //是否加载loading
  isRemoveField: false, //是否删除无用字段
  removeField: [], //动态指定要过滤的参数
  cache: false, //是否需要缓存
}
/**
 * 移除提交请求中 列为空 null undefined 的值
 * @param {Object} params  传递过来的参数
 * @param {Array} removeField  要移除的配置项
 */
function removeEmptyField(params = {}, removeField = []) {
  let copyParams = JSON.parse(JSON.stringify(params))
  let arrField = removeField
  if (removeField.length === 0) {
    arrField = Object.keys(params)
  }
  arrField.forEach(key => {
    let val = copyParams[key]
    if (val === '' || val === undefined || val === null) {
      delete copyParams[key]
    }
  })
  return copyParams
}
/**
 * 过滤传递过来的参数
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
function filterParams(params, config) {
  if (config.isRemoveField) {
    return removeEmptyField(params, config.removeField)
  }
  return params
}
/**
 * 过滤url域名
 * @param {String} url
 */
function filterApi(url) {
  const regExp = /^(http[s]{0,1})/
  if (regExp.test(url)) {
    return url
  } else {
    return `${DOMAIN.domain}${url}`
  }
}
/**
 * GET请求
 * @param {String} url   请求路径
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
export function get(url, params = {}, config = {}) {
  const api = filterApi(url)
  const opts = { ...DEFAULT_CONFIG, ...config }
  params = filterParams(params, opts)
  return fetch({
    url: api,
    method: 'get',
    params: params,
    headers: opts,
  })
}
/**
 * POST请求
 * @param {String} url   请求路径
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
export function post(url, params = {}, config = {}) {
  const api = filterApi(url)
  const opts = { ...DEFAULT_CONFIG, ...config }
  const data = filterParams(params, opts)
  return fetch.post(api, data, opts)
}
/**
 * POST请求
 * @param {String} url   请求路径
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
export function deleteOption(url, params = {}, config = {}) {
  const api = filterApi(url)
  const opts = { ...DEFAULT_CONFIG, ...config }
  params = filterParams(params, opts)
  return fetch({
    url: api,
    method: 'delete',
    params: params,
    headers: opts,
  })
}
/**
 * PUT请求
 * @param {String} url   请求路径
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
export function put(url, params = {}, config = {}) {
  const api = filterApi(url)
  let opts = { ...DEFAULT_CONFIG, ...config }
  const data = filterParams(params, opts)
  return fetch.put(api, data, opts)
}
