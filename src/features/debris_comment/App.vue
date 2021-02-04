<template lang="pug">
  .debris_comment
    HeaderNav(
      title='发表评价'
      :headerSpaceStyle="{height: '68px', background: 'linear-gradient(to right, #F43A3A 10%, #FFC87A)', opacity: 1}"
      :headerNav="{height: '48px', fontSize: '16px', color: '#ffffff'}"
      height='68px'
    )
      img.left_img(
        slot='left'
        src='../../assets/debris_comment/nav_back.png'
        @click='nvaBack'
      )
    .debris_comment_info
      img(:src='info.fragmentPrizeBigImgUrl')
      .debris_comment_info_text {{info.fragmentPrizeTitle}}
    .debris_comment_content
      div.debris_comment_textarea_box
        div.debris_comment_textarea(contenteditable="true"
        ref='textarea'
        @keyup='handleInput')
        div.debris_comment_textarea_count {{comment.length}}/100字
    .debris_img_box
      .debris_img_item(
        v-for='(item, index) in imgList'
        :key='item + index'
        v-if='index < 3'
      )
        img(
          :src='item'
        )
        .debris_img_delete(
          @click='deleteImg(index)'
        )
      .debris_img_item.debris_img_upload(v-if='imgList.length < 3')
        img(src='../../assets/debris_comment/debris_comment_photo.png')
        input(
          type='file'
          accept='image/*'
          @change='handleSelectImg'
          multiple
          ref='uploadImgInput'
        )
    .debris_comment_btn.active(
      v-if='imgList.length > 0 && comment.length > 0'
      @click='submitComment'
    ) 提交
    .debris_comment_btn(
      v-else
    ) 提交


</template>

<script>
import bk from 'bayread-bridge'
import HeaderNav from '@/components/HeaderNav'
import { initOss, getOneUploadedUrl } from '@/utils/upload'
import { getQueryString, throttle, nBuryPoint } from '@/utils/index'
import { submitComment } from './request'
export default {
  components: {
    HeaderNav
  },
  data() {
    return {
      comment: '',
      imgList: [
      ],
      info: {}
    }
  },
  methods: {
    handleInput(e) {
      if (e.target.innerText.length > 100) {
        let tempInnerText = e.target.innerText.substring(0, 100)
        e.target.innerText = tempInnerText
      }
      this.comment = e.target.innerText
    },
    // 选择图片
    handleSelectImg(e) {
      console.log(e)
      let files = e.target.files
      if (files) {
        Array.from(files).map(file => {
          this.dealUploadImg(file)
        })
      }

    },
    // 图片上传函数
    async dealUploadImg(file) {
      let client = await initOss(1)
      if (!file) {
        return
      }
      getOneUploadedUrl(client, '/bkh5_debris/' + file.name, file, (url) => {
        if (this.imgList.length < 3) {
          this.imgList.push(url)
        }
        this.$refs.uploadImgInput.value = ''
      })
    },
    // 删除图片
    deleteImg(index) {
      this.imgList.splice(index, 1)
    },
    // 发表评论
    submitComment: throttle(async function() {
      nBuryPoint('H5_DEBRIS_COMMENT_CLICK_POST', {
        activityId: getQueryString('activityId'),
        id: this.info.id
      })
      try {
        let res = await submitComment(this.comment, this.imgList, this.info.id)
        console.log(res, 111)
      } catch (error) {
        this.$showToast('网络错误请稍后重试')
      }
    }, 50),
    // 返回上一页面
    nvaBack() {
      bk.call('closePageNative')
    }
  },
  mounted() {
    this.info = getQueryString('info') ? JSON.parse(getQueryString('info')) : {}
    this.$nextTick(() => {
      nBuryPoint('H5_DEBRIS_COMMENT', {
        activityId: getQueryString('activityId'),
        id: this.info.id
      })
    })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
