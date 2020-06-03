<template lang="pug">
#active-618
  div.active-rule(@click='isShowRule = true') 活动规则
  div.recharge-box
    div.recharge-item
      div.recharge-item-btn(v-if='isStarted' @click='handleGoUserCenter')
      div.recharge-item-time(v-else)
        | 倒计时:
        span {{day}}
        | 天
        span {{hour}}
        | 小时
    div.recharge-item
      div.recharge-item-btn(v-if='isStarted' @click='handleGoUserCenter')
      div.recharge-item-time(v-else)
        | 倒计时:
        span {{day}}
        | 天
        span {{hour}}
        | 小时
  div.notice-list(v-if='noticeList.length > 0')
    swiper.notice-swiper(:options='swiperOptions')
      swiper-slide.notice-swiper-slide(v-for='(item, index) in noticeList'
      :key='index')
        img(:src='item.headImage')
        span.notice-nickname {{item.nickName}}中了
        span.notice-award {{item.rewardName}}
  div.more-game
    div.game-one
      div.game-btn(v-if='isStarted' @click='getGameUrl(2)')
      div.game-time(v-else)
        | 倒计时:
        span {{day}}
        | 天
        span {{hour}}
        | 小时
    div.game-two
      div.game-btn(v-if='isStarted' @click='getGameUrl(3)')
      div.game-time(v-else)
        | 倒计时:
        span {{day}}
        | 天
        span {{hour}}
        | 小时
    div.game-three(@click='getGameUrl(4)')
  div.member-power
  div.active-book-box
    div.active-book-list
      div.active-book-item(v-for='item in bookList'
      :key='item.bookId'
      @click='handleGoBookDetail(item.bookId)')
        img(:src='item.imgUrl')
        div.active-book-name {{item.bookName}}
    div.active-book-btn(@click='handleGoRanking')
  rule(v-show='isShowRule' @toggleShowRule='isShowRule = false')
</template>

<script>
import { getNoticeList, getGameUrl } from './request.js'
import { getQueryString } from '@/utils/url.js'
import { routerToNative, jumpBookRanking, jumpBookDetail } from '@/utils/native'
import BROWSER from '@/utils/browser'
import { bookList } from './variable.js'
import { countDown } from '@/utils/utils.js'
import Rule from './components/rule'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    Rule
  },
  data() {
    return {
      isStarted: false,
      noticeList: [],
      swiperOptions: {
        autoplay: {
          delay: 1000
        },
        speed: 1000,
        loop: true,
        centeredSlides: true,
        slidesPerView: 3,
        direction: 'vertical',
        spaceBetween: 4
      },
      bookList,
      day: '0',
      hour: '00',
      isShowRule: false
    }
  },
  methods: {
    initPage() {
      this.getNoticeList()
      this.computedCountDown()
    },
    async getNoticeList() {
      const activityId = getQueryString()
      let res = await getNoticeList(activityId)
      console.log(res)
      if (res.code === 100) {
        this.noticeList = res.data
      }
    },
    async getGameUrl(transfer) {
      let appType = BROWSER.isiOS ? 1 : 0
      let res = await getGameUrl(appType, transfer)
      if (res.code === 100) {
        routerToNative(res.data.loginUrl)
      }
    },
    computedCountDown() {
      let time = new Date('2020/06/18 00:00:00').getTime() - new Date().getTime()
      if (time <= 0) {
        this.isStarted = true
        return
      }
      countDown(time, ({ day, hour }) => {
        this.day = day
        this.hour = hour
      })
    },
    handleGoRanking() {
      jumpBookRanking()
    },
    handleGoBookDetail(bookId) {
      jumpBookDetail({ bookId })
    },
    handleGoUserCenter() {
      window.location = 'breader://usercenter/vip'
    }
  },
  mounted() {
    this.initPage()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
