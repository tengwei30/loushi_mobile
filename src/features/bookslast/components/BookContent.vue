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
  .content-good-book(v-if="bookInfo.isSerial === 1")
    .content-good-book-img
      img(src="@/assets/bookslast/bookslast_8.png")
      .content-good-book-text 好书推荐
  .content-book-info-container
    .content-book-cover
      img.cover-img(:src="endCategoryBook.bookCoverUrl")
      .book-score(v-if="endCategoryBook.grade !== '0'")
        img(src="@/assets/bookslast/bookslast_4.png")
        span.book-score-text {{ endCategoryBook.grade }}分
    .content-book-info
      .content-book-info-title {{ endCategoryBook.bookName }}
      .content-book-info-author
        img(src="@/assets/bookslast/bookslast_9.png")
        .content-book-info-author-text {{ endCategoryBook.author }}
      .content-book-info-serial {{ endCategoryBook.serialValue }}
      .content-book-info-nums {{ endCategoryBook.totalWords }}
    .content-book-ranking
      .book-ranking
        img.book-ranking-img(src="@/assets/bookslast/bookslast_3.png")
        .book-ranking-text-container
          .category {{ endCategoryBook.classify }}
          .ranking(v-show="showTag") {{ endCategoryBook.tag }}
          .ranking(v-show="!showTag") 第{{ endCategoryBook.num }}名
      .book-refresh(
        v-if="mId === ''"
        @click="refreshHandler"
      )
        img.book-refresh-img(src="@/assets/bookslast/bookslast_1.png")
        span 换一本
  .content-book-video
    #video(v-show="videoobj && platform !== '50' && videoobj && platform !== '51'")
      videoPlay(
          v-if="videoobj"
          ref="play"
          :videoobj="videoobj")
    div(v-if="content"
           style="position: relative;background: #f7f7f7;")
      p.bookslast-tip(v-show="showtip")
        | 更多精彩内容
        img(src="@/assets/bookslast/bookslast_6.png")
      p.content-title {{ contentTitle }}
      p.content {{ content }}
  .bottom_parent
    p.left(@click="addShelf") 仅加入书架
    p.right(@click="addShelfAndRead") 加入书架并继续阅读
</template>
<script>
export default {
  props: ['bookInfo',
    'boostList',
    'boostTitle',
    'endCategoryBook',
    'videoobj',
    'contentTitle',
    'content',
    'mId',
    'showtip',
    'showTag',
    'platform'],
  components: {
    VideoPlay: () => import('./video/videoplay.vue')
  },
  mounted() {},
  methods: {
    handleGoBookDetail(item) {
      this.$emit('handleGoBookDetail', item)
    },
    refreshHandler() {
      this.$emit('refreshHandler')
    },
    addShelf() {
      this.$emit('addShelf')
    },
    addShelfAndRead() {
      this.$emit('addShelfAndRead')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../index.styl'
</style>