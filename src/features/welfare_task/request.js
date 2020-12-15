import { post } from '@/config/axios.config'
/**
 * 获取任务列表
 */

export const getTaskLists = async() => {
  let { data } = await post('/task_api/task/list')
  if (data) return data.filter(item => item.type === 3 || item.type === 7 || item.type === 8)
}

/**
 * 广告ID
 * @param {String} adPosList
 */
export const getAdLists = async(adPosList) => {
  let { data } = await post('/api/ad/adInfoList', {
    supportAdvertiser: 10,
    adPosList,
    pageSize: 1
  })
  if (data) console.log('--请求的广告--', data)
}
