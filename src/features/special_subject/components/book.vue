<template>
<div class="subject_book" @click="handleClickBook">
  <img :src="bookInfo.bookCoverUrl" class="book_cover" alt=" ">
  <div class="book_info">
    <div class="book_name">{{bookInfo.bookName}}</div>
    <div class="book_desc">{{dealDesc}}</div>
    <div class="book_bottom">
      <div class="book_tag_status">
        <span class="book_tag book_item">{{bookInfo.classify}}</span>
        <span v-if="bookInfo.status" class="book_status book_item">{{bookInfo.status}}</span>
      </div>
      <div class="book_read">立即阅读</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    bookInfo: Object
  },
  data() {
    return {}
  },
  methods: {
    handleClickBook() {
      this.$emit('handleClickBook', this.bookInfo)
    }
  },
  computed: {
    dealDesc() {
      let result = this.bookInfo.intro || ''
      if (result.length > 40) {
        result = result.substring(0, 40) + '...'
      }
      return result
    }
  }
}
</script>
<style lang="stylus">
.subject_book
  width 355px
  height 130px
  background rgba(255, 255, 255, 1)
  border-radius 12px
  box-sizing border-box
  padding 15px 0 15px 11px
  display flex
  font-family PingFangSC-Medium, PingFang SC
  margin 0 auto 15px
  .book_cover
    width 74.2px
    height 100px
    border-radius 6px
    margin-right 9px
  .book_info
    flex 1
    position relative
    .book_name
      font-size 13px
      font-weight 500
      line-height 19px
      color rgba(22, 22, 22, 1)
    .book_desc
      font-size 12px
      color rgba(153, 153, 153, 1)
      font-weight 400
      margin 5 0 6px
      width 190px
    .book_bottom
      display flex
      box-sizing border-box
      align-items center
      justify-content space-between
      position absolute
      bottom 0
      width 100%
      .book_tag_status
        font-size 0
        .book_item
          padding 4px 7px
          border-radius 5px
          background rgba(240, 240, 240, 1)
          font-size 10px
          color rgba(153, 153, 153, 1)
          font-weight 400
          margin-right 9px
          display inline-block
          line-height 1
      .book_read
        width 70px
        height 22px
        line-height 22px
        background rgba(51, 51, 51, 1)
        border-radius 83px 0 0 83px
        font-size 12px
        font-weight 500
        color #ffffff
        text-align center
</style>