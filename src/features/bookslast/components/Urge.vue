<template lang="pug">
.header-top.header-top-1
  .header-top-desc(v-if="endInfo.urgeInfo") 作者正在努力更新中…
  .header-top-button.header-top-mark-button-fetch-common(
    v-if="endInfo.urgeInfo.status === 0") 我要催更
  .header-top-numbers(v-if="endInfo.urgeInfo.status === 1")
    span.mark-number {{ endInfo.urgeInfo.count }}
    | 人已经催更
</template>
<script>
export default {
  props: ['endInfo'],
  mounted() {
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