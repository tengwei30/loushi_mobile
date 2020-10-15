<template>
<div class="sign-record">
  <template v-if="signList.length > 0">
    <div class="sign-record-title sign-record-item">
      <div class="sign-record-item-left">日期</div>
      <div class="sign-record-item-right">签到状态</div>
    </div>
    <div class="sign-record-item"
    :class="{'is-signed': item.status != 0, 'unsigned': item.status == 0}"
    v-for="(item,index) in signList" :key='index'
    >
      <div class="sign-record-item-left">{{momentDate(item.time)}}</div>
      <div class="sign-record-item-right">{{item.status ===0 ? '未签到' : '已签到'}}</div>
    </div>
  </template>
  <div class="sign_null_record" v-else>
    <img src="@/assets/task/nosignrecord@3x.png" alt="">
    <div>还没有签到记录哦</div>
  </div>
</div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    signList: {
      defautl: []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    momentDate(time) {
      return moment(time).format('YYYY-MM-DD')
    },
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
  .sign_null_record
    font-size 16px
    color rgba(153, 153, 153, 1)
    text-align center
    margin-top 50px
    img
      width 2.17rem
      height 1.71rem
      margin-bottom 10px
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
