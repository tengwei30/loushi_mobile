<template lang="pug">
.comment_module
  .comment_userInfo
    img.user_avator(:src='avatarUrl')
    .user_ID_time
      span.user_ID {{ userId }}
      span.user_time {{year()}}年{{month()}}月{{day()}}
    .user_award {{awardName}}
  p.comment_desc
    | {{ awardDesc }}
  .comment_img
    .comment_award_img(v-for="item in awardImgs")
      img(:src='item')
</template>

<script>
import moment from 'moment'
export default {
  props: {
    avatarUrl: {
      type: String,
      required: true,
      default: ''
    },
    userId: {
      type: String,
      required: true,
      default: ''
    },
    time: {
      type: String,
      default: 0
    },
    awardName: {
      type: String,
      default: ''
    },
    awardDesc: {
      type: String,
      default: ''
    },
    awardImgs: []
  },
  methods: {
    year() {
      return moment(this.time).year()
    },
    month() {
      return moment(this.time).month() + 1
    },
    day() {
      return moment(this.time).day()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../styles/index.styl';
.comment_module
  .comment_userInfo
    display flex
    flex-direction row
    align-items center
    .user_avator
      size(36px 36px)
      border 1px solid #FF9C3D
      border-radius 36px
    .user_ID_time
      display flex
      flex-direction column
      justify-content: space-around
      padding 0 24px 0 10px
      span.user_ID
        font-size 12px
        height 17px
        font-weight 500
        color #000000
        line-height 17px
      span.user_time
        height 14px
        font-size 10px
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        color #999999
        line-height 14px
    .user_award
      font-size 12px
      font-family PingFangSC-Regular, PingFang SC
      font-weight 400
      color #FFFFFF
      line-height 22px
      size(66px 22px)
      text-align center
      background linear-gradient(235deg, #FFC87A 0%, #F43A3A 100%)
      border-radius 11px
  .comment_desc
    margin 14px 0 15px
    width 310px
    height 55px
    background #FFF7EE
    border-radius 8px
    padding 7px 12px 8px 18px
    box-sizing border-box
    font-size: 14px
    font-family: PingFangSC-Medium, PingFang SC
    font-weight: 500
    color: #333333
    line-height: 20px
  .comment_img
    display flex
    flex-direction row
    justify-content space-between
    .comment_award_img
      size(94px 80px)
      border 1px solid #F2F2F2
</style>