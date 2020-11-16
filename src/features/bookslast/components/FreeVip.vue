<template lang="pug">
.header-top.header-top-2
  .header-top-done(v-if="endInfo.vipExperienceCardInfo.status === 0")
    .header-top-book-done 本书已完结
    .header-top-book-done-other 恭喜你读完一本书，
      span.mark-vpi 送你3天会员卡！
  .header-top-mark-button-fetch-common.header-top-mark-button-fetch(
    v-if="endInfo.vipExperienceCardInfo.status === 0 &&!vipExperienceCardInfoControl"
    @click="receiveforbook"
    ) 领取会员卡
  .header-top-mark-button-fetch-common.header-top-mark-button-fetch-success(
    v-if="vipExperienceCardInfoControl"
  ) 已领取
  .header-top-book-desc-done(
    v-if="endInfo.vipExperienceCardInfo.status === 1"
    ) 本书已完结，去阅读更多好书吧
    img(src="@/assets/bookslast/bookslast_7.png")
</template>
<script>
export default {
  props: ['bookInfo', 'vipExperienceCardInfoControl', 'endInfo', 'mId'],
  methods: {
    receiveforbook() {
      this.$emit('receiveforbook')
    },
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../index.styl'
</style>