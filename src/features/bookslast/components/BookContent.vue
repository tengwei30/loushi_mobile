<template lang="pug">
.bookslast-content
  .edit-push(v-if="boostList.length > 0")
    .edit-push-icon {{boostTitle}}
    .edit-push-books
      div(v-for="item in boostList"
             :key="item.bookId"
             class="edit-push-book-item"
             @click="handleGoBookDetail(item)")
        img(:src="item.bookCoverUrl")
        .edit-push-bookname {{item.bookName}}
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