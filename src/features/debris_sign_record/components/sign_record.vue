<template>
<div class="sign-record">
  <div class="sign-record-title sign-record-item">
    <div class="sign-record-item-left">日期</div>
    <div class="sign-record-item-right">签到状态</div>
  </div>
  <div class="sign-record-item" :class="{'is-signed': item.isSign, 'unsigned': !item.isSign}" v-for="(item,index) in list" :key='index'>
    <div class="sign-record-item-left">{{item.time}}</div>
    <div class="sign-record-item-right">{{item.isSign ? '已签到':'未签到'}}</div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          time: '2019-12-31',
          isSign: true
        },
        {
          time: '2020-01-02',
          isSign: true
        },
        {
          time: '2020-03-31',
          isSign: false
        },
        {
          time: '2020-04-20',
          isSign: false
        },
      ]
    }
  }
}
</script>

<style lang="stylus">
.sign-record
  width 346px
  background #ffffff
  border-radius 12px
  box-shadow 5px 5px 8px 0px rgba(255,119,65,0.02), -5px 5px 8px 0px rgba(255,119,65,0.02)
  min-height 200px
  margin 20px auto
  box-sizing border-box
  padding 4px 10px
  .sign-record-item
    display flex
    align-items center
    justify-content space-between
    font-size 16px
    padding 16px 0
    border-bottom 1px solid rgba(228, 228, 228, 1)
    &:last-of-type
      border none
    .sign-record-item-left
      width 126px
      text-align center
    .sign-record-item-right
      width 102px
      text-align center
    &.sign-record-title
      font-weight bold
    &.unsigned
      color rgba(153, 153, 153, 1)
    &.is-signed
      color rgba(244, 58, 58, 1)

</style>
