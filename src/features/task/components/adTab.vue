<template lang="pug">
#adTab
  ul.adtab__list
    li(v-for="item in 4")
      p
        span 大转盘
</template>
<script>
export default {}
</script>
<style lang="stylus">
#adTab
  width 100%
  border-radius 4px
  box-shadow -2px 3px 5px 0px rgba(153,153,153,0.15), 0px 0px 5px 0px rgba(153,153,153,0.15)
  margin-top 15px
  padding 15px
  box-sizing border-box
  .adtab__list
    display flex
    flex-direction row
    justify-content center
    align-items center
    li
      flex 1
      display flex
      flex-direction column
      justify-content center
      align-items center
      p
        width 50px
        height 50px
        background #D8D8D8
        border-radius 50px
      span
        font-size 12px
        padding-top 8px
</style>
