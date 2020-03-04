<template lang="pug">
#app
  .content
    h4.title {{ questionObj[0].question }}
    p.desc
      | {{ questionObj[0].anwser }}
      span.list(
        v-if="questionObj[0].anwserlist.length !== 0"
        v-for="val in questionObj[0].anwserlist"
        ) {{ val }}
    p.contact
      span 问题没有解决？
      span.contact__customer(@click="callOnline") 联系客服 》
</template>

<script>
import { getQueryString } from '@/utils/url'
import { routerToNative } from '@/utils/native'
import config from '../mobile_faq/data.js'
export default {
  data() {
    return {
      clickFlag: true,
      questionId: getQueryString('questionId') || '',
      classesId: getQueryString('classesId') || '',
      key: getQueryString('key') || '',
      questionObj: [{
        question: '',
        anwser: '',
        anwserlist: []
      }],
    }
  },
  methods: {
    callOnline() {  // 点击跳转在线客服
      if (!this.clickFlag) return
      const url = 'https://chat.sobot.com/chat/h5/v2/index.html?sysnum=97eed5af7ee44513b227658750dc0981&channelid=2'
      routerToNative(url)
      this.clickFlag = false
      setTimeout(() => {
        this.clickFlag = true
      }, 2000)
    }
  },
  created() {
    if (this.key === 'common') {
      this.questionObj = config[this.key].filter(item => item.id === this.questionId)
    }
    if (this.key === 'classes') {
      const data = config[this.key].filter(item => item.id === this.classesId)
      this.questionObj = data[0].list.filter(val => val.id === this.questionId)
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
body, html
  size(100%, 100%)
  background #F5F5F5
#app
  padding 10px
  box-sizing border-box
  .content
    width 100%
    background #ffffff
    min-height 100px
    padding 0 10px
    box-sizing border-box
    border-radius 4px
    .title
      font-size 15px
      font-family PingFangSC-Medium,PingFang SC
      font-weight bold
      color #333333
      line-height 21px
      padding 15px 0
      background #ffffff
      border-bottom 1px solid #E8EDED
    p.desc,p.contact
      font-size 15px
      font-family PingFangSC-Regular,PingFang SC
      font-weight bold
      color rgba(102,102,102,1)
      line-height 21px
      padding 15px 0 50px 0
      border-bottom 1px solid #E8EDED
      .list
        display inline-block
    p.contact
      text-align center
      padding 27px 0 37px 0
      .contact__customer
        color #FFB250
</style>
