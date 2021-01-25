<template lang="pug">
  .debris_detail_item
    .detail_left
      .detail_left_tip 碎片专享书籍阅读6章
      .detail_left_time 2021-01-31 12:00:11
    .detail_right
      .detail_right_info(
        v-for='item in info.id'
        :key='"id:" + item'
      )
        | {{item % 2 === 1 ? 'ipad碎片' : '扫地机器人碎片'}}
        span.detail_right_info_count +1
</template>
<script>
export default {
  props: {
    info: {
      default: {}
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus">
.debris_detail_item
  font-size 16px
  display flex
  align-items center
  justify-content space-between
  box-sizing border-box
  margin 0 16px 20px
  padding 0 9px 19px
  position relative
  &::before
    content ''
    width 325px
    height 1px
    background #E4E4E4
    position absolute
    left 9px
    bottom 0
    opacity 0.25
  .detail_left
    line-height 1.1
    white-space nowrap
    .detail_left_tip
      font-weight 400
    .detail_left_time
      font-size 12px
      color #999999
      font-weight 400
      margin-top 16px
  .detail_right
    align-self stretch
    display flex
    flex-direction column
    .detail_right_info
      text-align right
      line-height 1
      margin-bottom 5px
      font-size 12px
      color #999999
      font-weight 400
      &.last-of-type
        margin 0
      .detail_right_info_count
        margin-left 5px
        color #F5443E
</style>