<template lang="pug">
#contentslot
  .header_title
    .header_left
      h2.title {{ title }}
      p.desc(v-if="desc") {{ desc }}
    .header_right(v-if="isSign")
      h3.title 签到提醒
      img.onOff(@click="openNotification()" :src="imgUrl")
  .content(:style="styles")
    <slot></slot>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      default: ''
    },
    isSign: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    imgUrl: {
      type: String,
      default: require('../../../assets/debris_center/open_icon@2x.png')
    }
  },
  mounted() {
    console.log(this.desc)
  },
  methods: {
    openNotification() {
      this.$emit('openCalendarSignNotice')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../styles/index.styl';
  #contentslot
    width 346px
    margin 0 auto
    background #FFFFFF
    box-sizing border-box
    margin-top 20px
    .header_title
      padding 0 20px
      box-sizing border-box
      min-height 46px
      width 346px
      border-radius 8px 8px 0 0
      background linear-gradient(235deg, #FFC87A 0%, #F43A3A 100%)
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      .header_left
        display flex
        flex-direction column
        justify-content center
        align-items space-between
        h2.title
          height 22px
          font-size 16px
          font-family PingFangSC-Medium, PingFang SC
          font-weight 500
          color #FFFFFF
          line-height 22px
        p.desc
          height 17px
          font-size 12px
          font-family PingFangSC-Regular, PingFang SC
          font-weight 400
          color #FFFFFF
          line-height 17px
      .header_right
        display flex
        flex-direction row
        justify-content center
        align-items center
        h3.title
          height 12px
          font-size 12px
          font-family PingFangSC-Regular, PingFang SC
          font-weight 400
          color #FFFFFF
          line-height 12px
          padding-right 6px
        img.onOff
          size(26px 14px)
          display inline-block
    .content
      width 346px
      min-height 60px
      border-radius 0 0 8px 8px
      border 2px solid #FF9836
      border-top 0
      box-shadow 0px 0px 7px 0px rgba(221, 221, 221, 0.5)
</style>