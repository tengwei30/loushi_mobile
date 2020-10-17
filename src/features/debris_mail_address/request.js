import { post } from '@/config/axios.config'

/**
 * 获取碎片奖励明细接口
 * @param {*} activityId --- 活动ID
 */
export const submitMailAddress = ({ activityId, exchangeRecordId, id, userRealName, userPhone, userAddress }) => {
  return post('/activity_api/fragmentPrize/exchange', {
    activityId,
    exchangeRecordId,
    id,
    userRealName,
    userPhone,
    userAddress
  })
}