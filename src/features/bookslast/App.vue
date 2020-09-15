<template lang="pug">
#parent.bookslast-container
  .bookslast-header
    Urge(
      v-if="bookInfo.isSerial === 1 && mId === ''"
      :endInfo="endInfo"
      v-on:urgeforbook="urgeforbook")
    FreeVip(
      v-if="bookInfo.isSerial === 0 && mId === ''"
      :bookInfo="bookInfo"
      :vipExperienceCardInfoControl="vipExperienceCardInfoControl"
      :endInfo="endInfo"
      :mId="mId"
      v-on:receiveforbook="receiveforbook"
      )
    Score(
      v-if="platform !== 51"
      :endInfo="endInfo"
      v-on:commentHandler="commentHandler"
      v-on:rewardHandler="rewardHandler"
    )
  BookContent(
    v-if="content"
    :boostTitle="boostTitle"
    :boostList="boostList"
    :endCategoryBook="endCategoryBook"
    :videoobj="videoobj"
    :bookInfo="bookInfo"
    :mId="mId"
    :showtip="showtip"
    :showTag="showTag"
    :platform="platform"
    :contentTitle="contentTitle"
    :content="content"
    v-on:handleGoBookDetail="handleGoBookDetail"
    v-on:refreshHandler="refreshHandler"
  )
</template>

<script>
import { getEndCategoryBook, getEndInfo, getVipCard, getReadUrge } from './request.js'
import { compareVersion, routerToNative, getQueryString, mBuryPoint } from '@/utils/index.js'
export default {
  components: {
    Urge: () => import('./components/Urge.vue'),
    FreeVip: () => import('./components/FreeVip.vue'),
    Score: () => import('./components/Score.vue'),
    BookContent: () => import('./components/BookContent.vue')
  },
  data() {
    return {
      endInfo: {},
      platform: localStorage.getItem('platformId') || 5,
      version: localStorage.getItem('version') || '',
      bookId: getQueryString('bookId') || '',
      chapterNum: getQueryString('chapterNum') || '',
      mId: getQueryString('mId') || '',
      source: getQueryString('source') || '',
      pageNum: 1,
      boostList: [], // 补量位的书籍列表
      boostTitle: '', // 补量为的标题,
      bookInfo: {},
      endCategoryBook: {},
      content: '',  // 正文内容s
      vipExperienceCardInfoControl: false,
      showtip: true,
      showTag: false
    }
  },
  created() {
    getEndCategoryBook(this.bookId, this.pageNum, this.mId).then(res => {
      this.endCategoryBookResponseHandler(res.data)
      const result = {
        action: 'endCategoryBook',
        bookId: this.bookId
      }
      mBuryPoint(null, result)
    })
    getEndInfo(this.bookId, this.mId).then(res => {
      if (!res.data) return
      if (!res.data.bookInfo) {
        res.data.bookInfo = {}
      }
      if (typeof res.data.bookInfo.isSerial !== 'number') {
        res.data.bookInfo.isSerial = 0
      }
      this.endInfo = res.data
      this.bookInfo = res.data.bookInfo
      this.handleDealBoostList(res.data.ItemInfo)
    })
  },
  methods: {
    urgeforbook() {
      // 催更
      getReadUrge(bookId, chapterNum).then(() => {
        this.endInfo.urgeInfo.status = 1
      })
    },
    rewardHandler() {
      // 打赏作者
      const result = {
        action: 'reward',
        bookId: this.bookId
      }
      mBuryPoint(null, result)
      const rewardUrl = `breader://reward?bookId=${this.bookId}`
      window.location = rewardUrl
    },
    commentHandler() {
      // 参与评分
      const result = {
        action: 'comment',
        bookId: this.bookId
      }
      mBuryPoint(null, result)
      let version = this.version
      if (compareVersion(version, '1.42.0')) {
        // let origin = window.location.origin.match(/test/) ? 'http://testincrease.ibreader.com/' : 'https://increase.ibreader.com'
        let origin = window.location.origin
        let url = origin + '/BKH5-post_bar.html?bookId=' + this.bookId
        // this.$uploadStatistics({
        //   eventKey: 6,
        //   clickPostBarEnter: 'clickPostBarEnter',
        //   bookId: this.$route.query.bookId
        // })
        routerToNative(url)
        // window.location.href = `breader://common/browser?url=${url}`
        return
      }
      window.location = 'breader://comment'
    },
    addShelf() {
      //  加入书架
      const result = {
        action: 'addBookShelf',
        bookId: this.bookId
      }
      mBuryPoint(null, result)
      const addBookShelfUrl = `breader://addBookshelf?bookId=${this.bookId}&goRead=0&source=${this.source}`
      window.location = addBookShelfUrl
    },
    addShelfAndRead() {
      // 加入书架并继续阅读
      const result = {
        action: 'addBookShelfAndRead',
        bookId: this.bookId
      }
      mBuryPoint(null, result)
      const addBookShelfAndReadUrl = `breader://addBookshelf?bookId=${this.bookId}&goRead=1&source=${this.source}`
      window.location = addBookShelfAndReadUrl
    },
    handleGoBookDetail(target) {
      // let result = {
      //   eventKey: 2,
      //   type: 'bookcover',
      //   bookid: target.bookId
      // }
      // this.$uploadStatistics(result)
      window.location.href = target.scheme + '&userPath=' + this.source
    },
    receiveforbook() {  // 领取VIP
      getVipCard('this.endInfo.vipExperienceCardInfo.id').then(() => {
        this.vipExperienceCardInfoControl = true
      }).catch(err => {
        console.log(err)
      })
    },
    handleDealBoostList(data) {
      data = Array.isArray(data) ? data : []
      const result = data.filter(item => {
        return item.subType === 29
      })
      let target
      if (result.length <= 0) {
        return
      }
      target = result[0]
      this.boostTitle = target.title
      this.boostList = Array.isArray(target.contentList) ? target.contentList : []
      if (this.boostList.length > 0) {
        let tempBookIds = this.boostList.map(item => {
          return item.bookId
        })
        let result = {
          eventKey: 2,
          type: 'exposure',
          bookid: tempBookIds.join(',')
        }
        mBuryPoint(null, result)
      }
    },
    endCategoryBookResponseHandler(res) {
      if (!res) return
      const { bookName, isSerial, bookId } = res.bookInfo
      this.bookId = bookId
      let _bookName = ''
      if (bookName.length > 9) {
        _bookName = bookName.substring(0, 9) + '...'
      } else {
        _bookName = bookName
      }

      // isSerial true 连载中 | false 完结
      let _serialValue = ''
      if (isSerial) {
        _serialValue = '连载中'
      } else {
        _serialValue = '完结'
      }
      res.bookInfo.serialValue = _serialValue
      res.bookInfo.bookName = _bookName
      const { grade } = res.bookInfo
      const newGrade = String(grade).length > 1 ? grade : grade + '.0'
      res.bookInfo.grade = newGrade
      this.endCategoryBook = res.bookInfo
      if (res.hasOwnProperty('tag')) {
        this.showTag = true
      } else {
        this.showTag = false
      }
      if (res.hasOwnProperty('tag')) {
        this.endCategoryBook = { ...this.endCategoryBook, tag: res.tag }
      }
      this.pageNum = res.pageNum
      this.content = res.bookShare.content
      this.contentTitle = res.bookShare.title
      if (res.bookShare.type === 1) {
        this.videoobj = null
        setTimeout(() => {
          this.videoobj = {
            vurl: res.bookShare.videoRes,
            pic: res.bookShare.pgPic,
            bg: require('@/assets/bookslast/bg.png')
          }
        }, 0)
      } else {
        this.videoobj = null
      }
    },
    handleScroll() {
      // 设备/屏幕高度
      let scrollObj = document.getElementById('parent') // 滚动区域
      let scrollTop = scrollObj.scrollTop // div 到头部的距离
      // 滚动条到底部的条件
      if (scrollTop > 0) {
        this.showtip = false
      } else {
        this.showtip = true
      }
    },
    refreshHandler() {  // 换一本
      getEndCategoryBook(this.bookId, this.pageNum, this.mId).then(res => {
        this.endCategoryBookResponseHandler(res.data)
        const result = {
          action: 'endCategoryBook',
          bookId: this.bookId
        }
        mBuryPoint(null, result)
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
    if (window.ibreader) {
      window.ibreader.setInterceptRefresh(true)
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
