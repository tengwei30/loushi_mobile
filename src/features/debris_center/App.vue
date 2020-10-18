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
      span.header_right_record(@click="goToRewardRecord()") 中奖记录
    .award_list_root
      h3.header_title 我的奖品
      .award_list
        p.click_more_award(@click="goAwardList()") 查看更多
        Award(
          v-for="item in fragmentItemInfoList"
          :awardInfo="item"
        )
  .sign_module
    ContentSlot(
      title='签到领碎片',
      desc=''
      :styles="styles"
      isSign=true
      :imgUrl="imgUrl"
      v-on:openCalendarSignNotice="openCalendarSignNotice"
    )
      .sign_img(@click="goSignRecord()")
        img(
          v-for='(item, index) in checkinRewardInfoList'
          :src="getSignUlr(Number(index) + 1)"
          )
      p.sign_day_num(@click="goSignRecord()") 您已成功签到{{ checkinInfo.checkinDays }}天，获得{{ checkinInfo.checkinFragmentCount }}枚碎片，别中断哦～
  .task_module
    ContentSlot(
      :title='taskTitle',
      :desc='desc'
      :styles="styles"
    )
      ul.task_list
        li.single_task(v-for="item in taskInfoList")
          p.task_name {{ item.name }}
          p.task_state(
            @click="openTask(item)"
            :style="{backgroundImage: item.isFinish * 1 === 0 ? taskFinishDefault : taskFinishBg, color: item.isFinish * 1 === 0 ? '#FFFFFF' : '#F43A3A'}"
            ) {{ item.isFinish * 1 === 0 ? '待领取' : '已到账' }}
  .award_center_list
    ContentSlot(
      title='奖励中心',
      :styles="styles"
      v-if="commentInfoList.length !== 0"
    )
      .comment(v-for="item in commentInfoList")
        Comment(
          :avatarUrl='item.headImg'
          :userId='item.id'
          :time='item.createTime'
          :awardName='item.tag'
          :awardDesc='item.content'
          :awardImgs="item.imgList"
          v-on:goAwardCenter='goAwardCenter'
        )
  DebrisRule
</template>

<script>
import bk from 'bayread-bridge'
import { getQueryString, routerToNative, throttle } from '@/utils/index'
import { toast } from '@/utils/nativeToH5/index'
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
      todayTotalReadChapterNum: 1,  // 今日阅读章数
      nextTaskNeedNum: 1, // 今日再阅读几章
      chipNum: 0, // 再阅读几章将到账碎片数
      isOpen: false,
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
    }
  },
  computed: {
    imgUrl() {
      return !this.isOpen ? require('../../assets/debris_center/off_icon@2x.png') : require('../../assets/debris_center/open_icon@2x.png')
    },
    taskTitle() {
      return `今日阅读${this.todayTotalReadChapterNum}章`
    },
    desc() {
      if (this.nextTaskNeedNum * 1 <= 0) {
        return `已通过阅读到账${this.rewardNum}枚碎片`
      } else {
        return `已通过阅读到账${this.rewardNum}枚碎片，再阅读${this.nextTaskNeedNum}章，到账${this.chipNum}枚`
      }
    }
  },
  created() {
    bk.call('getTodayReadTaskChapterNum', {}, data => { // 初始化碎片信息
      const { todayTotalReadChapterNum, nextTaskNeedNum, chipNum   } = JSON.parse(data)
      this.todayTotalReadChapterNum = todayTotalReadChapterNum
      this.nextTaskNeedNum = nextTaskNeedNum
      this.chipNum = chipNum
    })
    bk.call('calendarSignNoticeInit', {}, data => {
      const { isOpen  } = JSON.parse(data)
      console.log('初始化通知状态', isOpen)
      // 通知开启初始化
      if (isOpen  * 1 === 0) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    })
    bk.register('calendarSignNoticeResume', (data) => {
      console.log('注册用户开启', data)
      toast({
        content: '签到提醒开启成功'
      })
      this.isOpen = true
    })
  },
  methods: {
    getSignUlr(index) {
      if (index * 1 > this.checkinInfo.checkinDays * 1) {
        return require(`@/assets/debris_center/sign/default_${index}.png`)
      } else {
        return require(`@/assets/debris_center/sign/active_${index}.png`)
      }
    },
    openCalendarSignNotice() {
      bk.call('handleCalendarSignNotice', {}, (data) => {
        const { isSuccess } = JSON.parse(data)
        console.log('点击返回', isSuccess)
        // 通知开启初始化
        if (isSuccess * 1 === 0) return
        this.isOpen = !this.isOpen
        if (this.isOpen) {
          toast({
            content: '签到提醒开启成功'
          })
        } else {
          toast({
            content: '签到提醒关闭成功'
          })
        }
      })
    },
    goAwardList() {
      const url = `${window.location.origin}/BKH5-debris_award_list.html`
      routerToNative(url)
    },
    goSignRecord() {
      const url = `${window.location.origin}/BKH5-debris_sign_record.html?activityId=${this.activityId}`
      routerToNative(url)
    },
    goAwardCenter() {
      const url = `${window.location.origin}/BKH5-debris_award_center.html?activityId=${this.activityId}`
      routerToNative(url)
    },
    browserBack() {
      bk.navigateBack()
    },
    goToRewardRecord() {
      const url = `${window.location.origin}/BKH5-debris_award_detail.html?activityId=${this.activityId}`
      routerToNative(url)
    },
    openTask(item) {
      if (item.isFinish * 1 === 0) {
        if (this.from !== 'tab') {
          this.browserBack()
        } else {
          bk.call('goReadBook', {}, () => {
            console.log('去阅读')
          })
        }
      }
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
    console.log('from', this.from)
    // 添加事件监听
    window.addEventListener('scroll', this.addScrollHandler)
    let { data } = await getDebrislist(this.activityId)
    try {
      const {
        checkinRewardInfoList = [],
        checkinInfo = {},
        commentInfoList = [],
        fragmentItemInfoList = [],
        chapterTaskInfoList = {},
      } = data
      if (chapterTaskInfoList) {
        const { taskVOS = []} = chapterTaskInfoList
        this.taskInfoList = taskVOS
      }
      this.checkinRewardInfoList = checkinRewardInfoList
      this.checkinInfo = checkinInfo
      this.commentInfoList = commentInfoList
      this.fragmentItemInfoList = fragmentItemInfoList

      if (checkinInfo) {
        // const { fragmentPrizeInfoList=[]} = checkinInfo
        if (this.checkinInfo.alert * 1 === 0) {
          bk.call('showChipRewardDialog', {
            data: [{
              fragmentPrizeInfo: '1',
              title: '测试数据',
              bigImgUrl: '',
              userFragmentCount: '11'
            }]
          })
        }
      }
      this.rewardNum = this.taskInfoList.reduce((acc, val) => {
        if (val.isFinish * 1 === 1) {
          return acc + val.rewardNum*1
        } else {
          return 0
        }
      }, 0)
      console.log(this.rewardNum)
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
