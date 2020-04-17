<template lang="pug">
#app
  div.grow-fission
    div.list-box
      ul.list
        li.item(v-for='val in noticeList')
          span
            img(:src='val.imgUrl')
            | {{val.name}}
          span.message {{val.message}}
          span {{val.time}}

    div.content
      div.title 您有一个红包待领取
      div.award-box
        div.award {{ money }}
          span.most
          span.unit 元
      div.book-box
        div.book-box-tip
          img(src='@/assets/share_fission/icon.png')
          span 免费看小说+赚钱
        div.book-list
          swiper(ref='mySwiper' :options='swiperOptions')
            swiper-slide(v-for='item in bookList' :key='item.bookId')
              div.slider-item
                img.book-cover(:src='item.imgUrl')
                div.book-info
                  div.book-title {{item.name}}
                  div.book-intro {{item.intro}}
            div.swiper-pagination(slot="pagination")
      div.get-award-btn(@click='handleGetNow')
      div.count-down
        span.time {{day}}
        |:
        span.time {{hour}}
        |:
        span.time {{min}}
        |:
        span.time {{sec}}
        span.time-tip 后红包失效请尽快收钱
  div.pop-fixed(v-show='isShowPop')
    img.pop-icon(src='@/assets/share_fission/pop_icon.png')
    img.pop-tip(src='@/assets/share_fission/pop_tip.png')
    img.pop-direction(src='@/assets/share_fission/pop_direction.png')
    img.pop-btn(src='@/assets/share_fission/pop_btn.png' @click='isShowPop=false')
</template>

<script>
import { mBuryPoint } from '@/utils/buryPoint'
import { bookList, noticeList, iosCarefreeAppStoreUrl, andoridApk } from './variable'
import { downLoadApp } from '@/utils/common'
import { interviewReportFetch, initWxSdkApiFetch, getPageInfoFetch } from './request'
import { wxAuthorize, wxInit, wxShareMoentsAndFriend } from '@/utils/wx_sdk.js'
import BROWSER from '@/utils/browser.js'
import { countDown } from '@/utils/utils.js'
import { getQueryString } from '@/utils/url'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      noticeList,
      day: '00',
      hour: '00',
      min: '00',
      sec: '00',
      money: '0.00',
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        initialSlide: 0,
        autoplay: {
          disableOnInteraction: false, // 手动滑动之后不打断播放
          delay: 2000
        },
        speed: 300
      },
      isShowPop: false,
      bookList
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    shareCountDown(time) {
      countDown(time/1000, ({ day, hour, min, sec }) => {
        this.day = day
        this.hour = hour
        this.min = min
        this.sec = sec
      })
    },
    // 立即领取函数
    handleGetNow() {
      mBuryPoint('clickShareLandPageGet')
      if (BROWSER.isWeChat) {
        // 微信环境打开
        this.isShowPop = true
      } else {
        if (BROWSER.isiOS || BROWSER.isiPhone) {
          this.$showToast('下载《必看免费小说》领取奖励', 5000)
        }
        downLoadApp(andoridApk, iosCarefreeAppStoreUrl, 5000)
      }
    },
    // 微信授权
    wxAuthorize() {
      if (BROWSER.isWeChat) {
        wxAuthorize({
          url: this.disHost(),
          appid: 'wxd4f4b7bb44ef3718'
        })
      }
    },
    // 页面初始化
    initPage() {
      mBuryPoint('enterShareLandPage')
      if (getQueryString('code')) {
        // 通过code调用接口，返回openid,进行后续的操作
        setTimeout(() => {
          interviewReportFetch({
            code: getQueryString('code'),
            recordId: getQueryString('recordId')
          })
        }, 10000)
        this.initWxSdkApi()
      } else {
        this.wxAuthorize()
      }
      this.getPageInfo()
    },
    // 微信sdk api初始化
    async initWxSdkApi() {
      let res = await initWxSdkApiFetch(this.disHost())
      try {
        if (res.code === 100) {
          wxInit({ ...res.data })
          wxShareMoentsAndFriend({ title: '帮我点一下，这是一个好看又能赚钱的有趣应用', content: '一个边看小说边赚钱的有趣应用', url: this.getShareUrl(), desc: '海量小说免费看，躺在家里就能赚钱。', imgUrl: window.location.origin + require('@/assets/share_fission/share_icon.png') })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取页面信息接口
    async getPageInfo() {
      let res = await getPageInfoFetch(getQueryString('recordId'))
      try {
        if (res.code === 100) {
          this.shareCountDown(res.data.expireTime)
          this.money = res.data.rewardNum
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 去除泛域名
    disHost() {
      let { host, protocol, port=80, search, pathname } = window.location
      let hostArr = host.split('.')
      if (typeof Number(hostArr[0]) === 'number' && !isNaN(Number(hostArr[0]))) {
        host = hostArr.splice(1).join('.')
      }
      console.log(`${protocol}//${host}:${port}${pathname}${search}`)
      return `${protocol}//${host}${pathname}${search}`
    },
    // 获取分享链接
    getShareUrl() {
      let { origin, pathname, search } = window.location
      let searchArr = search.substring(1).split('&')
      let resultArr = searchArr.filter(str => {
        return str.indexOf('recordId=') > -1
      })
      if (resultArr.length > 0) {
        search = `?${resultArr[0]}`
      }
      return `${origin}${pathname}${search}`
    }
  },
  mounted() {
    this.initPage()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
