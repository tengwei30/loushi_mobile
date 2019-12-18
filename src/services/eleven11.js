import { getFormatData, postFormatData } from '@/config/format-data'
export function getGoodList(params = {}, config = {}) {
  return getFormatData('/api/revenue/carnival/good_list', params, config)
}
export function getFirstDataApi(params = {}, config = {}) {
  return getFormatData('/api/revenue/carnival/get_coupons', params, config)
}
export function getLotteryPrizes(params = {}, config = {}) {
  return getFormatData('/api/revenue/carnival/lottery_prizes', params, config)
}
export function getLottery(params = {}, config = {}) {
  return getFormatData('/api/revenue/carnival/get_lottery', params, config)
}
export function selectPrize(params = {}, config = {}) {
  return postFormatData(
    '/api/revenue/carnival/select_lottery_prize',
    params,
    config
  )
}
export function getMe(params = {}, config = {}) {
  return getFormatData('/me', params, config)
}
export function createOrderApi(params = {}, config = {}) {
  return postFormatData('/api/client/order', params, config)
}
