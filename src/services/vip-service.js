import { getFormatData, postFormatData } from '@/config/format-data'
import CustomConstant from './constant'
import Api from '@/services/api'
/**
 * 获取我的信息
 */
export function getMe(params = {}, config = {}) {
  return getFormatData(
    Api.getMeApi,
    params,
    config,
    CustomConstant.GET_ME,
    CustomConstant.GET_ME_DATA
  )
}
/**
 * 获取用户权限
 */
export function getUserAuth(params = {}, config = {}) {
  return getFormatData(
    Api.getUserAuthAPI,
    params,
    config,
    CustomConstant.GET_USER_AUTH
  )
}
/**
 * 获取购买信息
 */
export function getPurchase(params = {}, config = {}) {
  return getFormatData(
    Api.getPurchaseApi,
    params,
    config,
    CustomConstant.GET_VIP_CARD
  )
}
/**
 * 获取vip卡片信息
 */
export function getVipCard(params = {}, config = {}) {
  return getFormatData(
    Api.getVipCardApi,
    params,
    config,
    CustomConstant.GET_VIP_CARD
  )
}
/**
 * 获取vip卡片信息
 */
export function getGoodList(params = {}, config = {}) {
  return getFormatData(
    Api.getGoodListApi,
    params,
    config,
    CustomConstant.GET_GOOD_LIST
  )
}
/**
 * 获取购买通知数据
 */
export function getUserPurchase(params = {}, config = {}) {
  return getFormatData(Api.getUserPurchaseApi, params, config)
}
/**
 * 判断是否是实验组
 */
export function getGroupTest(params = {}, config = {}) {
  return getFormatData(Api.getGroupTestApi, params, config)
}
/**
 * 判断是否是实验组
 */
export function getPraise(params = {}, config = {}) {
  return getFormatData(Api.getPraiseApi, params, config)
}
/**
 * 判断是否是实验组
 */
export function getStageSubject(userID, params = {}, config = {}) {
  const url = `${Api.getStageSubjectApi}${userID}`
  return getFormatData(url, params, config)
}
/**
 * 抢红包列表
 */
export function getPromotion(params = {}, config = {}) {
  const url = `${Api.getPromotionApi}`
  return getFormatData(url, params, config)
}
/**
 * 抢红包
 */
export function getDeliverCoupon(params = {}, config = {}) {
  const url = `${Api.getDeliverCouponApi}`
  return getFormatData(url, params, config)
}
export function postOrder(params = {}, config = {}) {
  const url = `${Api.postOrderApi}`
  return postFormatData(url, params, config)
}
export function getTime(params = {}, config = {}) {
  const url = `${Api.getTimeApi}`
  return getFormatData(url, params, config)
}
