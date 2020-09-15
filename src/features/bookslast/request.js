import { post, get } from '@/config/axios.config'

/**
 *
 * @param {*} bookId
 * @param {*} pageNum
 * @param {*} mId
 */
export const getEndCategoryBook = (bookId, pageNum, mId) => {
  return post('/api/read/endCategoryBook', {
    bookId, pageNum, mId
  })
}

/**
 *
 * @param {*} bookId
 * @param {*} mId
 */
export const getEndInfo = (bookId, mId) => {
  return post('/api/read/endInfo', {
    bookId, mId
  })
}

/**
 * 领取三天VIP奖励
 * @param {*} id
 */
export const getVipCard = (id) => {
  return post('/api/activity/get_vip_card', {
    id
  })
}

/**
 *  催更
 * @param {*} bookId
 * @param {*} chapterNum
 */
export const getReadUrge = (bookId, chapterNum) => {
  return post('/api/read/urge', {
    bookId,
    chapterNum
  })
}

export const getVideoList = () => {
  return get('/api/video/getBookOverVideos')
}