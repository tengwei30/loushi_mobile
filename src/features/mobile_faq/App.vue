<template lang="pug">
#app
  .mobile__faq__common
    List(
      title="常见问题"
      classStyle="default__list"
    )
    List(
      title="问题分类"
      classStyle="list__class"
    )
  .mobile__footer__space
  .mobile__faq__footer
    p.button.faq__phone(@click="callPhone") 电话客服
    p.button.faq__online(@click="callOnline") 在线客服
</template>

<script>
import List from './components/list'
export default {
  components: {
    List,
  },
  data() {
    return {
      platformId: localStorage.getItem('platformId'), // 平台号
      clickFlag: true
    }
  },
  methods: {
    callPhone() {
      window.location='tel:13331136299'
    },
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
    },
  },
  mounted() {},
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
