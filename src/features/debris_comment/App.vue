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
      img(src='../../assets/debris_comment/nav_back.png')
      .debris_comment_info_text 华为p30
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
export default {
  components: {
    HeaderNav
  },
  data() {
    return {
      comment: '',
      imgList: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbbs.jf311.com%2Fdata%2Fattachment%2Fforum%2F201505%2F25%2F113407e6v4pom4yen44ee4.jpg&refer=http%3A%2F%2Fbbs.jf311.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614221507&t=e35d13763901b8e294f228bae618ea36',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201508%2F10%2F20150810150356_hnves.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614221507&t=091e255036854f896c2f3834a466c3dd'
      ]
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
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
