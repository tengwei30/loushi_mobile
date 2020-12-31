<template lang="pug">
.day__task
  .day__task__title 待完成福利
  ul.task__list
    li.task__item(
      v-for="(item, key) in dayTaskLists"
      :key="key"
      @click="openTask(item)")
      span.task__item__title {{ item.name }}
      span.task__item__gold__common(
        :class="item.isFinish === 1 ? 'task__item__gold__finish' : 'task__item__gold' "
        )
        span.txt {{ item.isFinish === 1 ? '已领取' : `${item.rewardNum}金币` }}
</template>
<script>
export default {
  props: ['dayTaskLists'],
  data() {
    return {}
  },
  methods: {
    openTask(item) {
      this.$emit('openTask', item)
    }
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
    font-weight bold
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
        line-height 56px
        padding-top 2px
        box-sizing border-box
      span.task__item__gold__common
        size(87px 25px)
        border-radius 4px
        color #ffffff
        position relative
        padding-right 7px
        box-sizing border-box
        &::after
          content ''
          absolute(right -8px top 3px)
          size(18px 18px)
        .txt
          clear both
          float left
          line-height 25px
          width 100%
          padding-top 1px
          box-sizing border-box
          display inline-block
          text-align center
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