import { post } from '@/config/axios.config'


/**
 * 获取用户信息
 * @param {String} activityId 活动id
 */
export const getAwardInfo = (activityId) => {
  return post('/activity_api/activity/operation/list', {
    activityId
  })
}