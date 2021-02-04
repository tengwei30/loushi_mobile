import { post } from '@/config/axios.config'


/**
 * 提交评论
 */

export const submitComment = (comment, imgList, exchangeId) => {
  console.log(imgList)
  return post('/activity_api/fragmentPrize/comment', {
    comment,
    imgList,
    exchangeId
  }, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}