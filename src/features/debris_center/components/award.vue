<template lang='pug'>
.single_award(:style="styles")
  .img_show
    img.img(:src="awardInfo.smallImgUrl")
  .single_award_title {{awardInfo.title}}
  .single_award_progress
    span.default_progress
      em.active_progress(:style="{'width': proWidth, 'animation': animation}")
      em.progress_count.progress_get_now(v-if='awardInfo.userFragmentCount == 9 && awardInfo.exchange == 1'
      @click='getAwardToMailAddress') 待领取
      em.progress_count(v-else)
        i(:style="{color: Number(awardInfo.userFragmentCount) > 4 ? '#ffffff' : '#FCAB1B'}") {{awardInfo.userFragmentCount}}/
        i(:style="{color: Number(awardInfo.userFragmentCount) > 6 ? '#ffffff' : '#FCAB1B'}") 9
</template>

<script>
import { getQueryString } from '@/utils/index'
import { skipUrl } from '@/utils/nativeToH5/index'
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
    awardInfo: {
      type: Object,
      default: () => {
        return {
          title: '',
          userFragmentCount: '0',
          smallImgUrl: '',
        }
      }
    }
  },
  data() {
    return {
      animation: ''
    }
  },
  computed: {
    proWidth() {
      if (this.awardInfo)
        return `${Number.parseInt(this.awardInfo.userFragmentCount) * 8}px` || '0px'
    }
  },
  methods: {
    getAwardToMailAddress() {
      skipUrl({
        skipUrl: `${location.origin}/BKH5-debris_mail_address.html?activityId=${getQueryString('activityId')}&id=${this.awardInfo.id}&activityRecordId=${this.awardInfo.activityRecordId}`
      })
    }
  },
  mounted() {
    setTimeout(() => {
      const tt = document.styleSheets[0]
      tt.deleteRule(0)
      tt.insertRule(
        `@keyframes slideTo {0% { width: 0 } 100% { height: ${this.proWidth}px }}`
      )
      this.animation = 'slideTo 0.5s linear forwards'
    }, 0)
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
    .img
      width 100%
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
    position relative
    .default_progress
      display inline-block
      absolute(top 0 left 0)
      z-index 12
      .active_progress
        absolute(top -1px left -1px)
        z-index 10
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
        &.progress_get_now
          color #ffffff
        i
          font-style normal
</style>