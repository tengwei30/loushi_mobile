import Cache from '@/config/cache'
import { get, post, put, deleteOption } from '@/config/axios.config'
/**
 * 统一获取数据
 * @param {String} api        请求url
 * @param {Object} params     请求参数
 * @param {Object} config     请求配置项
 * @param {String} cacheKey   缓存的关键key
 * @param {Array} mapData     mapping数据
 */
export function getFormatData(api, params, config, cacheKey) {
  return new Promise((resolve, reject) => {
    if (config.cache && Cache.get(cacheKey)) {
      resolve(Cache.get(cacheKey))
    } else {
      get(api, params, config)
        .then(data => {
          resolve(data)
          if (config.cache) {
            Cache.set(cacheKey, data)
          }
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}
/**
 * 统一获取数据
 * @param {String} api        请求url
 * @param {Object} params     请求参数
 * @param {Object} config     请求配置项
 */
export function postFormatData(api, params, config) {
  return post(api, params, config)
}
/**
 * 统一获取数据
 * @param {String} api        请求url
 * @param {Object} params     请求参数
 * @param {Object} config     请求配置项
 */
export function putFormatData(api, params, config) {
  return put(api, params, config)
}
/**
 * 统一获取数据
 * @param {String} api        请求url
 * @param {Object} params     请求参数
 * @param {Object} config     请求配置项
 */
export function deleteFormatData(api, params, config) {
  return deleteOption(api, params, config)
}
