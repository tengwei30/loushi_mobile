<template lang="pug">
.header-top.header-top-1
  .header-top-done(v-if="endInfo.urgeInfo")
    .header-top-book-done 作者正在努力更新中…
    .header-top-book-done-other {{ title }}
  .header-top-button.header-top-mark-button-fetch-common(
    @click="urgeforbook"
    v-if="endInfo.urgeInfo.status === 0 && !showNotificationResume") {{ showNotification ? '开启通知' : '我要催更'}}
  .header-top-mark-button-fetch-common.header-top-mark-button-fetch-success(
    v-if="showNotificationResume"
  ) 已开启
  .header-top-numbers(v-if="endInfo.urgeInfo.status === 1 && !showNotificationResume")
    span.mark-number {{ endInfo.urgeInfo.count }}
    | 人已经催更
</template>
<script>
export default {
  props: ['endInfo', 'showNotification', 'showNotificationResume'],
  computed: {
    title() {
      if (this.showNotificationResume) {
        return '提醒已开启'
      }
      if (this.showNotification) {
        return '开启提醒，第一时间追更！'
      } else {
        return '明日再来看看'
      }
    }
  },
  methods: {
    urgeforbook() {
      this.$emit('urgeforbook')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../index.styl'
</style>