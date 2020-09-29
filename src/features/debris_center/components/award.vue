<template lang='pug'>
.single_award
  .img_show
    span.img
  .single_award_title iPhone11 pro碎片
  .single_award_progress
    span.default_progress 0/9
</template>

<script>
export default {

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../styles/index.styl';
.single_award
  width 110px
  min-height 150px
  padding-bottom 10px
  .img_show
    size(110px 134px)
    background #FFFFFF
    box-shadow 0px 3px 6px 0px rgba(252, 139, 58, 0.17)
    border-radius 6px
    border 2px solid #FCAB1B
  .single_award_title
    height 17px
    font-size 12px
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    color #8D3E1B
    line-height 17px
    text-align center
    padding 10px 0
  .single_award_progress
    width 72px
    height 22px
    background #FFE3CA
    border-radius 11px
    box-sizing border-box
    border 1px solid #FCAB1B
    margin 0 auto
    color #FCAB1B
    font-size 12px
    text-align center
    line-height 22px
    position relative
    &before
      content ''
      absolute(top -1px left -1px)
      z-index 10
      width 59px
      height 22px
      background linear-gradient(245deg, #FFA34B 0%, #F44004 71%, #FF5537 100%)
      border-radius 11px
    .default_progress
      absolute(top 0 left 26px)
      z-index 12
      color #ffffff
</style>