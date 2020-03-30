<template lang="pug">
#app
  .content
    h3 尊敬的VIP用户:
    p 您好，感谢您对必看免费小说的支持与喜爱。为了提高您的使用感受同时降低您的提现难度，平台接受大部分用户提出的建议，自2020年*月*日起，更改提现规则。
    h3 新增规则为：
    p
      |【100元档的提现机会仅限一次】
    p.desc 自此，限制“提现100元，消耗50天“连续签到”天数”的提现规则。您可以享受消耗更少的“连续签到天
      | 数”便可提现。同时，为了保障老用户的使用感受，每
      | 位老用户依旧可以拥有一次“提现100元”的机会（老用
      | 户为：**年**月**日之前下载《必看免费小说》APP的
      | 用户）。
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
body, html
  size(100%, 100%)
#app
  width 100%
  min-height 100%
  padding 16px 13px 42px
  background #F7F7F7
  box-sizing border-box
  .content
    padding 20px 13px 20px 19px
    box-sizing border-box
    width 100%
    background #fff
    h3
      font-size 16px
      color #333333
      font-weight bold
    p
      font-size 13px
      color #333333
      padding 12px 0 7px
      text-indent 28px
    p.desc
      padding 0
</style>
