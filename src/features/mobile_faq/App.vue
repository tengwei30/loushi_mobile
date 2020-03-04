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
import { get } from '@/config/axios.config'
import List from './components/list'
import data from './data.js'
export default {
  components: {
    List,
  },
  data() {
    return {
      clickFlag: true,
      commondatas: [],
      classesdatas: []
    }
  },
  methods: {
    clickQuestion(val) { // 点击问题跳转详情
      let routeurl
      if (val.key === 'common') {
        routeurl = `${window.location.origin}/BKH5-mobile_faq_detail.html?key=${val.key}&questionId=${val.id}`
      }
      if (val.key === 'classes') {
        routeurl = `${window.location.origin}/BKH5-mobile_faq_more.html?key=${val.key}&classesId=${val.id}`
      }
      routerToNative(`${routeurl}`)
    },
    callPhone() { // 吊起电话
      window.location='tel:13331136299'
    },
    callOnline() { // 跳转在线客服
      if (!this.clickFlag) return
      const url = 'https://chat.sobot.com/chat/h5/v2/index.html?sysnum=97eed5af7ee44513b227658750dc0981&channelid=2'
      routerToNative(url)
      this.clickFlag = false
      setTimeout(() => {
        this.clickFlag = true
      }, 2000)
    },
  },
  created() {
    let config
    if (sessionStorage.getItem('config')) {
      config = JSON.parse(sessionStorage.getItem('config'))
    } else {
      sessionStorage.setItem('config', JSON.stringify(data))
      config = data
    }
    this.commondatas = config.common
    this.classesdatas = config.classes
  },
  mounted() {
    get('/api/user/userInfo').then(res => {
      console.log('dddddd', res)
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
