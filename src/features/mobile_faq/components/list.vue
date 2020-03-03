<template lang="pug">
#mobile__faq
  h2.title {{ title }}
  ul.list(:class="classStyle ? classStyle : ''")
    li.item
      | 金币是什么？
      span.icon >
    li.item
      | 金币是什么？
      span.icon >
    li.item
      | 金币是什么？
      span.icon >
</template>
<script>
export default {
  props: ['title', 'classStyle'],
}
</script>
<style lang="stylus">
@import '../../../styles/index.styl';
.title
  background rgba(245,245,245,1)
  font-size 13px
  color #969A99
  font-weight bold
  line-height 18px
  padding 10px 20px
.list
  display flex
  flex-direction column
  padding 0 20px
  li.item
    font-size 15px
    color #333333
    line-height 21px
    padding 15px 0
    font-weight bold
    border-bottom 1px solid #E8EDED
    &:last-child
      border none
    span.icon
      color #999999
      float right
</style>
