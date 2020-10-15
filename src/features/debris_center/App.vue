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
      desc='已通过阅读到账8枚碎片，再阅读2章，到账1枚'
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
import ContentSlot from './components/content_slot'
import DebrisRule from './components/debris_rule'
import Comment from './components/comment'
import Award from './components/award'
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
      }
    }
  },
  methods: {
    goAwardList() {
      const url = `${window.location.origin}/BKH5-debris_award_list.html`
      routerToNative(url)
    },
    goSignRecord() {
      const url = `${window.location.origin}/BKH5-debris_sign_record.html`
      routerToNative(url)
    },
    goAwardCenter() {
      console.log('点击跳转奖励列表')
      const url = `${window.location.origin}/BKH5-debris_award_center.html`
      routerToNative(url)
    },
    openNotification() {
      console.log('点击开启通知')
    }
  },
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './debris.styl';
</style>
