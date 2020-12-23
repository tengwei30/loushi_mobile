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
  DayWelfare(
    v-if="excitationUserTaskVOList.length !== 0"
    :excitationUserTaskVOList="excitationUserTaskVOList"
    :receivedCoin="receivedCoin"
    :totalCoin="totalCoin"
    :readChapterCount="readChapterCount"
  )
  ExtraWelfare(
    v-if="singleBookLists.length !== 0"
    :singleBookLists="singleBookLists"
    :showReadPercent="showReadPercent"
    @routerToRead="routerToRead"
  )
  DayTask(
    v-if="dayTaskLists.length !== 0"
    :dayTaskLists="dayTaskLists"
    @openTask="openTask"
  )
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
  .task_rule(v-show="showRule")
    p 温馨提示：
    p 1.完成任务后可在【我的】页面中进入【我的钱包】查看金币流水
    p 2.【我的钱包】中点击页面右上角【提现】按钮可进行提现。
  ReadModal(
    v-if="day && day.dialog"
    @goReadAd="goReadAd"
    @closeModal="closeModal"
  )
</template>

<script>
import { routerToNative, throttle } from '@/utils/index'
// import { toast } from '@/utils/nativeToH5/index'
import { getTaskLists, getFourAdLists, getAdBannerLists, getSingleBookList, getServiceAreaTaskList, getTaskFinish } from './request.js'
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
      userTaskRedPackageVOList: [], // 新人签到
      showRedPackageStyle: 0, // 是否是新签到模式
      day: null,
      adTaskLists: [],  // 8个小icon广告列表
      adBannerLists: [],  // 双图的banner列表
      clickFlag: true,
      showReadAd: false,  // 是否显示看广告补签
      readChapterCount: 10,  // 阅读章数
      chapterCoinRate: 0, // 单章兑换金币汇率
      historyReadChapter: 0,  // 历史阅读章节数
      dayTaskLists: [], // 每日任务列表
      singleBookLists: [], // 单书激励任务列表
      excitationUserTaskVOList: [],  // 当日连续阅读进度
      totalCoin: 0,
      receivedCoin: 0,
      showReadPercent: 0,
      showRule: false, // 展示温馨提示
      isOpen: 0
    }
  },
  methods: {
    openTask: throttle(function(item) {
      if (item.isFinish * 1 === 0) {
        console.log('item', item)
        if (item.subType === 4) {
          bk.call('handleCalendarSignNotice', {}, (data) => {
            const { isSuccess } = JSON.parse(data)
            // 通知开启初始化
            if (isSuccess * 1 === 0) return
            this.isOpen = 1
            toast({
              content: '明日任务提醒开启成功'
            })
          })
          return
        }
        getTaskFinish(item.id, this.readChapterCount, this.historyReadChapter).then(res => {
          if (res * 1 !== 100) {
            bk.call('goReadBook', {}, () => {
              console.log('去阅读')
            })
          } else {
            // this.$showToast('完成任务')
            console.log('手动完成任务')
            getServiceAreaTaskList(this.readChapterCount, this.chapterCoinRate).then(res => {
              this.dayTaskLists = []
              this.dayTaskLists = res.taskVOS
            })
          }
        })

      }
    }, 30),
    routerToRead(val, key) { // 点击阅读激励
      console.log(val, key)
      window.location.assign(`breader://www.bayread.com/bookview/bookread?bookId=${val.bookId}&source=welfareTask&chapterNum=0`)
    },
    gotoRule() {  // 跳转到规则说明页面
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
    startTask(val) {  // 开始做广告任务
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
    },
    async InitData() {  // 初始化数据
      const { excitationUserTaskVOList, taskVOS, receivedCoin, totalCoin } = await getServiceAreaTaskList(this.readChapterCount, this.chapterCoinRate)
      taskVOS[0].isFinish = this.isOpen
      this.dayTaskLists = taskVOS
      this.excitationUserTaskVOList = excitationUserTaskVOList

      const { excitationSingleBookInfoVOList = [], showReadPercent } = await getSingleBookList()
      this.singleBookLists = excitationSingleBookInfoVOList
      this.showReadPercent = showReadPercent
      this.receivedCoin = receivedCoin
      this.totalCoin = totalCoin
      this.showRule = true
      bk.call('buryingPoint', {
        eventName: 'H5_WELFARE_TASK_ENTER',
        // map: {
        // }
      })
    }
  },
  mounted() {},
  async created() {
    bk.call('getTodayReadMotivationChapterNum  ', {}, data => { // 初始化碎片信息
      const { readChapterCount, chapterCoinRate, historyReadChapter } = JSON.parse(data)
      this.readChapterCount = readChapterCount
      this.chapterCoinRate = chapterCoinRate
      this.historyReadChapter = historyReadChapter
    })
    bk.register('browserPageResume', () => {
      console.log('调用页面重新方法')
      this.InitData()
    })
    bk.call('calendarSignNoticeInit', {}, data => {
      const { isOpen  } = JSON.parse(data)
      // 通知开启初始化
      if (isOpen  * 1 === 0) {
        this.isOpen = 0
      } else {
        this.isOpen = 1
      }
    })
    bk.register('calendarSignNoticeResume', () => {
      toast({
        content: '明日任务提醒开启成功'
      })
      this.isOpen = 1
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
    this.InitData()
    this.adTaskLists = await getFourAdLists()
    this.adBannerLists = await getAdBannerLists()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
