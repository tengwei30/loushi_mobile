<template lang="pug">
#person_guidance
  .first_step(v-if="steps === '1'")
    span.title 我知道了
    span.desc
      | 参与抽奖赢
      em(:style="{color: '#FCA66B'}") 碎片
      img.img_icon(src="../../../assets/debris_center/step_icon.png")
    span.path
    span.gift
  .second_step(v-if="steps === '2'")
    span.title 我知道了
    span.desc
      | 完成阅读任务可获得更多
      em 碎片
      img.img_icon(src="../../../assets/debris_center/step_icon.png")
    span.path
    span.gift
  .three_step(v-if="steps === '3'")
    span.title 我知道了
    span.desc
      | 阅读专享书籍获得更多
      em 碎片
      img.img_icon(src="../../../assets/debris_center/step_icon.png")
    span.path
    span.gift
</template>
<script>
export default {
  props: ['steps']
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../styles/index.styl';
#person_guidance
  position relative
  size(100%, 100%)
  .first_step, .second_step, .three_step
    font-size 14px
    color #ffffff
    display flex
    flex-direction column
    justify-content center
    align-items flex-end
    absolute(bottom 20px right 9px)
    .title
      font-family PingFangSC-Medium, PingFang SC
      font-weight bold
      padding-bottom 15px
      align-self center
    .desc
      max-width 156px
      min-height 34px
      display inline-block
      align-items center
      padding 5px 13px
      box-sizing border-box
      box-shadow 0px 0px 11px 0px #FFFFFF
      border 2px solid #FFFFFF
      border-radius 10px
      margin-bottom 9px
      position relative
      text-align center
      &:after
        size(0,0)
        absolute(right 23px bottom -17px)
        content ''
        border-top 8px solid #ffffff
        border-right 8px solid transparent
        border-bottom 8px solid transparent
        border-left 8px solid transparent
      .img_icon
        size(14px 14px)
        padding 2px 0 0 3px
        box-sizing border-box
      em
        color #FCA66B
    .path
      size(42px 41px)
      display inline-block
      background url('../../../assets/debris_center/Path@3x.png') no-repeat center center
      background-size 100% 100%
      align-self center
      padding-bottom 5px
      position relative
      text-align center
      &:after
        content ''
        absolute(bottom -13px right -9px)
        size(30px 30px)
        background #FFCE87
        border-radius 50%
        opacity 0.56
        box-sizing border-box
        border 6px solid #F43A3A
        z-index 9998
    .gift
      size(98px 70px)
      display inline-block
      border-radius 35px
      background-image linear-gradient(235deg, rgba(255, 200, 122, 1), rgba(244, 58, 58, 1))
      position relative
      &:after
        content ''
        absolute(left 2px top 2px)
        size(94px, 66px)
        border-radius 35px
        background #ffffff
      &:before
        content ''
        absolute(left 2px top 2px)
        size(94px, 66px)
        border-radius 35px
        background url('../../../assets/debris_center/award_gift.png') no-repeat center center
        background-size 100% 100%
        z-index 9999
  .second_step, .three_step
    bottom 9px
    align-items center
    .gift
      width 356px!important
      min-height 207px!important
      &:after
        size(352px, 203px)
      &:before
        content ''
        background none
  .three_step
    bottom 83px
    .gift
      min-height 141px!important
      &:after
        size(352px, 137px)
</style>