<template lang="pug">
#app
  .content
    h4.title 金币是什么？
    p.desc 金币是必看免费小说里的虚拟货币单位，金币可以兑换现金，10000金币=1元
    p.contact
      span 问题没有解决？
      span.contact__customer(@click="callOnline") 联系客服 》
</template>

<script>
export default {
  data() {
    return {
      platformId: localStorage.getItem('platformId'), // 平台号
      clickFlag: true
    }
  },
  methods: {
    callOnline() {
      if (!this.clickFlag) return
      let url
      if (this.platformId !== 3) {
        url = `breader://common/browser?url=${encodeURIComponent('https://chat.sobot.com/chat/h5/v2/index.html?sysnum=97eed5af7ee44513b227658750dc0981&channelid=2')}`
      } else {
        url = 'https://chat.sobot.com/chat/h5/v2/index.html?sysnum=97eed5af7ee44513b227658750dc0981&channelid=2'
      }
      window.location.href = url
      this.clickFlag = false
      setTimeout(() => {
        this.clickFlag = true
      }, 2000)
    }
  },
  mounted() {
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
      border-bottom 1px solid #E8EDED
    p.desc,p.contact
      font-size 15px
      font-family PingFangSC-Regular,PingFang SC
      font-weight bold
      color rgba(102,102,102,1)
      line-height 21px
      padding 15px 0 50px 0
      border-bottom 1px solid #E8EDED
    p.contact
      text-align center
      padding 27px 0 37px 0
      .contact__customer
        color #FFB250
</style>
