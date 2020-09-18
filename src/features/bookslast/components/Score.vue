<template lang="pug">
.header-bottom
  .header-bottom-comment(@click="commentHandler")
    img(src="@/assets/bookslast/comment.png")
    .header-bottom-text {{ endInfo.source ? endInfo.source : '参与评分'}}
  .header-bottom-monry(@click="rewardHandler")
    img(src="@/assets/bookslast/reward.png")
    .header-bottom-text 打赏作者
  .header-bottom-line
</template>
<script>
export default {
  props: ['endInfo'],
  mounted() {
  },
  methods: {
    commentHandler() {
      this.$emit('commentHandler')
    },
    rewardHandler() {
      this.$emit('rewardHandler')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../index.styl'
</style>