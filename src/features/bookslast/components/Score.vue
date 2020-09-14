<template lang="pug">
.header-bottom
  .header-bottom-comment(@click="commentHandler")
    img(src="@/assets/bookslast/comment.png")
    .header-bottom-text 参与评分
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
      console.log('评分')
      this.$emit('commentHandler')
    },
    rewardHandler() {
      console.log('打赏作者')
      this.$emit('rewardHandler')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../index.styl'
</style>