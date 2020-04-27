<template lang="pug">
#app
  .labor
    .labor-rule(@click='isShowRule=true') 活动规则
    div.labor-top
      img(src='@/assets/labor_activity/title.png')
    div.labor-money-box
      .labor-money-tip
        span 排名前1000名瓜分
        | 十万现金红包
      .labor-members(:class='{"is-hidden": !isOrNotStartActivityFlag}')
        | 参与人数：119999
      .labor-money-number ¥100000
    div.labor-begin-active-count-time(v-if='!isOrNotStartActivityFlag')
      | 活动开始倒计时 <br>
      span {{day}}天
      span {{hour}}时
      span {{min}}分
      span {{sec}}秒
    div.labor-no-start-btn 立即参加
    div.labor-commend
      div.labor-commend-list
        div.labor-commend-list-item(v-for='item in commendList' :key='item.bookId' @click='handleGoBookDetail(item.bookId)')
          img(:src='item.imgUrl')
      div.labor-commend-btn(@click='handleGoBookRanking')
        | 查看更多
        img(src='@/assets/labor_activity/more_icon.png')
    div.labor-rule-pop(v-if='isShowRule')
      div.labor-rule-pop-box
        div.labor-rule-pop-close(@click='isShowRule=false')
        div.labor-rule-pop-title 活动规则
        div.labor-rule-pop-content
          | 1、本活动只计算有效阅读时长 <br>
          | 2、本活动在点击报名之后开始计算有效时长 <br>
          | 3、活动期间被邀请需在个人中心填写邀请码，则被视为成功邀请 <br>
          | 4、活动结束后奖励会在5 个工作日内进行发放 <br>
          | 5、本活动唯一解释权归必看小说平台所有
</template>

<script>
import { commendList } from './variable'
import { countDown } from '@/utils/utils.js'
import { jumpBookRanking, jumpBookDetail } from '@/utils/native.js'
export default {
  data() {
    return {
      commendList,
      day: '00',
      hour: '00',
      min: '00',
      sec: '00',
      isOrNotStartActivityFlag: true, // 是否已经开始活动
      isShowRule: false
    }
  },
  methods: {
    beginCountDown(time) {
      countDown(time, ({ day, hour, min, sec }) => {
        this.day = day
        this.hour = hour
        this.min = min
        this.sec = sec
      })
    },
    isStartedActivity() {
      const st = '2020/05/01 00:00:00'
      return new Date(st).getTime() - new Date().getTime()
    },
    init() {
      if (this.isStartedActivity() < 0) {
        this.isOrNotStartActivityFlag = true
      } else {
        this.isOrNotStartActivityFlag = false
        this.beginCountDown(this.isStartedActivity())
      }
    },
    handleGoBookRanking() {
      jumpBookRanking()
    },
    handleGoBookDetail(bookId) {
      jumpBookDetail({ bookId })
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
