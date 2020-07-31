<template lang="pug">
.message-landing(@click='jumpScheme')
  img(src='../../assets/note_landing/note_landing2.png')
</template>

<script>
import { isiOS } from '@/utils/browser'
import { getQueryString } from '@/utils/url'
export default {
  data() {
    return {
      url: 'breader://www.bayread.com',
      bookUri: 'breader://www.bayread.com/bookview/bookread?bookId=<bookId>&source=msg&userPath=msg,deeplink&chapterNum=0'
    }
  },
  methods: {
    jumpScheme() {
      if (isiOS) {
        window.location.href =
            'https://itunes.apple.com/cn/app/%E5%BF%85%E7%9C%8B%E5%B0%8F%E8%AF%B4-%E5%B0%8F%E8%AF%B4%E9%98%85%E8%AF%BB%E8%BF%BD%E4%B9%A6%E7%A5%9E%E5%99%A8/id1435034789?mt=8'
      } else {
        let bid = getQueryString('bid')
        this.bookUri = this.bookUri.replace('<bookId>', bid)
        setTimeout(() => {
          window.location = this.bookUri
          setTimeout(() => {
            window.location = 'http://dl.ibreader.com/api/download/138'
          }, 2000)
        }, 200)
      }
    }
  },
  mounted() {
    this.jumpScheme()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
