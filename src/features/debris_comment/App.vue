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
        :key='item'
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
import { getQueryString } from '@/utils/url'
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
      console.log(e.target.files, 33)
      let files = e.target.files
      console.log(Array.from(files))
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
      })
    },
    // 删除图片
    deleteImg(index) {
      this.imgList.splice(index, 1)
    },
    // 发表评论
    submitComment() {
      console.log(this.imgList, this.comment)
    },
    // 返回上一页面
    nvaBack() {
      bk.call('closePageNative')
    }
  },
  mounted() {
    this.info = getQueryString('info') ? JSON.parse(getQueryString('info')) : {}
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
