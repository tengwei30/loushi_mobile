<template lang="pug">
.header-bottom
  .header-bottom-comment(@click="commentHandler" v-if="platform === '5'")
    span.comment_source(v-if="endInfo.bookInfo && endInfo.bookInfo.source")
      | {{endInfo.bookInfo.source}}
      em 分
    img(v-else src="@/assets/bookslast/comment.png")
    .header-bottom-text 参与评分
  .header-bottom-monry(@click="rewardHandler")
    img(src="@/assets/bookslast/reward.png")
    .header-bottom-text 打赏作者
  .header-bottom-line(v-if="platform === '5'")
</template>
<script>
export default {
  props: ['endInfo', 'platform'],
  mounted() {},
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