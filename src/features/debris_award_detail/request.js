import { post } from '@/config/axios.config'

/**
 * 兑换地址提交
 * @param {*} activityId --- 活动ID
 */
export const getDebrisAwardDetail = ({ activityId, pageIndex = 0, pageSize = 10 }) => {
  return post('/activity_api/fragmentPrize/getExchangeList', {
    activityId,
    startIndex: pageIndex * pageSize,
    pageSize
  })
}