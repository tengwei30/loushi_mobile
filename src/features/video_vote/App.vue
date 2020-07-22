<template lang="pug">
  div.video-vote-scroll(ref='wrapper')
    div.video-vote-bg
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
        video-item(v-for='(item, index) in infoList'
        :key='index'
        :index='index'
        :playerList='playerList'
        @handleToggleShowVote='handleToggleShowVote')
    div.video-vote-rule-btn(@click='handleToggleShowRule') 活动规则
    div.video-vote-number
      span.video-vote-number-box
        | 可投票数 <br>
        | 3票
    div.video-vote-draw
    video-rule(v-if='isShowRule'
    @handleToggleShowRule='handleToggleShowRule')
    video-vote(v-if='isShowVote'
    @handleToggleShowVote='handleToggleShowVote')
</template>

<script>
import bus from './bus'
import BScroll from 'better-scroll'
import VideoItem from './components/videoItem'
import VideoRule from './components/videoRule'
import VideoVote from './components/videoVote/index'

import { countDown } from '@/utils/utils.js'
export default {
  components: {
    VideoItem,
    VideoRule,
    VideoVote
  },
  data() {
    return {
      scroll: null,
      isHasMore: true,
      playerList: [],
      currentPlayer: null,
      infoList: [1, 2, 3, 4, 5, 6],
      isShowRule: false,
      isShowVote: false,
      countTime: {}
    }
  },
  created() {
    this.getAllPlayerList()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initBScroll()
      this.countDown(1000 * 60 * 60)
    },
    getInfoList() {
      this.infoList.push(6, 7)
    },
    initBScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, tap: true, probeType: 3, bounce: false, scrollY: true })
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50) && this.isHasMore) {
            this.getInfoList()
          }
        })
      })
    },
    getAllPlayerList() {
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
      this.isShowRule = !this.isShowRule
    },
    handleToggleShowVote() {
      this.isShowVote = !this.isShowVote
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>