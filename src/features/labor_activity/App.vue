<template lang="pug">
#app
  .labor
    .labor-rule 活动规则
    div.labor-top
      img(src='@/assets/labor_activity/title.png')
    div.labor-money-box
      .labor-money-tip
        span 排名前1000名瓜分
        | 十万现金红包
      .labor-members
        | 参与人数：119999
      .labor-money-number ¥100000
    div.labor-begin-active-count-time
      | 活动开始倒计时 <br>
      | {{day}}天{{hour}}时{{min}}分{{sec}}秒
    div.labor-no-start-btn 立即参加
    div.labor-commend
      div.labor-commend-list
        div.labor-commend-list-item(v-for='item in commendList' :key='item.bookId')
          img(:src='item.imgUrl')
      div.labor-commend-btn
        | 查看更多
        img(src='@/assets/labor_activity/more_icon.png')
</template>

<script>
import { commendList } from './variable'
export default {
  data() {
    return {
      commendList,
      day: '00',
      hour: '00',
      min: '00',
      sec: '00'
    }
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
