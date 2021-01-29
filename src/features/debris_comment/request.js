import { post } from '@/config/axios.config'


/**
 * 提交评论
 */

export const submitComment = (comment, imgList) => {
  return post('/activity_api/fragmentPrize/comment', {
    comment,
    imgList
  })
}