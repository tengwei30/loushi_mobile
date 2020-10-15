<template lang="pug">
#debris_app
  header
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
        //- .single_award
        //-   .img_show
        //-     span.img
        //-   .single_award_title iPhone11 pro碎片
        //-   .single_award_progress
        //-     span.default_progress 0/9
        //- .single_award
        //-   .img_show
        //-     span.img
        //-   .single_award_title iPhone11 pro碎片
        //-   .single_award_progress
        //-     span.default_progress 0/9
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
          :src="require(`@/assets/debris_center/sign/default_${item}.png`)"
          v-for='item in 10'
          )
      p.sign_day_num(@click="goSignRecord()") 您已成功签到5天，获得5枚碎片，别中断哦～
  .task_module
    ContentSlot(
      title='今日阅读 30章',
      :desc='desc'
      :styles="styles"
    )
      ul.task_list
        li.single_task(v-for="item in 5")
          p.task_name 今日认真阅读10章
          p.task_state 待领取
  ContentSlot(
    title='奖励中心',
    :styles="styles"
  )
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
import { routerToNative } from '@/utils/native.js'
import bk from 'bayread-bridge'
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
      styles: {
        padding: '16px 21px 12px',
        boxSizing: 'border-box'
      },
      todayTotalReadChapterNum: 1,
      nextTaskNeedNum: 1,
      // desc: '已通过阅读到账8枚碎片，再阅读1章，到账1枚',
      showNotification: false
    }
  },
  computed: {
    imgUrl() {
      return !this.showNotification ? require('../../assets/debris_center/off_icon@2x.png') : require('../../assets/debris_center/open_icon@2x.png')
    },
    desc() {
      if (this.nextTaskNeedNum * 1 < 0) {
        return '已通过阅读到账8枚碎片'
      } else {
        return `已通过阅读到账8枚碎片，再阅读${this.todayTotalReadChapterNum}章，到账${this.nextTaskNeedNum}枚`
      }
    }
  },
  created() {
    bk.call('getTodayReadTaskChapterNum', {}, data => {
      const { todayTotalReadChapterNum, nextTaskNeedNum } = JSON.parse(data)
      console.log('初始化碎片', todayTotalReadChapterNum, nextTaskNeedNum)
      this.todayTotalReadChapterNum = todayTotalReadChapterNum
      this.nextTaskNeedNum = nextTaskNeedNum
      // this.desc = `已通过阅读到账8枚碎片，再阅读${todayTotalReadChapterNum}章，到账${nextTaskNeedNum}枚`
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
  },
  async mounted() {
    let data = await getDebrislist('123131')
    try {
      console.log('初始化data', data)
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
