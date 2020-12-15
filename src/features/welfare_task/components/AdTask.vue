<template lang="pug">
.reward__root
  ul.root__four
    li.adList__li(v-for="item in 8")
      span.img
      p.title 视频赚
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="stylus">
@import '../../../styles/index.styl';
.reward__root
  margin-top 30px
  padding 0 18px
  box-sizing border-box
  .root__four
    display flex
    flex-wrap wrap
    justify-content flex-start
    .adList__li
      width 25%
      min-height 79px
      text-align center
      margin 7.5px 0 0
      span.img
        size(48px,48px)
        display inline-block
        background green
      .title
        font-size 12px
        color #666
</style>