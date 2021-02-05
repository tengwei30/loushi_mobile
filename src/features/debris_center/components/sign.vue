<template lang="pug">
#sign_cotent
  .header_title
    .header_left
      h2.title
        | 已连续签到{{ checkinInfo.checkinDays }}天
        img(
          src="../../../assets/debris_center/sign_icon_record.png"
          @click="() => this.$emit('goSignRecord')")
      //- p.desc 再签3天可获得大礼包
    .header_right
      h3.title 签到提醒
      img.onOff(@click="() => this.$emit('openCalendarSignNotice')" :src="imgUrl")
  .content
    .content_day
      Swiper.swiper(:options="swiperOption")
        SwiperSlide.swiper-slide(v-for="(item, key) in checkinRewardInfoList")
          .img_cover
            img.sign_default_cover(:src="setImg(item, key)")
            p.sign_debris_number(v-if="checkinInfo.checkinDays <= key")
              span +{{ item.rewardFragmentCount }}
          span.sign_title {{ item.checkinDayNum }}日
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  props: ['openCalendarSignNotice', 'imgUrl', 'goSignRecord', 'checkinRewardInfoList', 'checkinInfo'],
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 17,
        centeredSlides: false,
        initialSlide: 0
      }
    }
  },
  computed: {
    lists() {
      return this.checkinRewardInfoList
    }
  },
  methods: {
    setImg(item, key) {
      const { rewardFragmentCount } = item
      if (key < this.checkinInfo.checkinDays) {
        return require('../../../assets/debris_center/sign_finish.png')
      } else if (rewardFragmentCount * 1 > 1) {
        return require('../../../assets/debris_center/sign_gift.png')
      } else {
        return require('../../../assets/debris_center/sign_default.png')
      }
    }
  },
  mounted() {
    console.log('签到数据', this.lists)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../styles/index.styl';
#sign_cotent
  width 346px
  min-height 210px
  margin 0 auto
  box-sizing border-box
  margin-top 20px
  border-radius 10px
  box-shadow 0px 0px 8px 0px rgba(0, 0, 0, 0.09)
  background linear-gradient(235deg, #FFC87A 0%, #F43A3A 100%)
  border-radius 10px
  .header_title
    padding 0 20px 16px
    box-sizing border-box
    min-height 46px
    width 346px
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    padding-top 20px
    .header_left
      display flex
      flex-direction column
      justify-content center
      align-items center
      h2.title
        height 22px
        font-size 16px
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        line-height 22px
        color #FFFFFF
        display flex
        flex-direction row
        align-items center
        img
          size(16px 16px)
          border-radius 8px
          margin-left 10px
      // p.desc
      //   height 17px
      //   font-size 12px
      //   font-family PingFangSC-Regular, PingFang SC
      //   font-weight 400
      //   line-height 17px
      //   color #FFFFFF
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
    padding 0 10px
    box-sizing border-box
    .content_day
      width 100%
      height 120px
      background #FFFFFF
      box-sizing border-box
      border-radius 10px
      .swiper
        .swiper-slide
          display flex
          flex-direction column
          padding-top 30px
          .img_cover
            position relative
            size(46px, 46px)
            .sign_default_cover
              width 100%
            &::before
              content ''
              absolute(right 40px top 0 bottom 0)
              margin auto
              width 30px
              height 12px
              background #FFE1C7
            p.sign_debris_number
              absolute(right -6px top -10px)
              min-width 28px
              height 15px
              background linear-gradient(235deg, #FFC87A 0%, #F43A3A 100%)
              border-radius 150px 100px 100px 10px
              border 1px solid #FFFFFF
              font-size 12px
              line-height 15px
              color #FFFFFF
              font-family PingFangSC-Medium, PingFang SC
              text-align center
          .sign_title
            font-size 14px
            width 46px
            display inline-block
            color #8D3000
            padding-top 0
            text-align center
            font-family PingFangSC-Regular, PingFang SC
      .swiper .swiper-slide:nth-of-type(1) .img_cover::before
        background none!important
</style>
