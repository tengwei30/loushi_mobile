<template lang="pug">
#taskList
  .title
    h2.task__name 新手任务
  ul.task__list
    li.item
      .item__left
        .item__award
          span.item__award__name 加入书架
          span.item__award__gold 200金币
        .item__desc 我是一个描述
      .item__right
        button.task__btn 开始任务
</template>
<script>
export default {}
</script>
<style lang="stylus">
@import '../../../styles/index.styl';
#taskList
  box-shadow -0.05rem 0.08rem 0.13rem 0rem rgba(153, 153, 153, 0.15),
    0rem 0rem 0.13rem 0rem rgba(153, 153, 153, 0.15)
  box-sizing border-box
  border 4px solid #ffffff
  margin-top 15px
  border-radius 4px
  padding 0 9px
  width 100%
  .task__name
    font-size 20px
    color #848484
    letter-spacing 0
    margin 14px 0 0
    text-shadow 0px 0px #333
  .item
    display flex
    box-sizing border-box
    justify-content center
    align-items center
    border-bottom 1px solid #f7f7f7
    padding 14px 0
    &:last-child
      border-bottom 0
    .item__left
      flex-grow 1
      .item__desc
        color #666666
        font-size 12px
        line-height 17px
        padding-top 11px
      .item__award
        height 24px
        .item__award__name
          float left
          margin-right 14px
          max-width 130px
          overflow hidden
          font-size 17px
          color #333333
          text-overflow ellipsis
          white-space nowrap
        .item__award__gold
          font-size 12px
          color #ffa421
          float left
          background #fff4e6
          padding 2px 5px 2px 11px
          border-radius 4px
          position relative
          &:before
            content ""
            absolute(left -7.5px top 0.825px)
            width 0.5rem
            height 0.5rem
            background url("../../../assets/task/coin.png") no-repeat center center
            background-size 100% 100%
    .item__right
      flex-grow 0
      width 80px
      .task__btn
        width 100%
        color #ffc300
        height 28px
        border 1px solid #ffc300
        background #ffffff
        border-radius 14px
        line-height 24px
        display flex
        justify-content center
        align-items center
        font-size 13px
</style>
