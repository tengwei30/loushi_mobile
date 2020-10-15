<template lang="pug">
#debris_app
  header
    .header_space(:style="{opacity: opacity}")
    .header_nav
      span.header_back(
        @click="browserBack()"
         v-if="from !== 'tab'"
        :style="{backgroundImage: backgroundImage}")
      | 碎片中心
      span.header_right_record(v-if="fragmentRewardInfo" @click="goToRewardRecord()") 中奖记录
    .award_list_root
      h3.header_title 我的奖品
      .award_list
        p.click_more_award(@click="goAwardList()") 查看更多
        Award(
          progressCount="3"
        )
        Award
        Award
        Award
  .sign_module
    ContentSlot(
      title='签到领碎片',
      desc=''
      :styles="styles"
      isSign=true
      :imgUrl="imgUrl"
      v-on:openNotification="openNotification"
    )
      .sign_img
        img(
          v-for='item in checkinRewardInfoList'
          :src="require(`@/assets/debris_center/sign/default_${item.checkinDayNum}.png`)"
          )
      p.sign_day_num(@click="goSignRecord()") 您已成功签到{{ checkinInfo.checkinDays }}天，获得{{ checkinInfo.checkinFragmentCount }}枚碎片，别中断哦～
  .task_module
    ContentSlot(
      title='今日阅读 30章',
      :desc='desc'
      :styles="styles"
    )
      ul.task_list
        li.single_task(v-for="item in taskInfoList")
          p.task_name {{ item.name }}
          p.task_state(
            :style="{backgroundImage: item.isFinish * 1 === 0 ? taskFinishDefault : taskFinishBg, color: item.isFinish * 1 === 0 ? '#FFFFFF' : '#F43A3A'}"
            ) {{ item.isFinish * 1 === 0 ? '待领取' : '已到账' }}
  ContentSlot(
    title='奖励中心',
    :styles="styles"
    v-if="commentInfoList.length !== 0"
  )
    .comment(v-for="item in commentInfoList")
      Comment(
        avatarUrl=''
        userId='ID:1111'
        time='13412432151'
        awardName='张三'
        awardDesc='大发是否打算发顺丰'
        v-on:goAwardCenter='goAwardCenter'
      )
  DebrisRule
</template>

<script>
import bk from 'bayread-bridge'
import { getQueryString, routerToNative, throttle } from '@/utils/index'
import ContentSlot from './components/content_slot'
import DebrisRule from './components/debris_rule'
import Comment from './components/comment'
import Award from './components/award'
import { getDebrislist } from './request'
export default {
  components: {
    ContentSlot,
    DebrisRule,
    Comment,
    Award
  },
  data() {
    return {
      activityId: getQueryString('activityId') || '128',
      from: getQueryString('from') || 'tab',
      styles: {
        padding: '16px 21px 12px',
        boxSizing: 'border-box'
      },
      todayTotalReadChapterNum: 1,
      nextTaskNeedNum: 1,
      showNotification: false,
      fragmentItemInfoList: [], // 碎片列表
      checkinRewardInfoList: [], // 碎片列表
      taskInfoList: [], // 任务列表
      checkinInfo: { // 签到天数等相关信息
        checkinDays: 0,
        checkinFragmentCount: 0
      },
      commentInfoList: [], // 福利评论列表
      fragmentItemInfoList: [], // 碎片列表
      opacity: 0,
      backgroundImage: `url(${require('../../assets/debris_center/debris_back@2x.png')})`,
      taskFinishBg: `url(${require('../../assets/debris_center/finish_task.png')})`,
      taskFinishDefault: `url(${require('../../assets/debris_center/default_task.png')})`,
      rewardNum: 0,
      fragmentRewardInfo: 0 // 有没有获取过奖励
    }
  },
  computed: {
    imgUrl() {
      return !this.showNotification ? require('../../assets/debris_center/off_icon@2x.png') : require('../../assets/debris_center/open_icon@2x.png')
    },
    desc() {
      if (this.nextTaskNeedNum * 1 < 0) {
        return `已通过阅读到账${this.rewardNum}枚碎片`
      } else {
        return `已通过阅读到账${this.rewardNum}枚碎片，再阅读${this.todayTotalReadChapterNum}章，到账${this.nextTaskNeedNum}枚`
      }
    }
  },
  created() {
    bk.call('getTodayReadTaskChapterNum', {}, data => {
      const { todayTotalReadChapterNum, nextTaskNeedNum } = JSON.parse(data)
      console.log('初始化碎片', todayTotalReadChapterNum, nextTaskNeedNum)
      this.todayTotalReadChapterNum = todayTotalReadChapterNum
      this.nextTaskNeedNum = nextTaskNeedNum
    })
    bk.call('setHeaderNative', {
      rightText: '中奖记录'
    })
    bk.call('notificationInit', {}, data => {
      const { openNotification } = JSON.parse(data)
      console.log('初始化通知状态', openNotification)
      // 通知开启初始化
      if (openNotification * 1 === 0) {
        this.showNotification = false
      } else {
        this.showNotification = true
      }
    })
    window.notificationResume = this.notificationResume
  },
  methods: {
    notificationResume(data) {
      const { openNotification } = JSON.parse(data)
      console.log('开启返回', openNotification)
      // 开启返回
      if (openNotification * 1 === 1) {
        this.showNotification = true
      } else {
        this.showNotification = false
      }
    },
    openNotification() {
      bk.call('notificationOpen', {}, () => {})
    },
    goAwardList() {
      const url = `${window.location.origin}/BKH5-debris_award_list.html`
      routerToNative(url)
    },
    goSignRecord() {
      const url = `${window.location.origin}/BKH5-debris_sign_record.html`
      routerToNative(url)
    },
    goAwardCenter() {
      const url = `${window.location.origin}/BKH5-debris_award_center.html`
      routerToNative(url)
    },
    browserBack() {
      bk.navigateBack()
    },
    goToRewardRecord() {
      const url = `${window.location.origin}/BKH5-debris_award_detail.html`
      routerToNative(url)
    },
    addScrollHandler: throttle(function() { // 监听滚动
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 60) {
        this.opacity = 1
        this.backgroundImage = `url(${require('../../assets/debris_center/fanhui@2x.png')})`
      } else if (scrollTop < 10) {
        this.opacity = '0.0' + scrollTop * 2
        this.backgroundImage = `url(${require('../../assets/debris_center/debris_back@2x.png')})`
      } else if (scrollTop > 10 && scrollTop < 60) {
        this.opacity = '0.' + scrollTop * 2
        this.backgroundImage = `url(${require('../../assets/debris_center/debris_back@2x.png')})`
      }
    }, 30),
  },
  async mounted() {
    console.log('---', this.from)
    // 添加事件监听
    window.addEventListener('scroll', this.addScrollHandler)
    let { data } = await getDebrislist(this.activityId)
    try {
      const { checkinRewardInfoList,
        checkinInfo,
        commentInfoList = [],
        fragmentItemInfoList = [],
        chapterTaskInfoList = {},
        fragmentRewardInfo = 0
      } = data
      const { taskVOS = []} = chapterTaskInfoList
      this.checkinRewardInfoList = checkinRewardInfoList
      this.checkinInfo = checkinInfo
      this.commentInfoList = commentInfoList
      this.fragmentItemInfoList = fragmentItemInfoList
      this.taskInfoList = taskVOS
      this.fragmentRewardInfo = fragmentRewardInfo * 1
      this.rewardNum = taskVOS.reduce((acc, val) => {
        if (val.isFinish * 1 === 1) {
          return acc + val.rewardNum*1
        } else {
          return 0
        }
      }, 0)
    } catch (error) {
      console.error('error----->', error)
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './debris.styl';
</style>
