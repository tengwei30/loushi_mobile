<template lang="pug">
  .national
    .sex(:class='{"is-male": isMale}')
      .top
      .banner(:class='{"is-fixed": isFixed === true}')
        div.banner-item(v-for='(item, index) in list' :key='index'
        :class='{"active": item.id === selected}'
        v-if='!item.isLink'
        @click='handleClickBanner(item.id)')
          | {{item.title}}
      .book-box(:class='{"is-fixed": isFixed}')
        template(v-for='(item,index) in list')
          .video-list.book-list-common(v-if='item.isVideo' :key='index')
            .video-item(v-for='(videoItem,innerIndex) in item.list' :key='"a"+innerIndex')
              .video-item-cover
                img(:src='videoItem.bookCover')
                .video-item-play
              .video-item-name {{videoItem.bookName}}
          .link-list(v-else-if='item.isLink' :key='index')
            .link-item(v-for='(linkItem,innerIndex) in item.list'
            :key='"b"+innerIndex'
            v-if='(isShowVideo && innerIndex < 2) || !isShowVideo')
              img.link-item-cover(:src='linkItem.imgUrl')
          .book-list.book-list-common(:key='index' v-else)
            .book-item(v-for='(bookItem,innerIndex) in item.list' :key='"c"+innerIndex')
              img.book-cover(:src='bookItem.bookCover')
              .book-read-tip
              .book-item-name {{bookItem.bookName}}
      .share-icon
</template>

<script>
import data from './data'
import { scrollAnimation } from '@/utils/common'
import { debounce } from '@/utils/utils'
import {
  // mBuryPoint,
  compareVersion
} from '@/utils/index'
import { getUserPreference } from './request'
export default {
  data() {
    return {
      list: [],
      selected: 0,
      isFixed: false,
      isMale: true,
      isShowVideo: false, // 是否展示视频
    }
  },
  methods: {},
  created() {
    this.getDataList()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let bannerTop = document.getElementsByClassName('banner')[0].offsetTop
      document.onscroll = () => {
        let btop = document.body.scrollTop||document.documentElement.scrollTop
        if (btop > bannerTop) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
        debounce(this.dealBannerPos, 200)()
      }
    },
    async getDataList() {
      let sexInfo = await getUserPreference()
      let sexType = sexInfo.data ? sexInfo.data.sex : 1
      this.isMale = sexType == 1
      let list = sexType === 0 ? data.female : data.male
      let isShowVideo = this.judgeIsShowVideo()
      let resultArr = []
      list.map(item => {
        if (!(!isShowVideo && item.isVideo)) {
          resultArr.push(item)
        }
      })
      this.isShowVideo = isShowVideo
      console.log(isShowVideo, 222)
      this.list = resultArr
    },
    judgeIsShowVideo() {
      let platform = localStorage.getItem('platformId') || 3
      let version = localStorage.getItem('version')  // 真实版本
      let isTrue = compareVersion('1.47.0', version) !== -1
      return isTrue && platform == 5
    },
    handleClickBanner(target) {
      if (this.selected === target) {
        return
      }
      // 点击滚动到指定位置
      let offsetTop = document.getElementsByClassName('book-list-common')[target].offsetTop - document.getElementsByClassName('banner')[0].clientHeight
      let currentY = document.documentElement.scrollTop || document.body.scrollTop
      scrollAnimation(currentY, offsetTop)
      setTimeout(() => {
        this.selected = target
      }, 300)
    },
    // 计算位置切换banner
    dealBannerPos() {
      let btop = document.body.scrollTop||document.documentElement.scrollTop + document.getElementsByClassName('banner')[0].clientHeight
      let bookListArr = Array.from(document.getElementsByClassName('book-list-common'))
      console.log(bookListArr)
      for (let i = 0; i < bookListArr.length;i++) {
        if (bookListArr[i+1] &&  bookListArr[i+1].offsetTop > btop && bookListArr[i].offsetTop <= btop) {
          this.selected = i
        } else if (i === 0 && bookListArr[0].offsetTop > btop) {
          this.selected = 0
        } else if (!bookListArr[i+1] && bookListArr[i].offsetTop <= btop) {
          this.selected = i
          console.log(this.selected, i)
        }
      }
    }

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
  @import './index.styl'
</style>
