import { get } from '@/config/axios.config'


/**
 * 获取奖励明细列表
 */

export const getDebrisDetailList = () => {
  return get('/activity_api/fragmentPrize/lastExchangeMsg')
}