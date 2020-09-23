<template lang="pug">
#parent.bookslast-container
  .bookslast-header
    Urge(
      v-if="bookInfo.isSerial === 1 && mId === ''"
      :endInfo="endInfo"
      :showNotification="showNotification"
      :showNotificationResume="showNotificationResume"
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
    v-if="content && !showVideo"
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
    v-on:addShelf="addShelf"
    v-on:addShelfAndRead="addShelfAndRead"
  )
  VideoContent(
    v-if="showVideo"
    :videolists="videolists"
    v-on:clickVideo="clickVideo"
    v-on:gotoRead="gotoRead"
    v-on:gotoShelf="gotoShelf"
  )
</template>

<script>
import bk from 'bayread-bridge'
import { getEndCategoryBook, getEndInfo, getVipCard, getReadUrge, getVideoList } from './request.js'
import { compareVersion, routerToNative, getQueryString, mBuryPoint } from '@/utils/index.js'
export default {
  components: {
    Urge: () => import('./components/Urge.vue'),
    FreeVip: () => import('./components/FreeVip.vue'),
    Score: () => import('./components/Score.vue'),
    BookContent: () => import('./components/BookContent.vue'),
    VideoContent: () => import('./components/VideoContent.vue')
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
      showTag: false,
      showVideo: false, // 显示视频模块
      videolists: [], // 视频列表
      showNotification: false,
      showNotificationResume: false
    }
  },
  created() {
    bk.call('notificationInit', {}, data => {
      const { openNotification } = JSON.parse(data)
      console.log('设置显示开启', openNotification)
      // 通知开启初始化
      if (openNotification * 1 === 0) {

        this.showNotification = true
      }
    })
    window.notificationResume = this.notificationResume
    // bk.call('notificationResume', {}, data => {
    //   const { openNotification } = JSON.parse(data)
    //   console.log('页面重现', openNotification)
    //   // 开启返回
    //   if (openNotification * 1 === 1) {
    //     this.showNotificationResume = true
    //   }
    // })
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
      if (res.data.bookInfo && res.data.bookInfo.isShowVideo === 1) {
        // 加载视频模块
        getVideoList(this.bookId).then(res => {
          if (!res.data) {
            this.getEndCategoryBookCommon()
            return
          }
          this.videolists = res.data && res.data.dataList
          this.showVideo = true
          if (this.buttonStatus) {
            mBuryPoint('11', {
              bookTailEnter: 'bookTailEnter',
              enterType: '2',
              bookId: this.bookId,
              buttonStatus: '3'
            })
          }
        })
      } else {
        this.getEndCategoryBookCommon()
      }
    })

  },
  methods: {
    notificationResume(data) {
      const { openNotification } = JSON.parse(data)
      console.log('页面重现', openNotification)
      // 开启返回
      if (openNotification * 1 === 1) {
        this.showNotificationResume = true
      }
    },
    getEndCategoryBookCommon() {
      //  整合进入文章阅读页面
      getEndCategoryBook(this.bookId, this.pageNum, this.mId).then(res => {
        this.endCategoryBookResponseHandler(res.data)
        mBuryPoint('11', {
          bookTailEnter: 'bookTailEnter',
          enterType: '1',
          bookId: this.bookId
        })
      })
    },
    gotoShelf() {
      window.location.assign('breader://bookstore/library')
    },
    gotoRead(item) {
      // 点击去阅读
      window.location.assign(`breader://www.bayread.com/bookview/bookread?bookId=${item.book.bookId}&source=bookslast&chapterNum=1`)
      mBuryPoint('11', {
        bookTailEnter: 'bookTailEnter',
        enterType: '2',
        clickRead: 'clickRead',
        bookId: item.book.bookId,
        vedioId: item.id
      })
    },
    clickVideo(item) {
      // 点击去看视频
      mBuryPoint('11', {
        bookTailEnter: 'bookTailEnter',
        enterType: '2',
        clickVedio: 'clickVedio',
        bookId: item.book.bookId,
        vedioId: item.id
      })
      // 跳转视频播放
      bk.call('RouterToVideo', {
        uri: item.extendInfo.scheme
      }, () => {
        console.log('播放视频')
      })
    },
    urgeforbook() {
      if (!this.showNotification) {
        console.log('点击催更')
        // 点击催更的点
        mBuryPoint('11', {
          bookTailEnter: 'bookTailEnter',
          clickUpdate: 'clickUpdate',
          bookId: this.bookId
        })
        // 催更
        getReadUrge(bookId, chapterNum).then(() => {
          this.endInfo.urgeInfo.status = 1
        })
      } else {
        // 点击开启通知
        console.log('-- 点击开启 --')
        bk.call('notificationOpen', {}, () => {
          console.log('点击开启通知')
        })
      }
    },
    rewardHandler() {
      // 打赏作者
      mBuryPoint('11', {
        bookTailEnter: 'bookTailEnter',
        clickReward: 'clickReward',
        bookId: this.bookId
      })
      const rewardUrl = `breader://reward?bookId=${this.bookId}`
      window.location = rewardUrl
    },
    commentHandler() {
      // 参与评分
      mBuryPoint('11', {
        bookTailEnter: 'bookTailEnter',
        clickScore: 'clickScore',
        bookId: this.bookId
      })
      let version = this.version
      if (compareVersion(version, '1.42.0')) {
        // let origin = window.location.origin.match(/test/) ? 'http://testincrease.ibreader.com/' : 'https://increase.ibreader.com'
        let origin = window.location.origin
        let url = origin + '/BKH5-post_bar.html?bookId=' + this.bookId
        routerToNative(url)
        return
      }
      window.location = 'breader://comment'
    },
    addShelf() {
      //  加入书架
      mBuryPoint('11', {
        bookTailEnter: 'bookTailEnter',
        enterType: '1',
        addBookShelf: 'addBookShelf',
        bookId: this.bookId
      })
      const addBookShelfUrl = `breader://addBookshelf?bookId=${this.bookId}&goRead=0&source=${this.source}`
      window.location = addBookShelfUrl
    },
    addShelfAndRead() {
      // 加入书架并继续阅读
      mBuryPoint('11', {
        bookTailEnter: 'bookTailEnter',
        enterType: '1',
        addBookShelfAndRead: 'addBookShelfAndRead',
        bookId: this.bookId
      })
      const addBookShelfAndReadUrl = `breader://addBookshelf?bookId=${this.bookId}&goRead=1&source=${this.source}`
      window.location = addBookShelfAndReadUrl
    },
    handleGoBookDetail(target) {
      window.location.href = target.scheme + '&userPath=' + this.source
    },
    receiveforbook() {  // 领取VIP
      // 点击领取的点
      mBuryPoint('11', {
        bookTailEnter: 'bookTailEnter',
        clickVip: 'clickVip',
        bookId: this.bookId
      })
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
