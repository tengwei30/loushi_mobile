<template lang="pug">
div
  .new_ad_user_landing(v-if='platform > -1 && platformInfo[platform]')
    img.landing_bg(
      :src='platformInfo[platform].bgImg'
    )
    .landing_content
      .landing_btn(
        @click='downloadApp'
        :class="platformInfo[platform].btnClassName"
      ) 立即下载
      .landing_text 下载APP，阅读更流畅
  .new_ad_user_landing(v-if='platform > -1 && !platformInfo[platform]')
    img.landing_bg(
      src='../../assets/new_ad_user_guide_landing/bk_free_bg.png'
    )
    .landing_content
      .landing_btn(
        @click='downloadApp'
      ) 立即下载
      .landing_text 下载APP，阅读更流畅
</template>

<script>
import { getQueryString, throttle } from '@/utils/index'
export default {
  data() {
    return {
      /**
       * 平台号：5=必看，6=必阅，7=坚果，51=洋葱
       */
      platform: -1,
      platformInfo: {
        5: {
          bgImg: require('../../assets/new_ad_user_guide_landing/bk_free_bg.png'),
          btnClassName: 'bk_free_app'
        },
        6: {
          bgImg: require('../../assets/new_ad_user_guide_landing/by_bg.png'),
          btnClassName: 'by_app'
        },
        7: {
          bgImg: require('../../assets/new_ad_user_guide_landing/jg_bg.png'),
          btnClassName: 'jg_app'
        },
        51: {
          bgImg: require('../../assets/new_ad_user_guide_landing/yc_bg.png'),
          btnClassName: 'yc_app'
        },
      }
    }
  },
  methods: {
    downloadApp: throttle(function() {
      console.log('download-app')
    }, 50),
    dealTitle(platform) {
      let title = ''
      switch (platform) {
      case 5:
        title = '必看免费小说'
        break
      case 6:
        title = '必阅免费小说'
        break
      case 7:
        title = '坚果免费小说'
        break
      case 51:
        title = '洋葱免费小说'
        break
      default:
        title = '免费小说'
        break
      }
      document.title = title
    }
  },
  created() {
    let platform = getQueryString('platform') ? Number(getQueryString('platform')) : 0
    this.platform = platform
    this.dealTitle(platform)
  },
  mounted() {
    console.log(222)
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
