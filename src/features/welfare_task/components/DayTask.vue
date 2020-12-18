<template lang="pug">
.day__task
  .day__task__title 待完成福利
  ul.task__list
    li.task__item
      span.task__item__title 明日再来并阅读30章
      span.task__item__gold__common.task__item__gold 200金币
    li.task__item
      span.task__item__title 明日再来并阅读30章
      span.task__item__gold__common.task__item__gold 200金币
    li.task__item
      span.task__item__title 明日再来并阅读30章
      span.task__item__gold__common.task__item__gold__finish 已领取
</template>
<script>
export default {
  props: ['dayTaskLists'],
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {
    console.log('dayTaskLists', this.dayTaskLists)
  }
}
</script>
<style lang="stylus">
@import '../../../styles/index.styl';
.day__task
  margin-top 30px
  padding 0 20px
  box-sizing border-box
  .day__task__title
    font-size 16px
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    color #000000
    line-height 22px
    padding-bottom  15px
  ul.task__list
    li.task__item
      padding 0 16px
      margin-bottom 12px
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      height 56px
      background #ffffff
      box-shadow 0px 0px 6px 0px rgba(223, 223, 223, 0.5)
      border-radius 10px
      font-size 14px
      span.task__item__title
        color #666666
        height 20px
        line-height  20px
      span.task__item__gold__common
        size(87px 25px)
        border-radius 4px
        color #ffffff
        line-height 25px
        text-align center
        padding-right 9px
        box-sizing border-box
        position relative
        &::after
          content ''
          absolute(right -8px top 3px)
          size(18px 18px)
      span.task__item__gold
        background #FF5933
        &::after
          background url('../../../assets/welfare_task/task_default_icon.png') no-repeat center center
          background-size 100% 100%
      span.task__item__gold__finish
        background #999999
        opacity 0.4
        &::after
          background url('../../../assets/welfare_task/task_finish_icon.png') no-repeat center center
          background-size 100% 100%
</style>