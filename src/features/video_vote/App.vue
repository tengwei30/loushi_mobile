<template lang="pug">
div
  cube-scroll.video-vote-scroll(ref='wrapper'
  :options='options'
  :data='rankList'
  @pulling-up="onPullingUp"
  :scroll-events="['before-scroll-start', 'scroll-end']"
  @before-scroll-start='beforeScrollStart'
  @scroll-end='scrollEnd')
    div.video-vote-bg
      div.video-vote-rule-btn(@click='handleToggleShowRule') 活动规则
      div.video-count-time
        | 倒计时：
        span.video-count-time-item {{countTime.day || 0}}
        | 天
        span.video-count-time-item {{countTime.hour || '00'}}
        | :
        span.video-count-time-item {{countTime.min || '00'}}
        | :
        span.video-count-time-item {{countTime.sec || '00'}}
      div.video-tip
      div.video-box
        video-item(v-for='(item) in rankList'
        v-if='item.id'
        :key='item.id'
        :playerList='playerList'
        :rankInfo='item'
        ref='videoVoteItem'
        @handleToggleShowVote='handleToggleShowVote')
  div.video-vote-number(:class='{"video-is-show": !isShowAwardBtn}')
    span.video-vote-number-box
      | 可投票数 <br>
      | {{myVoteCounts||0}}票
  div.video-vote-draw(@click='handeGoDrawPage'
  :class='{"is-show-award-btn": !isShowAwardBtn}')
  video-rule(v-if='isShowRule'
  @handleToggleShowRule='handleToggleShowRule')
  video-vote(v-if='isShowVote'
  @handleToggleShowVote='handleToggleShowVote'
  :myVoteCounts='myVoteCounts'
  :voteTargetInfo='voteTargetInfo')
</template>

<script>
import bus from './bus'
import BScroll from 'better-scroll'
import VideoItem from './components/videoItem'
import VideoRule from './components/videoRule'
import VideoVote from './components/videoVote/index'

import { getRankList, getVoteCounts } from './request'
import { getQueryString } from '@/utils/url'
import { countDown } from '@/utils/utils.js'
import { skipUrl, toast } from '@/utils/nativeToH5/index'
import { mBuryPoint } from '@/utils/buryPoint'

export default {
  components: {
    VideoItem,
    VideoRule,
    VideoVote,

  },
  data() {
    return {
      scroll: null,
      isHasMore: true,
      playerList: [],
      currentPlayer: null,
      rankList: [],
      isShowRule: false,
      isShowVote: false,
      countTime: {},
      pageNum: 1,
      myVoteCounts: 0,
      voteTargetInfo: {},
      countTimeEnd: 0,
      isShowAwardBtn: true,
      options: {
        observeDOM: true,
        click: true,
        probeType: 1,
        pullUpLoad: true,
        pullDownRefresh: false
      }
    }
  },
  created() {
    this.getAllPlayerList()
    this.init()
    mBuryPoint('7', {
      enterType: 1
    })
    window.ibreader && window.ibreader.prohibitPull()
  },
  methods: {
    init() {
      // this.initBScroll()
      this.getRankList()
      this.getVoteCounts()
    },
    onPullingUp() {
      this.getRankList()
      this.$refs.wrapper.forceUpdate()
    },
    beforeScrollStart() {
      this.isShowAwardBtn = false
    },
    scrollEnd() {
      this.isShowAwardBtn = true
      this.$refs.videoVoteItem.map((item) => {
        let ele = item.$el
        const eleOffsetTop = ele.offsetTop
        const eleClientHeight = ele.clientHeight
        const docClientHeight = document.body.clientHeight || document.documentElement.clientHeight
        if (Math.abs(this.$refs.wrapper.scroll.y) > eleOffsetTop || (eleOffsetTop + eleClientHeight - docClientHeight) > Math.abs(this.$refs.wrapper.scroll.y)) {
          item.pauseChildVideo && item.pauseChildVideo(item)
        }
      })
    },
    async getVoteCounts() {
      let res = await getVoteCounts()
      console.log(res)
      if (res.code === 100) {
        this.myVoteCounts = res.data.count || 0
      }
    },
    async getRankList() {
      this.isHasMore = false
      let res = await getRankList(getQueryString('activityId'), this.pageNum)
      if (res.code === 100) {
        if (this.countTimeEnd === 0) {
          this.countTimeEnd = res.data.endTime - new Date().getTime()
          this.countDown(this.countTimeEnd)
        }
        if (res.data.rankList && res.data.rankList.length > 0) {
          this.isHasMore = true
          this.pageNum += 1
          this.rankList = this.rankList.concat(res.data.rankList)
        } else {
          this.isHasMore = false
          return
        }
      }
      this.$refs.wrapper.forceUpdate()
    },
    initBScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, tap: true, probeType: 3, bounce: false })
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50) && this.isHasMore) {
            this.getRankList()
          }
          this.isShowAwardBtn = true
          this.$refs.videoVoteItem.map((item) => {
            let ele = item.$el
            const eleOffsetTop = ele.offsetTop
            const eleClientHeight = ele.clientHeight
            const docClientHeight = document.body.clientHeight || document.documentElement.clientHeight
            if (Math.abs(this.scroll.y) > eleOffsetTop || (eleOffsetTop + eleClientHeight - docClientHeight) > Math.abs(this.scroll.y)) {
              item.pauseChildVideo && item.pauseChildVideo(item)
            }
          })
        })
        this.scroll.on('scroll', () => {
          this.isShowAwardBtn = false
        })
      })
    },
    getAllPlayerList() {
      // 获取视频播放列表
      bus.$on('currentPlayer', (value) => {
        value && this.playerList.push(value)
      })
    },
    countDown(time) {
      countDown(time, (value) => {
        this.countTime = value
      })
    },
    handleToggleShowRule() {
      if (this.isShowRule) {
        this.$refs.wrapper.enable()
      } else {
        this.$refs.wrapper.disable()
      }
      this.isShowRule = !this.isShowRule
    },
    handleToggleShowVote(target) {
      if (this.countTime.day === undefined || (this.countTime.day == 0 && this.countTime.hour == 0 && this.countTime.min == 0 && this.countTime.sec == 0)) {
        toast({
          content: '活动已结束，暂停投票'
        })
        return
      }
      if (target) {
        this.voteTargetInfo = target
      }
      if (this.isShowVote) {
        this.$refs.wrapper.enable()
      } else {
        this.$refs.wrapper.disable()
      }
      this.isShowVote = !this.isShowVote
    },
    handeGoDrawPage() {
      mBuryPoint('7', {
        clickType: 3
      })
      if (this.countTime.day === undefined || (this.countTime.day == 0 && this.countTime.hour == 0 && this.countTime.min == 0 && this.countTime.sec == 0)) {
        toast({
          content: '活动已结束，暂停抽奖'
        })
        return
      }
      skipUrl({
        skipUrl: `${window.location.origin}/BKH5-vote_draw_award.html${window.location.search}`
      })
    },
    dealRankListAfterVote() {
      this.rankList = []
      this.pageNum = 1
      this.getRankList()
      this.getVoteCounts()
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>