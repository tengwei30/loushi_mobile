<template lang="pug">
#app
  .mobile__faq__common
    List(
      title="常见问题"
      classStyle="default__list"
      :data="commondatas"
      v-on:clickQuestion="clickQuestion"
    )
    List(
      title="问题分类"
      classStyle="list__class"
      :data="classesdatas"
      v-on:clickQuestion="clickQuestion"
    )
  .mobile__footer__space
  .mobile__faq__footer
    p.button.faq__phone(@click="callPhone") 电话客服
    p.button.faq__online(@click="callOnline") 在线客服
</template>

<script>
import { routerToNative } from '@/utils/native'
import { post } from '@/config/axios.config'
import List from './components/list'
import config from './data.js'
import { getUrlParamsByObject } from '@/utils/url'
import { getCookie } from '@/utils/utils'
import { mBuryPoint } from '@/utils/buryPoint'
export default {
  components: {
    List,
  },
  data() {
    return {
      clickFlag: true,
      commondatas: config.common,
      classesdatas: config.classes,
      userInfo: {}
    }
  },
  methods: {
    clickQuestion(val) { // 点击问题跳转详情
      let routeurl
      if (val.key === 'common') {
        mBuryPoint({
          source: 'help_center',
          type: 'common',
          question_id: val.id
        })
        routeurl = `${window.location.origin}/BKH5-mobile_faq_detail.html?key=${val.key}&questionId=${val.id}&from=helpcenter`
      }
      if (val.key === 'classes') {
        mBuryPoint({
          source: 'help_center',
          type: 'class',
          class_id: val.id,
        })
        routeurl = `${window.location.origin}/BKH5-mobile_faq_more.html?key=${val.key}&classesId=${val.id}`
      }
      routerToNative(`${routeurl}`)
    },
    callPhone() { // 吊起电话
      mBuryPoint({
        source: 'help_center',
        type: 'phone_click'
      })
      window.location='tel:13331136299'
    },
    callOnline() { // 跳转在线客服
      if (!this.clickFlag) return
      mBuryPoint({
        source: 'help_center',
        type: 'online_click'
      })
      const vId = getCookie('vId')
      const sessionId = getCookie('sessionid') // sessionId 存在～说明用户已经登录
      const { username, nickname, phoneNum } = this.userInfo
      const params = {
        sysnum: '97eed5af7ee44513b227658750dc0981',
        channelid: '2',
        partnerid: sessionId ? sessionId : vId,
        uname: username,
        realname: nickname,
        tel: phoneNum,
        type: '3',
        msg_flag: '0',
        level_msg_flag: '1',
        feedback_flag: '1',
        photo_flag: '1',
        to_customsys_open_style: '0',
        leave_customsys_flag: '1',
        agent_mode_flag: '1',
        top_bar_flag: '1',
        guide_flag: '1',
        time: '2880',
        // artificial: true
      }
      const url = `https://chat.sobot.com/chat/h5/v2/index.html${getUrlParamsByObject(params)}`
      routerToNative(url)
      this.clickFlag = false
      setTimeout(() => {
        this.clickFlag = true
      }, 2000)
    },
  },
  created() {},
  mounted() {
    mBuryPoint({ // 进入帮助中心的埋点
      source: 'help_center',
      type: 'open'
    })
    post('/api/user/userInfoQuickApp').then(res => {
      if (!res.data) return
      const { vipInfo, userInfo } = res.data
      this.userInfo = { ...vipInfo, ...userInfo }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
body,html
  size(100%, 100%)
#app
  size(100%, 100%)
  .mobile__faq__common
    .list__class
      display grid
      grid-template-columns 1fr 1fr
      li.item
        &:nth-of-type(odd)
          padding-right 19px
          border-right 1px solid #E8EDED
        &:nth-of-type(even)
          padding-left 27px
        &:last-child
          border-bottom 1px solid #E8EDED
  .mobile__footer__space
    size(100%, 64px)
  .mobile__faq__footer
    display flex
    flex-direction row
    padding 10px 20px
    background #ffffff
    fixed(bottom 0 left 0 right 0)
    border-top 1px solid #E8EDED
    .button
      font-size 15px
      line-height 43px
      text-align center
      font-weight bold
      color #ffffff
      background #FFB250
      size(150px, 43px)
      border 1px solid rgba(232,237,237,1)
      border-radius 12px
      position relative
      padding-left 20px
      box-sizing border-box
      &:first-child
        margin-right 35px
    .faq__phone
      &:before
        content ''
        size(21px, 21px)
        background red
        absolute(top 11px left 29px)
        background url('../../assets/mobileFaq/dianhuakefu@3x.png') no-repeat center center
        background-size 100% 100%
    .faq__online
      &:before
        content ''
        size(21px, 21px)
        background red
        absolute(top 11px left 29px)
        background url('../../assets/mobileFaq/zaixiankefu@3x.png') no-repeat center center
        background-size 100% 100%
</style>
