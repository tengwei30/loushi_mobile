import {
  getFormatData,
  postFormatData,
  deleteFormatData,
  putFormatData,
} from '@/config/format-data'

export function getList(params = {}, config = {}) {
  return getFormatData('/api/gae/address/all', params, config)
}
export function deleteAddress(params = {}, config = {}) {
  return deleteFormatData('/api/gae/address', params, config)
}
export function updateAddress(params = {}, config = {}) {
  return putFormatData('/api/gae/address', params, config)
}
export function getMe(params = {}, config = {}) {
  return getFormatData('/me', params, config)
}
export function getRecord(params = {}, config = {}) {
  return postFormatData('/api/gae/entity/record', params, config)
}
export const add = (params = {}, config = {}) => {
  return postFormatData('/api/gae/address', params, config)
}
export const getProvinces = (params = {}, config = {}) => {
  return getFormatData('/provinces/all', params, config)
}
export const getCity = (provinceId, params = {}, config = {}) => {
  return getFormatData(
    `/provinces/province/${provinceId}/cities`,
    params,
    config
  )
}
export const getArea = (provinceId, cityId, params = {}, config = {}) => {
  return getFormatData(
    `/provinces/province/${provinceId}/city/${cityId}/districts`,
    params,
    config
  )
}
