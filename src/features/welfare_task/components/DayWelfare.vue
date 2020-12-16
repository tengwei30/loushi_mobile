<template lang="pug">
.day__welfare
  .welfare__title
    .welfare__title__left
      .title__left__top
        img(src="@/assets/welfare_task/day_welfare_title.png")
        span.has__read__chapter 20章
      .title__left__bottom
        | 已经通过阅读到账1303金币
    .welfare__title__right
      img(src="@/assets/welfare_task/day_welfare_title_icon.png")
      p 今日可领
        span 1000
  .welfare__progress
    h3.title 当日连续阅读福利
    .progress__content
      .progress__item(v-for="item in 4")
        p.start__task 500金币
        p.task__chapter
          span 0
          span 章
      p.progress__bar
    h5.footer_desc 还需阅读20章节
</template>
<script>
export default {
  data() {
    return {
    }
  }
}
</script>
<style lang="stylus">
@import '../../../styles/index.styl';
.day__welfare
  padding 0 21px
  box-sizing border-box
  margin-top 30px
  .welfare__title
    display flex
    flex-direction row
    justify-content space-between
    .welfare__title__left
      color #999999
      font-family PingFangSC-Regular, PingFang SC
      .title__left__top
        img
          size(109px, 26px)
        .has__read__chapter
          font-size 20px
          line-height 28px
          padding-left 15px
      .title__left__bottom
        font-size 14px
        line-height 20px
    .welfare__title__right
      text-align center
      img
        size(27px, 28px)
      p
        font-size 14px
        color #333333
        line-height 20px
  .welfare__progress
    margin-top 20px
    padding 15px 15px 0
    box-sizing border-box
    min-height 166px
    background url('../../../assets/welfare_task/welfare_content_bg.png') no-repeat center center
    background-size 100% 100%
    h3.title
      padding 0 0 13px 0
      box-sizing border-box
      height 14px
      font-size 14px
      font-family PingFangSC-Medium, PingFang SC
      font-weight 500
      color #FCF1D0
      line-height 14px
    .progress__content
      padding-top 13px
      box-sizing border-box
      display flex
      flex-direction row
      justify-content space-between
      position relative
      .progress__item
        p.start__task
          size(60px 25px)
          background-image url('../../../assets/welfare_task/day_welfate_active.png')
          color #D23131
          background-repeat no-repeat
          background-position center center
          // background url('../../../assets/welfare_task/day_welfate_active.png') no-repeat center center
          background-size 100% 100%
          text-align center
          font-size 12px
          font-weight bold
          padding-top 2px
          box-sizing border-box
        p.task__chapter
          margin 21px auto 0
          size(26px 36px)
          background-image url('../../../assets/welfare_task/day_welfare_chapter.png')
          background-repeat no-repeat
          background-position center center
          background-size 100% 100%
          font-size 12px
          transform scale(0.81)
          color #D23131
          text-align center
          display flex
          flex-direction column
          justify-content center
          align-items center
          span
            display inline-block
            height 12px
      .progress__bar
        absolute(left 0 top 47px right 0)
        margin 0 auto
        size(267px, 2px)
        background #A93333
        border-radius 3.5px
        opacity 0.21
    h5.footer_desc
      font-size 12px
      color #FCF1D0
      line-height 17px
      text-align center
      padding-top 15px
</style>