<template lang="pug">
.welfare__task
  .sign__model
    Sign(
      v-if="day"
      :userTaskRedPackageVOList="userTaskRedPackageVOList"
      :day="day"
      :showRedPackageStyle="showRedPackageStyle"
      @gotoRule='gotoRule'
    )
  .readAdTask(v-if="showReadAd")
    p.read__desc 您本日还没有签到成功，马上去资讯平台领红包吧，满30个就可以签到哦～
    button.btn(@goReadAd="goReadAd('txt')") 去看资讯
  DayWelfare
  ExtraWelfare
  DayTask
  AdTask(
    v-if="adTaskLists.length > 0"
    :adTaskLists="adTaskLists"
    v-on:startTask="startTask"
  )
  AdBanner(
    v-if="adBannerLists.length > 0"
    :adBannerLists="adBannerLists"
    v-on:startTask="startTask"
  )
  ReadModal(
    v-if="day && day.dialog"
    @goReadAd="goReadAd"
    @closeModal="closeModal"
  )
</template>

<script>
import { routerToNative } from '@/utils/index'
import { getTaskLists, getFourAdLists, getAdBannerLists } from './request.js'
import bk from 'bayread-bridge'
export default {
  name: 'welfareTask',
  components: {
    Sign: () => import('./components/Sign'),
    DayWelfare: () => import('./components/DayWelfare'),
    ExtraWelfare: () => import('./components/ExtraWelfare'),
    DayTask: () => import('./components/DayTask'),
    AdTask: () => import('./components/AdTask'),
    AdBanner: () => import('./components/AdBanner'),
    ReadModal: () => import('./components/ReadModal'),
  },
  data() {
    return {
      userTaskRedPackageVOList: [
        {
          status: 1,
        },
        {
          status: 0,
        },
        {
          status: 0,
        },
        {
          status: 0,
        },
        {
          status: 1,
        },
        {
          status: 1,
        },
        {
          status: 0,
        }
      ], // 新人签到
      showRedPackageStyle: 0, // 是否是新签到模式
      day: null,
      adTaskLists: [],
      adBannerLists: [],
      clickFlag: true,
      showReadAd: false,
    }
  },
  methods: {
    gotoRule() {  // 跳转规则
      let origin = window.location.origin
      let url = origin + '/BKH5-sign_activity_rule.html'
      routerToNative(url)
      return
    },
    goReadAd(type = '') {  // 去看资讯完成补签
      if (type === 'txt') { // 埋点区分点击那个点
      } else {
        setTimeout(() => {
          if (this.day && this.day.dialog) this.day.dialog = false
        }, 1500)
      }
      window.location.href = 'breader://action/luckyPrize?new=1'
    },
    closeModal() {  // 关闭看资讯弹窗
      this.day.dialog = false
    },
    startTask(val) {  // 开始做任务
      if (val.maxLimit) {
        if (val.maxLimit - val.finishTimes < 1) {
          this.$showToast('今日次数已用完，明日再来～')
          return
        }
      }
      window.location.assign(val.scheme)
      this.clickFlag = false
      setTimeout(() => {
        this.clickFlag = true
      }, 2000)
    }
  },
  mounted() {},
  async created() {
    bk.call('getTodayReadMotivationChapterNum  ', {}, data => { // 初始化碎片信息
      const { readChapterCount, chapterCoinRate } = JSON.parse(data)
      console.log('调用getTodayReadMotivationChapterNum', readChapterCount, chapterCoinRate, data)
    })
    bk.register('browserPageResume', () => {
      console.log('调用页面重新方法')
    })
    let data = await getTaskLists()
    if (!data) return
    const signday = data.filter(item => item.type === 3) || [{}]
    const { extraData = null, showRedPackageStyle, userTaskRedPackageVOList = null } = signday[0]
    this.day = extraData
    this.showRedPackageStyle = showRedPackageStyle
    this.userTaskRedPackageVOList = userTaskRedPackageVOList
    const { conditionStatus } = this.day
    if (conditionStatus * 1 === 2) {
      this.showReadAd = true
    }
    this.adTaskLists = await getFourAdLists()
    this.adBannerLists = await getAdBannerLists()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
