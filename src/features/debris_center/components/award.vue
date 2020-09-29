<template lang='pug'>
.single_award(:style="styles")
  .img_show
    span.img
  .single_award_title iPhone11 pro碎片
  .single_award_progress
    span.default_progress
      em.active_progress(:style="{'width': proWidth}")
      em.progress_count {{progressCount}}/9
</template>

<script>
export default {
  props: {
    styles: { // 自定义真个奖励框的大小等样式
      type: Object,
      required: false,
      default: () => {
        return {
          width: '110px',
          minHeight: '150px'
        }
      }
    },
    progressCount: {  // 已收集的碎片的个数
      type: String,
      default: '0'
    }
  },
  data() {
    return {}
  },
  computed: {
    proWidth() {
      return `${Number.parseInt(this.progressCount) * 8}px` || '0px'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../styles/index.styl';
$width = 72px
$height = 22px
.single_award
  padding-bottom 10px
  display flex
  flex-direction column
  align-items center
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
    width $width
    height $height
    background #FFE3CA
    border-radius 11px
    box-sizing border-box
    border 1px solid #FCAB1B
    margin 0 auto
    color #FCAB1B
    position relative
    .default_progress
      display inline-block
      absolute(top 0 left 0)
      z-index 12
      .active_progress
        absolute(top -1px left -1px)
        z-index 10
        // width 64px
        height 22px
        display inline-block
        background linear-gradient(245deg, #FFA34B 0%, #F44004 71%, #FF5537 100%)
        border-radius 11px
      .progress_count
        font-size 12px
        text-align center
        line-height 22px
        display inline-block
        absolute(top -1px left -1px)
        width $width
        height $height
        z-index 15
        // color #ffffff
</style>